# Assets

This zone allows listing, updating and creation of new [assets](https://) for your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| assetid | AroFlo ID |
| category | STRING |
| assetname | STRING |
| ordercode | STRING |
| customerid | STRING |
| serialnumber | STRING |
| lastupdateutc | DATE(YYYY-MM-DD) |
| lastupdatedatetimeutc | DATE(YYYY-MM-DD hh:mm:ss) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND DateCreated > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| customfields |
| location |
| locationcustomfields |

## POSTXML Variable definition

<assets>
    <asset>
        <assetid>AroFlo ID</assetid>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE required    -->
        <assetname><![CDATA[ STRING(50) ]]></assetname>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required / UPDATE yes    -->
        <ordercode><![CDATA[ STRING(50) ]]></ordercode>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required / UPDATE yes    -->
        <customerid><![CDATA[ STRING(50) ]]></customerid>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <modelnumber><![CDATA[ STRING(50) ]]></modelnumber>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <serialnumber><![CDATA[ STRING(100) ]]></serialnumber>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <barcode><![CDATA[ STRING(100) ]]></barcode>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <manufacturer><![CDATA[ STRING(50) ]]></manufacturer>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <supplier><![CDATA[ STRING(50) ]]></supplier>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <odo>INT</odo>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <odotype><![CDATA[ STRING(10) ]]>(N/A,Kms,Hrs,Miles)</odotype>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <cost>FLOAT</cost>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes    -->
        <quantity>INT</quantity>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes    -->
        <datecreated>(DATE YYYY-MM-DD)</datecreated> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        <category>
            <categoryid>AroFlo ID</categoryid>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required / UPDATE yes    -->
        </category>
        <org>
            <orgid>AroFlo ID</orgid>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE no    -->
        </org>
        <client>
            <clientid>AroFlo ID</clientid>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE no    -->
        </client>
        <location>
            <locationid>AroFlo ID</locationid>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
        </location>
        <customfields>
            <customfield>
                <fieldid>AroFlo ID</fieldid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes    -->
                <name><![CDATA[ STRING(50) ]]></name> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes    -->
                <type><![CDATA[ STRING(50) ]]></type> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes (text, numeric, Datefield, checkbox, radio, Select, textarea)    -->
                <value>
                     ]]>
                    <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes
                        <type> = &#x27;checkbox&#x27; then value is TRUE or FALSE
                        <type> = &#x27;datefield&#x27; then value is a valid date in format &#x27;YYYY-MM-DD&#x27;
                        <type> = all other types then <![CDATA[ string(2000) ]]>
                       -->
                </value>
            </customfield>
        </customfields>
        <archive>BOOLEAN</archive> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes    -->
    </asset>
</assets>

**Authorization:** bearer


### JOIN location

**Authorization:** bearer


---

### GET Get Assets with Location

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
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('assets')
        ,'where=' + encodeURIComponent('and|category|=|Split Systems')
        ,'join=' + encodeURIComponent('location')
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
        'zone=' + encodeURIComponent('assets')
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

