import { AroFloWhereValidationError } from '../utils/errors.js';
import { zoneToToolSuffix } from './zones.js';
import { getZoneDocInfo } from './zone-docs.js';

function parseWhereField(whereClause: string): string | undefined {
  const trimmed = whereClause.trim();
  const parts = trimmed.split('|');
  if (parts.length !== 4) {
    return undefined;
  }
  const conj = parts[0]?.trim().toLowerCase();
  if (conj !== 'and' && conj !== 'or') {
    return undefined;
  }
  const field = parts[1]?.trim().toLowerCase();
  return field && field.length > 0 ? field : undefined;
}

export interface ValidateWhereOptions {
  zone: string;
  where?: string[];
}

export async function validateWhereOrThrow(options: ValidateWhereOptions): Promise<void> {
  const where = options.where ?? [];
  if (where.length === 0) {
    return;
  }

  const slug = zoneToToolSuffix(options.zone);
  const doc = await getZoneDocInfo(slug);
  if (!doc) {
    return;
  }
  // Fail open if docs were extracted but no WHERE field table could be parsed.
  // This avoids regressions for zones whose docs deviate from the expected format.
  if (doc.whereFields.size === 0) {
    return;
  }

  const invalid: string[] = [];
  for (const clause of where) {
    const field = parseWhereField(clause);
    if (!field) {
      continue;
    }
    if (!doc.whereFields.has(field)) {
      invalid.push(field);
    }
  }

  if (invalid.length === 0) {
    return;
  }

  const uniq = Array.from(new Set(invalid)).sort((a, b) => a.localeCompare(b));
  const allowedPreview = Array.from(doc.whereFields)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 30);

  let hint = '';
  if (slug === 'tasks' && uniq.includes('projectid')) {
    hint =
      ' Tasks does not support WHERE projectid; use join=project and filter client-side, ' +
      'or call aroflo_list_project_tasks_with_hours / aroflo_report_open_projects_with_task_hours.';
  }

  throw new AroFloWhereValidationError(
    `Invalid WHERE field(s) for zone ${options.zone}: ${uniq.join(', ')}. ` +
      `See aroflo://docs/api/${doc.slug}. Allowed WHERE fields include: ${allowedPreview.join(', ')}.${hint}`
  );
}
