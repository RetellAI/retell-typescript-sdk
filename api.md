# Call

Types:

- <code><a href="./src/resources/call.ts">CallResponse</a></code>
- <code><a href="./src/resources/call.ts">PhoneCallResponse</a></code>
- <code><a href="./src/resources/call.ts">WebCallResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListResponse</a></code>

Methods:

- <code title="get /v2/get-call/{call_id}">client.call.<a href="./src/resources/call.ts">retrieve</a>(callId) -> CallResponse</code>
- <code title="post /v2/list-calls">client.call.<a href="./src/resources/call.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="post /v2/create-phone-call">client.call.<a href="./src/resources/call.ts">createPhoneCall</a>({ ...params }) -> PhoneCallResponse</code>
- <code title="post /v2/create-web-call">client.call.<a href="./src/resources/call.ts">createWebCall</a>({ ...params }) -> WebCallResponse</code>
- <code title="post /v2/register-phone-call">client.call.<a href="./src/resources/call.ts">registerPhoneCall</a>({ ...params }) -> PhoneCallResponse</code>

# PhoneNumber

Types:

- <code><a href="./src/resources/phone-number.ts">PhoneNumberResponse</a></code>
- <code><a href="./src/resources/phone-number.ts">PhoneNumberListResponse</a></code>

Methods:

- <code title="post /create-phone-number">client.phoneNumber.<a href="./src/resources/phone-number.ts">create</a>({ ...params }) -> PhoneNumberResponse</code>
- <code title="get /get-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">retrieve</a>(phoneNumber) -> PhoneNumberResponse</code>
- <code title="patch /update-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">update</a>(phoneNumber, { ...params }) -> PhoneNumberResponse</code>
- <code title="get /list-phone-numbers">client.phoneNumber.<a href="./src/resources/phone-number.ts">list</a>() -> PhoneNumberListResponse</code>
- <code title="delete /delete-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">delete</a>(phoneNumber) -> void</code>
- <code title="post /import-phone-number">client.phoneNumber.<a href="./src/resources/phone-number.ts">import</a>({ ...params }) -> PhoneNumberResponse</code>

# Agent

Types:

- <code><a href="./src/resources/agent.ts">AgentResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentListResponse</a></code>

Methods:

- <code title="post /create-agent">client.agent.<a href="./src/resources/agent.ts">create</a>({ ...params }) -> AgentResponse</code>
- <code title="get /get-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">retrieve</a>(agentId) -> AgentResponse</code>
- <code title="patch /update-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">update</a>(agentId, { ...params }) -> AgentResponse</code>
- <code title="get /list-agents">client.agent.<a href="./src/resources/agent.ts">list</a>() -> AgentListResponse</code>
- <code title="delete /delete-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">delete</a>(agentId) -> void</code>

# Llm

Types:

- <code><a href="./src/resources/llm.ts">LlmResponse</a></code>
- <code><a href="./src/resources/llm.ts">LlmListResponse</a></code>

Methods:

- <code title="post /create-retell-llm">client.llm.<a href="./src/resources/llm.ts">create</a>({ ...params }) -> LlmResponse</code>
- <code title="get /get-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">retrieve</a>(llmId) -> LlmResponse</code>
- <code title="patch /update-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">update</a>(llmId, { ...params }) -> LlmResponse</code>
- <code title="get /list-retell-llms">client.llm.<a href="./src/resources/llm.ts">list</a>() -> LlmListResponse</code>
- <code title="delete /delete-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">delete</a>(llmId) -> void</code>

# Voice

Types:

- <code><a href="./src/resources/voice.ts">VoiceResponse</a></code>
- <code><a href="./src/resources/voice.ts">VoiceListResponse</a></code>

Methods:

- <code title="get /get-voice/{voice_id}">client.voice.<a href="./src/resources/voice.ts">retrieve</a>(voiceId) -> VoiceResponse</code>
- <code title="get /list-voices">client.voice.<a href="./src/resources/voice.ts">list</a>() -> VoiceListResponse</code>

# Concurrency

Types:

- <code><a href="./src/resources/concurrency.ts">ConcurrencyRetrieveResponse</a></code>

Methods:

- <code title="get /get-concurrency">client.concurrency.<a href="./src/resources/concurrency.ts">retrieve</a>() -> ConcurrencyRetrieveResponse</code>
