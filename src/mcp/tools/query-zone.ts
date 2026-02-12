import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { arofloToolOutputSchema, errorToolResult, successToolResult } from './shared.js';

const stringOrStringArraySchema = z.union([z.string().min(1), z.array(z.string().min(1))]);

const inputSchema = {
  zone: z.string().min(1),
  where: stringOrStringArraySchema.optional(),
  order: stringOrStringArraySchema.optional(),
  join: stringOrStringArraySchema.optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(500).optional(),
  extra: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional()
};

export function registerQueryZoneTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_query_zone',
    {
      title: 'AroFlo: Query Zone',
      description:
        'Query an arbitrary AroFlo zone using WHERE/ORDER/JOIN clauses. ' +
        'Use pipe-delimited WHERE clauses like "and|field|=|value", ORDER clauses like "field|asc", and JOIN areas like "lineitems". ' +
        'See resource "aroflo://docs/api" for the extracted zone docs.',
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
        const where = typeof args.where === 'string' ? [args.where] : args.where;
        const order = typeof args.order === 'string' ? [args.order] : args.order;
        const join = typeof args.join === 'string' ? [args.join] : args.join;

        const response = await client.get(args.zone, {
          where,
          order,
          join,
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
