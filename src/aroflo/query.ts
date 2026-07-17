export type QueryValue = string | number | boolean;

export interface GetVarStringInput {
  zone: string;
  where?: string[];
  order?: string[];
  join?: string[];
  page?: number;
  pageSize?: number;
  extra?: Record<string, QueryValue>;
}

export interface PostVarStringInput {
  zone: string;
  postxml: string;
  extra?: Record<string, QueryValue>;
}

function encodeValue(value: QueryValue | string): string {
  return encodeURIComponent(String(value)).replace(/'/g, '%27');
}

function appendParam(parts: string[], key: string, value: QueryValue | string): void {
  parts.push(`${key}=${encodeValue(value)}`);
}

export function buildGetVarString(input: GetVarStringInput): string {
  const parts: string[] = [];

  appendParam(parts, 'zone', input.zone);

  for (const whereClause of input.where ?? []) {
    appendParam(parts, 'where', whereClause);
  }

  for (const orderClause of input.order ?? []) {
    appendParam(parts, 'order', orderClause);
  }

  for (const joinClause of input.join ?? []) {
    appendParam(parts, 'join', joinClause);
  }

  if (typeof input.page === 'number') {
    appendParam(parts, 'page', input.page);
  }

  if (typeof input.pageSize === 'number') {
    appendParam(parts, 'pageSize', input.pageSize);
  }

  const extraEntries = Object.entries(input.extra ?? {}).sort(([a], [b]) => a.localeCompare(b));
  for (const [key, value] of extraEntries) {
    appendParam(parts, key, value);
  }

  return parts.join('&');
}

export function buildPostVarString(input: PostVarStringInput): string {
  const parts: string[] = [];

  appendParam(parts, 'zone', input.zone);
  appendParam(parts, 'postxml', input.postxml);

  const extraEntries = Object.entries(input.extra ?? {}).sort(([a], [b]) => a.localeCompare(b));
  for (const [key, value] of extraEntries) {
    appendParam(parts, key, value);
  }

  return parts.join('&');
}
