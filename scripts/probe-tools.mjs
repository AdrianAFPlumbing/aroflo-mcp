import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

function withTimeout(promise, ms, label) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`Timeout after ${ms}ms: ${label}`)), ms);
    timeoutId.unref?.();
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

const command = process.argv[2] ?? 'aroflo-mcp';
const args = process.argv.slice(3);

// Provide dummy defaults so we can validate MCP stdio behavior without needing real credentials.
const env = {
  AROFLO_API_BASE_URL: process.env.AROFLO_API_BASE_URL ?? 'https://api.aroflo.com/',
  AROFLO_ACCEPT: process.env.AROFLO_ACCEPT ?? 'text/json',
  AROFLO_SECRET_KEY: process.env.AROFLO_SECRET_KEY ?? 'dummy-secret',
  AROFLO_UENCODED: process.env.AROFLO_UENCODED ?? 'dummy-uencoded',
  AROFLO_PENCODED: process.env.AROFLO_PENCODED ?? 'dummy-pencoded',
  AROFLO_ORG_ENCODED: process.env.AROFLO_ORG_ENCODED ?? 'dummy-orgencoded',
  MCP_TRANSPORT: 'stdio'
};

const transport = new StdioClientTransport({
  command,
  args,
  env,
  stderr: 'pipe'
});

const stderrChunks = [];
transport.stderr?.on('data', (chunk) => {
  stderrChunks.push(chunk);
});

const client = new Client(
  { name: 'aroflo-mcp-probe', version: '0.0.0' },
  {
    capabilities: {}
  }
);

try {
  await withTimeout(client.connect(transport), 5000, 'client.connect');
  const tools = await withTimeout(client.listTools(), 5000, 'tools/list');
  process.stdout.write(
    JSON.stringify(
      { toolCount: tools.tools.length, toolNames: tools.tools.map((t) => t.name) },
      null,
      2
    )
  );
  process.stdout.write('\n');
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`${message}\n`);
  const stderrText = Buffer.concat(stderrChunks).toString('utf8').trim();
  if (stderrText.length) {
    process.stderr.write('\n--- server stderr ---\n');
    process.stderr.write(stderrText + '\n');
  }
  process.exitCode = 1;
} finally {
  await Promise.allSettled([client.close(), transport.close()]);
}
