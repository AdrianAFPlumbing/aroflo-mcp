export interface AroFloStatusEnvelope {
  status?: number | string;
  statusmessage?: string;
  [key: string]: unknown;
}

export interface AroFloRateLimits {
  perMinuteLimit?: number;
  perMinuteRemaining?: number;
  dailyLimit?: number;
  dailyRemaining?: number;
  secondaryDailyLimit?: number;
  secondaryDailyRemaining?: number;
}

export interface AroFloClientResponse<TData = unknown> {
  httpStatus: number;
  status?: number | string;
  statusMessage?: string;
  headers: Record<string, string>;
  rateLimits: AroFloRateLimits;
  data: TData;
}

function parseNumber(value: string | null): number | undefined {
  if (value === null || value.trim().length === 0) {
    return undefined;
  }

  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function headersToObject(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of headers.entries()) {
    result[key] = value;
  }

  return result;
}

export function extractRateLimits(headers: Headers): AroFloRateLimits {
  return {
    perMinuteLimit: parseNumber(headers.get('X-RateLimit-Limit')),
    perMinuteRemaining: parseNumber(headers.get('X-RateLimit-Remaining')),
    dailyLimit: parseNumber(headers.get('X-RateLimit-Daily-Limit')),
    dailyRemaining: parseNumber(headers.get('X-RateLimit-Daily-Remaining')),
    secondaryDailyLimit: parseNumber(headers.get('X-RateLimit-Secondary-Daily-Limit')),
    secondaryDailyRemaining: parseNumber(headers.get('X-RateLimit-Secondary-Daily-Remaining'))
  };
}

export function parseAroFloBody(raw: string, contentType: string | null): unknown {
  if (raw.trim().length === 0) {
    return null;
  }

  const isJson = contentType?.toLowerCase().includes('json') ?? false;
  const looksLikeJson = raw.trim().startsWith('{') || raw.trim().startsWith('[');

  if (isJson || looksLikeJson) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  // Minimal XML envelope parsing for status + statusmessage (AroFlo returns XML by default).
  const trimmed = raw.trim();
  if (trimmed.startsWith('<')) {
    const statusMatch = trimmed.match(/<status>([^<]*)<\/status>/i);
    const statusMessageMatch = trimmed.match(/<statusmessage>([^<]*)<\/statusmessage>/i);
    if (statusMatch || statusMessageMatch) {
      return {
        imsapi: {
          status: statusMatch?.[1],
          statusmessage: statusMessageMatch?.[1]
        },
        raw
      };
    }
  }

  return raw;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function extractEnvelope(data: unknown): AroFloStatusEnvelope | undefined {
  if (!isRecord(data)) {
    return undefined;
  }

  if ('status' in data || 'statusmessage' in data) {
    return data as AroFloStatusEnvelope;
  }

  const imsapi = data.imsapi;
  if (isRecord(imsapi) && ('status' in imsapi || 'statusmessage' in imsapi)) {
    return imsapi as AroFloStatusEnvelope;
  }

  return undefined;
}
