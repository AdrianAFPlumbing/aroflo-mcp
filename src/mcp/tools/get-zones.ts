import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { AROFLO_ZONES, zoneToToolSuffix } from '../../aroflo/zones.js';
import { arofloToolOutputSchema, errorToolResult, successToolResult } from './shared.js';

const queryValueSchema = z.union([z.string(), z.number(), z.boolean()]);

const stringOrStringArraySchema = z.union([z.string().min(1), z.array(z.string().min(1))]);

const inputSchema = {
  where: stringOrStringArraySchema.optional(),
  order: stringOrStringArraySchema.optional(),
  join: stringOrStringArraySchema.optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(500).optional(),
  extra: z.record(z.string(), queryValueSchema).optional()
};

export function registerZoneGetTools(server: McpServer, client: AroFloClient): void {
  for (const zone of AROFLO_ZONES) {
    // We already expose a dedicated tool with a richer schema for lastupdate.
    if (zone === 'LastUpdate') {
      continue;
    }

    const toolName = `aroflo_get_${zoneToToolSuffix(zone)}`;
    server.registerTool(
      toolName,
      {
        title: `AroFlo: Get ${zone}`,
        description:
          `Query the AroFlo ${zone} zone (GET). ` +
          `Use pipe-delimited WHERE clauses like "and|field|=|value", ORDER clauses like "field|asc", and JOIN areas like "lineitems". ` +
          `See resource "aroflo://docs/api/<slug>" (example: "aroflo://docs/api/quotes") for valid fields/values.`,
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

          const response = await client.get(zone, {
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
}
