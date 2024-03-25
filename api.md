# Calls

Types:

- <code><a href="./src/resources/calls.ts">CallCreateResponse</a></code>
- <code><a href="./src/resources/calls.ts">CallRetrieveResponse</a></code>
- <code><a href="./src/resources/calls.ts">CallListResponse</a></code>
- <code><a href="./src/resources/calls.ts">CallRegisterResponse</a></code>

Methods:

- <code title="post /create-phone-call">client.calls.<a href="./src/resources/calls.ts">create</a>({ ...params }) -> CallCreateResponse</code>
- <code title="get /get-call/{call_id}">client.calls.<a href="./src/resources/calls.ts">retrieve</a>(callId) -> CallRetrieveResponse</code>
- <code title="get /list-calls">client.calls.<a href="./src/resources/calls.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="post /register-call">client.calls.<a href="./src/resources/calls.ts">register</a>({ ...params }) -> CallRegisterResponse</code>

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

# Llms

Types:

- <code><a href="./src/resources/llms.ts">LlmCreateResponse</a></code>
- <code><a href="./src/resources/llms.ts">LlmRetrieveResponse</a></code>
- <code><a href="./src/resources/llms.ts">LlmUpdateResponse</a></code>
- <code><a href="./src/resources/llms.ts">LlmListResponse</a></code>

Methods:

- <code title="post /create-retell-llm">client.llms.<a href="./src/resources/llms.ts">create</a>({ ...params }) -> LlmCreateResponse</code>
- <code title="get /get-retell-llm/{llm_id}">client.llms.<a href="./src/resources/llms.ts">retrieve</a>(llmId) -> LlmRetrieveResponse</code>
- <code title="patch /update-retell-llm/{llm_id}">client.llms.<a href="./src/resources/llms.ts">update</a>(llmId, { ...params }) -> LlmUpdateResponse</code>
- <code title="get /list-retell-llm">client.llms.<a href="./src/resources/llms.ts">list</a>() -> LlmListResponse</code>
- <code title="delete /delete-retell-llm/{llm_id}">client.llms.<a href="./src/resources/llms.ts">delete</a>(llmId) -> void</code>
