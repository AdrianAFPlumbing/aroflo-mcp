# Deployment Notes

## Local stdio (development)

Use `npm run dev` for local MCP clients that start a stdio subprocess.

## Local/remote HTTP

Use `MCP_TRANSPORT=http npm run start:http` and expose:

- `http://<host>:<port><path>` (defaults to `http://127.0.0.1:3000/mcp`)

## Client Config Snippets

### Codex / Cursor / Claude (HTTP)

Use your MCP client's HTTP transport config and point to:

- URL: `http://127.0.0.1:3000/mcp`
- Method: MCP Streamable HTTP

### Stdio config

- Command: `node`
- Args: `dist/mcp/server.js`
- Environment: include AroFlo credentials + `MCP_TRANSPORT=stdio`

## Hosting targets

This server can run on any Node host that supports long-lived HTTP requests:

- Fly.io
- Render
- Railway
- Docker/Kubernetes

Cloudflare Workers should use the SDK web-standard transport variant and a Worker-specific entrypoint.
