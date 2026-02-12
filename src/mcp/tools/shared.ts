import { z } from 'zod';

import type { AroFloClientResponse } from '../../aroflo/types.js';
import { AroFloError } from '../../utils/errors.js';

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

export function successToolResult(payload: AroFloClientResponse) {
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

export function errorToolResult(error: unknown) {
  const structured =
    error instanceof AroFloError
      ? {
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
          status: error.status,
          details: error.details
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

  const details =
    error instanceof AroFloError
      ? `${error.message} [code=${error.code}${
          typeof error.status === 'undefined' ? '' : ` status=${error.status}`
        }]`
      : error instanceof Error
        ? error.message
        : 'Unknown error';

  return {
    isError: true,
    structuredContent: structured as Record<string, unknown>,
    content: [
      {
        type: 'text' as const,
        text: details
      }
    ]
  };
}
