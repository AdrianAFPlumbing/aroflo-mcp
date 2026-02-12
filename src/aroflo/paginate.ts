function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getZoneResponse(data: unknown): Record<string, unknown> | undefined {
  if (!isRecord(data)) {
    return undefined;
  }
  const zr = data['zoneresponse'];
  return isRecord(zr) ? zr : undefined;
}

export function withZoneResponseMeta(data: unknown, meta: Record<string, unknown>): unknown {
  if (!isRecord(data)) {
    return data;
  }
  const zr = getZoneResponse(data);
  if (!zr) {
    return { ...data, _mcp: meta };
  }
  return {
    ...data,
    zoneresponse: {
      ...zr,
      _mcp: meta
    }
  };
}

export function withDebug(data: unknown, debug: Record<string, unknown>): unknown {
  if (!isRecord(data)) {
    return data;
  }
  return { ...data, _debug: debug };
}

export function countZoneArrays(zoneresponse: Record<string, unknown>): number {
  let total = 0;
  for (const v of Object.values(zoneresponse)) {
    if (Array.isArray(v)) {
      total += v.length;
    }
  }
  return total;
}

export function mergeZoneResponseData(
  baseData: unknown,
  nextData: unknown
): { merged: unknown; appended: number } {
  if (!isRecord(baseData) || !isRecord(nextData)) {
    return { merged: baseData, appended: 0 };
  }

  const baseZr = getZoneResponse(baseData);
  const nextZr = getZoneResponse(nextData);
  if (!baseZr || !nextZr) {
    return { merged: baseData, appended: 0 };
  }

  const mergedZr: Record<string, unknown> = { ...baseZr };
  let appended = 0;

  for (const [key, nextVal] of Object.entries(nextZr)) {
    const baseVal = mergedZr[key];
    if (Array.isArray(baseVal) && Array.isArray(nextVal)) {
      mergedZr[key] = baseVal.concat(nextVal);
      appended += nextVal.length;
      continue;
    }
    // Prefer latest scalar/meta values from the newest page.
    mergedZr[key] = nextVal;
  }

  const merged: Record<string, unknown> = { ...baseData, ...nextData, zoneresponse: mergedZr };
  return { merged, appended };
}

export function truncateZoneArrays(
  data: unknown,
  maxResults: number
): { truncated: unknown; removed: number } {
  if (!isRecord(data)) {
    return { truncated: data, removed: 0 };
  }
  const zr = getZoneResponse(data);
  if (!zr) {
    return { truncated: data, removed: 0 };
  }

  let remaining = maxResults;
  let removed = 0;
  const outZr: Record<string, unknown> = { ...zr };

  // Preserve key order as much as possible; arrays tend to be the main zone key.
  for (const [key, val] of Object.entries(zr)) {
    if (!Array.isArray(val)) {
      continue;
    }
    if (remaining <= 0) {
      removed += val.length;
      outZr[key] = [];
      continue;
    }
    if (val.length > remaining) {
      removed += val.length - remaining;
      outZr[key] = val.slice(0, remaining);
      remaining = 0;
      continue;
    }
    remaining -= val.length;
  }

  return { truncated: { ...data, zoneresponse: outZr }, removed };
}
