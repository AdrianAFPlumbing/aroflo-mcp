export interface AroFloCredentials {
  uEncoded: string;
  pEncoded: string;
  orgEncoded: string;
}

export interface BuildAuthHeadersInput {
  signature: string;
  authorization: string;
  accept: string;
  afDateTimeUtc: string;
  hostIp?: string;
}

export function buildAuthorizationHeader(credentials: AroFloCredentials): string {
  const u = encodeURIComponent(credentials.uEncoded);
  const p = encodeURIComponent(credentials.pEncoded);
  const org = encodeURIComponent(credentials.orgEncoded);

  return `uencoded=${u}&pencoded=${p}&orgEncoded=${org}`;
}

export function buildAuthHeaders(input: BuildAuthHeadersInput): Record<string, string> {
  const headers: Record<string, string> = {
    Authentication: `HMAC ${input.signature}`,
    Authorization: input.authorization,
    Accept: input.accept,
    afdatetimeutc: input.afDateTimeUtc
  };

  const hostIp = input.hostIp?.trim();
  if (hostIp) {
    headers.HostIP = hostIp;
  }

  return headers;
}
