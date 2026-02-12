# Invoices

This zone allows listing and updating of [invoices](https://) for your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| invoiceid | AroFlo ID |
| status | STRING(not started,pending approval,approved,processed) |
| cusinvoiced | BOOLEAN |
| dateinvoiced | DATE(YYYY-MM-DD) |
| duedate | DATE(YYYY-MM-DD) |
| taskdaterequested | DATE(YYYY-MM-DD) |
| taskdatetimerequested | DATETIME(YYYY-MM-DD HH:mm:ss) |
| taskdatecompleted | DATE(YYYY-MM-DD) |
| taskdatetimecompleted | DATETIME(YYYY-MM-DD HH:mm:ss) |
| linkprocesseddate | DATE(YYYY-MM-DD) |
| lastupdatedutc | DATETIME(YYYY-MM-DD HH:mm:ss) |
| lastupdateddatetimeutc | DATETIME(YYYY-MM-DD HH:mm:ss) |
| createdutc | DATE(YYYY-MM-DD) |
| createddatetimeutc | DATE(YYYY-MM-DD HH:mm:ss) |

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
| notes |

## POSTXML Variable definition

<invoices>
    <invoice>
        <invoiceid>IMS ID</invoiceid>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE required     -->
        <description> <![CDATA[ STRING(2000) ]]>  </description>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes     -->
        <status>STRING(50)(In Progress, Pending Approval, Approved, Processed)</status>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes     -->
    </invoice>
</invoices>

### Process the Invoice, Archive the Task

Setting Invoice status to 'processed' will automatically ARCHIVE the linked task

**Authorization:** bearer


### JOIN lineitems

Include the lineitems that make up the invoice.

**Authorization:** bearer


---

### GET Get Approved Invoices including line items

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of invoices that are "Approved" and return the line items that make up each invoice.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

### Collated Invoices

Any invoice that is a Project Collated, where each line item represents a separate invoice, will include the following structure in it's return data:

```
"lines": [
    {
        ...
        "task": {
            "taskid": "XXXXXXXX",
            "jobnumber": "YYYY"
        },
        ...
    },
    ...
]

```
This then gives a reference to the task via either jobnumber or taskid for that line.

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
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' +encodeURIComponent('lineitems')
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
        'zone=' + encodeURIComponent('invoices')
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

#### Get Approved Invoices including line items (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "invoices": 15,
      "lines": 0
    },
    "currentpageresults": 2,
    "invoices": [
      {
        "invoiceid": "JSYqVyBRXFQgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "createddatetimeutc": "2019/06/21 00:39:17",
        "lines": [
          {
            "accountcode": "4-1010",
            "qtybilled": "2.0000",
            "total": "166.0000",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "83.0000",
            "itemtype": "Labour",
            "transactioncode": "00",
            "qtyused": "2.0000",
            "taxamount": "16.60",
            "description": "B.Sandbox 21/06/2019",
            "lineid": "JSZaUyZRXEwgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSQCAgCg==",
            "itemid": "",
            "ordercode": "NT",
            "taxrate": "10.00"
          },
          {
            "accountcode": "4-1010",
            "qtybilled": "4.0000",
            "total": "332.0000",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "83.0000",
            "itemtype": "Labour",
            "transactioncode": "00",
            "qtyused": "4.0000",
            "taxamount": "33.20",
            "description": "J.Howlett III 21/06/2019",
            "lineid": "JSZaUyZRXDAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSQCAgCg==",
            "itemid": "",
            "ordercode": "NT",
            "taxrate": "10.00"
          },
          {
            "accountcode": "4-1010",
            "qtybilled": "1.0000",
            "total": "420.0000",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "420.0000",
            "itemtype": "Material",
            "transactioncode": "01",
            "qtyused": "1.0000",
            "taxamount": "42.00",
            "description": "Perform XYZ @ ABC",
            "lineid": "JSZaUyZRXDQgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyVQQCAgCg==",
            "itemid": "JSQ6VydSXFAgCg==",
            "ordercode": "SubC",
            "taxrate": "10.00"
          },
          {
            "accountcode": "4-1010",
            "qtybilled": "1.0000",
            "total": "35.0000",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "35.0000",
            "itemtype": "Material",
            "transactioncode": "01",
            "qtyused": "1.0000",
            "taxamount": "3.50",
            "description": "My new fancy part",
            "lineid": "JSZaUyZRLFAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "itemid": "JSZKUyxQXFAgCg==",
            "ordercode": "abc-xyz",
            "taxrate": "10.00"
          },
          {
            "accountcode": "4-1010",
            "qtybilled": "2.0000",
            "total": "62.7400",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "31.3700",
            "itemtype": "Material",
            "transactioncode": "01",
            "qtyused": "2.0000",
            "taxamount": "6.27",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "lineid": "JSZaUyZRLFQgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "itemid": "JSZKVyBQXDAgCg==",
            "ordercode": "PJ151510",
            "taxrate": "10.00"
          },
          {
            "accountcode": "4-1010",
            "qtybilled": "3.0000",
            "total": "122.7600",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "40.9200",
            "itemtype": "Material",
            "transactioncode": "01",
            "qtyused": "3.0000",
            "taxamount": "12.28",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "lineid": "JSZaUyZRLFggCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "itemid": "JSZKVyBQXDQgCg==",
            "ordercode": "PJ151510T",
            "taxrate": "10.00"
          },
          {
            "accountcode": "4-1010",
            "qtybilled": "1.0000",
            "total": "50.0000",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "50.0000",
            "itemtype": "Expense",
            "transactioncode": "01",
            "qtyused": "1.0000",
            "taxamount": "5.00",
            "description": "Parking",
            "lineid": "JSZaUyZRLFwgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "itemid": "",
            "ordercode": "",
            "taxrate": "10.00"
          }
        ],
        "totalex": "1188.50",
        "notes": [],
        "lastupdatedutc": "2021/10/07",
        "status": "approved",
        "surchargeamount": "0.00",
        "description": "Test for LaTrobe This is a test invoice for LaTrobe Uni requirements",
        "linkprocesseddate": "",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "custon": "1234",
        "duedate": "2019/06/21",
        "dateinvoiced": "2019/06/21",
        "task": {},
        "project": {},
        "stage": {},
        "totalinc": "1307.35",
        "client": {
          "orgid": "JCdKUydSUCAgCg==",
          "orgname": "ABC Building"
        },
        "invoicenumber": "1011",
        "createdutc": "2019/06/21",
        "isTaxInclusive": "false",
        "lastupdateddatetimeutc": "2021/10/07 00:46:02",
        "invoicedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "partinvoice": "false",
        "address": {
          "postcode": "3000",
          "state": "VIC",
          "suburb": "Melbourne",
          "address1": "50 Market St",
          "address2": ""
        },
        "totalgst": "118.85",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      },
      {
        "invoiceid": "JScqUydSTFwgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "createddatetimeutc": "2024/05/02 23:02:14",
        "lines": [
          {
            "accountcode": "4-1020",
            "qtybilled": "0.0800",
            "total": "6.4000",
            "task": {
              "taskid": "",
              "jobnumber": "",
              "webappEncodedID": "32%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3CP%20%20%0A"
            },
            "price": "80.0000",
            "itemtype": "Labour",
            "transactioncode": "00",
            "qtyused": "0.0800",
            "taxamount": "0.64",
            "description": "C.Shepard 3/5/2024 fixed do dad",
            "lineid": "JSQqWyRSXFAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSQCAgCg==",
            "itemid": "",
            "ordercode": "NT",
            "taxrate": "10.00"
          }
        ],
        "totalex": "6.40",
        "notes": [],
        "lastupdatedutc": "2024/05/02",
        "status": "approved",
        "surchargeamount": "0.00",
        "description": "HMAS Sydney Port of Sydney <p>Diesel engine maintenance</p>",
        "linkprocesseddate": "",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency",
          "externalid": "057f346d-f773-41b2-b19a-330a4fe3c864"
        },
        "custon": "",
        "duedate": "2024/05/03",
        "dateinvoiced": "2024/05/03",
        "task": {},
        "project": {},
        "stage": {},
        "totalinc": "7.04",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "invoicenumber": "1039",
        "createdutc": "2024/05/02",
        "isTaxInclusive": "false",
        "lastupdateddatetimeutc": "2024/05/02 23:03:15",
        "invoicedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "partinvoice": "false",
        "address": {
          "postcode": "2000",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "address1": "HMAS Sydney Pier 2, Harbour 4",
          "address2": "Pier 2, Harbour 4"
        },
        "totalgst": "0.64",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      }
    ]
  }
}
```


### JOIN trackingcentres

Include the lineitems that make up the invoice.

**Authorization:** bearer


---

### GET Get Approved Invoices with LineItems and TrackingCentres

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of invoices that are "Approved" and return the line items that make up each invoice.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```

