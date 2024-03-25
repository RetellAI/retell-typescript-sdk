# Shared

Types:

- <code><a href="./src/resources/shared.ts">CallBase</a></code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">CallListResponse</a></code>

Methods:

- <code title="post /create-phone-call">client.calls.<a href="./src/resources/calls.ts">create</a>({ ...params }) -> CallBase</code>
- <code title="get /get-call/{call_id}">client.calls.<a href="./src/resources/calls.ts">retrieve</a>(callId) -> CallBase</code>
- <code title="get /list-calls">client.calls.<a href="./src/resources/calls.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="post /register-call">client.calls.<a href="./src/resources/calls.ts">register</a>({ ...params }) -> CallBase</code>

# PhoneNumbers

Types:

- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberCreateResponse</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberRetrieveResponse</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberUpdateResponse</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberListResponse</a></code>

Methods:

- <code title="post /create-phone-number">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">create</a>({ ...params }) -> PhoneNumberCreateResponse</code>
- <code title="get /get-phone-number/{phone_number}">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">retrieve</a>(phoneNumber) -> PhoneNumberRetrieveResponse</code>
- <code title="patch /update-phone-number/{phone_number}">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">update</a>(phoneNumber, { ...params }) -> PhoneNumberUpdateResponse</code>
- <code title="get /list-phone-number">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">list</a>() -> PhoneNumberListResponse</code>
- <code title="delete /delete-phone-number/{phone_number}">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">delete</a>(phoneNumber) -> void</code>

# Agents

Types:

- <code><a href="./src/resources/agents.ts">AgentCreateResponse</a></code>
- <code><a href="./src/resources/agents.ts">AgentRetrieveResponse</a></code>
- <code><a href="./src/resources/agents.ts">AgentUpdateResponse</a></code>
- <code><a href="./src/resources/agents.ts">AgentListResponse</a></code>

Methods:

- <code title="post /create-agent">client.agents.<a href="./src/resources/agents.ts">create</a>({ ...params }) -> AgentCreateResponse</code>
- <code title="get /get-agent/{agent_id}">client.agents.<a href="./src/resources/agents.ts">retrieve</a>(agentId) -> AgentRetrieveResponse</code>
- <code title="patch /update-agent/{agent_id}">client.agents.<a href="./src/resources/agents.ts">update</a>(agentId, { ...params }) -> AgentUpdateResponse</code>
- <code title="get /list-agents">client.agents.<a href="./src/resources/agents.ts">list</a>() -> AgentListResponse</code>
- <code title="delete /delete-agent/{agent_id}">client.agents.<a href="./src/resources/agents.ts">delete</a>(agentId) -> void</code>

# RetellLlms

Types:

- <code><a href="./src/resources/retell-llms.ts">RetellLlmCreateResponse</a></code>
- <code><a href="./src/resources/retell-llms.ts">RetellLlmRetrieveResponse</a></code>
- <code><a href="./src/resources/retell-llms.ts">RetellLlmUpdateResponse</a></code>
- <code><a href="./src/resources/retell-llms.ts">RetellLlmListResponse</a></code>

Methods:

- <code title="post /create-retell-llm">client.retellLlms.<a href="./src/resources/retell-llms.ts">create</a>({ ...params }) -> RetellLlmCreateResponse</code>
- <code title="get /get-retell-llm/{llm_id}">client.retellLlms.<a href="./src/resources/retell-llms.ts">retrieve</a>(llmId) -> RetellLlmRetrieveResponse</code>
- <code title="patch /update-retell-llm/{llm_id}">client.retellLlms.<a href="./src/resources/retell-llms.ts">update</a>(llmId, { ...params }) -> RetellLlmUpdateResponse</code>
- <code title="get /list-retell-llm">client.retellLlms.<a href="./src/resources/retell-llms.ts">list</a>() -> RetellLlmListResponse</code>
- <code title="delete /delete-retell-llm/{llm_id}">client.retellLlms.<a href="./src/resources/retell-llms.ts">delete</a>(llmId) -> void</code>
