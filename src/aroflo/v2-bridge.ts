import type { AroFloClient } from './client.js';
import { extractZoneItems } from './items.js';
import type { AroFloV2Client } from './v2-client.js';
import { AroFloApiError } from '../utils/errors.js';

/**
 * Bridges between the legacy API and APIv2.
 *
 * APIv2 has no job-number filter on GET /tasks, but every AFP workflow starts
 * from a 6-digit job number. The legacy Tasks zone does filter by jobnumber, so
 * we resolve jobnumber -> legacy taskid there, then convert that id with
 * POST /idconversions and read the task from v2.
 */

export interface IdConversionItem {
  legacyId: string;
  id: string;
}

export async function convertLegacyIds(
  v2: AroFloV2Client,
  legacyIds: string[]
): Promise<IdConversionItem[]> {
  if (legacyIds.length === 0) return [];
  const response = await v2.post<{ count?: number; items?: IdConversionItem[] }>('idconversions', {
    ids: legacyIds
  });
  return response.data?.items ?? [];
}

export async function legacyTaskIdForJobNumber(
  legacy: AroFloClient,
  jobNumber: number
): Promise<string> {
  const response = await legacy.get('Tasks', {
    where: [`and|jobnumber|=|${jobNumber}`],
    pageSize: 5
  });
  const { items } = extractZoneItems('Tasks', response.data);
  const task = items.find((t) => {
    const rec = t as Record<string, unknown>;
    return Number(rec['jobnumber']) === jobNumber && typeof rec['taskid'] === 'string';
  }) as Record<string, unknown> | undefined;

  if (!task) {
    throw new AroFloApiError(`No AroFlo task found for job number ${jobNumber}`, {
      statusCode: 404
    });
  }
  return task['taskid'] as string;
}

export async function v2TaskIdForJobNumber(
  legacy: AroFloClient,
  v2: AroFloV2Client,
  jobNumber: number
): Promise<{ legacyTaskId: string; taskId: string }> {
  const legacyTaskId = await legacyTaskIdForJobNumber(legacy, jobNumber);
  const [converted] = await convertLegacyIds(v2, [legacyTaskId]);
  if (!converted?.id) {
    throw new AroFloApiError(`Could not convert legacy task id for job ${jobNumber} to a v2 id`, {
      statusCode: 502
    });
  }
  return { legacyTaskId, taskId: converted.id };
}