### Collated Invoices

Any invoice that is a Project Collated, where each line item represents a separate invoice, will include the following structure in it's return data:

```
"lines": [
    {
        ...
        "task": {
            "taskid": "XXXXXXXX",
            "jobnumber": "YYYY"
        },
        ...
    },
    ...
]

```
This then gives a reference to the task via either jobnumber or taskid for that line.

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
        'zone=' + encodeURIComponent('invoices')
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
        'zone=' + encodeURIComponent('invoices')
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


### JOIN task

Include information about the task the invoice is for.

If the invoice is not linked to a task, this will return no data.

**Authorization:** bearer


---

### GET Get Approved Invoices include task details

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of invoices that are "Approved".

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('task')
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
        'zone=' + encodeURIComponent('invoices')
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
        'zone=' + encodeURIComponent('invoices')
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

#### Get Approved Invoices include task details (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "invoices": 54
    },
    "currentpageresults": 1,
    "invoices": [
      {
        "invoiceid": "JSYqXyRRLEwgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "lines": [],
        "totalex": "269.78",
        "notes": [],
        "status": "approved",
        "surchargeamount": "0.00",
        "description": "HMAS Sydney Maintenance Contract.",
        "linkprocesseddate": "2018/12/11",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency",
          "externalid": "057f346d-f773-41b2-b19a-330a4fe3c864"
        },
        "custon": "665892",
        "duedate": "2018/12/11",
        "dateinvoiced": "2018/12/11",
        "task": {
          "taskid": "",
          "requestdatetime": " ",
          "refcode": "",
          "completeddatetime": " ",
          "requestdate": "",
          "completeddate": "",
          "jobnumber": "",
          "tasktype": "",
          "client": {
            "orgid": "",
            "orgname": ""
          },
          "taskname": ""
        },
        "project": {},
        "stage": {},
        "totalinc": "296.76",
        "lastupdated": "2018/12/17",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "invoicenumber": "1002",
        "isTaxInclusive": "false",
        "lastupdateddatetime": "2018/12/17 07:34:20",
        "partinvoice": "false",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "22222",
          "address2": "11111"
        },
        "totalgst": "26.98",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      }
    ]
  }
}
```


### JOIN project

Include information about the Project, the invoices task is linked to.

If the invoices task is not linked to a Project or the invoice is not linked to a task, this will return no data.

**Authorization:** bearer


---

### GET Get Approved Invoices include project details

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of invoices that are "Approved".

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('project')
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
        'zone=' + encodeURIComponent('invoices')
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
        'zone=' + encodeURIComponent('invoices')
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

#### Get Approved Invoices include project details (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "location": 68,
      "project": 68,
      "stage": 12,
      "invoices": 11
    },
    "currentpageresults": 1,
    "invoices": [
      {
        "invoiceid": "JSYqXyRRLEwgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "lines": [],
        "totalex": "269.78",
        "notes": [],
        "status": "approved",
        "surchargeamount": "0.00",
        "description": "HMAS Sydney Maintenance Contract.",
        "linkprocesseddate": "2018/12/11",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency",
          "externalid": "057f346d-f773-41b2-b19a-330a4fe3c864"
        },
        "custon": "665892",
        "duedate": "2018/12/11",
        "dateinvoiced": "2018/12/11",
        "task": {},
        "project": {
          "location": {
            "locationid": "JSc6QyVRXFwgCg==",
            "locationname": "HMAS Sydney, Port of Sydney"
          },
          "contact": "Mriam Makehba",
          "startdate": "2018/11/09",
          "projecttype": "Commercial",
          "enddate": "2018/11/18",
          "status": "Open",
          "closeddate": "",
          "description": "",
          "projectid": "JCYqWyFQUCAgCg==",
          "refno": "#1 Lad1",
          "manager": "Bradley Sandbox",
          "custon": "665892",
          "projectnumber": "1",
          "projectname": "HMAS Sydney Maintenance Contract"
        },
        "stage": {},
        "totalinc": "296.76",
        "lastupdated": "2018/12/17",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "invoicenumber": "1002",
        "isTaxInclusive": "false",
        "lastupdateddatetime": "2018/12/17 07:34:20",
        "partinvoice": "false",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "22222",
          "address2": "11111"
        },
        "totalgst": "26.98",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      }
    ]
  }
}
```


