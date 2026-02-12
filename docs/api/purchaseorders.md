# PurchaseOrders

This zone allows listing and updating of [Purchase Orders](https://help.aroflo.com/display/office/Purchase+Orders) for your AroFlo site.

N.B. the boolean field isTaxInclusive indicates if the line item cost and total fields are inc or ex tax.

## WHERE filters

| Field | Value |
| --- | --- |
| purchaseorderid | AroFloID |
| status | STRING[in progress, pending approval, approved, processed] |
| adhocsupplier | BOOLEAN |
| supplierinvoicenumber | STRING() |
| purchasedate | DATE(YYYY-MM-DD) |
| duedate | DATE(YYYY-MM-DD) |
| taskdaterequested | DATE(YYYY-MM-DD) |
| taskdatetimerequested | DATETIME(YYYY-MM-DD HH:mm:ss) |
| taskdatecompleted | DATE(YYY-MM-DD) |
| taskdatetimecompleted | DATETIME(YYYY-MM-DD HH:mm:ss) |
| deliveryby | DATE(YYY-MM-DD) |

- "current" and "pending" have been kept for backwards compatibility for legacy PO status.

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| lineitems |
| task |
| project |
| documentsandphotos |

- joining the project area requires you also join the task area.

## POSTXML Variable definition

Purchase Orders can only have their status updated via the API at this time.

<purchaseorders>
    <purchaseorder>
        <purchaseorderid>IMS ID</purchaseorderid>  <!-- INSERT no / UPDATE required -->
        <deliveryinstructions>STRING(2000)</deliveryinstructions> <!-- INSERT no / UPDATE yes -->
        <deliveryby>DATE(YYYY-MM-DD)</deliveryby> <!-- INSERT no / UPDATE yes -->
        <status>STRING(50)(In Progress, Pending Approval, Approved, Processed)</status>  <!-- INSERT no / UPDATE yes -->
    </purchaseorder>
</purchaseorders>

**Authorization:** bearer


### JOIN lineitems

**Authorization:** bearer


---

### GET Approved PurchaseOrders with lineitems

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of purchase orders that are "Approved ". 

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml='
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Approved PurchaseOrders with lineitems (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 8,
    "queryresponsetimes": {
      "purchaseorders": 14,
      "lines": 7
    },
    "purchaseorders": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "1-1800",
            "qtybilled": "1.0000",
            "total": "1.0000",
            "price": "1.0000",
            "qtyordered": "1.0000",
            "partno": "abc-xyz",
            "transactioncode": "6",
            "item": "My new fancy part",
            "taxamount": "0.10000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "My new fancy part",
            "taskisused": "true",
            "lineid": "JCQ6KyRQQCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "1",
            "itemid": "JSZKUyxQXFAgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "2.0000",
            "total": "2.0000",
            "price": "1.0000",
            "qtyordered": "2.0000",
            "partno": "PJ151510T",
            "transactioncode": "6",
            "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "taxamount": "0.20000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "taskisused": "true",
            "lineid": "JCQ6KyRQUCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "2",
            "itemid": "JSZKVyBQXDQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "3.0000",
            "total": "3.0000",
            "price": "1.0000",
            "qtyordered": "3.0000",
            "partno": "1685ENH.03500",
            "transactioncode": "6",
            "item": "Belden CAT6A 4 Pair Screened F/FTP Solid Round Violet Per Metre",
            "taxamount": "0.30000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Belden CAT6A 4 Pair Screened F/FTP Solid Round Violet Per Metre",
            "taskisused": "true",
            "lineid": "JCQ6KyRQICAgCg==",
            "taxcode": "GST",
            "taskqtyused": "3",
            "itemid": "JSZKVyBRXEQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "4.0000",
            "total": "4.0000",
            "price": "1.0000",
            "qtyordered": "4.0000",
            "partno": "UTPL5EJF305R",
            "transactioncode": "6",
            "item": "Garland CAT5E 4 Pair U/UTP Jelly Filled Solid Black UV Resistant PE Jacket 305 Metre Dispenser Box",
            "taxamount": "0.40000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Garland CAT5E 4 Pair U/UTP Jelly Filled Solid Black UV Resistant PE Jacket 305 Metre Dispenser Box",
            "taskisused": "true",
            "lineid": "JCQ6KyRQMCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "4",
            "itemid": "JSZKVyBRTEAgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "5.0000",
            "total": "5.0000",
            "price": "1.0000",
            "qtyordered": "5.0000",
            "partno": "MC16GR",
            "transactioncode": "6",
            "item": "Australian Plastics 16mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taxamount": "0.50000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 16mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRQCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "5",
            "itemid": "JSZKVyFSTEggCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "6.0000",
            "total": "6.0000",
            "price": "1.0000",
            "qtyordered": "6.0000",
            "partno": "MC20OR",
            "transactioncode": "6",
            "item": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
            "taxamount": "0.60000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRUCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "6",
            "itemid": "JSZKVyFSXDQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "7.0000",
            "total": "7.0000",
            "price": "1.0000",
            "qtyordered": "7.0000",
            "partno": "MC20GR",
            "transactioncode": "6",
            "item": "Australian Plastics 20mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taxamount": "0.70000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 20mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRICAgCg==",
            "taxcode": "GST",
            "taskqtyused": "7",
            "itemid": "JSZKVyFSTEwgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "0.0000",
            "total": "10.0000",
            "price": "5.0000",
            "qtyordered": "2.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "an ad-hoc item",
            "taxamount": "1.00000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "5.0000",
            "description": "an ad-hoc item",
            "taskisused": "true",
            "lineid": "JSYqQyxQPEwgCg==",
            "taxcode": "GST",
            "taskqtyused": "2",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "38.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/04/17",
        "ordernumber": "001008",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Cables4U",
          "externalid": ""
        },
        "duedate": "2019/04/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "41.80",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQ6TyFRICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "10.0000",
            "price": "10.0000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "GST Inc Item",
            "taxamount": "0.90910000",
            "taskid": "",
            "cost": "10.0000",
            "description": "GST Inc Item",
            "taskisused": "false",
            "lineid": "JSYqTyVQXEggCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "9.09",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/08/01",
        "ordernumber": "001027",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/08/01",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "abx123",
        "lines": [
          {
            "accountcode": "1-1800",
            "qtybilled": "5.0000",
            "total": "313.7000",
            "price": "31.3700",
            "qtyordered": "10.0000",
            "partno": "PJ151510",
            "transactioncode": "6",
            "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "taxamount": "31.37000000",
            "taskid": "",
            "cost": "31.3700",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "taskisused": "false",
            "lineid": "JSYqTyxQTFQgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "JSZKVyBQXDAgCg==",
            "taxrate": "10.00"
          }
        ],
        "totalex": "313.70",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/11/15",
        "ordernumber": "001029",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/11/15",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/11",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "345.07",
        "deliverybydatetime": " ",
        "datereceived": "2019/11/18",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqTyVRUCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "10.0000",
            "total": "37.3000",
            "price": "3.7300",
            "qtyordered": "10.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "RIGID CONDUIT H/DUTY 25MM 4MTR LENGTH",
            "taxamount": "3.73000000",
            "taskid": "",
            "cost": "3.7300",
            "description": "RIGID CONDUIT H/DUTY 25MM 4MTR LENGTH",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEAgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "7.5000",
            "price": "7.5000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "PVC Elect Insulation Tape",
            "taxamount": "0.75000000",
            "taskid": "",
            "cost": "7.5000",
            "description": "PVC Elect Insulation Tape",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEQgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "3.0000",
            "total": "31.2600",
            "price": "10.4200",
            "qtyordered": "3.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "RIGID CONDUIT H/DUY 50MM 4MTR LENGTH",
            "taxamount": "3.12600000",
            "taskid": "",
            "cost": "10.4200",
            "description": "RIGID CONDUIT H/DUY 50MM 4MTR LENGTH",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEggCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "10.0000",
            "total": "23.2000",
            "price": "2.3200",
            "qtyordered": "10.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "25MM 90 DEG S/BEND",
            "taxamount": "2.32000000",
            "taskid": "",
            "cost": "2.3200",
            "description": "25MM 90 DEG S/BEND",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEwgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "6.7500",
            "price": "6.7500",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "Pipe Cement Pvc - Blue Type N\r\n500ML",
            "taxamount": "0.67500000",
            "taskid": "",
            "cost": "6.7500",
            "description": "Pipe Cement Pvc - Blue Type N\r\n500ML",
            "taskisused": "false",
            "lineid": "JSYqRyZRPDAgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "53.8900",
            "price": "53.8900",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "POLYPROPYLENE STRING LINE 1850MTRS",
            "taxamount": "5.38900000",
            "taskid": "",
            "cost": "53.8900",
            "description": "POLYPROPYLENE STRING LINE 1850MTRS",
            "taskisused": "false",
            "lineid": "JSYqRyZRPDQgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "5.7600",
            "price": "5.7600",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "PIPE CEMENT PVC CLEAR TYPE N 250ML",
            "taxamount": "0.57600000",
            "taskid": "",
            "cost": "5.7600",
            "description": "PIPE CEMENT PVC CLEAR TYPE N 250ML",
            "taskisused": "false",
            "lineid": "JSYqRyZSTFAgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "165.66",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/05",
        "ordernumber": "001030",
        "documentsandphotos": [],
        "link": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct",
          "externalid": ""
        },
        "duedate": "2020/08/05",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/05",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "182.24",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqLyxSUCAgCg==",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "654321",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "5000.0000",
            "price": "5000.0000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "Adhoc line item",
            "taxamount": "500.00000000",
            "taskid": "JSc6LydQLDAgCg==",
            "cost": "5000.0000",
            "description": "Adhoc line item",
            "taskisused": "true",
            "lineid": "JSYqRyBRLFAgCg==",
            "taxcode": "GST",
            "taskqtyused": "1",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "5000.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/17",
        "ordernumber": "001031",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2020/08/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/17",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "5500.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqKy1QICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      }
    ],
    "currentpageresults": 5
  }
}
```


### JOIN trackingcentres

**Authorization:** bearer


---

### GET Approved PurchaseOrders with LineItems and TrackingCentres

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of purchase orders that are "Approved ". 

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' +encodeURIComponent('lineitems,trackingcentres')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml='
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Approved PurchaseOrders with LineItems and TrackingCentres (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "purchaseorders": 16,
      "lines": 0
    },
    "purchaseorders": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "1-1800",
            "qtybilled": "1.0000",
            "total": "1.0000",
            "price": "1.0000",
            "qtyordered": "1.0000",
            "partno": "abc-xyz",
            "transactioncode": "6",
            "item": "My new fancy part",
            "taxamount": "0.10000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "My new fancy part",
            "taskisused": "true",
            "lineid": "JCQ6KyRQQCAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "1",
            "itemid": "JSZKUyxQXFAgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "2.0000",
            "total": "2.0000",
            "price": "1.0000",
            "qtyordered": "2.0000",
            "partno": "PJ151510T",
            "transactioncode": "6",
            "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "taxamount": "0.20000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "taskisused": "true",
            "lineid": "JCQ6KyRQUCAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "2",
            "itemid": "JSZKVyBQXDQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "3.0000",
            "total": "3.0000",
            "price": "1.0000",
            "qtyordered": "3.0000",
            "partno": "1685ENH.03500",
            "transactioncode": "6",
            "item": "Belden CAT6A 4 Pair Screened F/FTP Solid Round Violet Per Metre",
            "taxamount": "0.30000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Belden CAT6A 4 Pair Screened F/FTP Solid Round Violet Per Metre",
            "taskisused": "true",
            "lineid": "JCQ6KyRQICAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "3",
            "itemid": "JSZKVyBRXEQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "4.0000",
            "total": "4.0000",
            "price": "1.0000",
            "qtyordered": "4.0000",
            "partno": "UTPL5EJF305R",
            "transactioncode": "6",
            "item": "Garland CAT5E 4 Pair U/UTP Jelly Filled Solid Black UV Resistant PE Jacket 305 Metre Dispenser Box",
            "taxamount": "0.40000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Garland CAT5E 4 Pair U/UTP Jelly Filled Solid Black UV Resistant PE Jacket 305 Metre Dispenser Box",
            "taskisused": "true",
            "lineid": "JCQ6KyRQMCAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "4",
            "itemid": "JSZKVyBRTEAgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "5.0000",
            "total": "5.0000",
            "price": "1.0000",
            "qtyordered": "5.0000",
            "partno": "MC16GR",
            "transactioncode": "6",
            "item": "Australian Plastics 16mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taxamount": "0.50000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 16mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRQCAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "5",
            "itemid": "JSZKVyFSTEggCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "6.0000",
            "total": "6.0000",
            "price": "1.0000",
            "qtyordered": "6.0000",
            "partno": "MC20OR",
            "transactioncode": "6",
            "item": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
            "taxamount": "0.60000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRUCAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "6",
            "itemid": "JSZKVyFSXDQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "7.0000",
            "total": "7.0000",
            "price": "1.0000",
            "qtyordered": "7.0000",
            "partno": "MC20GR",
            "transactioncode": "6",
            "item": "Australian Plastics 20mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taxamount": "0.70000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 20mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRICAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "7",
            "itemid": "JSZKVyFSTEwgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "0.0000",
            "total": "10.0000",
            "price": "5.0000",
            "qtyordered": "2.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "an ad-hoc item",
            "taxamount": "1.00000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "5.0000",
            "description": "an ad-hoc item",
            "taskisused": "true",
            "lineid": "JSYqQyxQPEwgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "2",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "38.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/04/17",
        "ordernumber": "001008",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Cables4U",
          "externalid": ""
        },
        "duedate": "2019/04/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "41.80",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQ6TyFRICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "10.0000",
            "price": "10.0000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "GST Inc Item",
            "taxamount": "0.90910000",
            "taskid": "",
            "cost": "10.0000",
            "description": "GST Inc Item",
            "taskisused": "false",
            "lineid": "JSYqTyVQXEggCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "9.09",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/08/01",
        "ordernumber": "001027",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/08/01",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "abx123",
        "lines": [
          {
            "accountcode": "1-1800",
            "qtybilled": "5.0000",
            "total": "313.7000",
            "price": "31.3700",
            "qtyordered": "10.0000",
            "partno": "PJ151510",
            "transactioncode": "6",
            "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "taxamount": "31.37000000",
            "taskid": "",
            "cost": "31.3700",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "taskisused": "false",
            "lineid": "JSYqTyxQTFQgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "JSZKVyBQXDAgCg==",
            "taxrate": "10.00"
          }
        ],
        "totalex": "313.70",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/11/15",
        "ordernumber": "001029",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/11/15",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/11",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "345.07",
        "deliverybydatetime": " ",
        "datereceived": "2019/11/18",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqTyVRUCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "10.0000",
            "total": "37.3000",
            "price": "3.7300",
            "qtyordered": "10.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "RIGID CONDUIT H/DUTY 25MM 4MTR LENGTH",
            "taxamount": "3.73000000",
            "taskid": "",
            "cost": "3.7300",
            "description": "RIGID CONDUIT H/DUTY 25MM 4MTR LENGTH",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "7.5000",
            "price": "7.5000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "PVC Elect Insulation Tape",
            "taxamount": "0.75000000",
            "taskid": "",
            "cost": "7.5000",
            "description": "PVC Elect Insulation Tape",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEQgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "3.0000",
            "total": "31.2600",
            "price": "10.4200",
            "qtyordered": "3.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "RIGID CONDUIT H/DUY 50MM 4MTR LENGTH",
            "taxamount": "3.12600000",
            "taskid": "",
            "cost": "10.4200",
            "description": "RIGID CONDUIT H/DUY 50MM 4MTR LENGTH",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEggCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "10.0000",
            "total": "23.2000",
            "price": "2.3200",
            "qtyordered": "10.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "25MM 90 DEG S/BEND",
            "taxamount": "2.32000000",
            "taskid": "",
            "cost": "2.3200",
            "description": "25MM 90 DEG S/BEND",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEwgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "6.7500",
            "price": "6.7500",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "Pipe Cement Pvc - Blue Type N\r\n500ML",
            "taxamount": "0.67500000",
            "taskid": "",
            "cost": "6.7500",
            "description": "Pipe Cement Pvc - Blue Type N\r\n500ML",
            "taskisused": "false",
            "lineid": "JSYqRyZRPDAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "53.8900",
            "price": "53.8900",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "POLYPROPYLENE STRING LINE 1850MTRS",
            "taxamount": "5.38900000",
            "taskid": "",
            "cost": "53.8900",
            "description": "POLYPROPYLENE STRING LINE 1850MTRS",
            "taskisused": "false",
            "lineid": "JSYqRyZRPDQgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "5.7600",
            "price": "5.7600",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "PIPE CEMENT PVC CLEAR TYPE N 250ML",
            "taxamount": "0.57600000",
            "taskid": "",
            "cost": "5.7600",
            "description": "PIPE CEMENT PVC CLEAR TYPE N 250ML",
            "taskisused": "false",
            "lineid": "JSYqRyZSTFAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "165.66",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/05",
        "ordernumber": "001030",
        "documentsandphotos": [],
        "link": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct",
          "externalid": ""
        },
        "duedate": "2020/08/05",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/05",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "182.24",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqLyxSUCAgCg==",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "654321",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "5000.0000",
            "price": "5000.0000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "Adhoc line item",
            "taxamount": "500.00000000",
            "taskid": "JSc6LydQLDAgCg==",
            "cost": "5000.0000",
            "description": "Adhoc line item",
            "taskisused": "true",
            "lineid": "JSYqRyBRLFAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "taskqtyused": "1",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "5000.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/17",
        "ordernumber": "001031",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2020/08/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/17",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "5500.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqKy1QICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      }
    ],
    "currentpageresults": 5
  }
}
```


