#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  process.stdout.write(`aroflo-mcp (MCP server for AroFlo)\n\n`);
  process.stdout.write(`Usage:\n`);
  process.stdout.write(`  aroflo-mcp\n\n`);
  process.stdout.write(`Environment (required):\n`);
  process.stdout.write(`  AROFLO_SECRET_KEY\n`);
  process.stdout.write(`  AROFLO_UENCODED\n`);
  process.stdout.write(`  AROFLO_PENCODED\n`);
  process.stdout.write(`  AROFLO_ORG_ENCODED\n\n`);
  process.stdout.write(`Environment (optional):\n`);
  process.stdout.write(`  AROFLO_API_BASE_URL (default: https://api.aroflo.com/)\n`);
  process.stdout.write(`  AROFLO_ACCEPT (default: text/json)\n`);
  process.stdout.write(`  AROFLO_HOST_IP\n`);
  process.stdout.write(`  MCP_TRANSPORT (stdio|http, default: stdio)\n`);
  process.stdout.write(`  MCP_HTTP_HOST (default: 127.0.0.1)\n`);
  process.stdout.write(`  MCP_HTTP_PORT (default: 3000)\n`);
  process.stdout.write(`  MCP_HTTP_PATH (default: /mcp)\n`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const url = await import('node:url');

  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pkgPath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  process.stdout.write(String(pkg.version) + '\n');
  process.exit(0);
}

await import('../dist/mcp/server.js');
