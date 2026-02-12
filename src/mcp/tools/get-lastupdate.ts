import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { buildZoneDataEnvelope, resolveOutputMode } from '../output.js';
import { errorToolResult, successToolResult } from './shared.js';

const inputSchema = {
  zoneName: z.string().min(1).optional(),
  sinceUtc: z.string().min(1).optional(),
  orderDirection: z.enum(['asc', 'desc']).default('asc'),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(500).optional(),
  mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
  verbose: z.boolean().optional(),
  debug: z.boolean().optional(),
  raw: z.boolean().optional()
};

export function registerGetLastUpdateTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_get_lastupdate',
    {
      title: 'AroFlo: Get LastUpdate',
      description: 'Query the AroFlo lastupdate zone for incremental sync workflows.',
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

        if (!envelopeRequested) {
          return successToolResult(response);
        }

        const out = buildZoneDataEnvelope({
          zone: 'LastUpdate',
          response,
          page: args.page,
          pageSize: args.pageSize,
          mode,
          debug:
            mode === 'debug' || mode === 'raw'
              ? {
                  zone: 'LastUpdate',
                  normalized: {
                    where,
                    order: [`lastupdateutc|${args.orderDirection}`],
                    page: args.page,
                    pageSize: args.pageSize
                  }
                }
              : undefined
        });

        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, { mode, debug: { zone: 'LastUpdate' } });
      }
    }
  );
}
