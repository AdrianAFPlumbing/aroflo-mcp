import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import {
  normalizeJoinParam,
  normalizeOrderParam,
  normalizeWhereParam
} from '../../aroflo/normalize-params.js';
import {
  countZoneArrays,
  getZoneResponse,
  mergeZoneResponseData,
  truncateZoneArrays,
  withDebug,
  withZoneResponseMeta
} from '../../aroflo/paginate.js';
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
  autoPaginate: z.boolean().optional(),
  maxResults: z.number().int().positive().max(5000).optional(),
  debug: z.boolean().optional(),
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

        const autoPaginate = Boolean(args.autoPaginate);
        const startPage = args.page ?? 1;
        const pageSize = args.pageSize ?? (autoPaginate ? 200 : undefined);
        const maxResults = args.maxResults;

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
        let nextPage: number | undefined;

        if (autoPaginate) {
          let currentPage = startPage;
          while (true) {
            const zr = getZoneResponse(response.data);
            const total = zr ? countZoneArrays(zr) : 0;

            if (typeof maxResults === 'number' && total >= maxResults) {
              truncated = true;
              nextPage = currentPage + 1;
              break;
            }

            const mainArrayLen = zr ? total : 0;
            if (typeof pageSize === 'number' && mainArrayLen < pageSize) {
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

            pagesFetched += 1;

            const nextZr = getZoneResponse(next.data);
            const nextCount = nextZr ? countZoneArrays(nextZr) : 0;
            if (nextCount === 0) {
              break;
            }

            response = { ...response, data: mergeZoneResponseData(response.data, next.data).merged };

            if (typeof pageSize === 'number' && nextCount < pageSize) {
              break;
            }
          }
        }

        if (typeof maxResults === 'number') {
          const zr = getZoneResponse(response.data);
          const total = zr ? countZoneArrays(zr) : 0;
          if (total > maxResults) {
            const { truncated: newData } = truncateZoneArrays(response.data, maxResults);
            response = { ...response, data: newData };
            truncated = true;
          }
        }

        if (args.compact || (args.select && args.select.length > 0) || args.maxItems) {
          let compactedData: unknown = compactZoneResponseData(response.data, {
            select: args.select,
            maxItems: args.maxItems
          });
          if (autoPaginate || truncated) {
            compactedData = withZoneResponseMeta(compactedData, { pagesFetched, truncated, nextPage });
          }
          if (debugInfo) {
            compactedData = withDebug(compactedData, debugInfo);
          }
          return successToolResult({ ...response, data: compactedData });
        }

        if (autoPaginate || debugInfo || truncated) {
          let finalData: unknown = response.data;
          if (autoPaginate || truncated) {
            finalData = withZoneResponseMeta(finalData, { pagesFetched, truncated, nextPage });
          }
          if (debugInfo) {
            finalData = withDebug(finalData, debugInfo);
          }
          return successToolResult({ ...response, data: finalData });
        }

        return successToolResult(response);
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
