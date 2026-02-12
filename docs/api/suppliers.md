# Suppliers

This zone allows listing, updating and creation of new [Suppliers](https://help.aroflo.com/display/office/Suppliers) for your AroFlo site.

## WHERE filters

| Field | Value |
| --- | --- |
| supplierid | AroFlo ID |
| suppliername | STRING |
| postable | BOOLEAN |
| archived | BOOLEAN |
| datecreated | DATE(YYYY-MM-DD) |
| dateinserted | DATE(YYYY-MM-DD) |
| datetimeinserted | DATETIME(YYYY-MM-DD HH:mm:ss) |

**Default WHERE clause**

AND datetimeinserted > DATEADD(d, -30, GETUTCDATE())

### POSTABLE

The postable flag is set whenever a supplier is created or updated in the AroFlo interface. This is the best flag to use to keep you supplier data in sync as you should only be getting the data that has been updated:

`GET zone=Suppliers&postable=true`

Process the received data and then return a POST to AroFlo and reset the Postable flag on each supplier you have processed.

<suppliers>
    <supplier>
        <supplierid>XXX</supplierid>
        <postable>false</postable>
    </supplier>
    <supplier>
        <supplierid>YYYY</supplierid>
        <postable>false</postable>
    </supplier>

## JOINs available

| Area |
| --- |
| locations |
| locationcustomfields |
| contacts |
| customfields |

## POSTXML Variable definition

<suppliers>
    <supplier>
        <supplierid>AroFlo ID</supplierid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE required   -->
        <suppliername><![CDATA[ STRING(50) ]]></suppliername> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required / UPDATE yes   -->
        <firstname><![CDATA[ STRING(50) ]]></firstname> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required / UPDATE yes   -->
        <surname><![CDATA[ STRING(50) ]]></surname> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required / UPDATE yes   -->
        <abn><![CDATA[ STRING(50) ]]></abn> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <shortname><![CDATA[ STRING(6) ]]></shortname> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <phone><![CDATA[ STRING(50) ]]></phone> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <mobile><![CDATA[ STRING(50) ]]></mobile> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <fax><![CDATA[ STRING(50) ]]></fax> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <email><![CDATA[ STRING(250) ]]></email> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <website><![CDATA[ STRING(1000) ]]></website> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <gpslat>FLOAT</gpslat>  INSERT yes / UPDATE yes  
        <gpslong>FLOAT</gpslong>  INSERT yes / UPDATE yes  
        <transactionterms>
            <transactiontermid>AroFlo ID</transactiontermid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <transactionterm><![CDATA[ STRING(50) ]]></transactionterm> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        </transactionterms>
        <termsnote><![CDATA[ STRING(50) ]]></termsnote> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
        <postable>BOOLEAN</postable>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes   -->
        <suppliertype><![CDATA[ STRING(50) ]]></suppliertype><comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE no   -->
        <orgs>
            <org> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> Multiple <org> elements can be used to assign the supplier to those business units   -->
                <orgid>AroFlo ID</orgid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <archived>BOOLEAN</archived> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE no  -->
            </org>
        </orgs>
        <address class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;>
            <addressline1><![CDATA[ STRING(150) ]]></addressline1> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <addressline2><![CDATA[ STRING(150) ]]></addressline2> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <suburb><![CDATA[ STRING(100) ]]></suburb> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <state><![CDATA[ STRING(50) ]]></state> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <postcode><![CDATA[ STRING(10) ]]></postcode> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <country><![CDATA[ STRING(50) ]]></country> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes (All Countries)   -->
        </address>
        <mailingaddress>
             <addressline1><![CDATA[ STRING(150) ]]></addressline1> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <addressline2><![CDATA[ STRING(150) ]]></addressline2> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <suburb><![CDATA[ STRING(100) ]]></suburb> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <state><![CDATA[ STRING(50) ]]></state> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <postcode><![CDATA[ STRING(10) ]]></postcode> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            <country><![CDATA[ STRING(50) ]]></country> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes (All Countries)   -->
        </mailingaddress>
        <locations>
            <location>
                <locationid>AroFlo ID</locationid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE required   -->
                <locationname><![CDATA[ STRING(100) ]]></locationname> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT required / UPDATE yes   -->
                <address class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;><![CDATA[ STRING(50) ]]></address> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <suburb><![CDATA[ STRING(50) ]]></suburb> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <state><![CDATA[ STRING(50) ]]>(Australian, New Zealand and United States "States")</state>  <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> / INSERT yes / UPDATE yes   -->
                <postcode><![CDATA[ STRING(50) ]]></postcode> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <country><![CDATA[ STRING(50) ]]></country> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes (All Countries)   -->
                <sitecontact><![CDATA[ STRING(50) ]]></sitecontact> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <sitephone><![CDATA[ STRING(50) ]]></sitephone> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <siteemail><![CDATA[ STRING(100) ]]></siteemail> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <gpslat>FLOAT</gpslat> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <gpslong>FLOAT</gpslong> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            </location>
        </locations>
        <contacts>
            <contact>
                <userid>AroFlo ID</userid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE required   -->
                <givennames><![CDATA[ STRING(50) ]]></givennames> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <surname><![CDATA[ STRING(50) ]]></surname> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <username><![CDATA[ STRING(40) ]]></username> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE no   -->
                <phone><![CDATA[ STRING(50) ]]></phone> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <fax><![CDATA[ STRING(50) ]]></fax> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <mobile><![CDATA[ STRING(50) ]]></mobile> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <email><![CDATA[ STRING(250) ]]></email> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <email2><![CDATA[ STRING(250) ]]></email2> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <archived><![CDATA[ STRING(50) ]]></archived> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
            </contact>
        </contacts>
        <customfields>
            <customfield>
                <fieldid>AroFlo ID</fieldid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE required   -->
                <name><![CDATA[ STRING(50) ]]></name> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes   -->
                <type><![CDATA[ STRING(50) ]]></type> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes (text, numeric, Datefield, checkbox, radio, Select, textarea)   -->
                <value>
                     ]]>
                    <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT yes / UPDATE yes
                        <type> = &#x27;checkbox&#x27; then value is TRUE or FALSE
                        <type> = &#x27;datefield&#x27; then value is a valid date in format &#x27;YYYY-MM-DD&#x27;
                        <type> = all other types then <![CDATA[ string(2000) ]]>
                      -->
                </value>
                <archived>false</archived>
            </customfield>
        </customfields>
        <link>
            <orgid>AroFlo ID</orgid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes   -->
            <orgname><![CDATA[ STRING(50) ]]></orgname> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes   -->
            <externalid><![CDATA[ STRING(100) ]]></externalid> <comment class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27; class=&#x27;preserveHtml&#x27;> INSERT no / UPDATE yes   -->
        </link>
    </supplier>
