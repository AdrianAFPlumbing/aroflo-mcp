# TaskTypes

This zone is READ ONLY.

Lists the various [Task Types](https://help.aroflo.com/display/SiteAdmin/Task+Types) declared for your AroFlo site.

This zone is Read Only.

## WHERE filters

| Field | Value |
| --- | --- |
| archived | BOOLEAN |
| businessunitname | STRING |
| clientid | AroFloID |

Using the clientid allows you to return the list of tasktypes that client is restricted to.

**Authorization:** bearer


---

### GET Get TaskTypes

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of active tasktypes. This is filtered by checking the archive flag.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasktypes')
        ,'where=' + encodeURIComponent('and|archived|=|false')
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
        'zone=' + encodeURIComponent('tasktypes')
        ,'where=' + encodeURIComponent('and|archived|=|false')
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
        'zone=' + encodeURIComponent('tasktypes')
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

#### Get TaskTypes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasktypes": 36
    },
    "currentpageresults": 3,
    "tasktypes": [
      {
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "",
        "tasktypeid": "JCYqVyFSQCAgCg==",
        "archived": "false",
        "tasktype": "Service"
      },
      {
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "",
        "tasktypeid": "JCYqVyFSUCAgCg==",
        "archived": "false",
        "tasktype": "Installation"
      },
      {
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "",
        "tasktypeid": "JCYqVyJQQCAgCg==",
        "archived": "false",
        "tasktype": "Maintenance"
      }
    ]
  }
}
```


---

### GET Get TaskTypes for a Client

`GET https://api.aroflo.com/{{urlVarString}}`

Return the list tasktypes the a certain client is restricted to.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasktypes')
        ,'where=' + encodeURIComponent('and|clientid|=|JCQ6WyBRICAgCg==')
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
        'zone=' + encodeURIComponent('tasktypes')
        ,'where=' + encodeURIComponent('and|clientid|=|JCQ6WyBRICAgCg==')
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
        'zone=' + encodeURIComponent('tasktypes')
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

#### Get TaskTypes for a Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasktypes": 21
    },
    "currentpageresults": 2,
    "tasktypes": [
      {
        "businessunit": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          }
        ],
        "description": "",
        "tasktypeid": "JCYqVyFSQCAgCg==",
        "archived": "false",
        "tasktype": "Service"
      },
      {
        "businessunit": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          }
        ],
        "description": "",
        "tasktypeid": "JCYqVyFSUCAgCg==",
        "archived": "false",
        "tasktype": "Installation"
      }
    ]
  }
}
```

#### Get TaskTypes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasktypes": 36
    },
    "currentpageresults": 3,
    "tasktypes": [
      {
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "",
        "tasktypeid": "JCYqVyFSQCAgCg==",
        "archived": "false",
        "tasktype": "Service"
      },
      {
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "",
        "tasktypeid": "JCYqVyFSUCAgCg==",
        "archived": "false",
        "tasktype": "Installation"
      },
      {
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "",
        "tasktypeid": "JCYqVyJQQCAgCg==",
        "archived": "false",
        "tasktype": "Maintenance"
      }
    ]
  }
}
```

