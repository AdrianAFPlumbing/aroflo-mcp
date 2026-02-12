import { describe, expect, test, vi } from 'vitest';

import { registerReportTools } from '../../../src/mcp/tools/reports.js';

function makeResponse(data: unknown) {
  return {
    httpStatus: 200,
    status: '0',
    statusMessage: 'Login OK',
    headers: {},
    rateLimits: {},
    data
  };
}

describe('aroflo_resolve_job_context', () => {
  test('resolves tasks + quotes by jobNumber', async () => {
    const tools: Record<string, any> = {};
    const server = {
      registerTool(name: string, def: any, handler: any) {
        tools[name] = { def, handler };
      }
    } as any;

    const client = {
      get: vi.fn(async (zone: string) => {
        if (zone === 'Tasks') {
          return makeResponse({
            zoneresponse: {
              tasks: [
                {
                  taskid: 't1',
                  refcode: 'Luic21',
                  taskname: 'RUNNING ACCOUNT REAR',
                  status: 'Quote',
                  jobnumber: '7344',
                  tasktotals: { totalhrs: '0' },
                  project: {
                    projectid: 'p1',
                    projectnumber: '87',
                    projectname: 'REAR - 64-66 Salisbury Rd',
                    refno: 'Luic1'
                  }
                }
              ]
            }
          });
        }
        if (zone === 'Quotes') {
          return makeResponse({
            zoneresponse: {
              quotes: [
                {
                  quoteid: 'q1',
                  refno: 'Luic21',
                  quotename: 'RUNNING ACCOUNT REAR',
                  status: 'In Progress',
                  acceptancestatus: '',
                  jobnumber: '7344',
                  totalhours: '1222.34',
                  labourcostex: '154626.01',
                  createddate: '2025/08/18',
                  createddatetime: '2025/08/18 10:53:24',
                  project: {}
                }
              ]
            }
          });
        }
        throw new Error(`Unexpected zone: ${zone}`);
      })
    } as any;

    registerReportTools(server, client);
    const tool = tools['aroflo_resolve_job_context'];
    expect(tool).toBeTruthy();

    const out = await tool.handler({ jobNumber: 7344, mode: 'data' });
    const sc = out.structuredContent as any;

    expect(sc.resolved.jobNumber).toBe(7344);
    expect(sc.resolved.tasks).toHaveLength(1);
    expect(sc.resolved.tasks[0].refcode).toBe('Luic21');
    expect(sc.resolved.quotes).toHaveLength(1);
    expect(sc.resolved.quotes[0].refno).toBe('Luic21');
    expect(sc.linkages.explanations.join('\n')).toMatch(/direct jobnumber lookup/i);
  });

  test('accepts jobNumber as a numeric string', async () => {
    const tools: Record<string, any> = {};
    const server = {
      registerTool(name: string, def: any, handler: any) {
        tools[name] = { def, handler };
      }
    } as any;

    const client = {
      get: vi.fn(async (zone: string) => {
        if (zone === 'Tasks') {
          return makeResponse({ zoneresponse: { tasks: [] } });
        }
        if (zone === 'Quotes') {
          return makeResponse({ zoneresponse: { quotes: [] } });
        }
        throw new Error(`Unexpected zone: ${zone}`);
      })
    } as any;

    registerReportTools(server, client);
    const tool = tools['aroflo_resolve_job_context'];

    const out = await tool.handler({ jobNumber: '7344', mode: 'data' });
    const sc = out.structuredContent as any;
    expect(sc.resolved.jobNumber).toBe(7344);
  });
});
