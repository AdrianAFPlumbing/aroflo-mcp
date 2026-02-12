# Users

This zone allows listing, updating and creation of new [Users](https://help.aroflo.com/display/office/Users) for your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| userid | AroFlo ID |
| givennames | STRING |
| surname | STRING |
| position | STRING |
| createdutc | DATE(YYYY-MM-DD) |
| createddatetimeutc | DATE(YYYY-MM-DD HH:mm:ss) |
| lastupdatedutc | DATE(YYYY-MM-DD) |
| lastupdateddatetimeutc | DATE(YYYY-MM-DD HH:mm:ss) |
| archived | BOOLEAN |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| customfields |
| permissiongroups |

## POSTXML Variable definition

<users>
    <user>
        <userid>AroFloID</userid>         INSERT no / UPDATE required 
        <givennames>STRING(50)</givennames>         INSERT required / UPDATE yes 
        <surname>STRING(50)</surname>         INSERT required / UPDATE yes 
        <username>STRING(40)</username>         INSERT required / UPDATE yes 
        <password>STRING(40)</password>         INSERT required / UPDATE no 
        <email>STRING(250)</email>         INSERT yes / UPDATE yes 
        <email2>STRING(250)</email2>         INSERT yes / UPDATE yes 
        <phone>STRING(50)</phone>         INSERT yes / UPDATE yes 
        <fax>STRING(50)</fax>         INSERT yes / UPDATE yes 
        <mobile>STRING(50)</mobile>         INSERT yes / UPDATE yes 
        <permissiongroups>
            <permissiongroup>
                <groupid>AroFloID</groupid>                 INSERT yes / UPDATE yes </permissiongroup>
        </permissiongroups>
        <org>
            <orgid>AroFloID</orgid>             INSERT required / UPDATE no 
        </org>
        <address class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;>
        <addressline1>STRING(150)</addressline1> INSERT yes / UPDATE yes 
        <addressline2>STRING(150)</addressline2> INSERT yes / UPDATE yes 
        <suburb>STRING(100)</suburb> INSERT yes / UPDATE yes 
        <state>STRING(50)(Australian, New Zealand and United States "States")</state> INSERT yes / UPDATE yes 
        <postcode>STRING(10)</postcode> INSERT yes / UPDATE yes 
        <country>STRING(50)(All Countries)</country> INSERT yes / UPDATE yes 
        </address>
        <customfields>
            <customfield>
                <fieldid>AroFloID</fieldid>  INSERT no / UPDATE yes 
                <name>STRING(50)</name>  INSERT yes / UPDATE yes 
                <type>STRING(50)</type>  INSERT yes / UPDATE yes (text, numeric, Datefield, checkbox, radio, Select, textarea) 
                <value><![CDATA[ STRING(2000) ]]></value>  INSERT yes / UPDATE yes 
                    type = 'checkbox' then value is TRUE or FALSE
                    type = 'datefield' then value is a valid date in format 'YYYY/MM/DD'
                    type = all other types then string(2000)
            </customfield>
        </customfields>
        <featureaccess>
            <feature>
                <featureid>AROFLO ID</featureid> INSERT yes / UPDATE yes
                <featurevalue>STRING(see notes)</featurevalue> INSERT yes / UPDATE yes
            </feature>
        </featureaccess>
    </user>
</users>

When updating a user and their Permission Groups(PG) they will not 'add' to the existing list, rather, every UPDATE removes all exiting PG's linked and then will use the list from your update.

For FeatureAccess the value depends on the field being set. Please refer to this list for valid fields and values:

| **Feature Field Name** | **Values** |
| --- | --- |
| Edit Task Notes | All Task Notes,My Task Notes |
| Quote Pricing Visibility | No Pricing,Line Items, Overall Totals, All |
| Individual Calendar Settings per Business Unit | true,false |
| Default Field Schedule Event Type Filter | Task Schedules,Task Timesheets |
| Site Administrator Access | true,false |
| Reset password through "Forgot Password?": | true,false |
| Do not show as Inventory Stock Location | true,false |

**Authorization:** bearer


### JOIN customfields

**Authorization:** bearer


---

### GET Get Users and customfields

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users and their customfield data.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|archived|=|false')
        ,'join=' + encodeURIComponent('customfields')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|archived|=|false')
        ,'join=' + encodeURIComponent('customfields')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users and customfields (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "users": 2,
      "customfields": 1
    },
    "users": [
      {
        "surname": "Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "phone": "",
        "email": "bradley@aroflo.com",
        "email2": "",
        "customfields": [
          {
            "fieldid": "IyYqQyUK",
            "value": "Yes",
            "archived": "false",
            "type": "radio",
            "name": "Is organ donor?"
          }
        ],
        "notes": [],
        "givennames": "Bradley",
        "documentsandphotos": [],
        "userid": "JCQ6XyRRUCAgCg==",
        "accesstype": "Admin",
        "username": "Bradley.Sandbox",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "phone": "",
        "email": "",
        "email2": "",
        "customfields": [
          {
            "fieldid": "IyYqRy0K",
            "value": "",
            "archived": "false",
            "type": "radio",
            "name": "Is organ donor?"
          }
        ],
        "notes": [],
        "givennames": "Bradley",
        "documentsandphotos": [],
        "userid": "JCQ6UyxRUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "bradley.field",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Nesbitt",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "phone": "",
        "email": "",
        "email2": "",
        "customfields": [
          {
            "fieldid": "IyYqQyYK",
            "value": "No",
            "archived": "false",
            "type": "radio",
            "name": "Is organ donor?"
          }
        ],
        "notes": [],
        "givennames": "James",
        "documentsandphotos": [],
        "userid": "JCQqQyRQUCAgCg==",
        "accesstype": "Base",
        "username": "james.newsbitt",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Dom Edited This",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "phone": "",
        "email": "",
        "email2": "",
        "customfields": [
          {
            "fieldid": "IyYqQycK",
            "value": "",
            "archived": "false",
            "type": "radio",
            "name": "Is organ donor?"
          }
        ],
        "notes": [],
        "givennames": "James",
        "documentsandphotos": [],
        "userid": "JCQqQyFRQCAgCg==",
        "accesstype": "Base",
        "username": "james.howlett",
        "archived": "false",
        "fax": "",
        "mobile": "0412 345 678"
      }
    ],
    "currentpageresults": 4
  }
}
```


---

### POST Update Users customfield

`POST http://api.aroflo.com/`

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('users')
        ,'postxml=JCQqQyRQUCAgCg==IyYqQyUK<![CDATA[ No ]]>'
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
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'postxml=<users><user><userid>JCQqQyRQUCAgCg==</userid><customfields><customfield><fieldid>IyYqQyUK</fieldid><value><![CDATA[ No ]]></value></customfield></customfields></user></users>'
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


