# Clients

This zone allows you to retrieve client data as well as creating new [Clients](https://)

## WHERE filters

| Field | Value |
| --- | --- |
| clientid | AroFlo ID |
| archived | BOOLEAN |
| clientname | STRING(50) |
| postable | BOOLEAN |
| datecreated | DATE(YYYY-MM-DD) |
| dateinserted | DATE(YYYY-MM-DD) |
| datetimeinserted | datetime |
| lastupdateutc | DATE(YYYY-MM-DD) |
| lastupdatedatetimeutc | DATE(YYYY-MM-DD hh:mm:ss) |

**Default WHERE clause**
**THIS IS NOT AVAILABLE FOR FILTERING AND ONLY APPLIES TO DEFAULT FILTERS. DO NOT USE THIS IN YOUR CALLS**

AND Created_UTC > DATEADD(d, -30, GETUTCDATE())

### POSTABLE

The postable flag is set whenever a client is created or updated in the AroFlo interface. This is the best flag to use to keep you client data in sync as you should only be getting the data that has been updated:

`GET zone=Clients&postable=true`

Process the received data and then return a POST to AroFlo and reset the Postable flag on each client you have processed.

<clients>
    <client>
        <clientid>XXX</clientid>
        <postable>false</postable>
    </client>
    <client>
        <clientid>YYYY</clientid>
        <postable>false</postable>
    </client>
</clients>

## JOINs available

| Area |
| --- |
| locations |
| locationcustomfields |
| contacts |
| customfields |
| priorities |

## POSTXML Variable definition

<clients>
    <client>
        <clientid>AroFlo ID</clientid>  INSERT no / UPDATE required  
        <clientname><![CDATA[ STRING(50) ]]></clientname>  INSERT required / UPDATE yes  
        <firstname><![CDATA[ STRING(50) ]]></firstname>  INSERT required / UPDATE yes  
        <surname><![CDATA[ STRING(50) ]]></surname>  INSERT required / UPDATE yes  
        <abn><![CDATA[ STRING(50) ]]></abn>  INSERT yes / UPDATE yes  
        <shortname><![CDATA[ STRING(6) ]]></shortname>  INSERT yes / UPDATE yes  
        <phone><![CDATA[ STRING(50) ]]></phone>  INSERT yes / UPDATE yes  
        <mobile><![CDATA[ STRING(50) ]]></mobile>  INSERT yes / UPDATE yes  
        <fax><![CDATA[ STRING(50) ]]></fax>  INSERT yes / UPDATE yes  
        <email><![CDATA[ STRING(250) ]]></email>  INSERT yes / UPDATE yes  
        <website><![CDATA[ STRING(1000) ]]></website>  INSERT yes / UPDATE yes  
        <transactionterms>
            <transactiontermid>AroFlo ID</transactiontermid>  INSERT yes / UPDATE yes  
            <transactionterm><![CDATA[ STRING(50) ]]></transactionterm>  INSERT yes / UPDATE yes  
        </transactionterms>
        <termsnote><![CDATA[ STRING(50) ]]></termsnote>  INSERT yes / UPDATE yes  
        <datecreated>DATE(YYYY-MM-DD)</datecreated>   
        <dateinserted>DATE(YYYY-MM-DD)</dateinserted>
        <datetimeinserted>DATE(YYYY-MM-DD) HH:MM:ss</datetimeinserted>
        <gpslat>FLOAT</gpslat>  INSERT yes / UPDATE yes  
        <gpslong>FLOAT</gpslong>  INSERT yes / UPDATE yes  
        <postable>BOOLEAN</postable>   INSERT no / UPDATE yes  
        <orgs>
            <org>  Multiple org elements can be used to assign the client to those business units  
                <orgid>AroFlo ID</orgid>  INSERT yes / UPDATE yes  
                <archived>BOOLEAN</archived>  INSERT no / UPDATE no 
            </org>
        </orgs>
        <address class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; >
            <addressline1><![CDATA[ STRING(150) ]]></addressline1>  INSERT yes / UPDATE yes  
            <addressline2><![CDATA[ STRING(150) ]]></addressline2>  INSERT yes / UPDATE yes  
            <suburb><![CDATA[ STRING(100) ]]></suburb>  INSERT yes / UPDATE yes  
            <state><![CDATA[ STRING(50) ]]></state>  INSERT required* / UPDATE yes  
            <postcode><![CDATA[ STRING(10) ]]></postcode>  INSERT yes / UPDATE yes  
            <country><![CDATA[ STRING(50) ]]></country>  INSERT required* / UPDATE yes (All Countries)  
        </address>
        <mailingaddress>
            <addressline1><![CDATA[ STRING(150) ]]></addressline1>  INSERT yes / UPDATE yes  
            <addressline2><![CDATA[ STRING(150) ]]></addressline2>  INSERT yes / UPDATE yes  
            <suburb><![CDATA[ STRING(100) ]]></suburb>  INSERT yes / UPDATE yes  
            <state><![CDATA[ STRING(50) ]]></state>  INSERT required* / UPDATE yes  
            <postcode><![CDATA[ STRING(10) ]]></postcode>  INSERT yes / UPDATE yes  
            <country><![CDATA[ STRING(50) ]]></country>  INSERT required* / UPDATE yes (All Countries)  
        </mailingaddress>
        <locations>
            <location>
                <locationid>AroFlo ID</locationid>  INSERT no / UPDATE required  
                <locationname><![CDATA[ STRING(100) ]]></locationname>  INSERT required / UPDATE yes  
                <address class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; ><![CDATA[ STRING(50) ]]></address>  INSERT yes / UPDATE yes  
                <suburb><![CDATA[ STRING(50) ]]></suburb>  INSERT yes / UPDATE yes  
                <state><![CDATA[ STRING(50) ]]>(Australian, New Zealand and United States "States")</state>    INSERT required / UPDATE yes  
                <postcode><![CDATA[ STRING(10) ]]></postcode>  INSERT yes / UPDATE yes  
                <country><![CDATA[ STRING(50) ]]>(All Countries)</country>  INSERT required / UPDATE yes  
                <sitecontact><![CDATA[ STRING(50) ]]></sitecontact>  INSERT yes / UPDATE yes  
                <sitephone><![CDATA[ STRING(50) ]]></sitephone>  INSERT yes / UPDATE yes  
                <siteemail><![CDATA[ STRING(100) ]]></siteemail>  INSERT yes / UPDATE yes  
                <gpslat>FLOAT</gpslat>  INSERT yes / UPDATE yes  
                <gpslong>FLOAT</gpslong>  INSERT yes / UPDATE yes  
            </location>
        </locations>
        <contacts>
            <contact>
                <userid>AroFlo ID</userid>  INSERT no / UPDATE required  
                <givennames><![CDATA[ STRING(50) ]]></givennames>  INSERT yes / UPDATE yes  
                <surname><![CDATA[ STRING(50) ]]></surname>  INSERT yes / UPDATE yes  
                <username><![CDATA[ STRING(40) ]]></username>  INSERT yes / UPDATE no  
                <phone><![CDATA[ STRING(50) ]]></phone>  INSERT yes / UPDATE yes  
                <fax><![CDATA[ STRING(50) ]]></fax>  INSERT yes / UPDATE yes  
                <mobile><![CDATA[ STRING(50) ]]></mobile>  INSERT yes / UPDATE yes  
                <email><![CDATA[ STRING(250) ]]></email>  INSERT yes / UPDATE yes  
            </contact>
        </contacts>
        <customfields>
            <customfield>
                <fieldid>AroFlo ID</fieldid>  INSERT no / UPDATE required  
                <name><![CDATA[ STRING(50) ]]></name>  INSERT yes / UPDATE yes  
                <type><![CDATA[ STRING(50) ]]></type>  INSERT yes / UPDATE yes (text, numeric, Datefield, checkbox, radio, Select, textarea)  
                <value><![CDATA[ STRING(50) ]]></value>
                    INSERT yes / UPDATE yes
                    type = 'checkbox' then value is TRUE or FALSE
                    type = 'datefield' then value is a valid date in format 'YYYY-MM-DD'
                    type = all other types then 
                <archived>BOOLEAN</archived>
            </customfield>
        </customfields>
        <link>
            <orgid>AroFlo ID</orgid>  INSERT no / UPDATE yes  
            <orgname><![CDATA[ STRING(50) ]]></orgname>  INSERT no / UPDATE yes  
            <externalid><![CDATA[ STRING(100) ]]></externalid>  INSERT no / UPDATE yes  
        </link>
    </client>
</clients>

- For `address` and `mailingaddress`, State and Country are now required pairs. This means that if you are inserting a client and set a `state` you must set a `country`. You cannot pass through a `state` without a `country`. However; if the client is in the same state and country as the BU then you can leave off the state/country tags.

**Authorization:** bearer


### JOIN locations

##WHERE filters

| Field | Value |
| --- | --- |
| loc_locationname | STRING |
| loc_address | STRING |
| loc_suburb | STRING |
| loc_state | STRING |
| loc_country | STRING |
| loc_postcode | STRING |
| loc_gpslat | STRING |
| loc_gpslong | STRING |
| loc_archive | BOOLEAN |

**Authorization:** bearer


---

### GET Get Clients and Locations

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of clients and their locations.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('locations')
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
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('locations')
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

#### Get Clients and Locations (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "locations": 6,
      "orgs": 10,
      "clients": 115
    },
    "currentpageresults": 83,
    "clients": [
      {
        "contacts": [],
        "locations": [
          {
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
            "archived": "FALSE",
            "SitePhone": ""
          }
        ],
        "phone": "1300 794 818",
        "firstname": "Jason",
        "email": "jason.bourne@aroflo.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Bourne",
        "shortname": "#1 Lad",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "true",
        "address": {
          "country": "AUSTRALIA",
          "postcode": "3134",
          "addressline1": "22222",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "11111"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 XXXX XXXX",
        "clientname": "#1 Ladies, Detective Agency",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 00:00:00.0",
        "mobile": "04XX XXX XXX"
      },
      {
        "contacts": [],
        "locations": [
          {
            "locationid": "JSc6Qy1RXDAgCg==",
            "gpslat": "-37.818021",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "peter.mayhew@aroflo.com",
            "customfields": [],
            "locationname": "53 New St",
            "country": "Australia",
            "gpslong": "145.220657",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          },
          {
            "locationid": "JSc6Qy1RPFQgCg==",
            "gpslat": "-37.818021",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "peter.mayhew@aroflo.com",
            "customfields": [],
            "locationname": "53 New St",
            "country": "Australia",
            "gpslong": "145.220657",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          },
          {
            "locationid": "JSc6Qy1RPFggCg==",
            "gpslat": "-37.818021",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "peter.mayhew@aroflo.com",
            "customfields": [],
            "locationname": "53 New St",
            "country": "Australia",
            "gpslong": "145.220657",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          },
          {
            "locationid": "JSc6Qy1RPFwgCg==",
            "gpslat": "-37.8177723",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "peter.mayhew@aroflo.com",
            "customfields": [],
            "locationname": "51 New St",
            "country": "Australia",
            "gpslong": "145.2208069",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          },
          {
            "locationid": "JSc6Qy1RPEAgCg==",
            "gpslat": "-37.8198419",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "peter.mayhew@aroflo.com",
            "customfields": [],
            "locationname": "57 New St",
            "country": "Australia",
            "gpslong": "145.2207638",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          }
        ],
        "phone": "1300 794 818",
        "firstname": "Mike",
        "email": "arnegger@gmail.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Level 1"
        },
        "surname": "Phillips",
        "shortname": "Aardva",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "PO BOX 3124",
          "state": "VIC",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9873 1620",
        "clientname": "Aardvaark ConsultantsCLR2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03-9259-5200 Tanya",
        "firstname": "Alan",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Building 1"
        },
        "surname": "Bull",
        "shortname": "ABC Bu",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "50 Market St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "ABC Building",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Andrew",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "ABC Pl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "ABC Plumbing Sydney",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Test",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Test",
        "shortname": "Andrea",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "10 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Andrea Test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Joe",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Example",
        "shortname": "Bendig",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3570",
          "addressline1": "PO Box 1",
          "state": "VIC",
          "suburb": "Bendigo",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Bendigo Primary School",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "(02) 6549 8712",
        "firstname": "Bob",
        "email": "gimme234223@hotmail.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Big Bo",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "7425",
          "addressline1": "25 Big St",
          "state": "NSW",
          "suburb": "Big Town",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "69854721",
        "clientname": "Big Bobs Bits",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "421158798"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Susan",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Bovis",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Bovis",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Gerald",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Big Bloke",
        "shortname": "Caelli",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3766",
          "addressline1": "70 Barbers Rd",
          "state": "VIC",
          "suburb": "Kalorama",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Caelli",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Charlie",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Kane",
        "shortname": "Charla",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "SA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Charlane Pty Ltd",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "07 1234 5678",
        "firstname": "Bob",
        "email": "bjones@whereever.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Building 1"
        },
        "surname": "Smith",
        "shortname": "City C",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "2 Jones Drive",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Building 1"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "City Council",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Fox",
        "shortname": "Client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Client 4 CBD",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "f",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "l",
        "shortname": "client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "client a",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Test",
        "email": "fake'e@fakeemail.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Client",
        "shortname": "Client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "WA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Client Test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "08 9301 1099",
        "firstname": "Ivan",
        "email": "joondalup@crust.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Hoh",
        "shortname": "Crust",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "6027",
          "addressline1": "Corner Boas Avenue & McLarty Street",
          "state": "WA",
          "suburb": "Joondalup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Crust Pizza",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "459488162"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1300254254",
        "firstname": "Jane",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Lvl 1"
        },
        "surname": "Smith",
        "shortname": "CSQ  D",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "75 Neville",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Lvl 1 75"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "732251111",
        "clientname": "CSQ  DLGPSR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "08 9755 5277",
        "firstname": "Nicolas",
        "email": "cellardoor@cullenwines.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Cleradin",
        "shortname": "Cullen",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "6280",
          "addressline1": "4323 Caves Road",
          "state": "WA",
          "suburb": "Wilyabrup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "08 9755 5550",
        "clientname": "Cullen Wines",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "850741",
        "firstname": "se",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Level 1"
        },
        "surname": "el",
        "shortname": "DNR",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4001",
          "addressline1": "12 fdhgbfgn",
          "state": "QLD",
          "suburb": "brisbane",
          "addressline2": "fhsfrhfrghfrh"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "5252",
        "clientname": "DNR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 8888 4545",
        "firstname": "George",
        "email": "test@testemail.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Collingwood"
        },
        "surname": "Bush",
        "shortname": "Dodgey",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3066",
          "addressline1": "12 dodgey street",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Collingwood"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Dodgey Brothers",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0401 132 123"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1.23E+20",
        "firstname": "Homer",
        "email": "homer@simp.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Simpsonhjkhbjkhbjkh",
        "shortname": "Donut",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Donut King",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "joe",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "bloggs",
        "shortname": "Emily",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "this is where i live",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Emily",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "321456987",
        "firstname": "Tim",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Lvl 1 Forestry House"
        },
        "surname": "Jones",
        "shortname": "EPA",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "160 Ann St",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Lvl 1 Forestry House"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "123456789",
        "clientname": "EPA",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "4321456987"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9497 1900",
        "firstname": "Bob",
        "email": "andrew.bantos@techtrac.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "E.C.C. Level 2, Building A"
        },
        "surname": "Smith",
        "shortname": "Exampl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3079",
          "addressline1": "PO Box 232",
          "state": "Vic",
          "suburb": "Ivanhoe",
          "addressline2": "E.C.C. Level 2, Building A"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9497 1901",
        "clientname": "Example Commercial Customer",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0438 123 456"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Pebbles",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Flinst",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Flinstone & Co",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "391239123",
        "firstname": "Fred",
        "email": "fred@flinstone.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Freds",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "53 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Freds Floors",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "400123123"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Gibbs",
        "shortname": "Gibbs",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Gibbs Jason",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Baxter",
        "shortname": "Harry",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3128",
          "addressline1": "32 NewStead",
          "state": "Vic",
          "suburb": "Box Hill",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Harry  Baxter",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Rob",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Hickor",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Hickory , Op",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "High",
        "shortname": "High H",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "1 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "High Harry",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Jackson",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jeeves",
        "shortname": "Jackso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3130",
          "addressline1": "32 Maybloom St",
          "state": "Vic",
          "suburb": "Blackburn",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jackson Jeeves",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "James",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Blundel",
        "shortname": "James",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "105 Molan St",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "James Blundel",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 92595200",
        "firstname": "Peter",
        "email": "support@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jamo",
        "shortname": "Jamiso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "105 Obest St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jamison",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "Janine",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Harrison",
        "shortname": "Janine",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "505 Canterbury Rd",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Janine Harrison",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9845 2545",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Ball",
        "shortname": "Jason",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "105 Stuart St",
          "state": "Vic",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jason Ball",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 696624"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "987 587",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Taite",
        "shortname": "Jason",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jason Taite",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "George",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jettson",
        "shortname": "Jettso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jettson George",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "john",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "rogers",
        "shortname": "John R",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "John Rogers",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9578 1234",
        "firstname": "Bill",
        "email": "bill@jones.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jones",
        "shortname": "Jones",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jones Bill",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0141 221 545"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Denis",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Walter",
        "shortname": "JVC Se",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "150 Grimstead St",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "JVC Services",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "408694626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Cathy",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Kane",
        "shortname": "Kane C",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "SA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Kane Cathy",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Dodgy",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "dave",
        "shortname": "Kris's",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Kris's Krispy Kebabs",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "999999",
        "firstname": "jo",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "bromly lodge"
        },
        "surname": "king",
        "shortname": "lala",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "9 Smith St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "bromly lodge"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "999999",
        "clientname": "lala",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "0408 694 626",
        "firstname": "Wayne",
        "email": "teamims@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Randal",
        "shortname": "LU Sim",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3802",
          "addressline1": "55 St Kilda RD",
          "state": "VIC",
          "suburb": "Sth Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "LU Simon",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "432659024",
        "firstname": "Georgina",
        "email": "jellis@nfe.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Tagliaferri",
        "shortname": "Manjim",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "6258",
          "addressline1": "Lot 1 Case Street",
          "state": "WA",
          "suburb": "Manjimup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Manjimip Gateway Hotel",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "92595200",
        "firstname": "Mary",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Robert-Smith",
        "shortname": "Mary R",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "31 Heatherdale Rd",
          "state": "Vic",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Mary Robert-Smith",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Accounts",
        "shortname": "Myer",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "ACT",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Myer",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Peter",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Rea",
        "shortname": "New Cl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "New Client PR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "New",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Test Client",
        "shortname": "New Te",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "New Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Bert",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Newton",
        "shortname": "Newton",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "12 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Newton Bert",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "John",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Newton",
        "shortname": "Newton",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "12 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Newton John",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "425789789",
        "firstname": "Michelle",
        "email": "mcooper@opmelbourne.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Cooper",
        "shortname": "OP Ind",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3133",
          "addressline1": "14 Trade Place",
          "state": "VIC",
          "suburb": "Vermont",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "OP Industries",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "418443364"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "35896655",
        "firstname": "Bob",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "level2 Building 3"
        },
        "surname": "Mansfield",
        "shortname": "OPTUS",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "160 Mary St",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "level2 Building 3"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "325896321",
        "clientname": "OPTUS",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "407816848"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Michael",
        "email": "michael.david.orr@me.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "6-Oct"
        },
        "surname": "Orr",
        "shortname": "Orrigi",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3121",
          "addressline1": "Lord Street",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Orriginal",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "402810043"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Rubie",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "G",
        "shortname": "rubie",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "rubie training WOO",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "12345678",
        "firstname": "Ruby-Gee",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "BeezNeez",
        "shortname": "Rubies",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "789456123",
        "clientname": "Rubies Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "2525252525"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Max",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Pain",
        "shortname": "Salta",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "9 Somewhere St",
          "state": "VIC",
          "suburb": "Summerset",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Salta",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "John",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Smith",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3550",
          "addressline1": "2 Grant St",
          "state": "Vic",
          "suburb": "Bendigo",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Smith John",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "SPOTLESS",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "SERVICES",
        "shortname": "SPOTLE",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "SPOTLESS SERVICES P/L",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Stuart",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Wisdom",
        "shortname": "Stuart",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3114",
          "addressline1": "305 Iolanthe Crt",
          "state": "Vic",
          "suburb": "Park Orchards",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Stuart Wisdom",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Paul",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Sunlan",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "95 Whitehorse Rd",
          "state": "VIC",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Sunland",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "test",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "test",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "client",
        "shortname": "test c",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1SQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "test client 23",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "88886666",
        "firstname": "Tony",
        "email": "t.a@test.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Richmond Building 1"
        },
        "surname": "Abbott",
        "shortname": "The Tr",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1SUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3121",
          "addressline1": "12 Bridge Road",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "The Training Company",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training account 123",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3128",
          "addressline1": "900 Whitehorse rd",
          "state": "VIC",
          "suburb": "Box Hill",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client 12",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "training client 43",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client 69",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Recieveable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "addres value",
          "state": "VIC",
          "suburb": "",
          "addressline2": "86 test street"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Company",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "training Company 43",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "TRANSFIELD",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "SERVICES",
        "shortname": "TRANSF",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "TRANSFIELD SERVICES",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "410696119",
        "firstname": "Adam",
        "email": "vanda@vandaconstructions.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Vanda",
        "shortname": "Vanda",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "2069",
          "addressline1": "62 Malvern Ave",
          "state": "NSW",
          "suburb": "Roseville",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Vanda Constructions",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9812 3456",
        "firstname": "Jona",
        "email": "JonaVark@mailserver.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Unit 3"
        },
        "surname": "Vark",
        "shortname": "Vark J",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "51 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Unit 3"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9812 3457",
        "clientname": "Vark Jona",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "5559999",
        "firstname": "Steven",
        "email": "carl@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Vodafo",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3144",
          "addressline1": "1 Street Road",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "5559998",
        "clientname": "Vodafone",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "400555555"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Wilma",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Wilmas",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "53 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Wilmas Windows",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Receivable",
        "shortname": "World",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "World For Kids Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9429 5001",
        "firstname": "Ronald",
        "email": "davidm@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Loft",
        "shortname": "Yarra",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3121",
          "addressline1": "134 Church ST",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "9429 5333",
        "clientname": "Yarra Valley Services",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "417948368"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Joe",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-09-05 09:08:24.58",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Bloggs",
        "shortname": "a test",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6SydRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-09-05 09:08:24.58",
        "fax": "",
        "clientname": "A test name",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-09-05 09:08:24.58",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-12 09:38:09.083",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6XyxRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-12 09:38:09.083",
        "fax": "03 XXXX XXXX",
        "clientname": "Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-12 09:38:09.083",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-23 14:12:27.283",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_2",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6WyBRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-23 14:12:27.283",
        "fax": "03 XXXX XXXX",
        "clientname": "A Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-23 14:12:27.283",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-30 09:42:21.527",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_4",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6WyNQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-30 09:42:21.527",
        "fax": "03 XXXX XXXX",
        "clientname": "A Test Client no country state",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "http://example.com",
        "datecreated": "2018-10-30 09:42:21.527",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-30 09:48:48.25",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_5",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6WyNQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-30 09:48:48.25",
        "fax": "03 XXXX XXXX",
        "clientname": "A Test Client no country state 2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "http://example.com",
        "datecreated": "2018-10-30 09:48:48.25",
        "mobile": "0400 XXX XXX"
      }
    ]
  }
}
```


---

### POST Create Location for Client

`POST http://api.aroflo.com/`

