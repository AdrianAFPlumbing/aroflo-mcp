import type { AroFloClient } from './client.js';
import { extractZoneItems } from './items.js';
import { logger } from '../utils/logger.js';

/**
 * Fuzzy client matching for the email intake flows.
 *
 * Why: the "Create Job from Forward" prompt looked clients up by EXACT name and
 * created a new client when that missed, which produced duplicate client
 * records ("Emirates Leisure Retail" x2, "S & A" vs "S&A", "Thales Australia"
 * vs "Thales Australia Limited") and spurious "[NEW CLIENT]" headers. This
 * module loads the active client list once (cached for 10 minutes) and matches
 * on a normalised name, the client's email domain, or the domain of any of its
 * contacts, so the prompt only ever creates a client when nothing plausible
 * exists.
 */

export interface ClientRecord {
  clientid: string;
  clientname: string;
  shortname?: string;
  email?: string;
  archive?: boolean;
  domains: string[];
}

export interface ClientMatch {
  clientid: string;
  clientname: string;
  score: number;
  matchedOn: 'exact' | 'normalised' | 'domain' | 'prefix' | 'token';
}

const STOP = new Set([
  'pty',
  'ltd',
  'limited',
  'the',
  'and',
  'of',
  'group',
  'australia',
  'australian',
  'services',
  'service',
  'co',
  'inc',
  'nsw'
]);

// Generic mail providers never identify a client.
const GENERIC_DOMAINS = new Set([
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'yahoo.com.au',
  'bigpond.com',
  'live.com',
  'icloud.com',
  'me.com',
  'optusnet.com.au',
  'ausfp.com.au',
  'ausfg.com'
]);

export function normaliseName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t))
    .join(' ')
    .trim();
}

export function domainOf(email: string | undefined): string | undefined {
  const m = /@([a-z0-9.-]+)/i.exec(email ?? '');
  return m ? m[1]!.toLowerCase() : undefined;
}

function registrableDomain(d: string): string {
  // au.knightfrank.com -> knightfrank.com ; e.mybuildings.com -> mybuildings.com
  const parts = d.split('.');
  if (parts.length <= 2) return d;
  const twoLevelTld = /\.(com|net|org|edu|gov)\.au$/.test(d);
  return parts.slice(twoLevelTld ? -3 : -2).join('.');
}

let cache: { at: number; clients: ClientRecord[] } | undefined;
const CACHE_MS = 10 * 60 * 1000;

export async function loadClients(legacy: AroFloClient, force = false): Promise<ClientRecord[]> {
  if (!force && cache && Date.now() - cache.at < CACHE_MS) return cache.clients;

  const out: ClientRecord[] = [];
  for (let page = 1; page <= 20; page += 1) {
    const response = await legacy.get('Clients', {
      where: ['and|archive|=|false'],
      join: ['contacts'],
      page,
      pageSize: 500
    });
    const { items, currentPageResults } = extractZoneItems('Clients', response.data);
    for (const raw of items) {
      const c = raw as Record<string, unknown>;
      const domains = new Set<string>();
      const d = domainOf(c['email'] as string | undefined);
      if (d && !GENERIC_DOMAINS.has(d)) domains.add(registrableDomain(d));
      const contacts = (c['contacts'] as Array<Record<string, unknown>> | undefined) ?? [];
      for (const ct of contacts) {
        const cd = domainOf(ct['email'] as string | undefined);
        if (cd && !GENERIC_DOMAINS.has(cd)) domains.add(registrableDomain(cd));
      }
      out.push({
        clientid: String(c['clientid'] ?? ''),
        clientname: String(c['clientname'] ?? '').trim(),
        shortname: c['shortname'] ? String(c['shortname']) : undefined,
        email: c['email'] ? String(c['email']) : undefined,
        archive: c['archive'] === true || c['archive'] === 'true',
        domains: [...domains]
      });
    }
    if (!currentPageResults || currentPageResults < 500) break;
  }

  cache = { at: Date.now(), clients: out.filter((c) => c.clientid && c.clientname) };
  logger.info({ count: cache.clients.length }, 'client-match: loaded active clients');
  return cache.clients;
}

export interface FindClientInput {
  name?: string;
  senderEmail?: string;
  limit?: number;
}

export function matchClients(clients: ClientRecord[], input: FindClientInput): ClientMatch[] {
  const results = new Map<string, ClientMatch>();
  const push = (c: ClientRecord, score: number, matchedOn: ClientMatch['matchedOn']) => {
    const prev = results.get(c.clientid);
    if (!prev || prev.score < score) {
      results.set(c.clientid, { clientid: c.clientid, clientname: c.clientname, score, matchedOn });
    }
  };

  const senderDomain = domainOf(input.senderEmail);
  if (senderDomain && !GENERIC_DOMAINS.has(senderDomain)) {
    const reg = registrableDomain(senderDomain);
    for (const c of clients) {
      if (c.domains.includes(reg)) push(c, 0.95, 'domain');
    }
  }

  const wanted = input.name?.trim();
  if (wanted) {
    const wLower = wanted.toLowerCase();
    const wNorm = normaliseName(wanted);
    const wTokens = new Set(wNorm.split(' ').filter(Boolean));
    for (const c of clients) {
      const cLower = c.clientname.toLowerCase();
      if (cLower === wLower) {
        push(c, 1, 'exact');
        continue;
      }
      const cNorm = normaliseName(c.clientname);
      if (cNorm && cNorm === wNorm) {
        push(c, 0.92, 'normalised');
        continue;
      }
      if (cNorm && wNorm && (cNorm.startsWith(wNorm) || wNorm.startsWith(cNorm))) {
        const shorter = Math.min(cNorm.length, wNorm.length);
        const longer = Math.max(cNorm.length, wNorm.length);
        push(c, 0.6 + 0.25 * (shorter / longer), 'prefix');
        continue;
      }
      const cTokens = new Set(cNorm.split(' ').filter(Boolean));
      if (wTokens.size && cTokens.size) {
        let hit = 0;
        for (const t of wTokens) if (cTokens.has(t)) hit += 1;
        const jaccard = hit / new Set([...wTokens, ...cTokens]).size;
        if (hit >= 1 && jaccard >= 0.4) push(c, 0.4 + 0.3 * jaccard, 'token');
      }
    }
  }

  return [...results.values()]
    .sort((a, b) => b.score - a.score || a.clientname.localeCompare(b.clientname))
    .slice(0, input.limit ?? 5);
}

export async function findClient(
  legacy: AroFloClient,
  input: FindClientInput
): Promise<{
  matches: ClientMatch[];
  best?: ClientMatch;
  confident: boolean;
  totalClients: number;
}> {
  const clients = await loadClients(legacy);
  const matches = matchClients(clients, input);
  const best = matches[0];
  // Confident = a strong match that clearly beats the runner-up.
  const confident =
    !!best && best.score >= 0.9 && (matches.length < 2 || best.score - matches[1]!.score >= 0.1);
  return { matches, best, confident, totalClients: clients.length };
}
