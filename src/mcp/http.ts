import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import type { AroFloClient } from '../aroflo/client.js';
import type { AroFloV2Client } from '../aroflo/v2-client.js';
import { logger } from '../utils/logger.js';
import { createAroFloMcpServer } from './app.js';
import { handleTasksRest } from './rest.js';
import { handleAiComplete } from './ai.js';
import { handlePortal } from './portal.js';
import { handleStatic } from './static.js';
import { handleV2Webhooks } from './v2-webhooks.js';

export interface HttpServerOptions {
  host: string;
  port: number;
  path: string;
  client: AroFloClient;
  v2Client?: AroFloV2Client;
}

const ALLOWED_METHODS = new Set(['POST', 'GET', 'DELETE', 'PATCH']);

function setCorsHeaders(res: ServerResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'content-type, mcp-session-id, x-portal-token, x-webhook-token'
  );
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
  mcpPath: string,
  v2Client?: AroFloV2Client
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
  if (await handlePortal(req, res, pathname, client)) return;

  // --- APIv2 webhooks for Power Automate (document upload, task PATCH) -----
  if (await handleV2Webhooks(req, res, pathname, client, v2Client)) return;

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

  // --- ANSTO SAP PO webhook / sweep -----------------------------------------
  // POST /ansto/sweep?dryRun=1   -> process every unmatched ANSTO PO import
  // POST /ansto/po/<jobnumber>   -> process one AroFlo task that has a PO PDF
  // POST /ansto/backfill-pdfs     -> body {items:[{jobnumber, po}]} attach PO PDFs
  // POST /ansto/po-email          -> body {files:[{name, contentBytes}]} (Power Automate):
  //                                  the SAP PO email's attachments; pairs each 4300xxxxxx.pdf
  //                                  with its Work Order job (Order No + document) or raises
  //                                  the job. The SAP sender is NOT in AroFlo's import filter,
  //                                  so no duplicate task is ever created.
  // Protected by WEBHOOK_TOKEN / ANSTO_WEBHOOK_TOKEN (x-webhook-token / x-ansto-token / ?token=).
  if (
    pathname === '/ansto/sweep' ||
    pathname === '/ansto/backfill-pdfs' ||
    pathname === '/ansto/po-email' ||
    /^\/ansto\/po\/\d{6}$/.test(pathname)
  ) {
    if (req.method !== 'POST') {
      writeJson(res, 405, { status: 'error', message: 'Method not allowed' });
      return;
    }
    const expected = (process.env['WEBHOOK_TOKEN'] ?? process.env['ANSTO_WEBHOOK_TOKEN'])?.trim();
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    const supplied =
      (req.headers['x-webhook-token'] as string | undefined) ??
      (req.headers['x-ansto-token'] as string | undefined) ??
      url.searchParams.get('token') ??
      '';
    if (!expected || supplied !== expected) {
      writeJson(res, 401, { status: 'error', message: 'Unauthorised' });
      return;
    }
    try {
      const { sweepPoTasks, processPoTask, processPoBytes, getTaskByJobNumber } =
        await import('../aroflo/ansto-po.js');
      const dryRun = ['1', 'true'].includes((url.searchParams.get('dryRun') ?? '').toLowerCase());
      if (pathname === '/ansto/sweep') {
        writeJson(res, 200, {
          status: 'ok',
          ...(await sweepPoTasks(client, { dryRun, v2: v2Client }))
        });
        return;
      }
      if (pathname === '/ansto/po-email') {
        const chunks: Buffer[] = [];
        for await (const c of req) chunks.push(c as Buffer);
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as {
          files?: {
            name?: string;
            filename?: string;
            contentBytes?: string;
            contentBase64?: string;
          }[];
          subject?: string;
        };
        const pdfs = (body.files ?? []).filter((f) =>
          /^4300\d{6}\.pdf$/i.test((f.name ?? f.filename ?? '').trim())
        );
        if (pdfs.length === 0) {
          writeJson(res, 200, {
            status: 'skipped',
            reason: 'No 4300xxxxxx.pdf attachment on this email',
            subject: body.subject
          });
          return;
        }
        const results = [];
        for (const f of pdfs) {
          const name = (f.name ?? f.filename ?? '').trim();
          const b64 = f.contentBytes ?? f.contentBase64 ?? '';
          try {
            results.push({
              file: name,
              ...(await processPoBytes(client, new Uint8Array(Buffer.from(b64, 'base64')), name, {
                dryRun,
                v2: v2Client
              }))
            });
          } catch (error) {
            logger.error({ err: error, file: name }, 'ANSTO PO email: processing failed');
            results.push({
              file: name,
              outcome: 'error',
              note: error instanceof Error ? error.message : String(error)
            });
          }
        }
        const failed = results.filter(
          (r) => r.outcome === 'error' || r.outcome === 'wo-not-readable'
        );
        writeJson(res, failed.length === results.length ? 502 : 200, {
          status: failed.length ? 'partial' : 'ok',
          subject: body.subject,
          results
        });
        return;
      }
      if (pathname === '/ansto/backfill-pdfs') {
        if (!v2Client) {
          writeJson(res, 400, { status: 'error', message: 'AROFLO_V2_TOKEN not set' });
          return;
        }
        const chunks: Buffer[] = [];
        for await (const c of req) chunks.push(c as Buffer);
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as {
          items?: { jobnumber: string; po: string }[];
        };
        const items = (body.items ?? []).filter(
          (i) => /^\d{6}$/.test(String(i.jobnumber)) && /^4300\d{6}$/.test(String(i.po))
        );
        const { backfillPoPdfs } = await import('../aroflo/ansto-po-pdf.js');
        writeJson(res, 200, {
          status: 'ok',
          results: await backfillPoPdfs(client, v2Client, items.slice(0, 100))
        });
        return;
      }
      const jobnumber = pathname.split('/').pop()!;
      const task = await getTaskByJobNumber(client, jobnumber);
      if (!task) {
        writeJson(res, 404, { status: 'error', message: `Job ${jobnumber} not found` });
        return;
      }
      writeJson(res, 200, {
        status: 'ok',
        ...(await processPoTask(client, task, { dryRun, v2: v2Client }))
      });
    } catch (error) {
      logger.error({ err: error }, 'Failed to handle /ansto request');
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

  const mcpServer = createAroFloMcpServer(client, v2Client);
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
    void handleMcpHttpRequest(req, res, options.client, options.path, options.v2Client);
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
