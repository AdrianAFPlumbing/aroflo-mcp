# Bills

Allows you list or update [Bills](https://help.aroflo.com/display/office/Create+a+Bill) for your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| billid | AROFLO ID |
| purchaseorderid | AROFLO ID |
| workorderid | AROFLO ID |
| status | String('In Progress','Pending Approval','Approved','Processed') |
| dateinvoiced | DATE(YYYY-MM-DD) |
| duedate | DATE(YYYY-MM-DD) |
| lastupdatedutc | DATETIME(YYYY-MM-DD HH:mm:ss) |
| lastupdateddatetimeutc | DATETIME(YYYY-MM-DD HH:mm:ss) |
| linkprocesseddate | DATE(YYYY-MM-DD) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| lineitems |
| documentsandphotos |
| notes |
| tasks |

## POSTXML variable definition

<bills>
    <bill>
        <billid>AROFLO ID</billid> INSERT no / UPDATE required
        <status>STRING(In Progress,Pending Approval,Approved,Processed)</status> INSERT no / UPDATE yes
        <purchaseorder>
            <purchaseorderid>AROFLO ID</purchaseorderid> INSERT required / UPDATE yes
        </purchaseorder>
        <workorder>
            <workorderid>AROFLO ID</workorderid> INSERT required / UPDATE yes
        </workorder>
        <billnumber>STRING</billnumber> INSERT yes / UPDATE yes
        <description>STRING</description> INSERT yes / UPDATE yes
        <dateinvoiced>DATE(YYYY-MM-DD)</dateinvoiced> INSERT yes / UPDATE yes
        <duedate>DATE(YYYY-MM-DD)</duedate> INSERT yes / UPDATE yes
    </bill>
</bills>

**Authorization:** bearer


### JOIN lineitems

**Authorization:** bearer


---

### GET Approved Bills with LineItems

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of bills that are "Approved " and include their line items.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('bills')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

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
        'zone=' + encodeURIComponent('bills')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
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

#### Approved Bills with LineItems (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "bills": [
      {
        "dateinvoiced": "2021/01/22",
        "billnumber": "1235",
        "workorder": {
          "workorderid": "",
          "workordernumber": ""
        },
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalinc": "375.51",
        "billid": "JSZKTydQPDQgCg==",
        "supplier": {
          "orgid": "JCQ6KyVRICAgCg=="
        },
        "lines": [
          {
            "accountcode": "1-1800",
            "total": "300.0000",
            "price": "300.0000",
            "itemtype": "Material",
            "taxamount": "30.00",
            "taskid": "JSZKTyxSXFwgCg==",
            "description": "Perform XYZ @ ABC",
            "lineid": "JSc6LyxRTEggCg==",
            "taxcode": "GST",
            "qty": "1.0000",
            "itemid": "JSQ6VydSXFAgCg==",
            "ordercode": "SubC",
            "taxrate": "10.00"
          },
          {
            "accountcode": "5-1021",
            "total": "0.0000",
            "price": "0.0000",
            "itemtype": "Material",
            "taxamount": "0.00",
            "taskid": "JSZKTyxSXFwgCg==",
            "description": "test for update",
            "lineid": "JSc6LyxRTEwgCg==",
            "taxcode": "GST",
            "qty": "1.0000",
            "itemid": "",
            "ordercode": "",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "total": "10.0000",
            "price": "10.0000",
            "itemtype": "Material",
            "taxamount": "1.00",
            "taskid": "JSZKSyBSXEAgCg==",
            "description": "My new fancy part",
            "lineid": "JSc6LyxRTDAgCg==",
            "taxcode": "GST",
            "qty": "1.0000",
            "itemid": "Jic6SyxQLF8tCg==",
            "ordercode": "abc-xyz",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "total": "31.3700",
            "price": "31.3700",
            "itemtype": "Material",
            "taxamount": "3.14",
            "taskid": "JSZKSyBSXEAgCg==",
            "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "lineid": "JSc6LyxRTDQgCg==",
            "taxcode": "GST",
            "qty": "1.0000",
            "itemid": "JSZKVyBQXDAgCg==",
            "ordercode": "PJ151510",
            "taxrate": "10.00"
          }
        ],
        "totalex": "341.37",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "isTaxInclusive": "0",
        "lastupdatedutc": "2021/01/22",
        "surchargeamount": "0.00",
        "description": "",
        "lastupdateddatetimeutc": "2021/01/22 00:54:15",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "documentsandphotos": [],
        "totalgst": "34.14",
        "purchaseorder": {
          "purchaseorderid": "JCQ6QyNSQCAgCg==",
          "ordernumber": "001009"
        },
        "duedate": "2019/06/21",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      },
      {
        "dateinvoiced": "2019/07/30",
        "billnumber": "21-03671-80918",
        "workorder": {
          "workorderid": "",
          "workordernumber": ""
        },
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalinc": "0.33",
        "billid": "JSZKSydRTEwgCg==",
        "supplier": {
          "orgid": "JSZaVydRPDAgCg=="
        },
        "lines": [
          {
            "accountcode": "1-1800",
            "total": "0.2000",
            "price": "0.1000",
            "itemtype": "Material",
            "taxamount": "0.02",
            "taskid": "JSZKSyJRXFwgCg==",
            "description": "Neodymium Block Magnet 5x5x5mm N50",
            "lineid": "JScqTyBQTFAgCg==",
            "taxcode": "GST",
            "qty": "2.0000",
            "itemid": "JiYqLyJQLE8sCg==",
            "ordercode": "B-W5H5L5-N50",
            "taxrate": "10.00"
          },
          {
            "accountcode": "1-1800",
            "total": "0.1000",
            "price": "0.1000",
            "itemtype": "Material",
            "taxamount": "0.01",
            "taskid": "JSZKSyJRXFwgCg==",
            "description": "Neodymium Block Magnet 5x5x5mm N50",
            "lineid": "JScqTyBQTFQgCg==",
            "taxcode": "GST",
            "qty": "1.0000",
            "itemid": "JiYqLyJQLE8sCg==",
            "ordercode": "B-W5H5L5-N50",
            "taxrate": "10.00"
          }
        ],
        "totalex": "0.30",
        "tasks": [],
        "notes": [],
        "status": "approved",
        "isTaxInclusive": "0",
        "lastupdatedutc": "2021/03/19",
        "surchargeamount": "0.00",
        "description": "",
        "lastupdateddatetimeutc": "2021/03/19 03:11:30",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "",
          "address2": ""
        },
        "documentsandphotos": [],
        "totalgst": "0.03",
        "purchaseorder": {
          "purchaseorderid": "JCQ6WyFQQCAgCg==",
          "ordernumber": "001023"
        },
        "duedate": "2019/07/30",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "bills": 16,
      "lines": 0
    },
    "currentpageresults": 2
  }
}
```


### JOIN trackingcentres

**Authorization:** bearer


---

### GET Approved Bills with LineItems and TrackingCentres

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of bills that are "Approved " and include their line items and the tracking centres for these line items.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('bills')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
        ,'join=' +encodeURIComponent('lineitems,trackingcentres')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

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
        'zone=' + encodeURIComponent('bills')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
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

#### Approved PurchaseOrders with lineitems (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "purchaseorders": 59,
      "lines": 8
    },
    "purchaseorders": [
      {
        "dateinvoiced": "",
        "deliverybydate": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "projects": [],
        "totalinc": "10.00",
        "deliverybydatetime": " ",
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
        "datereceived": "",
        "deliveryinstructions": "",
        "notes": [],
        "status": "approved",
        "isTaxInclusive": "true",
        "purchaseorderid": "JCQ6WyxQQCAgCg==",
        "ordernumber": "001027",
        "purchasedate": "2019/08/01",
        "acceptancestatus": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "duedate": "2019/08/01"
      }
    ],
    "currentpageresults": 1
  }
}
```


