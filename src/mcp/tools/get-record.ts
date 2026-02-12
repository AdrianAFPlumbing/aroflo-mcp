import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { buildZoneDataEnvelope, resolveOutputMode } from '../output.js';
import { errorToolResult, successToolResult } from './shared.js';

const stringOrStringArraySchema = z.union([z.string().min(1), z.array(z.string().min(1))]);

const inputSchema = {
  zone: z.string().min(1),
  idField: z.string().min(1),
  // JSON Schema cannot represent BigInt, so accept string/number only.
  // For large numeric IDs, pass them as strings.
  idValue: z.union([z.string().min(1), z.number()]),
  extraWhere: stringOrStringArraySchema.optional(),
  mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
  verbose: z.boolean().optional(),
  debug: z.boolean().optional(),
  raw: z.boolean().optional()
};

export function registerGetRecordTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_get_record',
    {
      title: 'AroFlo: Get Record',
      description:
        'Fetch one specific AroFlo record by zone and ID field/value. ' +
        'Use extraWhere for additional pipe-delimited clauses like "and|archived|=|false".',
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
        const extraWhere =
          typeof args.extraWhere === 'string' ? [args.extraWhere] : args.extraWhere;
        const where = [`and|${args.idField}|=|${String(args.idValue)}`, ...(extraWhere ?? [])];

        const response = await client.get(args.zone, {
          where,
          page: 1,
          pageSize: 1
        });

        const out = buildZoneDataEnvelope({
          zone: args.zone,
          response,
          page: 1,
          pageSize: 1,
          mode,
          debug:
            mode === 'debug' || mode === 'raw'
              ? {
                  zone: args.zone,
                  normalizedParams: { where, page: 1, pageSize: 1 }
                }
              : undefined
        });

        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, { mode, debug: { zone: args.zone, idField: args.idField } });
      }
    }
  );
}
