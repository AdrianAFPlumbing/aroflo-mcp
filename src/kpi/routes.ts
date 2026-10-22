import type { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

import type { AroFloClient } from '../aroflo/client.js';
import { query } from '../db/db.js';
import { computeKpi, pickRule, PORTAL_KEYS, PORTAL_LABEL, type KpiRule, type LegResult, type PortalKey, type WindowUnit } from './rules.js';
import { applyPortalBaseline, audit, loadRules } from './store.js';
import { syncKpiOnce } from './sync.js';
import { parseAroFloLocal } from './time.js';

export interface KpiUser {
  id: string;
  name: string;
  is_admin: boolean;
}

type Send = (res: ServerResponse, code: number, payload: unknown) => void;
type ReadBody = (req: IncomingMessage) => Promise<any>;

const UNITS: WindowUnit[] = ['minutes', 'hours', 'calendar_days', 'business_days', 'next_working_day', 'due_date'];

function iso(d: Date | null | undefined): string | null {
  return d ? new Date(d).toISOString() : null;
}

function legOut(l: LegResult, completed: boolean): { state: string; dueAt: string | null; doneAt: string | null } {
  // A completed job with no technician ever assigned has no response record at all.
  const state = completed && !l.doneAt && l.state !== 'no_kpi' ? 'not_recorded' : l.state;
  return { state, dueAt: iso(l.dueAt), doneAt: iso(l.doneAt) };
}

export function shapeJob(row: any, rules: KpiRule[], now: Date) {
  const rule = pickRule(rules, row.priority_id, row.client);
  const completedAt = row.first_completed_at ? new Date(row.first_completed_at) : null;
  const kpi = computeKpi(
    {
      receivedAt: row.received_at ? new Date(row.received_at) : null,
      dueDate: row.due_date ? new Date(row.due_date) : null,
      firstAssignedAt: row.first_assigned_at ? new Date(row.first_assigned_at) : null,
      firstCompletedAt: completedAt,
      calloutAttendedAt: row.callout && row.callout_attended_at ? new Date(row.callout_attended_at) : null
    },
    rule,
    now
  );
  const portalClosed = Boolean(row.portal_close_value);
  return {
    jobNo: row.job_no,
    webappId: row.webapp_id,
    client: row.client,
    portal: row.portal,
    portalLabel: row.portal ? PORTAL_LABEL[row.portal as PortalKey] : null,
    ref: row.custon,
    name: row.task_name,
    status: row.status,
    substatus: row.substatus,
    priorityId: row.priority_id,
    priority: rule?.label ?? null,
    ruleConfirmed: rule?.confirmed ?? false,
    hasRule: Boolean(rule && (rule.respond.unit || rule.complete.unit)),
    receivedAt: iso(row.received_at),
    clockStart: iso(kpi.clockStart),
    firstAssignedTo: row.first_assigned_to,
    assignee: row.current_assignee,
    completedAt: iso(completedAt),
    lastCompletedAt: iso(row.latest_completed_at),
    callout: row.callout,
    calloutReason: row.callout_reason,
    calloutBy: row.callout_by,
    portalClosed,
    portalCloseValue: row.portal_close_value,
    portalCloseDate: row.portal_close_date,
    respond: legOut(kpi.respond, Boolean(completedAt)),
    complete: legOut(kpi.complete, Boolean(completedAt))
  };
}

export async function handleKpi(
  req: IncomingMessage,
  res: ServerResponse,
  parts: string[],
  user: KpiUser,
  aroflo: AroFloClient,
  send: Send,
  readBody: ReadBody
): Promise<void> {
  const method = req.method || 'GET';
  const sub = parts[1] || '';

  // ---- Dashboard payload ------------------------------------------------
  if (sub === 'summary' && method === 'GET') {
    const now = new Date();
    const rules = await loadRules();
    const rows = await query<any>(
      `SELECT * FROM kpi_jobs
        WHERE (first_completed_at IS NULL AND status NOT ILIKE 'not in aroflo%')
           OR first_completed_at >= now() - interval '31 days'
           OR (portal IS NOT NULL AND first_completed_at IS NOT NULL AND portal_close_value IS NULL
               AND first_completed_at >= now() - interval '120 days')`
    );
    const jobs = rows.map((r) => shapeJob(r, rules, now));
    const queue = await query<any>(
      `SELECT id, job_no, portal, custon, status, requested_by, requested_at, claimed_at, finished_at, result, attempts
         FROM kpi_closeoffs
        WHERE status IN ('queued','in_progress') OR requested_at >= now() - interval '14 days'
        ORDER BY requested_at DESC LIMIT 400`
    );
    const sync = await query<any>('SELECT last_run_at, last_ok_at, last_error, detail FROM kpi_sync_state WHERE id = 1');
    return send(res, 200, {
      status: 'ok',
      now: now.toISOString(),
      user: { name: user.name, isAdmin: user.is_admin },
      sync: sync[0] ?? null,
      rules,
      jobs,
      queue
    });
  }

  // ---- Manual refresh (admin) ------------------------------------------
  if (sub === 'sync' && method === 'POST') {
    if (!user.is_admin) return send(res, 403, { status: 'error', message: 'Admin only' });
    const result = await syncKpiOnce(aroflo);
    await audit(null, 'manual_sync', result, user.name);
    return send(res, 200, { status: 'ok', ...result });
  }

  // ---- KPI rules (admin edits) -----------------------------------------
  if (sub === 'rules') {
    if (method === 'GET') return send(res, 200, { status: 'ok', rules: await loadRules() });
    if (!user.is_admin) return send(res, 403, { status: 'error', message: 'Admin only' });
    const b = await readBody(req);
    const unit = (u: unknown): string | null => (UNITS.includes(u as WindowUnit) ? (u as string) : null);
    const num = (v: unknown): number | null => (v === '' || v === null || v === undefined || !Number.isFinite(Number(v)) ? null : Number(v));
    if (method === 'PUT' && parts[2]) {
      const before = await query<any>('SELECT * FROM kpi_rules WHERE id = $1', [Number(parts[2])]);
      if (!before[0]) return send(res, 404, { status: 'error', message: 'Rule not found' });
      await query(
        `UPDATE kpi_rules SET label = $1, respond_value = $2, respond_unit = $3, complete_value = $4, complete_unit = $5,
                confirmed = $6, notes = $7, updated_by_name = $8, updated_at = now() WHERE id = $9`,
        [String(b.label || before[0].label), num(b.respondValue), unit(b.respondUnit), num(b.completeValue), unit(b.completeUnit),
         Boolean(b.confirmed), String(b.notes ?? ''), user.name, Number(parts[2])]
      );
      await audit(null, 'rule_edit', { id: Number(parts[2]), before: before[0], after: b }, user.name);
      return send(res, 200, { status: 'ok' });
    }
    if (method === 'POST') {
      if (!b.priorityId || !b.label) return send(res, 400, { status: 'error', message: 'priorityId and label required' });
      await query(
        `INSERT INTO kpi_rules (priority_id, client, label, respond_value, respond_unit, complete_value, complete_unit, confirmed, notes, updated_by_name)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (priority_id, client) DO NOTHING`,
        [String(b.priorityId), String(b.client || ''), String(b.label), num(b.respondValue), unit(b.respondUnit),
         num(b.completeValue), unit(b.completeUnit), Boolean(b.confirmed), String(b.notes ?? ''), user.name]
      );
      await audit(null, 'rule_add', b, user.name);
      return send(res, 200, { status: 'ok' });
    }
  }

  // ---- Callout backdate ------------------------------------------------
  // A job attended before it was received (e.g. after-hours callout, work order
  // issued next day). The attendance time starts the KPI clock and counts as the
  // response. It must be BEFORE the job was received, and a reason is required.
  if (sub === 'callout') {
    if (method === 'POST') {
      const b = await readBody(req);
      const jobNo = String(b.jobNo || '').trim();
      const reason = String(b.reason || '').trim();
      const attendedAt = parseAroFloLocal(String(b.attendedAt || ''));
      if (!jobNo || !attendedAt || reason.length < 5) {
        return send(res, 400, { status: 'error', message: 'Job number, attended date/time and a reason are required.' });
      }
      const job = (await query<any>('SELECT job_no, received_at FROM kpi_jobs WHERE job_no = $1', [jobNo]))[0];
      if (!job) return send(res, 404, { status: 'error', message: `Job ${jobNo} is not on the dashboard yet.` });
      if (attendedAt.getTime() > Date.now()) return send(res, 400, { status: 'error', message: 'Attended time cannot be in the future.' });
      if (job.received_at) {
        const rec = new Date(job.received_at).getTime();
        if (attendedAt.getTime() >= rec) {
          return send(res, 400, { status: 'error', message: 'A callout backdate must be before the job was received. If we attended after it was received, the normal KPI applies.' });
        }
        if (rec - attendedAt.getTime() > 7 * 86_400_000) {
          return send(res, 400, { status: 'error', message: 'Attended time is more than 7 days before the job was received. Check the date.' });
        }
      }
      await query(
        `UPDATE kpi_jobs SET callout = true, callout_attended_at = $1, callout_reason = $2, callout_by = $3, callout_set_at = now()
          WHERE job_no = $4`,
        [attendedAt, reason, user.name, jobNo]
      );
      await audit(jobNo, 'callout_set', { attendedAt: attendedAt.toISOString(), reason }, user.name);
      return send(res, 200, { status: 'ok' });
    }
    if (method === 'DELETE' && parts[2]) {
      const jobNo = parts[2];
      const job = (await query<any>('SELECT callout_by FROM kpi_jobs WHERE job_no = $1', [jobNo]))[0];
      if (!job) return send(res, 404, { status: 'error', message: 'Not found' });
      if (!user.is_admin && job.callout_by !== user.name) return send(res, 403, { status: 'error', message: 'Only the person who set it or an admin can remove it.' });
      await query(
        `UPDATE kpi_jobs SET callout = false, callout_attended_at = NULL, callout_reason = NULL, callout_by = NULL, callout_set_at = NULL
          WHERE job_no = $1`,
        [jobNo]
      );
      await audit(jobNo, 'callout_cleared', {}, user.name);
      return send(res, 200, { status: 'ok' });
    }
  }

  // ---- Close-off queue ---------------------------------------------------
  if (sub === 'closeoff') {
    if (method === 'POST') {
      const b = await readBody(req);
      const jobNos: string[] = (Array.isArray(b.jobNos) ? b.jobNos : [b.jobNo]).map((x: unknown) => String(x || '').trim()).filter(Boolean);
      if (!jobNos.length) return send(res, 400, { status: 'error', message: 'No jobs given' });
      const results: { jobNo: string; queued: boolean; reason?: string }[] = [];
      for (const jobNo of jobNos.slice(0, 100)) {
        const job = (await query<any>('SELECT * FROM kpi_jobs WHERE job_no = $1', [jobNo]))[0];
        if (!job) { results.push({ jobNo, queued: false, reason: 'not on dashboard' }); continue; }
        if (!job.portal) { results.push({ jobNo, queued: false, reason: 'client has no portal' }); continue; }
        if (!job.first_completed_at) { results.push({ jobNo, queued: false, reason: 'not completed in AroFlo' }); continue; }
        if (job.portal_close_value) { results.push({ jobNo, queued: false, reason: `already ${job.portal_close_value}` }); continue; }
        const open = await query('SELECT 1 FROM kpi_closeoffs WHERE job_no = $1 AND status IN (\'queued\',\'in_progress\')', [jobNo]);
        if (open.length) { results.push({ jobNo, queued: false, reason: 'already queued' }); continue; }
        await query(
          `INSERT INTO kpi_closeoffs (id, job_no, portal, custon, status, requested_by) VALUES ($1,$2,$3,$4,'queued',$5)`,
          [randomUUID(), jobNo, job.portal, job.custon, user.name]
        );
        await audit(jobNo, 'closeoff_queued', { portal: job.portal }, user.name);
        results.push({ jobNo, queued: true });
      }
      return send(res, 200, { status: 'ok', results });
    }
    if (method === 'DELETE' && parts[2]) {
      const row = (await query<any>('SELECT * FROM kpi_closeoffs WHERE id = $1', [parts[2]]))[0];
      if (!row) return send(res, 404, { status: 'error', message: 'Not found' });
      if (row.status !== 'queued') return send(res, 400, { status: 'error', message: 'Only queued close-offs can be cancelled' });
      await query(`UPDATE kpi_closeoffs SET status = 'cancelled', finished_at = now(), result = $1 WHERE id = $2`, [`Cancelled by ${user.name}`, parts[2]]);
      await audit(row.job_no, 'closeoff_cancelled', {}, user.name);
      return send(res, 200, { status: 'ok' });
    }
  }

  // ---- Portal export baseline (admin) ------------------------------------
  if (sub === 'baseline' && method === 'POST') {
    if (!user.is_admin) return send(res, 403, { status: 'error', message: 'Admin only' });
    const b = await readBody(req);
    const portals: string[] = (Array.isArray(b.portals) ? b.portals : []).filter((p: string) => PORTAL_KEYS.includes(p as PortalKey));
    const refs: string[] = Array.isArray(b.openRefs) ? b.openRefs.map(String) : [];
    if (!portals.length) return send(res, 400, { status: 'error', message: 'Pick at least one portal the export covers' });
    if (refs.length < 1) return send(res, 400, { status: 'error', message: 'No order numbers found in the file' });
    const results = [];
    for (const p of portals) results.push(await applyPortalBaseline(p, refs, String(b.exportDate || ''), Boolean(b.dryRun), user.name));
    return send(res, 200, { status: 'ok', refs: new Set(refs).size, results });
  }

  // ---- Audit trail for one job ------------------------------------------
  if (sub === 'audit' && method === 'GET') {
    const u = new URL(req.url || '', 'http://x');
    const jobNo = u.searchParams.get('jobNo');
    const rows = await query(
      jobNo
        ? 'SELECT job_no, action, detail, by_name, at FROM kpi_audit WHERE job_no = $1 ORDER BY at DESC LIMIT 100'
        : 'SELECT job_no, action, detail, by_name, at FROM kpi_audit ORDER BY at DESC LIMIT 200',
      jobNo ? [jobNo] : []
    );
    return send(res, 200, { status: 'ok', audit: rows });
  }

  return send(res, 404, { status: 'error', message: 'Unknown KPI route' });
}
