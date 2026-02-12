# Quotes

This zone is READ ONLY.

Allows you list or return [Quotes](https://help.aroflo.com/display/office/quotes) for your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| quoteid | AROFLO ID |
| quotename | STRING |
| jobnumber | INTEGER |
| status | STRING(in progress, pending approval, approved, rejected) |
| acceptancestatus | STRING(Not Sent, Awaiting Decision, Accepted, Declined, Need More Information) |
| duedate | DATE(YYYY-MM-DD) |
| datetimedue | DATETIME(YYYY-MM-DD HH:mm:ss) |
| dateapproved | DATE(YYYY-MM-DD) |
| datetimeapproved | DATETIME(YYYY-MM-DD HH:mm:ss) |
| createddate | DATE(YYYY-MM-DD) |
| createddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |
| approveddate | DATE(YYYY-MM-DD) |
| approveddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND DateCreated > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| documentsandphotos |
| lineitems |
| notes |
| project |

## ORDER BY

| Field |
| --- |
| quotename |

**Authorization:** bearer


### JOIN documentsandphotos

**Authorization:** bearer


---

### GET Get Quote with documentsandphotos

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of quotes including their documents and photos for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('documentsandphotos')
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
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('documentsandphotos')
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

#### Get Quote with documentsandphotos (OK 200)

```json
{
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "documentsandphotos": 7,
      "quotes": 80
    },
    "quotes": [
      {
        "totalprofitmarginpercent": "9.09",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "5",
        "quoteid": "JCc6Ty1SUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [
          {
            "documentid": "JSZaTy1QXEAgCg==",
            "sizeinbytes": "41501",
            "uploadeddatetime": "2021/03/02 04:59:41",
            "uploadedbyuser": {},
            "filter": "Internal Only",
            "comment": "",
            "url": "https://staging16-office.aroflo.com/DocStorage/BGRF-WP1-original?expires=1614662020&signature=7472A5CB3E18BC51A56E58FBC221DD4D32C9F5AE7E6D1073A5D1E34D042F7692",
            "name": "Stoogelogo.gif"
          }
        ],
        "acceptanceexpirydate": "",
        "totaltax": "374.0200",
        "type": "Detailed",
        "duedate": "2018/09/27",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZaQyFSTDAgCg==",
          "requestdatetime": "2018/09/26 10:17:32",
          "refcode": "TeCl_2         2",
          "requestdate": "2018/09/26",
          "jobnumber": "1048",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCQ6WyBRICAgCg==",
            "orgname": "A Test Client"
          },
          "taskname": "Supplier Quotes Test"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1048",
        "labourcostex": "0.0000",
        "totalprofit": "340.0100",
        "createddatetime": "2018/09/26 10:17:32",
        "acceptancestatus": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "12 Maroondah Highway",
          "address2": "Suite 13, Level 2"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "3740.0600",
        "overallmarkuppercent": "0",
        "createddate": "2018/09/26",
        "notes": [],
        "subtotal": "3740.0600",
        "description": "<p>this is my quote desc</p>",
        "refno": "TeCl_2         2",
        "quotename": "Supplier Quotes Test",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "4114.0800",
        "taskdescription": "",
        "materialcostex": "3400.0500",
        "duedatetime": "2018/09/27 10:17:00",
        "client": {
          "orgid": "JCQ6WyBRICAgCg==",
          "orgname": "A Test Client"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      }
    ],
    "currentpageresults": 1
  }
}
```


### JOIN lineitems

**Authorization:** bearer


---

### GET Get Quote with lineitems

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of quotes and their line items for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('lineitems')
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
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('lineitems')
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

#### Get Quote with lineitems (OK 200)

```json
{
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "quotes": 79,
      "lines": 27
    },
    "quotes": [
      {
        "totalprofitmarginpercent": "9.09",
        "approveddate": "",
        "estimator": {},
        "lines": [
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "203.28",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "Assembly",
            "isapproved": "true",
            "totalex": "184.80",
            "labourunitrate": "0.2500",
            "item": "Electrical - Double GPO install",
            "cost": "8.4000",
            "parentlineid": "",
            "sell": "9.2400",
            "labourtotal": "320.00",
            "lineid": "JSZaRyxRPEggCg==",
            "taxcode": "GST",
            "qty": "20.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "18.48",
            "isoptional": "false",
            "itemid": "",
            "takeoffname": "Ground Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "3.30",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "2.5mm2C&EFLATPM",
            "isapproved": "true",
            "totalex": "3.30",
            "labourunitrate": "0.0000",
            "item": "2.5mm 2 Core & Earth Flat Cable Per Metre",
            "cost": "0.6000",
            "parentlineid": "JSZaRyxRPEggCg==",
            "sell": "0.6600",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRPEQgCg==",
            "taxcode": "n/a",
            "qty": "5.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "0.00",
            "isoptional": "false",
            "itemid": "JSZKVyFRXEQgCg==",
            "takeoffname": "Ground Floor",
            "taxrate": "0.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "5.94",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "2025WE",
            "isapproved": "true",
            "totalex": "5.94",
            "labourunitrate": "0.2500",
            "item": "Clipsal 10 Amp 2000 SERIES Double Switched Internal Powerpoint White",
            "cost": "5.4000",
            "parentlineid": "JSZaRyxRPEggCg==",
            "sell": "5.9400",
            "labourtotal": "16.00",
            "lineid": "JSZaRyxRPEAgCg==",
            "taxcode": "n/a",
            "qty": "1.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "0.00",
            "isoptional": "false",
            "itemid": "JSZKVyJQPFggCg==",
            "takeoffname": "Ground Floor",
            "taxrate": "0.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "37.96",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "PJ151510",
            "isapproved": "true",
            "totalex": "34.51",
            "labourunitrate": "0.0000",
            "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
            "cost": "31.3700",
            "parentlineid": "",
            "sell": "34.5070",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRPFwgCg==",
            "taxcode": "GST",
            "qty": "1.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "3.45",
            "isoptional": "false",
            "itemid": "JSZKVyBQXDAgCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "82.24",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "PJ151515",
            "isapproved": "true",
            "totalex": "74.76",
            "labourunitrate": "0.0000",
            "item": "B&R 150mm x 150mm x 150mm POLYNOVA PJ Junction Box With Opaque Lid",
            "cost": "33.9800",
            "parentlineid": "",
            "sell": "37.3780",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRPFggCg==",
            "taxcode": "GST",
            "qty": "2.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "7.48",
            "isoptional": "false",
            "itemid": "JSZKVyBQLFAgCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "194.46",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "PJ221510T",
            "isapproved": "true",
            "totalex": "176.78",
            "labourunitrate": "0.0000",
            "item": "B&R 220mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
            "cost": "53.5700",
            "parentlineid": "",
            "sell": "58.9270",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRPFQgCg==",
            "taxcode": "GST",
            "qty": "3.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "17.68",
            "isoptional": "false",
            "itemid": "JSZKVyBQLEQgCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "535.11",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "PC271817T",
            "isapproved": "true",
            "totalex": "486.46",
            "labourunitrate": "0.0000",
            "item": "B&R 270mm x 180mm x 170mm Weatherproof IP66 Junction Box Clear PC2718",
            "cost": "110.5600",
            "parentlineid": "",
            "sell": "121.6160",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRPFAgCg==",
            "taxcode": "GST",
            "qty": "4.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "48.65",
            "isoptional": "false",
            "itemid": "JSZKVydSXDQgCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "961.90",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "PC362717T",
            "isapproved": "true",
            "totalex": "874.45",
            "labourunitrate": "0.0000",
            "item": "B&R 360mm x 270mm x 170mm Weatherproof IP66 Junction Box Clear PC2736",
            "cost": "158.9900",
            "parentlineid": "",
            "sell": "174.8890",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRLDQgCg==",
            "taxcode": "GST",
            "qty": "5.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "87.45",
            "isoptional": "false",
            "itemid": "JSZKVyBQTFggCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "1783.56",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "PC542717T",
            "isapproved": "true",
            "totalex": "1621.42",
            "labourunitrate": "0.0000",
            "item": "B&R 540mm x 270mm x 170mm Weatherproof IP66 Junction Box Clear PC5427",
            "cost": "245.6700",
            "parentlineid": "",
            "sell": "270.2370",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRLDAgCg==",
            "taxcode": "GST",
            "qty": "6.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "162.14",
            "isoptional": "false",
            "itemid": "JSZKVyBQTEggCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "127.39",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "MC20OR",
            "isapproved": "true",
            "totalex": "115.81",
            "labourunitrate": "0.0000",
            "item": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
            "cost": "15.0400",
            "parentlineid": "",
            "sell": "16.5440",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRLEwgCg==",
            "taxcode": "GST",
            "qty": "7.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "11.58",
            "isoptional": "false",
            "itemid": "JSZKVyFSXDQgCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          },
          {
            "worktypevalue": "0.0000",
            "worktype": "",
            "totalinc": "188.18",
            "optiongroupname": "",
            "itemtype": "Material",
            "partno": "MC25OR",
            "isapproved": "true",
            "totalex": "171.07",
            "labourunitrate": "0.0000",
            "item": "Australian Plastics 25mm x 10 Metre Heavy Duty Corrugated Conduit",
            "cost": "19.4400",
            "parentlineid": "",
            "sell": "21.3840",
            "labourtotal": "0.00",
            "lineid": "JSZaRyxRLEggCg==",
            "taxcode": "GST",
            "qty": "8.0000",
            "markup": "10.0000",
            "labourmarkup": "0.0000",
            "totaltax": "17.11",
            "isoptional": "false",
            "itemid": "JSZKVyJQTFAgCg==",
            "takeoffname": "1st Floor",
            "taxrate": "10.00"
          }
        ],
        "totalhours": "5",
        "quoteid": "JCc6Ty1SUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "374.0200",
        "type": "Detailed",
        "duedate": "2018/09/27",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZaQyFSTDAgCg==",
          "requestdatetime": "2018/09/26 10:17:32",
          "refcode": "TeCl_2         2",
          "requestdate": "2018/09/26",
          "jobnumber": "1048",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCQ6WyBRICAgCg==",
            "orgname": "A Test Client"
          },
          "taskname": "Supplier Quotes Test"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1048",
        "labourcostex": "0.0000",
        "totalprofit": "340.0100",
        "createddatetime": "2018/09/26 10:17:32",
        "acceptancestatus": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "12 Maroondah Highway",
          "address2": "Suite 13, Level 2"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "3740.0600",
        "overallmarkuppercent": "0",
        "createddate": "2018/09/26",
        "notes": [],
        "subtotal": "3740.0600",
        "description": "<p>this is my quote desc</p>",
        "refno": "TeCl_2         2",
        "quotename": "Supplier Quotes Test",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "4114.0800",
        "taskdescription": "",
        "materialcostex": "3400.0500",
        "duedatetime": "2018/09/27 10:17:00",
        "client": {
          "orgid": "JCQ6WyBRICAgCg==",
          "orgname": "A Test Client"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      }
    ],
    "currentpageresults": 1
  }
}
```


### JOIN notes

**Authorization:** bearer


---

### GET Get Quote with notes

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of quotes and their notes for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('notes')
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
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('notes')
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

#### Get Quote with notes (OK 200)

```json
{
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "notes": 7,
      "quotes": 93
    },
    "quotes": [
      {
        "totalprofitmarginpercent": "9.09",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "5",
        "quoteid": "JCc6Ty1SUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "374.0200",
        "type": "Detailed",
        "duedate": "2018/09/27",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZaQyFSTDAgCg==",
          "requestdatetime": "2018/09/26 10:17:32",
          "refcode": "TeCl_2         2",
          "requestdate": "2018/09/26",
          "jobnumber": "1048",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCQ6WyBRICAgCg==",
            "orgname": "A Test Client"
          },
          "taskname": "Supplier Quotes Test"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1048",
        "labourcostex": "0.0000",
        "totalprofit": "340.0100",
        "createddatetime": "2018/09/26 10:17:32",
        "acceptancestatus": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "12 Maroondah Highway",
          "address2": "Suite 13, Level 2"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "3740.0600",
        "overallmarkuppercent": "0",
        "createddate": "2018/09/26",
        "notes": [
          {
            "filter": "Internal Only",
            "timeposted": "Mar 2, 2021 4:00:48 PM",
            "noteid": "JSYqXyBQTDQgCg==",
            "content": "<p>This is a quote note :)</p>",
            "dateposted": "2021/03/02",
            "user": {}
          },
          {
            "filter": "Internal Only",
            "timeposted": "Mar 2, 2021 4:02:52 PM",
            "noteid": "JSYqXyBQXFAgCg==",
            "content": "Previous Ref Number: Bradl1",
            "dateposted": "2021/03/02",
            "user": {}
          }
        ],
        "subtotal": "3740.0600",
        "description": "<p>this is my quote desc</p>",
        "refno": "TeCl_2         2",
        "quotename": "Supplier Quotes Test",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "4114.0800",
        "taskdescription": "",
        "materialcostex": "3400.0500",
        "duedatetime": "2018/09/27 10:17:00",
        "client": {
          "orgid": "JCQ6WyBRICAgCg==",
          "orgname": "A Test Client"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      }
    ],
    "currentpageresults": 1
  }
}
```


### JOIN projects

**Authorization:** bearer


---

### GET Get Quote with Projects

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of quotes including project information for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('projects')
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
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('projects')
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

#### Get Quote with Projects (OK 200)

```json
{
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "PROJECT": 19,
      "STAGE": 14,
      "quotes": 73
    },
    "quotes": [
      {
        "totalprofitmarginpercent": "9.09",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "5",
        "quoteid": "JCc6Ty1SUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "374.0200",
        "type": "Detailed",
        "duedate": "2018/09/27",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZaQyFSTDAgCg==",
          "requestdatetime": "2018/09/26 10:17:32",
          "refcode": "TeCl_2         2",
          "requestdate": "2018/09/26",
          "jobnumber": "1048",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCQ6WyBRICAgCg==",
            "orgname": "A Test Client"
          },
          "taskname": "Supplier Quotes Test"
        },
        "project": {
          "location": {
            "locationid": "",
            "locationname": ""
          },
          "contact": "Jayne Doe",
          "startdate": "2021/03/03",
          "projecttype": "",
          "enddate": "2021/03/12",
          "status": "Open",
          "closeddate": "",
          "description": "",
          "projectid": "JCZaQydRICAgCg==",
          "refno": "TeCl_2         1",
          "manager": "Commander Shepard",
          "custon": "",
          "projectnumber": "3",
          "projectname": "A Test Project"
        },
        "jobnumber": "1048",
        "labourcostex": "0.0000",
        "totalprofit": "340.0100",
        "createddatetime": "2018/09/26 10:17:32",
        "acceptancestatus": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "12 Maroondah Highway",
          "address2": "Suite 13, Level 2"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "3740.0600",
        "overallmarkuppercent": "0",
        "createddate": "2018/09/26",
        "notes": [],
        "subtotal": "3740.0600",
        "description": "<p>this is my quote desc</p>",
        "refno": "TeCl_2         2",
        "quotename": "Supplier Quotes Test",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {},
        "totalinc": "4114.0800",
        "taskdescription": "",
        "materialcostex": "3400.0500",
        "duedatetime": "2018/09/27 10:17:00",
        "client": {
          "orgid": "JCQ6WyBRICAgCg==",
          "orgname": "A Test Client"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      }
    ],
    "currentpageresults": 1
  }
}
```


### JOIN trackingcentres

**Authorization:** bearer


---

### GET Get Quote with LineItems and TrackingCentres

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of quotes including project information for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('projects')
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
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('lineitems,trackingcentres')
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


---

### GET Get In Progress Quotes

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of quotes for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('quotes')
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
        'zone=' + encodeURIComponent('Quotes')
        ,'where=' +encodeURIComponent('and|quoteid|=|JSQqUyxRPFAgCg==')
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

#### Get In Progress Quotes (OK 200)

```json
{
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "quotes": 97
    },
    "quotes": [
      {
        "totalprofitmarginpercent": "9.09",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "5",
        "quoteid": "JCc6Ty1SUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "374.0200",
        "type": "Detailed",
        "duedate": "2018/09/27",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZaQyFSTDAgCg==",
          "requestdatetime": "2018/09/26 10:17:32",
          "refcode": "TeCl_2         2",
          "requestdate": "2018/09/26",
          "jobnumber": "1048",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCQ6WyBRICAgCg==",
            "orgname": "A Test Client"
          },
          "taskname": "Supplier Quotes Test"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1048",
        "labourcostex": "0.0000",
        "totalprofit": "340.0100",
        "createddatetime": "2018/09/26 10:17:32",
        "acceptancestatus": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "12 Maroondah Highway",
          "address2": "Suite 13, Level 2"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "3740.0600",
        "overallmarkuppercent": "0",
        "createddate": "2018/09/26",
        "notes": [],
        "subtotal": "3740.0600",
        "description": "<p>this is my quote desc</p>",
        "refno": "TeCl_2         2",
        "quotename": "Supplier Quotes Test",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "4114.0800",
        "taskdescription": "",
        "materialcostex": "3400.0500",
        "duedatetime": "2018/09/27 10:17:00",
        "client": {
          "orgid": "JCQ6WyBRICAgCg==",
          "orgname": "A Test Client"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      },
      {
        "totalprofitmarginpercent": "1.09",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "152.83",
        "quoteid": "JCcqRyZSQCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "40.1200",
        "type": "Simple",
        "duedate": "2019/07/19",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZKSyJRXFwgCg==",
          "requestdatetime": "2019/07/18 14:15:56",
          "refcode": "Traini1",
          "requestdate": "2019/07/18",
          "jobnumber": "1070",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCdKLyRRICAgCg==",
            "orgname": "Training Company"
          },
          "taskname": "SimChair"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1070",
        "labourcostex": "0.0000",
        "totalprofit": "4.3900",
        "createddatetime": "2019/07/18 14:16:35",
        "acceptancestatus": "",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "addres value",
          "address2": "86 test street"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "401.1300",
        "overallmarkuppercent": "0",
        "createddate": "2019/07/18",
        "notes": [],
        "subtotal": "401.1300",
        "description": "",
        "refno": "Traini1",
        "quotename": "SimChair",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "441.2500",
        "taskdescription": "",
        "materialcostex": "396.7400",
        "duedatetime": "2019/07/19 14:16:00",
        "client": {
          "orgid": "JCdKLyRRICAgCg==",
          "orgname": "Training Company"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      },
      {
        "totalprofitmarginpercent": "0.00",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "1",
        "quoteid": "JCcqWyVQUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "10.0000",
        "type": "Simple",
        "duedate": "2019/09/26",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZKQyJQLDQgCg==",
          "requestdatetime": "2019/09/25 19:08:04",
          "refcode": "#1 Lad27",
          "requestdate": "2019/09/25",
          "jobnumber": "1086",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCdKUydRMCAgCg==",
            "orgname": "#1 Ladies, Detective Agency"
          },
          "taskname": "Test for Labour"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1086",
        "labourcostex": "100.0000",
        "totalprofit": "0.0000",
        "createddatetime": "2019/09/25 19:08:04",
        "acceptancestatus": "",
        "address": {
          "postcode": "2000",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "address1": "HMAS Sydney Pier 2, Harbour 4",
          "address2": "Pier 2, Harbour 4"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "100.0000",
        "overallmarkuppercent": "0",
        "createddate": "2019/09/25",
        "notes": [],
        "subtotal": "100.0000",
        "description": "",
        "refno": "#1 Lad27",
        "quotename": "Test for Labour",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "110.0000",
        "taskdescription": "",
        "materialcostex": "0.0000",
        "duedatetime": "2019/09/26 00:00:00",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": "04XX XXX XXX"
      },
      {
        "totalprofitmarginpercent": "0.02",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "182.08",
        "quoteid": "JCcqWyNSUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "1861.5800",
        "type": "Simple",
        "duedate": "2019/10/15",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JSZKXyVQTEwgCg==",
          "requestdatetime": "2019/10/14 12:05:09",
          "refcode": "Traini2",
          "requestdate": "2019/10/14",
          "jobnumber": "1089",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCdKLyRRICAgCg==",
            "orgname": "Training Company"
          },
          "taskname": "SimChair MKIV"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1089",
        "labourcostex": "18208.0000",
        "totalprofit": "4.3900",
        "createddatetime": "2019/10/14 12:05:12",
        "acceptancestatus": "",
        "address": {
          "postcode": "",
          "state": "VIC",
          "suburb": "",
          "address1": "addres value",
          "address2": "86 test street"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "18615.7700",
        "overallmarkuppercent": "0",
        "createddate": "2019/10/14",
        "notes": [],
        "subtotal": "18615.7700",
        "description": "",
        "refno": "Traini2",
        "quotename": "SimChair MKIV",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "20477.3500",
        "taskdescription": "<p>A SimChair MKIV Project</p>",
        "materialcostex": "403.3800",
        "duedatetime": "2019/10/15 12:04:00",
        "client": {
          "orgid": "JCdKLyRRICAgCg==",
          "orgname": "Training Company"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      },
      {
        "totalprofitmarginpercent": "0.00",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "0",
        "quoteid": "JCdaVyxQICAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "10.0000",
        "type": "Simple",
        "duedate": "2020/10/06",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JScqSyZRPDQgCg==",
          "requestdatetime": "2020/10/05 15:02:11",
          "refcode": "#1 Lad56",
          "requestdate": "2020/10/05",
          "jobnumber": "1124",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCdKUydRMCAgCg==",
            "orgname": "#1 Ladies, Detective Agency"
          },
          "taskname": "Test for Client Labour Rates"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1124",
        "labourcostex": "0.0000",
        "totalprofit": "0.0000",
        "createddatetime": "2020/10/05 15:02:11",
        "acceptancestatus": "",
        "address": {
          "postcode": "3134",
          "state": "VIC",
          "suburb": "Ringwood",
          "address1": "22222",
          "address2": "11111"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "100.0000",
        "overallmarkuppercent": "0",
        "createddate": "2020/10/05",
        "notes": [],
        "subtotal": "100.0000",
        "description": "",
        "refno": "#1 Lad56",
        "quotename": "Test for Client Labour Rates",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "110.0000",
        "taskdescription": "",
        "materialcostex": "100.0000",
        "duedatetime": "2020/10/06 15:01:00",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": ""
      },
      {
        "totalprofitmarginpercent": "0.00",
        "approveddate": "",
        "estimator": {},
        "lines": [],
        "totalhours": "0",
        "quoteid": "JCdaLyxRUCAgCg==",
        "status": "In Progress",
        "documentsandphotos": [],
        "acceptanceexpirydate": "",
        "totaltax": "0.0000",
        "type": "Simple",
        "duedate": "2020/11/25",
        "approveddatetime": " ",
        "rejecteddatetime": " ",
        "task": {
          "taskid": "JScqXydQTDAgCg==",
          "requestdatetime": "2020/11/25 11:10:08",
          "refcode": "#1 Lad61",
          "requestdate": "2020/11/25",
          "jobnumber": "1129",
          "tasktype": "Installation",
          "client": {
            "orgid": "JCdKUydRMCAgCg==",
            "orgname": "#1 Ladies, Detective Agency"
          },
          "taskname": "Field quote"
        },
        "project": {
          "location": {},
          "projectid": ""
        },
        "jobnumber": "1129",
        "labourcostex": "0.0000",
        "totalprofit": "0.0000",
        "createddatetime": "2020/11/25 11:10:08",
        "acceptancestatus": "",
        "address": {
          "postcode": "2000",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "address1": "HMAS Sydney Pier 2, Harbour 4",
          "address2": "Pier 2, Harbour 4"
        },
        "exclusions": "",
        "acceptancedate": "",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "totalex": "0.0000",
        "overallmarkuppercent": "0",
        "createddate": "2020/11/25",
        "notes": [],
        "subtotal": "0.0000",
        "description": "",
        "refno": "#1 Lad61",
        "quotename": "Field quote",
        "custon": "",
        "acceptanceexpirydatetime": " ",
        "rejecteddate": "",
        "stage": {
          "stageid": ""
        },
        "totalinc": "0.0000",
        "taskdescription": "",
        "materialcostex": "0.0000",
        "duedatetime": "2020/11/25 00:00:00",
        "client": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "acceptedby": {},
        "istaxinclusive": "false",
        "acceptancedatetime": " ",
        "allowancecostex": "0.0000",
        "contactphone": "04XX XXX XXX"
      }
    ],
    "currentpageresults": 6
  }
}
```

