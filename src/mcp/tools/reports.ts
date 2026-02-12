import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { normalizeWhereParam } from '../../aroflo/normalize-params.js';
import {
  countZoneArrays,
  getZoneResponse,
  mergeZoneResponseData,
  truncateZoneArrays
} from '../../aroflo/paginate.js';
import { errorToolResult } from './shared.js';

function toNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function getTasksArray(data: unknown): unknown[] {
  const zr = getZoneResponse(data);
  const tasks = zr?.['tasks'];
  return Array.isArray(tasks) ? tasks : [];
}

function getProjectsArray(data: unknown): unknown[] {
  const zr = getZoneResponse(data);
  const projects = zr?.['projects'];
  return Array.isArray(projects) ? projects : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function pickOpenProjects(projects: unknown[], managerUserId?: string): unknown[] {
  return projects.filter((p) => {
    if (!isRecord(p)) {
      return false;
    }
    const status = typeof p.status === 'string' ? p.status.toLowerCase() : '';
    const closed = typeof p.closeddate === 'string' ? p.closeddate.trim() : '';
    if (status !== 'open' || closed.length > 0) {
      return false;
    }
    if (managerUserId) {
      const mu = p.manageruser;
      const userId = isRecord(mu) && typeof mu.userid === 'string' ? mu.userid : '';
      return userId === managerUserId;
    }
    return true;
  });
}

export function registerReportTools(server: McpServer, client: AroFloClient): void {
  server.registerTool(
    'aroflo_list_open_projects',
    {
      title: 'AroFlo: List Open Projects',
      description:
        'List open projects with optional client-side filtering (status/open + closeddate empty). ' +
        'Supports auto pagination with a result cap.',
      inputSchema: {
        sinceCreatedUtc: z.string().min(1).optional(),
        orgId: z.string().min(1).optional(),
        managerUserId: z.string().min(1).optional(),
        autoPaginate: z.boolean().default(true),
        pageSize: z.number().int().positive().max(500).default(200),
        maxResults: z.number().int().positive().max(5000).default(2000),
        debug: z.boolean().optional()
      },
      // Keep the existing generic output schema; data is free-form.
      outputSchema: z.any(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const whereClauses: string[] = [];
        if (args.orgId) {
          whereClauses.push(`and|orgid|=|${args.orgId}`);
        }
        if (args.sinceCreatedUtc) {
          whereClauses.push(`and|createdutc|>|${args.sinceCreatedUtc}`);
        }
        const where = normalizeWhereParam(whereClauses);

        const startPage = 1;
        const pageSize = args.pageSize;
        const maxResults = args.maxResults;

        let response = await client.get('Projects', { where, page: startPage, pageSize });
        let pagesFetched = 1;
        let truncated = false;
        let nextPage: number | undefined;

        if (args.autoPaginate) {
          let currentPage = startPage;
          while (true) {
            const zr = getZoneResponse(response.data);
            const total = zr ? countZoneArrays(zr) : 0;
            if (total >= maxResults) {
              truncated = true;
              nextPage = currentPage + 1;
              break;
            }

            const pageCount = getProjectsArray(response.data).length;
            if (pageCount < pageSize) {
              break;
            }

            currentPage += 1;
            const next = await client.get('Projects', { where, page: currentPage, pageSize });
            pagesFetched += 1;

            const nextPageCount = getProjectsArray(next.data).length;
            if (nextPageCount === 0) {
              break;
            }

            response = { ...response, data: mergeZoneResponseData(response.data, next.data).merged };
            if (nextPageCount < pageSize) {
              break;
            }
          }
        }

        // Cap results hard.
        const zr = getZoneResponse(response.data);
        const total = zr ? countZoneArrays(zr) : 0;
        if (total > maxResults) {
          response = { ...response, data: truncateZoneArrays(response.data, maxResults).truncated };
          truncated = true;
        }

        const projects = getProjectsArray(response.data);
        const openProjects = pickOpenProjects(projects, args.managerUserId);

        const payload: Record<string, unknown> = {
          openProjects,
          meta: {
            pagesFetched,
            totalProjects: projects.length,
            openProjects: openProjects.length,
            truncated,
            nextPage
          }
        };

        if (args.debug) {
          payload.debug = {
            where,
            pageSize,
            maxResults
          };
        }

        return {
          structuredContent: payload,
          content: [{ type: 'text' as const, text: JSON.stringify(payload, null, 2) }]
        };
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );

  server.registerTool(
    'aroflo_list_project_tasks_with_hours',
    {
      title: 'AroFlo: List Project Tasks With Hours',
      description:
        'Given projectIds, fetch tasks joined with project + tasktotals and group tasks by project with total hours. ' +
        'Uses client-side filtering by projectId and supports auto pagination with caps.',
      inputSchema: {
        projectIds: z.array(z.string().min(1)).min(1),
        // Use one or both to narrow.
        sinceDateRequested: z.string().min(1).optional(),
        sinceCreatedUtc: z.string().min(1).optional(),
        autoPaginate: z.boolean().default(true),
        pageSize: z.number().int().positive().max(500).default(200),
        maxResultsPerClient: z.number().int().positive().max(5000).default(2000),
        debug: z.boolean().optional()
      },
      outputSchema: z.any(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const projectIdSet = new Set(args.projectIds);

        // Resolve projects so we can narrow task fetching by client org id.
        const projectsById: Record<string, unknown> = {};
        const clientIds = new Set<string>();

        for (const projectId of args.projectIds) {
          const res = await client.get('Projects', {
            where: normalizeWhereParam([`and|projectid|=|${projectId}`]),
            page: 1,
            pageSize: 1
          });
          const projects = getProjectsArray(res.data);
          const project = projects[0];
          if (isRecord(project) && typeof project.projectid === 'string') {
            projectsById[project.projectid] = project;
            const c = project.client;
            const clientOrgId = isRecord(c) && typeof c.orgid === 'string' ? c.orgid : undefined;
            if (clientOrgId) {
              clientIds.add(clientOrgId);
            }
          }
        }

        const perClientResults: Record<string, unknown[]> = {};
        const perClientMeta: Record<string, unknown> = {};

        for (const clientId of clientIds) {
          const whereClauses: string[] = [`and|clientid|=|${clientId}`];
          if (args.sinceDateRequested) {
            whereClauses.push(`and|daterequested|>|${args.sinceDateRequested}`);
          }
          if (args.sinceCreatedUtc) {
            whereClauses.push(`and|createdutc|>|${args.sinceCreatedUtc}`);
          }

          const where = normalizeWhereParam(whereClauses);
          const startPage = 1;
          const pageSize = args.pageSize;
          const maxResults = args.maxResultsPerClient;

          let res = await client.get('Tasks', {
            where,
            join: ['project', 'tasktotals'],
            order: ['daterequested|desc'],
            page: startPage,
            pageSize
          });

          let pagesFetched = 1;
          let truncated = false;
          let nextPage: number | undefined;

          if (args.autoPaginate) {
            let currentPage = startPage;
            while (true) {
              const tasks = getTasksArray(res.data);
              if (tasks.length >= maxResults) {
                truncated = true;
                nextPage = currentPage + 1;
                break;
              }
              if (tasks.length < pageSize) {
                break;
              }

              currentPage += 1;
              const next = await client.get('Tasks', {
                where,
                join: ['project', 'tasktotals'],
                order: ['daterequested|desc'],
                page: currentPage,
                pageSize
              });
              pagesFetched += 1;

              const nextTasks = getTasksArray(next.data);
              if (nextTasks.length === 0) {
                break;
              }

              res = { ...res, data: mergeZoneResponseData(res.data, next.data).merged };

              if (nextTasks.length < pageSize) {
                break;
              }
            }
          }

          // Hard cap.
          const tasks = getTasksArray(res.data);
          if (tasks.length > maxResults) {
            res = { ...res, data: truncateZoneArrays(res.data, maxResults).truncated };
            truncated = true;
          }

          perClientResults[clientId] = getTasksArray(res.data);
          perClientMeta[clientId] = { pagesFetched, totalTasks: getTasksArray(res.data).length, truncated, nextPage };
        }

        // Flatten + filter by project id.
        const tasksByProject: Record<string, unknown[]> = {};
        for (const pid of projectIdSet) {
          tasksByProject[pid] = [];
        }

        for (const tasks of Object.values(perClientResults)) {
          for (const t of tasks) {
            if (!isRecord(t)) {
              continue;
            }
            // Prefer joined project id.
            const proj = t.project;
            const joinedProjectId =
              isRecord(proj) && typeof proj.projectid === 'string' ? proj.projectid : undefined;
            const rawProjectId = typeof t.projectid === 'string' ? t.projectid : undefined;
            const projectId = joinedProjectId ?? rawProjectId;

            if (!projectId || !projectIdSet.has(projectId)) {
              continue;
            }

            tasksByProject[projectId]!.push(t);
          }
        }

        const projects = Object.entries(tasksByProject).map(([projectId, tasks]) => {
          const p = projectsById[projectId];
          const projectName = isRecord(p) && typeof p.projectname === 'string' ? p.projectname : undefined;
          const clientInfo = isRecord(p) ? p.client : undefined;

          const mappedTasks = tasks
            .filter(isRecord)
            .map((t) => {
              const totals = t.tasktotals;
              const totalhrs = isRecord(totals) ? toNumber(totals.totalhrs) : 0;
              return {
                taskid: t.taskid,
                jobnumber: t.jobnumber,
                refcode: t.refcode,
                taskname: t.taskname,
                status: t.status,
                daterequested: t.daterequested,
                createdutc: t.createdutc,
                totalhrs
              };
            });

          const totalHours = mappedTasks.reduce((sum, t) => sum + toNumber(t.totalhrs), 0);

          return {
            projectid: projectId,
            projectname: projectName,
            client: clientInfo,
            totalHours,
            tasks: mappedTasks
          };
        });

        const payload: Record<string, unknown> = {
          projects,
          meta: {
            clientsQueried: Array.from(clientIds),
            perClient: perClientMeta
          }
        };

        if (args.debug) {
          payload.debug = {
            projectIds: args.projectIds,
            sinceDateRequested: args.sinceDateRequested,
            sinceCreatedUtc: args.sinceCreatedUtc
          };
        }

        return {
          structuredContent: payload,
          content: [{ type: 'text' as const, text: JSON.stringify(payload, null, 2) }]
        };
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );

  server.registerTool(
    'aroflo_report_open_projects_with_task_hours',
    {
      title: 'AroFlo: Report Open Projects With Task Hours',
      description:
        'Report open projects (status=open, closeddate empty) and their tasks with total labour hours. ' +
        'Internally fetches Projects then Tasks (join project + tasktotals) and returns a compact grouped output.',
      inputSchema: {
        sinceCreatedUtc: z.string().min(1).optional(),
        orgId: z.string().min(1).optional(),
        managerUserId: z.string().min(1).optional(),
        sinceDateRequested: z.string().min(1).optional(),
        sinceTaskCreatedUtc: z.string().min(1).optional(),
        includeTasksWithoutProject: z.boolean().default(false),
        pageSize: z.number().int().positive().max(500).default(200),
        maxProjects: z.number().int().positive().max(5000).default(2000),
        maxTasksPerClient: z.number().int().positive().max(5000).default(2000),
        debug: z.boolean().optional()
      },
      outputSchema: z.any(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      try {
        const whereClauses: string[] = [];
        if (args.orgId) {
          whereClauses.push(`and|orgid|=|${args.orgId}`);
        }
        if (args.sinceCreatedUtc) {
          whereClauses.push(`and|createdutc|>|${args.sinceCreatedUtc}`);
        }
        const where = normalizeWhereParam(whereClauses);

        const pageSize = args.pageSize;
        const maxProjects = args.maxProjects;

        let projectsResponse = await client.get('Projects', { where, page: 1, pageSize });
        let pagesFetchedProjects = 1;
        while (true) {
          const projects = getProjectsArray(projectsResponse.data);
          if (projects.length >= maxProjects) {
            projectsResponse = {
              ...projectsResponse,
              data: truncateZoneArrays(projectsResponse.data, maxProjects).truncated
            };
            break;
          }
          if (projects.length < pageSize) {
            break;
          }
          const nextPage = pagesFetchedProjects + 1;
          const next = await client.get('Projects', { where, page: nextPage, pageSize });
          const nextProjects = getProjectsArray(next.data);
          if (nextProjects.length === 0) {
            break;
          }
          projectsResponse = {
            ...projectsResponse,
            data: mergeZoneResponseData(projectsResponse.data, next.data).merged
          };
          pagesFetchedProjects += 1;
          if (nextProjects.length < pageSize) {
            break;
          }
        }

        const allProjects = getProjectsArray(projectsResponse.data);
        const openProjects = pickOpenProjects(allProjects, args.managerUserId);

        const openProjectIds = new Set<string>();
        const clientIds = new Set<string>();

        for (const p of openProjects) {
          if (!isRecord(p)) continue;
          const pid = typeof p.projectid === 'string' ? p.projectid : '';
          if (pid) openProjectIds.add(pid);
          const c = p.client;
          const cid = isRecord(c) && typeof c.orgid === 'string' ? c.orgid : '';
          if (cid) clientIds.add(cid);
        }

        const tasksByProject: Record<string, any[]> = {};
        for (const pid of openProjectIds) {
          tasksByProject[pid] = [];
        }
        const unassignedByClient: Record<string, any[]> = {};

        const perClientMeta: Record<string, unknown> = {};

        for (const clientId of clientIds) {
          const taskWhere: string[] = [`and|clientid|=|${clientId}`];
          if (args.sinceDateRequested) {
            taskWhere.push(`and|daterequested|>|${args.sinceDateRequested}`);
          }
          if (args.sinceTaskCreatedUtc) {
            taskWhere.push(`and|createdutc|>|${args.sinceTaskCreatedUtc}`);
          }

          const normalizedTaskWhere = normalizeWhereParam(taskWhere);

          let tasksResponse = await client.get('Tasks', {
            where: normalizedTaskWhere,
            join: ['project', 'tasktotals'],
            order: ['daterequested|desc'],
            page: 1,
            pageSize
          });

          let pagesFetchedTasks = 1;
          while (true) {
            const tasks = getTasksArray(tasksResponse.data);
            if (tasks.length >= args.maxTasksPerClient) {
              tasksResponse = {
                ...tasksResponse,
                data: truncateZoneArrays(tasksResponse.data, args.maxTasksPerClient).truncated
              };
              break;
            }
            if (tasks.length < pageSize) {
              break;
            }
            const nextPage = pagesFetchedTasks + 1;
            const next = await client.get('Tasks', {
              where: normalizedTaskWhere,
              join: ['project', 'tasktotals'],
              order: ['daterequested|desc'],
              page: nextPage,
              pageSize
            });
            const nextTasks = getTasksArray(next.data);
            if (nextTasks.length === 0) {
              break;
            }
            tasksResponse = {
              ...tasksResponse,
              data: mergeZoneResponseData(tasksResponse.data, next.data).merged
            };
            pagesFetchedTasks += 1;
            if (nextTasks.length < pageSize) {
              break;
            }
          }

          const tasks = getTasksArray(tasksResponse.data).filter(isRecord);
          let matched = 0;
          let unassigned = 0;

          for (const t of tasks) {
            const proj = t.project;
            const joinedProjectId =
              isRecord(proj) && typeof proj.projectid === 'string' ? proj.projectid : undefined;
            const rawProjectId = typeof t.projectid === 'string' ? t.projectid : undefined;
            const projectId = joinedProjectId ?? rawProjectId;

            const totals = t.tasktotals;
            const totalhrs = isRecord(totals) ? toNumber(totals.totalhrs) : 0;

            const mapped = {
              taskid: t.taskid,
              jobnumber: t.jobnumber,
              refcode: t.refcode,
              taskname: t.taskname,
              status: t.status,
              daterequested: t.daterequested,
              createdutc: t.createdutc,
              totalhrs
            };

            if (projectId && openProjectIds.has(projectId)) {
              tasksByProject[projectId]!.push(mapped);
              matched += 1;
              continue;
            }

            if (args.includeTasksWithoutProject) {
              if (!unassignedByClient[clientId]) unassignedByClient[clientId] = [];
              unassignedByClient[clientId]!.push(mapped);
              unassigned += 1;
            }
          }

          perClientMeta[clientId] = {
            pagesFetched: pagesFetchedTasks,
            totalTasksFetched: tasks.length,
            matched,
            unassigned
          };
        }

        const projects = openProjects
          .filter(isRecord)
          .map((p) => {
            const pid = p.projectid as string;
            const tasks = tasksByProject[pid] ?? [];
            const totalHours = tasks.reduce((sum, t) => sum + toNumber(t.totalhrs), 0);
            const projectname = typeof p.projectname === 'string' ? p.projectname : undefined;
            return {
              projectid: pid,
              projectname,
              refno: p.refno,
              status: p.status,
              startdate: p.startdate,
              enddate: p.enddate,
              closeddate: p.closeddate,
              client: p.client,
              manageruser: p.manageruser,
              totalHours,
              tasks
            };
          })
          .sort((a, b) => String(a.projectname ?? '').localeCompare(String(b.projectname ?? '')));

        const payload: Record<string, unknown> = {
          projects,
          meta: {
            projectsFetched: allProjects.length,
            openProjects: openProjects.length,
            pagesFetchedProjects,
            clientsQueried: Array.from(clientIds),
            perClient: perClientMeta
          }
        };

        if (args.includeTasksWithoutProject) {
          payload.unassignedTasksByClient = unassignedByClient;
        }

        if (args.debug) {
          payload.debug = { whereProjects: where };
        }

        return {
          structuredContent: payload,
          content: [{ type: 'text' as const, text: JSON.stringify(payload, null, 2) }]
        };
      } catch (error) {
        return errorToolResult(error);
      }
    }
  );
}
