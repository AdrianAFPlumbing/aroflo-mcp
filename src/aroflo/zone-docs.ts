import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS_API_DIR = fileURLToPath(new URL('../../docs/api/', import.meta.url));

export interface ZoneDocInfo {
  slug: string;
  whereFields: Set<string>;
  joinAreas: Set<string>;
}

let cache: Map<string, ZoneDocInfo> | undefined;

function parseWhereFields(markdown: string): Set<string> {
  const out = new Set<string>();
  const lines = markdown.split(/\r?\n/);

  let inWhere = false;
  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ') && trimmed !== '## WHERE filters') {
      if (inWhere) {
        break;
      }
    }

    if (trimmed === '## WHERE filters') {
      inWhere = true;
      continue;
    }

    if (!inWhere) {
      continue;
    }

    if (!trimmed.startsWith('|')) {
      continue;
    }

    // Markdown table row: | field | value |
    const parts = trimmed.split('|').map((p) => p.trim());
    // parts looks like: ["", "Field", "Value", ""]
    const field = parts[1]?.toLowerCase();
    if (!field || field === 'field' || field === '---') {
      continue;
    }
    out.add(field);
  }

  return out;
}

function parseJoinAreas(markdown: string): Set<string> {
  const out = new Set<string>();
  const lines = markdown.split(/\r?\n/);

  let inJoin = false;
  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ') && trimmed !== '## JOINs available') {
      if (inJoin) {
        break;
      }
    }

    if (trimmed === '## JOINs available') {
      inJoin = true;
      continue;
    }

    if (!inJoin) {
      continue;
    }

    if (!trimmed.startsWith('|')) {
      continue;
    }

    // Markdown table row: | Area |
    const parts = trimmed.split('|').map((p) => p.trim());
    const area = parts[1]?.toLowerCase();
    if (!area || area === 'area' || area === '---') {
      continue;
    }
    out.add(area);
  }

  return out;
}

async function buildCache(): Promise<Map<string, ZoneDocInfo>> {
  const map = new Map<string, ZoneDocInfo>();
  const entries = await readdir(DOCS_API_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      continue;
    }
    const slug = entry.name.replace(/\.md$/i, '');
    if (slug.toLowerCase() === 'readme') {
      continue;
    }
    const text = await readFile(join(DOCS_API_DIR, entry.name), 'utf8');
    map.set(slug.toLowerCase(), {
      slug: slug.toLowerCase(),
      whereFields: parseWhereFields(text),
      joinAreas: parseJoinAreas(text)
    });
  }
  return map;
}

export async function getZoneDocInfo(slug: string): Promise<ZoneDocInfo | undefined> {
  if (!cache) {
    try {
      cache = await buildCache();
    } catch {
      cache = new Map();
    }
  }
  return cache.get(slug.toLowerCase());
}

