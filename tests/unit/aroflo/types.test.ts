import { describe, expect, it } from 'vitest';

import { extractEnvelope, parseAroFloBody } from '../../../src/aroflo/types.js';

describe('AroFlo body parsing', () => {
  it('parses JSON response body', () => {
    const parsed = parseAroFloBody('{"status":0,"statusmessage":"Login OK"}', 'text/json');
    const envelope = extractEnvelope(parsed);

    expect(envelope?.status).toBe(0);
    expect(envelope?.statusmessage).toBe('Login OK');
  });

  it('parses XML status envelope', () => {
    const parsed = parseAroFloBody(
      '<imsapi><status>-99999</status><statusmessage>Authentication Failed</statusmessage></imsapi>',
      'text/xml'
    );
    const envelope = extractEnvelope(parsed);

    expect(envelope?.status).toBe('-99999');
    expect(envelope?.statusmessage).toBe('Authentication Failed');
  });
});
