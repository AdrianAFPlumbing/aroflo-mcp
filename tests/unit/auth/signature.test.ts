import { describe, expect, it } from 'vitest';

import { buildAroFloSignature, buildCanonicalPayload } from '../../../src/auth/signature.js';

describe('AroFlo signature', () => {
  it('builds canonical payload with HostIP in the correct position', () => {
    const payload = buildCanonicalPayload({
      method: 'GET',
      accept: 'text/json',
      authorization: 'uencoded=test-user&pencoded=test-pass&orgEncoded=test-org',
      afDateTimeUtc: '2024-05-13T23:14:15.000Z',
      varString:
        'zone=lastupdate&where=and%7Czonename%7C%3D%7Ctasks&order=lastupdateutc%7Casc&page=1',
      hostIp: '203.0.113.10',
      urlPath: ''
    });

    expect(payload).toBe(
      'GET+203.0.113.10++text/json+uencoded=test-user&pencoded=test-pass&orgEncoded=test-org+2024-05-13T23:14:15.000Z+zone=lastupdate&where=and%7Czonename%7C%3D%7Ctasks&order=lastupdateutc%7Casc&page=1'
    );
  });

  it('creates deterministic HMAC-SHA512 signature', () => {
    const { signature } = buildAroFloSignature({
      method: 'GET',
      secretKey: 'top-secret',
      accept: 'text/json',
      authorization: 'uencoded=test-user&pencoded=test-pass&orgEncoded=test-org',
      afDateTimeUtc: '2024-05-13T23:14:15.000Z',
      varString:
        'zone=lastupdate&where=and%7Czonename%7C%3D%7Ctasks&order=lastupdateutc%7Casc&page=1',
      hostIp: '203.0.113.10',
      urlPath: ''
    });

    expect(signature).toBe(
      '92b116903c261939c95edf99be9dcc9d0875cadbcfe4ea39eb1610a23150eb66c978552e0a3b7f35e532120cec474decf08056d906bafea9d0347eee1fdb7ec4'
    );
  });

  it('omits HostIP from payload when not provided', () => {
    const payload = buildCanonicalPayload({
      method: 'POST',
      accept: 'text/json',
      authorization: 'uencoded=u&pencoded=p&orgEncoded=o',
      afDateTimeUtc: '2024-05-13T23:14:15.000Z',
      varString: 'zone=tasks&postxml=%3Cimsapi%3E%3C%2Fimsapi%3E',
      urlPath: ''
    });

    expect(payload).toBe(
      'POST++text/json+uencoded=u&pencoded=p&orgEncoded=o+2024-05-13T23:14:15.000Z+zone=tasks&postxml=%3Cimsapi%3E%3C%2Fimsapi%3E'
    );
  });
});