Create a new location for a client.

Make sure to set the `clientid` to a valid ID from your own AroFlo site. Multiple locations can be created in this method by using additional keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;JCdKUydSQCAgCg==<![CDATA[ 57 New St ]]><![CDATA[  ]]><![CDATA[ Ringwood ]]><![CDATA[ VIC ]]><![CDATA[ 3134 ]]><![CDATA[ Australia ]]><![CDATA[ STRING(2000) ]]><![CDATA[ 1300 794 818 ]]><![CDATA[ peter.mayhew@aroflo.com ]]>&#x27;)
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
        'zone=' + encodeURIComponent('clients')
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
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JCdKUydSQCAgCg==</clientid><locations><location><locationname><![CDATA[ 57 New St ]]></locationname><address><![CDATA[  ]]></address><suburb><![CDATA[ Ringwood ]]></suburb><state><![CDATA[ VIC ]]></state><postcode><![CDATA[ 3134 ]]></postcode><country><![CDATA[ Australia ]]></country><sitecontact><![CDATA[ Peter Mayhew ]]></sitecontact><sitephone><![CDATA[ 1300 794 818 ]]></sitephone><siteemail><![CDATA[ peter.mayhew@aroflo.com ]]></siteemail></location></locations></client></clients>')
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

#### Create Location for Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "clients": [
          {
            "locations": [
              {
                "locationid": "JSc6Qy1RPEAgCg==",
                "country_id": 14,
                "GPSLAT": -37.8198419,
                "postcode": "3134",
                "sitecontact": "STRING(2000)",
                "state": "VIC",
                "suburb": "Ringwood",
                "siteemail": "peter.mayhew@aroflo.com",
                "locationname": "57 New St",
                "state_id": 2,
                "country": "Australia",
                "GPSLONG": 145.2207638,
                "address": "",
                "sitephone": "1300 794 818"
              }
            ],
            "clientid": "JCdKUydSQCAgCg=="
          }
        ]
      },
      "inserttotal": 1,
      "inserts": {
        "clients": []
      }
    }
  }
}
```


### JOIN notes

**Authorization:** bearer


---

### GET Get Clients and Notes

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of clients and their locations.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('locations')
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
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('locations')
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

#### Get Clients and Notes (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 200,
    "queryresponsetimes": {
      "notes": 1,
      "orgs": 2,
      "clients": 44
    },
    "currentpageresults": 97,
    "clients": [
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Gerald",
        "email": "",
        "abn": "",
        "notes": [
          {
            "filter": "Internal Only",
            "timeposted": "Oct 2, 2023 10:09:01 AM",
            "noteid": "JScqWyNSTEAgCg==",
            "content": "<p>This is a HTML Client note</p>",
            "dateposted": "2023/10/02",
            "user": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            }
          }
        ],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "ACT",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Big Bloke",
        "shortname": "Caelli",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.82778",
          "country": "AUSTRALIA",
          "gpslong": "145.373255",
          "postcode": "3766",
          "addressline1": "70 Barbers Rd",
          "state": "VIC",
          "suburb": "Kalorama",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Caelli",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 00:00:00.0",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Charlie",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Kane",
        "shortname": "Charla",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "SA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Charlane Pty Ltd",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "07 1234 5678",
        "firstname": "Bob",
        "email": "bjones@whereever.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Building 1"
        },
        "surname": "Smith",
        "shortname": "City C",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-27.4689882",
          "country": "",
          "gpslong": "153.0306078",
          "postcode": "4000",
          "addressline1": "2 Jones Drive",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Building 1"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "City Council",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Fox",
        "shortname": "Client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Client 4 CBD",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "f",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "l",
        "shortname": "client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "client a",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Test",
        "email": "fake'e@fakeemail.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Client",
        "shortname": "Client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "WA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Client Test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "08 9301 1099",
        "firstname": "Ivan",
        "email": "bradley@aroflo.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Hoh",
        "shortname": "Crust",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-31.743055",
          "country": "AUSTRALIA",
          "gpslong": "115.7686175",
          "postcode": "6027",
          "addressline1": "Corner Boas Avenue & McLarty Street",
          "state": "WA",
          "suburb": "Joondalup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Crust Pizza",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 00:00:00.0",
        "mobile": "459488162"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1300254254",
        "firstname": "Jane",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Lvl 1"
        },
        "surname": "Smith",
        "shortname": "CSQ  D",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-27.4741083",
          "country": "",
          "gpslong": "153.0251918",
          "postcode": "4000",
          "addressline1": "75 Neville",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Lvl 1 75"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "732251111",
        "clientname": "CSQ  DLGPSR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "08 9755 5277",
        "firstname": "Nicolas",
        "email": "cellardoor@cullenwines.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Cleradin",
        "shortname": "Cullen",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-33.8179141",
          "country": "",
          "gpslong": "115.0389356",
          "postcode": "6280",
          "addressline1": "4323 Caves Road",
          "state": "WA",
          "suburb": "Wilyabrup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "08 9755 5550",
        "clientname": "Cullen Wines",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "850741",
        "firstname": "se",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Level 1"
        },
        "surname": "el",
        "shortname": "DNR",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-27.4697707",
          "country": "",
          "gpslong": "153.0251235",
          "postcode": "4001",
          "addressline1": "12 fdhgbfgn",
          "state": "QLD",
          "suburb": "brisbane",
          "addressline2": "fhsfrhfrghfrh"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "5252",
        "clientname": "DNR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 8888 4545",
        "firstname": "George",
        "email": "test@testemail.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Collingwood"
        },
        "surname": "Bush",
        "shortname": "Dodgey",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8062364",
          "country": "",
          "gpslong": "144.9830947",
          "postcode": "3066",
          "addressline1": "12 dodgey street",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Collingwood"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Dodgey Brothers",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0401 132 123"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1.23E+20",
        "firstname": "Homer",
        "email": "homer@simp.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Simpsonhjkhbjkhbjkh",
        "shortname": "Donut",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Donut King",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "joe",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "bloggs",
        "shortname": "Emily",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8114",
          "country": "AUSTRALIA",
          "gpslong": "145.2306",
          "postcode": "3134",
          "addressline1": "this is where i live",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Emily",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 00:00:00.0",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "321456987",
        "firstname": "Tim",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Lvl 1 Forestry House"
        },
        "surname": "Jones",
        "shortname": "EPA",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-27.4674302",
          "country": "",
          "gpslong": "153.0242068",
          "postcode": "4000",
          "addressline1": "160 Ann St",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Lvl 1 Forestry House"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "123456789",
        "clientname": "EPA",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "4321456987"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9497 1900",
        "firstname": "Bob",
        "email": "andrew.bantos@techtrac.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "E.C.C. Level 2, Building A"
        },
        "surname": "Smith",
        "shortname": "Exampl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.7703",
          "country": "",
          "gpslong": "145.0457",
          "postcode": "3079",
          "addressline1": "PO Box 232",
          "state": "Vic",
          "suburb": "Ivanhoe",
          "addressline2": "E.C.C. Level 2, Building A"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9497 1901",
        "clientname": "Example Commercial Customer",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0438 123 456"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Pebbles",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Flinst",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Flinstone & Co",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "391239123",
        "firstname": "Fred",
        "email": "fred@flinstone.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Freds",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.818021",
          "country": "",
          "gpslong": "145.220657",
          "postcode": "3134",
          "addressline1": "53 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Freds Floors",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "400123123"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Gibbs",
        "shortname": "Gibbs",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Gibbs Jason",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Baxter",
        "shortname": "Harry",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.0874984",
          "country": "",
          "gpslong": "144.1171694",
          "postcode": "3128",
          "addressline1": "32 NewStead",
          "state": "Vic",
          "suburb": "Box Hill",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Harry  Baxter",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Rob",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Hickor",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Hickory , Op",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "High",
        "shortname": "High H",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8115421",
          "country": "",
          "gpslong": "144.972715",
          "postcode": "3000",
          "addressline1": "1 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "High Harry",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Jackson",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jeeves",
        "shortname": "Jackso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8321592",
          "country": "",
          "gpslong": "145.1511906",
          "postcode": "3130",
          "addressline1": "32 Maybloom St",
          "state": "Vic",
          "suburb": "Blackburn",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jackson Jeeves",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "James",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Blundel",
        "shortname": "James",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.819568",
          "country": "",
          "gpslong": "145.2137569",
          "postcode": "3134",
          "addressline1": "105 Molan St",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "James Blundel",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 92595200",
        "firstname": "Peter",
        "email": "support@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jamo",
        "shortname": "Jamiso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8168945",
          "country": "",
          "gpslong": "145.2373769",
          "postcode": "3134",
          "addressline1": "105 Obest St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jamison",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "Janine",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Harrison",
        "shortname": "Janine",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8324326",
          "country": "",
          "gpslong": "145.220624",
          "postcode": "3134",
          "addressline1": "505 Canterbury Rd",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Janine Harrison",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9845 2545",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Ball",
        "shortname": "Jason",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8117885",
          "country": "",
          "gpslong": "145.1793214",
          "postcode": "3132",
          "addressline1": "105 Stuart St",
          "state": "Vic",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jason Ball",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 696624"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "987 587",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Taite",
        "shortname": "Jason",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jason Taite",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "George",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jettson",
        "shortname": "Jettso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jettson George",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "john",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "rogers",
        "shortname": "John R",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "John Rogers",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9578 1234",
        "firstname": "Bill",
        "email": "bill@jones.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jones",
        "shortname": "Jones",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jones Bill",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0141 221 545"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Denis",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Walter",
        "shortname": "JVC Se",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8107306",
          "country": "",
          "gpslong": "145.2273463",
          "postcode": "3134",
          "addressline1": "150 Grimstead St",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "JVC Services",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "408694626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Cathy",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Kane",
        "shortname": "Kane C",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "SA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Kane Cathy",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Dodgy",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "dave",
        "shortname": "Kris's",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Kris's Krispy Kebabs",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "999999",
        "firstname": "jo",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "bromly lodge"
        },
        "surname": "king",
        "shortname": "lala",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.7852109",
          "country": "",
          "gpslong": "145.2926609",
          "postcode": "3134",
          "addressline1": "9 Smith St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "bromly lodge"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "999999",
        "clientname": "lala",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "0408 694 626",
        "firstname": "Wayne",
        "email": "teamims@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Randal",
        "shortname": "LU Sim",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8591381",
          "country": "",
          "gpslong": "144.983668",
          "postcode": "3802",
          "addressline1": "55 St Kilda RD",
          "state": "VIC",
          "suburb": "Sth Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "LU Simon",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "432659024",
        "firstname": "Georgina",
        "email": "jellis@nfe.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Tagliaferri",
        "shortname": "Manjim",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-34.22728",
          "country": "",
          "gpslong": "116.1529178",
          "postcode": "6258",
          "addressline1": "Lot 1 Case Street",
          "state": "WA",
          "suburb": "Manjimup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Manjimip Gateway Hotel",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "92595200",
        "firstname": "Mary",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Robert-Smith",
        "shortname": "Mary R",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8197945",
          "country": "",
          "gpslong": "145.2135755",
          "postcode": "3132",
          "addressline1": "31 Heatherdale Rd",
          "state": "Vic",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Mary Robert-Smith",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Accounts",
        "shortname": "Myer",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "ACT",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Myer",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Peter",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Rea",
        "shortname": "New Cl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.818021",
          "country": "",
          "gpslong": "145.220657",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "New Client PR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "New",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Test Client",
        "shortname": "New Te",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "New Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Bert",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Newton",
        "shortname": "Newton",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.811297",
          "country": "",
          "gpslong": "144.972527",
          "postcode": "3000",
          "addressline1": "12 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Newton Bert",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "John",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Newton",
        "shortname": "Newton",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.811297",
          "country": "",
          "gpslong": "144.972527",
          "postcode": "3000",
          "addressline1": "12 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Newton John",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "425789789",
        "firstname": "Michelle",
        "email": "mcooper@opmelbourne.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Cooper",
        "shortname": "OP Ind",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.834371",
          "country": "",
          "gpslong": "145.185994",
          "postcode": "3133",
          "addressline1": "14 Trade Place",
          "state": "VIC",
          "suburb": "Vermont",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "OP Industries",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "418443364"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "35896655",
        "firstname": "Bob",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "level2 Building 3"
        },
        "surname": "Mansfield",
        "shortname": "OPTUS",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-27.4707667",
          "country": "",
          "gpslong": "153.0284625",
          "postcode": "4000",
          "addressline1": "160 Mary St",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "level2 Building 3"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "325896321",
        "clientname": "OPTUS",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "407816848"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Michael",
        "email": "michael.david.orr@me.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "6-Oct"
        },
        "surname": "Orr",
        "shortname": "Orrigi",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8226771",
          "country": "",
          "gpslong": "145.0045807",
          "postcode": "3121",
          "addressline1": "Lord Street",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Orriginal",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "402810043"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Rubie",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "G",
        "shortname": "rubie",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "rubie training WOO",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "12345678",
        "firstname": "Ruby-Gee",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "BeezNeez",
        "shortname": "Rubies",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "789456123",
        "clientname": "Rubies Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "2525252525"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Max",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Pain",
        "shortname": "Salta",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8152065",
          "country": "",
          "gpslong": "144.963937",
          "postcode": "3000",
          "addressline1": "9 Somewhere St",
          "state": "VIC",
          "suburb": "Summerset",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Salta",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "John",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Smith",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-36.741702",
          "country": "",
          "gpslong": "144.2563332",
          "postcode": "3550",
          "addressline1": "2 Grant St",
          "state": "Vic",
          "suburb": "Bendigo",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Smith John",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "SPOTLESS",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "SERVICES",
        "shortname": "SPOTLE",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "SPOTLESS SERVICES P/L",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Stuart",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Wisdom",
        "shortname": "Stuart",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.7710743",
          "country": "",
          "gpslong": "145.2254561",
          "postcode": "3114",
          "addressline1": "305 Iolanthe Crt",
          "state": "Vic",
          "suburb": "Park Orchards",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Stuart Wisdom",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Paul",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Sunlan",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8172813",
          "country": "",
          "gpslong": "145.1901869",
          "postcode": "3132",
          "addressline1": "95 Whitehorse Rd",
          "state": "VIC",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Sunland",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "test",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "test",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "client",
        "shortname": "test c",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1SQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "test client 23",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "88886666",
        "firstname": "Tony",
        "email": "t.a@test.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Richmond Building 1"
        },
        "surname": "Abbott",
        "shortname": "The Tr",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1SUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.817779",
          "country": "",
          "gpslong": "144.990526",
          "postcode": "3121",
          "addressline1": "12 Bridge Road",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "The Training Company",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training account 123",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.81751",
          "country": "",
          "gpslong": "145.118222",
          "postcode": "3128",
          "addressline1": "900 Whitehorse rd",
          "state": "VIC",
          "suburb": "Box Hill",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client 12",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "training client 43",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client 69",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Recieveable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.4713077",
          "country": "",
          "gpslong": "144.7851531",
          "postcode": "",
          "addressline1": "addres value",
          "state": "VIC",
          "suburb": "",
          "addressline2": "86 test street"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Company",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "training Company 43",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "TRANSFIELD",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "SERVICES",
        "shortname": "TRANSF",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "TRANSFIELD SERVICES",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "410696119",
        "firstname": "Adam",
        "email": "vanda@vandaconstructions.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Vanda",
        "shortname": "Vanda",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-33.7803978",
          "country": "",
          "gpslong": "151.1980767",
          "postcode": "2069",
          "addressline1": "62 Malvern Ave",
          "state": "NSW",
          "suburb": "Roseville",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Vanda Constructions",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9812 3456",
        "firstname": "Jona",
        "email": "JonaVark@mailserver.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Unit 3"
        },
        "surname": "Vark",
        "shortname": "Vark J",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8177723",
          "country": "",
          "gpslong": "145.2208069",
          "postcode": "3134",
          "addressline1": "51 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Unit 3"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9812 3457",
        "clientname": "Vark Jona",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "5559999",
        "firstname": "Steven",
        "email": "carl@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Vodafo",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8112316",
          "country": "",
          "gpslong": "145.2365685",
          "postcode": "3144",
          "addressline1": "1 Street Road",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "5559998",
        "clientname": "Vodafone",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "400555555"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Wilma",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Wilmas",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.818021",
          "country": "",
          "gpslong": "145.220657",
          "postcode": "3134",
          "addressline1": "53 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Wilmas Windows",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Receivable",
        "shortname": "World",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "World For Kids Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9429 5001",
        "firstname": "Ronald",
        "email": "davidm@i-man.com.au",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Loft",
        "shortname": "Yarra",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8151412",
          "country": "",
          "gpslong": "144.9994858",
          "postcode": "3121",
          "addressline1": "134 Church ST",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "9429 5333",
        "clientname": "Yarra Valley Services",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "417948368"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-12 09:38:09.083",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6XyxRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.817927",
          "country": "Australia",
          "gpslong": "145.2159955",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-12 09:38:09.083",
        "fax": "03 XXXX XXXX",
        "clientname": "Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-12 09:38:09.083",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-23 14:12:27.283",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_2",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6WyBRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.817927",
          "country": "Australia",
          "gpslong": "145.2159955",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-23 14:12:27.283",
        "fax": "03 XXXX XXXX",
        "clientname": "A Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-23 14:12:27.283",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-30 09:42:21.527",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_4",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6WyNQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.817927",
          "country": "Australia",
          "gpslong": "145.2159955",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-30 09:42:21.527",
        "fax": "03 XXXX XXXX",
        "clientname": "A Test Client no country state",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "http://example.com",
        "datecreated": "2018-10-30 09:42:21.527",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2018-10-30 09:48:48.25",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "NSW",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_5",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6WyNQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.817927",
          "country": "AUSTRALIA",
          "gpslong": "145.2159955",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-30 09:48:48.25",
        "fax": "03 XXXX XXXX",
        "clientname": "A Test Client no country state 2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "http://example.com",
        "datecreated": "2018-10-30 00:00:00.0",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Zapier",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-05 14:25:03.033",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "HMAC",
        "shortname": "zapier",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QTFggCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-05 14:25:03.033",
        "fax": "",
        "clientname": "Zapier HMAC Test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-05 14:25:03.033",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Zapier",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-05 14:27:20.837",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "HMAC",
        "shortname": "zapi_1",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QTFwgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-05 14:27:20.837",
        "fax": "",
        "clientname": "Zapier HMAC Test1",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-05 14:27:20.837",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Zapier",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-05 14:30:17.81",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "HMAC",
        "shortname": "zapi_2",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QTEAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-05 14:30:17.81",
        "fax": "",
        "clientname": "Zapier HMAC Test2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-05 14:30:17.81",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Zapier",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-05 14:38:47.64",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "HMAC",
        "shortname": "zapi_3",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QTEQgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-05 14:38:47.64",
        "fax": "",
        "clientname": "Zapier Test 3",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-05 14:38:47.64",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Zapier",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-05 14:41:37.73",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "HMAC",
        "shortname": "zapi_4",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QTEggCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-05 14:41:37.73",
        "fax": "",
        "clientname": "Zapier Test 4",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-05 14:41:37.73",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Joe",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-09 07:47:59.763",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "testy",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QTDQgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 07:47:59.763",
        "fax": "",
        "clientname": "Testy McTest 20190909-1",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 07:47:59.763",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Joe",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-09 08:19:09.033",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_1",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QXFAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 08:19:09.033",
        "fax": "",
        "clientname": "Testy McTest 20190909-2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 08:19:09.033",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Joe",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-09-09 09:10:12.343",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_2",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QXFQgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 09:10:12.343",
        "fax": "",
        "clientname": "Testy McTest 20190909-3",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 09:10:12.343",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Joe",
        "email": "undefined",
        "abn": "undefined",
        "notes": [],
        "datetimeinserted": "2019-09-09 10:03:45.92",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_3",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QXFggCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 10:03:45.92",
        "fax": "undefined",
        "clientname": "Testy McTest 20190909-4",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 10:03:45.92",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Joe",
        "email": "undefined",
        "abn": "undefined",
        "notes": [],
        "datetimeinserted": "2019-09-09 10:10:17.3",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_4",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QXEAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 10:10:17.3",
        "fax": "undefined",
        "clientname": "Testy McTest 20190909-5",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 10:10:17.3",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Joe",
        "email": "undefined",
        "abn": "undefined",
        "notes": [],
        "datetimeinserted": "2019-09-09 10:12:09.51",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_5",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QXEQgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 10:12:09.51",
        "fax": "undefined",
        "clientname": "Testy McTest 20190909-6",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 10:12:09.51",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Joe",
        "email": "undefined",
        "abn": "undefined",
        "notes": [],
        "datetimeinserted": "2019-09-09 10:12:53.883",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_6",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QXEggCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 10:12:53.883",
        "fax": "undefined",
        "clientname": "Testy McTest 20190909-7",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 10:12:53.883",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Joe",
        "email": "undefined",
        "abn": "undefined",
        "notes": [],
        "datetimeinserted": "2019-09-09 10:16:16.13",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_7",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaUy1QXEwgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 10:16:16.13",
        "fax": "undefined",
        "clientname": "Testy McTest 20190909-8",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 10:16:16.13",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Joe",
        "email": "undefined",
        "abn": "undefined",
        "notes": [],
        "datetimeinserted": "2019-09-09 10:23:57.7",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Mignola",
        "shortname": "test_8",
        "termsnote": "",
        "terms": "",
        "orgs": [],
        "customfields": [],
        "clientid": "JSZaUy1QXDAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "Australia",
          "gpslong": "0",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2019-09-09 10:23:57.7",
        "fax": "undefined",
        "clientname": "Testy McTest 20190909-9",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-09-09 10:23:57.7",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Joe",
        "email": "undefined",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2019-11-26 11:34:34.107",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "undefined",
          "postcode": "undefined",
          "addressline1": "undefined",
          "state": "",
          "suburb": "undefined",
          "addressline2": "undefined"
        },
        "surname": "Blogs",
        "shortname": "my cra",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSZaKyxQTFQgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "undefined",
          "gpslong": "0",
          "postcode": "undefined",
          "addressline1": "undefined",
          "state": "",
          "suburb": "undefined",
          "addressline2": "undefined"
        },
        "priorities": [],
        "dateinserted": "2019-11-26 11:34:34.107",
        "fax": "undefined",
        "clientname": "My Crazy new Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2019-11-26 11:34:34.107",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Testy",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2020-02-06 15:19:14.14",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "undefined",
          "addressline1": "undefined",
          "state": "NSW",
          "suburb": "undefined",
          "addressline2": "undefined"
        },
        "surname": "McTester",
        "shortname": "test_9",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "true"
          }
        ],
        "customfields": [],
        "clientid": "JSc6QyFRXFwgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "AUSTRALIA",
          "gpslong": "0",
          "postcode": "undefined",
          "addressline1": "undefined",
          "state": "NSW",
          "suburb": "undefined",
          "addressline2": "undefined"
        },
        "priorities": [],
        "dateinserted": "2020-02-06 15:19:14.14",
        "fax": "undefined",
        "clientname": "Testy McTester1",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2020-02-06 00:00:00.0",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "undefined",
        "firstname": "Testy",
        "email": "undefined",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2020-02-06 15:29:38.52",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "undefined",
          "postcode": "undefined",
          "addressline1": "undefined",
          "state": "",
          "suburb": "undefined",
          "addressline2": "undefined"
        },
        "surname": "McTester",
        "shortname": "tes_10",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSc6QyFRXEAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "0",
          "country": "undefined",
          "gpslong": "0",
          "postcode": "undefined",
          "addressline1": "undefined",
          "state": "",
          "suburb": "undefined",
          "addressline2": "undefined"
        },
        "priorities": [],
        "dateinserted": "2020-02-06 15:29:38.52",
        "fax": "undefined",
        "clientname": "Testy McTester",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2020-02-06 15:29:38.52",
        "mobile": "undefined"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 1234 5678",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2020-09-24 14:44:25.66",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_7",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSc6LyRSTEwgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.817927",
          "country": "Australia",
          "gpslong": "145.2159955",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2020-09-24 14:44:25.66",
        "fax": "03 XXXX XXXX",
        "clientname": "A second Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "http://example.com",
        "datecreated": "2020-09-24 14:44:25.66",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Test First",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2020-12-10 15:39:21.49",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Test Surname",
        "shortname": "tes_12",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JScqSyNSTFggCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-25.274398",
          "country": "Australia",
          "gpslong": "133.775136",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2020-12-10 15:39:21.49",
        "fax": "",
        "clientname": "Test Client1",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2020-12-10 15:39:21.49",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1300 723 388",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2021-02-26 08:49:25.0",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "3975",
          "addressline1": "941 Thompsons Road",
          "state": "VIC",
          "suburb": "Lyndhurst",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "dan mu",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JScqRyRRTEwgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-38.0784886",
          "country": "AUSTRALIA",
          "gpslong": "145.2504982",
          "postcode": "3975",
          "addressline1": "941 Thompsons Road",
          "state": "VIC",
          "suburb": "Lyndhurst",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2021-02-26 08:49:25.0",
        "fax": "",
        "clientname": "Dan Murphy's Marriott Waters",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "https://www.danmurphys.com.au/Stores/VIC-Marriott-Waters-3085?e_cid=os:gmb:yext:3085:Dan-Murphy's-Marriott-Waters",
        "datecreated": "2021-02-26 08:49:25.0",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "(03) 9870 1402",
        "firstname": "Accounts",
        "email": "beejay@bristowstagg.net",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2021-02-26 08:52:56.76",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "3134",
          "addressline1": "59-65 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "ringwo",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JScqRyRRTDAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.8155855",
          "country": "AUSTRALIA",
          "gpslong": "145.2222957",
          "postcode": "3134",
          "addressline1": "59-65 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2021-02-26 08:52:56.76",
        "fax": "",
        "clientname": "Ringwood Square Shopping Centre",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "https://ringwoodsquare.com.au/",
        "datecreated": "2021-02-26 00:00:00.0",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "datetimeinserted": "2022-07-18 14:05:56.287",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl_8",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSdKQyZRLEggCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-37.817927",
          "country": "Australia",
          "gpslong": "145.2159955",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2022-07-18 14:05:56.287",
        "fax": "03 XXXX XXXX",
        "clientname": "A Test Client1",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "http://example.com",
        "datecreated": "2022-07-18 14:05:56.287",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Given Names",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2022-11-16 14:18:45.507",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "surNames",
        "shortname": "clie_1",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JSdKXyRQTEAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "gpslat": "-25.274398",
          "country": "Australia",
          "gpslong": "133.775136",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2022-11-16 14:18:45.507",
        "fax": "",
        "clientname": "Client Name",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2022-11-16 14:18:45.507",
        "mobile": ""
      }
    ]
  }
}
```


