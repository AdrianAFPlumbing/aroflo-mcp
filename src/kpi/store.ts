import { query } from '../db/db.js';
import { SEED_RULES, type KpiRule, type WindowUnit } from './rules.js';

export async function initKpiSchema(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS kpi_rules (
      id              serial PRIMARY KEY,
      priority_id     text NOT NULL,
      client          text NOT NULL DEFAULT '',
      label           text NOT NULL,
      respond_value   numeric,
      respond_unit    text,
      complete_value  numeric,
      complete_unit   text,
      confirmed       boolean NOT NULL DEFAULT false,
      notes           text NOT NULL DEFAULT '',
      updated_by_name text,
      updated_at      timestamptz NOT NULL DEFAULT now(),
      UNIQUE (priority_id, client)
    );

    CREATE TABLE IF NOT EXISTS kpi_jobs (
      job_no              text PRIMARY KEY,
      task_id             text,
      webapp_id           text,
      client              text NOT NULL DEFAULT '',
      portal              text,
      custon              text,
      task_name           text,
      priority_id         text,
      status              text,
      substatus           text,
      received_at         timestamptz,
      due_date            timestamptz,
      first_assigned_at   timestamptz,
      first_assigned_to   text,
      current_assignee    text,
      first_completed_at  timestamptz,
      latest_completed_at timestamptz,
      portal_close_value  text,
      portal_close_date   text,
      callout             boolean NOT NULL DEFAULT false,
      callout_attended_at timestamptz,
      callout_reason      text,
      callout_by          text,
      callout_set_at      timestamptz,
      synced_at           timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS kpi_jobs_status_idx ON kpi_jobs(status);
    CREATE INDEX IF NOT EXISTS kpi_jobs_completed_idx ON kpi_jobs(first_completed_at);

    CREATE TABLE IF NOT EXISTS kpi_closeoffs (
      id            uuid PRIMARY KEY,
      job_no        text NOT NULL,
      portal        text NOT NULL,
      custon        text,
      status        text NOT NULL DEFAULT 'queued',
      requested_by  text NOT NULL,
      requested_at  timestamptz NOT NULL DEFAULT now(),
      claimed_at    timestamptz,
      finished_at   timestamptz,
      result        text,
      attempts      int NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS kpi_closeoffs_status_idx ON kpi_closeoffs(status);
    CREATE INDEX IF NOT EXISTS kpi_closeoffs_job_idx ON kpi_closeoffs(job_no);

    CREATE TABLE IF NOT EXISTS kpi_audit (
      id       serial PRIMARY KEY,
      job_no   text,
      action   text NOT NULL,
      detail   jsonb NOT NULL DEFAULT '{}'::jsonb,
      by_name  text,
      at       timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS kpi_sync_state (
      id          int PRIMARY KEY,
      last_run_at timestamptz,
      last_ok_at  timestamptz,
      last_error  text,
      detail      jsonb NOT NULL DEFAULT '{}'::jsonb
    );
  `);

  // Seed rules once; never overwrite edits made in the dashboard.
  for (const r of SEED_RULES) {
    await query(
      `INSERT INTO kpi_rules (priority_id, client, label, respond_value, respond_unit, complete_value, complete_unit, confirmed, notes, updated_by_name)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'seed')
       ON CONFLICT (priority_id, client) DO NOTHING`,
      [r.priorityId, r.client ?? '', r.label, r.respond.value, r.respond.unit, r.complete.value, r.complete.unit, r.confirmed, r.notes]
    );
  }
}

export async function loadRules(): Promise<(KpiRule & { id: number; updatedBy: string | null; updatedAt: string })[]> {
  const rows = await query<any>('SELECT * FROM kpi_rules ORDER BY label');
  return rows.map((r) => ({
    id: r.id,
    priorityId: r.priority_id,
    client: r.client || null,
    label: r.label,
    respond: { value: r.respond_value === null ? null : Number(r.respond_value), unit: (r.respond_unit || null) as WindowUnit | null },
    complete: { value: r.complete_value === null ? null : Number(r.complete_value), unit: (r.complete_unit || null) as WindowUnit | null },
    confirmed: r.confirmed,
    notes: r.notes,
    updatedBy: r.updated_by_name,
    updatedAt: r.updated_at
  }));
}

export async function audit(jobNo: string | null, action: string, detail: unknown, byName: string): Promise<void> {
  await query('INSERT INTO kpi_audit (job_no, action, detail, by_name) VALUES ($1,$2,$3,$4)', [jobNo, action, detail ?? {}, byName]);
}
