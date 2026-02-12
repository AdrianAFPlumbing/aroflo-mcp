# DocumentsAndPhotos

This zone is READ ONLY.

Allows listing of the various [DocumentsAndPhotos](https://help.aroflo.com/display/office/Document+Directory) for your AroFlo site Document Directory.

URI provided in this method are valid for 10mins.

This zone is Read Only

## WHERE filters

| Field | Value |
| --- | --- |
| documentid | AroFlo ID |
| name | STRING |
| comment | STRING |
| categoryname | STRING |

**Default WHERE clause**

AND datetimeInserted > DATEADD(d, -30, GETUTCDATE())

## ORDER BY

| Field |
| --- |
| documentid |
| name |
| categoryname |

**Authorization:** bearer


---

### GET Get DocumentsAndPhotos

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the first page of `DocumentsAndPhotos` for your AroFlo site.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('DocumentsAndPhotos')
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
        'zone=' + encodeURIComponent('DocumentsAndPhotos')
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

#### Get DocumentsAndPhotos (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "documentsandphotos": [
      {
        "documentid": "JCQ6QyNSUCAgCg==",
        "sizeinbytes": "41057",
        "uploadeddatetime": "2017/07/18 00:43:46",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "ISdQICAK",
          "categoryname": "Office Admin"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-EF5-original?expires=1540943296&signature=A00EB7F8D664F3797CD0A45B9B96C9E1C17A852D727AC8E2529B78A253BEC60D",
        "name": "office.docsandphotos.link.update.newsletter1.png"
      },
      {
        "documentid": "JCQ6XyBQICAgCg==",
        "sizeinbytes": "220832",
        "uploadeddatetime": "2017/08/10 00:50:53",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQqSCAK",
          "categoryname": "Marketing"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-E84-original?expires=1540943296&signature=3E7C87084372184F70CDCF5113BBD6F7F916354C82CD9AB68AE8878C988671B9",
        "name": "FieldTechFront.png"
      },
      {
        "documentid": "JCQqUyVQQCAgCg==",
        "sizeinbytes": "11786",
        "uploadeddatetime": "2018/06/08 02:46:45",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXQ-original?expires=1540943296&signature=A8DFBE296E39F617306A8786B327315DEAD144BB5EEC1D89738016B7AC60173F",
        "name": "PN8 Project Schedule.docx"
      },
      {
        "documentid": "JCQqUyVQUCAgCg==",
        "sizeinbytes": "11684",
        "uploadeddatetime": "2018/06/08 02:46:45",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXX-original?expires=1540943296&signature=EF637A6A35DAE4BDA74C094F6D2F45379C34CB5245FBE56C6FB82A527DFFE4F7",
        "name": "PN8 Project Scope.docx"
      },
      {
        "documentid": "JCQqUyVQICAgCg==",
        "sizeinbytes": "11795",
        "uploadeddatetime": "2018/06/08 02:46:45",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXO-original?expires=1540943296&signature=0AD193ADA0A0425F0454AAB6408EBF81457B9849023E1CFDF771FBB4C436FFBE",
        "name": "PN8 Variations Log.docx"
      },
      {
        "documentid": "JCQqUyVQMCAgCg==",
        "sizeinbytes": "1091272",
        "uploadeddatetime": "2018/06/08 02:47:37",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "Iic6WCAK",
          "categoryname": "Staff images"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXT-original?expires=1540943296&signature=035B151B8800D759640C68ABBAE7494690775006680442F33B8F8D6388050E24",
        "name": "Staff_Tom_Smith.png"
      },
      {
        "documentid": "JCQqUyVRQCAgCg==",
        "sizeinbytes": "2470095",
        "uploadeddatetime": "2018/06/08 02:47:38",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "Iic6WCAK",
          "categoryname": "Staff images"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JX1-original?expires=1540943296&signature=BE780FCC6FA4489DA7F5F2ACC1DCA45526CEBD9199BF7DC389EB04C104021987",
        "name": "Staff_Daniel_Owens.png"
      },
      {
        "documentid": "JCQqUyVRUCAgCg==",
        "sizeinbytes": "1017840",
        "uploadeddatetime": "2018/06/08 02:47:40",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "Iic6WCAK",
          "categoryname": "Staff images"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXU-original?expires=1540943296&signature=C79C9324208328A9D7CD4D3C0AA03682F55A919622BE82A07545EB38ED899AE4",
        "name": "Staff_Matt_Edwards.png"
      },
      {
        "documentid": "JCQqUyVRMCAgCg==",
        "sizeinbytes": "11783",
        "uploadeddatetime": "2018/06/08 04:55:34",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6LCAK",
          "categoryname": "Contracts"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXI-original?expires=1540943296&signature=721ACD31C1CB94D4EDB07DFA266D23E75B11943330043EAE0A9017AFE8153F8F",
        "name": "REIV standard contract.docx"
      },
      {
        "documentid": "JCQqUyVSQCAgCg==",
        "sizeinbytes": "11783",
        "uploadeddatetime": "2018/06/08 05:18:39",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6LCAK",
          "categoryname": "Contracts"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXS-original?expires=1540943296&signature=3AA5BC11FFB93669E2948FC3FADAB3A04A886BFC9C248358AF0E0277D6094134",
        "name": "REIV standard contract.docx"
      },
      {
        "documentid": "JCQqUydQICAgCg==",
        "sizeinbytes": "11683",
        "uploadeddatetime": "2018/06/13 01:59:21",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JOR-original?expires=1540943296&signature=CC28940F39BBCA74267B36A08861EB25B013A0CF1AE0F13F950F1A91D063F939",
        "name": "Project Status.docx"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "documentsandphotos": 17
    },
    "currentpageresults": 11
  }
}
```


---

### GET Get DocumentsAndPhotos from Category

`GET https://api.aroflo.com/{{urlVarString}}`

