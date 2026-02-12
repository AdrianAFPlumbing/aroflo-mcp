import { describe, expect, test } from 'vitest';

import { getZoneDocInfo } from '../../../src/aroflo/zone-docs.js';

describe('zone-docs', () => {
  test('parses WHERE filters and JOINs for common zones', async () => {
    const tasks = await getZoneDocInfo('tasks');
    expect(tasks).toBeTruthy();
    expect(tasks?.whereFields.has('taskid')).toBe(true);
    expect(tasks?.joinAreas.has('tasktotals')).toBe(true);
  });

  test('parses docs that use "## WHERE" heading (transactionterms)', async () => {
    const tt = await getZoneDocInfo('transactionterms');
    expect(tt).toBeTruthy();
    expect(tt?.whereFields.has('transactiontermid')).toBe(true);
  });

  test('parses docs that use "## JOINs" heading (taskexpenses)', async () => {
    const te = await getZoneDocInfo('taskexpenses');
    expect(te).toBeTruthy();
    // Not all zones document JOINs, but TaskExpenses does in this repo.
    expect(te?.joinAreas.size).toBeGreaterThan(0);
  });
});
