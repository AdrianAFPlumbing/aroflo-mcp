import { describe, expect, it } from 'vitest';

import {
  buildDescriptionHtml,
  buildTaskName,
  findPrimaryForWo,
  needsPoProcessing,
  parseAnstoPoText,
  type AnstoTaskLite
} from '../../src/aroflo/ansto-po.js';

const PO_PM = `10   12M INSPECTION - PIPELINE   1   each   28.12.2025  12M   INSPECTION   -   PIPELINE A-B-089X-2410   -   Liquid   Waste System   -   B-Line See   CS1   for   operational   task. CONTACT   CS1:   CRAIG   HORNE   M:0418 271   307   E:chz@ansto.gov.au  Company AUSTRALIAN FACILITIES PLUMBING McDonnell Considine Digby Pty Ltd 2/2 JINDALEE PLACE RIVERWOOD NSW 2210 Attention: Central Main Store B60 New Illawarra Road LUCAS HEIGHTS NSW 2234 AUSTRALIA Store hours: 8.00AM - 4.00PM Currency :   AUD ORDER No   : 4300162420 Work Order No   : 8180464  DATE   : 18.06.2026 accountspayable@ansto.gov.au  Your Vendor Number with ANSTO is:   11910   All enquiries relating to this order should be directed to: The Purchase Order number 4300162420 must be quoted on all correspondence.   General Enquiry Officer:   BATCH-BC  This Order/Contract is placed in accordance with ANSTO Terms   PH: - Email: no-reply-sap-batch-bc-svc@ansto.gov.au and conditions. Please refer to the ANSTO website:   Technical Enquiry Officer:   Amol KOTHAWADE  www.ansto.gov.au for further details.   PH: - Email: kothawaa@ansto.gov.au  AUSTRALIAN NUCLEAR SCIENCE AND TECHNOLOGY ORGANISATION Locked Bag 2001, Kirrawee DC NSW 2232, Australia | Ph +61 2 9717 3111 | ABN 47 956 969 590  ANSTO, Accounts Dept. Locked Bag 2001 KIRRAWEE DC NSW 2232 ANSTO's Account No with you :  Item   Supplier   Description   Qty   Unit   Unit   Total   GST   Total   Deliver Reference   Cost   (Excl. GST)   by  Page   1 /   1  PURCHASE ORDER  Computer Generated Order  Delivery Address   : Billing Address   : Email Address   :  TOTAL :   0.00   0.00   0.00`;

const PO_REACTIVE = `10   determine compressed air pipes   1   each   25.10.2026  determine   compressed   air   pipes A-B-002X-0101-0023 Contact   Wayne   Britton   (Mob: 0459   842   912) wbi@ansto.gov.au   to   confirm start   date and   Safe   Work   Permit.  Company AUSTRALIAN FACILITIES PLUMBING McDonnell Considine Digby Pty Ltd 2/2 JINDALEE PLACE RIVERWOOD NSW 2210 Attention: Central Main Store B60 New Illawarra Road LUCAS HEIGHTS NSW 2234 AUSTRALIA Store hours: 8.00AM - 4.00PM Currency :   AUD ORDER No   : 4300168300 Work Order No   : 8202932  DATE   : 20.10.2026 accountspayable@ansto.gov.au Technical Enquiry Officer:   Stephen NAKHOUL  www.ansto.gov.au for further details.   PH: - Email: nakhouls@ansto.gov.au TOTAL :   0.00   0.00   0.00`;

describe('parseAnstoPoText', () => {
  it('reads a planned-maintenance PO', () => {
    const po = parseAnstoPoText(PO_PM);
    expect(po.orderNo).toBe('4300162420');
    expect(po.workOrderNo).toBe('8180464');
    expect(po.date).toBe('18.06.2026');
    expect(po.lineItems[0]?.description).toBe('12M INSPECTION - PIPELINE');
    expect(po.lineItems[0]?.deliverBy).toBe('28.12.2025');
    expect(po.functionalLocation).toBe('A-B-089X-2410');
    expect(po.building).toBe('B089');
    expect(po.siteContact).toMatch(/CRAIG HORNE/);
    expect(po.technicalOfficer).toBe('Amol KOTHAWADE');
    expect(po.technicalOfficerEmail).toBe('kothawaa@ansto.gov.au');
    expect(po.scopeText).not.toMatch(/JINDALEE/);
    expect(buildTaskName(po)).toBe('ANSTO B089 - 12M INSPECTION - PIPELINE');
    const html = buildDescriptionHtml(po);
    expect(html).toContain('Work Order No 8180464');
    expect(html).toContain('4300162420');
  });

  it('reads a reactive PO with a Rudd-style contact', () => {
    const po = parseAnstoPoText(PO_REACTIVE);
    expect(po.workOrderNo).toBe('8202932');
    expect(po.orderNo).toBe('4300168300');
    expect(po.building).toBe('B002');
    expect(po.siteContact).toMatch(/Wayne Britton/);
    expect(buildTaskName(po)).toBe('ANSTO B002 - determine compressed air pipes');
  });

  it('tolerates text without a work order number', () => {
    const po = parseAnstoPoText('ORDER No : 4300160000 nothing else here');
    expect(po.orderNo).toBe('4300160000');
    expect(po.workOrderNo).toBeUndefined();
  });
});

function lite(p: Partial<AnstoTaskLite>): AnstoTaskLite {
  return {
    taskid: p.taskid ?? 'id',
    jobnumber: p.jobnumber ?? '1',
    taskname: p.taskname ?? '',
    custon: p.custon ?? '',
    status: p.status ?? 'Not Started',
    createdutc: '',
    orderNo: p.orderNo ?? '',
    documents: p.documents ?? []
  };
}

describe('needsPoProcessing / findPrimaryForWo', () => {
  it('flags raw PO imports and skips paired ones', () => {
    const pdf = [{ name: '4300168300.pdf', url: 'https://x' }];
    expect(needsPoProcessing(lite({ documents: pdf }))).toBe(true);
    expect(needsPoProcessing(lite({ documents: pdf, custon: '8202932' }))).toBe(false);
    expect(needsPoProcessing(lite({ documents: pdf, taskname: '[DUPLICATE OF JN 1] x' }))).toBe(
      false
    );
    expect(
      needsPoProcessing(lite({ documents: [{ name: '8202932.pdf', url: 'https://x' }] }))
    ).toBe(false);
  });

  it('prefers a live primary with the WO as Cust ON', () => {
    const tasks = [
      lite({ taskid: 'a', jobnumber: '100', custon: '8202932', status: 'Archived' }),
      lite({ taskid: 'b', jobnumber: '101', custon: '8202932/4300100000', status: 'Not Started' }),
      lite({ taskid: 'c', jobnumber: '102', custon: '8202932', status: 'In Progress' }),
      lite({ taskid: 'self', jobnumber: '103', custon: '8202932' })
    ];
    expect(findPrimaryForWo(tasks, '8202932', 'self')?.jobnumber).toBe('102');
    expect(findPrimaryForWo(tasks, '9999999', 'self')).toBeUndefined();
  });
});
