import { describe, expect, test } from 'vitest';

import { validateWhereOrThrow } from '../../../src/aroflo/where-validation.js';
import { AroFloWhereValidationError } from '../../../src/utils/errors.js';

describe('where-validation', () => {
  test('accepts valid WHERE field for Tasks', async () => {
    await expect(
      validateWhereOrThrow({ zone: 'Tasks', where: ['and|taskid|=|abc'] })
    ).resolves.toBeUndefined();
  });

  test('rejects invalid WHERE field for Tasks', async () => {
    await expect(
      validateWhereOrThrow({ zone: 'Tasks', where: ['and|definitelynotafield|=|abc'] })
    ).rejects.toBeInstanceOf(AroFloWhereValidationError);
  });

  test('accepts valid WHERE field for TransactionTerms', async () => {
    await expect(
      validateWhereOrThrow({ zone: 'TransactionTerms', where: ['and|transactiontermid|=|abc'] })
    ).resolves.toBeUndefined();
  });
});
