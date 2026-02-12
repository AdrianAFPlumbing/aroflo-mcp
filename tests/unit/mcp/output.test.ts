import { describe, expect, test } from 'vitest';

import { buildZoneDataEnvelope } from '../../../src/mcp/output.js';

describe('buildZoneDataEnvelope', () => {
  test('data mode returns minimal envelope without meta/debug/raw', () => {
    const response = {
      httpStatus: 200,
      headers: {},
      rateLimits: {},
      data: { zoneresponse: { tasks: [{ taskid: 't1' }, { taskid: 't2' }] } }
    };

    const out = buildZoneDataEnvelope({
      zone: 'Tasks',
      response: response as any,
      page: 1,
      pageSize: 2,
      mode: 'data'
    });

    expect(out.zone).toBe('Tasks');
    expect(out.count).toBe(2);
    expect(out.hasMore).toBe(true);
    expect(out).not.toHaveProperty('meta');
    expect(out).not.toHaveProperty('debug');
    expect(out).not.toHaveProperty('rawArofloResponse');
  });

  test('includes itemsKey when zoneresponse array key does not match expected zone key', () => {
    const response = {
      httpStatus: 200,
      headers: {},
      rateLimits: {},
      data: { zoneresponse: { somethingelse: [{ id: 1 }] } }
    };

    const out = buildZoneDataEnvelope({
      zone: 'Tasks',
      response: response as any,
      page: 1,
      pageSize: 10,
      mode: 'data'
    });

    expect(out.itemsKey).toBe('somethingelse');
    expect(out.count).toBe(1);
  });

  test('verbose mode includes meta and suppresses status noise when status=0 and Login OK', () => {
    const response = {
      httpStatus: 200,
      status: '0',
      statusMessage: 'Login OK',
      headers: { server: 'nginx', date: 'Thu, 12 Feb 2026 00:00:00 GMT' },
      rateLimits: { perMinuteLimit: 60 },
      data: { zoneresponse: { projects: [] } }
    };

    const out = buildZoneDataEnvelope({
      zone: 'Projects',
      response: response as any,
      page: 1,
      mode: 'verbose'
    });

    expect(out.meta).toEqual({
      httpStatus: 200,
      rateLimits: { perMinuteLimit: 60 },
      server: 'nginx',
      date: 'Thu, 12 Feb 2026 00:00:00 GMT'
    });
  });

  test('debug mode includes debug + compact/select/maxItems info', () => {
    const response = {
      httpStatus: 200,
      headers: {},
      rateLimits: {},
      data: { zoneresponse: { users: [{ userid: 'u1' }] } }
    };

    const out = buildZoneDataEnvelope({
      zone: 'Users',
      response: response as any,
      page: 1,
      pageSize: 1,
      mode: 'debug',
      debug: { foo: 'bar' },
      compactApplied: true,
      select: ['userid'],
      maxItems: 1
    });

    expect(out.debug).toEqual({
      foo: 'bar',
      compactApplied: true,
      select: ['userid'],
      maxItems: 1
    });
  });

  test('raw mode includes rawArofloResponse and mcp fields affect hasMore/nextPage', () => {
    const response = {
      httpStatus: 200,
      headers: {},
      rateLimits: {},
      data: { zoneresponse: { tasks: [{ taskid: 't1' }] } }
    };

    const out = buildZoneDataEnvelope({
      zone: 'Tasks',
      response: response as any,
      page: 3,
      pageSize: 200,
      mode: 'raw',
      mcp: { truncated: true, nextPage: 4 }
    });

    expect(out.hasMore).toBe(true);
    expect(out.nextPage).toBe(4);
    expect(out.rawArofloResponse).toBeTruthy();
  });
});
