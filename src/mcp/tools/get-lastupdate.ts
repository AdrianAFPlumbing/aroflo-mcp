import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { arofloToolOutputSchema, errorToolResult, successToolResult } from './shared.js';

const inputSchema = {
  zoneName: z.string().min(1).optional(),
  sinceUtc: z.string().min(1).optional(),
  orderDirection: z.enum(['asc', 'desc']).default('asc'),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(500).optional()
};

export function registerGetLastUpdateTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_get_lastupdate',
    {
      title: 'AroFlo: Get LastUpdate',
      description: 'Query the AroFlo lastupdate zone for incremental sync workflows.',
      inputSchema,
      outputSchema: arofloToolOutputSchema,
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const where: string[] = [];
        if (args.zoneName) {
          where.push(`and|zonename|=|${args.zoneName}`);
        }
        if (args.sinceUtc) {
          where.push(`and|lastupdateutc|>|${args.sinceUtc}`);
        }

        const response = await client.get('lastupdate', {
          where,
          order: [`lastupdateutc|${args.orderDirection}`],
          page: args.page,
          pageSize: args.pageSize
        });

        return successToolResult(response);
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