</suppliers>

**Authorization:** bearer


### JOIN locations

**Authorization:** bearer


---

### GET Get Suppliers and Locations

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of suppliers and their locations.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
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

#### Get Suppliers and Locations (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "locations": 4,
      "orgs": 7,
      "suppliers": 83
    },
    "suppliers": [
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [
          {
            "locationid": "JSc6Qy1RXDQgCg==",
            "gpslat": "0",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "george.lucas@aroflo.com",
            "customfields": [],
            "locationname": "51 New St",
            "country": "AUSTRALIA",
            "gpslong": "0",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          }
        ],
        "phone": "03 xxxx xxxx",
        "supplierid": "JCQ6Xy1RQCAgCg==",
        "firstname": "Costa",
        "email": "costa.lotta@cables4u.example.com",
        "abn": "",
        "notes": [],
        "suppliername": "Cables4U",
        "datetimeinserted": "2018-10-16 13:30:19.58",
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
        "surname": "Lotta",
        "shortname": "TeCl_1",
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
        "postable": "TRUE",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "dateinserted": "2018-10-16 13:30:19.58",
        "fax": "03 XXXX XXXX",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-16 13:30:19.58",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [
          {
            "locationid": "JSc6Qy1RPEQgCg==",
            "gpslat": "0",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "george.lucas@aroflo.com",
            "customfields": [],
            "locationname": "51 New St",
            "country": "AUSTRALIA",
            "gpslong": "0",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          }
        ],
        "phone": "03 9259 5200",
        "supplierid": "JCQ6WyBRMCAgCg==",
        "firstname": "Costa",
        "email": "costa.lotta@cables4u.example.com",
        "abn": "",
        "notes": [],
        "suppliername": "A Test Supplier",
        "datetimeinserted": "2018-10-23 14:29:33.44",
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
        "surname": "Lotta",
        "shortname": "TeCl_3",
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
        "postable": "TRUE",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "dateinserted": "2018-10-23 14:29:33.44",
        "fax": "03 XXXX XXXX",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-23 14:29:33.44",
        "mobile": "0400 XXX XXX"
      },
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [],
        "phone": "03 9543 8422",
        "supplierid": "JCQ6UyZRICAgCg==",
        "firstname": "Eric",
        "email": "sales@trifixx.com.au",
        "abn": "",
        "notes": [],
        "suppliername": "Trifixx  Pty. Ltd.",
        "datetimeinserted": "2018-11-23 10:55:28.42",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "2142",
          "addressline1": "26-30 Howleys Road",
          "state": "VIC",
          "suburb": "NOTTING HILL",
          "addressline2": "9543 4431"
        },
        "surname": "Matthews",
        "shortname": "trifix",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "true"
          }
        ],
        "customfields": [],
        "postable": "TRUE",
        "address": {
          "country": "AUSTRALIA",
          "postcode": "2142",
          "addressline1": "26-30 Howleys Road",
          "state": "VIC",
          "suburb": "NOTTING HILL",
          "addressline2": "9543 4431"
        },
        "dateinserted": "2018-11-23 10:55:28.42",
        "fax": "03 9543 9377",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-11-23 00:00:00.0",
        "mobile": "0418 362 414"
      },
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [],
        "phone": "03 9543 8422",
        "supplierid": "JCQ6UyZRMCAgCg==",
        "firstname": "Eric",
        "email": "sales@trifixx.com.au",
        "abn": "",
        "notes": [],
        "suppliername": "Trifixx  Pty. Ltd.1",
        "datetimeinserted": "2018-11-23 10:59:36.16",
        "documentsandphotos": [],
        "link": {
          "orgid": "",
          "orgname": "",
          "externalid": ""
        },
        "mailingaddress": {
          "country": "AUSTRALIA",
          "postcode": "2142",
          "addressline1": "26-30 Howleys Road",
          "state": "VIC",
          "suburb": "NOTTING HILL",
          "addressline2": "9543 4431"
        },
        "surname": "Matthews",
        "shortname": "trif_1",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "true"
          }
        ],
        "customfields": [],
        "postable": "TRUE",
        "address": {
          "country": "AUSTRALIA",
          "postcode": "2142",
          "addressline1": "26-30 Howleys Road",
          "state": "VIC",
          "suburb": "NOTTING HILL",
          "addressline2": "9543 4431"
        },
        "dateinserted": "2018-11-23 10:59:36.16",
        "fax": "03 9543 9377",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-11-23 00:00:00.0",
        "mobile": "0418 362 414"
      },
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [],
        "phone": "03 9259 5200",
        "supplierid": "JCQ6UyZSUCAgCg==",
        "firstname": "Costa",
        "email": "costa.lotta@cables4u.example.com",
        "abn": "XX XXX XXX XXXX",
        "notes": [],
        "suppliername": "A Test Supplier 1",
        "datetimeinserted": "2018-11-23 11:51:21.39",
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
          "state": "VIC",
          "suburb": "Collingwood",
          "addressline2": "Mail Centre Collections"
        },
        "surname": "Lotta",
        "shortname": "TeCl_6",
        "termsnote": "",
        "terms": "",
        "orgs": [
          {
            "orgid": "JCdKUyZRMCAgCg==",
            "orgname": "Bradley Sandbox",
            "archived": "true"
          }
        ],
        "customfields": [],
        "postable": "TRUE",
        "address": {
          "country": "AUSTRALIA",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "dateinserted": "2018-11-23 11:51:21.39",
        "fax": "03 XXXX XXXX",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-11-23 00:00:00.0",
        "mobile": "0400 XXX XXX"
      }
    ],
    "currentpageresults": 5
  }
}
```


---

### POST Create Location for Supplier

`POST https://api.aroflo.com/`

