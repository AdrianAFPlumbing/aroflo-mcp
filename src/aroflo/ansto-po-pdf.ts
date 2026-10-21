/**
 * Attach ANSTO PO PDFs to the job they belong to.
 *
 * The legacy API's DocumentsAndPhotos zone is read-only, so uploads go through
 * APIv2 (multipart POST to tasks/{id}/documents). AroFlo has not published the
 * v2 upload contract, so a small set of request shapes is tried in order and the
 * first that succeeds is reported back; the upload is verified by re-listing.
 */
import type { AroFloClient } from './client.js';
import type { AroFloV2Client } from './v2-client.js';
import { convertLegacyIds, v2TaskIdForJobNumber } from './v2-bridge.js';
import { downloadBytes, listRecentAnstoTasks, type AnstoTaskLite } from './ansto-po.js';
import { logger } from '../utils/logger.js';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function baseName(name: string): string {
  return name
    .replace(/\.pdf$/i, '')
    .trim()
    .toLowerCase();
}

export async function listV2TaskDocumentNames(
  v2: AroFloV2Client,
  v2TaskId: string
): Promise<string[]> {
  const res = await v2.get<{ items?: unknown[] }>(`tasks/${v2TaskId}/documents`);
  const items = isRecord(res.data) && Array.isArray(res.data['items']) ? res.data['items'] : [];
  const names: string[] = [];
  for (const it of items) {
    if (!isRecord(it)) continue;
    for (const k of ['fileName', 'name', 'displayName']) {
      const v = it[k];
      if (typeof v === 'string' && v.trim()) names.push(v.trim());
    }
  }
  return names;
}

export type AttachOutcome = 'attached' | 'already-attached' | 'upload-failed';

export interface AttachResult {
  outcome: AttachOutcome;
  jobnumber: string;
  fileName: string;
  method?: string;
  error?: string;
}

/** Upload one PDF to a job unless a file with the same base name is already there. */
export async function attachPdfToJob(
  legacy: AroFloClient,
  v2: AroFloV2Client,
  target: { jobnumber: string; legacyTaskId?: string },
  file: { fileName: string; bytes: Uint8Array }
): Promise<AttachResult> {
  let v2TaskId: string;
  if (target.legacyTaskId) {
    const [conv] = await convertLegacyIds(v2, [target.legacyTaskId]);
    if (!conv?.id) throw new Error(`Could not convert task id for JN ${target.jobnumber}`);
    v2TaskId = conv.id;
  } else {
    v2TaskId = (await v2TaskIdForJobNumber(legacy, v2, Number(target.jobnumber))).taskId;
  }

  const want = baseName(file.fileName);
  const existing = await listV2TaskDocumentNames(v2, v2TaskId);
  if (existing.some((n) => baseName(n) === want)) {
    return { outcome: 'already-attached', jobnumber: target.jobnumber, fileName: file.fileName };
  }

  const path = `tasks/${v2TaskId}/documents`;
  const attempts: { label: string; run: () => Promise<unknown> }[] = [
    {
      label: 'multipart:file',
      run: () =>
        v2.uploadFile(path, {
          fieldName: 'file',
          fileName: file.fileName,
          contentType: 'application/pdf',
          bytes: file.bytes
        })
    },
    {
      label: 'multipart:document',
      run: () =>
        v2.uploadFile(path, {
          fieldName: 'document',
          fileName: file.fileName,
          contentType: 'application/pdf',
          bytes: file.bytes
        })
    },
    {
      label: 'json:base64',
      run: () =>
        v2.post(path, {
          fileName: file.fileName,
          name: file.fileName.replace(/\.pdf$/i, ''),
          contentType: 'application/pdf',
          content: Buffer.from(file.bytes).toString('base64')
        })
    }
  ];

  const errors: string[] = [];
  for (const attempt of attempts) {
    try {
      await attempt.run();
      const after = await listV2TaskDocumentNames(v2, v2TaskId);
      if (after.some((n) => baseName(n) === want)) {
        logger.info(
          { jobnumber: target.jobnumber, file: file.fileName, method: attempt.label },
          'PDF attached'
        );
        return {
          outcome: 'attached',
          jobnumber: target.jobnumber,
          fileName: file.fileName,
          method: attempt.label
        };
      }
      errors.push(`${attempt.label}: accepted but file not listed afterwards`);
    } catch (error) {
      errors.push(`${attempt.label}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return {
    outcome: 'upload-failed',
    jobnumber: target.jobnumber,
    fileName: file.fileName,
    error: errors.join(' | ')
  };
}

const PO_PDF_RE = /^(4300\d{6})\.pdf$/i;

/** Map PO number -> downloadable PDF (signed URL, ~10 min) found on any recent ANSTO task. */
export async function indexPoPdfsInAroflo(
  legacy: AroFloClient,
  tasks?: AnstoTaskLite[]
): Promise<Map<string, { url: string; fileName: string; jobnumber: string }>> {
  const list = tasks ?? (await listRecentAnstoTasks(legacy, { pages: 2, withDocuments: true }));
  const map = new Map<string, { url: string; fileName: string; jobnumber: string }>();
  for (const t of list) {
    for (const d of t.documents) {
      const m = PO_PDF_RE.exec(d.name);
      if (m && !map.has(m[1]!))
        map.set(m[1]!, { url: d.url, fileName: d.name, jobnumber: t.jobnumber });
    }
  }
  return map;
}

export interface BackfillItem {
  jobnumber: string;
  po: string;
}

export interface BackfillResult extends Partial<Omit<AttachResult, 'outcome'>> {
  jobnumber: string;
  po: string;
  outcome: AttachOutcome | 'pdf-not-in-aroflo' | 'error';
  sourceJobnumber?: string;
}

/**
 * For each {jobnumber, po}: find the PO PDF on any ANSTO task in AroFlo and
 * attach it to the job if it isn't there already. Signed URLs expire after
 * ~10 minutes, so the index is rebuilt for long runs.
 */
export async function backfillPoPdfs(
  legacy: AroFloClient,
  v2: AroFloV2Client,
  items: BackfillItem[]
): Promise<BackfillResult[]> {
  let index = await indexPoPdfsInAroflo(legacy);
  let indexedAt = Date.now();
  const results: BackfillResult[] = [];
  for (const item of items) {
    try {
      if (Date.now() - indexedAt > 7 * 60_000) {
        index = await indexPoPdfsInAroflo(legacy);
        indexedAt = Date.now();
      }
      const src = index.get(item.po);
      if (!src) {
        results.push({ ...item, outcome: 'pdf-not-in-aroflo' });
        continue;
      }
      if (src.jobnumber === item.jobnumber) {
        results.push({ ...item, outcome: 'already-attached', sourceJobnumber: src.jobnumber });
        continue;
      }
      const bytes = await downloadBytes(src.url);
      const r = await attachPdfToJob(
        legacy,
        v2,
        { jobnumber: item.jobnumber },
        {
          fileName: `${item.po}.pdf`,
          bytes
        }
      );
      results.push({ ...item, ...r, sourceJobnumber: src.jobnumber });
    } catch (error) {
      results.push({
        ...item,
        outcome: 'error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
  return results;
}
