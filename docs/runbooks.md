# Runbooks

## Authentication Failed - Signatures do not match

- Verify `Authorization` header is exactly `uencoded=...&pencoded=...&orgEncoded=...`.
- Verify canonical payload order and `+` separators.
- Verify `afdatetimeutc` is ISO UTC and not stale.
- Verify `HostIP` is either present in both header+payload or omitted from both.

## Rate-Limit Errors

- Observe headers: `X-RateLimit-*`.
- Reduce request frequency and increase request spacing.
- Use paging and narrower WHERE clauses.

## Invalid WHERE Clauses

Common failure mode: pasting the SQL-ish \"Default WHERE clause\" text from `docs/api/*.md` into an MCP `where` argument.

Correct AroFlo API WHERE clauses are pipe-delimited strings, for example:

- `and|acceptancestatus|=|Awaiting Decision`

Tip: the extracted zone docs are available via MCP resources:

- `aroflo://docs/api/<slug>` (example: `aroflo://docs/api/quotes`)

## Clock Skew / Payload Expired

- Sync system clock (NTP).
- Ensure timestamp generation happens immediately before signing.

## Codex Hangs Starting The MCP Server

Symptoms:

- Codex shows it is starting MCP servers and never completes.

Most common cause:

- The desktop app does not inherit your interactive shell `PATH`, so `command = "aroflo-mcp"` (or `command = "npx"`) cannot be resolved when Node was installed via `nvm`.

Fix options:

1. Launch Codex from a terminal so it inherits your shell environment (`codex app`).
2. Use an absolute Node path in `~/.codex/config.toml`:

```toml
[mcp_servers.aroflo]
command = "/absolute/path/to/node"
args = ["/absolute/path/to/aroflo-mcp/dist/mcp/server.js"]

[mcp_servers.aroflo.env]
# ... your AROFLO_* env vars ...
MCP_TRANSPORT = "stdio"
```

## ANSTO SAP Purchase Orders (PO-only jobs)

ANSTO's SAP PO email (subject `ANSTO Purch. Order 4300xxxxxx`) has a boilerplate
body; the 7-digit Work Order No, scope and contact are only inside the attached
PDF. Planned/contract maintenance items are frequently issued as a PO only, with
no separate Work Order email, so an email-text pipeline cannot raise them.

`src/aroflo/ansto-po.ts` reads the PO PDF that AroFlo's email import attaches to
the task and acts deterministically:

- Work Order No already has a job (Cust ON match) → write the Order No into the
  primary job's **ANSTO Order No** custom field, archive the PO import as
  `[DUPLICATE OF JN …]`.
- No job yet → convert the PO import into the job (name, Cust ON = WO No, HTML
  description from the PO, custom field, NEW TASK substatus).
- Task has no **ANSTO Order No** field (created before the field was added to
  the task type - AroFlo answers error 701 "Field Not Found in Database") → the
  Order No goes into Cust ON as `<WO No>/<Order No>` instead, and the result
  carries a note saying so.
- Archived imports are skipped by the sweep (they were dealt with by hand);
  `aroflo_ansto_process_po` on an explicit job number still processes them.

Tools: `aroflo_ansto_sweep_po_tasks` (run daily; `dryRun` previews),
`aroflo_ansto_process_po` (one job number, or raw PO text), `aroflo_ansto_parse_po_text`.

REST (for Power Automate / cron): `POST /ansto/sweep?dryRun=1` and
`POST /ansto/po/<jobnumber>`, protected by env `ANSTO_WEBHOOK_TOKEN`
(header `x-ansto-token` or `?token=`). Endpoints return 401 until the env var is set.