### JOIN locationcustomfields

This particular JOIN operation also requires that you join `locations` as well.

**Authorization:** bearer


---

### GET Get Locations and LocationCustomFields for Client

`GET https://api.aroflo.com/{{urlVarString}}`

Get the locations for a specific client and include the custom fields for those locations

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('locations,locationcustomfields')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('locations,locationcustomfields')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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

#### Get Locations and LocationCustomFields for Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "locations": 1,
      "orgs": 1,
      "customfields": 4,
      "clients": 47
    },
    "currentpageresults": 1,
    "clients": [
      {
        "contacts": [],
        "locations": [
          {
            "locationid": "43153",
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
            "archived": "FALSE",
            "SitePhone": ""
          }
        ],
        "phone": "",
        "firstname": "Mriam",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Makehba",
        "shortname": "#1 Lad",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "true",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "22222",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "11111"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "#1 Ladies, Detective Agency",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      }
    ]
  }
}
```


### JOIN contacts

**Authorization:** bearer


---

### GET Get active Contacts for Client

`GET https://api.aroflo.com/{{urlVarString}}`

Return the list of active (not archived) contacts for a specific client.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('contacts')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
        ,'where=' + encodeURIComponent('and|archived|=|false')
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
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('contacts')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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

#### Get Contacts for Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "contacts": 6,
      "orgs": 2,
      "clients": 3
    },
    "currentpageresults": 1,
    "clients": [
      {
        "contacts": [
          {
            "surname": "Makehba",
            "givennames": "Mriam",
            "phone": "",
            "userid": "JCQ6XyVRMCAgCg==",
            "username": "D63AAD35-D03E-45D9-80FB-5120DA9AE99D",
            "archived": "false",
            "fax": "",
            "email": "",
            "email2": "",
            "mobile": ""
          }
        ],
        "locations": [],
        "phone": "",
        "firstname": "Mriam",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Makehba",
        "shortname": "#1 Lad",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "true",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "22222",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "11111"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "#1 Ladies, Detective Agency",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      }
    ]
  }
}
```


---

### POST Create Contact for Client

`POST http://api.aroflo.com/`

