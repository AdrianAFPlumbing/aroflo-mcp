import { z } from 'zod';

import { AroFloError, isRetryableError } from '../../utils/errors.js';

export const arofloToolOutputSchema = {
  httpStatus: z.number().int(),
  status: z.union([z.number(), z.string()]).optional(),
  statusMessage: z.string().optional(),
  headers: z.record(z.string(), z.string()),
  rateLimits: z.object({
    perMinuteLimit: z.number().optional(),
    perMinuteRemaining: z.number().optional(),
    dailyLimit: z.number().optional(),
    dailyRemaining: z.number().optional(),
    secondaryDailyLimit: z.number().optional(),
    secondaryDailyRemaining: z.number().optional()
  }),
  data: z.unknown()
};

export function successToolResult(payload: unknown) {
  return {
    structuredContent: payload as unknown as Record<string, unknown>,
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(payload, null, 2)
      }
    ]
  };
}

export function errorToolResult(
  error: unknown,
  options?: { mode?: string; debug?: Record<string, unknown> }
) {
  const mode = (options?.mode ?? 'data').toLowerCase();
  const includeDetails = mode === 'verbose' || mode === 'debug' || mode === 'raw';
  const includeDebug = mode === 'debug' || mode === 'raw';

  const retryable = isRetryableError(error);

  const errorObj =
    error instanceof AroFloError
      ? {
          code: error.code,
          message: error.message,
          httpStatus: error.statusCode,
          retryable,
          ...(includeDetails ? { details: error.details } : {})
        }
      : error instanceof Error
        ? {
            code: 'UNEXPECTED_ERROR',
            message: error.message,
            retryable
          }
        : {
            code: 'UNEXPECTED_ERROR',
            message: 'Unknown error',
            retryable
          };

  // Backward compatible top-level fields (pre-envelope refactor).
  const legacyStructured =
    error instanceof AroFloError
      ? {
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
          status: error.status,
          ...(includeDetails ? { details: error.details } : {})
        }
      : error instanceof Error
        ? {
            code: 'UNEXPECTED_ERROR',
            name: error.name,
            message: error.message
          }
        : {
            code: 'UNEXPECTED_ERROR',
            message: 'Unknown error'
          };

  const detailsText =
    error instanceof AroFloError
      ? `${error.message} [code=${error.code}${
          typeof error.status === 'undefined' ? '' : ` status=${error.status}`
        }]`
      : error instanceof Error
        ? error.message
        : 'Unknown error';

  const structured: Record<string, unknown> = { ...legacyStructured, error: errorObj };
  if (includeDebug && options?.debug) {
    structured.debug = options.debug;
  }

  return {
    isError: true,
    structuredContent: structured as Record<string, unknown>,
    content: [
      {
        type: 'text' as const,
        text: detailsText
      }
    ]
  };
}
