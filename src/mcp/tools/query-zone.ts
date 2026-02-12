import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { arofloToolOutputSchema, errorToolResult, successToolResult } from './shared.js';

const inputSchema = {
  zone: z.string().min(1),
  where: z.array(z.string().min(1)).optional(),
  order: z.array(z.string().min(1)).optional(),
  join: z.array(z.string().min(1)).optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(500).optional(),
  extra: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional()
};

export function registerQueryZoneTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_query_zone',
    {
      title: 'AroFlo: Query Zone',
      description: 'Query an arbitrary AroFlo zone using WHERE/ORDER/JOIN clauses.',
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
        const response = await client.get(args.zone, {
          where: args.where,
          order: args.order,
          join: args.join,
          page: args.page,
          pageSize: args.pageSize,
          extra: args.extra
        });

        return successToolResult(response);
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
