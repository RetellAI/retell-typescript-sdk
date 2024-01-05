# retell-sdk

<div align="left">
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>

<!-- Start SDK Installation [installation] -->

## SDK Installation

### NPM

```bash
npm add retell-sdk
```

### Yarn

```bash
yarn add retell-sdk
```

<!-- End SDK Installation [installation] -->

<!-- Start SDK Example Usage [usage] -->

## SDK Example Usage

### Create a new voice AI agent

Create a new agent

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
    prompt:
      "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
    voiceId: "elevenlabs-xxcrwXReTKMHWjqi7Q27",
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Create an outbound phone call

Initiate an outbound phone call.

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

### Create a new phone number

Create a new phone number

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

### Delete an existing agent

Delete an existing agent

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

### Delete a specific phone number

Delete a specific phone number

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

### Retrieve details of an agent

Retrieve details of a specific agent

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

### Retrieve a on-going or finished call

Retrieve details of a specific call

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

### Retrieve info about a specific number

Retrieve info about a specific number

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

### List all agents

List all agents

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

### List all web or phone calls

Retrieve call details

```typescript
import { RetellClient } from "retell-sdk";
import {
  CallType,
  FilterCriteria,
  ListCallsRequest,
  SortOrder,
} from "retell-sdk/dist/models/operations";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });
  const filterCriteria: FilterCriteria = {
    afterEndTimestamp: 1703302428800,
    afterStartTimestamp: 1703302407300,
    agentId: ["oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD"],
    beforeEndTimestamp: 1703302428899,
    beforeStartTimestamp: 1703302407399,
    callType: [CallType.InboundPhoneCall, CallType.OutboundPhoneCall],
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

### List all purchased and active phone numbers

List all purchased and active phone numbers

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

### Update an existing agent

Update an existing agent

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
    prompt:
      "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
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

### Update an existing phone number

Update an existing phone number

```typescript
import { RetellClient } from "retell-sdk";
import {
  UpdatePhoneAgentRequest,
  UpdatePhoneAgentRequestBody,
} from "retell-sdk/dist/models/operations";

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

<!-- End SDK Example Usage [usage] -->

<!-- Start Available Resources and Operations [operations] -->

## Available Resources and Operations

### [RetellClient SDK](docs/sdks/retellclient/README.md)