Create a new contact for a client. Make sure to set the `` to a valid ID from your own AroFlo site. Multiple contacts can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'postxml=' + encodeURIComponent('JCdKUydRMCAgCg==<![CDATA[ Jason ]]><![CDATA[ Bourne ]]><![CDATA[ 1300 794 818 ]]><![CDATA[ 03 XXXX XXXX ]]><![CDATA[ 04XX XXX XXX ]]><![CDATA[ jason.bourne@aroflo.com ]]>')
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
        'zone=' + encodeURIComponent('clients')
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
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JCdKUydRMCAgCg==</clientid><contacts><contact><givennames><![CDATA[ Jason ]]></givennames><surname><![CDATA[ Bourne ]]></surname><phone><![CDATA[ 1300 794 818 ]]></phone><fax><![CDATA[ 03 XXXX XXXX ]]></fax><mobile><![CDATA[ 04XX XXX XXX ]]></mobile><email><![CDATA[ jason.bourne@aroflo.com ]]></email></contact></contacts></client></clients>')
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

#### Create Contact for Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "clients": [
          {
            "contacts": [
              {
                "surname": "Bourne",
                "givennames": "Jason",
                "phone": "1300 794 818",
                "userid": "JCQqWyVSQCAgCg==",
                "fax": "03 XXXX XXXX",
                "email": "jason.bourne@aroflo.com",
                "CLIENTID": "7737",
                "mobile": "04XX XXX XXX"
              }
            ],
            "clientid": "JCdKUydRMCAgCg=="
          }
        ]
      },
      "inserttotal": 1,
      "inserts": {
        "clients": []
      }
    }
  }
}
```


---

### POST Update Contacts for Client

`POST http://api.aroflo.com/`

