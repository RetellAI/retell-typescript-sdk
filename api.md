# Call

Types:

- <code><a href="./src/resources/call.ts">CallResponse</a></code>
- <code><a href="./src/resources/call.ts">PhoneCallResponse</a></code>
- <code><a href="./src/resources/call.ts">WebCallResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListResponse</a></code>

Methods:

- <code title="get /v2/get-call/{call_id}">client.call.<a href="./src/resources/call.ts">retrieve</a>(callId) -> CallResponse</code>
- <code title="patch /v2/update-call/{call_id}">client.call.<a href="./src/resources/call.ts">update</a>(callId, { ...params }) -> CallResponse</code>
- <code title="post /v2/list-calls">client.call.<a href="./src/resources/call.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="delete /v2/delete-call/{call_id}">client.call.<a href="./src/resources/call.ts">delete</a>(callId) -> void</code>
- <code title="post /v2/create-phone-call">client.call.<a href="./src/resources/call.ts">createPhoneCall</a>({ ...params }) -> PhoneCallResponse</code>
- <code title="post /v2/create-web-call">client.call.<a href="./src/resources/call.ts">createWebCall</a>({ ...params }) -> WebCallResponse</code>
- <code title="post /v2/register-phone-call">client.call.<a href="./src/resources/call.ts">registerPhoneCall</a>({ ...params }) -> PhoneCallResponse</code>

# Chat

Types:

- <code><a href="./src/resources/chat.ts">ChatResponse</a></code>
- <code><a href="./src/resources/chat.ts">ChatListResponse</a></code>
- <code><a href="./src/resources/chat.ts">ChatCreateChatCompletionResponse</a></code>

Methods:

- <code title="post /create-chat">client.chat.<a href="./src/resources/chat.ts">create</a>({ ...params }) -> ChatResponse</code>
- <code title="get /get-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">retrieve</a>(chatId) -> ChatResponse</code>
- <code title="get /list-chat">client.chat.<a href="./src/resources/chat.ts">list</a>() -> ChatListResponse</code>
- <code title="post /create-chat-completion">client.chat.<a href="./src/resources/chat.ts">createChatCompletion</a>({ ...params }) -> ChatCreateChatCompletionResponse</code>
- <code title="patch /end-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">end</a>(chatId) -> void</code>

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
- <code><a href="./src/resources/agent.ts">AgentGetVersionsResponse</a></code>

Methods:

- <code title="post /create-agent">client.agent.<a href="./src/resources/agent.ts">create</a>({ ...params }) -> AgentResponse</code>
- <code title="get /get-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">retrieve</a>(agentId, { ...params }) -> AgentResponse</code>
- <code title="patch /update-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">update</a>(agentId, { ...params }) -> AgentResponse</code>
- <code title="get /list-agents">client.agent.<a href="./src/resources/agent.ts">list</a>() -> AgentListResponse</code>
- <code title="delete /delete-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">delete</a>(agentId) -> void</code>
- <code title="get /get-agent-versions/{agent_id}">client.agent.<a href="./src/resources/agent.ts">getVersions</a>(agentId) -> AgentGetVersionsResponse</code>

# Llm

Types:

- <code><a href="./src/resources/llm.ts">LlmResponse</a></code>
- <code><a href="./src/resources/llm.ts">LlmListResponse</a></code>

Methods:

- <code title="post /create-retell-llm">client.llm.<a href="./src/resources/llm.ts">create</a>({ ...params }) -> LlmResponse</code>
- <code title="get /get-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">retrieve</a>(llmId, { ...params }) -> LlmResponse</code>
- <code title="patch /update-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">update</a>(llmId, { ...params }) -> LlmResponse</code>
- <code title="get /list-retell-llms">client.llm.<a href="./src/resources/llm.ts">list</a>() -> LlmListResponse</code>
- <code title="delete /delete-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">delete</a>(llmId) -> void</code>

# KnowledgeBase

Types:

- <code><a href="./src/resources/knowledge-base.ts">KnowledgeBaseResponse</a></code>
- <code><a href="./src/resources/knowledge-base.ts">KnowledgeBaseListResponse</a></code>

Methods:

- <code title="post /create-knowledge-base">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">create</a>({ ...params }) -> KnowledgeBaseResponse</code>
- <code title="get /get-knowledge-base/{knowledge_base_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">retrieve</a>(knowledgeBaseId) -> KnowledgeBaseResponse</code>
- <code title="get /list-knowledge-bases">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">list</a>() -> KnowledgeBaseListResponse</code>
- <code title="delete /delete-knowledge-base/{knowledge_base_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">delete</a>(knowledgeBaseId) -> void</code>
- <code title="post /add-knowledge-base-sources/{knowledge_base_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">addSources</a>(knowledgeBaseId, { ...params }) -> KnowledgeBaseResponse</code>
- <code title="delete /delete-knowledge-base-source/{knowledge_base_id}/source/{source_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">deleteSource</a>(knowledgeBaseId, sourceId) -> KnowledgeBaseResponse</code>

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

# BatchCall

Types:

- <code><a href="./src/resources/batch-call.ts">BatchCallResponse</a></code>

Methods:

- <code title="post /create-batch-call">client.batchCall.<a href="./src/resources/batch-call.ts">createBatchCall</a>({ ...params }) -> BatchCallResponse</code>
