import { logger } from '../utils/logger.js';
import type { AroFloClient } from '../aroflo/client.js';
import { fetchQuoteRequiredTasks } from '../mcp/rest.js';
import { dbConfigured, query } from '../db/db.js';

/**
 * Pull "Quote Required" tasks from AroFlo and upsert them into tasks_cache so the
 * portal home screen stays live without anyone opening the app. Rows that fall
 * out of the set (no longer Quote Required) are pruned.
 */
export async function syncTasksOnce(client: AroFloClient): Promise<number> {
  if (!dbConfigured()) return 0;
  const tasks = await fetchQuoteRequiredTasks(client);
  const keep: string[] = [];
  for (const t of tasks) {
    const jobNo = String((t as any).jobNo || '');
    if (!jobNo) continue;
    keep.push(jobNo);
    await query(
      `INSERT INTO tasks_cache (job_no, data, synced_at)
       VALUES ($1,$2, now())
       ON CONFLICT (job_no) DO UPDATE SET data = EXCLUDED.data, synced_at = now()`,
      [jobNo, t]
    );
  }
  if (keep.length) {
    await query(`DELETE FROM tasks_cache WHERE NOT (job_no = ANY($1))`, [keep]);
  } else {
    await query('DELETE FROM tasks_cache');
  }
  logger.info({ count: keep.length }, 'AroFlo task sync complete');
  return keep.length;
}

let timer: NodeJS.Timeout | null = null;

/** Start the background sync loop (default every 15 min). No-op without a DB. */
export function startTaskSync(client: AroFloClient): void {
  if (!dbConfigured()) return;
  const minutes = Number(process.env.SYNC_INTERVAL_MIN || 15);
  const runSafe = () => {
    syncTasksOnce(client).catch((err) => logger.error({ err }, 'Scheduled task sync failed'));
  };
  // Run shortly after boot, then on the interval.
  setTimeout(runSafe, 8_000);
  timer = setInterval(runSafe, Math.max(1, minutes) * 60_000);
  logger.info({ minutes }, 'Scheduled AroFlo task sync started');
}

export function stopTaskSync(): void {
  if (timer) clearInterval(timer);
  timer = null;
}