---

### POST Create User with Custom Fields

`POST http://api.aroflo.com/`

Create a new user. Multiple users can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('JamesNesbittjames.newsbittmyultrastrongpasswordthatwillneverbebrokenBaseJCdKUyZRMCAgCg==')
    ];
    formVarString = formVarString.join('&');
}

```
If you do not supply a `permissiongroup` entry, the user will be set to the AroFlo default Permission Group `Worker`.

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
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('<users><user><givennames>Tali</givennames><surname>Normandy</surname><username>tali.normandy</username><password>myultrastrongpasswordthatwillneverbebroken</password><accesstype>Use Permission Groups</accesstype><org><orgid>JCdKUyZRMCAgCg==</orgid></org></user></users>')
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

#### Create User (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "users": []
      },
      "inserttotal": 1,
      "inserts": {
        "users": [
          {
            "surname": "Normandy",
            "givennames": "Tali",
            "password": "myultrastrongpasswordthatwillneverbebroken",
            "org": {
              "orgid": "JCdKUyZRMCAgCg=="
            },
            "accesstype": "Use Permission Groups",
            "userid": "JSdaRyJQPEwgCg==",
            "username": "tali.normandy"
          }
        ]
      }
    }
  }
}
```


### JOIN permissiongroups

**Authorization:** bearer


---

### GET Get Users and permissiongroups

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users and their customfield data.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|archived|=|false')
        ,'join=' + encodeURIComponent('customfields')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|archived|=|false')
        ,'join=' + encodeURIComponent('permissiongroups')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users and permissiongroups (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 3,
    "queryresponsetimes": {
      "permissiongroups": 37,
      "users": 59
    },
    "users": [
      {
        "surname": "Shepard",
        "permissiongroups": [
          {
            "groupid": "IiZaQCAK",
            "groupname": "Management",
            "archived": "false"
          }
        ],
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "email": "bradley.bristowstagg@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Commander",
        "documentsandphotos": [],
        "userid": "JCQ6XyRRUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "Bradley.Sandbox",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Filoni",
        "permissiongroups": [
          {
            "groupid": "IiZaWCAK",
            "groupname": "Worker",
            "archived": "false"
          },
          {
            "groupid": "IyYqSy0K",
            "groupname": "Asset Creation",
            "archived": "false"
          }
        ],
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "email": "david.mcdonald@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Dave",
        "documentsandphotos": [],
        "userid": "JCQ6UyxRUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "dave.filoni",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Mayhew",
        "permissiongroups": [
          {
            "groupid": "IiZaWCAK",
            "groupname": "Worker",
            "archived": "false"
          }
        ],
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "email": "bradley.bristowstagg@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Peter",
        "documentsandphotos": [],
        "userid": "JCQqQyRQUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "peter.mayhew1",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Howlett III",
        "permissiongroups": [
          {
            "groupid": "IiZaWCAK",
            "groupname": "Worker",
            "archived": "false"
          }
        ],
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "email": "bradley@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "James",
        "documentsandphotos": [],
        "userid": "JCQqQyFRQCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "james.howlett",
        "archived": "false",
        "fax": "",
        "mobile": "0412 345 678"
      },
      {
        "surname": "Nesbitt",
        "permissiongroups": [
          {
            "groupid": "IiZaWCAK",
            "groupname": "Worker",
            "archived": "false"
          }
        ],
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "James",
        "documentsandphotos": [],
        "userid": "JSc6LyBQPEQgCg==",
        "accesstype": "Use Permission Groups",
        "username": "james.newsbitt",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Zorah",
        "permissiongroups": [
          {
            "groupid": "IiZaWCAK",
            "groupname": "Worker",
            "archived": "false"
          }
        ],
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Tali",
        "documentsandphotos": [],
        "userid": "JScqVyRRPFwgCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.zorah",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Normandy",
        "permissiongroups": [
          {
            "groupid": "IiZaWCAK",
            "groupname": "Worker",
            "archived": "false"
          }
        ],
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Tali",
        "documentsandphotos": [],
        "userid": "JSdaRyJQPEwgCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.normandy",
        "archived": "false",
        "fax": "",
        "mobile": ""
      }
    ],
    "currentpageresults": 7
  }
}
```


---

### POST Update Users permissiongroups

`POST http://api.aroflo.com/`

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('users')
        ,'postxml=JCQqQyRQUCAgCg==IyYqQyUK<![CDATA[ No ]]>'
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
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'postxml=<users><user><userid>JCQqQyRQUCAgCg==</userid><customfields><customfield><fieldid>IyYqQyUK</fieldid><value><![CDATA[ No ]]></value></customfield></customfields></user></users>'
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

