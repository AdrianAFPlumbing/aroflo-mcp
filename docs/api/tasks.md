# Tasks

Allows you list or create new [Tasks](https://) for your AroFlo site.

- If a task has a `location` with no `location_id`, this means that the task is using the Client Address and not a separate `location`

## WHERE filters

| Field | Value |
| --- | --- |
| taskid | AROFLO ID |
| clientname | STRING |
| orgname | STRING |
| orgid | AROFLO ID |
| jobnumber | INTEGER |
| tasktypeid | AROFLO ID |
| status | STRING(quote, notstarted, inprogress, pending, completed, archived) |
| daterequested | DATE(YYYY-MM-DD) |
| datetimerequested | DATETIME(YYYY-MM-DD HH:mm:ss) |
| datecompleted | DATE(YYYY-MM-DD) |
| datetimecompleted | DATETIME(YYYY-MM-DD HH:mm:ss) |
| lastupdatedutc | DATETIME(YYYY-MM-DD) |
| lastupdateddatetimeutc | DATETIME(YYYY-MM-DD HH:mm:ss) |
| duedate | DATE(YYYY-MM-DD) |
| duedatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |
| linkprocessed | BOOLEAN |
| linkprocesseddate | DATE(YYYY-MM-DD) |
| linkprocesseddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |
| deleteddate | DATE(YYYY-MM-DD) |
| deleteddatetime | DATETIME(YYYY-MM-DD HH:mm:ss) |
| salesperson_givenname | STRING |
| salesperson_surname | STRING |
| salesperson_id | AROFLO ID |
| createdutc | DATETIME(YYYY-MM-DD) |
| createddatetimeutc | DATETIME(YYYY-MM-DD HH:mm:ss) |

**Default WHERE clause**

AND datetimerequested > DATEADD(d, -30, GETUTCDATE())

## JOINs available

| Area |
| --- |
| documentsandphotos |
| notes |
| assignedhistory |
| material |
| labour |
| expense |
| purchaseorders |
| assets |
| customfields |
| location |
| locationcustomfields |
| project |
| tasktotals |
| substatus |
| salesperson |

- Joining on tasktotals will show the total costs for labour, materials and expenses on task as well as the total labour hours without requiring joins on the labour, material and expense areas.

- labour, material and expense areas can have where filters but it is better to query the zone directly if you want to filter on that area.

## ORDER BY

| Field |
| --- |
| clientname |
| orgname |
| daterequested |
| datecompleted |
| lastupdated |

## POSTXML variable definition

<tasks>
    <task>
        <taskid>AROFLO ID</taskid>  INSERT no / UPDATE required
        <client>
            <clientid>AROFLO ID</clientid>  INSERT required / UPDATE no
        </client>
        <taskname><![CDATA[ STRING(50) ]]></taskname>   STRING(50) / INSERT required / UPDATE yes 
        <duedate>DATE(YYYY-MM-DD)</duedate>    INSERT required / UPDATE no
        <org>
            <orgid>AROFLO ID</orgid>  INSERT required / UPDATE no
        </org>
        <tasktype>
            <tasktypeid>AROFLO ID</tasktypeid>  INSERT required / UPDATE no
        </tasktype>
        <location>
            <locationid>AROFLO ID</locationid>  INSERT yes / UPDATE no
        </location>
        <asset>
            <assetid>AROFLO ID</assetid>  INSERT yes / UPDATE no
        </asset>
        <description><![CDATA[ STRING ]]></description>  Plain Text or HTML. INSERT yes / UPDATE no
        <contact>
            <userid>AROFLO ID</userid>  INSERT yes / UPDATE yes
        </contact>
        <contactname><![CDATA[ STRING(50) ]]></contactname>  INSERT yes / UPDATE no
        <contactphone><![CDATA[ STRING(50) ]]></contactphone>  INSERT yes / UPDATE no
        <priority>AROFLO ID</priority>  INSERT yes / UPDATE no
        <custon><![CDATA[ STRING(50) ]]></custon>  INSERT yes / UPDATE yes
        <status><![CDATA[ STRING(50)(Not Started,In Progress,Pending,Completed,Archived) ]]></status>  INSERT no / UPDATE yes / 
        <substatus>
            <substatusid>AROFLO ID</substatusid>  INSERT no / UPDATE yes
        </substatus>
        <labours>
            <labour>
                <lineid>AROFLO ID</lineid> INSERT no / UPDATE required
                <lablinkprocessed>BOOLEAN</lablinkprocessed>  INSERT no / UPDATE yes
            </labour>
        </labours>
        <materials>
            <material>
                <lineid>AroFlo ID</lineid> INSERT no / UPDATE required
                <partnumber><![CDATA[ STRING(50) ]]></partnumber>  INSERT required if no item supplied / UPDATE yes
                <item><![CDATA[ STRING(1000) ]]></item>  INSERT required if no partnumber supplied / UPDATE yes
                <quantity>FLOAT</quantity>  INSERT required / UPDATE yes
                <cost>FLOAT</cost>  INSERT yes / UPDATE yes
                <markup>FLOAT</markup>  INSERT yes / UPDATE yes
                <sell>FLOAT</sell>  INSERT yes / UPDATE yes
                <dateused>DATE(YYYY-MM-DD)</dateused>  INSERT yes / UPDATE no
                <matlinkprocessed>BOOLEAN</matlinkprocessed>  INSERT no / UPDATE yes
                <takenfrom>
                    <takenfromid>AroFlo ID</takenfromid>  INSERT required / UPDATE no
                    <takenfromtype><![CDATA[ STRING(user,cholder) ]]></takenfromtype>  INSERT yes, if not supplied uses the Tasks BU / UPDATE no
                </takenfrom>
            </material>
        </materials>
        <customfields>
            <customfield>
                 `fieldid` or `name` may be used to update custom fields
                <fieldid>AROFLO ID</fieldid>  INSERT no / UPDATE yes
                <name><![CDATA[ STRING(50) ]]></name>  INSERT yes / UPDATE yes
                <type><![CDATA[ STRING(50)(text, numeric, Datefield, checkbox, radio, Select, textarea) ]]></type>  INSERT yes / UPDATE yes
                <value>
                     INSERT yes / UPDATE yes
                        type = "checkbox" then value is TRUE or FALSE
                        type = "datefield" then value is a valid date in format "YYYY-MM-DD"
                        type = all other types then string(2000)
                </value>
            </customfield>
        </customfields>
        <notes>  INSERT yes / UPDATE yes
            <note>
                <content><![CDATA[ STRING ]]></content> Plain Text or HTML
                <filter><![CDATA[ STRING(50)(Internal Admin Only, Internal Only, Show Client, Show Contractor, Show All) ]]></filter>
                <sticky>BOOLEAN</sticky>
            </note>
        </notes>
        <linkprocessed>BOOLEAN</linkprocessed>  INSERT no / UPDATE yes
        <project>
            <projectid>AROFLOID</projectid>  INSERT yes | UPDATE yes
        </project>
        <stage>
            <stageid>AROFLOID</stageid>  INSERT yes | UPDATE yes
        </stage>
    </task>
</tasks>

Please note:

- Updating any details of an inventory item on a task, will **not** update the details in the inventory.

- When updating the Status on a task it is also important to set the appropriate SubStatus also. Substatus does **not** change with Status as it does in the UI.

**Authorization:** bearer


### JOIN documentsandphotos

Tasks in AroFlo can have various documents and photos uploaded to them at any time. To retrieve information about these documents and a URL to retrieve them, join `documentsandphotos` on your task zone query.

URI provided in this method are valid for 10mins.

**Authorization:** bearer


---

### GET Get Tasks with documentsandphotos

`GET https://api.aroflo.com/{{urlVarString}}`

Return the details for a specific task and its documents and photos.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('documentsandphotos')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
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
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('documentsandphotos')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
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

#### Get Tasks with documentsandphotos (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/29 00:15:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/10/29 08:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [
          {
            "documentid": "JSYqQy1RLEAgCg==",
            "sizeinbytes": "28650",
            "uploadeddatetime": "2018/11/08 21:59:34",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Bradley Sandbox"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "http://office.aroflo.com/DocStorage/BGRF-PWC-original?expires=1541715010&signature=FBB0B7C13E1EB7EAE97990C30036E6C0FA188EE50DB5B4BEEF7AB658421B3080",
            "name": "hippo birdie two ewe.jpg"
          }
        ],
        "completeddate": "2018/10/29",
        "custon": "",
        "duedate": "2018/10/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1050",
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaXyBRTEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:45:54",
        "requestdate": "2018/10/29",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 33,
      "documentsandphotos": 2
    },
    "currentpageresults": 1
  }
}
```


### JOIN notes

[Notes](https://help.aroflo.com/display/office/Notes) store the internal communication and notices on the task and can be retrieved by joining on `notes` to your `task` query.

**Authorization:** bearer


---

### GET Get Tasks with notes

`GET https://api.aroflo.com/{{urlVarString}}`

Retrieve the first page of tasks including their task notes.

Note that the join can be made on `notes` or  `tasknotes` for backward compatibility. For all other areas the join is `notes`.

Also note that `note` and `content` fields are identical and the `note` field is returned for backwards compatibility. We recommend that calls to this area be updated to use the `content` field as we will remove the `note` field at a later date.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('tasknotes')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|task_id|=|JSZaTy1RPFwgCg==') 
        ,'join=' + encodeURIComponent('notes')
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

