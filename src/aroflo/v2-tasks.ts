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
