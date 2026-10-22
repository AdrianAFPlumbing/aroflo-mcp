import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { loadEnv } from '../config.js';
import { logger } from '../utils/logger.js';
import { createAroFloClient, createAroFloMcpServer, createAroFloV2Client } from './app.js';
import { startHttpServer, stopHttpServer } from './http.js';
import { initSchema } from '../db/db.js';
import { startKpiSync, stopKpiSync } from '../kpi/sync.js';

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
  const v2Client = createAroFloV2Client(env);
  const server = createAroFloMcpServer(client, v2Client);
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
  const v2Client = createAroFloV2Client(env);
  logger.info({ v2Enabled: Boolean(v2Client) }, 'AroFlo APIv2 tools');

  // Portal additions: prepare the database (no-op without DATABASE_URL) and
  // start the background AroFlo -> DB task sync so data stays live.
  try {
    await initSchema();
  } catch (error) {
    logger.error({ err: error }, 'Portal schema init failed (continuing without DB features)');
  }
  startKpiSync(client);

  const httpServer = await startHttpServer({
    host: env.MCP_HTTP_HOST,
    port: env.MCP_HTTP_PORT,
    path: env.MCP_HTTP_PATH,
    client,
    v2Client
  });

  registerShutdown(async () => {
    logger.info('Shutting down AroFlo MCP server (http)');
    stopKpiSync();
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
