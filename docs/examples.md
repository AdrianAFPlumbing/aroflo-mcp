# MCP Examples

This is a small cookbook of common `aroflo-mcp` tool calls.

Tips:

- Prefer looking up valid fields/enums in the extracted zone docs first:
  - `aroflo://docs/api/<slug>` (example: `aroflo://docs/api/quotes`)
- `where`, `order`, and `join` accept either a single string or an array of strings.
- WHERE clauses are pipe-delimited strings like `and|field|=|value`.

## Quotes

List quotes where acceptance status is \"Awaiting Decision\":

- Tool: `aroflo_get_quotes`

```json
{
  "where": "and|acceptancestatus|=|Awaiting Decision",
  "page": 1,
  "pageSize": 50
}
```

List \"in progress\" quotes and include line items:

- Tool: `aroflo_get_quotes`

```json
{
  "where": "and|status|=|in progress",
  "join": "lineitems",
  "page": 1,
  "pageSize": 50
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
  "pageSize": 50
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
  "pageSize": 50
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
  "pageSize": 50
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
  "pageSize": 50
}
```

List tasks not yet processed by your integration:

- Tool: `aroflo_get_tasks`

```json
{
  "where": "and|linkprocessed|=|false",
  "page": 1,
  "pageSize": 50
}
```

## Clients

List clients with `postable=true` (typical sync workflow):

- Tool: `aroflo_get_clients`

```json
{
  "where": "and|postable|=|true",
  "page": 1,
  "pageSize": 50
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
  "pageSize": 500
}
```
