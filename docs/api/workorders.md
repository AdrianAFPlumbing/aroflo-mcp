# WorkOrders

Returns the lists of [Work Orders](https://help.aroflo.com/work-orders/office-work-orders-overview).

## WHERE filters

| Field | Value |
| --- | --- |
| workorderid | AroFlo ID |
| workordernumber | INT |
| status | String('In Progress','Pending Approval','Approved','Processed') |
| acceptancestatus | String('Not Sent','Awaiting Decision','Accepted','Declined','Need More Information') |
| createddate | DATE('YYYY-MM-DD') |
| createddatetime | DATE(YYYY-MM-DD hh:mm:ss) |
| requiredbydate | DATE('YYYY-MM-DD') |
| requiredbydatetime | DATE(YYYY-MM-DD hh:mm:ss) |
| approveddate | DATE('YYYY-MM-DD') |
| approveddatetime | DATE(YYYY-MM-DD hh:mm:ss) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND wo_order.created_UTC > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| documentsandphotos |
| notes |
| lineitems |
| tasks |
| bills |

## POSTXML variable definition

<workorders>
    <workorder>
        <workorderid>AROFLO ID</workorderid> INSERT no / UPDATE required
        <task>
            <taskid>AROFLO ID</taskid> INSERT required / UPDATE no
        </task>
        <requiredbydatetime>DATE(YYYY-MM-DD)</requiredbydatetime> INSERT yes / UPDATE yes
        <location>
            <locationid>AROFLO ID</locationid> INSERT required / UPDATE yes
        </location>
        <description>STRING</description> INSERT yes / UPDATE yes
        <contractor>
            <orgid>AROFLO ID</orgid> INSERT yes / UPDATE no
        </contractor>
        <status>STRING(In Progress,Pending Approval,Approved,Processed)</status> INSERT no / UPDATE yes        
    </workorder>
</workorders>

**Authorization:** bearer


### JOIN documentsandphotos

**Authorization:** bearer


---

### GET Get WorkOrders with documentsandphotos

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of Work Orders including the documentsandphotos.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('workorders')
        ,'join=' + encodeURIComponent('documentsandphotos')
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
        'zone=' + encodeURIComponent('workorders')
        ,'join=' + encodeURIComponent('documentsandphotos')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
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

#### Get WorkOrders with documentsandphotos (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK. No WHERE clause found, default filter applied",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 2,
    "queryresponsetimes": {
      "documentsandphotos": 3,
      "workorders": 3
    },
    "currentpageresults": 1,
    "workorders": [
      {
        "location": {
          "locationid": "",
          "locationname": ""
        },
        "processeddate": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "workorderid": "JCYqUyNQMCAgCg==",
        "approveddate": "",
        "lines": [],
        "processeddatetime": " ",
        "totalex": "0.00",
        "tasks": [],
        "createddate": "2024/01/23",
        "notes": [],
        "status": "In Progress",
        "requiredbydatetime": "2024/01/23 23:36:00",
        "description": "<p>Need you to go do some work for me.</p>",
        "refno": "1001",
        "documentsandphotos": [
          {
            "documentid": "JScqQydQLEwgCg==",
            "sizeinbytes": "446298",
            "uploadeddatetime": "2024/01/24 00:03:41",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-BWNX-original?expires=1706055228&signature=F2D2F3876B5591F96924F67FFCF8B127E6A754CD3378490BE344296E46225F19",
            "name": "image1.jpg"
          }
        ],
        "totaltax": "0.00",
        "acceptanceexpirydate": "",
        "acceptanceexpirydatetime": " ",
        "approveddatetime": " ",
        "totalinc": "0.00",
        "bills": [],
        "contractor": {
          "orgid": "JCQ6KyVRICAgCg==",
          "orgname": "A-Grade Subbie"
        },
        "workordernumber": "1001",
        "acceptedby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedatetime": " ",
        "createddatetime": "2024/01/23 23:37:26",
        "acceptancestatus": "",
        "sentby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedate": "",
        "requiredbydate": "2024/01/23"
      }
    ]
  }
}
```


### JOIN notes

**Authorization:** bearer


---

### GET Get WorkOrders with notes

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of Work Orders including the notes.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('workorders')
       ,'join=' + encodeURIComponent('notes')
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
        'zone=' + encodeURIComponent('workorders')
       ,'join=' + encodeURIComponent('notes')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
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

#### Get WorkOrders with notes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK. No WHERE clause found, default filter applied",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "notes": 13,
      "workorders": 5
    },
    "currentpageresults": 1,
    "workorders": [
      {
        "location": {
          "locationid": "",
          "locationname": ""
        },
        "processeddate": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "workorderid": "JCYqUyNQMCAgCg==",
        "approveddate": "",
        "lines": [],
        "processeddatetime": " ",
        "totalex": "0.00",
        "tasks": [],
        "createddate": "2024/01/23",
        "notes": [
          {
            "filter": "Internal Only",
            "timeposted": "Jan 24, 2024 10:53:36 AM",
            "noteid": "IyZKVyYK",
            "content": "<p>This is a Work Order note.</p>",
            "dateposted": "2024/01/24",
            "user": {}
          }
        ],
        "status": "In Progress",
        "requiredbydatetime": "2024/01/23 23:36:00",
        "description": "<p>Need you to go do some work for me.</p>",
        "refno": "1001",
        "documentsandphotos": [],
        "totaltax": "0.00",
        "acceptanceexpirydate": "",
        "acceptanceexpirydatetime": " ",
        "approveddatetime": " ",
        "totalinc": "0.00",
        "bills": [],
        "contractor": {
          "orgid": "JCQ6KyVRICAgCg==",
          "orgname": "A-Grade Subbie"
        },
        "workordernumber": "1001",
        "acceptedby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedatetime": " ",
        "createddatetime": "2024/01/23 23:37:26",
        "acceptancestatus": "",
        "sentby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedate": "",
        "requiredbydate": "2024/01/23"
      }
    ]
  }
}
```


