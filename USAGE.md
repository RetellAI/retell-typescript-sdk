<!-- Start SDK Example Usage [usage] -->
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
        prompt: "You are a marketing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You respond concisely, with filler words in it.",
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