import { addBusinessDays, endOfDay, endOfNextWorkingDay } from './time.js';

// ---------------------------------------------------------------------------
// KPI rules: one row per AroFlo priority (optionally per client, because some
// priorities such as "P3 - Downer" are shared by Ausgrid and Stockland).
// Respond = time to FIRST ASSIGNMENT to a technician (or the callout attendance
// time when a job was attended before it was received).
// Complete = time to the FIRST time the job was completed in AroFlo.
// ---------------------------------------------------------------------------

export type WindowUnit =
  | 'minutes'
  | 'hours'
  | 'calendar_days'
  | 'business_days'
  | 'next_working_day'
  | 'due_date';

export interface KpiWindow {
  value: number | null;
  unit: WindowUnit | null;
}

export interface KpiRule {
  priorityId: string;
  client: string | null; // null = applies to any client using this priority
  label: string;
  respond: KpiWindow;
  complete: KpiWindow;
  confirmed: boolean;
  notes: string;
}

const W = (value: number | null, unit: WindowUnit | null): KpiWindow => ({ value, unit });
const NONE = W(null, null);

/**
 * Seed rules, taken from the wording of each AroFlo priority and the KPI
 * schedules recorded in the close-off skills. `confirmed: false` means the
 * window is inferred or missing and must be checked against the contract.
 */
