# RegisterCalls

Types:

- <code><a href="./src/resources/register-calls.ts">RegisterCallCreateResponse</a></code>

Methods:

- <code title="post /register-call">client.registerCalls.<a href="./src/resources/register-calls.ts">create</a>({ ...params }) -> RegisterCallCreateResponse</code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">CallRetrieveResponse</a></code>
- <code><a href="./src/resources/calls.ts">CallListResponse</a></code>

Methods:

- <code title="get /get-call/{call_id}">client.calls.<a href="./src/resources/calls.ts">retrieve</a>(callId) -> CallRetrieveResponse</code>
- <code title="get /list-calls">client.calls.<a href="./src/resources/calls.ts">list</a>({ ...params }) -> CallListResponse</code>

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
