# AroFlo API Documentation

> Local reference extracted from [AroFlo API Docs](https://apidocs.aroflo.com/)

The AroFloAPI is a simple REST call that returns XML or JSON data (defaults is XML).

**Please click the RUN IN POSTMAN button in the top right of this page to ensure that you download this collection and it's examples into your local PostMan install. This collection is ESSENTIAL for understanding the Authentication required for our API**

By using the AroFlo API you agree to be legally bound by the AroFlo [API TERMS OF USE](https://aroflo.com/api-terms-of-use/)

**As well as reading through this documentation, please ensure that you read through the Pre-Req Script shown in PostMan as it gives detailed information on:**

- **the different variables and their use in the Authentication process.**

- **the process you need to replicate in your own code**

## AroFlo API Base URL

Below is the Base URL, firstly ensure that you can access the site. You should be greeted with `Login Failed - Invalid Request string`. The return data fields status & statusmessage are consistent throughout all the API calls.

`https://api.aroflo.com/

`You can request the return format in JSON by adding Accept:text/json to the HTTP header.

# Authentication

AroFlo API uses HMAC-SHA512 Key Authentication. Your API Secret Key and Authorisation fields are accessible from Site Administration > Settings > General > AroFlo API.

**It is required that this HMAC key be generated for every request**

| uEncoded is based on username |
| --- |
| As the uEncoded value is based on the username, should that ever change, you will need to retrieve the new value from the SiteAdmin area and update your scripts/integrations. |

You may need to click the (Re-)Generate Key button to create the unique pEncoded value and also Generate API Secret Key.

| API Secret Key |
| --- |
| Be sure to save your API Secret Key in a safe place as it will only be shown to you this once. If you forget your Secret Key you will need to generate a new one. |

Each request in this collection uses a pre-request script to generate the HMAC Authentication and other fields required for the request. Because of this a lot of the data in the Example Requests shown on the right show the variables we're using in the PostMan Request. Most variables are declared in the Environment file.

# Environment

**It is imperitive that you create an Environment file in order to use this collection in PostMan**

If you create an Environment in Postman for the AroFlo site you are testing/developing for then it becomes very easy to use our example collections for each zone, by just setting the Environment you're working in.

Download the [example environment file](https://static.helpjuice.com/helpjuice_production/uploads/upload/image/10945/3643876/AroFloAPI.postman_environment.json), open it in your favourite code editor and update the secret_key, uEncoded, pEncoded, orgEncoded, accept (default is xml) and HostIP fields. Our example collections are setup to pull those environment variables and so you can use our collections without any further editing.

**NB**: If you don't plan to use HostIP then you MUST remove it from the Header as well as from your Auth string.

**NB**: For the sake of clarity, HostIP is the PUBLIC IP address of the machine you are sending requests FROM.

**IF YOU ARE USING POSTMAN WEB, DISABLE HOSTIP.**
This is because the request is being sent from the Postman Web Application and not direct from your computer.

# Status Codes

The following codes are returned on each and every API call you make in the header and in the response body. These help determine if the API call was successful or if an error was encountered.

| STATUS CODE | MESSAGE | MEANING |
| --- | --- | --- |
| -99999 | Authentication Failed - Signatures do not match | You have an error in the way you are generating you HMAC signature. Refer to the comments in the Pre-Req scripts of this PostMan Collection to ensure you are following all requried steps. |
|  | Authentication Failed - AroFlo API setup is invalid | Most likely caused by not generating the auth credentials correctly by forgetting to save after generating the Secret Key. Ensure you copy this key BEFORE you save as it is only shown once |
|  | Authentication Failed - Required headers are missing | You have not included all of the required headers in your request. Confirm that you have included the:Authentication, Authorization, Accept and afdatetimeutc headers. |
|  | Authentication Failed - Payload has expired | Ensure that the computer you are sending on has their time correctly sync'd to a timeserver. We do allow a small window of difference between the datetime you include in your header and the datetime we receive the request, but if it is outside that window you will receive this error. |
| 0 | Login OK | Log in successful, proceed... |
| 0 | Login OK. No WHERE clause found, default filter applied. | No WHERE filter in supplied query, using default filter for the Zone. |
| 1 | Login Failed - Invalid Request String | Checks that uEncoded, pEncoded & orgEncoded all exist |
| 2 | Login Failed - Invalid Username or Password | Checks that uEncoded, pEncoded & orgEncoded contain values and are not empty |
| 3 | Login Failed - Permission Denied | Incorrect Username, Password and/or Org. Or AroFloAPI access is not enabled |
| 4 | Login Failed - Permission Denied | User logged in, but has no AroFloAPI Access enabled |
| 5 | Invalid Request Method | The API Call was neither a GET or POST request |
| 6 | Exceeded Rate Limit - Requests per Minute | Exceeded the 60 requests per minute limit |
|  | Exceeded Rate Limit - Requests per Second | Exceeded the 1 request a second limit |
|  | No Zone Specified | Not Zone was specified in the query. |
| 7 | Exceeded Rate Limit - Daily | Exceeded the 2,000 requests per day limit |
| 8 | Exceeded Size Limit | Exceeded the request size limit of 3.5Mb |
| 20 | Login Failed - Permission Denied | Legacy status code. Due to AroFloAPI Access not enabled via legacy login method |
| 30 | Login Failed - Permission Denied | AroFloAPI has been disabled globally for the entire system |
| 429 | Too Many Requests Per Second (max x3) | Slow down your request speed to conform to the limits |

# Limits

To keep AroFlo performing efficiently and effectively we enabled different limits. This is to ensure that all requests to our API will respond in a timely manor, whilst ensuring our main applications runs smoothly for your business needs.

We encourage all our API users to stay within these limits, if you require help, assistance or advise on using the API please contact AroFlo Support.

## Size Limit

When retrieving data from our API, we have a set 3.5Mb limit on data being returned per request. This can be checked via the response header parameter:

`Content-Length: 98

`If the data returned from your query would be more than 3.5Mb you will get the following error:

```

    8
    Exceeded Size Rate Limit - Please try filtering your request down

```

## Timeout Limit

If your query runs for more than 60 secs AroFlo will timeout the process and return the following error:

```

    888888
    IMSAPI request has timed out - please refine your query.

```
This is to ensure that our servers do not get overrun with long queries and remain performant. If you do get this error, then consider splitting your payload in half and resubmitting (for POSTs) or adding more appropriate filters (where clauses) to your GET request.

## Rate Limit

You can call our API a total of 120 times per minute. Exceeding this will result in an error code. There is also a 3 requests per second limit, to ensure that we do not get flooded by API requests, similar to Denial-of-service (DoS) attacks. To keep track we've provided the following response header parameters to keep track of how many you've got remaining:

```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 108

```

## Daily Limit

There is a daily limit capped at 2000 API calls. At the end of each day we reset the count. Like the above limits we've added header parameters for the Daily Limit.

```
X-RateLimit-Daily-Limit: 2000
X-RateLimit-Daily-Remaining: 702

```

## Secondary Daily Limit

There is also a Secondary Daily Limit for queries for single zone ID, for example; a GET for the Task Zone for a single TaskID. This is currently capped at 20,000 calls per day. Again, header parameters are returned for the Secondary Daily Limit.

```
X-RateLimit-Secondary-Daily-Limit:      20000
X-RateLimit-Secondary-Daily-Remaining:  13953

```

## When are the limits reset?

AroFloAPI Request Limits reset every day at 00:00 AEDT (Australia/Melbourne)

# GET / Retrieve data from AroFlo

To retrieve data, a simple http GET with URL variables is all that's needed provided you are using the correct authentication. For example if we wanted to get a list of all Pending Invoices

`https://api.aroflo.com/?&where=and|status|=|pending&zone=Invoices`

Lets break that down and have a look at each part:

| Base URL | URL Variables |
| --- | --- |
| [https://api.aroflo.com/](https://api.aroflo.com/) | ?&where=and |

Then looking at those variables it breaks down like this:

| Variable Name | Value | Details |
| --- | --- | --- |
| where | and | status |
| zone | invoices | What area are we pulling data from. In this case; invoices |

*Each Zone will have a specific list of additional areas you can join on. See each Zone for the specifics details.*

Most zones allow for where, order & join operations. These should be pretty straight forward:

- where: filter the returned data by one or more requirements

- order: return the data ordered by a particular field

- join: return additional data by joining other areas.

If you want multiple filters (where), sorts (order) or add additional areas (join) you can add additional where,order and join fields to the request. For example; if we wanted to get all pending invoice that where invoiced before 01/06/2017 the query would be:

`http://api.aroflo.com/?&where=|and|dateinvoiced|<|2017-06-01&where=and|status|=|pending&zone=Invoices`

# Paging in AroFlo API

Adding &page=1 will return the first page of data on any GET made to AroFlo. Three important variables are returned to assist with paged requests:

- currentpageresults - How many results were returned in this set

- maxpageresults - What is the maximum number of results that can be returned. This is currently set at 500 items

- pagenumber - the current page of results

If you compare `currentpageresults` to `maxpageresults` you will know if you have to ask for the next page, incrementing pagenumber for the next query. If the value is less than the current maximum you have received the last set of data.

## pageSize

The default page size returned is 500 records. If you specify the `pageSize` variable, you can set how many records per page you would like returned. This allows very large datasets to be broken down into smaller page sizes to avoid any potential timeout or data size limit.

# WHERE Clause

In order to filter data for a request we can use one or more WHERE clauses. Each Zone has a specific set of fields that can be used in a WHERE and these are listed in the beginning of each Zone.

The structure for these queries is a little different to normal SQL in that we always require an and/or at the beginning of each clause, and a `|` separates each element of the filter.

| Default WHERE Clause |
| --- |
| If no WHERE filter is applied to the query, a default WHERE clause will be applied to the query. Each zone has it's own default WHERE clause and is described. |

The following table describes valid structures for making your WHERE filter with a couple examples below to assist with your understanding.

| VARIABLE | VALUE | REQUIRED |
| --- | --- | --- |
| and , or | Operator to use for statement | Yes |
|  |  | pipe seperator |
| ( | Opening Bracket | No |
|  |  | pipe seperator |
| field | Field to check in AroFlo - Zone specific | Yes |
|  |  | pipe seperator |
| = , < , > , != , IN , NOT IN | Comparison Operator | Yes |
|  |  | pipe seperator |
| value | Value you wish to filter / search for - Multiple values seperated by * symbol | Yes |
|  |  | pipe seperator |
| ) | Closing Bracket | No |

## Examples

Example

```
//Get all users with first name "steve" that are archived
&zone=users
&where=and|givennames|=|steve
&where=or|archived|=|true

```
Example with Brackets

```
//Get all Tasks for Client A OR Client B where the Date Requested is 1st December 2017
&zone=tasks
&where=and|(|clientname|=|ClientA
&where=or|clientname|=|ClientB|)
&where=and|daterequested|=|2017-12-01

```

# ORDER BY

Sorting the return data requires you send through one or more "order" variables. Each order statement requires the field you want to sort on and the sort direction separated by a pipe "|"

Variable: order

| VARIABLE | VALUE | REQUIRED |
| --- | --- | --- |
| column | Field to order by in AroFlo - Zone Specific | Yes |
| ` | ` | pipe seperator |
| asc , desc | Ascending or Descending | Yes |

## Example

Example

```
//Order by clientname in descending order
&order=clientname|desc

```

# JOIN

| VARIABLE | VALUE | REQUIRED |
| --- | --- | --- |
| value1,value2 | Comma seperated values - Zone Specific | Yes |

## Example

`&join=locations

`
# POST / Update or Insert data into AroFlo

To Update or Insert data into AroFlo, POST calls should have the content type set as follows: `Content-Type:application/x-www-form-urlencoded` in the header and the body as per the example in the Pre-req scripts in PostMan i.e. as FORM vars with their values urlencoded.

FORM variables are required:

| VARIABLE | VALUE |
| --- | --- |
| zone | AroFlo Data Zones |
| postxml | XML formatted data in AroFlo specific format |

**Note**: Only include the required fields and any fields that can be inserted or updated in the XML. All other fields will be ignored.

## URLEncode postxml

All data should be URL encoded before sending to AroFlo, especially the variable values in postxml data.

# Updates and Inserts

Updates and Inserts are separate operations and so must be sent to AroFloAPI as different calls.


## API Zones (Endpoints)

| Zone | File |
| --- | --- |
| [LastUpdate](lastupdate.md) | 3 endpoints |
| [BusinessUnits](businessunits.md) | 4 endpoints |
| [PermissionGroups](permissiongroups.md) | 1 endpoints |
| [Users](users.md) | 11 endpoints |
| [UserPosition](userposition.md) | 1 endpoints |
| [Timesheets](timesheets.md) | 6 endpoints |
| [TransactionTerms](transactionterms.md) | 1 endpoints |
| [Priorities](priorities.md) | 4 endpoints |
| [Clients](clients.md) | 12 endpoints |
| [ClientNotes](clientnotes.md) | 3 endpoints |
| [Contacts](contacts.md) | 1 endpoints |
| [Locations](locations.md) | 1 endpoints |
| [Quotes](quotes.md) | 6 endpoints |
| [QuoteLineItems](quotelineitems.md) | 1 endpoints |
| [TaskTypes](tasktypes.md) | 2 endpoints |
| [Tasks](tasks.md) | 21 endpoints |
| [TaskMaterials](taskmaterials.md) | 3 endpoints |
| [TaskLabours](tasklabours.md) | 3 endpoints |
| [TaskExpenses](taskexpenses.md) | 1 endpoints |
| [TaskResources](taskresources.md) | 1 endpoints |
| [Invoices](invoices.md) | 7 endpoints |
| [Payments](payments.md) | 1 endpoints |
| [Suppliers](suppliers.md) | 9 endpoints |
| [Inventory](inventory.md) | 3 endpoints |
| [InventoryCategories](inventorycategories.md) | 1 endpoints |
| [InventoryStockLevels](inventorystocklevels.md) | 2 endpoints |
| [CustomHolders](customholders.md) | 1 endpoints |
| [InventoryLists](inventorylists.md) | 3 endpoints |
| [PurchaseOrders](purchaseorders.md) | 8 endpoints |
| [Bills](bills.md) | 5 endpoints |
| [BillLineItems](billlineitems.md) | 3 endpoints |
| [WorkOrders](workorders.md) | 6 endpoints |
| [WorkOrderLineItems](workorderlineitems.md) | 2 endpoints |
| [Assets](assets.md) | 7 endpoints |
| [AssetCategories](assetcategories.md) | 1 endpoints |
| [MessageBoard](messageboard.md) | 1 endpoints |
| [Substatus](substatus.md) | 1 endpoints |
| [DocumentsAndPhotos](documentsandphotos.md) | 2 endpoints |
| [Schedules](schedules.md) | 8 endpoints |
| [Projects](projects.md) | 1 endpoints |
| [Stages](stages.md) | 1 endpoints |
| [MessageTemplates](messagetemplates.md) | 2 endpoints |
| [TrackingCentres](trackingcentres.md) | 1 endpoints |
