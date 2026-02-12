# Timesheets

This zone is READ ONLY.

This zone allows listing [timesheet](https://help.aroflo.com/x/I4-cAw) data from your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| timesheetid | AroFlo ID |
| taskid | AroFlo ID |
| userid | AroFlo ID |
| type | STRING(Productive, Non-Productive, Expense) |
| workdate | DATE(YYYY-MM-DD) |

**Default WHERE clause**

AND workdate > DATEADD(d, -30, GETUTCDATE())

## ORDER BY

| Field |
| --- |
| workdate |

**Authorization:** bearer


---

### GET Get Timesheets

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the first page of `timesheets` for your AroFlo site.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('timesheets')
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
        'zone=' + encodeURIComponent('timesheets')
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
        'zone=' + encodeURIComponent('Substatuses')
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

#### Get Timesheets (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "generatedisplayresponsetime": 275,
    "queryresponsetimes": {
      "timesheets": 132
    },
    "currentpageresults": 44,
    "timesheets": [
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2018/06/20 00:49:07",
        "cost": "0.0000",
        "hours": "8.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqRyRRPFggCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2018/06/20",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2018/10/22 22:11:05",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "this is a task labour",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2018/10/23 09:00:00",
        "timesheetid": "JSYqQyVRXFQgCg==",
        "startdatetime": "2018/10/23 07:00:00",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2018/10/23",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaQyBQPDQgCg==",
          "jobnumber": "1047",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:33",
        "cost": "0.0000",
        "hours": "4.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "332.0000",
        "workdate": "2019/01/18",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:19",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/01/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFggCg==",
          "jobnumber": "1045",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:05",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/01/22",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLFwgCg==",
          "jobnumber": "1053",
          "taskname": "11111 22222 Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/03/05 22:39:39",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "0.0000",
        "note": "DId something",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqXydRLDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/03/06",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/03/05 22:42:48",
        "cost": "0.0000",
        "hours": "1.00",
        "hourlyrate": "0.0000",
        "note": "this is a testr",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2019/03/06 09:42:00",
        "timesheetid": "JSYqXydRLDQgCg==",
        "startdatetime": "2019/03/06 08:42:00",
        "type": "Productive",
        "charge": "83.0000",
        "workdate": "2019/03/06",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKTyxSXFwgCg==",
          "jobnumber": "1067",
          "taskname": "Test for LaTrobe"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/06/21 00:38:27",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWyJRLEggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/06/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKTyxSXFwgCg==",
          "jobnumber": "1067",
          "taskname": "Test for LaTrobe"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/06/21 00:38:35",
        "cost": "0.0000",
        "hours": "4.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWyJRLEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "332.0000",
        "workdate": "2019/06/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyRRLFAgCg==",
          "jobnumber": "1068",
          "taskname": "Test for Tracking Center Report"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/07/15 01:51:51",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWy1QXEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/07/15",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLEAgCg==",
          "jobnumber": "1054",
          "taskname": "ttt HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/05 01:49:24",
        "cost": "139.8000",
        "hours": "2.33",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyJRXFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "193.3900",
        "workdate": "2019/09/05",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLEAgCg==",
          "jobnumber": "1054",
          "taskname": "ttt HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "Block",
          "worktypedescription": "",
          "worktypeid": "IyQ6Ly0K"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "23.7500",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/05 01:52:50",
        "cost": "139.8000",
        "hours": "2.33",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyJRXEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "237.5000",
        "workdate": "2019/09/05",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 06:00:47",
        "cost": "300.0000",
        "hours": "5.00",
        "hourlyrate": "60.0000",
        "note": "hj,,b,jhbhmhg",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "415.0000",
        "workdate": "2019/09/23",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 05:46:50",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "sadfascsad",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/09/24 05:46:59",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "0.0000",
        "note": "svbxdbd",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 06:18:56",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "ds fgesdfvsdsdf",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQLFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/09/24 06:19:07",
        "cost": "0.0000",
        "hours": "1.00",
        "hourlyrate": "0.0000",
        "note": "dsf vdszfx df dx  dxfdx  xd",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQLEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "83.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKQyJQXFAgCg==",
          "jobnumber": "1085",
          "taskname": "Unit 1 New Town"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Filoni",
          "givennames": "Dave",
          "userid": "JCQ6UyxRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Filoni",
          "givennames": "Dave",
          "userid": "JCQ6UyxRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/09/24 21:14:40",
        "cost": "0.0000",
        "hours": "0.07",
        "hourlyrate": "0.0000",
        "note": "did some stuff and drank coffee",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2019/09/25 07:14:00",
        "timesheetid": "JSYqVyxQLEQgCg==",
        "startdatetime": "2019/09/25 07:10:00",
        "type": "Productive",
        "charge": "5.8100",
        "workdate": "2019/09/25",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaVyNQPEggCg==",
          "jobnumber": "1060",
          "taskname": "Suite 13, Level 2 12 Maroondah Highway Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/10/17 02:10:23",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "somethign",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqUyRRXDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/10/17",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqXyJRQCAgCg==",
          "overheadunit": "",
          "overhead": "Travel Time",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/01/30 05:01:38",
        "cost": "180.0000",
        "hours": "3.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqLyRQTFAgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "249.0000",
        "workdate": "2020/01/30",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqXyJRQCAgCg==",
          "overheadunit": "",
          "overhead": "Travel Time",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2020/01/30 05:01:38",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqLyRQTFQgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "249.0000",
        "workdate": "2020/01/30",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqXyJRQCAgCg==",
          "overheadunit": "",
          "overhead": "Travel Time",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/06/11 23:59:50",
        "cost": "60.0000",
        "hours": "1.00",
        "hourlyrate": "60.0000",
        "note": "travelly travel",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqKyFRLEQgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "83.0000",
        "workdate": "2020/06/12",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Time + Half",
          "worktype": "TH",
          "worktypedescription": "Time & Half",
          "worktypeid": "IycqQyYK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "95.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "90.0000",
        "inserteddatetimeutc": "2020/09/13 20:56:35",
        "cost": "180.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyRQLDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "190.0000",
        "workdate": "2020/09/08",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/13 20:56:35",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyRQPFAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "664.0000",
        "workdate": "2020/09/08",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "72.0000",
        "hours": "1.20",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "99.6000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyEK",
          "overheadunit": "",
          "overhead": "Trade School",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEQgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "166.0000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "210.0000",
        "hours": "3.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "290.5000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/02/18 03:23:02",
        "cost": "510.0000",
        "hours": "8.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaXy1QXDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "705.5000",
        "workdate": "2021/02/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqTyVRQCAgCg==",
          "overheadunit": "",
          "overhead": "Lunch",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/02/18 03:23:02",
        "cost": "30.0000",
        "hours": "0.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaXy1QLFAgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "41.5000",
        "workdate": "2021/02/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSdaTyFRLEwgCg==",
          "jobnumber": "1140",
          "taskname": "10-18S Society Avenue Lyndhurst"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:37:24",
        "cost": "0.0000",
        "hours": "0.08",
        "hourlyrate": "0.0000",
        "note": "Inspected and found no fault",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 12:15:00",
        "timesheetid": "JSZaWyZRXEwgCg==",
        "startdatetime": "2021/02/28 12:10:00",
        "type": "Productive",
        "charge": "6.9167",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyEK",
          "overheadunit": "",
          "overhead": "Trade School",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:38:33",
        "cost": "0.0000",
        "hours": "4.38",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 16:43:00",
        "timesheetid": "JSZaWyZRXDAgCg==",
        "startdatetime": "2021/02/28 12:20:00",
        "type": "Non-Productive",
        "charge": "363.8167",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSdaTyFRLEggCg==",
          "jobnumber": "1139",
          "taskname": "Check bedroom AC"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:38:59",
        "cost": "0.0000",
        "hours": "0.25",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 17:42:00",
        "timesheetid": "JSZaWyZRXDQgCg==",
        "startdatetime": "2021/02/28 17:27:00",
        "type": "Productive",
        "charge": "20.7500",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSdaTyFRLEggCg==",
          "jobnumber": "1139",
          "taskname": "Check bedroom AC"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:39:21",
        "cost": "0.0000",
        "hours": "0.37",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 17:16:00",
        "timesheetid": "JSZaWyZRLFAgCg==",
        "startdatetime": "2021/02/28 16:54:00",
        "type": "Productive",
        "charge": "30.4333",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "JCYqXyJRQCAgCg==",
          "overheadunit": "",
          "overhead": "Travel Time",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:40:11",
        "cost": "0.0000",
        "hours": "0.10",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 12:10:00",
        "timesheetid": "JSZaWyZRLFQgCg==",
        "startdatetime": "2021/02/28 12:04:00",
        "type": "Non-Productive",
        "charge": "8.3000",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "JCYqXyJRQCAgCg==",
          "overheadunit": "",
          "overhead": "Travel Time",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:40:20",
        "cost": "0.0000",
        "hours": "0.08",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 12:20:00",
        "timesheetid": "JSZaWyZRLFggCg==",
        "startdatetime": "2021/02/28 12:15:00",
        "type": "Non-Productive",
        "charge": "6.9167",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/25 16:30:00",
        "timesheetid": "JSZaUyRRTFQgCg==",
        "startdatetime": "2021/05/25 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/25",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "4.50",
        "hourlyrate": "0.0000",
        "note": "blurrgh",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydSUCAgCg=="
        },
        "finishdatetime": "2021/05/25 13:00:00",
        "timesheetid": "JSZaUyRRTEggCg==",
        "startdatetime": "2021/05/25 08:30:00",
        "type": "Non-Productive",
        "charge": "373.5000",
        "workdate": "2021/05/25",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqTyVRQCAgCg==",
          "overheadunit": "",
          "overhead": "Lunch",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "30.0000",
        "hours": "0.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydSQCAgCg=="
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaUyRRTFggCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "41.5000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqTyVRQCAgCg==",
          "overheadunit": "",
          "overhead": "Lunch",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "0.50",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTyBQQCAgCg=="
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaUyRRTEwgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "41.5000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "4.50",
        "hourlyrate": "0.0000",
        "note": "blurrgh",
        "grouping": {
          "groupid": "ISZQICAK",
          "tsgroupid": "JCYqTydSUCAgCg=="
        },
        "finishdatetime": "2021/05/26 13:00:00",
        "timesheetid": "JSZaUyRRTDAgCg==",
        "startdatetime": "2021/05/26 08:30:00",
        "type": "Non-Productive",
        "charge": "373.5000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:14:43",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/26 16:30:00",
        "timesheetid": "JSZaUyRRXFAgCg==",
        "startdatetime": "2021/05/26 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/27 16:30:00",
        "timesheetid": "JSZaUyRRTEAgCg==",
        "startdatetime": "2021/05/27 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/27",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "4.50",
        "hourlyrate": "0.0000",
        "note": "blurrgh",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydSUCAgCg=="
        },
        "finishdatetime": "2021/05/27 13:00:00",
        "timesheetid": "JSZaUyRRTDQgCg==",
        "startdatetime": "2021/05/27 08:30:00",
        "type": "Non-Productive",
        "charge": "373.5000",
        "workdate": "2021/05/27",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/28 16:30:00",
        "timesheetid": "JSZaUyRRTEQgCg==",
        "startdatetime": "2021/05/28 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/28",
        "resourceoverheadrate": "0.0000"
      }
    ]
  }
}
```


---

### GET Get Timesheets for timesheetid

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the `timesheet` details for a specific  `timesheetid`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|timesheetid|=|JSYqRyRRPFggCg==')
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
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|timesheetid|=|JSYqRyRRPFggCg==')
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
        'zone=' + encodeURIComponent('Substatuses')
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

#### Get Timesheets for timesheetid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "generatedisplayresponsetime": 6,
    "queryresponsetimes": {
      "timesheets": 134
    },
    "currentpageresults": 1,
    "timesheets": [
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2018/06/20 00:49:07",
        "cost": "0.0000",
        "hours": "8.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqRyRRPFggCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2018/06/20",
        "resourceoverheadrate": "0.0000"
      }
    ]
  }
}
```