Returns the first page of `DocumentsAndPhotos` from the "marketing" category.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('DocumentsAndPhotos')
        ,'where=' + encodeURIComponent('and|categoryname|=|marketing')
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
        'zone=' + encodeURIComponent('DocumentsAndPhotos')
        ,'where=' + encodeURIComponent('and|categoryname|=|marketing')
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

#### Get DocumentsAndPhotos (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "mainstatuses": 3,
      "substatuses": 1
    },
    "substatuses": [
      {
        "substatusid": "IidaVCAK",
        "substatustype": "task",
        "listorder": "0",
        "mainstatuses": [
          {
            "status": "in progress"
          }
        ],
        "description": "",
        "org": {
          "orgid": "IiYqRCAK",
          "orgname": "AroFlo Services"
        },
        "backgroundcolour": "",
        "archived": "false",
        "substatus": "Waiting on parts"
      },
      {
        "substatusid": "IidaUCAK",
        "substatustype": "task",
        "listorder": "1",
        "mainstatuses": [
          {
            "status": "in progress"
          }
        ],
        "description": "",
        "org": {
          "orgid": "IiYqRCAK",
          "orgname": "AroFlo Services"
        },
        "backgroundcolour": "",
        "archived": "false",
        "substatus": "Waiting for client approval"
      },
      {
        "substatusid": "IidaLCAK",
        "substatustype": "task",
        "listorder": "2",
        "mainstatuses": [
          {
            "status": "in progress"
          }
        ],
        "description": "",
        "org": {
          "orgid": "IiYqRCAK",
          "orgname": "AroFlo Services"
        },
        "backgroundcolour": "",
        "archived": "false",
        "substatus": "Certified tech unavailable"
      }
    ],
    "currentpageresults": 3
  }
}
```

#### Get DocumentsAndPhotos from Category (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "documentsandphotos": [
      {
        "documentid": "JSYqQyxSTFAgCg==",
        "sizeinbytes": "28650",
        "uploadeddatetime": "2018/11/01 02:12:39",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQqSCAK",
          "categoryname": "Marketing"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-PTA-original?expires=1541547099&signature=3BE53D6DAD732EC2450288D1FF187CFC60148152D6E1D8DF47A467EEA98CD2F2",
        "name": "hippo birdie two ewe.jpg"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "documentsandphotos": 11
    },
    "currentpageresults": 1
  }
}
```

