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

<!-- End SDK Installation [installation] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Create a new voice AI agent

Create a new agent

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const res = await sdk.createAgent({
        agentName: "Jarvis",
        beginMessage: "Hello there, how can I help you?",
        enableBeginMessage: true,
        enableEndCall: true,
        enableEndMessage: false,
        endMessage: "Hope you have a good day, goodbye.",
        prompt: "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
        voiceId: "11labs-Ryan",
    });

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Create an outbound phone call

Initiate an outbound phone call.

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
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

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Create a web call

Initiate a web call.

```typescript
import { RetellClient } from "retell-sdk";
// Import websocket if not running in browser

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const liveClient = await sdk.createWebCall({
        agentId: "YOUR_AGENT_ID",
        sampleRate: 24000,
        agentPromptParams: [
            {
                name: "username",
                value: "Adam",
            },
        ],
    });

    liveClient.on("audio", (audio: Uint8Array) => {
        // Handle audio here
    });
    liveClient.on("close", (event) => {
        // Handle close here
        console.log(event.code);
    });
}

run();

```

### Create a new phone number

Create a new phone number

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const res = await sdk.createPhoneNumber({
        agentId: "YOUR_AGENT_ID",
        areaCode: 415,
    });

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Delete an existing agent

Delete an existing agent

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const agentId = "YOUR_AGENT_ID";

    const res = await sdk.deleteAgent(agentId);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Delete a specific phone number

Delete a specific phone number

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const phoneNumber = "string";

    const res = await sdk.deletePhoneNumber(phoneNumber);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Retrieve details of an agent

Retrieve details of a specific agent

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const agentId = "16b980523634a6dc504898cda492e939";

    const res = await sdk.getAgent(agentId);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Retrieve a on-going or finished call

Retrieve details of a specific call

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const callId = "119c3f8e47135a29e65947eeb34cf12d";

    const res = await sdk.getCall(callId);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Retrieve info about a specific number

Retrieve info about a specific number

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const phoneNumber = "+14159095857";

    const res = await sdk.getPhoneNumber(phoneNumber);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### List all agents

List all agents

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const res = await sdk.listAgents();

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### List all web or phone calls

Retrieve call details

```typescript
import { RetellClient } from "retell-sdk";
import {} from "retell-sdk/models";
import { SortOrder } from "retell-sdk/models/operations";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const filterCriteria = {
        afterEndTimestamp: 1703302428800,
        afterStartTimestamp: 1703302407300,
        agentId: ["YOUR_AGENT_ID"],
        beforeEndTimestamp: 1703302428899,
        beforeStartTimestamp: 1703302407399,
        callType: [CallType.InboundPhoneCall, CallType.OutboundPhoneCall],
    };
    const limit = 666195;
    const sortOrder = SortOrder.Descending;

    const res = await sdk.listCalls(filterCriteria, limit, sortOrder);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### List all purchased and active phone numbers

List all purchased and active phone numbers

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const res = await sdk.listPhoneNumbers();

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Update an existing agent

Update an existing agent

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const agentNoDefaultNoRequired = {
        agentName: "Jarvis",
        beginMessage: "Hello there, how can I help you.",
        enableBeginMessage: true,
        enableEndCall: true,
        enableEndMessage: false,
        endMessage: "Hope you have a good day, goodbye.",
        prompt: "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
        voiceId: "11labs-Ryan",
    };
    const agentId = "16b980523634a6dc504898cda492e939";

    const res = await sdk.updateAgent(agentNoDefaultNoRequired, agentId);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```

### Update an existing phone number

Update an existing phone number

