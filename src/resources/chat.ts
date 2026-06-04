// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ChatAPI from './chat';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
  create(body: ChatCreateParams, options?: RequestOptions): APIPromise<ChatResponse> {
    return this._client.post('/create-chat', { body, ...options });
  }

  /**
   * Start an outbound SMS chat conversation with a phone number using the specified
   * agent. The agent must be configured for chat mode. The initial SMS message will
   * be automatically generated and sent based on the agent's configuration.
   *
   * @example
   * ```ts
   * const chatResponse = await client.chat.createSMSChat({
   *   from_number: '+12137771234',
   *   to_number: '+14155551234',
   * });
   * ```
   */
  createSMSChat(body: ChatCreateSMSChatParams, options?: RequestOptions): APIPromise<ChatResponse> {
    return this._client.post('/create-sms-chat', { body, ...options });
  }

  /**
   * End an ongoing chat
   *
   * @example
   * ```ts
   * await client.chat.end('16b980523634a6dc504898cda492e939');
   * ```
   */
  end(chatID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/end-chat/${chatID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
  retrieve(chatID: string, options?: RequestOptions): APIPromise<ChatResponse> {
    return this._client.get(path`/get-chat/${chatID}`, options);
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
    options?: RequestOptions,
  ): APIPromise<ChatCreateChatCompletionResponse> {
    return this._client.post('/create-chat-completion', {
      body,
      timeout: (this._client as any)._options.timeout ?? 300000,
      ...options,
    });
  }

  /**
   * List chats with unified cursor pagination response.
   *
   * @example
   * ```ts
   * const chats = await client.chat.list();
   * ```
   */
  list(body: ChatListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ChatListResponse> {
    return this._client.post('/v3/list-chats', {
      body,
      timeout: (this._client as any)._options.timeout ?? 300000,
      ...options,
    });
  }

  /**
   * Update metadata and sensitive data storage settings for an existing chat.
   *
   * @example
   * ```ts
   * const chatResponse = await client.chat.update(
   *   'chat_98c1a2157aa0559144d67bb0729',
   *   {
   *     data_storage_setting: 'everything',
   *     metadata: {
   *       customer_id: 'cust_123',
   *       notes: 'Follow-up required',
   *     },
   *     override_dynamic_variables: {
   *       additional_discount: '15%',
   *     },
   *   },
   * );
   * ```
   */
  update(chatID: string, body: ChatUpdateParams, options?: RequestOptions): APIPromise<ChatResponse> {
    return this._client.patch(path`/update-chat/${chatID}`, { body, ...options });
  }

  /**
   * Delete an existing chat
   *
   * @example
   * ```ts
   * await client.chat.delete(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  delete(chatID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-chat/${chatID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
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
   * - `ended`: Chat session has ended, and no longer can generate new response.
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
   * Type of the chat
   */
  chat_type?: 'api_chat' | 'sms_chat';

  /**
   * Dynamic variables collected from the chat. Only available after the chat ends.
   */
  collected_dynamic_variables?: { [key: string]: string };

  /**
   * Custom attributes for the chat
   */
  custom_attributes?: { [key: string]: string | number | boolean };

  /**
   * End timestamp (milliseconds since epoch) of the chat. Available after chat ends.
   */
  end_timestamp?: number | null;

  /**
   * Transcript of the chat weaved with tool call invocation and results.
   */
  message_with_tool_calls?: Array<
    | ChatResponse.MessageBase
    | ChatResponse.ToolCallInvocationMessageBase
    | ChatResponse.ToolCallResultMessageBase
    | ChatResponse.NodeTransitionMessageBase
    | ChatResponse.StateTransitionMessageBase
    | ChatResponse.InjectedMessageBase
    | ChatResponse.SMSMessageBase
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
  retell_llm_dynamic_variables?: { [key: string]: string };

  /**
   * Begin timestamp (milliseconds since epoch) of the chat. Available after chat
   * starts.
   */
  start_timestamp?: number;

  /**
   * Transcription of the chat.
   */
  transcript?: string;

  /**
   * The version of the agent
   */
  version?: number | null;
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
       * True if this cost item is for a transfer segment.
       */
      is_transfer_leg_cost?: boolean;

      /**
       * Unit price of the product in cents per second.
       */
      unit_price?: number;
    }
  }

  export interface MessageBase {
    /**
     * Content of the message
     */
    content: string;

    /**
     * Documents whether this message is sent by agent or user.
     */
    role: 'agent' | 'user';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;
  }

  export interface ToolCallInvocationMessageBase {
    /**
     * Arguments for this tool call, it's a stringified JSON object.
     */
    arguments: string;

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

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * Optional thought signature from Google Gemini thinking models. This is used
     * internally to maintain reasoning chain in multi-turn function calling.
     */
    thought_signature?: string;
  }

  export interface ToolCallResultMessageBase {
    /**
     * Result of the tool call, can be a string, a stringified json, etc.
     */
    content: string;

    /**
     * This is the result of a tool call.
     */
    role: 'tool_call_result';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * Whether the tool call was successful.
     */
    successful?: boolean;
  }

  export interface NodeTransitionMessageBase {
    /**
     * This is a node transition.
     */
    role: 'node_transition';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Former node id
     */
    former_node_id?: string;

    /**
     * Former node name
     */
    former_node_name?: string;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * New node id
     */
    new_node_id?: string;

    /**
     * New node name
     */
    new_node_name?: string;

    /**
     * How this node was reached. "global" means a global node transition,
     * "global_go_back" means returning from a global node, "interrupt_go_back" means
     * going back due to user interruption, and "normal" means a regular edge
     * transition.
     */
    transition_type?: 'global' | 'global_go_back' | 'interrupt_go_back' | 'normal';
  }

  export interface StateTransitionMessageBase {
    /**
     * This is a state transition.
     */
    role: 'state_transition';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Former state name
     */
    former_state_name?: string;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * New state name
     */
    new_state_name?: string;
  }

  export interface InjectedMessageBase {
    /**
     * The injected context text.
     */
    content: string;

    /**
     * External context injected into the conversation via the update-live-call API.
     * Not spoken by either party.
     */
    role: 'injected';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;
  }

  export interface SMSMessageBase {
    /**
     * Text content of the SMS message.
     */
    content: string;

    /**
     * SMS message exchanged during the call (for example received from the user).
     * Woven into the transcript and shown to the agent, but not part of the spoken
     * conversation.
     */
    role: 'sms';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * Multimedia attachments (MMS). Display only; not relayed into the spoken
     * conversation.
     */
    multimedia?: Array<SMSMessageBase.Multimedia>;
  }

  export namespace SMSMessageBase {
    export interface Multimedia {
      /**
       * URL of the multimedia attachment.
       */
      url: string;

      /**
       * Optional textual summary of the attachment.
       */
      summary?: string;
    }
  }
}