Update an existing contact for a client. Make sure to set the `` to a valid ID from your own AroFlo site. 

Multiple contacts can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'postxml=' + encodeURIComponent('JCdKUydRMCAgCg==JCQqWyVSQCAgCg==<![CDATA[ jason.bourne@aroflo.com ]]>JCQ6XyVRMCAgCg==<![CDATA[ mriam.makehba@aroflo.com ]]>')
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
        'zone=' + encodeURIComponent('clients')
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
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JCdKUydRMCAgCg==</clientid><contacts><contact><userid>JCQqWyVSQCAgCg==</userid><email><![CDATA[ jason.bourne@aroflo.com ]]></email></contact><contact><userid>JCQ6XyVRMCAgCg==</userid><email><![CDATA[ mriam.makehba@aroflo.com ]]></email></contact></contacts></client></clients>')
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

#### Update Contacts for Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 3,
      "errors": [],
      "updates": {
        "clients": [
          {
            "contacts": [
              {
                "userid": "JCQqWyVSQCAgCg==",
                "email": "jason.bourne@aroflo.com",
                "CLIENTID": "7737"
              },
              {
                "userid": "JCQ6XyVRMCAgCg==",
                "email": "mriam.makehba@aroflo.com",
                "CLIENTID": "7737"
              }
            ],
            "clientid": "JCdKUydRMCAgCg=="
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "clients": []
      }
    }
  }
}
```


---

### POST Archive a Contact

`POST http://api.aroflo.com/`