#### Update Users permissiongroups (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "users": [
          {
            "permissiongroups": [
              {
                "groupid": "IiZaQCAK"
              }
            ],
            "userid": "JCQ6XyRRUCAgCg=="
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "users": []
      }
    }
  }
}
```


### JOIN documentsandphotos

**Authorization:** bearer


---

### GET Get Users and DocumentsandPhotos

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users. Without including any WHERE clauses, the API will apply a last 30 days filter by default.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|createdutc|>|2001-01-01')
        ,'join=' + encodeURIComponent('documentsandphotos')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users and DocumentsandPhotos (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 5,
    "queryresponsetimes": {
      "documentsandphotos": 9,
      "users": 45
    },
    "users": [
      {
        "permissiongroups": [],
        "surname": "Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/06/19 04:53:46",
        "email": "bradley.bristowstagg@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/06/19",
        "position": "Commander",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "givennames": "Commander",
        "lastupdateddatetimeutc": "2023/05/23 23:28:15",
        "documentsandphotos": [
          {
            "documentid": "JSYqUyxRPDAgCg==",
            "sizeinbytes": "780364",
            "uploadeddatetime": "2020/06/25 03:57:45",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-TQS-original?expires=1705286187&signature=7F7EA9BEE171A5A44F47FD077C9D8232231CCA1720C3FB6A34FB8017EF4D2EB5",
            "name": "mass-effect-3-the-real-female-shepard.jpg"
          }
        ],
        "userid": "JCQ6XyRRUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "Bradley.Sandbox",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "permissiongroups": [],
        "surname": "Filoni",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/07/24 05:19:20",
        "email": "david.mcdonald@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/07/24",
        "position": "Protege",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "givennames": "Dave",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "documentsandphotos": [
          {
            "documentid": "JSYqUyxRPEwgCg==",
            "sizeinbytes": "8383023",
            "uploadeddatetime": "2020/06/25 03:53:28",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-TQI-original?expires=1705286187&signature=3330EEAC4A29727F3416E103F31A2901043A49C9EF1E7935E000270BDAE85EFC",
            "name": "DaveFiloni-D23Expo2019.png"
          }
        ],
        "userid": "JCQ6UyxRUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "dave.filoni",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Mayhew",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/16 04:48:23",
        "email": "bradley.bristowstagg@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/16",
        "position": "Wookiee",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "givennames": "Peter",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "documentsandphotos": [
          {
            "documentid": "JSYqUyxRPEggCg==",
            "sizeinbytes": "656180",
            "uploadeddatetime": "2020/06/25 03:51:27",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-TQW-original?expires=1705286187&signature=15C03085C7570FF9A97B2F84C54DACD54F73137B0334567E7A9A8BE7ED974837",
            "name": "Peter_Mayhew_2015.jpg"
          }
        ],
        "userid": "JCQqQyRQUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "peter.mayhew1",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "permissiongroups": [],
        "surname": "Howlett III",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/23 02:46:15",
        "email": "bradley@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/23",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2020/08/19",
        "givennames": "James",
        "lastupdateddatetimeutc": "2020/08/19 04:35:30",
        "documentsandphotos": [
          {
            "documentid": "JSYqUyxRPEQgCg==",
            "sizeinbytes": "1710462",
            "uploadeddatetime": "2020/06/25 03:50:26",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-TQU-original?expires=1705286187&signature=B2BF6AB12629B90BF4E1F7C49F81BDDBC7EA9CDB8561A4E236A1F011E2F4F83C",
            "name": "JamesHowlettIII.png"
          }
        ],
        "userid": "JCQqQyFRQCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "james.howlett",
        "archived": "false",
        "fax": "",
        "mobile": "0412 345 678"
      },
      {
        "permissiongroups": [],
        "surname": "Nesbitt",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2020/06/30 04:34:06",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2020/06/30",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/03/01",
        "givennames": "James",
        "lastupdateddatetimeutc": "2021/03/01 22:43:32",
        "documentsandphotos": [],
        "userid": "JSc6LyBQPEQgCg==",
        "accesstype": "Use Permission Groups",
        "username": "james.newsbitt",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Zorah",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/05/20 22:55:47",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2021/05/20",
        "position": "",
        "notes": [],
        "lastupdatedutc": "",
        "givennames": "Tali",
        "lastupdateddatetimeutc": " ",
        "documentsandphotos": [],
        "userid": "JScqVyRRPFwgCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.zorah",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Normandy",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/10/21 01:04:00",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2021/10/21",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/10/26",
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2021/10/26 03:18:32",
        "documentsandphotos": [],
        "userid": "JSdaRyJQPEwgCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.normandy",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Support",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/12/20 04:08:58",
        "email": "integration-testing@zapier.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2021/12/20",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/11/16",
        "givennames": "Zapier",
        "lastupdateddatetimeutc": "2022/11/16 21:21:00",
        "documentsandphotos": [],
        "userid": "JSdaXyNRPFAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "integration-testing@zapier.com",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "May",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2022/02/24 22:41:53",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2022/02/24",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/02/24",
        "givennames": "James",
        "lastupdateddatetimeutc": "2022/02/24 22:41:54",
        "documentsandphotos": [],
        "userid": "JSdaUyNQXFAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "captain.slow",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Zorah vas Normandy",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2023/11/27 22:36:16",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2023/11/27 22:36:17",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEslCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.normandy1",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "vas Normandy",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:40:52",
        "email": "tali.zorah@normandy.n7",
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:40:52",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEskCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.zorah@normandy",
        "archived": "false",
        "fax": "",
        "mobile": "0400 000 000"
      },
      {
        "permissiongroups": [],
        "surname": "Zorah",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:43:16",
        "email": "tali.zorah@normandy.n7",
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:43:16",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEsnCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.zorah@normandy.n7",
        "archived": "false",
        "fax": "",
        "mobile": "0400 000 000"
      }
    ],
    "currentpageresults": 12
  }
}
```


### JOIN notes

**Authorization:** bearer


---

