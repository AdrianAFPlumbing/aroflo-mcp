import { createHash, randomUUID } from 'node:crypto';

import pRetry from 'p-retry';
import pThrottle from 'p-throttle';
import { fetch } from 'undici';

import {
  buildAuthHeaders,
  buildAuthorizationHeader,
  type AroFloCredentials
} from '../auth/headers.js';
import { buildAroFloSignature, type AroFloMethod } from '../auth/signature.js';
import {
  buildGetVarString,
  buildPostVarString,
  type GetVarStringInput,
  type QueryValue
} from './query.js';
import {
  extractEnvelope,
  extractRateLimits,
  headersToObject,
  parseAroFloBody,
  type AroFloClientResponse
} from './types.js';
import {
  AroFloApiError,
  AroFloAuthError,
  AroFloRateLimitError,
  AroFloTimeoutError,
  isRetryableError
} from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export interface AroFloClientOptions {
  baseUrl?: string;
  credentials: AroFloCredentials;
  secretKey: string;
  accept?: string;
  hostIp?: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export interface GetOptions extends Omit<GetVarStringInput, 'zone'> {}

export interface PostOptions {
  extra?: Record<string, QueryValue>;
}

interface RequestPlan {
  requestId: string;
  method: AroFloMethod;
  varString: string;
  body?: string;
}

export class AroFloClient {
  private readonly baseUrl: string;
  private readonly credentials: AroFloCredentials;
  private readonly secretKey: string;
  private readonly accept: string;
  private readonly hostIp?: string;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly throttledRequest: (plan: RequestPlan) => Promise<AroFloClientResponse>;

  constructor(options: AroFloClientOptions) {
    this.baseUrl = options.baseUrl ?? 'https://api.aroflo.com/';
    this.credentials = options.credentials;
    this.secretKey = options.secretKey;
    this.accept = options.accept ?? 'text/json';
    this.hostIp = options.hostIp?.trim() || undefined;
    this.timeoutMs = options.timeoutMs ?? 65_000;
    this.maxRetries = options.maxRetries ?? 2;

    const perSecond = pThrottle({ limit: 3, interval: 1_000 })(this.sendRaw.bind(this));
    this.throttledRequest = pThrottle({ limit: 120, interval: 60_000 })(perSecond);
  }

  async get(zone: string, options: GetOptions = {}): Promise<AroFloClientResponse> {
    const varString = buildGetVarString({ zone, ...options });
    return this.requestWithRetry({ requestId: randomUUID(), method: 'GET', varString });
  }

  async post(
    zone: string,
    postxml: string,
    options: PostOptions = {}
  ): Promise<AroFloClientResponse> {
    const varString = buildPostVarString({ zone, postxml, extra: options.extra });
    return this.requestWithRetry({
      requestId: randomUUID(),
      method: 'POST',
      varString,
      body: varString
    });
  }

  private async requestWithRetry(plan: RequestPlan): Promise<AroFloClientResponse> {
    return pRetry(() => this.throttledRequest(plan), {
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
          'AroFlo request attempt failed'
        );
      }
    });
  }

  private async sendRaw(plan: RequestPlan): Promise<AroFloClientResponse> {
    const afDateTimeUtc = new Date().toISOString();
    const authorization = buildAuthorizationHeader(this.credentials);
    const { payload, signature } = buildAroFloSignature({
      method: plan.method,
      secretKey: this.secretKey,
      accept: this.accept,
      authorization,
      afDateTimeUtc,
      varString: plan.varString,
      hostIp: this.hostIp,
      urlPath: ''
    });

    const headers = buildAuthHeaders({
      signature,
      authorization,
      accept: this.accept,
      afDateTimeUtc,
      hostIp: this.hostIp
    });
    headers['X-Correlation-ID'] = plan.requestId;

    if (plan.method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    const url =
      plan.method === 'GET' && plan.varString.length > 0
        ? `${this.baseUrl}${this.baseUrl.includes('?') ? '&' : '?'}${plan.varString}`
        : this.baseUrl;

    const response = await fetch(url, {
      method: plan.method,
      headers,
      body: plan.body,
      signal: AbortSignal.timeout(this.timeoutMs)
    });

    const raw = await response.text();
    const responseHeaders = headersToObject(response.headers);
    const rateLimits = extractRateLimits(response.headers);
    const data = parseAroFloBody(raw, response.headers.get('content-type'));
    const envelope = extractEnvelope(data);
    const statusValue = envelope?.status;
    const statusMessage = envelope?.statusmessage;

    if (response.status >= 400) {
      this.throwFromStatus(response.status, statusValue, statusMessage, data);
    }

    const parsedStatus = this.coerceStatus(statusValue);
    if (typeof parsedStatus === 'number' && parsedStatus !== 0) {
      this.throwFromStatus(response.status, parsedStatus, statusMessage, data);
    }

    logger.debug(
      {
        requestId: plan.requestId,
        method: plan.method,
        queryLength: plan.varString.length,
        payloadFingerprint: createHash('sha256').update(payload).digest('hex').slice(0, 16),
        status: parsedStatus,
        statusMessage,
        rateLimits
      },
      'AroFlo request completed'
    );

    return {
      httpStatus: response.status,
      status: statusValue,
      statusMessage,
      headers: responseHeaders,
      rateLimits,
      data
    };
  }

  private coerceStatus(status: number | string | undefined): number | undefined {
    if (typeof status === 'number') {
      return status;
    }

    if (typeof status === 'string' && status.trim().length > 0) {
      const parsed = Number(status);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return undefined;
  }

  private throwFromStatus(
    httpStatus: number,
    status: number | string | undefined,
    statusMessage: string | undefined,
    details: unknown
  ): never {
    const parsedStatus = this.coerceStatus(status);
    const message = statusMessage ?? `AroFlo request failed with HTTP ${httpStatus}`;
    const messageLower = message.toLowerCase();

    if (parsedStatus === -99999 || message.toLowerCase().includes('authentication failed')) {
      throw new AroFloAuthError(message, { statusCode: httpStatus, status, details });
    }

    // Treat explicit HTTP 429 (or a clearly rate-limit-related message) as retryable.
    // Some AroFlo errors use non-zero "status" codes for validation problems (e.g. invalid WHERE);
    // those should not be mapped to rate limits.
    if (
      httpStatus === 429 ||
      parsedStatus === 429 ||
      messageLower.includes('too many requests') ||
      (messageLower.includes('rate') && messageLower.includes('limit'))
    ) {
      throw new AroFloRateLimitError(message, { statusCode: httpStatus, status, details });
    }

    if (parsedStatus === 888888) {
      throw new AroFloTimeoutError(message, { statusCode: httpStatus, status, details });
    }

    throw new AroFloApiError(message, { statusCode: httpStatus, status, details });
  }
}
