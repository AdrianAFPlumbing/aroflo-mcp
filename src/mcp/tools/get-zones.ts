import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import {
  normalizeJoinParam,
  normalizeOrderParam,
  normalizeWhereParam
} from '../../aroflo/normalize-params.js';
import { compactZoneResponseData } from '../../aroflo/select.js';
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
  compact: z.boolean().optional(),
  select: z.array(z.string().min(1)).optional(),
  maxItems: z.number().int().positive().max(500).optional(),
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
          `where/order/join accept either a single string or an array. ` +
          `Set compact=true and optionally select=[\"field\",\"nested.field\"] to reduce payload size. ` +
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
          const where = normalizeWhereParam(args.where);
          const order = normalizeOrderParam(args.order);
          const join = normalizeJoinParam(args.join);

          const response = await client.get(zone, {
            where,
            order,
            join,
            page: args.page,
            pageSize: args.pageSize,
            extra: args.extra
          });

          if (args.compact || (args.select && args.select.length > 0) || args.maxItems) {
            const defaultSelect =
              zone === 'Tasks' && args.compact && (!args.select || args.select.length === 0)
                ? [
                    'taskid',
                    'jobnumber',
                    'status',
                    'taskname',
                    'daterequested',
                    'createdutc',
                    'clientid',
                    'org.orgid',
                    'org.orgname',
                    'projectid',
                    'stageid',
                    'project.projectid',
                    'project.projectname',
                    'tasktotals.totalhrs'
                  ]
                : undefined;

            const compactedData = compactZoneResponseData(response.data, {
              select: args.select ?? defaultSelect,
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
}
