import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { dbConfigured, query } from '../../db/db.js';
import { PORTAL_KEYS, PORTAL_LABEL, PORTAL_SKILL, type PortalKey } from '../../kpi/rules.js';
import { applyPortalBaseline, audit } from '../../kpi/store.js';
import { formatSydney } from '../../kpi/time.js';
import { errorToolResult, successToolResult } from './shared.js';

/**
 * Tools the close-off runner (a scheduled task on Adrian's laptop) uses to work
 * through the portal close-off queue that the team fills from the KPI dashboard.
 */
export function registerCloseoffTools(server: McpServer): void {
  server.registerTool(
    'afp_closeoff_claim',
    {
      title: 'AFP: Claim queued portal close-offs',
      description:
        'Claim the portal close-offs queued from the AFP KPI dashboard (marks them in_progress). Returns each job with its ' +
        'portal, client reference (WR / service order / BSAFE WO), the FIRST AroFlo completion time and the skill to run. ' +
        'Close-offs stuck in_progress for over 3 hours are re-queued first. Call afp_closeoff_report for EVERY claimed item.',
      inputSchema: {
        portal: z.enum(PORTAL_KEYS as [PortalKey, ...PortalKey[]]).optional(),
        limit: z.number().int().positive().max(50).optional()
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false }
    },
    async (args) => {
      try {
        if (!dbConfigured()) throw new Error('Database not configured');
        await query(
          `UPDATE kpi_closeoffs SET status = 'queued', claimed_at = NULL
            WHERE status = 'in_progress' AND claimed_at < now() - interval '3 hours'`
        );
        const rows = await query<any>(
          `UPDATE kpi_closeoffs SET status = 'in_progress', claimed_at = now(), attempts = attempts + 1
            WHERE id IN (
              SELECT id FROM kpi_closeoffs WHERE status = 'queued' ${args.portal ? 'AND portal = $2' : ''}
               ORDER BY portal, requested_at LIMIT $1 FOR UPDATE SKIP LOCKED)
            RETURNING id, job_no, portal, custon, requested_by, requested_at, attempts`,
          args.portal ? [args.limit ?? 25, args.portal] : [args.limit ?? 25]
        );
        const items = [];
        for (const r of rows) {
          const job = (await query<any>('SELECT * FROM kpi_jobs WHERE job_no = $1', [r.job_no]))[0] ?? {};
          items.push({
            id: r.id,
            jobNumber: r.job_no,
            taskId: job.task_id,
            client: job.client,
            clientRef: r.custon,
            portal: r.portal,
            portalName: PORTAL_LABEL[r.portal as PortalKey],
            skill: PORTAL_SKILL[r.portal as PortalKey],
            firstCompletedInAroFlo: formatSydney(job.first_completed_at ? new Date(job.first_completed_at) : null),
            firstAssignedInAroFlo: formatSydney(job.first_assigned_at ? new Date(job.first_assigned_at) : null),
            callout: job.callout
              ? { attended: formatSydney(new Date(job.callout_attended_at)), reason: job.callout_reason }
              : null,
            requestedBy: r.requested_by,
            attempt: r.attempts
          });
        }
        return successToolResult({
          claimed: items.length,
          items,
          rules:
            'Use the real AroFlo attendance and completion times. If a portal will only accept times inside a KPI window ' +
            'that the real times do not fit, do NOT invent times: report outcome needs_adrian with the reason. ' +
            'If a portal login or MFA prompt appears, report needs_adrian ("login required"). ' +
            'Items whose skill is null have no recorded close-off procedure yet: do not attempt them, report needs_adrian ("no close-off procedure for <portal> yet").'
        });
      } catch (error) {
        return errorToolResult(error, { mode: 'data', debug: { tool: 'afp_closeoff_claim' } });
      }
    }
  );

  server.registerTool(
    'afp_portal_baseline',
    {
      title: 'AFP: Load a portal open-orders export as the close-off baseline',
      description:
        'Given the full list of orders still OPEN in one client portal (from a portal export), mark every job on the KPI ' +
        'dashboard for that portal that is completed in AroFlo but NOT in the open list as already closed in the portal. ' +
        'Jobs in the open list stay as "awaiting close-off". Jobs with no client reference are left alone. Use dryRun first.',
      inputSchema: {
        portal: z.enum(PORTAL_KEYS as [PortalKey, ...PortalKey[]]),
        openRefs: z.array(z.string().min(3)).describe('Every order/WR number still open in the portal export'),
        exportDate: z.string().describe('Date of the export, DD/MM/YYYY'),
        dryRun: z.boolean().optional()
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: false, idempotentHint: true, openWorldHint: false }
    },
    async (args) => {
      try {
        return successToolResult({ ...(await applyPortalBaseline(args.portal, args.openRefs, args.exportDate, Boolean(args.dryRun), 'Portal export import')) });
      } catch (error) {
        return errorToolResult(error, { mode: 'data', debug: { tool: 'afp_portal_baseline' } });
      }
    }
  );

  server.registerTool(
    'afp_closeoff_report',
    {
      title: 'AFP: Report a portal close-off result',
      description:
        'Record the outcome of one claimed close-off. done = closed in the client portal and confirmed on screen; ' +
        'needs_adrian = blocked (login/MFA, KPI time conflict, unusual portal status); failed = error, will be retried ' +
        'on the next run (up to 3 attempts); skipped = nothing to do (already closed, stopped, not found). ' +
        'On done the dashboard records the job as PORTAL CLOSED.',
      inputSchema: {
        id: z.string().min(1),
        outcome: z.enum(['done', 'needs_adrian', 'failed', 'skipped']),
        note: z.string().min(1).describe('One line: what was entered (times) or why it did not close'),
        portalStamp: z.enum(['PORTAL CLOSED', 'STOPPED']).optional()
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: false, idempotentHint: true, openWorldHint: false }
    },
    async (args) => {
      try {
        const row = (await query<any>('SELECT * FROM kpi_closeoffs WHERE id = $1', [args.id]))[0];
        if (!row) throw new Error(`Close-off ${args.id} not found`);
        const retry = args.outcome === 'failed' && row.attempts < 3;
        const status = retry ? 'queued' : args.outcome;
        await query(
          `UPDATE kpi_closeoffs SET status = $1, result = $2, finished_at = CASE WHEN $1 = 'queued' THEN NULL ELSE now() END,
                  claimed_at = CASE WHEN $1 = 'queued' THEN NULL ELSE claimed_at END
            WHERE id = $3`,
          [status, args.note, args.id]
        );
        if (args.outcome === 'done' || (args.outcome === 'skipped' && args.portalStamp)) {
          const d = new Date();
          const stamp = args.portalStamp ?? 'PORTAL CLOSED';
          const date = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
          await query('UPDATE kpi_jobs SET portal_close_value = $1, portal_close_date = $2 WHERE job_no = $3', [stamp, date, row.job_no]);
        }
        await audit(row.job_no, `closeoff_${status}`, { note: args.note }, 'Close-off runner');
        return successToolResult({ id: args.id, jobNumber: row.job_no, status });
      } catch (error) {
        return errorToolResult(error, { mode: 'data', debug: { tool: 'afp_closeoff_report' } });
      }
    }
  );
}