#### Get Assets with Location (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "assets": [
      {
        "location": {
          "locationid": "JSc6QyVRXFwgCg==",
          "gpslat": "-33.8708464",
          "postcode": "2000",
          "SiteContact": "",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "SiteEmail": "",
          "customfields": [],
          "locationname": "HMAS Sydney",
          "country": "AUSTRALIA",
          "gpslong": "151.20733",
          "address": "Pier 2, Harbour 4",
          "archived": "false",
          "SitePhone": ""
        },
        "odotype": "Kms",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "Turbo Busa",
        "cost": "0.0000",
        "lastupdatedutc": "2022/09/12",
        "customerid": "",
        "category": {
          "categoryid": "IyQqKycK",
          "categoryname": "Vehicles"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCdaXyZQICAgCg==",
        "customfields": [],
        "manufacturer": "",
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "lastupdateddatetimeutc": "2022/09/12 01:09:29",
        "archived": "false",
        "datecreated": "2022/09/12"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "assets": 5,
      "location": 1
    },
    "currentpageresults": 1
  }
}
```


### JOIN customfields

**Authorization:** bearer


---

### GET Get Assets with Customfields

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
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('assets')
        ,'where=' + encodeURIComponent('and|category|=|Split Systems')
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
        'zone=' + encodeURIComponent('assets')
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

#### Get Assets with Customfields (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "assets": [
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "0076750189555",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "MSZGL25VGDKIT",
        "assetid": "JCYqWyNSUCAgCg==",
        "customfields": [
          {
            "fieldid": "35081",
            "value": "",
            "archived": "false",
            "type": "Datefield",
            "name": "Warranty Date"
          }
        ],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2018/10/23"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqWy1RICAgCg==",
        "customfields": [
          {
            "fieldid": "35082",
            "value": "",
            "archived": "false",
            "type": "Datefield",
            "name": "Warranty Date"
          }
        ],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqVyRQMCAgCg==",
        "customfields": [
          {
            "fieldid": "35083",
            "value": "",
            "archived": "false",
            "type": "Datefield",
            "name": "Warranty Date"
          }
        ],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "aa",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqUyNRQCAgCg==",
        "customfields": [
          {
            "fieldid": "35084",
            "value": "",
            "archived": "false",
            "type": "Datefield",
            "name": "Warranty Date"
          }
        ],
        "manufacturer": "",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2019/05/14"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZaXy1SUCAgCg==",
        "customfields": [
          {
            "fieldid": "35086",
            "value": "",
            "archived": "false",
            "type": "Datefield",
            "name": "Warranty Date"
          }
        ],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2020/01/30"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZaWyRQQCAgCg==",
        "customfields": [
          {
            "fieldid": "35087",
            "value": "",
            "archived": "false",
            "type": "Datefield",
            "name": "Warranty Date"
          }
        ],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2020/01/30"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZKWyVRICAgCg==",
        "customfields": [
          {
            "fieldid": "35088",
            "value": "",
            "archived": "false",
            "type": "Datefield",
            "name": "Warranty Date"
          }
        ],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2020/01/30"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 7,
    "queryresponsetimes": {
      "assets": 28,
      "customfields": 16
    },
    "currentpageresults": 7
  }
}
```


### JOIN notes

**Authorization:** bearer


---

### GET Get Assets with Notes

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
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('assets')
        ,'where=' + encodeURIComponent('and|category|=|Split Systems')
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
        'zone=' + encodeURIComponent('assets')
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

