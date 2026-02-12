# LastUpdate

This zone is READ ONLY.

The *lastupdate* Zone is very special in the AroFloAPI as it is the **only** zone that does not incur any Daily Limit. The idea with this zone is to use this to find out which items have updated since your last call and place that data into a queue for your system to retrieve either individually (using the Secondary Daily Limit of 20,000) or together (using the Daily Limit of 2,000).

Data returned from this zone contains only the following:

| Name | Type |
| --- | --- |
| zoneid | AroFloID |
| zonename | STRING(tasks, purchaseorders, invoices, clients, suppliers, locations, tasklabours, taskmaterials,taskexpenses, etc) |
| zoneidreference | STRING( taskid, clientid, invoiceid, etc ) |
| lastupdateutc | DATETIME(YYYY/MM/DD HH:mm:ss) |

## WHERE filters

| Field | Value |
| --- | --- |
| zonename | STRING(tasks, purchaseorders, invoices, clients, suppliers, locations, tasklabour, taskmaterial,taskexpense, etc) |
| lastupdateutc | DATETIME(YYYY-MM-DD HH:mm:ss) |

**Authorization:** bearer


---

### GET Get lastupdate since

`GET https://api.aroflo.com/{{urlVarString}}`

This example returns the first page of `lastupdate` for your AroFlo site filtering specifically for records updated since 2020/11/01. You would then process the return data to place into a queue for each zone and zoneid.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('lastupdate')
        ,'page=' + encodeURIComponent('1')
        ,'where=' + encodeURIComponent('and|lastupdateutc|>|2020/11/01')
        ,'order=' + encodeURIComponent('lastupdateutc|asc')
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
const crypto = require('crypto-js');

//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('lastupdate')
        ,'where=' + encodeURIComponent('and|lastupdateutc|>|2020/11/01')
        ,'order=' + encodeURIComponent('lastupdateutc|asc')
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
        'zone=' + encodeURIComponent('Substatuses')
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
  let hash = crypto.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Get lastupdate since (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "lastupdate": [
      {
        "zoneid": "JScqRyxQPEAgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/02 13:16:16"
      },
      {
        "zoneid": "JScqQyFSXEAgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/16 13:16:31"
      },
      {
        "zoneid": "JCQ6TyFRICAgCg==",
        "zonename": "purchaseorders",
        "zoneidreference": "purchaseorderid",
        "lastupdateutc": "2020/11/19 22:22:17"
      },
      {
        "zoneid": "JScqXydQTDAgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/25 00:10:15"
      },
      {
        "zoneid": "JSYqRyVRPDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqRyVSTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqRyVSTFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqRyVSTFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqRyVSTEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqRyVSTEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQyRSTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQyVRPEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQyVRPDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQyVRPDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQydSXDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQydSXDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQyBRPFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqQyJQLEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXyVRPEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXyVRPEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXyVRPEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXyVRPEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXyVRPDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXyVRPDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXydQXEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqXydQXEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyJQPEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQTFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQTEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQLFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQLEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQLEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQLEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQLEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQLDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQLDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQPFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqWyNQPFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqVyZQLFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqVyNQTEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqVyNQTEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqVyNQTEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqVyNQTEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqVyxRTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyRRTEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyVQPDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyVRTFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRXEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRLEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRLDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRLDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZRPDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSTFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSTEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSTEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSTDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyZSXDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQTDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQXDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQLDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydQPDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRTDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRXDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRLFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRLFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRLFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRLFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUydRLEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBQXFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBQLDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPDAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBRPDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBSTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUyBSTFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqUy1QTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqLyZSTFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqLyZSTFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqLydQTFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqLyFQXFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqLyFQXFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqLyFQXFwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqLyFQXEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqKyVRTEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqKyJQXEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqKyxSTDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqKyxSXFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqKyxSXFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqKyxSXFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSYqKy1RPFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaTydRLFAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaTyNRLEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaTyNSXEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaTy1RPEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaSyVRPFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaSydSTEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaSyBRPDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaSyJQXEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaSyxQPEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaSy1SXEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaRyVQXEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaRyZSTEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaRydRTFggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaRyBSXDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaRyJRLFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaRy1STEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaQyVQLEQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaQydQXEggCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaQyNQXFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaXyRQXEwgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaXyZRPFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaXyFRTFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaXy1QTDQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaWydSTEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaWyFQTFQgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/25 10:13:58"
      },
      {
        "zoneid": "JSZaWyJRPEAgCg==",
        "zonename": "taskmaterials",
        "zoneidreference": "materiallineid",
        "lastupdateutc": "2020/11/30 13:15:22"
      },
      {
        "zoneid": "JScqXyFRLFQgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/30 13:16:33"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "lastupdate": 8
    },
    "currentpageresults": 193
  }
}
```


---

### GET Get lastupdate Tasks

`GET https://api.aroflo.com/{{urlVarString}}`

