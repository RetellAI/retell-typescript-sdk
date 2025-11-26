// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  Agent as AgentAPIAgent,
  AgentCreateParams,
  AgentGetVersionsResponse,
  AgentListParams,
  AgentListResponse,
  AgentResponse,
  AgentRetrieveParams,
  AgentUpdateParams,
} from './resources/agent';
import { BatchCall, BatchCallCreateBatchCallParams, BatchCallResponse } from './resources/batch-call';
import {
  Call,
  CallCreatePhoneCallParams,
  CallCreateWebCallParams,
  CallListParams,
  CallListResponse,
  CallRegisterPhoneCallParams,
  CallResponse,
  CallUpdateParams,
  PhoneCallResponse,
  WebCallResponse,
} from './resources/call';
import {
  Chat,
  ChatCreateChatCompletionParams,
  ChatCreateChatCompletionResponse,
  ChatCreateParams,
  ChatCreateSMSChatParams,
  ChatListResponse,
  ChatResponse,
  ChatUpdateParams,
} from './resources/chat';
import { ChatAgent, ChatAgentResponse } from './resources/chat-agent';
import { Concurrency, ConcurrencyRetrieveResponse } from './resources/concurrency';
import {
  ConversationFlow,
  ConversationFlowCreateParams,
  ConversationFlowListParams,
  ConversationFlowListResponse,
  ConversationFlowResponse,
  ConversationFlowRetrieveParams,
  ConversationFlowUpdateParams,
} from './resources/conversation-flow';
import {
  KnowledgeBase,
  KnowledgeBaseAddSourcesParams,
  KnowledgeBaseCreateParams,
  KnowledgeBaseListResponse,
  KnowledgeBaseResponse,
} from './resources/knowledge-base';
import {
  Llm,
  LlmCreateParams,
  LlmListParams,
  LlmListResponse,
  LlmResponse,
  LlmRetrieveParams,
  LlmUpdateParams,
} from './resources/llm';
import {
  McpTool,
  McpToolDefinition,
  McpToolGetMcpToolsParams,
  McpToolGetMcpToolsResponse,
} from './resources/mcp-tool';
import {
  PhoneNumber,
  PhoneNumberCreateParams,
  PhoneNumberImportParams,
  PhoneNumberListResponse,
  PhoneNumberResponse,
  PhoneNumberUpdateParams,
} from './resources/phone-number';
import { BatchTestResponse, TestCreateBatchTestParams, Tests } from './resources/tests';
import { Voice, VoiceListResponse, VoiceResponse } from './resources/voice';
import * as Webhooks from 'retell-sdk/lib/webhook_auth';

