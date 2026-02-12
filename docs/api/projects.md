# Projects

This zone is READ ONLY.

This zone allows listing [projects](https://help.aroflo.com/x/Y4zcAw) data from your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| projectid | AroFlo ID |
| orgid | AroFlo ID |
| projectnumber | NUMBER |
| projectname | STRING(50) |
| createdutc | DATE(YYYY-MM-DD) |
| createddatetimeutc | DATE(YYYY-MM-DD hh:mm:ss) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

**Authorization:** bearer


---

### GET Get Projects

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the first page of `Projects` for your AroFlo site.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('projects')
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
        'zone=' + encodeURIComponent('projects')
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

#### Get Projects (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "projects": [
      {
        "location": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney, Port of Sydney"
        },
        "manageruser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "startdate": "2018/11/09",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "projecttype": {
          "projecttypeid": "IyZaLywK",
          "projecttype": "Commercial"
        },
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "enddate": "2018/11/18",
        "closeddate": "",
        "status": "open",
        "insertedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "description": "",
        "stages": [],
        "projectid": "JCYqWyFQUCAgCg==",
        "refno": "#1 Lad1",
        "contactuser": {
          "userid": "JCQ6XyVRMCAgCg==",
          "username": "Mriam Makehba"
        },
        "custon": "665892",
        "projectnumber": "1",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "projectname": "HMAS Sydney Maintenance Contract"
      },
      {
        "location": {
          "locationid": "",
          "locationname": ""
        },
        "manageruser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "startdate": "2019/07/13",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "projecttype": {
          "projecttypeid": "",
          "projecttype": ""
        },
        "client": {
          "orgid": "JCdKUyBQUCAgCg==",
          "orgname": "Andrea Test"
        },
        "enddate": "2019/07/22",
        "closeddate": "",
        "status": "open",
        "insertedbyuser": {
          "userid": "JCQ6XyRRUCAgCg==",
          "username": "Commander Shepard"
        },
        "description": "",
        "stages": [],
        "projectid": "JCYqLyJRICAgCg==",
        "refno": "Andrea1",
        "contactuser": {
          "userid": "JCQ6XyZQUCAgCg==",
          "username": "Child Contact"
        },
        "custon": "",
        "projectnumber": "2",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "projectname": "Test for invoicing parent"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 2,
    "queryresponsetimes": {
      "projects": 349
    },
    "currentpageresults": 2
  }
}
```

