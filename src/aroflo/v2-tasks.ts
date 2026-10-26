import type { AroFloV2Client } from './v2-client.js';
import { AroFloApiError } from '../utils/errors.js';

/**
 * APIv2 task write helpers: PATCH /tasks/{id}, document upload, and lookups
 * that turn human names (priority, substatus) into v2 ids.
 */

export type V2TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'PENDING' | 'COMPLETED' | 'ARCHIVED';

export interface TaskPatch {
  description?: string;
  customerOrderNumber?: string;
  priorityId?: string;
  subStatusId?: string;
  status?: V2TaskStatus;
  clearPriority?: boolean;
  clearSubstatus?: boolean;
}

interface NamedItem {
  id: string;
  [key: string]: unknown;
}

function norm(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

async function listAll<T extends NamedItem>(
  v2: AroFloV2Client,
  path: string,
  query: Record<string, string | number | boolean | undefined>
): Promise<T[]> {
  const out: T[] = [];
  for (let page = 1; page <= 10; page += 1) {
    const response = await v2.get<{ items?: T[]; page?: { number?: number; count?: number } }>(
      path,
      { ...query, page, limit: 100 }
    );
    const items = response.data?.items ?? [];
    out.push(...items);
    const pageCount = Number(response.data?.page?.count ?? 1);
    if (page >= pageCount || items.length === 0) break;
  }
  return out;
}

/**
 * Resolve a priority by v2 id, or by matching `shortDescription` / `description`
 * (case-insensitive; exact match first, then "starts with" / "contains").
 * `linkedOrgId` narrows to the priorities a client or business unit uses.
 */
export async function resolvePriorityId(
  v2: AroFloV2Client,
  nameOrId: string,
  linkedOrgId?: string
): Promise<{ id: string; label: string }> {
  const items = await listAll<NamedItem>(v2, 'priorities', { linkedOrgId });
  const byId = items.find((p) => p.id === nameOrId);
  if (byId) return { id: byId.id, label: String(byId['shortDescription'] ?? byId['description']) };

  const wanted = norm(nameOrId);
  const active = items.filter((p) => p['archived'] !== true);
  const label = (p: NamedItem) => `${p['shortDescription'] ?? ''} | ${p['description'] ?? ''}`;
  const exact = active.filter(
    (p) => norm(p['shortDescription']) === wanted || norm(p['description']) === wanted
  );
  const partial = exact.length ? exact : active.filter((p) => norm(label(p)).includes(wanted));

  if (partial.length === 1) {
    const p = partial[0]!;
    return { id: p.id, label: String(p['shortDescription'] ?? p['description']) };
  }
  throw new AroFloApiError(
    partial.length === 0
      ? `No priority matches "${nameOrId}"`
      : `Priority "${nameOrId}" is ambiguous: ${partial.map(label).join('; ')}`,
    { statusCode: 422 }
  );
}

/** Resolve a task substatus by v2 id or by name (case-insensitive). */
export async function resolveSubstatusId(
  v2: AroFloV2Client,
  nameOrId: string,
  linkedOrgId?: string
): Promise<{ id: string; name: string }> {
  const items = await listAll<NamedItem>(v2, 'substatuses/tasks', { linkedOrgId, archived: false });
  const byId = items.find((s) => s.id === nameOrId);
  if (byId) return { id: byId.id, name: String(byId['name']) };

  const wanted = norm(nameOrId);
  const exact = items.filter((s) => norm(s['name']) === wanted);
  const partial = exact.length ? exact : items.filter((s) => norm(s['name']).includes(wanted));
  if (partial.length === 1) {
    const s = partial[0]!;
    return { id: s.id, name: String(s['name']) };
  }
  throw new AroFloApiError(
    partial.length === 0
      ? `No task substatus matches "${nameOrId}"`
      : `Substatus "${nameOrId}" is ambiguous: ${partial.map((s) => s['name']).join('; ')}`,
    { statusCode: 422 }
  );
}

export async function patchTask(v2: AroFloV2Client, taskId: string, patch: TaskPatch) {
  const body: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v !== undefined) body[k] = v;
  }
  if (Object.keys(body).length === 0) {
    throw new AroFloApiError('Nothing to update: no task fields supplied', { statusCode: 400 });
  }
  return v2.patch(`tasks/${encodeURIComponent(taskId)}`, body);
}

export interface UploadDocumentInput {
  filename: string;
  /** Raw base64 (no data: prefix). Mutually exclusive with dataUrl. */
  base64?: string;
  /** data:<mime>;base64,<...> */
  dataUrl?: string;
  comment?: string;
  description?: string;
  /** v2 folder id on the task (GET /tasks/{id}/documents/folders). */
  categoryId?: string;
}

const MAX_UPLOAD_BYTES = 250 * 1024 * 1024;

