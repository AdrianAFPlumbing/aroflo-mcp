import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { logger } from '../utils/logger.js';

// The site is the AFP Jobs & KPIs tracker (public/jobs.html). The old Quote
// Portal front-end was retired on 2026-10-22; its data tables remain in Postgres.
const __dirname = dirname(fileURLToPath(import.meta.url));
// dist/mcp/static.js -> ../../public/jobs.html
const JOBS_PATH = join(__dirname, '..', '..', 'public', 'jobs.html');

const PAGE_PATHS = new Set(['/', '/index.html', '/jobs', '/jobs/', '/kpi', '/portal-app']);

let cached: string | null = null;

async function loadJobs(): Promise<string | null> {
  if (cached) return cached;
  try {
    cached = await readFile(JOBS_PATH, 'utf8');
    return cached;
  } catch (err) {
    logger.warn({ err, path: JOBS_PATH }, 'jobs.html not found');
    return null;
  }
}

/** Serve the job tracker at "/" (and the old bookmarked paths). Returns true if handled. */
export async function handleStatic(
  _req: IncomingMessage,
  res: ServerResponse,
  pathname: string
): Promise<boolean> {
  if (!PAGE_PATHS.has(pathname)) return false;
  const html = await loadJobs();
  res.writeHead(html ? 200 : 404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
  res.end(html ?? 'Job tracker not deployed');
  return true;
}