Create a new location for a supplier.

Make sure to set the `supplierid` to a valid ID from your own AroFlo site. Multiple locations can be created in this method by using additional keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;JCQ6Xy1RQCAgCg==<![CDATA[ 12 Maroondah Highway ]]><![CDATA[  ]]><![CDATA[ Ringwood ]]><![CDATA[ VIC ]]><![CDATA[ 3134 ]]><![CDATA[ Australia ]]><![CDATA[ STRING(2000) ]]><![CDATA[ 03 9259 5200 ]]><![CDATA[ orders@mysupplier.example.com ]]>&#x27;)
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
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('locaitons')
        ,'postxml=' + encodeURIComponent('<suppliers><supplier><supplierid>JCQ6Xy1RQCAgCg==</supplierid><locations><location><locationname><![CDATA[ 12 Maroondah Highway ]]></locationname><address><![CDATA[  ]]></address><suburb><![CDATA[ Ringwood ]]></suburb><state><![CDATA[ VIC ]]></state><postcode><![CDATA[ 3134 ]]></postcode><country><![CDATA[ Australia ]]></country><sitecontact><![CDATA[ George Foreman ]]></sitecontact><sitephone><![CDATA[ 03 9259 5200 ]]></sitephone><siteemail><![CDATA[ orders@mysupplier.example.com ]]></siteemail></location></locations></supplier></suppliers>')
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

