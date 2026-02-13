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

describe('aroflo_report_project_labour_budget_audit', () => {
  test('audits actual hours vs planned quote assemblies and matches tasks by name', async () => {
    const tools: Record<string, any> = {};
    const server = {
      registerTool(name: string, def: any, handler: any) {
        tools[name] = { def, handler };
      }
    } as any;

    const client = {
      get: vi.fn(async (zone: string, params: any) => {
        if (zone === 'Quotes') {
          // Quote lookup by quoteid for canonical details.
          if (String(params?.where ?? '').includes('quoteid')) {
            return makeResponse({
              zoneresponse: {
                quotes: [
                  {
                    quoteid: 'q1',
                    refno: 'Luic21',
                    quotename: 'RUNNING ACCOUNT REAR',
                    status: 'In Progress',
                    jobnumber: '7344',
                    totalhours: '1222.34',
                    labourcostex: '154626.01',
                    totalex: '575672.62',
                    totalinc: '633239.87',
                    createddate: '2025/08/18',
                    createddatetime: '2025/08/18 10:53:24',
                    project: {}
                  }
                ]
              }
            });
          }
          // Quote lookup by jobnumber (not used in this test).
          return makeResponse({ zoneresponse: { quotes: [] } });
        }

        if (zone === 'Tasks') {
          const where = String(params?.where ?? '');
          if (where.includes('jobnumber')) {
            // Quote task used to bridge jobnumber -> project.
            return makeResponse({
              zoneresponse: {
                tasks: [
                  {
                    taskid: 'tQuote',
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

          if (where.includes('clientid')) {
            // Project tasks for the client; tool filters to projectid=p1.
            return makeResponse({
              zoneresponse: {
                tasks: [
                  {
                    taskid: 't1',
                    refcode: 'Luic23',
                    taskname: 'SITE ESTABLISHMENTS - Establishment of work site i',
                    status: 'Completed',
                    daterequested: '2025/08/18',
                    jobnumber: '7346',
                    tasktotals: { totalhrs: '7.5', totallab: '202.5' },
                    project: { projectid: 'p1' }
                  },
                  {
                    taskid: 't2',
                    refcode: 'Luic36',
                    taskname: 'PAVING - Labour and materials to install pavers ab',
                    status: 'In Progress',
                    daterequested: '2025/08/19',
                    jobnumber: '7347',
                    tasktotals: { totalhrs: '650.17', totallab: '1000' },
                    project: { projectid: 'p1' }
                  },
                  {
                    taskid: 't3',
                    refcode: 'Luic75',
                    taskname: 'Test patches',
                    status: 'Not Started',
                    daterequested: '2025/09/01',
                    jobnumber: '7348',
                    tasktotals: { totalhrs: '4', totallab: '0' },
                    project: { projectid: 'p1' }
                  },
                  {
                    taskid: 'tOtherProj',
                    refcode: 'X1',
                    taskname: 'Other project task',
                    status: 'Completed',
                    daterequested: '2025/08/18',
                    jobnumber: '9999',
                    tasktotals: { totalhrs: '999', totallab: '999' },
                    project: { projectid: 'p2' }
                  }
                ]
              }
            });
          }

          throw new Error(`Unexpected Tasks query: ${where}`);
        }

        if (zone === 'Projects') {
          return makeResponse({
            zoneresponse: {
              projects: [
                {
                  projectid: 'p1',
                  projectnumber: '87',
                  projectname: 'REAR - 64-66 Salisbury Rd',
                  refno: 'Luic1',
                  status: 'Open',
                  client: { orgid: 'c1', orgname: 'Lui, Charles' }
                }
              ]
            }
          });
        }

        if (zone === 'QuoteLineItems') {
          return makeResponse({
            zoneresponse: {
              quotelineitems: [
                {
                  lineid: 'liNote',
                  takeoffname: 'SITE ESTABLISHMENT & DEMOLITION',
                  item: '#PLEASE NOTE - Boilerplate',
                  qty: '0.0000',
                  labourunitrate: '0.0000',
                  labourtotal: '0.00',
                  totalex: '0.00',
                  parentlineid: ''
                },
                {
                  lineid: 'li1',
                  takeoffname: 'SITE ESTABLISHMENT & DEMOLITION',
                  item: 'SITE ESTABLISHMENTS - Establishment of work site including installation of access ramps',
                  qty: '1.0000',
                  labourunitrate: '4.0000',
                  labourtotal: '506.00',
                  totalex: '955.80',
                  parentlineid: ''
                },
                {
                  lineid: 'li2',
                  takeoffname: 'PAVING',
                  item: 'PAVING - Labour and materials to install pavers about the pool',
                  qty: '1.0000',
                  labourunitrate: '100.0000',
                  labourtotal: '12650.00',
                  totalex: '50000.00',
                  parentlineid: ''
                }
              ]
            }
          });
        }

        throw new Error(`Unexpected zone: ${zone}`);
      })
    } as any;

    registerReportTools(server, client);
    const tool = tools['aroflo_report_project_labour_budget_audit'];
    expect(tool).toBeTruthy();

    const out = await tool.handler({ quoteId: 'q1', mode: 'data' });
    const sc = out.structuredContent as any;

    expect(sc.summary.project.projectid).toBe('p1');
    expect(sc.summary.quote.quoteid).toBe('q1');

    // Task scan should have filtered out the other project.
    expect(sc.summary.mapping.taskCount).toBe(3);

    // Planned hours from assemblies: 4 + 100.
    expect(sc.summary.allowed.plannedHoursFromAssemblies).toBeCloseTo(104, 5);

    // Actual hours: 7.5 + 650.17 + 4.
    expect(sc.summary.actual.totalHours).toBeCloseTo(661.67, 2);

    const site = sc.tasks.find((t: any) => t.taskid === 't1');
    expect(site.plannedHours).toBeCloseTo(4, 5);
    expect(site.actualHours).toBeCloseTo(7.5, 5);
    expect(site.matchedQuoteLineId).toBe('li1');

    const paving = sc.tasks.find((t: any) => t.taskid === 't2');
    expect(paving.plannedHours).toBeCloseTo(100, 5);
    expect(paving.matchedQuoteLineId).toBe('li2');

    const unplanned = sc.tasks.find((t: any) => t.taskid === 't3');
    expect(unplanned.plannedHours).toBe(0);
    expect(unplanned.matchedQuoteLineId).toBeUndefined();
  });
});
