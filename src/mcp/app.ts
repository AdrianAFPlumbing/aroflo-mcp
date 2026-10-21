import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import type { AroFloClient } from '../aroflo/client.js';
import { AroFloClient as AroFloClientImpl } from '../aroflo/client.js';
import type { AppEnv } from '../config.js';
import { registerApiDocsResources } from './resources/api-docs.js';
import { registerGetLastUpdateTool } from './tools/get-lastupdate.js';
import { registerQueryZoneTool } from './tools/query-zone.js';
import { registerGetRecordTool } from './tools/get-record.js';
import { registerMutateRecordTool } from './tools/mutate-record.js';
import { registerZoneGetTools } from './tools/get-zones.js';
import { registerReportTools } from './tools/reports.js';
import { registerV2Tools } from './tools/v2.js';
import { registerAnstoTools } from './tools/ansto.js';
import { AroFloV2Client } from '../aroflo/v2-client.js';

/**
 * APIv2 client is optional: it is only created when AROFLO_V2_TOKEN is set, so
 * deployments without a v2 token keep working exactly as before.
 */
export function createAroFloV2Client(env: AppEnv): AroFloV2Client | undefined {
  if (!env.AROFLO_V2_TOKEN) {
    return undefined;
  }
  return new AroFloV2Client({
    baseUrl: env.AROFLO_V2_BASE_URL,
    token: env.AROFLO_V2_TOKEN,
    timeoutMs: env.AROFLO_TIMEOUT_MS,
    maxRetries: env.AROFLO_MAX_RETRIES
  });
}

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

export function createAroFloMcpServer(client: AroFloClient, v2Client?: AroFloV2Client): McpServer {
  const server = new McpServer({
    name: 'aroflo-mcp',
    version: '0.1.0'
  });

  registerGetLastUpdateTool(server, client);
  registerQueryZoneTool(server, client);
  registerGetRecordTool(server, client);
  registerMutateRecordTool(server, client);
  registerZoneGetTools(server, client);
  registerReportTools(server, client);
  registerAnstoTools(server, client, v2Client);
  if (v2Client) {
    registerV2Tools(server, v2Client, client);
  }
  registerApiDocsResources(server);

  return server;
}
