# Locations

This zone is READ ONLY.

Clients, Suppliers and Business Units can all have one or more Locations

This zone is Read Only at the moment, Client and Supplier locations can be added through their zone. We will allow Inserts and Updates in a future release.

## WHERE filters

| Field | Value |
| --- | --- |
| locationid | AroFlo ID |
| linkedtotype | STRING(businessunit,client,supplier) |
| clientid | AroFlo ID |
| supplierid | AroFlo ID |
| orgid | AroFlo ID |
| clientname | STRING(50) |
| suppliername | STRING(50) |
| orgname | STRING(50) |
| locationname | STRING(50) |
| gpslat | FLOAT |
| gpslong | FLOAT |
| address | STRING(100) |
| postcode | STRING(10) |
| state | STRING(50) |
| suburb | STRING(50) |
| country | STRING(50) |
| archive | BOOLEAN |
| createdutc | DATE(YYYY-MM-DD) |
| createddatetimeutc | DATE(YYYY-MM-DD) |
| createddatetimeutc | DATE(YYYY-MM-DD hh:mm:ss) |
| lasteupdatedutc | DATE(YYYY-MM-DD) |
| lastupdateddatetimeutc | DATE(YYYY-MM-DD hh:mm:ss) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| customfields |

**Authorization:** bearer


---

### GET Get Locations

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of locations for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('locations')
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
        'zone=' + encodeURIComponent('locations')
        ,'where=' + encodeURIComponent('and|createdutc|>|2021/12/14')
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
        'zone=' + encodeURIComponent('locations')
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

#### Get Locations (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "locations": [
      {
        "locationid": "JScqLyBQLDAgCg==",
        "gpslat": "-37.81488",
        "postcode": "3000",
        "SiteContact": "",
        "state": "VIC",
        "suburb": "Melbourne",
        "SiteEmail": "",
        "createddatetimeutc": "2022/01/26 22:14:38",
        "customfields": [],
        "linkedto": {
          "linkedtoname": "A second Test Client",
          "linkedtoid": "JSc6LyRSTEwgCg==",
          "linkedtotype": "client"
        },
        "locationname": "1, 14 Grove Road",
        "createdutc": "2022/01/26",
        "notes": [],
        "lastupdatedutc": "2022/01/26",
        "country": "AUSTRALIA",
        "gpslong": "145.0236093",
        "lastupdateddatetimeutc": "2022/01/26 22:14:45",
        "address": "",
        "documentsandphotos": [],
        "archived": "FALSE",
        "SitePhone": ""
      },
      {
        "locationid": "JScqLyBQLDQgCg==",
        "gpslat": "-37.8146517",
        "postcode": "3000",
        "SiteContact": "",
        "state": "VIC",
        "suburb": "Melbourne",
        "SiteEmail": "",
        "createddatetimeutc": "2022/01/26 22:17:56",
        "customfields": [],
        "linkedto": {
          "linkedtoname": "A second Test Client",
          "linkedtoid": "JSc6LyRSTEwgCg==",
          "linkedtotype": "client"
        },
        "locationname": "101 Collins Street",
        "createdutc": "2022/01/26",
        "notes": [],
        "lastupdatedutc": "2022/01/26",
        "country": "AUSTRALIA",
        "gpslong": "144.970504",
        "lastupdateddatetimeutc": "2022/01/26 22:18:00",
        "address": "",
        "documentsandphotos": [],
        "archived": "FALSE",
        "SitePhone": ""
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "locations": 7
    },
    "currentpageresults": 2
  }
}
```