#### Create Location for Supplier (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "suppliers": [
          {
            "locations": [
              {
                "locationid": "JSc6XyRQPEggCg==",
                "country_id": 14,
                "GPSLAT": "0",
                "postcode": "3134",
                "sitecontact": "STRING(2000)",
                "state": "VIC",
                "suburb": "Ringwood",
                "siteemail": "orders@mysupplier.example.com",
                "locationname": "12 Maroondah Highway",
                "state_id": 2,
                "country": "AUSTRALIA",
                "GPSLONG": "0",
                "address": "",
                "sitephone": "03 9259 5200"
              }
            ],
            "supplierid": "JCQ6Xy1RQCAgCg=="
          }
        ]
      },
      "inserttotal": 1,
      "inserts": {
        "suppliers": []
      }
    }
  }
}
```


---

### POST Update Location for Supplier

`POST https://api.aroflo.com/`

Update an existing location for a supplier. In this example we are updating the contact and phone number for the location.

Make sure to set the `supplierid` to a valid ID from your own AroFlo site. Multiple locations can be updated in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,'postxml=' + encodeURIComponent('JCQ6Xy1RQCAgCg==JSc6XyRQPEggCg==<![CDATA[ Julio Herdandez ]]><![CDATA[ 03 9259 5204 ]]>')
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
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('locations')
        ,'postxml=' + encodeURIComponent('<suppliers><supplier><supplierid>JCQ6Xy1RQCAgCg==</supplierid><locations><location><locationid>JSc6XyRQPEggCg==</locationid><sitecontact><![CDATA[ Julio Herdandez ]]></sitecontact><sitephone><![CDATA[ 03 9259 5204 ]]></sitephone></location></locations></supplier></suppliers>')
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

#### Update Location for Supplier (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 2,
      "errors": [],
      "updates": {
        "suppliers": [
          {
            "locations": [
              {
                "locationid": "JSc6XyRQPEggCg==",
                "sitecontact": "Julio Herdandez",
                "sitephone": "03 9259 5204"
              }
            ],
            "supplierid": "JCQ6Xy1RQCAgCg=="
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "suppliers": []
      }
    }
  }
}
```


### JOIN locationcustomfields

This JOIN **requires** you also include `locations` in your join statement.

**Authorization:** bearer


---

### GET Get Locations and LocationCustomFields for Supplier

`GET https://api.aroflo.com/{{urlVarString}}`

Get the locations for a specific supplier and include the custom fields for those locations

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('locations,locationcustomfields')
        ,'where=' + encodeURIComponent('and|supplierid|=|JCQ6Xy1RQCAgCg==')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('locations,locationcustomfields')
        ,'where=' + encodeURIComponent('and|supplierid|=|JCQ6Xy1RQCAgCg==')
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