Archive an existing Contact as they are no longer valid for that client.

Make sure to set the `` to a valid ID from your own AroFlo site. Multiple contacts can be created in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('contacts')
        ,'postxml=' + encodeURIComponent('JCdKUydRMCAgCg==JCQ6XyVRMCAgCg==true')
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
        'zone=' + encodeURIComponent('clients')
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
        ,'join=' + encodeURIComponent('contacts')
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JCdKUydRMCAgCg==</clientid><contacts><contact><userid>JCQ6XyVRMCAgCg==</userid><archived>true</archived></contact></contacts></client></clients>')
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

#### Archive a Contact (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 2,
      "errors": [],
      "updates": {
        "clients": [
          {
            "contacts": [
              {
                "userid": "JCQ6XyVRMCAgCg==",
                "archived": "true",
                "CLIENTID": "7737"
              }
            ],
            "clientid": "JCdKUydRMCAgCg=="
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "clients": []
      }
    }
  }
}
```


### JOIN customfields

**Authorization:** bearer


---

### GET Get CustomFields for a particular Client

`GET https://api.aroflo.com/{{urlVarString}}`

Return the client specific customfield information.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('customfields')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('customfields')
        ,'where=' + encodeURIComponent('and|archived|=|false')
        ,'page=' + encodeURIComponent('1')
        ,'pageSize=' + encodeURIComponent('500')
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

#### Get CustomFields for a particular Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "orgs": 2,
      "customfields": 6,
      "clients": 2
    },
    "currentpageresults": 1,
    "clients": [
      {
        "contacts": [],
        "locations": [],
        "phone": "1300 794 818",
        "firstname": "Jason",
        "email": "jason.bourne@aroflo.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Bourne",
        "shortname": "#1 Lad",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [
          {
            "fieldid": "JCZaVyVQUCAgCg==",
            "value": "Word of Mouth",
            "archived": "false",
            "type": "Select",
            "name": "Ad Source"
          }
        ],
        "clientid": "JCdKUydRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "true",
        "address": {
          "country": "AUSTRALIA",
          "postcode": "3134",
          "addressline1": "22222",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "11111"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 XXXX XXXX",
        "clientname": "#1 Ladies, Detective Agency",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 00:00:00.0",
        "mobile": "04XX XXX XXX"
      }
    ]
  }
}
```


---

### POST Update Client Custom Field

`POST http://api.aroflo.com/`

The Client Custom Fields can be updated using either the `fieldid` or `name` field.

Multiple custom fields can be updated in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'postxml=' + encodeURIComponent('JCdKUydRMCAgCg==<![CDATA[ Ad Source ]]><![CDATA[ Google ]]>')
    ];
    formVarString = formVarString.join('&');
}

```
In this example we are using the custom field `name` as the identifier.

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
        'zone=' + encodeURIComponent('clients')
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
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JCdKUydRMCAgCg==</clientid><customfields><customfield><value><![CDATA[ Google ]]></value><name><![CDATA[ Ad Source ]]></name></customfield></customfields></client></clients>')
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

#### Update Client Custom Field (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "clients": [
          {
            "customfields": [
              {
                "FIELDID": "JCZaVyVQUCAgCg==",
                "value": "Google",
                "CLIENTID": "JCdKUydRMCAgCg==",
                "name": "Ad Source"
              }
            ],
            "clientid": "JCdKUydRMCAgCg=="
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "clients": []
      }
    }
  }
}
```


### JOIN priorities

**Authorization:** bearer


---

### GET Get Priorities for a particular Client

`GET https://api.aroflo.com/{{urlVarString}}`

Return the client specific priority information.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('priorities')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('priorities')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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

#### Get Priorities for a particular Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "priorities": 4,
      "orgs": 1,
      "clients": 44
    },
    "currentpageresults": 1,
    "clients": [
      {
        "contacts": [],
        "locations": [],
        "phone": "1300 794 818",
        "firstname": "Jason",
        "email": "jason.bourne@aroflo.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Bourne",
        "shortname": "#1 Lad",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "true",
        "address": {
          "country": "AUSTRALIA",
          "postcode": "3134",
          "addressline1": "22222",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "11111"
        },
        "priorities": [
          {
            "priorityid": "IyYqKyIK",
            "description": "0",
            "responseminutes": "0",
            "archived": "false",
            "shortdescription": "p1"
          },
          {
            "priorityid": "IyYqKyMK",
            "description": "1",
            "responseminutes": "0",
            "archived": "false",
            "shortdescription": "p2"
          },
          {
            "priorityid": "IyYqKywK",
            "description": "2",
            "responseminutes": "0",
            "archived": "false",
            "shortdescription": "p3"
          }
        ],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 XXXX XXXX",
        "clientname": "#1 Ladies, Detective Agency",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 00:00:00.0",
        "mobile": "04XX XXX XXX"
      }
    ]
  }
}
```


### JOIN documentsandphotos

**Authorization:** bearer


---

### GET Get DocumentsAndPhotos for a particular Client

`GET https://api.aroflo.com/{{urlVarString}}`

Return the client specific priority information.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('priorities')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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
        'zone=' + encodeURIComponent('clients')
        ,'join=' + encodeURIComponent('documentsandphotos')
        ,'where=' + encodeURIComponent('and|clientid|=|JCdKUydRMCAgCg==')
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

#### Get DocumentsAndPhotos for a particular Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": 500,
    "pagenumber": "1",
    "generatedisplayresponsetime": 1,
    "queryresponsetimes": {
      "documentsandphotos": 8,
      "orgs": 2,
      "clients": 4
    },
    "currentpageresults": 1,
    "clients": [
      {
        "contacts": [],
        "locations": [],
        "phone": "03 1234 5678",
        "firstname": "Jason",
        "email": "bradley@aroflo.com",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [
          {
            "documentid": "JScqTyNSXEAgCg==",
            "sizeinbytes": "82960",
            "uploadeddatetime": "2023/10/01 23:19:41",
            "uploadedbyuser": {
              "userid": "JCQ6XyRRUCAgCg==",
              "username": "Commander Shepard"
            },
            "filter": "Internal Only",
            "comment": "",
            "url": "https://office.aroflo.com/DocStorage/BGRF-BTUK-original?expires=1696202993&signature=66CA2145D2E77146D8CEE66D5220FB888EE050D77719F0983526C9A3AADF013C",
            "name": "cute_stitch.jpg"
          }
        ],
        "link": {
          "orgid": "JCdKUydRMCAgCg==",
          "orgname": "#1 Ladies, Detective Agency",
          "externalid": "057f346d-f773-41b2-b19a-330a4fe3c864"
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Bourne",
        "shortname": "#1 Lad",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox BU",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydRMCAgCg==",
        "postable": "FALSE",
        "usecustompriorities": "true",
        "address": {
          "gpslat": "-37.8127302",
          "country": "AUSTRALIA",
          "gpslong": "145.229028",
          "postcode": "3134",
          "addressline1": "22222",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "11111"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 XXXX XXXX",
        "clientname": "#1 Ladies, Detective Agency",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 00:00:00.0",
        "mobile": "04XX XXX XXX"
      }
    ]
  }
}
```


---

### GET Get "Postable"/Updated Clients

`GET https://api.aroflo.com/{{urlVarString}}`

This returns the first page of Clients who have had details updated in AroFlo by filtering on the "postable" field.

The postable flag is set whenever a client is created or updated in the AroFlo interface. This is the best flag to use to keep you client data in sync as you should only be getting the data that has been updated

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'where=' + encodeURIComponent('and|postable|=|true')
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
const crypto = require('crypto-js');

//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'where=' + encodeURIComponent('and|postable|=|true')
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