#### Get Tasks with notes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "contact": {
          "surname": "Mayhew",
          "givennames": "Peter",
          "userid": "JCQqRy1RMCAgCg=="
        },
        "completeddatetime": "2019/09/24 15:47:05",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Nov 14, 2018 2:56:20 PM",
            "note": "DONE.",
            "noteid": "JCdKRy1RMCAgCg==",
            "content": "DONE.",
            "dateposted": "2018/11/14",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 14, 2018 2:56:42 PM",
            "note": "DONE.",
            "noteid": "JCdKRy1SQCAgCg==",
            "content": "DONE.",
            "dateposted": "2018/11/14",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 26, 2018 9:23:57 AM",
            "note": "DONE.",
            "noteid": "JCdKQyFQUCAgCg==",
            "content": "DONE.",
            "dateposted": "2018/11/26",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Sep 24, 2019 11:41:39 AM",
            "note": "<p><span style=\"color:#ff0000;\"><strong>AroPoint GPS Special Offer</strong></span></p>",
            "noteid": "JCQqTyNQMCAgCg==",
            "content": "<p><span style=\"color:#ff0000;\"><strong>AroPoint GPS Special Offer</strong></span></p>",
            "dateposted": "2019/09/24",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "true"
          },
          {
            "filter": "Internal Admin Only",
            "timeposted": "Jun 30, 2020 3:35:54 PM",
            "note": "<p>this is a html note</p>",
            "noteid": "JSYqSyFRLDQgCg==",
            "content": "<p>this is a html note</p>",
            "dateposted": "2020/06/30",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "true"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Jun 30, 2020 3:35:54 PM",
            "note": "this is a text note",
            "noteid": "JSYqSyFRPFAgCg==",
            "content": "this is a text note",
            "dateposted": "2020/06/30",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2018/06/25 10:55:18",
        "lastupdatedutc": "2020/06/30",
        "status": "Completed",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": "2018/09/19 15:00:48",
        "refcode": "Aardva1",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1036",
        "taskname": "AroFlo Test 1",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/08/13 10:08:53",
        "description": "Task Description",
        "completeddate": "2019/09/24",
        "custon": "W0151304/3",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "true",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaTy1RPFwgCg==",
        "lastupdateddatetimeutc": "2020/06/30 05:36:00",
        "requestdate": "2018/06/25",
        "contactphone": "123456789",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2DXE%29%2D%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Nov 14, 2018 2:56:42 PM",
            "note": "DONE.",
            "noteid": "JCdKRy1SUCAgCg==",
            "content": "DONE.",
            "dateposted": "2018/11/14",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 26, 2018 9:23:57 AM",
            "note": "DONE.",
            "noteid": "JCdKQyFQICAgCg==",
            "content": "DONE.",
            "dateposted": "2018/11/26",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2018/06/27 09:02:28",
        "lastupdatedutc": "2020/07/01",
        "status": "Pending",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": "2020/07/02 09:44:54",
        "refcode": "Aardva2",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1037",
        "taskname": "Fix the sink",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/10/31 09:28:30",
        "description": "Task Description",
        "completeddate": "2018/07/01",
        "custon": "W0151304/3",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "true",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaSyRQLEwgCg==",
        "lastupdateddatetimeutc": "2020/07/01 23:45:02",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2CZU%3D%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2018/06/27 09:02:28",
        "lastupdatedutc": "2020/07/01",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": "2020/07/02 09:44:54",
        "refcode": "Aardva3",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1038",
        "taskname": "AroFlo Test 3",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Task Description",
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "true",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaSyRQLDAgCg==",
        "lastupdateddatetimeutc": "2020/07/01 23:45:02",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2CZU%3D%26%0A"
      },
      {
        "contact": {
          "surname": "Mayhew",
          "givennames": "Peter",
          "userid": "JCQqRy1RMCAgCg=="
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Jul 4, 2019 2:31:47 PM",
            "note": "<p>blah</p>",
            "noteid": "JCQ6VyJQQCAgCg==",
            "content": "<p>blah</p>",
            "dateposted": "2019/07/04",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2018/06/27 09:02:28",
        "lastupdatedutc": "2020/07/10",
        "status": "Pending",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": "2019/07/04 14:31:26",
        "refcode": "Aardva4",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1039",
        "taskname": "AroFlo Test 2",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "IyYqLycK",
          "substatus": "Waiting for Parts"
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/01/24 11:26:45",
        "description": "Task Description",
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "true",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaSyRQLDQgCg==",
        "lastupdateddatetimeutc": "2020/07/10 00:40:30",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2CZU%3D%27%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/07/11 11:16:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Jun 15, 2020 11:57:42 AM",
            "note": "something something",
            "noteid": "JSYqSyBQLEwgCg==",
            "content": "something something",
            "dateposted": "2020/06/15",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/07/10 11:16:53",
        "lastupdatedutc": "2020/06/15",
        "status": "In Progress",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad1",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/11",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1040",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "IyYqLyAK",
          "substatus": "Assigned to Subcontractor"
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/07/10 11:18:23",
        "description": "Working on Diesel #1",
        "completeddate": "2018/07/11",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/11 11:16:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaSydQPEggCg==",
        "lastupdateddatetimeutc": "2020/06/15 01:57:45",
        "requestdate": "2018/07/10",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2CZ%259%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/07/11 11:13:48",
        "priority": "IyYqUy0K",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/07/11 10:59:45",
        "lastupdatedutc": "2019/05/06",
        "status": "Archived",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad3",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/14",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1043",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/07/11 11:13:18",
        "description": "jhgjhg",
        "completeddate": "2018/07/11",
        "custon": "1234",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/14 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaSydRLFAgCg==",
        "lastupdateddatetimeutc": "2019/05/06 04:00:40",
        "requestdate": "2018/07/11",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2CZ%25%2D%2E%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/07/23 08:23:32",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/07/26 13:49:42",
        "lastupdatedutc": "2021/07/08",
        "status": "Archived",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad4",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/27",
        "labours": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "salesperson": [],
        "jobnumber": "1044",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/07/26 13:49:42",
        "description": "Fix something",
        "completeddate": "2019/07/23",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaRyZSXFQgCg==",
        "lastupdateddatetimeutc": "2021/07/08 01:12:32",
        "requestdate": "2018/07/26",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2FZ5Q%2F%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/07/23 08:23:26",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/07/26 13:52:02",
        "lastupdatedutc": "2019/07/22",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad5",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/27",
        "labours": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "salesperson": [],
        "jobnumber": "1045",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/07/26 13:52:02",
        "description": "Fox someththing",
        "completeddate": "2019/07/23",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaRyZSXFggCg==",
        "lastupdateddatetimeutc": "2019/07/22 22:23:26",
        "requestdate": "2018/07/26",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2FZ5Q%2C%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/09/05 10:40:44",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/07/27 08:39:40",
        "lastupdatedutc": "2018/09/05",
        "status": "Archived",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad6",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/28",
        "labours": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "salesperson": [],
        "jobnumber": "1046",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/07/27 08:39:41",
        "description": "Fix aomething",
        "completeddate": "2018/09/05",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/07/28 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaRydQLDAgCg==",
        "lastupdateddatetimeutc": "2018/09/05 00:40:44",
        "requestdate": "2018/07/27",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2FZ%25%3D%26%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/07/23 08:23:20",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/09/19 15:37:24",
        "lastupdatedutc": "2019/07/22",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad7",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/09/20",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1047",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/09/19 15:37:24",
        "description": "",
        "completeddate": "2019/07/23",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/09/20 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaQyBQPDQgCg==",
        "lastupdateddatetimeutc": "2019/07/22 22:23:20",
        "requestdate": "2018/09/19",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2E%5BU9%27%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/09/27 10:17:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "0",
        "requestdatetime": "2018/09/26 10:17:32",
        "lastupdatedutc": "2021/03/02",
        "status": "Pending",
        "gpslatitude": "0",
        "linkprocesseddate": " ",
        "refcode": "Bradl1",
        "tasklocation": {
          "locationid": "",
          "locationname": "12 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/09/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1048",
        "taskname": "Supplier Quotes Test",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2018/09/27",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/09/27 10:17:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "taskid": "JSZaQyFSTDAgCg==",
        "lastupdateddatetimeutc": "2021/03/02 04:42:15",
        "requestdate": "2018/09/26",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2E%5BEU%26%0A"
      },
      {
        "contact": {
          "surname": "Mayhew",
          "givennames": "Peter",
          "userid": "JCQqRy1RMCAgCg=="
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Show Contractor",
            "timeposted": "Oct 16, 2018 1:50:36 PM",
            "note": "Previous Ref Number: TeCl1",
            "noteid": "JCdKSyJSQCAgCg==",
            "content": "Previous Ref Number: TeCl1",
            "dateposted": "2018/10/16",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Admin Only",
            "timeposted": "Oct 16, 2018 1:47:58 PM",
            "note": "<p>this is a task note added from the office.</p>",
            "noteid": "JCdKSyJRMCAgCg==",
            "content": "<p>this is a task note added from the office.</p>",
            "dateposted": "2018/10/16",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.220657",
        "requestdatetime": "2018/10/12 10:09:08",
        "lastupdatedutc": "2020/06/25",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/10",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1049",
        "taskname": "A task from the API",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Angie Mayhew",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaXyVQPFggCg==",
        "lastupdateddatetimeutc": "2020/06/25 03:57:45",
        "requestdate": "2018/10/12",
        "contactphone": "03 9259 5200",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%29ZE9%2C%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2018/12/11 10:24:13",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/10/29 08:00:00",
        "lastupdatedutc": "2019/06/27",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1050",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "completeddate": "2018/12/11",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaXyBRTEAgCg==",
        "lastupdateddatetimeutc": "2019/06/27 00:16:47",
        "requestdate": "2018/10/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%29%5BU%25%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2018/12/17 10:26:45",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/11/29 08:00:00",
        "lastupdatedutc": "2019/01/18",
        "status": "Archived",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad9",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/11/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1051",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/12/04 13:48:12",
        "description": "",
        "completeddate": "2018/12/17",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/11/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWyZRLFggCg==",
        "lastupdateddatetimeutc": "2019/01/18 00:55:38",
        "requestdate": "2018/11/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28Z5%2D%2C%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqWyVSQCAgCg=="
        },
        "completeddatetime": "2018/12/07 14:14:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/12/06 14:14:51",
        "lastupdatedutc": "2020/08/06",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad10",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/12/07",
        "labours": [],
        "assets": [],
        "assetid": "JCYqTy1RQCAgCg==",
        "project": {},
        "salesperson": [],
        "jobnumber": "1053",
        "taskname": "11111 22222 Ringwood",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/06/30 10:02:04",
        "description": "asdasd",
        "completeddate": "2018/12/07",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/12/07 14:14:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWyBRLFwgCg==",
        "lastupdateddatetimeutc": "2020/08/06 06:08:30",
        "requestdate": "2018/12/06",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28%5BU%2D%2D%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/12/18 11:56:12",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/12/06 14:17:54",
        "lastupdatedutc": "2020/08/24",
        "status": "Archived",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad11",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/12/07",
        "labours": [],
        "assets": [],
        "assetid": "JCYqSyRQUCAgCg==",
        "project": {},
        "salesperson": [],
        "jobnumber": "1054",
        "taskname": "ttt HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/12/06 14:17:54",
        "description": "",
        "completeddate": "2018/12/18",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/12/07 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWyBRLEAgCg==",
        "lastupdateddatetimeutc": "2020/08/24 01:48:00",
        "requestdate": "2018/12/06",
        "contactphone": "04XX XXX XXX",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28%5BU%2D%2A%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/12/11 10:25:26",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/12/11 10:25:00",
        "lastupdatedutc": "2018/12/10",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad12",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/12/12",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1055",
        "taskname": "HMAS Sydney Port of Sydney 2",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "collated cogs test",
        "completeddate": "2018/12/11",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/12/12 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWyFRLEQgCg==",
        "lastupdateddatetimeutc": "2018/12/10 23:25:26",
        "requestdate": "2018/12/11",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28%5BE%2D%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/12/17 10:26:59",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/12/17 10:25:23",
        "lastupdatedutc": "2018/12/16",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad13",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/12/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1057",
        "taskname": "LINKED HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "<p>this is a linked quote</p>",
        "completeddate": "2018/12/17",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/12/18 10:25:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWyNQTFwgCg==",
        "lastupdateddatetimeutc": "2018/12/16 23:26:59",
        "requestdate": "2018/12/17",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28%5B%255%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2018/12/28 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/12/28 08:00:00",
        "lastupdatedutc": "2018/12/27",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad14",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/12/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1058",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2018/12/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/12/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWy1QTFggCg==",
        "lastupdateddatetimeutc": "2018/12/27 13:15:00",
        "requestdate": "2018/12/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28XE5%2C%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/01/29 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/01/29 08:00:00",
        "lastupdatedutc": "2019/01/28",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad15",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/01/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1059",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/01/29",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/01/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaVyJRTDAgCg==",
        "lastupdateddatetimeutc": "2019/01/28 13:15:00",
        "requestdate": "2019/01/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2B%5B5%25%26%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/10/17 13:10:55",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2159955",
        "requestdatetime": "2019/01/31 15:15:45",
        "lastupdatedutc": "2019/10/17",
        "status": "Completed",
        "gpslatitude": "-37.817927",
        "linkprocesseddate": " ",
        "refcode": "TeCl_21",
        "tasklocation": {
          "locationid": "",
          "locationname": "12 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/02/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1060",
        "taskname": "Suite 13, Level 2 12 Maroondah Highway Ringwood",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/10/17",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/02/01 15:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "taskid": "JSZaVyNQPEggCg==",
        "lastupdateddatetimeutc": "2019/10/17 02:11:00",
        "requestdate": "2019/01/31",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2B%5B%259%28%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqWyVSQCAgCg=="
        },
        "completeddatetime": "2019/02/19 08:51:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Jun 30, 2021 11:29:29 AM",
            "note": "<p>Email sent to Jason Bourne: bradley@aroflo.com.\n<br />\nSession time: June 30 2021 11:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1486288807\n<br />\nScheduled To: Bradley Bristow-Stagg</p>",
            "noteid": "JSYqVyJSXEwgCg==",
            "content": "<p>Email sent to Jason Bourne: bradley@aroflo.com.\n<br />\nSession time: June 30 2021 11:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1486288807\n<br />\nScheduled To: Bradley Bristow-Stagg</p>",
            "dateposted": "2021/06/30",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.229028",
        "requestdatetime": "2019/02/18 08:52:03",
        "lastupdatedutc": "2021/06/30",
        "status": "Not Started",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad16",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/02/19",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1061",
        "taskname": "11111 22222 Ringwood",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/08/07 12:56:20",
        "description": "",
        "completeddate": "2019/02/19",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/02/19 08:51:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaUyZQPEggCg==",
        "lastupdateddatetimeutc": "2021/06/30 01:29:32",
        "requestdate": "2019/02/18",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2AZ59%28%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/02/28 00:15:01",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/02/28 08:00:00",
        "lastupdatedutc": "2019/02/27",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad17",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/02/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1062",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/02/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/02/28 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaUyJRLEAgCg==",
        "lastupdateddatetimeutc": "2019/02/27 13:15:01",
        "requestdate": "2019/02/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2A%5B5%2D%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/03/28 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/03/28 08:00:00",
        "lastupdatedutc": "2019/03/27",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad18",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/03/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1063",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/03/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/03/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaLyJQTDQgCg==",
        "lastupdateddatetimeutc": "2019/03/27 13:15:00",
        "requestdate": "2019/03/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%25%5B55%27%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqWyVSQCAgCg=="
        },
        "completeddatetime": "2019/04/18 10:03:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/04/17 10:04:09",
        "lastupdatedutc": "2020/06/25",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad19",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/04/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1064",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "This is a test for Supplier Quotes",
        "completeddate": "2019/04/18",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/04/18 10:03:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaKyRSTDQgCg==",
        "lastupdateddatetimeutc": "2020/06/25 03:57:45",
        "requestdate": "2019/04/17",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%24ZUU%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/04/29 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/04/29 08:00:00",
        "lastupdatedutc": "2019/04/28",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad20",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/04/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1065",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/05/02 11:57:11",
        "description": "",
        "completeddate": "2019/04/29",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/04/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaKyZRPDAgCg==",
        "lastupdateddatetimeutc": "2019/04/28 14:15:00",
        "requestdate": "2019/04/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%24Z5%29%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/05/28 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/05/28 00:00:00",
        "lastupdatedutc": "2019/09/15",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad21",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/05/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1066",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/06/04 07:53:28",
        "description": "",
        "completeddate": "2019/05/28",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/05/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKTyRQLDAgCg==",
        "lastupdateddatetimeutc": "2019/09/15 23:21:00",
        "requestdate": "2019/05/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2DZU%3D%26%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/06/21 10:39:08",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "144.9607964",
        "requestdatetime": "2019/06/21 10:36:14",
        "lastupdatedutc": "2019/11/24",
        "status": "Completed",
        "gpslatitude": "-37.8180446",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu1",
        "tasklocation": {
          "locationid": "",
          "locationname": "50 Market St, Melbourne"
        },
        "documentsandphotos": [],
        "duedate": "2019/06/22",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1067",
        "taskname": "Test for LaTrobe",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCZaTy1QICAgCg==",
          "tasktype": "Plumbing"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/06/21 10:36:56",
        "description": "This is a test invoice for LaTrobe Uni requirements",
        "completeddate": "2019/06/21",
        "custon": "1234",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/06/22 10:35:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskid": "JSZKTyxSXFwgCg==",
        "lastupdateddatetimeutc": "2019/11/24 23:34:04",
        "requestdate": "2019/06/21",
        "contactphone": "",
        "tasktype": "Plumbing",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2DXUQ%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/07/15 11:53:26",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/06/28 00:00:00",
        "lastupdatedutc": "2019/07/15",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad22",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/06/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1068",
        "taskname": "Test for Tracking Center Report",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/07/15 11:51:34",
        "description": "",
        "completeddate": "2019/07/15",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/06/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKSyRRLFAgCg==",
        "lastupdateddatetimeutc": "2019/07/15 01:53:26",
        "requestdate": "2019/06/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2CZU%2D%2E%0A"
      },
      {
        "contact": {
          "surname": "Contact",
          "givennames": "Child",
          "userid": "JCQ6XyZQUCAgCg=="
        },
        "completeddatetime": "2019/07/13 08:53:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2200194",
        "requestdatetime": "2019/07/12 08:53:46",
        "lastupdatedutc": "2022/01/27",
        "status": "Not Started",
        "gpslatitude": "-37.8121626",
        "linkprocesseddate": " ",
        "refcode": "Andrea1",
        "tasklocation": {
          "locationid": "",
          "locationname": "10 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/07/13",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1069",
        "taskname": "10 New Street Ringwood",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/07/12 11:21:39",
        "description": "Test for email to Task Request for Child Contact",
        "completeddate": "2019/07/13",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/07/13 08:53:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyBQUCAgCg==",
          "clientname": "Andrea Test"
        },
        "taskid": "JSZKSyBSXEAgCg==",
        "lastupdateddatetimeutc": "2022/01/27 22:26:42",
        "requestdate": "2019/07/12",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2C%5BUQ%2A%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/07/19 14:16:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "144.7851531",
        "requestdatetime": "2019/07/18 14:15:56",
        "lastupdatedutc": "2021/03/19",
        "status": "Quote",
        "gpslatitude": "-37.4713077",
        "linkprocesseddate": " ",
        "refcode": "Traini1",
        "tasklocation": {
          "locationid": "",
          "locationname": "addres value"
        },
        "documentsandphotos": [],
        "duedate": "2019/07/19",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1070",
        "taskname": "SimChair",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/07/19",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/07/19 14:16:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKLyRRICAgCg==",
          "clientname": "Training Company"
        },
        "taskid": "JSZKSyJRXFwgCg==",
        "lastupdateddatetimeutc": "2021/03/19 03:10:45",
        "requestdate": "2019/07/18",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2C%5B5%21%2D%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/07/23 13:40:59",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "requestdatetime": "2019/07/23 13:40:39",
        "lastupdatedutc": "2019/07/23",
        "status": "Completed",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad23",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/07/24",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1071",
        "taskname": "11111 22222 Ringwood",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "asdasdasd",
        "completeddate": "2019/07/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/07/24 13:40:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKSyNRLDAgCg==",
        "lastupdateddatetimeutc": "2019/07/23 03:50:23",
        "requestdate": "2019/07/23",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2C%5B%25%2D%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/07/29 00:15:01",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/07/29 00:00:00",
        "lastupdatedutc": "2019/07/28",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad24",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/07/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1072",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/07/29",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/07/29 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKSy1QLFAgCg==",
        "lastupdateddatetimeutc": "2019/07/28 14:15:01",
        "requestdate": "2019/07/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2CXE%3D%2E%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/02/21 14:40:05",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "0",
        "requestdatetime": "2019/08/05 12:33:44",
        "lastupdatedutc": "2020/02/21",
        "status": "Archived",
        "gpslatitude": "0",
        "linkprocesseddate": " ",
        "refcode": "Bradl2",
        "tasklocation": {
          "locationid": "",
          "locationname": "12 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/08/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1073",
        "taskname": "labour",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "asdasd",
        "completeddate": "2020/02/21",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/08/06 12:33:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "taskid": "JSZKRyVQTFggCg==",
        "lastupdateddatetimeutc": "2020/02/21 03:40:15",
        "requestdate": "2019/08/05",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2FZE5%2C%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/08/06 12:34:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Sep 23, 2019 9:12:11 AM",
            "note": "Previous Ref Number: Bradl3",
            "noteid": "JCQqTyJQUCAgCg==",
            "content": "Previous Ref Number: Bradl3",
            "dateposted": "2019/09/23",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.229028",
        "requestdatetime": "2019/08/05 12:34:30",
        "lastupdatedutc": "2019/09/22",
        "status": "Not Started",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad26",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/08/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1074",
        "taskname": "labour2",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/08/06",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/08/06 12:34:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKRyVQTFwgCg==",
        "lastupdateddatetimeutc": "2019/09/22 23:12:11",
        "requestdate": "2019/08/05",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2FZE5%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/08/28 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/08/28 00:00:00",
        "lastupdatedutc": "2020/06/10",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad25",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/08/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1075",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/08/29 08:03:31",
        "description": "",
        "completeddate": "2019/08/28",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/08/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKRyxQLDQgCg==",
        "lastupdateddatetimeutc": "2020/06/10 21:33:04",
        "requestdate": "2019/08/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2FXU%3D%27%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/09/10 13:49:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "0",
        "requestdatetime": "2019/09/09 13:49:55",
        "lastupdatedutc": "2019/09/23",
        "status": "Not Started",
        "gpslatitude": "0",
        "linkprocesseddate": " ",
        "refcode": "Bradl4",
        "tasklocation": {
          "locationid": "",
          "locationname": "12 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/09/10",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1076",
        "taskname": "Test for Zapier List Tasks",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/09/23 10:06:26",
        "description": "",
        "completeddate": "2019/09/10",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/09/10 13:49:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "taskid": "JSZKQyVRLFAgCg==",
        "lastupdateddatetimeutc": "2019/09/23 05:43:51",
        "requestdate": "2019/09/09",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2EZE%2D%2E%0A"
      },
      {
        "contact": {
          "surname": "Bull",
          "givennames": "Alan",
          "userid": "JCQ6XyVSUCAgCg=="
        },
        "completeddatetime": "2019/09/25 07:16:18",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "0",
        "requestdatetime": "2019/09/25 07:05:00",
        "lastupdatedutc": "2019/09/24",
        "status": "Completed",
        "gpslatitude": "0",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu2",
        "tasklocation": {
          "locationid": "JSc6WyRRLEQgCg==",
          "locationname": "Unit 1 48 New Town Road, New Town"
        },
        "documentsandphotos": [],
        "duedate": "2019/09/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1085",
        "taskname": "Unit 1 New Town",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/09/25 07:08:53",
        "description": "<p>Install fan in master bedroom</p>",
        "completeddate": "2019/09/25",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/09/26 07:04:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskid": "JSZKQyJQXFAgCg==",
        "lastupdateddatetimeutc": "2019/09/24 21:16:18",
        "requestdate": "2019/09/25",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2E%5B51%2E%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqWyVSQCAgCg=="
        },
        "completeddatetime": "2019/09/26 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/09/25 19:08:04",
        "lastupdatedutc": "2019/09/25",
        "status": "Quote",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad27",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/09/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1086",
        "taskname": "Test for Labour",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/09/26",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/09/26 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKQyJQLDQgCg==",
        "lastupdateddatetimeutc": "2019/09/25 09:08:04",
        "requestdate": "2019/09/25",
        "contactphone": "04XX XXX XXX",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2E%5B5%3D%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/09/27 00:15:01",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/09/27 00:00:00",
        "lastupdatedutc": "2019/09/26",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad28",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/09/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1087",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/10/25 08:47:31",
        "description": "",
        "completeddate": "2019/09/27",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/09/27 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKQyJRPEggCg==",
        "lastupdateddatetimeutc": "2019/09/26 14:15:01",
        "requestdate": "2019/09/27",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2E%5B5%29%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/10/01 15:19:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "144.9607964",
        "requestdatetime": "2019/09/30 15:19:44",
        "lastupdatedutc": "2020/06/25",
        "status": "Not Started",
        "gpslatitude": "-37.8180446",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu3",
        "tasklocation": {
          "locationid": "",
          "locationname": "50 Market St, Melbourne"
        },
        "documentsandphotos": [],
        "duedate": "2019/10/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1088",
        "taskname": "Test for sortable checklist",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/09/30 15:20:20",
        "description": "",
        "completeddate": "2019/10/01",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/10/01 15:19:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskid": "JSZKQyNQPEQgCg==",
        "lastupdateddatetimeutc": "2020/06/25 03:53:00",
        "requestdate": "2019/09/30",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2E%5B%259%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/10/15 12:04:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "144.7851531",
        "requestdatetime": "2019/10/14 12:05:09",
        "lastupdatedutc": "2019/10/14",
        "status": "Quote",
        "gpslatitude": "-37.4713077",
        "linkprocesseddate": " ",
        "refcode": "Traini2",
        "tasklocation": {
          "locationid": "",
          "locationname": "addres value"
        },
        "documentsandphotos": [],
        "duedate": "2019/10/15",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1089",
        "taskname": "SimChair MKIV",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "<p>A SimChair MKIV Project</p>",
        "completeddate": "2019/10/15",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/10/15 12:04:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKLyRRICAgCg==",
          "clientname": "Training Company"
        },
        "taskid": "JSZKXyVQTEwgCg==",
        "lastupdateddatetimeutc": "2019/10/14 01:05:20",
        "requestdate": "2019/10/14",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%29ZE5%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/11/11 13:13:25",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/10/28 00:00:00",
        "lastupdatedutc": "2019/11/11",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad29",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/10/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1090",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/11/08 09:54:47",
        "description": "",
        "completeddate": "2019/11/11",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/10/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKXyFRXFAgCg==",
        "lastupdateddatetimeutc": "2019/11/11 02:15:00",
        "requestdate": "2019/10/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%29%5BE%21%2E%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/11/08 10:01:41",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Nov 7, 2019 10:59:01 PM",
            "note": "This is a note1",
            "noteid": "JCQqQydRUCAgCg==",
            "content": "This is a note1",
            "dateposted": "2019/11/07",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/11/08 09:56:09",
        "lastupdatedutc": "2019/11/07",
        "status": "Completed",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad30",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "1975/11/12",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1091",
        "taskname": "Test for import 1",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/11/08 10:01:35",
        "description": "Description import 1",
        "completeddate": "2019/11/08",
        "custon": "Me",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "1975/11/12 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKXy1RTFwgCg==",
        "lastupdateddatetimeutc": "2019/11/07 23:01:45",
        "requestdate": "2019/11/08",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%29XE%25%2D%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/11/08 09:56:09",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Nov 7, 2019 10:59:01 PM",
            "note": "This is a note2",
            "noteid": "JCQqQydRICAgCg==",
            "content": "This is a note2",
            "dateposted": "2019/11/07",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "0",
        "requestdatetime": "2019/11/08 09:56:09",
        "lastupdatedutc": "2019/11/07",
        "status": "Not Started",
        "gpslatitude": "0",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu4",
        "tasklocation": {
          "locationid": "",
          "locationname": ""
        },
        "documentsandphotos": [],
        "duedate": "2012/03/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1092",
        "taskname": "Test for import 2",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Description import 2",
        "completeddate": "2019/11/08",
        "custon": "Scarlett",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2012/03/26 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskid": "JSZKXy1RTEAgCg==",
        "lastupdateddatetimeutc": "2019/11/07 22:59:15",
        "requestdate": "2019/11/08",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%29XE%25%2A%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/11/26 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2019/11/25 10:16:49",
        "lastupdatedutc": "2020/07/29",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva6",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/11/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1094",
        "taskname": "Test  1111",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/11/25 10:17:40",
        "description": "Test Description",
        "completeddate": "2019/11/26",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/11/26 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZKWyBQXEAgCg==",
        "lastupdateddatetimeutc": "2020/07/29 00:27:15",
        "requestdate": "2019/11/25",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%28%5BU1%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/11/28 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/11/28 00:00:00",
        "lastupdatedutc": "2019/11/27",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad31",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/11/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1095",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/11/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/11/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKWyFRTFQgCg==",
        "lastupdateddatetimeutc": "2019/11/27 13:15:13",
        "requestdate": "2019/11/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%28%5BE%25%2F%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/12/02 00:00:00",
        "priority": "IyYqKyIK",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/12/03 16:17:02",
        "lastupdatedutc": "2019/12/12",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad32",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/12/02",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1096",
        "taskname": "Testy McPriority",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/12/03 16:17:17",
        "description": "Test for custom priorities",
        "completeddate": "2019/12/02",
        "custon": "1234",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/12/02 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKWyNQPDAgCg==",
        "lastupdateddatetimeutc": "2019/12/12 23:38:09",
        "requestdate": "2019/12/03",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%28%5B%259%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/12/27 00:14:59",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/12/27 00:00:00",
        "lastupdatedutc": "2019/12/26",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad33",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/12/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1097",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/12/27",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/12/27 00:14:59",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKVyJSXDAgCg==",
        "lastupdateddatetimeutc": "2019/12/26 13:15:14",
        "requestdate": "2019/12/27",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2B%5B5Q%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/01/28 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/01/28 00:00:00",
        "lastupdatedutc": "2020/01/27",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad34",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/01/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1098",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/01/30 15:59:25",
        "description": "",
        "completeddate": "2020/01/28",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/01/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKUy1STEQgCg==",
        "lastupdateddatetimeutc": "2020/01/27 13:15:14",
        "requestdate": "2020/01/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2AXEU%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/02/05 11:16:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Feb 6, 2020 9:49:56 AM",
            "note": "<p>new note</p>",
            "noteid": "JCQqLyxRQCAgCg==",
            "content": "<p>new note</p>",
            "dateposted": "2020/02/06",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.229028",
        "requestdatetime": "2020/02/04 11:16:35",
        "lastupdatedutc": "2020/02/05",
        "status": "In Progress",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad35",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2020/02/05",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1099",
        "taskname": "Test for Zapier",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/02/06 09:49:50",
        "description": "",
        "completeddate": "2020/02/05",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/02/05 11:16:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKLydRTFwgCg==",
        "lastupdateddatetimeutc": "2020/02/05 22:50:01",
        "requestdate": "2020/02/04",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%25Z%25%25%2D%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/02/07 15:26:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Feb 7, 2020 9:11:09 AM",
            "note": "<p>a</p>",
            "noteid": "JCQqLy1RUCAgCg==",
            "content": "<p>a</p>",
            "dateposted": "2020/02/07",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.229028",
        "requestdatetime": "2020/02/06 15:26:23",
        "lastupdatedutc": "2020/03/05",
        "status": "In Progress",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad36",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2020/02/07",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1100",
        "taskname": "Another test for Zapier",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "IyYqLyAK",
          "substatus": "Assigned to Subcontractor"
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/02/07 09:11:03",
        "description": "",
        "completeddate": "2020/02/07",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/02/07 15:26:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKLyBSTEAgCg==",
        "lastupdateddatetimeutc": "2020/03/05 21:58:00",
        "requestdate": "2020/02/06",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%25%5BUU%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/02/11 00:15:01",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/02/11 00:00:00",
        "lastupdatedutc": "2020/03/05",
        "status": "In Progress",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad37",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/02/11",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1101",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/02/14 15:32:41",
        "description": "",
        "completeddate": "2020/02/11",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/02/11 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKLyJQLDAgCg==",
        "lastupdateddatetimeutc": "2020/03/05 21:57:30",
        "requestdate": "2020/02/11",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%25%5B5%3D%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/02/25 00:15:02",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/02/25 00:00:00",
        "lastupdatedutc": "2020/02/24",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad38",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/02/25",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1102",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/02/25",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/02/25 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKKyZQPDQgCg==",
        "lastupdateddatetimeutc": "2020/02/24 13:15:15",
        "requestdate": "2020/02/25",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%24Z59%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/03/10 00:15:01",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/03/10 00:00:00",
        "lastupdatedutc": "2020/03/09",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad39",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/03/10",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1103",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/03/10",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/03/10 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKKyxRXEwgCg==",
        "lastupdateddatetimeutc": "2020/03/09 13:15:15",
        "requestdate": "2020/03/10",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%24XU%21%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/03/24 00:15:02",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/03/24 00:00:00",
        "lastupdatedutc": "2020/03/23",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad40",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/03/24",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1104",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/03/24",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/03/24 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6TyFQXFQgCg==",
        "lastupdateddatetimeutc": "2020/03/23 13:15:15",
        "requestdate": "2020/03/24",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2D%5BE1%2F%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/11/26 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2020/04/03 15:32:11",
        "lastupdatedutc": "2020/04/03",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva7",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/11/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1105",
        "taskname": "Test  11111",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2019/11/26",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/11/26 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSc6SyRSXFwgCg==",
        "lastupdateddatetimeutc": "2020/04/03 04:32:15",
        "requestdate": "2020/04/03",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2CZUQ%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/04/07 00:15:04",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/04/07 00:00:00",
        "lastupdatedutc": "2020/04/06",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad41",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/04/07",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1106",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/04/07",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/04/07 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6SyVRLDQgCg==",
        "lastupdateddatetimeutc": "2020/04/06 14:15:16",
        "requestdate": "2020/04/07",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2CZE%2D%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/04/21 00:15:05",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/04/21 00:00:00",
        "lastupdatedutc": "2020/04/20",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad42",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/04/21",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1107",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/04/21",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/04/21 00:15:05",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6RydRPFAgCg==",
        "lastupdateddatetimeutc": "2020/04/20 14:15:16",
        "requestdate": "2020/04/21",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2FZ%25%29%2E%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/05/05 00:15:06",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/05/05 00:00:00",
        "lastupdatedutc": "2020/05/04",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad43",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/05/05",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1108",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/05/05",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/05/05 00:15:06",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6QyRRXEAgCg==",
        "lastupdateddatetimeutc": "2020/05/04 14:15:16",
        "requestdate": "2020/05/05",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2EZU%21%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/05/19 00:15:04",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/05/19 00:00:00",
        "lastupdatedutc": "2020/05/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad44",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/05/19",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1109",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/05/19",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/05/19 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6QyNRLEwgCg==",
        "lastupdateddatetimeutc": "2020/05/18 14:15:16",
        "requestdate": "2020/05/19",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2E%5B%25%2D%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/06/02 00:15:04",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/06/02 00:00:00",
        "lastupdatedutc": "2020/06/01",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad45",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/06/02",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1110",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/06/02",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/06/02 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6XyNSTFggCg==",
        "lastupdateddatetimeutc": "2020/06/01 14:15:16",
        "requestdate": "2020/06/02",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%29%5B%25U%2C%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/06/12 09:59:31",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/06/12 09:59:31",
        "lastupdatedutc": "2020/06/11",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad46",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/06/12",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1111",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/06/12 09:59:30",
        "description": "",
        "completeddate": "2020/06/12",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/06/12 09:59:31",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6WydQLFQgCg==",
        "lastupdateddatetimeutc": "2020/06/11 23:59:45",
        "requestdate": "2020/06/12",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%28Z%25%3D%2F%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/06/30 00:15:04",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/06/30 00:00:00",
        "lastupdatedutc": "2020/06/29",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad47",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/06/30",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1112",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/06/30",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/06/30 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6VyRRPFwgCg==",
        "lastupdateddatetimeutc": "2020/06/29 14:15:16",
        "requestdate": "2020/06/30",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2BZU%29%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/07/14 00:15:03",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/07/14 00:00:00",
        "lastupdatedutc": "2020/07/13",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad48",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/07/14",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1113",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/07/14",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/07/14 00:15:03",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6VyNRTEAgCg==",
        "lastupdateddatetimeutc": "2020/07/13 14:15:16",
        "requestdate": "2020/07/14",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2B%5B%25%25%2A%0A"
      },
      {
        "contact": {
          "surname": "Hoh",
          "givennames": "Ivan",
          "userid": "JCQ6XydQUCAgCg=="
        },
        "completeddatetime": "2020/07/23 15:38:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "115.7686175",
        "requestdatetime": "2020/07/22 15:40:03",
        "lastupdatedutc": "2020/07/22",
        "status": "Not Started",
        "gpslatitude": "-31.743055",
        "linkprocesseddate": " ",
        "refcode": "Crust1",
        "tasklocation": {
          "locationid": "",
          "locationname": "Corner Boas Avenue & McLarty Street, Joondalup"
        },
        "documentsandphotos": [],
        "duedate": "2020/07/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1114",
        "taskname": "WA Client",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/07/22 16:15:22",
        "description": "",
        "completeddate": "2020/07/23",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/07/23 15:38:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyFQUCAgCg==",
          "clientname": "Crust Pizza"
        },
        "taskid": "JSc6UyVRXEggCg==",
        "lastupdateddatetimeutc": "2020/07/22 05:40:15",
        "requestdate": "2020/07/22",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2AZE%21%28%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/07/28 00:15:07",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/07/28 00:00:00",
        "lastupdatedutc": "2020/07/27",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad49",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/07/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1115",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/07/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/07/28 00:15:07",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6UydSTEwgCg==",
        "lastupdateddatetimeutc": "2020/07/27 14:15:16",
        "requestdate": "2020/07/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2AZ%25U%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/10/18 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2020/07/29 10:27:23",
        "lastupdatedutc": "2020/07/29",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva8",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1116",
        "taskname": "test for webid",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2020/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSc6UyJQTEQgCg==",
        "lastupdateddatetimeutc": "2020/07/29 00:27:30",
        "requestdate": "2020/07/29",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2A%5B55%2B%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/08/11 00:15:04",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Aug 19, 2020 2:37:12 PM",
            "note": "test",
            "noteid": "JSYqRyRQLEQgCg==",
            "content": "test",
            "dateposted": "2020/08/19",
            "user": {
              "userid": "JCQqQyFRQCAgCg==",
              "username": "James Howlett III"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/08/11 00:00:00",
        "lastupdatedutc": "2020/09/01",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad50",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/08/11",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1117",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/08/17 08:40:41",
        "description": "",
        "completeddate": "2020/08/11",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/08/11 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6LydQLDAgCg==",
        "lastupdateddatetimeutc": "2020/09/01 02:05:30",
        "requestdate": "2020/08/11",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%25Z%25%3D%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/08/25 00:15:07",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/08/25 00:00:00",
        "lastupdatedutc": "2020/08/24",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad51",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/08/25",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1118",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/09/01 11:59:48",
        "description": "",
        "completeddate": "2020/08/25",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/08/25 00:15:07",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6KyRQLEAgCg==",
        "lastupdateddatetimeutc": "2020/08/24 14:15:16",
        "requestdate": "2020/08/25",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%24ZU%3D%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/09/08 00:15:05",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/09/08 00:00:00",
        "lastupdatedutc": "2020/09/16",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad52",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/09/08",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1119",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/09/16 11:52:10",
        "description": "",
        "completeddate": "2020/09/08",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/09/08 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6KyNSXEggCg==",
        "lastupdateddatetimeutc": "2020/09/16 01:54:01",
        "requestdate": "2020/09/08",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%24%5B%25Q%28%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/09/22 00:15:18",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/09/22 00:00:00",
        "lastupdatedutc": "2020/09/21",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad53",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/09/22",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1120",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/09/22",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/09/22 00:15:18",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqTyFRTEggCg==",
        "lastupdateddatetimeutc": "2020/09/21 14:15:32",
        "requestdate": "2020/09/22",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2D%5BE%25%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2020/09/24 14:37:11",
        "lastupdatedutc": "2020/09/24",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva9",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1121",
        "taskname": "Test for API Event Messages",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/09/24 14:37:35",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JScqTyNRXFwgCg==",
        "lastupdateddatetimeutc": "2020/09/24 04:37:16",
        "requestdate": "2020/09/24",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2D%5B%25%21%2D%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/10/05 14:58:36",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "requestdatetime": "2020/10/05 14:56:10",
        "lastupdatedutc": "2020/10/05",
        "status": "Archived",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad54",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1122",
        "taskname": "Test for Client Labour Rates",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/10/05",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/06 14:55:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqSyZRPEwgCg==",
        "lastupdateddatetimeutc": "2020/10/05 03:59:00",
        "requestdate": "2020/10/05",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2CZ5%29%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/10/06 14:58:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "requestdatetime": "2020/10/05 14:59:02",
        "lastupdatedutc": "2020/10/05",
        "status": "Archived",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad55",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1123",
        "taskname": "Test for Client Labour Rates",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/10/06",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/06 14:58:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqSyZRPDAgCg==",
        "lastupdateddatetimeutc": "2020/10/05 04:01:30",
        "requestdate": "2020/10/05",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2CZ5%29%26%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/10/06 15:01:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "requestdatetime": "2020/10/05 15:02:11",
        "lastupdatedutc": "2020/10/05",
        "status": "Quote",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad56",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1124",
        "taskname": "Test for Client Labour Rates",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/10/06",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/06 15:01:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqSyZRPDQgCg==",
        "lastupdateddatetimeutc": "2020/10/05 04:02:15",
        "requestdate": "2020/10/05",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2CZ5%29%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/10/06 00:15:07",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/10/06 00:00:00",
        "lastupdatedutc": "2020/10/05",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad57",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1125",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/10/06",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/06 00:15:07",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqSyZSXDAgCg==",
        "lastupdateddatetimeutc": "2020/10/05 13:15:31",
        "requestdate": "2020/10/06",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2CZ5Q%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/10/20 00:15:06",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/10/20 00:00:00",
        "lastupdatedutc": "2020/10/19",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad58",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/20",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1126",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/10/20",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/20 00:15:06",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqRyRRTEAgCg==",
        "lastupdateddatetimeutc": "2020/10/19 13:15:46",
        "requestdate": "2020/10/20",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2FZU%25%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/11/03 00:15:11",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/11/03 00:00:00",
        "lastupdatedutc": "2020/11/02",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad59",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/11/03",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1127",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/11/03",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/11/03 00:15:11",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqRyxQPEAgCg==",
        "lastupdateddatetimeutc": "2020/11/02 13:16:16",
        "requestdate": "2020/11/03",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2FXU9%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/11/17 00:15:12",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/11/17 00:00:00",
        "lastupdatedutc": "2020/11/16",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad60",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/11/17",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1128",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/11/17",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/11/17 00:15:12",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqQyFSXEAgCg==",
        "lastupdateddatetimeutc": "2020/11/16 13:16:31",
        "requestdate": "2020/11/17",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2E%5BEQ%2A%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/11/25 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/11/25 11:10:08",
        "lastupdatedutc": "2020/11/25",
        "status": "Quote",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad61",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/11/25",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1129",
        "taskname": "Field quote",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/11/25",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/11/25 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqXydQTDAgCg==",
        "lastupdateddatetimeutc": "2020/11/25 00:10:15",
        "requestdate": "2020/11/25",
        "contactphone": "04XX XXX XXX",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%29Z%255%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/12/01 00:15:22",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/12/01 00:00:00",
        "lastupdatedutc": "2020/11/30",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad62",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/12/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1130",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/12/01",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/12/01 00:15:22",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqXyFRLFQgCg==",
        "lastupdateddatetimeutc": "2020/11/30 13:16:33",
        "requestdate": "2020/12/01",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%29%5BE%2D%2F%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/12/15 00:15:16",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/12/15 00:00:00",
        "lastupdatedutc": "2021/06/29",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad63",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/12/15",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1131",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/12/17 09:33:36",
        "description": "",
        "completeddate": "2020/12/15",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/12/15 00:15:16",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqWyJQXFggCg==",
        "lastupdateddatetimeutc": "2021/06/29 00:39:31",
        "requestdate": "2020/12/15",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%28%5B51%2C%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/12/29 00:15:14",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/12/29 00:00:00",
        "lastupdatedutc": "2020/12/28",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad64",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/12/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1132",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/12/29",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/12/29 00:15:14",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqVydQLDQgCg==",
        "lastupdateddatetimeutc": "2020/12/28 13:16:16",
        "requestdate": "2020/12/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2BZ%25%3D%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/01/12 00:15:21",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/01/12 00:00:00",
        "lastupdatedutc": "2021/01/11",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad65",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/01/12",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1133",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/01/12",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/01/12 00:15:21",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqUyRRLEwgCg==",
        "lastupdateddatetimeutc": "2021/01/11 13:16:16",
        "requestdate": "2021/01/12",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2AZU%2D%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/01/26 00:15:16",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/01/26 00:00:00",
        "lastupdatedutc": "2021/01/25",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad66",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/01/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1134",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/01/26",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/01/26 00:15:16",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqUy1RLDQgCg==",
        "lastupdateddatetimeutc": "2021/01/25 13:16:16",
        "requestdate": "2021/01/26",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2AXE%2D%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/02/09 00:15:22",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/02/09 00:00:00",
        "lastupdatedutc": "2021/02/08",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad67",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/09",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1135",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/02/09",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/02/09 00:15:22",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqLyxQXEQgCg==",
        "lastupdateddatetimeutc": "2021/02/08 13:16:46",
        "requestdate": "2021/02/09",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%25XU1%2B%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/02/23 00:15:17",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/02/23 00:00:00",
        "lastupdatedutc": "2021/02/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad68",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1136",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/02/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/02/23 00:15:17",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqKyNQLEwgCg==",
        "lastupdateddatetimeutc": "2021/02/22 13:16:31",
        "requestdate": "2021/02/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%24%5B%25%3D%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/02/27 00:00:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Jun 21, 2021 12:26:07 PM",
            "note": "<p>Email sent to .\n<br />\nSession time: June 22 2021 10:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1448880762\n<br />\nScheduled To: Dave Filoni</p>",
            "noteid": "JSYqVyFRLEQgCg==",
            "content": "<p>Email sent to .\n<br />\nSession time: June 22 2021 10:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1448880762\n<br />\nScheduled To: Dave Filoni</p>",
            "dateposted": "2021/06/21",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.2504982",
        "requestdatetime": "2021/02/26 08:50:00",
        "lastupdatedutc": "2021/06/21",
        "status": "Not Started",
        "gpslatitude": "-38.0784886",
        "linkprocesseddate": " ",
        "refcode": "dan mu1",
        "tasklocation": {
          "locationid": "",
          "locationname": "941 Thompsons Road, Lyndhurst"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1137",
        "taskname": "941 Thompsons Road, Lyndhurst",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/06/21 11:57:47",
        "description": "Check Fridges and Register One",
        "completeddate": "2021/02/27",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2021/02/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JScqRyRRTEwgCg==",
          "clientname": "Dan Murphy's Marriott Waters"
        },
        "taskid": "JSdaTyRRTEQgCg==",
        "lastupdateddatetimeutc": "2021/06/21 02:26:17",
        "requestdate": "2021/02/26",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2DZU%25%2B%0A"
      },
      {
        "contact": {
          "surname": "Payable",
          "givennames": "Accounts",
          "userid": "JScqQyNSXFggCg=="
        },
        "completeddatetime": "2021/02/27 00:00:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 3:50:00 PM",
            "note": "<p><b>Create Schedule</b>\nEmail sent to Accounts.\n<br />\nSession time: November 18 2021 16:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1458058046\n<br />\nScheduled To: Commander</p>",
            "noteid": "JSYqLyNRPEAgCg==",
            "content": "<p><b>Create Schedule</b>\nEmail sent to Accounts.\n<br />\nSession time: November 18 2021 16:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1458058046\n<br />\nScheduled To: Commander</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 3:53:24 PM",
            "note": "<p><b>Edit Schedule</b><br />\nEmail sent to Accounts.\n    <br />\n    Session time: November 18 2021 16:00:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1458058046\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "noteid": "JSYqLyNRPEQgCg==",
            "content": "<p><b>Edit Schedule</b><br />\nEmail sent to Accounts.\n    <br />\n    Session time: November 18 2021 16:00:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1458058046\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 4:54:56 AM",
            "note": "<p><b>Create Schedule</b>\nEmail sent to Accounts.\n<br />\nSession time: November 18 2021 16:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1490418855\n<br />\nScheduled To: Commander</p>",
            "noteid": "JSYqLyNRPEggCg==",
            "content": "<p><b>Create Schedule</b>\nEmail sent to Accounts.\n<br />\nSession time: November 18 2021 16:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1490418855\n<br />\nScheduled To: Commander</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 4:56:16 AM",
            "note": "<p><b>Delete Schedule</b><br />\nEmail sent to Accounts.\n    <br />\n    Session time: November 18 2021 16:00:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1490418855\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "noteid": "JSYqLyNRPEwgCg==",
            "content": "<p><b>Delete Schedule</b><br />\nEmail sent to Accounts.\n    <br />\n    Session time: November 18 2021 16:00:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1490418855\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 3:58:37 PM",
            "note": "<p><b>Create Schedule</b>\nEmail sent to Accounts.\n<br />\nSession time: November 18 2021 16:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1445880705\n<br />\nScheduled To: Commander</p>",
            "noteid": "JSYqLyNRPDAgCg==",
            "content": "<p><b>Create Schedule</b>\nEmail sent to Accounts.\n<br />\nSession time: November 18 2021 16:00:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1445880705\n<br />\nScheduled To: Commander</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 3:59:39 PM",
            "note": "<p><b>Edit Schedule</b><br />\nEmail sent to Accounts.\n    <br />\n    Session time: November 18 2021 16:00:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1445880705\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "noteid": "JSYqLyNRPDQgCg==",
            "content": "<p><b>Edit Schedule</b><br />\nEmail sent to Accounts.\n    <br />\n    Session time: November 18 2021 16:00:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1445880705\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.2222957",
        "requestdatetime": "2021/02/26 08:54:53",
        "lastupdatedutc": "2021/11/18",
        "status": "Not Started",
        "gpslatitude": "-37.8155855",
        "linkprocesseddate": " ",
        "refcode": "ringwo1",
        "tasklocation": {
          "locationid": "",
          "locationname": "59-65 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1138",
        "taskname": "59-65 Maroondah Highway, Ringwood",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Inspect Fridge and Food Prep areas",
        "completeddate": "2021/02/27",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/02/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JScqRyRRTDAgCg==",
          "clientname": "Ringwood Square Shopping Centre"
        },
        "taskid": "JSdaTyRRTEggCg==",
        "lastupdateddatetimeutc": "2021/11/18 04:59:47",
        "requestdate": "2021/02/26",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2DZU%25%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/03/03 09:40:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.295406",
        "requestdatetime": "2021/03/02 09:42:17",
        "lastupdatedutc": "2021/03/01",
        "status": "Not Started",
        "gpslatitude": "-38.069154",
        "linkprocesseddate": " ",
        "refcode": "TeCl_22",
        "tasklocation": {
          "locationid": "JScqWyVSXDAgCg==",
          "locationname": "83 Golden Grove Drive, Narre Warren South"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/03",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1139",
        "taskname": "Check bedroom AC",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/03/03",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/03 09:40:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "taskid": "JSdaTyFRLEggCg==",
        "lastupdateddatetimeutc": "2021/03/01 22:42:17",
        "requestdate": "2021/03/02",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2D%5BE%2D%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/03/03 09:50:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 1:09:08 PM",
            "note": "<p><b>Create Schedule</b>\nEmail sent to .\n<br />\nSession time: November 18 2021 12:30:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1488637832\n<br />\nScheduled To: Commander</p>",
            "noteid": "JSYqLyNRLEwgCg==",
            "content": "<p><b>Create Schedule</b>\nEmail sent to .\n<br />\nSession time: November 18 2021 12:30:00 Australia/Melbourne\n<br />\nMeeting ID: https://meetings.ringcentral.com/j/1488637832\n<br />\nScheduled To: Commander</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Only",
            "timeposted": "Nov 18, 2021 3:45:26 PM",
            "note": "<p><b>Edit Schedule</b><br />\nEmail sent to .\n    <br />\n    Session time: November 12 2021 07:45:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1488637832\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "noteid": "JSYqLyNRPFwgCg==",
            "content": "<p><b>Edit Schedule</b><br />\nEmail sent to .\n    <br />\n    Session time: November 12 2021 07:45:00 Australia/Melbourne\n    <br />\n    Meeting ID: 1488637832\n    <br />\n    Scheduled To: Commander Shepard</p>",
            "dateposted": "2021/11/18",
            "user": {
              "userid": "",
              "username": ""
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.2499152",
        "requestdatetime": "2021/03/02 09:50:45",
        "lastupdatedutc": "2021/11/18",
        "status": "Not Started",
        "gpslatitude": "-38.07753",
        "linkprocesseddate": " ",
        "refcode": "TeCl_23",
        "tasklocation": {
          "locationid": "JScqWyVSXDQgCg==",
          "locationname": "10-18S Society Avenue, Lyndhurst"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/03",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1140",
        "taskname": "10-18S Society Avenue Lyndhurst",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Inspect Exhaust fan for main oven",
        "completeddate": "2021/03/03",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/03 09:50:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "taskid": "JSdaTyFRLEwgCg==",
        "lastupdateddatetimeutc": "2021/11/18 04:45:32",
        "requestdate": "2021/03/02",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2D%5BE%2D%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/03/09 00:15:22",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/03/09 00:00:00",
        "lastupdatedutc": "2021/03/08",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad69",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/09",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1141",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/03/09",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/09 00:15:22",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSdaTy1QTDQgCg==",
        "lastupdateddatetimeutc": "2021/03/08 13:16:46",
        "requestdate": "2021/03/09",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2DXE5%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/03/17 12:40:57",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/03/17 12:40:57",
        "lastupdatedutc": "2021/03/17",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad70",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/17",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1142",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/03/17",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/17 12:40:57",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSdaSyBRXEQgCg==",
        "lastupdateddatetimeutc": "2021/03/17 01:41:00",
        "requestdate": "2021/03/17",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2C%5BU%21%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/03/31 09:49:26",
        "lastupdatedutc": "2021/03/30",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva10",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1143",
        "taskname": "Test  1111",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File with Notes",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/04/26 11:20:54",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdaRyJQXFggCg==",
        "lastupdateddatetimeutc": "2021/03/30 22:49:31",
        "requestdate": "2021/03/31",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2F%5B51%2C%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/04/26 11:29:58",
        "lastupdatedutc": "2021/04/26",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva11",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1144",
        "taskname": "Test  for CF",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdaXydQTEggCg==",
        "lastupdateddatetimeutc": "2021/04/26 01:30:02",
        "requestdate": "2021/04/26",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%29Z%255%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/08/12 10:22:05",
        "lastupdatedutc": "2021/08/12",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva12",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1145",
        "taskname": "R&amp;T2021 - YEF03763P MM - 84 TEST ROAD, TEST",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKRyVQPEQgCg==",
        "lastupdateddatetimeutc": "2021/08/12 00:22:16",
        "requestdate": "2021/08/12",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2FZE9%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/10/31 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/08/12 10:23:40",
        "lastupdatedutc": "2021/08/12",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva13",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2021/10/31",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1146",
        "taskname": "R&amp;T2021 - YEF03763P MM - 84 TEST ROAD, TEST",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "<br /><br /><p style='color:red;'>Previous Work Orders from this Address: 7586333, 7144944</p><br /><br />MeterSize: YEF03763P<br />MeterReadRoute: 16270001<br />MeterReadSequence: 16270001<br />MeterReadRouteDistrict: 27<br /><b>MeterReadWarning:  **</b><br />LastReadDateTime: 2021-07-30 16:19:08<br />LastReadType: Regular<br />LastRead: 69866.0<br />MeterManufacturer: ELSTER<br />YearOfManufacturer: 2014<br />CheckValve: NO<br />Model: KG2000 - Positive Displacement Meter<br />ModelType: <br />MeterDescription: CUSTOMER METER - YEF03763P<br />MeterGroupType: Subtractive<br /><br />JobReason: Planned Meter Replac<br />FieldActivityType: PMR",
        "completeddate": "2021/10/31",
        "custon": "7586333A",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/10/31 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKRyVQPEggCg==",
        "lastupdateddatetimeutc": "2021/08/12 00:23:46",
        "requestdate": "2021/08/12",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2FZE9%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/10/31 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "requestdatetime": "2021/08/12 10:30:18",
        "lastupdatedutc": "2021/08/12",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "linkprocesseddate": " ",
        "refcode": "Aardva14",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2021/10/31",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1147",
        "taskname": "R&amp;T2021 - YEF03763P MM - 84 TEST ROAD, TEST",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "<br /><br /><p style='color:red;'>Previous Work Orders from this Address: 7586333, 7144944</p><br /><br />MeterSize: YEF03763P<br />MeterReadRoute: 16270001<br />MeterReadSequence: 16270001<br />MeterReadRouteDistrict: 27<br /><b>MeterReadWarning:  **</b><br />LastReadDateTime: 2021-07-30 16:19:08<br />LastReadType: Regular<br />LastRead: 69866.0<br />MeterManufacturer: ELSTER<br />YearOfManufacturer: 2014<br />CheckValve: NO<br />Model: KG2000 - Positive Displacement Meter<br />ModelType: <br />MeterDescription: CUSTOMER METER - YEF03763P<br />MeterGroupType: Subtractive<br /><br />JobReason: Planned Meter Replac<br />FieldActivityType: PMR",
        "completeddate": "2021/10/31",
        "custon": "7586333A",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/10/31 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKRyVQPEwgCg==",
        "lastupdateddatetimeutc": "2021/08/12 00:30:31",
        "requestdate": "2021/08/12",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2FZE9%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/08/25 12:08:52",
        "lastupdatedutc": "2021/10/26",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva15",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1148",
        "taskname": "Test  for materials",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/08/25 12:09:56",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKQyRQXFQgCg==",
        "lastupdateddatetimeutc": "2021/10/26 03:29:17",
        "requestdate": "2021/08/25",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2EZU1%2F%0A"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 150,
    "queryresponsetimes": {
      "tasks": 230,
      "tasknotes": 18
    },
    "currentpageresults": 100
  }
}
```


---

### POST Insert Notes to Task

`POST https://api.aroflo.com/`

Insert a [Task Note](https://help.aroflo.com/display/office/Add+Notes). One or more notes can be added this way by providing another `note` node.

This example contains two notes, one HTML and one TEXT. We have also set one note to be "sticky".

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('materials')
        ,'postxml=' + encodeURIComponent('IyYqSyYK<![CDATA[this is a html note]]>internal admin onlytrue<![CDATA[this is a text note]]>internal onlyfalse')
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
        'zone=' + encodeURIComponent('tasks')
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
        ,'postxml=' + encodeURIComponent('<tasks><task><taskid>JSZaTy1RPFwgCg==</taskid><notes><note><content><![CDATA[<p>this is a html note</p>]]></content><filter>internal admin only</filter><sticky>true</sticky></note><note><content><![CDATA[this is a text note]]></content><filter>internal only</filter><sticky>false</sticky></note></notes></task></tasks>')
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

#### Post Notes to Task (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "tasks": [
          {
            "taskid": "IyYqSyYK",
            "notes": [
              {
                "TASKID": "IyYqSyYK",
                "filter": "4",
                "note": "<p>this is a html note</p>",
                "dateposted": "2018/11/01 12:03:53",
                "sticky": "1"
              },
              {
                "TASKID": "IyYqSyYK",
                "filter": "0",
                "note": "this is a text note",
                "dateposted": "2018/11/01 12:03:53",
                "sticky": "0"
              }
            ]
          }
        ]
      },
      "inserttotal": 2,
      "inserts": {
        "tasks": []
      }
    }
  }
}
```


---

### GET Update Note on Task

`GET https://api.aroflo.com/{{urlVarString}}`

