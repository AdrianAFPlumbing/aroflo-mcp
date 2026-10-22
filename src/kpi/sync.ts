import type { AroFloClient } from '../aroflo/client.js';
import { extractZoneItems } from '../aroflo/items.js';
import { dbConfigured, query } from '../db/db.js';
import { logger } from '../utils/logger.js';
import { portalFor } from './rules.js';
import { parseAroFloLocal, sydneyParts } from './time.js';

// Plumbing Sydney only — the dashboard never pulls other business units.
const ORG_FILTER = 'and|orgname|=|Plumbing Sydney';
const MAX_PAGES = 12;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : v === null || v === undefined ? '' : String(v).trim();
}

export interface KpiJobRow {
  jobNo: string;
  taskId: string;
  webappId: string;
  client: string;
  portal: string | null;
  custon: string;
  taskName: string;
  priorityId: string | null;
  status: string;
  substatus: string;
  receivedAt: Date | null;
  dueDate: Date | null;
  firstAssignedAt: Date | null;
  firstAssignedTo: string;
  currentAssignee: string;
  completedAt: Date | null;
  portalCloseValue: string;
  portalCloseDate: string;
}

/** Map one legacy Tasks record (joined with assignedhistory + customfields). */
export function mapTask(t: Record<string, unknown>): KpiJobRow | null {
  const jobNo = str(t['jobnumber']);
  if (!jobNo) return null;
  const client = isRecord(t['client']) ? str(t['client']['clientname']) : '';
  const ss = isRecord(t['substatus']) ? str(t['substatus']['substatus']) : '';
  const pr = str(t['priority']);

  let firstAssignedAt: Date | null = null;
  let firstAssignedTo = '';
  const current: string[] = [];
  const assigneds = Array.isArray(t['assigneds']) ? t['assigneds'] : [];
  for (const a of assigneds) {
    if (!isRecord(a)) continue;
    const who = isRecord(a['user']) ? str(a['user']['username']) : '';
    const at = parseAroFloLocal(str(a['timeassigned'])) ?? parseAroFloLocal(str(a['dateassigned']));
    if (at && (!firstAssignedAt || at < firstAssignedAt)) {
      firstAssignedAt = at;
      firstAssignedTo = who;
    }
    if (!str(a['dateunassigned']) && who && !current.includes(who)) current.push(who);
  }

  let portalCloseValue = '';
  let portalCloseDate = '';
  const cfs = Array.isArray(t['customfields']) ? t['customfields'] : [];
  for (const cf of cfs) {
    if (!isRecord(cf)) continue;
    const name = str(cf['name']).toLowerCase();
    if (name === 'close off number') portalCloseValue = str(cf['value']);
    if (name === 'close off no. date') portalCloseDate = str(cf['value']);
  }

  const status = str(t['status']);
  const done = /^(completed|archived)/i.test(status);

  return {
    jobNo,
    taskId: str(t['taskid']),
    webappId: str(t['webappEncodedID']),
    client,
    portal: portalFor(client),
    custon: str(t['custon']),
    taskName: str(t['taskname']),
    priorityId: pr && pr !== '0' ? pr : null,
    status,
    substatus: ss,
    receivedAt: parseAroFloLocal(str(t['requestdatetime'])) ?? parseAroFloLocal(str(t['requestdate'])),
    dueDate: parseAroFloLocal(str(t['duedate'])),
    firstAssignedAt,
    firstAssignedTo,
    currentAssignee: current.join(', '),
    completedAt: done ? parseAroFloLocal(str(t['completeddatetime'])) ?? parseAroFloLocal(str(t['completeddate'])) : null,
    portalCloseValue,
    portalCloseDate
  };
}

async function pullAll(client: AroFloClient, where: string[]): Promise<Record<string, unknown>[]> {
  const out: Record<string, unknown>[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const resp = await client.get('Tasks', {
      where,
      join: ['assignedhistory', 'customfields'],
      order: ['daterequested|desc'],
      page,
      pageSize: 500
    });
    const { items, currentPageResults, maxPageResults } = extractZoneItems('Tasks', resp.data);
    for (const it of items) if (isRecord(it)) out.push(it);
    if (typeof currentPageResults !== 'number' || typeof maxPageResults !== 'number' || currentPageResults < maxPageResults) break;
  }
  return out;
}

