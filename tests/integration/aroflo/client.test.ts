import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

import { afterEach, describe, expect, it } from 'vitest';

import { AroFloClient } from '../../../src/aroflo/client.js';

interface CapturedRequest {
  method: string;
  url: string;
  headers: IncomingMessage['headers'];
  body: string;
}

async function withServer(
  handler: (request: CapturedRequest, response: ServerResponse) => void,
  run: (baseUrl: string) => Promise<void>
): Promise<void> {
  const server = createServer(async (req, res) => {
    let body = '';
    for await (const chunk of req) {
      body += chunk.toString();
    }

    handler(
      {
        method: req.method ?? '',
        url: req.url ?? '',
        headers: req.headers,
        body
      },
      res
    );
  });

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to obtain local server address');
  }

  try {
    await run(`http://127.0.0.1:${address.port}/`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

describe('AroFloClient integration', () => {
  afterEach(() => {
    process.removeAllListeners('unhandledRejection');
  });

  it('sends signed GET request and parses JSON response', async () => {
    let captured: CapturedRequest | undefined;

    await withServer(
      (request, response) => {
        captured = request;
        response.writeHead(200, {
          'Content-Type': 'text/json',
          'X-RateLimit-Limit': '120',
          'X-RateLimit-Remaining': '119'
        });
        response.end(JSON.stringify({ status: 0, statusmessage: 'Login OK', items: [{ id: 1 }] }));
      },
      async (baseUrl) => {
        const client = new AroFloClient({
          baseUrl,
          credentials: {
            uEncoded: 'user',
            pEncoded: 'pass',
            orgEncoded: 'org'
          },
          secretKey: 'top-secret',
          hostIp: '203.0.113.10',
          maxRetries: 0
        });

        const result = await client.get('lastupdate', {
          where: ['and|zonename|=|tasks'],
          page: 1
        });

        expect(result.httpStatus).toBe(200);
        expect(result.status).toBe(0);
        expect(result.rateLimits.perMinuteLimit).toBe(120);
      }
    );

    expect(captured?.method).toBe('GET');
    expect(captured?.url).toContain('zone=lastupdate');
    expect(captured?.headers.authorization).toBe('uencoded=user&pencoded=pass&orgEncoded=org');
    expect(String(captured?.headers.authentication)).toMatch(/^HMAC [a-f0-9]{128}$/);
    expect(captured?.headers.hostip).toBe('203.0.113.10');
    expect(typeof captured?.headers.afdatetimeutc).toBe('string');
  });

  it('sends form-urlencoded POST body with postxml', async () => {
    let captured: CapturedRequest | undefined;

    await withServer(
      (request, response) => {
        captured = request;
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({ status: 0, statusmessage: 'Login OK', taskid: 12345 }));
      },
      async (baseUrl) => {
        const client = new AroFloClient({
          baseUrl,
          credentials: {
            uEncoded: 'user',
            pEncoded: 'pass',
            orgEncoded: 'org'
          },
          secretKey: 'top-secret',
          maxRetries: 0
        });

        const result = await client.post(
          'tasks',
          '<imsapi><tasks><task><taskname>Install AC</taskname></task></tasks></imsapi>'
        );

        expect(result.status).toBe(0);
        expect(result.httpStatus).toBe(200);
      }
    );

    expect(captured?.method).toBe('POST');
    expect(captured?.headers['content-type']).toBe('application/x-www-form-urlencoded');
    expect(captured?.body).toContain('zone=tasks');
    expect(captured?.body).toContain('postxml=%3Cimsapi%3E');
  });
});
