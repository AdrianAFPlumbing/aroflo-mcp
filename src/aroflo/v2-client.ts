import { randomUUID } from 'node:crypto';

import pRetry from 'p-retry';
import pThrottle from 'p-throttle';
import { fetch } from 'undici';

import {
  AroFloApiError,
  AroFloAuthError,
  AroFloRateLimitError,
  AroFloTimeoutError,
  isRetryableError
} from '../utils/errors.js';
import { logger } from '../utils/logger.js';

/**
 * AroFlo APIv2 client (Open Beta).
 *
 * Differences from the legacy client:
 *  - Plain REST/JSON under https://api.aroflo.com/v2/
 *  - `Authorization: Bearer <token>` — no HMAC signature, afdatetimeutc or HostIP headers
 *  - Resource paths (/tasks, /clients, ...) instead of ?zone=... query strings
 *  - List responses are `{ count, items, page }`
 *  - Record ids use a different encoding to the legacy API (see POST /idconversions)
 *
 * The v2 schema changes weekly during the beta; see https://docs.api.aroflo.com/blog/
 */

export type V2Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type V2QueryValue = string | number | boolean | null | undefined;

export interface AroFloV2ClientOptions {
  baseUrl?: string;
  token: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export interface V2RequestOptions {
  query?: Record<string, V2QueryValue>;
  body?: unknown;
}

export interface AroFloV2Response<TData = unknown> {
  httpStatus: number;
  headers: Record<string, string>;
  data: TData;
}

export interface V2ListResponse<TItem = Record<string, unknown>> {
  count?: number;
  items?: TItem[];
  page?: Record<string, unknown>;
  [key: string]: unknown;
}

interface RequestPlan {
  requestId: string;
  method: V2Method;
  url: string;
  body?: string;
}

export function buildV2Url(
  baseUrl: string,
  path: string,
  query?: Record<string, V2QueryValue>
): string {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.replace(/^\/+/, '');
  const url = new URL(cleanPath, base);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

export class AroFloV2Client {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly throttledRequest: (plan: RequestPlan) => Promise<AroFloV2Response>;

  constructor(options: AroFloV2ClientOptions) {
    this.baseUrl = options.baseUrl ?? 'https://api.aroflo.com/v2/';
    this.token = options.token;
    this.timeoutMs = options.timeoutMs ?? 65_000;
    this.maxRetries = options.maxRetries ?? 2;

    // Conservative throttle until AroFlo publishes v2 rate limits.
    const perSecond = pThrottle({ limit: 3, interval: 1_000 })(this.sendRaw.bind(this));
    this.throttledRequest = pThrottle({ limit: 120, interval: 60_000 })(perSecond);
  }

  async get<T = unknown>(
    path: string,
    query?: Record<string, V2QueryValue>
  ): Promise<AroFloV2Response<T>> {
    return this.request<T>('GET', path, { query });
  }

  async post<T = unknown>(
    path: string,
    body?: unknown,
    query?: Record<string, V2QueryValue>
  ): Promise<AroFloV2Response<T>> {
    return this.request<T>('POST', path, { body, query });
  }

  async patch<T = unknown>(
    path: string,
    body?: unknown,
    query?: Record<string, V2QueryValue>
  ): Promise<AroFloV2Response<T>> {
    return this.request<T>('PATCH', path, { body, query });
  }

  /**
   * multipart/form-data upload (e.g. POST tasks/{id}/documents). Not retried:
   * an upload that timed out may still have landed, and a retry would duplicate it.
   */
  async uploadFile(
    path: string,
    file: { fieldName?: string; fileName: string; contentType: string; bytes: Uint8Array },
    fields: Record<string, string> = {}
  ): Promise<AroFloV2Response> {
    const { FormData } = await import('undici');
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.append(k, v);
    form.append(
      file.fieldName ?? 'file',
      new Blob([new Uint8Array(file.bytes)], { type: file.contentType }),
      file.fileName
    );
    const url = buildV2Url(this.baseUrl, path);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'X-Correlation-ID': randomUUID()
      },
      body: form,
      signal: AbortSignal.timeout(this.timeoutMs)
    });
    const raw = await response.text();
    let data: unknown = raw;
    try {
      data = raw.trim() ? JSON.parse(raw) : null;
    } catch {
      /* keep raw text */
    }
    const headers: Record<string, string> = {};
    for (const [k, v] of response.headers.entries()) headers[k] = v;
    if (response.status >= 400) {
      this.throwFromStatus(response.status, data);
    }
    return { httpStatus: response.status, headers, data };
  }

  async delete<T = unknown>(
    path: string,
    query?: Record<string, V2QueryValue>
  ): Promise<AroFloV2Response<T>> {
    return this.request<T>('DELETE', path, { query });
  }

  async request<T = unknown>(
    method: V2Method,
    path: string,
    options: V2RequestOptions = {}
  ): Promise<AroFloV2Response<T>> {
    const plan: RequestPlan = {
      requestId: randomUUID(),
      method,
      url: buildV2Url(this.baseUrl, path, options.query),
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    };

    const response = await pRetry(() => this.throttledRequest(plan), {
      retries: this.maxRetries,
      shouldRetry: ({ error }) => isRetryableError(error),
      onFailedAttempt: (error) => {
        logger.warn(
          {
            requestId: plan.requestId,
            attempt: error.attemptNumber,
            retriesLeft: error.retriesLeft,
            errorMessage: error.error.message
          },
          'AroFlo v2 request attempt failed'
        );
      }
    });

    return response as AroFloV2Response<T>;
  }

  private async sendRaw(plan: RequestPlan): Promise<AroFloV2Response> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json',
      'X-Correlation-ID': plan.requestId
    };
    if (plan.body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(plan.url, {
      method: plan.method,
      headers,
      body: plan.body,
      signal: AbortSignal.timeout(this.timeoutMs)
    });

    const raw = await response.text();
    const responseHeaders: Record<string, string> = {};
    for (const [key, value] of response.headers.entries()) {
      responseHeaders[key] = value;
    }

    let data: unknown = null;
    if (raw.trim().length > 0) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = raw;
      }
    }

    if (response.status >= 400) {
      this.throwFromStatus(response.status, data);
    }

    logger.debug(
      {
        requestId: plan.requestId,
        method: plan.method,
        url: plan.url,
        httpStatus: response.status
      },
      'AroFlo v2 request completed'
    );

    return { httpStatus: response.status, headers: responseHeaders, data };
  }

  private throwFromStatus(httpStatus: number, details: unknown): never {
    const body = details as { error?: unknown; message?: unknown; status?: unknown } | null;
    const message =
      (typeof body?.error === 'string' && body.error) ||
      (typeof body?.message === 'string' && body.message) ||
      `AroFlo v2 request failed with HTTP ${httpStatus}`;

    if (httpStatus === 401 || httpStatus === 403) {
      throw new AroFloAuthError(message, { statusCode: httpStatus, details });
    }
    if (httpStatus === 429) {
      throw new AroFloRateLimitError(message, { statusCode: httpStatus, details });
    }
    if (httpStatus === 504 || httpStatus === 408) {
      throw new AroFloTimeoutError(message, { statusCode: httpStatus, details });
    }
    throw new AroFloApiError(message, { statusCode: httpStatus, details });
  }
}
