import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import type { AroFloClient } from '../../aroflo/client.js';
import { normalizeWhereParam } from '../../aroflo/normalize-params.js';
import { resolveOutputMode } from '../output.js';
import {
  getZoneResponse,
  mergeZoneResponseData,
  truncateZoneArrays
} from '../../aroflo/paginate.js';
import { errorToolResult, successToolResult } from './shared.js';

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

function toInt(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.trunc(value);
  }
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  }
  return undefined;
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

function getQuotesArray(data: unknown): unknown[] {
  const zr = getZoneResponse(data);
  const quotes = zr?.['quotes'];
  return Array.isArray(quotes) ? quotes : [];
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

function normalizeComparableText(value: unknown): string {
  return typeof value === 'string'
    ? value.trim().toLowerCase()
    : String(value ?? '')
        .trim()
        .toLowerCase();
}

function parseJobNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    const n = Math.trunc(value);
    return n > 0 ? n : undefined;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!/^\d+$/.test(trimmed)) {
      return undefined;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n)) return undefined;
    const i = Math.trunc(n);
    return i > 0 ? i : undefined;
  }
  return undefined;
}

function isoDateMinusDays(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
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
        mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
        verbose: z.boolean().optional(),
        debug: z.boolean().optional()
      },
      // Keep the existing generic output schema; data is free-form.
      // MCP SDK expects output schemas to be object schemas (or raw object shapes).
      // `z.any()` causes output validation to crash under the current SDK.
      outputSchema: z.object({}).passthrough(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      const mode = resolveOutputMode(args);
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
            const total = getProjectsArray(response.data).length;
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

            response = {
              ...response,
              data: mergeZoneResponseData(response.data, next.data).merged
            };
            if (nextPageCount < pageSize) {
              break;
            }
          }
        }

        // Cap results hard.
        const total = getProjectsArray(response.data).length;
        if (total > maxResults) {
          response = { ...response, data: truncateZoneArrays(response.data, maxResults).truncated };
          truncated = true;
        }

        const projects = getProjectsArray(response.data);
        const openProjects = pickOpenProjects(projects, args.managerUserId);

        const mapped = openProjects
          .filter(isRecord)
          .map((p) => {
            const clientOrg = isRecord(p.client) ? p.client : undefined;
            const managerUser = isRecord(p.manageruser) ? p.manageruser : undefined;
            return {
              projectid: p.projectid,
              projectnumber: p.projectnumber,
              projectname: p.projectname,
              refno: p.refno,
              status: p.status,
              startdate: p.startdate,
              enddate: p.enddate,
              closeddate: p.closeddate,
              client: clientOrg
                ? { orgid: clientOrg.orgid, orgname: clientOrg.orgname }
                : undefined,
              manageruser: managerUser
                ? { userid: managerUser.userid, username: managerUser.username }
                : undefined
            };
          })
          .sort((a, b) => (toInt(a.projectnumber) ?? 0) - (toInt(b.projectnumber) ?? 0));

        const out: Record<string, unknown> = {
          projects: mapped,
          summary: { projectCount: mapped.length }
        };

        if (truncated) {
          out.mcp = { pagesFetched, truncated, nextPage };
        }

        if (mode === 'verbose' || mode === 'debug' || mode === 'raw') {
          out.meta = { pagesFetched, totalProjects: projects.length, truncated, nextPage };
        }

        if (mode === 'debug' || mode === 'raw') {
          out.debug = args.debug
            ? {
                normalizedParams: { where, pageSize, maxResults }
              }
            : undefined;
        }

        if (mode === 'raw') {
          out.raw = { openProjects };
        }

        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, { mode, debug: { tool: 'aroflo_list_open_projects' } });
      }
    }
  );

  server.registerTool(
    'aroflo_resolve_job_context',
    {
      title: 'AroFlo: Resolve Job Context',
      description:
        'Resolve a job context (jobnumber + related task(s), quote(s), and project) starting from any of: jobNumber, quoteId, quoteRefno, projectId, or projectRefno. ' +
        'Uses direct WHERE filters where supported and falls back to bounded scanning where necessary (for example when filtering by refno/refcode is not supported).',
      inputSchema: {
        jobNumber: z.union([z.number().int().positive(), z.string().regex(/^\\d+$/)]).optional(),
        quoteId: z.string().min(1).optional(),
        quoteRefno: z.string().min(1).optional(),
        projectId: z.string().min(1).optional(),
        projectRefno: z.string().min(1).optional(),

        // Scan controls (used when we need to search by refno/refcode).
        quoteSinceCreatedDate: z.string().min(1).optional(),
        projectSinceCreatedUtc: z.string().min(1).optional(),
        taskSinceDateRequested: z.string().min(1).optional(),
        quoteStatuses: z.array(z.string().min(1)).optional(),

        includeQuoteLineItems: z.boolean().default(false),
        includeProjectQuoteTasks: z.boolean().default(true),

        pageSize: z.number().int().positive().max(500).default(200),
        maxQuotesScanned: z.number().int().positive().max(10000).default(2000),
        maxTasksScanned: z.number().int().positive().max(20000).default(4000),
        maxProjectsScanned: z.number().int().positive().max(10000).default(2000),

        mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
        verbose: z.boolean().optional(),
        debug: z.boolean().optional()
      },
      outputSchema: z.object({}).passthrough(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      const mode = resolveOutputMode(args);
      try {
        const explanations: string[] = [];
        const warnings: string[] = [];

        const pageSize = args.pageSize;

        const normalizedQuoteRefno = normalizeComparableText(args.quoteRefno);
        const normalizedProjectRefno = normalizeComparableText(args.projectRefno);

        const defaultSinceDate = isoDateMinusDays(365);
        const quoteSinceCreatedDate = args.quoteSinceCreatedDate ?? defaultSinceDate;
        const projectSinceCreatedUtc = args.projectSinceCreatedUtc ?? defaultSinceDate;
        const taskSinceDateRequested = args.taskSinceDateRequested ?? defaultSinceDate;

        const quoteStatuses =
          args.quoteStatuses && args.quoteStatuses.length > 0
            ? args.quoteStatuses
            : ['In Progress', 'Approved', 'Pending Approval', 'Rejected'];

        let resolvedJobNumber: number | undefined = parseJobNumber(args.jobNumber);

        let resolvedProject: Record<string, unknown> | undefined;
        let resolvedQuote: Record<string, unknown> | undefined;
        let resolvedTasks: Record<string, unknown>[] = [];
        let resolvedQuotes: Record<string, unknown>[] = [];

        const debugInfo: Record<string, unknown> = {};

        // 1) Resolve project by projectId, if provided.
        if (args.projectId) {
          const res = await client.get('Projects', {
            where: normalizeWhereParam([`and|projectid|=|${args.projectId}`]),
            page: 1,
            pageSize: 1
          });
          const projects = getProjectsArray(res.data);
          const project = projects[0];
          if (isRecord(project)) {
            resolvedProject = project;
            explanations.push('Resolved project via projectId.');
          } else {
            warnings.push('No project found for provided projectId.');
          }
        }

        // 2) Resolve project by projectRefno (open projects scan), if needed.
        if (!resolvedProject && normalizedProjectRefno) {
          const whereClauses: string[] = [];
          if (projectSinceCreatedUtc) {
            whereClauses.push(`and|createdutc|>|${projectSinceCreatedUtc}`);
          }
          const where = normalizeWhereParam(whereClauses);

          let res = await client.get('Projects', { where, page: 1, pageSize });
          let pagesFetched = 1;
          let scanned = 0;
          let found: Record<string, unknown> | undefined;
          let truncated = false;

          while (true) {
            const projects = getProjectsArray(res.data);
            scanned += projects.length;

            const openProjects = pickOpenProjects(projects);
            for (const p of openProjects) {
              if (!isRecord(p)) continue;
              const refno = normalizeComparableText(p.refno);
              if (refno && refno === normalizedProjectRefno) {
                found = p;
                break;
              }
            }
            if (found) {
              break;
            }

            if (scanned >= args.maxProjectsScanned) {
              truncated = true;
              break;
            }

            if (projects.length < pageSize) {
              break;
            }

            const nextPage = pagesFetched + 1;
            const next = await client.get('Projects', { where, page: nextPage, pageSize });
            pagesFetched = nextPage;
            res = next;
            if (getProjectsArray(res.data).length === 0) {
              break;
            }
          }

          debugInfo.projectScan = { pagesFetched, scanned, truncated, where };

          if (found) {
            resolvedProject = found;
            explanations.push('Resolved project via open-project scan on projectRefno.');
          } else {
            warnings.push(
              truncated
                ? `Project not found for projectRefno within scan cap (maxProjectsScanned=${args.maxProjectsScanned}).`
                : 'Project not found for projectRefno in scanned window.'
            );
          }
        }

        // 3) Resolve job number via quoteId (direct), if needed.
        if (!resolvedJobNumber && args.quoteId) {
          const res = await client.get('Quotes', {
            where: normalizeWhereParam([`and|quoteid|=|${args.quoteId}`]),
            join: ['project'],
            page: 1,
            pageSize: 1
          });
          const quotes = getQuotesArray(res.data);
          const q = quotes[0];
          if (isRecord(q)) {
            resolvedQuote = q;
            const jn = parseJobNumber(q.jobnumber);
            if (jn) {
              resolvedJobNumber = jn;
              explanations.push('Resolved jobNumber via quoteId -> quote.jobnumber.');
            } else {
              warnings.push(
                'Quote found for quoteId, but quote.jobnumber was missing/non-numeric.'
              );
            }
          } else {
            warnings.push('No quote found for provided quoteId.');
          }
        }

        // 4) Resolve job number via quoteRefno (bounded scan), if needed.
        if (!resolvedJobNumber && normalizedQuoteRefno) {
          let scanned = 0;
          let truncated = false;
          let found: Record<string, unknown> | undefined;
          const scanMeta: Record<string, unknown> = { byStatus: [] as any[] };

          for (const status of quoteStatuses) {
            let page = 1;
            let pagesFetched = 0;
            while (true) {
              const whereClauses: string[] = [`and|status|=|${status}`];
              if (quoteSinceCreatedDate) {
                whereClauses.push(`and|createddate|>|${quoteSinceCreatedDate}`);
              }
              const where = normalizeWhereParam(whereClauses);

              const res = await client.get('Quotes', {
                where,
                join: ['project'],
                page,
                pageSize
              });
              pagesFetched += 1;

              const quotes = getQuotesArray(res.data);
              scanned += quotes.length;

              for (const q of quotes) {
                if (!isRecord(q)) continue;
                const refno = normalizeComparableText(q.refno);
                if (refno && refno === normalizedQuoteRefno) {
                  found = q;
                  break;
                }
              }

              if (found) {
                (scanMeta.byStatus as any[]).push({ status, pagesFetched, found: true, where });
                break;
              }
              if (scanned >= args.maxQuotesScanned) {
                truncated = true;
                (scanMeta.byStatus as any[]).push({ status, pagesFetched, truncated: true, where });
                break;
              }
              if (quotes.length < pageSize) {
                (scanMeta.byStatus as any[]).push({ status, pagesFetched, where });
                break;
              }
              page += 1;
            }

            if (found || truncated) {
              break;
            }
          }

          debugInfo.quoteScan = {
            scanned,
            truncated,
            quoteSinceCreatedDate,
            quoteStatuses,
            scanMeta
          };

          if (found) {
            resolvedQuote = found;
            const jn = parseJobNumber(found.jobnumber);
            if (jn) {
              resolvedJobNumber = jn;
              explanations.push(
                'Resolved jobNumber via bounded scan: quoteRefno -> quote.jobnumber (using supported filters + client-side match).'
              );
            } else {
              warnings.push(
                'Quote matched quoteRefno but quote.jobnumber was missing/non-numeric.'
              );
            }
          } else {
            warnings.push(
              truncated
                ? `Quote not found for quoteRefno within scan cap (maxQuotesScanned=${args.maxQuotesScanned}).`
                : 'Quote not found for quoteRefno in scanned window.'
            );
          }
        }

        // 5) If we have a project, optionally pull quote tasks within that project.
        // This gives an incremental bridge: project -> quote task(s) -> jobnumber(s) -> quote(s).
        let projectQuoteTasks: Record<string, unknown>[] = [];
        if (args.includeProjectQuoteTasks && resolvedProject) {
          const clientOrg = isRecord(resolvedProject.client) ? resolvedProject.client : undefined;
          const clientId =
            clientOrg && typeof clientOrg.orgid === 'string'
              ? (clientOrg.orgid as string)
              : undefined;
          const projectId =
            typeof resolvedProject.projectid === 'string'
              ? (resolvedProject.projectid as string)
              : undefined;

          if (clientId && projectId) {
            const whereClauses: string[] = [
              // NOTE: clientid is supported by the API even though it's missing from extracted docs.
              `and|clientid|=|${clientId}`,
              `and|status|=|Quote`
            ];
            if (taskSinceDateRequested) {
              whereClauses.push(`and|daterequested|>|${taskSinceDateRequested}`);
            }
            const where = normalizeWhereParam(whereClauses);

            let res = await client.get('Tasks', {
              where,
              join: ['project', 'tasktotals'],
              order: ['daterequested|desc'],
              page: 1,
              pageSize
            });

            let scanned = 0;
            let pagesFetched = 1;
            let truncated = false;

            while (true) {
              const tasks = getTasksArray(res.data);
              scanned += tasks.length;

              for (const t of tasks) {
                if (!isRecord(t)) continue;
                const proj = t.project;
                const joinedProjectId =
                  isRecord(proj) && typeof proj.projectid === 'string' ? proj.projectid : undefined;
                if (joinedProjectId !== projectId) continue;

                const totals = t.tasktotals;
                const hours = isRecord(totals) ? toNumber(totals.totalhrs) : 0;
                projectQuoteTasks.push({
                  taskid: t.taskid,
                  refcode: t.refcode,
                  taskname: t.taskname,
                  status: t.status,
                  jobnumber: t.jobnumber,
                  hours
                });

                if (projectQuoteTasks.length >= args.maxTasksScanned) {
                  truncated = true;
                  break;
                }
              }

              if (truncated) break;
              if (scanned >= args.maxTasksScanned) {
                truncated = true;
                break;
              }

              const tasksThisPage = getTasksArray(res.data).length;
              if (tasksThisPage < pageSize) {
                break;
              }

              const nextPage = pagesFetched + 1;
              const next = await client.get('Tasks', {
                where,
                join: ['project', 'tasktotals'],
                order: ['daterequested|desc'],
                page: nextPage,
                pageSize
              });
              pagesFetched = nextPage;
              res = next;
              if (getTasksArray(res.data).length === 0) {
                break;
              }
            }

            debugInfo.projectQuoteTaskScan = {
              where,
              pagesFetched,
              scanned,
              truncated,
              matched: projectQuoteTasks.length
            };

            if (projectQuoteTasks.length > 0) {
              explanations.push(
                'Resolved quote task(s) for project via client task scan (status=Quote).'
              );
            } else {
              warnings.push(
                'No quote tasks (status=Quote) found for resolved project in scanned window.'
              );
            }
          } else {
            warnings.push(
              'Resolved project was missing client orgid or projectid; cannot scan quote tasks.'
            );
          }
        }

        // 6) If we have a jobNumber, fetch tasks and quotes directly by jobnumber (supported).
        if (resolvedJobNumber) {
          const tasksRes = await client.get('Tasks', {
            where: normalizeWhereParam([`and|jobnumber|=|${resolvedJobNumber}`]),
            join: ['project', 'tasktotals'],
            page: 1,
            pageSize
          });
          const tasks = getTasksArray(tasksRes.data).filter(isRecord);
          resolvedTasks = tasks.map((t) => {
            const proj = t.project;
            const p = isRecord(proj) ? proj : undefined;
            const totals = t.tasktotals;
            const hours = isRecord(totals) ? toNumber(totals.totalhrs) : 0;
            return {
              taskid: t.taskid,
              refcode: t.refcode,
              taskname: t.taskname,
              status: t.status,
              jobnumber: t.jobnumber,
              hours,
              project: p
                ? {
                    projectid: p.projectid,
                    projectnumber: p.projectnumber,
                    projectname: p.projectname,
                    refno: p.refno
                  }
                : undefined
            };
          });

          if (!resolvedProject) {
            const firstWithProject = resolvedTasks.find(
              (t) =>
                isRecord((t as any).project) && typeof (t as any).project.projectid === 'string'
            );
            const p = firstWithProject ? ((firstWithProject as any).project as any) : undefined;
            if (p) {
              resolvedProject = { ...p };
              explanations.push('Resolved project via Tasks(jobnumber) join=project.');
            }
          }

          const quotesRes = await client.get('Quotes', {
            where: normalizeWhereParam([`and|jobnumber|=|${resolvedJobNumber}`]),
            join: args.includeQuoteLineItems ? ['project', 'lineitems'] : ['project'],
            page: 1,
            pageSize
          });
          const quotes = getQuotesArray(quotesRes.data).filter(isRecord);
          resolvedQuotes = quotes.map((q) => ({
            quoteid: q.quoteid,
            refno: q.refno,
            quotename: q.quotename,
            status: q.status,
            acceptancestatus: q.acceptancestatus,
            jobnumber: q.jobnumber,
            totalhours: q.totalhours,
            labourcostex: q.labourcostex,
            createddate: q.createddate,
            createddatetime: q.createddatetime,
            project: isRecord(q.project)
              ? {
                  projectid: (q.project as any).projectid,
                  projectname: (q.project as any).projectname,
                  refno: (q.project as any).refno
                }
              : undefined,
            ...(args.includeQuoteLineItems ? { lineitems: q.lines } : {})
          }));

          if (!resolvedQuote && normalizedQuoteRefno) {
            const match = resolvedQuotes.find(
              (q) => normalizeComparableText((q as any).refno) === normalizedQuoteRefno
            );
            if (match && isRecord(match)) {
              resolvedQuote = match;
            }
          }

          explanations.push('Fetched Tasks + Quotes via direct jobnumber lookup.');
        } else if (projectQuoteTasks.length > 0) {
          // If we couldn't resolve a single jobnumber, still try to fetch quotes for each quote-task jobnumber.
          const jobNumbers = Array.from(
            new Set(
              projectQuoteTasks
                .map((t) => parseJobNumber((t as any).jobnumber))
                .filter(Boolean) as number[]
            )
          ).slice(0, 50);

          const perJobQuotes: Record<string, unknown[]> = {};
          for (const jn of jobNumbers) {
            const qres = await client.get('Quotes', {
              where: normalizeWhereParam([`and|jobnumber|=|${jn}`]),
              join: args.includeQuoteLineItems ? ['project', 'lineitems'] : ['project'],
              page: 1,
              pageSize
            });
            perJobQuotes[String(jn)] = getQuotesArray(qres.data)
              .filter(isRecord)
              .map((q) => ({
                quoteid: q.quoteid,
                refno: q.refno,
                quotename: q.quotename,
                status: q.status,
                acceptancestatus: q.acceptancestatus,
                jobnumber: q.jobnumber,
                totalhours: q.totalhours,
                labourcostex: q.labourcostex,
                createddate: q.createddate,
                createddatetime: q.createddatetime,
                ...(args.includeQuoteLineItems ? { lineitems: q.lines } : {})
              }));
          }
          debugInfo.quotesByProjectQuoteTasks = { jobNumbers, perJobQuotes };
          explanations.push('Fetched Quotes for quote-task jobnumber(s) discovered from project.');
        }

        const out: Record<string, unknown> = {
          input: {
            jobNumber: args.jobNumber,
            quoteId: args.quoteId,
            quoteRefno: args.quoteRefno,
            projectId: args.projectId,
            projectRefno: args.projectRefno
          },
          resolved: {
            jobNumber: resolvedJobNumber,
            project: resolvedProject
              ? {
                  projectid: resolvedProject.projectid,
                  projectnumber: resolvedProject.projectnumber,
                  projectname: resolvedProject.projectname,
                  refno: resolvedProject.refno,
                  client: isRecord(resolvedProject.client)
                    ? {
                        orgid: (resolvedProject.client as any).orgid,
                        orgname: (resolvedProject.client as any).orgname
                      }
                    : undefined
                }
              : undefined,
            quoteTasksForProject: projectQuoteTasks,
            tasks: resolvedTasks,
            quotes: resolvedQuotes
          },
          linkages: {
            explanations,
            warnings
          }
        };

        if (mode === 'verbose' || mode === 'debug' || mode === 'raw') {
          out.meta = {
            quoteSinceCreatedDate,
            taskSinceDateRequested,
            projectSinceCreatedUtc
          };
        }

        if (mode === 'debug' || mode === 'raw') {
          out.debug = args.debug ? debugInfo : undefined;
        }

        if (mode === 'raw') {
          out.raw = {
            resolvedProject,
            resolvedQuote
          };
        }

        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode,
          debug: { tool: 'aroflo_resolve_job_context' }
        });
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
        hoursOnly: z.boolean().default(false),
        includeTaskStatus: z.boolean().default(true),
        includeUnassigned: z.boolean().default(false),
        autoPaginate: z.boolean().default(true),
        pageSize: z.number().int().positive().max(500).default(200),
        maxResultsPerClient: z.number().int().positive().max(5000).default(2000),
        mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
        verbose: z.boolean().optional(),
        debug: z.boolean().optional()
      },
      // MCP SDK expects output schemas to be object schemas (or raw object shapes).
      // `z.any()` causes output validation to crash under the current SDK.
      outputSchema: z.object({}).passthrough(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      const mode = resolveOutputMode(args);
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
          perClientMeta[clientId] = {
            pagesFetched,
            totalTasks: getTasksArray(res.data).length,
            truncated,
            nextPage
          };
        }

        // Flatten + filter by project id.
        const tasksByProject: Record<string, unknown[]> = {};
        for (const pid of projectIdSet) {
          tasksByProject[pid] = [];
        }

        const unassignedTasksByClient: Record<string, unknown[]> = {};

        for (const [clientId, tasks] of Object.entries(perClientResults)) {
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
              if (args.includeUnassigned) {
                const totals = t.tasktotals;
                const hours = isRecord(totals) ? toNumber(totals.totalhrs) : 0;
                if (args.hoursOnly && hours <= 0) {
                  continue;
                }
                const mapped: Record<string, unknown> = {
                  taskid: t.taskid,
                  refcode: t.refcode,
                  taskname: t.taskname,
                  daterequested: t.daterequested,
                  hours
                };
                if (args.includeTaskStatus) {
                  mapped.status = t.status;
                }
                (unassignedTasksByClient[clientId] ??= []).push(mapped);
              }
              continue;
            }

            tasksByProject[projectId]!.push(t);
          }
        }

        const projects = Object.entries(tasksByProject)
          .map(([projectId, tasks]) => {
            const p = projectsById[projectId];
            const projectName =
              isRecord(p) && typeof p.projectname === 'string' ? p.projectname : undefined;
            const projectNumber =
              isRecord(p) && typeof p.projectnumber !== 'undefined' ? p.projectnumber : undefined;
            const refno = isRecord(p) && typeof p.refno !== 'undefined' ? p.refno : undefined;

            const clientInfoRaw = isRecord(p) ? p.client : undefined;
            const clientInfo = isRecord(clientInfoRaw)
              ? { orgid: clientInfoRaw.orgid, orgname: clientInfoRaw.orgname }
              : undefined;

            const mappedTasks = tasks.filter(isRecord).map((t) => {
              const totals = t.tasktotals;
              const hours = isRecord(totals) ? toNumber(totals.totalhrs) : 0;
              const mapped: Record<string, unknown> = {
                taskid: t.taskid,
                refcode: t.refcode,
                taskname: t.taskname,
                daterequested: t.daterequested,
                hours
              };
              if (args.includeTaskStatus) {
                mapped.status = t.status;
              }
              return mapped;
            });

            const filteredTasks = mappedTasks
              .filter((t) => !args.hoursOnly || toNumber((t as any).hours) > 0)
              .sort((a, b) => {
                const ad = String((a as any).daterequested ?? '');
                const bd = String((b as any).daterequested ?? '');
                if (ad !== bd) return ad.localeCompare(bd);
                return String((a as any).refcode ?? '').localeCompare(
                  String((b as any).refcode ?? '')
                );
              });

            const totalHours = filteredTasks.reduce(
              (sum, t) => sum + toNumber((t as any).hours),
              0
            );

            return {
              projectid: projectId,
              projectnumber: projectNumber,
              projectname: projectName,
              refno,
              client: clientInfo,
              totalHours,
              tasks: filteredTasks
            };
          })
          .sort(
            (a, b) =>
              (toInt((a as any).projectnumber) ?? 0) - (toInt((b as any).projectnumber) ?? 0)
          );

        const projectCount = projects.length;
        const taskCount = projects.reduce((sum, p) => sum + ((p as any).tasks?.length ?? 0), 0);
        const totalHours = projects.reduce((sum, p) => sum + toNumber((p as any).totalHours), 0);

        const out: Record<string, unknown> = {
          projects,
          summary: { projectCount, taskCount, totalHours }
        };

        if (args.includeUnassigned) {
          out.unassignedTasksByClient = unassignedTasksByClient;
        }

        if (mode === 'verbose' || mode === 'debug' || mode === 'raw') {
          out.meta = {
            clientsQueried: Array.from(clientIds),
            perClient: perClientMeta
          };
        }

        if (mode === 'debug' || mode === 'raw') {
          out.debug = args.debug
            ? {
                params: {
                  projectIds: args.projectIds,
                  sinceDateRequested: args.sinceDateRequested,
                  sinceCreatedUtc: args.sinceCreatedUtc
                }
              }
            : undefined;
        }

        if (mode === 'raw') {
          out.raw = { projectsById };
        }

        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode,
          debug: { tool: 'aroflo_list_project_tasks_with_hours' }
        });
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
        hoursOnly: z.boolean().default(false),
        includeTaskStatus: z.boolean().default(true),
        pageSize: z.number().int().positive().max(500).default(200),
        maxProjects: z.number().int().positive().max(5000).default(2000),
        maxTasksPerClient: z.number().int().positive().max(5000).default(2000),
        mode: z.enum(['data', 'verbose', 'debug', 'raw']).optional(),
        verbose: z.boolean().optional(),
        debug: z.boolean().optional()
      },
      // MCP SDK expects output schemas to be object schemas (or raw object shapes).
      // `z.any()` causes output validation to crash under the current SDK.
      outputSchema: z.object({}).passthrough(),
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: true
      }
    },
    async (args) => {
      const mode = resolveOutputMode(args);
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
            const hours = isRecord(totals) ? toNumber(totals.totalhrs) : 0;
            if (args.hoursOnly && hours <= 0) {
              continue;
            }

            const dateRequested =
              (t.daterequested as any) ??
              (t.requestdate as any) ??
              (t.requestdatetime as any) ??
              undefined;

            const mapped: Record<string, unknown> = {
              taskid: t.taskid,
              refcode: t.refcode,
              taskname: t.taskname,
              daterequested: dateRequested,
              hours
            };
            if (args.includeTaskStatus) {
              mapped.status = t.status;
            }

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
            const tasks = (tasksByProject[pid] ?? []).filter(isRecord).sort((a, b) => {
              const ad = String((a as any).daterequested ?? '');
              const bd = String((b as any).daterequested ?? '');
              if (ad !== bd) return ad.localeCompare(bd);
              return String((a as any).refcode ?? '').localeCompare(
                String((b as any).refcode ?? '')
              );
            });

            const totalHours = tasks.reduce((sum, t) => sum + toNumber((t as any).hours), 0);
            const projectname = typeof p.projectname === 'string' ? p.projectname : undefined;
            const projectnumber = p.projectnumber;
            const clientOrg = isRecord(p.client) ? p.client : undefined;

            return {
              projectid: pid,
              projectnumber,
              projectname,
              refno: p.refno,
              client: clientOrg
                ? { orgid: clientOrg.orgid, orgname: clientOrg.orgname }
                : undefined,
              totalHours,
              tasks
            };
          })
          .sort((a, b) => (toInt(a.projectnumber) ?? 0) - (toInt(b.projectnumber) ?? 0));

        const projectCount = projects.length;
        const taskCount = projects.reduce((sum, p) => sum + (p.tasks as any[]).length, 0);
        const totalHours = projects.reduce((sum, p) => sum + toNumber(p.totalHours), 0);

        const out: Record<string, unknown> = {
          projects,
          summary: { projectCount, taskCount, totalHours }
        };

        if (args.includeTasksWithoutProject) {
          out.unassignedTasksByClient = unassignedByClient;
        }

        if (mode === 'verbose' || mode === 'debug' || mode === 'raw') {
          out.meta = {
            projectsFetched: allProjects.length,
            openProjects: openProjects.length,
            pagesFetchedProjects,
            clientsQueried: Array.from(clientIds),
            perClient: perClientMeta
          };
        }

        if (mode === 'debug' || mode === 'raw') {
          out.debug = args.debug ? { whereProjects: where } : undefined;
        }

        if (mode === 'raw') {
          out.raw = { openProjects };
        }

        return successToolResult(out);
      } catch (error) {
        return errorToolResult(error, {
          mode,
          debug: { tool: 'aroflo_report_open_projects_with_task_hours' }
        });
      }
    }
  );
}
