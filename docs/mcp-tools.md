# MCP Tools

## `aroflo_get_lastupdate`

Query the `lastupdate` zone with optional zone and date filters.

## `aroflo_query_zone`

Generic GET query with `zone`, optional `where`, `order`, `join`, paging, and `extra` query params.

## `aroflo_get_record`

Fetch a specific record by zone + ID field/value.

## `aroflo_create_or_update_record`

Send POST (`zone` + `postxml`) to create or update data.

## Convenience GET Zone Tools

In addition to the generic tools above, this server registers convenience GET tools:

- `aroflo_get_<zone>` where `<zone>` is the lowercased zone name with non-alphanumerics stripped (see `src/aroflo/zones.ts`).
- These tools accept the same query inputs as `aroflo_query_zone` (minus the `zone` field), and call the AroFlo API with `GET zone=<ZoneName>`.

Notes:

- `LastUpdate` has a dedicated tool (`aroflo_get_lastupdate`) with a richer input schema.