### GET Get Users and Notes

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users. Without including any WHERE clauses, the API will apply a last 30 days filter by default.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|createdutc|>|2001-01-01')
        ,'join=' + encodeURIComponent('notes')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users and Notes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 4,
    "queryresponsetimes": {
      "notes": 2,
      "users": 2
    },
    "users": [
      {
        "permissiongroups": [],
        "surname": "Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/06/19 04:53:46",
        "email": "bradley.bristowstagg@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/06/19",
        "position": "Commander",
        "notes": [
          {
            "filter": "Internal Only",
            "timeposted": "Jan 15, 2024 1:36:56 PM",
            "noteid": "JCYqTyBRUCAgCg==",
            "content": "<p>Blah blah blah. This is a User Note.</p>",
            "dateposted": "2024/01/15",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            }
          }
        ],
        "lastupdatedutc": "2023/05/23",
        "givennames": "Commander",
        "lastupdateddatetimeutc": "2023/05/23 23:28:15",
        "documentsandphotos": [],
        "userid": "JCQ6XyRRUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "Bradley.Sandbox",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "permissiongroups": [],
        "surname": "Filoni",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/07/24 05:19:20",
        "email": "david.mcdonald@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/07/24",
        "position": "Protege",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "givennames": "Dave",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "documentsandphotos": [],
        "userid": "JCQ6UyxRUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "dave.filoni",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Mayhew",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/16 04:48:23",
        "email": "bradley.bristowstagg@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/16",
        "position": "Wookiee",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "givennames": "Peter",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "documentsandphotos": [],
        "userid": "JCQqQyRQUCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "peter.mayhew1",
        "archived": "false",
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "permissiongroups": [],
        "surname": "Howlett III",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/23 02:46:15",
        "email": "bradley@aroflo.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/23",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2020/08/19",
        "givennames": "James",
        "lastupdateddatetimeutc": "2020/08/19 04:35:30",
        "documentsandphotos": [],
        "userid": "JCQqQyFRQCAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "james.howlett",
        "archived": "false",
        "fax": "",
        "mobile": "0412 345 678"
      },
      {
        "permissiongroups": [],
        "surname": "Nesbitt",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2020/06/30 04:34:06",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2020/06/30",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/03/01",
        "givennames": "James",
        "lastupdateddatetimeutc": "2021/03/01 22:43:32",
        "documentsandphotos": [],
        "userid": "JSc6LyBQPEQgCg==",
        "accesstype": "Use Permission Groups",
        "username": "james.newsbitt",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Zorah",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/05/20 22:55:47",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2021/05/20",
        "position": "",
        "notes": [],
        "lastupdatedutc": "",
        "givennames": "Tali",
        "lastupdateddatetimeutc": " ",
        "documentsandphotos": [],
        "userid": "JScqVyRRPFwgCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.zorah",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Normandy",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/10/21 01:04:00",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2021/10/21",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/10/26",
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2021/10/26 03:18:32",
        "documentsandphotos": [],
        "userid": "JSdaRyJQPEwgCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.normandy",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Support",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/12/20 04:08:58",
        "email": "integration-testing@zapier.com",
        "email2": "",
        "customfields": [],
        "createdutc": "2021/12/20",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/11/16",
        "givennames": "Zapier",
        "lastupdateddatetimeutc": "2022/11/16 21:21:00",
        "documentsandphotos": [],
        "userid": "JSdaXyNRPFAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "integration-testing@zapier.com",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "May",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2022/02/24 22:41:53",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2022/02/24",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/02/24",
        "givennames": "James",
        "lastupdateddatetimeutc": "2022/02/24 22:41:54",
        "documentsandphotos": [],
        "userid": "JSdaUyNQXFAgCg==",
        "accesstype": "Use Permission Groups",
        "username": "captain.slow",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "Zorah vas Normandy",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2023/11/27 22:36:16",
        "email": "",
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2023/11/27 22:36:17",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEslCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.normandy1",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "permissiongroups": [],
        "surname": "vas Normandy",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:40:52",
        "email": "tali.zorah@normandy.n7",
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:40:52",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEskCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.zorah@normandy",
        "archived": "false",
        "fax": "",
        "mobile": "0400 000 000"
      },
      {
        "permissiongroups": [],
        "surname": "Zorah",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:43:16",
        "email": "tali.zorah@normandy.n7",
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:43:16",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEsnCg==",
        "accesstype": "Use Permission Groups",
        "username": "tali.zorah@normandy.n7",
        "archived": "false",
        "fax": "",
        "mobile": "0400 000 000"
      }
    ],
    "currentpageresults": 12
  }
}
```


### JOIN trackingcentredefaults

**Authorization:** bearer


---

### GET Get Users and trackingcentredefaults

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users. Without including any WHERE clauses, the API will apply a last 30 days filter by default.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|createdutc|>|2001-01-01')
        ,'join=' + encodeURIComponent('trackingcentredefaults')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users and trackingcentredefaults (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 14,
    "queryresponsetimes": {
      "CONTACTS": 147,
      "users": 61
    },
    "users": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/06/19 04:53:46",
        "email": "bradley.bristowstagg@aroflo.com",
        "position": "Commander",
        "notes": [],
        "lastupdatedutc": "2024/05/15",
        "documentsandphotos": [],
        "userid": "JCQ6XyRRUCAgCg==",
        "username": "Bradley.Sandbox",
        "surname": "Shepard",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Commander",
          "positionid": "JCYqVyNRQCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/06/19",
        "trackingcentredefaults": [
          {
            "labourtrackingcentrename": "Labour",
            "labourtrackingcentreid": "JCYqQyRSQCAgCg=="
          }
        ],
        "givennames": "Commander",
        "lastupdateddatetimeutc": "2024/05/15 01:46:30",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/07/24 05:19:20",
        "email": "david.mcdonald@aroflo.com",
        "position": "Protege",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQ6UyxRUCAgCg==",
        "username": "dave.filoni",
        "surname": "Filoni",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Protege",
          "positionid": "JCYqVyNQMCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/07/24",
        "trackingcentredefaults": [],
        "givennames": "Dave",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/16 04:48:23",
        "email": "bradley.bristowstagg@aroflo.com",
        "position": "Wookiee",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQqQyRQUCAgCg==",
        "username": "peter.mayhew1",
        "surname": "Mayhew",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Wookiee",
          "positionid": "JCYqVyNQICAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/16",
        "trackingcentredefaults": [],
        "givennames": "Peter",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/23 02:46:15",
        "email": "bradley@aroflo.com",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2020/08/19",
        "documentsandphotos": [],
        "userid": "JCQqQyFRQCAgCg==",
        "username": "james.howlett",
        "surname": "Howlett III",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/23",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2020/08/19 04:35:30",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0412 345 678"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2020/06/30 04:34:06",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/03/01",
        "documentsandphotos": [],
        "userid": "JSc6LyBQPEQgCg==",
        "username": "james.newsbitt",
        "surname": "Nesbitt",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2020/06/30",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2021/03/01 22:43:32",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/05/20 22:55:47",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "",
        "documentsandphotos": [],
        "userid": "JScqVyRRPFwgCg==",
        "username": "tali.zorah",
        "surname": "Zorah",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/05/20",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": " ",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/10/21 01:04:00",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/10/26",
        "documentsandphotos": [],
        "userid": "JSdaRyJQPEwgCg==",
        "username": "tali.normandy",
        "surname": "Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/10/21",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2021/10/26 03:18:32",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/12/20 04:08:58",
        "email": "integration-testing@zapier.com",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/11/16",
        "documentsandphotos": [],
        "userid": "JSdaXyNRPFAgCg==",
        "username": "integration-testing@zapier.com",
        "surname": "Support",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/12/20",
        "trackingcentredefaults": [],
        "givennames": "Zapier",
        "lastupdateddatetimeutc": "2022/11/16 21:21:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2022/02/24 22:41:53",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/02/24",
        "documentsandphotos": [],
        "userid": "JSdaUyNQXFAgCg==",
        "username": "captain.slow",
        "surname": "May",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2022/02/24",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2022/02/24 22:41:54",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2023/11/27 22:36:16",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEslCg==",
        "username": "tali.normandy1",
        "surname": "Zorah vas Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2023/11/27 22:36:17",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:40:52",
        "email": "tali.zorah@normandy.n7",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEskCg==",
        "username": "tali.zorah@normandy",
        "surname": "vas Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:40:52",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0400 000 000"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:43:16",
        "email": "tali.zorah@normandy.n7",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEsnCg==",
        "username": "tali.zorah@normandy.n7",
        "surname": "Zorah",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:43:16",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0400 000 000"
      }
    ],
    "currentpageresults": 12
  }
}
```