#### Get Assets with Notes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "assets": [
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "0076750189555",
        "assettypes": [],
        "supplier": "",
        "notes": [
          {
            "filter": "Internal Only",
            "timeposted": "May 10, 2024 12:52:30 PM",
            "noteid": "JCZaLydRQCAgCg==",
            "content": "This is a plain note against an asset.",
            "dateposted": "2024/05/10",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            }
          }
        ],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "MSZGL25VGDKIT",
        "assetid": "JCYqWyNSUCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:25:00",
        "archived": "false",
        "datecreated": "2018/10/23"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqWy1RICAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqVyRQMCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:18:45",
        "archived": "false",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "aa",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqUyNRQCAgCg==",
        "customfields": [],
        "manufacturer": "",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:00",
        "archived": "false",
        "datecreated": "2019/05/14"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZaXy1SUCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:15",
        "archived": "false",
        "datecreated": "2020/01/30"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZaWyRQQCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:30",
        "archived": "false",
        "datecreated": "2020/01/30"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZKWyVRICAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:30",
        "archived": "false",
        "datecreated": "2020/01/30"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "assets": 7,
      "notes": 16
    },
    "currentpageresults": 7
  }
}
```


### JOIN documentsandphotos

**Authorization:** bearer


---

### GET Get Assets with documentsandphotos

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
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('assets')
        ,'where=' + encodeURIComponent('and|category|=|Split Systems')
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
        'zone=' + encodeURIComponent('assets')
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

#### Get Assets with documentsandphotos (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "assets": [
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "0076750189555",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [
          {
            "documentid": "JScqWyFRTEAgCg==",
            "sizeinbytes": "31019",
            "uploadeddatetime": "2024/05/10 03:24:41",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-BS8A-original?expires=1715312141&signature=7352C6764A82D91FC1F4B27183F077056C98808886895441D8046C0F4C0AC24F",
            "name": "Mitsubishi-Electric-GL-Series-Product-MUZ-GL.jpg"
          },
          {
            "documentid": "JScqWyFRTEQgCg==",
            "sizeinbytes": "8453",
            "uploadeddatetime": "2024/05/10 03:25:00",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-BS83-original?expires=1715312141&signature=F4EF9E8BE6B1712CD33A531CDB0A9F99D11DBCCF1EA6680E2E6725472836F372",
            "name": "Mitsubishi-Electric-GL-Series-Product-MSZ-GL.jpg"
          }
        ],
        "odo": "0",
        "ordercode": "MSZGL25VGDKIT",
        "assetid": "JCYqWyNSUCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:25:15",
        "archived": "false",
        "datecreated": "2018/10/23"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqWy1RICAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:17:00",
        "archived": "false",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqVyRQMCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:18:45",
        "archived": "false",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "aa",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCYqUyNRQCAgCg==",
        "customfields": [],
        "manufacturer": "",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:00",
        "archived": "false",
        "datecreated": "2019/05/14"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZaXy1SUCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:15",
        "archived": "false",
        "datecreated": "2020/01/30"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZaWyRQQCAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:30",
        "archived": "false",
        "datecreated": "2020/01/30"
      },
      {
        "location": {},
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "assettypes": [],
        "supplier": "",
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System",
        "cost": "0.0000",
        "lastupdatedutc": "2024/05/10",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "ordercode": "",
        "assetid": "JCZKWyVRICAgCg==",
        "customfields": [],
        "manufacturer": "Mitsubishi Electric",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "lastupdateddatetimeutc": "2024/05/10 03:19:30",
        "archived": "false",
        "datecreated": "2020/01/30"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 15,
    "queryresponsetimes": {
      "assets": 0,
      "documentsandphotos": 0
    },
    "currentpageresults": 7
  }
}
```


---

### GET Get Assets

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of assets.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('assets')
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
        'zone=' + encodeURIComponent('assets')
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
        'zone=' + encodeURIComponent('assets')
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

