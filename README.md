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
npm i retell-sdk
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
