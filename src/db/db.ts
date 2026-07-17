import { randomUUID, scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

import pg from 'pg';

import { logger } from '../utils/logger.js';

const { Pool } = pg;

let pool: pg.Pool | null = null;

/**
 * Lazily create the Postgres pool. Returns null when DATABASE_URL is not set so
 * the rest of the server (MCP, /tasks, /ai) keeps working even before the
 * database is provisioned — the portal routes then report 503 "not configured".
 */
export function getPool(): pg.Pool | null {
  if (pool) return pool;

  const url = process.env.DATABASE_URL;
  if (!url) return null;

  // Railway's private URL (*.railway.internal) and localhost don't use SSL;
  // the public proxy URL does. PG_SSL=disable forces it off.
  let ssl: pg.PoolConfig['ssl'] = { rejectUnauthorized: false };
  try {
    const host = new URL(url).hostname;
    if (host.endsWith('.railway.internal') || host === 'localhost' || host === '127.0.0.1') {
      ssl = undefined;
    }
  } catch {
    /* keep default ssl */
  }
  if (process.env.PG_SSL === 'disable') ssl = undefined;

  pool = new Pool({ connectionString: url, ssl, max: 5 });
  pool.on('error', (err) => logger.error({ err }, 'Postgres pool error'));
  return pool;
}

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function query<T = any>(text: string, params: unknown[] = []): Promise<T[]> {
  const p = getPool();
  if (!p) throw new Error('Database not configured (DATABASE_URL missing)');
  const result = await p.query(text, params);
  return result.rows as T[];
}

// --- PIN hashing ------------------------------------------------------------
export function hashPin(pin: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(pin, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPin(pin: string, stored: string): boolean {
  const [salt, hash] = (stored || '').split(':');
  if (!salt || !hash) return false;
  const candidate = scryptSync(pin, salt, 32);
  const expected = Buffer.from(hash, 'hex');
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

// --- Schema + seed ----------------------------------------------------------
let initialized = false;

export async function initSchema(): Promise<void> {
  if (!dbConfigured()) {
    logger.warn('DATABASE_URL not set — portal (users/quotes/prices) is disabled until it is added');
    return;
  }
  if (initialized) return;

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id          uuid PRIMARY KEY,
      name        text NOT NULL,
      email       text UNIQUE,
      title       text,
      phone       text,
      pin_hash    text NOT NULL,
      is_admin    boolean NOT NULL DEFAULT false,
      active      boolean NOT NULL DEFAULT true,
      created_at  timestamptz NOT NULL DEFAULT now()
    );
    -- Migration for existing databases (columns added after first deploy):
    ALTER TABLE users ADD COLUMN IF NOT EXISTS title text;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS phone text;

    CREATE TABLE IF NOT EXISTS sessions (
      token       text PRIMARY KEY,
      user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at  timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS quotes (
      id              uuid PRIMARY KEY,
      group_id        uuid NOT NULL,
      job_no          text,
      client          text,
      title           text,
      version         int NOT NULL,
      status          text NOT NULL DEFAULT 'draft',
      source          text NOT NULL DEFAULT 'aroflo',
      snapshot        jsonb NOT NULL DEFAULT '{}'::jsonb,
      created_by      uuid,
      created_by_name text,
      created_at      timestamptz NOT NULL DEFAULT now(),
      is_current      boolean NOT NULL DEFAULT true
    );
    CREATE INDEX IF NOT EXISTS quotes_group_idx  ON quotes(group_id);
    CREATE INDEX IF NOT EXISTS quotes_client_idx ON quotes(client);
    CREATE INDEX IF NOT EXISTS quotes_jobno_idx  ON quotes(job_no);

    CREATE TABLE IF NOT EXISTS price_files (
      id              uuid PRIMARY KEY,
      name            text UNIQUE NOT NULL,
      kind            text,
      data            jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_by_name text,
      updated_at      timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS clients (
      id              uuid PRIMARY KEY,
      name            text UNIQUE NOT NULL,
      data            jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_by_name text,
      updated_at      timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS tasks_cache (
      job_no     text PRIMARY KEY,
      data       jsonb NOT NULL,
      synced_at  timestamptz NOT NULL DEFAULT now()
    );
  `);

  await seedUsers();
  initialized = true;
  logger.info('Portal schema ready');
}

async function seedUsers(): Promise<void> {
  const rows = await query<{ count: string }>('SELECT count(*)::text AS count FROM users');
  if (Number(rows[0]?.count || 0) > 0) return;

  const adminPin = process.env.PORTAL_ADMIN_PIN || '2468';
  await query(
    `INSERT INTO users (id, name, email, title, phone, pin_hash, is_admin, active)
     VALUES ($1,$2,$3,$4,$5,$6,true,true)`,
    [randomUUID(), 'Adrian Menon', 'adrian@afplumbing.com.au', 'Senior Operations Manager', '0415 104 144', hashPin(adminPin)]
  );
  await query(
    `INSERT INTO users (id, name, email, title, phone, pin_hash, is_admin, active)
     VALUES ($1,$2,$3,$4,$5,$6,false,true)`,
    [randomUUID(), 'Michael Canty', 'michael@afplumbing.com.au', 'Operations Supervisor - NSW', '0415 494 515', hashPin('1234')]
  );
  logger.info('Seeded initial users (Adrian=admin, Michael Canty=user)');
}
