import { describe, expect, test } from 'vitest';

import { compactZoneResponseData } from '../../../src/aroflo/select.js';

describe('compactZoneResponseData', () => {
  test('slices arrays with maxItems and preserves non-array zoneresponse fields', () => {
    const input = {
      status: '0',
      statusmessage: 'Login OK',
      zoneresponse: {
        pagenumber: '1',
        tasks: [
          { taskid: 't1', taskname: 'One', org: { orgid: 'o1', orgname: 'Org 1' } },
          { taskid: 't2', taskname: 'Two', org: { orgid: 'o2', orgname: 'Org 2' } }
        ]
      }
    };

    const out = compactZoneResponseData(input, { maxItems: 1 }) as any;
    expect(out.zoneresponse.pagenumber).toBe('1');
    expect(out.zoneresponse.tasks).toHaveLength(1);
    expect(out.zoneresponse.tasks[0].taskid).toBe('t1');
  });

  test('picks only selected paths (including nested) when select is provided', () => {
    const input = {
      zoneresponse: {
        tasks: [
          {
            taskid: 't1',
            taskname: 'One',
            extra: 'drop-me',
            org: { orgid: 'o1', orgname: 'Org 1', ignored: true },
            tasktotals: { totalhrs: '3.5', totalcost: '99' }
          }
        ]
      }
    };

    const out = compactZoneResponseData(input, {
      select: ['taskid', 'org.orgname', 'tasktotals.totalhrs']
    }) as any;

    expect(out.zoneresponse.tasks).toHaveLength(1);
    expect(out.zoneresponse.tasks[0]).toEqual({
      taskid: 't1',
      org: { orgname: 'Org 1' },
      tasktotals: { totalhrs: '3.5' }
    });
  });
});
