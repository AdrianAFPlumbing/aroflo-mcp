import { describe, expect, it } from 'vitest';

import { buildAuthHeaders, buildAuthorizationHeader } from '../../../src/auth/headers.js';

describe('AroFlo auth headers', () => {
  it('encodes authorization values correctly', () => {
    const header = buildAuthorizationHeader({
      uEncoded: 'user+name@example.com',
      pEncoded: 'pass word',
      orgEncoded: 'My Org'
    });

    expect(header).toBe(
      'uencoded=user%2Bname%40example.com&pencoded=pass%20word&orgEncoded=My%20Org'
    );
  });

  it('adds HostIP only when provided', () => {
    const headers = buildAuthHeaders({
      signature: 'abc123',
      authorization: 'uencoded=u&pencoded=p&orgEncoded=o',
      accept: 'text/json',
      afDateTimeUtc: '2024-05-13T23:14:15.000Z',
      hostIp: '203.0.113.10'
    });

    expect(headers.HostIP).toBe('203.0.113.10');
    expect(headers.Authentication).toBe('HMAC abc123');
    expect(headers.afdatetimeutc).toBe('2024-05-13T23:14:15.000Z');
  });
});
