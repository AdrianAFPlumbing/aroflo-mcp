# Schedules

This zone allows listing and creating [schedule](https://help.aroflo.com/x/jIrcAw) data from your AroFlo site.

**NOTE**
Schedules of type `periodic` are for the `Next Due` schedule of a Periodic Template.

## WHERE filters

| Field | Value |
| --- | --- |
| scheduleid | AroFlo ID |
| taskid | AroFlo ID |
| scheduletotype | STRING(USER, ASSET) |
| scheduledtoid | STRING(userid, assetid) |
| startdate | DATE(YYYY-MM-DD) |
| startdatetime | DATE(YYYY-MM-DD hh:mm:ss) |

**Default WHERE clause**

AND startdatetime > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| archived |
| periodicfuturedates |

## ORDER BY

| Field |
| --- |
| startdatetime |

**Authorization:** bearer


---

### GET Get Schedules

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the first page of `Schedules` for your AroFlo site.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('schedules')
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
        'zone=' + encodeURIComponent('schedules')
        ,'order=startdatetime|desc'
        ,'where=and|startdate|=|2022-03-02'
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

#### Get Schedules (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 10,
    "queryresponsetimes": {
      "schedules": 10
    },
    "currentpageresults": 13,
    "schedules": [
      {
        "scheduletype": {
          "typename": "HMAS Sydney",
          "typeid": "JCYqXyVRICAgCg==",
          "type": "periodic"
        },
        "scheduleid": "JSc6VyxRPFwgCg==",
        "startdate": "2021/04/23",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/04/23",
        "islocked": "false",
        "inserteddatetimeutc": "2021/03/17 01:40:58",
        "hours": "2",
        "note": "",
        "enddatetime": "2021/04/23 09:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/04/23 07:00:00"
      },
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXFwgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEAgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyRQUCAgCg==",
          "scheduledtoname": "Peter Mayhew",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyFRQCAgCg==",
          "scheduledtoname": "James Howlett III",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEwgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JScqVyRRPFwgCg==",
          "scheduledtoname": "Tali Zorah",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXDAgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:42",
        "hours": "1",
        "note": "",
        "enddatetime": "2021/06/18 14:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyFRQCAgCg==",
          "scheduledtoname": "James Howlett III",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 13:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXDQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:42",
        "hours": "1",
        "note": "",
        "enddatetime": "2021/06/18 14:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCYqWy1RICAgCg==",
          "scheduledtoname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
          "scheduledtotype": "asset",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 13:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqRyRQPEggCg==",
        "startdate": "2021/06/22",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/22",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/20 22:50:37",
        "hours": "2",
        "note": "",
        "enddatetime": "2021/06/22 12:00:00",
        "grouping": {
          "groupid": "ISZAICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/22 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqRyZSXFggCg==",
        "startdate": "2021/06/28",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/28",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/24 23:04:25",
        "hours": "1",
        "note": "session 1",
        "enddatetime": "2021/06/28 12:00:00",
        "grouping": {
          "groupid": "IScwICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/28 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "11111 22222 Ringwood",
          "typeid": "JSZaUyZQPEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqRyFQTFggCg==",
        "startdate": "2021/06/30",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/30",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/30 00:40:29",
        "hours": "1",
        "note": "session one",
        "enddatetime": "2021/06/30 12:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/30 11:00:00"
      }
    ]
  }
}
```


---

### GET Get Schedules for groupid

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the schedule data for a declared `groupid` of `schedules`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|groupid|=|ISYgICAK')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
    pm.environment.set("urlVarString", '?' +urlVarString);

    //We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)
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
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|groupid|=|ISYgICAK')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}
pm.environment.set("urlVarString", '?' +urlVarString);
//We now call the Authentication function and pass it our requestType and urlVarString
AroFloAuth(requestType, urlVarString)


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

#### Get Schedules for groupid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 2,
    "queryresponsetimes": {
      "schedules": 277
    },
    "currentpageresults": 4,
    "schedules": [
      {
        "scheduletype": {
          "typename": "HMAS Sydney",
          "typeid": "JCYqXyVRICAgCg==",
          "type": "periodic"
        },
        "scheduleid": "JSc6VyxRPFwgCg==",
        "startdate": "2021/04/23",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/04/23",
        "islocked": "false",
        "inserteddatetimeutc": "2021/03/17 01:40:58",
        "hours": "2",
        "note": "",
        "enddatetime": "2021/04/23 09:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/04/23 07:00:00"
      },
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "11111 22222 Ringwood",
          "typeid": "JSZaUyZQPEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqRyFQTFggCg==",
        "startdate": "2021/06/30",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/30",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/30 00:40:29",
        "hours": "1",
        "note": "session one",
        "enddatetime": "2021/06/30 12:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/30 11:00:00"
      }
    ]
  }
}
```


