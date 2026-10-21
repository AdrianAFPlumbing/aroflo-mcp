/**
 * ANSTO SAP Purchase Order handling.
 *
 * Why this exists: ANSTO sends two kinds of email for a job. A Work Order email
 * (from the works supervisor, 7-digit WO number in the email) and a SAP Purchase
 * Order email (subject "ANSTO Purch. Order 4300xxxxxx"). The PO email body is
 * boilerplate - the Work Order number, scope and contact exist ONLY inside the
 * attached PDF. The email-polish pipeline reads email text, so PO-only jobs
 * (typically planned/contract maintenance items that never get a separate Work
 * Order email) ended up flagged "[UNMATCHED ANSTO PO ...]" or "[NOT A JOB ...]"
 * and were never raised as jobs.
 *
 * This module reads the PO PDF (attached to the AroFlo import task by AroFlo's
 * own email import) and deterministically:
 *   - pairs it with the existing task that carries the same WO number
 *     (writes the Order No to the "ANSTO Order No" custom field, archives the
 *     PO import as a duplicate), or
 *   - converts the PO import into the primary job (name, Cust ON = WO number,
 *     description from the PO, custom field, NEW TASK substatus).
 */
import { fetch } from 'undici';

import type { AroFloClient } from './client.js';
import type { AroFloV2Client } from './v2-client.js';
import { extractZoneItems } from './items.js';
import { logger } from '../utils/logger.js';

// Plumbing Sydney business unit / ANSTO client / ANSTO task type / NEW TASK substatus.
export const ANSTO_DEFAULTS = {
  orgId: 'JCYqVyBQQCAgCg==',
  clientId: 'JiYqXyJRPDMjCg==',
  taskTypeId: 'JCZaTydRQCAgCg==',
  newTaskSubstatusId: 'JCYqQyNQQCAgCg==',
  orderNoFieldName: 'ANSTO Order No'
} as const;

