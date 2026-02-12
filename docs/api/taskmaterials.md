# TaskMaterials

This zone allows you to pull the [materials](https://help.aroflo.com/display/office/Task+Worksheet+Materials) recorded on tasks without the overhead of the rest of the task information.

## WHERE filters

| Field | Value |
| --- | --- |
| taskid | AroFlo ID |
| status | quote,notstarted,inprogress,pending,completed,archived |
| materiallineid | AroFlo ID |
| isinventory | true,false |
| dateused | DATE(YYYY-MM-DD) |
| matlinkprocessed | true,false |
| matlinkprocesseddate | DATE(YYYY-MM-DD) |
| matlinkprocesseddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |
| purchaseorderisordered | true,false |
| deleteddate | DATE(YYYY-MM-DD) |
| deleteddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |

**Default WHERE clause**

AND date_used > DATEADD(d, -30, GETUTCDATE())

## POSTXML variable definition

<materials>
    <material>
        <lineid>AroFlo ID</lineid> <!-- INSERT no / UPDATE required -->
        <partnumber><![CDATA[ STRING(50) ]]></partnumber> <!-- INSERT required if no item supplied / UPDATE yes -->
        <item><![CDATA[ STRING(1000) ]]></item> <!-- INSERT required if no partnumber supplied / UPDATE yes -->
        <quantity>FLOAT</quantity> <!-- INSERT required / UPDATE yes -->
        <cost>FLOAT</cost> <!-- INSERT yes / UPDATE yes -->
        <markup>FLOAT</markup> <!-- INSERT yes / UPDATE yes -->
        <sell>FLOAT</sell> <!-- INSERT yes / UPDATE yes -->
        <dateused>DATE(YYYY-MM-DD)</dateused> <!-- INSERT yes / UPDATE no -->
        <matlinkprocessed>BOOLEAN</matlinkprocessed> <!-- INSERT no / UPDATE yes -->
        <takenfrom>
            <takenfromid>AroFlo ID</takenfromid>  <!-- INSERT required / UPDATE no -->
            <takenfromtype><![CDATA[ STRING(user,cholder) ]]></takenfromtype>  <!-- INSERT yes, if not supplied uses the Tasks BU / UPDATE no -->
        </takenfrom>
        <task>
            <taskid>AroFlo ID</taskid> <!-- INSERT required / UPDATE required -->
        </task>
    </material>
</materials>

Please note that updating any details of an inventory item on a task, will **not** update the details in the inventory.

**Authorization:** bearer


---

### GET Get TaskMaterials

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of task materials that have not been processed by the API. We do this by filtering on the matlinkprocessed field, which we should set TRUE after we process the data from AroFlo.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('taskmaterials')
        ,'where=' + encodeURIComponent('and|matlinkprocessed|=|false')
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
        'zone=' + encodeURIComponent('taskmaterials')
        ,'where=' + encodeURIComponent('and|matlinkprocessed|=|false')
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
        'zone=' + encodeURIComponent('taskmaterials')
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

#### Get TaskMaterials (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "materials": 54
    },
    "materials": [
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "#1 Lad4",
          "jobnumber": "1044",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydRMCAgCg==",
            "clientname": "#1 Ladies, Detective Agency"
          }
        },
        "quantity": "7",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "false",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6UyxRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Field"
        },
        "item": "Clipsal 32mm x 10 Metre Meduim Duty Corrugated Conduit",
        "cost": "1.8310",
        "deleteddate": "",
        "sell": "1.8310",
        "lineid": "JSYqRyVSTFAgCg==",
        "purchaseorderqtybilled": "",
        "partnumber": "9032TCM10GY",
        "purchaseorderqtyordered": "",
        "deletedtime": "",
        "dateused": "2018/07/26",
        "itemid": "JSZKVyFSTFQgCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaRyZSXFggCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "#1 Lad5",
          "jobnumber": "1045",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydRMCAgCg==",
            "clientname": "#1 Ladies, Detective Agency"
          }
        },
        "quantity": "7",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "false",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6UyxRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Field"
        },
        "item": "Clipsal 32mm x 10 Metre Meduim Duty Corrugated Conduit",
        "cost": "1.8310",
        "deleteddate": "",
        "sell": "1.8310",
        "lineid": "JSYqRyVSTFQgCg==",
        "purchaseorderqtybilled": "",
        "partnumber": "9032TCM10GY",
        "purchaseorderqtyordered": "",
        "deletedtime": "",
        "dateused": "2018/07/26",
        "itemid": "JSZKVyFSTFQgCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaRyZSXFggCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "#1 Lad5",
          "jobnumber": "1045",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydRMCAgCg==",
            "clientname": "#1 Ladies, Detective Agency"
          }
        },
        "quantity": "10",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "false",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6UyxRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Field"
        },
        "item": "2.5mm 2 Core & Earth Flat Cable Per Metre",
        "cost": "0.8007",
        "deleteddate": "",
        "sell": "0.8007",
        "lineid": "JSYqRyVSTFggCg==",
        "purchaseorderqtybilled": "",
        "partnumber": "2.5mm2C&EFLATPM",
        "purchaseorderqtyordered": "",
        "deletedtime": "",
        "dateused": "2018/07/26",
        "itemid": "JSZKVyFRXEQgCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaRydQLDAgCg==",
          "status": "Completed",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "#1 Lad6",
          "jobnumber": "1046",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydRMCAgCg==",
            "clientname": "#1 Ladies, Detective Agency"
          }
        },
        "quantity": "25",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "false",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6UyxRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Field"
        },
        "item": "2.5mm 2 Core & Earth Flat Cable Per Metre",
        "cost": "0.8007",
        "deleteddate": "",
        "sell": "0.8007",
        "lineid": "JSYqRyVSTEQgCg==",
        "purchaseorderqtybilled": "",
        "partnumber": "2.5mm2C&EFLATPM",
        "purchaseorderqtyordered": "",
        "deletedtime": "",
        "dateused": "2018/07/27",
        "itemid": "JSZKVyFRXEQgCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaRydQLDAgCg==",
          "status": "Completed",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "#1 Lad6",
          "jobnumber": "1046",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydRMCAgCg==",
            "clientname": "#1 Ladies, Detective Agency"
          }
        },
        "quantity": "30",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "false",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6UyxRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Field"
        },
        "item": "Clipsal 32mm x 10 Metre Meduim Duty Corrugated Conduit",
        "cost": "1.8310",
        "deleteddate": "",
        "sell": "1.8310",
        "lineid": "JSYqRyVSTEggCg==",
        "purchaseorderqtybilled": "",
        "partnumber": "9032TCM10GY",
        "purchaseorderqtyordered": "",
        "deletedtime": "",
        "dateused": "2018/07/27",
        "itemid": "JSZKVyFSTFQgCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "Aardva5",
          "jobnumber": "1049",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydSQCAgCg==",
            "clientname": "Aardvaark ConsultantsCLR2"
          }
        },
        "quantity": "1",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "false",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6XyRRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Sandbox"
        },
        "item": "something",
        "cost": "0.0000",
        "deleteddate": "",
        "sell": "0.0000",
        "lineid": "JSYqQyRSTFAgCg==",
        "purchaseorderqtybilled": "",
        "partnumber": "",
        "purchaseorderqtyordered": "",
        "deletedtime": "",
        "dateused": "2018/10/12",
        "itemid": "",
        "isinventory": "false",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "Aardva5",
          "jobnumber": "1049",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydSQCAgCg==",
            "clientname": "Aardvaark ConsultantsCLR2"
          }
        },
        "quantity": "1",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "true",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6XyRRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Sandbox"
        },
        "item": "Wattmaster Square Adaptable Junction Box 105mm x 105mm x 72mm",
        "cost": "3.2500",
        "deleteddate": "",
        "sell": "3.2500",
        "lineid": "JSYqQyVRPEwgCg==",
        "purchaseorderqtybilled": "1.0000",
        "partnumber": "ALCWQB0",
        "purchaseorderqtyordered": "1.0000",
        "deletedtime": "",
        "dateused": "2018/10/19",
        "itemid": "JSZKVydRLFAgCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "Aardva5",
          "jobnumber": "1049",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydSQCAgCg==",
            "clientname": "Aardvaark ConsultantsCLR2"
          }
        },
        "quantity": "2",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "true",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6XyRRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Sandbox"
        },
        "item": "Wattmaster Square Adaptable Junction Box 120mm x 85mm x 72mm",
        "cost": "3.2500",
        "deleteddate": "",
        "sell": "3.2500",
        "lineid": "JSYqQyVRPDAgCg==",
        "purchaseorderqtybilled": "2.0000",
        "partnumber": "ALCWQB1",
        "purchaseorderqtyordered": "2.0000",
        "deletedtime": "",
        "dateused": "2018/10/19",
        "itemid": "JSZKVydRLFQgCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      },
      {
        "matlinkprocesseddatetime": " ",
        "matlinkprocesseddate": "",
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "status": "Not Started",
          "org": {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox"
          },
          "linkprocesseddate": " ",
          "refcode": "Aardva5",
          "jobnumber": "1049",
          "linkprocessed": "false",
          "client": {
            "clientid": "JCdKUydSQCAgCg==",
            "clientname": "Aardvaark ConsultantsCLR2"
          }
        },
        "quantity": "3",
        "matlinkprocessed": "false",
        "purchaseorderisordered": "true",
        "deleted": "false",
        "takenfrom": {
          "takenfromid": "JCQ6XyRRUCAgCg==",
          "takenfromtype": "user",
          "takenfromname": "Bradley Sandbox"
        },
        "item": "Wattmaster Square Adaptable Junction Box 120mm x 120mm x 93mm",
        "cost": "3.2500",
        "deleteddate": "",
        "sell": "3.2500",
        "lineid": "JSYqQyVRPDQgCg==",
        "purchaseorderqtybilled": "3.0000",
        "partnumber": "ALCWQB2",
        "purchaseorderqtyordered": "3.0000",
        "deletedtime": "",
        "dateused": "2018/10/19",
        "itemid": "JSZKVydRLFggCg==",
        "isinventory": "true",
        "deleteddatetime": " "
      }
    ],
    "currentpageresults": 9
  }
}
```


---

### POST Insert AdHoc materials

`POST https://api.aroflo.com/`