This example returns the first page of `lastupdate` for your AroFlo site filtering specifically for task records since 2020/11/01.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('lastupdate')
        ,'page=' + encodeURIComponent('1')
        ,'where=' + encodeURIComponent('and|zonename|=|tasks')
        ,'where=' + encodeURIComponent('and|lastupdateutc|>|2020/11/01')
        ,'order=' + encodeURIComponent('lastupdateutc|asc')
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
const crypto = require('crypto-js');

//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('lastupdate')
        ,'where=' + encodeURIComponent('and|zonename|=|tasks')
        ,'where=' + encodeURIComponent('and|lastupdateutc|>|2022/02/01')
        ,'order=' + encodeURIComponent('lastupdateutc|asc')
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
        'zone=' + encodeURIComponent('Substatuses')
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
  let hash = crypto.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Get lastupdate Tasks since 2020/11/01 (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "lastupdate": [
      {
        "zoneid": "JScqRyxQPEAgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/02 13:16:16"
      },
      {
        "zoneid": "JScqQyFSXEAgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/16 13:16:31"
      },
      {
        "zoneid": "JScqXydQTDAgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/25 00:10:15"
      },
      {
        "zoneid": "JScqXyFRLFQgCg==",
        "zonename": "tasks",
        "zoneidreference": "taskid",
        "lastupdateutc": "2020/11/30 13:16:33"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "lastupdate": 2
    },
    "currentpageresults": 4
  }
}
```


---

### GET Get lastupdate Quotes

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
const crypto = require('crypto-js');

//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('lastupdate')
        ,'where=' + encodeURIComponent('and|zonename|=|quotes')
        ,'order=' + encodeURIComponent('lastupdateutc|asc')
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
        'zone=' + encodeURIComponent('Substatuses')
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
  let hash = crypto.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Get lastupdate Quotes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "lastupdate": [
      {
        "isdeleted": 0,
        "zoneid": "JCc6TyRQMCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2018/09/05 00:40:27"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCc6WyBRUCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/01/31 04:17:20"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCc6Ty1SUCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/04/16 23:08:24"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCc6KyVQICAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/04/17 00:17:12"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCcqQyRRICAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/08/05 02:40:18"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCcqQyRRMCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/09/22 23:16:43"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCcqWyVQUCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/09/25 09:09:39"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCcqRyZSQCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/10/14 01:04:41"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCcqWyNSUCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2019/10/14 01:11:45"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCdaWyNSUCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2020/09/01 02:05:15"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCdaVyxQICAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2020/10/05 04:02:24"
      },
      {
        "isdeleted": 0,
        "zoneid": "JCdaLyxRUCAgCg==",
        "zonename": "quotes",
        "zoneidreference": "quoteid",
        "lastupdateutc": "2020/12/15 22:39:09"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "lastupdate": 5
    },
    "currentpageresults": 12
  }
}
```

