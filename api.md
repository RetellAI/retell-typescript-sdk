# Call

Types:

- <code><a href="./src/resources/call.ts">CallResponse</a></code>
- <code><a href="./src/resources/call.ts">PhoneCallResponse</a></code>
- <code><a href="./src/resources/call.ts">WebCallResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListResponse</a></code>

Methods:

- <code title="get /v2/get-call/{call_id}">client.call.<a href="./src/resources/call.ts">retrieve</a>(callID) -> CallResponse</code>
- <code title="patch /v2/update-call/{call_id}">client.call.<a href="./src/resources/call.ts">update</a>(callID, { ...params }) -> CallResponse</code>
- <code title="post /v2/list-calls">client.call.<a href="./src/resources/call.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="delete /v2/delete-call/{call_id}">client.call.<a href="./src/resources/call.ts">delete</a>(callID) -> void</code>
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
- <code title="get /get-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">retrieve</a>(chatID) -> ChatResponse</code>
- <code title="patch /update-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">update</a>(chatID, { ...params }) -> ChatResponse</code>
- <code title="get /list-chat">client.chat.<a href="./src/resources/chat.ts">list</a>({ ...params }) -> ChatListResponse</code>
- <code title="post /create-chat-completion">client.chat.<a href="./src/resources/chat.ts">createChatCompletion</a>({ ...params }) -> ChatCreateChatCompletionResponse</code>
- <code title="post /create-sms-chat">client.chat.<a href="./src/resources/chat.ts">createSMSChat</a>({ ...params }) -> ChatResponse</code>
- <code title="patch /end-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">end</a>(chatID) -> void</code>

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
- <code title="get /get-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">retrieve</a>(agentID, { ...params }) -> AgentResponse</code>
- <code title="patch /update-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">update</a>(agentID, { ...params }) -> AgentResponse</code>
- <code title="get /list-agents">client.agent.<a href="./src/resources/agent.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="delete /delete-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">delete</a>(agentID) -> void</code>
- <code title="get /get-agent-versions/{agent_id}">client.agent.<a href="./src/resources/agent.ts">getVersions</a>(agentID) -> AgentGetVersionsResponse</code>
- <code title="post /publish-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">publish</a>(agentID) -> void</code>

# ChatAgent

Types:

- <code><a href="./src/resources/chat-agent.ts">ChatAgentResponse</a></code>
- <code><a href="./src/resources/chat-agent.ts">ChatAgentListResponse</a></code>
- <code><a href="./src/resources/chat-agent.ts">ChatAgentGetVersionsResponse</a></code>

Methods:

- <code title="post /create-chat-agent">client.chatAgent.<a href="./src/resources/chat-agent.ts">create</a>({ ...params }) -> ChatAgentResponse</code>
- <code title="get /get-chat-agent/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">retrieve</a>(agentID, { ...params }) -> ChatAgentResponse</code>
- <code title="patch /update-chat-agent/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">update</a>(agentID, { ...params }) -> ChatAgentResponse</code>
- <code title="get /list-chat-agents">client.chatAgent.<a href="./src/resources/chat-agent.ts">list</a>({ ...params }) -> ChatAgentListResponse</code>
- <code title="delete /delete-chat-agent/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">delete</a>(agentID) -> void</code>
- <code title="get /get-chat-agent-versions/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">getVersions</a>(agentID) -> ChatAgentGetVersionsResponse</code>
- <code title="post /publish-chat-agent/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">publish</a>(agentID) -> void</code>

# Llm

Types:

- <code><a href="./src/resources/llm.ts">LlmResponse</a></code>
- <code><a href="./src/resources/llm.ts">LlmListResponse</a></code>

Methods:

- <code title="post /create-retell-llm">client.llm.<a href="./src/resources/llm.ts">create</a>({ ...params }) -> LlmResponse</code>
- <code title="get /get-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">retrieve</a>(llmID, { ...params }) -> LlmResponse</code>
- <code title="patch /update-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">update</a>(llmID, { ...params }) -> LlmResponse</code>
- <code title="get /list-retell-llms">client.llm.<a href="./src/resources/llm.ts">list</a>({ ...params }) -> LlmListResponse</code>
- <code title="delete /delete-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">delete</a>(llmID) -> void</code>

# ConversationFlow

Types:

- <code><a href="./src/resources/conversation-flow.ts">ConversationFlowResponse</a></code>
- <code><a href="./src/resources/conversation-flow.ts">ConversationFlowListResponse</a></code>

Methods:

- <code title="post /create-conversation-flow">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">create</a>({ ...params }) -> ConversationFlowResponse</code>
- <code title="get /get-conversation-flow/{conversation_flow_id}">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">retrieve</a>(conversationFlowID, { ...params }) -> ConversationFlowResponse</code>
- <code title="patch /update-conversation-flow/{conversation_flow_id}">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">update</a>(conversationFlowID, { ...params }) -> ConversationFlowResponse</code>
- <code title="get /list-conversation-flows">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">list</a>({ ...params }) -> ConversationFlowListResponse</code>
- <code title="delete /delete-conversation-flow/{conversation_flow_id}">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">delete</a>(conversationFlowID) -> void</code>

# ConversationFlowComponent

Types:

- <code><a href="./src/resources/conversation-flow-component.ts">ConversationFlowComponentResponse</a></code>
- <code><a href="./src/resources/conversation-flow-component.ts">ConversationFlowComponentListResponse</a></code>

Methods:

