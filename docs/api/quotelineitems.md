# QuoteLineItems

This zone is READ ONLY.

Allows you list or return Quote line items from your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| quoteid | AROFLO ID |
| lineid | AROFLO ID |
| parentlineid | AROFLO ID |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND DateRecorded > DATEADD(d, -30, GETUTCDATE())

**Authorization:** bearer


---

### GET Get QuoteLineItems

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of locations for all clients.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('QuoteLineItems')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
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
        'zone=' + encodeURIComponent('QuoteLineItems')
        ,'where=' +encodeURIComponent('and|quoteid|=|JCc6Ty1SUCAgCg==')
        ,'join=' +encodeURIComponent('trackingcentres')
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

#### Get QuoteLineItems (OK 200)

```json
{
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "quotelineitems": 44
    },
    "quotelineitems": [
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "Assembly",
        "isapproved": "true",
        "totalex": "184.80",
        "labourunitrate": "0.2500",
        "cost": "8.4000",
        "lineid": "JSZaRyxRPEggCg==",
        "taxcode": "GST",
        "qty": "20.0000",
        "totaltax": "18.48",
        "isoptional": "false",
        "takeoffname": "Ground Floor",
        "taxrate": "10.00",
        "totalinc": "203.28",
        "itemtype": "Material",
        "item": "Electrical - Double GPO install",
        "parentlineid": "",
        "sell": "9.2400",
        "labourtotal": "320.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": ""
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "2.5mm2C&EFLATPM",
        "isapproved": "true",
        "totalex": "3.30",
        "labourunitrate": "0.0000",
        "cost": "0.6000",
        "lineid": "JSZaRyxRPEQgCg==",
        "taxcode": "n/a",
        "qty": "5.0000",
        "totaltax": "0.00",
        "isoptional": "false",
        "takeoffname": "Ground Floor",
        "taxrate": "0.00",
        "totalinc": "3.30",
        "itemtype": "Material",
        "item": "2.5mm 2 Core & Earth Flat Cable Per Metre",
        "parentlineid": "JSZaRyxRPEggCg==",
        "sell": "0.6600",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyFRXEQgCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "2025WE",
        "isapproved": "true",
        "totalex": "5.94",
        "labourunitrate": "0.2500",
        "cost": "5.4000",
        "lineid": "JSZaRyxRPEAgCg==",
        "taxcode": "n/a",
        "qty": "1.0000",
        "totaltax": "0.00",
        "isoptional": "false",
        "takeoffname": "Ground Floor",
        "taxrate": "0.00",
        "totalinc": "5.94",
        "itemtype": "Material",
        "item": "Clipsal 10 Amp 2000 SERIES Double Switched Internal Powerpoint White",
        "parentlineid": "JSZaRyxRPEggCg==",
        "sell": "5.9400",
        "labourtotal": "16.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyJQPFggCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "PJ151510",
        "isapproved": "true",
        "totalex": "34.51",
        "labourunitrate": "0.0000",
        "cost": "31.3700",
        "lineid": "JSZaRyxRPFwgCg==",
        "taxcode": "GST",
        "qty": "1.0000",
        "totaltax": "3.45",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "37.96",
        "itemtype": "Material",
        "item": "B&R 150mm x 150mm x 100mm POLYNOVA PJ Junction Box With Opaque Lid",
        "parentlineid": "",
        "sell": "34.5070",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyBQXDAgCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "PJ151515",
        "isapproved": "true",
        "totalex": "74.76",
        "labourunitrate": "0.0000",
        "cost": "33.9800",
        "lineid": "JSZaRyxRPFggCg==",
        "taxcode": "GST",
        "qty": "2.0000",
        "totaltax": "7.48",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "82.24",
        "itemtype": "Material",
        "item": "B&R 150mm x 150mm x 150mm POLYNOVA PJ Junction Box With Opaque Lid",
        "parentlineid": "",
        "sell": "37.3780",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyBQLFAgCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "PJ221510T",
        "isapproved": "true",
        "totalex": "176.78",
        "labourunitrate": "0.0000",
        "cost": "53.5700",
        "lineid": "JSZaRyxRPFQgCg==",
        "taxcode": "GST",
        "qty": "3.0000",
        "totaltax": "17.68",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "194.46",
        "itemtype": "Material",
        "item": "B&R 220mm x 150mm x 100mm POLYNOVA PJ Junction Box With Transparent Lid",
        "parentlineid": "",
        "sell": "58.9270",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyBQLEQgCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "PC271817T",
        "isapproved": "true",
        "totalex": "486.46",
        "labourunitrate": "0.0000",
        "cost": "110.5600",
        "lineid": "JSZaRyxRPFAgCg==",
        "taxcode": "GST",
        "qty": "4.0000",
        "totaltax": "48.65",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "535.11",
        "itemtype": "Material",
        "item": "B&R 270mm x 180mm x 170mm Weatherproof IP66 Junction Box Clear PC2718",
        "parentlineid": "",
        "sell": "121.6160",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVydSXDQgCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "PC362717T",
        "isapproved": "true",
        "totalex": "874.45",
        "labourunitrate": "0.0000",
        "cost": "158.9900",
        "lineid": "JSZaRyxRLDQgCg==",
        "taxcode": "GST",
        "qty": "5.0000",
        "totaltax": "87.45",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "961.90",
        "itemtype": "Material",
        "item": "B&R 360mm x 270mm x 170mm Weatherproof IP66 Junction Box Clear PC2736",
        "parentlineid": "",
        "sell": "174.8890",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyBQTFggCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "PC542717T",
        "isapproved": "true",
        "totalex": "1621.42",
        "labourunitrate": "0.0000",
        "cost": "245.6700",
        "lineid": "JSZaRyxRLDAgCg==",
        "taxcode": "GST",
        "qty": "6.0000",
        "totaltax": "162.14",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "1783.56",
        "itemtype": "Material",
        "item": "B&R 540mm x 270mm x 170mm Weatherproof IP66 Junction Box Clear PC5427",
        "parentlineid": "",
        "sell": "270.2370",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyBQTEggCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "MC20OR",
        "isapproved": "true",
        "totalex": "115.81",
        "labourunitrate": "0.0000",
        "cost": "15.0400",
        "lineid": "JSZaRyxRLEwgCg==",
        "taxcode": "GST",
        "qty": "7.0000",
        "totaltax": "11.58",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "127.39",
        "itemtype": "Material",
        "item": "Australian Plastics 20mm x 10 Metre Heavy Duty Corrugated Conduit",
        "parentlineid": "",
        "sell": "16.5440",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyFSXDQgCg=="
      },
      {
        "worktypevalue": "0.0000",
        "quote": {
          "quoteid": "JCc6Ty1SUCAgCg==",
          "quotename": "Supplier Quotes Test"
        },
        "worktype": "",
        "optiongroupname": "",
        "partno": "MC25OR",
        "isapproved": "true",
        "totalex": "171.07",
        "labourunitrate": "0.0000",
        "cost": "19.4400",
        "lineid": "JSZaRyxRLEggCg==",
        "taxcode": "GST",
        "qty": "8.0000",
        "totaltax": "17.11",
        "isoptional": "false",
        "takeoffname": "1st Floor",
        "taxrate": "10.00",
        "totalinc": "188.18",
        "itemtype": "Material",
        "item": "Australian Plastics 25mm x 10 Metre Heavy Duty Corrugated Conduit",
        "parentlineid": "",
        "sell": "21.3840",
        "labourtotal": "0.00",
        "markup": "10.0000",
        "labourmarkup": "0.0000",
        "itemid": "JSZKVyJQTFAgCg=="
      }
    ],
    "currentpageresults": 11
  }
}
```

