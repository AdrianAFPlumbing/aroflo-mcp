import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { arofloToolOutputSchema, errorToolResult, successToolResult } from './shared.js';

const inputSchema = {
  zone: z.string().min(1),
  idField: z.string().min(1),
  // JSON Schema cannot represent BigInt, so accept string/number only.
  // For large numeric IDs, pass them as strings.
  idValue: z.union([z.string().min(1), z.number()]),
  extraWhere: z.array(z.string().min(1)).optional()
};

export function registerGetRecordTool(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_get_record',
    {
      title: 'AroFlo: Get Record',
      description: 'Fetch one specific AroFlo record by zone and ID field/value.',
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
        const where = [`and|${args.idField}|=|${String(args.idValue)}`, ...(args.extraWhere ?? [])];

        const response = await client.get(args.zone, {
          where,
          page: 1,
          pageSize: 1
        });

        return successToolResult(response);
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
