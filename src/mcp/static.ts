import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { logger } from '../utils/logger.js';

// The bundled portal HTML is committed to public/portal.html and served here so
// the team has ONE permanent, bookmarkable URL (the Railway service domain).
const __dirname = dirname(fileURLToPath(import.meta.url));
// dist/mcp/static.js -> ../../public/portal.html
const PORTAL_PATH = join(__dirname, '..', '..', 'public', 'portal.html');

let cached: string | null = null;

async function loadPortal(): Promise<string | null> {
  if (cached) return cached;
  try {
    cached = await readFile(PORTAL_PATH, 'utf8');
    return cached;
  } catch (err) {
    logger.warn({ err, path: PORTAL_PATH }, 'portal.html not found — add it under public/');
    return null;
  }
}

/** Serve the portal HTML at "/" and "/portal-app". Returns true if handled. */
export async function handleStatic(
  _req: IncomingMessage,
  res: ServerResponse,
  pathname: string
): Promise<boolean> {
  if (pathname !== '/' && pathname !== '/portal-app' && pathname !== '/index.html') return false;

  const html = await loadPortal();
  if (!html) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><meta charset="utf-8"><title>AFP Quote Portal</title><body style="font-family:sans-serif;padding:40px"><h1>AFP Quote Portal</h1><p>Backend is running. The portal front-end (<code>public/portal.html</code>) has not been deployed yet.</p><p>Endpoints: <code>/tasks</code>, <code>/ai/complete</code>, <code>/portal/*</code></p></body>');
    return true;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
  return true;
}