### JOIN featureaccess

**Authorization:** bearer


---

### GET Get Users and featureaccess

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users. Without including any WHERE clauses, the API will apply a last 30 days filter by default.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|createdutc|>|2001-01-01')
        ,'join=' + encodeURIComponent('featureaccess')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users and featureaccess (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1280,
    "queryresponsetimes": {
      "CONTACTS": 83,
      "users": 149
    },
    "users": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/06/19 04:53:46",
        "email": "bradley.bristowstagg@aroflo.com",
        "position": "Commander",
        "notes": [],
        "lastupdatedutc": "2024/05/15",
        "documentsandphotos": [],
        "userid": "JCQ6XyRRUCAgCg==",
        "username": "Bradley.Sandbox",
        "surname": "Shepard",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Commander",
          "positionid": "JCYqVyNRQCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/06/19",
        "trackingcentredefaults": [],
        "givennames": "Commander",
        "lastupdateddatetimeutc": "2024/05/15 01:46:30",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [
          {
            "featureid": "ISYgICAK",
            "featurevalue": "TRUE",
            "featureDisplayName": "Integration Menu"
          },
          {
            "featureid": "ISZQICAK",
            "featurevalue": "",
            "featureDisplayName": "Edit Task Notes"
          },
          {
            "featureid": "ISZAICAK",
            "featurevalue": "Limited",
            "featureDisplayName": "Quote Access"
          },
          {
            "featureid": "IScwICAK",
            "featurevalue": "Overall Totals",
            "featureDisplayName": "Quote Pricing Visibility"
          },
          {
            "featureid": "IScgICAK",
            "featurevalue": "Limited",
            "featureDisplayName": "Purchase Order Access"
          },
          {
            "featureid": "ISdQICAK",
            "featurevalue": "TRUE",
            "featureDisplayName": "Allow Viewing Clients"
          },
          {
            "featureid": "ISdAICAK",
            "featurevalue": "TRUE",
            "featureDisplayName": "Allow Creating Clients"
          },
          {
            "featureid": "ISQwICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Individual Calendar Settings per Business Unit"
          },
          {
            "featureid": "ISQgICAK",
            "featurevalue": "",
            "featureDisplayName": "Default Field Schedule Event Type Filter"
          },
          {
            "featureid": "IiYqTCAK",
            "featurevalue": "",
            "featureDisplayName": "Timesheet Resource List"
          },
          {
            "featureid": "IiYqRCAK",
            "featurevalue": "TRUE",
            "featureDisplayName": "Site Administrator Access"
          },
          {
            "featureid": "IiYqQCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Reset password through \"Forgot Password?\""
          },
          {
            "featureid": "IiYqXCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Do not show as Inventory Stock Location"
          }
        ],
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/07/24 05:19:20",
        "email": "david.mcdonald@aroflo.com",
        "position": "Protege",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQ6UyxRUCAgCg==",
        "username": "dave.filoni",
        "surname": "Filoni",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Protege",
          "positionid": "JCYqVyNQMCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/07/24",
        "trackingcentredefaults": [],
        "givennames": "Dave",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [
          {
            "featureid": "ISYgICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Integration Menu"
          },
          {
            "featureid": "ISZQICAK",
            "featurevalue": "All Task Notes",
            "featureDisplayName": "Edit Task Notes"
          },
          {
            "featureid": "ISZAICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Access"
          },
          {
            "featureid": "IScwICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Pricing Visibility"
          },
          {
            "featureid": "IScgICAK",
            "featurevalue": "",
            "featureDisplayName": "Purchase Order Access"
          },
          {
            "featureid": "ISdQICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Allow Viewing Clients"
          },
          {
            "featureid": "ISdAICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Allow Creating Clients"
          },
          {
            "featureid": "ISQwICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Individual Calendar Settings per Business Unit"
          },
          {
            "featureid": "ISQgICAK",
            "featurevalue": "",
            "featureDisplayName": "Default Field Schedule Event Type Filter"
          },
          {
            "featureid": "IiYqTCAK",
            "featurevalue": "",
            "featureDisplayName": "Timesheet Resource List"
          },
          {
            "featureid": "IiYqRCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Site Administrator Access"
          },
          {
            "featureid": "IiYqQCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Reset password through \"Forgot Password?\""
          }
        ],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/16 04:48:23",
        "email": "bradley.bristowstagg@aroflo.com",
        "position": "Wookiee",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQqQyRQUCAgCg==",
        "username": "peter.mayhew1",
        "surname": "Mayhew",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Wookiee",
          "positionid": "JCYqVyNQICAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/16",
        "trackingcentredefaults": [],
        "givennames": "Peter",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [
          {
            "featureid": "ISZQICAK",
            "featurevalue": "",
            "featureDisplayName": "Edit Task Notes"
          },
          {
            "featureid": "ISZAICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Access"
          },
          {
            "featureid": "IScwICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Pricing Visibility"
          },
          {
            "featureid": "IScgICAK",
            "featurevalue": "",
            "featureDisplayName": "Purchase Order Access"
          },
          {
            "featureid": "ISdQICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Allow Viewing Clients"
          },
          {
            "featureid": "ISdAICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Allow Creating Clients"
          },
          {
            "featureid": "ISQwICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Individual Calendar Settings per Business Unit"
          },
          {
            "featureid": "ISQgICAK",
            "featurevalue": "",
            "featureDisplayName": "Default Field Schedule Event Type Filter"
          },
          {
            "featureid": "IiYqTCAK",
            "featurevalue": "",
            "featureDisplayName": "Timesheet Resource List"
          },
          {
            "featureid": "IiYqRCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Site Administrator Access"
          },
          {
            "featureid": "IiYqQCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Reset password through \"Forgot Password?\""
          }
        ],
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/23 02:46:15",
        "email": "bradley@aroflo.com",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2020/08/19",
        "documentsandphotos": [],
        "userid": "JCQqQyFRQCAgCg==",
        "username": "james.howlett",
        "surname": "Howlett III",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/23",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2020/08/19 04:35:30",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [
          {
            "featureid": "ISZQICAK",
            "featurevalue": "",
            "featureDisplayName": "Edit Task Notes"
          },
          {
            "featureid": "IScwICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Pricing Visibility"
          },
          {
            "featureid": "ISQwICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Individual Calendar Settings per Business Unit"
          },
          {
            "featureid": "ISQgICAK",
            "featurevalue": "",
            "featureDisplayName": "Default Field Schedule Event Type Filter"
          },
          {
            "featureid": "IiYqRCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Site Administrator Access"
          },
          {
            "featureid": "IiYqQCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Reset password through \"Forgot Password?\""
          }
        ],
        "fax": "",
        "mobile": "0412 345 678"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2020/06/30 04:34:06",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/03/01",
        "documentsandphotos": [],
        "userid": "JSc6LyBQPEQgCg==",
        "username": "james.newsbitt",
        "surname": "Nesbitt",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2020/06/30",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2021/03/01 22:43:32",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [
          {
            "featureid": "ISZQICAK",
            "featurevalue": "",
            "featureDisplayName": "Edit Task Notes"
          },
          {
            "featureid": "IScwICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Pricing Visibility"
          },
          {
            "featureid": "ISQwICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Individual Calendar Settings per Business Unit"
          },
          {
            "featureid": "ISQgICAK",
            "featurevalue": "",
            "featureDisplayName": "Default Field Schedule Event Type Filter"
          },
          {
            "featureid": "IiYqRCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Site Administrator Access"
          },
          {
            "featureid": "IiYqQCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Reset password through \"Forgot Password?\""
          }
        ],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/05/20 22:55:47",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "",
        "documentsandphotos": [],
        "userid": "JScqVyRRPFwgCg==",
        "username": "tali.zorah",
        "surname": "Zorah",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/05/20",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": " ",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/10/21 01:04:00",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/10/26",
        "documentsandphotos": [],
        "userid": "JSdaRyJQPEwgCg==",
        "username": "tali.normandy",
        "surname": "Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/10/21",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2021/10/26 03:18:32",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/12/20 04:08:58",
        "email": "integration-testing@zapier.com",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/11/16",
        "documentsandphotos": [],
        "userid": "JSdaXyNRPFAgCg==",
        "username": "integration-testing@zapier.com",
        "surname": "Support",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/12/20",
        "trackingcentredefaults": [],
        "givennames": "Zapier",
        "lastupdateddatetimeutc": "2022/11/16 21:21:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [
          {
            "featureid": "ISYgICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Integration Menu"
          },
          {
            "featureid": "ISZQICAK",
            "featurevalue": "All Task Notes",
            "featureDisplayName": "Edit Task Notes"
          },
          {
            "featureid": "ISZAICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Access"
          },
          {
            "featureid": "IScwICAK",
            "featurevalue": "",
            "featureDisplayName": "Quote Pricing Visibility"
          },
          {
            "featureid": "IScgICAK",
            "featurevalue": "",
            "featureDisplayName": "Purchase Order Access"
          },
          {
            "featureid": "ISdQICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Allow Viewing Clients"
          },
          {
            "featureid": "ISdAICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Allow Creating Clients"
          },
          {
            "featureid": "ISQwICAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Individual Calendar Settings per Business Unit"
          },
          {
            "featureid": "ISQgICAK",
            "featurevalue": "",
            "featureDisplayName": "Default Field Schedule Event Type Filter"
          },
          {
            "featureid": "IiYqTCAK",
            "featurevalue": "",
            "featureDisplayName": "Timesheet Resource List"
          },
          {
            "featureid": "IiYqRCAK",
            "featurevalue": "TRUE",
            "featureDisplayName": "Site Administrator Access"
          },
          {
            "featureid": "IiYqQCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Reset password through \"Forgot Password?\""
          },
          {
            "featureid": "IiYqXCAK",
            "featurevalue": "FALSE",
            "featureDisplayName": "Do not show as Inventory Stock Location"
          }
        ],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2022/02/24 22:41:53",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/02/24",
        "documentsandphotos": [],
        "userid": "JSdaUyNQXFAgCg==",
        "username": "captain.slow",
        "surname": "May",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2022/02/24",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2022/02/24 22:41:54",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2023/11/27 22:36:16",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEslCg==",
        "username": "tali.normandy1",
        "surname": "Zorah vas Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2023/11/27 22:36:17",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:40:52",
        "email": "tali.zorah@normandy.n7",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEskCg==",
        "username": "tali.zorah@normandy",
        "surname": "vas Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:40:52",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0400 000 000"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:43:16",
        "email": "tali.zorah@normandy.n7",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEsnCg==",
        "username": "tali.zorah@normandy.n7",
        "surname": "Zorah",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:43:16",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0400 000 000"
      }
    ],
    "currentpageresults": 12
  }
}
```


---

### POST Update Users "Reset Password through Forgot Password"

`POST http://api.aroflo.com/`

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('JCQqQyRQUCAgCg==<![CDATA[ 04XX XXX XXX ]]>')
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
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('<users><user><userid>JCQ6XyRRUCAgCg==</userid><featureaccess><feature><featureid>IiYqQCAK</featureid><featurevalue>true</featurevalue></feature></featureaccess></user></users>')
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

