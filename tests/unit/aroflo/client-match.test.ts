import { describe, expect, it } from 'vitest';

import {
  matchClients,
  normaliseName,
  type ClientRecord
} from '../../../src/aroflo/client-match.js';

const clients: ClientRecord[] = [
  { clientid: 'A', clientname: 'Programmed Property Services', domains: ['programmed.com.au'] },
  { clientid: 'B', clientname: 'Programmed Electrical Technologies', domains: [] },
  { clientid: 'C', clientname: 'S & A Contracting Pty Ltd', domains: [] },
  { clientid: 'D', clientname: 'Thales Australia Limited', domains: ['thalesgroup.com.au'] },
  { clientid: 'E', clientname: 'Knight Frank', domains: ['knightfrank.com', 'mybuildings.com'] },
  { clientid: 'F', clientname: "St Luke's Care", domains: [] }
];

describe('normaliseName', () => {
  it('strips corporate suffixes and punctuation', () => {
    expect(normaliseName('S&A Contracting Pty Ltd')).toBe('s a contracting');
    expect(normaliseName('Thales Australia')).toBe('thales');
  });
});

describe('matchClients', () => {
  it('matches by sender domain including subdomains', () => {
    const m = matchClients(clients, { senderEmail: 'someone@au.knightfrank.com' });
    expect(m[0]).toMatchObject({ clientid: 'E', matchedOn: 'domain' });
  });

  it('matches S&A to S & A as a normalised name', () => {
    const m = matchClients(clients, { name: 'S&A Contracting' });
    expect(m[0]).toMatchObject({ clientid: 'C', matchedOn: 'normalised' });
  });

  it('prefers the domain match over a sibling name', () => {
    const m = matchClients(clients, {
      name: 'Programmed',
      senderEmail: 'saskia@programmed.com.au'
    });
    expect(m[0].clientid).toBe('A');
  });

  it('ignores generic mail domains', () => {
    const m = matchClients(clients, { senderEmail: 'bob@gmail.com' });
    expect(m).toHaveLength(0);
  });

  it('tolerates apostrophes', () => {
    const m = matchClients(clients, { name: 'St Lukes Care' });
    expect(m[0].clientid).toBe('F');
  });
});
