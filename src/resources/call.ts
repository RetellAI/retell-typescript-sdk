// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Call extends APIResource {
  /**
   * Retrieve details of a specific call
   */
  retrieve(callId: string, options?: Core.RequestOptions): Core.APIPromise<CallResponse> {
    return this._client.get(`/v2/get-call/${callId}`, options);
  }

  /**
   * Update metadata and sensitive data storage settings for an existing call
   */
  update(
    callId: string,
    body: CallUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallResponse> {
    return this._client.patch(`/v2/update-call/${callId}`, { body, ...options });
  }

  /**
   * Retrieve call details
   */
  list(body: CallListParams, options?: Core.RequestOptions): Core.APIPromise<CallListResponse> {
    return this._client.post('/v2/list-calls', { body, ...options });
  }

  /**
   * Delete a specific call and its associated data
   */
  delete(callId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v2/delete-call/${callId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Create a new outbound phone call
   */
  createPhoneCall(
    body: CallCreatePhoneCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneCallResponse> {
    return this._client.post('/v2/create-phone-call', { body, ...options });
  }

  /**
   * Create a new web call
   */
  createWebCall(
    body: CallCreateWebCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebCallResponse> {
    return this._client.post('/v2/create-web-call', { body, ...options });
  }

  /**
   * Register a new phone call for custom telephony
   */
  registerPhoneCall(
    body: CallRegisterPhoneCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneCallResponse> {
    return this._client.post('/v2/register-phone-call', { body, ...options });
  }
}

export type CallResponse = WebCallResponse | PhoneCallResponse;

export interface PhoneCallResponse {
  /**
   * Corresponding agent id of this call.
   */
  agent_id: string;

  /**
   * Unique id of the call. Used to identify in LLM websocket and used to
   * authenticate in audio websocket.
   */
  call_id: string;

  /**
   * Status of call.
   *
   * - `registered`: Call id issued, starting to make a call using this id.
   *
   * - `ongoing`: Call connected and ongoing.
   *
   * - `ended`: The underlying websocket has ended for the call. Either user or agent
   *   hanged up, or call transferred.
   *
   * - `error`: Call encountered error.
   */
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';

  /**
   * Type of the call. Used to distinguish between web call and phone call.
   */
  call_type: 'phone_call';

  /**
   * Direction of the phone call.
   */
  direction: 'inbound' | 'outbound';

  /**
   * The caller number.
   */
  from_number: string;

  /**
   * The callee number.
   */
  to_number: string;

  /**
   * Post call analysis that includes information such as sentiment, status, summary,
   * and custom defined data to extract. Available after call ends. Subscribe to
   * `call_analyzed` webhook event type to receive it once ready.
   */
  call_analysis?: PhoneCallResponse.CallAnalysis;

  /**
   * Cost of the call, including all the products and their costs and discount.
   */
  call_cost?: PhoneCallResponse.CallCost;

  /**
   * The reason for the disconnection of the call. Read details desciption about
   * reasons listed here at
   * [Disconnection Reason Doc](/get-started/debug-guide#disconnection-reason).
   */
  disconnection_reason?:
    | 'user_hangup'
    | 'agent_hangup'
    | 'call_transfer'
    | 'voicemail_reached'
    | 'inactivity'
    | 'machine_detected'
    | 'max_duration_reached'
    | 'concurrency_limit_reached'
    | 'no_valid_payment'
    | 'scam_detected'
    | 'error_inbound_webhook'
    | 'dial_busy'
    | 'dial_failed'
    | 'dial_no_answer'
    | 'error_llm_websocket_open'
    | 'error_llm_websocket_lost_connection'
    | 'error_llm_websocket_runtime'
    | 'error_llm_websocket_corrupt_payload'
    | 'error_frontend_corrupted_payload'
    | 'error_twilio'
    | 'error_no_audio_received'
    | 'error_asr'
    | 'error_retell'
    | 'error_unknown'
    | 'error_user_not_joined'
    | 'registered_call_timeout';

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  latency?: PhoneCallResponse.Latency;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Whether this agent opts in for signed URLs for public logs and recordings. When
   * enabled, the generated URLs will include security signatures that restrict
   * access and automatically expire after 24 hours.
   */
  opt_in_signed_url?: boolean;

  /**
   * Whether this call opts out of sensitive data storage like transcript, recording,
   * logging.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * Public log of the call, containing details about all the requests and responses
   * received in LLM WebSocket, latency tracking for each turntaking, helpful for
   * debugging and tracing. Available after call ends.
   */
  public_log_url?: string;

  /**
   * Recording of the call. Available after call ends.
   */
  recording_url?: string;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;

  /**
   * Begin timestamp (milliseconds since epoch) of the call. Available after call
   * starts.
   */
  start_timestamp?: number;

  /**
   * Telephony identifier of the call, populated when available. Tracking purposes
   * only.
   */
  telephony_identifier?: PhoneCallResponse.TelephonyIdentifier;

  /**
   * Transcription of the call. Available after call ends.
   */
  transcript?: string;

  /**
   * Transcript of the call in the format of a list of utterance, with timestamp.
   * Available after call ends.
   */
  transcript_object?: Array<PhoneCallResponse.TranscriptObject>;

  /**
   * Transcript of the call weaved with tool call invocation and results. It
   * precisely captures when (at what utterance, which word) the tool was invoked and
   * what was the result. Available after call ends.
   */
  transcript_with_tool_calls?: Array<
    | PhoneCallResponse.Utterance
    | PhoneCallResponse.ToolCallInvocationUtterance
    | PhoneCallResponse.ToolCallResultUtterance
    | PhoneCallResponse.DtmfUtterance
  >;

  /**
   * The version of the agent.
   */
  version?: number | null;
}

export namespace PhoneCallResponse {
  /**
   * Post call analysis that includes information such as sentiment, status, summary,
   * and custom defined data to extract. Available after call ends. Subscribe to
   * `call_analyzed` webhook event type to receive it once ready.
   */
  export interface CallAnalysis {
    /**
     * Whether the agent seems to have a successful call with the user, where the agent
     * finishes the task, and the call was complete without being cutoff.
     */
    call_successful?: boolean;

    /**
     * A high level summary of the call.
     */
    call_summary?: string;

    /**
     * Custom analysis data that was extracted based on the schema defined in agent
     * post call analysis data. Can be empty if nothing is specified.
     */
    custom_analysis_data?: unknown;

    /**
     * Whether the call is entered voicemail.
     */
    in_voicemail?: boolean;

    /**
     * Sentiment of the user in the call.
     */
    user_sentiment?: 'Negative' | 'Positive' | 'Neutral' | 'Unknown';
  }

  /**
   * Cost of the call, including all the products and their costs and discount.
   */
  export interface CallCost {
    /**
     * Combined cost of all individual costs in cents
     */
    combined_cost: number;

    /**
     * List of products with their unit prices and costs in cents
     */
    product_costs: Array<CallCost.ProductCost>;

    /**
     * Total duration of the call in seconds
     */
    total_duration_seconds: number;

    /**
     * Total unit duration price of all products in cents per second
     */
    total_duration_unit_price: number;

    /**
     * Total one time price of all products in cents per call
     */
    total_one_time_price: number;
  }

  export namespace CallCost {
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

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  export interface Latency {
    /**
     * End to end latency (from user stops talking to agent start talking) tracking of
     * the call. This latency does not account for the network trip time from Retell
     * server to user frontend. The latency is tracked every time turn change between
     * user and agent.
     */
    e2e?: Latency.E2E;

    /**
     * Knowledge base latency (from the triggering of knowledge base retrival to all
     * relevant context received) tracking of the call. Only populated when using
     * knowledge base feature for the agent of the call.
     */
    knowledge_base?: Latency.KnowledgeBase;

    /**
     * LLM latency (from issue of LLM call to first speakable chunk received) tracking
     * of the call. When using custom LLM. this latency includes LLM websocket
     * roundtrip time between user server and Retell server.
     */
    llm?: Latency.Llm;

    /**
     * LLM websocket roundtrip latency (between user server and Retell server) tracking
     * of the call. Only populated for calls using custom LLM.
     */
    llm_websocket_network_rtt?: Latency.LlmWebsocketNetworkRtt;

    /**
     * Speech-to-speech latency (from requesting responses of a S2S model to first byte
     * received) tracking of the call. Only populated for calls that uses S2S model
     * like Realtime API.
     */
    s2s?: Latency.S2s;

    /**
     * Text-to-speech latency (from the triggering of TTS to first byte received)
     * tracking of the call.
     */
    tts?: Latency.Tts;
  }

  export namespace Latency {
    /**
     * End to end latency (from user stops talking to agent start talking) tracking of
     * the call. This latency does not account for the network trip time from Retell
     * server to user frontend. The latency is tracked every time turn change between
     * user and agent.
     */
    export interface E2E {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * Knowledge base latency (from the triggering of knowledge base retrival to all
     * relevant context received) tracking of the call. Only populated when using
     * knowledge base feature for the agent of the call.
     */
    export interface KnowledgeBase {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * LLM latency (from issue of LLM call to first speakable chunk received) tracking
     * of the call. When using custom LLM. this latency includes LLM websocket
     * roundtrip time between user server and Retell server.
     */
    export interface Llm {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * LLM websocket roundtrip latency (between user server and Retell server) tracking
     * of the call. Only populated for calls using custom LLM.
     */
    export interface LlmWebsocketNetworkRtt {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * Speech-to-speech latency (from requesting responses of a S2S model to first byte
     * received) tracking of the call. Only populated for calls that uses S2S model
     * like Realtime API.
     */
    export interface S2s {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * Text-to-speech latency (from the triggering of TTS to first byte received)
     * tracking of the call.
     */
    export interface Tts {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }
  }

  /**
   * Telephony identifier of the call, populated when available. Tracking purposes
   * only.
   */
  export interface TelephonyIdentifier {
    /**
     * Twilio call sid.
     */
    twilio_call_sid?: string;
  }

  export interface TranscriptObject {
    /**
     * Transcript of the utterances.
     */
    content: string;

    /**
     * Documents whether this utterance is spoken by agent or user.
     */
    role: 'agent' | 'user';

    /**
     * Array of words in the utterance with the word timestamp. Useful for
     * understanding what word was spoken at what time. Note that the word timestamp is
     * not guaranteed to be accurate, it's more like an approximation.
     */
    words: Array<TranscriptObject.Word>;
  }

  export namespace TranscriptObject {
    export interface Word {
      /**
       * End time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      end?: number;

      /**
       * Start time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      start?: number;

      /**
       * Word transcript (with punctuation if applicable).
       */
      word?: string;
    }
  }

  export interface Utterance {
    /**
     * Transcript of the utterances.
     */
    content: string;

    /**
     * Documents whether this utterance is spoken by agent or user.
     */
    role: 'agent' | 'user';

    /**
     * Array of words in the utterance with the word timestamp. Useful for
     * understanding what word was spoken at what time. Note that the word timestamp is
     * not guaranteed to be accurate, it's more like an approximation.
     */
    words: Array<Utterance.Word>;
  }

  export namespace Utterance {
    export interface Word {
      /**
       * End time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      end?: number;

      /**
       * Start time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      start?: number;

      /**
       * Word transcript (with punctuation if applicable).
       */
      word?: string;
    }
  }

  export interface ToolCallInvocationUtterance {
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
  }

  export interface ToolCallResultUtterance {
    /**
     * Result of the tool call, can be a string, a stringified json, etc.
     */
    content: string;

    /**
     * This is result of a tool call.
     */
    role: 'tool_call_result';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;
  }

  export interface DtmfUtterance {
    /**
     * The digit pressed by the user. Will be a single digit string like "1", "2", "3",
     * "\*", "#" etc.
     */
    digit: string;

    /**
     * This is user pressed digit from their phone keypad.
     */
    role: 'dtmf';
  }
}

export interface WebCallResponse {
  /**
   * Access token to enter the web call room. This needs to be passed to your
   * frontend to join the call.
   */
  access_token: string;

  /**
   * Corresponding agent id of this call.
   */
  agent_id: string;

  /**
   * Unique id of the call. Used to identify in LLM websocket and used to
   * authenticate in audio websocket.
   */
  call_id: string;

  /**
   * Status of call.
   *
   * - `registered`: Call id issued, starting to make a call using this id.
   *
   * - `ongoing`: Call connected and ongoing.
   *
   * - `ended`: The underlying websocket has ended for the call. Either user or agent
   *   hanged up, or call transferred.
   *
   * - `error`: Call encountered error.
   */
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';

  /**
   * Type of the call. Used to distinguish between web call and phone call.
   */
  call_type: 'web_call';

  /**
   * Post call analysis that includes information such as sentiment, status, summary,
   * and custom defined data to extract. Available after call ends. Subscribe to
   * `call_analyzed` webhook event type to receive it once ready.
   */
  call_analysis?: WebCallResponse.CallAnalysis;

  /**
   * Cost of the call, including all the products and their costs and discount.
   */
  call_cost?: WebCallResponse.CallCost;

  /**
   * The reason for the disconnection of the call. Read details desciption about
   * reasons listed here at
   * [Disconnection Reason Doc](/get-started/debug-guide#disconnection-reason).
   */
  disconnection_reason?:
    | 'user_hangup'
    | 'agent_hangup'
    | 'call_transfer'
    | 'voicemail_reached'
    | 'inactivity'
    | 'machine_detected'
    | 'max_duration_reached'
    | 'concurrency_limit_reached'
    | 'no_valid_payment'
    | 'scam_detected'
    | 'error_inbound_webhook'
    | 'dial_busy'
    | 'dial_failed'
    | 'dial_no_answer'
    | 'error_llm_websocket_open'
    | 'error_llm_websocket_lost_connection'
    | 'error_llm_websocket_runtime'
    | 'error_llm_websocket_corrupt_payload'
    | 'error_frontend_corrupted_payload'
    | 'error_twilio'
    | 'error_no_audio_received'
    | 'error_asr'
    | 'error_retell'
    | 'error_unknown'
    | 'error_user_not_joined'
    | 'registered_call_timeout';

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  latency?: WebCallResponse.Latency;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Whether this agent opts in for signed URLs for public logs and recordings. When
   * enabled, the generated URLs will include security signatures that restrict
   * access and automatically expire after 24 hours.
   */
  opt_in_signed_url?: boolean;

  /**
   * Whether this call opts out of sensitive data storage like transcript, recording,
   * logging.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * Public log of the call, containing details about all the requests and responses
   * received in LLM WebSocket, latency tracking for each turntaking, helpful for
   * debugging and tracing. Available after call ends.
   */
  public_log_url?: string;

  /**
   * Recording of the call. Available after call ends.
   */
  recording_url?: string;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;

  /**
   * Begin timestamp (milliseconds since epoch) of the call. Available after call
   * starts.
   */
  start_timestamp?: number;

  /**
   * Transcription of the call. Available after call ends.
   */
  transcript?: string;

  /**
   * Transcript of the call in the format of a list of utterance, with timestamp.
   * Available after call ends.
   */
  transcript_object?: Array<WebCallResponse.TranscriptObject>;

  /**
   * Transcript of the call weaved with tool call invocation and results. It
   * precisely captures when (at what utterance, which word) the tool was invoked and
   * what was the result. Available after call ends.
   */
  transcript_with_tool_calls?: Array<
    | WebCallResponse.Utterance
    | WebCallResponse.ToolCallInvocationUtterance
    | WebCallResponse.ToolCallResultUtterance
    | WebCallResponse.DtmfUtterance
  >;

  /**
   * The version of the agent.
   */
  version?: number | null;
}

export namespace WebCallResponse {
  /**
   * Post call analysis that includes information such as sentiment, status, summary,
   * and custom defined data to extract. Available after call ends. Subscribe to
   * `call_analyzed` webhook event type to receive it once ready.
   */
  export interface CallAnalysis {
    /**
     * Whether the agent seems to have a successful call with the user, where the agent
     * finishes the task, and the call was complete without being cutoff.
     */
    call_successful?: boolean;

    /**
     * A high level summary of the call.
     */
    call_summary?: string;

    /**
     * Custom analysis data that was extracted based on the schema defined in agent
     * post call analysis data. Can be empty if nothing is specified.
     */
    custom_analysis_data?: unknown;

    /**
     * Whether the call is entered voicemail.
     */
    in_voicemail?: boolean;

    /**
     * Sentiment of the user in the call.
     */
    user_sentiment?: 'Negative' | 'Positive' | 'Neutral' | 'Unknown';
  }

  /**
   * Cost of the call, including all the products and their costs and discount.
   */
  export interface CallCost {
    /**
     * Combined cost of all individual costs in cents
     */
    combined_cost: number;

    /**
     * List of products with their unit prices and costs in cents
     */
    product_costs: Array<CallCost.ProductCost>;

    /**
     * Total duration of the call in seconds
     */
    total_duration_seconds: number;

    /**
     * Total unit duration price of all products in cents per second
     */
    total_duration_unit_price: number;

    /**
     * Total one time price of all products in cents per call
     */
    total_one_time_price: number;
  }

  export namespace CallCost {
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

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  export interface Latency {
    /**
     * End to end latency (from user stops talking to agent start talking) tracking of
     * the call. This latency does not account for the network trip time from Retell
     * server to user frontend. The latency is tracked every time turn change between
     * user and agent.
     */
    e2e?: Latency.E2E;

    /**
     * Knowledge base latency (from the triggering of knowledge base retrival to all
     * relevant context received) tracking of the call. Only populated when using
     * knowledge base feature for the agent of the call.
     */
    knowledge_base?: Latency.KnowledgeBase;

    /**
     * LLM latency (from issue of LLM call to first speakable chunk received) tracking
     * of the call. When using custom LLM. this latency includes LLM websocket
     * roundtrip time between user server and Retell server.
     */
    llm?: Latency.Llm;

    /**
     * LLM websocket roundtrip latency (between user server and Retell server) tracking
     * of the call. Only populated for calls using custom LLM.
     */
    llm_websocket_network_rtt?: Latency.LlmWebsocketNetworkRtt;

    /**
     * Speech-to-speech latency (from requesting responses of a S2S model to first byte
     * received) tracking of the call. Only populated for calls that uses S2S model
     * like Realtime API.
     */
    s2s?: Latency.S2s;

    /**
     * Text-to-speech latency (from the triggering of TTS to first byte received)
     * tracking of the call.
     */
    tts?: Latency.Tts;
  }

  export namespace Latency {
    /**
     * End to end latency (from user stops talking to agent start talking) tracking of
     * the call. This latency does not account for the network trip time from Retell
     * server to user frontend. The latency is tracked every time turn change between
     * user and agent.
     */
    export interface E2E {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * Knowledge base latency (from the triggering of knowledge base retrival to all
     * relevant context received) tracking of the call. Only populated when using
     * knowledge base feature for the agent of the call.
     */
    export interface KnowledgeBase {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * LLM latency (from issue of LLM call to first speakable chunk received) tracking
     * of the call. When using custom LLM. this latency includes LLM websocket
     * roundtrip time between user server and Retell server.
     */
    export interface Llm {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * LLM websocket roundtrip latency (between user server and Retell server) tracking
     * of the call. Only populated for calls using custom LLM.
     */
    export interface LlmWebsocketNetworkRtt {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * Speech-to-speech latency (from requesting responses of a S2S model to first byte
     * received) tracking of the call. Only populated for calls that uses S2S model
     * like Realtime API.
     */
    export interface S2s {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }

    /**
     * Text-to-speech latency (from the triggering of TTS to first byte received)
     * tracking of the call.
     */
    export interface Tts {
      /**
       * Maximum latency in the call, measured in milliseconds.
       */
      max?: number;

      /**
       * Minimum latency in the call, measured in milliseconds.
       */
      min?: number;

      /**
       * Number of data points (number of times latency is tracked).
       */
      num?: number;

      /**
       * 50 percentile of latency, measured in milliseconds.
       */
      p50?: number;

      /**
       * 90 percentile of latency, measured in milliseconds.
       */
      p90?: number;

      /**
       * 95 percentile of latency, measured in milliseconds.
       */
      p95?: number;

      /**
       * 99 percentile of latency, measured in milliseconds.
       */
      p99?: number;

      /**
       * All the latency data points in the call, measured in milliseconds.
       */
      values?: Array<number>;
    }
  }

  export interface TranscriptObject {
    /**
     * Transcript of the utterances.
     */
    content: string;

    /**
     * Documents whether this utterance is spoken by agent or user.
     */
    role: 'agent' | 'user';

    /**
     * Array of words in the utterance with the word timestamp. Useful for
     * understanding what word was spoken at what time. Note that the word timestamp is
     * not guaranteed to be accurate, it's more like an approximation.
     */
    words: Array<TranscriptObject.Word>;
  }

  export namespace TranscriptObject {
    export interface Word {
      /**
       * End time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      end?: number;

      /**
       * Start time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      start?: number;

      /**
       * Word transcript (with punctuation if applicable).
       */
      word?: string;
    }
  }

  export interface Utterance {
    /**
     * Transcript of the utterances.
     */
    content: string;

    /**
     * Documents whether this utterance is spoken by agent or user.
     */
    role: 'agent' | 'user';

    /**
     * Array of words in the utterance with the word timestamp. Useful for
     * understanding what word was spoken at what time. Note that the word timestamp is
     * not guaranteed to be accurate, it's more like an approximation.
     */
    words: Array<Utterance.Word>;
  }

  export namespace Utterance {
    export interface Word {
      /**
       * End time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      end?: number;

      /**
       * Start time of the word in the call in second. This is relative audio time, not
       * wall time.
       */
      start?: number;

      /**
       * Word transcript (with punctuation if applicable).
       */
      word?: string;
    }
  }

  export interface ToolCallInvocationUtterance {
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
  }

  export interface ToolCallResultUtterance {
    /**
     * Result of the tool call, can be a string, a stringified json, etc.
     */
    content: string;

    /**
     * This is result of a tool call.
     */
    role: 'tool_call_result';

    /**
     * Tool call id, globally unique.
     */
    tool_call_id: string;
  }

  export interface DtmfUtterance {
    /**
     * The digit pressed by the user. Will be a single digit string like "1", "2", "3",
     * "\*", "#" etc.
     */
    digit: string;

    /**
     * This is user pressed digit from their phone keypad.
     */
    role: 'dtmf';
  }
}

export type CallListResponse = Array<CallResponse>;

export interface CallUpdateParams {
  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object. Size limited to 50kB max.
   */
  metadata?: unknown;

  /**
   * Whether this call opts out of sensitive data storage like transcript, recording,
   * logging. Can only be changed from false to true.
   */
  opt_out_sensitive_data_storage?: boolean;
}

export interface CallListParams {
  /**
   * Filter criteria for the calls to retrieve.
   */
  filter_criteria?: CallListParams.FilterCriteria;

  /**
   * Limit the number of calls returned. Default 50, Max 1000. To retrieve more than
   * 1000, use pagination_key to continue fetching the next page.
   */
  limit?: number;

  /**
   * The pagination key to continue fetching the next page of calls. Pagination key
   * is represented by a call id here, and it's exclusive (not included in the
   * fetched calls). The last call id from the list calls is usually used as
   * pagination key here. If not set, will start from the beginning.
   */
  pagination_key?: string;

  /**
   * The calls will be sorted by `start_timestamp`, whether to return the calls in
   * ascending or descending order.
   */
  sort_order?: 'ascending' | 'descending';
}

export namespace CallListParams {
  /**
   * Filter criteria for the calls to retrieve.
   */
  export interface FilterCriteria {
    /**
     * Only retrieve calls that are made with specific agent(s).
     */
    agent_id?: Array<string>;

    /**
     * Only retrieve calls with specific call status(es).
     */
    call_status?: Array<'registered' | 'ongoing' | 'ended' | 'error'>;

    /**
     * Only retrieve calls with specific call successful(s).
     */
    call_successful?: Array<boolean>;

    /**
     * Only retrieve calls with specific call type(s).
     */
    call_type?: Array<'web_call' | 'phone_call'>;

    /**
     * Only retrieve calls with specific direction(s).
     */
    direction?: Array<'inbound' | 'outbound'>;

    /**
     * Only retrieve calls with specific disconnection reason(s).
     */
    disconnection_reason?: Array<
      | 'user_hangup'
      | 'agent_hangup'
      | 'call_transfer'
      | 'voicemail_reached'
      | 'inactivity'
      | 'machine_detected'
      | 'max_duration_reached'
      | 'concurrency_limit_reached'
      | 'no_valid_payment'
      | 'scam_detected'
      | 'error_inbound_webhook'
      | 'dial_busy'
      | 'dial_failed'
      | 'dial_no_answer'
      | 'error_llm_websocket_open'
      | 'error_llm_websocket_lost_connection'
      | 'error_llm_websocket_runtime'
      | 'error_llm_websocket_corrupt_payload'
      | 'error_frontend_corrupted_payload'
      | 'error_twilio'
      | 'error_no_audio_received'
      | 'error_asr'
      | 'error_retell'
      | 'error_unknown'
      | 'error_user_not_joined'
      | 'registered_call_timeout'
    >;

    /**
     * Only retrieve calls with specific range of duration(s).
     */
    duration_ms?: FilterCriteria.DurationMs;

    e2e_latency_p50?: FilterCriteria.E2ELatencyP50;

    /**
     * Only retrieve calls with specific from number(s).
     */
    from_number?: Array<string>;

    /**
     * Only retrieve calls that are in voicemail or not in voicemail.
     */
    in_voicemail?: Array<boolean>;

    /**
     * Only retrieve calls with specific range of start timestamp(s).
     */
    start_timestamp?: FilterCriteria.StartTimestamp;

    /**
     * Only retrieve calls with specific to number(s).
     */
    to_number?: Array<string>;

    /**
     * Only retrieve calls with specific user sentiment(s).
     */
    user_sentiment?: Array<'Negative' | 'Positive' | 'Neutral' | 'Unknown'>;

    /**
     * The version of the agent to use for the call.
     */
    version?: Array<number>;
  }

  export namespace FilterCriteria {
    /**
     * Only retrieve calls with specific range of duration(s).
     */
    export interface DurationMs {
      lower_threshold?: number;

      upper_threshold?: number;
    }

    export interface E2ELatencyP50 {
      lower_threshold?: number;

      upper_threshold?: number;
    }

    /**
     * Only retrieve calls with specific range of start timestamp(s).
     */
    export interface StartTimestamp {
      lower_threshold?: number;

      upper_threshold?: number;
    }
  }
}

export interface CallCreatePhoneCallParams {
  /**
   * The number you own in E.164 format. Must be a number purchased from Retell or
   * imported to Retell.
   */
  from_number: string;

  /**
   * The number you want to call, in E.164 format. If using a number purchased from
   * Retell, only US numbers are supported as destination.
   */
  to_number: string;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * For this particular call, override the agent used with this agent id. This does
   * not bind the agent to this number, this is for one time override.
   */
  override_agent_id?: string;

  /**
   * For this particular call, override the agent version used with this version.
   * This does not bind the agent version to this number, this is for one time
   * override.
   */
  override_agent_version?: number;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;
}

export interface CallCreateWebCallParams {
  /**
   * Unique id of agent used for the call. Your agent would contain the LLM Websocket
   * url used for this call.
   */
  agent_id: string;

  /**
   * The version of the agent to use for the call.
   */
  agent_version?: number;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;
}

export interface CallRegisterPhoneCallParams {
  /**
   * The agent to use for the call.
   */
  agent_id: string;

  /**
   * The version of the agent to use for the call.
   */
  agent_version?: number;

  /**
   * Direction of the phone call. Stored for tracking purpose.
   */
  direction?: 'inbound' | 'outbound';

  /**
   * The number you own in E.164 format. Stored for tracking purpose.
   */
  from_number?: string;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;

  /**
   * The number you want to call, in E.164 format. Stored for tracking purpose.
   */
  to_number?: string;
}

export declare namespace Call {
  export {
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
}
