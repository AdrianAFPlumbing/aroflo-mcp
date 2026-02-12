import { zoneToToolSuffix } from './zones.js';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export interface ExtractedItems {
  itemsKey?: string;
  items: unknown[];
  // AroFlo fields in zoneresponse when present.
  pageNumber?: number;
  currentPageResults?: number;
  maxPageResults?: number;
}

export function extractZoneItems(zone: string, data: unknown): ExtractedItems {
  if (!isRecord(data)) {
    return { items: [] };
  }
  const zr = data['zoneresponse'];
  if (!isRecord(zr)) {
    return { items: [] };
  }

  const pageNumber = toNumber(zr['pagenumber']);
  const currentPageResults = toNumber(zr['currentpageresults']);
  const maxPageResults = toNumber(zr['maxpageresults']);

  const expectedKey = zoneToToolSuffix(zone);
  const expectedVal = zr[expectedKey];
  if (Array.isArray(expectedVal)) {
    return {
      itemsKey: expectedKey,
      items: expectedVal,
      pageNumber,
      currentPageResults,
      maxPageResults
    };
  }

  const arrayKeys = Object.entries(zr)
    .filter(([, v]) => Array.isArray(v))
    .map(([k]) => k);

  if (arrayKeys.length === 1) {
    const k = arrayKeys[0]!;
    return { itemsKey: k, items: zr[k] as unknown[], pageNumber, currentPageResults, maxPageResults };
  }

  if (arrayKeys.length > 1) {
    const k = arrayKeys[0]!;
    return { itemsKey: k, items: zr[k] as unknown[], pageNumber, currentPageResults, maxPageResults };
  }

  return { items: [], pageNumber, currentPageResults, maxPageResults };
}