#### Get Locations and LocationCustomFields for Supplier (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "locations": 8,
      "orgs": 11,
      "suppliers": 104,
      "customfields": 20
    },
    "suppliers": [
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [
          {
            "locationid": "JSc6Qy1RXDQgCg==",
            "gpslat": "0",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "george.lucas@aroflo.com",
            "customfields": [],
            "locationname": "51 New St",
            "country": "AUSTRALIA",
            "gpslong": "0",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "1300 794 818"
          },
          {
            "locationid": "JSc6XyRQPEggCg==",
            "gpslat": "0",
            "postcode": "3134",
            "SiteContact": "STRING(2000)",
            "state": "VIC",
            "suburb": "Ringwood",
            "SiteEmail": "orders@mysupplier.example.com",
            "customfields": [],
            "locationname": "12 Maroondah Highway",
            "country": "AUSTRALIA",
            "gpslong": "0",
            "address": "",
            "archived": "FALSE",
            "SitePhone": "03 9259 5200"
          }
        ],
        "phone": "03 xxxx xxxx",
        "supplierid": "JCQ6Xy1RQCAgCg==",
        "firstname": "Costa",
        "email": "costa.lotta@cables4u.example.com",
        "abn": "",
        "notes": [],
        "suppliername": "Cables4U",
        "datetimeinserted": "2018-10-16 13:30:19.58",
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
        "surname": "Lotta",
        "shortname": "TeCl_1",
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
        "postable": "TRUE",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "dateinserted": "2018-10-16 13:30:19.58",
        "fax": "03 XXXX XXXX",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-16 13:30:19.58",
        "mobile": "0400 XXX XXX"
      }
    ],
    "currentpageresults": 1
  }
}
```


---

### POST Update Custom Field on Location

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
        ,'postxml=' + encodeURIComponent('<clients><client><clientid>JCdKUydSQCAgCg==</clientid><locations><location><locationname><![CDATA[ 57 New St ]]></locationname><address><![CDATA[  ]]></address><suburb><![CDATA[ Ringwood ]]></suburb><state><![CDATA[ VIC ]]></state><postcode><![CDATA[ 3134 ]]></postcode><country><![CDATA[ Australia ]]></country><sitecontact><![CDATA[ STRING(2000) ]]></sitecontact><sitephone><![CDATA[ 1300 794 818 ]]></sitephone><siteemail><![CDATA[ peter.mayhew@aroflo.com ]]></siteemail></location></locations></client></clients>')
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


### JOIN contacts

**Authorization:** bearer


---

### GET Get active Contacts for Supplier

`GET https://api.aroflo.com/{{urlVarString}}`

Return the list of active (not archived) contacts for a specific client.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('contacts')
        ,'where=' + encodeURIComponent('and|supplierid|=|JCQ6Xy1RQCAgCg==')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('contacts')
        ,'where=' + encodeURIComponent('and|supplierid|=|JCQ6Xy1RQCAgCg==')
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

#### Get active Contacts for Supplier (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "contacts": 4,
      "orgs": 8,
      "suppliers": 50
    },
    "suppliers": [
      {
        "contacts": [
          {
            "surname": "Lotta",
            "givennames": "Costa",
            "phone": "03 xxxx xxxx",
            "userid": "JCQqRy1SQCAgCg==",
            "username": "E517820F-2702-4F62-9DF4-B233ACAD61EB",
            "archived": "false",
            "fax": "03 XXXX XXXX",
            "email": "costa.lotta@cables4u.example.com",
            "email2": "",
            "mobile": "0400 XXX XXX"
          },
          {
            "surname": "Lucas",
            "givennames": "George",
            "phone": "1300 794 818",
            "userid": "JCQqRy1SUCAgCg==",
            "username": "CB37FCA2-05E3-685A-B69786BB0599083A",
            "archived": "false",
            "fax": "03 XXXX XXXX",
            "email": "george.lucas@aroflo.com",
            "email2": "",
            "mobile": "04XX XXX XXX"
          }
        ],
        "suppliertype": "wholesaler",
        "locations": [],
        "phone": "03 xxxx xxxx",
        "supplierid": "JCQ6Xy1RQCAgCg==",
        "firstname": "Costa",
        "email": "costa.lotta@cables4u.example.com",
        "abn": "",
        "notes": [],
        "suppliername": "Cables4U",
        "datetimeinserted": "2018-10-16 13:30:19.58",
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
        "surname": "Lotta",
        "shortname": "TeCl_1",
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
        "postable": "TRUE",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "dateinserted": "2018-10-16 13:30:19.58",
        "fax": "03 XXXX XXXX",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-16 13:30:19.58",
        "mobile": "0400 XXX XXX"
      }
    ],
    "currentpageresults": 1
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


---

### POST Create Contact for Supplier

`POST http://api.aroflo.com/`

Create a new contact for a supplier. 