### JOIN task

**Authorization:** bearer


---

### GET Approved PurchaseOrders with Task

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of purchase orders that are "Approved ". 

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('task')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml='
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Approved PurchaseOrders with Task (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 9,
    "queryresponsetimes": {
      "tasks": 46,
      "purchaseorders": 43
    },
    "purchaseorders": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "38.00",
        "tasks": [
          {
            "completeddatetime": "2019/04/18 10:03:00",
            "jobnumber": "1064",
            "linkprocessed": "false",
            "client": {
              "orgid": "JCdKUydRMCAgCg==",
              "orgname": "#1 Ladies, Detective Agency"
            },
            "taskname": "HMAS Sydney Port of Sydney",
            "taskid": "JSZaKyRSTDQgCg==",
            "requestdatetime": "2019/04/17 10:04:09",
            "linkprocesseddate": " ",
            "refcode": "#1 Lad19",
            "completeddate": "2019/04/18",
            "requestdate": "2019/04/17",
            "tasktype": "Installation",
            "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%24ZUU%27%0A"
          }
        ],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/04/17",
        "ordernumber": "001008",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Cables4U",
          "externalid": ""
        },
        "duedate": "2019/04/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "41.80",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQ6TyFRICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "9.09",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/08/01",
        "ordernumber": "001027",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/08/01",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "abx123",
        "lines": [],
        "totalex": "313.70",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/11/15",
        "ordernumber": "001029",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/11/15",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/11",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "345.07",
        "deliverybydatetime": " ",
        "datereceived": "2019/11/18",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqTyVRUCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "165.66",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/05",
        "ordernumber": "001030",
        "documentsandphotos": [],
        "link": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct",
          "externalid": ""
        },
        "duedate": "2020/08/05",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/05",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "182.24",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqLyxSUCAgCg==",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "654321",
        "lines": [],
        "totalex": "5000.00",
        "tasks": [
          {
            "completeddatetime": "2020/08/11 00:15:04",
            "jobnumber": "1117",
            "linkprocessed": "false",
            "client": {
              "orgid": "JCdKUydRMCAgCg==",
              "orgname": "#1 Ladies, Detective Agency"
            },
            "taskname": "HMAS Sydney",
            "taskid": "JSc6LydQLDAgCg==",
            "requestdatetime": "2020/08/11 00:00:00",
            "linkprocesseddate": " ",
            "refcode": "#1 Lad50",
            "completeddate": "2020/08/11",
            "requestdate": "2020/08/11",
            "tasktype": "Maintenance",
            "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%25Z%25%3D%26%0A"
          }
        ],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/17",
        "ordernumber": "001031",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2020/08/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/17",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "5500.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqKy1QICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      }
    ],
    "currentpageresults": 5
  }
}
```


### JOIN project

**Authorization:** bearer


---

### GET Approved PurchaseOrders with Project

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of purchase orders that are "Approved ". 

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('project')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml='
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Approved PurchaseOrders with Project (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 6,
    "queryresponsetimes": {
      "projects": 34,
      "purchaseorders": 17
    },
    "purchaseorders": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "38.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/04/17",
        "ordernumber": "001008",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Cables4U",
          "externalid": ""
        },
        "duedate": "2019/04/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [
          {
            "location": {
              "locationid": "",
              "locationname": ""
            },
            "contact": "",
            "startdate": "",
            "stagename": "",
            "projecttype": "",
            "enddate": "",
            "status": "Open",
            "closeddate": "",
            "description": "",
            "projectid": "",
            "refno": "",
            "manager": "",
            "custon": "",
            "projectnumber": "",
            "projectname": ""
          }
        ],
        "totalinc": "41.80",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQ6TyFRICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "9.09",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/08/01",
        "ordernumber": "001027",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/08/01",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "abx123",
        "lines": [],
        "totalex": "313.70",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/11/15",
        "ordernumber": "001029",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/11/15",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/11",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "345.07",
        "deliverybydatetime": " ",
        "datereceived": "2019/11/18",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqTyVRUCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "165.66",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/05",
        "ordernumber": "001030",
        "documentsandphotos": [],
        "link": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct",
          "externalid": ""
        },
        "duedate": "2020/08/05",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/05",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "182.24",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqLyxSUCAgCg==",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "654321",
        "lines": [],
        "totalex": "5000.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/17",
        "ordernumber": "001031",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2020/08/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/17",
        "deliverybydate": "",
        "projects": [
          {
            "location": {
              "locationid": "",
              "locationname": ""
            },
            "contact": "",
            "startdate": "",
            "stagename": "",
            "projecttype": "",
            "enddate": "",
            "status": "Open",
            "closeddate": "",
            "description": "",
            "projectid": "",
            "refno": "",
            "manager": "",
            "custon": "",
            "projectnumber": "",
            "projectname": ""
          }
        ],
        "totalinc": "5500.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqKy1QICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      }
    ],
    "currentpageresults": 5
  }
}
```


