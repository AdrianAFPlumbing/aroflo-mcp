import type { IncomingMessage, ServerResponse } from 'node:http';

import type { AroFloClient } from '../aroflo/client.js';
import { convertLegacyIds, v2TaskIdForJobNumber } from '../aroflo/v2-bridge.js';
import type { AroFloV2Client } from '../aroflo/v2-client.js';
import { patchTask, uploadTaskDocument, type TaskPatch } from '../aroflo/v2-tasks.js';
import { AroFloApiError, AroFloError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

/**
 * Plain HTTP endpoints for Power Automate (and other non-MCP callers) to hit
 * after Claude has created or polished a job, so large attachments never pass
 * through a model tool call.
 *
 *   POST /v2/tasks/<jobnumber>/documents
 *     JSON: { "filename": "WO 12345.pdf", "contentBase64": "...", "comment"?: "...", "description"?: "..." }
 *     or:   { "filename": "...", "dataUrl": "data:application/pdf;base64,..." }
 *     or:   raw bytes with Content-Type: application/octet-stream and ?filename=...
 *
 *   POST /v2/tasks/<ref>/documents/batch
 *     JSON: { "files": [ { "filename", "contentBase64" | "dataUrl", "comment"? }, ... ] }
 *     The Outlook trigger's attachment objects ({ name, contentBytes, ... }) are
 *     accepted directly, so Power Automate can pass the whole attachments array.
 *   <ref> may be a 6-digit job number, a legacy taskid or a v2 task id.
 *
 *   PATCH /v2/tasks/<jobnumber>
 *     JSON: { description?, customerOrderNumber?, priorityId?, subStatusId?, status?, clearPriority?, clearSubstatus? }
 *
 * Auth: header x-webhook-token (or ?token=) must equal WEBHOOK_TOKEN, falling
 * back to ANSTO_WEBHOOK_TOKEN so existing deployments need no new variable.
 */

const MAX_BODY_BYTES = 260 * 1024 * 1024;

function readBody(req: IncomingMessage, limit = MAX_BODY_BYTES): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) {
        req.destroy();
        reject(new Error('Request body too large'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function writeJson(res: ServerResponse, code: number, payload: unknown): void {
  if (res.headersSent) return;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function errorPayload(error: unknown): { code: number; body: Record<string, unknown> } {
  if (error instanceof AroFloError) {
    return {
      code:
        error.statusCode && error.statusCode >= 400 && error.statusCode < 600
          ? error.statusCode
          : 502,
      body: { status: 'error', code: error.code, message: error.message, details: error.details }
    };
  }
  return {
    code: 500,
    body: {
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal server error'
    }
  };
}

function authorised(req: IncomingMessage): boolean {
  const expected = (
    process.env['WEBHOOK_TOKEN'] ??
    process.env['ANSTO_WEBHOOK_TOKEN'] ??
    ''
  ).trim();
  if (!expected) return false;
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const supplied =
    (req.headers['x-webhook-token'] as string | undefined) ?? url.searchParams.get('token') ?? '';
  return supplied === expected;
}

interface FileInput {
  filename?: string;
  /** Outlook trigger attachment shape (name/contentBytes) is accepted as-is. */
  name?: string;
  contentBytes?: string;
  contentBase64?: string;
  base64?: string;
  dataUrl?: string;
  comment?: string;
  description?: string;
  categoryId?: string;
}

// /v2/tasks/<ref>... where <ref> is a 6-digit job number, a legacy taskid
// (base64, often ending in "=") or a v2 task id (11 chars, starts "72M8").
const ROUTE = /^\/v2\/tasks\/([^/]+?)(\/documents(\/batch)?)?\/?$/;

async function resolveTaskRef(
  legacy: AroFloClient,
  v2: AroFloV2Client,
  ref: string
): Promise<{ taskId: string; legacyTaskId?: string; jobNumber?: number }> {
  const decoded = decodeURIComponent(ref);
  if (/^\d{6}$/.test(decoded)) {
    const r = await v2TaskIdForJobNumber(legacy, v2, Number(decoded));
    return { ...r, jobNumber: Number(decoded) };
  }
  if (/^[A-Za-z0-9+/]+=*$/.test(decoded) && decoded.includes('=')) {
    const [conv] = await convertLegacyIds(v2, [decoded]);
    if (!conv?.id)
      throw new AroFloApiError(`Could not convert legacy task id ${decoded}`, { statusCode: 400 });
    return { taskId: conv.id, legacyTaskId: decoded };
  }
  return { taskId: decoded };
}

/**
 * Returns true when the request was handled (even if with an error response).
 */
export async function handleV2Webhooks(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string,
  legacy: AroFloClient,
  v2: AroFloV2Client | undefined
): Promise<boolean> {
  const match = ROUTE.exec(pathname);
  if (!match) return false;

  const taskRef = match[1]!;
  const isDocuments = Boolean(match[2]);
  const isBatch = Boolean(match[3]);

  if (!authorised(req)) {
    writeJson(res, 401, { status: 'error', message: 'Unauthorised' });
    return true;
  }
  if (!v2) {
    writeJson(res, 503, {
      status: 'error',
      message: 'AroFlo APIv2 is not configured (AROFLO_V2_TOKEN)'
    });
    return true;
  }

  try {
    const { taskId, legacyTaskId, jobNumber } = await resolveTaskRef(legacy, v2, taskRef);

    if (isDocuments) {
      if (req.method !== 'POST') {
        writeJson(res, 405, { status: 'error', message: 'Method not allowed' });
        return true;
      }
      const contentType = (req.headers['content-type'] ?? '').toLowerCase();
      const raw = await readBody(req);

      let files: FileInput[];
      if (contentType.includes('application/json')) {
        const body = JSON.parse(raw.toString('utf8') || '{}') as FileInput & {
          files?: FileInput[];
        };
        files = isBatch ? (body.files ?? []) : [body];
      } else {
        const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
        const filename = url.searchParams.get('filename') ?? '';
        files = [{ filename, base64: raw.toString('base64') }];
      }

      if (files.length === 0) {
        writeJson(res, 400, { status: 'error', message: 'No files supplied' });
        return true;
      }

      const results: Array<Record<string, unknown>> = [];
      for (const f of files) {
        const filename = (f.filename ?? f.name ?? '').trim();
        try {
          const { response, bytes } = await uploadTaskDocument(v2, taskId, {
            filename,
            base64: f.contentBase64 ?? f.contentBytes ?? f.base64,
            dataUrl: f.dataUrl,
            comment: f.comment,
            description: f.description,
            categoryId: f.categoryId
          });
          results.push({ filename, ok: true, bytes, document: response.data });
        } catch (error) {
          const { body } = errorPayload(error);
          results.push({ filename, ok: false, error: body.message });
          logger.warn({ jobNumber, filename, err: error }, 'v2 webhook: document upload failed');
        }
      }
      const failed = results.filter((r) => !r.ok).length;
      writeJson(res, failed === results.length ? 502 : 200, {
        status: failed ? 'partial' : 'ok',
        jobNumber,
        taskId,
        legacyTaskId,
        uploaded: results.length - failed,
        failed,
        results
      });
      return true;
    }

    if (req.method !== 'PATCH' && req.method !== 'POST') {
      writeJson(res, 405, { status: 'error', message: 'Method not allowed' });
      return true;
    }
    const patch = JSON.parse(
      (await readBody(req, 5 * 1024 * 1024)).toString('utf8') || '{}'
    ) as TaskPatch;
    const response = await patchTask(v2, taskId, patch);
    writeJson(res, 200, { status: 'ok', jobNumber, taskId, task: response.data });
    return true;
  } catch (error) {
    const { code, body } = errorPayload(error);
    logger.error({ taskRef, pathname, err: error }, 'v2 webhook failed');
    writeJson(res, code, body);
    return true;
  }
}