Make sure to set the supplierid to a valid `` from your own AroFlo site. Multiple locations can be created this way by providing multiple `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,'postxml=' + encodeURIComponent('JCQ6WyBRMCAgCg==<![CDATA[ George ]]><![CDATA[ Lucas ]]><![CDATA[ 1300 794 818 ]]><![CDATA[ 03 XXXX XXXX ]]><![CDATA[ 04XX XXX XXX ]]><![CDATA[ george.lucas@aroflo.com ]]>')
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
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'postxml=' + encodeURIComponent('<suppliers><supplier><supplierid>JCQ6WyBRMCAgCg==</supplierid><contacts><contact><givennames><![CDATA[ George ]]></givennames><surname><![CDATA[ Lucas ]]></surname><phone><![CDATA[ 1300 794 818 ]]></phone><fax><![CDATA[ 03 XXXX XXXX ]]></fax><mobile><![CDATA[ 04XX XXX XXX ]]></mobile><email><![CDATA[ george.lucas@aroflo.com ]]></email></contact></contacts></supplier></suppliers>')
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

#### Create Contact for Supplier (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "suppliers": [
          {
            "contacts": [
              {
                "surname": "Lucas",
                "givennames": "George",
                "phone": "1300 794 818",
                "userid": "JCQqQyFSUCAgCg==",
                "SUPPLIERID": "8547",
                "fax": "03 XXXX XXXX",
                "email": "george.lucas@aroflo.com",
                "mobile": "04XX XXX XXX"
              }
            ],
            "supplierid": "JCQ6WyBRMCAgCg=="
          }
        ]
      },
      "inserttotal": 1,
      "inserts": {
        "suppliers": []
      }
    }
  }
}
```


### JOIN customfields

**Authorization:** bearer


---

### GET Get CustomFields for a particular Supplier

`GET https://api.aroflo.com/{{urlVarString}}`

Return the supplier specific customfield information.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('customfields')
        ,'where=' + encodeURIComponent('and|supplierid|=|JCQ6KyVRICAgCg==')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'join=' + encodeURIComponent('customfields')
        ,'where=' + encodeURIComponent('and|supplierid|=|JCQ6KyVRICAgCg==')
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
        'zone=' + encodeURIComponent('suppliers')
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

#### Get CustomFields for a particular Supplier (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "orgs": 3,
      "suppliers": 3,
      "customfields": 6
    },
    "suppliers": [
      {
        "contacts": [],
        "suppliertype": "contractor",
        "locations": [],
        "phone": "",
        "supplierid": "JCQ6KyVRICAgCg==",
        "firstname": "Subbie",
        "email": "",
        "abn": "",
        "notes": [],
        "suppliername": "A-Grade Subbie",
        "datetimeinserted": "2018-12-11 09:54:42.257",
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
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "surname": "Worker",
        "shortname": "AGS",
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
            "fieldid": "IyYqXyQK",
            "value": "10",
            "archived": "false",
            "type": "numeric",
            "name": "Subbie Rating"
          }
        ],
        "postable": "TRUE",
        "address": {
          "country": "AUSTRALIA",
          "postcode": "",
          "addressline1": "",
          "state": "VIC",
          "suburb": "",
          "addressline2": ""
        },
        "dateinserted": "2018-12-11 09:54:42.257",
        "fax": "",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-12-11 00:00:00.0",
        "mobile": ""
      }
    ],
    "currentpageresults": 1
  }
}
```


---

### GET Get Suppliers

`GET https://api.aroflo.com/{{urlVarString}}`

Get the first page of suppliers

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
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

#### Get Suppliers (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "orgs": 8,
      "suppliers": 83
    },
    "suppliers": [
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [],
        "phone": "03 9259 5200",
        "supplierid": "JCQ6Xy1RQCAgCg==",
        "firstname": "Costa",
        "email": "costa.lotta@cables4u.example.com",
        "abn": "",
        "suppliername": "Cables4U",
        "datetimeinserted": "2018-10-16 13:30:19.58",
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
        "surname": "Lotta",
        "shortname": "TeCl_1",
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
        "postable": "TRUE",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "dateinserted": "2018-10-16 13:30:19.58",
        "fax": "03 XXXX XXXX",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-16 13:30:19.58",
        "mobile": "0400 XXX XXX"
      }
    ],
    "currentpageresults": 1
  }
}
```


---

### GET Get "Postable"/Updated Suppliers

`GET https://api.aroflo.com/{{urlVarString}}`

