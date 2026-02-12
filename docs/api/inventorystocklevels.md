# InventoryStockLevels

This zone is READ ONLY.

This area shows the current [stock levels](https://help.aroflo.com/display/office/Inventory+List+and+Stock+Activity) for inventory in your AroFlo site.
This zone is Read Only.

## WHERE filters

| Field | Value |
| --- | --- |
| itemid | AroFlo ID |
| lastupdated | DATE(YYYY-MM-DD) |
| lastupdateddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |
| lastupdatedutc | DATETIME(YYYY-MM-DD HH:mm:ss) |
| lastupdateddatetimeutc | DATETIME(YYYY-MM-DD HH:mm:ss) |
| assignedtotype | STRING(org,user,cholder) |
| isuserarchived | BOOLEAN |
| ischolderarchived | BOOLEAN |
| isbuarchived | BOOLEAN |

**Default WHERE clause**

AND lastupdateddatetimeutc > DATEADD(d, -30, GETUTCDATE())

**Authorization:** bearer


---

### GET Get InventoryStockLevels

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of inventory stock levels for all stock locations

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('inventorystocklevels')
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
        'zone=' + encodeURIComponent('inventorystocklevels')
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
        'zone=' + encodeURIComponent('inventorystocklevels')
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

#### Get InventoryStockLevels (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "inventorystocklevels": [
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFAgCg=="
      },
      {
        "assignedtotype": "user",
        "lastupdateddatetime": "2018/10/19 15:33:14",
        "quantity": "0.0000",
        "assignedtoid": "JCQ6XyRRUCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/10/19",
        "itemid": "JSZKVydRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFQgCg=="
      },
      {
        "assignedtotype": "user",
        "lastupdateddatetime": "2018/10/19 15:33:14",
        "quantity": "0.0000",
        "assignedtoid": "JCQ6XyRRUCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/10/19",
        "itemid": "JSZKVydRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFggCg=="
      },
      {
        "assignedtotype": "user",
        "lastupdateddatetime": "2018/10/19 15:33:14",
        "quantity": "0.0000",
        "assignedtoid": "JCQ6XyRRUCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/10/19",
        "itemid": "JSZKVydRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/08/20 11:40:01",
        "quantity": "1.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/08/20",
        "itemid": "JSZKVyBQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEQgCg=="
      },
      {
        "assignedtotype": "user",
        "lastupdateddatetime": "2018/07/27 08:41:41",
        "quantity": "-45.0000",
        "assignedtoid": "JCQ6UyxRUCAgCg==",
        "assignedto": "Bradley Field",
        "lastupdated": "2018/07/27",
        "itemid": "JSZKVyFRXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFQgCg=="
      },
      {
        "assignedtotype": "user",
        "lastupdateddatetime": "2018/07/27 08:41:53",
        "quantity": "-44.0000",
        "assignedtoid": "JCQ6UyxRUCAgCg==",
        "assignedto": "Bradley Field",
        "lastupdated": "2018/07/27",
        "itemid": "JSZKVyFSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTEggCg=="
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "inventorystocklevels": 15
    },
    "currentpageresults": 392
  }
}
```


---

### GET Get InventoryStockLevels for BU Stock

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of inventory stock levels for business unit stock locations only. We do this by filtering on the assignedtotype:org

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('inventorystocklevels')
        ,'where=' + encodeURIComponent('and|assignedtotype|=|org')
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
        'zone=' + encodeURIComponent('inventorystocklevels')
        ,'where=' + encodeURIComponent('and|assignedtotype|=|org')
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
        'zone=' + encodeURIComponent('inventorystocklevels')
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

#### Get InventoryStockLevels for BU Stock (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "inventorystocklevels": [
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVydSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/08/20 11:40:01",
        "quantity": "1.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/08/20",
        "itemid": "JSZKVyBQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:45:47",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:16",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyBSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:47:53",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:48:31",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyFSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:49:35",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJRPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyJSXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQTDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQXDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQLDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPEwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPDAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNQPDQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFggCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTFwgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTEAgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTEQgCg=="
      },
      {
        "assignedtotype": "org",
        "lastupdateddatetime": "2018/07/24 15:51:42",
        "quantity": "0.0000",
        "assignedtoid": "JCdKUyZRMCAgCg==",
        "assignedto": "Bradley Sandbox",
        "lastupdated": "2018/07/24",
        "itemid": "JSZKVyNRTEggCg=="
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "inventorystocklevels": 31
    },
    "currentpageresults": 387
  }
}
```

