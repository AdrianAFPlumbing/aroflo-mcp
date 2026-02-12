# AroFlo Auth Recipe

This implementation follows AroFlo's Postman pre-request logic.

## Required Headers

- `Authentication: HMAC <hex-signature>`
- `Authorization: uencoded=<...>&pencoded=<...>&orgEncoded=<...>`
- `Accept: text/json` (or `text/xml`)
- `afdatetimeutc: <ISO-8601 UTC timestamp>`
- Optional `HostIP: <public-ip>`

## Canonical Payload

Build payload array in this exact order:

1. `METHOD` (`GET` or `POST`)
2. `HostIP` (only when provided)
3. `urlPath` (currently empty string)
4. `accept`
5. `Authorization`
6. `afdatetimeutc`
7. `varString`

Then join with `+` and sign using HMAC-SHA512 with `secret_key`.

## varString Rules

- GET uses URL/form vars without leading `?` (for signing).
- POST uses form vars (`zone`, `postxml`) URL-encoded.
- URL-encode values exactly (e.g. via `encodeURIComponent`).
- Include/exclude `HostIP` consistently in both payload and HTTP headers.
