# InventoryLists

Returns the lists of Inventory Lists which could be [Task Specific](https://help.aroflo.com/display/office/Create+a+Task+List), [Assembly](https://help.aroflo.com/display/office/SOR+Items+and+Lists) or [SOR List](https://help.aroflo.com/display/office/Assemblies). To include the items for each list, include the join on "items".

This zone is Read Only.

## WHERE filters

| Field | Value |
| --- | --- |
| listid | AroFlo ID |
| listtype | STRING(task specific, assembly, sor) |

## JOINs available

| Area |
| --- |
| items |

**Authorization:** bearer


---

### GET Get InventoryLists

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of inventorylists.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('inventorylists')
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
        'zone=' + encodeURIComponent('inventorylists')
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
        'zone=' + encodeURIComponent('inventorylists')
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

#### Get InventoryLists (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "inventorylists": [
      {
        "labourrate": "0",
        "invoicecost": "0.0000",
        "listid": "Iyc6TyQK",
        "taskcost": "0.0000",
        "taskusing": "Cost",
        "items": [],
        "listname": "GPO Install",
        "quotesell": "0.0000",
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "listtype": "task specific",
        "cost": "0.0000",
        "quotecost": "0.0000",
        "sell": "0.0000",
        "tasksell": "0.0000",
        "category": {
          "categoryid": "IyZaTyQK",
          "categoryname": "Electrical"
        },
        "quoteusing": "Cost",
        "invoiceusing": "Cost",
        "invoicesell": "0.0000"
      },
      {
        "labourrate": "0",
        "invoicecost": "9.8935",
        "listid": "Iyc6TyUK",
        "taskcost": "9.8935",
        "taskusing": "Cost",
        "items": [],
        "listname": "Double GPO install",
        "quotesell": "0.0000",
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "listtype": "assembly",
        "cost": "0.0000",
        "quotecost": "9.8935",
        "sell": "0.0000",
        "tasksell": "0.0000",
        "category": {
          "categoryid": "IyZaTyQK",
          "categoryname": "Electrical"
        },
        "quoteusing": "Cost",
        "invoiceusing": "Cost",
        "invoicesell": "0.0000"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "inventorylists": 39
    },
    "currentpageresults": 2
  }
}
```


---

### GET Get Assemblies

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of inventory assemblies. We do this by filtering on listtype:assembly

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('inventorylists')
        ,'where=' + encodeURIComponent('and|listtype|=|assembly')
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
        'zone=' + encodeURIComponent('inventorylists')
        ,'where=' + encodeURIComponent('and|listtype|=|assembly')
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
        'zone=' + encodeURIComponent('inventorylists')
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

#### Get Assemblies (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "inventorylists": [
      {
        "labourrate": "0",
        "invoicecost": "9.8935",
        "listid": "Iyc6TyUK",
        "taskcost": "9.8935",
        "taskusing": "Cost",
        "items": [],
        "listname": "Double GPO install",
        "quotesell": "0.0000",
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "listtype": "assembly",
        "cost": "0.0000",
        "quotecost": "9.8935",
        "sell": "0.0000",
        "tasksell": "0.0000",
        "category": {
          "categoryid": "IyZaTyQK",
          "categoryname": "Electrical"
        },
        "quoteusing": "Cost",
        "invoiceusing": "Cost",
        "invoicesell": "0.0000"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "inventorylists": 42
    },
    "currentpageresults": 1
  }
}
```


---

### GET Get Items for an Assembly

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the items for the assembly with assemblyid:XXXXX. This adds the join:items to our query to return all of the inventory items for the requested list.

Be sure to replace the `listid` with the assemblyid required.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('inventorylists')
        ,'where=' + encodeURIComponent('and|listid|=|Iyc6TyUK')
        ,'join=' + encodeURIComponent('items')
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
        'zone=' + encodeURIComponent('inventorylists')
        ,'where=' + encodeURIComponent('and|listid|=|Iyc6TyUK')
        ,'join=' + encodeURIComponent('items')
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
        'zone=' + encodeURIComponent('inventorylists')
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

#### Get Items for an Assembly (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "inventorylists": [
      {
        "labourrate": "0",
        "invoicecost": "9.8935",
        "listid": "Iyc6TyUK",
        "taskcost": "9.8935",
        "taskusing": "Cost",
        "items": [
          {
            "quantity": "5.0000",
            "manufacturer": "Various Cable Brands",
            "labour_rate": "0",
            "supplier": "",
            "sell_qte": "0.8007",
            "costex": "0.8007",
            "inventoryitem": {
              "flexcost": "0.0000",
              "manufacturer": "Various Cable Brands",
              "invcmarginon": "COST",
              "supplier": "",
              "useSimplePricing": "true",
              "taskmarginon": "COST",
              "sell_qte": "0.8007",
              "invcmargin": "0.0000",
              "costex": "0.8007",
              "description": "2.5mm 2 Core & Earth Flat Cable Per Metre",
              "category": {
                "categoryid": "JCc6UyBQUCAgCg==",
                "categoryname": "Cable - Twin & Earth Cable"
              },
              "partnumber": "2.5mm2C&EFLATPM",
              "sell_invc": "0.8007",
              "itemid": "JSZKVyFRXEQgCg==",
              "sell_task": "0.8007",
              "taskmargin": "0.0000"
            },
            "description": "2.5mm 2 Core & Earth Flat Cable Per Metre",
            "use_inventory_pricing": "true",
            "partnumber": "2.5mm2C&EFLATPM",
            "sell_invc": "0.8007",
            "itemid": "JSZKVyFRXEQgCg==",
            "sell_task": "0.8007"
          },
          {
            "quantity": "1.0000",
            "manufacturer": "Clipsal",
            "labour_rate": "0",
            "supplier": "",
            "sell_qte": "5.8900",
            "costex": "5.8900",
            "inventoryitem": {
              "flexcost": "0.0000",
              "manufacturer": "Clipsal",
              "invcmarginon": "COST",
              "supplier": "",
              "useSimplePricing": "true",
              "taskmarginon": "COST",
              "sell_qte": "5.8900",
              "invcmargin": "0.0000",
              "costex": "5.8900",
              "description": "Clipsal 10 Amp 2000 SERIES Double Switched Internal Powerpoint White",
              "category": {
                "categoryid": "JCc6UyBRUCAgCg==",
                "categoryname": "Internal Powerpoints"
              },
              "partnumber": "2025WE",
              "sell_invc": "5.8900",
              "itemid": "JSZKVyJQPFggCg==",
              "sell_task": "5.8900",
              "taskmargin": "0.0000"
            },
            "description": "Clipsal 10 Amp 2000 SERIES Double Switched Internal Powerpoint White",
            "use_inventory_pricing": "true",
            "partnumber": "2025WE",
            "sell_invc": "5.8900",
            "itemid": "JSZKVyJQPFggCg==",
            "sell_task": "5.8900"
          }
        ],
        "listname": "Double GPO install",
        "quotesell": "0.0000",
        "businessunit": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "listtype": "assembly",
        "cost": "0.0000",
        "quotecost": "9.8935",
        "sell": "0.0000",
        "tasksell": "0.0000",
        "category": {
          "categoryid": "IyZaTyQK",
          "categoryname": "Electrical"
        },
        "quoteusing": "Cost",
        "invoiceusing": "Cost",
        "invoicesell": "0.0000"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "inventorylists": 1,
      "items": 5
    },
    "currentpageresults": 1
  }
}
```