---

### GET Get Timesheets for taskid

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the `timesheet` details for a specific  `taskid`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|taskid|=|JSZaXyVQPFggCg==')
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
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|taskid|=|JSZaXyVQPFggCg==')
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
        'zone=' + encodeURIComponent('Substatuses')
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

#### Get Timesheets for taskid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "generatedisplayresponsetime": 19,
    "queryresponsetimes": {
      "timesheets": 64
    },
    "currentpageresults": 3,
    "timesheets": [
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2018/10/22 22:11:05",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "this is a task labour",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2018/10/23 09:00:00",
        "timesheetid": "JSYqQyVRXFQgCg==",
        "startdatetime": "2018/10/23 07:00:00",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2018/10/23",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/03/05 22:42:48",
        "cost": "0.0000",
        "hours": "1.00",
        "hourlyrate": "0.0000",
        "note": "this is a testr",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2019/03/06 09:42:00",
        "timesheetid": "JSYqXydRLDQgCg==",
        "startdatetime": "2019/03/06 08:42:00",
        "type": "Productive",
        "charge": "83.0000",
        "workdate": "2019/03/06",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "210.0000",
        "hours": "3.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "290.5000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      }
    ]
  }
}
```


---

### GET Get Timesheets for workdate

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the `timesheet` details for a specific  `workdate`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|workdate|>|2021/05/19 14:00:00')
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
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|workdate|>|2021/05/19')
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
        'zone=' + encodeURIComponent('Substatuses')
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

#### Get Timesheets for workdate (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "generatedisplayresponsetime": 56,
    "queryresponsetimes": {
      "timesheets": 162
    },
    "currentpageresults": 9,
    "timesheets": [
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/25 16:30:00",
        "timesheetid": "JSZaUyRRTFQgCg==",
        "startdatetime": "2021/05/25 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/25",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqTyVRQCAgCg==",
          "overheadunit": "",
          "overhead": "Lunch",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "30.0000",
        "hours": "0.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydSQCAgCg=="
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaUyRRTFggCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "41.5000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/27 16:30:00",
        "timesheetid": "JSZaUyRRTEAgCg==",
        "startdatetime": "2021/05/27 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/27",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/28 16:30:00",
        "timesheetid": "JSZaUyRRTEQgCg==",
        "startdatetime": "2021/05/28 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "4.50",
        "hourlyrate": "0.0000",
        "note": "blurrgh",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydSUCAgCg=="
        },
        "finishdatetime": "2021/05/25 13:00:00",
        "timesheetid": "JSZaUyRRTEggCg==",
        "startdatetime": "2021/05/25 08:30:00",
        "type": "Non-Productive",
        "charge": "373.5000",
        "workdate": "2021/05/25",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqTyVRQCAgCg==",
          "overheadunit": "",
          "overhead": "Lunch",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "0.50",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTyBQQCAgCg=="
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaUyRRTEwgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "41.5000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "4.50",
        "hourlyrate": "0.0000",
        "note": "blurrgh",
        "grouping": {
          "groupid": "ISZQICAK",
          "tsgroupid": "JCYqTydSUCAgCg=="
        },
        "finishdatetime": "2021/05/26 13:00:00",
        "timesheetid": "JSZaUyRRTDAgCg==",
        "startdatetime": "2021/05/26 08:30:00",
        "type": "Non-Productive",
        "charge": "373.5000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/05/24 02:10:48",
        "cost": "0.0000",
        "hours": "4.50",
        "hourlyrate": "0.0000",
        "note": "blurrgh",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydSUCAgCg=="
        },
        "finishdatetime": "2021/05/27 13:00:00",
        "timesheetid": "JSZaUyRRTDQgCg==",
        "startdatetime": "2021/05/27 08:30:00",
        "type": "Non-Productive",
        "charge": "373.5000",
        "workdate": "2021/05/27",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:14:43",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/26 16:30:00",
        "timesheetid": "JSZaUyRRXFAgCg==",
        "startdatetime": "2021/05/26 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      }
    ]
  }
}
```