#### Update Users "Reset Password through Forgot Password" (OK 200)

```xml
<imsapi>
    <status>0</status>
    <statusmessage>Login OK</statusmessage>
    <zoneresponse>
        <postresults>
            <updatetotal>1</updatetotal>
            <errors></errors>
            <updates>
                <users>
                    <user>
                        <userid>JCQ6XyRRUCAgCg==</userid>
                        <featureaccess>
                            <featureacces>
                                <featureid>IiYqQCAK</featureid>
                                <featurevalue>TRUE</featurevalue>
                            </featureacces>
                        </featureaccess>
                    </user>
                </users>
            </updates>
            <inserttotal>0</inserttotal>
            <inserts>
                <users></users>
            </inserts>
        </postresults>
    </zoneresponse>
</imsapi>
```


---

### GET Get Users

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users. Without including any WHERE clauses, the API will apply a last 30 days filter by default.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|createdutc|>|2001-01-01')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 8,
    "queryresponsetimes": {
      "users": 57
    },
    "users": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/06/19 04:53:46",
        "email": "bradley.bristowstagg@aroflo.com",
        "position": "Commander",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQ6XyRRUCAgCg==",
        "username": "Bradley.Sandbox",
        "surname": "Shepard",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Commander",
          "positionid": "JCYqVyNRQCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/06/19",
        "trackingcentredefaults": [],
        "givennames": "Commander",
        "lastupdateddatetimeutc": "2023/05/23 23:28:15",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/07/24 05:19:20",
        "email": "david.mcdonald@aroflo.com",
        "position": "Protege",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQ6UyxRUCAgCg==",
        "username": "dave.filoni",
        "surname": "Filoni",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Protege",
          "positionid": "JCYqVyNQMCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/07/24",
        "trackingcentredefaults": [],
        "givennames": "Dave",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/16 04:48:23",
        "email": "bradley.bristowstagg@aroflo.com",
        "position": "Wookiee",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQqQyRQUCAgCg==",
        "username": "peter.mayhew1",
        "surname": "Mayhew",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Wookiee",
          "positionid": "JCYqVyNQICAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/16",
        "trackingcentredefaults": [],
        "givennames": "Peter",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "04XX XXX XXX"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/10/23 02:46:15",
        "email": "bradley@aroflo.com",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2020/08/19",
        "documentsandphotos": [],
        "userid": "JCQqQyFRQCAgCg==",
        "username": "james.howlett",
        "surname": "Howlett III",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/10/23",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2020/08/19 04:35:30",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0412 345 678"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2020/06/30 04:34:06",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/03/01",
        "documentsandphotos": [],
        "userid": "JSc6LyBQPEQgCg==",
        "username": "james.newsbitt",
        "surname": "Nesbitt",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2020/06/30",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2021/03/01 22:43:32",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/05/20 22:55:47",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "",
        "documentsandphotos": [],
        "userid": "JScqVyRRPFwgCg==",
        "username": "tali.zorah",
        "surname": "Zorah",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/05/20",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": " ",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/10/21 01:04:00",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2021/10/26",
        "documentsandphotos": [],
        "userid": "JSdaRyJQPEwgCg==",
        "username": "tali.normandy",
        "surname": "Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/10/21",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2021/10/26 03:18:32",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2021/12/20 04:08:58",
        "email": "integration-testing@zapier.com",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/11/16",
        "documentsandphotos": [],
        "userid": "JSdaXyNRPFAgCg==",
        "username": "integration-testing@zapier.com",
        "surname": "Support",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2021/12/20",
        "trackingcentredefaults": [],
        "givennames": "Zapier",
        "lastupdateddatetimeutc": "2022/11/16 21:21:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2022/02/24 22:41:53",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2022/02/24",
        "documentsandphotos": [],
        "userid": "JSdaUyNQXFAgCg==",
        "username": "captain.slow",
        "surname": "May",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2022/02/24",
        "trackingcentredefaults": [],
        "givennames": "James",
        "lastupdateddatetimeutc": "2022/02/24 22:41:54",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2023/11/27 22:36:16",
        "email": "",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEslCg==",
        "username": "tali.normandy1",
        "surname": "Zorah vas Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali",
        "lastupdateddatetimeutc": "2023/11/27 22:36:17",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:40:52",
        "email": "tali.zorah@normandy.n7",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEskCg==",
        "username": "tali.zorah@normandy",
        "surname": "vas Normandy",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:40:52",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0400 000 000"
      },
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "03 9259 5200",
        "createddatetimeutc": "2023/11/27 22:43:16",
        "email": "tali.zorah@normandy.n7",
        "position": "",
        "notes": [],
        "lastupdatedutc": "2023/11/27",
        "documentsandphotos": [],
        "userid": "JiYqVyxQLEsnCg==",
        "username": "tali.zorah@normandy.n7",
        "surname": "Zorah",
        "permissiongroups": [],
        "userposition": {
          "positionname": "",
          "positionid": ""
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2023/11/27",
        "trackingcentredefaults": [],
        "givennames": "Tali Zorah",
        "lastupdateddatetimeutc": "2023/11/27 22:43:16",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "0400 000 000"
      }
    ],
    "currentpageresults": 12
  }
}
```


---

### GET Get Users with set position

`GET https://api.aroflo.com/{{urlVarString}}`