const WO_RE = /Work\s*Order\s*No\s*:?\s*(\d{7})/i;
const ORDER_RE = /ORDER\s*No\s*:?\s*(4300\d{6})/i;
const DATE_RE = /\bDATE\s*:?\s*(\d{2}\.\d{2}\.\d{4})/;
const TEO_RE = /Technical\s+Enquiry\s+Officer\s*:?\s*([A-Za-z' -]+?)\s+(?:www\.|PH:)/i;
const TEO_EMAIL_RE =
  /Technical\s+Enquiry\s+Officer[\s\S]{0,200}?Email:\s*([\w.+-]+@ansto\.gov\.au)/i;
const CONTACT_RE = /CONTACT\s+CS1\s*:?\s*([^\n]+?)(?=\s{2,}Company\s|\s+Company\s+AUSTRALIAN|$)/i;
const RUDD_CONTACT_RE =
  /Contact\s+([A-Z][a-z]+\s+[A-Z][a-z]+)\s*\(Mob:\s*([\d ]+)\)\s*([\w.+-]+@ansto\.gov\.au)/i;
const LINE_ITEM_RE =
  /(?:^|\s)(\d{2})\s+(.+?)\s+(\d+(?:\.\d+)?)\s+(each|ea|hr|hrs|hour|hours|lot|unit|units|day|days|month|months|set|sets|m|job)\b\s+(\d{2}\.\d{2}\.\d{4})/gi;
const FUNC_LOC_RE = /\b(A-[A-Z]-[A-Z0-9]{3,5}(?:-[A-Z0-9]+)*)\b/;
const BUILDING_RE = /\bB0*(\d{1,3}[A-Z]?)\b/i;

export interface AnstoPoLineItem {
  item: string;
  description: string;
  qty: string;
  unit: string;
  deliverBy: string;
}

export interface ParsedAnstoPo {
  orderNo?: string;
  workOrderNo?: string;
  date?: string;
  technicalOfficer?: string;
  technicalOfficerEmail?: string;
  siteContact?: string;
  lineItems: AnstoPoLineItem[];
  functionalLocation?: string;
  building?: string;
  /** Scope text (line items + long text + contact), boilerplate removed. */
  scopeText: string;
}

function squash(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

/** Strip the SAP boilerplate (addresses, terms, totals) so only job detail remains. */
function stripBoilerplate(text: string): string {
  let t = text;
  // Everything from "Company AUSTRALIAN FACILITIES PLUMBING" to the end is address/terms.
  const companyIdx = t.search(/Company\s+AUSTRALIAN\s+FACILITIES/i);
  if (companyIdx > 0) t = t.slice(0, companyIdx);
  t = t.replace(/Item\s+Supplier\s+Description\s+Qty\s+Unit[\s\S]*?\bby\b/gi, ' ');
  t = t.replace(/Page\s+\d+\s*\/\s*\d+/gi, ' ');
  t = t.replace(/PURCHASE ORDER\s+Computer Generated Order/gi, ' ');
  t = t.replace(/Delivery Address\s*:|Billing Address\s*:|Email Address\s*:/gi, ' ');
  t = t.replace(/TOTAL\s*:\s*[\d.]+\s*[\d.]+\s*[\d.]+/gi, ' ');
  return squash(t);
}

export function parseAnstoPoText(rawText: string): ParsedAnstoPo {
  const text = rawText.replace(/\r/g, '');
  const flat = squash(text);

  const orderNo = ORDER_RE.exec(flat)?.[1];
  const workOrderNo = WO_RE.exec(flat)?.[1];
  const date = DATE_RE.exec(flat)?.[1];
  const technicalOfficer = TEO_RE.exec(flat)?.[1] ? squash(TEO_RE.exec(flat)![1]!) : undefined;
  const technicalOfficerEmail = TEO_EMAIL_RE.exec(flat)?.[1];

  const lineItems: AnstoPoLineItem[] = [];
  for (const m of flat.matchAll(LINE_ITEM_RE)) {
    const description = squash(m[2]!);
    // Guard against matching the boilerplate "1 / 1" page markers etc.
    if (description.length < 3 || /^Page\b/i.test(description)) continue;
    lineItems.push({ item: m[1]!, description, qty: m[3]!, unit: m[4]!, deliverBy: m[5]! });
  }

  const scopeText = stripBoilerplate(text);

  let siteContact: string | undefined;
  const cs1 = CONTACT_RE.exec(scopeText);
  if (cs1) siteContact = squash(cs1[1]!);
  if (!siteContact) {
    const rudd = RUDD_CONTACT_RE.exec(scopeText);
    if (rudd) siteContact = `${rudd[1]} - Mob: ${squash(rudd[2]!)} - ${rudd[3]}`;
  }

  const functionalLocation = FUNC_LOC_RE.exec(scopeText)?.[1];
  let building: string | undefined;
  if (functionalLocation) {
    const parts = functionalLocation.split('-');
    // A-B-021A-... => B021A ; A-S-... (site systems) has no building.
    if (parts[1] === 'B' && parts[2]) building = `B${parts[2].replace(/X$/, '')}`;
  }
  if (!building) {
    const b = BUILDING_RE.exec(scopeText);
    if (b) building = `B${b[1]!.toUpperCase()}`;
  }

  return {
    orderNo,
    workOrderNo,
    date,
    technicalOfficer,
    technicalOfficerEmail,
    siteContact,
    lineItems,
    functionalLocation,
    building,
    scopeText
  };
}

/** Short AroFlo task name (AroFlo truncates around 50 chars). */
export function buildTaskName(po: ParsedAnstoPo): string {
  const first = po.lineItems[0]?.description ?? '';
  const desc = first || po.scopeText.slice(0, 60);
  const prefix = po.building ? `ANSTO ${po.building} - ` : 'ANSTO - ';
  const name = `${prefix}${desc}`.replace(/\s+/g, ' ').trim();
  return name.length > 50 ? name.slice(0, 50).trim() : name;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildDescriptionHtml(po: ParsedAnstoPo): string {
  const site = [
    'ANSTO, New Illawarra Road, Lucas Heights NSW 2234',
    po.building ? `Building ${po.building}` : '',
    po.functionalLocation ? `Functional location ${po.functionalLocation}` : ''
  ]
    .filter(Boolean)
    .join(' - ');

  const contactBits = [
    po.siteContact ? esc(po.siteContact) : '',
    po.technicalOfficer
      ? `Technical Enquiry Officer: ${esc(po.technicalOfficer)}${
          po.technicalOfficerEmail ? ` - ${esc(po.technicalOfficerEmail)}` : ''
        }`
      : ''
  ].filter(Boolean);

  const items = po.lineItems.length
    ? `<ul>${po.lineItems
        .map(
          (li) =>
            `<li>Item ${esc(li.item)}: ${esc(li.description)} (qty ${esc(li.qty)} ${esc(
              li.unit
            )}, deliver by ${esc(li.deliverBy)})</li>`
        )
        .join('')}</ul>`
    : '';

  const deliverBy = po.lineItems.map((li) => li.deliverBy).filter(Boolean)[0];

  return [
    `<p><strong>Site:</strong> ${esc(site)}</p>`,
    `<p><strong>Site contact:</strong> ${
      contactBits.length ? contactBits.join('<br>') : 'Not stated on PO - see attached PO PDF'
    }. Confirm start date and Safe Work Permit before attending.</p>`,
    `<p><strong>Fault / works:</strong> Works per ANSTO SAP Purchase Order ${esc(
      po.orderNo ?? ''
    )}.${items}<br>${esc(po.scopeText)}</p>`,
    `<p><strong>Access / site requirements:</strong> ANSTO Lucas Heights is a secure government facility. A Safe Work Permit is required before commencing work. Sign in on arrival and follow all site induction and access requirements.</p>`,
    `<p><strong>Cost limit:</strong> Refer to Purchase Order ${esc(
      po.orderNo ?? ''
    )} (PO value is the authorised cost limit).</p>`,
    `<p><strong>Priority + required by:</strong> ${
      deliverBy ? `Deliver by ${esc(deliverBy)}.` : 'Not stated.'
    }${po.date ? ` PO dated ${esc(po.date)}.` : ''}</p>`,
    `<p><strong>Reference:</strong> Work Order No ${esc(
      po.workOrderNo ?? 'unknown'
    )} (Cust ON). ANSTO SAP Purchase Order ${esc(po.orderNo ?? '')}.</p>`,
    `<p><em>Raised automatically from the ANSTO PO PDF (aroflo-mcp ansto-po).</em></p>`
  ].join('\n');
}

// ---------------------------------------------------------------------------
// PDF download + text extraction
// ---------------------------------------------------------------------------

export async function extractPdfText(bytes: Uint8Array): Promise<string> {
  const { extractText, getDocumentProxy } = await import('unpdf');
  const pdf = await getDocumentProxy(bytes);
  const { text } = await extractText(pdf, { mergePages: true });
  return typeof text === 'string' ? text : (text as string[]).join('\n');
}

export async function downloadBytes(url: string): Promise<Uint8Array> {
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    throw new Error(`Download failed (${res.status}) for ${url.slice(0, 80)}...`);
  }
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

// ---------------------------------------------------------------------------
// AroFlo task helpers
// ---------------------------------------------------------------------------

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function str(v: unknown): string {
  return typeof v === 'string' ? v : v == null ? '' : String(v);
}

export interface AnstoTaskLite {
  taskid: string;
  jobnumber: string;
  taskname: string;
  custon: string;
  status: string;
  createdutc: string;
  orderNo: string;
  documents: { name: string; url: string }[];
}

function collectDocs(node: unknown, out: { name: string; url: string }[]): void {
  if (Array.isArray(node)) {
    for (const n of node) collectDocs(n, out);
    return;
  }
  if (!isRecord(node)) return;
  const name = str(node['name'] ?? node['filename']);
  const url = str(node['url']);
  if (name && /^https?:\/\//i.test(url)) out.push({ name, url });
  for (const v of Object.values(node)) if (Array.isArray(v) || isRecord(v)) collectDocs(v, out);
}

function readOrderNoField(task: Record<string, unknown>): string {
  const cfs = task['customfields'];
  if (!Array.isArray(cfs)) return '';
  for (const cf of cfs) {
    if (isRecord(cf) && str(cf['name']).trim() === ANSTO_DEFAULTS.orderNoFieldName) {
      return str(cf['value']).trim();
    }
  }
  return '';
}

function toLite(task: Record<string, unknown>): AnstoTaskLite {
  const documents: { name: string; url: string }[] = [];
  collectDocs(task['documentsandphotos'], documents);
  return {
    taskid: str(task['taskid']),
    jobnumber: str(task['jobnumber']),
    taskname: str(task['taskname']),
    custon: str(task['custon']).trim(),
    status: str(task['status']),
    createdutc: str(task['createdutc']),
    orderNo: readOrderNoField(task),
    documents
  };
}

export async function getTaskByJobNumber(
  client: AroFloClient,
  jobnumber: string
): Promise<AnstoTaskLite | undefined> {
  const response = await client.get('Tasks', {
    where: [`and|jobnumber|=|${jobnumber}`],
    join: ['documentsandphotos', 'customfields'],
    pageSize: 5
  });
  const { items } = extractZoneItems('Tasks', response.data);
  const task = items.find(isRecord);
  return task ? toLite(task) : undefined;
}

/** Most recent ANSTO tasks (any status), newest first. */
export async function listRecentAnstoTasks(
  client: AroFloClient,
  options: { pages?: number; pageSize?: number; withDocuments?: boolean } = {}
): Promise<AnstoTaskLite[]> {
  const pages = options.pages ?? 3;
  const pageSize = options.pageSize ?? 500;
  const join = options.withDocuments ? ['documentsandphotos', 'customfields'] : ['customfields'];
  const out: AnstoTaskLite[] = [];
  for (let page = 1; page <= pages; page += 1) {
    const response = await client.get('Tasks', {
      where: ['and|clientname|=|ANSTO'],
      order: ['jobnumber|desc'],
      join,
      page,
      pageSize
    });
    const { items, currentPageResults, maxPageResults } = extractZoneItems('Tasks', response.data);
    for (const it of items) if (isRecord(it)) out.push(toLite(it));
    if (
      typeof currentPageResults !== 'number' ||
      typeof maxPageResults !== 'number' ||
      currentPageResults < maxPageResults
    ) {
      break;
    }
  }
  return out;
}

const PO_PDF_RE = /^4300\d{6}\.pdf$/i;
const SEVEN_DIGIT_WO_RE = /^\d{7}$/;

/** True when the task looks like a raw / unmatched SAP PO import that still needs processing. */
export function needsPoProcessing(task: AnstoTaskLite): boolean {
  const hasPoPdf = task.documents.some((d) => PO_PDF_RE.test(d.name));
  if (!hasPoPdf) return false;
  if (SEVEN_DIGIT_WO_RE.test(task.custon)) return false; // already paired / primary
  // Raised under the PO number because the PO had no Work Order No - already a job.
  if (/^4300\d{6}$/.test(task.custon) && !task.taskname.startsWith('[')) return false;
  if (/^\[DUPLICATE OF JN/i.test(task.taskname)) return false;
  return true;
}

export function findPrimaryForWo(
  tasks: AnstoTaskLite[],
  workOrderNo: string,
  excludeTaskId: string
): AnstoTaskLite | undefined {
  const matches = tasks.filter((t) => t.taskid !== excludeTaskId && t.custon.includes(workOrderNo));
  if (matches.length === 0) return undefined;
  const live = matches.filter((t) => t.status.toLowerCase() !== 'archived');
  const pool = live.length ? live : matches;
  // Prefer a real job (7-digit WO as Cust ON) over an older PO import, then the most recent.
  pool.sort((a, b) => {
    const aExact = SEVEN_DIGIT_WO_RE.test(a.custon) ? 1 : 0;
    const bExact = SEVEN_DIGIT_WO_RE.test(b.custon) ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;
    return Number(b.jobnumber) - Number(a.jobnumber);
  });
  return pool[0];
}

export function findPrimaryForPo(
  tasks: AnstoTaskLite[],
  orderNo: string,
  excludeTaskId: string
): AnstoTaskLite | undefined {
  const matches = tasks.filter(
    (t) =>
      t.taskid !== excludeTaskId &&
      !/^\[(DUPLICATE|NOT A JOB|UNMATCHED)/i.test(t.taskname) &&
      (t.orderNo.includes(orderNo) || t.custon.includes(orderNo))
  );
  if (matches.length === 0) return undefined;
  const live = matches.filter((t) => t.status.toLowerCase() !== 'archived');
  const pool = live.length ? live : matches;
  pool.sort((a, b) => Number(b.jobnumber) - Number(a.jobnumber));
  return pool[0];
}

function cdata(s: string): string {
  return `<![CDATA[${s.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

function mergeOrderNos(existing: string, orderNo: string): string {
  const parts = existing
    .split(/[,/;\s]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.includes(orderNo)) return existing;
  parts.push(orderNo);
  return parts.join(', ');
}

async function postTask(client: AroFloClient, xml: string): Promise<Record<string, unknown>> {
  const response = await client.post('tasks', xml);
  const data = response.data as Record<string, unknown>;
  const zr = isRecord(data) ? data['zoneresponse'] : undefined;
  const pr = isRecord(zr) ? zr['postresults'] : undefined;
  const errors = isRecord(pr) && Array.isArray(pr['errors']) ? pr['errors'] : [];
  if (errors.length) {
    throw new Error(`AroFlo task write errors: ${JSON.stringify(errors).slice(0, 500)}`);
  }
  return isRecord(pr) ? pr : {};
}

async function tomorrowDueDate(): Promise<string> {
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
}

export type PoOutcome =
  | 'paired-with-existing'
  | 'converted-to-primary'
  | 'created-primary'
  | 'already-processed'
  | 'wo-not-readable'
  | 'no-po-pdf'
  | 'dry-run';

export interface PoResult {
  outcome: PoOutcome;
  jobnumber?: string;
  orderNo?: string;
  workOrderNo?: string;
  primaryJobnumber?: string;
  taskName?: string;
  note?: string;
}

export interface ProcessOptions {
  dryRun?: boolean;
  /** APIv2 client - when present the PO PDF is also copied onto the job it is paired with. */
  v2?: AroFloV2Client;
  /** Pre-fetched ANSTO task list to avoid re-pulling for every task in a sweep. */
  knownTasks?: AnstoTaskLite[];
}

/**
 * Process one AroFlo task that carries an ANSTO PO PDF (an AroFlo email import).
 */
export async function processPoTask(
  client: AroFloClient,
  task: AnstoTaskLite,
  options: ProcessOptions = {}
): Promise<PoResult> {
  if (!needsPoProcessing(task)) {
    const hasPdf = task.documents.some((d) => PO_PDF_RE.test(d.name));
    return {
      outcome: hasPdf ? 'already-processed' : 'no-po-pdf',
      jobnumber: task.jobnumber,
      note: hasPdf ? `Cust ON already ${task.custon}` : 'No 4300xxxxxx.pdf attached'
    };
  }
  const pdf = task.documents.find((d) => PO_PDF_RE.test(d.name))!;
  const bytes = await downloadBytes(pdf.url);
  const text = await extractPdfText(bytes);
  const po = parseAnstoPoText(text);
  const orderNo = po.orderNo ?? pdf.name.replace(/\.pdf$/i, '');

  return applyParsedPo(client, po, orderNo, {
    ...options,
    importTask: task,
    pdf: { fileName: `${orderNo}.pdf`, bytes }
  });
}

/**
 * Process PO text that did not come through AroFlo (e.g. read from the email
 * attachment for a PO that was never imported). Creates the job if needed.
 */
export async function processPoText(
  client: AroFloClient,
  poText: string,
  options: ProcessOptions = {}
): Promise<PoResult> {
  const po = parseAnstoPoText(poText);
  if (!po.orderNo) {
    return { outcome: 'wo-not-readable', note: 'No 4300xxxxxx Order No found in text' };
  }
  return applyParsedPo(client, po, po.orderNo, options);
}

async function applyParsedPo(
  client: AroFloClient,
  po: ParsedAnstoPo,
  orderNo: string,
  options: ProcessOptions & {
    importTask?: AnstoTaskLite;
    pdf?: { fileName: string; bytes: Uint8Array };
  }
): Promise<PoResult> {
  const importTask = options.importTask;

  const known = options.knownTasks ?? (await listRecentAnstoTasks(client));

  // Some reactive POs are issued with the "Work Order No" field blank. Never park
  // them: pair on the PO number if a job already carries it, otherwise raise the
  // job under the PO number (Cust ON = 4300...) so it is visible and actioned.
  const reference = po.workOrderNo ?? orderNo;
  const primary = po.workOrderNo
    ? findPrimaryForWo(known, po.workOrderNo, importTask?.taskid ?? '')
    : findPrimaryForPo(known, orderNo, importTask?.taskid ?? '');

  if (primary) {
    if (options.dryRun) {
      return {
        outcome: 'dry-run',
        jobnumber: importTask?.jobnumber,
        orderNo,
        workOrderNo: po.workOrderNo,
        primaryJobnumber: primary.jobnumber,
        note: `Would pair with JN ${primary.jobnumber}`
      };
    }
    const merged = mergeOrderNos(primary.orderNo, orderNo);
    if (merged !== primary.orderNo) {
      await postTask(
        client,
        `<tasks><task><taskid>${primary.taskid}</taskid><customfields><customfield><name>${
          ANSTO_DEFAULTS.orderNoFieldName
        }</name><value>${cdata(merged)}</value></customfield></customfields></task></tasks>`
      );
    }
    if (importTask) {
      await postTask(
        client,
        `<tasks><task><taskid>${importTask.taskid}</taskid><taskname>${cdata(
          `[DUPLICATE OF JN ${primary.jobnumber}] ANSTO PO ${orderNo}`
        )}</taskname><custon>${cdata(reference)}</custon><status>Archived</status></task></tasks>`
      );
    }
    logger.info(
      {
        orderNo,
        workOrderNo: po.workOrderNo,
        primary: primary.jobnumber,
        importTask: importTask?.jobnumber
      },
      'ANSTO PO paired with existing task'
    );
    let pdfNote: string | undefined;
    if (options.v2 && options.pdf) {
      try {
        const { attachPdfToJob } = await import('./ansto-po-pdf.js');
        const r = await attachPdfToJob(
          client,
          options.v2,
          { jobnumber: primary.jobnumber, legacyTaskId: primary.taskid },
          options.pdf
        );
        pdfNote = `PDF ${r.outcome}${r.error ? `: ${r.error}` : ''}`;
      } catch (error) {
        pdfNote = `PDF attach error: ${error instanceof Error ? error.message : String(error)}`;
      }
    }
    return {
      note: pdfNote,
      outcome: 'paired-with-existing',
      jobnumber: importTask?.jobnumber,
      orderNo,
      workOrderNo: po.workOrderNo,
      primaryJobnumber: primary.jobnumber
    };
  }

  // No primary exists: this PO IS the job.
  const taskName = buildTaskName(po);
  const description =
    buildDescriptionHtml(po) +
    (po.workOrderNo
      ? ''
      : `\n<p><strong>CHECK:</strong> The Work Order No field is blank on this PO, so the job is raised under the PO number. Before scheduling, check for an existing ANSTO job for the same works (same building and fault) and merge if found.</p>`);

  if (options.dryRun) {
    return {
      outcome: 'dry-run',
      jobnumber: importTask?.jobnumber,
      orderNo,
      workOrderNo: po.workOrderNo,
      taskName,
      note: importTask ? 'Would convert import task into primary job' : 'Would create new job'
    };
  }

  const common =
    `<taskname>${cdata(taskName)}</taskname>` +
    `<custon>${cdata(reference)}</custon>` +
    `<description>${cdata(description)}</description>` +
    `<status>Not Started</status>` +
    `<substatus><substatusid>${ANSTO_DEFAULTS.newTaskSubstatusId}</substatusid></substatus>` +
    `<customfields><customfield><name>${ANSTO_DEFAULTS.orderNoFieldName}</name><value>${cdata(
      orderNo
    )}</value></customfield></customfields>`;

  if (importTask) {
    await postTask(
      client,
      `<tasks><task><taskid>${importTask.taskid}</taskid>${common}</task></tasks>`
    );
    logger.info(
      { orderNo, workOrderNo: po.workOrderNo, jobnumber: importTask.jobnumber },
      'ANSTO PO import converted into primary job'
    );
    return {
      outcome: 'converted-to-primary',
      jobnumber: importTask.jobnumber,
      orderNo,
      workOrderNo: po.workOrderNo,
      taskName
    };
  }

  const due = await tomorrowDueDate();
  const pr = await postTask(
    client,
    `<tasks><task>` +
      `<org><orgid>${ANSTO_DEFAULTS.orgId}</orgid></org>` +
      `<client><clientid>${ANSTO_DEFAULTS.clientId}</clientid></client>` +
      `<tasktype><tasktypeid>${ANSTO_DEFAULTS.taskTypeId}</tasktypeid></tasktype>` +
      `<duedate>${due}</duedate>` +
      common +
      `</task></tasks>`
  );
  let jobnumber: string | undefined;
  const inserts = pr['inserts'];
  if (isRecord(inserts) && Array.isArray(inserts['tasks'])) {
    const first = inserts['tasks'].find(isRecord);
    if (first) jobnumber = str(first['jobnumber']) || undefined;
  }
  logger.info({ orderNo, workOrderNo: po.workOrderNo, jobnumber }, 'ANSTO PO created as new job');
  return {
    outcome: 'created-primary',
    jobnumber,
    orderNo,
    workOrderNo: po.workOrderNo,
    taskName,
    note: jobnumber
      ? undefined
      : `Inserted (inserttotal=${str(pr['inserttotal'])}); job number not returned`
  };
}

/**
 * Sweep recent ANSTO tasks and process every PO import that is still unmatched.
 */
export async function sweepPoTasks(
  client: AroFloClient,
  options: { dryRun?: boolean; pages?: number; v2?: AroFloV2Client } = {}
): Promise<{ checked: number; candidates: number; results: PoResult[] }> {
  const tasks = await listRecentAnstoTasks(client, {
    pages: options.pages ?? 2,
    pageSize: 500,
    withDocuments: true
  });
  const candidates = tasks.filter(needsPoProcessing);
  const results: PoResult[] = [];
  for (const task of candidates) {
    try {
      results.push(
        await processPoTask(client, task, {
          dryRun: options.dryRun,
          knownTasks: tasks,
          v2: options.v2
        })
      );
    } catch (error) {
      results.push({
        outcome: 'wo-not-readable',
        jobnumber: task.jobnumber,
        note: `Error: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }
  return { checked: tasks.length, candidates: candidates.length, results };
}
