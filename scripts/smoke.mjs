import { AroFloClient } from '../dist/aroflo/client.js';

const required = ['AROFLO_SECRET_KEY', 'AROFLO_UENCODED', 'AROFLO_PENCODED', 'AROFLO_ORG_ENCODED'];
const missing = required.filter((k) => !process.env[k] || process.env[k].trim().length === 0);

if (missing.length) {
  console.error('Missing env vars: ' + missing.join(', '));
  process.exit(2);
}

const client = new AroFloClient({
  baseUrl: process.env.AROFLO_API_BASE_URL || 'https://api.aroflo.com/',
  credentials: {
    uEncoded: process.env.AROFLO_UENCODED,
    pEncoded: process.env.AROFLO_PENCODED,
    orgEncoded: process.env.AROFLO_ORG_ENCODED
  },
  secretKey: process.env.AROFLO_SECRET_KEY,
  accept: process.env.AROFLO_ACCEPT || 'text/json',
  hostIp: process.env.AROFLO_HOST_IP,
  maxRetries: 0
});

const res = await client.get('lastupdate', { page: 1, pageSize: 1 });
console.log(
  JSON.stringify(
    {
      httpStatus: res.httpStatus,
      status: res.status,
      statusMessage: res.statusMessage,
      rateLimits: res.rateLimits
    },
    null,
    2
  )
);
