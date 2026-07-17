import type { IncomingMessage, ServerResponse } from 'node:http';

import type { AroFloClient } from '../aroflo/client.js';
import { extractZoneItems } from '../aroflo/items.js';

// The sub-status we want to surface in the Quote Portal.
const TARGET_SUBSTATUS = 'quote required';
// Safety cap on paging (500 records/page => up to 5000 active tasks scanned).
const MAX_PAGES = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function str(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
}

// AroFlo returns substatus as { substatusid, substatus } (or {} when unset).
function getSubstatusName(task: unknown): string {
  if (!isRecord(task)) return '';
  const ss = task['substatus'];
  if (!isRecord(ss)) return '';
  return str(ss['substatus']).trim();
}

// Shape each task into exactly what the Quote Portal front-end expects.
function mapTask(task: Record<string, unknown>) {
  const client = isRecord(task['client']) ? task['client'] : {};
  const loc = isRecord(task['tasklocation']) ? task['tasklocation'] : {};
  const contactName = str(task['contactname']).trim();
  const contactPhone = str(task['contactphone']).trim();
  const contact = [contactName, contactPhone].filter(Boolean).join(' \u00b7 ');

  return {
    jobNo: str(task['jobnumber']),
    name: str(task['taskname']),
    client: str(client['clientname']),
    location: str(loc['locationname']),
    contact,
    due: str(task['duedate']),
    ref: str(task['custon']),
    status: str(task['status']),
    substatus: getSubstatusName(task),
    webappId: str(task['webappEncodedID']),
    description: str(task['description']),
    taskId: str(task['taskid'])
  };
}

export type MappedTask = ReturnType<typeof mapTask>;

// ---------------------------------------------------------------------------
// On-demand photo fetch. AroFlo's file URLs are signed and expire in ~10 min,
// so these are fetched live when a user opens a job — NEVER stored in the cache.
// ---------------------------------------------------------------------------
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|heic|heif|bmp|tiff?)$/i;

function pickUrl(rec: Record<string, unknown>): string {
  for (const k of ['url', 'downloadurl', 'downloadURL', 'link', 'href', 'filelink', 'fileurl']) {
    const v = rec[k];
    if (typeof v === 'string' && /^https?:\/\//i.test(v)) return v;
  }
  return '';
}
function pickName(rec: Record<string, unknown>): string {
  for (const k of ['filename', 'name', 'title', 'description', 'documentname']) {
    const v = rec[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

// Recursively collect document/photo records from an arbitrary join payload.
function collectFiles(node: unknown, out: Record<string, unknown>[]): void {
  if (Array.isArray(node)) {
    for (const n of node) collectFiles(n, out);
    return;
  }
  if (!isRecord(node)) return;
  if (pickUrl(node) || pickName(node)) out.push(node);
  for (const v of Object.values(node)) {
    if (Array.isArray(v) || isRecord(v)) collectFiles(v, out);
  }
}

export interface JobPhoto {
  name: string;
  url: string;
  isImage: boolean;
}

/** Fetch documents & photos for a single job (live, signed URLs). */
export async function fetchJobPhotos(client: AroFloClient, jobNo: string): Promise<JobPhoto[]> {
  const response = await client.get('Tasks', {
    where: [`and|jobnumber|=|${jobNo}`],
    join: ['documentsandphotos'],
    pageSize: 5
  });
  const { items } = extractZoneItems('Tasks', response.data);
  const task = items.find((t) => isRecord(t)) as Record<string, unknown> | undefined;
  if (!task) return [];

  const found: Record<string, unknown>[] = [];
  collectFiles(task['documentsandphotos'], found);

  const seen = new Set<string>();
  const photos: JobPhoto[] = [];
  for (const rec of found) {
    const url = pickUrl(rec);
    const name = pickName(rec) || 'file';
    if (!url || seen.has(url)) continue;
    seen.add(url);
    // Skip AroFlo's synthetic email-import attachment records.
    if (/task email import attachment/i.test(name)) continue;
    if (/\.html?$/i.test(name)) continue;
    photos.push({ name, url, isImage: IMAGE_EXT.test(name) });
  }
  // Images first
  photos.sort((a, b) => Number(b.isImage) - Number(a.isImage));
  return photos;
}

/**
 * Fetch active AroFlo tasks whose sub-status is "Quote Required".
 *
 * Why filter in code: AroFlo's Tasks zone does NOT allow WHERE on `substatus`
 * (only status/jobnumber/clientname/dates). We therefore pull active tasks via a
 * valid `status IN (...)` filter (which also overrides the default 30-day filter),
 * then filter on the returned substatus field ourselves.
 *
 * Shared by the on-demand GET /tasks route and the scheduled DB sync.
 */
export async function fetchQuoteRequiredTasks(client: AroFloClient): Promise<MappedTask[]> {
  const collected: Record<string, unknown>[] = [];
  let page = 1;

  while (page <= MAX_PAGES) {
    const response = await client.get('Tasks', {
      where: ['and|status|IN|notstarted*inprogress*pending*quote'],
      join: ['substatus'],
      order: ['daterequested|desc'],
      page,
      pageSize: 500
    });

    const { items, currentPageResults, maxPageResults } = extractZoneItems('Tasks', response.data);
    for (const item of items) {
      if (isRecord(item)) collected.push(item);
    }

    // Last page reached when this page returned fewer than the max.
    if (
      typeof currentPageResults !== 'number' ||
      typeof maxPageResults !== 'number' ||
      currentPageResults < maxPageResults
    ) {
      break;
    }
    page += 1;
  }

  return collected
    .filter((task) => getSubstatusName(task).toLowerCase() === TARGET_SUBSTATUS)
    .map(mapTask);
}

/**
 * GET /tasks — live on-demand fetch. If a Postgres cache is available, the
 * portal can also read the last synced snapshot via /portal/tasks (see portal.ts),
 * but this route always hits AroFlo directly so a manual refresh is possible.
 */
export async function handleTasksRest(
  _req: IncomingMessage,
  res: ServerResponse,
  client: AroFloClient
): Promise<void> {
  const tasks = await fetchQuoteRequiredTasks(client);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', count: tasks.length, tasks }));
}