export interface ChatListResponse {
  /**
   * Whether more results are available.
   */
  has_more?: boolean;

  items?: Array<ChatListResponse.Item>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;

  /**
   * Total number of chats matching `filter_criteria`. Only present when
   * `include_total` is true.
   */
  total?: number;
}

export namespace ChatListResponse {
  /**
   * V3 list chats response. Transcript fields are intentionally omitted.
   */
  export interface Item extends ChatAPI.ChatResponse {}
}

export interface ChatCreateChatCompletionResponse {
  /**
   * New messages generated by the agent during this completion, including any tool
   * call invocations and their results. Does not include the original input
   * messages.
   */
  messages: Array<
    | ChatCreateChatCompletionResponse.MessageBase
    | ChatCreateChatCompletionResponse.ToolCallInvocationMessageBase
    | ChatCreateChatCompletionResponse.ToolCallResultMessageBase
    | ChatCreateChatCompletionResponse.NodeTransitionMessageBase
    | ChatCreateChatCompletionResponse.StateTransitionMessageBase
    | ChatCreateChatCompletionResponse.InjectedMessageBase
    | ChatCreateChatCompletionResponse.SMSMessageBase
  >;
}

export namespace ChatCreateChatCompletionResponse {
  export interface MessageBase {
    /**
     * Content of the message
     */
    content: string;

    /**
     * Documents whether this message is sent by agent or user.
     */
    role: 'agent' | 'user';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;
  }

  export interface ToolCallInvocationMessageBase {
    /**
     * Arguments for this tool call, it's a stringified JSON object.
     */
    arguments: string;

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

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * Optional thought signature from Google Gemini thinking models. This is used
     * internally to maintain reasoning chain in multi-turn function calling.
     */
    thought_signature?: string;
  }

  export interface ToolCallResultMessageBase {
    /**
     * Result of the tool call, can be a string, a stringified json, etc.
     */
    content: string;

    /**
     * This is the result of a tool call.
     */
    role: 'tool_call_result';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * Whether the tool call was successful.
     */
    successful?: boolean;
  }

  export interface NodeTransitionMessageBase {
    /**
     * This is a node transition.
     */
    role: 'node_transition';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Former node id
     */
    former_node_id?: string;

    /**
     * Former node name
     */
    former_node_name?: string;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * New node id
     */
    new_node_id?: string;

    /**
     * New node name
     */
    new_node_name?: string;

    /**
     * How this node was reached. "global" means a global node transition,
     * "global_go_back" means returning from a global node, "interrupt_go_back" means
     * going back due to user interruption, and "normal" means a regular edge
     * transition.
     */
    transition_type?: 'global' | 'global_go_back' | 'interrupt_go_back' | 'normal';
  }