#### Get "Postable"/Updated Clients (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "orgs": 6,
      "clients": 81
    },
    "currentpageresults": 80,
    "clients": [
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Mriam",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Makehba",
        "shortname": "#1 Lad",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "true",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "22222",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "11111"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "#1 Ladies, Detective Agency",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1300 794 818",
        "firstname": "Mike",
        "email": "arnegger@gmail.com",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Level 1"
        },
        "surname": "Phillips",
        "shortname": "Aardva",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "PO BOX 3124",
          "state": "VIC",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9873 1620",
        "clientname": "Aardvaark ConsultantsCLR2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03-9259-5200 Tanya",
        "firstname": "Alan",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Building 1"
        },
        "surname": "Bull",
        "shortname": "ABC Bu",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "50 Market St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "ABC Building",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Andrew",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "ABC Pl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "ABC Plumbing Sydney",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Test",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Test",
        "shortname": "Andrea",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "10 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Andrea Test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Joe",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Example",
        "shortname": "Bendig",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3570",
          "addressline1": "PO Box 1",
          "state": "VIC",
          "suburb": "Bendigo",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Bendigo Primary School",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "(02) 6549 8712",
        "firstname": "Bob",
        "email": "gimme234223@hotmail.com",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Big Bo",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "7425",
          "addressline1": "25 Big St",
          "state": "NSW",
          "suburb": "Big Town",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "69854721",
        "clientname": "Big Bobs Bits",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "421158798"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Susan",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Bovis",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Bovis",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Gerald",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Big Bloke",
        "shortname": "Caelli",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3766",
          "addressline1": "70 Barbers Rd",
          "state": "VIC",
          "suburb": "Kalorama",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Caelli",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Charlie",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Kane",
        "shortname": "Charla",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "SA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Charlane Pty Ltd",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "07 1234 5678",
        "firstname": "Bob",
        "email": "bjones@whereever.com",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Building 1"
        },
        "surname": "Smith",
        "shortname": "City C",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "2 Jones Drive",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Building 1"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "City Council",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Fox",
        "shortname": "Client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Client 4 CBD",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "f",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "l",
        "shortname": "client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyBSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "client a",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Test",
        "email": "fake'e@fakeemail.com",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Client",
        "shortname": "Client",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "WA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Client Test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "08 9301 1099",
        "firstname": "Ivan",
        "email": "joondalup@crust.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Hoh",
        "shortname": "Crust",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "6027",
          "addressline1": "Corner Boas Avenue & McLarty Street",
          "state": "WA",
          "suburb": "Joondalup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Crust Pizza",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "459488162"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1300254254",
        "firstname": "Jane",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Lvl 1"
        },
        "surname": "Smith",
        "shortname": "CSQ  D",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "75 Neville",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Lvl 1 75"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "732251111",
        "clientname": "CSQ  DLGPSR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "08 9755 5277",
        "firstname": "Nicolas",
        "email": "cellardoor@cullenwines.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Cleradin",
        "shortname": "Cullen",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "6280",
          "addressline1": "4323 Caves Road",
          "state": "WA",
          "suburb": "Wilyabrup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "08 9755 5550",
        "clientname": "Cullen Wines",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "850741",
        "firstname": "se",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Level 1"
        },
        "surname": "el",
        "shortname": "DNR",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4001",
          "addressline1": "12 fdhgbfgn",
          "state": "QLD",
          "suburb": "brisbane",
          "addressline2": "fhsfrhfrghfrh"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "5252",
        "clientname": "DNR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 8888 4545",
        "firstname": "George",
        "email": "test@testemail.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Collingwood"
        },
        "surname": "Bush",
        "shortname": "Dodgey",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3066",
          "addressline1": "12 dodgey street",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Collingwood"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Dodgey Brothers",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0401 132 123"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "1.23E+20",
        "firstname": "Homer",
        "email": "homer@simp.com",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Simpsonhjkhbjkhbjkh",
        "shortname": "Donut",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Donut King",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "joe",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "bloggs",
        "shortname": "Emily",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "this is where i live",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Emily",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "321456987",
        "firstname": "Tim",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Lvl 1 Forestry House"
        },
        "surname": "Jones",
        "shortname": "EPA",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "160 Ann St",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "Lvl 1 Forestry House"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "123456789",
        "clientname": "EPA",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "4321456987"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9497 1900",
        "firstname": "Bob",
        "email": "andrew.bantos@techtrac.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "E.C.C. Level 2, Building A"
        },
        "surname": "Smith",
        "shortname": "Exampl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyFSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3079",
          "addressline1": "PO Box 232",
          "state": "Vic",
          "suburb": "Ivanhoe",
          "addressline2": "E.C.C. Level 2, Building A"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9497 1901",
        "clientname": "Example Commercial Customer",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0438 123 456"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Pebbles",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Flinst",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Flinstone & Co",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "391239123",
        "firstname": "Fred",
        "email": "fred@flinstone.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Freds",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "53 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Freds Floors",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "400123123"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Gibbs",
        "shortname": "Gibbs",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Gibbs Jason",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Baxter",
        "shortname": "Harry",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3128",
          "addressline1": "32 NewStead",
          "state": "Vic",
          "suburb": "Box Hill",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Harry  Baxter",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Rob",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Hickor",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Hickory , Op",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Harry",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "High",
        "shortname": "High H",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "1 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "High Harry",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Jackson",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jeeves",
        "shortname": "Jackso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3130",
          "addressline1": "32 Maybloom St",
          "state": "Vic",
          "suburb": "Blackburn",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jackson Jeeves",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "James",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Blundel",
        "shortname": "James",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "105 Molan St",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "James Blundel",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 92595200",
        "firstname": "Peter",
        "email": "support@i-man.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jamo",
        "shortname": "Jamiso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "105 Obest St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jamison",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9872 6612",
        "firstname": "Janine",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Harrison",
        "shortname": "Janine",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyJSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "505 Canterbury Rd",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Janine Harrison",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694 626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9845 2545",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Ball",
        "shortname": "Jason",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "105 Stuart St",
          "state": "Vic",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jason Ball",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 696624"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "987 587",
        "firstname": "Jason",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Taite",
        "shortname": "Jason",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jason Taite",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "George",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jettson",
        "shortname": "Jettso",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jettson George",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "john",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "rogers",
        "shortname": "John R",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "John Rogers",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9578 1234",
        "firstname": "Bill",
        "email": "bill@jones.com",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Jones",
        "shortname": "Jones",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Jones Bill",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0141 221 545"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Denis",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Walter",
        "shortname": "JVC Se",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "150 Grimstead St",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "JVC Services",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "408694626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Cathy",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Kane",
        "shortname": "Kane C",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "SA",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Kane Cathy",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Dodgy",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "dave",
        "shortname": "Kris's",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Kris's Krispy Kebabs",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "999999",
        "firstname": "jo",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "bromly lodge"
        },
        "surname": "king",
        "shortname": "lala",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "9 Smith St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "bromly lodge"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "999999",
        "clientname": "lala",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "0408 694 626",
        "firstname": "Wayne",
        "email": "teamims@i-man.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Randal",
        "shortname": "LU Sim",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyNSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3802",
          "addressline1": "55 St Kilda RD",
          "state": "VIC",
          "suburb": "Sth Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "LU Simon",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "432659024",
        "firstname": "Georgina",
        "email": "jellis@nfe.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Tagliaferri",
        "shortname": "Manjim",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "6258",
          "addressline1": "Lot 1 Case Street",
          "state": "WA",
          "suburb": "Manjimup",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Manjimip Gateway Hotel",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "92595200",
        "firstname": "Mary",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Robert-Smith",
        "shortname": "Mary R",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "31 Heatherdale Rd",
          "state": "Vic",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Mary Robert-Smith",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "0408 694626"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Accounts",
        "shortname": "Myer",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "ACT",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Myer",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Peter",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Rea",
        "shortname": "New Cl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "New Client PR",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "New",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Test Client",
        "shortname": "New Te",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "New Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Bert",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Newton",
        "shortname": "Newton",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "12 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Newton Bert",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "John",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Newton",
        "shortname": "Newton",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "12 Bourke St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Newton John",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "425789789",
        "firstname": "Michelle",
        "email": "mcooper@opmelbourne.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Cooper",
        "shortname": "OP Ind",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3133",
          "addressline1": "14 Trade Place",
          "state": "VIC",
          "suburb": "Vermont",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "OP Industries",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "418443364"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "35896655",
        "firstname": "Bob",
        "email": "sales@teldaco.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "level2 Building 3"
        },
        "surname": "Mansfield",
        "shortname": "OPTUS",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "4000",
          "addressline1": "160 Mary St",
          "state": "QLD",
          "suburb": "Brisbane",
          "addressline2": "level2 Building 3"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "325896321",
        "clientname": "OPTUS",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "407816848"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Michael",
        "email": "michael.david.orr@me.com",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "6-Oct"
        },
        "surname": "Orr",
        "shortname": "Orrigi",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUyxSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3121",
          "addressline1": "Lord Street",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Orriginal",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "402810043"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Rubie",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "G",
        "shortname": "rubie",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "rubie training WOO",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "12345678",
        "firstname": "Ruby-Gee",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "BeezNeez",
        "shortname": "Rubies",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "789456123",
        "clientname": "Rubies Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "2525252525"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Max",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Pain",
        "shortname": "Salta",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "9 Somewhere St",
          "state": "VIC",
          "suburb": "Summerset",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Salta",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "John",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Smith",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1QMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3550",
          "addressline1": "2 Grant St",
          "state": "Vic",
          "suburb": "Bendigo",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Smith John",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "SPOTLESS",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "SERVICES",
        "shortname": "SPOTLE",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "SPOTLESS SERVICES P/L",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Stuart",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Wisdom",
        "shortname": "Stuart",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3114",
          "addressline1": "305 Iolanthe Crt",
          "state": "Vic",
          "suburb": "Park Orchards",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Stuart Wisdom",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Paul",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Surname",
        "shortname": "Sunlan",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3132",
          "addressline1": "95 Whitehorse Rd",
          "state": "VIC",
          "suburb": "Mitcham",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Sunland",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "test",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1RMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "test",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "test",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "client",
        "shortname": "test c",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1SQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "test client 23",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "88886666",
        "firstname": "Tony",
        "email": "t.a@test.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Richmond Building 1"
        },
        "surname": "Abbott",
        "shortname": "The Tr",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUy1SUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3121",
          "addressline1": "12 Bridge Road",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "The Training Company",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training account 123",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3128",
          "addressline1": "900 Whitehorse rd",
          "state": "VIC",
          "suburb": "Box Hill",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client 12",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "training client 43",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client 69",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Client2",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Recieveable",
        "shortname": "Traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "addres value",
          "state": "VIC",
          "suburb": "",
          "addressline2": "86 test street"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Training Company",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Payable",
        "shortname": "traini",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRRMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "training Company 43",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "TRANSFIELD",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "SERVICES",
        "shortname": "TRANSF",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRSQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "NSW",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "TRANSFIELD SERVICES",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "410696119",
        "firstname": "Adam",
        "email": "vanda@vandaconstructions.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Vanda",
        "shortname": "Vanda",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyRSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "2069",
          "addressline1": "62 Malvern Ave",
          "state": "NSW",
          "suburb": "Roseville",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Vanda Constructions",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9812 3456",
        "firstname": "Jona",
        "email": "JonaVark@mailserver.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Unit 3"
        },
        "surname": "Vark",
        "shortname": "Vark J",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "51 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Unit 3"
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "03 9812 3457",
        "clientname": "Vark Jona",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "5559999",
        "firstname": "Steven",
        "email": "carl@i-man.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Smith",
        "shortname": "Vodafo",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3144",
          "addressline1": "1 Street Road",
          "state": "Vic",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "5559998",
        "clientname": "Vodafone",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "400555555"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Wilma",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Flinstone",
        "shortname": "Wilmas",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3134",
          "addressline1": "53 New Street",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "Wilmas Windows",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Accounts",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Receivable",
        "shortname": "World",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVQMCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "World For Kids Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "9429 5001",
        "firstname": "Ronald",
        "email": "davidm@i-man.com.au",
        "abn": "",
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Loft",
        "shortname": "Yarra",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKLyVRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3121",
          "addressline1": "134 Church ST",
          "state": "VIC",
          "suburb": "Richmond",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "9429 5333",
        "clientname": "Yarra Valley Services",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": "417948368"
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "",
        "firstname": "Joe",
        "email": "",
        "abn": "",
        "datetimeinserted": "2018-09-05 09:08:24.58",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Bloggs",
        "shortname": "a test",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6SydRICAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "Australia",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-09-05 09:08:24.58",
        "fax": "",
        "clientname": "A test name",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-09-05 09:08:24.58",
        "mobile": ""
      },
      {
        "contacts": [],
        "locations": [],
        "phone": "03 9259 5200",
        "firstname": "Jayne",
        "email": "jayne.doe@example.com",
        "abn": "XX XXX XXX XXXX",
        "datetimeinserted": "2018-10-12 09:38:09.083",
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "Australia",
          "postcode": "3066",
          "addressline1": "PO Box XXXX",
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Doe",
        "shortname": "TeCl",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCQ6XyxRQCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "12 Maroondah Highway",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": "Suite 13, Level 2"
        },
        "priorities": [],
        "dateinserted": "2018-10-12 09:38:09.083",
        "fax": "03 XXXX XXXX",
        "clientname": "Test Client",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-12 09:38:09.083",
        "mobile": "0400 XXX XXX"
      }
    ]
  }
}
```


---

### GET Search for Client by Name

`GET https://api.aroflo.com/{{urlVarString}}`

This returns the first page of Clients who have had details updated in AroFlo by filtering on the "postable" field.

The postable flag is set whenever a client is created or updated in the AroFlo interface. This is the best flag to use to keep you client data in sync as you should only be getting the data that has been updated

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'where=' + encodeURIComponent('and|clientname|=|ABC Building')
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
| `Authorization` | `{{Authorization}}` |  |
| `Accept` | `text/json` |  |
| `afdatetimeutc` | `{{af_iso_timestamp}}` |  |

**Pre-request Script:**