Update an existing Task Note.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('materials')
        ,'postxml=' + encodeURIComponent('IyYqSyYKJCdKRyVRMCAgCg==<![CDATA[this is note was updated again]]>')
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

**Pre-request Script:**

```javascript
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('tasknotes')
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

#### Update Note on Task (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "contact": {
          "surname": "Mayhew",
          "givennames": "Peter",
          "userid": "JCQqRy1RMCAgCg=="
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": 0,
        "tasknotes": [
          {
            "filter": "Show Contractor",
            "timeposted": "Oct 16, 2018 1:50:36 PM",
            "note": "Previous Ref Number: TeCl1",
            "noteid": "JCdKSyJSQCAgCg==",
            "content": "Previous Ref Number: TeCl1",
            "dateposted": "2018/10/16",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          },
          {
            "filter": "Internal Admin Only",
            "timeposted": "Oct 16, 2018 1:47:58 PM",
            "note": "<p>this is a task note added from the office.</p>",
            "noteid": "JCdKSyJRMCAgCg==",
            "content": "<p>this is a task note added from the office.</p>",
            "dateposted": "2018/10/16",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "sticky": "false"
          }
        ],
        "gpslongitude": "145.220657",
        "requestdatetime": "2018/10/12 10:09:08",
        "lastupdatedutc": "2020/06/25",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/10",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1049",
        "taskname": "A task from the API",
        "tasktotals": {},
        "purchaseorders": [],
        "materials": [],
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Angie Mayhew",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaXyVQPFggCg==",
        "lastupdateddatetimeutc": "2020/06/25 03:57:45",
        "requestdate": "2018/10/12",
        "contactphone": "03 9259 5200",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%29ZE9%2C%0A"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 2,
    "queryresponsetimes": {
      "tasks": 120,
      "tasknotes": 1
    },
    "currentpageresults": 1
  }
}
```