export async function uploadTaskDocument(
  v2: AroFloV2Client,
  taskId: string,
  input: UploadDocumentInput
) {
  const filename = input.filename.trim();
  if (!/\.[A-Za-z0-9]{2,5}$/.test(filename)) {
    throw new AroFloApiError('filename must include a file extension (e.g. "work order.pdf")', {
      statusCode: 400
    });
  }
  const b64 = input.dataUrl ? (input.dataUrl.split(',', 2)[1] ?? '') : (input.base64 ?? '');
  if (!b64) {
    throw new AroFloApiError('Provide base64 or dataUrl content', { statusCode: 400 });
  }
  const approxBytes = Math.floor((b64.length * 3) / 4);
  if (approxBytes > MAX_UPLOAD_BYTES) {
    throw new AroFloApiError('File exceeds the 250 MB upload limit', { statusCode: 413 });
  }

  const body: Record<string, unknown> = { filename };
  if (input.dataUrl) body['dataUrl'] = input.dataUrl;
  else body['base64'] = b64;
  if (input.comment) body['comment'] = input.comment;
  if (input.description) body['description'] = input.description;
  if (input.categoryId) body['categoryId'] = input.categoryId;

  const response = await v2.post(`tasks/${encodeURIComponent(taskId)}/documents/upload`, body);
  return { response, bytes: approxBytes };
}

// ---------------------------------------------------------------------------
// Task labour (timesheet) entries — POST /tasks/{taskId}/labours
// ---------------------------------------------------------------------------

export interface V2WorkType extends NamedItem {
  name?: string;
  description?: string;
  rateType?: { shortName?: string; label?: string };
}

export interface V2User extends NamedItem {
  givenName?: string;
  familyName?: string;
  email?: string;
  isArchived?: boolean;
}

/** Resolve a work type by v2 id or by exact name (case-insensitive). */
export async function resolveWorkTypeId(
  v2: AroFloV2Client,
  nameOrId: string
): Promise<{ id: string; name: string }> {
  const items = await listAll<V2WorkType>(v2, 'worktypes', {});
  const byId = items.find((w) => w.id === nameOrId);
  if (byId) return { id: byId.id, name: String(byId.name ?? byId.id) };

  const wanted = norm(nameOrId);
  const exact = items.filter((w) => norm(w.name) === wanted);
  if (exact.length === 1) {
    const w = exact[0]!;
    return { id: w.id, name: String(w.name) };
  }
  const partial = items.filter((w) => norm(w.name).includes(wanted));
  throw new AroFloApiError(
    exact.length > 1
      ? `Work type "${nameOrId}" matches more than one record`
      : partial.length === 0
        ? `No work type named "${nameOrId}" (use the exact name, e.g. "Ausgrid", "Generic")`
        : `No exact work type match for "${nameOrId}"; close matches: ${partial
            .map((w) => w.name)
            .join(', ')}`,
    { statusCode: 422 }
  );
}

/**
 * Resolve a user by v2 id, by "Given Family" name, or by email (case-insensitive).
 * The v2 givenName/familyName filters on GET /users return nothing in the beta,
 * so the whole org user list is paged and matched client-side.
 */
export async function resolveUserId(
  v2: AroFloV2Client,
  nameIdOrEmail: string,
  orgId?: string
): Promise<{ id: string; name: string }> {
  const items = await listAll<V2User>(v2, 'users', { orgId });
  const label = (u: V2User) => `${u.givenName ?? ''} ${u.familyName ?? ''}`.trim();
  const byId = items.find((u) => u.id === nameIdOrEmail);
  if (byId) return { id: byId.id, name: label(byId) };

  const wanted = norm(nameIdOrEmail).replace(/\s+/g, ' ');
  const active = items.filter((u) => u.isArchived !== true);
  const matches = active.filter(
    (u) => norm(label(u)).replace(/\s+/g, ' ') === wanted || norm(u.email) === wanted
  );
  if (matches.length === 1) {
    const u = matches[0]!;
    return { id: u.id, name: label(u) };
  }
  throw new AroFloApiError(
    matches.length === 0
      ? `No active user named "${nameIdOrEmail}" (use "Given Family" exactly as in AroFlo, an email, or a v2 user id)`
      : `User "${nameIdOrEmail}" is ambiguous: ${matches.map((u) => `${label(u)} <${u.email ?? ''}>`).join('; ')}`,
    { statusCode: 422 }
  );
}

const TIME_RE = /^([01]?\d|2[0-3]):([0-5]\d)$/;