  export interface StateTransitionMessageBase {
    /**
     * This is a state transition.
     */
    role: 'state_transition';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Former state name
     */
    former_state_name?: string;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * New state name
     */
    new_state_name?: string;
  }

  export interface InjectedMessageBase {
    /**
     * The injected context text.
     */
    content: string;

    /**
     * External context injected into the conversation via the update-live-call API.
     * Not spoken by either party.
     */
    role: 'injected';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;
  }

  export interface SMSMessageBase {
    /**
     * Text content of the SMS message.
     */
    content: string;

    /**
     * SMS message exchanged during the call (for example received from the user).
     * Woven into the transcript and shown to the agent, but not part of the spoken
     * conversation.
     */
    role: 'sms';

    /**
     * Create timestamp of the message
     */
    created_timestamp?: number;

    /**
     * Unique id of the message
     */
    message_id?: string;

    /**
     * Multimedia attachments (MMS). Display only; not relayed into the spoken
     * conversation.
     */
    multimedia?: Array<SMSMessageBase.Multimedia>;
  }

  export namespace SMSMessageBase {
    export interface Multimedia {
      /**
       * URL of the multimedia attachment.
       */
      url: string;

      /**
       * Optional textual summary of the attachment.
       */
      summary?: string;
    }
  }
}

export interface ChatCreateParams {
  /**
   * The chat agent to use for the chat.
   */
  agent_id: string;

  /**
   * The version of the chat agent to use for the chat. If not provided, will default
   * to latest version.
   */
  agent_version?: number | string;

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
  retell_llm_dynamic_variables?: { [key: string]: string };
}

export interface ChatCreateSMSChatParams {
  /**
   * The phone number to send SMS from in E.164 format. Must be a number purchased
   * from Retell or imported to Retell with SMS capability.
   */
  from_number: string;

  /**
   * The phone number to send SMS to in E.164 format
   */
  to_number: string;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the chat. Not used for processing. You
   * can later get this field from the chat object.
   */
  metadata?: unknown;

  /**
   * For this particular chat, override the agent used with this agent id. This does
   * not bind the agent to this number, this is for one time override.
   */
  override_agent_id?: string;

  /**
   * For this particular chat, override the agent version used with this version.
   * This does not bind the agent version to this number, this is for one time
   * override.
   */
  override_agent_version?: number | string;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: { [key: string]: string };
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

export interface ChatListParams {
  /**
   * Filter criteria for chats to retrieve.
   */
  filter_criteria?: ChatListParams.FilterCriteria;

  /**
   * Whether to include `total` (count of all chats matching `filter_criteria`,
   * ignoring `limit`/`skip`/`pagination_key`) in the response. Defaults to false.
   * Each enabled request triggers an additional aggregate query, so opt in only when
   * the total is needed.
   */
  include_total?: boolean;

  /**
   * Maximum number of chats to return.
   */
  limit?: number;

  /**
   * Opaque pagination cursor from a previous response.
   */
  pagination_key?: string;

  /**
   * Number of records to skip for pagination.
   */
  skip?: number;

  /**
   * Sort chats by `start_timestamp` in ascending or descending order.
   */
  sort_order?: 'ascending' | 'descending';
}

export namespace ChatListParams {
  /**
   * Filter criteria for chats to retrieve.
   */
  export interface FilterCriteria {
    /**
     * Filter by agent(s). Agent filters are connected by OR.
     */
    agent?: Array<FilterCriteria.Agent>;

    /**
     * Filter by chat ID.
     */
    chat_id?: FilterCriteria.ChatID;

    chat_status?: FilterCriteria.ChatStatus;

    /**
     * Filter by whether the chat was successful.
     */
    chat_successful?: FilterCriteria.ChatSuccessful;

    /**
     * Filter by combined cost of the chat.
     */
    combined_cost?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by custom analysis data fields.
     */
    custom_analysis_data?: Array<
      | FilterCriteria.StringFilter
      | FilterCriteria.NumberFilter
      | FilterCriteria.BooleanFilter
      | FilterCriteria.RangeFilter
      | FilterCriteria.EnumFilter
      | FilterCriteria.PresentFilter
    >;

    /**
     * Filter by custom attributes fields.
     */
    custom_attributes?: Array<
      | FilterCriteria.StringFilter
      | FilterCriteria.NumberFilter
      | FilterCriteria.BooleanFilter
      | FilterCriteria.RangeFilter
      | FilterCriteria.EnumFilter
      | FilterCriteria.PresentFilter
    >;

    disconnection_reason?: FilterCriteria.DisconnectionReason;

