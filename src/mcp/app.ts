import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import type { AroFloClient } from '../aroflo/client.js';
import { AroFloClient as AroFloClientImpl } from '../aroflo/client.js';
import type { AppEnv } from '../config.js';
import { registerGetLastUpdateTool } from './tools/get-lastupdate.js';
import { registerQueryZoneTool } from './tools/query-zone.js';
import { registerGetRecordTool } from './tools/get-record.js';
import { registerMutateRecordTool } from './tools/mutate-record.js';
import { registerZoneGetTools } from './tools/get-zones.js';

export function createAroFloClient(env: AppEnv): AroFloClient {
  return new AroFloClientImpl({
    baseUrl: env.AROFLO_API_BASE_URL,
    credentials: {
      uEncoded: env.AROFLO_UENCODED,
      pEncoded: env.AROFLO_PENCODED,
      orgEncoded: env.AROFLO_ORG_ENCODED
    },
    secretKey: env.AROFLO_SECRET_KEY,
    accept: env.AROFLO_ACCEPT,
    hostIp: env.AROFLO_HOST_IP,
    timeoutMs: env.AROFLO_TIMEOUT_MS,
    maxRetries: env.AROFLO_MAX_RETRIES
  });
}

export function createAroFloMcpServer(client: AroFloClient): McpServer {
  const server = new McpServer({
    name: 'aroflo-mcp',
    version: '0.1.0'
  });

  registerGetLastUpdateTool(server, client);
  registerQueryZoneTool(server, client);
  registerGetRecordTool(server, client);
  registerMutateRecordTool(server, client);
  registerZoneGetTools(server, client);

  return server;
}
