import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloV2Client, V2QueryValue } from '../../aroflo/v2-client.js';
import { errorToolResult, successToolResult } from './shared.js';

/**
 * AroFlo APIv2 tools (Open Beta).
 *
 * These sit alongside the legacy zone tools so the two APIs can be compared and
 * migrated one tool at a time. Record ids returned here are v2-encoded and are
 * NOT interchangeable with legacy ids.
 */

const queryValueSchema = z.union([z.string(), z.number(), z.boolean()]);

const modeSchema = z.enum(['data', 'raw']).default('data');

function buildListResult(
  response: { httpStatus: number; headers: Record<string, string>; data: unknown },
  mode: 'data' | 'raw'
) {
  const data = (response.data ?? {}) as Record<string, unknown>;
  const items = Array.isArray(data.items) ? data.items : [];
  const out: Record<string, unknown> = {
    api: 'v2',
    items,
    count: typeof data.count === 'number' ? data.count : items.length,
    page: data.page
  };
  if (mode === 'raw') {
    out.httpStatus = response.httpStatus;
    out.rawResponse = response.data;
  }
  return successToolResult(out);
}

export function registerV2Tools(server: McpServer, client: AroFloV2Client): void {
  server.registerTool(
    'aroflo_v2_get_tasks',
    {
      title: 'AroFlo v2: List tasks',
      description:
        'List tasks via AroFlo APIv2 (GET /v2/tasks). status: 0=NOT_STARTED, 1=IN_PROGRESS, 2=PENDING, 3=COMPLETED, 4=ARCHIVED. ' +
        'Any extra query parameters can be passed via `query` (the v2 schema changes weekly — see https://docs.api.aroflo.com/blog/).',
      inputSchema: {
        status: z.number().int().min(0).max(4).optional(),
        subStatusList: z.string().optional().describe('Comma-separated v2-encoded substatus ids'),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(500).optional(),
        query: z
          .record(z.string(), queryValueSchema)
          .optional()
          .describe('Additional query parameters passed through verbatim'),
        mode: modeSchema
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        const query: Record<string, V2QueryValue> = {
          status: args.status,
          subStatusList: args.subStatusList,
          page: args.page,
          pageSize: args.pageSize,
          ...(args.query ?? {})
        };
        const response = await client.get('tasks', query);
        return buildListResult(response, args.mode);
      } catch (error) {
        return errorToolResult(error, {
          mode: args.mode === 'raw' ? 'debug' : 'data',
          debug: { api: 'v2', path: 'tasks' }
        });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_get_task',
    {
      title: 'AroFlo v2: Get task',
      description: 'Fetch a single task by its v2-encoded id (GET /v2/tasks/{taskId}).',
      inputSchema: {
        taskId: z
          .string()
          .min(1)
          .describe('v2-encoded task id (not a legacy taskid or job number)'),
        mode: modeSchema
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        const response = await client.get(`tasks/${encodeURIComponent(args.taskId)}`);
        const out: Record<string, unknown> = { api: 'v2', task: response.data };
        if (args.mode === 'raw') out.httpStatus = response.httpStatus;
        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode: args.mode === 'raw' ? 'debug' : 'data',
          debug: { api: 'v2', path: `tasks/${args.taskId}` }
        });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_get',
    {
      title: 'AroFlo v2: Generic GET',
      description:
        'Read-only GET against any AroFlo APIv2 path (e.g. "clients", "users", "locations", "workorders", "quotes/{id}/lineitems", "types/tasks", "worktypes"). ' +
        'Use this to explore endpoints while the v2 schema is still in beta. Query parameters are passed through verbatim.',
      inputSchema: {
        path: z.string().min(1).describe('Path relative to /v2/, without a leading slash'),
        query: z.record(z.string(), queryValueSchema).optional(),
        mode: modeSchema
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        const response = await client.get(args.path, args.query);
        const data = response.data;
        const isList =
          data !== null &&
          typeof data === 'object' &&
          Array.isArray((data as Record<string, unknown>).items);
        if (isList) return buildListResult(response, args.mode);
        const out: Record<string, unknown> = { api: 'v2', path: args.path, data };
        if (args.mode === 'raw') out.httpStatus = response.httpStatus;
        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode: args.mode === 'raw' ? 'debug' : 'data',
          debug: { api: 'v2', path: args.path }
        });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_convert_ids',
    {
      title: 'AroFlo v2: Convert legacy ids',
      description:
        'Convert legacy API record ids into their APIv2 equivalents (POST /v2/idconversions). Format conversion only — no access check is performed. ' +
        'Ids are returned in the order supplied.',
      inputSchema: {
        ids: z
          .array(z.string().min(1))
          .min(1)
          .max(100)
          .describe('Legacy-encoded ids (e.g. a legacy taskid or userid)')
      },
      outputSchema: z.object({}).passthrough(),
      annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true }
    },
    async (args) => {
      try {
        const response = await client.post('idconversions', { ids: args.ids });
        return successToolResult({ api: 'v2', data: response.data });
      } catch (error) {
        return errorToolResult(error, {
          mode: 'debug',
          debug: { api: 'v2', path: 'idconversions' }
        });
      }
    }
  );
}
