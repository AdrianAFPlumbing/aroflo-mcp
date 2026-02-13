# MCP Tools

## WHERE / ORDER / JOIN Syntax

AroFlo query filters are pipe-delimited strings:

- `where`: `and|field|=|value` (repeat for multiple clauses)
- `order`: `field|asc` or `field|desc`
- `join`: `area` (repeat for multiple joins)

In this MCP server, `where`, `order`, and `join` can be passed as either a single string or an array of strings.

Normalization helpers (designed to reduce common LLM failure modes):

- Multi-clause `where` strings are split when unambiguous:
  - `"and|a|=|1|and|b|>|2"` becomes `["and|a|=|1", "and|b|>|2"]`
- ISO date literals in WHERE values are normalized:
  - `"2025-06-30"` becomes `"2025/06/30"`
- Comma-separated `join` strings are split:
  - `"project,tasktotals"` becomes `["project", "tasktotals"]`

Additional optional helpers on GET tools:

- `autoPaginate`: fetches subsequent pages and merges `zoneresponse` arrays client-side
- `maxResults` / `maxItemsTotal`: cap total merged items; sets `mcp.truncated=true` + `nextPage` when hit
- `maxPages`: cap page fetches when auto-paginating
- `compact`, `select`, `maxItems`: reduce payload size (see below)
- `validateWhere` (default true): validates WHERE fields against extracted zone docs and fails fast with a targeted message
- `mode`: `"data" | "verbose" | "debug" | "raw"` (default: `"data"`)
  - `verbose`: include transport meta like http status + rate limits
  - `debug`: include MCP internals like normalized params
  - `raw`: include the raw AroFlo response payload

Example: list Quotes with acceptance status "Awaiting Decision":

Tool: `aroflo_get_quotes`

```json
{
  "where": "and|acceptancestatus|=|Awaiting Decision",
  "page": 1,
  "pageSize": 50
}
```

## Response Shape (GET Tools)

To opt into the small, stable response envelope, pass `mode` explicitly (for example `mode: "data"`).

If you omit `mode`/`verbose`/`raw`, the zone GET tools return the raw AroFlo response payload for backward compatibility.

Envelope (`mode="data"`) response is intentionally small and stable:

```json
{
  "zone": "Tasks",
  "items": [],
  "page": 1,
  "pageSize": 200,
  "count": 0,
  "hasMore": false
}
```

Optional fields:

- `nextPage` when `hasMore=true`
- `maxPageResults` if present in AroFlo `zoneresponse`
- `mcp` when auto-pagination/capping was used (e.g. `{ "pagesFetched": 3, "truncated": true, "truncatedReason": "maxPages" }`)
- `meta` only in `mode="verbose"|"debug"|"raw"`
- `debug` only in `mode="debug"|"raw"`
- `rawArofloResponse` only in `mode="raw"`

## API Docs Resources

This server exposes the extracted API docs under MCP resources:

- `aroflo://docs/api` -> `docs/api/README.md`
- `aroflo://docs/api/<slug>` -> `docs/api/<slug>.md` (example: `aroflo://docs/api/quotes`)

In most cases the `<slug>` matches the tool suffix, e.g.:

- tool `aroflo_get_quotes` -> resource `aroflo://docs/api/quotes`

For a cookbook of common calls, see `docs/examples.md`.

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

## Report Tools

Higher-level tools that encode common AroFlo quirks:

- `aroflo_resolve_job_context`
- `aroflo_report_project_labour_budget_audit`
- `aroflo_list_open_projects`
- `aroflo_list_project_tasks_with_hours`
- `aroflo_report_open_projects_with_task_hours`

Resolve a job context (jobnumber + related task(s), quote(s), and project) when you only have a partial identifier:

```json
{
  "jobNumber": 7344,
  "mode": "data"
}
```

Audit actual hours vs allowed quote hours (and planned-vs-actual by task):

```json
{
  "quoteRefno": "Luic21",
  "includeUnmatchedQuoteItems": false,
  "mode": "data"
}
```

Example: report open projects with labour hours per task (grouped by project):

```json
{
  "sinceCreatedUtc": "2025-01-01",
  "sinceDateRequested": "2025-01-01",
  "hoursOnly": true,
  "includeTaskStatus": true,
  "mode": "data"
}
```
