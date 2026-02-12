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
import {
  mergeZoneResponseData,
  truncateZoneArrays,
  withDebug,
  withZoneResponseMeta
} from '../../aroflo/paginate.js';
import { compactZoneResponseData } from '../../aroflo/select.js';
import { buildZoneDataEnvelope, resolveOutputMode } from '../output.js';
import { errorToolResult, successToolResult } from './shared.js';

const stringOrStringArraySchema = z.union([z.string().min(1), z.array(z.string().min(1))]);

const inputSchema = {
  zone: z.string().min(1),
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
        'mode: data|verbose|debug|raw (default: data). ' +
        'See resource "aroflo://docs/api" for the extracted zone docs.',
      inputSchema,
      // MCP SDK expects output schemas to be object schemas (or raw object shapes).
      // `z.any()` causes output validation to crash under the current SDK.
      outputSchema: z.object({}).passthrough(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      const mode = resolveOutputMode(args);
      const envelopeRequested =
        typeof args.mode === 'string' || Boolean(args.raw) || Boolean(args.verbose);
      try {
        const where = normalizeWhereParam(args.where);
        const order = normalizeOrderParam(args.order);
        const join = normalizeJoinParam(args.join);

        if (args.validateWhere !== false) {
          await validateWhereOrThrow({ zone: args.zone, where });
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
              zone: args.zone,
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

        let response = await client.get(args.zone, {
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
          let lastPageCount = extractZoneItems(args.zone, response.data).items.length;
          while (true) {
            const total = extractZoneItems(args.zone, response.data).items.length;

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
            const next = await client.get(args.zone, {
              where,
              order,
              join,
              page: currentPage,
              pageSize,
              extra: args.extra
            });

            const nextCount = extractZoneItems(args.zone, next.data).items.length;
            if (nextCount === 0) {
              break;
            }

            response = {
              ...response,
              data: mergeZoneResponseData(response.data, next.data).merged
            };
            pagesFetched += 1;
            lastPageCount = nextCount;

            if (typeof pageSize === 'number' && nextCount < pageSize) {
              break;
            }
          }
        }

        if (typeof maxResults === 'number') {
          const total = extractZoneItems(args.zone, response.data).items.length;
          if (total > maxResults) {
            const { truncated: newData } = truncateZoneArrays(response.data, maxResults);
            response = { ...response, data: newData };
            truncated = true;
            truncatedReason = truncatedReason ?? 'maxResults';
          }
        }

        let compactApplied = false;
        let effectiveResponse = response;
        const select = args.select;

        if (args.compact || (select && select.length > 0) || args.maxItems) {
          compactApplied = true;
          const compactedData = compactZoneResponseData(response.data, {
            select,
            maxItems: args.maxItems
          });
          effectiveResponse = { ...response, data: compactedData };
        }

        // Backward compatible default: return full AroFlo response. The minimal envelope is
        // opt-in via args.mode / args.verbose / args.raw.
        if (!envelopeRequested) {
          let finalData: unknown = effectiveResponse.data;
          if (autoPaginate || truncated) {
            finalData = withZoneResponseMeta(finalData, {
              pagesFetched,
              truncated,
              truncatedReason,
              nextPage
            });
          }
          if (debugInfo) {
            finalData = withDebug(finalData, debugInfo);
          }
          return successToolResult({ ...effectiveResponse, data: finalData });
        }

        const out = buildZoneDataEnvelope({
          zone: args.zone,
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
        return errorToolResult(error, { mode, debug: { zone: args.zone } });
      }
    }
  );
}
