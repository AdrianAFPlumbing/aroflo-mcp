# TaskResources

This zone allows you to add a resource to a task.

## POSTXML variable definition

<taskresources>
    <taskresource>
        <resource>
            <typeid>AroFlo ID</typeid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required   -->
            <type><![CDATA[ STRING(7) ]]>(org,user)</assignedtotype> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;>   INSERT required    -->
        </resource>
        <taskid>AroFlo ID</taskid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required   -->
    </taskresource>
</taskresources>

**Authorization:** bearer


---

### POST Insert Task Resource

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

//When using a POST request set the formVarString
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('taskResources')
        ,'postxml=' + encodeURIComponent('<taskresources><taskresource><resource><typeid>IyZaSyAK</typeid><type>org</type></resource><taskid>JiYqVyNRXFMiCg==</taskid></taskresource><taskresource><resource><typeid>IyZaXyEK</typeid><type>user</type></resource><taskid>JiYqVyNRTDciCg==</taskid></taskresource></taskresources>')
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

#### Create Task Resource (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "errors": [],
      "inserttotal": 1,
      "inserts": {
        "taskresources": [
          {
            "resource": {
              "typeid": "IyZaSyAK",
              "type": "org"
            },
            "taskid": "JiYqVyNRXFMiCg=="
          },
          {
            "resource": {
              "typeid": "IyZaXyEK",
              "type": "user"
            },
            "taskid": "JiYqVyNRTDciCg=="
          }
        ]
      }
    }
  }
}
```

