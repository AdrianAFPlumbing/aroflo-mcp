import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { arofloToolOutputSchema, errorToolResult, successToolResult } from './shared.js';

const inputSchema = {
  zone: z.string().min(1),
  postxml: z.string().min(1),
  extra: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional()
};

export function registerMutateRecordTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_create_or_update_record',
    {
      title: 'AroFlo: Create/Update Record',
      description: 'Create or update a record in AroFlo using zone + postxml.',
      inputSchema,
      outputSchema: arofloToolOutputSchema,
      annotations: {
        destructiveHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const response = await client.post(args.zone, args.postxml, { extra: args.extra });
        return successToolResult(response);
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
