# Call

Types:

- <code><a href="./src/resources/call.ts">CallCreateResponse</a></code>
- <code><a href="./src/resources/call.ts">CallRetrieveResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListResponse</a></code>
- <code><a href="./src/resources/call.ts">CallRegisterResponse</a></code>

Methods:

- <code title="post /create-phone-call">client.call.<a href="./src/resources/call.ts">create</a>({ ...params }) -> CallCreateResponse</code>
- <code title="get /get-call/{call_id}">client.call.<a href="./src/resources/call.ts">retrieve</a>(callId) -> CallRetrieveResponse</code>
- <code title="get /list-calls">client.call.<a href="./src/resources/call.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="post /register-call">client.call.<a href="./src/resources/call.ts">register</a>({ ...params }) -> CallRegisterResponse</code>

# PhoneNumber

Types:

- <code><a href="./src/resources/phone-number.ts">PhoneNumberCreateResponse</a></code>
- <code><a href="./src/resources/phone-number.ts">PhoneNumberRetrieveResponse</a></code>
- <code><a href="./src/resources/phone-number.ts">PhoneNumberUpdateResponse</a></code>
- <code><a href="./src/resources/phone-number.ts">PhoneNumberListResponse</a></code>

Methods:

- <code title="post /create-phone-number">client.phoneNumber.<a href="./src/resources/phone-number.ts">create</a>({ ...params }) -> PhoneNumberCreateResponse</code>
- <code title="get /get-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">retrieve</a>(phoneNumber) -> PhoneNumberRetrieveResponse</code>
- <code title="patch /update-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">update</a>(phoneNumber, { ...params }) -> PhoneNumberUpdateResponse</code>
- <code title="get /list-phone-number">client.phoneNumber.<a href="./src/resources/phone-number.ts">list</a>() -> PhoneNumberListResponse</code>
- <code title="delete /delete-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">delete</a>(phoneNumber) -> void</code>

# Agent

Types:

- <code><a href="./src/resources/agent.ts">AgentCreateResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentRetrieveResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentUpdateResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentListResponse</a></code>

Methods:

- <code title="post /create-agent">client.agent.<a href="./src/resources/agent.ts">create</a>({ ...params }) -> AgentCreateResponse</code>
- <code title="get /get-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">retrieve</a>(agentId) -> AgentRetrieveResponse</code>
- <code title="patch /update-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">update</a>(agentId, { ...params }) -> AgentUpdateResponse</code>
- <code title="get /list-agents">client.agent.<a href="./src/resources/agent.ts">list</a>() -> AgentListResponse</code>
- <code title="delete /delete-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">delete</a>(agentId) -> void</code>

# Llm

Types:

- <code><a href="./src/resources/llm.ts">LlmCreateResponse</a></code>
- <code><a href="./src/resources/llm.ts">LlmRetrieveResponse</a></code>
- <code><a href="./src/resources/llm.ts">LlmUpdateResponse</a></code>
- <code><a href="./src/resources/llm.ts">LlmListResponse</a></code>

Methods:

- <code title="post /create-retell-llm">client.llm.<a href="./src/resources/llm.ts">create</a>({ ...params }) -> LlmCreateResponse</code>
- <code title="get /get-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">retrieve</a>(llmId) -> LlmRetrieveResponse</code>
- <code title="patch /update-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">update</a>(llmId, { ...params }) -> LlmUpdateResponse</code>
- <code title="get /list-retell-llm">client.llm.<a href="./src/resources/llm.ts">list</a>() -> LlmListResponse</code>
- <code title="delete /delete-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">delete</a>(llmId) -> void</code>
