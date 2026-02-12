# MessageTemplates

This zone allows retrieving, updating and creating [message templates](https://help.aroflo.com/x/E57cAw) from your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| templateid | AroFlo ID |
| formattype | AroFlo ID |
| createdutc | DATE(YYYY-MM-DD) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND created_utc > DATEADD(d, -30, GETUTCDATE())

**Authorization:** bearer


---

### GET Get Message Templates

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
        'zone=' + encodeURIComponent('MessageTemplates')
        ,'where=' + encodeURIComponent('and|formattype|=|text')
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
        'zone=' + encodeURIComponent('tasks')
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

#### Get Message Templates (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "messagetemplates": [
      {
        "createdutc": "",
        "formattype": "Text",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "templateid": "JCYqWy1QICAgCg==",
        "templatetext": "{\n    \"assignedEmail\": \"[Task Assigned To Email]\",\n    \"client\": \"[Client Name]\",\n    \"contactEmail\": \"[Reported By/Contact Email]\",\n    \"scheduleDateTime\": \"[Schedule Date @ Time]\",\n    \"eventDescription\": \"[Schedule Event Description]\",\n    \"eventTitle\": \"[Schedule Event Title]\",\n    \"jobnumber\": \"[Job Number]\",\n    \"reportedby\": \"[Reported By/Contact]\",\n    \"scheduleNote\": \"[Schedule Note]\",\n    \"task\": \"[Task]\",\n    \"taskLink\": \"[Task URL Link (office)]\",\n    \"taskDescription\": \"[Description]\",\n    \"taskType\": \"[Task Type]\",\n    \"scheduleResources\": \"[Schedule Resources]\",\n    \"eventMessageType\": \"[Event Message Type]\"\n}",
        "templatename": "ZAPCreateEditSchedule",
        "templatesubject": "Event Message Type: [Event Message Type]"
      },
      {
        "createdutc": "",
        "formattype": "Text",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "templateid": "JCYqVyxSQCAgCg==",
        "templatetext": "{ \"reportedby\":\"[Reported By/Contact]\",\"reportedByGivenname\":\"[Reported By/Contact Givennames]\",\"reportedBySurname\":\"[Reported By/Contact Surname]\",\"client\":\"[Client Name]\",\"contactEmail\":\"[Reported By/Contact Email]\",\"eventTitle\":\"[Schedule Event Title]\",\"eventDescription\":\"[Schedule Event Description]\",\"scheduleDateTime\":\"[Schedule Date @ Time]\",\"scheduleNote\":\"[Schedule Note]\",\"scheduleDuration\":\"[Schedule Hours]\",\"scheduleType\":\"[Schedule Type]\",\"scheduleDetails\":\"[Schedule Details]\",\"scheduleResources\":\"[Schedule Resources]\",\"scheduleResourcesEmail\":\"[Schedule Resources (Email)]\",\"scheduleResourcesFirstName\":\"[Schedule Resources (First Name)]\",\"scheduleResourcesImageSml\":\"[Schedule Resource Document Default (Image) Small]\",\"scheduleResourcesImageMed\":\"[Schedule Resource Document Default (Image) Medium]\",\"jobnumber\":\"[Job Number]\",\"taskType\":\"[Task Type]\",\"task\":\"[Task]\",\"taskDescription\":\"[Description]\",\"assignedEmail\":\"[Task Assigned To Email]\",\"currentUser\":\"[Current User]\",\"currentUserEmail\":\"[Current User Email]\",\"eventMessageType\":\"[Event Message Type]\",\"currentUserPosition\":\"[Current User Position]\"}",
        "templatename": "ZapCreateEditSchedule RCMeetings",
        "templatesubject": "Event Message Type: [Event Message Type]"
      },
      {
        "createdutc": "",
        "formattype": "Text",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "templateid": "JCYqWyBRICAgCg==",
        "templatetext": "{\n    \"email\": \"[Reported By/Contact Email]\",\n    \"assigned_email\": \"[Task Assigned To Email]\",\n    \"properties\": {\n        \"client\": \"[Client Name]\",\n        \"jobnumber\": \"[Job Number]\",\n        \"trainer\": \"[Schedule Resources]\",\n        \"datetime\": \"[Schedule Date @ Time]\",\n        \"schedulenote\": \"[Schedule Note]\",\n        \"reportedby\": \"[Reported By/Contact]\",\n        \"delighted_email_subject\": \"How was your training session?\",\n        \"question_product_name\": \"AroFlo\",\n        \"task_link\": \"[Task URL Link (office)]\",\n        \"tasktype\": \"[Task Type]\"\n    }\n}",
        "templatename": "ZAPScheduleReminder",
        "templatesubject": "How was your training session?"
      },
      {
        "createdutc": "",
        "formattype": "Text",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "templateid": "JCYqLyJSQCAgCg==",
        "templatetext": "{\"eventname\":\"[Event Message Type]\",\"clienttimezone\":\"[Client Timezone]\",\"scheduletime\":\"[Schedule Time]\",\"scheduledate\":\"[Schedule Date]\",\"reportedByGivenname\":\"[Reported By/Contact Givennames]\",\"reportedBySurname\":\"[Reported By/Contact Surname]\",\"reportedByEmail\":\"[Reported By/Contact Email]\",\"scheduleType\":\"[Schedule Type]\",\"scheduleDuration\":\"[Schedule Hours]\",\"scheduleDetails\":\"[Schedule Details]\",\"scheduleResources\":\"[Schedule Resources]\",\"scheduleResourcesEmail\":\"[Schedule Resources (Email)]\",\"scheduleResourcesFirstName\":\"[Schedule Resources (First Name)]\",\"scheduleResourcesLastName\":\"[Schedule Resources (Last Name)]\",\"jobnumber\":\"[Job Number]\",\"currentUser\":\"[Current User]\",\"currentUserEmail\":\"[Current User Email]\",\"currentUserPosition\":\"[Current User Position]\",\"currentUserPhone\":\"[Current User Phone]\",\"api_scheduleid\":\"[api_scheduleid]\",\"api_taskid\":\"[api_taskid]\"}",
        "templatename": "zapScheduleWebHook",
        "templatesubject": ""
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "messagetemplates": 23
    },
    "currentpageresults": 4
  }
}
```


---

### POST Create MessageTemplate

`POST http://api.aroflo.com/`

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
        'zone=' + encodeURIComponent('MessageTemplates')
        ,'postxml=' + encodeURIComponent('<messagetemplates><messagetemplate><formattype><![CDATA[ text ]]></formattype><templatetext><![CDATA[ THIS IS THE CONTENT ]]></templatetext><templatename><![CDATA[ templatename3 ]]></templatename><templatesubject><![CDATA[ Template Subject  ]]></templatesubject></messagetemplate></messagetemplates>')
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

#### Create MessageTemplate (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "messagetemplates": []
      },
      "inserttotal": 1,
      "inserts": {
        "messagetemplates": [
          {
            "formattype": "text",
            "templatetext": "THIS IS THE CONTENT",
            "TEMPLATEID": "JCZKUyVRUCAgCg==",
            "templatename": "templatename3",
            "templatesubject": "Template Subject"
          }
        ]
      }
    }
  }
}
```