function ymd(d: Date): string {
  const p = sydneyParts(d);
  return `${p.y}-${String(p.mo).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
}

export async function upsertJob(r: KpiJobRow): Promise<void> {
  await query(
    `INSERT INTO kpi_jobs (job_no, task_id, webapp_id, client, portal, custon, task_name, priority_id, status, substatus,
        received_at, due_date, first_assigned_at, first_assigned_to, current_assignee, first_completed_at,
        latest_completed_at, portal_close_value, portal_close_date, synced_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$16,$17,$18, now())
     ON CONFLICT (job_no) DO UPDATE SET
       task_id = EXCLUDED.task_id,
       webapp_id = EXCLUDED.webapp_id,
       client = EXCLUDED.client,
       portal = EXCLUDED.portal,
       custon = EXCLUDED.custon,
       task_name = EXCLUDED.task_name,
       priority_id = EXCLUDED.priority_id,
       status = EXCLUDED.status,
       substatus = EXCLUDED.substatus,
       received_at = EXCLUDED.received_at,
       due_date = EXCLUDED.due_date,
       first_assigned_to = CASE
         WHEN kpi_jobs.first_assigned_at IS NULL OR EXCLUDED.first_assigned_at < kpi_jobs.first_assigned_at
         THEN EXCLUDED.first_assigned_to ELSE kpi_jobs.first_assigned_to END,
       first_assigned_at = LEAST(kpi_jobs.first_assigned_at, EXCLUDED.first_assigned_at),
       current_assignee = EXCLUDED.current_assignee,
       -- The FIRST completion is locked: reopening to add labour and closing again never moves it.
       first_completed_at = LEAST(kpi_jobs.first_completed_at, EXCLUDED.first_completed_at),
       latest_completed_at = COALESCE(EXCLUDED.latest_completed_at, kpi_jobs.latest_completed_at),
       portal_close_value = COALESCE(NULLIF(EXCLUDED.portal_close_value, ''), kpi_jobs.portal_close_value),
       portal_close_date = COALESCE(NULLIF(EXCLUDED.portal_close_date, ''), kpi_jobs.portal_close_date),
       synced_at = now()`,
    [
      r.jobNo, r.taskId, r.webappId, r.client, r.portal, r.custon, r.taskName, r.priorityId, r.status, r.substatus,
      r.receivedAt, r.dueDate, r.firstAssignedAt, r.firstAssignedTo, r.currentAssignee, r.completedAt,
      r.portalCloseValue, r.portalCloseDate
    ]
  );
}

let running: Promise<unknown> | null = null;

/**
 * One sync pass: every open Plumbing Sydney job, plus jobs completed since the
 * last good run (45 days on the first run). Costs ~2-5 AroFlo API calls.
 */
export async function syncKpiOnce(client: AroFloClient): Promise<{ open: number; completed: number }> {
  if (!dbConfigured()) return { open: 0, completed: 0 };
  if (running) {
    await running;
    return { open: 0, completed: 0 };
  }
  const work = (async () => {
    await query(
      `INSERT INTO kpi_sync_state (id, last_run_at) VALUES (1, now())
       ON CONFLICT (id) DO UPDATE SET last_run_at = now()`
    );
    const state = await query<{ last_ok_at: Date | null }>('SELECT last_ok_at FROM kpi_sync_state WHERE id = 1');
    const lastOk = state[0]?.last_ok_at ? new Date(state[0].last_ok_at) : null;
    const since = lastOk
      ? new Date(Math.min(lastOk.getTime() - 3 * 86_400_000, Date.now() - 3 * 86_400_000))
      : new Date(Date.now() - 45 * 86_400_000);

    try {
      // Re-tag every stored job's portal from its client name, so jobs synced before a
      // portal was added (or before a client mapping changed) are picked up.
      const clients = await query<{ client: string }>('SELECT DISTINCT client FROM kpi_jobs');
      for (const { client: c } of clients) {
        await query('UPDATE kpi_jobs SET portal = $1 WHERE client = $2 AND portal IS DISTINCT FROM $1', [portalFor(c), c]);
      }

      const open = await pullAll(client, ['and|status|IN|notstarted*inprogress*pending*quote', ORG_FILTER]);
      const done = await pullAll(client, ['and|status|IN|completed*archived', `and|datecompleted|>=|${ymd(since)}`, ORG_FILTER]);

      const seenOpen: string[] = [];
      for (const t of open) {
        const row = mapTask(t);
        if (!row) continue;
        seenOpen.push(row.jobNo);
        await upsertJob(row);
      }
      for (const t of done) {
        const row = mapTask(t);
        if (row) await upsertJob(row);
      }
      // Open jobs that vanished from AroFlo's open list but weren't seen as completed
      // (deleted or moved to another business unit) drop off the dashboard.
      if (seenOpen.length) {
        await query(
          `UPDATE kpi_jobs SET status = 'Not in AroFlo open list'
            WHERE first_completed_at IS NULL AND status NOT ILIKE 'completed%' AND status NOT ILIKE 'archived%'
              AND NOT (job_no = ANY($1)) AND synced_at < now() - interval '1 minute'`,
          [seenOpen]
        );
      }
      await query(
        `UPDATE kpi_sync_state SET last_ok_at = now(), last_error = NULL, detail = $1 WHERE id = 1`,
        [{ open: open.length, completed: done.length, since: ymd(since) }]
      );
      logger.info({ open: open.length, completed: done.length }, 'KPI sync complete');
      return { open: open.length, completed: done.length };
    } catch (err) {
      await query('UPDATE kpi_sync_state SET last_error = $1 WHERE id = 1', [err instanceof Error ? err.message : String(err)]);
      throw err;
    }
  })();
  running = work;
  try {
    return await work;
  } finally {
    running = null;
  }
}

let timer: NodeJS.Timeout | null = null;

/** Sync every KPI_SYNC_MIN minutes (default 30) between 05:30 and 19:30 Sydney time. */
export function startKpiSync(client: AroFloClient): void {
  if (!dbConfigured()) return;
  const minutes = Math.max(10, Number(process.env.KPI_SYNC_MIN || 30));
  const tick = () => {
    const p = sydneyParts(new Date());
    const mins = p.h * 60 + p.mi;
    if (mins < 330 || mins > 1170) return;
    syncKpiOnce(client).catch((err) => logger.error({ err }, 'KPI sync failed'));
  };
  setTimeout(() => {
    syncKpiOnce(client).catch((err) => logger.error({ err }, 'KPI sync failed'));
  }, 20_000);
  timer = setInterval(tick, minutes * 60_000);
  logger.info({ minutes }, 'KPI sync started');
}

export function stopKpiSync(): void {
  if (timer) clearInterval(timer);
  timer = null;
}
