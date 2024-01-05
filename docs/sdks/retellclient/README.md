# RetellClient SDK


## Overview

### Available Operations

* [createAgent](#createagent) - Create a new agent
* [createPhoneCall](#createphonecall) - Initiate an outbound phone call.
* [createPhoneNumber](#createphonenumber) - Create a new phone number
* [deleteAgent](#deleteagent) - Delete an existing agent
* [deletePhoneNumber](#deletephonenumber) - Delete a specific phone number
* [getAgent](#getagent) - Retrieve details of a specific agent
* [getCall](#getcall) - Retrieve details of a specific call
* [getPhoneNumber](#getphonenumber) - Retrieve info about a specific number
* [listAgents](#listagents) - List all agents
* [listCalls](#listcalls) - Retrieve call details
* [listPhoneNumbers](#listphonenumbers) - List all purchased and active phone numbers
* [updateAgent](#updateagent) - Update an existing agent
* [updatePhoneAgent](#updatephoneagent) - Update an existing phone number

## createAgent

Create a new agent

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });

  const res = await sdk.createAgent({
    agentName: "Jarvis",
    beginMessage: "Hello there, how can I help you?",
    enableBeginMessage: true,
    enableEndCall: true,
    enableEndMessage: false,
    endMessage: "Hope you have a good day, goodbye.",
    prompt: "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
    voiceId: "elevenlabs-xxcrwXReTKMHWjqi7Q27",
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                              | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `request`                                                                              | [operations.CreateAgentRequestBody](../../models/operations/createagentrequestbody.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.CreateAgentResponse](../../models/operations/createagentresponse.md)>**
### Errors

| Error Object                              | Status Code                               | Content Type                              |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| errors.CreateAgentResponseBody            | 400                                       | application/json                          |
| errors.CreateAgentResponseResponseBody    | 401                                       | application/json                          |
| errors.CreateAgentResponse422ResponseBody | 422                                       | application/json                          |
| errors.CreateAgentResponse500ResponseBody | 500                                       | application/json                          |
| errors.SDKError                           | 400-600                                   | */*                                       |

## createPhoneCall

Initiate an outbound phone call.

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });

  const res = await sdk.createPhoneCall({
    agentPromptParams: [
      {
        name: "username",
        value: "Adam",
      },
    ],
    phoneNumber: {
      from: "+14159095857",
      to: "+14159095858",
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                      | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `request`                                                                                      | [operations.CreatePhoneCallRequestBody](../../models/operations/createphonecallrequestbody.md) | :heavy_check_mark:                                                                             | The request object to use for the request.                                                     |
| `config`                                                                                       | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                   | :heavy_minus_sign:                                                                             | Available config options for making requests.                                                  |


### Response

**Promise<[operations.CreatePhoneCallResponse](../../models/operations/createphonecallresponse.md)>**
### Errors

| Error Object                                  | Status Code                                   | Content Type                                  |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| errors.CreatePhoneCallResponseBody            | 400                                           | application/json                              |
| errors.CreatePhoneCallResponseResponseBody    | 401                                           | application/json                              |
| errors.CreatePhoneCallResponse402ResponseBody | 402                                           | application/json                              |
| errors.CreatePhoneCallResponse422ResponseBody | 422                                           | application/json                              |
| errors.CreatePhoneCallResponse429ResponseBody | 429                                           | application/json                              |
| errors.CreatePhoneCallResponse500ResponseBody | 500                                           | application/json                              |
| errors.SDKError                               | 400-600                                       | */*                                           |

## createPhoneNumber

Create a new phone number

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });

  const res = await sdk.createPhoneNumber({
    agentId: "oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD",
    areaCode: 415,
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                          | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `request`                                                                                          | [operations.CreatePhoneNumberRequestBody](../../models/operations/createphonenumberrequestbody.md) | :heavy_check_mark:                                                                                 | The request object to use for the request.                                                         |
| `config`                                                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                       | :heavy_minus_sign:                                                                                 | Available config options for making requests.                                                      |


### Response

**Promise<[operations.CreatePhoneNumberResponse](../../models/operations/createphonenumberresponse.md)>**
### Errors

| Error Object                                    | Status Code                                     | Content Type                                    |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| errors.CreatePhoneNumberResponseBody            | 400                                             | application/json                                |
| errors.CreatePhoneNumberResponseResponseBody    | 401                                             | application/json                                |
| errors.CreatePhoneNumberResponse402ResponseBody | 402                                             | application/json                                |
| errors.CreatePhoneNumberResponse422ResponseBody | 422                                             | application/json                                |
| errors.CreatePhoneNumberResponse500ResponseBody | 500                                             | application/json                                |
| errors.SDKError                                 | 400-600                                         | */*                                             |

## deleteAgent

Delete an existing agent

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { DeleteAgentRequest } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const agentId: string = "oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD";

  const res = await sdk.deleteAgent(agentId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `agentId`                                                    | *string*                                                     | :heavy_check_mark:                                           | Unique id of the agent to be deleted.                        | oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD                             |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |                                                              |


### Response

**Promise<[operations.DeleteAgentResponse](../../models/operations/deleteagentresponse.md)>**
### Errors

| Error Object                              | Status Code                               | Content Type                              |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| errors.DeleteAgentResponseBody            | 400                                       | application/json                          |
| errors.DeleteAgentResponseResponseBody    | 401                                       | application/json                          |
| errors.DeleteAgentResponse422ResponseBody | 422                                       | application/json                          |
| errors.DeleteAgentResponse500ResponseBody | 500                                       | application/json                          |
| errors.SDKError                           | 400-600                                   | */*                                       |

## deletePhoneNumber

Delete a specific phone number

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { DeletePhoneNumberRequest } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const phoneNumber: string = "string";

  const res = await sdk.deletePhoneNumber(phoneNumber);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `phoneNumber`                                                | *string*                                                     | :heavy_check_mark:                                           | Phone number to delete in E.164 format.                      |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeletePhoneNumberResponse](../../models/operations/deletephonenumberresponse.md)>**
### Errors

| Error Object                                    | Status Code                                     | Content Type                                    |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| errors.DeletePhoneNumberResponseBody            | 400                                             | application/json                                |
| errors.DeletePhoneNumberResponseResponseBody    | 401                                             | application/json                                |
| errors.DeletePhoneNumberResponse422ResponseBody | 422                                             | application/json                                |
| errors.DeletePhoneNumberResponse500ResponseBody | 500                                             | application/json                                |
| errors.SDKError                                 | 400-600                                         | */*                                             |

## getAgent

Retrieve details of a specific agent

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { GetAgentRequest } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const agentId: string = "16b980523634a6dc504898cda492e939";

  const res = await sdk.getAgent(agentId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `agentId`                                                    | *string*                                                     | :heavy_check_mark:                                           | Unique id of the agent to be retrieved.                      | 16b980523634a6dc504898cda492e939                             |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |                                                              |


### Response

**Promise<[operations.GetAgentResponse](../../models/operations/getagentresponse.md)>**
### Errors

| Error Object                           | Status Code                            | Content Type                           |
| -------------------------------------- | -------------------------------------- | -------------------------------------- |
| errors.GetAgentResponseBody            | 400                                    | application/json                       |
| errors.GetAgentResponseResponseBody    | 401                                    | application/json                       |
| errors.GetAgentResponse422ResponseBody | 422                                    | application/json                       |
| errors.GetAgentResponse500ResponseBody | 500                                    | application/json                       |
| errors.SDKError                        | 400-600                                | */*                                    |

## getCall

Retrieve details of a specific call

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { GetCallRequest } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const callId: string = "119c3f8e47135a29e65947eeb34cf12d";

  const res = await sdk.getCall(callId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `callId`                                                     | *string*                                                     | :heavy_check_mark:                                           | The call id to retrieve call history for.                    | 119c3f8e47135a29e65947eeb34cf12d                             |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |                                                              |


### Response

**Promise<[operations.GetCallResponse](../../models/operations/getcallresponse.md)>**
### Errors

| Error Object                          | Status Code                           | Content Type                          |
| ------------------------------------- | ------------------------------------- | ------------------------------------- |
| errors.GetCallResponseBody            | 400                                   | application/json                      |
| errors.GetCallResponseResponseBody    | 401                                   | application/json                      |
| errors.GetCallResponse422ResponseBody | 422                                   | application/json                      |
| errors.GetCallResponse500ResponseBody | 500                                   | application/json                      |
| errors.SDKError                       | 400-600                               | */*                                   |

## getPhoneNumber

Retrieve info about a specific number

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { GetPhoneNumberRequest } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const phoneNumber: string = "+14159095857";

  const res = await sdk.getPhoneNumber(phoneNumber);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `phoneNumber`                                                | *string*                                                     | :heavy_check_mark:                                           | Phone number in E.164 format to retreive more information.   | +14159095857                                                 |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |                                                              |


### Response

**Promise<[operations.GetPhoneNumberResponse](../../models/operations/getphonenumberresponse.md)>**
### Errors

| Error Object                                 | Status Code                                  | Content Type                                 |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| errors.GetPhoneNumberResponseBody            | 400                                          | application/json                             |
| errors.GetPhoneNumberResponseResponseBody    | 401                                          | application/json                             |
| errors.GetPhoneNumberResponse422ResponseBody | 422                                          | application/json                             |
| errors.GetPhoneNumberResponse500ResponseBody | 500                                          | application/json                             |
| errors.SDKError                              | 400-600                                      | */*                                          |

## listAgents

List all agents

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });

  const res = await sdk.listAgents();

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.ListAgentsResponse](../../models/operations/listagentsresponse.md)>**
### Errors

| Error Object                          | Status Code                           | Content Type                          |
| ------------------------------------- | ------------------------------------- | ------------------------------------- |
| errors.ListAgentsResponseBody         | 401                                   | application/json                      |
| errors.ListAgentsResponseResponseBody | 500                                   | application/json                      |
| errors.SDKError                       | 400-600                               | */*                                   |

## listCalls

Retrieve call details

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { CallType, FilterCriteria, ListCallsRequest, SortOrder } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const filterCriteria: FilterCriteria = {
  afterEndTimestamp: 1703302428800,
  afterStartTimestamp: 1703302407300,
  agentId: [
    "oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD",
  ],
  beforeEndTimestamp: 1703302428899,
  beforeStartTimestamp: 1703302407399,
  callType: [
    CallType.InboundPhoneCall,
    CallType.OutboundPhoneCall,
  ],
};
const limit: number = 666195;
const sortOrder: SortOrder = SortOrder.Descending;

  const res = await sdk.listCalls(filterCriteria, limit, sortOrder);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                                    | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `filterCriteria`                                                                                             | [operations.FilterCriteria](../../models/operations/filtercriteria.md)                                       | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |
| `limit`                                                                                                      | *number*                                                                                                     | :heavy_minus_sign:                                                                                           | Limit the number of calls returned.                                                                          |
| `sortOrder`                                                                                                  | [operations.SortOrder](../../models/operations/sortorder.md)                                                 | :heavy_minus_sign:                                                                                           | The calls will be sorted by `start_timestamp`, whether to return the calls in ascending or descending order. |
| `config`                                                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                                 | :heavy_minus_sign:                                                                                           | Available config options for making requests.                                                                |


### Response

**Promise<[operations.ListCallsResponse](../../models/operations/listcallsresponse.md)>**
### Errors

| Error Object                            | Status Code                             | Content Type                            |
| --------------------------------------- | --------------------------------------- | --------------------------------------- |
| errors.ListCallsResponseBody            | 400                                     | application/json                        |
| errors.ListCallsResponseResponseBody    | 401                                     | application/json                        |
| errors.ListCallsResponse500ResponseBody | 500                                     | application/json                        |
| errors.SDKError                         | 400-600                                 | */*                                     |

## listPhoneNumbers

List all purchased and active phone numbers

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });

  const res = await sdk.listPhoneNumbers();

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.ListPhoneNumbersResponse](../../models/operations/listphonenumbersresponse.md)>**
### Errors

| Error Object                                   | Status Code                                    | Content Type                                   |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| errors.ListPhoneNumbersResponseBody            | 400                                            | application/json                               |
| errors.ListPhoneNumbersResponseResponseBody    | 401                                            | application/json                               |
| errors.ListPhoneNumbersResponse500ResponseBody | 500                                            | application/json                               |
| errors.SDKError                                | 400-600                                        | */*                                            |

## updateAgent

Update an existing agent

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { AgentNoDefaultNoRequired } from "retell-sdk/dist/models/components";
import { UpdateAgentRequest } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const agentNoDefaultNoRequired: AgentNoDefaultNoRequired = {
  agentName: "Jarvis",
  beginMessage: "Hello there, how can I help you.",
  enableBeginMessage: true,
  enableEndCall: true,
  enableEndMessage: false,
  endMessage: "Hope you have a good day, goodbye.",
  prompt: "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
  voiceId: "elevenlabs-xxcrwXReTKMHWjqi7Q27",
};
const agentId: string = "16b980523634a6dc504898cda492e939";

  const res = await sdk.updateAgent(agentNoDefaultNoRequired, agentId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                  | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `agentNoDefaultNoRequired`                                                                 | [components.AgentNoDefaultNoRequired](../../models/components/agentnodefaultnorequired.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `agentId`                                                                                  | *string*                                                                                   | :heavy_check_mark:                                                                         | Unique id of the agent to be updated.                                                      | 16b980523634a6dc504898cda492e939                                                           |
| `config`                                                                                   | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                               | :heavy_minus_sign:                                                                         | Available config options for making requests.                                              |                                                                                            |


### Response

**Promise<[operations.UpdateAgentResponse](../../models/operations/updateagentresponse.md)>**
### Errors

| Error Object                              | Status Code                               | Content Type                              |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| errors.UpdateAgentResponseBody            | 400                                       | application/json                          |
| errors.UpdateAgentResponseResponseBody    | 401                                       | application/json                          |
| errors.UpdateAgentResponse422ResponseBody | 422                                       | application/json                          |
| errors.UpdateAgentResponse500ResponseBody | 500                                       | application/json                          |
| errors.SDKError                           | 400-600                                   | */*                                       |

## updatePhoneAgent

Update an existing phone number

### Example Usage

```typescript
import { RetellClient } from "retell-sdk";
import { UpdatePhoneAgentRequest, UpdatePhoneAgentRequestBody } from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
const requestBody: UpdatePhoneAgentRequestBody = {
  agentId: "oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD",
};
const phoneNumber: string = "+14159095857";

  const res = await sdk.updatePhoneAgent(requestBody, phoneNumber);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                        | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `requestBody`                                                                                    | [operations.UpdatePhoneAgentRequestBody](../../models/operations/updatephoneagentrequestbody.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `phoneNumber`                                                                                    | *string*                                                                                         | :heavy_check_mark:                                                                               | Phone number in E.164 format that require agent update.                                          | +14159095857                                                                                     |
| `config`                                                                                         | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                     | :heavy_minus_sign:                                                                               | Available config options for making requests.                                                    |                                                                                                  |


### Response

**Promise<[operations.UpdatePhoneAgentResponse](../../models/operations/updatephoneagentresponse.md)>**
### Errors

| Error Object                                   | Status Code                                    | Content Type                                   |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| errors.UpdatePhoneAgentResponseBody            | 400                                            | application/json                               |
| errors.UpdatePhoneAgentResponseResponseBody    | 401                                            | application/json                               |
| errors.UpdatePhoneAgentResponse422ResponseBody | 422                                            | application/json                               |
| errors.UpdatePhoneAgentResponse500ResponseBody | 500                                            | application/json                               |
| errors.SDKError                                | 400-600                                        | */*                                            |
