import { createHmac } from 'node:crypto';

export type AroFloMethod = 'GET' | 'POST';

export interface BuildSignatureInput {
  method: AroFloMethod;
  secretKey: string;
  accept: string;
  authorization: string;
  afDateTimeUtc: string;
  varString: string;
  hostIp?: string;
  urlPath?: string;
}

export interface SignatureResult {
  payload: string;
  signature: string;
}

export function normalizeMethod(method: string): AroFloMethod {
  const normalized = method.toUpperCase();
  if (normalized !== 'GET' && normalized !== 'POST') {
    throw new Error(`Unsupported AroFlo method: ${method}`);
  }

  return normalized;
}

export function buildCanonicalPayloadParts(
  input: Omit<BuildSignatureInput, 'secretKey'>
): string[] {
  const parts: string[] = [normalizeMethod(input.method)];

  const hostIp = input.hostIp?.trim();
  if (hostIp) {
    parts.push(hostIp);
  }

  parts.push(input.urlPath ?? '');
  parts.push(input.accept);
  parts.push(input.authorization);
  parts.push(input.afDateTimeUtc);
  parts.push(input.varString);

  return parts;
}

export function buildCanonicalPayload(input: Omit<BuildSignatureInput, 'secretKey'>): string {
  return buildCanonicalPayloadParts(input).join('+');
}

export function signCanonicalPayload(payload: string, secretKey: string): string {
  if (!secretKey) {
    throw new Error('AroFlo secret key is required for request signing');
  }

  return createHmac('sha512', secretKey).update(payload).digest('hex');
}

export function buildAroFloSignature(input: BuildSignatureInput): SignatureResult {
  const payload = buildCanonicalPayload(input);
  const signature = signCanonicalPayload(payload, input.secretKey);

  return { payload, signature };
}
