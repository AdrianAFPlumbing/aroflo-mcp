import { describe, expect, test } from 'vitest';

import { errorToolResult } from '../../../src/mcp/tools/shared.js';
import { AroFloApiError } from '../../../src/utils/errors.js';

describe('mcp/tools/shared', () => {
  test('errorToolResult includes legacy top-level fields and envelope error', () => {
    const err = new AroFloApiError('Boom', {
      statusCode: 503,
      status: '9',
      details: { why: 'nope' }
    });

    const out = errorToolResult(err, { mode: 'data' });
    expect(out.isError).toBe(true);

    const sc = out.structuredContent as any;
    // Legacy fields
    expect(sc.code).toBe('AROFLO_API_ERROR');
    expect(sc.message).toBe('Boom');
    expect(sc.statusCode).toBe(503);
    expect(sc.status).toBe('9');
    expect(sc).not.toHaveProperty('details'); // data mode suppresses details

    // Envelope error
    expect(sc.error).toEqual({
      code: 'AROFLO_API_ERROR',
      message: 'Boom',
      httpStatus: 503,
      retryable: true
    });
  });

  test('verbose mode includes details; debug mode includes debug payload', () => {
    const err = new AroFloApiError('Boom', { statusCode: 400, details: { x: 1 } });

    const verbose = errorToolResult(err, { mode: 'verbose' });
    const vsc = verbose.structuredContent as any;
    expect(vsc.details).toEqual({ x: 1 });
    expect(vsc.error.details).toEqual({ x: 1 });

    const debug = errorToolResult(err, { mode: 'debug', debug: { zone: 'Tasks' } });
    const dsc = debug.structuredContent as any;
    expect(dsc.debug).toEqual({ zone: 'Tasks' });
  });
});
