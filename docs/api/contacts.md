# Contacts

This zone is READ ONLY.

This zone allows you to retrieve contact data for clients [Contacts](https://help.aroflo.com/display/office/Contacts)

## WHERE filters

| Field | Value |
| --- | --- |
| userid | AroFlo ID |
| archived | BOOLEAN |
| contacttype | String(client OR contractor) |
| createdutc | DATE(YYYY-MM-DD) |
| createddatetimeutc | DATE(YYYY-MM-DD  HH:mm:ss) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

**Authorization:** bearer


---

### GET Get Contacts

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve Client Contacts

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
        'zone=' + encodeURIComponent('contacts')
        ,'where=' + encodeURIComponent('and|archived|=|false')
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

#### Get Contacts (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "contacts": [
      {
        "surname": "Accounts",
        "org": {
          "orgid": "JCdKUyxQICAgCg==",
          "orgname": "Myer"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJQICAgCg==",
        "username": "658959EF-4198-4FAC-940E-3B3EB7CB98C9",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKLyRQQCAgCg==",
          "orgname": "Training account 123"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxQQCAgCg==",
        "username": "857010C4-85CF-4D97-8256-3EDE4BB55596",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKLyRQUCAgCg==",
          "orgname": "Training Client"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxQUCAgCg==",
        "username": "FCB7317D-0E8A-4497-926B-C042B863D3D3",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKLyRQICAgCg==",
          "orgname": "Training Client 12"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxQICAgCg==",
        "username": "5B203EC1-7140-4164-A9A9-4D9B0586CF54",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKLyRQMCAgCg==",
          "orgname": "training client 43"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxQMCAgCg==",
        "username": "F38A2CC3-A566-4357-857D-0D6F64BA8B8D",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKLyRRQCAgCg==",
          "orgname": "Training Client 69"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxRQCAgCg==",
        "username": "AB6C5AFC-83EF-443B-BFFE-09B3EF3C95F8",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKLyRRUCAgCg==",
          "orgname": "Training Client2"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxRUCAgCg==",
        "username": "1E6ADCAF-DD74-49E1-9A9D-53066925414F",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Recieveable",
        "org": {
          "orgid": "JCdKLyRRICAgCg==",
          "orgname": "Training Company"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxRICAgCg==",
        "username": "5FA3DA3A-0600-488F-83DE-4E4E2CFE10B7",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKLyRRMCAgCg==",
          "orgname": "training Company 43"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxRMCAgCg==",
        "username": "2FAE1794-6BEF-4526-808A-BD7FE2DB1F0B",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JCdKUy1RMCAgCg==",
          "orgname": "test"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNRMCAgCg==",
        "username": "BAE41683-2799-4E33-A22C-644F1E685A1C",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JCdKLyVQMCAgCg==",
          "orgname": "World For Kids Client"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6Xy1QMCAgCg==",
        "username": "121CAC00-84B3-4C20-85CA-E696BA8B1941",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaTyVRTFggCg==",
          "orgname": "Core Electronics"
        },
        "phone": "02 4058 2818",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaSyVQTDAgCg==",
        "username": "07938270-8A31-4066-AE0E-4E0F293D6093",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaTyVRTEAgCg==",
          "orgname": "RS Components"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaSyVQXFAgCg==",
        "username": "C0BFB14E-FE6B-4E71-9DA7-AB71F534A496",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRXEAgCg==",
          "orgname": "JayCar Electronics"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQXFAgCg==",
        "username": "6D727CD3-BE27-49C0-B1CD-DA4659D1D47A",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRXEQgCg==",
          "orgname": "Bunnings"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQXFQgCg==",
        "username": "37F883FE-BCB3-4584-91D8-AAF3AEEF4A3D",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRXEggCg==",
          "orgname": "Scrooz"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQXFggCg==",
        "username": "EC9064D7-E74F-459F-8D28-968BBCACB5A5",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRXEwgCg==",
          "orgname": "Stainless Central"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQXFwgCg==",
        "username": "241FFCA4-BCDB-4978-BBE5-950F3C3C9714",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRXDAgCg==",
          "orgname": "Aus Electronics Direct"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQXEAgCg==",
        "username": "955733FA-1477-4B12-B389-2A5A2FA61057",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRLFggCg==",
          "orgname": "The Stainless Shop"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQXDAgCg==",
        "username": "CAAA1ABF-D6A5-49D5-9F14-0D9E66E96A67",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRLFwgCg==",
          "orgname": "Lawrence & Hanson"
        },
        "phone": "(03) 9793 4166",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQLFAgCg==",
        "username": "60E5F66A-3FFC-42AA-AA05-B21E89D06F25",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRLEggCg==",
          "orgname": "Bolt & Nut Australia"
        },
        "phone": "(07) 3192 9800",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQLEAgCg==",
        "username": "F1A56A98-EC7F-4D82-975B-CB8E0500D029",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRLDAgCg==",
          "orgname": "Frenergy Magnets"
        },
        "phone": "0424 444 508",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydQLEggCg==",
        "username": "FB2646DB-6BDB-4AD8-96E2-2A6D1C79EB64",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRPEwgCg==",
          "orgname": "Cubic Technology"
        },
        "phone": "(03) 8555 2079",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydRTEwgCg==",
        "username": "A3FE4B5B-4FC8-4D43-8825-AEB53FDAC56E",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Receivable",
        "org": {
          "orgid": "JSZaVydRPDAgCg==",
          "orgname": "eBay"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaUydRTDAgCg==",
        "username": "76BF7897-2EAC-41CF-BA58-8A415E5E208F",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JScqRyRRTEwgCg==",
          "orgname": "Dan Murphy's Marriott Waters"
        },
        "phone": "1300 723 388",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JScqQyNSXFQgCg==",
        "username": "6D456E70-6954-41CF-8425-F48AB1B5A7E3",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Payable",
        "org": {
          "orgid": "JScqRyRRTDAgCg==",
          "orgname": "Ringwood Square Shopping Centre"
        },
        "phone": "(03) 9870 1402",
        "contacttype": "client",
        "email": "beejay@bristowstagg.net",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Accounts",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JScqQyNSXFggCg==",
        "username": "A2DDDE4E-43AD-4357-882A-BF280015460E",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Vanda",
        "org": {
          "orgid": "JCdKLyRSUCAgCg==",
          "orgname": "Vanda Constructions"
        },
        "phone": "410696119",
        "contacttype": "client",
        "email": "vanda@vandaconstructions.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Adam",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxSUCAgCg==",
        "username": "79DB2747-5C88-40B2-8A80-906F415AA28A",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Bull",
        "org": {
          "orgid": "JCdKUydSUCAgCg==",
          "orgname": "ABC Building"
        },
        "phone": "03-9259-5200 Tanya",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Alan",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyVSUCAgCg==",
        "username": "9E154EE0-60BD-4E45-AD51-1911FE040423",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Smith",
        "org": {
          "orgid": "JCdKUyBQQCAgCg==",
          "orgname": "ABC Plumbing Sydney"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Andrew",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZQQCAgCg==",
        "username": "620D3C7D-89D2-4E48-A213-6D21D3C8094F",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Newton",
        "org": {
          "orgid": "JCdKUyxRUCAgCg==",
          "orgname": "Newton Bert"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Bert",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJRUCAgCg==",
        "username": "3F8E7DBF-7586-4512-B098-CAF77E3F4EE9",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Jones",
        "org": {
          "orgid": "JCdKUyNRQCAgCg==",
          "orgname": "Jones Bill"
        },
        "phone": "03 9578 1234",
        "contacttype": "client",
        "email": "bill@jones.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Bill",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFRQCAgCg==",
        "username": "9B5BAC97-2990-44FA-9313-90CE6FB68800",
        "archived": "false",
        "fax": "",
        "mobile": "0141 221 545"
      },
      {
        "surname": "Mansfield",
        "org": {
          "orgid": "JCdKUyxSQCAgCg==",
          "orgname": "OPTUS"
        },
        "phone": "35896655",
        "contacttype": "client",
        "email": "sales@teldaco.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Bob",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJSQCAgCg==",
        "username": "A60DAE9F-CA24-48DB-81EF-5BC680E8666B",
        "archived": "false",
        "fax": "325896321",
        "mobile": "407816848"
      },
      {
        "surname": "Smith",
        "org": {
          "orgid": "JCdKUyBQMCAgCg==",
          "orgname": "Big Bobs Bits"
        },
        "phone": "(02) 6549 8712",
        "contacttype": "client",
        "email": "gimme234223@hotmail.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Bob",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZQMCAgCg==",
        "username": "0BA4D00B-B173-4DF8-B166-B676E0C39448",
        "archived": "false",
        "fax": "69854721",
        "mobile": "421158798"
      },
      {
        "surname": "Smith",
        "org": {
          "orgid": "JCdKUyBRMCAgCg==",
          "orgname": "City Council"
        },
        "phone": "07 1234 5678",
        "contacttype": "client",
        "email": "bjones@whereever.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Bob",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZRMCAgCg==",
        "username": "F582A881-C7AD-43C1-9166-79D476CC40AD",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Smith",
        "org": {
          "orgid": "JCdKUyFSUCAgCg==",
          "orgname": "Example Commercial Customer"
        },
        "phone": "03 9497 1900",
        "contacttype": "client",
        "email": "andrew.bantos@techtrac.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Bob",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydSUCAgCg==",
        "username": "2F1BD20F-72AB-483C-A37B-E2A9FE82B7F2",
        "archived": "false",
        "fax": "03 9497 1901",
        "mobile": "0438 123 456"
      },
      {
        "surname": "Kane",
        "org": {
          "orgid": "JCdKUyNRICAgCg==",
          "orgname": "Kane Cathy"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Cathy",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFRICAgCg==",
        "username": "8FF7A42D-7245-46E8-A79C-84D9E933E084",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Kane",
        "org": {
          "orgid": "JCdKUyBRICAgCg==",
          "orgname": "Charlane Pty Ltd"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Charlie",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZRICAgCg==",
        "username": "61B4E4C0-EB0F-488C-9137-6AC17FF20D3F",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Contact",
        "org": {
          "orgid": "JCdKUyBQUCAgCg==",
          "orgname": "Andrea Test"
        },
        "phone": "",
        "contacttype": "client",
        "email": "child.contact@andrea-test.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Child",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZQUCAgCg==",
        "username": "35F93B8D-92A7-4B89-BDCC-7936540B221C",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Lotta",
        "org": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "phone": "03 9259 5200",
        "contacttype": "contractor",
        "email": "costa.lotta@cables4u.example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Costa",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqQyFSQCAgCg==",
        "username": "74321B77-1E71-4202-B421-B5413AF24092",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Lotta",
        "org": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "phone": "03 xxxx xxxx",
        "contacttype": "contractor",
        "email": "costa.lotta@cables4u.example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Costa",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqRy1SQCAgCg==",
        "username": "E517820F-2702-4F62-9DF4-B233ACAD61EB",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Lotta",
        "org": {
          "orgid": "JCQ6UyZSUCAgCg==",
          "orgname": "A Test Supplier 1"
        },
        "phone": "03 9259 5200",
        "contacttype": "contractor",
        "email": "costa.lotta@cables4u.example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Costa",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqWyFQICAgCg==",
        "username": "2CBA1439-6ACA-400F-BA60-26680F9DBA87",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Walter",
        "org": {
          "orgid": "JCdKUyNRUCAgCg==",
          "orgname": "JVC Services"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Denis",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFRUCAgCg==",
        "username": "7E1A4375-9F05-4F55-8BCD-0CE98937AA1F",
        "archived": "false",
        "fax": "",
        "mobile": "408694626"
      },
      {
        "surname": "dave",
        "org": {
          "orgid": "JCdKUyNRMCAgCg==",
          "orgname": "Kris's Krispy Kebabs"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Dodgy",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFRMCAgCg==",
        "username": "712A14AB-1F6E-4010-BE1C-38F240A45C8D",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Matthews",
        "org": {
          "orgid": "JCQ6UyZRICAgCg==",
          "orgname": "Trifixx  Pty. Ltd."
        },
        "phone": "03 9543 8422",
        "contacttype": "contractor",
        "email": "sales@trifixx.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Eric",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqWyBSUCAgCg==",
        "username": "191644E0-1CA0-4960-9906-F9BB4EDAB169",
        "archived": "false",
        "fax": "03 9543 9377",
        "mobile": "0418 362 414"
      },
      {
        "surname": "Matthews",
        "org": {
          "orgid": "JCQ6UyZRMCAgCg==",
          "orgname": "Trifixx  Pty. Ltd.1"
        },
        "phone": "03 9543 8422",
        "contacttype": "contractor",
        "email": "sales@trifixx.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Eric",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqWyFQQCAgCg==",
        "username": "1DBAADDF-2F04-4305-883D-AE33AC314D7A",
        "archived": "false",
        "fax": "03 9543 9377",
        "mobile": "0418 362 414"
      },
      {
        "surname": "l",
        "org": {
          "orgid": "JCdKUyBSUCAgCg==",
          "orgname": "client a"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "f",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZSUCAgCg==",
        "username": "547C2556-091F-41E6-997D-62C4754716DD",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Flinstone",
        "org": {
          "orgid": "JCdKUyJQUCAgCg==",
          "orgname": "Freds Floors"
        },
        "phone": "391239123",
        "contacttype": "client",
        "email": "fred@flinstone.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Fred",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBQUCAgCg==",
        "username": "D342965C-8FED-4D5B-BEF3-5AEFF63674C9",
        "archived": "false",
        "fax": "",
        "mobile": "400123123"
      },
      {
        "surname": "Bush",
        "org": {
          "orgid": "JCdKUyFRUCAgCg==",
          "orgname": "Dodgey Brothers"
        },
        "phone": "03 8888 4545",
        "contacttype": "client",
        "email": "test@testemail.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "George",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydRUCAgCg==",
        "username": "91945511-42D0-4FC9-BCA9-1639B5116A8C",
        "archived": "false",
        "fax": "",
        "mobile": "0401 132 123"
      },
      {
        "surname": "Jettson",
        "org": {
          "orgid": "JCdKUyNQICAgCg==",
          "orgname": "Jettson George"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "George",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFQICAgCg==",
        "username": "3E0EA4B0-8B39-4052-8432-803188F1DBDD",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Lucas",
        "org": {
          "orgid": "JCQ6Xy1RQCAgCg==",
          "orgname": "Digsafe Locating & Camera Ltd"
        },
        "phone": "1300 794 818",
        "contacttype": "contractor",
        "email": "george.lucas@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "George",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQqRy1SUCAgCg==",
        "username": "CB37FCA2-05E3-685A-B69786BB0599083A",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Lucas",
        "org": {
          "orgid": "JCQ6WyBRMCAgCg==",
          "orgname": "A Test Supplier"
        },
        "phone": "1300 794 818",
        "contacttype": "contractor",
        "email": "george.lucas@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "George",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQqQyFSUCAgCg==",
        "username": "35C54D92-99AE-C048-E43B3A58BF9DBB40",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Tagliaferri",
        "org": {
          "orgid": "JCdKUyxQQCAgCg==",
          "orgname": "Manjimip Gateway Hotel"
        },
        "phone": "432659024",
        "contacttype": "client",
        "email": "jellis@nfe.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Georgina",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJQQCAgCg==",
        "username": "9651A7CE-0063-43C1-BF00-9CD8AD773BB3",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Big Bloke",
        "org": {
          "orgid": "JCdKUyBRUCAgCg==",
          "orgname": "Caelli"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Gerald",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZRUCAgCg==",
        "username": "D280AC87-E97B-4A47-98AE-FC19E14BF548",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Fox",
        "org": {
          "orgid": "JCdKUyBSQCAgCg==",
          "orgname": "Client 4 CBD"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Harry",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZSQCAgCg==",
        "username": "E2CE9ABC-7087-4E08-AE86-97177F30C3C2",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Baxter",
        "org": {
          "orgid": "JCdKUyJQMCAgCg==",
          "orgname": "Harry  Baxter"
        },
        "phone": "9872 6612",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Harry",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBQMCAgCg==",
        "username": "6190BF6D-1B0B-47D7-8A28-2C35400747F9",
        "archived": "false",
        "fax": "",
        "mobile": "0408 694 626"
      },
      {
        "surname": "High",
        "org": {
          "orgid": "JCdKUyJRUCAgCg==",
          "orgname": "High Harry"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Harry",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBRUCAgCg==",
        "username": "F487FBA6-DF05-4E46-BA2F-5C611C58C3B4",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Simpsonhjkhbjkhbjkh",
        "org": {
          "orgid": "JCdKUyFRICAgCg==",
          "orgname": "Donut King"
        },
        "phone": "1.23E+20",
        "contacttype": "client",
        "email": "homer@simp.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Homer",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydRICAgCg==",
        "username": "8729972A-0BE9-4282-9022-87491BC18054",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Hoh",
        "org": {
          "orgid": "JCdKUyFQUCAgCg==",
          "orgname": "Crust Pizza"
        },
        "phone": "08 9301 1099",
        "contacttype": "client",
        "email": "bradley@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Ivan",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydQUCAgCg==",
        "username": "8917F9FB-7E11-40D0-92F7-D97952A6B937",
        "archived": "false",
        "fax": "",
        "mobile": "459488162"
      },
      {
        "surname": "Jeeves",
        "org": {
          "orgid": "JCdKUyJRICAgCg==",
          "orgname": "Jackson Jeeves"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jackson",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBRICAgCg==",
        "username": "72958E91-B09D-489A-9FEB-D06F11DFE49F",
        "archived": "false",
        "fax": "",
        "mobile": "0408 694 626"
      },
      {
        "surname": "Blundel",
        "org": {
          "orgid": "JCdKUyJRMCAgCg==",
          "orgname": "James Blundel"
        },
        "phone": "9872 6612",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "James",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBRMCAgCg==",
        "username": "24028C82-A942-4E19-ADCA-6632FD938EED",
        "archived": "false",
        "fax": "",
        "mobile": "0408 694 626"
      },
      {
        "surname": "Smith",
        "org": {
          "orgid": "JCdKUyFQICAgCg==",
          "orgname": "CSQ  DLGPSR"
        },
        "phone": "1300254254",
        "contacttype": "client",
        "email": "sales@teldaco.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jane",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydQICAgCg==",
        "username": "6BF95B45-B34C-4B0A-A11F-7D436619C99E",
        "archived": "false",
        "fax": "732251111",
        "mobile": ""
      },
      {
        "surname": "Harrison",
        "org": {
          "orgid": "JCdKUyJSUCAgCg==",
          "orgname": "Janine Harrison"
        },
        "phone": "9872 6612",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Janine",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBSUCAgCg==",
        "username": "D0ED01B0-7FEC-4902-882A-1BCBC2F18C22",
        "archived": "false",
        "fax": "",
        "mobile": "0408 694 626"
      },
      {
        "surname": "Ball",
        "org": {
          "orgid": "JCdKUyNQQCAgCg==",
          "orgname": "Jason Ball"
        },
        "phone": "9845 2545",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jason",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFQQCAgCg==",
        "username": "BBB23434-E1A3-4DA2-9B4D-122F18AF1313",
        "archived": "false",
        "fax": "",
        "mobile": "0408 696624"
      },
      {
        "surname": "Taite",
        "org": {
          "orgid": "JCdKUyNQUCAgCg==",
          "orgname": "Jason Taite"
        },
        "phone": "987 587",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jason",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFQUCAgCg==",
        "username": "2C31AA76-516F-49F8-8934-97A08D8F0E15",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Gibbs",
        "org": {
          "orgid": "JCdKUyJQICAgCg==",
          "orgname": "Gibbs Jason"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jason",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBQICAgCg==",
        "username": "61590751-E800-4A9C-83C0-1EDEE993CE3E",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Bourne",
        "org": {
          "orgid": "JCdKUydSQCAgCg==",
          "orgname": "Aardvaark ConsultantsCLR2"
        },
        "phone": "1300 794 818",
        "contacttype": "client",
        "email": "jason.bourne@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jason",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQqQyFRMCAgCg==",
        "username": "353B1868-D841-703A-18F0552B2FA09A35",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Bourne",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "phone": "03 1234 5678",
        "contacttype": "client",
        "email": "bradley@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jason",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQqWyVSQCAgCg==",
        "username": "jason.bourne.aroflo",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Doe",
        "org": {
          "orgid": "JCQ6WyBRICAgCg==",
          "orgname": "A Test Client"
        },
        "phone": "03 9259 5200",
        "contacttype": "client",
        "email": "jayne.doe@example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jayne",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqQyFRICAgCg==",
        "username": "DD53D0CF-5F18-4E72-9620-5C1A0DA5CB58",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Doe",
        "org": {
          "orgid": "JSc6LyRSTEwgCg==",
          "orgname": "A second Test Client"
        },
        "phone": "03 1234 5678",
        "contacttype": "client",
        "email": "jayne.doe@example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jayne",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6KyBRXFwgCg==",
        "username": "175E3786-303F-4593-8322-58679B30CF2F",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Doe",
        "org": {
          "orgid": "JCQ6WyNQUCAgCg==",
          "orgname": "A Test Client no country state"
        },
        "phone": "03 9259 5200",
        "contacttype": "client",
        "email": "jayne.doe@example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jayne",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqQyxRQCAgCg==",
        "username": "0AACFA18-D082-4196-9E17-02A58C5991FF",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Doe",
        "org": {
          "orgid": "JCQ6WyNQICAgCg==",
          "orgname": "A Test Client no country state 2"
        },
        "phone": "03 9259 5200",
        "contacttype": "client",
        "email": "jayne.doe@example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jayne",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqQyxRUCAgCg==",
        "username": "48B424EF-850C-4370-B81C-7A5F8F953F8F",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Doe",
        "org": {
          "orgid": "JCQ6XyxRQCAgCg==",
          "orgname": "Test Client"
        },
        "phone": "03 9259 5200",
        "contacttype": "client",
        "email": "jayne.doe@example.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jayne",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqRyxQICAgCg==",
        "username": "69043276-1BCD-44FB-B205-DC8959209725",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "0400 XXX XXX"
      },
      {
        "surname": "Bartell",
        "org": {
          "orgid": "JSc6QyNSXFggCg==",
          "orgname": "Jimmy Bartell"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "hahcroydon@gmail.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jimmy",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6Xy1STEggCg==",
        "username": "0A5BBACB-67F0-47B1-9C89-3D49661F9F64",
        "archived": "false",
        "fax": "undefined",
        "mobile": "0447648911"
      },
      {
        "surname": "Bartell",
        "org": {
          "orgid": "JSc6QyNSXFwgCg==",
          "orgname": "Jimmy Bartell1"
        },
        "phone": "",
        "contacttype": "client",
        "email": "hahcroydon@gmail.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jimmy",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6Xy1STEwgCg==",
        "username": "C900B7B4-B737-4F4B-B247-F16E9C0C37E2",
        "archived": "false",
        "fax": "",
        "mobile": "0447648911"
      },
      {
        "surname": "Bartell",
        "org": {
          "orgid": "JSc6QyNSXDAgCg==",
          "orgname": "Jimmy Bartell2"
        },
        "phone": "111",
        "contacttype": "client",
        "email": "me@me.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jimmy",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6Xy1SXFggCg==",
        "username": "3BE5E854-9E14-4C51-ACEA-53442779BFB4",
        "archived": "false",
        "fax": "222",
        "mobile": "333"
      },
      {
        "surname": "Bartell",
        "org": {
          "orgid": "JSc6QyxQTFAgCg==",
          "orgname": "Jimmy Bartell3"
        },
        "phone": "111",
        "contacttype": "client",
        "email": "me@me.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jimmy",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6Xy1SXEAgCg==",
        "username": "18F290F6-214E-4AA9-8084-7A3AE606CE81",
        "archived": "false",
        "fax": "222",
        "mobile": "333"
      },
      {
        "surname": "king",
        "org": {
          "orgid": "JCdKUyNSQCAgCg==",
          "orgname": "lala"
        },
        "phone": "999999",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "jo",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFSQCAgCg==",
        "username": "456C1115-8E99-4F2A-BA41-2C9DDB2E9222",
        "archived": "false",
        "fax": "999999",
        "mobile": ""
      },
      {
        "surname": "bloggs",
        "org": {
          "orgid": "JCdKUyFRMCAgCg==",
          "orgname": "Emily"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "joe",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydRMCAgCg==",
        "username": "C8C5FB3D-3415-4CA0-AA78-F2F10732679B",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Example",
        "org": {
          "orgid": "JCdKUyBQICAgCg==",
          "orgname": "Aardvaark Consultants"
        },
        "phone": "03 1234 5678",
        "contacttype": "client",
        "email": "mike.phillips@mynewwebsite.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZQICAgCg==",
        "username": "EF2557F4-58E2-4022-A5BF-776D81514598",
        "archived": "false",
        "fax": "03 5678 1234",
        "mobile": "0422 000 000"
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QTDQgCg==",
          "orgname": "Testy McTest 20190909-1"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QPFwgCg==",
        "username": "66FF2209-D620-4D43-8F3F-4CB14647DBB4",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXFAgCg==",
          "orgname": "Testy McTest 20190909-2"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QPEAgCg==",
        "username": "743D30B4-7C2F-4AE5-B10E-D26EAEEDE118",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXFQgCg==",
          "orgname": "Testy McTest 20190909-3"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QPEQgCg==",
        "username": "B14586D4-C181-4164-A97E-F936552E50AB",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXFggCg==",
          "orgname": "Testy McTest 20190909-4"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QPEggCg==",
        "username": "0F0C4FD5-BAC5-4BDF-856D-CFF91763A00C",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXEAgCg==",
          "orgname": "Testy McTest 20190909-5"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QPDAgCg==",
        "username": "AFBE2BAF-FFA0-4B19-9F69-93DB3B9E32E3",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXEQgCg==",
          "orgname": "Testy McTest 20190909-6"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QPDQgCg==",
        "username": "10CD6B64-5E8D-49A3-8D2A-76CFD111A738",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXEggCg==",
          "orgname": "Testy McTest 20190909-7"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1RTFAgCg==",
        "username": "19C7D1B3-437A-4A92-BADD-E074DB496FD1",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXEwgCg==",
          "orgname": "Testy McTest 20190909-8"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1RTFQgCg==",
        "username": "0529880A-D38A-40A0-9A51-45477278F725",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "Mignola",
        "org": {
          "orgid": "JSZaUy1QXDAgCg==",
          "orgname": "Testy McTest 20190909-9"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1RTFggCg==",
        "username": "B9C78FC2-FA19-481C-9C76-9CFC93637573",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "Blogs",
        "org": {
          "orgid": "JSZaKyxQTFQgCg==",
          "orgname": "My Crazy new Client"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZKTy1QLFQgCg==",
        "username": "46AF5471-E3FD-405C-A556-DA2B2E75D53A",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "Bloggs",
        "org": {
          "orgid": "JCQ6SydRICAgCg==",
          "orgname": "A test name"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Joe",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQ6KyVQUCAgCg==",
        "username": "67CC9009-E9D4-411D-A7F5-EF1B85094133",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "rogers",
        "org": {
          "orgid": "JCdKUyNQMCAgCg==",
          "orgname": "John Rogers"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "john",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFQMCAgCg==",
        "username": "4587D904-43A0-4540-804D-F215AF9A6C48",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Newton",
        "org": {
          "orgid": "JCdKUyxRICAgCg==",
          "orgname": "Newton John"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "John",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJRICAgCg==",
        "username": "F0A46CB5-EC64-4ED0-AC08-DDFE18D7C15F",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Smith",
        "org": {
          "orgid": "JCdKUy1QMCAgCg==",
          "orgname": "Smith John"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "John",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNQMCAgCg==",
        "username": "70CA5B04-AA06-4D7E-A7EF-7469FE1A5EAA",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Vark",
        "org": {
          "orgid": "JCdKLyVQQCAgCg==",
          "orgname": "Vark Jona"
        },
        "phone": "03 9812 3456",
        "contacttype": "client",
        "email": "JonaVark@mailserver.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Jona",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6Xy1QQCAgCg==",
        "username": "EC3B7668-9492-4949-A052-52AFC5B7173D",
        "archived": "false",
        "fax": "03 9812 3457",
        "mobile": ""
      },
      {
        "surname": "Robert-Smith",
        "org": {
          "orgid": "JCdKUyxQUCAgCg==",
          "orgname": "Mary Robert-Smith"
        },
        "phone": "92595200",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Mary",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJQUCAgCg==",
        "username": "2514D336-E5AF-49B5-9862-975EFEF8E225",
        "archived": "false",
        "fax": "",
        "mobile": "0408 694626"
      },
      {
        "surname": "Pain",
        "org": {
          "orgid": "JCdKUy1QICAgCg==",
          "orgname": "Salta"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Max",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNQICAgCg==",
        "username": "06BDC9F5-623E-465A-9C66-A6189312F00E",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Orr",
        "org": {
          "orgid": "JCdKUyxSUCAgCg==",
          "orgname": "Orriginal"
        },
        "phone": "",
        "contacttype": "client",
        "email": "michael.david.orr@me.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Michael",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJSUCAgCg==",
        "username": "7196A8DA-EFCB-4AC6-9ED3-EDF3F348FCC8",
        "archived": "false",
        "fax": "",
        "mobile": "402810043"
      },
      {
        "surname": "Cooper",
        "org": {
          "orgid": "JCdKUyxRMCAgCg==",
          "orgname": "OP Industries"
        },
        "phone": "425789789",
        "contacttype": "client",
        "email": "mcooper@opmelbourne.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Michelle",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJRMCAgCg==",
        "username": "062C4260-9121-4277-90CA-06FF95443B9D",
        "archived": "false",
        "fax": "",
        "mobile": "418443364"
      },
      {
        "surname": "Phillips",
        "org": {
          "orgid": "JCdKUydSQCAgCg==",
          "orgname": "Aardvaark ConsultantsCLR2"
        },
        "phone": "03 1234 5678",
        "contacttype": "client",
        "email": "arnegger@gmail.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Mike",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyVSQCAgCg==",
        "username": "BAD797EF-9380-4CDA-B474-B00A98A04814",
        "archived": "false",
        "fax": "03 9873 1620",
        "mobile": "0408 694 626"
      },
      {
        "surname": "Makehba",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "phone": "",
        "contacttype": "client",
        "email": "mriam.makehba@aroflo.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Mriam",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyVRMCAgCg==",
        "username": "D63AAD35-D03E-45D9-80FB-5120DA9AE99D",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Test Client",
        "org": {
          "orgid": "JCdKUyxRQCAgCg==",
          "orgname": "New Test Client"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "New",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJRQCAgCg==",
        "username": "18D72621-9904-4B6C-97C9-BBEF793C3817",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Cleradin",
        "org": {
          "orgid": "JCdKUyFQMCAgCg==",
          "orgname": "Cullen Wines"
        },
        "phone": "08 9755 5277",
        "contacttype": "client",
        "email": "cellardoor@cullenwines.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Nicolas",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydQMCAgCg==",
        "username": "67D9545B-E0EB-43A6-B649-7ADF21260465",
        "archived": "false",
        "fax": "08 9755 5550",
        "mobile": ""
      },
      {
        "surname": "Surname",
        "org": {
          "orgid": "JCdKUy1RICAgCg==",
          "orgname": "Sunland"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Paul",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNRICAgCg==",
        "username": "CAC82553-F05C-4E6F-8E0E-6B631447CBC1",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Flinstone",
        "org": {
          "orgid": "JCdKUyJQQCAgCg==",
          "orgname": "Flinstone & Co"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Pebbles",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBQQCAgCg==",
        "username": "83296A7F-9B3B-4357-A5A9-3F34EBA1A903",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Jamo",
        "org": {
          "orgid": "JCdKUyJSQCAgCg==",
          "orgname": "Jamison"
        },
        "phone": "03 92595200",
        "contacttype": "client",
        "email": "support@i-man.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Peter",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBSQCAgCg==",
        "username": "BE3B6A3A-21B4-4406-AFBA-0581B68B691F",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Rea",
        "org": {
          "orgid": "JCdKUyxQMCAgCg==",
          "orgname": "New Client PR"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Peter",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyJQMCAgCg==",
        "username": "3CD6B5E1-FD57-4BC4-B927-A9812125A3D7",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Mayhew",
        "org": {
          "orgid": "JCdKUydSQCAgCg==",
          "orgname": "Aardvaark ConsultantsCLR2"
        },
        "phone": "1300 794 818",
        "contacttype": "client",
        "email": "beejay@bristowstagg.net",
        "email2": "peter.mayhew@aroflo.com",
        "customfields": [],
        "notes": [],
        "givennames": "Peter",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQqRy1RMCAgCg==",
        "username": "CAD5B229-D1EE-D2F8-52B7E9633FF0C864",
        "archived": "false",
        "fax": "03 XXXX XXXX",
        "mobile": "04XX XXX XXX"
      },
      {
        "surname": "Surname",
        "org": {
          "orgid": "JCdKUyJRQCAgCg==",
          "orgname": "Hickory , Op"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Rob",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyBRQCAgCg==",
        "username": "4DC268C3-D368-4F9E-8E28-14B9AB002ED4",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Loft",
        "org": {
          "orgid": "JCdKLyVRQCAgCg==",
          "orgname": "Yarra Valley Services"
        },
        "phone": "9429 5001",
        "contacttype": "client",
        "email": "davidm@i-man.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Ronald",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6Xy1RQCAgCg==",
        "username": "469C8940-EF35-430F-A376-0D9E0D52EA5E",
        "archived": "false",
        "fax": "9429 5333",
        "mobile": "417948368"
      },
      {
        "surname": "G",
        "org": {
          "orgid": "JCdKUy1QQCAgCg==",
          "orgname": "rubie training WOO"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Rubie",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNQQCAgCg==",
        "username": "99552394-8964-4C84-B0EC-EE1604264F22",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "BeezNeez",
        "org": {
          "orgid": "JCdKUy1QUCAgCg==",
          "orgname": "Rubies Test Client"
        },
        "phone": "12345678",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Ruby-Gee",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNQUCAgCg==",
        "username": "9EDCEDC9-3E6E-4916-8964-19F3F5A42008",
        "archived": "false",
        "fax": "789456123",
        "mobile": "2525252525"
      },
      {
        "surname": "SaiSSSSV",
        "org": {
          "orgid": "JScqXyZSTEAgCg==",
          "orgname": "Test Supplier SaiSSSSV"
        },
        "phone": "(07) 3858 9400",
        "contacttype": "contractor",
        "email": "sayee.velan@cvservices.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Sayee",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JScqVyVQPDQgCg==",
        "username": "BE7F0AF6-775B-4B9A-BA82-ECB183F18820",
        "archived": "false",
        "fax": "(07) 3858 9499",
        "mobile": ""
      },
      {
        "surname": "SaiSSSSV",
        "org": {
          "orgid": "JScqXyZSTEQgCg==",
          "orgname": "Test Supplier SaiSV"
        },
        "phone": "(07) 3858 9400",
        "contacttype": "contractor",
        "email": "sayee.velan@cvservices.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Sayee",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JScqVyVRTFAgCg==",
        "username": "34B6DB3D-D72D-4DC1-AD43-193D9DD9DC06",
        "archived": "false",
        "fax": "(07) 3858 9499",
        "mobile": ""
      },
      {
        "surname": "el",
        "org": {
          "orgid": "JCdKUyFRQCAgCg==",
          "orgname": "DNR"
        },
        "phone": "850741",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "se",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydRQCAgCg==",
        "username": "0C522EE6-A7AD-4B44-8936-95AEB04CEE4F",
        "archived": "false",
        "fax": "5252",
        "mobile": ""
      },
      {
        "surname": "SERVICES",
        "org": {
          "orgid": "JCdKUy1RQCAgCg==",
          "orgname": "SPOTLESS SERVICES P/L"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "SPOTLESS",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNRQCAgCg==",
        "username": "57F83EE0-97A3-4259-AB25-56A91896928E",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Smith",
        "org": {
          "orgid": "JCdKLyVQUCAgCg==",
          "orgname": "Vodafone"
        },
        "phone": "5559999",
        "contacttype": "client",
        "email": "carl@i-man.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Steven",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6Xy1QUCAgCg==",
        "username": "7B854069-2A05-4C54-88E5-6370A61C5B9E",
        "archived": "false",
        "fax": "5559998",
        "mobile": "400555555"
      },
      {
        "surname": "Wisdom",
        "org": {
          "orgid": "JCdKUy1RUCAgCg==",
          "orgname": "Stuart Wisdom"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Stuart",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNRUCAgCg==",
        "username": "5E0F57F8-5580-486F-B55A-A3526E320974",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Worker",
        "org": {
          "orgid": "JCQ6KyVRICAgCg==",
          "orgname": "A-Grade Subbie"
        },
        "phone": "",
        "contacttype": "contractor",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Subbie",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JCQqUyJRUCAgCg==",
        "username": "96F0D93A-1154-446E-B53E-4ABC5D32B8A1",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Surname",
        "org": {
          "orgid": "JCdKUyBRQCAgCg==",
          "orgname": "Bovis"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Susan",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyZRQCAgCg==",
        "username": "3EB64D1D-73D1-43AD-AAED-0A8B732F6ED1",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Client",
        "org": {
          "orgid": "JCdKUyFQQCAgCg==",
          "orgname": "Client Test"
        },
        "phone": "",
        "contacttype": "client",
        "email": "fake'e@fakeemail.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Test",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydQQCAgCg==",
        "username": "DAC5BE17-5F93-49E4-B4E6-2008755A61A6",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "client",
        "org": {
          "orgid": "JCdKUy1SQCAgCg==",
          "orgname": "test client 23"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "test",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNSQCAgCg==",
        "username": "016C5302-A17B-4CCE-956A-3BE84DD3D790",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Test Surname",
        "org": {
          "orgid": "JScqSyNSTFggCg==",
          "orgname": "Test Client1"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Test First",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JScqQyBRPFQgCg==",
        "username": "4E9D0CD2-F61F-48B4-AB42-D899DC3036C3",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "McTester",
        "org": {
          "orgid": "JSc6QyFRXFwgCg==",
          "orgname": "Testy McTester1"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Testy",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6XyNQLFggCg==",
        "username": "15C13417-C7FA-42A7-B60E-E9202F29F759",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "McTester",
        "org": {
          "orgid": "JSc6QyFRXEAgCg==",
          "orgname": "Testy McTester"
        },
        "phone": "undefined",
        "contacttype": "client",
        "email": "undefined",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Testy",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6XyNQLFwgCg==",
        "username": "FF75721A-7196-4627-9402-A69CA96E0DB7",
        "archived": "false",
        "fax": "undefined",
        "mobile": "undefined"
      },
      {
        "surname": "McTester",
        "org": {
          "orgid": "JSc6QyNSXFQgCg==",
          "orgname": "Testy McTester99"
        },
        "phone": "000",
        "contacttype": "client",
        "email": "email@me.com",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Testy",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSc6Xy1STEQgCg==",
        "username": "CE7F769D-4EDE-4153-BC68-E5A64BCE7046",
        "archived": "false",
        "fax": "999",
        "mobile": "undefined"
      },
      {
        "surname": "Jones",
        "org": {
          "orgid": "JCdKUyFSQCAgCg==",
          "orgname": "EPA"
        },
        "phone": "321456987",
        "contacttype": "client",
        "email": "sales@teldaco.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Tim",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XydSQCAgCg==",
        "username": "3A6A788C-46B2-45CD-B4B3-968534290239",
        "archived": "false",
        "fax": "123456789",
        "mobile": "4321456987"
      },
      {
        "surname": "Abbott",
        "org": {
          "orgid": "JCdKUy1SUCAgCg==",
          "orgname": "The Training Company"
        },
        "phone": "88886666",
        "contacttype": "client",
        "email": "t.a@test.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Tony",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyNSUCAgCg==",
        "username": "BF58EB19-6A27-4F5E-93C3-B39B823991DD",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "SERVICES",
        "org": {
          "orgid": "JCdKLyRSQCAgCg==",
          "orgname": "TRANSFIELD SERVICES"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "TRANSFIELD",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyxSQCAgCg==",
        "username": "324FC351-38A2-4EE5-B623-E41854485E37",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Randal",
        "org": {
          "orgid": "JCdKUyNSUCAgCg==",
          "orgname": "LU Simon"
        },
        "phone": "0408 694 626",
        "contacttype": "client",
        "email": "teamims@i-man.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Wayne",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6XyFSUCAgCg==",
        "username": "E9AF7A9C-C4A4-49C4-853E-0D561ABAC508",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Flinstone",
        "org": {
          "orgid": "JCdKLyVQICAgCg==",
          "orgname": "Wilmas Windows"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Wilma",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JCQ6Xy1QICAgCg==",
        "username": "06F06DC4-F65C-40A5-9F3F-0C6C42CAE8D3",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Zheng",
        "org": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency"
        },
        "phone": "03 8391 1903",
        "contacttype": "client",
        "email": "yan.zheng@mazzeihomes.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Yan",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JSYqSydRXFwgCg==",
        "username": "02FA0F74-A036-8585-5D35A45CDEA59885",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "Zheng",
        "org": {
          "orgid": "JCdKUyBQQCAgCg==",
          "orgname": "ABC Plumbing Sydney"
        },
        "phone": "03 8391 1903",
        "contacttype": "client",
        "email": "yan.zheng@mazzeihomes.com.au",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Yan",
        "documentsandphotos": [],
        "accesstype": "Base",
        "userid": "JSYqSyBRTFQgCg==",
        "username": "9F4DF64A-E11D-8524-1A880AD19B00227C",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "HMAC",
        "org": {
          "orgid": "JSZaUy1QTFggCg==",
          "orgname": "Zapier HMAC Test"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Zapier",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QLFQgCg==",
        "username": "079FF3FE-B41E-4519-9CDF-E47BB268A033",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "HMAC",
        "org": {
          "orgid": "JSZaUy1QTFwgCg==",
          "orgname": "Zapier HMAC Test1"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Zapier",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QLFggCg==",
        "username": "5983CFF5-AF54-4AB4-BA7A-B2904C675370",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "HMAC",
        "org": {
          "orgid": "JSZaUy1QTEAgCg==",
          "orgname": "Zapier HMAC Test2"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Zapier",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QLFwgCg==",
        "username": "8C7C7BB2-EA5B-4846-B236-C777FF2940D5",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "HMAC",
        "org": {
          "orgid": "JSZaUy1QTEQgCg==",
          "orgname": "Zapier Test 3"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Zapier",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QLEAgCg==",
        "username": "F25A9262-A112-4A85-917B-FB7568EF499D",
        "archived": "false",
        "fax": "",
        "mobile": ""
      },
      {
        "surname": "HMAC",
        "org": {
          "orgid": "JSZaUy1QTEggCg==",
          "orgname": "Zapier Test 4"
        },
        "phone": "",
        "contacttype": "client",
        "email": "",
        "email2": "",
        "customfields": [],
        "notes": [],
        "givennames": "Zapier",
        "documentsandphotos": [],
        "accesstype": "Manager",
        "userid": "JSZaLy1QLEQgCg==",
        "username": "87585542-9E4A-45BC-9537-E1AC036B01A3",
        "archived": "false",
        "fax": "",
        "mobile": ""
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 39,
    "queryresponsetimes": {
      "USERS": 131
    },
    "currentpageresults": 137
  }
}
```

