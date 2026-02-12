#!/usr/bin/env node
/**
 * Converts AroFlo Postman collection JSON to markdown documentation files.
 * Usage: node scripts/convert-postman-to-md.js
 */

const fs = require('fs');
const path = require('path');

const INPUT = '/tmp/aroflo-collection.json';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'api');

// Simple HTML to Markdown converter
function htmlToMd(html) {
  if (!html) return '';
  return (
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<p[^>]*>/gi, '')
      // Handle <pre><code> blocks first (multiline code)
      .replace(
        /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
        (_, code) =>
          '\n```\n' +
          code
            .replace(/<[^>]+>/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>') +
          '\n```\n'
      )
      .replace(
        /<pre[^>]*>([\s\S]*?)<\/pre>/gi,
        (_, code) =>
          '\n```\n' +
          code
            .replace(/<[^>]+>/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>') +
          '\n```\n'
      )
      // Handle inline code (single line only)
      .replace(/<code>([\s\S]*?)<\/code>/gi, (match, code) => {
        const clean = code
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
        // If multiline, use code block
        if (clean.includes('\n') && clean.length > 40) {
          return '\n```\n' + clean + '\n```\n';
        }
        return '`' + clean + '`';
      })
      .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i>(.*?)<\/i>/gi, '*$1*')
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
      .replace(/<ul[^>]*>/gi, '\n')
      .replace(/<\/ul>/gi, '\n')
      .replace(/<ol[^>]*>/gi, '\n')
      .replace(/<\/ol>/gi, '\n')
      .replace(/<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, text) =>
        text
          .split('\n')
          .map((l) => '> ' + l)
          .join('\n')
      )
      .replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, table) => convertTable(table))
      // Clean remaining HTML tags
      .replace(/<\/?[a-z][a-z0-9]*[^>]*>/gi, '')
      .replace(/<!\-\-[\s\S]*?\-\->/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x3D;/g, '=')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function convertTable(tableHtml) {
  const rows = [];
  const rowMatches = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  if (!rowMatches) return '';

  rowMatches.forEach((row, idx) => {
    const cells = [];
    const cellMatches = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi);
    if (cellMatches) {
      cellMatches.forEach((cell) => {
        const text = cell.replace(/<[^>]+>/g, '').trim();
        cells.push(text);
      });
    }
    rows.push(cells);
    // Add separator after header row
    if (idx === 0) {
      rows.push(cells.map(() => '---'));
    }
  });

  return '\n' + rows.map((r) => '| ' + r.join(' | ') + ' |').join('\n') + '\n';
}

function formatHeaders(headers) {
  if (!headers || !headers.length) return '';
  const relevant = headers.filter(
    (h) => !['Host', 'User-Agent', 'Content-Length', 'Connection'].includes(h.key)
  );
  if (!relevant.length) return '';

  let md = '\n**Headers:**\n\n';
  md += '| Header | Value | Description |\n';
  md += '| --- | --- | --- |\n';
  relevant.forEach((h) => {
    const desc = h.description ? htmlToMd(h.description).replace(/\n/g, ' ') : '';
    md += `| \`${h.key}\` | \`${h.value || ''}\` | ${desc} |\n`;
  });
  return md;
}

function formatQueryParams(params) {
  if (!params || !params.length) return '';
  let md = '\n**Query Parameters:**\n\n';
  md += '| Parameter | Value | Description |\n';
  md += '| --- | --- | --- |\n';
  params.forEach((p) => {
    const desc = p.description ? htmlToMd(p.description).replace(/\n/g, ' ') : '';
    md += `| \`${p.key}\` | \`${p.value || ''}\` | ${desc} |\n`;
  });
  return md;
}

function formatBody(body) {
  if (!body) return '';
  let md = '\n**Body:**\n\n';
  if (body.mode === 'urlencoded' && body.urlencoded) {
    md += '| Key | Value | Description |\n';
    md += '| --- | --- | --- |\n';
    body.urlencoded.forEach((p) => {
      const desc = p.description ? htmlToMd(p.description).replace(/\n/g, ' ') : '';
      const val = (p.value || '').substring(0, 200);
      md += `| \`${p.key}\` | \`${val}\` | ${desc} |\n`;
    });
  } else if (body.mode === 'raw' && body.raw) {
    md += '```\n' + body.raw + '\n```\n';
  }
  return md;
}

