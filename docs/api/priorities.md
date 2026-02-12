# Priorities

[Priorities](https://help.aroflo.com/display/SiteAdmin/Priorities) can be either BusinessUnit or Client specific. In this case the orgid is used for EITHER BU or Client

## Things to know when creating priorities

- The ResponseMinutes field is calculated through the responsetype and responseminutes field which means the responseminutes field when inserting/updating is not used/required.

- If a priority is inserted or update with a calculated ResponseMinutes less than 15, the ResponseType field will be preserved but ResponseValue will be set to 0. This can only occur if ResponseType is 'minutes' and ResponseMinutes is < 15

## WHERE filters

| Field | Value |
| --- | --- |
| orgid | AroFlo ID |
| priorityid | AroFlo ID |
| archived | BOOLEAN |

## POSTXML Variable definition

<priorities>
    <priority>
        <priorityid>IMS ID</priorityid> <!-- INSERT no / UPDATE required -->
        <org>
            <orgid>IMS ID</orgid> <!-- INSERT required / UPDATE no -->
        </org>
        <priorityno>INTEGER</priorityno> <!-- INSERT required / UPDATE yes -->
        <description>
            <![CDATA[ STRING(250) ]]>
            <!-- INSERT yes / UPDATE yes -->
        </description>
        <shortdescription>
            <![CDATA[ STRING(16) ]]>
            <!-- INSERT required / UPDATE yes -->
        </shortdescription>
        <responsetype>
            <![CDATA[ STRING(none, minutes, hours, days, weeks) ]]>
            <!-- INSERT yes / UPDATE yes -->
        </responsetype>
        <responsevalue>INTEGER (POSITIVE)</responsevalue> <!-- INSERT yes / UPDATE yes -->
        <listorder>INTEGER (POSITIVE)</listorder> <!-- INSERT yes / UPDATE yes -->
        <backgroundcolor>
            <![CDATA[ STRING(4-7) HEX COLOR ]]>
            <!-- INSERT yes / UPDATE yes -->
        </backgroundcolor>
        <archived>BOOLEAN</archived> <!-- INSERT no / UPDATE yes -->
    </priority>
</priorities>

**Authorization:** bearer


---

### GET Get Priorities

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the priorities for all of the BusinessUnits.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('priorities')
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
| `HostIP` | `XXX.XXX.XXX.XXX //This is now an optional field` |  |
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
        'zone=' + encodeURIComponent('priorities')
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
        'zone=' + encodeURIComponent('priorities')
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

#### Get Priorities (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "priorities": [
      {
        "listorder": "0",
        "priorityid": "IyYqUyMK",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "0",
        "backgroundcolor": "",
        "responseminutes": "1440",
        "responsevalue": "24",
        "archived": "false",
        "shortdescription": "24Hrs to fix",
        "responsetype": "hours",
        "priorityno": "0"
      },
      {
        "listorder": "1",
        "priorityid": "IyYqUywK",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "1",
        "backgroundcolor": "",
        "responseminutes": "2880",
        "responsevalue": "48",
        "archived": "false",
        "shortdescription": "48hrs to fix",
        "responsetype": "hours",
        "priorityno": "0"
      },
      {
        "listorder": "2",
        "priorityid": "IyYqUy0K",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "2",
        "backgroundcolor": "",
        "responseminutes": "4320",
        "responsevalue": "72",
        "archived": "false",
        "shortdescription": "72hrs to fix",
        "responsetype": "hours",
        "priorityno": "0"
      },
      {
        "listorder": "3",
        "priorityid": "IyYqLyQK",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "description": "3",
        "backgroundcolor": "",
        "responseminutes": "10080",
        "responsevalue": "1",
        "archived": "false",
        "shortdescription": "1 Wk to fix",
        "responsetype": "weeks",
        "priorityno": "0"
      },
      {
        "listorder": "0",
        "priorityid": "IyYqKyIK",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "description": "0",
        "backgroundcolor": "",
        "responseminutes": "0",
        "responsevalue": "0",
        "archived": "false",
        "shortdescription": "p1",
        "responsetype": "none",
        "priorityno": "1"
      },
      {
        "listorder": "1",
        "priorityid": "IyYqKyMK",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "description": "1",
        "backgroundcolor": "",
        "responseminutes": "0",
        "responsevalue": "0",
        "archived": "false",
        "shortdescription": "p2",
        "responsetype": "none",
        "priorityno": "2"
      },
      {
        "listorder": "2",
        "priorityid": "IyYqKywK",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "description": "2",
        "backgroundcolor": "",
        "responseminutes": "0",
        "responsevalue": "0",
        "archived": "false",
        "shortdescription": "p3",
        "responsetype": "none",
        "priorityno": "3"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "priorities": 41
    },
    "currentpageresults": 7
  }
}
```


---

### GET Get Client Priorties

`GET https://api.aroflo.com/{{urlVarString}}`