### JOIN assignedhistory

Shows the history of assigned resources for the task.

**Authorization:** bearer


---

### GET Get Task with assignedhistory

`GET https://api.aroflo.com/{{urlVarString}}`

Return the details of task JN1037 that have not been processed by the API including the assigned resource history.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1075')
        ,'join=' + encodeURIComponent('assignedhistory')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```
As tasks can be assigned to both Business Units and Users/Resources, each record will have an org and user object. If the assigned is a Business Unit then the userid will be blank, if a User/Resource then the orgid will be blank.

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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1075')
        ,'join=' + encodeURIComponent('assignedhistory')
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

#### Get Task with assignedhistory (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2019/08/28 00:15:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2019/08/28 00:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2019/08/29 08:03:31",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad25",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2019/08/28",
        "custon": "",
        "duedate": "2019/08/28",
        "labours": [],
        "assigneds": [
          {
            "readtaskdatetime": " ",
            "readtask": "false",
            "org": {
              "orgid": "JCdKUyZRMCAgCg==",
              "orgname": "Bradley Sandbox"
            },
            "dateunassigned": "",
            "timeunassigned": "",
            "dateassigned": "2019/08/29",
            "user": {
              "userid": "",
              "username": ""
            },
            "timeassigned": "Aug 29, 2019 8:03:49 AM"
          },
          {
            "readtaskdatetime": " ",
            "readtask": "false",
            "org": {
              "orgid": "JCdKUyZRMCAgCg==",
              "orgname": "Bradley Sandbox"
            },
            "dateunassigned": "",
            "timeunassigned": "",
            "dateassigned": "2019/08/29",
            "user": {
              "userid": "JCQqQyRQUCAgCg==",
              "username": "James Nesbitt"
            },
            "timeassigned": "Aug 29, 2019 8:03:49 AM"
          }
        ],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2019/08/29",
        "jobnumber": "1075",
        "duedatetime": "2019/08/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZKRyxQLDQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/08/29 08:03:46",
        "requestdate": "2019/08/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 42,
      "assigneds": 5
    },
    "currentpageresults": 1
  }
}
```


### JOIN material

## WHERE filters

| Field | Value |
| --- | --- |
| materiallineid | AroFlo ID |
| isinventory | BOOLEAN |
| dateused | DATE(YYYY/MM/DD) |
| matlinkprocessed | BOOLEAN |
| matlinkprocesseddate | DATE(YYYY/MM/DD) |
| matlinkprocesseddatetime | DATETIME(YYYY/MM/DD HH:mm:ss |
| purchaseorderisordered | BOOLEAN |
| materialdeleteddate | DATE(YYYY/MM/DD) |
| materialdeleteddatetime | DATETIME(YYYY/MM/DD HH:mm:ss |

**Authorization:** bearer


---

### GET Get Task with Materials

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the Material line items.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('material')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('material')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Materials (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/10/31",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/10/31 11:47:14",
        "requestdate": "2018/10/12",
        "tasktype": "Service",
        "substatus": {},
        "materials": [
          {
            "matlinkprocesseddatetime": " ",
            "matlinkprocesseddate": "",
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
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 7,
      "materials": 45
    },
    "currentpageresults": 1
  }
}
```


---

### POST Insert AdHoc material to Task

`POST https://api.aroflo.com/`

Add an AdHoc item to a task directly from the Task zone. Multiple materials can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('materials')
        ,'postxml=' +encodeURIComponent('JSZaSyRQLEwgCg==<![CDATA[OLX7/085-2ERB]]><![CDATA[CABLE 4MM 2 FL 2C&E WH/RB&E PVC 100M CNC]]>2.44003.17202016/07/050')
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
        'zone=' + encodeURIComponent('tasks')
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
        ,'join=' + encodeURIComponent('materials')
        ,'postxml=' +encodeURIComponent('<tasks><task><taskid>JSZaSyRQLEwgCg==</taskid><materials><material><partnumber><![CDATA[OLX7/085-2ERB]]></partnumber><item><![CDATA[CABLE 4MM 2 FL 2C&E WH/RB&E PVC 100M CNC]]></item><cost>2.4400</cost><sell>3.1720</sell><dateused>2016/07/05</dateused><quantity>0</quantity></material></materials></task></tasks>')
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

#### Insert AdHoc material to Task (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "tasks": [
          {
            "taskid": "JSZaSyRQLEwgCg==",
            "materials": {
              "material": {
                "item": "CABLE 4MM 2 FL 2C&E WH/RB&E PVC 100M CNC",
                "cost": "2.4400",
                "sell": "3.1720",
                "quantity": "0",
                "partnumber": "OLX7/085-2ERB",
                "markup": 30,
                "dateused": "2016-07-05"
              }
            }
          }
        ]
      },
      "inserttotal": 1,
      "inserts": {
        "tasks": []
      }
    }
  }
}
```


### JOIN labour

## WHERE filters

| Field | Value |
| --- | --- |
| labourlineid | AROFLO ID |
| labourworkdate | DATE(YYYY/MM/DD) |
| labourworkdatetimestart | DATETIME(YYYY/MM/DD HH:mm:ss) |
| labourworkdatetimeend | DATETIME(YYYY/MM/DD HH:mm:ss) |
| lablinkprocessed | BOOLEAN |
| lablinkprocesseddate | DATE(YYYY/MM/DD) |
| lablinkprocesseddatetime | DATETIME(YYYY/MM/DD HH:mm:ss) |
| labourdeleteddate | DATE(YYYY/MM/DD) |
| labourdeleteddatetime | DATETIME(YYYY/MM/DD HH:mm:ss) |
| lablocked | BOOLEAN |
| labverified | BOOLEAN |

**Authorization:** bearer


---

### GET Get Task with Labour

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the Labour line items.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('labour')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('labour')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Labour (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [
          {
            "labverified": "false",
            "worktype": "NT",
            "workdatetimeend": "2018/10/23 09:00:00",
            "lablinkprocesseddatetime": "2018/10/23",
            "endtime": "Oct 23, 2018 9:00:00 AM",
            "lablinkprocesseddate": "2018/10/23",
            "deleted": "0",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Bradley Sandbox"
            },
            "lablinkprocessed": "true",
            "cost": "0.0000",
            "starttime": "Oct 23, 2018 7:00:00 AM",
            "deleteddate": "",
            "hours": "2.00",
            "sell": "83.0000",
            "lineid": "JSYqQyVRXFQgCg==",
            "workdatetimestart": "2018/10/23 07:00:00",
            "note": "this is a task labour",
            "lablocked": "false",
            "deletedtime": "",
            "deleteddatetime": " ",
            "workdate": "2018/10/23"
          }
        ],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/10/31",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/10/31 11:47:14",
        "requestdate": "2018/10/12",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 1,
      "labours": 16
    },
    "currentpageresults": 1
  }
}
```


### JOIN expense

## WHERE filters

| Field | Value |
| --- | --- |
| expensedateused | DATE(YYYY/MM/DD) |

**Authorization:** bearer


---

### GET Get Task with Expenses

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the Labour line items.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('expense')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('expense')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Expenses (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [
          {
            "overheadallocation": "",
            "cost": "15.0000",
            "sell": "15.0000",
            "description": "parking",
            "quantity": "0",
            "lineid": "JCQ6Ry1SUCAgCg==",
            "dateused": "2018/10/31",
            "user": {
              "userid": "",
              "username": ""
            }
          }
        ],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/10/31",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/10/31 11:47:14",
        "requestdate": "2018/10/12",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 29,
      "expenses": 66
    },
    "currentpageresults": 1
  }
}
```


### JOIN purchaseorders

Return the list of purchase orders linked to the task.

**Authorization:** bearer


---

### GET Get Task with Purchase Orders

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the list of Purchase Orders linked.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('purchaseorders')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('purchaseorders')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Purchase Orders (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/10/31",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/10/31 11:47:14",
        "requestdate": "2018/10/12",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": [
          {
            "purchaseorderid": "JCdKSyxRICAgCg=="
          },
          {
            "purchaseorderid": "JCdKSyxRICAgCg=="
          },
          {
            "purchaseorderid": "JCdKSyxRICAgCg=="
          }
        ]
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 2,
      "purchaseorders": 3
    },
    "currentpageresults": 1
  }
}
```


### JOIN assets

Return the list of assets linked to the task.

**Authorization:** bearer


---

### GET Get Task with Assets

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the list of Assets linked.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('assets')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1049')
        ,'join=' + encodeURIComponent('assets')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Assets (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [],
        "assigneds": [],
        "assets": [
          {
            "assetid": "JCYqWyNSUCAgCg==",
            "odotype": "",
            "modelnumber": "MSZGL25VGDKIT",
            "serialnumber": "",
            "quantity": "0",
            "barcode": "",
            "manufacturer": "Mitsubishi Electric",
            "supplier": "",
            "assetname": "2.5kw/3.2kw Reverse Cycle Inverter Split System Ai",
            "cost": "0.0000",
            "customerid": "",
            "odo": "0",
            "ordercode": "MSZGL25VGDKIT"
          }
        ],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:42:49",
        "requestdate": "2018/10/12",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 2,
      "assets": 6
    },
    "currentpageresults": 1
  }
}
```


### JOIN customfields

Include the tasks custom fields.

**Authorization:** bearer


---

### GET Get Task with Custom Fields

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1050 including the list of Custom Fields linked.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('customfields')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('customfields')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Custom Fields (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/29 00:15:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/10/29 08:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/29",
        "custon": "",
        "duedate": "2018/10/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1050",
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [
          {
            "fieldid": "JSZaVyVQTFAgCg==",
            "value": "option1",
            "archived": "false",
            "type": "Select",
            "name": "Failure Reason"
          },
          {
            "fieldid": "JSZaVyVQTFQgCg==",
            "value": "Res1",
            "archived": "false",
            "type": "Select",
            "name": "Resolution"
          }
        ],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaXyBRTEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:45:54",
        "requestdate": "2018/10/29",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 1,
      "customfields": 5
    },
    "currentpageresults": 1
  }
}
```