---

### GET Get Schedules for scheduletotype

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the schedule data for a declared `scheduledtotype` of `schedules`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|scheduledtotype|=|asset')
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
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|scheduledtotype|=|asset')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}
pm.environment.set("urlVarString", '?' +urlVarString);
//We now call the Authentication function and pass it our requestType and urlVarString
    AroFloAuth(requestType, urlVarString)

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

#### Get Schedules for scheduletotype (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "schedules": 634
    },
    "currentpageresults": 1,
    "schedules": [
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXDQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:42",
        "hours": "1",
        "note": "",
        "enddatetime": "2021/06/18 14:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCYqWy1RICAgCg==",
          "scheduledtoname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
          "scheduledtotype": "asset",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 13:00:00"
      }
    ]
  }
}
```


---

### GET Get Schedules for scheduledtoid

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the schedule data for a declared `scheduletoid` of `schedules`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|scheduledtoid|=|JCQ6XyRRUCAgCg==')
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
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|scheduledtoid|=|JCQ6XyRRUCAgCg==')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}
pm.environment.set("urlVarString", '?' +urlVarString);

//We now call the Authentication function and pass it our requestType and urlVarString
AroFloAuth(requestType, urlVarString)

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

#### Get Schedules for scheduletoid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 8,
    "queryresponsetimes": {
      "schedules": 391
    },
    "currentpageresults": 13,
    "schedules": [
      {
        "scheduletype": {
          "typename": "HMAS Sydney",
          "typeid": "JCYqXyVRICAgCg==",
          "type": "periodic"
        },
        "scheduleid": "JSc6VyxRPFwgCg==",
        "startdate": "2021/04/23",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/04/23",
        "islocked": "false",
        "inserteddatetimeutc": "2021/03/17 01:40:58",
        "hours": "2",
        "note": "",
        "enddatetime": "2021/04/23 09:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/04/23 07:00:00"
      },
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXFwgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEAgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyRQUCAgCg==",
          "scheduledtoname": "Peter Mayhew",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyFRQCAgCg==",
          "scheduledtoname": "James Howlett III",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEwgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JScqVyRRPFwgCg==",
          "scheduledtoname": "Tali Zorah",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXDAgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:42",
        "hours": "1",
        "note": "",
        "enddatetime": "2021/06/18 14:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyFRQCAgCg==",
          "scheduledtoname": "James Howlett III",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 13:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXDQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:42",
        "hours": "1",
        "note": "",
        "enddatetime": "2021/06/18 14:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCYqWy1RICAgCg==",
          "scheduledtoname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
          "scheduledtotype": "asset",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 13:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqRyRQPEggCg==",
        "startdate": "2021/06/22",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/22",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/20 22:50:37",
        "hours": "2",
        "note": "",
        "enddatetime": "2021/06/22 12:00:00",
        "grouping": {
          "groupid": "ISZAICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/22 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "941 Thompsons Road, Lyndhurst",
          "typeid": "JSdaTyRRTEQgCg==",
          "type": "task"
        },
        "scheduleid": "JScqRyZSXFggCg==",
        "startdate": "2021/06/28",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/28",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/24 23:04:25",
        "hours": "1",
        "note": "session 1",
        "enddatetime": "2021/06/28 12:00:00",
        "grouping": {
          "groupid": "IScwICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/28 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "11111 22222 Ringwood",
          "typeid": "JSZaUyZQPEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqRyFQTFggCg==",
        "startdate": "2021/06/30",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/30",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/30 00:40:29",
        "hours": "1",
        "note": "session one",
        "enddatetime": "2021/06/30 12:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/30 11:00:00"
      }
    ]
  }
}
```


---

### GET Get Schedules for startdate

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the schedule data for a declared `startdate` and `scheduledtoid` and sorting by `startdatetime` of `schedules`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|startdate|=|2021/06/18')
        ,'where=' + encodeURIComponent('and|scheduledtoid|=|JCQ6UyxRUCAgCg==')
        ,'order=' + encodeURIComponent('startdatetime|asc')
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
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|startdate|>=|2022/04/01')
        ,'where=' + encodeURIComponent('and|startdate|<|2022/04/02')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}
