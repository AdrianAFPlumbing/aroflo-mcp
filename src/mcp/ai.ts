import type { IncomingMessage, ServerResponse } from 'node:http';

// Proxies a single prompt to Anthropic's Messages API using a server-side key.
// The portal front-end never sees ANTHROPIC_API_KEY.
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 500_000) req.destroy(); // guard against oversized bodies
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function send(res: ServerResponse, code: number, payload: unknown): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

/**
 * POST /ai/complete
 *   { "prompt": "..." }                      // simple: one user message
 *   { "system": "...", "prompt": "..." }     // preferred: static rules cached in system
 *   { "system": "...", "messages": [...] }   // full control over the messages array
 * -> { "status":"ok", "text":"..." }
 *
 * The `system` text is sent as a cache_control:ephemeral block so repeat drafts
 * reuse the cached pricing/formatting rules at ~10% cost. Used by the Quote
 * Portal's AI quote-assist to draft scope / exclusions.
 */
export async function handleAiComplete(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    send(res, 500, { status: 'error', message: 'ANTHROPIC_API_KEY is not set on the backend' });
    return;
  }

  let body: { prompt?: string; system?: string; messages?: unknown } = {};
  try {
    body = JSON.parse((await readBody(req)) || '{}');
  } catch {
    body = {};
  }

  // Per-quote content goes in messages; static pricing/formatting rules go in `system`.
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  const systemText = typeof body.system === 'string' ? body.system.trim() : '';
  const messages = Array.isArray(body.messages)
    ? body.messages
    : prompt
      ? [{ role: 'user', content: prompt }]
      : [];

  if (!messages.length) {
    send(res, 400, { status: 'error', message: 'prompt (or messages) is required' });
    return;
  }

  const model = process.env.AI_MODEL || 'claude-sonnet-4-6';
  const maxTokens = Number(process.env.AI_MAX_TOKENS || 1024);

  // Send the static context as a cached system block so it's billed at ~10% on
  // repeat drafts (prompt caching). Only the per-quote details are re-sent full price.
  const payload: Record<string, unknown> = { model, max_tokens: maxTokens, messages };
  if (systemText) {
    payload.system = [
      { type: 'text', text: systemText, cache_control: { type: 'ephemeral' } }
    ];
  }

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });

    const data: any = await response.json();

    if (!response.ok) {
      const msg = data?.error?.message || `Anthropic API error (HTTP ${response.status})`;
      send(res, 502, { status: 'error', message: msg });
      return;
    }

    const text = Array.isArray(data?.content)
      ? data.content.map((block: any) => (typeof block?.text === 'string' ? block.text : '')).join('')
      : '';

    send(res, 200, { status: 'ok', text });
  } catch (error: any) {
    send(res, 502, { status: 'error', message: error?.message || 'AI request failed' });
  }
}