---

### POST Create Task with Custom Fields

`POST http://api.aroflo.com/`

Create a new task. Multiple tasks can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('Tasks')
        ,'postxml=' + encodeURIComponent('JCdKUyZRMCAgCg==JCdKUydSQCAgCg==JCYqVyFSQCAgCg==<![CDATA[ Test  1111]]>2019/11/26<![CDATA[ Test Description ]]><![CDATA[ Mr Test File ]]><![CDATA[ 0400123456 ]]><![CDATA[ Test123 ]]><![CDATA[ My Custom Field ]]><![CDATA[ text ]]><![CDATA[ Some Custom Data ]]>')
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
        'zone=' + encodeURIComponent('tasks')
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
        ,'postxml=' + encodeURIComponent('<tasks><task><org><orgid>JCdKUyZRMCAgCg==</orgid></org><client><clientid>JCdKUydSQCAgCg==</clientid></client><tasktype><tasktypeid>JCYqVyFSQCAgCg==</tasktypeid></tasktype><taskname><![CDATA[ Test  1111]]></taskname><duedate>2019/11/26</duedate><description><![CDATA[ Test Description ]]></description><contactname><![CDATA[ Mr Test File ]]></contactname><contactphone><![CDATA[ 0400123456 ]]></contactphone><custon><![CDATA[ Test123 ]]></custon><customfields><customfield><name><![CDATA[ My Custom Field ]]></name><type><![CDATA[ text ]]></type><value><![CDATA[ Some Custom Data ]]></value></customfield></customfields></task></tasks>')
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

#### Create Task with Custom Fields (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "tasks": []
      },
      "inserttotal": 1,
      "inserts": {
        "tasks": [
          {
            "taskid": "JSZKWyBQXEAgCg==",
            "contactname": "Mr Test File",
            "org": {
              "orgid": "JCdKUyZRMCAgCg=="
            },
            "description": "Test Description",
            "contactphone": "0400123456",
            "custon": "Test123",
            "customfields": {
              "customfield": {
                "FIELDID": 45497,
                "value": "Some Custom Data",
                "type": "text",
                "name": "My Custom Field"
              }
            },
            "tasktype": {
              "tasktypeid": "JCYqVyFSQCAgCg=="
            },
            "duedate": "2019/11/26",
            "client": {
              "clientid": "JCdKUydSQCAgCg=="
            },
            "taskname": "Test  1111"
          }
        ]
      }
    }
  }
}
```


### JOIN location

Include the location data for the task.

**Authorization:** bearer


---

### GET Get Task with Location

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the Location data.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('location')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('location')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Location (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {
          "locationid": "JSc6QyVRXFwgCg==",
          "gpslat": "0",
          "postcode": "2000",
          "SiteContact": "",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "SiteEmail": "",
          "customfields": [],
          "locationname": "HMAS Sydney",
          "country": "AUSTRALIA",
          "gpslong": "0",
          "address": "Pier 2, Harbour 4",
          "archived": "false",
          "SitePhone": ""
        },
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/29 00:15:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/10/29 08:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/29",
        "custon": "",
        "duedate": "2018/10/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1050",
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaXyBRTEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:45:54",
        "requestdate": "2018/10/29",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 7,
      "location": 8
    },
    "currentpageresults": 1
  }
}
```


### JOIN locationcustomfields

Include the Location Custom Fields. 

N.B. *REQUIRES* to also join location

**Authorization:** bearer


---

### GET Get Task with Location Custom Fields

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the Location data and Location Custom Fields.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('location,locationcustomfields')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('location,locationcustomfields')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Location Custom Fields (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {
          "locationid": "JSc6QyVRXFwgCg==",
          "gpslat": "0",
          "postcode": "2000",
          "SiteContact": "",
          "state": "NSW",
          "suburb": "Port of Sydney",
          "SiteEmail": "",
          "customfields": [
            {
              "fieldid": "JCYqUyFRICAgCg==",
              "value": "ABC123",
              "archived": "false",
              "type": "text",
              "name": "Site ID"
            }
          ],
          "locationname": "HMAS Sydney",
          "country": "AUSTRALIA",
          "gpslong": "0",
          "address": "Pier 2, Harbour 4",
          "archived": "false",
          "SitePhone": ""
        },
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/29 00:15:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/10/29 08:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/29",
        "custon": "",
        "duedate": "2018/10/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1050",
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaXyBRTEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:45:54",
        "requestdate": "2018/10/29",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 2,
      "location": 1,
      "customfields": 1
    },
    "currentpageresults": 1
  }
}
```


### JOIN project

Include data for the tasks Project

**Authorization:** bearer


---

### GET Get Task with Project

`GET https://api.aroflo.com/{{urlVarString}}`

Get the details of task JN1049 including the Location data and Location Custom Fields.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('project')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1050')
        ,'join=' + encodeURIComponent('project')
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
        ,'postxml=<tasks><task><taskid>XXX</taskid><linkprocessed>true</linkprocessed></task></tasks>'
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

#### Get Task with Project (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/29 00:15:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/10/29 08:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/29",
        "custon": "",
        "duedate": "2018/10/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {
          "location": {
            "locationid": "JSc6QyVRXFwgCg==",
            "locationname": "HMAS Sydney, Port of Sydney"
          },
          "contact": "Mriam Makehba",
          "startdate": "2018/11/09",
          "projecttype": "Commercial",
          "enddate": "2018/11/18",
          "status": "Open",
          "closeddate": "",
          "description": "",
          "projectid": "JCYqWyFQUCAgCg==",
          "refno": "#1 Lad1",
          "manager": "Bradley Sandbox",
          "custon": "665892",
          "projectnumber": "1",
          "projectname": "HMAS Sydney Maintenance Contract"
        },
        "readtask": "true",
        "stage": {
          "stageid": "JCZaWyFQICAgCg==",
          "stagename": "All Tasks"
        },
        "lastupdated": "2018/11/08",
        "jobnumber": "1050",
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaXyBRTEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:45:54",
        "requestdate": "2018/10/29",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 4,
      "location": 2,
      "project": 2,
      "stage": 1
    },
    "currentpageresults": 1
  }
}
```


---

### POST Update Task and Project/Stage

`POST http://api.aroflo.com/`

By providing a `taskid` we can update an existing task. Multiple tasks can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('Tasks')
         ,'postxml=' + encodeURIComponent('JSZaSyRQLEwgCg==<![CDATA[ Fix the sink ]]><![CDATA[ Pending ]]>')
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
        'zone=' + encodeURIComponent('tasks')
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
        'zone=' + encodeURIComponent('Tasks')
        ,'postxml=' + encodeURIComponent('<tasks><task><taskid>JSZaSyRQLEwgCg==</taskid><project><projectid>JCYqWyFQUCAgCg==</projectid></project><stage><stageid>JCZaWyFQICAgCg==</stageid></stage></task></tasks>')
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

#### Update Task and Project/Stage (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "tasks": [
          {
            "taskid": "JSZaSyRQLEwgCg==",
            "project": {
              "projectid": "JCYqWyFQUCAgCg=="
            },
            "stage": {
              "stageid": "JCZaWyFQICAgCg=="
            }
          }
        ]
      },
      "inserttotal": 0,
      "inserts": {
        "tasks": []
      }
    }
  }
}
```


### JOIN tasktotals

Include the task totals for labour, materials and expense items

**Authorization:** bearer


---

### GET Get Task and tasktotals

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of tasks and include the tasktotals information. This will show the total costs for labour, materials and expenses on task as well as the total labour hours.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('tasktotals')
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
        'zone=' + encodeURIComponent('tasks')
        ,'join=' + encodeURIComponent('tasktotals')
        ,'join=' + encodeURIComponent('customfields')
        ,'where=' +encodeURIComponent('and|orgname|=|AroFlo Customer Service')
        ,'where=' +encodeURIComponent('and|daterequested|>|2019/01/01')
        ,'page=' + encodeURIComponent('6')
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

#### Get Task and include the tasktotals (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/25 10:55:18",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Task Description",
        "linkprocesseddate": "2018/09/19 15:00:48",
        "refcode": "Aardva1",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/06/25",
        "jobnumber": "1036",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "true",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 1",
        "taskid": "JSZaTy1RPFwgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/06/25 10:55:18",
        "requestdate": "2018/06/25",
        "tasktype": "",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/27 09:02:28",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Task Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva2",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/06/27",
        "jobnumber": "1037",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 4",
        "taskid": "JSZaSyRQLEwgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/06/27 09:02:28",
        "requestdate": "2018/06/27",
        "tasktype": "",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/27 09:02:28",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Task Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva3",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/06/27",
        "jobnumber": "1038",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 3",
        "taskid": "JSZaSyRQLDAgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/06/27 09:02:28",
        "requestdate": "2018/06/27",
        "tasktype": "",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/27 09:02:28",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Task Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva4",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/06/27",
        "jobnumber": "1039",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 2",
        "taskid": "JSZaSyRQLDQgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/06/27 09:02:28",
        "requestdate": "2018/06/27",
        "tasktype": "",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/11 11:16:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/10 11:16:53",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/10 11:18:23",
        "description": "Working on Diesel #1",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad1",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "completeddate": "2018/07/11",
        "custon": "",
        "duedate": "2018/07/11",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/10",
        "jobnumber": "1040",
        "duedatetime": "2018/07/11 11:16:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaSydQPEggCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/07/10 11:17:49",
        "requestdate": "2018/07/10",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/11 11:20:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/10 11:21:01",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/09/19 15:37:07",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad2",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "completeddate": "2018/07/11",
        "custon": "",
        "duedate": "2018/07/11",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1RQCAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/10",
        "jobnumber": "1042",
        "duedatetime": "2018/07/11 11:20:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaSydQPDAgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/07/10 11:21:01",
        "requestdate": "2018/07/10",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/11 11:13:48",
        "priority": "179",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/11 10:59:45",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/11 11:13:18",
        "description": "jhgjhg",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad3",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "completeddate": "2018/07/11",
        "custon": "",
        "duedate": "2018/07/14",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/11",
        "jobnumber": "1043",
        "duedatetime": "2018/07/14 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaSydRLFAgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/07/11 11:13:48",
        "requestdate": "2018/07/11",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/27 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/26 13:49:42",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/26 13:49:42",
        "description": "Fix something",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad4",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "completeddate": "2018/07/27",
        "custon": "",
        "duedate": "2018/07/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/26",
        "jobnumber": "1044",
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRyZSXFQgCg==",
        "tasktotals": {
          "totalmat": "20.8240",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/07/26 00:00:00",
        "requestdate": "2018/07/26",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/27 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/26 13:52:02",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/26 13:52:02",
        "description": "Fox someththing",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad5",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "completeddate": "2018/07/27",
        "custon": "",
        "duedate": "2018/07/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/26",
        "jobnumber": "1045",
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRyZSXFggCg==",
        "tasktotals": {
          "totalmat": "20.8240",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/07/26 00:00:00",
        "requestdate": "2018/07/26",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/05 10:40:44",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/27 08:39:40",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/27 08:39:41",
        "description": "Fix aomething",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad6",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "completeddate": "2018/09/05",
        "custon": "",
        "duedate": "2018/07/28",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/09/05",
        "jobnumber": "1046",
        "duedatetime": "2018/07/28 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRydQLDAgCg==",
        "tasktotals": {
          "totalmat": "74.9475",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/09/05 10:40:44",
        "requestdate": "2018/07/27",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/20 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/09/19 15:37:24",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/09/19 15:37:24",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad7",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "completeddate": "2018/09/20",
        "custon": "",
        "duedate": "2018/09/20",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/09/25",
        "jobnumber": "1047",
        "duedatetime": "2018/09/20 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaQyBQPDQgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/09/25 09:52:58",
        "requestdate": "2018/09/19",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/27 10:17:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/09/26 10:17:32",
        "status": "Quote",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "Bradl1",
        "tasklocation": {
          "locationid": "",
          "locationname": ""
        },
        "completeddate": "2018/09/27",
        "custon": "",
        "duedate": "2018/09/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/09/26",
        "jobnumber": "1048",
        "duedatetime": "2018/09/27 10:17:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox"
        },
        "taskname": "test",
        "taskid": "JSZaQyFSTDAgCg==",
        "tasktotals": {
          "totalmat": "0.0000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "0"
        },
        "lastupdateddatetime": "2018/09/26 10:17:32",
        "requestdate": "2018/09/26",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/10/23",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {
          "totalmat": "19.5000",
          "totallab": "0.0000",
          "totalexp": "0.0000",
          "totalhrs": "2"
        },
        "lastupdateddatetime": "2018/10/23 09:11:05",
        "requestdate": "2018/10/12",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 34,
      "tasktotals": 3
    },
    "currentpageresults": 13
  }
}
```


### JOIN  substatus

This join is required to see the substatus of any task if used.

**Authorization:** bearer


---

### GET Get Tasks and Substatus

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of tasks that have not been processed by the API, including their substatus

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('substatus')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('substatus')
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

#### Get Tasks and Substatus (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/27 09:02:28",
        "status": "Pending",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": "2019/01/24 11:26:45",
        "description": "Task Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva4",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2019/01/24",
        "jobnumber": "1039",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 2",
        "taskid": "JSZaSyRQLDQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/01/24 11:26:55",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "",
        "substatus": {
          "substatusid": "IyYqLycK",
          "substatus": "Waiting for Parts"
        },
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/11 11:16:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/10 11:16:53",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/10 11:18:23",
        "description": "Working on Diesel #1",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad1",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/11",
        "custon": "",
        "duedate": "2018/07/11",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/10",
        "jobnumber": "1040",
        "duedatetime": "2018/07/11 11:16:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaSydQPEggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/07/10 11:17:49",
        "requestdate": "2018/07/10",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/11 11:13:48",
        "priority": "179",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/11 10:59:45",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/11 11:13:18",
        "description": "jhgjhg",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad3",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/11",
        "custon": "",
        "duedate": "2018/07/14",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/12/10",
        "jobnumber": "1043",
        "duedatetime": "2018/07/14 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaSydRLFAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/10 15:05:54",
        "requestdate": "2018/07/11",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/27 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/26 13:49:42",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/26 13:49:42",
        "description": "Fix something",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad4",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/27",
        "custon": "",
        "duedate": "2018/07/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2019/01/22",
        "jobnumber": "1044",
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRyZSXFQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/01/22 09:14:19",
        "requestdate": "2018/07/26",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/27 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/26 13:52:02",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/26 13:52:02",
        "description": "Fox someththing",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad5",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/27",
        "custon": "",
        "duedate": "2018/07/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2019/01/22",
        "jobnumber": "1045",
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRyZSXFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/01/22 09:14:05",
        "requestdate": "2018/07/26",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/05 10:40:44",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/27 08:39:40",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/27 08:39:41",
        "description": "Fix aomething",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad6",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/09/05",
        "custon": "",
        "duedate": "2018/07/28",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/09/05",
        "jobnumber": "1046",
        "duedatetime": "2018/07/28 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRydQLDAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/09/05 10:40:44",
        "requestdate": "2018/07/27",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/20 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/09/19 15:37:24",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/09/19 15:37:24",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad7",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/09/20",
        "custon": "",
        "duedate": "2018/09/20",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2019/01/22",
        "jobnumber": "1047",
        "duedatetime": "2018/09/20 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaQyBQPDQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/01/22 09:14:33",
        "requestdate": "2018/09/19",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/27 10:17:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/09/26 10:17:32",
        "status": "Quote",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "Bradl1",
        "tasklocation": {
          "locationid": "",
          "locationname": ""
        },
        "documentsandphotos": [],
        "completeddate": "2018/09/27",
        "custon": "",
        "duedate": "2018/09/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/09/26",
        "jobnumber": "1048",
        "duedatetime": "2018/09/27 10:17:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox"
        },
        "taskname": "test",
        "taskid": "JSZaQyFSTDAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/09/26 10:17:32",
        "requestdate": "2018/09/26",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Angie Mayhew",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:42:49",
        "requestdate": "2018/10/12",
        "contactphone": "03 9259 5200",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/11 10:24:13",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/10/29 08:00:00",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/11",
        "custon": "",
        "duedate": "2018/10/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2019/01/14",
        "jobnumber": "1050",
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaXyBRTEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/01/14 09:19:57",
        "requestdate": "2018/10/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/17 10:26:45",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/11/29 08:00:00",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/12/04 13:48:12",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad9",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/17",
        "custon": "",
        "duedate": "2018/11/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2019/01/18",
        "jobnumber": "1051",
        "duedatetime": "2018/11/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaWyZRLFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/01/18 11:55:38",
        "requestdate": "2018/11/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/07 14:14:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "expenses": [],
        "requestdatetime": "2018/12/06 14:14:51",
        "status": "Not Started",
        "gpslatitude": "-37.8127302",
        "readtaskdatetime": " ",
        "description": "asdasd",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad10",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/07",
        "custon": "",
        "duedate": "2018/12/07",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1RQCAgCg==",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/06",
        "jobnumber": "1053",
        "duedatetime": "2018/12/07 14:14:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "11111 22222 Ringwood",
        "taskid": "JSZaWyBRLFwgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/06 14:16:02",
        "requestdate": "2018/12/06",
        "contactphone": "",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/18 11:56:12",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/12/06 14:17:54",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/12/06 14:17:54",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad11",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/18",
        "custon": "",
        "duedate": "2018/12/07",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqSyRQUCAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/12/18",
        "jobnumber": "1054",
        "duedatetime": "2018/12/07 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "ttt HMAS Sydney Port of Sydney",
        "taskid": "JSZaWyBRLEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/18 11:56:12",
        "requestdate": "2018/12/06",
        "contactphone": "04XX XXX XXX",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/11 10:25:26",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/12/11 10:25:00",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "collated cogs test",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad12",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/11",
        "custon": "",
        "duedate": "2018/12/12",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/11",
        "jobnumber": "1055",
        "duedatetime": "2018/12/12 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney 2",
        "taskid": "JSZaWyFRLEQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/11 10:25:26",
        "requestdate": "2018/12/11",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/12/12 13:45:46",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Test Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva6",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "duedate": "2018/10/18",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/12",
        "jobnumber": "1056",
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "Test  1111",
        "taskid": "JSZaWyFSXEQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/12 13:45:46",
        "requestdate": "2018/12/12",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/17 10:26:59",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/12/17 10:25:23",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "<p>this is a linked quote</p>",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad13",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/17",
        "custon": "",
        "duedate": "2018/12/18",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/17",
        "jobnumber": "1057",
        "duedatetime": "2018/12/18 10:25:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "LINKED HMAS Sydney Port of Sydney",
        "taskid": "JSZaWyNQTFwgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/17 10:26:59",
        "requestdate": "2018/12/17",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/28 00:15:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/12/28 08:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad14",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/28",
        "custon": "",
        "duedate": "2018/12/28",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/28",
        "jobnumber": "1058",
        "duedatetime": "2018/12/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaWy1QTFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/28 00:15:00",
        "requestdate": "2018/12/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 59,
      "substatus": 1
    },
    "currentpageresults": 17
  }
}
```


---

### POST Update Task Substatus

`POST https://api.aroflo.com/`

Update the substatus on a task

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'postxml=' + encodeURIComponent('JSZaSyRQLEwgCg==<![CDATA[pending]]>IidaVCAK')
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
        'zone=' + encodeURIComponent('tasks')
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
        ,'postxml=' + encodeURIComponent('<tasks><task><taskid>JSZaSyRQLEwgCg==</taskid><status><![CDATA[pending]]></status><substatus><substatusid>IidaVCAK</substatusid></substatus></task></tasks>')
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

#### Update Task Substatus (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "tasks": [
          {
            "taskid": "JSZaSyRQLEwgCg==",
            "substatusid": "IidaVCAK",
            "status": "pending"
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "tasks": []
      }
    }
  }
}
```


### JOIN salesperson

**Authorization:** bearer


---

### GET Get Tasks for the salesperson "James Nesbitt"

`GET https://api.aroflo.com/{{urlVarString}}`