### JOIN lineitems

**Authorization:** bearer


---

### GET Get WorkOrders with lineitems

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of Work Orders including the lineitems.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('workorders')
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
        'zone=' + encodeURIComponent('workorders')
       ,'join=' + encodeURIComponent('lineitems')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
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

#### Get WorkOrders with lineitems (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK. No WHERE clause found, default filter applied",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 2,
    "queryresponsetimes": {
      "lines": 57,
      "workorders": 8
    },
    "currentpageresults": 1,
    "workorders": [
      {
        "location": {
          "locationid": "",
          "locationname": ""
        },
        "processeddate": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "workorderid": "JCYqUyNQMCAgCg==",
        "approveddate": "",
        "lines": [
          {
            "qtybilled": "0.0000",
            "qtyordered": "10.0000",
            "totalinc": "110.00",
            "itemtype": "Material",
            "partno": "abc-xyz",
            "qtyused": "0.0000",
            "totalex": "100.00",
            "item": "My new fancy part",
            "taskid": "JSdaTyRRTEggCg==",
            "cost": "10.0000",
            "isbilled": "false",
            "lineid": "JCZaQyZQMCAgCg==",
            "taxcode": "GST",
            "trackingcentreid": "JCYqQyRSUCAgCg==",
            "totaltax": "10.00",
            "itemid": "JSZKUyxQXFAgCg==",
            "taxrate": "10.00"
          }
        ],
        "processeddatetime": " ",
        "totalex": "100.00",
        "tasks": [],
        "createddate": "2024/01/23",
        "notes": [],
        "status": "In Progress",
        "requiredbydatetime": "2024/01/23 23:36:00",
        "description": "<p>Need you to go do some work for me.</p>",
        "refno": "1001",
        "documentsandphotos": [],
        "totaltax": "10.00",
        "acceptanceexpirydate": "",
        "acceptanceexpirydatetime": " ",
        "approveddatetime": " ",
        "totalinc": "110.00",
        "bills": [],
        "contractor": {
          "orgid": "JCQ6KyVRICAgCg==",
          "orgname": "A-Grade Subbie"
        },
        "workordernumber": "1001",
        "acceptedby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedatetime": " ",
        "createddatetime": "2024/01/23 23:37:26",
        "acceptancestatus": "",
        "sentby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedate": "",
        "requiredbydate": "2024/01/23"
      }
    ]
  }
}
```


### JOIN tasks

**Authorization:** bearer


---

### GET Get WorkOrders with tasks

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of Work Orders including the task data.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('workorders')
       ,'join=' + encodeURIComponent('tasks')
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
        'zone=' + encodeURIComponent('workorders')
       ,'join=' + encodeURIComponent('tasks')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
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

#### Get WorkOrders with tasks (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK. No WHERE clause found, default filter applied",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "tasks": 257,
      "workorders": 28
    },
    "currentpageresults": 1,
    "workorders": [
      {
        "location": {
          "locationid": "",
          "locationname": ""
        },
        "processeddate": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "workorderid": "JCYqUyNQMCAgCg==",
        "approveddate": "",
        "lines": [],
        "processeddatetime": " ",
        "totalex": "0.00",
        "tasks": [
          {
            "taskid": "JSdaTyRRTEggCg==",
            "jobnumber": "1138",
            "taskname": "59-65 Maroondah Highway, Ringwood"
          }
        ],
        "createddate": "2024/01/23",
        "notes": [],
        "status": "In Progress",
        "requiredbydatetime": "2024/01/23 23:36:00",
        "description": "<p>Need you to go do some work for me.</p>",
        "refno": "1001",
        "documentsandphotos": [],
        "totaltax": "0.00",
        "acceptanceexpirydate": "",
        "acceptanceexpirydatetime": " ",
        "approveddatetime": " ",
        "totalinc": "0.00",
        "bills": [],
        "contractor": {
          "orgid": "JCQ6KyVRICAgCg==",
          "orgname": "A-Grade Subbie"
        },
        "workordernumber": "1001",
        "acceptedby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedatetime": " ",
        "createddatetime": "2024/01/23 23:37:26",
        "acceptancestatus": "",
        "sentby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedate": "",
        "requiredbydate": "2024/01/23"
      }
    ]
  }
}
```