---

### GET Get Approved Invoices updated after 2018-11-01 11:00:00

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of invoices that are "Approved". This would be were you are querying AroFlo on a set frequency for updated invoices and the DATETIME provided for `lastupdateddatetime` is the DATETIME of your last query. This ensures that you always have the latest information.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'where=' + encodeURIComponent('and|lastupdateddatetime|>|2018-11-01 11:00:00')
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
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
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
        'zone=' + encodeURIComponent('invoices')
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

#### Get Approved Invoices updated after 2018-11-01 11:00:00 (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 3,
    "queryresponsetimes": {
      "invoices": 119
    },
    "currentpageresults": 2,
    "invoices": [
      {
        "invoiceid": "JSYqXyRRLEwgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "lines": [],
        "totalex": "269.78",
        "notes": [],
        "lastupdatedutc": "2021/10/31",
        "status": "approved",
        "surchargeamount": "0.00",
        "description": "HMAS Sydney Maintenance Contract.",
        "linkprocesseddate": "2018/12/11",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency",
          "externalid": "057f346d-f773-41b2-b19a-330a4fe3c864"
        },
        "custon": "665892",
        "duedate": "2018/12/11",
        "dateinvoiced": "2018/12/11",
        "task": {},
        "project": {},
        "stage": {},
        "totalinc": "296.76",
        "lastupdated": "2021/11/01",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "invoicenumber": "1002",
        "isTaxInclusive": "false",
        "lastupdateddatetime": "2021/11/01 10:17:03",
        "lastupdateddatetimeutc": "2021/10/31 23:17:01",
        "invoicedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "partinvoice": "false",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "22222",
          "address2": "11111"
        },
        "totalgst": "26.98",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      },
      {
        "invoiceid": "JSYqVyBRXFQgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "lines": [],
        "totalex": "1188.50",
        "notes": [],
        "lastupdatedutc": "2021/10/07",
        "status": "approved",
        "surchargeamount": "0.00",
        "description": "Test for LaTrobe This is a test invoice for LaTrobe Uni requirements",
        "linkprocesseddate": "",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "custon": "1234",
        "duedate": "2019/06/21",
        "dateinvoiced": "2019/06/21",
        "task": {},
        "project": {},
        "stage": {},
        "totalinc": "1307.35",
        "lastupdated": "2021/10/07",
        "client": {
          "orgid": "JCdKUydSUCAgCg==",
          "orgname": "ABC Building"
        },
        "invoicenumber": "1011",
        "isTaxInclusive": "false",
        "lastupdateddatetime": "2021/10/07 11:45:53",
        "lastupdateddatetimeutc": "2021/10/07 00:46:02",
        "invoicedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "partinvoice": "false",
        "address": {
          "postcode": "3000",
          "state": "VIC",
          "suburb": "Melbourne",
          "address1": "50 Market St",
          "address2": ""
        },
        "totalgst": "118.85",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      }
    ]
  }
}
```


---

### GET Get all invoices for certain taskid

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the invoices for a certain Task based on the supplied `taskid`. Note also that 'part invoices' are identified by `"partinvoice": "true"`

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|taskid|=|JSZaWyZRLFggCg==')
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
        'zone=' + encodeURIComponent('invoices')
        ,'where=' + encodeURIComponent('and|taskid|=|JSZaWyZRLFggCg==')
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
        'zone=' + encodeURIComponent('invoices')
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

#### Get all invoices for certain taskid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 3,
    "queryresponsetimes": {
      "invoices": 119
    },
    "currentpageresults": 2,
    "invoices": [
      {
        "invoiceid": "JSYqXyBRLEwgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "lines": [],
        "totalex": "250.00",
        "notes": [],
        "lastupdatedutc": "",
        "status": "processed",
        "surchargeamount": "0.00",
        "description": "HMAS Sydney",
        "linkprocesseddate": "",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency",
          "externalid": "057f346d-f773-41b2-b19a-330a4fe3c864"
        },
        "custon": "",
        "duedate": "2019/01/18",
        "dateinvoiced": "2019/01/18",
        "task": {},
        "project": {},
        "stage": {},
        "totalinc": "275.00",
        "lastupdated": "2019/01/18",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "invoicenumber": "1008",
        "isTaxInclusive": "false",
        "lastupdateddatetime": "2019/01/18 11:55:29",
        "lastupdateddatetimeutc": " ",
        "invoicedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "partinvoice": "true",
        "address": {
          "postcode": "2000",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "address1": "HMAS Sydney Pier 2, Harbour 4",
          "address2": "Pier 2, Harbour 4"
        },
        "totalgst": "25.00",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      },
      {
        "invoiceid": "JSYqXyBRLDAgCg==",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "lines": [],
        "totalex": "500.00",
        "notes": [],
        "lastupdatedutc": "",
        "status": "processed",
        "surchargeamount": "0.00",
        "description": "HMAS Sydney",
        "linkprocesseddate": "",
        "documentsandphotos": [],
        "link": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency",
          "externalid": "057f346d-f773-41b2-b19a-330a4fe3c864"
        },
        "custon": "",
        "duedate": "2019/01/18",
        "dateinvoiced": "2019/01/18",
        "task": {},
        "project": {},
        "stage": {},
        "totalinc": "550.00",
        "lastupdated": "2019/01/18",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "invoicenumber": "1009",
        "isTaxInclusive": "false",
        "lastupdateddatetime": "2019/01/18 11:56:14",
        "lastupdateddatetimeutc": " ",
        "invoicedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "partinvoice": "false",
        "address": {
          "postcode": "2000",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "address1": "HMAS Sydney Pier 2, Harbour 4",
          "address2": "Pier 2, Harbour 4"
        },
        "totalgst": "50.00",
        "deliverystatus": "To be Printed",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      }
    ]
  }
}
```


---

### POST Update Processed Invoices

`POST http://api.aroflo.com/`

Move an invoice to processed and mark it as linkprocessed.

This ensures that the invoice is in the correct area in AroFlo and also sets reporting flags that the invoice was pushed through the API.

Replace the `invoiceid` value with the invoice you're updating.  Multiple invoices can be processed in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('invoices')
        ,'postxml=' + encodeURIComponent('JSYqRyZQTEggCg==<![CDATA[ processed ]]>')
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
        'zone=' + encodeURIComponent('invoices')
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
        'zone=' + encodeURIComponent('invoices')
        ,'postxml=' + encodeURIComponent('<invoices><invoice><invoiceid>JSYqRyZQTEggCg==</invoiceid><status><![CDATA[ processed ]]></status></invoice></invoices>')
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

#### Update Processed Invoices (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "invoices": [
          {
            "invoiceid": "JSYqRyZQTEggCg==",
            "status": "processed"
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "invoices": []
      }
    }
  }
}
```

