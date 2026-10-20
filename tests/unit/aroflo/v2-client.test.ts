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