### JOIN bills

**Authorization:** bearer


---

### GET Get WorkOrders with bills

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of Work Orders including the bills.

if (requestType == 'GET') {
    var urlVarString = [
       'zone=' + encodeURIComponent('workorders')
       ,'join=' + encodeURIComponent('bills')
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
        'zone=' + encodeURIComponent('workorders')
       ,'join=' + encodeURIComponent('bills')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
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

#### Get WorkOrders with bills (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK. No WHERE clause found, default filter applied",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "bills": 31,
      "workorders": 3
    },
    "currentpageresults": 1,
    "workorders": [
      {
        "location": {
          "locationid": "",
          "locationname": ""
        },
        "processeddate": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "workorderid": "JCYqUyNQMCAgCg==",
        "approveddate": "2024/01/24",
        "lines": [],
        "processeddatetime": " ",
        "totalex": "100.00",
        "tasks": [],
        "createddate": "2024/01/23",
        "notes": [],
        "status": "Approved",
        "requiredbydatetime": "2024/01/23 23:36:00",
        "description": "<p>Need you to go do some work for me.</p>",
        "refno": "1001",
        "documentsandphotos": [],
        "totaltax": "10.00",
        "acceptanceexpirydate": "",
        "acceptanceexpirydatetime": " ",
        "approveddatetime": "2024/01/24 11:09:45",
        "totalinc": "110.00",
        "bills": [
          {
            "billnumber": "5643211",
            "billid": "JScqWyZQLEwgCg=="
          }
        ],
        "contractor": {
          "orgid": "JCQ6KyVRICAgCg==",
          "orgname": "A-Grade Subbie"
        },
        "workordernumber": "1001",
        "acceptedby": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "acceptancedatetime": "2024/01/24 00:10:18",
        "createddatetime": "2024/01/23 23:37:26",
        "acceptancestatus": "Accepted",
        "sentby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedate": "2024/01/24",
        "requiredbydate": "2024/01/23"
      }
    ]
  }
}
```


---

### GET Get WorkOrders

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of Work Orders.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('workorders')
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
        'zone=' + encodeURIComponent('workorders')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
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

#### Get WorkOrders (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK. No WHERE clause found, default filter applied",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 2,
    "queryresponsetimes": {
      "workorders": 4
    },
    "currentpageresults": 1,
    "workorders": [
      {
        "location": {
          "locationid": "",
          "locationname": ""
        },
        "processeddate": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "workorderid": "JCYqUyNQMCAgCg==",
        "approveddate": "",
        "lines": [],
        "processeddatetime": " ",
        "totalex": "0.00",
        "tasks": [],
        "createddate": "2024/01/23",
        "notes": [],
        "status": "In Progress",
        "requiredbydatetime": "2024/01/23 23:36:00",
        "description": "<p>Need you to go do some work for me.</p>",
        "refno": "1001",
        "documentsandphotos": [],
        "totaltax": "0.00",
        "acceptanceexpirydate": "",
        "acceptanceexpirydatetime": " ",
        "approveddatetime": " ",
        "totalinc": "0.00",
        "bills": [],
        "contractor": {
          "orgid": "JCQ6KyVRICAgCg==",
          "orgname": "A-Grade Subbie"
        },
        "workordernumber": "1001",
        "acceptedby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedatetime": " ",
        "createddatetime": "2024/01/23 23:37:26",
        "acceptancestatus": "",
        "sentby": {
          "userid": "",
          "username": "Commander Shepard"
        },
        "acceptancedate": "",
        "requiredbydate": "2024/01/23"
      }
    ]
  }
}
```