This returns the first page of Suppliers who have had details updated in AroFlo by filtering on the "postable" field.

The postable flag is set whenever a supplier is created or updated in the AroFlo interface. This is the best flag to use to keep you supplier data in sync as you should only be getting the data that has been updated.

```
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('suppliers')
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
//What type of HTTP Request we're making GET|POST
var requestType = 'GET';
 
//When using a GET request set the urlVarString.
//Also ensuring that all values are URIencoded
if (requestType == 'GET') {
    var urlVarString = [
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
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

#### Get "Postable"/Updated Suppliers (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "maxpageresults": "500",
    "pagenumber": "1",
    "queryresponsetimes": {
      "orgs": 2,
      "suppliers": 81
    },
    "suppliers": [
      {
        "contacts": [],
        "suppliertype": "wholesaler",
        "locations": [],
        "phone": "03 9259 5200",
        "supplierid": "JCQ6Xy1RQCAgCg==",
        "firstname": "Costa",
        "email": "costa.lotta@cables4u.example.com",
        "abn": "",
        "suppliername": "Cables4U",
        "datetimeinserted": "2018-10-16 13:30:19.58",
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
        "surname": "Lotta",
        "shortname": "TeCl_1",
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
        "postable": "TRUE",
        "address": {
          "country": "Australia",
          "postcode": "3134",
          "addressline1": "53 New St",
          "state": "VIC",
          "suburb": "Ringwood",
          "addressline2": ""
        },
        "dateinserted": "2018-10-16 13:30:19.58",
        "fax": "03 XXXX XXXX",
        "transactionterms": {
          "transactionterm": "",
          "transactiontermnote": "",
          "transactiontermid": ""
        },
        "website": "",
        "datecreated": "2018-10-16 13:30:19.58",
        "mobile": "0400 XXX XXX"
      }
    ],
    "currentpageresults": 1
  }
}
```


---

### POST Create Supplier

`POST http://api.aroflo.com/`

Create a new supplier.

Multiple suppliers can be created this way by providing multiple keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;<![CDATA[ A Test Supplier ]]><![CDATA[ Costa ]]><![CDATA[ Lotta ]]><![CDATA[ XX XXX XXX XXXX]]><![CDATA[ TeCl]]>03 9259 52000400 XXX XXX03 XXXX XXXX<![CDATA[ costa.lotta@cables4u.example.com ]]><![CDATA[ cables4u.example.com]]><![CDATA[ this is a terms note]]>JCdKUyZRMCAgCg==<![CDATA[ 53 New St ]]><![CDATA[ ]]><![CDATA[ Ringwood ]]><![CDATA[ VIC ]]><![CDATA[ 3134 ]]><![CDATA[ Australia ]]><![CDATA[ PO Box XXXX ]]><![CDATA[ Mail Centre Collections ]]><![CDATA[ Collingwood ]]><![CDATA[ VIC ]]>3066<![CDATA[ Australia ]]>&#x27;)
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
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'postxml=' + encodeURIComponent('<suppliers><supplier><suppliername><![CDATA[ A Test Supplier ]]></suppliername><firstname><![CDATA[ Costa ]]></firstname><surname><![CDATA[ Lotta ]]></surname><abn><![CDATA[ XX XXX XXX XXXX]]></abn><shortname><![CDATA[ TeCl]]></shortname><phone>03 9259 5200</phone><mobile>0400 XXX XXX</mobile><fax>03 XXXX XXXX</fax><email><![CDATA[ costa.lotta@cables4u.example.com ]]></email><website><![CDATA[ cables4u.example.com]]></website><termsnote><![CDATA[ this is a terms note]]></termsnote><orgs><org><orgid>JCdKUyZRMCAgCg==</orgid></org></orgs><address><addressline1><![CDATA[ 53 New St ]]></addressline1><addressline2><![CDATA[ ]]></addressline2><suburb><![CDATA[ Ringwood ]]></suburb><state><![CDATA[ VIC ]]></state><postcode><![CDATA[ 3134 ]]></postcode><country><![CDATA[ Australia ]]></country></address><mailingaddress><addressline1><![CDATA[ PO Box XXXX ]]></addressline1><addressline2><![CDATA[ Mail Centre Collections ]]></addressline2><suburb><![CDATA[ Collingwood ]]></suburb><state><![CDATA[ VIC ]]></state><postcode>3066</postcode><country><![CDATA[ Australia ]]></country></mailingaddress></supplier></suppliers>')
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

