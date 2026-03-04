// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.call.retrieve',
    fullyQualifiedName: 'call.retrieve',
    httpMethod: 'get',
    httpPath: '/v2/get-call/{call_id}',
  },
  {
    clientCallName: 'client.call.update',
    fullyQualifiedName: 'call.update',
    httpMethod: 'patch',
    httpPath: '/v2/update-call/{call_id}',
  },
  {
    clientCallName: 'client.call.list',
    fullyQualifiedName: 'call.list',
    httpMethod: 'post',
    httpPath: '/v2/list-calls',
  },
  {
    clientCallName: 'client.call.delete',
    fullyQualifiedName: 'call.delete',
    httpMethod: 'delete',
    httpPath: '/v2/delete-call/{call_id}',
  },
  {
    clientCallName: 'client.call.createPhoneCall',
    fullyQualifiedName: 'call.createPhoneCall',
    httpMethod: 'post',
    httpPath: '/v2/create-phone-call',
  },
  {
    clientCallName: 'client.call.createWebCall',
    fullyQualifiedName: 'call.createWebCall',
    httpMethod: 'post',
    httpPath: '/v2/create-web-call',
  },
  {
    clientCallName: 'client.call.registerPhoneCall',
    fullyQualifiedName: 'call.registerPhoneCall',
    httpMethod: 'post',
    httpPath: '/v2/register-phone-call',
  },
  {
    clientCallName: 'client.chat.create',
    fullyQualifiedName: 'chat.create',
    httpMethod: 'post',
    httpPath: '/create-chat',
  },
  {
    clientCallName: 'client.chat.retrieve',
    fullyQualifiedName: 'chat.retrieve',
    httpMethod: 'get',
    httpPath: '/get-chat/{chat_id}',
  },
  {
    clientCallName: 'client.chat.update',
    fullyQualifiedName: 'chat.update',
    httpMethod: 'patch',
    httpPath: '/update-chat/{chat_id}',
  },
  {
    clientCallName: 'client.chat.list',
    fullyQualifiedName: 'chat.list',
    httpMethod: 'get',
    httpPath: '/list-chat',
  },
  {
    clientCallName: 'client.chat.createChatCompletion',
    fullyQualifiedName: 'chat.createChatCompletion',
    httpMethod: 'post',
    httpPath: '/create-chat-completion',
  },
  {
    clientCallName: 'client.chat.createSMSChat',
    fullyQualifiedName: 'chat.createSMSChat',
    httpMethod: 'post',
    httpPath: '/create-sms-chat',
  },
  {
    clientCallName: 'client.chat.end',
    fullyQualifiedName: 'chat.end',
    httpMethod: 'patch',
    httpPath: '/end-chat/{chat_id}',
  },
  {
    clientCallName: 'client.phoneNumber.create',
    fullyQualifiedName: 'phoneNumber.create',
    httpMethod: 'post',
    httpPath: '/create-phone-number',
  },
  {
    clientCallName: 'client.phoneNumber.retrieve',
    fullyQualifiedName: 'phoneNumber.retrieve',
    httpMethod: 'get',
    httpPath: '/get-phone-number/{phone_number}',
  },
  {
    clientCallName: 'client.phoneNumber.update',
    fullyQualifiedName: 'phoneNumber.update',
    httpMethod: 'patch',
    httpPath: '/update-phone-number/{phone_number}',
  },
  {
    clientCallName: 'client.phoneNumber.list',
    fullyQualifiedName: 'phoneNumber.list',
    httpMethod: 'get',
    httpPath: '/list-phone-numbers',
  },
  {
    clientCallName: 'client.phoneNumber.delete',
    fullyQualifiedName: 'phoneNumber.delete',
    httpMethod: 'delete',
    httpPath: '/delete-phone-number/{phone_number}',
  },
  {
    clientCallName: 'client.phoneNumber.import',
    fullyQualifiedName: 'phoneNumber.import',
    httpMethod: 'post',
    httpPath: '/import-phone-number',
  },
  {
    clientCallName: 'client.agent.create',
    fullyQualifiedName: 'agent.create',
    httpMethod: 'post',
    httpPath: '/create-agent',
  },
  {
    clientCallName: 'client.agent.retrieve',
    fullyQualifiedName: 'agent.retrieve',
    httpMethod: 'get',
    httpPath: '/get-agent/{agent_id}',
  },
  {
    clientCallName: 'client.agent.update',
    fullyQualifiedName: 'agent.update',
    httpMethod: 'patch',
    httpPath: '/update-agent/{agent_id}',
  },
  {
    clientCallName: 'client.agent.list',
    fullyQualifiedName: 'agent.list',
    httpMethod: 'get',
    httpPath: '/list-agents',
  },
  {
    clientCallName: 'client.agent.delete',
    fullyQualifiedName: 'agent.delete',
    httpMethod: 'delete',
    httpPath: '/delete-agent/{agent_id}',
  },
  {
    clientCallName: 'client.agent.getVersions',
    fullyQualifiedName: 'agent.getVersions',
    httpMethod: 'get',
    httpPath: '/get-agent-versions/{agent_id}',
  },
  {
    clientCallName: 'client.agent.publish',
    fullyQualifiedName: 'agent.publish',
    httpMethod: 'post',
    httpPath: '/publish-agent/{agent_id}',
  },
  {
    clientCallName: 'client.chatAgent.create',
    fullyQualifiedName: 'chatAgent.create',
    httpMethod: 'post',
    httpPath: '/create-chat-agent',
  },
  {
    clientCallName: 'client.chatAgent.retrieve',
    fullyQualifiedName: 'chatAgent.retrieve',
    httpMethod: 'get',
    httpPath: '/get-chat-agent/{agent_id}',
  },
  {
    clientCallName: 'client.chatAgent.update',
    fullyQualifiedName: 'chatAgent.update',
    httpMethod: 'patch',
    httpPath: '/update-chat-agent/{agent_id}',
  },
  {
    clientCallName: 'client.chatAgent.list',
    fullyQualifiedName: 'chatAgent.list',
    httpMethod: 'get',
    httpPath: '/list-chat-agents',
  },
  {
    clientCallName: 'client.chatAgent.delete',
    fullyQualifiedName: 'chatAgent.delete',
    httpMethod: 'delete',
    httpPath: '/delete-chat-agent/{agent_id}',
  },
  {
    clientCallName: 'client.chatAgent.getVersions',
    fullyQualifiedName: 'chatAgent.getVersions',
    httpMethod: 'get',
    httpPath: '/get-chat-agent-versions/{agent_id}',
  },
  {
    clientCallName: 'client.chatAgent.publish',
    fullyQualifiedName: 'chatAgent.publish',
    httpMethod: 'post',
    httpPath: '/publish-chat-agent/{agent_id}',
  },
  {
    clientCallName: 'client.llm.create',
    fullyQualifiedName: 'llm.create',
    httpMethod: 'post',
    httpPath: '/create-retell-llm',
  },
  {
    clientCallName: 'client.llm.retrieve',
    fullyQualifiedName: 'llm.retrieve',
    httpMethod: 'get',
    httpPath: '/get-retell-llm/{llm_id}',
  },
  {
    clientCallName: 'client.llm.update',
    fullyQualifiedName: 'llm.update',
    httpMethod: 'patch',
    httpPath: '/update-retell-llm/{llm_id}',
  },
  {
    clientCallName: 'client.llm.list',
    fullyQualifiedName: 'llm.list',
    httpMethod: 'get',
    httpPath: '/list-retell-llms',
  },
  {
    clientCallName: 'client.llm.delete',
    fullyQualifiedName: 'llm.delete',
    httpMethod: 'delete',
    httpPath: '/delete-retell-llm/{llm_id}',
  },
  {
    clientCallName: 'client.conversationFlow.create',
    fullyQualifiedName: 'conversationFlow.create',
    httpMethod: 'post',
    httpPath: '/create-conversation-flow',
  },
  {
    clientCallName: 'client.conversationFlow.retrieve',
    fullyQualifiedName: 'conversationFlow.retrieve',
    httpMethod: 'get',
    httpPath: '/get-conversation-flow/{conversation_flow_id}',
  },
  {
    clientCallName: 'client.conversationFlow.update',
    fullyQualifiedName: 'conversationFlow.update',
    httpMethod: 'patch',
    httpPath: '/update-conversation-flow/{conversation_flow_id}',
  },
  {
    clientCallName: 'client.conversationFlow.list',
    fullyQualifiedName: 'conversationFlow.list',
    httpMethod: 'get',
    httpPath: '/list-conversation-flows',
  },
  {
    clientCallName: 'client.conversationFlow.delete',
    fullyQualifiedName: 'conversationFlow.delete',
    httpMethod: 'delete',
    httpPath: '/delete-conversation-flow/{conversation_flow_id}',
  },
  {
    clientCallName: 'client.conversationFlowComponent.create',
    fullyQualifiedName: 'conversationFlowComponent.create',
    httpMethod: 'post',
    httpPath: '/create-conversation-flow-component',
  },
  {
    clientCallName: 'client.conversationFlowComponent.retrieve',
    fullyQualifiedName: 'conversationFlowComponent.retrieve',
    httpMethod: 'get',
    httpPath: '/get-conversation-flow-component/{conversation_flow_component_id}',
  },
  {
    clientCallName: 'client.conversationFlowComponent.update',
    fullyQualifiedName: 'conversationFlowComponent.update',
    httpMethod: 'patch',
    httpPath: '/update-conversation-flow-component/{conversation_flow_component_id}',
  },
  {
    clientCallName: 'client.conversationFlowComponent.list',
    fullyQualifiedName: 'conversationFlowComponent.list',
    httpMethod: 'get',
    httpPath: '/list-conversation-flow-components',
  },
  {
    clientCallName: 'client.conversationFlowComponent.delete',
    fullyQualifiedName: 'conversationFlowComponent.delete',
    httpMethod: 'delete',
    httpPath: '/delete-conversation-flow-component/{conversation_flow_component_id}',
  },
  {
    clientCallName: 'client.knowledgeBase.create',
    fullyQualifiedName: 'knowledgeBase.create',
    httpMethod: 'post',
    httpPath: '/create-knowledge-base',
  },
  {
    clientCallName: 'client.knowledgeBase.retrieve',
    fullyQualifiedName: 'knowledgeBase.retrieve',
    httpMethod: 'get',
    httpPath: '/get-knowledge-base/{knowledge_base_id}',
  },
  {
    clientCallName: 'client.knowledgeBase.list',
    fullyQualifiedName: 'knowledgeBase.list',
    httpMethod: 'get',
    httpPath: '/list-knowledge-bases',
  },
  {
    clientCallName: 'client.knowledgeBase.delete',
    fullyQualifiedName: 'knowledgeBase.delete',
    httpMethod: 'delete',
    httpPath: '/delete-knowledge-base/{knowledge_base_id}',
  },
  {
    clientCallName: 'client.knowledgeBase.addSources',
    fullyQualifiedName: 'knowledgeBase.addSources',
    httpMethod: 'post',
    httpPath: '/add-knowledge-base-sources/{knowledge_base_id}',
  },
  {
    clientCallName: 'client.knowledgeBase.deleteSource',
    fullyQualifiedName: 'knowledgeBase.deleteSource',
    httpMethod: 'delete',
    httpPath: '/delete-knowledge-base-source/{knowledge_base_id}/source/{source_id}',
  },
  {
    clientCallName: 'client.voice.retrieve',
    fullyQualifiedName: 'voice.retrieve',
    httpMethod: 'get',
    httpPath: '/get-voice/{voice_id}',
  },
  {
    clientCallName: 'client.voice.list',
    fullyQualifiedName: 'voice.list',
    httpMethod: 'get',
    httpPath: '/list-voices',
  },
  {
    clientCallName: 'client.voice.addResource',
    fullyQualifiedName: 'voice.addResource',
    httpMethod: 'post',
    httpPath: '/add-community-voice',
  },
  {
    clientCallName: 'client.voice.clone',
    fullyQualifiedName: 'voice.clone',
    httpMethod: 'post',
    httpPath: '/clone-voice',
  },
  {
    clientCallName: 'client.voice.search',
    fullyQualifiedName: 'voice.search',
    httpMethod: 'post',
    httpPath: '/search-community-voice',
  },
  {
    clientCallName: 'client.concurrency.retrieve',
    fullyQualifiedName: 'concurrency.retrieve',
    httpMethod: 'get',
    httpPath: '/get-concurrency',
  },
  {
    clientCallName: 'client.batchCall.createBatchCall',
    fullyQualifiedName: 'batchCall.createBatchCall',
    httpMethod: 'post',
    httpPath: '/create-batch-call',
  },
  {
    clientCallName: 'client.tests.createBatchTest',
    fullyQualifiedName: 'tests.createBatchTest',
    httpMethod: 'post',
    httpPath: '/create-batch-test',
  },
  {
    clientCallName: 'client.tests.createTestCaseDefinition',
    fullyQualifiedName: 'tests.createTestCaseDefinition',
    httpMethod: 'post',
    httpPath: '/create-test-case-definition',
  },
  {
    clientCallName: 'client.tests.deleteTestCaseDefinition',
    fullyQualifiedName: 'tests.deleteTestCaseDefinition',
    httpMethod: 'delete',
    httpPath: '/delete-test-case-definition/{test_case_definition_id}',
  },
  {
    clientCallName: 'client.tests.getBatchTest',
    fullyQualifiedName: 'tests.getBatchTest',
    httpMethod: 'get',
    httpPath: '/get-batch-test/{test_case_batch_job_id}',
  },
  {
    clientCallName: 'client.tests.getTestCaseDefinition',
    fullyQualifiedName: 'tests.getTestCaseDefinition',
    httpMethod: 'get',
    httpPath: '/get-test-case-definition/{test_case_definition_id}',
  },
  {
    clientCallName: 'client.tests.getTestRun',
    fullyQualifiedName: 'tests.getTestRun',
    httpMethod: 'get',
    httpPath: '/get-test-run/{test_case_job_id}',
  },
  {
    clientCallName: 'client.tests.listBatchTests',
    fullyQualifiedName: 'tests.listBatchTests',
    httpMethod: 'get',
    httpPath: '/list-batch-tests',
  },
  {
    clientCallName: 'client.tests.listTestCaseDefinitions',
    fullyQualifiedName: 'tests.listTestCaseDefinitions',
    httpMethod: 'get',
    httpPath: '/list-test-case-definitions',
  },
  {
    clientCallName: 'client.tests.listTestRuns',
    fullyQualifiedName: 'tests.listTestRuns',
    httpMethod: 'get',
    httpPath: '/list-test-runs/{test_case_batch_job_id}',
  },
  {
    clientCallName: 'client.tests.updateTestCaseDefinition',
    fullyQualifiedName: 'tests.updateTestCaseDefinition',
    httpMethod: 'put',
    httpPath: '/update-test-case-definition/{test_case_definition_id}',
  },
  {
    clientCallName: 'client.mcpTool.getMcpTools',
    fullyQualifiedName: 'mcpTool.getMcpTools',
    httpMethod: 'get',
    httpPath: '/get-mcp-tools/{agent_id}',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
