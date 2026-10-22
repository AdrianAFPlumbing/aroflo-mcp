// Sydney-time helpers for the KPI dashboard.
//
// AroFlo returns local Sydney wall-clock strings ("2026/10/21 14:29:38",
// "Oct 21, 2026 3:08:14 PM", "2026/10/21"). Everything is converted to real
// instants (Date) so KPI maths is correct across daylight-saving changes.

const TZ = 'Australia/Sydney';

const dtf = new Intl.DateTimeFormat('en-AU', {
  timeZone: TZ,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  weekday: 'short'
});

export interface SydParts {
  y: number;
  mo: number; // 1-12
  d: number;
  h: number;
  mi: number;
  s: number;
  weekday: number; // 0=Sun .. 6=Sat
}

const WD: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function sydneyParts(date: Date): SydParts {
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) p[part.type] = part.value;
  return {
    y: Number(p['year']),
    mo: Number(p['month']),
    d: Number(p['day']),
    h: Number(p['hour']) % 24,
    mi: Number(p['minute']),
    s: Number(p['second']),
    weekday: WD[p['weekday'] ?? 'Mon'] ?? 1
  };
}

/** Convert a Sydney wall-clock time to a real instant. */
export function sydneyToDate(y: number, mo: number, d: number, h = 0, mi = 0, s = 0): Date {
  const target = Date.UTC(y, mo - 1, d, h, mi, s);
  // Start from a +10h guess and correct by the observed offset (twice handles DST edges).
  let guess = target - 10 * 3600_000;
  for (let i = 0; i < 3; i++) {
    const p = sydneyParts(new Date(guess));
    const seen = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s);
    const diff = target - seen;
    if (diff === 0) break;
    guess += diff;
  }
  return new Date(guess);
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
};

/** Parse any AroFlo date/time string (Sydney local). Returns null for blanks. */
export function parseAroFloLocal(value: unknown): Date | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  if (!v) return null;

  // 2026/10/21 14:29:38  |  2026/10/21  |  2026-10-21T14:29:38
  let m = v.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (m) {
    return sydneyToDate(Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4] ?? 0), Number(m[5] ?? 0), Number(m[6] ?? 0));
  }
  // Oct 21, 2026 3:08:14 PM  (also tolerates 'Oct 21, 2026, 3:08:14\u202fPM')
  m = v.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}),? (\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?[\s\u202f]*([AP]M)?$/i);
  if (m) {
    let h = Number(m[4]);
    const ap = (m[7] ?? '').toUpperCase();
    if (ap === 'PM' && h < 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    const mo = MONTHS[(m[1] ?? '').toLowerCase()];
    if (!mo) return null;
    return sydneyToDate(Number(m[3]), mo, Number(m[2]), h, Number(m[5]), Number(m[6] ?? 0));
  }
  return null;
}

// NSW public holidays (state-wide). Business-day KPIs skip these and weekends.
// Update each year. 2027 Anzac Day falls on a Sunday and is not substituted in NSW.
const NSW_HOLIDAYS = new Set<string>([
  '2026-01-01', '2026-01-26', '2026-04-03', '2026-04-04', '2026-04-05', '2026-04-06',
  '2026-04-25', '2026-06-08', '2026-10-05', '2026-12-25', '2026-12-26', '2026-12-28',
  '2027-01-01', '2027-01-26', '2027-03-26', '2027-03-27', '2027-03-28', '2027-03-29',
  '2027-06-14', '2027-10-04', '2027-12-25', '2027-12-26', '2027-12-27', '2027-12-28'
]);

function key(p: { y: number; mo: number; d: number }): string {
  return `${p.y}-${String(p.mo).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
}

export function isWorkingDay(date: Date): boolean {
  const p = sydneyParts(date);
  if (p.weekday === 0 || p.weekday === 6) return false;
  return !NSW_HOLIDAYS.has(key(p));
}

/** Noon on the next calendar day in Sydney (safe stepping across DST). */
function nextDayNoon(date: Date): Date {
  const p = sydneyParts(date);
  const noon = sydneyToDate(p.y, p.mo, p.d, 12);
  return new Date(noon.getTime() + 24 * 3600_000);
}

/** Add N working days, keeping the Sydney time of day of `start`. */
export function addBusinessDays(start: Date, days: number): Date {
  let cursor = start;
  // A job received on a non-working day starts its clock 07:00 next working day.
  if (!isWorkingDay(cursor)) {
    while (!isWorkingDay(cursor)) cursor = nextDayNoon(cursor);
    const p = sydneyParts(cursor);
    cursor = sydneyToDate(p.y, p.mo, p.d, 7, 0, 0);
  }
  const keep = sydneyParts(cursor);
  let remaining = days;
  let day = cursor;
  while (remaining > 0) {
    day = nextDayNoon(day);
    if (isWorkingDay(day)) remaining -= 1;
  }
  const p = sydneyParts(day);
  return sydneyToDate(p.y, p.mo, p.d, keep.h, keep.mi, keep.s);
}

/** 23:59:59 at the end of the next working day after `start`. */
export function endOfNextWorkingDay(start: Date): Date {
  let day = nextDayNoon(start);
  while (!isWorkingDay(day)) day = nextDayNoon(day);
  const p = sydneyParts(day);
  return sydneyToDate(p.y, p.mo, p.d, 23, 59, 59);
}

/** 23:59:59 Sydney on a given date. */
export function endOfDay(date: Date): Date {
  const p = sydneyParts(date);
  return sydneyToDate(p.y, p.mo, p.d, 23, 59, 59);
}

export function formatSydney(date: Date | null): string {
  if (!date) return '';
  const p = sydneyParts(date);
  return `${String(p.d).padStart(2, '0')}/${String(p.mo).padStart(2, '0')}/${p.y} ${String(p.h).padStart(2, '0')}:${String(p.mi).padStart(2, '0')}`;
}