- <code title="post /create-conversation-flow-component">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">create</a>({ ...params }) -> ConversationFlowComponentResponse</code>
- <code title="get /get-conversation-flow-component/{conversation_flow_component_id}">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">retrieve</a>(conversationFlowComponentID) -> ConversationFlowComponentResponse</code>
- <code title="patch /update-conversation-flow-component/{conversation_flow_component_id}">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">update</a>(conversationFlowComponentID, { ...params }) -> ConversationFlowComponentResponse</code>
- <code title="get /list-conversation-flow-components">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">list</a>() -> ConversationFlowComponentListResponse</code>
- <code title="delete /delete-conversation-flow-component/{conversation_flow_component_id}">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">delete</a>(conversationFlowComponentID) -> void</code>

# KnowledgeBase

Types:

- <code><a href="./src/resources/knowledge-base.ts">KnowledgeBaseResponse</a></code>
- <code><a href="./src/resources/knowledge-base.ts">KnowledgeBaseListResponse</a></code>

Methods:

- <code title="post /create-knowledge-base">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">create</a>({ ...params }) -> KnowledgeBaseResponse</code>
- <code title="get /get-knowledge-base/{knowledge_base_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">retrieve</a>(knowledgeBaseID) -> KnowledgeBaseResponse</code>
- <code title="get /list-knowledge-bases">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">list</a>() -> KnowledgeBaseListResponse</code>
- <code title="delete /delete-knowledge-base/{knowledge_base_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">delete</a>(knowledgeBaseID) -> void</code>
- <code title="post /add-knowledge-base-sources/{knowledge_base_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">addSources</a>(knowledgeBaseID, { ...params }) -> KnowledgeBaseResponse</code>
- <code title="delete /delete-knowledge-base-source/{knowledge_base_id}/source/{source_id}">client.knowledgeBase.<a href="./src/resources/knowledge-base.ts">deleteSource</a>(sourceID, { ...params }) -> KnowledgeBaseResponse</code>

# Voice

Types:

- <code><a href="./src/resources/voice.ts">VoiceResponse</a></code>
- <code><a href="./src/resources/voice.ts">VoiceListResponse</a></code>
- <code><a href="./src/resources/voice.ts">VoiceSearchResponse</a></code>

Methods:

- <code title="get /get-voice/{voice_id}">client.voice.<a href="./src/resources/voice.ts">retrieve</a>(voiceID) -> VoiceResponse</code>
- <code title="get /list-voices">client.voice.<a href="./src/resources/voice.ts">list</a>() -> VoiceListResponse</code>
- <code title="post /add-community-voice">client.voice.<a href="./src/resources/voice.ts">addResource</a>({ ...params }) -> VoiceResponse</code>
- <code title="post /clone-voice">client.voice.<a href="./src/resources/voice.ts">clone</a>({ ...params }) -> VoiceResponse</code>
- <code title="post /search-community-voice">client.voice.<a href="./src/resources/voice.ts">search</a>({ ...params }) -> VoiceSearchResponse</code>

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

# Tests

Types:

- <code><a href="./src/resources/tests.ts">BatchTestResponse</a></code>
- <code><a href="./src/resources/tests.ts">TestCaseDefinitionResponse</a></code>
- <code><a href="./src/resources/tests.ts">TestCaseJobResponse</a></code>
- <code><a href="./src/resources/tests.ts">TestListBatchTestsResponse</a></code>
- <code><a href="./src/resources/tests.ts">TestListTestCaseDefinitionsResponse</a></code>
- <code><a href="./src/resources/tests.ts">TestListTestRunsResponse</a></code>

Methods:

- <code title="post /create-batch-test">client.tests.<a href="./src/resources/tests.ts">createBatchTest</a>({ ...params }) -> BatchTestResponse</code>
- <code title="post /create-test-case-definition">client.tests.<a href="./src/resources/tests.ts">createTestCaseDefinition</a>({ ...params }) -> TestCaseDefinitionResponse</code>
- <code title="delete /delete-test-case-definition/{test_case_definition_id}">client.tests.<a href="./src/resources/tests.ts">deleteTestCaseDefinition</a>(testCaseDefinitionID) -> void</code>
- <code title="get /get-batch-test/{test_case_batch_job_id}">client.tests.<a href="./src/resources/tests.ts">getBatchTest</a>(testCaseBatchJobID) -> BatchTestResponse</code>
- <code title="get /get-test-case-definition/{test_case_definition_id}">client.tests.<a href="./src/resources/tests.ts">getTestCaseDefinition</a>(testCaseDefinitionID) -> TestCaseDefinitionResponse</code>
- <code title="get /get-test-run/{test_case_job_id}">client.tests.<a href="./src/resources/tests.ts">getTestRun</a>(testCaseJobID) -> TestCaseJobResponse</code>
- <code title="get /list-batch-tests">client.tests.<a href="./src/resources/tests.ts">listBatchTests</a>({ ...params }) -> TestListBatchTestsResponse</code>
- <code title="get /list-test-case-definitions">client.tests.<a href="./src/resources/tests.ts">listTestCaseDefinitions</a>({ ...params }) -> TestListTestCaseDefinitionsResponse</code>
- <code title="get /list-test-runs/{test_case_batch_job_id}">client.tests.<a href="./src/resources/tests.ts">listTestRuns</a>(testCaseBatchJobID) -> TestListTestRunsResponse</code>
- <code title="put /update-test-case-definition/{test_case_definition_id}">client.tests.<a href="./src/resources/tests.ts">updateTestCaseDefinition</a>(testCaseDefinitionID, { ...params }) -> TestCaseDefinitionResponse</code>

# McpTool

Types:

- <code><a href="./src/resources/mcp-tool.ts">McpToolDefinition</a></code>
- <code><a href="./src/resources/mcp-tool.ts">McpToolGetMcpToolsResponse</a></code>

Methods:

- <code title="get /get-mcp-tools/{agent_id}">client.mcpTool.<a href="./src/resources/mcp-tool.ts">getMcpTools</a>(agentID, { ...params }) -> McpToolGetMcpToolsResponse</code>