```javascript
const cryptojs = require('crypto-js');
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'where=' + encodeURIComponent("and|clientname|=|Uncle Georges Cabin")
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
  let hash = cryptojs.HmacSHA512( payload.join('+'), secret_key);
  
  //Update the environment variables
  pm.environment.set("urlPath", urlPath);
  pm.environment.set("accept", accept);
  pm.environment.set("Authorization", Authorization);
  pm.environment.set("af_hmac_signature", hash.toString());
  pm.environment.set("af_iso_timestamp", isotimestamp);
  
  }//end function
```

### Example Responses

#### Search for Client by Name (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "orgs": 6,
      "clients": 98
    },
    "currentpageresults": 1,
    "clients": [
      {
        "contacts": [],
        "locations": [],
        "phone": "03-9259-5200 Tanya",
        "firstname": "Alan",
        "email": "",
        "abn": "",
        "notes": [],
        "datetimeinserted": "2018-06-21 10:59:01.8",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "",
          "postcode": "",
          "addressline1": "",
          "state": "",
          "suburb": "",
          "addressline2": "Building 1"
        },
        "surname": "Bull",
        "shortname": "ABC Bu",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "false"
          }
        ],
        "customfields": [],
        "clientid": "JCdKUydSUCAgCg==",
        "postable": "TRUE",
        "usecustompriorities": "false",
        "address": {
          "country": "",
          "postcode": "3000",
          "addressline1": "50 Market St",
          "state": "VIC",
          "suburb": "Melbourne",
          "addressline2": ""
        },
        "priorities": [],
        "dateinserted": "2018-06-21 10:59:01.8",
        "fax": "",
        "clientname": "ABC Building",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-06-21 10:59:01.8",
        "mobile": ""
      }
    ]
  }
}
```


---

### POST Create Client

`POST http://api.aroflo.com/`

Create a new client. Multiple clients can be created in this method by using additional keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;<![CDATA[ A Test Client ]]><![CDATA[ Jayne ]]><![CDATA[ Doe ]]><![CDATA[ XX XXX XXX XXXX]]><![CDATA[ TeCl]]>03 9259 52000400 XXX XXX03 XXXX XXXX<![CDATA[ jayne.doe@example.com ]]>        <![CDATA[ example.com]]><![CDATA[ this is a terms note]]>JCdKUyZRMCAgCg==<![CDATA[ 12 Maroondah Highway ]]><![CDATA[ Suite 13, Level 2 ]]><![CDATA[ Ringwood ]]><![CDATA[ VIC ]]><![CDATA[ 3134 ]]><![CDATA[ Australia ]]><![CDATA[ PO Box XXXX ]]><![CDATA[ Mail Centre Collections ]]><![CDATA[ Collingwood ]]><![CDATA[ VIC ]]>3066<![CDATA[ Australia ]]>&#x27;)
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
        'zone=' + encodeURIComponent('clients')
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
        ,'postxml=' + encodeURIComponent('<clients><client><clientname><![CDATA[ A Test Client ]]></clientname><firstname><![CDATA[ Jayne ]]></firstname><surname><![CDATA[ Doe ]]></surname><abn><![CDATA[ XX XXX XXX XXXX]]></abn><shortname><![CDATA[ TeCl ]]></shortname><phone>03 9259 5200</phone><mobile>0400 XXX XXX</mobile><fax>03 XXXX XXXX</fax><email><![CDATA[ jayne.doe@example.com ]]></email><website><![CDATA[ example.com]]></website><termsnote><![CDATA[ this is a terms note]]></termsnote><orgs><org><orgid>JCdKUyZRMCAgCg==</orgid></org></orgs><address><addressline1><![CDATA[ 12 Maroondah Highway ]]></addressline1><addressline2><![CDATA[ Suite 13, Level 2 ]]></addressline2><suburb><![CDATA[ Ringwood ]]></suburb><state><![CDATA[ VIC ]]></state><postcode><![CDATA[ 3134 ]]></postcode><country><![CDATA[ Australia ]]></country></address><mailingaddress><addressline1><![CDATA[ PO Box XXXX ]]></addressline1><addressline2><![CDATA[ Mail Centre Collections ]]></addressline2><suburb><![CDATA[ Collingwood ]]></suburb><state><![CDATA[ VIC ]]></state><postcode>3066</postcode><country><![CDATA[ Australia ]]></country></mailingaddress></client></clients>')
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

#### ERROR: Client already exists (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": "0",
      "errors": [
        {
          "message": "Unable to make changes to Database",
          "code": "209",
          "detail": "Client already exists",
          "type": "Database"
        }
      ],
      "updates": {
        "clients": []
      },
      "inserttotal": 1,
      "inserts": {
        "clients": [
          {
            "mailingaddress": {
              "country": "Australia",
              "postcode": "3066",
              "addressline1": "PO Box XXXX",
              "state": "VIC",
              "suburb": "Collingwood",
              "addressline2": "Mail Centre Collections"
            },
            "surname": "Doe",
            "shortname": "TeCl",
            "termsnote": "this is a terms note",
            "phone": "03 9259 5200",
            "firstname": "Jayne",
            "orgs": {
              "org": {
                "orgid": "JCdKUyZRMCAgCg=="
              }
            },
            "email": "jayne.doe@example.com",
            "abn": "XX XXX XXX XXXX",
            "address": {
              "country": "Australia",
              "postcode": "3134",
              "addressline1": "12 Maroondah Highway",
              "state": "VIC",
              "suburb": "Ringwood",
              "addressline2": "Suite 13, Level 2"
            },
            "error": "Client already exists in AroFlo. Please use another name.",
            "fax": "03 XXXX XXXX",
            "clientname": "A Test Client",
            "website": "example.com",
            "mobile": "0400 XXX XXX"
          }
        ]
      }
    }
  }
}
```

#### Create Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": "0",
      "errors": [],
      "updates": {
        "clients": []
      },
      "inserttotal": 1,
      "inserts": {
        "clients": [
          {
            "mailingaddress": {
              "country": "Australia",
              "postcode": "3066",
              "addressline1": "PO Box XXXX",
              "state": "VIC",
              "suburb": "Collingwood",
              "addressline2": "Mail Centre Collections"
            },
            "surname": "Doe",
            "shortname": "TeCl",
            "termsnote": "this is a terms note",
            "phone": "03 9259 5200",
            "firstname": "Jayne",
            "orgs": {
              "org": {
                "orgid": "JCdKUyZRMCAgCg=="
              }
            },
            "email": "jayne.doe@example.com",
            "abn": "XX XXX XXX XXXX",
            "clientid": "JCQ6WyBRICAgCg==",
            "address": {
              "country": "Australia",
              "postcode": "3134",
              "addressline1": "12 Maroondah Highway",
              "state": "VIC",
              "suburb": "Ringwood",
              "addressline2": "Suite 13, Level 2"
            },
            "fax": "03 XXXX XXXX",
            "clientname": "A Test Client",
            "website": "example.com",
            "mobile": "0400 XXX XXX"
          }
        ]
      }
    }
  }
}
```


---

### POST Update Client primary contact phone

`POST http://api.aroflo.com/`

By update the phone, fax, mobile or email keys, we are actually updating the values on the Client's Primary Contact.

Multiple clients can be updated in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'postxml=' + encodeURIComponent('JSZaVy1QLEggCg==03 1234 5678')
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
        'zone=' + encodeURIComponent('clients')
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
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JSZaVy1QLEggCg==</clientid><phone>03 1234 5678</phone></client></clients>')
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

#### Create Client (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": "0",
      "errors": [],
      "updates": {
        "clients": []
      },
      "inserttotal": 1,
      "inserts": {
        "clients": [
          {
            "mailingaddress": {
              "country": "Australia",
              "postcode": "3066",
              "addressline1": "PO Box XXXX",
              "state": "VIC",
              "suburb": "Collingwood",
              "addressline2": "Mail Centre Collections"
            },
            "surname": "Doe",
            "shortname": "TeCl",
            "termsnote": "this is a terms note",
            "phone": "03 9259 5200",
            "firstname": "Jayne",
            "orgs": {
              "org": {
                "orgid": "JCdKUyZRMCAgCg=="
              }
            },
            "email": "jayne.doe@example.com",
            "abn": "XX XXX XXX XXXX",
            "clientid": "JCQ6WyBRICAgCg==",
            "address": {
              "country": "Australia",
              "postcode": "3134",
              "addressline1": "12 Maroondah Highway",
              "state": "VIC",
              "suburb": "Ringwood",
              "addressline2": "Suite 13, Level 2"
            },
            "fax": "03 XXXX XXXX",
            "clientname": "A Test Client",
            "website": "example.com",
            "mobile": "0400 XXX XXX"
          }
        ]
      }
    }
  }
}
```

#### ERROR: Client already exists (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": "0",
      "errors": [
        {
          "message": "Unable to make changes to Database",
          "code": "209",
          "detail": "Client already exists",
          "type": "Database"
        }
      ],
      "updates": {
        "clients": []
      },
      "inserttotal": 1,
      "inserts": {
        "clients": [
          {
            "mailingaddress": {
              "country": "Australia",
              "postcode": "3066",
              "addressline1": "PO Box XXXX",
              "state": "VIC",
              "suburb": "Collingwood",
              "addressline2": "Mail Centre Collections"
            },
            "surname": "Doe",
            "shortname": "TeCl",
            "termsnote": "this is a terms note",
            "phone": "03 9259 5200",
            "firstname": "Jayne",
            "orgs": {
              "org": {
                "orgid": "JCdKUyZRMCAgCg=="
              }
            },
            "email": "jayne.doe@example.com",
            "abn": "XX XXX XXX XXXX",
            "address": {
              "country": "Australia",
              "postcode": "3134",
              "addressline1": "12 Maroondah Highway",
              "state": "VIC",
              "suburb": "Ringwood",
              "addressline2": "Suite 13, Level 2"
            },
            "error": "Client already exists in AroFlo. Please use another name.",
            "fax": "03 XXXX XXXX",
            "clientname": "A Test Client",
            "website": "example.com",
            "mobile": "0400 XXX XXX"
          }
        ]
      }
    }
  }
}
```

#### Update Client primary contact phone (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "clients": [
          {
            "phone": "03 1234 5678",
            "primarycontact": {
              "phone": "03 1234 5678",
              "userid": "JSZKQyFQTEwgCg=="
            },
            "clientid": "JSZaVy1QLEggCg=="
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "clients": []
      }
    }
  }
}
```


---

### POST Mark Clients as processed.

`POST http://api.aroflo.com/`

After pulling the list of `postable` clients and updating the records in your external system, those client records should now be marked as processed or `not postable`.

Multiple clients can be updated in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,'postxml=' + encodeURIComponent('JCdKUydSQCAgCg==falseJCdKUyZRMCAgCg==false')
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
        'zone=' + encodeURIComponent('clients')
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
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JCdKUydSQCAgCg==</clientid><postable>false</postable></client><client><clientid>JCdKUyZRMCAgCg==</clientid><postable>false</postable></client></clients>')
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

#### Mark Clients as processed. (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "clients": [
          {
            "postable": "false",
            "clientid": "JCdKUydSQCAgCg=="
          },
          {
            "postable": "false",
            "clientid": "JCdKUyZRMCAgCg=="
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "clients": []
      }
    }
  }
}
```

