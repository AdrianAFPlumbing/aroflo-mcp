# BillLineItems

Allows you list and update Bill line items from your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| lineid | AROFLO ID |
| billid | AROFLO ID |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| lineitems |
| documentsandphotos |
| notes |

## POSTXML variable definition

<billlineitems>
    <billlineitem>
        <billid>AROFLO ID</billid> INSERT required / UPDATE required
        <lineid>AROFLO ID</lineid> INSERT no / UPDATE required
        <ordercode>STRING</ordercode> INSERT yes / UPDATE yes
        <description>STRING</description> INSERT yes / UPDATE yes
        <itemid>AROFLO ID</itemid> INSERT yes / UPDATE yes
        <accountcode>STRING</accountcode> INSERT yes / UPDATE yes
        <qty>FLOAT</qty> INSERT yes / UPDATE yes
        <qtyreceived>FLOAT</qtyreceived> INSERT yes / UPDATE yes
        <price>FLOAT</price> INSERT yes / UPDATE yes
        <taxcode>STRING</taxcode> INSERT yes / UPDATE yes
        <taxrate>FLOAT</taxrate> INSERT yes / UPDATE yes
        <itemtype>STRING(Material,Freight)</itemtype> INSERT yes / UPDATE yes
    </billlineitem>
</billlineitems>

**Authorization:** bearer


---

### GET GET BillLineItems for BillID

`GET https://api.aroflo.com/{{urlVarString}}`

Get the line items for a Bill with a particular billid.

if (requestType == 'GET') {
    var urlVarString = [
       'zone=' + encodeURIComponent('BillLineItems')
        ,'where=' + encodeURIComponent('and|billid|=|JSZKTydQPDQgCg==')
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
        'zone=' + encodeURIComponent('BillLineItems')
        ,'where=' + encodeURIComponent('and|billid|=|JSZKTydQPDQgCg==')
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
        'zone=' + encodeURIComponent('bills')
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

#### Approved Bills (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 0,
    "queryresponsetimes": {
      "billlineitems": 47
    },
    "billlineitems": [
      {
        "total": "300.0000",
        "accountcode": "1-1800",
        "price": "300.0000",
        "qtyreceived": "1.0000",
        "billid": "JSZKTydQPDQgCg==",
        "taxamount": "30.00",
        "taskid": "JSZKTyxSXFwgCg==",
        "description": "Perform XYZ @ ABC",
        "lineid": "JSc6LyxRTEggCg==",
        "taxcode": "GST",
        "qty": "1.0000",
        "itemid": "JSQ6VydSXFAgCg==",
        "ordercode": "SubC",
        "taxrate": "10.00"
      },
      {
        "total": "0.0000",
        "accountcode": "5-1021",
        "price": "0.0000",
        "qtyreceived": "1.0000",
        "billid": "JSZKTydQPDQgCg==",
        "taxamount": "0.00",
        "taskid": "JSZKTyxSXFwgCg==",
        "description": "test for update",
        "lineid": "JSc6LyxRTEwgCg==",
        "taxcode": "GST",
        "qty": "1.0000",
        "itemid": "",
        "ordercode": "",
        "taxrate": "10.00"
      },
      {
        "total": "10.0000",
        "accountcode": "1-1800",
        "price": "10.0000",
        "qtyreceived": "1.0000",
        "billid": "JSZKTydQPDQgCg==",
        "taxamount": "1.00",
        "taskid": "JSZKSyBSXEAgCg==",
        "description": "My new fancy part",
        "lineid": "JSc6LyxRTDAgCg==",
        "taxcode": "GST",
        "qty": "1.0000",
        "itemid": "Jic6SyxQLF8tCg==",
        "ordercode": "abc-xyz",
        "taxrate": "10.00"
      },
      {
        "total": "31.3700",
        "accountcode": "1-1800",
        "price": "31.3700",
        "qtyreceived": "1.0000",
        "billid": "JSZKTydQPDQgCg==",
        "taxamount": "3.14",
        "taskid": "JSZKSyBSXEAgCg==",
        "description": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
        "lineid": "JSc6LyxRTDQgCg==",
        "taxcode": "GST",
        "qty": "1.0000",
        "itemid": "JSZKVyBQXDAgCg==",
        "ordercode": "PJ151510",
        "taxrate": "10.00"
      }
    ],
    "currentpageresults": 4
  }
}
```


---

### POST Insert BillLineItem

`POST http://api.aroflo.com/`