pm.environment.set("urlVarString", '?' +urlVarString);

//We now call the Authentication function and pass it our requestType and urlVarString
AroFloAuth(requestType, urlVarString)
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
  pm.environment.set("af_iso_timestamp", isotimestamp);7
  
  }//end function
```

### Example Responses

#### Get Schedules for startdate (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 2,
    "queryresponsetimes": {
      "schedules": 576
    },
    "currentpageresults": 2,
    "schedules": [
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEAgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      }
    ]
  }
}
```


---

### GET Get Schedules for startdatetime

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the schedule data for a declared `startdatetime` of `schedules`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|startdatetime|=|2021/06/18 10:00:00')
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
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|startdatetime|=|2021/06/18 10:00:00')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}
pm.environment.set("urlVarString", '?' +urlVarString);

//We now call the Authentication function and pass it our requestType and urlVarString
AroFloAuth(requestType, urlVarString)

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

#### Get Schedules for startdatetime (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "schedules": 273
    },
    "currentpageresults": 2,
    "schedules": [
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      },
      {
        "scheduletype": {
          "typename": "An Adhoc Meeting",
          "typeid": "JCcqVy1QICAgCg==",
          "type": "ad-hoc event"
        },
        "scheduleid": "JScqSy1RXFggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:28:27",
        "hours": "1",
        "note": "to discuss things",
        "enddatetime": "2021/06/18 11:00:00",
        "grouping": {
          "groupid": "ISYgICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "",
            "crewname": ""
          }
        },
        "startdatetime": "2021/06/18 10:00:00"
      }
    ]
  }
}
```


---

### GET Get Schedules for taskid

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the schedule data for a declared `taskid` of `schedules`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|taskid|=|JScqWyJQXFggCg==')
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
        'zone=' + encodeURIComponent('schedules')
        ,'where=' + encodeURIComponent('and|taskid|=|JSdaTyRRTEggCg==')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}
pm.environment.set("urlVarString", '?' +urlVarString);

//We now call the Authentication function and pass it our requestType and urlVarString
AroFloAuth(requestType, urlVarString)

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

#### Get Schedules for taskid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 4,
    "queryresponsetimes": {
      "schedules": 10
    },
    "currentpageresults": 5,
    "schedules": [
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXFwgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6XyRRUCAgCg==",
          "scheduledtoname": "Commander Shepard",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEAgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQ6UyxRUCAgCg==",
          "scheduledtoname": "Dave Filoni",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEQgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyRQUCAgCg==",
          "scheduledtoname": "Peter Mayhew",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEggCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JCQqQyFRQCAgCg==",
          "scheduledtoname": "James Howlett III",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      },
      {
        "scheduletype": {
          "typename": "59-65 Maroondah Highway, Ringwood",
          "typeid": "JSdaTyRRTEggCg==",
          "type": "task"
        },
        "scheduleid": "JScqSy1RXEwgCg==",
        "startdate": "2021/06/18",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "ishidden": "false",
        "enddate": "2021/06/18",
        "islocked": "false",
        "inserteddatetimeutc": "2021/06/17 23:30:07",
        "hours": "1",
        "note": "Go fix the thing",
        "enddatetime": "2021/06/18 12:00:00",
        "grouping": {
          "groupid": "ISZQICAK"
        },
        "scheduledto": {
          "scheduledtoid": "JScqVyRRPFwgCg==",
          "scheduledtoname": "Tali Zorah",
          "scheduledtotype": "user",
          "crew": {
            "crewid": "IiQ6LCAK",
            "crewname": "Dream Team"
          }
        },
        "startdatetime": "2021/06/18 11:00:00"
      }
    ]
  }
}
```


---

### POST Create Schedule

`POST http://api.aroflo.com/`

Create a new schedule. Multiple schedules can be created in this method by using additional keys.

