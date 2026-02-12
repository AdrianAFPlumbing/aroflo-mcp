import { describe, expect, it } from 'vitest';

import {
  countZoneArrays,
  mergeZoneResponseData,
  truncateZoneArrays,
  withDebug,
  withZoneResponseMeta
} from '../../../src/aroflo/paginate.js';

describe('AroFlo pagination helpers', () => {
  it('counts arrays in zoneresponse', () => {
    expect(
      countZoneArrays({
        tasks: [{}, {}, {}],
        maxpageresults: 500,
        projects: [{}]
      })
    ).toBe(4);
  });

  it('merges zoneresponse arrays across pages', () => {
    const base = { status: '0', zoneresponse: { tasks: [{ a: 1 }], pagenumber: '1' } };
    const next = { status: '0', zoneresponse: { tasks: [{ a: 2 }], pagenumber: '2' } };
    const { merged } = mergeZoneResponseData(base, next);
    expect((merged as any).zoneresponse.tasks).toHaveLength(2);
    expect((merged as any).zoneresponse.pagenumber).toBe('2');
  });

  it('truncates zoneresponse arrays to maxResults', () => {
    const base = { status: '0', zoneresponse: { tasks: [1, 2, 3, 4] } };
    const { truncated } = truncateZoneArrays(base, 2);
    expect((truncated as any).zoneresponse.tasks).toEqual([1, 2]);
  });

  it('attaches meta/debug without wrapping the envelope', () => {
    const base = { status: '0', zoneresponse: { tasks: [1] } };
    const withMeta = withZoneResponseMeta(base, { pagesFetched: 2 });
    const withDbg = withDebug(withMeta, { foo: 'bar' });
    expect((withDbg as any).status).toBe('0');
    expect((withDbg as any)._debug.foo).toBe('bar');
    expect((withDbg as any).zoneresponse._mcp.pagesFetched).toBe(2);
  });
});
