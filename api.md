# Call

Types:

- <code><a href="./src/resources/call.ts">CallResponse</a></code>
- <code><a href="./src/resources/call.ts">PhoneCallResponse</a></code>
- <code><a href="./src/resources/call.ts">WebCallResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListenLiveResponse</a></code>
- <code><a href="./src/resources/call.ts">CallTakeOverLiveResponse</a></code>
- <code><a href="./src/resources/call.ts">CallUpdateLiveResponse</a></code>

Methods:

- <code title="get /v2/get-call/{call_id}">client.call.<a href="./src/resources/call.ts">retrieve</a>(callID) -> CallResponse</code>
- <code title="patch /v2/update-call/{call_id}">client.call.<a href="./src/resources/call.ts">update</a>(callID, { ...params }) -> CallResponse</code>
- <code title="post /v3/list-calls">client.call.<a href="./src/resources/call.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="delete /v2/delete-call/{call_id}">client.call.<a href="./src/resources/call.ts">delete</a>(callID) -> void</code>
- <code title="post /v2/create-phone-call">client.call.<a href="./src/resources/call.ts">createPhoneCall</a>({ ...params }) -> PhoneCallResponse</code>
- <code title="post /v2/create-web-call">client.call.<a href="./src/resources/call.ts">createWebCall</a>({ ...params }) -> WebCallResponse</code>
- <code title="post /v2/listen-live-call/{call_id}">client.call.<a href="./src/resources/call.ts">listenLive</a>(callID) -> CallListenLiveResponse</code>
- <code title="post /v2/register-phone-call">client.call.<a href="./src/resources/call.ts">registerPhoneCall</a>({ ...params }) -> PhoneCallResponse</code>
- <code title="put /rerun-call-analysis/{call_id}">client.call.<a href="./src/resources/call.ts">rerunAnalysis</a>(callID) -> CallResponse</code>
- <code title="post /v2/stop-call/{call_id}">client.call.<a href="./src/resources/call.ts">stop</a>(callID) -> void</code>
- <code title="post /v2/take-over-live-call/{call_id}">client.call.<a href="./src/resources/call.ts">takeOverLive</a>(callID, { ...params }) -> CallTakeOverLiveResponse</code>
- <code title="patch /v2/update-live-call/{call_id}">client.call.<a href="./src/resources/call.ts">updateLive</a>(callID, { ...params }) -> CallUpdateLiveResponse</code>

# Chat

Types:

- <code><a href="./src/resources/chat.ts">ChatResponse</a></code>
- <code><a href="./src/resources/chat.ts">ChatListResponse</a></code>
- <code><a href="./src/resources/chat.ts">ChatCreateChatCompletionResponse</a></code>

Methods:

- <code title="post /create-chat">client.chat.<a href="./src/resources/chat.ts">create</a>({ ...params }) -> ChatResponse</code>
- <code title="get /get-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">retrieve</a>(chatID) -> ChatResponse</code>
- <code title="patch /update-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">update</a>(chatID, { ...params }) -> ChatResponse</code>
- <code title="post /v3/list-chats">client.chat.<a href="./src/resources/chat.ts">list</a>({ ...params }) -> ChatListResponse</code>
- <code title="delete /delete-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">delete</a>(chatID) -> void</code>
- <code title="post /create-chat-completion">client.chat.<a href="./src/resources/chat.ts">createChatCompletion</a>({ ...params }) -> ChatCreateChatCompletionResponse</code>
- <code title="post /create-sms-chat">client.chat.<a href="./src/resources/chat.ts">createSMSChat</a>({ ...params }) -> ChatResponse</code>
- <code title="patch /end-chat/{chat_id}">client.chat.<a href="./src/resources/chat.ts">end</a>(chatID) -> void</code>
- <code title="put /rerun-chat-analysis/{chat_id}">client.chat.<a href="./src/resources/chat.ts">rerunAnalysis</a>(chatID) -> ChatResponse</code>

# PhoneNumber