Get all of the active users with a user position `Protege`.

if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
j        ,'where=' + encodeURIComponent('and|position|=|Protege')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|position|=|Protege')
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
        'zone=' + encodeURIComponent('users')
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

#### Get Users with set position (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "users": 78
    },
    "users": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/07/24 05:19:20",
        "email": "david.mcdonald@aroflo.com",
        "position": "Protege",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQ6UyxRUCAgCg==",
        "username": "dave.filoni",
        "surname": "Filoni",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Protege",
          "positionid": "JCYqVyNQMCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/07/24",
        "trackingcentredefaults": [],
        "givennames": "Dave",
        "lastupdateddatetimeutc": "2023/05/23 23:28:00",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": ""
      }
    ],
    "currentpageresults": 1
  }
}
```


---

### GET Get a specific User

`GET https://api.aroflo.com/{{urlVarString}}`

Return the data for a particular ``

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|userid|=|JCQqQyFRQCAgCg==')
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
        'zone=' + encodeURIComponent('users')
        ,'where=' + encodeURIComponent('and|userid|=|JCQ6XyRRUCAgCg==')
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
        'zone=' + encodeURIComponent('users')
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

#### Get a specific User (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "users": 31
    },
    "users": [
      {
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "phone": "",
        "createddatetimeutc": "2018/06/19 04:53:46",
        "email": "bradley.bristowstagg@aroflo.com",
        "position": "Commander",
        "notes": [],
        "lastupdatedutc": "2023/05/23",
        "documentsandphotos": [],
        "userid": "JCQ6XyRRUCAgCg==",
        "username": "Bradley.Sandbox",
        "surname": "Shepard",
        "permissiongroups": [],
        "userposition": {
          "positionname": "Commander",
          "positionid": "JCYqVyNRQCAgCg=="
        },
        "email2": "",
        "customfields": [],
        "createdutc": "2018/06/19",
        "trackingcentredefaults": [],
        "givennames": "Commander",
        "lastupdateddatetimeutc": "2023/05/23 23:28:15",
        "accesstype": "Use Permission Groups",
        "archived": "false",
        "featureaccess": [],
        "fax": "",
        "mobile": "04XX XXX XXX"
      }
    ],
    "currentpageresults": 1
  }
}
```


---

### POST Create User

`POST http://api.aroflo.com/`