---

### GET Approved Bills

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of bills that are "Approved ".

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('bills')
        ,'where=' + encodeURIComponent('and|status|=|Approved')
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
        'zone=' + encodeURIComponent('bills')
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
        'zone=' + encodeURIComponent('bills')
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

#### Approved Bills (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "bills": [
      {
        "billnumber": "",
        "dateinvoiced": "2019/08/01",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalinc": "10.91",
        "billid": "JSZaXyJSXFAgCg==",
        "supplier": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "lines": [],
        "totalex": "10.00",
        "notes": [],
        "status": "2",
        "isTaxInclusive": "1",
        "surchargeamount": "0.00",
        "description": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "53 New St",
          "address2": ""
        },
        "documentsandphotos": [],
        "totalgst": "0.91",
        "duedate": "2019/08/01",
        "lastupdateuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Bradley.Sandbox"
        }
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "bills": 57
    },
    "currentpageresults": 1
  }
}
```


---

### POST Update Processed Bills

`POST http://api.aroflo.com/`

Move a bill to processed.

This ensures that the bill is in the correct area in AroFlo and also sets reporting flags that the invoice was pushed through the API.

Replace the `billid` with the bill you're updating. Multiple bill can be processed in this method by using additional keys.

if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('bills')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;<bills><bill><billid>JSZaXyJSXFAgCg==</billid><status><![CDATA[ processed ]]></status></bill></bills>&#x27;)
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);
    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

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
        'zone=' + encodeURIComponent('bills')
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
        'zone=' + encodeURIComponent('bills')
        ,'postxml=' + encodeURIComponent('<bills><bill><billid>JSZaXyJSXFAgCg==</billid><status><![CDATA[ processed ]]></status></bill></bills>')
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

#### Update Processed Bills (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "bills": [
          {
            "status": "processed",
            "billid": "JSZaXyJSXFAgCg=="
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "bills": []
      }
    }
  }
}
```


---

### POST Insert Bill

`POST http://api.aroflo.com/`

Create a new Bill, this must include ONE of either the `purchaseorderid` or `workorderid`.

if (requestType == 'POST') {
    var formVarString = [
    'zone=' + encodeURIComponent('bills')
    ,"postxml=" + encodeURIComponent("<bills><bill><purchaseorder><purchaseorderid>JCQ6TyFRICAgCg==</purchaseorderid></purchaseorder><billnumber>1234</billnumber><description><![CDATA[ this is a new bill ]]></description><dateinvoiced>2024-05-14</dateinvoiced><duedate>2024-06-14</duedate></bill></bills>")
];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);
    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
}

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
        'zone=' + encodeURIComponent('bills')
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
        'zone=' + encodeURIComponent('bills')
        ,'postxml=' + encodeURIComponent('<bills><bill><purchaseorder><purchaseorderid>JCQ6TyFRICAgCg==</purchaseorderid></purchaseorder><billnumber>1234</billnumber><description><![CDATA[ this is a new bill ]]></description><dateinvoiced>2024-05-14</dateinvoiced><duedate>2024-06-14</duedate></bill></bills>')
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

#### Insert Bill (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "bills": []
      },
      "inserttotal": 1,
      "inserts": {
        "bills": [
          {
            "billnumber": "1234",
            "dateinvoiced": "2024-05-14",
            "description": "this is a new bill",
            "BILLID": "JScqUyJQPFQgCg==",
            "purchaseorder": {
              "purchaseorderid": "JCQ6TyFRICAgCg=="
            },
            "duedate": "2024-06-14"
          }
        ]
      }
    }
  }
}
```