#### Get DocumentsAndPhotos (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "documentsandphotos": [
      {
        "documentid": "JCQ6QyNSUCAgCg==",
        "sizeinbytes": "41057",
        "uploadeddatetime": "2017/07/18 00:43:46",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "ISdQICAK",
          "categoryname": "Office Admin"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-EF5-original?expires=1540943296&signature=A00EB7F8D664F3797CD0A45B9B96C9E1C17A852D727AC8E2529B78A253BEC60D",
        "name": "office.docsandphotos.link.update.newsletter1.png"
      },
      {
        "documentid": "JCQ6XyBQICAgCg==",
        "sizeinbytes": "220832",
        "uploadeddatetime": "2017/08/10 00:50:53",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQqSCAK",
          "categoryname": "Marketing"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-E84-original?expires=1540943296&signature=3E7C87084372184F70CDCF5113BBD6F7F916354C82CD9AB68AE8878C988671B9",
        "name": "FieldTechFront.png"
      },
      {
        "documentid": "JCQqUyVQQCAgCg==",
        "sizeinbytes": "11786",
        "uploadeddatetime": "2018/06/08 02:46:45",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXQ-original?expires=1540943296&signature=A8DFBE296E39F617306A8786B327315DEAD144BB5EEC1D89738016B7AC60173F",
        "name": "PN8 Project Schedule.docx"
      },
      {
        "documentid": "JCQqUyVQUCAgCg==",
        "sizeinbytes": "11684",
        "uploadeddatetime": "2018/06/08 02:46:45",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXX-original?expires=1540943296&signature=EF637A6A35DAE4BDA74C094F6D2F45379C34CB5245FBE56C6FB82A527DFFE4F7",
        "name": "PN8 Project Scope.docx"
      },
      {
        "documentid": "JCQqUyVQICAgCg==",
        "sizeinbytes": "11795",
        "uploadeddatetime": "2018/06/08 02:46:45",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXO-original?expires=1540943296&signature=0AD193ADA0A0425F0454AAB6408EBF81457B9849023E1CFDF771FBB4C436FFBE",
        "name": "PN8 Variations Log.docx"
      },
      {
        "documentid": "JCQqUyVQMCAgCg==",
        "sizeinbytes": "1091272",
        "uploadeddatetime": "2018/06/08 02:47:37",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "Iic6WCAK",
          "categoryname": "Staff images"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXT-original?expires=1540943296&signature=035B151B8800D759640C68ABBAE7494690775006680442F33B8F8D6388050E24",
        "name": "Staff_Tom_Smith.png"
      },
      {
        "documentid": "JCQqUyVRQCAgCg==",
        "sizeinbytes": "2470095",
        "uploadeddatetime": "2018/06/08 02:47:38",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "Iic6WCAK",
          "categoryname": "Staff images"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JX1-original?expires=1540943296&signature=BE780FCC6FA4489DA7F5F2ACC1DCA45526CEBD9199BF7DC389EB04C104021987",
        "name": "Staff_Daniel_Owens.png"
      },
      {
        "documentid": "JCQqUyVRUCAgCg==",
        "sizeinbytes": "1017840",
        "uploadeddatetime": "2018/06/08 02:47:40",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "Iic6WCAK",
          "categoryname": "Staff images"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXU-original?expires=1540943296&signature=C79C9324208328A9D7CD4D3C0AA03682F55A919622BE82A07545EB38ED899AE4",
        "name": "Staff_Matt_Edwards.png"
      },
      {
        "documentid": "JCQqUyVRMCAgCg==",
        "sizeinbytes": "11783",
        "uploadeddatetime": "2018/06/08 04:55:34",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6LCAK",
          "categoryname": "Contracts"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXI-original?expires=1540943296&signature=721ACD31C1CB94D4EDB07DFA266D23E75B11943330043EAE0A9017AFE8153F8F",
        "name": "REIV standard contract.docx"
      },
      {
        "documentid": "JCQqUyVSQCAgCg==",
        "sizeinbytes": "11783",
        "uploadeddatetime": "2018/06/08 05:18:39",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6LCAK",
          "categoryname": "Contracts"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JXS-original?expires=1540943296&signature=3AA5BC11FFB93669E2948FC3FADAB3A04A886BFC9C248358AF0E0277D6094134",
        "name": "REIV standard contract.docx"
      },
      {
        "documentid": "JCQqUydQICAgCg==",
        "sizeinbytes": "11683",
        "uploadeddatetime": "2018/06/13 01:59:21",
        "uploadedbyuser": {
          "userid": "ISdQICAK",
          "username": "Office Staff"
        },
        "filter": "Internal Only",
        "category": {
          "categoryid": "IiQ6VCAK",
          "categoryname": "Project Templates"
        },
        "comment": "",
        "url": "https://staging17-api.aroflo.com/DocStorage/7A3-JOR-original?expires=1540943296&signature=CC28940F39BBCA74267B36A08861EB25B013A0CF1AE0F13F950F1A91D063F939",
        "name": "Project Status.docx"
      }
    ],
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "documentsandphotos": 17
    },
    "currentpageresults": 11
  }
}
```