```
if (requestType == &#x27;POST&#x27;) {
    var formVarString = [
        &#x27;zone=&#x27; + encodeURIComponent(&#x27;schedules&#x27;)
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;JCdKUyZRMCAgCg==task2025/01/01JCdKUyZRMCAgCg==2025/01/01this is a note2025/01/01 09:00:00JCdKUyZRMCAgCg==asset2025/01/01 07:00:00JCdKUyZRMCAgCg==task2025/01/01JCdKUyZRMCAgCg==2025/01/012025/01/01 09:00:00JCdKUyZRMCAgCg==user2025/01/01 07:30:00&#x27;)
    ];
    formVarString = formVarString.join(&#x27;&&#x27;);
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
        'zone=' + encodeURIComponent('schedules')
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
        'zone=' + encodeURIComponent('clients')
        ,'postxml=' + encodeURIComponent('<schedules><schedule><scheduletype><typeid>JCdKUyZRMCAgCg==</typeid><type>task</type></scheduletype><startdate>2025/01/01</startdate><insertedby><userid>JCdKUyZRMCAgCg==</userid></insertedby><enddate>2025/01/01</enddate><note>this is a note</note><enddatetime>2025/01/01 09:00:00</enddatetime><scheduledto><scheduledtoid>JCdKUyZRMCAgCg==</scheduledtoid><scheduledtotype>asset</scheduledtotype></scheduledto><startdatetime>2025/01/01 07:00:00</startdatetime></schedule><schedule><scheduletype><typeid>JCdKUyZRMCAgCg==</typeid><type>task</type></scheduletype><startdate>2025/01/01</startdate><insertedby><userid>JCdKUyZRMCAgCg==</userid></insertedby><enddate>2025/01/01</enddate><note></note><enddatetime>2025/01/01 09:00:00</enddatetime><scheduledto><scheduledtoid>JCdKUyZRMCAgCg==</scheduledtoid><scheduledtotype>user</scheduledtotype></scheduledto><startdatetime>2025/01/01 07:30:00</startdatetime></schedule></schedules>')
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

#### Create Schedule (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {},
      "inserttotal": 2,
      "inserts": {
        "schedules": [
          {
            "schedule_id": "JCdKUyZRMCAgCg==",
            "scheduletype": {
              "typeid": "JCdKUyZRMCAgCg==",
              "type": "task"
            },
            "startdate": "2025/01/01",
            "note": "this is a note",
            "insertedby": {
              "userid": "JCdKUyZRMCAgCg=="
            },
            "enddatetime": "2025/01/01 09:00:00",
            "scheduledto": {
              "scheduledtoid": "JCdKUyZRMCAgCg==",
              "scheduledtotype": "asset"
            },
            "startdatetime": "2025/01/01 07:00:00",
            "enddate": "2025/01/01"
          },
          {
            "schedule_id": "JCdKUyZRMCAgCg==",
            "scheduletype": {
              "typeid": "JSdaRyRQXFQgCg==",
              "type": "task"
            },
            "startdate": "2025/01/01",
            "note": "",
            "insertedby": {
              "userid": "JCdKUyZRMCAgCg=="
            },
            "enddatetime": "2025/01/01 09:00:00",
            "scheduledto": {
              "scheduledtoid": "JCdKUyZRMCAgCg==",
              "scheduledtotype": "user"
            },
            "startdatetime": "2025/01/01 07:30:00",
            "enddate": "2025/01/01"
          }
        ]
      }
    }
  }
}
```

#### ERROR: Schedule type is invalid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {},
      "inserttotal": 3,
      "inserts": {
        "schedules": [
          {
            "scheduletype": {
              "typeid": "62011",
              "type": "asd"
            },
            "startdate": "2025/03/03",
            "note": "this is a note",
            "insertedby": {
              "userid": "IyYqWyQK"
            },
            "enddatetime": "2025/03/03 09:00:00",
            "scheduledto": {
              "scheduledtoid": "asfasdfas",
              "scheduledtotype": "asset"
            },
            "error": "Invalid \"schedule to\" id.",
            "startdatetime": "2025/03/03 07:00:00",
            "enddate": "2025/03/03"
          },
          {
            "scheduletype": {
              "typeid": "JDD==",
              "type": "task"
            },
            "startdate": "2025/03/03",
            "note": "",
            "insertedby": {
              "userid": "IyYqWyASQK"
            },
            "enddatetime": "2025/03/03 09:00:00",
            "scheduledto": {
              "scheduledtoid": "asdfsaf",
              "scheduledtotype": "user"
            },
            "error": "Invalid schedule type id.",
            "startdatetime": "2025/03/03 07:30:00",
            "enddate": "2025/03/03"
          }
        ]
      }
    }
  }
}
```

