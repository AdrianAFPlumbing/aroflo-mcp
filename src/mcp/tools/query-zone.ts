import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import {
  normalizeJoinParam,
  normalizeOrderParam,
  normalizeWhereParam
} from '../../aroflo/normalize-params.js';
import { compactZoneResponseData } from '../../aroflo/select.js';
import { arofloToolOutputSchema, errorToolResult, successToolResult } from './shared.js';

const stringOrStringArraySchema = z.union([z.string().min(1), z.array(z.string().min(1))]);

const inputSchema = {
  zone: z.string().min(1),
  where: stringOrStringArraySchema.optional(),
  order: stringOrStringArraySchema.optional(),
  join: stringOrStringArraySchema.optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(500).optional(),
  compact: z.boolean().optional(),
  select: z.array(z.string().min(1)).optional(),
  maxItems: z.number().int().positive().max(500).optional(),
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
        'where/order/join accept either a single string or an array. ' +
        'Set compact=true and optionally select=["field","nested.field"] to reduce payload size. ' +
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
        const where = normalizeWhereParam(args.where);
        const order = normalizeOrderParam(args.order);
        const join = normalizeJoinParam(args.join);

        const response = await client.get(args.zone, {
          where,
          order,
          join,
          page: args.page,
          pageSize: args.pageSize,
          extra: args.extra
        });

        if (args.compact || (args.select && args.select.length > 0) || args.maxItems) {
          const compactedData = compactZoneResponseData(response.data, {
            select: args.select,
            maxItems: args.maxItems
          });
          return successToolResult({ ...response, data: compactedData });
        }

        return successToolResult(response);
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
