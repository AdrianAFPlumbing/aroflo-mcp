import { describe, expect, it } from 'vitest';

import {
  addTaskLabour,
  buildLabourBody,
  hoursBetween,
  listTaskLabour,
  resolveUserId,
  resolveWorkTypeId
} from '../../../src/aroflo/v2-tasks.js';

const ok = (data: unknown) => ({ httpStatus: 200, headers: {}, data });

describe('v2 labour helpers', () => {
  it('computes hours from HH:MM and rejects spans over midnight', () => {
    expect(hoursBetween('07:00', '15:30')).toBe(8.5);
    expect(hoursBetween('6:00', '15:30')).toBe(9.5);
    expect(hoursBetween('11:30', '13:00')).toBe(1.5);
    expect(() => hoursBetween('15:30', '07:00')).toThrow(/after startTime/);
    expect(() => hoursBetween('7am', '15:30')).toThrow(/HH:MM/);
  });

  it('builds the POST body, normalising times and deriving hours', () => {
    expect(
      buildLabourBody({
        userId: 'U1',
        workTypeId: 'W1',
        date: '2026-10-26',
        startTime: '6:00',
        finishTime: '15:30',
        note: 'per timesheet'
      })
    ).toEqual({
      userId: 'U1',
      workTypeId: 'W1',
      date: '2026-10-26',
      startTime: '06:00',
      finishTime: '15:30',
      hours: 9.5,
      note: 'per timesheet'
    });
    expect(
      buildLabourBody({ userId: 'U1', workTypeId: 'W1', date: '2026-10-26', hours: 2 })
    ).toEqual({ userId: 'U1', workTypeId: 'W1', date: '2026-10-26', hours: 2 });
    expect(() =>
      buildLabourBody({ userId: 'U1', workTypeId: 'W1', date: '26/10/2026', hours: 2 })
    ).toThrow(/YYYY-MM-DD/);
    expect(() =>
      buildLabourBody({ userId: 'U1', workTypeId: 'W1', date: '2026-10-26', startTime: '07:00' })
    ).toThrow(/together/);
    expect(() =>
      buildLabourBody({
        userId: 'U1',
        workTypeId: 'W1',
        date: '2026-10-26',
        startTime: '07:00',
        finishTime: '15:30',
        hours: 4
      })
    ).toThrow(/does not match/);
    expect(() => buildLabourBody({ userId: 'U1', workTypeId: 'W1', date: '2026-10-26' })).toThrow(
      /Provide hours/
    );
  });

  it('books an overnight block on the start date as hours only, times in the note', () => {
    expect(
      buildLabourBody({
        userId: 'U1',
        workTypeId: 'W1',
        date: '2026-10-21',
        startTime: '21:00',
        finishTime: '01:00',
        overnight: true,
        note: 'night works'
      })
    ).toEqual({
      userId: 'U1',
      workTypeId: 'W1',
      date: '2026-10-21',
      hours: 4,
      note: 'night works (21:00–01:00 next day)'
    });
    expect(
      buildLabourBody({
        userId: 'U1',
        workTypeId: 'W1',
        date: '2026-10-22',
        startTime: '21:00',
        finishTime: '05:00',
        overnight: true
      })
    ).toMatchObject({ hours: 8, note: '21:00–05:00 next day' });
    expect(() =>
      buildLabourBody({
        userId: 'U1',
        workTypeId: 'W1',
        date: '2026-10-22',
        startTime: '07:00',
        finishTime: '15:30',
        overnight: true
      })
    ).toThrow(/drop overnight/);
    expect(() =>
      buildLabourBody({
        userId: 'U1',
        workTypeId: 'W1',
        date: '2026-10-22',
        startTime: '21:00',
        finishTime: '05:00'
      })
    ).toThrow(/after startTime/);
  });

  it('resolves work types by exact name only', async () => {
    const v2 = {
      get: async () =>
        ok({
          items: [
            { id: 'W1', name: 'Ausgrid' },
            { id: 'W2', name: 'Ausgrid After Hours' },
            { id: 'W3', name: 'Generic' }
          ],
          page: { count: 1 }
        })
    };
    await expect(resolveWorkTypeId(v2 as any, 'ausgrid')).resolves.toEqual({
      id: 'W1',
      name: 'Ausgrid'
    });
    await expect(resolveWorkTypeId(v2 as any, 'W3')).resolves.toEqual({
      id: 'W3',
      name: 'Generic'
    });
    await expect(resolveWorkTypeId(v2 as any, 'Ausgrid AH')).rejects.toThrow(/No work type/);
    await expect(resolveWorkTypeId(v2 as any, 'After')).rejects.toThrow(/close matches/);
  });

  it('resolves users by full name or email, skipping archived users', async () => {
    const v2 = {
      get: async () =>
        ok({
          items: [
            { id: 'U1', givenName: 'Anil', familyName: 'Kumar', email: 'akumar@ausfp.com.au' },
            { id: 'U2', givenName: 'Craig', familyName: 'Gordon', email: 'cgordon@ausfp.com.au' },
            { id: 'U3', givenName: 'Craig', familyName: 'Gordon', email: 'old@x', isArchived: true }
          ],
          page: { count: 1 }
        })
    };
    await expect(resolveUserId(v2 as any, 'anil kumar')).resolves.toEqual({
      id: 'U1',
      name: 'Anil Kumar'
    });
    await expect(resolveUserId(v2 as any, 'CGORDON@ausfp.com.au')).resolves.toEqual({
      id: 'U2',
      name: 'Craig Gordon'
    });
    await expect(resolveUserId(v2 as any, 'Craig')).rejects.toThrow(/No active user/);
  });

  it('filters existing labour by user and date, and posts to the labours path', async () => {
    const calls: unknown[] = [];
    const v2 = {
      get: async (path: string) => {
        calls.push(['GET', path]);
        return ok({
          items: [
            { id: 'L1', date: '2026-10-20', user: { id: 'U1' }, hours: '1.00' },
            { id: 'L2', date: '2026-10-21', user: { id: 'U1' }, hours: '2.00' },
            { id: 'L3', date: '2026-10-21', user: { id: 'U2' }, hours: '3.00' }
          ],
          page: { count: 1 }
        });
      },
      post: async (path: string, body: unknown) => {
        calls.push(['POST', path, body]);
        return { httpStatus: 201, headers: {}, data: { id: 'L4' } };
      }
    };
    const existing = await listTaskLabour(v2 as any, 'T1', { userId: 'U1', date: '2026-10-21' });
    expect(existing.map((l) => l.id)).toEqual(['L2']);

    const r = await addTaskLabour(v2 as any, 'T1', {
      userId: 'U1',
      workTypeId: 'W1',
      date: '2026-10-22',
      startTime: '07:00',
      finishTime: '15:30'
    });
    expect(r.response.data).toEqual({ id: 'L4' });
    expect(calls.at(-1)).toEqual([
      'POST',
      'tasks/T1/labours',
      {
        userId: 'U1',
        workTypeId: 'W1',
        date: '2026-10-22',
        startTime: '07:00',
        finishTime: '15:30',
        hours: 8.5
      }
    ]);
  });
});
