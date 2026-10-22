import { describe, expect, it } from 'vitest';

import { computeKpi, pickRule, portalFor, SEED_RULES } from '../../../src/kpi/rules.js';
import { addBusinessDays, endOfNextWorkingDay, formatSydney, parseAroFloLocal } from '../../../src/kpi/time.js';
import { mapTask } from '../../../src/kpi/sync.js';

const d = (s: string) => parseAroFloLocal(s) as Date;

describe('Sydney time parsing', () => {
  it('parses AroFlo formats as Sydney local time', () => {
    expect(d('2026/10/21 14:29:38').toISOString()).toBe('2026-10-21T03:29:38.000Z'); // AEDT +11
    expect(d('Oct 21, 2026 3:08:14 PM').toISOString()).toBe('2026-10-21T04:08:14.000Z');
    expect(d('2026/07/01 09:00:00').toISOString()).toBe('2026-06-30T23:00:00.000Z'); // AEST +10
    expect(d('2026-10-21T19:30').toISOString()).toBe('2026-10-21T08:30:00.000Z');
    expect(d('Oct 21, 2026, 3:08:14\u202fPM').toISOString()).toBe('2026-10-21T04:08:14.000Z');
    expect(d('Oct 21, 2026 12:05:00 AM').toISOString()).toBe('2026-10-20T13:05:00.000Z');
    expect(parseAroFloLocal(' ')).toBeNull();
  });
  it('skips weekends and NSW holidays for working days', () => {
    // Fri 2 Oct 2026 10:00 + 1 working day -> Tue 6 Oct (Mon 5 Oct is Labour Day)
    expect(formatSydney(addBusinessDays(d('2026/10/02 10:00:00'), 1))).toBe('06/10/2026 10:00');
    expect(formatSydney(endOfNextWorkingDay(d('2026/10/23 16:00:00')))).toBe('26/10/2026 23:59');
    // Received Saturday: clock starts 07:00 Monday
    expect(formatSydney(addBusinessDays(d('2026/10/24 11:00:00'), 2))).toBe('28/10/2026 07:00');
  });
});

describe('KPI calculation', () => {
  const uosP1 = pickRule(SEED_RULES, 'IyYqWyMK', 'University of Sydney');
  it('uses first assignment for respond and first completion for complete', () => {
    // Real job 267544: received 14:29, assigned 15:08, completed 08:31 next day
    const r = computeKpi(
      { receivedAt: d('2026/10/21 14:29:38'), dueDate: null, firstAssignedAt: d('Oct 21, 2026 3:08:14 PM'), firstCompletedAt: d('2026/10/22 08:31:16'), calloutAttendedAt: null },
      uosP1, d('2026/10/22 18:00:00'));
    expect(r.respond.state).toBe('met');
    expect(r.complete.state).toBe('met');
  });
  it('flags overdue and due soon', () => {
    const base = { receivedAt: d('2026/10/22 09:00:00'), dueDate: null, firstAssignedAt: null, firstCompletedAt: null, calloutAttendedAt: null };
    expect(computeKpi(base, uosP1, d('2026/10/22 10:30:00')).respond.state).toBe('overdue');
    expect(computeKpi(base, uosP1, d('2026/10/22 09:10:00')).respond.state).toBe('due_soon');
    expect(computeKpi(base, uosP1, d('2026/10/22 09:10:00')).complete.state).toBe('on_track');
  });
  it('starts the clock at callout attendance and counts it as the response', () => {
    const r = computeKpi(
      { receivedAt: d('2026/10/22 08:00:00'), dueDate: null, firstAssignedAt: d('2026/10/22 11:00:00'), firstCompletedAt: d('2026/10/22 12:00:00'), calloutAttendedAt: d('2026/10/21 21:30:00') },
      uosP1, d('2026/10/22 18:00:00'));
    expect(r.clockStart?.toISOString()).toBe(d('2026/10/21 21:30:00').toISOString());
    expect(r.respond.state).toBe('met');
    expect(r.complete.state).toBe('met'); // 14.5h after attendance, inside 24h
  });
  it('returns no_kpi without a rule', () => {
    const r = computeKpi({ receivedAt: d('2026/10/22 08:00:00'), dueDate: null, firstAssignedAt: null, firstCompletedAt: null, calloutAttendedAt: null }, null, new Date());
    expect(r.respond.state).toBe('no_kpi');
  });
  it('prefers a client-specific rule over the shared priority rule', () => {
    const rules = [...SEED_RULES, { ...SEED_RULES.find((x) => x.priorityId === 'IycqVyEK')!, client: 'Downer - Stockland', label: 'Stockland P3' }];
    expect(pickRule(rules, 'IycqVyEK', 'Downer - Stockland')?.label).toBe('Stockland P3');
    expect(pickRule(rules, 'IycqVyEK', 'Downer (Ausgrid)')?.label).toBe('Downer - P3');
  });
});

describe('portal mapping', () => {
  it('maps clients to portals', () => {
    expect(portalFor('University of Sydney')).toBe('uos');
    expect(portalFor('UNSW - All Planned Maintenance')).toBe('unsw');
    expect(portalFor('Downer (Ausgrid)')).toBe('mywork_ausgrid');
    expect(portalFor('Downer Asahi')).toBe('mywork_ausgrid');
    expect(portalFor('Downer (Defence)')).toBe('mywork_defence');
    expect(portalFor('BGIS - OPTUS')).toBe('bsafe');
    expect(portalFor('Downer - Stockland')).toBeNull();
    expect(portalFor('ANSTO')).toBeNull();
  });
});

describe('AroFlo task mapping', () => {
  it('takes the earliest assignment, current assignees and the close-off stamp', () => {
    const row = mapTask({
      jobnumber: '267479', taskid: 'JidaVydRXEMkCg==', status: 'Completed', priority: 'IyYqWyMK', custon: '8036578',
      requestdatetime: '2026/10/21 09:36:51', completeddatetime: '2026/10/21 12:00:18', duedate: '2026/10/21',
      client: { clientname: 'University of Sydney' }, substatus: { substatus: '' },
      assigneds: [
        { user: { username: 'Andrew Vander Voort' }, timeassigned: 'Oct 21, 2026 11:49:53 AM', dateunassigned: '2026/10/21' },
        { user: { username: 'Luke Thurkettle' }, timeassigned: 'Oct 21, 2026 9:46:48 AM', dateunassigned: '2026/10/21' }
      ],
      customfields: [{ name: 'Close off Number', value: 'PORTAL CLOSED' }, { name: 'Close off No. Date', value: '22/10/2026' }]
    })!;
    expect(row.firstAssignedTo).toBe('Luke Thurkettle');
    expect(formatSydney(row.firstAssignedAt)).toBe('21/10/2026 09:46');
    expect(row.portal).toBe('uos');
    expect(row.portalCloseValue).toBe('PORTAL CLOSED');
    expect(formatSydney(row.completedAt)).toBe('21/10/2026 12:00');
    expect(row.priorityId).toBe('IyYqWyMK');
  });
  it('treats priority 0 as none and open jobs as not completed', () => {
    const row = mapTask({ jobnumber: '1', status: 'In Progress', priority: 0, completeddatetime: '2026/10/21 12:00:18', client: { clientname: 'ANSTO' } })!;
    expect(row.priorityId).toBeNull();
    expect(row.completedAt).toBeNull();
  });
});
