import { fetch } from 'undici';
import { afterEach, describe, expect, it } from 'vitest';

import { startHttpServer, stopHttpServer } from '../../../src/mcp/http.js';
import type { AroFloClientResponse } from '../../../src/aroflo/types.js';
import type { AroFloClient } from '../../../src/aroflo/client.js';

type FakeClient = {
  get: () => Promise<AroFloClientResponse>;
  post: () => Promise<AroFloClientResponse>;
};

const fakeClient: FakeClient = {
  async get() {
    return {
      httpStatus: 200,
      status: 0,
      statusMessage: 'OK',
      headers: {},
      rateLimits: {},
      data: {}
    };
  },
  async post() {
    return {
      httpStatus: 200,
      status: 0,
      statusMessage: 'OK',
      headers: {},
      rateLimits: {},
      data: {}
    };
  }
};

describe('HTTP MCP transport wrapper', () => {
  let port = 0;
  let server: Awaited<ReturnType<typeof startHttpServer>> | undefined;

  afterEach(async () => {
    if (server) {
      await stopHttpServer(server);
      server = undefined;
    }
  });

  async function start(): Promise<string> {
    port += 1;
    const listenPort = 39000 + port;

    server = await startHttpServer({
      host: '127.0.0.1',
      port: listenPort,
      path: '/mcp',
      client: fakeClient as unknown as AroFloClient
    });

    return `http://127.0.0.1:${listenPort}`;
  }

  it('returns 404 for non-MCP paths', async () => {
    const base = await start();
    const response = await fetch(`${base}/not-mcp`, { method: 'POST', body: '{}' });

    expect(response.status).toBe(404);
  });

  it('handles CORS preflight', async () => {
    const base = await start();
    const response = await fetch(`${base}/mcp`, { method: 'OPTIONS' });

    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
  });

  it('returns 405 for unsupported methods', async () => {
    const base = await start();
    const response = await fetch(`${base}/mcp`, { method: 'PUT' });

    expect(response.status).toBe(405);
  });
});
