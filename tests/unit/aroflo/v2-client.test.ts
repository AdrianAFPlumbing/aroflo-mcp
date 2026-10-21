import { describe, expect, it } from 'vitest';

import { buildV2Url } from '../../../src/aroflo/v2-client.js';
import { loadEnv } from '../../../src/config.js';

const baseEnv = {
  AROFLO_SECRET_KEY: 'secret',
  AROFLO_UENCODED: 'u',
  AROFLO_PENCODED: 'p',
  AROFLO_ORG_ENCODED: 'o'
};

describe('buildV2Url', () => {
  it('joins base, path and query', () => {
    expect(buildV2Url('https://api.aroflo.com/v2/', 'tasks', { status: 1, page: 2 })).toBe(
      'https://api.aroflo.com/v2/tasks?status=1&page=2'
    );
  });

  it('tolerates missing trailing slash on base and leading slash on path', () => {
    expect(buildV2Url('https://api.aroflo.com/v2', '/clients')).toBe(
      'https://api.aroflo.com/v2/clients'
    );
  });

  it('drops undefined and null query values', () => {
    expect(
      buildV2Url('https://api.aroflo.com/v2/', 'tasks', { status: undefined, x: null, y: 'a' })
    ).toBe('https://api.aroflo.com/v2/tasks?y=a');
  });
});

describe('loadEnv (v2)', () => {
  it('defaults the v2 base URL and leaves token undefined', () => {
    const env = loadEnv(baseEnv);
    expect(env.AROFLO_V2_BASE_URL).toBe('https://api.aroflo.com/v2/');
    expect(env.AROFLO_V2_TOKEN).toBeUndefined();
  });

  it('treats a blank v2 token as undefined', () => {
    const env = loadEnv({ ...baseEnv, AROFLO_V2_TOKEN: '  ' });
    expect(env.AROFLO_V2_TOKEN).toBeUndefined();
  });
});

describe('v2 bridge', () => {
  it('resolves a job number through legacy Tasks then idconversions', async () => {
    const { v2TaskIdForJobNumber } = await import('../../../src/aroflo/v2-bridge.js');
    const legacy = {
      get: async (_zone: string, opts: { where?: string[] }) => {
        expect(opts.where).toEqual(['and|jobnumber|=|267381']);
        return {
          httpStatus: 200,
          headers: {},
          rateLimits: {},
          data: { zoneresponse: { tasks: [{ taskid: 'LEGACY==', jobnumber: '267381' }] } }
        };
      }
    };
    const v2 = {
      post: async (path: string, body: { ids: string[] }) => {
        expect(path).toBe('idconversions');
        expect(body.ids).toEqual(['LEGACY==']);
        return {
          httpStatus: 200,
          headers: {},
          data: { count: 1, items: [{ legacyId: 'LEGACY==', id: '72M8000001' }] }
        };
      }
    };
    const r = await v2TaskIdForJobNumber(legacy as any, v2 as any, 267381);
    expect(r).toEqual({ legacyTaskId: 'LEGACY==', taskId: '72M8000001' });
  });
});

describe('v2 task helpers', () => {
  it('resolves a priority by short description', async () => {
    const { resolvePriorityId } = await import('../../../src/aroflo/v2-tasks.js');
    const v2 = {
      get: async () => ({
        httpStatus: 200,
        headers: {},
        data: {
          items: [
            {
              id: 'P1',
              shortDescription: 'UNSW - HIGH',
              description: 'HIGH - Respond within 1 hour'
            },
            { id: 'P2', shortDescription: 'UNSW - LOW', description: 'LOW - Respond within 5 days' }
          ],
          page: { count: 1 }
        }
      })
    };
    await expect(resolvePriorityId(v2 as any, 'unsw - high')).resolves.toEqual({
      id: 'P1',
      label: 'UNSW - HIGH'
    });
    await expect(resolvePriorityId(v2 as any, 'UNSW')).rejects.toThrow(/ambiguous/);
    await expect(resolvePriorityId(v2 as any, 'P2')).resolves.toEqual({
      id: 'P2',
      label: 'UNSW - LOW'
    });
  });

  it('rejects an upload without a file extension and builds the v2 body', async () => {
    const { uploadTaskDocument } = await import('../../../src/aroflo/v2-tasks.js');
    const calls: unknown[] = [];
    const v2 = {
      post: async (path: string, body: unknown) => {
        calls.push([path, body]);
        return { httpStatus: 200, headers: {}, data: { id: 'D1' } };
      }
    };
    await expect(
      uploadTaskDocument(v2 as any, 'T1', { filename: 'noext', base64: 'QUJD' })
    ).rejects.toThrow(/extension/);
    const r = await uploadTaskDocument(v2 as any, 'T1', {
      filename: 'wo.pdf',
      base64: 'QUJD',
      comment: 'from email'
    });
    expect(r.bytes).toBe(3);
    expect(calls[0]).toEqual([
      'tasks/T1/documents/upload',
      { filename: 'wo.pdf', base64: 'QUJD', comment: 'from email' }
    ]);
  });
});
