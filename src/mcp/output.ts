import type { AroFloClientResponse } from '../aroflo/types.js';
import { extractZoneItems } from '../aroflo/items.js';
import { zoneToToolSuffix } from '../aroflo/zones.js';

export type OutputMode = 'data' | 'verbose' | 'debug' | 'raw';

export function resolveOutputMode(args: {
  mode?: string;
  verbose?: boolean;
  debug?: boolean;
  raw?: boolean;
}): OutputMode {
  const m = (args.mode ?? '').toLowerCase();
  if (m === 'data' || m === 'verbose' || m === 'debug' || m === 'raw') {
    return m;
  }
  if (args.raw) return 'raw';
  if (args.debug) return 'debug';
  if (args.verbose) return 'verbose';
  return 'data';
}

export interface McpPaginationMeta {
  autoPaginate?: boolean;
  pagesFetched?: number;
  truncated?: boolean;
  truncatedReason?: string;
  nextPage?: number;
}

export function buildZoneDataEnvelope(options: {
  zone: string;
  response: AroFloClientResponse;
  // The requested page inputs (not whatever AroFlo echoes back).
  page: number;
  pageSize?: number;
  mode: OutputMode;
  mcp?: McpPaginationMeta;
  debug?: Record<string, unknown>;
  compactApplied?: boolean;
  select?: string[];
  maxItems?: number;
}): Record<string, unknown> {
  const extracted = extractZoneItems(options.zone, options.response.data);
  const items = extracted.items;

  const hasMore = (() => {
    if (options.mcp?.truncated && typeof options.mcp.nextPage === 'number') {
      return true;
    }
    if (options.mcp?.autoPaginate) {
      return false;
    }
    if (typeof options.pageSize === 'number') {
      return items.length >= options.pageSize;
    }
    // No pageSize: we can't infer more pages.
    return false;
  })();

  const nextPage =
    options.mcp?.truncated && typeof options.mcp.nextPage === 'number'
      ? options.mcp.nextPage
      : !options.mcp?.autoPaginate && hasMore
        ? options.page + 1
        : undefined;

  const expectedKey = zoneToToolSuffix(options.zone);
  const itemsKey =
    extracted.itemsKey && extracted.itemsKey !== expectedKey ? extracted.itemsKey : undefined;

  const out: Record<string, unknown> = {
    zone: options.zone,
    items,
    page: options.page,
    count: items.length,
    hasMore
  };

  if (typeof options.pageSize === 'number') {
    out.pageSize = options.pageSize;
  }
  if (typeof nextPage === 'number') {
    out.nextPage = nextPage;
  }
  if (itemsKey) {
    out.itemsKey = itemsKey;
  }
  if (typeof extracted.maxPageResults === 'number') {
    out.maxPageResults = extracted.maxPageResults;
  }
  if (options.mcp && (options.mcp.pagesFetched || options.mcp.truncated)) {
    out.mcp = options.mcp;
  }

  if (options.mode === 'verbose' || options.mode === 'debug' || options.mode === 'raw') {
    const meta: Record<string, unknown> = {
      httpStatus: options.response.httpStatus,
      rateLimits: options.response.rateLimits
    };

    const server = options.response.headers['aroflo-server'] ?? options.response.headers['server'];
    if (server) meta.server = server;
    const date = options.response.headers['date'];
    if (date) meta.date = date;

    // Only include AroFlo status noise on verbose+.
    if (typeof options.response.status !== 'undefined' && String(options.response.status) !== '0') {
      meta.status = options.response.status;
    }
    if (options.response.statusMessage && options.response.statusMessage !== 'Login OK') {
      meta.statusMessage = options.response.statusMessage;
    }

    out.meta = meta;
  }

  if (options.mode === 'debug' || options.mode === 'raw') {
    out.debug = {
      ...(options.debug ?? {}),
      compactApplied: options.compactApplied ?? false,
      select: options.select,
      maxItems: options.maxItems
    };
  }

  if (options.mode === 'raw') {
    out.rawArofloResponse = options.response;
  }

  return out;
}

export function buildMutationEnvelope(options: {
  zone: string;
  response: AroFloClientResponse;
  mode: OutputMode;
  debug?: Record<string, unknown>;
}): Record<string, unknown> {
  const out: Record<string, unknown> = { zone: options.zone, ok: true };

  // Try to extract postresults, which is the typical AroFlo POST response.
  const data = options.response.data as any;
  const postresults = data?.zoneresponse?.postresults;
  if (postresults) {
    out.result = {
      updatetotal: postresults.updatetotal,
      inserttotal: postresults.inserttotal,
      errors: postresults.errors,
      updates: postresults.updates,
      inserts: postresults.inserts
    };
  }

  if (options.mode === 'verbose' || options.mode === 'debug' || options.mode === 'raw') {
    out.meta = {
      httpStatus: options.response.httpStatus,
      rateLimits: options.response.rateLimits
    };
  }

  if (options.mode === 'debug' || options.mode === 'raw') {
    out.debug = options.debug ?? {};
  }

  if (options.mode === 'raw') {
    out.rawArofloResponse = options.response;
  }

  return out;
}
