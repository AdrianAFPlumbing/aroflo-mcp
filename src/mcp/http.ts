import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import type { AroFloClient } from '../aroflo/client.js';
import { logger } from '../utils/logger.js';
import { createAroFloMcpServer } from './app.js';
import { handleTasksRest } from './rest.js';
import { handleAiComplete } from './ai.js';
import { handlePortal } from './portal.js';
import { handleStatic } from './static.js';

export interface HttpServerOptions {
  host: string;
  port: number;
  path: string;
  client: AroFloClient;
}

const ALLOWED_METHODS = new Set(['POST', 'GET', 'DELETE']);

function setCorsHeaders(res: ServerResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, mcp-session-id');
}

function writeJson(res: ServerResponse, statusCode: number, payload: unknown): void {
  if (res.headersSent) {
    return;
  }

  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function getPathname(req: IncomingMessage): string {
  const host = req.headers.host ?? 'localhost';
  const url = req.url ?? '/';

  try {
    const parsed = new URL(url, `http://${host}`);
    return parsed.pathname;
  } catch {
    return '/';
  }
}

export async function handleMcpHttpRequest(
  req: IncomingMessage,
  res: ServerResponse,
  client: AroFloClient,
  mcpPath: string
): Promise<void> {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const pathname = getPathname(req);

  // --- Quote Portal front-end (permanent bookmarkable URL) ------------------
  if (await handleStatic(req, res, pathname)) return;

  // --- Quote Portal DB API (auth, users, quotes, versions, prices, clients) -
  if (await handlePortal(req, res, pathname)) return;

  // --- Quote Portal REST endpoint -------------------------------------------
  // Plain REST route the browser portal can call directly (the /mcp route only
  // speaks MCP JSON-RPC and can't be consumed from a fetch()).
  if (pathname === '/tasks' || pathname === '/tasks/') {
    if (req.method !== 'GET') {
      writeJson(res, 405, { status: 'error', message: 'Method not allowed' });
      return;
    }

    try {
      await handleTasksRest(req, res, client);
    } catch (error) {
      logger.error({ err: error }, 'Failed to handle /tasks REST request');
      writeJson(res, 500, {
        status: 'error',
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
    return;
  }
  // --------------------------------------------------------------------------

  // --- Quote Portal AI proxy ------------------------------------------------
  // Signs a prompt through Anthropic server-side so the portal never holds a key.
  if (pathname === '/ai/complete' || pathname === '/ai/complete/') {
    if (req.method !== 'POST') {
      writeJson(res, 405, { status: 'error', message: 'Method not allowed' });
      return;
    }

    try {
      await handleAiComplete(req, res);
    } catch (error) {
      logger.error({ err: error }, 'Failed to handle /ai/complete request');
      writeJson(res, 500, {
        status: 'error',
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
    return;
  }
  // --------------------------------------------------------------------------

  if (pathname !== mcpPath) {
    writeJson(res, 404, {
      jsonrpc: '2.0',
      error: {
        code: -32004,
        message: 'Not found'
      },
      id: null
    });
    return;
  }

  const method = req.method ?? '';
  if (!ALLOWED_METHODS.has(method)) {
    writeJson(res, 405, {
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed'
      },
      id: null
    });
    return;
  }

  const mcpServer = createAroFloMcpServer(client);
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined
  });

  let closed = false;
  const closeResources = async () => {
    if (closed) {
      return;
    }

    closed = true;
    await Promise.allSettled([transport.close(), mcpServer.close()]);
  };

  res.on('close', () => {
    void closeResources();
  });

  try {
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res);
  } catch (error) {
    logger.error({ err: error, method, path: mcpPath }, 'Failed to handle MCP HTTP request');

    await closeResources();

    writeJson(res, 500, {
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: 'Internal server error'
      },
      id: null
    });
  }
}

export async function startHttpServer(options: HttpServerOptions): Promise<Server> {
  const server = createServer((req, res) => {
    void handleMcpHttpRequest(req, res, options.client, options.path);
  });

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(options.port, options.host, () => {
      server.off('error', reject);
      resolve();
    });
  });

  logger.info(
    {
      host: options.host,
      port: options.port,
      path: options.path
    },
    'AroFlo MCP HTTP server started'
  );

  return server;
}

export async function stopHttpServer(server: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