Types:

- <code><a href="./src/resources/phone-number.ts">PhoneNumberResponse</a></code>
- <code><a href="./src/resources/phone-number.ts">PhoneNumberListResponse</a></code>

Methods:

- <code title="post /create-phone-number">client.phoneNumber.<a href="./src/resources/phone-number.ts">create</a>({ ...params }) -> PhoneNumberResponse</code>
- <code title="get /get-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">retrieve</a>(phoneNumber) -> PhoneNumberResponse</code>
- <code title="patch /update-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">update</a>(phoneNumber, { ...params }) -> PhoneNumberResponse</code>
- <code title="get /v2/list-phone-numbers">client.phoneNumber.<a href="./src/resources/phone-number.ts">list</a>({ ...params }) -> PhoneNumberListResponse</code>
- <code title="delete /delete-phone-number/{phone_number}">client.phoneNumber.<a href="./src/resources/phone-number.ts">delete</a>(phoneNumber) -> void</code>
- <code title="post /import-phone-number">client.phoneNumber.<a href="./src/resources/phone-number.ts">import</a>({ ...params }) -> PhoneNumberResponse</code>

# Agent

Types:

- <code><a href="./src/resources/agent.ts">AgentResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentListResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentCreateVersionResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentGetVersionsResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentListVersionsResponse</a></code>
- <code><a href="./src/resources/agent.ts">AgentRepairResponse</a></code>

Methods:

- <code title="post /create-agent">client.agent.<a href="./src/resources/agent.ts">create</a>({ ...params }) -> AgentResponse</code>
- <code title="get /get-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">retrieve</a>(agentID, { ...params }) -> AgentResponse</code>
- <code title="patch /update-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">update</a>(agentID, { ...params }) -> AgentResponse</code>
- <code title="post /v2/list-agents">client.agent.<a href="./src/resources/agent.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="delete /delete-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">delete</a>(agentID) -> void</code>
- <code title="post /create-agent-version/{agent_id}">client.agent.<a href="./src/resources/agent.ts">createVersion</a>(agentID, { ...params }) -> AgentCreateVersionResponse</code>
- <code title="delete /delete-agent-version/{agent_id}">client.agent.<a href="./src/resources/agent.ts">deleteVersion</a>(agentID, { ...params }) -> void</code>
- <code title="get /get-agent-versions/{agent_id}">client.agent.<a href="./src/resources/agent.ts">getVersions</a>(agentID) -> AgentGetVersionsResponse</code>
- <code title="get /list-agent-versions/{agent_id}">client.agent.<a href="./src/resources/agent.ts">listVersions</a>(agentID, { ...params }) -> AgentListVersionsResponse</code>
- <code title="post /publish-agent-version/{agent_id}">client.agent.<a href="./src/resources/agent.ts">publish</a>(agentID, { ...params }) -> void</code>
- <code title="post /repair-agent/{agent_id}">client.agent.<a href="./src/resources/agent.ts">repair</a>(agentID, { ...params }) -> AgentRepairResponse</code>

# ChatAgent

Types:

- <code><a href="./src/resources/chat-agent.ts">ChatAgentResponse</a></code>
- <code><a href="./src/resources/chat-agent.ts">ChatAgentListResponse</a></code>
- <code><a href="./src/resources/chat-agent.ts">ChatAgentCreateVersionResponse</a></code>
- <code><a href="./src/resources/chat-agent.ts">ChatAgentGetVersionsResponse</a></code>

Methods:

- <code title="post /create-chat-agent">client.chatAgent.<a href="./src/resources/chat-agent.ts">create</a>({ ...params }) -> ChatAgentResponse</code>
- <code title="get /get-chat-agent/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">retrieve</a>(agentID, { ...params }) -> ChatAgentResponse</code>
- <code title="patch /update-chat-agent/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">update</a>(agentID, { ...params }) -> ChatAgentResponse</code>
- <code title="post /v2/list-agents">client.chatAgent.<a href="./src/resources/chat-agent.ts">list</a>({ ...params }) -> ChatAgentListResponse</code>
- <code title="delete /delete-chat-agent/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">delete</a>(agentID) -> void</code>
- <code title="post /create-agent-version/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">createVersion</a>(agentID, { ...params }) -> ChatAgentCreateVersionResponse</code>
- <code title="delete /delete-agent-version/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">deleteVersion</a>(agentID, { ...params }) -> void</code>
- <code title="get /get-chat-agent-versions/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">getVersions</a>(agentID) -> ChatAgentGetVersionsResponse</code>
- <code title="post /publish-agent-version/{agent_id}">client.chatAgent.<a href="./src/resources/chat-agent.ts">publish</a>(agentID, { ...params }) -> void</code>

# Llm

Types:

- <code><a href="./src/resources/llm.ts">LlmResponse</a></code>
- <code><a href="./src/resources/llm.ts">LlmListResponse</a></code>

Methods:

- <code title="post /create-retell-llm">client.llm.<a href="./src/resources/llm.ts">create</a>({ ...params }) -> LlmResponse</code>
- <code title="get /get-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">retrieve</a>(llmID, { ...params }) -> LlmResponse</code>
- <code title="patch /update-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">update</a>(llmID, { ...params }) -> LlmResponse</code>
- <code title="get /v2/list-retell-llms">client.llm.<a href="./src/resources/llm.ts">list</a>({ ...params }) -> LlmListResponse</code>
- <code title="delete /delete-retell-llm/{llm_id}">client.llm.<a href="./src/resources/llm.ts">delete</a>(llmID, { ...params }) -> void</code>

# ConversationFlow

Types:

- <code><a href="./src/resources/conversation-flow.ts">ConversationFlowResponse</a></code>
- <code><a href="./src/resources/conversation-flow.ts">ConversationFlowListResponse</a></code>

Methods:

- <code title="post /create-conversation-flow">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">create</a>({ ...params }) -> ConversationFlowResponse</code>
- <code title="get /get-conversation-flow/{conversation_flow_id}">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">retrieve</a>(conversationFlowID, { ...params }) -> ConversationFlowResponse</code>
- <code title="patch /update-conversation-flow/{conversation_flow_id}">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">update</a>(conversationFlowID, { ...params }) -> ConversationFlowResponse</code>
- <code title="get /v2/list-conversation-flows">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">list</a>({ ...params }) -> ConversationFlowListResponse</code>
- <code title="delete /delete-conversation-flow/{conversation_flow_id}">client.conversationFlow.<a href="./src/resources/conversation-flow.ts">delete</a>(conversationFlowID, { ...params }) -> void</code>

# ConversationFlowComponent

Types:

- <code><a href="./src/resources/conversation-flow-component.ts">ConversationFlowComponentResponse</a></code>
- <code><a href="./src/resources/conversation-flow-component.ts">ConversationFlowComponentListResponse</a></code>

Methods:

- <code title="post /create-conversation-flow-component">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">create</a>({ ...params }) -> ConversationFlowComponentResponse</code>
- <code title="get /get-conversation-flow-component/{conversation_flow_component_id}">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">retrieve</a>(conversationFlowComponentID) -> ConversationFlowComponentResponse</code>
- <code title="patch /update-conversation-flow-component/{conversation_flow_component_id}">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">update</a>(conversationFlowComponentID, { ...params }) -> ConversationFlowComponentResponse</code>
- <code title="get /v2/list-conversation-flow-components">client.conversationFlowComponent.<a href="./src/resources/conversation-flow-component.ts">list</a>({ ...params }) -> ConversationFlowComponentListResponse</code>
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

# Asset

Types:

- <code><a href="./src/resources/asset.ts">AssetCreateResponse</a></code>

Methods:

- <code title="post /create-asset">client.asset.<a href="./src/resources/asset.ts">create</a>({ ...params }) -> AssetCreateResponse</code>

# Concurrency

Types:

- <code><a href="./src/resources/concurrency.ts">ConcurrencyRetrieveResponse</a></code>

Methods:

- <code title="get /get-concurrency">client.concurrency.<a href="./src/resources/concurrency.ts">retrieve</a>() -> ConcurrencyRetrieveResponse</code>

# Identity

Types:

- <code><a href="./src/resources/identity.ts">IdentityRetrieveResponse</a></code>

Methods:

- <code title="get /get-api-key-info">client.identity.<a href="./src/resources/identity.ts">retrieve</a>() -> IdentityRetrieveResponse</code>

# ExportRequest

Types:

- <code><a href="./src/resources/export-request.ts">ExportRequestListResponse</a></code>

Methods:

- <code title="get /v2/list-export-requests">client.exportRequest.<a href="./src/resources/export-request.ts">list</a>({ ...params }) -> ExportRequestListResponse</code>

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
- <code title="get /v2/list-batch-tests">client.tests.<a href="./src/resources/tests.ts">listBatchTests</a>({ ...params }) -> TestListBatchTestsResponse</code>
- <code title="get /v2/list-test-case-definitions">client.tests.<a href="./src/resources/tests.ts">listTestCaseDefinitions</a>({ ...params }) -> TestListTestCaseDefinitionsResponse</code>
- <code title="get /v2/list-test-runs/{test_case_batch_job_id}">client.tests.<a href="./src/resources/tests.ts">listTestRuns</a>(testCaseBatchJobID, { ...params }) -> TestListTestRunsResponse</code>
- <code title="put /update-test-case-definition/{test_case_definition_id}">client.tests.<a href="./src/resources/tests.ts">updateTestCaseDefinition</a>(testCaseDefinitionID, { ...params }) -> TestCaseDefinitionResponse</code>

# Playground

Types:

- <code><a href="./src/resources/playground.ts">PlaygroundCompletionResponse</a></code>

Methods:

- <code title="post /agent-playground-completion/{agent_id}">client.playground.<a href="./src/resources/playground.ts">completion</a>(agentID, { ...params }) -> PlaygroundCompletionResponse</code>

# McpTool

Types:

- <code><a href="./src/resources/mcp-tool.ts">McpToolDefinition</a></code>
- <code><a href="./src/resources/mcp-tool.ts">McpToolGetMcpToolsResponse</a></code>

Methods:

- <code title="get /get-mcp-tools/{agent_id}">client.mcpTool.<a href="./src/resources/mcp-tool.ts">getMcpTools</a>(agentID, { ...params }) -> McpToolGetMcpToolsResponse</code>

# Contact

Types:

- <code><a href="./src/resources/contact.ts">ContactResponse</a></code>
- <code><a href="./src/resources/contact.ts">ContactListResponse</a></code>
- <code><a href="./src/resources/contact.ts">ContactBackfillAnalysisDataResponse</a></code>
- <code><a href="./src/resources/contact.ts">ContactCreateImportResponse</a></code>
- <code><a href="./src/resources/contact.ts">ContactGetBackfillJobStatusResponse</a></code>
- <code><a href="./src/resources/contact.ts">ContactGetImportResponse</a></code>
- <code><a href="./src/resources/contact.ts">ContactListConversationsResponse</a></code>
- <code><a href="./src/resources/contact.ts">ContactUploadImportFileResponse</a></code>

Methods:

- <code title="post /create-contact">client.contact.<a href="./src/resources/contact.ts">create</a>({ ...params }) -> ContactResponse</code>
- <code title="patch /update-contact/{contact_id}">client.contact.<a href="./src/resources/contact.ts">update</a>(contactID, { ...params }) -> ContactResponse</code>
- <code title="post /list-contacts">client.contact.<a href="./src/resources/contact.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="delete /delete-contact/{contact_id}">client.contact.<a href="./src/resources/contact.ts">delete</a>(contactID) -> void</code>
- <code title="post /backfill-contact-analysis-data">client.contact.<a href="./src/resources/contact.ts">backfillAnalysisData</a>({ ...params }) -> ContactBackfillAnalysisDataResponse</code>
- <code title="post /create-contact-import">client.contact.<a href="./src/resources/contact.ts">createImport</a>({ ...params }) -> ContactCreateImportResponse</code>
- <code title="get /get-contact/{contact_id}">client.contact.<a href="./src/resources/contact.ts">get</a>(contactID) -> ContactResponse</code>
- <code title="get /get-backfill-contact-job-status">client.contact.<a href="./src/resources/contact.ts">getBackfillJobStatus</a>() -> ContactGetBackfillJobStatusResponse</code>
- <code title="get /get-contact-by-phone/{phone_number}">client.contact.<a href="./src/resources/contact.ts">getByPhone</a>(phoneNumber) -> ContactResponse</code>
- <code title="get /get-contact-import">client.contact.<a href="./src/resources/contact.ts">getImport</a>() -> ContactGetImportResponse</code>
- <code title="get /list-contact-conversations/{contact_id}">client.contact.<a href="./src/resources/contact.ts">listConversations</a>(contactID, { ...params }) -> ContactListConversationsResponse</code>
- <code title="post /upload-contact-import-file">client.contact.<a href="./src/resources/contact.ts">uploadImportFile</a>({ ...params }) -> ContactUploadImportFileResponse</code>

# App

Types:

- <code><a href="./src/resources/app.ts">AppResponse</a></code>
- <code><a href="./src/resources/app.ts">AppListResponse</a></code>
- <code><a href="./src/resources/app.ts">AppListUsagesResponse</a></code>
- <code><a href="./src/resources/app.ts">AppTestAuthResponse</a></code>

Methods:

- <code title="post /create-app">client.app.<a href="./src/resources/app.ts">create</a>({ ...params }) -> AppResponse</code>
- <code title="patch /update-app/{app_id}">client.app.<a href="./src/resources/app.ts">update</a>(appID, { ...params }) -> AppResponse</code>
- <code title="get /list-apps">client.app.<a href="./src/resources/app.ts">list</a>({ ...params }) -> AppListResponse</code>
- <code title="delete /delete-app/{app_id}">client.app.<a href="./src/resources/app.ts">delete</a>(appID, { ...params }) -> void</code>
- <code title="get /get-app/{app_id}">client.app.<a href="./src/resources/app.ts">get</a>(appID) -> AppResponse</code>
- <code title="get /list-app-usages/{app_id}">client.app.<a href="./src/resources/app.ts">listUsages</a>(appID, { ...params }) -> AppListUsagesResponse</code>
- <code title="post /test-app-auth/{app_id}">client.app.<a href="./src/resources/app.ts">testAuth</a>(appID) -> AppTestAuthResponse</code>

# CRM

Types:

- <code><a href="./src/resources/crm.ts">CRMConfig</a></code>
- <code><a href="./src/resources/crm.ts">CRMGetSchemaResponse</a></code>
- <code><a href="./src/resources/crm.ts">CRMGetSyncJobStatusResponse</a></code>
- <code><a href="./src/resources/crm.ts">CRMRunSyncJobResponse</a></code>

Methods:

- <code title="get /get-crm-config">client.crm.<a href="./src/resources/crm.ts">getConfig</a>() -> CRMConfig</code>
- <code title="get /get-crm-schema">client.crm.<a href="./src/resources/crm.ts">getSchema</a>({ ...params }) -> CRMGetSchemaResponse</code>
- <code title="get /get-sync-job-status">client.crm.<a href="./src/resources/crm.ts">getSyncJobStatus</a>() -> CRMGetSyncJobStatusResponse</code>
- <code title="post /run-sync-job">client.crm.<a href="./src/resources/crm.ts">runSyncJob</a>() -> CRMRunSyncJobResponse</code>
- <code title="post /update-crm-config">client.crm.<a href="./src/resources/crm.ts">updateConfig</a>({ ...params }) -> CRMConfig</code>
