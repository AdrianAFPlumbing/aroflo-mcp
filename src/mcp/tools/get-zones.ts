import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { extractZoneItems } from '../../aroflo/items.js';
import {
  normalizeJoinParam,
  normalizeOrderParam,
  normalizeWhereParam
} from '../../aroflo/normalize-params.js';
import { validateWhereOrThrow } from '../../aroflo/where-validation.js';
import { mergeZoneResponseData, truncateZoneArrays } from '../../aroflo/paginate.js';
import { compactZoneResponseData } from '../../aroflo/select.js';
import { buildZoneDataEnvelope, resolveOutputMode } from '../output.js';
import { AROFLO_ZONES, zoneToToolSuffix } from '../../aroflo/zones.js';
import { errorToolResult, successToolResult } from './shared.js';

const queryValueSchema = z.union([z.string(), z.number(), z.boolean()]);

const stringOrStringArraySchema = z.union([z.string().min(1), z.array(z.string().min(1))]);

const inputSchema = {
  where: stringOrStringArraySchema.optional(),
  order: stringOrStringArraySchema.optional(),
  join: stringOrStringArraySchema.optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(500).optional(),
  autoPaginate: z.boolean().optional(),
  maxPages: z.number().int().positive().max(200).optional(),
  maxResults: z.number().int().positive().max(5000).optional(),
  maxItemsTotal: z.number().int().positive().max(5000).optional(),
  validateWhere: z.boolean().optional(),
  mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
  verbose: z.boolean().optional(),
  debug: z.boolean().optional(),
  raw: z.boolean().optional(),
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
          `mode: data|verbose|debug|raw (default: data). ` +
          `Set compact=true and optionally select=[\"field\",\"nested.field\"] to reduce payload size. ` +
          `See resource "aroflo://docs/api/<slug>" (example: "aroflo://docs/api/quotes") for valid fields/values.`,
        inputSchema,
        outputSchema: z.any(),
        annotations: {
          readOnlyHint: true,
          idempotentHint: true,
          openWorldHint: true
        }
      },
      async (args) => {
        const mode = resolveOutputMode(args);
        try {
          const where = normalizeWhereParam(args.where);
          const order = normalizeOrderParam(args.order);
          const join = normalizeJoinParam(args.join);

          if (args.validateWhere !== false) {
            await validateWhereOrThrow({ zone, where });
          }

          const autoPaginate = Boolean(args.autoPaginate);
          const startPage = args.page ?? 1;
          const pageSize = args.pageSize ?? (autoPaginate ? 200 : undefined);
          const maxResultsRaw =
            typeof args.maxItemsTotal === 'number' ? args.maxItemsTotal : args.maxResults;
          const maxResults =
            typeof args.maxResults === 'number' && typeof args.maxItemsTotal === 'number'
              ? Math.min(args.maxResults, args.maxItemsTotal)
              : maxResultsRaw;
          const maxPages = args.maxPages ?? (autoPaginate ? 25 : undefined);

          const debugInfo: Record<string, unknown> | undefined = args.debug
            ? {
                zone,
                normalized: {
                  where,
                  order,
                  join,
                  page: startPage,
                  pageSize,
                  extra: args.extra
                }
              }
            : undefined;

          let response = await client.get(zone, {
            where,
            order,
            join,
            page: startPage,
            pageSize,
            extra: args.extra
          });

          let pagesFetched = 1;
          let truncated = false;
          let truncatedReason: string | undefined;
          let nextPage: number | undefined;

          if (autoPaginate) {
            let currentPage = startPage;
            let lastPageCount = extractZoneItems(zone, response.data).items.length;
            while (true) {
              const total = extractZoneItems(zone, response.data).items.length;

              if (typeof maxResults === 'number' && total >= maxResults) {
                truncated = true;
                truncatedReason = 'maxResults';
                nextPage = currentPage + 1;
                break;
              }

              if (typeof maxPages === 'number' && pagesFetched >= maxPages) {
                truncated = true;
                truncatedReason = 'maxPages';
                nextPage = currentPage + 1;
                break;
              }

              if (typeof pageSize === 'number' && lastPageCount < pageSize) {
                break;
              }

              currentPage += 1;
              const next = await client.get(zone, {
                where,
                order,
                join,
                page: currentPage,
                pageSize,
                extra: args.extra
              });

              // If the next page contributes nothing, stop.
              const nextCount = extractZoneItems(zone, next.data).items.length;
              if (nextCount === 0) {
                break;
              }

              response = {
                ...response,
                data: mergeZoneResponseData(response.data, next.data).merged
              };
              pagesFetched += 1;
              lastPageCount = nextCount;

              // Stop if the last page was short.
              if (typeof pageSize === 'number' && nextCount < pageSize) {
                break;
              }
            }
          }

          if (typeof maxResults === 'number') {
            const total = extractZoneItems(zone, response.data).items.length;
            if (total > maxResults) {
              const { truncated: newData } = truncateZoneArrays(response.data, maxResults);
              response = { ...response, data: newData };
              truncated = true;
              truncatedReason = truncatedReason ?? 'maxResults';
            }
          }

          let compactApplied = false;
          let effectiveResponse = response;
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
          const select = args.select ?? defaultSelect;

          if (args.compact || (select && select.length > 0) || args.maxItems) {
            compactApplied = true;
            const compactedData = compactZoneResponseData(response.data, {
              select,
              maxItems: args.maxItems
            });
            effectiveResponse = { ...response, data: compactedData };
          }

          const out = buildZoneDataEnvelope({
            zone,
            response: effectiveResponse,
            page: startPage,
            pageSize,
            mode,
            mcp:
              autoPaginate || truncated
                ? {
                    autoPaginate,
                    pagesFetched,
                    truncated,
                    truncatedReason,
                    nextPage
                  }
                : undefined,
            debug: debugInfo,
            compactApplied,
            select,
            maxItems: args.maxItems
          });

          return successToolResult(out);
        } catch (error) {
          return errorToolResult(error, { mode, debug: { zone } });
        }
      }
    );
  }
}
