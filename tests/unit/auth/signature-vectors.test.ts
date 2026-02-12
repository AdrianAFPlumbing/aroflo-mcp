import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { buildAroFloSignature, type BuildSignatureInput } from '../../../src/auth/signature.js';

interface AuthVector {
  name: string;
  input: BuildSignatureInput;
  expectedPayload: string;
  expectedSignature: string;
}

const fixturePath = new URL('../../fixtures/auth-vectors.json', import.meta.url);
const vectors = JSON.parse(readFileSync(fixturePath, 'utf8')) as AuthVector[];

describe('AroFlo signature golden vectors', () => {
  for (const vector of vectors) {
    it(vector.name, () => {
      const result = buildAroFloSignature(vector.input);
      expect(result.payload).toBe(vector.expectedPayload);
      expect(result.signature).toBe(vector.expectedSignature);
    });
  }
});