Return all of the tasks that are linked to the salesperson "James Nesbitt".  We can do this by filtering on either the `salesperson_givenname`/`salesperson_surname` fields or by the `salesperson_id`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|salesperson_givenname|=|James')
        ,'where=' + encodeURIComponent('and|salesperson_surname|=|Nesbitt')
        ,'join=' + encodeURIComponent('salesperson')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|salesperson_givenname|=|James')
        ,'where=' + encodeURIComponent('and|salesperson_surname|=|Nesbitt')
        ,'join=' + encodeURIComponent('salesperson')
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

#### Get Tasks for the salesperson "James Nesbitt" (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2019/10/01 15:19:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "144.9607964",
        "expenses": [],
        "requestdatetime": "2019/09/30 15:19:44",
        "status": "Not Started",
        "gpslatitude": "-37.8180446",
        "readtaskdatetime": "2019/09/30 15:20:20",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu3",
        "tasklocation": {
          "locationid": "",
          "locationname": "50 Market St, Melbourne"
        },
        "documentsandphotos": [],
        "completeddate": "2019/10/01",
        "custon": "",
        "duedate": "2019/10/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "salesperson": [
          {
            "surname": "Nesbitt",
            "user_id": "JCQqQyRQUCAgCg==",
            "givenname": "James"
          }
        ],
        "lastupdated": "2019/09/30",
        "jobnumber": "1088",
        "duedatetime": "2019/10/01 15:19:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskname": "Test for sortable checklist",
        "taskid": "JSZKQyNQPEQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/09/30 15:19:45",
        "requestdate": "2019/09/30",
        "contactphone": "",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 86,
      "salesperson": 1
    },
    "currentpageresults": 1
  }
}
```


---

### GET Get Tasks for the salesperson_id

`GET https://api.aroflo.com/{{urlVarString}}`

Return all of the tasks that are linked to the `salesperson_id` "JCQqQyRQUCAgCg==".

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|salesperson_id|=|JCQqQyRQUCAgCg==')
        ,'join=' + encodeURIComponent('salesperson')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|salesperson_id|=|JCQqQyRQUCAgCg==')
        ,'join=' + encodeURIComponent('salesperson')
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

#### Get Tasks for the salesperson_id (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2019/10/01 15:19:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "144.9607964",
        "expenses": [],
        "requestdatetime": "2019/09/30 15:19:44",
        "status": "Not Started",
        "gpslatitude": "-37.8180446",
        "readtaskdatetime": "2019/09/30 15:20:20",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu3",
        "tasklocation": {
          "locationid": "",
          "locationname": "50 Market St, Melbourne"
        },
        "documentsandphotos": [],
        "completeddate": "2019/10/01",
        "custon": "",
        "duedate": "2019/10/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "salesperson": [
          {
            "surname": "Nesbitt",
            "user_id": "JCQqQyRQUCAgCg==",
            "givenname": "James"
          }
        ],
        "lastupdated": "2019/09/30",
        "jobnumber": "1088",
        "duedatetime": "2019/10/01 15:19:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskname": "Test for sortable checklist",
        "taskid": "JSZKQyNQPEQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2019/09/30 15:19:45",
        "requestdate": "2019/09/30",
        "contactphone": "",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 75,
      "salesperson": 0
    },
    "currentpageresults": 1
  }
}
```


### JOIN quote

Add the Quote totals and the estimator to your returned task data by joining `quotes`.

**Authorization:** bearer


---

### GET Get Tasks with quote data

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of tasks that have not been processed by the API, including their substatus

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'join=' + encodeURIComponent('quote')
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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|jobnumber|=|1048')
        ,'join=' + encodeURIComponent('quote')
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

#### Get Tasks with quote data (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "quote": {
          "totalinc": "4114.08",
          "totaltax": "374.02",
          "estimator": {
            "surname": "Sandbox",
            "givennames": "Bradley",
            "userid": "JCQ6XyRRUCAgCg=="
          },
          "totalex": "3740.06"
        },
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/27 10:17:00",
        "priority": 0,
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/09/26 10:17:32",
        "status": "Quote",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "Bradl1",
        "tasklocation": {
          "locationid": "",
          "locationname": ""
        },
        "documentsandphotos": [],
        "completeddate": "2018/09/27",
        "custon": "",
        "duedate": "2018/09/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "salesperson": [],
        "lastupdated": "2018/09/26",
        "jobnumber": "1048",
        "duedatetime": "2018/09/27 10:17:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox"
        },
        "taskname": "Supplier Quotes Test",
        "taskid": "JSZaQyFSTDAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/09/26 10:17:32",
        "requestdate": "2018/09/26",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 2,
      "quote": 1
    },
    "currentpageresults": 1
  }
}
```


---

### GET Get Tasks

`GET https://api.aroflo.com/{{urlVarString}}`

Return the first page of tasks that have not been processed by the API. We do this by filtering on the linkprocessed field, which we should set TRUE after we process the data from AroFlo.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|linkprocessed|=|false')
        ,'page=' + encodeURIComponent('1')
    ];
    urlVarString = urlVarString.join('&');
}

