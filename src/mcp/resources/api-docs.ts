import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';

const DOCS_API_DIR = fileURLToPath(new URL('../../../docs/api/', import.meta.url));

async function listApiDocSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(DOCS_API_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name.replace(/\.md$/i, ''))
      .filter((slug) => slug !== 'README')
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

async function readDocFile(fileName: string): Promise<string> {
  const filePath = join(DOCS_API_DIR, fileName);
  return readFile(filePath, 'utf8');
}

export function registerApiDocsResources(server: McpServer): void {
  server.registerResource(
    'aroflo_api_docs_index',
    'aroflo://docs/api',
    {
      title: 'AroFlo API Docs',
      description: 'Local reference extracted into docs/api.',
      mimeType: 'text/markdown',
      annotations: {
        audience: ['assistant'],
        priority: 0.1
      }
    },
    async (uri) => {
      let text: string;
      try {
        text = await readDocFile('README.md');
      } catch {
        text =
          `docs/api/README.md is not available.\n\n` +
          `Expected to find it at: ${join(DOCS_API_DIR, 'README.md')}\n`;
      }

      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: 'text/markdown',
            text
          }
        ]
      };
    }
  );

  const zoneDocTemplate = new ResourceTemplate('aroflo://docs/api/{slug}', {
    list: async () => {
      const slugs = await listApiDocSlugs();
      return {
        resources: slugs.map((slug) => ({
          uri: `aroflo://docs/api/${slug}`,
          name: `docs/api/${slug}.md`,
          title: `AroFlo API: ${slug}`,
          description: `docs/api/${slug}.md`,
          mimeType: 'text/markdown',
          annotations: {
            audience: ['assistant'],
            priority: 0.2
          }
        }))
      };
    },
    complete: {
      slug: async (value) => {
        const slugs = await listApiDocSlugs();
        const needle = value.trim().toLowerCase();
        if (needle.length === 0) {
          return slugs;
        }

        return slugs.filter((slug) => slug.includes(needle)).slice(0, 50);
      }
    }
  });

  server.registerResource(
    'aroflo_api_zone_docs',
    zoneDocTemplate,
    {
      title: 'AroFlo API Zone Docs',
      description: 'Zone documentation from docs/api/<zone>.md.',
      mimeType: 'text/markdown',
      annotations: {
        audience: ['assistant'],
        priority: 0.2
      }
    },
    async (uri, vars) => {
      const slug = vars.slug;
      let text: string;
      try {
        text = await readDocFile(`${slug}.md`);
      } catch {
        text =
          `docs/api/${slug}.md is not available.\n\n` +
          `Expected to find it at: ${join(DOCS_API_DIR, `${slug}.md`)}\n`;
      }

      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: 'text/markdown',
            text
          }
        ]
      };
    }
  );
}