Add new line items to a Bill.

if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('bills')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;<billlineitems><billlineitem><billid>JScqUyJQPFQgCg==</billid><ordercode>SubC</ordercode><description>Perform XYZ @ ABC</description><itemid>JSQ6VydSXFAgCg==</itemid><accountcode>1-1800</accountcode><qty>1.0</qty><qtyreceived>1.0</qtyreceived><price>400</price><taxcode>GST</taxcode><taxrate>10.0</taxrate><itemtype>Material</itemtype></billlineitem></billlineitems>&#x27;)
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);
    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
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
| `Content-Type` | `application/x-www-form-urlencoded` |  |

**Body:**

```
{{formVarString}}
```

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'POST';
 
//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('billlineitems')
        ,'postxml=' + encodeURIComponent('<billlineitems><billlineitem><billid>JScqUyJQPFQgCg==</billid><ordercode>SubC</ordercode><description>Perform XYZ @ ABC</description><itemid>JSQ6VydSXFAgCg==</itemid><accountcode>1-1800</accountcode><qty>1.0</qty><qtyreceived>1.0</qtyreceived><price>400</price><taxcode>GST</taxcode><taxrate>10.0</taxrate><itemtype>Material</itemtype></billlineitem></billlineitems>')
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

#### Insert BillLineItem (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "billlineitems": []
      },
      "inserttotal": 1,
      "inserts": {
        "billlineitems": [
          {
            "accountcode": "1-1800",
            "price": "400",
            "qtyreceived": "1.0",
            "itemtype": "Material",
            "billid": "JScqUyJQPFQgCg==",
            "description": "Perform XYZ @ ABC",
            "taxcode": "GST",
            "LINEID": "JSQqWyBRPEggCg==",
            "qty": "1.0",
            "ordercode": "SubC",
            "itemid": "JSQ6VydSXFAgCg==",
            "taxrate": "10.0"
          }
        ]
      }
    }
  }
}
```


---

### POST Update existing BillLineItem

`POST http://api.aroflo.com/`

Update the values for a particular line item by supplying the lineid.

if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('bills')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;<billlineitems><billlineitem><billid>JSZKTydQPDQgCg==</billid><lineid>JSc6LyxRTEggCg==</lineid><ordercode>SubC</ordercode><description>Perform XYZ @ ABC</description><itemid>JSQ6VydSXFAgCg==</itemid><accountcode>1-1800</accountcode><qty>1.0</qty><qtyreceived>1.0</qtyreceived><price>300</price><taxcode>GST</taxcode><taxrate>10.0</taxrate><itemtype>Material</itemtype></billlineitem></billlineitems>&#x27;)
    ];
    formVarString = formVarString.join('&');
    pm.environment.set("formVarString", formVarString);
    //We now call the Authentication function and pass it our requestType and formVarString 
    AroFloAuth(requestType, formVarString)
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
| `Content-Type` | `application/x-www-form-urlencoded` |  |

**Body:**

```
{{formVarString}}
```

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'POST';
 
//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('billlineitems')
        ,'postxml=' + encodeURIComponent('<billlineitems><billlineitem><billid>JSZKTydQPDQgCg==</billid><lineid>JSc6LyxRTEggCg==</lineid><ordercode>SubC</ordercode><description>Perform XYZ @ ABC</description><itemid>JSQ6VydSXFAgCg==</itemid><accountcode>1-1800</accountcode><qty>1.0</qty><qtyreceived>1.0</qtyreceived><price>300</price><taxcode>GST</taxcode><taxrate>10.0</taxrate><itemtype>Material</itemtype></billlineitem></billlineitems>')
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

#### Update existing BillLineItem (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "billlineitems": [
          {
            "accountcode": "1-1800",
            "price": "300",
            "qtyreceived": "1.0",
            "itemtype": "Material",
            "billid": "JSZKTydQPDQgCg==",
            "description": "Perform XYZ @ ABC",
            "lineid": "JSc6LyxRTEggCg==",
            "taxcode": "GST",
            "qty": "1.0",
            "ordercode": "SubC",
            "itemid": "86390",
            "taxrate": "10.0"
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "billlineitems": []
      }
    }
  }
}
```