Get the client/businessunit specific priorities. If for a client then use the VALUE of the clientid in the WHERE clause.

Be sure to replace the `orgid` value with a value from your site.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('priorities')
        ,'where=' + encodeURIComponent('and|orgid|=|JCdKUydRMCAgCg==')
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
| `HostIP` | `XXX.XXX.XXX.XXX //This is now an optional field` |  |
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
        'zone=' + encodeURIComponent('priorities')
        ,'where=' + encodeURIComponent('and|orgid|=|JCdKUydRMCAgCg==')
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
        'zone=' + encodeURIComponent('priorities')
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

#### Get Client Priorties (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "priorities": [
      {
        "listorder": "0",
        "priorityid": "IyYqKyIK",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "description": "0",
        "backgroundcolor": "",
        "responseminutes": "0",
        "responsevalue": "0",
        "archived": "false",
        "shortdescription": "p1",
        "responsetype": "none",
        "priorityno": "1"
      },
      {
        "listorder": "1",
        "priorityid": "IyYqKyMK",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "description": "1",
        "backgroundcolor": "",
        "responseminutes": "0",
        "responsevalue": "0",
        "archived": "false",
        "shortdescription": "p2",
        "responsetype": "none",
        "priorityno": "2"
      },
      {
        "listorder": "2",
        "priorityid": "IyYqKywK",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "description": "2",
        "backgroundcolor": "",
        "responseminutes": "0",
        "responsevalue": "0",
        "archived": "false",
        "shortdescription": "p3",
        "responsetype": "none",
        "priorityno": "3"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "priorities": 6
    },
    "currentpageresults": 3
  }
}
```


---

### POST Create Client Priorties

`POST http://api.aroflo.com/`

Create a new priority for a specific Client/BU. NOTE: orgid is a REQUIRED field when creating new Priorities and so must be declared. If creating a priotity for a client use the `clientid` VALUE in the postxml `org` key. Multiple priorities can be created in this method by using additional `` keys.

Be sure to replace the `` value with one from your site.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('priorities')
        ,'postxml=' + encodeURIComponent('1JCdKUydSQCAgCg==3<![CDATA[ Med - 48 hrs ]]><![CDATA[ Medium Response - Within 48 hours ]]><![CDATA[ #164cc9 ]]>48hours')
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
        'zone=' + encodeURIComponent('priorities')
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
        'zone=' + encodeURIComponent('priorities')
        ,'postxml=' + encodeURIComponent('<priorities><priority><listorder>1</listorder><org><orgid>JCdKUydSQCAgCg==</orgid></org><priorityno>3</priorityno><shortdescription><![CDATA[ Med - 48 hrs ]]></shortdescription><description><![CDATA[ Medium Response - Within 48 hours ]]></description><backgroundcolor><![CDATA[ #164cc9 ]]></backgroundcolor><responsevalue>48</responsevalue><responsetype>hours</responsetype></priority></priorities>')
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

#### Create Client Priorties (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": "0",
      "errors": [],
      "updates": {
        "priorities": []
      },
      "inserttotal": 1,
      "inserts": {
        "priorities": [
          {
            "listorder": "1",
            "org": {
              "orgid": "JCdKUydSQCAgCg=="
            },
            "description": "Medium Response - Within 48 hours",
            "priorityid": "IyZaQyEK",
            "backgroundcolor": "#164cc9",
            "responsevalue": "48",
            "archived": "false",
            "shortdescription": "Med - 48 hrs",
            "responsetype": "hours",
            "priorityno": "3"
          }
        ]
      }
    }
  }
}
```


---

### POST Update BU Priorty

`POST http://api.aroflo.com/`

Update an existing Priority for a Business Unit

Be sure to replace the `` and `priorityid` value with one from your site.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('priorities')
        ,'postxml=' + encodeURIComponent('IyYqUyMK1<![CDATA[ 12Hrs to fix ]]><![CDATA[12 hours to complete fix. ]]><![CDATA[ #FF0015 ]]>12hours')
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
        'zone=' + encodeURIComponent('priorities')
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
        'zone=' + encodeURIComponent('priorities')
        ,'postxml=' + encodeURIComponent('<priorities><priority><priorityid>IyYqUyMK</priorityid><listorder>1</listorder><shortdescription><![CDATA[ 12Hrs to fix ]]></shortdescription><description><![CDATA[12 hours to complete fix. ]]></description><backgroundcolor><![CDATA[ #FF0015 ]]></backgroundcolor><responsevalue>12</responsevalue><responsetype>hours</responsetype></priority></priorities>')
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

#### Update BU Priorty (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "priorities": [
          {
            "listorder": "1",
            "priorityid": "IyYqUyMK",
            "description": "12 hours to complete fix.",
            "backgroundcolor": "#FF0015",
            "responsevalue": "12",
            "shortdescription": "12Hrs to fix",
            "responsetype": "hours"
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "priorities": []
      }
    }
  }
}
```

