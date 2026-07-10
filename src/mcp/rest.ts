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

/**
 * GET /tasks — returns active AroFlo tasks whose sub-status is "Quote Required".
 *
 * Why filter in code: AroFlo's Tasks zone does NOT allow WHERE on `substatus`
 * (only status/jobnumber/clientname/dates). We therefore pull active tasks via a
 * valid `status IN (...)` filter (which also overrides the default 30-day filter),
 * then filter on the returned substatus field ourselves.
 */
export async function handleTasksRest(
  _req: IncomingMessage,
  res: ServerResponse,
  client: AroFloClient
): Promise<void> {
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

  const tasks = collected
    .filter((task) => getSubstatusName(task).toLowerCase() === TARGET_SUBSTATUS)
    .map(mapTask);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', count: tasks.length, tasks }));
}