### JOIN documentsandphotos

**Authorization:** bearer


---

### GET Approved PurchaseOrders with Documents

`GET https://api.aroflo.com/{{urlVarString}}`

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('documentsandphotos')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml='
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Approved PurchaseOrders with Documents (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 5,
    "queryresponsetimes": {
      "documentsandphotos": 18,
      "purchaseorders": 10
    },
    "purchaseorders": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "38.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/04/17",
        "ordernumber": "001008",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Cables4U",
          "externalid": ""
        },
        "duedate": "2019/04/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "41.80",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQ6TyFRICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "9.09",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/08/01",
        "ordernumber": "001027",
        "documentsandphotos": [
          {
            "documentid": "JSYqUyJQPFggCg==",
            "sizeinbytes": "34984",
            "uploadeddatetime": "2020/06/01 22:51:33",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-T8Y-original?expires=1660010648&signature=620FECC862C6E154BE3A8D5BD5D86EB99F0B5F6735536FAAFB38C786878E0D0D",
            "name": "MicrosoftTeams-image (6).png"
          }
        ],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/08/01",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "abx123",
        "lines": [],
        "totalex": "313.70",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/11/15",
        "ordernumber": "001029",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/11/15",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/11",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "345.07",
        "deliverybydatetime": " ",
        "datereceived": "2019/11/18",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqTyVRUCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "165.66",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/05",
        "ordernumber": "001030",
        "documentsandphotos": [],
        "link": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct",
          "externalid": ""
        },
        "duedate": "2020/08/05",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/05",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "182.24",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqLyxSUCAgCg==",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "654321",
        "lines": [],
        "totalex": "5000.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/17",
        "ordernumber": "001031",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2020/08/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/17",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "5500.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqKy1QICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      }
    ],
    "currentpageresults": 5
  }
}
```


---

### GET Approved PurchaseOrders

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of purchase orders that are "Approved ". 

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml='
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Approved PurchaseOrders (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 5,
    "queryresponsetimes": {
      "purchaseorders": 83
    },
    "purchaseorders": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "38.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/04/17",
        "ordernumber": "001008",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Cables4U",
          "externalid": ""
        },
        "duedate": "2019/04/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "41.80",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQ6TyFRICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "9.09",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/08/01",
        "ordernumber": "001027",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/08/01",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "abx123",
        "lines": [],
        "totalex": "313.70",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/11/15",
        "ordernumber": "001029",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/11/15",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/11",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "345.07",
        "deliverybydatetime": " ",
        "datereceived": "2019/11/18",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqTyVRUCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "supplierinvoicenumber": "",
        "lines": [],
        "totalex": "165.66",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/05",
        "ordernumber": "001030",
        "documentsandphotos": [],
        "link": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct",
          "externalid": ""
        },
        "duedate": "2020/08/05",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/05",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "182.24",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqLyxSUCAgCg==",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "654321",
        "lines": [],
        "totalex": "5000.00",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/17",
        "ordernumber": "001031",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2020/08/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/17",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "5500.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqKy1QICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      }
    ],
    "currentpageresults": 5
  }
}
```


