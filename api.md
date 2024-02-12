# Calls

Types:

- <code><a href="./src/resources/calls.ts">CallBase</a></code>
- <code><a href="./src/resources/calls.ts">CallBase</a></code>
- <code><a href="./src/resources/calls.ts">CallListResponse</a></code>

Methods:

- <code title="get /get-call/{call_id}">client.calls.<a href="./src/resources/calls.ts">retrieve</a>(callId) -> CallBase</code>
- <code title="get /list-calls">client.calls.<a href="./src/resources/calls.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="post /register-call">client.calls.<a href="./src/resources/calls.ts">register</a>({ ...params }) -> CallBase</code>

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
