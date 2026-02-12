import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { describe, expect, it } from 'vitest';

import { createAroFloMcpServer } from '../../../src/mcp/app.js';
import type { AroFloClient } from '../../../src/aroflo/client.js';
import type { AroFloClientResponse } from '../../../src/aroflo/types.js';

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

describe('MCP resources', () => {
  it('exposes docs/api as resources', async () => {
    const server = createAroFloMcpServer(fakeClient as unknown as AroFloClient);
    const client = new Client(
      { name: 'aroflo-mcp-test', version: '0.0.0' },
      {
        capabilities: {}
      }
    );

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    try {
      await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

      const listed = await client.listResources();
      const uris = new Set(listed.resources.map((r) => r.uri));

      expect(uris.has('aroflo://docs/api')).toBe(true);
      expect(uris.has('aroflo://docs/api/quotes')).toBe(true);

      const quotes = await client.readResource({ uri: 'aroflo://docs/api/quotes' });
      const first = quotes.contents[0];

      expect('text' in first).toBe(true);
      expect(first.uri).toBe('aroflo://docs/api/quotes');
      expect(first.mimeType).toBe('text/markdown');
      expect(first.text).toContain('# Quotes');
      expect(first.text).toContain('acceptancestatus');
    } finally {
      await Promise.allSettled([
        client.close(),
        server.close(),
        clientTransport.close(),
        serverTransport.close()
      ]);
    }
  });
});