Add a new adHoc item to a task via the TaskMaterials zone. Multiple materials can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('taskmaterials')
        ,'postxml=' + encodeURIComponent('<![CDATA[OLX7/085-2ERB]]><![CDATA[CABLE 4MM 2 FL 2C&E WH/RB&E PVC 100M CNC]]>2.44003.17202016/07/050JSZaRyZSXFQgCg==')
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
        'zone=' + encodeURIComponent('taskmaterials')
        ,'where=' + encodeURIComponent('and|lablinkprocessed|=|false')
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
        'zone=' + encodeURIComponent('taskmaterials')
        ,'postxml=' + encodeURIComponent('<materials><material><partnumber><![CDATA[OLX7/085-2ERB]]></partnumber><item><![CDATA[CABLE 4MM 2 FL 2C&E WH/RB&E PVC 100M CNC]]></item><cost>2.4400</cost><markup></markup><sell>3.1720</sell><dateused>2016/07/05</dateused><quantity>0</quantity><task><taskid>JSZaRyZSXFQgCg==</taskid></task></material></materials>')
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

### POST Mark TaskMaterials LinkProcessed

`POST https://api.aroflo.com/`

Mark a material item as linkprocessed. Note that the taskid and lineid are both required fields.  Multiple materials can be marked as processed by including multiple '` keys

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('taskmaterials')
        ,'postxml=' + encodeURIComponent('JSYqRyVRPDQgCg==trueJSZaRyZSXFQgCg==')
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
        'zone=' + encodeURIComponent('taskmaterials')
        ,'where=' + encodeURIComponent('and|lablinkprocessed|=|false')
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
        'zone=' + encodeURIComponent('taskmaterials')
        ,'postxml=' + encodeURIComponent('<materials><material><lineid>JSYqRyVRPDQgCg==</lineid><matlinkprocessed>true</matlinkprocessed><task><taskid>JSZaRyZSXFQgCg==</taskid></task></material></materials>')
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

#### Mark TaskMaterials LinkProcessed (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "materials": [
          {
            "task": {
              "taskid": "JSZaRyZSXFQgCg=="
            },
            "lineid": "JSYqRyVRPDQgCg==",
            "matlinkprocessed": "true"
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "materials": []
      }
    }
  }
}
```

