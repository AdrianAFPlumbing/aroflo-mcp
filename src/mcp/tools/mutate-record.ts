import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { buildMutationEnvelope, resolveOutputMode } from '../output.js';
import { errorToolResult, successToolResult } from './shared.js';

const inputSchema = {
  zone: z.string().min(1),
  postxml: z.string().min(1),
  extra: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
  verbose: z.boolean().optional(),
  debug: z.boolean().optional(),
  raw: z.boolean().optional()
};

export function registerMutateRecordTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_create_or_update_record',
    {
      title: 'AroFlo: Create/Update Record',
      description: 'Create or update a record in AroFlo using zone + postxml.',
      inputSchema,
      // MCP SDK expects output schemas to be object schemas (or raw object shapes).
      // `z.any()` causes output validation to crash under the current SDK.
      outputSchema: z.object({}).passthrough(),
      annotations: {
        destructiveHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      const mode = resolveOutputMode(args);
      const envelopeRequested =
        typeof args.mode === 'string' || Boolean(args.raw) || Boolean(args.verbose);
      try {
        const response = await client.post(args.zone, args.postxml, { extra: args.extra });
        if (!envelopeRequested) {
          return successToolResult(response);
        }
        const out = buildMutationEnvelope({
          zone: args.zone,
          response,
          mode,
          debug:
            mode === 'debug' || mode === 'raw'
              ? {
                  zone: args.zone
                }
              : undefined
        });
        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, { mode, debug: { zone: args.zone } });
      }
    }
  );
}