export const SEED_RULES: KpiRule[] = [
  // UNSW
  { priorityId: 'IidKVCAK', client: null, label: 'UNSW - CRITICAL', respond: W(30, 'minutes'), complete: NONE, confirmed: false, notes: 'Respond 30 min per priority name. Completion window not recorded.' },
  { priorityId: 'IidKWCAK', client: null, label: 'UNSW - HIGH', respond: W(1, 'hours'), complete: NONE, confirmed: false, notes: 'Priority name says 1 hour; AroFlo response time is set to 2 hours. Completion window not recorded.' },
  { priorityId: 'IidKXCAK', client: null, label: 'UNSW - MEDIUM', respond: W(4, 'hours'), complete: NONE, confirmed: false, notes: 'Respond 4 hours per priority name. Completion window not recorded.' },
  { priorityId: 'IidKQCAK', client: null, label: 'UNSW - LOW', respond: W(1, 'next_working_day'), complete: NONE, confirmed: false, notes: 'Respond by next working day per priority name. Completion window not recorded.' },
  // University of Sydney
  { priorityId: 'IyYqWyMK', client: null, label: 'UOS - P1', respond: W(1, 'hours'), complete: W(24, 'hours'), confirmed: true, notes: 'KPI 3A.1 / 3B.1.' },
  { priorityId: 'IyYqWywK', client: null, label: 'UOS - P2', respond: W(24, 'hours'), complete: W(7, 'calendar_days'), confirmed: true, notes: 'KPI 3A.2 / 3B.2.' },
  { priorityId: 'IycqXyIK', client: null, label: 'UOS - P2 (alt code)', respond: W(24, 'hours'), complete: W(7, 'calendar_days'), confirmed: true, notes: 'Second AroFlo code also used for UOS P2.' },
  { priorityId: 'IyYqWy0K', client: null, label: 'UOS - P3', respond: NONE, complete: W(30, 'calendar_days'), confirmed: false, notes: 'UOS contract says 30 days; AroFlo priority says 28 days. Using 30 until confirmed.' },
  // BGIS (Sydney Airport)
  { priorityId: 'IidKUCAK', client: null, label: 'BGIS - P1', respond: W(30, 'minutes'), complete: NONE, confirmed: false, notes: 'Emergency 30 minutes per priority name.' },
  { priorityId: 'IidKLCAK', client: null, label: 'BGIS - P2', respond: W(2, 'hours'), complete: NONE, confirmed: false, notes: 'Immediate 2 hours per priority name.' },
  { priorityId: 'IiQqSCAK', client: null, label: 'BGIS - P3', respond: W(24, 'hours'), complete: NONE, confirmed: false, notes: 'Urgent 24 hours per priority name.' },
  { priorityId: 'IycqQyYK', client: null, label: 'BGIS - P3.5', respond: NONE, complete: W(7, 'calendar_days'), confirmed: false, notes: 'Reactive 7 days per priority name.' },
  { priorityId: 'IidKKCAK', client: null, label: 'BGIS - P4', respond: NONE, complete: W(28, 'calendar_days'), confirmed: false, notes: 'Routine 28 days per priority name.' },
  { priorityId: 'IiQ6TCAK', client: null, label: 'BGIS - P5', respond: NONE, complete: W(null, 'due_date'), confirmed: false, notes: 'Specified - completion due on the task due date.' },
  // Optus (BGIS)
  { priorityId: 'IyQqUyEK', client: null, label: 'OPTUS - P1', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IyQqUyIK', client: null, label: 'OPTUS - P2', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IyQqUyMK', client: null, label: 'OPTUS - P3', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  // Downer Ausgrid / Asahi / Stockland
  { priorityId: 'IyYqQy0K', client: null, label: 'Ausgrid - EMG', respond: W(2, 'hours'), complete: W(2, 'calendar_days'), confirmed: false, notes: 'Respond 2 hours, complete 2 days per priority name.' },
  { priorityId: 'IyYqXyQK', client: null, label: 'Ausgrid - STN', respond: W(2, 'business_days'), complete: W(5, 'business_days'), confirmed: false, notes: 'Name says respond 2 days (AroFlo set to 1 week). Ausgrid orders often read "On-site next bus day, completion 5 bus days".' },
  { priorityId: 'IycqVycK', client: null, label: 'Downer - P1', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IycqVyAK', client: null, label: 'Downer - P2', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IycqVyEK', client: null, label: 'Downer - P3', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded. Shared by Ausgrid and Stockland.' },
  { priorityId: 'IycqVyIK', client: null, label: 'Downer - P4', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  // Downer Defence
  { priorityId: 'IyQqLyUK', client: null, label: 'Defence - IMM2H', respond: W(2, 'hours'), complete: NONE, confirmed: false, notes: 'Inferred from code: immediate 2 hours.' },
  { priorityId: 'IyQqLyYK', client: null, label: 'Defence - INT7D', respond: NONE, complete: W(7, 'calendar_days'), confirmed: false, notes: 'Inferred from code: 7 days.' },
  { priorityId: 'IyQqLycK', client: null, label: 'Defence - RTN14D', respond: NONE, complete: W(14, 'calendar_days'), confirmed: false, notes: 'Inferred from code: routine 14 days.' },
  { priorityId: 'IyQqLyAK', client: null, label: 'Defence - MWA', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  // ServiceFM
  { priorityId: 'JCYqTyxQQCAgCg==', client: null, label: 'ServiceFM - Critical', respond: W(1, 'hours'), complete: W(8, 'hours'), confirmed: true, notes: 'Per priority name.' },
  { priorityId: 'JCYqTyxQUCAgCg==', client: null, label: 'ServiceFM - High', respond: W(4, 'hours'), complete: W(48, 'hours'), confirmed: true, notes: 'Per priority name.' },
  { priorityId: 'JCYqTyxQICAgCg==', client: null, label: 'ServiceFM - Medium', respond: W(7, 'calendar_days'), complete: W(14, 'calendar_days'), confirmed: true, notes: 'Per priority name.' },
  { priorityId: 'JCYqSyZQICAgCg==', client: null, label: 'ServiceFM - Low', respond: W(15, 'calendar_days'), complete: W(30, 'calendar_days'), confirmed: true, notes: 'Per priority name.' },
  // Reece
  { priorityId: 'IyQqUyYK', client: null, label: 'Reece - P2', respond: W(24, 'hours'), complete: NONE, confirmed: false, notes: 'Same day / 24 hr response per priority name.' },
  { priorityId: 'IyQqUycK', client: null, label: 'Reece - P3', respond: NONE, complete: W(7, 'business_days'), confirmed: false, notes: '7 working days per priority name.' },
  { priorityId: 'IyQqUyAK', client: null, label: 'Reece - P4', respond: NONE, complete: W(91, 'calendar_days'), confirmed: false, notes: '3 months per priority name.' },
  // Others with no windows recorded
  { priorityId: 'IyQqVyIK', client: null, label: 'ANSTO - 2-HIGH', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IyQqVyMK', client: null, label: 'ANSTO - 3-MEDIUM', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IyQqVywK', client: null, label: 'ANSTO - 4-LOW', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IyQqVy0K', client: null, label: 'KNIGHT - HIGH', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IyQqUyQK', client: null, label: 'KNIGHT - MEDIUM', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' },
  { priorityId: 'IyQqUyUK', client: null, label: 'KNIGHT - LOW', respond: NONE, complete: NONE, confirmed: false, notes: 'No window recorded.' }
];

// ---------------------------------------------------------------------------
// KPI calculation
// ---------------------------------------------------------------------------

export function windowDue(start: Date, w: KpiWindow, dueDate: Date | null): Date | null {
  if (!w.unit) return null;
  const v = w.value ?? 0;
  switch (w.unit) {
    case 'minutes':
      return new Date(start.getTime() + v * 60_000);
    case 'hours':
      return new Date(start.getTime() + v * 3600_000);
    case 'calendar_days':
      return new Date(start.getTime() + v * 86_400_000);
    case 'business_days':
      return addBusinessDays(start, v);
    case 'next_working_day':
      return endOfNextWorkingDay(start);
    case 'due_date':
      return dueDate ? endOfDay(dueDate) : null;
    default:
      return null;
  }
}

export type LegState = 'met' | 'missed' | 'overdue' | 'due_soon' | 'on_track' | 'no_kpi';

export interface LegResult {
  state: LegState;
  dueAt: Date | null;
  doneAt: Date | null;
}

/** Warn when 25% of the window (minimum 1 hour) or less remains. */
function legState(start: Date, dueAt: Date | null, doneAt: Date | null, now: Date): LegState {
  if (!dueAt) return 'no_kpi';
  if (doneAt) return doneAt.getTime() <= dueAt.getTime() ? 'met' : 'missed';
  const left = dueAt.getTime() - now.getTime();
  if (left < 0) return 'overdue';
  const span = Math.max(dueAt.getTime() - start.getTime(), 0);
  const warn = Math.max(span * 0.25, 3600_000);
  return left <= warn ? 'due_soon' : 'on_track';
}

export interface KpiJobInput {
  receivedAt: Date | null;
  dueDate: Date | null;
  firstAssignedAt: Date | null;
  firstCompletedAt: Date | null;
  calloutAttendedAt: Date | null; // set only when the job is flagged as a callout
}

export interface KpiResult {
  clockStart: Date | null;
  respond: LegResult;
  complete: LegResult;
}

export function computeKpi(job: KpiJobInput, rule: KpiRule | null, now: Date): KpiResult {
  // A callout attended before the job was received starts the clock at attendance.
  const clockStart = job.calloutAttendedAt ?? job.receivedAt;
  const respondDone = job.calloutAttendedAt ?? job.firstAssignedAt;

  if (!clockStart || !rule) {
    return {
      clockStart,
      respond: { state: 'no_kpi', dueAt: null, doneAt: respondDone },
      complete: { state: 'no_kpi', dueAt: null, doneAt: job.firstCompletedAt }
    };
  }
  const rDue = windowDue(clockStart, rule.respond, job.dueDate);
  const cDue = windowDue(clockStart, rule.complete, job.dueDate);
  return {
    clockStart,
    respond: { state: legState(clockStart, rDue, respondDone, now), dueAt: rDue, doneAt: respondDone },
    complete: { state: legState(clockStart, cDue, job.firstCompletedAt, now), dueAt: cDue, doneAt: job.firstCompletedAt }
  };
}

export function pickRule(rules: KpiRule[], priorityId: string | null, client: string): KpiRule | null {
  if (!priorityId) return null;
  const exact = rules.find((r) => r.priorityId === priorityId && r.client && r.client === client);
  return exact ?? rules.find((r) => r.priorityId === priorityId && !r.client) ?? null;
}

// ---------------------------------------------------------------------------
// Which client portal (if any) a job must be closed off in.
// ---------------------------------------------------------------------------
export type PortalKey = 'uos' | 'unsw' | 'mywork_ausgrid' | 'mywork_defence' | 'bsafe';

export const PORTAL_LABEL: Record<PortalKey, string> = {
  uos: 'UOS Archibus',
  unsw: 'UNSW Archibus',
  mywork_ausgrid: 'Downer Mywork (Ausgrid/Asahi)',
  mywork_defence: 'Downer Mywork (Defence)',
  bsafe: 'BGIS BSAFE'
};

export const PORTAL_SKILL: Record<PortalKey, string> = {
  uos: 'uos-archibus-close-off',
  unsw: 'unsw-archibus-close-off',
  mywork_ausgrid: 'ausgrid-close',
  mywork_defence: 'downer-reconcile',
  bsafe: 'bsafe-close'
};

export function portalFor(client: string): PortalKey | null {
  const c = client.toLowerCase();
  if (c === 'university of sydney') return 'uos';
  if (c.includes('unsw') || c.includes('university of new south wales')) return 'unsw';
  if (c.includes('downer') && (c.includes('ausgrid') || c.includes('asahi'))) return 'mywork_ausgrid';
  if (c.includes('downer') && c.includes('defence')) return 'mywork_defence';
  if (c.startsWith('bgis')) return 'bsafe';
  return null;
}