#### Create Supplier (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": "0",
      "errors": [],
      "updates": {
        "suppliers": []
      },
      "inserttotal": 1,
      "inserts": {
        "suppliers": [
          {
            "mailingaddress": {
              "country": "Australia",
              "postcode": "3066",
              "addressline1": "PO Box XXXX",
              "state": "VIC",
              "suburb": "Collingwood",
              "addressline2": "Mail Centre Collections"
            },
            "surname": "Lotta",
            "shortname": "TeCl",
            "termsnote": "this is a terms note",
            "phone": "03 9259 5200",
            "supplierid": "JCQ6WyBRMCAgCg==",
            "firstname": "Costa",
            "orgs": {
              "org": {
                "orgid": "JCdKUyZRMCAgCg=="
              }
            },
            "email": "costa.lotta@cables4u.example.com",
            "abn": "XX XXX XXX XXXX",
            "suppliername": "A Test Supplier",
            "address": {
              "country": "Australia",
              "postcode": "3134",
              "addressline1": "53 New St",
              "state": "VIC",
              "suburb": "Ringwood",
              "addressline2": ""
            },
            "fax": "03 XXXX XXXX",
            "website": "cables4u.example.com",
            "mobile": "0400 XXX XXX"
          }
        ]
      }
    }
  }
}
```


---

### POST Update Supplier primary contact phone

`POST http://api.aroflo.com/`

By update the phone, fax, mobile or email keys, we are actually updating the values on the Supplier's Primary Contact.

Replace the `supplierid` with a valid id from your site. Multiple suppliers can be updated in this method by using additional keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('clients')
        ,&#x27;postxml=&#x27; + encodeURIComponent(&#x27;JCQ6Xy1RQCAgCg==03 xxxx xxxx&#x27;)
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
        'zone=' + encodeURIComponent('suppliers')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'postxml=' + encodeURIComponent('<suppliers><supplier><supplierid>IScgICAK</supplierid><phone>03 9259 5200</phone></supplier></suppliers>')
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

#### Update Supplier primary contact phone (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "suppliers": [
          {
            "phone": "03 9259 5200",
            "supplierid": "IScgICAK",
            "primarycontact": {
              "phone": "03 9259 5200",
              "userid": "ISQwICAK"
            }
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "suppliers": []
      }
    }
  }
}
```

#### Update Supplier primary contact phone (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "suppliers": [
          {
            "phone": "03 xxxx xxxx",
            "supplierid": "JCQ6Xy1RQCAgCg==",
            "primarycontact": {
              "phone": "03 xxxx xxxx",
              "userid": "JCQqRy1SQCAgCg=="
            }
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "suppliers": []
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

### POST Mark Supplier as processed.

`POST http://api.aroflo.com/`

After pulling the list of `postable` suppliers and updating the records in your external system, those supplier records should now be marked as processed or `not postable`.

Multiple suppliers can be updated in this method by using additional `` keys.

```
if (requestType == 'POST') {
    var formVarString = [
        'zone=' + encodeURIComponent('suppliers')
        ,'postxml=' + encodeURIComponent('JCQ6Xy1RQCAgCg==falseJCQ6WyBRMCAgCg==false')
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
        'zone=' + encodeURIComponent('suppliers')
        ,'postxml=' + encodeURIComponent('<suppliers><supplier><supplierid>JCQ6Xy1RQCAgCg==</supplierid><postable>false</postable></supplier><supplier><supplierid>JCQ6WyBRMCAgCg==</supplierid><postable>false</postable></supplier></suppliers>')
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

#### Mark Supplier as processed. (OK 200)

```json
{
  "status": "0",
  "statusmessage": "Login OK",
  "zoneresponse": {
    "postresults": {
      "updatetotal": 1,
      "errors": [],
      "updates": {
        "suppliers": [
          {
            "postable": "false",
            "supplierid": "JCQ6Xy1RQCAgCg=="
          },
          {
            "postable": "false",
            "supplierid": "JCQ6WyBRMCAgCg=="
          }
        ]
      },
      "inserttotal": "0",
      "inserts": {
        "suppliers": []
      }
    }
  }
}
```