---

### GET Get Timesheets for userid

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the `timesheet` details for a specific  `userid`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|userid|=|JCQ6XyRRUCAgCg==')
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
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|userid|=|JCQ6XyRRUCAgCg==')
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
        'zone=' + encodeURIComponent('Substatuses')
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

#### Get Timesheets for userid (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "generatedisplayresponsetime": 203,
    "queryresponsetimes": {
      "timesheets": 120
    },
    "currentpageresults": 29,
    "timesheets": [
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyYK",
          "overheadunit": "",
          "overhead": "Sick Leave",
          "overheadtype": "Time"
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2018/06/20 00:49:07",
        "cost": "0.0000",
        "hours": "8.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqRyRRPFggCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2018/06/20",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2018/10/22 22:11:05",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "this is a task labour",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2018/10/23 09:00:00",
        "timesheetid": "JSYqQyVRXFQgCg==",
        "startdatetime": "2018/10/23 07:00:00",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2018/10/23",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaQyBQPDQgCg==",
          "jobnumber": "1047",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:33",
        "cost": "0.0000",
        "hours": "4.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "332.0000",
        "workdate": "2019/01/18",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:19",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/01/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFggCg==",
          "jobnumber": "1045",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:05",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/01/22",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLFwgCg==",
          "jobnumber": "1053",
          "taskname": "11111 22222 Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/03/05 22:39:39",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "0.0000",
        "note": "DId something",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqXydRLDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/03/06",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/03/05 22:42:48",
        "cost": "0.0000",
        "hours": "1.00",
        "hourlyrate": "0.0000",
        "note": "this is a testr",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2019/03/06 09:42:00",
        "timesheetid": "JSYqXydRLDQgCg==",
        "startdatetime": "2019/03/06 08:42:00",
        "type": "Productive",
        "charge": "83.0000",
        "workdate": "2019/03/06",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKTyxSXFwgCg==",
          "jobnumber": "1067",
          "taskname": "Test for LaTrobe"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/06/21 00:38:27",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWyJRLEggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/06/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyRRLFAgCg==",
          "jobnumber": "1068",
          "taskname": "Test for Tracking Center Report"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/07/15 01:51:51",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWy1QXEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/07/15",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLEAgCg==",
          "jobnumber": "1054",
          "taskname": "ttt HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/05 01:49:24",
        "cost": "139.8000",
        "hours": "2.33",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyJRXFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "193.3900",
        "workdate": "2019/09/05",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLEAgCg==",
          "jobnumber": "1054",
          "taskname": "ttt HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "Block",
          "worktypedescription": "",
          "worktypeid": "IyQ6Ly0K"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "23.7500",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/05 01:52:50",
        "cost": "139.8000",
        "hours": "2.33",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyJRXEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "237.5000",
        "workdate": "2019/09/05",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 06:00:47",
        "cost": "300.0000",
        "hours": "5.00",
        "hourlyrate": "60.0000",
        "note": "hj,,b,jhbhmhg",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "415.0000",
        "workdate": "2019/09/23",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 05:46:50",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "sadfascsad",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 06:18:56",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "ds fgesdfvsdsdf",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQLFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaVyNQPEggCg==",
          "jobnumber": "1060",
          "taskname": "Suite 13, Level 2 12 Maroondah Highway Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/10/17 02:10:23",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "somethign",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqUyRRXDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/10/17",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqXyJRQCAgCg==",
          "overheadunit": "",
          "overhead": "Travel Time",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/01/30 05:01:38",
        "cost": "180.0000",
        "hours": "3.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqLyRQTFAgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "249.0000",
        "workdate": "2020/01/30",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqXyJRQCAgCg==",
          "overheadunit": "",
          "overhead": "Travel Time",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/06/11 23:59:50",
        "cost": "60.0000",
        "hours": "1.00",
        "hourlyrate": "60.0000",
        "note": "travelly travel",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqKyFRLEQgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "83.0000",
        "workdate": "2020/06/12",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Time + Half",
          "worktype": "TH",
          "worktypedescription": "Time & Half",
          "worktypeid": "IycqQyYK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "95.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "90.0000",
        "inserteddatetimeutc": "2020/09/13 20:56:35",
        "cost": "180.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyRQLDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "190.0000",
        "workdate": "2020/09/08",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/13 20:56:35",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyRQPFAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "664.0000",
        "workdate": "2020/09/08",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "72.0000",
        "hours": "1.20",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "99.6000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLyEK",
          "overheadunit": "",
          "overhead": "Trade School",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEQgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "166.0000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "210.0000",
        "hours": "3.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "290.5000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/02/18 03:23:02",
        "cost": "510.0000",
        "hours": "8.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaXy1QXDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "705.5000",
        "workdate": "2021/02/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqTyVRQCAgCg==",
          "overheadunit": "",
          "overhead": "Lunch",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/02/18 03:23:02",
        "cost": "30.0000",
        "hours": "0.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaXy1QLFAgCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "41.5000",
        "workdate": "2021/02/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/25 16:30:00",
        "timesheetid": "JSZaUyRRTFQgCg==",
        "startdatetime": "2021/05/25 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/25",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "JCYqTyVRQCAgCg==",
          "overheadunit": "",
          "overhead": "Lunch",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "30.0000",
        "hours": "0.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydSQCAgCg=="
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaUyRRTFggCg==",
        "startdatetime": " ",
        "type": "Non-Productive",
        "charge": "41.5000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:14:43",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/26 16:30:00",
        "timesheetid": "JSZaUyRRXFAgCg==",
        "startdatetime": "2021/05/26 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/26",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/27 16:30:00",
        "timesheetid": "JSZaUyRRTEAgCg==",
        "startdatetime": "2021/05/27 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/27",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "",
          "jobnumber": "",
          "taskname": ""
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "IydKLycK",
          "overheadunit": "",
          "overhead": "Annual Leave",
          "overheadtype": "Time"
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/05/24 02:08:09",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "Time off",
        "grouping": {
          "groupid": "ISYgICAK",
          "tsgroupid": "JCYqTydRICAgCg=="
        },
        "finishdatetime": "2021/05/28 16:30:00",
        "timesheetid": "JSZaUyRRTEQgCg==",
        "startdatetime": "2021/05/28 08:30:00",
        "type": "Non-Productive",
        "charge": "664.0000",
        "workdate": "2021/05/28",
        "resourceoverheadrate": "0.0000"
      }
    ]
  }
}
```


---

### GET Get Timesheets for type `productive`

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the `timesheet` details for a specific  `type`.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|type|=|productive')
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
        'zone=' + encodeURIComponent('timesheets')
        ,'where=' +encodeURIComponent('and|type|=|productive')
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
        'zone=' + encodeURIComponent('Substatuses')
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

#### Get Timesheets for type `productive` (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "generatedisplayresponsetime": 156,
    "queryresponsetimes": {
      "timesheets": 161
    },
    "currentpageresults": 26,
    "timesheets": [
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2018/10/22 22:11:05",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "this is a task labour",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2018/10/23 09:00:00",
        "timesheetid": "JSYqQyVRXFQgCg==",
        "startdatetime": "2018/10/23 07:00:00",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2018/10/23",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaQyBQPDQgCg==",
          "jobnumber": "1047",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:33",
        "cost": "0.0000",
        "hours": "4.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "332.0000",
        "workdate": "2019/01/18",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:19",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/01/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFggCg==",
          "jobnumber": "1045",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/01/21 22:14:05",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqQyxRPFQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/01/22",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLFwgCg==",
          "jobnumber": "1053",
          "taskname": "11111 22222 Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/03/05 22:39:39",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "0.0000",
        "note": "DId something",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqXydRLDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/03/06",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "",
          "trackingcentreid": ""
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/03/05 22:42:48",
        "cost": "0.0000",
        "hours": "1.00",
        "hourlyrate": "0.0000",
        "note": "this is a testr",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2019/03/06 09:42:00",
        "timesheetid": "JSYqXydRLDQgCg==",
        "startdatetime": "2019/03/06 08:42:00",
        "type": "Productive",
        "charge": "83.0000",
        "workdate": "2019/03/06",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKTyxSXFwgCg==",
          "jobnumber": "1067",
          "taskname": "Test for LaTrobe"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/06/21 00:38:27",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWyJRLEggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/06/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKTyxSXFwgCg==",
          "jobnumber": "1067",
          "taskname": "Test for LaTrobe"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/06/21 00:38:35",
        "cost": "0.0000",
        "hours": "4.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWyJRLEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "332.0000",
        "workdate": "2019/06/21",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyRRLFAgCg==",
          "jobnumber": "1068",
          "taskname": "Test for Tracking Center Report"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/07/15 01:51:51",
        "cost": "0.0000",
        "hours": "2.00",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqWy1QXEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/07/15",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLEAgCg==",
          "jobnumber": "1054",
          "taskname": "ttt HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/05 01:49:24",
        "cost": "139.8000",
        "hours": "2.33",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyJRXFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "193.3900",
        "workdate": "2019/09/05",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaWyBRLEAgCg==",
          "jobnumber": "1054",
          "taskname": "ttt HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "Block",
          "worktypedescription": "",
          "worktypeid": "IyQ6Ly0K"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "23.7500",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/05 01:52:50",
        "cost": "139.8000",
        "hours": "2.33",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyJRXEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "237.5000",
        "workdate": "2019/09/05",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 06:00:47",
        "cost": "300.0000",
        "hours": "5.00",
        "hourlyrate": "60.0000",
        "note": "hj,,b,jhbhmhg",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "415.0000",
        "workdate": "2019/09/23",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 05:46:50",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "sadfascsad",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXEwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaTy1RPFwgCg==",
          "jobnumber": "1036",
          "taskname": "AroFlo Test 1"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/09/24 05:46:59",
        "cost": "0.0000",
        "hours": "3.00",
        "hourlyrate": "0.0000",
        "note": "svbxdbd",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQXDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "249.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/09/24 06:18:56",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "ds fgesdfvsdsdf",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQLFwgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaRyZSXFQgCg==",
          "jobnumber": "1044",
          "taskname": "HMAS Sydney Port of Sydney"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Howlett III",
          "givennames": "James",
          "userid": "JCQqQyFRQCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/09/24 06:19:07",
        "cost": "0.0000",
        "hours": "1.00",
        "hourlyrate": "0.0000",
        "note": "dsf vdszfx df dx  dxfdx  xd",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqVyxQLEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "83.0000",
        "workdate": "2019/09/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKQyJQXFAgCg==",
          "jobnumber": "1085",
          "taskname": "Unit 1 New Town"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Filoni",
          "givennames": "Dave",
          "userid": "JCQ6UyxRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Filoni",
          "givennames": "Dave",
          "userid": "JCQ6UyxRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2019/09/24 21:14:40",
        "cost": "0.0000",
        "hours": "0.07",
        "hourlyrate": "0.0000",
        "note": "did some stuff and drank coffee",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2019/09/25 07:14:00",
        "timesheetid": "JSYqVyxQLEQgCg==",
        "startdatetime": "2019/09/25 07:10:00",
        "type": "Productive",
        "charge": "5.8100",
        "workdate": "2019/09/25",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaVyNQPEggCg==",
          "jobnumber": "1060",
          "taskname": "Suite 13, Level 2 12 Maroondah Highway Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2019/10/17 02:10:23",
        "cost": "120.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "somethign",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSYqUyRRXDAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "166.0000",
        "workdate": "2019/10/17",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Time + Half",
          "worktype": "TH",
          "worktypedescription": "Time & Half",
          "worktypeid": "IycqQyYK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "95.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "90.0000",
        "inserteddatetimeutc": "2020/09/13 20:56:35",
        "cost": "180.0000",
        "hours": "2.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyRQLDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "190.0000",
        "workdate": "2020/09/08",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/13 20:56:35",
        "cost": "480.0000",
        "hours": "8.00",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyRQPFAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "664.0000",
        "workdate": "2020/09/08",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "72.0000",
        "hours": "1.20",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEAgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "99.6000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZaXyVQPFggCg==",
          "jobnumber": "1049",
          "taskname": "A task from the API"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2020/09/30 04:49:25",
        "cost": "210.0000",
        "hours": "3.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaSyFQLEggCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "290.5000",
        "workdate": "2020/09/29",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSZKSyBSXEAgCg==",
          "jobnumber": "1069",
          "taskname": "10 New Street Ringwood"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Shepard",
          "givennames": "Commander",
          "userid": "JCQ6XyRRUCAgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "60.0000",
        "inserteddatetimeutc": "2021/02/18 03:23:02",
        "cost": "510.0000",
        "hours": "8.50",
        "hourlyrate": "60.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": " ",
        "timesheetid": "JSZaXy1QXDQgCg==",
        "startdatetime": " ",
        "type": "Productive",
        "charge": "705.5000",
        "workdate": "2021/02/24",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSdaTyFRLEwgCg==",
          "jobnumber": "1140",
          "taskname": "10-18S Society Avenue Lyndhurst"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:37:24",
        "cost": "0.0000",
        "hours": "0.08",
        "hourlyrate": "0.0000",
        "note": "Inspected and found no fault",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 12:15:00",
        "timesheetid": "JSZaWyZRXEwgCg==",
        "startdatetime": "2021/02/28 12:10:00",
        "type": "Productive",
        "charge": "6.9167",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSdaTyFRLEggCg==",
          "jobnumber": "1139",
          "taskname": "Check bedroom AC"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:38:59",
        "cost": "0.0000",
        "hours": "0.25",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 17:42:00",
        "timesheetid": "JSZaWyZRXDQgCg==",
        "startdatetime": "2021/02/28 17:27:00",
        "type": "Productive",
        "charge": "20.7500",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      },
      {
        "verifiedby": {
          "surname": "",
          "givennames": "",
          "isverified": "false",
          "userid": "",
          "verifieddatetime": " "
        },
        "task": {
          "taskid": "JSdaTyFRLEggCg==",
          "jobnumber": "1139",
          "taskname": "Check bedroom AC"
        },
        "worktype": {
          "worktyperatetype": "Normal",
          "worktype": "NT",
          "worktypedescription": "Normal Time",
          "worktypeid": "IycqQyUK"
        },
        "trackingcentre": {
          "trackingcentre": "Labour",
          "trackingcentreid": "JCYqQyRSQCAgCg=="
        },
        "insertedby": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "chargerate": "83.0000",
        "user": {
          "surname": "Nesbitt",
          "givennames": "James",
          "userid": "JSc6LyBQPEQgCg=="
        },
        "overhead": {
          "overheadid": "",
          "overheadunit": "",
          "overhead": "",
          "overheadtype": ""
        },
        "costrate": "0.0000",
        "inserteddatetimeutc": "2021/03/01 23:39:21",
        "cost": "0.0000",
        "hours": "0.37",
        "hourlyrate": "0.0000",
        "note": "",
        "grouping": {
          "groupid": "",
          "tsgroupid": ""
        },
        "finishdatetime": "2021/02/28 17:16:00",
        "timesheetid": "JSZaWyZRLFAgCg==",
        "startdatetime": "2021/02/28 16:54:00",
        "type": "Productive",
        "charge": "30.4333",
        "workdate": "2021/02/28",
        "resourceoverheadrate": "0.0000"
      }
    ]
  }
}
```