    /**
     * Filter by chat duration in milliseconds.
     */
    duration_ms?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by chat end timestamp (epoch ms).
     */
    end_timestamp?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by chat start timestamp (epoch ms).
     */
    start_timestamp?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    user_sentiment?: FilterCriteria.UserSentiment;
  }

  export namespace FilterCriteria {
    export interface Agent {
      /**
       * The agent ID to filter on.
       */
      agent_id: string;

      /**
       * Specific versions to filter on. If not provided, all versions are included.
       */
      version?: Array<number>;
    }

    /**
     * Filter by chat ID.
     */
    export interface ChatID {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }

    export interface ChatStatus {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<'ongoing' | 'ended' | 'error'>;
    }

    /**
     * Filter by whether the chat was successful.
     */
    export interface ChatSuccessful {
      op: 'eq';

      type: 'boolean';

      value: boolean;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;
    }

    export interface StringFilter {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface BooleanFilter {
      op: 'eq';

      type: 'boolean';

      value: boolean;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface EnumFilter {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<string>;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface PresentFilter {
      /**
       * pr: present (has value), np: not present
       */
      op: 'pr' | 'np';

      type: 'present';

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface StringFilter {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface BooleanFilter {
      op: 'eq';

      type: 'boolean';

      value: boolean;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface EnumFilter {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<string>;

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface PresentFilter {
      /**
       * pr: present (has value), np: not present
       */
      op: 'pr' | 'np';

      type: 'present';

      /**
       * The field name to filter on.
       */
      key?: string;
    }

    export interface DisconnectionReason {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<
        | 'user_hangup'
        | 'agent_hangup'
        | 'call_transfer'
        | 'voicemail_reached'
        | 'ivr_reached'
        | 'inactivity'
        | 'max_duration_reached'
        | 'concurrency_limit_reached'
        | 'no_concurrency_fallback'
        | 'no_valid_payment'
        | 'scam_detected'
        | 'dial_busy'
        | 'dial_failed'
        | 'dial_no_answer'
        | 'invalid_destination'
        | 'telephony_provider_permission_denied'
        | 'telephony_provider_unavailable'
        | 'sip_routing_error'
        | 'marked_as_spam'
        | 'user_declined'
        | 'error_llm_websocket_open'
        | 'error_llm_websocket_lost_connection'
        | 'error_llm_websocket_runtime'
        | 'error_llm_websocket_corrupt_payload'
        | 'error_no_audio_received'
        | 'error_asr'
        | 'error_retell'
        | 'error_unknown'
        | 'error_user_not_joined'
        | 'registered_call_timeout'
        | 'transfer_bridged'
        | 'transfer_cancelled'
        | 'manual_stopped'
        | 'call_take_over'
      >;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;
    }

    export interface NumberFilter {
      /**
       * eq: equal, ne: not equal, gt: greater than, ge: greater than or equal, lt: less
       * than, le: less than or equal
       */
      op: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le';

      type: 'number';

      value: number;
    }

    export interface RangeFilter {
      /**
       * bt: between
       */
      op: 'bt';

      type: 'range';

      /**
       * [lower_bound, upper_bound]
       */
      value: Array<number>;
    }

    export interface UserSentiment {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<'Negative' | 'Positive' | 'Neutral' | 'Unknown'>;
    }
  }
}

export interface ChatUpdateParams {
  /**
   * Custom attributes for the chat
   */
  custom_attributes?: { [key: string]: string | number | boolean };

  /**
   * Data storage setting for this chat. Overrides the agent's default setting.
   * "everything" stores all data, "basic_attributes_only" stores only metadata.
   * Cannot be downgraded from more restrictive to less restrictive settings.
   */
  data_storage_setting?: 'everything' | 'basic_attributes_only';

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the chat. Not used for processing. You
   * can later get this field from the chat object. Size limited to 50kB max.
   */
  metadata?: unknown;

  /**
   * Override dynamic variables represented as key-value pairs of strings. Setting
   * this will override or add the dynamic variables set in the agent during the
   * call. Only need to set the delta where you want to override, no need to set the
   * entire dynamic variables object. Setting this to null will remove any existing
   * override.
   */
  override_dynamic_variables?: { [key: string]: string } | null;
}

export declare namespace Chat {
  export {
    type ChatResponse as ChatResponse,
    type ChatListResponse as ChatListResponse,
    type ChatCreateChatCompletionResponse as ChatCreateChatCompletionResponse,
    type ChatCreateParams as ChatCreateParams,
    type ChatCreateSMSChatParams as ChatCreateSMSChatParams,
    type ChatCreateChatCompletionParams as ChatCreateChatCompletionParams,
    type ChatListParams as ChatListParams,
    type ChatUpdateParams as ChatUpdateParams,
  };
}
