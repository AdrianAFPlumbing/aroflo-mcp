export interface AroFloErrorOptions {
  code: string;
  statusCode?: number;
  status?: number | string;
  details?: unknown;
  cause?: unknown;
}

export class AroFloError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly status?: number | string;
  public readonly details?: unknown;

  constructor(message: string, options: AroFloErrorOptions) {
    super(message, { cause: options.cause });
    this.name = 'AroFloError';
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.status = options.status;
    this.details = options.details;
  }
}

export class AroFloAuthError extends AroFloError {
  constructor(message: string, options: Omit<AroFloErrorOptions, 'code'> = {}) {
    super(message, { ...options, code: 'AROFLO_AUTH_ERROR' });
    this.name = 'AroFloAuthError';
  }
}

export class AroFloRateLimitError extends AroFloError {
  constructor(message: string, options: Omit<AroFloErrorOptions, 'code'> = {}) {
    super(message, { ...options, code: 'AROFLO_RATE_LIMIT' });
    this.name = 'AroFloRateLimitError';
  }
}

export class AroFloTimeoutError extends AroFloError {
  constructor(message: string, options: Omit<AroFloErrorOptions, 'code'> = {}) {
    super(message, { ...options, code: 'AROFLO_TIMEOUT' });
    this.name = 'AroFloTimeoutError';
  }
}

export class AroFloApiError extends AroFloError {
  constructor(message: string, options: Omit<AroFloErrorOptions, 'code'> = {}) {
    super(message, { ...options, code: 'AROFLO_API_ERROR' });
    this.name = 'AroFloApiError';
  }
}

export function isRetryableError(error: unknown): boolean {
  if (error instanceof AroFloRateLimitError) {
    return true;
  }

  if (error instanceof AroFloTimeoutError) {
    return true;
  }

  if (error instanceof AroFloApiError && typeof error.statusCode === 'number') {
    return error.statusCode >= 500;
  }

  if (error instanceof Error && error.name === 'AbortError') {
    return true;
  }

  return false;
}