function formatResponse(responses) {
  if (!responses || !responses.length) return '';
  let md = '\n### Example Responses\n';

  responses.forEach((resp) => {
    const status = resp.status || resp.code || '';
    const name = resp.name || '';
    md += `\n#### ${name} (${status} ${resp.code || ''})\n`;
    if (resp.body) {
      // Try to format as JSON
      let body = resp.body;
      try {
        const parsed = JSON.parse(body);
        body = JSON.stringify(parsed, null, 2);
        md += '\n```json\n' + body + '\n```\n';
      } catch {
        md += '\n```xml\n' + body + '\n```\n';
      }
    }
  });
  return md;
}

function formatPreRequestScript(events) {
  if (!events) return '';
  const preReq = events.find((e) => e.listen === 'prerequest');
  if (!preReq || !preReq.script || !preReq.script.exec) return '';

  const code = preReq.script.exec.join('\n');
  if (code.trim().length < 10) return '';

  return '\n**Pre-request Script:**\n\n```javascript\n' + code + '\n```\n';
}

function formatRequest(item) {
  let md = '';
  const req = item.request;
  if (!req) return md;

  const method = req.method || 'GET';
  const url = typeof req.url === 'string' ? req.url : req.url ? req.url.raw || '' : '';

  md += `### ${method} ${item.name}\n\n`;
  md += `\`${method} ${url}\`\n\n`;

  if (req.description) {
    md += htmlToMd(req.description) + '\n\n';
  }

  // Auth info
  if (req.auth) {
    md += `**Authorization:** ${req.auth.type || 'Bearer Token'}\n\n`;
  }

  // Headers
  if (req.header) {
    md += formatHeaders(req.header);
  }

  // Query params
  if (req.url && req.url.query) {
    md += formatQueryParams(req.url.query);
  }

  // Body
  if (req.body) {
    md += formatBody(req.body);
  }

  // Pre-request script
  if (item.event) {
    md += formatPreRequestScript(item.event);
  }

  // Responses
  if (item.response && item.response.length) {
    md += formatResponse(item.response);
  }

  return md;
}

function processFolder(folder, depth = 1) {
  let md = '';

  // Folder description
  if (folder.description) {
    md += htmlToMd(folder.description) + '\n\n';
  }

  // Auth info for folder
  if (folder.auth) {
    md += `**Authorization:** ${folder.auth.type || 'Bearer Token'}\n\n`;
  }

  // Pre-request script for folder
  if (folder.event) {
    md += formatPreRequestScript(folder.event);
  }

  // Process sub-items
  if (folder.item) {
    folder.item.forEach((subItem) => {
      if (subItem.item) {
        // Nested folder (e.g. JOIN sections)
        const prefix = '#'.repeat(Math.min(depth + 1, 4));
        md += `\n${prefix} ${subItem.name}\n\n`;
        md += processFolder(subItem, depth + 1);
      } else if (subItem.request) {
        md += '\n---\n\n';
        md += formatRequest(subItem);
        md += '\n';
      }
    });
  }

  return md;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Main
function main() {
  console.log('Reading collection...');
  const raw = fs.readFileSync(INPUT, 'utf-8');
  const collection = JSON.parse(raw);

  // Ensure output dir exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Write overview/index file from collection info
  let indexMd = `# AroFlo API Documentation\n\n`;
  indexMd += `> Local reference extracted from [AroFlo API Docs](https://apidocs.aroflo.com/)\n\n`;
  indexMd += htmlToMd(collection.info.description) + '\n\n';

  // Write entity index
  indexMd += '\n## API Zones (Endpoints)\n\n';
  indexMd += '| Zone | File |\n';
  indexMd += '| --- | --- |\n';

  const items = collection.item || [];
  items.forEach((folder) => {
    const name = folder.name.trim();
    const slug = slugify(name);
    const subCount = folder.item ? folder.item.length : 0;
    indexMd += `| [${name}](${slug}.md) | ${subCount} endpoints |\n`;
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), indexMd);
  console.log('Wrote README.md');

  // Write individual entity files
  items.forEach((folder) => {
    const name = folder.name.trim();
    const slug = slugify(name);

    let md = `# ${name}\n\n`;
    md += processFolder(folder, 2);

    const filePath = path.join(OUTPUT_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, md);
    console.log(`Wrote ${slug}.md (${(md.length / 1024).toFixed(1)} KB)`);
  });

  console.log(`\nDone! ${items.length + 1} files written to ${OUTPUT_DIR}`);
}

main();
