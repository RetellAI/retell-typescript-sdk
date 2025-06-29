// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Chat extends APIResource {
  /**
   * Create a chat session
   *
   * @example
   * ```ts
   * const chatResponse = await client.chat.create({
   *   agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   * });
   * ```
   */
  create(body: ChatCreateParams, options?: Core.RequestOptions): Core.APIPromise<ChatResponse> {
    return this._client.post('/create-chat', { body, ...options });
  }

  /**
   * Retrieve details of a specific chat
   *
   * @example
   * ```ts
   * const chatResponse = await client.chat.retrieve(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  retrieve(chatId: string, options?: Core.RequestOptions): Core.APIPromise<ChatResponse> {
    return this._client.get(`/get-chat/${chatId}`, options);
  }

  /**
   * List all chats
   *
   * @example
   * ```ts
   * const chatResponses = await client.chat.list();
   * ```
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ChatListResponse> {
    return this._client.get('/list-chat', options);
  }

  /**
   * Create a chat completion message
   *
   * @example
   * ```ts
   * const response = await client.chat.createChatCompletion({
   *   chat_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   *   content: 'hi how are you doing?',
   * });
   * ```
   */
  createChatCompletion(
    body: ChatCreateChatCompletionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ChatCreateChatCompletionResponse> {
    return this._client.post('/create-chat-completion', { body, ...options });
  }

  /**
   * End an ongoing chat
   *
   * @example
   * ```ts
   * await client.chat.end('16b980523634a6dc504898cda492e939');
   * ```
   */
  end(chatId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.patch(`/end-chat/${chatId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ChatResponse {
  /**
   * Corresponding chat agent id of this chat.
   */
  agent_id: string;

  /**
   * Unique id of the chat.
   */
  chat_id: string;

  /**
   * Status of chat.
   *
   * - `ongoing`: Chat session is ongoing, chat agent can receive new message and
   *   generate response.
   *
   * - `ended`: Chat session has ended can not generate new response.
   *
   * - `error`: Chat encountered error.
   */
  chat_status: 'ongoing' | 'ended' | 'error';

  /**
   * Post chat analysis that includes information such as sentiment, status, summary,
   * and custom defined data to extract. Available after chat ends. Subscribe to
   * `chat_analyzed` webhook event type to receive it once ready.
   */
  chat_analysis?: ChatResponse.ChatAnalysis;

  chat_cost?: ChatResponse.ChatCost;

  /**
   * Dynamic variables collected from the chat. Only available after the chat ends.
   */
  collected_dynamic_variables?: { [key: string]: unknown };

  /**
   * End timestamp (milliseconds since epoch) of the chat. Available after chat ends.
   */
  end_timestamp?: number;

  /**
   * Transcript of the chat weaved with tool call invocation and results.
   */
  message_with_tool_calls?: Array<
    | ChatResponse.Message
    | ChatResponse.ToolCallInvocationMessage
    | ChatResponse.ToolCallResultMessage
    | ChatResponse.NodeTransitionMessage
    | ChatResponse.StateTransitionMessage
  >;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the chat. Not used for processing. You
   * can later get this field from the chat object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: { [key: string]: unknown };

  /**
   * Begin timestamp (milliseconds since epoch) of the chat. Available after chat
   * starts.
   */
  start_timestamp?: number;

  /**
   * Transcription of the chat.
   */
  transcript?: string;
}

export namespace ChatResponse {
  /**
   * Post chat analysis that includes information such as sentiment, status, summary,
   * and custom defined data to extract. Available after chat ends. Subscribe to
   * `chat_analyzed` webhook event type to receive it once ready.
   */
  export interface ChatAnalysis {
    /**
     * Whether the agent seems to have a successful chat with the user, where the agent
     * finishes the task, and the call was complete without being cutoff.
     */
    chat_successful?: boolean;

    /**
     * A high level summary of the chat.
     */
    chat_summary?: string;

    /**
     * Custom analysis data that was extracted based on the schema defined in chat
     * agent post chat analysis data. Can be empty if nothing is specified.
     */
    custom_analysis_data?: unknown;

    /**
     * Sentiment of the user in the chat.
     */
    user_sentiment?: 'Negative' | 'Positive' | 'Neutral' | 'Unknown';
  }

  export interface ChatCost {
    /**
     * Combined cost of all individual costs in cents
     */
    combined_cost?: number;

    /**
     * List of products with their unit prices and costs in cents
     */
    product_costs?: Array<ChatCost.ProductCost>;
  }

  export namespace ChatCost {
    export interface ProductCost {
      /**
       * Cost for the product in cents for the duration of the call.
       */
      cost: number;

      /**
       * Product name that has a cost associated with it.
       */
      product: string;

      /**
       * Unit price of the product in cents per second.
       */
      unitPrice: number;
    }
  }

  export interface Message {
    /**
     * Content of the message
     */
    content: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * Documents whether this message is sent by agent or user.
     */
    role: 'agent' | 'user';
  }

  export interface ToolCallInvocationMessage {
    /**
     * Arguments for this tool call, it's a stringified JSON object.
     */
    arguments: string;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * Name of the function in this tool call.
     */
    name: string;

    /**
     * This is a tool call invocation.
     */
    role: 'tool_call_invocation';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;
  }

  export interface ToolCallResultMessage {
    /**
     * Result of the tool call, can be a string, a stringified json, etc.
     */
    content: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * This is result of a tool call.
     */
    role: 'tool_call_result';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;
  }

  export interface NodeTransitionMessage {
    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * This is node transition.
     */
    role: 'node_transition';

    /**
     * Former node id
     */
    former_node_id?: string;

    /**
     * Former node name
     */
    former_node_name?: string;

    /**
     * New node id
     */
    new_node_id?: string;

    /**
     * New node name
     */
    new_node_name?: string;
  }

  export interface StateTransitionMessage {
    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * This is state transition for .
     */
    role: 'state_transition';

    /**
     * Former state name
     */
    former_state_name?: string;

    /**
     * New state name
     */
    new_state_name?: string;
  }
}

export type ChatListResponse = Array<ChatResponse>;

export interface ChatCreateChatCompletionResponse {
  /**
   * New messages generated by the agent during this completion, including any tool
   * call invocations and their results. Does not include the original input
   * messages.
   */
  messages: Array<
    | ChatCreateChatCompletionResponse.Message
    | ChatCreateChatCompletionResponse.ToolCallInvocationMessage
    | ChatCreateChatCompletionResponse.ToolCallResultMessage
    | ChatCreateChatCompletionResponse.NodeTransitionMessage
    | ChatCreateChatCompletionResponse.StateTransitionMessage
  >;
}

export namespace ChatCreateChatCompletionResponse {
  export interface Message {
    /**
     * Content of the message
     */
    content: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * Documents whether this message is sent by agent or user.
     */
    role: 'agent' | 'user';
  }

  export interface ToolCallInvocationMessage {
    /**
     * Arguments for this tool call, it's a stringified JSON object.
     */
    arguments: string;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * Name of the function in this tool call.
     */
    name: string;

    /**
     * This is a tool call invocation.
     */
    role: 'tool_call_invocation';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;
  }

  export interface ToolCallResultMessage {
    /**
     * Result of the tool call, can be a string, a stringified json, etc.
     */
    content: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * This is result of a tool call.
     */
    role: 'tool_call_result';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;
  }

  export interface NodeTransitionMessage {
    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * This is node transition.
     */
    role: 'node_transition';

    /**
     * Former node id
     */
    former_node_id?: string;

    /**
     * Former node name
     */
    former_node_name?: string;

    /**
     * New node id
     */
    new_node_id?: string;

    /**
     * New node name
     */
    new_node_name?: string;
  }

  export interface StateTransitionMessage {
    /**
     * Create timestamp of the message
     */
    created_timestamp: number;

    /**
     * Unique id ot the message
     */
    message_id: string;

    /**
     * This is state transition for .
     */
    role: 'state_transition';

    /**
     * Former state name
     */
    former_state_name?: string;

    /**
     * New state name
     */
    new_state_name?: string;
  }
}

export interface ChatCreateParams {
  /**
   * The chat agent to use for the call.
   */
  agent_id: string;

  /**
   * The version of the chat agent to use for the chat. If not provided, will default
   * to latest version.
   */
  agent_version?: number;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the chat. Not used for processing. You
   * can later get this field from the chat object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: { [key: string]: unknown };
}

export interface ChatCreateChatCompletionParams {
  /**
   * Unique id of the chat to create completion.
   */
  chat_id: string;

  /**
   * user message to generate agent chat completion.
   */
  content: string;
}

export declare namespace Chat {
  export {
    type ChatResponse as ChatResponse,
    type ChatListResponse as ChatListResponse,
    type ChatCreateChatCompletionResponse as ChatCreateChatCompletionResponse,
    type ChatCreateParams as ChatCreateParams,
    type ChatCreateChatCompletionParams as ChatCreateChatCompletionParams,
  };
}
