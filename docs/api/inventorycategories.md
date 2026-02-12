# InventoryCategories

This zone is READ ONLY.

This area lists the various [Inventory Categories](https://help.aroflo.com/display/office/Manage+Categories) for your AroFlo site.
This zone is Read Only.

## WHERE filters

| Field | Value |
| --- | --- |
| categoryid | AroFlo ID |
| categoryname | STRING |
| parentcategoryid | AroFlo ID |
| parentcategoryname | STRING |

**Authorization:** bearer


---

### GET Get InventoryCategories

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of inventory categories

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
        'zone=' + encodeURIComponent('inventorycategories')
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
        'zone=' + encodeURIComponent('inventorycategories')
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

#### Get InventoryCategories (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "inventorycategories": 7
    },
    "inventorycategories": [
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UydRICAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "0",
        "parentcategory": {
          "categoryid": "",
          "categoryname": ""
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Accessories"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UydRMCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "1",
        "parentcategory": {
          "categoryid": "JCc6UydRICAgCg==",
          "categoryname": "Accessories"
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Adaptable Boxes"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UydSQCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "0",
        "parentcategory": {
          "categoryid": "",
          "categoryname": ""
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Cabling"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UydSUCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "1",
        "parentcategory": {
          "categoryid": "JCc6UydSQCAgCg==",
          "categoryname": "Cabling"
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Cable - Data - Data Cable"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UyBQQCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "2",
        "parentcategory": {
          "categoryid": "JCc6UydSQCAgCg==",
          "categoryname": "Cabling"
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Cable - Flexible Cable"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UyBQUCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "3",
        "parentcategory": {
          "categoryid": "JCc6UydSQCAgCg==",
          "categoryname": "Cabling"
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Cable - Twin & Earth Cable"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UyBQICAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "0",
        "parentcategory": {
          "categoryid": "",
          "categoryname": ""
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Conduit"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UyBQMCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "1",
        "parentcategory": {
          "categoryid": "JCc6UyBQICAgCg==",
          "categoryname": "Conduit"
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Corrugated Conduit"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UyBRQCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "0",
        "parentcategory": {
          "categoryid": "",
          "categoryname": ""
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Powerpoints"
      },
      {
        "issoritem": "false",
        "usebustockalert": "false",
        "categoryid": "JCc6UyBRUCAgCg==",
        "marginon": "Off",
        "usechstockalert": "false",
        "useusersstockalert": "false",
        "listorder": "1",
        "parentcategory": {
          "categoryid": "JCc6UyBRQCAgCg==",
          "categoryname": "Powerpoints"
        },
        "defaultmargin": "0",
        "bustockalertlevel": "0",
        "userstockalertlevel": "0",
        "quoteusing": "Cost",
        "chstockalertlevel": "0",
        "categoryname": "Internal Powerpoints"
      }
    ],
    "currentpageresults": 10
  }
}
```