- [createAgent](docs/sdks/retellclient/README.md#createagent) - Create a new agent
- [createPhoneCall](docs/sdks/retellclient/README.md#createphonecall) - Initiate an outbound phone call.
- [createPhoneNumber](docs/sdks/retellclient/README.md#createphonenumber) - Create a new phone number
- [deleteAgent](docs/sdks/retellclient/README.md#deleteagent) - Delete an existing agent
- [deletePhoneNumber](docs/sdks/retellclient/README.md#deletephonenumber) - Delete a specific phone number
- [getAgent](docs/sdks/retellclient/README.md#getagent) - Retrieve details of a specific agent
- [getCall](docs/sdks/retellclient/README.md#getcall) - Retrieve details of a specific call
- [getPhoneNumber](docs/sdks/retellclient/README.md#getphonenumber) - Retrieve info about a specific number
- [listAgents](docs/sdks/retellclient/README.md#listagents) - List all agents
- [listCalls](docs/sdks/retellclient/README.md#listcalls) - Retrieve call details
- [listPhoneNumbers](docs/sdks/retellclient/README.md#listphonenumbers) - List all purchased and active phone numbers
- [updateAgent](docs/sdks/retellclient/README.md#updateagent) - Update an existing agent
- [updatePhoneAgent](docs/sdks/retellclient/README.md#updatephoneagent) - Update an existing phone number
<!-- End Available Resources and Operations [operations] -->

<!-- Start Error Handling [errors] -->

## Error Handling

Handling errors in this SDK should largely match your expectations. All operations return a response object or throw an error. If Error objects are specified in your OpenAPI Spec, the SDK will throw the appropriate Error type.

| Error Object                              | Status Code | Content Type     |
| ----------------------------------------- | ----------- | ---------------- |
| errors.CreateAgentResponseBody            | 400         | application/json |
| errors.CreateAgentResponseResponseBody    | 401         | application/json |
| errors.CreateAgentResponse422ResponseBody | 422         | application/json |
| errors.CreateAgentResponse500ResponseBody | 500         | application/json |
| errors.SDKError                           | 400-600     | _/_              |

Example

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    apiKey: "",
  });

  let res;
  try {
    res = await sdk.createAgent({
      agentName: "Jarvis",
      beginMessage: "Hello there, how can I help you?",
      enableBeginMessage: true,
      enableEndCall: true,
      enableEndMessage: false,
      endMessage: "Hope you have a good day, goodbye.",
      prompt:
        "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
      voiceId: "elevenlabs-xxcrwXReTKMHWjqi7Q27",
    });
  } catch (err) {
    if (err instanceof errors.CreateAgentResponseBody) {
      console.error(err); // handle exception
      throw err;
    } else if (err instanceof errors.CreateAgentResponseResponseBody) {
      console.error(err); // handle exception
      throw err;
    } else if (err instanceof errors.CreateAgentResponse422ResponseBody) {
      console.error(err); // handle exception
      throw err;
    } else if (err instanceof errors.CreateAgentResponse500ResponseBody) {
      console.error(err); // handle exception
      throw err;
    } else if (err instanceof errors.SDKError) {
      console.error(err); // handle exception
      throw err;
    }
  }

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->

## Server Selection

### Select Server by Index

You can override the default server globally by passing a server index to the `serverIdx: number` optional parameter when initializing the SDK client instance. The selected server will then be used as the default on the operations that use it. This table lists the indexes associated with the available servers:

| #   | Server                   | Variables |
| --- | ------------------------ | --------- |
| 0   | `https://api.re-tell.ai` | None      |

#### Example

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    serverIdx: 0,
    apiKey: "",
  });

  const res = await sdk.createAgent({
    agentName: "Jarvis",
    beginMessage: "Hello there, how can I help you?",
    enableBeginMessage: true,
    enableEndCall: true,
    enableEndMessage: false,
    endMessage: "Hope you have a good day, goodbye.",
    prompt:
      "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
    voiceId: "elevenlabs-xxcrwXReTKMHWjqi7Q27",
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: str` optional parameter when initializing the SDK client instance. For example:

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
  const sdk = new RetellClient({
    serverURL: "https://api.re-tell.ai",
    apiKey: "",
  });

  const res = await sdk.createAgent({
    agentName: "Jarvis",
    beginMessage: "Hello there, how can I help you?",
    enableBeginMessage: true,
    enableEndCall: true,
    enableEndMessage: false,
    endMessage: "Hope you have a good day, goodbye.",
    prompt:
      "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
    voiceId: "elevenlabs-xxcrwXReTKMHWjqi7Q27",
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->

## Custom HTTP Client

The Typescript SDK makes API calls using the [axios](https://axios-http.com/docs/intro) HTTP library. In order to provide a convenient way to configure timeouts, cookies, proxies, custom headers, and other low-level configuration, you can initialize the SDK client with a custom `AxiosInstance` object.

For example, you could specify a header for every request that your sdk makes as follows:

```typescript
import { retell-sdk } from "RetellClient";
import axios from "axios";

const httpClient = axios.create({
    headers: {'x-custom-header': 'someValue'}
})

const sdk = new RetellClient({defaultClient: httpClient});
```

<!-- End Custom HTTP Client [http-client] -->

<!-- Start Authentication [security] -->

## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name     | Type | Scheme      |
| -------- | ---- | ----------- |
| `apiKey` | http | HTTP Bearer |

To authenticate with the API the `apiKey` parameter must be set when initializing the SDK client instance. For example:

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
    prompt:
      "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
    voiceId: "elevenlabs-xxcrwXReTKMHWjqi7Q27",
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

<!-- End Authentication [security] -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically.
Feel free to open a PR or a Github issue as a proof of concept and we'll do our best to include it in a future release!
