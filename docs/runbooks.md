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
