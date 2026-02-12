import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { loadEnv } from '../config.js';
import { logger } from '../utils/logger.js';
import { createAroFloClient, createAroFloMcpServer } from './app.js';
import { startHttpServer, stopHttpServer } from './http.js';

function registerShutdown(handler: () => Promise<void>): void {
  process.on('SIGINT', () => {
    void handler();
  });

  process.on('SIGTERM', () => {
    void handler();
  });
}

async function startStdioMode(): Promise<void> {
  const env = loadEnv();
  const client = createAroFloClient(env);
  const server = createAroFloMcpServer(client);
  const transport = new StdioServerTransport();

  await server.connect(transport);
  logger.info('AroFlo MCP server started (stdio)');

  registerShutdown(async () => {
    logger.info('Shutting down AroFlo MCP server (stdio)');
    await Promise.allSettled([server.close(), transport.close()]);
    process.exit(0);
  });
}

async function startHttpMode(): Promise<void> {
  const env = loadEnv();
  const client = createAroFloClient(env);

  const httpServer = await startHttpServer({
    host: env.MCP_HTTP_HOST,
    port: env.MCP_HTTP_PORT,
    path: env.MCP_HTTP_PATH,
    client
  });

  registerShutdown(async () => {
    logger.info('Shutting down AroFlo MCP server (http)');
    await stopHttpServer(httpServer);
    process.exit(0);
  });
}

async function main(): Promise<void> {
  const env = loadEnv();

  if (env.MCP_TRANSPORT === 'http') {
    await startHttpMode();
    return;
  }

  await startStdioMode();
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown startup error';
  logger.error({ err: error }, 'AroFlo MCP failed to start');
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
