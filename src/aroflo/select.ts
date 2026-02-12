function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getByPath(obj: unknown, path: string): unknown {
  if (!isRecord(obj)) {
    return undefined;
  }
  const parts = path.split('.').filter((p) => p.length > 0);
  let cur: unknown = obj;
  for (const part of parts) {
    if (!isRecord(cur)) {
      return undefined;
    }
    cur = cur[part];
  }
  return cur;
}

function setByPath(target: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.').filter((p) => p.length > 0);
  if (parts.length === 0) {
    return;
  }

  let cur: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]!;
    const existing = cur[part];
    if (!isRecord(existing)) {
      cur[part] = {};
    }
    cur = cur[part] as Record<string, unknown>;
  }

  cur[parts[parts.length - 1]!] = value as unknown;
}

export function compactZoneResponseData(
  data: unknown,
  options: { select?: string[]; maxItems?: number }
): unknown {
  if (!isRecord(data)) {
    return data;
  }
  const zoneresponse = data['zoneresponse'];
  if (!isRecord(zoneresponse)) {
    return data;
  }

  const select = (options.select ?? []).map((s) => s.trim()).filter((s) => s.length > 0);
  const maxItems = options.maxItems;

  // Preserve the envelope fields as-is and only rewrite zoneresponse arrays.
  const out: Record<string, unknown> = { ...data, zoneresponse: { ...zoneresponse } };
  const outZone = out['zoneresponse'] as Record<string, unknown>;

  for (const [key, value] of Object.entries(zoneresponse)) {
    if (!Array.isArray(value)) {
      continue;
    }

    const sliced =
      typeof maxItems === 'number' && Number.isFinite(maxItems) ? value.slice(0, maxItems) : value;

    if (select.length === 0) {
      outZone[key] = sliced;
      continue;
    }

    outZone[key] = sliced.map((item) => {
      const picked: Record<string, unknown> = {};
      for (const path of select) {
        const v = getByPath(item, path);
        if (typeof v !== 'undefined') {
          setByPath(picked, path, v);
        }
      }
      return picked;
    });
  }

  return out;
}

