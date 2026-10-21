import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { findClient, loadClients } from '../../aroflo/client-match.js';
import type { AroFloClient } from '../../aroflo/client.js';
import { errorToolResult, successToolResult } from './shared.js';

export function registerClientMatchTools(server: McpServer, legacy: AroFloClient): void {
  server.registerTool(
    'aroflo_find_client',
    {
      title: 'AroFlo: Find client (fuzzy)',
      description:
        'Resolve an AroFlo client from a company name and/or the sender email address, tolerating "Pty Ltd", punctuation, ' +
        'word-order and spelling differences, and matching on the email DOMAIN of the client or any of its contacts. ' +
        'Returns ranked matches with a confidence flag. ALWAYS call this before creating a client: only create one when ' +
        '`confident` is false AND no match scores >= 0.6. Reads the active client list (cached 10 min).',
      inputSchema: {
        name: z.string().optional().describe('Company name as best you can read it from the email'),
        senderEmail: z
          .string()
          .optional()
          .describe('The real external sender address (not an AFP forwarder)'),
        limit: z.number().int().positive().max(20).optional(),
        refresh: z
          .boolean()
          .optional()
          .describe('Force a reload of the client list (after creating a client)')
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        if (!args.name && !args.senderEmail) {
          throw new Error('Provide name and/or senderEmail');
        }
        if (args.refresh) await loadClients(legacy, true);
        const result = await findClient(legacy, {
          name: args.name,
          senderEmail: args.senderEmail,
          limit: args.limit
        });
        return successToolResult({
          query: { name: args.name, senderEmail: args.senderEmail },
          confident: result.confident,
          best: result.best,
          matches: result.matches,
          totalClients: result.totalClients,
          guidance: result.confident
            ? 'Use best.clientid. Do NOT create a client.'
            : result.matches.length
              ? 'Ambiguous or weak match - pick the obvious one if the names clearly refer to the same company, otherwise note it for verification. Do NOT create a client when a match scores >= 0.6.'
              : 'No plausible existing client - creating one is acceptable.'
        });
      } catch (error) {
        return errorToolResult(error, {
          mode: 'data',
          debug: { tool: 'aroflo_find_client', args }
        });
      }
    }
  );
}