Create a new user. Multiple users can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('JamesNesbittjames.newsbittmyultrastrongpasswordthatwillneverbebrokenBaseJCdKUyZRMCAgCg==')
    ];
    formVarString = formVarString.join('&');
}

```
If you do not supply a `permissiongroup` entry, the user will be set to the AroFlo default Permission Group `Worker`.

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
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('<users><user><givennames>Tali</givennames><surname>Normandy</surname><username>tali.normandy</username><password>myultrastrongpasswordthatwillneverbebroken</password><accesstype>Use Permission Groups</accesstype><org><orgid>JCdKUyZRMCAgCg==</orgid></org></user></users>')
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

#### Create User (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "users": []
      },
      "inserttotal": 1,
      "inserts": {
        "users": [
          {
            "surname": "Normandy",
            "givennames": "Tali",
            "password": "myultrastrongpasswordthatwillneverbebroken",
            "org": {
              "orgid": "JCdKUyZRMCAgCg=="
            },
            "accesstype": "Use Permission Groups",
            "userid": "JSdaRyJQPEwgCg==",
            "username": "tali.normandy"
          }
        ]
      }
    }
  }
}
```


---

### POST Update Users mobile number

`POST http://api.aroflo.com/`

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('JCQqQyRQUCAgCg==<![CDATA[ 04XX XXX XXX ]]>')
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
        'zone=' + encodeURIComponent('users')
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
        'zone=' + encodeURIComponent('users')
        ,'postxml=' + encodeURIComponent('<users><user><userid>JCQ6XyRRUCAgCg==</userid><mobile><![CDATA[ 04XX XXX XXX ]]></mobile></user></users>')
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

#### Update Users mobile number (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "users": [
          {
            "userid": "JCQ6XyRRUCAgCg==",
            "mobile": "04XX XXX XXX"
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "users": []
      }
    }
  }
}
```

