import type { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

import { logger } from '../utils/logger.js';
import { dbConfigured, query, hashPin, verifyPin } from '../db/db.js';

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function send(res: ServerResponse, code: number, payload: unknown): void {
  if (res.headersSent) return;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 2_000_000) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

interface SessionUser {
  id: string;
  name: string;
  email: string | null;
  is_admin: boolean;
  active: boolean;
}

async function getUser(req: IncomingMessage): Promise<SessionUser | null> {
  const token = (req.headers['x-portal-token'] as string) || '';
  if (!token) return null;
  const rows = await query<SessionUser>(
    `SELECT u.id, u.name, u.email, u.is_admin, u.active
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token = $1`,
    [token]
  );
  const u = rows[0];
  if (!u || !u.active) return null;
  return u;
}

function seg(pathname: string): string[] {
  return pathname.replace(/^\/portal\/?/, '').split('/').filter(Boolean);
}

// ---------------------------------------------------------------------------
// Router — returns true if it handled the request.
// ---------------------------------------------------------------------------
export async function handlePortal(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string
): Promise<boolean> {
  if (!pathname.startsWith('/portal')) return false;

  if (!dbConfigured()) {
    send(res, 503, { status: 'error', message: 'Database not configured. Add a PostgreSQL plugin in Railway (DATABASE_URL).' });
    return true;
  }

  const parts = seg(pathname);
  const method = req.method || 'GET';

  try {
    // --- Auth: login (no token needed) ------------------------------------
    if (parts[0] === 'login' && method === 'POST') {
      const body = await readBody(req);
      const ident = String(body.name || body.email || '').trim().toLowerCase();
      const pin = String(body.pin || '');
      if (!ident || !pin) return (send(res, 400, { status: 'error', message: 'Name/email and PIN required' }), true);

      const users = await query<SessionUser & { pin_hash: string }>(
        `SELECT id, name, email, is_admin, active, pin_hash FROM users
          WHERE lower(name) = $1 OR lower(email) = $1 LIMIT 1`,
        [ident]
      );
      const u = users[0];
      if (!u || !u.active || !verifyPin(pin, u.pin_hash)) {
        return (send(res, 401, { status: 'error', message: 'Invalid login' }), true);
      }
      const token = randomUUID().replace(/-/g, '') + randomUUID().replace(/-/g, '');
      await query('INSERT INTO sessions (token, user_id) VALUES ($1,$2)', [token, u.id]);
      return (send(res, 200, {
        status: 'ok',
        token,
        user: { id: u.id, name: u.name, email: u.email, isAdmin: u.is_admin }
      }), true);
    }

    // Everything below requires a valid session.
    const user = await getUser(req);
    if (!user) return (send(res, 401, { status: 'error', message: 'Not authenticated' }), true);

    if (parts[0] === 'me' && method === 'GET') {
      return (send(res, 200, { status: 'ok', user: { id: user.id, name: user.name, email: user.email, isAdmin: user.is_admin } }), true);
    }

    if (parts[0] === 'logout' && method === 'POST') {
      const token = (req.headers['x-portal-token'] as string) || '';
      await query('DELETE FROM sessions WHERE token = $1', [token]);
      return (send(res, 200, { status: 'ok' }), true);
    }

    // --- Users (admin only) ----------------------------------------------
    if (parts[0] === 'users') {
      if (!user.is_admin) return (send(res, 403, { status: 'error', message: 'Admin only' }), true);

      if (method === 'GET' && parts.length === 1) {
        const rows = await query(
          'SELECT id, name, email, is_admin, active, created_at FROM users ORDER BY created_at'
        );
        return (send(res, 200, { status: 'ok', users: rows }), true);
      }
      if (method === 'POST' && parts.length === 1) {
        const b = await readBody(req);
        const name = String(b.name || '').trim();
        const pin = String(b.pin || '').trim();
        if (!name || pin.length < 4) return (send(res, 400, { status: 'error', message: 'Name and 4+ digit PIN required' }), true);
        const id = randomUUID();
        await query(
          `INSERT INTO users (id, name, email, pin_hash, is_admin, active)
           VALUES ($1,$2,$3,$4,$5,true)`,
          [id, name, (b.email || '').trim() || null, hashPin(pin), Boolean(b.isAdmin)]
        );
        return (send(res, 200, { status: 'ok', id }), true);
      }
      const targetId = parts[1];
      if (method === 'PATCH' && targetId) {
        const b = await readBody(req);
        const sets: string[] = [];
        const vals: unknown[] = [];
        let i = 1;
        if (typeof b.name === 'string') { sets.push(`name = $${i++}`); vals.push(b.name.trim()); }
        if (typeof b.email === 'string') { sets.push(`email = $${i++}`); vals.push(b.email.trim() || null); }
        if (typeof b.isAdmin === 'boolean') { sets.push(`is_admin = $${i++}`); vals.push(b.isAdmin); }
        if (typeof b.active === 'boolean') { sets.push(`active = $${i++}`); vals.push(b.active); }
        if (typeof b.pin === 'string' && b.pin.trim().length >= 4) { sets.push(`pin_hash = $${i++}`); vals.push(hashPin(b.pin.trim())); }
        if (!sets.length) return (send(res, 400, { status: 'error', message: 'Nothing to update' }), true);
        vals.push(targetId);
        await query(`UPDATE users SET ${sets.join(', ')} WHERE id = $${i}`, vals);
        return (send(res, 200, { status: 'ok' }), true);
      }
      if (method === 'DELETE' && targetId) {
        if (targetId === user.id) return (send(res, 400, { status: 'error', message: 'You cannot delete your own account' }), true);
        await query('DELETE FROM users WHERE id = $1', [targetId]);
        return (send(res, 200, { status: 'ok' }), true);
      }
    }

    // --- Quotes ----------------------------------------------------------
    if (parts[0] === 'quotes') {
      // List current versions with optional filters
      if (method === 'GET' && parts.length === 1) {
        const u = new URL(req.url || '', 'http://x');
        const client = u.searchParams.get('client');
        const jobNo = u.searchParams.get('jobNo');
        const status = u.searchParams.get('status');
        const q = u.searchParams.get('q');
        const where: string[] = ['is_current = true'];
        const vals: unknown[] = [];
        let i = 1;
        if (client) { where.push(`client = $${i++}`); vals.push(client); }
        if (jobNo) { where.push(`job_no = $${i++}`); vals.push(jobNo); }
        if (status) { where.push(`status = $${i++}`); vals.push(status); }
        if (q) { where.push(`(title ILIKE $${i} OR client ILIKE $${i} OR job_no ILIKE $${i})`); vals.push(`%${q}%`); i++; }
        const rows = await query(
          `SELECT id, group_id, job_no, client, title, version, status, source, created_by_name, created_at
             FROM quotes WHERE ${where.join(' AND ')} ORDER BY created_at DESC LIMIT 500`,
          vals
        );
        return (send(res, 200, { status: 'ok', quotes: rows }), true);
      }
      // Save a brand-new quote (creates group + v1)
      if (method === 'POST' && parts.length === 1) {
        const b = await readBody(req);
        const id = randomUUID();
        const groupId = randomUUID();
        await query(
          `INSERT INTO quotes (id, group_id, job_no, client, title, version, status, source, snapshot, created_by, created_by_name, is_current)
           VALUES ($1,$2,$3,$4,$5,1,$6,$7,$8,$9,$10,true)`,
          [id, groupId, b.jobNo || null, b.client || null, b.title || null,
           b.status || 'draft', b.source || 'aroflo', b.snapshot || {}, user.id, user.name]
        );
        return (send(res, 200, { status: 'ok', id, groupId, version: 1 }), true);
      }
      // Version history for a group
      if (method === 'GET' && parts[2] === 'versions') {
        const groupId = parts[1];
        const rows = await query(
          `SELECT id, version, status, created_by_name, created_at, is_current
             FROM quotes WHERE group_id = $1 ORDER BY version DESC`,
          [groupId]
        );
        return (send(res, 200, { status: 'ok', versions: rows }), true);
      }
      // Create the next version (locks current, opens editable copy stamped to editor)
      if (method === 'POST' && parts[2] === 'version') {
        const groupId = parts[1];
        const b = await readBody(req);
        const rows = await query<any>(
          `SELECT * FROM quotes WHERE group_id = $1 ORDER BY version DESC LIMIT 1`,
          [groupId]
        );
        const latest = rows[0];
        if (!latest) return (send(res, 404, { status: 'error', message: 'Quote group not found' }), true);
        const id = randomUUID();
        const nextVersion = Number(latest.version) + 1;
        await query('UPDATE quotes SET is_current = false WHERE group_id = $1', [groupId]);
        await query(
          `INSERT INTO quotes (id, group_id, job_no, client, title, version, status, source, snapshot, created_by, created_by_name, is_current)
           VALUES ($1,$2,$3,$4,$5,$6,'draft',$7,$8,$9,$10,true)`,
          [id, groupId, latest.job_no, latest.client, b.title || latest.title, nextVersion,
           latest.source, b.snapshot || latest.snapshot, user.id, user.name]
        );
        return (send(res, 200, { status: 'ok', id, groupId, version: nextVersion }), true);
      }
      // Load / update / delete a single version by id
      const qid = parts[1];
      if (qid && qid !== 'version' && qid !== 'versions') {
        if (method === 'GET') {
          const rows = await query('SELECT * FROM quotes WHERE id = $1', [qid]);
          if (!rows[0]) return (send(res, 404, { status: 'error', message: 'Not found' }), true);
          return (send(res, 200, { status: 'ok', quote: rows[0] }), true);
        }
        if (method === 'PATCH') {
          const b = await readBody(req);
          const sets: string[] = [];
          const vals: unknown[] = [];
          let i = 1;
          if (b.snapshot !== undefined) { sets.push(`snapshot = $${i++}`); vals.push(b.snapshot); }
          if (typeof b.status === 'string') { sets.push(`status = $${i++}`); vals.push(b.status); }
          if (typeof b.title === 'string') { sets.push(`title = $${i++}`); vals.push(b.title); }
          // saving edits re-stamps the editor so attribution follows whoever actually changed it
          sets.push(`created_by = $${i++}`); vals.push(user.id);
          sets.push(`created_by_name = $${i++}`); vals.push(user.name);
          vals.push(qid);
          await query(`UPDATE quotes SET ${sets.join(', ')} WHERE id = $${i}`, vals);
          return (send(res, 200, { status: 'ok' }), true);
        }
        if (method === 'DELETE') {
          if (!user.is_admin) return (send(res, 403, { status: 'error', message: 'Admin only' }), true);
          await query('DELETE FROM quotes WHERE id = $1', [qid]);
          return (send(res, 200, { status: 'ok' }), true);
        }
      }
    }

    // --- Price files -----------------------------------------------------
    if (parts[0] === 'price-files') {
      if (method === 'GET' && parts.length === 1) {
        const rows = await query('SELECT id, name, kind, data, updated_by_name, updated_at FROM price_files ORDER BY name');
        return (send(res, 200, { status: 'ok', priceFiles: rows }), true);
      }
      if ((method === 'PUT' || method === 'POST') && parts[1]) {
        if (!user.is_admin) return (send(res, 403, { status: 'error', message: 'Admin only' }), true);
        const name = decodeURIComponent(parts[1]);
        const b = await readBody(req);
        await query(
          `INSERT INTO price_files (id, name, kind, data, updated_by_name, updated_at)
           VALUES ($1,$2,$3,$4,$5, now())
           ON CONFLICT (name) DO UPDATE SET kind = EXCLUDED.kind, data = EXCLUDED.data,
             updated_by_name = EXCLUDED.updated_by_name, updated_at = now()`,
          [randomUUID(), name, b.kind || null, b.data || {}, user.name]
        );
        return (send(res, 200, { status: 'ok' }), true);
      }
      if (method === 'DELETE' && parts[1]) {
        if (!user.is_admin) return (send(res, 403, { status: 'error', message: 'Admin only' }), true);
        await query('DELETE FROM price_files WHERE name = $1', [decodeURIComponent(parts[1])]);
        return (send(res, 200, { status: 'ok' }), true);
      }
    }

    // --- Clients (for New Custom Quote dropdown) -------------------------
    if (parts[0] === 'clients') {
      if (method === 'GET' && parts.length === 1) {
        // Merge explicitly-managed clients with any names seen in cached tasks / quotes.
        const managed = await query<any>('SELECT name, data FROM clients ORDER BY name');
        const seen = await query<{ name: string }>(
          `SELECT DISTINCT client AS name FROM quotes WHERE client IS NOT NULL
           UNION SELECT DISTINCT (data->>'client') AS name FROM tasks_cache WHERE data->>'client' IS NOT NULL`
        );
        const byName = new Map<string, any>();
        for (const s of seen) if (s.name) byName.set(s.name, { name: s.name, data: {} });
        for (const m of managed) byName.set(m.name, { name: m.name, data: m.data });
        return (send(res, 200, { status: 'ok', clients: [...byName.values()].sort((a, b) => a.name.localeCompare(b.name)) }), true);
      }
      if ((method === 'PUT' || method === 'POST') && parts[1]) {
        if (!user.is_admin) return (send(res, 403, { status: 'error', message: 'Admin only' }), true);
        const name = decodeURIComponent(parts[1]);
        const b = await readBody(req);
        await query(
          `INSERT INTO clients (id, name, data, updated_by_name, updated_at)
           VALUES ($1,$2,$3,$4, now())
           ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data,
             updated_by_name = EXCLUDED.updated_by_name, updated_at = now()`,
          [randomUUID(), name, b.data || {}, user.name]
        );
        return (send(res, 200, { status: 'ok' }), true);
      }
    }

    // --- Cached tasks (fast home-screen load from the last sync) ---------
    if (parts[0] === 'tasks' && method === 'GET') {
      const rows = await query<{ data: any; synced_at: string }>(
        'SELECT data, synced_at FROM tasks_cache ORDER BY synced_at DESC'
      );
      const syncedAt = rows[0]?.synced_at || null;
      return (send(res, 200, { status: 'ok', count: rows.length, syncedAt, tasks: rows.map((r) => r.data) }), true);
    }

    send(res, 404, { status: 'error', message: 'Unknown portal route' });
    return true;
  } catch (error) {
    logger.error({ err: error, pathname }, 'Portal route error');
    send(res, 500, { status: 'error', message: error instanceof Error ? error.message : 'Internal error' });
    return true;
  }
}