export interface ClientOptions {
  apiKey: string;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['RETELL_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Retell API.
 */
export class Retell extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Retell API.
   *
   * @param {string} opts.apiKey
   * @param {string} [opts.baseURL=process.env['RETELL_BASE_URL'] ?? https://api.retellai.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({ baseURL = Core.readEnv('RETELL_BASE_URL'), apiKey, ...opts }: ClientOptions) {
    if (apiKey === undefined) {
      throw new Errors.RetellError(
        "Missing required client option apiKey; you need to instantiate the Retell client with an apiKey option, like new Retell({ apiKey: 'YOUR_RETELL_API_KEY' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.retellai.com`,
    };

    super({
      baseURL: options.baseURL!,
      baseURLOverridden: baseURL ? baseURL !== 'https://api.retellai.com' : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  call: API.Call = new API.Call(this);
  chat: API.Chat = new API.Chat(this);
  phoneNumber: API.PhoneNumber = new API.PhoneNumber(this);
  agent: API.Agent = new API.Agent(this);
  chatAgent: API.ChatAgent = new API.ChatAgent(this);
  llm: API.Llm = new API.Llm(this);
  conversationFlow: API.ConversationFlow = new API.ConversationFlow(this);
  knowledgeBase: API.KnowledgeBase = new API.KnowledgeBase(this);
  voice: API.Voice = new API.Voice(this);
  concurrency: API.Concurrency = new API.Concurrency(this);
  batchCall: API.BatchCall = new API.BatchCall(this);
  tests: API.Tests = new API.Tests(this);
  mcpTool: API.McpTool = new API.McpTool(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.retellai.com';
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  static Retell = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static RetellError = Errors.RetellError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;

  static verify = Webhooks.verify;
  static sign = Webhooks.sign;
}

Retell.Call = Call;
Retell.Chat = Chat;
Retell.PhoneNumber = PhoneNumber;
Retell.Agent = AgentAPIAgent;
Retell.ChatAgent = ChatAgent;
Retell.Llm = Llm;
Retell.ConversationFlow = ConversationFlow;
Retell.KnowledgeBase = KnowledgeBase;
Retell.Voice = Voice;
Retell.Concurrency = Concurrency;
Retell.BatchCall = BatchCall;
Retell.Tests = Tests;
Retell.McpTool = McpTool;

export declare namespace Retell {
  export type RequestOptions = Core.RequestOptions;

  export {
    Call as Call,
    type CallResponse as CallResponse,
    type PhoneCallResponse as PhoneCallResponse,
    type WebCallResponse as WebCallResponse,
    type CallListResponse as CallListResponse,
    type CallUpdateParams as CallUpdateParams,
    type CallListParams as CallListParams,
    type CallCreatePhoneCallParams as CallCreatePhoneCallParams,
    type CallCreateWebCallParams as CallCreateWebCallParams,
    type CallRegisterPhoneCallParams as CallRegisterPhoneCallParams,
  };

  export {
    Chat as Chat,
    type ChatResponse as ChatResponse,
    type ChatListResponse as ChatListResponse,
    type ChatCreateChatCompletionResponse as ChatCreateChatCompletionResponse,
    type ChatCreateParams as ChatCreateParams,
    type ChatUpdateParams as ChatUpdateParams,
    type ChatCreateChatCompletionParams as ChatCreateChatCompletionParams,
    type ChatCreateSMSChatParams as ChatCreateSMSChatParams,
  };

  export {
    PhoneNumber as PhoneNumber,
    type PhoneNumberResponse as PhoneNumberResponse,
    type PhoneNumberListResponse as PhoneNumberListResponse,
    type PhoneNumberCreateParams as PhoneNumberCreateParams,
    type PhoneNumberUpdateParams as PhoneNumberUpdateParams,
    type PhoneNumberImportParams as PhoneNumberImportParams,
  };

  export {
    AgentAPIAgent as Agent,
    type AgentResponse as AgentResponse,
    type AgentListResponse as AgentListResponse,
    type AgentGetVersionsResponse as AgentGetVersionsResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentRetrieveParams as AgentRetrieveParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };

  export { ChatAgent as ChatAgent, type ChatAgentResponse as ChatAgentResponse };

  export {
    Llm as Llm,
    type LlmResponse as LlmResponse,
    type LlmListResponse as LlmListResponse,
    type LlmCreateParams as LlmCreateParams,
    type LlmRetrieveParams as LlmRetrieveParams,
    type LlmUpdateParams as LlmUpdateParams,
    type LlmListParams as LlmListParams,
  };

  export {
    ConversationFlow as ConversationFlow,
    type ConversationFlowResponse as ConversationFlowResponse,
    type ConversationFlowListResponse as ConversationFlowListResponse,
    type ConversationFlowCreateParams as ConversationFlowCreateParams,
    type ConversationFlowRetrieveParams as ConversationFlowRetrieveParams,
    type ConversationFlowUpdateParams as ConversationFlowUpdateParams,
    type ConversationFlowListParams as ConversationFlowListParams,
  };

  export {
    KnowledgeBase as KnowledgeBase,
    type KnowledgeBaseResponse as KnowledgeBaseResponse,
    type KnowledgeBaseListResponse as KnowledgeBaseListResponse,
    type KnowledgeBaseCreateParams as KnowledgeBaseCreateParams,
    type KnowledgeBaseAddSourcesParams as KnowledgeBaseAddSourcesParams,
  };

  export { Voice as Voice, type VoiceResponse as VoiceResponse, type VoiceListResponse as VoiceListResponse };

  export { Concurrency as Concurrency, type ConcurrencyRetrieveResponse as ConcurrencyRetrieveResponse };

  export {
    BatchCall as BatchCall,
    type BatchCallResponse as BatchCallResponse,
    type BatchCallCreateBatchCallParams as BatchCallCreateBatchCallParams,
  };

  export {
    Tests as Tests,
    type BatchTestResponse as BatchTestResponse,
    type TestCreateBatchTestParams as TestCreateBatchTestParams,
  };

  export {
    McpTool as McpTool,
    type McpToolDefinition as McpToolDefinition,
    type McpToolGetMcpToolsResponse as McpToolGetMcpToolsResponse,
    type McpToolGetMcpToolsParams as McpToolGetMcpToolsParams,
  };
}

export { toFile, fileFromPath } from './uploads';
export {
  RetellError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Retell;