#### Get Assets (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "assets": [
      {
        "location": {},
        "assetid": "JCYqTy1QICAgCg==",
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "90311017",
        "manufacturer": "Toyota",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "notes": [],
        "assetname": "Deisel #1",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "IyZaRyIK",
          "categoryname": "Engine"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "",
        "datecreated": "2018/07/10"
      },
      {
        "location": {},
        "assetid": "JCYqTy1QMCAgCg==",
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "90311024",
        "manufacturer": "",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "notes": [],
        "assetname": "Prop Shaft #1",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "IyZaRyMK",
          "categoryname": "Prop Shafts"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "",
        "datecreated": "2018/07/10"
      },
      {
        "location": {},
        "assetid": "JCYqTy1RQCAgCg==",
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "90311031",
        "manufacturer": "",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "notes": [],
        "assetname": "Propeller #1",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "IyZaRywK",
          "categoryname": "Props"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "",
        "datecreated": "2018/07/10"
      },
      {
        "location": {},
        "assetid": "JCYqSyRQUCAgCg==",
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "90311048",
        "manufacturer": "",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "notes": [],
        "assetname": "Prop #2",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "IyZaRywK",
          "categoryname": "Props"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "1234",
        "datecreated": "2018/07/27"
      },
      {
        "location": {},
        "assetid": "JCYqWyNSUCAgCg==",
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "0076750189555",
        "manufacturer": "Mitsubishi Electric",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "MSZGL25VGDKIT",
        "datecreated": "2018/10/23"
      },
      {
        "location": {},
        "assetid": "JCYqWy1RICAgCg==",
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "manufacturer": "Mitsubishi Electric",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "assetid": "JCYqVyRQMCAgCg==",
        "odotype": "",
        "modelnumber": "MSZGL25VGDKIT",
        "serialnumber": "",
        "quantity": "0",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "manufacturer": "Mitsubishi Electric",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "",
        "datecreated": "2018/11/13"
      },
      {
        "location": {},
        "assetid": "JCYqUyNRQCAgCg==",
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "manufacturer": "",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "notes": [],
        "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
        "cost": "0.0000",
        "customerid": "aa",
        "category": {
          "categoryid": "IyZaVyUK",
          "categoryname": "Split Systems"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "",
        "datecreated": "2019/05/14"
      },
      {
        "location": {},
        "assetid": "JCZaXyRSUCAgCg==",
        "odotype": "",
        "modelnumber": "",
        "serialnumber": "",
        "quantity": "1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "barcode": "",
        "manufacturer": "",
        "customfields": [],
        "supplier": "",
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "notes": [],
        "assetname": "My Broom",
        "cost": "0.0000",
        "customerid": "",
        "category": {
          "categoryid": "Iyc6Wy0K",
          "categoryname": "AroFlo GPS"
        },
        "documentsandphotos": [],
        "odo": "0",
        "archived": "false",
        "ordercode": "",
        "datecreated": "2019/12/13"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "assets": 60
    },
    "currentpageresults": 9
  }
}
```


---

### POST Create Asset

`POST http://api.aroflo.com/`

Create a new asset.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('assets')
        ,'postxml=' + encodeURIComponent('2.5kw/3.2kw Reverse Cycle Inverter Split System Air ConditionerMSZGL25VGDKITMSZGL25VGDKITMitsubishi ElectricIyZaVyUK')
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
        'zone=' + encodeURIComponent('assets')
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
        'zone=' + encodeURIComponent('assets')
        ,'postxml=' + encodeURIComponent('<assets><asset><assetname>2.5kw/3.2kw Reverse Cycle Inverter Split System</assetname><modelnumber>MSZGL25VGDKIT</modelnumber><manufacturer>Mitsubishi Electric</manufacturer><category><categoryid>IyZaVyUK</categoryid></category><datecreated>2020/01/30</datecreated></asset></assets>')
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

#### Create Asset (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "assets": []
      },
      "inserttotal": 1,
      "inserts": {
        "assets": [
          {
            "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System",
            "assetid": "JCZaWyRQQCAgCg==",
            "modelnumber": "MSZGL25VGDKIT",
            "category": {
              "categoryid": "IyZaVyUK"
            },
            "manufacturer": "Mitsubishi Electric",
            "datecreated": "2020/01/30"
          }
        ]
      }
    }
  }
}
```


---

### POST Update an Asset

`POST http://api.aroflo.com/`

Update an existing asset with new data. In this instance we have assigned the asset to a new location

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('assets')
        ,'postxml=' + encodeURIComponent('JCYqWyNSUCAgCg==JSc6QyVRXFwgCg==')
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
        'zone=' + encodeURIComponent('assets')
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
        'zone=' + encodeURIComponent('assets')
        ,'postxml=' + encodeURIComponent('<assets><asset><assetid>JCYqWyNSUCAgCg==</assetid><location><locationid>JSc6QyVRXFwgCg==</locationid></location></asset></assets>')
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

#### Update an Asset (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "assets": [
          {
            "location": {
              "locationid": "JSc6QyVRXFwgCg=="
            },
            "assetid": "JCYqWyNSUCAgCg=="
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "assets": []
      }
    }
  }
}
```

