import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import {
  getTaskByJobNumber,
  parseAnstoPoText,
  processPoTask,
  processPoText,
  sweepPoTasks
} from '../../aroflo/ansto-po.js';
import { errorToolResult, successToolResult } from './shared.js';

export function registerAnstoTools(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_ansto_process_po',
    {
      title: 'AroFlo: Process ANSTO SAP Purchase Order',
      description:
        'Reads an ANSTO SAP Purchase Order (4300xxxxxx) and pairs it with the job that carries the same 7-digit Work Order No, or raises the job if none exists. ' +
        'Pass jobnumber (an AroFlo task with the PO PDF attached - the PDF is downloaded from AroFlo and read) OR poText (the text of the PO PDF, e.g. read from the email attachment). ' +
        'Outcomes: paired-with-existing (Order No written to the primary task\'s "ANSTO Order No" field, PO import archived as [DUPLICATE OF JN ...]), converted-to-primary, created-primary, wo-not-readable. Use dryRun to preview.',
      inputSchema: {
        jobnumber: z
          .string()
          .regex(/^\d{6}$/)
          .optional(),
        poText: z.string().min(20).optional(),
        dryRun: z.boolean().optional()
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { destructiveHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        if (args.jobnumber) {
          const task = await getTaskByJobNumber(client, args.jobnumber);
          if (!task) {
            return successToolResult({ outcome: 'not-found', jobnumber: args.jobnumber });
          }
          return successToolResult(await processPoTask(client, task, { dryRun: args.dryRun }));
        }
        if (args.poText) {
          return successToolResult(
            await processPoText(client, args.poText, { dryRun: args.dryRun })
          );
        }
        return successToolResult({ outcome: 'error', note: 'Provide jobnumber or poText' });
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );

  server.registerTool(
    'aroflo_ansto_sweep_po_tasks',
    {
      title: 'AroFlo: Sweep unmatched ANSTO PO imports',
      description:
        'Finds recent ANSTO tasks that carry a SAP PO PDF (4300xxxxxx.pdf) but no 7-digit Work Order No as Cust ON (raw imports, "[UNMATCHED ANSTO PO ...]", "[NOT A JOB ...]") and processes each with the PO PDF: pairs to the existing WO job or converts the import into the job. Safe to run daily. dryRun previews without writing.',
      inputSchema: {
        dryRun: z.boolean().optional(),
        pages: z.number().int().positive().max(5).optional()
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { destructiveHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        return successToolResult(
          await sweepPoTasks(client, { dryRun: args.dryRun, pages: args.pages })
        );
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );

  server.registerTool(
    'aroflo_ansto_parse_po_text',
    {
      title: 'AroFlo: Parse ANSTO PO text (no writes)',
      description:
        'Parses ANSTO SAP Purchase Order PDF text into Order No, Work Order No, line items, contact and building. Read-only helper.',
      inputSchema: { poText: z.string().min(20) },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: true }
    },
    async (args) => successToolResult(parseAnstoPoText(args.poText))
  );
}
