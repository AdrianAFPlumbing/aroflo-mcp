import { describe, expect, test, vi } from 'vitest';

import { registerQueryZoneTool } from '../../../src/mcp/tools/query-zone.js';
import { registerZoneGetTools } from '../../../src/mcp/tools/get-zones.js';

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

describe('tool output compatibility', () => {
  test('zone get tool defaults to legacy AroFloClientResponse; envelope is opt-in via mode', async () => {
    const tools: Record<string, any> = {};
    const server = {
      registerTool(name: string, def: any, handler: any) {
        tools[name] = { def, handler };
      }
    } as any;

    const client = {
      get: vi.fn(async () =>
        makeResponse({
          zoneresponse: { tasks: [{ taskid: 't1' }], pagenumber: '1' }
        })
      )
    } as any;

    registerZoneGetTools(server, client);
    const tool = tools['aroflo_get_tasks'];
    expect(tool).toBeTruthy();

    const legacy = await tool.handler({ debug: true, validateWhere: false });
    const lsc = legacy.structuredContent as any;
    expect(lsc.httpStatus).toBe(200);
    expect(lsc.data.zoneresponse.tasks).toHaveLength(1);
    expect(lsc.data._debug).toBeTruthy();
    expect(lsc.data.zoneresponse).not.toHaveProperty('_mcp');

    const envelope = await tool.handler({ mode: 'debug', debug: true, validateWhere: false });
    const esc = envelope.structuredContent as any;
    expect(esc.zone).toBe('Tasks');
    expect(esc.items).toHaveLength(1);
    expect(esc.debug).toBeTruthy();
  });

  test('query-zone tool adds legacy _mcp pagination meta when autoPaginate=true by default', async () => {
    const tools: Record<string, any> = {};
    const server = {
      registerTool(name: string, def: any, handler: any) {
        tools[name] = { def, handler };
      }
    } as any;

    const client = {
      get: vi.fn(async (_zone: string, params: any) => {
        if (params.page === 1) {
          return makeResponse({ zoneresponse: { tasks: [{ taskid: 't1' }, { taskid: 't2' }] } });
        }
        return makeResponse({ zoneresponse: { tasks: [{ taskid: 't3' }] } });
      })
    } as any;

    registerQueryZoneTool(server, client);
    const tool = tools['aroflo_query_zone'];

    const out = await tool.handler({
      zone: 'Tasks',
      autoPaginate: true,
      pageSize: 2,
      validateWhere: false
    });
    const sc = out.structuredContent as any;

    expect(sc.httpStatus).toBe(200);
    expect(sc.data.zoneresponse.tasks).toHaveLength(3);
    expect(sc.data.zoneresponse._mcp.pagesFetched).toBe(2);
  });
});
