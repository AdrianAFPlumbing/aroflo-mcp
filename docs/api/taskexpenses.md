# TaskExpenses

Allows you to pull the [expenses](https://help.aroflo.com/display/office/Task+Worksheet+Expenses) recorded on tasks without the overhead of the rest of the task information.

This zone is Read Only

## WHERE filters

| Field | Value |
| --- | --- |
| taskid | AroFlo ID |
| status | STRING(quote,notstarted,inprogress,pending,completed,archived) |
| expenselineid | AroFlo ID |
| dateused | DATE(YYYY-MM-DD) |
| linkprocessed | BOOLEAN |
| linkprocesseddate | DATE(YYYY-MM-DD) |
| linkprocesseddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |

**Default WHERE clause**

AND dateused > DATEADD(d, -30, GETUTCDATE())

## JOINs

| Area |
| --- |
| documentsandphotos |

**Authorization:** bearer


---

### GET Get Taskexpenses

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of task expense that have not been processed by the API. We do this by filtering on the explinkprocessed field, which we should set TRUE after we process the data from AroFlo.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('taskexpenses')
        ,'where=' + encodeURIComponent('and|lablinkprocessed|=|false')
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
        'zone=' + encodeURIComponent('taskexpenses')
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
        'zone=' + encodeURIComponent('taskexpenses')
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

#### Get Taskexpenses (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "expenses": [
      {
        "overheadallocation": "",
        "cost": "15.0000",
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "Aardva5",
          "jobnumber": "1049",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydSQCAgCg==",
            "clientname": "Aardvaark ConsultantsCLR2"
          }
        },
        "sell": "15.0000",
        "description": "parking",
        "quantity": "0",
        "lineid": "JCQ6Ry1SUCAgCg==",
        "dateused": "2018/10/31",
        "user": {
          "userid": "",
          "username": ""
        }
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "expenses": 16
    },
    "currentpageresults": 1
  }
}
```

