import { describe, expect, it } from 'vitest';

import {
  normalizeJoinParam,
  normalizeWhereParam,
  splitCombinedWhereClause
} from '../../../src/aroflo/normalize-params.js';

describe('AroFlo param normalization', () => {
  it('does not split a simple WHERE clause', () => {
    expect(splitCombinedWhereClause('and|jobnumber|=|8038')).toEqual(['and|jobnumber|=|8038']);
  });

  it('normalizes ISO date literals in WHERE clauses', () => {
    expect(splitCombinedWhereClause('and|daterequested|>|2025-06-30')).toEqual([
      'and|daterequested|>|2025/06/30'
    ]);
    expect(splitCombinedWhereClause('and|datetimerequested|>|2025-06-30 01:02:03')).toEqual([
      'and|datetimerequested|>|2025/06/30 01:02:03'
    ]);
  });

  it('splits concatenated WHERE clauses into repeated params', () => {
    expect(normalizeWhereParam('and|clientid|=|ABC123|and|daterequested|>|2025/01/01')).toEqual([
      'and|clientid|=|ABC123',
      'and|daterequested|>|2025/01/01'
    ]);
  });

  it('leaves ambiguous WHERE strings untouched', () => {
    // Not a clean multiple of 4 tokens, so we keep the original.
    expect(normalizeWhereParam('and|field|=|a|b|and|x|=|y')).toEqual(['and|field|=|a|b|and|x|=|y']);
  });

  it('splits comma-separated JOIN strings', () => {
    expect(normalizeJoinParam('project,tasktotals')).toEqual(['project', 'tasktotals']);
    expect(normalizeJoinParam(['project, tasktotals', 'lineitems'])).toEqual([
      'project',
      'tasktotals',
      'lineitems'
    ]);
  });
});