```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const requestBody = {
        agentId: "YOUR_AGENT_ID",
    };
    const phoneNumber = "+14159095857";

    const res = await sdk.updatePhoneAgent(requestBody, phoneNumber);

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

### [RetellClient SDK](docs/sdks/retellclient/README.md)

* [createAgent](docs/sdks/retellclient/README.md#createagent) - Create a new agent
* [createPhoneCall](docs/sdks/retellclient/README.md#createphonecall) - Initiate an outbound phone call.
* [createPhoneNumber](docs/sdks/retellclient/README.md#createphonenumber) - Create a new phone number
* [deleteAgent](docs/sdks/retellclient/README.md#deleteagent) - Delete an existing agent
* [deletePhoneNumber](docs/sdks/retellclient/README.md#deletephonenumber) - Delete a specific phone number
* [getAgent](docs/sdks/retellclient/README.md#getagent) - Retrieve details of a specific agent
* [getCall](docs/sdks/retellclient/README.md#getcall) - Retrieve details of a specific call
* [getPhoneNumber](docs/sdks/retellclient/README.md#getphonenumber) - Retrieve info about a specific number
* [listAgents](docs/sdks/retellclient/README.md#listagents) - List all agents
* [listCalls](docs/sdks/retellclient/README.md#listcalls) - Retrieve call details
* [listPhoneNumbers](docs/sdks/retellclient/README.md#listphonenumbers) - List all purchased and active phone numbers
* [updateAgent](docs/sdks/retellclient/README.md#updateagent) - Update an existing agent
* [updatePhoneAgent](docs/sdks/retellclient/README.md#updatephoneagent) - Update an existing phone number
<!-- End Available Resources and Operations [operations] -->

<!-- Start Error Handling [errors] -->
## Error Handling

All SDK methods return a response object or throw an error. If Error objects are specified in your OpenAPI Spec, the SDK will throw the appropriate Error type.

| Error Object                              | Status Code                               | Content Type                              |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| errors.CreateAgentResponseBody            | 400                                       | application/json                          |
| errors.CreateAgentResponseResponseBody    | 401                                       | application/json                          |
| errors.CreateAgentResponse422ResponseBody | 422                                       | application/json                          |
| errors.CreateAgentResponse500ResponseBody | 500                                       | application/json                          |
| errors.SDKError                           | 4xx-5xx                                   | */*                                       |

Example

```typescript
import { RetellClient } from "retell-sdk";
import * as errors from "retell-sdk/models/errors";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const res = await sdk
        .createAgent({
            agentName: "Jarvis",
            beginMessage: "Hello there, how can I help you?",
            enableBeginMessage: true,
            enableEndCall: true,
            enableEndMessage: false,
            endMessage: "Hope you have a good day, goodbye.",
            prompt: "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
            voiceId: "11labs-Ryan",
        })
        .catch((err) => {
            if (err instanceof errors.CreateAgentResponseBody) {
                console.error(err); // handle exception
                return null;
            } else if (err instanceof errors.CreateAgentResponseResponseBody) {
                console.error(err); // handle exception
                return null;
            } else if (err instanceof errors.CreateAgentResponse422ResponseBody) {
                console.error(err); // handle exception
                return null;
            } else if (err instanceof errors.CreateAgentResponse500ResponseBody) {
                console.error(err); // handle exception
                return null;
            } else {
                throw err;
            }
        });

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Select Server by Index

You can override the default server globally by passing a server index to the `serverIdx: number` optional parameter when initializing the SDK client instance. The selected server will then be used as the default on the operations that use it. This table lists the indexes associated with the available servers:

| # | Server | Variables |
| - | ------ | --------- |
| 0 | `https://api.re-tell.ai` | None |




### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: str` optional parameter when initializing the SDK client instance. For example:
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { RetellClient } from "retell-sdk";
import { HTTPClient } from "retell-sdk/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000);
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new RetellClient({ httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name        | Type        | Scheme      |
| ----------- | ----------- | ----------- |
| `apiKey`    | http        | HTTP Bearer |

To authenticate with the API the `apiKey` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { RetellClient } from "retell-sdk";

async function run() {
    const sdk = new RetellClient({
        apiKey: "YOUR_API_KEY",
    });

    const res = await sdk.createAgent({
        agentName: "Jarvis",
        beginMessage: "Hello there, how can I help you?",
        enableBeginMessage: true,
        enableEndCall: true,
        enableEndMessage: false,
        endMessage: "Hope you have a good day, goodbye.",
        prompt: "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
        voiceId: "11labs-Ryan",
    });

    if (res?.statusCode !== 200) {
        throw new Error("Unexpected status code: " + res?.statusCode || "-");
    }

    // handle response
}

run();

```
<!-- End Authentication [security] -->