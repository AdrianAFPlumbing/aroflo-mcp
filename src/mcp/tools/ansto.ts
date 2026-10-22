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
import type { AroFloV2Client } from '../../aroflo/v2-client.js';
import { attachPdfToJob, backfillPoPdfs } from '../../aroflo/ansto-po-pdf.js';
import { errorToolResult, successToolResult } from './shared.js';

export function registerAnstoTools(
  server: McpServer,
  client: AroFloClient,
  v2Client?: AroFloV2Client
): void {
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
          return successToolResult(
            await processPoTask(client, task, { dryRun: args.dryRun, v2: v2Client })
          );
        }
        if (args.poText) {
          return successToolResult(
            await processPoText(client, args.poText, { dryRun: args.dryRun, v2: v2Client })
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
        'Finds recent ANSTO tasks that carry a SAP PO PDF (4300xxxxxx.pdf) but no 7-digit Work Order No as Cust ON (raw imports, "[UNMATCHED ANSTO PO ...]", "[NOT A JOB ...]") and processes each with the PO PDF: pairs to the existing WO job or converts the import into the job. Safe to run daily. dryRun previews without writing. ' +
        'Imports created before the "ANSTO Order No" custom field existed are listed in legacySkipped and not processed unless includeLegacy=true (handle one by hand with aroflo_ansto_process_po - its Order No is recorded as a task note).',
      inputSchema: {
        dryRun: z.boolean().optional(),
        pages: z.number().int().positive().max(5).optional(),
        includeLegacy: z.boolean().optional()
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { destructiveHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        return successToolResult(
          await sweepPoTasks(client, {
            dryRun: args.dryRun,
            pages: args.pages,
            includeLegacy: args.includeLegacy,
            v2: v2Client
          })
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

  if (!v2Client) return;

  server.registerTool(
    'aroflo_ansto_backfill_po_pdfs',
    {
      title: 'AroFlo: Attach ANSTO PO PDFs to jobs',
      description:
        'For each {jobnumber, po}: finds the PO PDF (4300xxxxxx.pdf) on any recent ANSTO task in AroFlo and attaches it to the job if not already attached (APIv2 upload, verified). PDFs that only exist in email return pdf-not-in-aroflo - attach those with aroflo_ansto_attach_pdf.',
      inputSchema: {
        items: z
          .array(
            z.object({
              jobnumber: z.string().regex(/^\d{6}$/),
              po: z.string().regex(/^4300\d{6}$/)
            })
          )
          .min(1)
          .max(100)
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { destructiveHint: false, openWorldHint: true }
    },
    async (args) => {
      try {
        const results = await backfillPoPdfs(client, v2Client, args.items);
        const counts: Record<string, number> = {};
        for (const r of results) counts[r.outcome] = (counts[r.outcome] ?? 0) + 1;
        return successToolResult({ counts, results });
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );

  server.registerTool(
    'aroflo_ansto_attach_pdf',
    {
      title: 'AroFlo: Attach a PDF to a job',
      description:
        'Uploads a PDF (base64) to an AroFlo job via APIv2, skipping it if a file with the same name is already attached. Use for ANSTO PO PDFs taken from the email when the PDF is not in AroFlo.',
      inputSchema: {
        jobnumber: z.string().regex(/^\d{6}$/),
        fileName: z.string().min(5),
        pdfBase64: z.string().min(100)
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { destructiveHint: false, openWorldHint: true }
    },
    async (args) => {
      try {
        const bytes = new Uint8Array(Buffer.from(args.pdfBase64, 'base64'));
        return successToolResult(
          await attachPdfToJob(
            client,
            v2Client,
            { jobnumber: args.jobnumber },
            {
              fileName: args.fileName,
              bytes
            }
          )
        );
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
