/**
 * Helpers for normalizing MCP tool args into the query parameter shapes
 * expected by the AroFlo API.
 *
 * AroFlo supports repeating query params like:
 *   ?where=and|field|=|value&where=and|other|>|2025/01/01
 *
 * Models/users sometimes provide multiple WHERE clauses concatenated into a
 * single pipe-delimited string. We split those into distinct where entries
 * when it is unambiguous.
 */

export type StringOrStringArray = string | string[];

function toArray(input?: StringOrStringArray): string[] {
  if (typeof input === 'string') {
    return [input];
  }
  return input ?? [];
}

function normalizeDateLiterals(value: string): string {
  // AroFlo docs say YYYY-MM-DD, but many tenants accept/emit YYYY/MM/DD.
  // Normalize ISO-like date literals to slash format to reduce query failures.
  // Example: "2025-06-30" -> "2025/06/30"
  // Example: "2025-06-30 12:00:00" -> "2025/06/30 12:00:00"
  return value.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, '$1/$2/$3');
}

function splitCommaList(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Split a concatenated WHERE clause string like:
 *   and|a|=|1|and|b|>|2
 * into:
 *   ["and|a|=|1", "and|b|>|2"]
 *
 * Only splits when the tokenization is a clean multiple of 4 tokens and each
 * clause begins with "and" or "or". Otherwise returns the original string as
 * a single clause.
 */
export function splitCombinedWhereClause(whereClause: string): string[] {
  const trimmed = whereClause.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const tokens = trimmed.split('|');
  if (tokens.length <= 4) {
    return [normalizeDateLiterals(trimmed)];
  }

  // AroFlo WHERE clauses are generally: (and|or)|field|op|value
  if (tokens.length % 4 !== 0) {
    return [normalizeDateLiterals(trimmed)];
  }

  const out: string[] = [];
  for (let i = 0; i < tokens.length; i += 4) {
    const conj = tokens[i]?.trim();
    if (conj !== 'and' && conj !== 'or') {
      return [normalizeDateLiterals(trimmed)];
    }
    out.push(
      normalizeDateLiterals([tokens[i], tokens[i + 1], tokens[i + 2], tokens[i + 3]].join('|'))
    );
  }

  return out;
}

export function normalizeWhereParam(where?: StringOrStringArray): string[] | undefined {
  const raw = toArray(where);
  const out: string[] = [];

  for (const item of raw) {
    for (const clause of splitCombinedWhereClause(item)) {
      const trimmed = clause.trim();
      if (trimmed.length > 0) {
        out.push(trimmed);
      }
    }
  }

  return out.length > 0 ? out : undefined;
}

export function normalizeOrderParam(order?: StringOrStringArray): string[] | undefined {
  const raw = toArray(order)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return raw.length > 0 ? raw : undefined;
}

export function normalizeJoinParam(join?: StringOrStringArray): string[] | undefined {
  const raw = toArray(join);
  const out: string[] = [];

  for (const item of raw) {
    // Users/models often pass comma-separated JOIN lists ("project,tasktotals").
    for (const part of splitCommaList(item)) {
      out.push(part);
    }
  }

  return out.length > 0 ? out : undefined;
}
