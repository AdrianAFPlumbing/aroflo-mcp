import { describe, expect, it } from 'vitest';

import { buildGetVarString, buildPostVarString } from '../../../src/aroflo/query.js';

describe('AroFlo query var string builders', () => {
  it('builds GET var strings in deterministic order with encoded values', () => {
    const query = buildGetVarString({
      zone: 'lastupdate',
      where: ['and|zonename|=|tasks', 'and|lastupdateutc|>|2022/02/01'],
      order: ['lastupdateutc|asc'],
      page: 1,
      pageSize: 250
    });

    expect(query).toBe(
      'zone=lastupdate&where=and%7Czonename%7C%3D%7Ctasks&where=and%7Clastupdateutc%7C%3E%7C2022%2F02%2F01&order=lastupdateutc%7Casc&page=1&pageSize=250'
    );
  });

  it('builds POST var strings with encoded postxml', () => {
    const post = buildPostVarString({
      zone: 'tasks',
      postxml: '<imsapi><tasks><task><taskname>Install AC</taskname></task></tasks></imsapi>'
    });

    expect(post).toBe(
      'zone=tasks&postxml=%3Cimsapi%3E%3Ctasks%3E%3Ctask%3E%3Ctaskname%3EInstall%20AC%3C%2Ftaskname%3E%3C%2Ftask%3E%3C%2Ftasks%3E%3C%2Fimsapi%3E'
    );
  });
});