---

### POST Update Processed PurchaseOrders

`POST http://api.aroflo.com/`

Move a purchaseorder to processed and mark it as linkprocessed.

This ensures that the purchaseorder is in the correct area in AroFlo and also sets reporting flags that the invoice was pushed through the API.

Replace the `purchaseprderid` with the purchaseorder you're updating.  Multiple invoices can be processed in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml=' + encodeURIComponent('JCdKSyxRICAgCg==<![CDATA[ processed ]]>')
    ];
    formVarString = formVarString.join('&');
}

```

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |
| `Content-Type` | `application/x-www-form-urlencoded` |  |

**Body:**

```
{{formVarString}}
```

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'POST';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}
 
//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml=' + encodeURIComponent('<purchaseorders><purchaseorder><purchaseorderid>JCdKSyxRICAgCg==</purchaseorderid><status><![CDATA[ processed ]]></status></purchaseorder></purchaseorders>')
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Update Processed PurchaseOrders (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "purchaseorders": [
          {
            "status": "processed",
            "purchaseorderid": "JCdKSyxRICAgCg=="
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "purchaseorders": []
      }
    }
  }
}
```


---

### GET Pending PurchaseOrders with items and Task information

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of purchase orders that are "pending" and include and task information for items ordered for tasks. 

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|pending')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems,task')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `HostIP` | `XXX.XXX.XXX.XXX` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'where=' + encodeURIComponent('and|status|=|pending')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems,task')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
}

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('purchaseorders')
        ,'postxml='
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);

    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

