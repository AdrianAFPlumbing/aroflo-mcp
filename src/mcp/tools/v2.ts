import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { convertLegacyIds, v2TaskIdForJobNumber } from '../../aroflo/v2-bridge.js';
import {
  patchTask,
  resolvePriorityId,
  resolveSubstatusId,
  uploadTaskDocument
} from '../../aroflo/v2-tasks.js';
import type { AroFloV2Client, AroFloV2Response, V2QueryValue } from '../../aroflo/v2-client.js';
import { errorToolResult, successToolResult } from './shared.js';

/**
 * AroFlo APIv2 tools (Open Beta).
 *
 * These sit alongside the legacy zone tools so the two APIs can be compared and
 * migrated one tool at a time. Record ids returned here are v2-encoded and are
 * NOT interchangeable with legacy ids; tools that take a job number resolve it
 * through the legacy API + /idconversions (see v2-bridge.ts).
 *
 * Reference: https://docs.api.aroflo.com/ (schema changes weekly — check the blog).
 */

const queryValueSchema = z.union([z.string(), z.number(), z.boolean()]);
const modeSchema = z.enum(['data', 'raw']).default('data');
const fieldsSchema = z
  .string()
  .optional()
  .describe(
    'Comma-separated fields to return (v2 `_fields`), bracket notation for sub-fields. Field names differ per endpoint: list tasks -> "id,jobNumber,name,status,client[name],taskResources[resource[givenName,familyName]]"; single task -> "id,jobNumber,name,status,substatus[name],client[name],resources,description,dueDate,customerOrderNumber,referenceNumber"; notes -> "id,timestampCreated,note[content,visibility,postedBy[givenName,familyName]]". Omit for the full record.'
  );
const outputSchema = z.object({}).passthrough();
const readOnly = { readOnlyHint: true, idempotentHint: true, openWorldHint: true };

/** Either a v2 task id or a 6-digit job number. */
const taskRefSchema = {
  taskId: z.string().min(1).optional().describe('v2-encoded task id'),
  jobNumber: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('AroFlo job number (resolved to a v2 id via the legacy API + /idconversions)')
};

function errMode(mode: 'data' | 'raw'): 'data' | 'debug' {
  return mode === 'raw' ? 'debug' : 'data';
}

function listResult(
  response: AroFloV2Response,
  mode: 'data' | 'raw',
  extra: Record<string, unknown> = {}
) {
  const data = (response.data ?? {}) as Record<string, unknown>;
  const items = Array.isArray(data.items) ? data.items : [];
  const page = (data.page ?? {}) as Record<string, unknown>;
  const out: Record<string, unknown> = {
    api: 'v2',
    ...extra,
    items,
    count: typeof data.count === 'number' ? data.count : items.length,
    page
  };
  const pageNumber = Number(page.number);
  const pageCount = Number(page.count);
  if (Number.isFinite(pageNumber) && Number.isFinite(pageCount)) {
    out.hasMore = pageNumber < pageCount;
    if (pageNumber < pageCount) out.nextPage = pageNumber + 1;
  }
  if (mode === 'raw') {
    out.httpStatus = response.httpStatus;
    out.rawResponse = response.data;
  }
  return successToolResult(out);
}

async function resolveTaskId(
  legacy: AroFloClient,
  v2: AroFloV2Client,
  args: { taskId?: string; jobNumber?: number }
): Promise<{ taskId: string; resolvedFrom?: Record<string, unknown> }> {
  if (args.taskId) return { taskId: args.taskId };
  if (args.jobNumber) {
    const r = await v2TaskIdForJobNumber(legacy, v2, args.jobNumber);
    return {
      taskId: r.taskId,
      resolvedFrom: { jobNumber: args.jobNumber, legacyTaskId: r.legacyTaskId }
    };
  }
  throw new Error('Provide either taskId or jobNumber');
}