```
*NOTE* If the task.tasklocation.locationid is blank, this means that the task is using the clients company address.

**Authorization:** bearer


**Headers:**

| Header | Value | Description |
| --- | --- | --- |
| `Authentication` | `HMAC {{af_hmac_signature}}` |  |
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
const crypto = require('crypto-js');

//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('tasks')
       ,'where=' + encodeURIComponent('and|jobnumber|=|1038')
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
  let hash = crypto.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Get Tasks (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2018/06/26 23:02:28",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2018/06/27 09:02:28",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": "2020/07/02 09:44:54",
        "refcode": "Aardva3",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/07/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1038",
        "taskname": "AroFlo Test 3",
        "tasktotals": {},
        "createdutc": "2018/06/26",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Task Description",
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "true",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaSyRQLDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 03:47:30",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2CZU%3D%26%0A"
      },
      {
        "contact": {
          "surname": "Mayhew",
          "givennames": "Peter",
          "userid": "JCQqRy1RMCAgCg=="
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2018/10/11 23:09:08",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "requestdatetime": "2018/10/12 10:09:08",
        "lastupdatedutc": "2020/06/25",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/10",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1049",
        "taskname": "A task from the API",
        "tasktotals": {},
        "createdutc": "2018/10/11",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Angie Mayhew",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZaXyVQPFggCg==",
        "lastupdateddatetimeutc": "2020/06/25 03:57:45",
        "requestdate": "2018/10/12",
        "contactphone": "03 9259 5200",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%29ZE9%2C%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqWyVSQCAgCg=="
        },
        "completeddatetime": "2018/12/07 14:14:00",
        "priority": 0,
        "createddatetimeutc": "2018/12/06 03:14:52",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/12/06 14:14:51",
        "lastupdatedutc": "2020/08/06",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad10",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/12/07",
        "labours": [],
        "assets": [],
        "assetid": "JCYqTy1RQCAgCg==",
        "project": {},
        "salesperson": [],
        "jobnumber": "1053",
        "taskname": "11111 22222 Ringwood",
        "tasktotals": {},
        "createdutc": "2018/12/06",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/06/30 10:02:04",
        "description": "asdasd",
        "completeddate": "2018/12/07",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/12/07 14:14:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWyBRLFwgCg==",
        "lastupdateddatetimeutc": "2020/08/06 06:08:30",
        "requestdate": "2018/12/06",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28%5BU%2D%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2018/12/28 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2018/12/27 13:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2018/12/28 08:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad14",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2018/12/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1058",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2018/12/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2018/12/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/12/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaWy1QTFggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:01:14",
        "requestdate": "2018/12/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%28XE5%2C%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/01/29 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2019/01/28 13:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/01/29 08:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad15",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/01/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1059",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/01/28",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/01/29",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/01/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaVyJRTDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:01:14",
        "requestdate": "2019/01/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2B%5B5%25%26%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqWyVSQCAgCg=="
        },
        "completeddatetime": "2019/02/19 08:51:00",
        "priority": 0,
        "createddatetimeutc": "2019/02/17 21:52:03",
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "requestdatetime": "2019/02/18 08:52:03",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad16",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/02/19",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1061",
        "taskname": "11111 22222 Ringwood",
        "tasktotals": {},
        "createdutc": "2019/02/17",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/08/07 12:56:20",
        "description": "",
        "completeddate": "2019/02/19",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/02/19 08:51:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaUyZQPEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2019/02/18",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2AZ59%28%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/02/28 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2019/02/27 13:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/02/28 08:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad17",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/02/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1062",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/02/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/02/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/02/28 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaUyJRLEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:01:44",
        "requestdate": "2019/02/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%2A%5B5%2D%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/03/28 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2019/03/27 13:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/03/28 08:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad18",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/03/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1063",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/03/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/03/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/03/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaLyJQTDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:01:59",
        "requestdate": "2019/03/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%25%5B55%27%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqWyVSQCAgCg=="
        },
        "completeddatetime": "2019/04/18 10:03:00",
        "priority": 0,
        "createddatetimeutc": "2019/04/17 00:04:11",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/04/17 10:04:09",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad19",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/04/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1064",
        "taskname": "HMAS Sydney Port of Sydney",
        "tasktotals": {},
        "createdutc": "2019/04/17",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "This is a test for Supplier Quotes",
        "completeddate": "2019/04/18",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/04/18 10:03:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaKyRSTDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:02:14",
        "requestdate": "2019/04/17",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%24ZUU%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/04/29 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2019/04/28 14:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/04/29 08:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad20",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/04/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1065",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/04/28",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/05/02 11:57:11",
        "description": "",
        "completeddate": "2019/04/29",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/04/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZaKyZRPDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:02:14",
        "requestdate": "2019/04/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CV%24Z5%29%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/05/28 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2019/05/27 14:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/05/28 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad21",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/05/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1066",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/05/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/06/04 07:53:28",
        "description": "",
        "completeddate": "2019/05/28",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/05/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKTyRQLDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:02:29",
        "requestdate": "2019/05/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2DZU%3D%26%0A"
      },
      {
        "contact": {
          "surname": "Contact",
          "givennames": "Child",
          "userid": "JCQ6XyZQUCAgCg=="
        },
        "completeddatetime": "2019/07/13 08:53:00",
        "priority": 0,
        "createddatetimeutc": "2019/07/11 22:53:46",
        "tasknotes": [],
        "gpslongitude": "145.2200194",
        "requestdatetime": "2019/07/12 08:53:46",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8121626",
        "linkprocesseddate": " ",
        "refcode": "Andrea1",
        "tasklocation": {
          "locationid": "",
          "locationname": "10 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/07/13",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1069",
        "taskname": "10 New Street Ringwood",
        "tasktotals": {},
        "createdutc": "2019/07/11",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/07/12 11:21:39",
        "description": "Test for email to Task Request for Child Contact",
        "completeddate": "2019/07/13",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/07/13 08:53:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyBQUCAgCg==",
          "clientname": "Andrea Test"
        },
        "taskid": "JSZKSyBSXEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:02:45",
        "requestdate": "2019/07/12",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2C%5BUQ%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/07/29 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2019/07/28 14:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/07/29 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad24",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/07/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1072",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/07/28",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/07/29",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/07/29 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKSy1QLFAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:02:59",
        "requestdate": "2019/07/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2CXE%3D%2E%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/08/06 12:34:00",
        "priority": 0,
        "createddatetimeutc": "2019/08/05 02:34:31",
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "requestdatetime": "2019/08/05 12:34:30",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8127302",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad26",
        "tasklocation": {
          "locationid": "",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/08/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1074",
        "taskname": "labour2",
        "tasktotals": {},
        "createdutc": "2019/08/05",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/08/06",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/08/06 12:34:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKRyVQTFwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:02:59",
        "requestdate": "2019/08/05",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2FZE5%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/08/28 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2019/08/27 14:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/08/28 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad25",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/08/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1075",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/08/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/08/29 08:03:31",
        "description": "",
        "completeddate": "2019/08/28",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/08/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKRyxQLDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:03:14",
        "requestdate": "2019/08/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2FXU%3D%27%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/09/10 13:49:00",
        "priority": 0,
        "createddatetimeutc": "2019/09/09 03:49:57",
        "tasknotes": [],
        "gpslongitude": "0",
        "requestdatetime": "2019/09/09 13:49:55",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "0",
        "linkprocesseddate": " ",
        "refcode": "Bradl4",
        "tasklocation": {
          "locationid": "",
          "locationname": "12 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/09/10",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1076",
        "taskname": "Test for Zapier List Tasks",
        "tasktotals": {},
        "createdutc": "2019/09/09",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/09/23 10:06:26",
        "description": "",
        "completeddate": "2019/09/10",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/09/10 13:49:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox BU"
        },
        "taskid": "JSZKQyVRLFAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:03:14",
        "requestdate": "2019/09/09",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2EZE%2D%2E%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/09/27 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2019/09/26 14:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/09/27 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad28",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/09/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1087",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/09/26",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/10/25 08:47:31",
        "description": "",
        "completeddate": "2019/09/27",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/09/27 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKQyJRPEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:03:29",
        "requestdate": "2019/09/27",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2E%5B5%29%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/10/01 15:19:00",
        "priority": 0,
        "createddatetimeutc": "2019/09/30 05:19:45",
        "tasknotes": [],
        "gpslongitude": "144.9607964",
        "requestdatetime": "2019/09/30 15:19:44",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8180446",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu3",
        "tasklocation": {
          "locationid": "",
          "locationname": "50 Market St, Melbourne"
        },
        "documentsandphotos": [],
        "duedate": "2019/10/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1088",
        "taskname": "Test for sortable checklist",
        "tasktotals": {},
        "createdutc": "2019/09/30",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/09/30 15:20:20",
        "description": "",
        "completeddate": "2019/10/01",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/10/01 15:19:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskid": "JSZKQyNQPEQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:04:00",
        "requestdate": "2019/09/30",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2E%5B%259%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/11/08 09:56:09",
        "priority": 0,
        "createddatetimeutc": "2019/11/07 22:59:01",
        "tasknotes": [],
        "gpslongitude": "0",
        "requestdatetime": "2019/11/08 09:56:09",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "0",
        "linkprocesseddate": " ",
        "refcode": "ABC Bu4",
        "tasklocation": {
          "locationid": "",
          "locationname": ""
        },
        "documentsandphotos": [],
        "duedate": "2012/03/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1092",
        "taskname": "Test for import 2",
        "tasktotals": {},
        "createdutc": "2019/11/07",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Description import 2",
        "completeddate": "2019/11/08",
        "custon": "Scarlett",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2012/03/26 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSUCAgCg==",
          "clientname": "ABC Building"
        },
        "taskid": "JSZKXy1RTEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:04:00",
        "requestdate": "2019/11/08",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%29XE%25%2A%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/11/26 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2019/11/24 23:16:49",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2019/11/25 10:16:49",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva6",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/11/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1094",
        "taskname": "Test  1111",
        "tasktotals": {},
        "createdutc": "2019/11/24",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/11/25 10:17:40",
        "description": "Test Description",
        "completeddate": "2019/11/26",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/11/26 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSZKWyBQXEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:04:14",
        "requestdate": "2019/11/25",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%28%5BU1%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/11/28 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2019/11/27 13:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/11/28 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad31",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/11/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1095",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/11/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/11/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/11/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKWyFRTFQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:04:14",
        "requestdate": "2019/11/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%28%5BE%25%2F%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/12/02 00:00:00",
        "priority": "IyYqKyIK",
        "createddatetimeutc": "2019/12/03 05:17:02",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/12/03 16:17:02",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad32",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/12/02",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1096",
        "taskname": "Testy McPriority",
        "tasktotals": {},
        "createdutc": "2019/12/03",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2019/12/03 16:17:17",
        "description": "Test for custom priorities",
        "completeddate": "2019/12/02",
        "custon": "1234",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2019/12/02 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKWyNQPDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:04:14",
        "requestdate": "2019/12/03",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%28%5B%259%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2019/12/27 00:14:59",
        "priority": 0,
        "createddatetimeutc": "2019/12/26 13:14:59",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2019/12/27 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad33",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2019/12/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1097",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2019/12/26",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2019/12/27",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/12/27 00:14:59",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKVyJSXDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:04:29",
        "requestdate": "2019/12/27",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2B%5B5Q%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/01/28 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2020/01/27 13:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/01/28 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad34",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/01/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1098",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/01/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/01/30 15:59:25",
        "description": "",
        "completeddate": "2020/01/28",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/01/28 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKUy1STEQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:04:45",
        "requestdate": "2020/01/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%2AXEU%2B%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/02/25 00:15:02",
        "priority": 0,
        "createddatetimeutc": "2020/02/24 13:15:02",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/02/25 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad38",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/02/25",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1102",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/02/24",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/02/25",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/02/25 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKKyZQPDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:05:00",
        "requestdate": "2020/02/25",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%24Z59%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/03/10 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2020/03/09 13:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/03/10 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad39",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/03/10",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1103",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/03/09",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/03/10",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/03/10 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSZKKyxRXEwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:05:14",
        "requestdate": "2020/03/10",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CR%24XU%21%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/03/24 00:15:02",
        "priority": 0,
        "createddatetimeutc": "2020/03/23 13:15:02",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/03/24 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad40",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/03/24",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1104",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/03/23",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/03/24",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/03/24 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6TyFQXFQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:05:44",
        "requestdate": "2020/03/24",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2D%5BE1%2F%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2019/11/26 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2020/04/03 04:32:11",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2020/04/03 15:32:11",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva7",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2019/11/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1105",
        "taskname": "Test  11111",
        "tasktotals": {},
        "createdutc": "2020/04/03",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2019/11/26",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2019/11/26 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSc6SyRSXFwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:05:44",
        "requestdate": "2020/04/03",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2CZUQ%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/04/07 00:15:04",
        "priority": 0,
        "createddatetimeutc": "2020/04/06 14:15:04",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/04/07 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad41",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/04/07",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1106",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/04/06",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/04/07",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/04/07 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6SyVRLDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:05:44",
        "requestdate": "2020/04/07",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2CZE%2D%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/04/21 00:15:05",
        "priority": 0,
        "createddatetimeutc": "2020/04/20 14:15:05",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/04/21 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad42",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/04/21",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1107",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/04/20",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/04/21",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/04/21 00:15:05",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6RydRPFAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:06:00",
        "requestdate": "2020/04/21",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2FZ%25%29%2E%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/05/05 00:15:06",
        "priority": 0,
        "createddatetimeutc": "2020/05/04 14:15:06",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/05/05 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad43",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/05/05",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1108",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/05/04",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/05/05",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/05/05 00:15:06",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6QyRRXEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/05/05",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2EZU%21%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/05/19 00:15:04",
        "priority": 0,
        "createddatetimeutc": "2020/05/18 14:15:04",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/05/19 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad44",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/05/19",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1109",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/05/18",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/05/19",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/05/19 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6QyNRLEwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/05/19",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2E%5B%25%2D%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/06/02 00:15:04",
        "priority": 0,
        "createddatetimeutc": "2020/06/01 14:15:04",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/06/02 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad45",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/06/02",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1110",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/06/01",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/06/02",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/06/02 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6XyNSTFggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/06/02",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%29%5B%25U%2C%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/06/12 09:59:31",
        "priority": 0,
        "createddatetimeutc": "2020/06/11 23:59:31",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/06/12 09:59:31",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad46",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/06/12",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1111",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/06/11",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/06/12 09:59:30",
        "description": "",
        "completeddate": "2020/06/12",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/06/12 09:59:31",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6WydQLFQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/06/12",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%28Z%25%3D%2F%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/06/30 00:15:04",
        "priority": 0,
        "createddatetimeutc": "2020/06/29 14:15:04",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/06/30 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad47",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/06/30",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1112",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/06/29",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/06/30",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/06/30 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6VyRRPFwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/06/30",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2BZU%29%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/07/14 00:15:03",
        "priority": 0,
        "createddatetimeutc": "2020/07/13 14:15:03",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/07/14 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad48",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/07/14",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1113",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/07/13",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/07/14",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/07/14 00:15:03",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6VyNRTEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/07/14",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2B%5B%25%25%2A%0A"
      },
      {
        "contact": {
          "surname": "Hoh",
          "givennames": "Ivan",
          "userid": "JCQ6XydQUCAgCg=="
        },
        "completeddatetime": "2020/07/23 15:38:00",
        "priority": 0,
        "createddatetimeutc": "2020/07/22 05:40:03",
        "tasknotes": [],
        "gpslongitude": "115.7686175",
        "requestdatetime": "2020/07/22 15:40:03",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-31.743055",
        "linkprocesseddate": " ",
        "refcode": "Crust1",
        "tasklocation": {
          "locationid": "",
          "locationname": "Corner Boas Avenue & McLarty Street, Joondalup"
        },
        "documentsandphotos": [],
        "duedate": "2020/07/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1114",
        "taskname": "WA Client",
        "tasktotals": {},
        "createdutc": "2020/07/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/07/22 16:15:22",
        "description": "",
        "completeddate": "2020/07/23",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/07/23 15:38:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyFQUCAgCg==",
          "clientname": "Crust Pizza"
        },
        "taskid": "JSc6UyVRXEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/07/22",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2AZE%21%28%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/07/28 00:15:07",
        "priority": 0,
        "createddatetimeutc": "2020/07/27 14:15:07",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/07/28 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad49",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/07/28",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1115",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/07/27",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/07/28",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/07/28 00:15:07",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6UydSTEwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/07/28",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2AZ%25U%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2020/10/18 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2020/07/29 00:27:23",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2020/07/29 10:27:23",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva8",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1116",
        "taskname": "test for webid",
        "tasktotals": {},
        "createdutc": "2020/07/29",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2020/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSc6UyJQTEQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/07/29",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%2A%5B55%2B%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/08/11 00:15:04",
        "priority": 0,
        "createddatetimeutc": "2020/08/10 14:15:04",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/08/11 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad50",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/08/11",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1117",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/08/10",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/08/17 08:40:41",
        "description": "",
        "completeddate": "2020/08/11",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/08/11 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6LydQLDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:14",
        "requestdate": "2020/08/11",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%25Z%25%3D%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/08/25 00:15:07",
        "priority": 0,
        "createddatetimeutc": "2020/08/24 14:15:07",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/08/25 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad51",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/08/25",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1118",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/08/24",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/09/01 11:59:48",
        "description": "",
        "completeddate": "2020/08/25",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/08/25 00:15:07",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6KyRQLEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:30",
        "requestdate": "2020/08/25",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%24ZU%3D%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/09/08 00:15:05",
        "priority": 0,
        "createddatetimeutc": "2020/09/07 14:15:05",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/09/08 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad52",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/09/08",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1119",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/09/07",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/09/16 11:52:10",
        "description": "",
        "completeddate": "2020/09/08",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/09/08 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSc6KyNSXEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:30",
        "requestdate": "2020/09/08",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CN%24%5B%25Q%28%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/09/22 00:15:18",
        "priority": 0,
        "createddatetimeutc": "2020/09/21 14:15:18",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/09/22 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad53",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/09/22",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1120",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/09/21",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/09/22",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/09/22 00:15:18",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqTyFRTEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:30",
        "requestdate": "2020/09/22",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2D%5BE%25%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2020/09/24 04:37:11",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2020/09/24 14:37:11",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva9",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1121",
        "taskname": "Test for API Event Messages",
        "tasktotals": {},
        "createdutc": "2020/09/24",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/09/24 14:37:35",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JScqTyNRXFwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:30",
        "requestdate": "2020/09/24",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2D%5B%25%21%2D%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/10/06 00:15:07",
        "priority": 0,
        "createddatetimeutc": "2020/10/05 13:15:07",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/10/06 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad57",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/06",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1125",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/10/05",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/10/06",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/06 00:15:07",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqSyZSXDAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:44",
        "requestdate": "2020/10/06",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2CZ5Q%26%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/10/20 00:15:06",
        "priority": 0,
        "createddatetimeutc": "2020/10/19 13:15:06",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/10/20 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad58",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/10/20",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1126",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/10/19",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/10/20",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/10/20 00:15:06",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqRyRRTEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:44",
        "requestdate": "2020/10/20",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2FZU%25%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/11/03 00:15:11",
        "priority": 0,
        "createddatetimeutc": "2020/11/02 13:15:11",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/11/03 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad59",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/11/03",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1127",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/11/02",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/11/03",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/11/03 00:15:11",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqRyxQPEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:44",
        "requestdate": "2020/11/03",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2FXU9%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/11/17 00:15:12",
        "priority": 0,
        "createddatetimeutc": "2020/11/16 13:15:12",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/11/17 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad60",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/11/17",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1128",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/11/16",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/11/17",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/11/17 00:15:12",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqQyFSXEAgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:44",
        "requestdate": "2020/11/17",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2E%5BEQ%2A%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/12/01 00:15:22",
        "priority": 0,
        "createddatetimeutc": "2020/11/30 13:15:22",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/12/01 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad62",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/12/01",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1130",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/11/30",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/12/01",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/12/01 00:15:22",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqXyFRLFQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:59",
        "requestdate": "2020/12/01",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%29%5BE%2D%2F%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/12/15 00:15:16",
        "priority": 0,
        "createddatetimeutc": "2020/12/14 13:15:16",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/12/15 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad63",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/12/15",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1131",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/12/14",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2020/12/17 09:33:36",
        "description": "",
        "completeddate": "2020/12/15",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2020/12/15 00:15:16",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqWyJQXFggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:59",
        "requestdate": "2020/12/15",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%28%5B51%2C%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2020/12/29 00:15:14",
        "priority": 0,
        "createddatetimeutc": "2020/12/28 13:15:14",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2020/12/29 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad64",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2020/12/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1132",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2020/12/28",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2020/12/29",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2020/12/29 00:15:14",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqVydQLDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:59",
        "requestdate": "2020/12/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2BZ%25%3D%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/01/12 00:15:21",
        "priority": 0,
        "createddatetimeutc": "2021/01/11 13:15:21",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/01/12 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad65",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/01/12",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1133",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2021/01/11",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/01/12",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/01/12 00:15:21",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqUyRRLEwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:59",
        "requestdate": "2021/01/12",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2AZU%2D%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/01/26 00:15:16",
        "priority": 0,
        "createddatetimeutc": "2021/01/25 13:15:16",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/01/26 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad66",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/01/26",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1134",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2021/01/25",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/01/26",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/01/26 00:15:16",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqUy1RLDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:59",
        "requestdate": "2021/01/26",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%2AXE%2D%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/02/09 00:15:22",
        "priority": 0,
        "createddatetimeutc": "2021/02/08 13:15:22",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/02/09 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad67",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/09",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1135",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2021/02/08",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/02/09",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/02/09 00:15:22",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqLyxQXEQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:17:59",
        "requestdate": "2021/02/09",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%25XU1%2B%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/02/23 00:15:17",
        "priority": 0,
        "createddatetimeutc": "2021/02/22 13:15:17",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/02/23 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad68",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1136",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2021/02/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/02/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/02/23 00:15:17",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JScqKyNQLEwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:15",
        "requestdate": "2021/02/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CJ%24%5B%25%3D%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/02/27 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/02/25 21:50:06",
        "tasknotes": [],
        "gpslongitude": "145.2504982",
        "requestdatetime": "2021/02/26 08:50:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-38.0784886",
        "linkprocesseddate": " ",
        "refcode": "dan mu1",
        "tasklocation": {
          "locationid": "",
          "locationname": "941 Thompsons Road, Lyndhurst"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1137",
        "taskname": "941 Thompsons Road, Lyndhurst",
        "tasktotals": {},
        "createdutc": "2021/02/25",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/06/21 11:57:47",
        "description": "Check Fridges and Register One",
        "completeddate": "2021/02/27",
        "custon": "",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2021/02/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JScqRyRRTEwgCg==",
          "clientname": "Dan Murphy's Marriott Waters"
        },
        "taskid": "JSdaTyRRTEQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:15",
        "requestdate": "2021/02/26",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2DZU%25%2B%0A"
      },
      {
        "contact": {
          "surname": "Payable",
          "givennames": "Accounts",
          "userid": "JScqQyNSXFggCg=="
        },
        "completeddatetime": "2021/02/27 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/02/25 21:54:59",
        "tasknotes": [],
        "gpslongitude": "145.2222957",
        "requestdatetime": "2021/02/26 08:54:53",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8155855",
        "linkprocesseddate": " ",
        "refcode": "ringwo1",
        "tasklocation": {
          "locationid": "",
          "locationname": "59-65 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2021/02/27",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1138",
        "taskname": "59-65 Maroondah Highway, Ringwood",
        "tasktotals": {},
        "createdutc": "2021/02/25",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Inspect Fridge and Food Prep areas",
        "completeddate": "2021/02/27",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/02/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JScqRyRRTDAgCg==",
          "clientname": "Ringwood Square Shopping Centre"
        },
        "taskid": "JSdaTyRRTEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:15",
        "requestdate": "2021/02/26",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2DZU%25%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/03/03 09:40:00",
        "priority": 0,
        "createddatetimeutc": "2021/03/01 22:42:17",
        "tasknotes": [],
        "gpslongitude": "145.295406",
        "requestdatetime": "2021/03/02 09:42:17",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-38.069154",
        "linkprocesseddate": " ",
        "refcode": "TeCl_22",
        "tasklocation": {
          "locationid": "JScqWyVSXDAgCg==",
          "locationname": "83 Golden Grove Drive, Narre Warren South"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/03",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1139",
        "taskname": "Check bedroom AC",
        "tasktotals": {},
        "createdutc": "2021/03/01",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/03/03",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/03 09:40:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "taskid": "JSdaTyFRLEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:15",
        "requestdate": "2021/03/02",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2D%5BE%2D%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/03/03 09:50:00",
        "priority": 0,
        "createddatetimeutc": "2021/03/01 22:50:45",
        "tasknotes": [],
        "gpslongitude": "145.2499152",
        "requestdatetime": "2021/03/02 09:50:45",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-38.07753",
        "linkprocesseddate": " ",
        "refcode": "TeCl_23",
        "tasklocation": {
          "locationid": "JScqWyVSXDQgCg==",
          "locationname": "10-18S Society Avenue, Lyndhurst"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/03",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1140",
        "taskname": "10-18S Society Avenue Lyndhurst",
        "tasktotals": {},
        "createdutc": "2021/03/01",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Inspect Exhaust fan for main oven",
        "completeddate": "2021/03/03",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/03 09:50:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "taskid": "JSdaTyFRLEwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:15",
        "requestdate": "2021/03/02",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2D%5BE%2D%29%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/03/09 00:15:22",
        "priority": 0,
        "createddatetimeutc": "2021/03/08 13:15:22",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/03/09 00:00:00",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad69",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/09",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1141",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2021/03/08",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/03/09",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/09 00:15:22",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSdaTy1QTDQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:15",
        "requestdate": "2021/03/09",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2DXE5%27%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2021/03/17 12:40:57",
        "priority": 0,
        "createddatetimeutc": "2021/03/17 01:40:57",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2021/03/17 12:40:57",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad70",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2021/03/17",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1142",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2021/03/17",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2021/03/17",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/03/17 12:40:57",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JSdaSyBRXEQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:15",
        "requestdate": "2021/03/17",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2C%5BU%21%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/03/30 22:49:26",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/03/31 09:49:26",
        "lastupdatedutc": "2022/11/16",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva10",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1143",
        "taskname": "Test  1111",
        "tasktotals": {},
        "createdutc": "2021/03/30",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File with Notes",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/04/26 11:20:54",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "taskid",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdaRyJQXFggCg==",
        "lastupdateddatetimeutc": "2022/11/16 03:17:30",
        "requestdate": "2021/03/31",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%2F%5B51%2C%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/04/26 01:29:58",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/04/26 11:29:58",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva11",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1144",
        "taskname": "Test  for CF",
        "tasktotals": {},
        "createdutc": "2021/04/26",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdaXydQTEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:18:29",
        "requestdate": "2021/04/26",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CF%29Z%255%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/08/12 00:22:06",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/08/12 10:22:05",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva12",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1145",
        "taskname": "R&amp;T2021 - YEF03763P MM - 84 TEST ROAD, TEST",
        "tasktotals": {},
        "createdutc": "2021/08/12",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKRyVQPEQgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:19:14",
        "requestdate": "2021/08/12",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2FZE9%2B%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/10/31 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/08/12 00:23:40",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/08/12 10:23:40",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva13",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2021/10/31",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1146",
        "taskname": "R&amp;T2021 - YEF03763P MM - 84 TEST ROAD, TEST",
        "tasktotals": {},
        "createdutc": "2021/08/12",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "<br /><br /><p style='color:red;'>Previous Work Orders from this Address: 7586333, 7144944</p><br /><br />MeterSize: YEF03763P<br />MeterReadRoute: 16270001<br />MeterReadSequence: 16270001<br />MeterReadRouteDistrict: 27<br /><b>MeterReadWarning:  **</b><br />LastReadDateTime: 2021-07-30 16:19:08<br />LastReadType: Regular<br />LastRead: 69866.0<br />MeterManufacturer: ELSTER<br />YearOfManufacturer: 2014<br />CheckValve: NO<br />Model: KG2000 - Positive Displacement Meter<br />ModelType: <br />MeterDescription: CUSTOMER METER - YEF03763P<br />MeterGroupType: Subtractive<br /><br />JobReason: Planned Meter Replac<br />FieldActivityType: PMR",
        "completeddate": "2021/10/31",
        "custon": "7586333A",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/10/31 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKRyVQPEggCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:19:14",
        "requestdate": "2021/08/12",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2FZE9%28%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2021/10/31 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/08/12 00:30:18",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "requestdatetime": "2021/08/12 10:30:18",
        "lastupdatedutc": "2022/07/18",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "linkprocesseddate": " ",
        "refcode": "Aardva14",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2021/10/31",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1147",
        "taskname": "R&amp;T2021 - YEF03763P MM - 84 TEST ROAD, TEST",
        "tasktotals": {},
        "createdutc": "2021/08/12",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "<br /><br /><p style='color:red;'>Previous Work Orders from this Address: 7586333, 7144944</p><br /><br />MeterSize: YEF03763P<br />MeterReadRoute: 16270001<br />MeterReadSequence: 16270001<br />MeterReadRouteDistrict: 27<br /><b>MeterReadWarning:  **</b><br />LastReadDateTime: 2021-07-30 16:19:08<br />LastReadType: Regular<br />LastRead: 69866.0<br />MeterManufacturer: ELSTER<br />YearOfManufacturer: 2014<br />CheckValve: NO<br />Model: KG2000 - Positive Displacement Meter<br />ModelType: <br />MeterDescription: CUSTOMER METER - YEF03763P<br />MeterGroupType: Subtractive<br /><br />JobReason: Planned Meter Replac<br />FieldActivityType: PMR",
        "completeddate": "2021/10/31",
        "custon": "7586333A",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2021/10/31 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKRyVQPEwgCg==",
        "lastupdateddatetimeutc": "2022/07/18 04:19:14",
        "requestdate": "2021/08/12",
        "contactphone": "",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2FZE9%29%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": 0,
        "createddatetimeutc": "2021/08/25 02:08:52",
        "tasknotes": [],
        "gpslongitude": "145.2208069",
        "requestdatetime": "2021/08/25 12:08:52",
        "lastupdatedutc": "2022/11/16",
        "status": "Not Started",
        "gpslatitude": "-37.8177723",
        "linkprocesseddate": " ",
        "refcode": "Aardva15",
        "tasklocation": {
          "locationid": "",
          "locationname": "51 New Street, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2018/10/18",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1148",
        "taskname": "Test  for materials",
        "tasktotals": {},
        "createdutc": "2021/08/25",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2021/08/25 12:09:56",
        "description": "Test Description",
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSdKQyRQXFQgCg==",
        "lastupdateddatetimeutc": "2022/11/16 03:02:45",
        "requestdate": "2021/08/25",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CB%2EZU1%2F%0A"
      },
      {
        "contact": {
          "surname": "Bourne",
          "givennames": "Jason",
          "userid": "JCQqQyFRMCAgCg=="
        },
        "completeddatetime": "2025/04/02 00:00:00",
        "priority": "IyYqUyMK",
        "createddatetimeutc": "2022/04/13 04:24:38",
        "tasknotes": [],
        "gpslongitude": "145.261769",
        "requestdatetime": "2022/04/13 14:24:38",
        "lastupdatedutc": "2022/11/16",
        "status": "Not Started",
        "gpslatitude": "-38.0886383",
        "linkprocesseddate": " ",
        "refcode": "Aardva16",
        "tasklocation": {
          "locationid": "JScqRyZRTFAgCg==",
          "locationname": "25 Taplan Crescent, Cranbourne West"
        },
        "documentsandphotos": [],
        "duedate": "2025/04/02",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1155",
        "taskname": "Date CF Update/Create",
        "tasktotals": {},
        "createdutc": "2022/04/13",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSQCAgCg==",
          "tasktype": "Service"
        },
        "location": {},
        "quote": {},
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": "2022/04/13 14:24:46",
        "description": "Test Description",
        "completeddate": "2025/04/02",
        "custon": "taskid",
        "assigneds": [],
        "readtask": "true",
        "stage": {},
        "duedatetime": "2025/04/02 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskid": "JSQ6KyVRLFAgCg==",
        "lastupdateddatetimeutc": "2022/11/16 03:51:30",
        "requestdate": "2022/04/13",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "webappEncodedID": "82%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5C%3E%24ZE%2D%2E%0A"
      },
      {
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "completeddatetime": "2022/09/13 11:09:00",
        "priority": 0,
        "createddatetimeutc": "2022/09/12 01:09:37",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2022/09/12 11:09:37",
        "lastupdatedutc": "2022/09/12",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "TeCl_24",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2022/09/13",
        "labours": [],
        "assets": [],
        "assetid": "JCdaXyZQICAgCg==",
        "project": {},
        "salesperson": [],
        "jobnumber": "1156",
        "taskname": "Service the Busa",
        "tasktotals": {},
        "createdutc": "2022/09/12",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2022/09/13",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2022/09/13 11:09:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "taskid": "JiYqTyVQPDclCg==",
        "lastupdateddatetimeutc": "2022/09/12 01:09:44",
        "requestdate": "2022/09/12",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2DZE9%27Z0%20%20%0A"
      },
      {
        "contact": {
          "surname": "Doe",
          "givennames": "Jayne",
          "userid": "JCQqQyFRICAgCg=="
        },
        "completeddatetime": "2022/09/29 14:03:00",
        "priority": 0,
        "createddatetimeutc": "2022/09/28 04:03:35",
        "tasknotes": [],
        "gpslongitude": "145.2159955",
        "requestdatetime": "2022/09/28 14:03:35",
        "lastupdatedutc": "2022/09/28",
        "status": "Not Started",
        "gpslatitude": "-37.817927",
        "linkprocesseddate": " ",
        "refcode": "TeCl_25",
        "tasklocation": {
          "locationid": "",
          "locationname": "12 Maroondah Highway, Ringwood"
        },
        "documentsandphotos": [],
        "duedate": "2022/09/29",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1157",
        "taskname": "Suite 13, Level 2 12 Maroondah Highway Ringwood",
        "tasktotals": {},
        "createdutc": "2022/09/28",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyFSUCAgCg==",
          "tasktype": "Installation"
        },
        "location": {},
        "quote": {},
        "contactname": "Commander Shepard",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2022/09/29",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2022/09/29 14:03:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCQ6WyBRICAgCg==",
          "clientname": "A Test Client"
        },
        "taskid": "JiYqTyZRLFMkCg==",
        "lastupdateddatetimeutc": "2022/09/28 04:04:14",
        "requestdate": "2022/09/28",
        "contactphone": "",
        "tasktype": "Installation",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2DZ5%2D%2EZ%20%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/01/23 00:15:20",
        "priority": 0,
        "createddatetimeutc": "2023/01/22 13:15:20",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/01/23 00:00:00",
        "lastupdatedutc": "2023/01/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad71",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/01/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1158",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/01/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/01/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/01/23 00:15:20",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqSyVRPEclCg==",
        "lastupdateddatetimeutc": "2023/01/22 13:17:30",
        "requestdate": "2023/01/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2CZE%29%2BZ0%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/02/23 00:15:20",
        "priority": 0,
        "createddatetimeutc": "2023/02/22 13:15:20",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/02/23 00:00:00",
        "lastupdatedutc": "2023/02/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad72",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/02/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1159",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/02/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/02/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/02/23 00:15:19",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqSyBRTFMtCg==",
        "lastupdateddatetimeutc": "2023/02/22 13:18:15",
        "requestdate": "2023/02/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2C%5BU%25%2EX0%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/03/23 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2023/03/22 13:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/03/23 00:00:00",
        "lastupdatedutc": "2023/03/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad73",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/03/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1160",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/03/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/03/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/03/23 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqSyJSTFMtCg==",
        "lastupdateddatetimeutc": "2023/03/22 13:16:00",
        "requestdate": "2023/03/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2C%5B5U%2EX0%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/04/24 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2023/04/23 14:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/04/24 00:00:00",
        "lastupdatedutc": "2023/04/23",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad74",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/04/24",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1161",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/04/23",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/04/24",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/04/24 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqSy1RTE8sCg==",
        "lastupdateddatetimeutc": "2023/04/23 14:16:00",
        "requestdate": "2023/04/24",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2CXE%25%29X%20%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/05/23 00:15:02",
        "priority": 0,
        "createddatetimeutc": "2023/05/22 14:15:02",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/05/23 00:00:00",
        "lastupdatedutc": "2023/05/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad75",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/05/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1162",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/05/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/05/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/05/23 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqRyVSTEcgCg==",
        "lastupdateddatetimeutc": "2023/05/22 14:16:15",
        "requestdate": "2023/05/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2FZEU%2B%5B%20%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/06/23 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2023/06/22 14:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/06/23 00:00:00",
        "lastupdatedutc": "2023/06/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad76",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/06/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1163",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/06/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/06/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/06/23 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqRyBRPEckCg==",
        "lastupdateddatetimeutc": "2023/06/22 14:16:15",
        "requestdate": "2023/06/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2F%5BU%29%2BZ%20%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/07/24 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2023/07/23 14:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/07/24 00:00:00",
        "lastupdatedutc": "2023/07/23",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad77",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/07/24",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1164",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/07/23",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/07/24",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/07/24 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqRyNQLFcsCg==",
        "lastupdateddatetimeutc": "2023/07/23 14:15:15",
        "requestdate": "2023/07/24",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2F%5B%25%3D%2FX%20%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/08/23 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2023/08/22 14:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/08/23 00:00:00",
        "lastupdatedutc": "2023/08/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad79",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/08/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1165",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/08/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/08/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/08/23 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqRy1QPE8hCg==",
        "lastupdateddatetimeutc": "2023/08/22 14:15:15",
        "requestdate": "2023/08/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2FXE9%29%5B0%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/09/22 00:15:02",
        "priority": 0,
        "createddatetimeutc": "2023/09/21 14:15:02",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/09/22 00:00:00",
        "lastupdatedutc": "2023/09/21",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad80",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/09/22",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1166",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/09/21",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/09/22",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/09/22 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqQyVRTDcjCg==",
        "lastupdateddatetimeutc": "2023/09/21 14:15:15",
        "requestdate": "2023/09/22",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2EZE%25%27%5BP%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/10/23 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2023/10/22 13:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/10/23 00:00:00",
        "lastupdatedutc": "2023/10/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad81",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/10/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1167",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/10/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/10/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/10/23 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqQydQPFslCg==",
        "lastupdateddatetimeutc": "2023/10/22 13:15:15",
        "requestdate": "2023/10/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2EZ%259%2CZ0%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/11/23 00:15:00",
        "priority": 0,
        "createddatetimeutc": "2023/11/22 13:15:00",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/11/23 00:00:00",
        "lastupdatedutc": "2023/11/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad82",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/11/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1168",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/11/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/11/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/11/23 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqQyFQLDcsCg==",
        "lastupdateddatetimeutc": "2023/11/22 13:15:15",
        "requestdate": "2023/11/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2E%5BE%3D%27X%20%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2023/12/22 00:15:04",
        "priority": 0,
        "createddatetimeutc": "2023/12/21 13:15:04",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2023/12/22 00:00:00",
        "lastupdatedutc": "2023/12/21",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad83",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2023/12/22",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1169",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2023/12/21",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2023/12/22",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2023/12/22 00:15:04",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqQyNQTFsiCg==",
        "lastupdateddatetimeutc": "2023/12/21 13:15:30",
        "requestdate": "2023/12/22",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2E%5B%255%2C%5B%40%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2024/01/23 00:15:01",
        "priority": 0,
        "createddatetimeutc": "2024/01/22 13:15:01",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2024/01/23 00:00:00",
        "lastupdatedutc": "2024/01/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad84",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2024/01/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1170",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2024/01/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2024/01/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2024/01/23 00:15:01",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqQyxRPEcsCg==",
        "lastupdateddatetimeutc": "2024/01/22 13:15:30",
        "requestdate": "2024/01/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%2EXU%29%2BX%20%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2024/02/23 00:15:02",
        "priority": 0,
        "createddatetimeutc": "2024/02/22 13:15:02",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2024/02/23 00:00:00",
        "lastupdatedutc": "2024/02/22",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad85",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2024/02/23",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1171",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2024/02/22",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2024/02/23",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2024/02/23 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqXyRRLEMiCg==",
        "lastupdateddatetimeutc": "2024/02/22 13:15:30",
        "requestdate": "2024/02/23",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%29ZU%2D%2A%5B%40%20%20%0A"
      },
      {
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "completeddatetime": "2024/03/22 00:15:02",
        "priority": 0,
        "createddatetimeutc": "2024/03/21 13:15:02",
        "tasknotes": [],
        "gpslongitude": "151.20733",
        "requestdatetime": "2024/03/22 00:00:00",
        "lastupdatedutc": "2024/03/21",
        "status": "Not Started",
        "gpslatitude": "-33.8708464",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad86",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "duedate": "2024/03/22",
        "labours": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "salesperson": [],
        "jobnumber": "1172",
        "taskname": "HMAS Sydney",
        "tasktotals": {},
        "createdutc": "2024/03/21",
        "substatus": {
          "substatusid": "",
          "substatus": ""
        },
        "materials": [],
        "purchaseorders": [],
        "tasktasktype": {
          "tasktypeid": "JCYqVyJQQCAgCg==",
          "tasktype": "Maintenance"
        },
        "location": {},
        "quote": {},
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox BU"
        },
        "expenses": [],
        "readtaskdatetime": " ",
        "description": "",
        "completeddate": "2024/03/22",
        "custon": "",
        "assigneds": [],
        "readtask": "false",
        "stage": {},
        "duedatetime": "2024/03/22 00:15:02",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskid": "JiYqXyZQPDcnCg==",
        "lastupdateddatetimeutc": "2024/03/21 13:15:30",
        "requestdate": "2024/03/22",
        "contactphone": "",
        "tasktype": "Maintenance",
        "webappEncodedID": "92%26%3EBW%2EIVB1%2A%297%28QCO%2BZ%3B9EY%3D%3C%5CZ%29Z59%27ZP%20%20%0A"
      }
    ],
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 123,
    "queryresponsetimes": {
      "tasks": 72
    },
    "currentpageresults": 85
  }
}
```


