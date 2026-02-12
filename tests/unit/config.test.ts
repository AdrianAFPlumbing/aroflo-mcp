import { describe, expect, it } from 'vitest';

import { loadEnv } from '../../src/config.js';

describe('loadEnv', () => {
  it('applies defaults for optional values', () => {
    const env = loadEnv({
      AROFLO_SECRET_KEY: 'secret',
      AROFLO_UENCODED: 'u',
      AROFLO_PENCODED: 'p',
      AROFLO_ORG_ENCODED: 'o'
    });

    expect(env.AROFLO_API_BASE_URL).toBe('https://api.aroflo.com/');
    expect(env.AROFLO_ACCEPT).toBe('text/json');
    expect(env.MCP_TRANSPORT).toBe('stdio');
    expect(env.MCP_HTTP_PATH).toBe('/mcp');
  });

  it('normalizes blank HostIP as undefined', () => {
    const env = loadEnv({
      AROFLO_SECRET_KEY: 'secret',
      AROFLO_UENCODED: 'u',
      AROFLO_PENCODED: 'p',
      AROFLO_ORG_ENCODED: 'o',
      AROFLO_HOST_IP: ' '
    });

    expect(env.AROFLO_HOST_IP).toBeUndefined();
  });
});