/** Parse "H:MM" / "HH:MM" (24h) to minutes since midnight. */
export function parseClockTime(value: string): number {
  const m = TIME_RE.exec(value.trim());
  if (!m) {
    throw new AroFloApiError(`Time "${value}" must be 24-hour HH:MM (e.g. "07:00", "15:30")`, {
      statusCode: 400
    });
  }
  return Number(m[1]) * 60 + Number(m[2]);
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function normaliseClockTime(value: string): string {
  const mins = parseClockTime(value);
  return `${pad2(Math.floor(mins / 60))}:${pad2(mins % 60)}`;
}

/** Hours between two HH:MM times on the same day, to 2 dp. Finish must be after start. */
export function hoursBetween(startTime: string, finishTime: string): number {
  const start = parseClockTime(startTime);
  const finish = parseClockTime(finishTime);
  if (finish <= start) {
    throw new AroFloApiError(
      `finishTime ${finishTime} must be after startTime ${startTime} (entries cannot span midnight)`,
      { statusCode: 400 }
    );
  }
  return Math.round(((finish - start) / 60) * 100) / 100;
}

export interface AddLabourInput {
  userId: string;
  workTypeId: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM, 24h */
  startTime?: string;
  /** HH:MM, 24h */
  finishTime?: string;
  hours?: number;
  note?: string;
  trackingCentreId?: string;
  /**
   * The block runs past midnight (finish is on the day after `date`). AroFlo
   * labour lines are single-day, so the entry is booked on `date` as hours
   * only, with the real start/finish recorded in the note.
   */
  overnight?: boolean;
}

/** Hours for a block that starts on one day and finishes the next (finish <= start). */
export function overnightHours(startTime: string, finishTime: string): number {
  const start = parseClockTime(startTime);
  const finish = parseClockTime(finishTime);
  if (finish > start) {
    throw new AroFloApiError(
      `overnight was set but ${finishTime} is after ${startTime} on the same day — drop overnight`,
      { statusCode: 400 }
    );
  }
  return Math.round(((24 * 60 - start + finish) / 60) * 100) / 100;
}

export interface V2LabourEntry {
  id?: string;
  date?: string;
  startTime?: string | null;
  finishTime?: string | null;
  hours?: string | number;
  note?: string | null;
  user?: { id?: string; givenName?: string; familyName?: string };
  workType?: { id?: string; name?: string };
  [key: string]: unknown;
}

/** Existing labour on a task for one user on one date — used to stop double entry. */
export async function listTaskLabour(
  v2: AroFloV2Client,
  taskId: string,
  filter: { userId?: string; date?: string } = {}
): Promise<V2LabourEntry[]> {
  const items = await listAll<V2LabourEntry & NamedItem>(
    v2,
    `tasks/${encodeURIComponent(taskId)}/labours`,
    {}
  );
  return items.filter(
    (l) =>
      (!filter.userId || l.user?.id === filter.userId) && (!filter.date || l.date === filter.date)
  );
}

export function buildLabourBody(input: AddLabourInput): Record<string, unknown> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    throw new AroFloApiError(`date "${input.date}" must be YYYY-MM-DD`, { statusCode: 400 });
  }
  if ((input.startTime && !input.finishTime) || (!input.startTime && input.finishTime)) {
    throw new AroFloApiError('startTime and finishTime must be supplied together', {
      statusCode: 400
    });
  }

  let hours = input.hours;
  const body: Record<string, unknown> = {
    userId: input.userId,
    workTypeId: input.workTypeId,
    date: input.date
  };

  let note = input.note;
  if (input.startTime && input.finishTime) {
    const start = normaliseClockTime(input.startTime);
    const finish = normaliseClockTime(input.finishTime);
    const span = input.overnight ? overnightHours(start, finish) : hoursBetween(start, finish);
    if (hours === undefined) hours = span;
    else if (Math.abs(hours - span) > 0.011) {
      throw new AroFloApiError(
        `hours (${hours}) does not match ${start}–${finish} (${span} h); omit hours or fix the times`,
        { statusCode: 400 }
      );
    }
    if (input.overnight) {
      // Single-day labour line: book the hours on the start date and keep the
      // real times in the note, the same way AFP logs night shifts by hand.
      const stamp = `${start}–${finish} next day`;
      note = note ? `${note} (${stamp})` : stamp;
    } else {
      body['startTime'] = start;
      body['finishTime'] = finish;
    }
  } else if (input.overnight) {
    throw new AroFloApiError('overnight needs startTime and finishTime', { statusCode: 400 });
  }

  if (hours === undefined) {
    throw new AroFloApiError('Provide hours, or startTime and finishTime', { statusCode: 400 });
  }
  if (!(hours > 0) || hours > 24) {
    throw new AroFloApiError(`hours must be between 0 and 24 (got ${hours})`, { statusCode: 400 });
  }
  body['hours'] = hours;
  if (note) body['note'] = note.slice(0, 1000);
  if (input.trackingCentreId) body['trackingCentreId'] = input.trackingCentreId;
  return body;
}

export async function addTaskLabour(v2: AroFloV2Client, taskId: string, input: AddLabourInput) {
  const body = buildLabourBody(input);
  const response = await v2.post(`tasks/${encodeURIComponent(taskId)}/labours`, body);
  return { response, body };
}