//The Authentication flow has been moved into a function to highlight that this is code that you must replicate in your own system/app/language
//and must be called for every request. Each request requires it's own HMAC signature.

function AroFloAuth(requestType, VarString) {
  //secret_key is a new auth key shown once only in the AroFloAPI Settings page.
  let secret_key =  pm.environment.get('secret_key');
   
  //We now need to set a timestamp as an ISO 8601 UTC timestamp e.g. "2018-07-25T01:39:57.135Z"
  let d = new Date();
  let isotimestamp = d.toISOString();
   
  //You need to send us what IP you are sending from
  let HostIP = pm.environment.get('HostIP');
   
  //urlPath is currently '' and should not be changed
  let urlPath = '';
   
  //rather than setting &format in the URL Variable scope, we now define an accept header
  //accept can be either 'text/json' or 'text/xml'
  let accept = pm.environment.get('accept');
   
  //we also removed the uEncoded,pEncoded & orgEncoded from the URL variable scope and it is now set as an Authorization header
  //All values should be URIencoded
  let Authorization = 'uencoded='+encodeURIComponent(pm.environment.get('uEncoded'))+'&pencoded='+encodeURIComponent(pm.environment.get('pEncoded'))+'&orgEncoded='+encodeURIComponent(pm.environment.get('orgEncoded'));
  
  //Setting the first field to our request type GET|POST
  let payload = [requestType];
  
  //If the HostIP hasn't been set then we can exclude that from our Auth string. Just remember to also exclude it from your header
  if (typeof HostIP != 'undefined') {
      payload.push(HostIP);
      pm.environment.set("HostIP", HostIP);
  }
  
  //We now add the rest of the fields needed to our payload array
  payload.push(urlPath);
  payload.push(accept);
  payload.push(Authorization);
  payload.push(isotimestamp);
  payload.push(VarString);
   
  //Create our hash using all of the fields we added to the payload array as a string, separated by '+' and encoded with our secret_key
  let hash = CryptoJS.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Pending PurchaseOrders with items and Task information (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 8,
    "queryresponsetimes": {
      "tasks": 163,
      "purchaseorders": 42,
      "lines": 45
    },
    "purchaseorders": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "1-1800",
            "qtybilled": "7.0000",
            "total": "7.0000",
            "price": "1.0000",
            "qtyordered": "7.0000",
            "partno": "MC20GR",
            "transactioncode": "6",
            "item": "Australian Plastics 20mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taxamount": "0.70000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 20mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRICAgCg==",
            "taxcode": "GST",
            "taskqtyused": "7",
            "itemid": "JSZKVyFSTEwgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "6.0000",
            "total": "6.0000",
            "price": "1.0000",
            "qtyordered": "6.0000",
            "partno": "MC20OR",
            "transactioncode": "6",
            "item": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
            "taxamount": "0.60000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRUCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "6",
            "itemid": "JSZKVyFSXDQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "5.0000",
            "total": "5.0000",
            "price": "1.0000",
            "qtyordered": "5.0000",
            "partno": "MC16GR",
            "transactioncode": "6",
            "item": "Australian Plastics 16mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taxamount": "0.50000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Australian Plastics 16mm x 10 Metre Meduim Duty Corrugated Conduit",
            "taskisused": "true",
            "lineid": "JCQ6KyRRQCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "5",
            "itemid": "JSZKVyFSTEggCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "4.0000",
            "total": "4.0000",
            "price": "1.0000",
            "qtyordered": "4.0000",
            "partno": "UTPL5EJF305R",
            "transactioncode": "6",
            "item": "Garland CAT5E 4 Pair U/UTP Jelly Filled Solid Black UV Resistant PE Jacket 305 Metre Dispenser Box",
            "taxamount": "0.40000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Garland CAT5E 4 Pair U/UTP Jelly Filled Solid Black UV Resistant PE Jacket 305 Metre Dispenser Box",
            "taskisused": "true",
            "lineid": "JCQ6KyRQMCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "4",
            "itemid": "JSZKVyBRTEAgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "3.0000",
            "total": "3.0000",
            "price": "1.0000",
            "qtyordered": "3.0000",
            "partno": "1685ENH.03500",
            "transactioncode": "6",
            "item": "Belden CAT6A 4 Pair Screened F/FTP Solid Round Violet Per Metre",
            "taxamount": "0.30000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "Belden CAT6A 4 Pair Screened F/FTP Solid Round Violet Per Metre",
            "taskisused": "true",
            "lineid": "JCQ6KyRQICAgCg==",
            "taxcode": "GST",
            "taskqtyused": "3",
            "itemid": "JSZKVyBRXEQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "2.0000",
            "total": "2.0000",
            "price": "1.0000",
            "qtyordered": "2.0000",
            "partno": "PJ151510T",
            "transactioncode": "6",
            "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "taxamount": "0.20000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "taskisused": "true",
            "lineid": "JCQ6KyRQUCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "2",
            "itemid": "JSZKVyBQXDQgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "qtybilled": "1.0000",
            "total": "1.0000",
            "price": "1.0000",
            "qtyordered": "1.0000",
            "partno": "abc-xyz",
            "transactioncode": "6",
            "item": "My new fancy part",
            "taxamount": "0.10000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "1.0000",
            "description": "My new fancy part",
            "taskisused": "true",
            "lineid": "JCQ6KyRQQCAgCg==",
            "taxcode": "GST",
            "taskqtyused": "1",
            "itemid": "JSZKUyxQXFAgCg==",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "0.0000",
            "total": "10.0000",
            "price": "5.0000",
            "qtyordered": "2.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "an ad-hoc item",
            "taxamount": "1.00000000",
            "taskid": "JSZaKyRSTDQgCg==",
            "cost": "5.0000",
            "description": "an ad-hoc item",
            "taskisused": "true",
            "lineid": "JSYqQyxQPEwgCg==",
            "taxcode": "GST",
            "taskqtyused": "2",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "38.00",
        "tasks": [
          {
            "completeddatetime": "2019/04/18 10:03:00",
            "jobnumber": "1064",
            "linkprocessed": "false",
            "client": {
              "orgid": "JCdKUydRMCAgCg==",
              "orgname": "#1 Ladies, Detective Agency"
            },
            "taskname": "HMAS Sydney Port of Sydney",
            "taskid": "JSZaKyRSTDQgCg==",
            "requestdatetime": "2019/04/17 10:04:09",
            "linkprocesseddate": " ",
            "refcode": "#1 Lad19",
            "completeddate": "2019/04/18",
            "requestdate": "2019/04/17",
            "tasktype": "Installation",
            "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%24ZUU%27%0A"
          }
        ],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/04/17",
        "ordernumber": "001008",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Cables4U",
          "externalid": ""
        },
        "duedate": "2019/04/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "41.80",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQ6TyFRICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "10.0000",
            "price": "10.0000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "GST Inc Item",
            "taxamount": "0.90910000",
            "taskid": "",
            "cost": "10.0000",
            "description": "GST Inc Item",
            "taskisused": "false",
            "lineid": "JSYqTyVQXEggCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "9.09",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/08/01",
        "ordernumber": "001027",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/08/01",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "abx123",
        "lines": [
          {
            "accountcode": "1-1800",
            "qtybilled": "5.0000",
            "total": "313.7000",
            "price": "31.3700",
            "qtyordered": "10.0000",
            "partno": "PJ151510",
            "transactioncode": "6",
            "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "taxamount": "31.37000000",
            "taskid": "",
            "cost": "31.3700",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "taskisused": "false",
            "lineid": "JSYqTyxQTFQgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "JSZKVyBQXDAgCg==",
            "taxrate": "10.00"
          }
        ],
        "totalex": "313.70",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2019/11/15",
        "ordernumber": "001029",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2019/11/15",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/11",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "345.07",
        "deliverybydatetime": " ",
        "datereceived": "2019/11/18",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqTyVRUCAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "supplierinvoicenumber": "",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "10.0000",
            "total": "37.3000",
            "price": "3.7300",
            "qtyordered": "10.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "RIGID CONDUIT H/DUTY 25MM 4MTR LENGTH",
            "taxamount": "3.73000000",
            "taskid": "",
            "cost": "3.7300",
            "description": "RIGID CONDUIT H/DUTY 25MM 4MTR LENGTH",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEAgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "7.5000",
            "price": "7.5000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "PVC Elect Insulation Tape",
            "taxamount": "0.75000000",
            "taskid": "",
            "cost": "7.5000",
            "description": "PVC Elect Insulation Tape",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEQgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "3.0000",
            "total": "31.2600",
            "price": "10.4200",
            "qtyordered": "3.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "RIGID CONDUIT H/DUY 50MM 4MTR LENGTH",
            "taxamount": "3.12600000",
            "taskid": "",
            "cost": "10.4200",
            "description": "RIGID CONDUIT H/DUY 50MM 4MTR LENGTH",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEggCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "10.0000",
            "total": "23.2000",
            "price": "2.3200",
            "qtyordered": "10.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "25MM 90 DEG S/BEND",
            "taxamount": "2.32000000",
            "taskid": "",
            "cost": "2.3200",
            "description": "25MM 90 DEG S/BEND",
            "taskisused": "false",
            "lineid": "JSYqRyZRPEwgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "6.7500",
            "price": "6.7500",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "Pipe Cement Pvc - Blue Type N\r\n500ML",
            "taxamount": "0.67500000",
            "taskid": "",
            "cost": "6.7500",
            "description": "Pipe Cement Pvc - Blue Type N\r\n500ML",
            "taskisused": "false",
            "lineid": "JSYqRyZRPDAgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "53.8900",
            "price": "53.8900",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "POLYPROPYLENE STRING LINE 1850MTRS",
            "taxamount": "5.38900000",
            "taskid": "",
            "cost": "53.8900",
            "description": "POLYPROPYLENE STRING LINE 1850MTRS",
            "taskisused": "false",
            "lineid": "JSYqRyZRPDQgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "5.7600",
            "price": "5.7600",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "PIPE CEMENT PVC CLEAR TYPE N 250ML",
            "taxamount": "0.57600000",
            "taskid": "",
            "cost": "5.7600",
            "description": "PIPE CEMENT PVC CLEAR TYPE N 250ML",
            "taskisused": "false",
            "lineid": "JSYqRyZSTFAgCg==",
            "taxcode": "GST",
            "taskqtyused": "",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "165.66",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/05",
        "ordernumber": "001030",
        "documentsandphotos": [],
        "link": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct",
          "externalid": ""
        },
        "duedate": "2020/08/05",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/05",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "182.24",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqLyxSUCAgCg==",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "acceptancestatus": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "supplierinvoicenumber": "654321",
        "lines": [
          {
            "accountcode": "5-1021",
            "qtybilled": "1.0000",
            "total": "5000.0000",
            "price": "5000.0000",
            "qtyordered": "1.0000",
            "partno": "",
            "transactioncode": "6",
            "item": "Adhoc line item",
            "taxamount": "500.00000000",
            "taskid": "JSc6LydQLDAgCg==",
            "cost": "5000.0000",
            "description": "Adhoc line item",
            "taskisused": "true",
            "lineid": "JSYqRyBRLFAgCg==",
            "taxcode": "GST",
            "taskqtyused": "1",
            "itemid": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "5000.00",
        "tasks": [
          {
            "completeddatetime": "2020/08/11 00:15:04",
            "jobnumber": "1117",
            "linkprocessed": "false",
            "client": {
              "orgid": "JCdKUydRMCAgCg==",
              "orgname": "#1 Ladies, Detective Agency"
            },
            "taskname": "HMAS Sydney",
            "taskid": "JSc6LydQLDAgCg==",
            "requestdatetime": "2020/08/11 00:00:00",
            "linkprocesseddate": " ",
            "refcode": "#1 Lad50",
            "completeddate": "2020/08/11",
            "requestdate": "2020/08/11",
            "tasktype": "Maintenance",
            "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%25Z%25%3D%26%0A"
          }
        ],
        "notes": [],
        "status": "approved",
        "purchasedate": "2020/08/17",
        "ordernumber": "001031",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier",
          "externalid": ""
        },
        "duedate": "2020/08/17",
        "purchasedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "dateinvoiced": "2020/08/17",
        "deliverybydate": "",
        "projects": [],
        "totalinc": "5500.00",
        "deliverybydatetime": " ",
        "datereceived": "",
        "deliveryinstructions": "",
        "isTaxInclusive": "false",
        "purchaseorderid": "JCQqKy1QICAgCg==",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "acceptancestatus": ""
      }
    ],
    "currentpageresults": 5
  }
}
```

