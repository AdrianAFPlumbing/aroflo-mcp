# AroFlo MCP

Standalone, production-ready MCP server for AroFlo with first-class request signing and a clean tool surface.

## Quick Start

### Install (Local)

This repo ships an MCP server executable named `aroflo-mcp` (stdio transport by default).

Install the server on your machine (puts `aroflo-mcp` on your PATH via `npm link`):

```bash
make install
```

### Install Into Codex (stdio)

1. Create a local `.env` (not committed) with your credentials:

```bash
cp .env.example .env
# edit .env
```

2. Register the server in Codex (stores env in `~/.codex/config.toml`, not passed as tool args):

```bash
make codex-install
```

3. Verify:

```bash
codex mcp get aroflo
```

### Manual Codex Install (Alternative)

If you prefer doing it manually (same env variables, stored in Codex config):

```bash
codex mcp add aroflo \
  --env AROFLO_API_BASE_URL=https://api.aroflo.com/ \
  --env AROFLO_ACCEPT=text/json \
  --env AROFLO_SECRET_KEY=... \
  --env AROFLO_UENCODED=... \
  --env AROFLO_PENCODED=... \
  --env AROFLO_ORG_ENCODED=... \
  --env MCP_TRANSPORT=stdio \
  -- "$(command -v node)" "$(pwd)/dist/mcp/server.js"
```

Notes:

- If Codex (desktop app) hangs starting the server, it is usually a PATH issue (common when Node is installed via `nvm` and the app is launched outside your shell).
- Fix 1: Launch Codex from a terminal so it inherits your shell PATH (`codex app`).
- Fix 2: Configure the MCP server to run via an absolute Node path (see `docs/runbooks.md`).

### Development

Install dependencies:

```bash
npm install
```

Build and test:

```bash
npm run test
npm run build
```

Run server (stdio):

```bash
npm run dev
```

Run server (HTTP Streamable transport):

```bash
MCP_TRANSPORT=http npm run dev:http
```

## MCP Inspector

To interactively test `tools/list` and `tools/call` via the official inspector UI:

```bash
make inspector
```

## Project Layout

```text
src/
  auth/
  aroflo/
  mcp/
  utils/
tests/
docs/
```

## Environment

Required variables:

- `AROFLO_SECRET_KEY`
- `AROFLO_UENCODED`
- `AROFLO_PENCODED`
- `AROFLO_ORG_ENCODED`

Optional variables:

- `AROFLO_API_BASE_URL` (default: `https://api.aroflo.com/`)
- `AROFLO_ACCEPT` (default: `text/json`)
- `AROFLO_HOST_IP`
- `AROFLO_TIMEOUT_MS` (default: `65000`)
- `AROFLO_MAX_RETRIES` (default: `2`)
- `LOG_LEVEL` (default: `info`)

## HTTP Transport

Set `MCP_TRANSPORT=http` to run an HTTP server (Streamable HTTP transport) at:

- `http://${MCP_HTTP_HOST}:${MCP_HTTP_PORT}${MCP_HTTP_PATH}`

## Docs

- `docs/aroflo-auth.md`
- `docs/mcp-tools.md`
- `docs/runbooks.md`
- `docs/deployment.md`