export function registerV2Tools(server: McpServer, v2: AroFloV2Client, legacy: AroFloClient): void {
  server.registerTool(
    'aroflo_v2_get_tasks',
    {
      title: 'AroFlo v2: List tasks',
      description:
        'List tasks via AroFlo APIv2 (GET /v2/tasks). Returns 30 per page by default (limit max 100), newest first. ' +
        'status: 0=NOT_STARTED, 1=IN_PROGRESS, 2=PENDING, 3=COMPLETED, 4=ARCHIVED. There is NO job-number filter on this endpoint — use aroflo_v2_get_task with jobNumber for a single job. ' +
        'Use `fields` to keep responses small. Any other v2 query parameter can be passed via `query`.',
      inputSchema: {
        status: z.number().int().min(0).max(4).optional(),
        statusList: z.string().optional().describe('Comma-separated status codes, e.g. "0,1,2"'),
        businessUnitId: z.string().optional().describe('v2-encoded business unit id'),
        clientId: z.string().optional().describe('v2-encoded client id'),
        assignedUserId: z.string().optional().describe('v2-encoded user id (assignedFilterUserId)'),
        projectId: z.string().optional(),
        locationId: z.string().optional(),
        requiredByFrom: z.string().optional().describe('ISO date'),
        requiredByTo: z.string().optional().describe('ISO date'),
        sortBy: z
          .enum([
            'requiredby',
            'client',
            'clientcode',
            'status',
            'lastupdateutc',
            'jobnumber',
            'custon',
            'service',
            'priority',
            'task',
            'substatus',
            'schedule',
            'modified',
            'completion'
          ])
          .optional(),
        ascending: z.boolean().optional(),
        userBuAccessType: z.enum(['childbus', 'thisbu', 'allbus']).optional(),
        page: z.number().int().positive().optional(),
        limit: z
          .number()
          .int()
          .positive()
          .max(100)
          .optional()
          .describe('Items per page (default 30, max 100)'),
        fields: fieldsSchema,
        query: z
          .record(z.string(), queryValueSchema)
          .optional()
          .describe('Additional v2 query parameters passed through verbatim'),
        mode: modeSchema
      },
      outputSchema,
      annotations: readOnly
    },
    async (args) => {
      try {
        const query: Record<string, V2QueryValue> = {
          status: args.status,
          statusList: args.statusList,
          businessUnitId: args.businessUnitId,
          clientId: args.clientId,
          assignedFilterUserId: args.assignedUserId,
          projectId: args.projectId,
          locationId: args.locationId,
          requiredByFrom: args.requiredByFrom,
          requiredByTo: args.requiredByTo,
          sortBy: args.sortBy,
          ascending: args.ascending,
          userBuAccessType: args.userBuAccessType,
          page: args.page,
          limit: args.limit,
          _fields: args.fields,
          ...(args.query ?? {})
        };
        const response = await v2.get('tasks', query);
        return listResult(response, args.mode);
      } catch (error) {
        return errorToolResult(error, {
          mode: errMode(args.mode),
          debug: { api: 'v2', path: 'tasks' }
        });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_get_task',
    {
      title: 'AroFlo v2: Get task',
      description:
        'Fetch a single task via APIv2 (GET /v2/tasks/{taskId}) by v2 id or by job number. ' +
        'Includes assignees (taskResources), client, priority, substatus, task type, dates and reference numbers in one call.',
      inputSchema: { ...taskRefSchema, fields: fieldsSchema, mode: modeSchema },
      outputSchema,
      annotations: readOnly
    },
    async (args) => {
      try {
        const { taskId, resolvedFrom } = await resolveTaskId(legacy, v2, args);
        const response = await v2.get(`tasks/${encodeURIComponent(taskId)}`, {
          _fields: args.fields
        });
        const out: Record<string, unknown> = { api: 'v2', taskId, task: response.data };
        if (resolvedFrom) out.resolvedFrom = resolvedFrom;
        if (args.mode === 'raw') out.httpStatus = response.httpStatus;
        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, { mode: errMode(args.mode), debug: { api: 'v2', args } });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_get_task_notes',
    {
      title: 'AroFlo v2: Get task notes',
      description:
        'List the notes on a task via APIv2 (GET /v2/tasks/{taskId}/notes), by v2 id or job number.',
      inputSchema: {
        ...taskRefSchema,
        includeEmailNotes: z.boolean().optional(),
        removeDuplicateEmails: z.boolean().optional(),
        fields: fieldsSchema,
        mode: modeSchema
      },
      outputSchema,
      annotations: readOnly
    },
    async (args) => {
      try {
        const { taskId, resolvedFrom } = await resolveTaskId(legacy, v2, args);
        const response = await v2.get(`tasks/${encodeURIComponent(taskId)}/notes`, {
          includeEmailNotes: args.includeEmailNotes,
          removeDuplicateEmails: args.removeDuplicateEmails,
          _fields: args.fields
        });
        return listResult(response, args.mode, {
          taskId,
          ...(resolvedFrom ? { resolvedFrom } : {})
        });
      } catch (error) {
        return errorToolResult(error, { mode: errMode(args.mode), debug: { api: 'v2', args } });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_assign_task',
    {
      title: 'AroFlo v2: Assign task resources',
      description:
        'Set the assignees on a task via APIv2 (PUT /v2/tasks/{taskId}/resources). REPLACES the current set: anyone not listed is unassigned, and at least one resource is required. ' +
        'Resource ids are v2-encoded (use aroflo_v2_convert_ids for legacy user ids, or aroflo_v2_get with path "users").',
      inputSchema: {
        ...taskRefSchema,
        assignedResources: z
          .array(
            z.object({
              id: z.string().min(1).describe('v2-encoded user or org id'),
              type: z.enum(['USER', 'BUSINESS_UNIT', 'CONTRACTOR'])
            })
          )
          .min(1),
        mode: modeSchema
      },
      outputSchema,
      annotations: {
        readOnlyHint: false,
        idempotentHint: true,
        destructiveHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const { taskId, resolvedFrom } = await resolveTaskId(legacy, v2, args);
        const response = await v2.request('PUT', `tasks/${encodeURIComponent(taskId)}/resources`, {
          body: { assignedResources: args.assignedResources }
        });
        return listResult(response, args.mode, {
          taskId,
          ok: true,
          ...(resolvedFrom ? { resolvedFrom } : {})
        });
      } catch (error) {
        return errorToolResult(error, { mode: errMode(args.mode), debug: { api: 'v2', args } });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_get',
    {
      title: 'AroFlo v2: Generic GET',
      description:
        'Read-only GET against any AroFlo APIv2 path (e.g. "clients", "users", "locations", "workorders", "quotes/{id}/lineitems", "types/tasks", "worktypes", "tasks/{id}/documents"). ' +
        'Use this to explore endpoints while the v2 schema is in beta. Query parameters are passed through verbatim; most list endpoints accept page, limit and _fields.',
      inputSchema: {
        path: z.string().min(1).describe('Path relative to /v2/, without a leading slash'),
        query: z.record(z.string(), queryValueSchema).optional(),
        fields: fieldsSchema,
        mode: modeSchema
      },
      outputSchema,
      annotations: readOnly
    },
    async (args) => {
      try {
        const response = await v2.get(args.path, { _fields: args.fields, ...(args.query ?? {}) });
        const data = response.data;
        const isList =
          data !== null &&
          typeof data === 'object' &&
          Array.isArray((data as Record<string, unknown>).items);
        if (isList) return listResult(response, args.mode, { path: args.path });
        const out: Record<string, unknown> = { api: 'v2', path: args.path, data };
        if (args.mode === 'raw') out.httpStatus = response.httpStatus;
        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode: errMode(args.mode),
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
        'Convert legacy API record ids (taskid, userid, orgid, clientid…) into their APIv2 equivalents (POST /v2/idconversions). ' +
        'Format conversion only — no access check. Max 100 per call; results come back in the order supplied.',
      inputSchema: {
        ids: z.array(z.string().min(1)).min(1).max(100).describe('Legacy-encoded ids')
      },
      outputSchema,
      annotations: readOnly
    },
    async (args) => {
      try {
        const items = await convertLegacyIds(v2, args.ids);
        return successToolResult({ api: 'v2', count: items.length, items });
      } catch (error) {
        return errorToolResult(error, {
          mode: 'debug',
          debug: { api: 'v2', path: 'idconversions' }
        });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_update_task',
    {
      title: 'AroFlo v2: Update task',
      description:
        'Partially update a task via APIv2 (PATCH /v2/tasks/{taskId}), by v2 id or job number. Only the fields supplied are changed. ' +
        'Supports: description (HTML), customerOrderNumber (Cust ON), priority (by v2 id or name, e.g. "UNSW - HIGH"), substatus (by v2 id or name, e.g. "New Task"), status, and clearing priority/substatus. ' +
        'Task name, due date, client and location are NOT updatable via v2 yet — use the legacy aroflo_create_or_update_record for those.',
      inputSchema: {
        ...taskRefSchema,
        description: z
          .string()
          .optional()
          .describe('New task description (HTML allowed; plain text is fine)'),
        customerOrderNumber: z.string().max(50).optional().describe('Client reference / Cust ON'),
        priority: z.string().optional().describe('Priority v2 id, or its name/short description'),
        substatus: z.string().optional().describe('Substatus v2 id, or its name'),
        status: z
          .enum(['NOT_STARTED', 'IN_PROGRESS', 'PENDING', 'COMPLETED', 'ARCHIVED'])
          .optional(),
        clearPriority: z.boolean().optional(),
        clearSubstatus: z.boolean().optional(),
        linkedOrgId: z
          .string()
          .optional()
          .describe(
            'v2 client or business unit id used to narrow priority/substatus name lookups (defaults to the task client)'
          ),
        mode: modeSchema
      },
      outputSchema,
      annotations: {
        readOnlyHint: false,
        idempotentHint: true,
        destructiveHint: false,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const { taskId, resolvedFrom } = await resolveTaskId(legacy, v2, args);
        const resolved: Record<string, unknown> = {};

        let linkedOrgId = args.linkedOrgId;
        if (!linkedOrgId && (args.priority || args.substatus)) {
          const t = await v2.get<{ client?: { id?: string } }>(
            `tasks/${encodeURIComponent(taskId)}`,
            {
              _fields: 'client[id]'
            }
          );
          linkedOrgId = t.data?.client?.id;
        }

        let priorityId: string | undefined;
        if (args.priority) {
          const p = await resolvePriorityId(v2, args.priority, linkedOrgId);
          priorityId = p.id;
          resolved.priority = p;
        }
        let subStatusId: string | undefined;
        if (args.substatus) {
          const sub = await resolveSubstatusId(v2, args.substatus, linkedOrgId);
          subStatusId = sub.id;
          resolved.substatus = sub;
        }

        const response = await patchTask(v2, taskId, {
          description: args.description,
          customerOrderNumber: args.customerOrderNumber,
          priorityId,
          subStatusId,
          status: args.status,
          clearPriority: args.clearPriority,
          clearSubstatus: args.clearSubstatus
        });

        const out: Record<string, unknown> = { api: 'v2', ok: true, taskId, task: response.data };
        if (Object.keys(resolved).length) out.resolved = resolved;
        if (resolvedFrom) out.resolvedFrom = resolvedFrom;
        if (args.mode === 'raw') out.httpStatus = response.httpStatus;
        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode: errMode(args.mode),
          debug: { api: 'v2', args: { ...args, description: undefined } }
        });
      }
    }
  );

  server.registerTool(
    'aroflo_v2_upload_document',
    {
      title: 'AroFlo v2: Upload document to task',
      description:
        'Attach a file to a task via APIv2 (POST /v2/tasks/{taskId}/documents/upload), by v2 id or job number. Content is base64 (raw, or a data: URL). ' +
        'Suitable for small files passed through a tool call (a few MB); for larger files, or from Power Automate, use the HTTP endpoint POST /v2/tasks/{jobNumber}/documents instead.',
      inputSchema: {
        ...taskRefSchema,
        filename: z.string().min(3).describe('Original filename including extension'),
        base64: z.string().optional().describe('Raw base64 content (no data: prefix)'),
        dataUrl: z.string().optional().describe('data:<mime>;base64,... (alternative to base64)'),
        comment: z.string().optional(),
        description: z.string().optional(),
        categoryId: z
          .string()
          .optional()
          .describe('v2 folder id on the task (GET /tasks/{id}/documents/folders)')
      },
      outputSchema,
      annotations: {
        readOnlyHint: false,
        idempotentHint: false,
        destructiveHint: false,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const { taskId, resolvedFrom } = await resolveTaskId(legacy, v2, args);
        const { response, bytes } = await uploadTaskDocument(v2, taskId, {
          filename: args.filename,
          base64: args.base64,
          dataUrl: args.dataUrl,
          comment: args.comment,
          description: args.description,
          categoryId: args.categoryId
        });
        const out: Record<string, unknown> = {
          api: 'v2',
          ok: true,
          taskId,
          filename: args.filename,
          bytes,
          document: response.data
        };
        if (resolvedFrom) out.resolvedFrom = resolvedFrom;
        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode: 'data',
          debug: {
            api: 'v2',
            filename: args.filename,
            taskId: args.taskId,
            jobNumber: args.jobNumber
          }
        });
      }
    }
  );
}
