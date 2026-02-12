# MCP Examples

This is a small cookbook of common `aroflo-mcp` tool calls.

Tips:

- Prefer looking up valid fields/enums in the extracted zone docs first:
  - `aroflo://docs/api/<slug>` (example: `aroflo://docs/api/quotes`)
- `where`, `order`, and `join` accept either a single string or an array of strings.
- WHERE clauses are pipe-delimited strings like `and|field|=|value`.

## Recommended Defaults (Small Outputs)

Most zone GET tools can return either:

- a raw AroFlo response payload (legacy-compatible), or
- a small stable envelope (recommended for LLM usage).

To opt into the small envelope, set `mode: "data"` (or `"verbose"|"debug"|"raw"`).

To reduce payload size further, set `compact: true` and optionally a `select` list.

Example: list recent tasks with totals, using a compact payload and auto-pagination with a hard cap:

- Tool: `aroflo_get_tasks`

```json
{
  "where": ["and|daterequested|>|2025-06-30", "and|status|!=|completed"],
  "join": "project,tasktotals",
  "order": "daterequested|desc",
  "autoPaginate": true,
  "maxResults": 200,
  "compact": true,
  "select": [
    "taskid",
    "refcode",
    "taskname",
    "status",
    "daterequested",
    "project.projectname",
    "tasktotals.totalhrs"
  ],
  "mode": "data"
}
```

Notes:

- Dates in WHERE can be `YYYY-MM-DD` or `YYYY/MM/DD`; the MCP normalizes to AroFlo's expected format.
- `join` can be `"a,b"` or `["a","b"]` (comma-separated strings are normalized).

## Open Projects + Labour Hours (Report Tools)

List open projects (client-side filtering on `status=="open"` + `closeddate==""`):

- Tool: `aroflo_list_open_projects`

```json
{
  "sinceCreatedUtc": "2025-01-01",
  "mode": "data"
}
```

Report open projects with labour hours per task (grouped by project):

- Tool: `aroflo_report_open_projects_with_task_hours`

```json
{
  "sinceCreatedUtc": "2025-01-01",
  "sinceDateRequested": "2025-01-01",
  "hoursOnly": true,
  "includeTaskStatus": true,
  "mode": "data"
}
```

Fetch tasks+hours for specific projects (when you already know the project IDs):

- Tool: `aroflo_list_project_tasks_with_hours`

```json
{
  "projectIds": ["PROJECT_ID_1", "PROJECT_ID_2"],
  "sinceDateRequested": "2025-06-30",
  "autoPaginate": true,
  "maxResultsPerClient": 1000,
  "hoursOnly": false,
  "includeTaskStatus": true,
  "mode": "data"
}
```

## Quotes

List quotes where acceptance status is \"Awaiting Decision\":

- Tool: `aroflo_get_quotes`

```json
{
  "where": "and|acceptancestatus|=|Awaiting Decision",
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

List \"in progress\" quotes and include line items:

- Tool: `aroflo_get_quotes`

```json
{
  "where": "and|status|=|in progress",
  "join": "lineitems",
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

## WorkOrders

List work orders awaiting acceptance decision and include tasks + bills:

- Tool: `aroflo_get_workorders`

```json
{
  "where": "and|acceptancestatus|=|Awaiting Decision",
  "join": ["tasks", "bills"],
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

## Bills

List approved bills including line items:

- Tool: `aroflo_get_bills`

```json
{
  "where": "and|status|=|Approved",
  "join": "lineitems",
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

Mark a bill as processed (example POST):

- Tool: `aroflo_create_or_update_record`

```json
{
  "zone": "Bills",
  "postxml": "<bills><bill><billid>YOUR_BILL_ID</billid><status>Processed</status></bill></bills>"
}
```

## InventoryLists

List inventory assemblies and include their items:

- Tool: `aroflo_get_inventorylists`

```json
{
  "where": "and|listtype|=|assembly",
  "join": "items",
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

## Tasks

List pending tasks and include totals + salesperson:

- Tool: `aroflo_get_tasks`

```json
{
  "where": "and|status|=|pending",
  "join": ["tasktotals", "salesperson"],
  "order": "daterequested|desc",
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

List tasks not yet processed by your integration:

- Tool: `aroflo_get_tasks`

```json
{
  "where": "and|linkprocessed|=|false",
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

## Clients

List clients with `postable=true` (typical sync workflow):

- Tool: `aroflo_get_clients`

```json
{
  "where": "and|postable|=|true",
  "page": 1,
  "pageSize": 50,
  "mode": "data"
}
```

Reset the `postable` flag after processing (example POST):

- Tool: `aroflo_create_or_update_record`

```json
{
  "zone": "Clients",
  "postxml": "<clients><client><clientid>YOUR_CLIENT_ID</clientid><postable>false</postable></client></clients>"
}
```

## LastUpdate (Incremental Sync)

Fetch incremental changes for a zone since a timestamp (see `aroflo://docs/api/lastupdate` for details):

- Tool: `aroflo_get_lastupdate`

```json
{
  "zoneName": "Tasks",
  "sinceUtc": "2020-11-01T00:00:00Z",
  "orderDirection": "asc",
  "page": 1,
  "pageSize": 500,
  "mode": "data"
}
```