---

### GET Get Tasks due for a date range

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
        'zone=' + encodeURIComponent('tasks')
        ,'where=' + encodeURIComponent('and|duedate|>|2021-11-01')
        ,'where=' + encodeURIComponent('and|duedate|<|2022-11-01')
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

#### Get Tasks (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "tasks": [
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/27 09:02:28",
        "status": "Pending",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": "2018/10/31 09:28:30",
        "description": "Task Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva2",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/01",
        "custon": "W0151304/3",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1037",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 4",
        "taskid": "JSZaSyRQLEwgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:32:24",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/27 09:02:28",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Task Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva3",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/06/27",
        "jobnumber": "1038",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 3",
        "taskid": "JSZaSyRQLDAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/06/27 09:02:28",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Contact1",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/01 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/06/27 09:02:28",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Task Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva4",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/01",
        "custon": "W0138988/1",
        "duedate": "2018/07/01",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/06/27",
        "jobnumber": "1039",
        "duedatetime": "2018/07/01 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "AroFlo Test 2",
        "taskid": "JSZaSyRQLDQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/06/27 09:02:28",
        "requestdate": "2018/06/27",
        "contactphone": "123456789",
        "tasktype": "",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/11 11:16:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/10 11:16:53",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/10 11:18:23",
        "description": "Working on Diesel #1",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad1",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/11",
        "custon": "",
        "duedate": "2018/07/11",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/10",
        "jobnumber": "1040",
        "duedatetime": "2018/07/11 11:16:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaSydQPEggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/07/10 11:17:49",
        "requestdate": "2018/07/10",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/11 11:13:48",
        "priority": "179",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/11 10:59:45",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/11 11:13:18",
        "description": "jhgjhg",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad3",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/11",
        "custon": "",
        "duedate": "2018/07/14",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/12/10",
        "jobnumber": "1043",
        "duedatetime": "2018/07/14 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaSydRLFAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/10 15:05:54",
        "requestdate": "2018/07/11",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/27 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/26 13:49:42",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/26 13:49:42",
        "description": "Fix something",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad4",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/27",
        "custon": "",
        "duedate": "2018/07/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/26",
        "jobnumber": "1044",
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRyZSXFQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/07/26 00:00:00",
        "requestdate": "2018/07/26",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/07/27 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/26 13:52:02",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/26 13:52:02",
        "description": "Fox someththing",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad5",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/07/27",
        "custon": "",
        "duedate": "2018/07/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/07/26",
        "jobnumber": "1045",
        "duedatetime": "2018/07/27 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRyZSXFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/07/26 00:00:00",
        "requestdate": "2018/07/26",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Field",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/05 10:40:44",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/07/27 08:39:40",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/07/27 08:39:41",
        "description": "Fix aomething",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad6",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/09/05",
        "custon": "",
        "duedate": "2018/07/28",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1QICAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/09/05",
        "jobnumber": "1046",
        "duedatetime": "2018/07/28 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaRydQLDAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/09/05 10:40:44",
        "requestdate": "2018/07/27",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/20 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/09/19 15:37:24",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/09/19 15:37:24",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad7",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/09/20",
        "custon": "",
        "duedate": "2018/09/20",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/15",
        "jobnumber": "1047",
        "duedatetime": "2018/09/20 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney",
        "taskid": "JSZaQyBQPDQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/15 08:02:32",
        "requestdate": "2018/09/19",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/09/27 10:17:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/09/26 10:17:32",
        "status": "Quote",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "Bradl1",
        "tasklocation": {
          "locationid": "",
          "locationname": ""
        },
        "documentsandphotos": [],
        "completeddate": "2018/09/27",
        "custon": "",
        "duedate": "2018/09/27",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/09/26",
        "jobnumber": "1048",
        "duedatetime": "2018/09/27 10:17:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUyZRMCAgCg==",
          "clientname": "Bradley Sandbox"
        },
        "taskname": "test",
        "taskid": "JSZaQyFSTDAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/09/26 10:17:32",
        "requestdate": "2018/09/26",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Angie Mayhew",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/10 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.220657",
        "expenses": [],
        "requestdatetime": "2018/10/12 10:09:08",
        "status": "Not Started",
        "gpslatitude": "-37.818021",
        "readtaskdatetime": "2018/10/12 12:19:41",
        "description": "This is the description of the task and describes what is required.",
        "linkprocesseddate": " ",
        "refcode": "Aardva5",
        "tasklocation": {
          "locationid": "JSc6Qy1RXDAgCg==",
          "locationname": "53 New St, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/10",
        "custon": "abc123",
        "duedate": "2018/10/10",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/11/08",
        "jobnumber": "1049",
        "duedatetime": "2018/10/10 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "A task from the API",
        "taskid": "JSZaXyVQPFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/11/08 14:42:49",
        "requestdate": "2018/10/12",
        "contactphone": "03 9259 5200",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/11 10:24:13",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/10/29 08:00:00",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/11/08 14:45:42",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad8",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/11",
        "custon": "",
        "duedate": "2018/10/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/12/11",
        "jobnumber": "1050",
        "duedatetime": "2018/10/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaXyBRTEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/11 10:24:13",
        "requestdate": "2018/10/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "Makehba",
          "givennames": "Mriam",
          "userid": "JCQ6XyVRMCAgCg=="
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/11/29 00:15:01",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/11/29 08:00:00",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/12/04 13:48:12",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad9",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/11/29",
        "custon": "",
        "duedate": "2018/11/29",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/12/06",
        "jobnumber": "1051",
        "duedatetime": "2018/11/29 00:15:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney",
        "taskid": "JSZaWyZRLFggCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/06 14:20:04",
        "requestdate": "2018/11/29",
        "contactphone": "",
        "tasktype": "Maintenance",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/07 14:14:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.229028",
        "expenses": [],
        "requestdatetime": "2018/12/06 14:14:51",
        "status": "Not Started",
        "gpslatitude": "-37.8127302",
        "readtaskdatetime": " ",
        "description": "asdasd",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad10",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "22222, Ringwood"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/07",
        "custon": "",
        "duedate": "2018/12/07",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqTy1RQCAgCg==",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/06",
        "jobnumber": "1053",
        "duedatetime": "2018/12/07 14:14:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "11111 22222 Ringwood",
        "taskid": "JSZaWyBRLFwgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/06 14:16:02",
        "requestdate": "2018/12/06",
        "contactphone": "",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "B.Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/07 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/12/06 14:17:54",
        "status": "Not Started",
        "gpslatitude": "0",
        "readtaskdatetime": "2018/12/06 14:17:54",
        "description": "",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad11",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/07",
        "custon": "",
        "duedate": "2018/12/07",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "JCYqSyRQUCAgCg==",
        "project": {},
        "readtask": "true",
        "stage": {},
        "lastupdated": "2018/12/06",
        "jobnumber": "1054",
        "duedatetime": "2018/12/07 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "ttt HMAS Sydney Port of Sydney",
        "taskid": "JSZaWyBRLEAgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/06 14:17:54",
        "requestdate": "2018/12/06",
        "contactphone": "04XX XXX XXX",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Bradley Sandbox",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/12/11 10:25:26",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "0",
        "expenses": [],
        "requestdatetime": "2018/12/11 10:25:00",
        "status": "Completed",
        "gpslatitude": "0",
        "readtaskdatetime": " ",
        "description": "collated cogs test",
        "linkprocesseddate": " ",
        "refcode": "#1 Lad12",
        "tasklocation": {
          "locationid": "JSc6QyVRXFwgCg==",
          "locationname": "HMAS Sydney Pier 2, Harbour 4, Port of Sydney"
        },
        "documentsandphotos": [],
        "completeddate": "2018/12/11",
        "custon": "",
        "duedate": "2018/12/12",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/11",
        "jobnumber": "1055",
        "duedatetime": "2018/12/12 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydRMCAgCg==",
          "clientname": "#1 Ladies, Detective Agency"
        },
        "taskname": "HMAS Sydney Port of Sydney 2",
        "taskid": "JSZaWyFRLEQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/11 10:25:26",
        "requestdate": "2018/12/11",
        "contactphone": "",
        "tasktype": "Installation",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      },
      {
        "location": {},
        "contact": {
          "surname": "",
          "givennames": "",
          "userid": ""
        },
        "contactname": "Mr Test File",
        "org": {
          "orgid": "JCdKUyZRMCAgCg==",
          "orgname": "Bradley Sandbox"
        },
        "completeddatetime": "2018/10/18 00:00:00",
        "priority": "0",
        "tasknotes": [],
        "gpslongitude": "145.1925526",
        "expenses": [],
        "requestdatetime": "2018/12/12 13:45:46",
        "status": "Not Started",
        "gpslatitude": "-37.8168413",
        "readtaskdatetime": " ",
        "description": "Test Description",
        "linkprocesseddate": " ",
        "refcode": "Aardva6",
        "tasklocation": {
          "locationid": "",
          "locationname": "PO BOX 3124, Mitcham"
        },
        "documentsandphotos": [],
        "completeddate": "2018/10/18",
        "custon": "Test123",
        "duedate": "2018/10/18",
        "labours": [],
        "assigneds": [],
        "assets": [],
        "assetid": "",
        "project": {},
        "readtask": "false",
        "stage": {},
        "lastupdated": "2018/12/12",
        "jobnumber": "1056",
        "duedatetime": "2018/10/18 00:00:00",
        "linkprocessed": "false",
        "customfields": [],
        "client": {
          "clientid": "JCdKUydSQCAgCg==",
          "clientname": "Aardvaark ConsultantsCLR2"
        },
        "taskname": "Test  1111",
        "taskid": "JSZaWyFSXEQgCg==",
        "tasktotals": {},
        "lastupdateddatetime": "2018/12/12 13:45:46",
        "requestdate": "2018/12/12",
        "contactphone": "0400123456",
        "tasktype": "Service",
        "substatus": {},
        "materials": [],
        "purchaseorders": []
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "tasks": 61
    },
    "currentpageresults": 17
  }
}
```


---

### POST Create Task

`POST http://api.aroflo.com/`

Create a new task. Multiple tasks can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('Tasks')
        ,'postxml=' + encodeURIComponent('JSZKLyxRTFQgCg==JSc6XyZRTFAgCg==IyZKVyMK<![CDATA[ Test ]]>2018/10/18<![CDATA[ Test Description ]]><![CDATA[ Mr Test File ]]><![CDATA[ 0400123456 ]]><![CDATA[ Test123 ]]>')
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
        'zone=' + encodeURIComponent('tasks')
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
        'zone=' + encodeURIComponent('Tasks')
        ,'postxml=' + encodeURIComponent('<tasks><task><org><orgid>JCdKUyZRMCAgCg==</orgid></org><client><clientid>JCdKUydSQCAgCg==</clientid></client><tasktype><tasktypeid>JCYqVyFSQCAgCg==</tasktypeid></tasktype><taskname><![CDATA[ Test  1111]]></taskname><duedate>2018/10/18</duedate><description><![CDATA[ Test Description ]]></description><contactname><![CDATA[ Mr Test File ]]></contactname><contactphone><![CDATA[ 0400123456 ]]></contactphone><custon><![CDATA[ Test123 ]]></custon></task></tasks>')
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

#### Create Task (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 0,
      "errors": [],
      "updates": {
        "tasks": []
      },
      "inserttotal": 1,
      "inserts": {
        "tasks": [
          {
            "taskid": "JSZaWyFSXEQgCg==",
            "contactname": "Mr Test File",
            "org": {
              "orgid": "JCdKUyZRMCAgCg=="
            },
            "description": "Test Description",
            "contactphone": "0400123456",
            "custon": "Test123",
            "tasktype": {
              "tasktypeid": "JCYqVyFSQCAgCg=="
            },
            "duedate": "2018/10/18",
            "client": {
              "clientid": "JCdKUydSQCAgCg=="
            },
            "taskname": "Test  1111"
          }
        ]
      }
    }
  }
}
```


---

### POST Update Task

`POST http://api.aroflo.com/`

By providing a `taskid` we can update an existing task. Multiple tasks can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('Tasks')
         ,'postxml=' + encodeURIComponent('JSZaSyRQLEwgCg==<![CDATA[ Fix the sink ]]><![CDATA[ Pending ]]>')
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
        'zone=' + encodeURIComponent('tasks')
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
        'zone=' + encodeURIComponent('Tasks')
        ,'postxml=' + encodeURIComponent('<tasks><task><taskid>JSZaSyRQLEwgCg==</taskid><taskname><![CDATA[ Fix the sink ]]></taskname><status><![CDATA[ Pending ]]></status></task></tasks>')
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

#### Update Task (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "tasks": [
          {
            "taskid": "JSZaSyRQLEwgCg==",
            "status": "Pending",
            "taskname": "Fix the sink"
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "tasks": []
      }
    }
  }
}
```


---

### POST Mark Task as linkprocessed

`POST http://api.aroflo.com/`

Set the linkprocessed field on tasks we have processed through our external system. Multiple tasks can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('Tasks')
        ,'postxml=' + encodeURIComponent('JSZaSyRQLEwgCg==trueJSZaSyRQLDAgCg==true')
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
        'zone=' + encodeURIComponent('tasks')
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
        'zone=' + encodeURIComponent('Tasks')
        ,'postxml=' + encodeURIComponent('<tasks><task><taskid>JSZaSyRQLEwgCg==</taskid><linkprocessed>true</linkprocessed></task><task><taskid>JSZaSyRQLDAgCg==</taskid><linkprocessed>true</linkprocessed></task></tasks>')
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

#### Mark Task as linkprocessed (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 2,
      "errors": [],
      "updates": {
        "tasks": [
          {
            "taskid": "JSZaSyRQLEwgCg==",
            "linkprocessed": "true"
          },
          {
            "taskid": "JSZaSyRQLDAgCg==",
            "linkprocessed": "true"
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "tasks": []
      }
    }
  }
}
```

