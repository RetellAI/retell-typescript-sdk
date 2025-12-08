// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Call extends APIResource {
  /**
   * Retrieve details of a specific call
   *
   * @example
   * ```ts
   * const callResponse = await client.call.retrieve(
   *   '119c3f8e47135a29e65947eeb34cf12d',
   * );
   * ```
   */
  retrieve(callId: string, options?: Core.RequestOptions): Core.APIPromise<CallResponse> {
    return this._client.get(`/v2/get-call/${callId}`, options);
  }

  /**
   * Update metadata and sensitive data storage settings for an existing call.
   *
   * @example
   * ```ts
   * const callResponse = await client.call.update(
   *   'call_a4441234567890777c4a4a123e6',
   *   {
   *     data_storage_setting: 'everything_except_pii',
   *     metadata: {
   *       customer_id: 'cust_123',
   *       notes: 'Follow-up required',
   *     },
   *   },
   * );
   * ```
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
   *
   * @example
   * ```ts
   * const callResponses = await client.call.list();
   * ```
   */
  list(body: CallListParams, options?: Core.RequestOptions): Core.APIPromise<CallListResponse> {
    return this._client.post('/v2/list-calls', { body, ...options });
  }

  /**
   * Delete a specific call and its associated data
   *
   * @example
   * ```ts
   * await client.call.delete(
   *   '119c3f8e47135a29e65947eeb34cf12d',
   * );
   * ```
   */
  delete(callId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v2/delete-call/${callId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Create a new outbound phone call
   *
   * @example
   * ```ts
   * const phoneCallResponse = await client.call.createPhoneCall(
   *   {
   *     from_number: '+14157774444',
   *     to_number: '+12137774445',
   *   },
   * );
   * ```
   */
  createPhoneCall(
    body: CallCreatePhoneCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PhoneCallResponse> {
    return this._client.post('/v2/create-phone-call', { body, ...options });
  }

  /**
   * Create a new web call
   *
   * @example
   * ```ts
   * const webCallResponse = await client.call.createWebCall({
   *   agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   * });
   * ```
   */
  createWebCall(
    body: CallCreateWebCallParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebCallResponse> {
    return this._client.post('/v2/create-web-call', { body, ...options });
  }

  /**
   * Register a new phone call for custom telephony
   *
   * @example
   * ```ts
   * const phoneCallResponse =
   *   await client.call.registerPhoneCall({
   *     agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   *   });
   * ```
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
   * The version of the agent.
   */
  agent_version: number;

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
  call_status: 'registered' | 'not_connected' | 'ongoing' | 'ended' | 'error';

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
   * Name of the agent.
   */
  agent_name?: string;

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
   * Dynamic variables collected from the call. Only available after the call ends.
   */
  collected_dynamic_variables?: { [key: string]: unknown };

  /**
   * Custom SIP headers to be added to the call.
   */
  custom_sip_headers?: { [key: string]: string };

  /**
   * Data storage setting for this call's agent. "everything" stores all data,
   * "everything_except_pii" excludes PII when possible, "basic_attributes_only"
   * stores only metadata.
   */
  data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only' | null;

  /**
   * The reason for the disconnection of the call. Read detailed description about
   * reasons listed here at
   * [Disconnection Reason Doc](/reliability/debug-call-disconnect#understanding-disconnection-reasons).
   */
  disconnection_reason?:
    | 'user_hangup'
    | 'agent_hangup'
    | 'call_transfer'
    | 'voicemail_reached'
    | 'inactivity'
    | 'max_duration_reached'
    | 'concurrency_limit_reached'
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
    | 'registered_call_timeout';

  /**
   * Duration of the call in milliseconds. Available after call ends.
   */
  duration_ms?: number;

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

  /**
   * URL to the knowledge base retrieved contents of the call. Available after call
   * ends if the call utilizes knowledge base feature. It consists of the respond id
   * and the retrieved contents related to that response. It's already rendered in
   * call history tab of dashboard, and you can also manually download and check
   * against the transcript to view the knowledge base retrieval results.
   */
  knowledge_base_retrieved_contents_url?: string;

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  latency?: PhoneCallResponse.Latency;

  /**
   * LLM token usage of the call, available after call ends. Not populated if using
   * custom LLM, realtime API, or no LLM call is made.
   */
  llm_token_usage?: PhoneCallResponse.LlmTokenUsage;

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
   * Public log of the call, containing details about all the requests and responses
   * received in LLM WebSocket, latency tracking for each turntaking, helpful for
   * debugging and tracing. Available after call ends.
   */
  public_log_url?: string;

  /**
   * Recording of the call, with each party's audio stored in a separate channel.
   * Available after the call ends.
   */
  recording_multi_channel_url?: string;

  /**
   * Recording of the call. Available after call ends.
   */
  recording_url?: string;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: { [key: string]: unknown };

  /**
   * Recording of the call without PII, with each party's audio stored in a separate
   * channel. Available after the call ends.
   */
  scrubbed_recording_multi_channel_url?: string;

  /**
   * Recording of the call without PII. Available after call ends.
   */
  scrubbed_recording_url?: string;

  /**
   * Transcript of the call weaved with tool call invocation and results, without
   * PII. It precisely captures when (at what utterance, which word) the tool was
   * invoked and what was the result. Available after call ends.
   */
  scrubbed_transcript_with_tool_calls?: Array<
    | PhoneCallResponse.Utterance
    | PhoneCallResponse.ToolCallInvocationUtterance
    | PhoneCallResponse.ToolCallResultUtterance
    | PhoneCallResponse.DtmfUtterance
  >;

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
   * The destination number or identifier where the call was transferred to. Only
   * populated when the disconnection reason was `call_transfer`. Can be a phone
   * number or a SIP URI. SIP URIs are prefixed with "sip:" and may include a
   * ";transport=..." portion (if transport is known) where the transport type can be
   * "tls", "tcp", "udp", or "auto".
   */
  transfer_destination?: string | null;
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
      unit_price?: number;
    }
  }

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  export interface Latency {
    /**
     * Transcription latency (diff between the duration of the chunks streamed and the
     * durations of the transcribed part) tracking of the call.
     */
    asr?: Latency.Asr;

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
     * Transcription latency (diff between the duration of the chunks streamed and the
     * durations of the transcribed part) tracking of the call.
     */
    export interface Asr {
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
   * LLM token usage of the call, available after call ends. Not populated if using
   * custom LLM, realtime API, or no LLM call is made.
   */
  export interface LlmTokenUsage {
    /**
     * Average token count of the call.
     */
    average: number;

    /**
     * Number of requests made to the LLM.
     */
    num_requests: number;

    /**
     * All the token count values in the call.
     */
    values: Array<number>;
  }

  export interface Utterance {
    /**
     * Transcript of the utterances.
     */
    content: string;

    /**
     * Documents whether this utterance is spoken by agent or user.
     */
    role: 'agent' | 'user' | 'transfer_target';

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
    role: 'agent' | 'user' | 'transfer_target';

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
    role: 'agent' | 'user' | 'transfer_target';

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
   * The version of the agent.
   */
  agent_version: number;

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
  call_status: 'registered' | 'not_connected' | 'ongoing' | 'ended' | 'error';

  /**
   * Type of the call. Used to distinguish between web call and phone call.
   */
  call_type: 'web_call';

  /**
   * Name of the agent.
   */
  agent_name?: string;

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
   * Dynamic variables collected from the call. Only available after the call ends.
   */
  collected_dynamic_variables?: { [key: string]: unknown };

  /**
   * Custom SIP headers to be added to the call.
   */
  custom_sip_headers?: { [key: string]: string };

  /**
   * Data storage setting for this call's agent. "everything" stores all data,
   * "everything_except_pii" excludes PII when possible, "basic_attributes_only"
   * stores only metadata.
   */
  data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only' | null;

  /**
   * The reason for the disconnection of the call. Read detailed description about
   * reasons listed here at
   * [Disconnection Reason Doc](/reliability/debug-call-disconnect#understanding-disconnection-reasons).
   */
  disconnection_reason?:
    | 'user_hangup'
    | 'agent_hangup'
    | 'call_transfer'
    | 'voicemail_reached'
    | 'inactivity'
    | 'max_duration_reached'
    | 'concurrency_limit_reached'
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
    | 'registered_call_timeout';

  /**
   * Duration of the call in milliseconds. Available after call ends.
   */
  duration_ms?: number;

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

  /**
   * URL to the knowledge base retrieved contents of the call. Available after call
   * ends if the call utilizes knowledge base feature. It consists of the respond id
   * and the retrieved contents related to that response. It's already rendered in
   * call history tab of dashboard, and you can also manually download and check
   * against the transcript to view the knowledge base retrieval results.
   */
  knowledge_base_retrieved_contents_url?: string;

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  latency?: WebCallResponse.Latency;

  /**
   * LLM token usage of the call, available after call ends. Not populated if using
   * custom LLM, realtime API, or no LLM call is made.
   */
  llm_token_usage?: WebCallResponse.LlmTokenUsage;

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
   * Public log of the call, containing details about all the requests and responses
   * received in LLM WebSocket, latency tracking for each turntaking, helpful for
   * debugging and tracing. Available after call ends.
   */
  public_log_url?: string;

  /**
   * Recording of the call, with each party's audio stored in a separate channel.
   * Available after the call ends.
   */
  recording_multi_channel_url?: string;

  /**
   * Recording of the call. Available after call ends.
   */
  recording_url?: string;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: { [key: string]: unknown };

  /**
   * Recording of the call without PII, with each party's audio stored in a separate
   * channel. Available after the call ends.
   */
  scrubbed_recording_multi_channel_url?: string;

  /**
   * Recording of the call without PII. Available after call ends.
   */
  scrubbed_recording_url?: string;

  /**
   * Transcript of the call weaved with tool call invocation and results, without
   * PII. It precisely captures when (at what utterance, which word) the tool was
   * invoked and what was the result. Available after call ends.
   */
  scrubbed_transcript_with_tool_calls?: Array<
    | WebCallResponse.Utterance
    | WebCallResponse.ToolCallInvocationUtterance
    | WebCallResponse.ToolCallResultUtterance
    | WebCallResponse.DtmfUtterance
  >;

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
   * The destination number or identifier where the call was transferred to. Only
   * populated when the disconnection reason was `call_transfer`. Can be a phone
   * number or a SIP URI. SIP URIs are prefixed with "sip:" and may include a
   * ";transport=..." portion (if transport is known) where the transport type can be
   * "tls", "tcp", "udp", or "auto".
   */
  transfer_destination?: string | null;
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
      unit_price?: number;
    }
  }

  /**
   * Latency tracking of the call, available after call ends. Not all fields here
   * will be available, as it depends on the type of call and feature used.
   */
  export interface Latency {
    /**
     * Transcription latency (diff between the duration of the chunks streamed and the
     * durations of the transcribed part) tracking of the call.
     */
    asr?: Latency.Asr;

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
     * Transcription latency (diff between the duration of the chunks streamed and the
     * durations of the transcribed part) tracking of the call.
     */
    export interface Asr {
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
   * LLM token usage of the call, available after call ends. Not populated if using
   * custom LLM, realtime API, or no LLM call is made.
   */
  export interface LlmTokenUsage {
    /**
     * Average token count of the call.
     */
    average: number;

    /**
     * Number of requests made to the LLM.
     */
    num_requests: number;

    /**
     * All the token count values in the call.
     */
    values: Array<number>;
  }

  export interface Utterance {
    /**
     * Transcript of the utterances.
     */
    content: string;

    /**
     * Documents whether this utterance is spoken by agent or user.
     */
    role: 'agent' | 'user' | 'transfer_target';

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

  export interface TranscriptObject {
    /**
     * Transcript of the utterances.
     */
    content: string;

    /**
     * Documents whether this utterance is spoken by agent or user.
     */
    role: 'agent' | 'user' | 'transfer_target';

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
    role: 'agent' | 'user' | 'transfer_target';

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
   * Data storage setting for this call. Overrides the agent's default setting.
   * "everything" stores all data, "everything_except_pii" excludes PII when
   * possible, "basic_attributes_only" stores only metadata. Cannot be downgraded
   * from more restrictive to less restrictive settings.
   */
  data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only';

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object. Size limited to 50kB max.
   */
  metadata?: unknown;

  /**
   * Override dynamic varaibles represented as key-value pairs of strings. Setting
   * this will override or add the dynamic variables set in the agent during the
   * call. Only need to set the delta where you want to override, no need to set the
   * entire dynamic variables object. Setting this to null will remove any existing
   * override.
   */
  override_dynamic_variables?: { [key: string]: string } | null;
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
     * Only retrieve calls with specific batch call id(s).
     */
    batch_call_id?: Array<string>;

    /**
     * Only retrieve calls with specific call status(es).
     */
    call_status?: Array<'registered' | 'not_connected' | 'ongoing' | 'ended' | 'error'>;

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
      | 'max_duration_reached'
      | 'concurrency_limit_reached'
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
   * For this particular call, override agent configuration with these settings. This
   * allows you to customize agent behavior for individual calls without modifying
   * the base agent.
   */
  agent_override?: CallCreatePhoneCallParams.AgentOverride;

  /**
   * Add optional custom SIP headers to the call.
   */
  custom_sip_headers?: { [key: string]: string };

  /**
   * If true, the e.164 validation will be ignored for the from_number. This can be
   * useful when you want to dial to internal pseudo numbers. This only applies when
   * you are using custom telephony and does not apply when you are using Retell
   * Telephony. If omitted, the default value is false.
   */
  ignore_e164_validation?: boolean;

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
  retell_llm_dynamic_variables?: { [key: string]: unknown };
}

export namespace CallCreatePhoneCallParams {
  /**
   * For this particular call, override agent configuration with these settings. This
   * allows you to customize agent behavior for individual calls without modifying
   * the base agent.
   */
  export interface AgentOverride {
    /**
     * Override agent configuration settings. Any properties specified here will
     * override the base agent configuration for this call.
     */
    agent?: AgentOverride.Agent;

    /**
     * Override conversation flow configuration settings. Only applicable when using
     * conversation flow as the response engine. Supported attributes - model_choice,
     * model_temperature, tool_call_strict_mode, knowledge_base_ids, kb_config,
     * start_speaker, begin_after_user_silence_ms.
     */
    conversation_flow?: AgentOverride.ConversationFlow;

    /**
     * Override Retell LLM configuration settings. Only applicable when using Retell
     * LLM as the response engine. Supported attributes - model, s2s_model,
     * model_temperature, model_high_priority, tool_call_strict_mode,
     * knowledge_base_ids, kb_config, start_speaker, begin_after_user_silence_ms,
     * begin_message.
     */
    retell_llm?: AgentOverride.RetellLlm;
  }

  export namespace AgentOverride {
    /**
     * Override agent configuration settings. Any properties specified here will
     * override the base agent configuration for this call.
     */
    export interface Agent {
      /**
       * The name of the agent. Only used for your own reference.
       */
      agent_name?: string | null;

      /**
       * If set to true, DTMF input will be accepted and processed. If false, any DTMF
       * input will be ignored. Default to true.
       */
      allow_user_dtmf?: boolean;

      /**
       * If set, will add ambient environment sound to the call to make experience more
       * realistic. Currently supports the following options:
       *
       * - `coffee-shop`: Coffee shop ambience with people chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/coffee-shop.wav)
       *
       * - `convention-hall`: Convention hall ambience, with some echo and people
       *   chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
       *
       * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
       *
       * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
       *
       * - `static-noise`: Constant static noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
       *
       * - `call-center`: Call center work noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/call-center.wav)
       *
       * Set to `null` to remove ambient sound from this agent.
       */
      ambient_sound?:
        | 'coffee-shop'
        | 'convention-hall'
        | 'summer-outdoor'
        | 'mountain-outdoor'
        | 'static-noise'
        | 'call-center'
        | null;

      /**
       * If set, will control the volume of the ambient sound. Value ranging from [0,2].
       * Lower value means quieter ambient sound, while higher value means louder ambient
       * sound. If unset, default value 1 will apply.
       */
      ambient_sound_volume?: number;

      /**
       * Prompt to determine whether the post call or chat analysis should mark the
       * interaction as successful. Set to null to use the default prompt.
       */
      analysis_successful_prompt?: string | null;

      /**
       * Prompt to guide how the post call or chat analysis summary should be generated.
       * When unset, the default system prompt is used. Set to null to use the default
       * prompt.
       */
      analysis_summary_prompt?: string | null;

      /**
       * Only applicable when enable_backchannel is true. Controls how often the agent
       * would backchannel when a backchannel is possible. Value ranging from [0,1].
       * Lower value means less frequent backchannel, while higher value means more
       * frequent backchannel. If unset, default value 0.8 will apply.
       */
      backchannel_frequency?: number;

      /**
       * Only applicable when enable_backchannel is true. A list of words that the agent
       * would use as backchannel. If not set, default backchannel words will apply.
       * Check out
       * [backchannel default words](/agent/interaction-configuration#backchannel) for
       * more details. Note that certain voices do not work too well with certain words,
       * so it's recommended to experiment before adding any words.
       */
      backchannel_words?: Array<string> | null;

      /**
       * If set, will delay the first message by the specified amount of milliseconds, so
       * that it gives user more time to prepare to take the call. Valid range is [0,
       * 5000]. If not set or set to 0, agent will speak immediately. Only applicable
       * when agent speaks first.
       */
      begin_message_delay_ms?: number;

      /**
       * Provide a customized list of keywords to bias the transcriber model, so that
       * these words are more likely to get transcribed. Commonly used for names, brands,
       * street, etc.
       */
      boosted_keywords?: Array<string> | null;

      /**
       * Granular setting to manage how Retell stores sensitive data (transcripts,
       * recordings, logs, etc.). This replaces the deprecated
       * `opt_out_sensitive_data_storage` field.
       *
       * - `everything`: Store all data including transcripts, recordings, and logs.
       * - `everything_except_pii`: Store data without PII when PII is detected.
       * - `basic_attributes_only`: Store only basic attributes; no
       *   transcripts/recordings/logs. If not set, default value of "everything" will
       *   apply.
       */
      data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only';

      /**
       * If set, determines what denoising mode to use. Default to noise-cancellation.
       */
      denoising_mode?: 'noise-cancellation' | 'noise-and-background-speech-cancellation';

      /**
       * Controls whether the agent would backchannel (agent interjects the speaker with
       * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
       * when enabled tends to show up more in longer user utterances. If not set, agent
       * will not backchannel.
       */
      enable_backchannel?: boolean;

      /**
       * If users stay silent for a period after agent speech, end the call. The minimum
       * value allowed is 10,000 ms (10 s). By default, this is set to 600000 (10 min).
       */
      end_call_after_silence_ms?: number;

      /**
       * When TTS provider for the selected voice is experiencing outages, we would use
       * fallback voices listed here for the agent. Voice id and the fallback voice ids
       * must be from different TTS providers. The system would go through the list in
       * order, if the first one in the list is also having outage, it would use the next
       * one. Set to null to remove voice fallback for the agent.
       */
      fallback_voice_ids?: Array<string> | null;

      /**
       * Controls how sensitive the agent is to user interruptions. Value ranging from
       * [0,1]. Lower value means it will take longer / more words for user to interrupt
       * agent, while higher value means it's easier for user to interrupt agent. If
       * unset, default value 1 will apply. When this is set to 0, agent would never be
       * interrupted.
       */
      interruption_sensitivity?: number;

      /**
       * Specifies what language (and dialect) the speech recognition will operate in.
       * For instance, selecting `en-GB` optimizes speech recognition for British
       * English. If unset, will use default value `en-US`. Select `multi` for
       * multilingual support.
       */
      language?:
        | 'en-US'
        | 'en-IN'
        | 'en-GB'
        | 'en-AU'
        | 'en-NZ'
        | 'de-DE'
        | 'es-ES'
        | 'es-419'
        | 'hi-IN'
        | 'fr-FR'
        | 'fr-CA'
        | 'ja-JP'
        | 'pt-PT'
        | 'pt-BR'
        | 'zh-CN'
        | 'ru-RU'
        | 'it-IT'
        | 'ko-KR'
        | 'nl-NL'
        | 'nl-BE'
        | 'pl-PL'
        | 'tr-TR'
        | 'vi-VN'
        | 'ro-RO'
        | 'bg-BG'
        | 'ca-ES'
        | 'th-TH'
        | 'da-DK'
        | 'fi-FI'
        | 'el-GR'
        | 'hu-HU'
        | 'id-ID'
        | 'no-NO'
        | 'sk-SK'
        | 'sv-SE'
        | 'ms-MY'
        | 'af-ZA'
        | 'ar-SA'
        | 'az-AZ'
        | 'bs-BA'
        | 'cy-GB'
        | 'fa-IR'
        | 'fil-PH'
        | 'gl-ES'
        | 'he-IL'
        | 'hr-HR'
        | 'hy-AM'
        | 'is-IS'
        | 'kk-KZ'
        | 'kn-IN'
        | 'mk-MK'
        | 'mr-IN'
        | 'ne-NP'
        | 'sl-SI'
        | 'sr-RS'
        | 'sw-KE'
        | 'ta-IN'
        | 'ur-IN'
        | 'yue-CN'
        | 'uk-UA'
        | 'multi';

      /**
       * Maximum allowed length for the call, will force end the call if reached. The
       * minimum value allowed is 60,000 ms (1 min), and maximum value allowed is
       * 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
       */
      max_call_duration_ms?: number;

      /**
       * If set to true, will normalize the some part of text (number, currency, date,
       * etc) to spoken to its spoken form for more consistent speech synthesis
       * (sometimes the voice synthesize system itself might read these wrong with the
       * raw text). For example, it will convert "Call my number 2137112342 on Jul 5th,
       * 2024 for the $24.12 payment" to "Call my number two one three seven one one two
       * three four two on july fifth, twenty twenty four for the twenty four dollars
       * twelve cents payment" before starting audio generation.
       */
      normalize_for_speech?: boolean;

      /**
       * Whether this agent opts in for signed URLs for public logs and recordings. When
       * enabled, the generated URLs will include security signatures that restrict
       * access and automatically expire after 24 hours.
       */
      opt_in_signed_url?: boolean;

      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      pii_config?: Agent.PiiConfig;

      /**
       * Post call analysis data to extract from the call. This data will augment the
       * pre-defined variables extracted in the call analysis. This will be available
       * after the call ends.
       */
      post_call_analysis_data?: Array<
        | Agent.StringAnalysisData
        | Agent.EnumAnalysisData
        | Agent.BooleanAnalysisData
        | Agent.NumberAnalysisData
      > | null;

      /**
       * The model to use for post call analysis. Default to gpt-4.1-mini.
       */
      post_call_analysis_model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | null;

      /**
       * A list of words / phrases and their pronunciation to be used to guide the audio
       * synthesize for consistent pronunciation. Currently only supported for English &
       * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
       */
      pronunciation_dictionary?: Array<Agent.PronunciationDictionary> | null;

      /**
       * If set, controls how many times agent would remind user when user is
       * unresponsive. Must be a non negative integer. If unset, default value of 1 will
       * apply (remind once). Set to 0 to disable agent from reminding.
       */
      reminder_max_count?: number;

      /**
       * If set (in milliseconds), will trigger a reminder to the agent to speak if the
       * user has been silent for the specified duration after some agent speech. Must be
       * a positive number. If unset, default value of 10000 ms (10 s) will apply.
       */
      reminder_trigger_ms?: number;

      /**
       * The Response Engine to attach to the agent. It is used to generate responses for
       * the agent. You need to create a Response Engine first before attaching it to an
       * agent.
       */
      response_engine?:
        | Agent.ResponseEngineRetellLm
        | Agent.ResponseEngineCustomLm
        | Agent.ResponseEngineConversationFlow;

      /**
       * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
       * means less responsive agent (wait more, respond slower), while higher value
       * means faster exchanges (respond when it can). If unset, default value 1 will
       * apply.
       */
      responsiveness?: number;

      /**
       * If set, the phone ringing will last for the specified amount of milliseconds.
       * This applies for both outbound call ringtime, and call transfer ringtime.
       * Default to 30000 (30 s). Valid range is [5000, 90000].
       */
      ring_duration_ms?: number;

      /**
       * The expiration time for the signed url in milliseconds. Only applicable when
       * opt_in_signed_url is true. If not set, default value of 86400000 (24 hours) will
       * apply.
       */
      signed_url_expiration_ms?: number | null;

      /**
       * If set, determines whether speech to text should focus on latency or accuracy.
       * Default to fast mode.
       */
      stt_mode?: 'fast' | 'accurate';

      user_dtmf_options?: Agent.UserDtmfOptions | null;

      /**
       * If set, determines the vocabulary set to use for transcription. This setting
       * only applies for English agents, for non English agent, this setting is a no-op.
       * Default to general.
       */
      vocab_specialization?: 'general' | 'medical';

      /**
       * Unique voice id used for the agent. Find list of available voices and their
       * preview in Dashboard.
       */
      voice_id?: string;

      /**
       * Optionally set the voice model used for the selected voice. Currently only
       * elevenlab voices have voice model selections. Set to null to remove voice model
       * selection, and default ones will apply. Check out the dashboard for details on
       * each voice model.
       */
      voice_model?:
        | 'eleven_turbo_v2'
        | 'eleven_flash_v2'
        | 'eleven_turbo_v2_5'
        | 'eleven_flash_v2_5'
        | 'eleven_multilingual_v2'
        | 'tts-1'
        | 'gpt-4o-mini-tts'
        | null;

      /**
       * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
       * speech, while higher value means faster speech rate. If unset, default value 1
       * will apply.
       */
      voice_speed?: number;

      /**
       * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
       * more stable, and higher value means more variant speech generation. Currently
       * this setting only applies to `11labs` voices. If unset, default value 1 will
       * apply.
       */
      voice_temperature?: number;

      /**
       * If this option is set, the call will try to detect voicemail in the first 3
       * minutes of the call. Actions defined (hangup, or leave a message) will be
       * applied when the voicemail is detected. Set this to null to disable voicemail
       * detection.
       */
      voicemail_option?: Agent.VoicemailOption | null;

      /**
       * If set, will control the volume of the agent. Value ranging from [0,2]. Lower
       * value means quieter agent speech, while higher value means louder agent speech.
       * If unset, default value 1 will apply.
       */
      volume?: number;

      /**
       * The timeout for the webhook in milliseconds. If not set, default value of 10000
       * will apply.
       */
      webhook_timeout_ms?: number;

      /**
       * The webhook for agent to listen to call events. See what events it would get at
       * [webhook doc](/features/webhook). If set, will binds webhook events for this
       * agent to the specified url, and will ignore the account level webhook for this
       * agent. Set to `null` to remove webhook url from this agent.
       */
      webhook_url?: string | null;
    }

    export namespace Agent {
      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      export interface PiiConfig {
        /**
         * List of PII categories to scrub from transcripts and recordings.
         */
        categories: Array<
          | 'person_name'
          | 'address'
          | 'email'
          | 'phone_number'
          | 'ssn'
          | 'passport'
          | 'driver_license'
          | 'credit_card'
          | 'bank_account'
          | 'password'
          | 'pin'
          | 'medical_id'
          | 'date_of_birth'
        >;

        /**
         * The processing mode for PII scrubbing. Currently only post-call is supported.
         */
        mode: 'post_call';
      }

      export interface StringAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'string';

        /**
         * Examples of the variable value to teach model the style and syntax.
         */
        examples?: Array<string>;
      }

      export interface EnumAnalysisData {
        /**
         * The possible values of the variable, must be non empty array.
         */
        choices: Array<string>;

        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'enum';
      }

      export interface BooleanAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'boolean';
      }

      export interface NumberAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'number';
      }

      export interface PronunciationDictionary {
        /**
         * The phonetic alphabet to be used for pronunciation.
         */
        alphabet: 'ipa' | 'cmu';

        /**
         * Pronunciation of the word in the format of a IPA / CMU pronunciation.
         */
        phoneme: string;

        /**
         * The string of word / phrase to be annotated with pronunciation.
         */
        word: string;
      }

      export interface ResponseEngineRetellLm {
        /**
         * id of the Retell LLM Response Engine.
         */
        llm_id: string;

        /**
         * type of the Response Engine.
         */
        type: 'retell-llm';

        /**
         * Version of the Retell LLM Response Engine.
         */
        version?: number | null;
      }

      export interface ResponseEngineCustomLm {
        /**
         * LLM websocket url of the custom LLM.
         */
        llm_websocket_url: string;

        /**
         * type of the Response Engine.
         */
        type: 'custom-llm';
      }

      export interface ResponseEngineConversationFlow {
        /**
         * ID of the Conversation Flow Response Engine.
         */
        conversation_flow_id: string;

        /**
         * type of the Response Engine.
         */
        type: 'conversation-flow';

        /**
         * Version of the Conversation Flow Response Engine.
         */
        version?: number | null;
      }

      export interface UserDtmfOptions {
        /**
         * The maximum number of digits allowed in the user's DTMF (Dual-Tone
         * Multi-Frequency) input per turn. Once this limit is reached, the input is
         * considered complete and a response will be generated immediately.
         */
        digit_limit?: number | null;

        /**
         * A single key that signals the end of DTMF input. Acceptable values include any
         * digit (0–9), the pound/hash symbol (#), or the asterisk (\*).
         */
        termination_key?: string | null;

        /**
         * The time (in milliseconds) to wait for user DTMF input before timing out. The
         * timer resets with each digit received.
         */
        timeout_ms?: number;
      }

      /**
       * If this option is set, the call will try to detect voicemail in the first 3
       * minutes of the call. Actions defined (hangup, or leave a message) will be
       * applied when the voicemail is detected. Set this to null to disable voicemail
       * detection.
       */
      export interface VoicemailOption {
        action:
          | VoicemailOption.VoicemailActionPrompt
          | VoicemailOption.VoicemailActionStaticText
          | VoicemailOption.VoicemailActionHangup;
      }

      export namespace VoicemailOption {
        export interface VoicemailActionPrompt {
          /**
           * The prompt used to generate the text to be spoken when the call is detected to
           * be in voicemail.
           */
          text: string;

          type: 'prompt';
        }

        export interface VoicemailActionStaticText {
          /**
           * The text to be spoken when the call is detected to be in voicemail.
           */
          text: string;

          type: 'static_text';
        }

        export interface VoicemailActionHangup {
          type: 'hangup';
        }
      }
    }

    /**
     * Override conversation flow configuration settings. Only applicable when using
     * conversation flow as the response engine. Supported attributes - model_choice,
     * model_temperature, tool_call_strict_mode, knowledge_base_ids, kb_config,
     * start_speaker, begin_after_user_silence_ms.
     */
    export interface ConversationFlow {
      /**
       * If set, the AI will begin the conversation after waiting for the user for the
       * duration (in milliseconds) specified by this attribute. This only applies if the
       * agent is configured to wait for the user to speak first. If not set, the agent
       * will wait indefinitely for the user to speak.
       */
      begin_after_user_silence_ms?: number | null;

      /**
       * Knowledge base configuration for RAG retrieval.
       */
      kb_config?: ConversationFlow.KBConfig;

      /**
       * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
       */
      knowledge_base_ids?: Array<string> | null;

      /**
       * The model choice for the conversation flow.
       */
      model_choice?: ConversationFlow.ModelChoice;

      /**
       * Controls the randomness of the model's responses. Lower values make responses
       * more deterministic.
       */
      model_temperature?: number | null;

      /**
       * Who starts the conversation - user or agent.
       */
      start_speaker?: 'user' | 'agent';

      /**
       * Whether to use strict mode for tool calls. Only applicable when using certain
       * supported models.
       */
      tool_call_strict_mode?: boolean | null;
    }

    export namespace ConversationFlow {
      /**
       * Knowledge base configuration for RAG retrieval.
       */
      export interface KBConfig {
        /**
         * Similarity threshold for filtering search results
         */
        filter_score?: number;

        /**
         * Max number of knowledge base chunks to retrieve
         */
        top_k?: number;
      }

      /**
       * The model choice for the conversation flow.
       */
      export interface ModelChoice {
        /**
         * The LLM model to use
         */
        model:
          | 'gpt-4.1'
          | 'gpt-4.1-mini'
          | 'gpt-4.1-nano'
          | 'gpt-5'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite';

        /**
         * Type of model choice
         */
        type: 'cascading';

        /**
         * Whether to use high priority pool with more dedicated resource, default false
         */
        high_priority?: boolean;
      }
    }

    /**
     * Override Retell LLM configuration settings. Only applicable when using Retell
     * LLM as the response engine. Supported attributes - model, s2s_model,
     * model_temperature, model_high_priority, tool_call_strict_mode,
     * knowledge_base_ids, kb_config, start_speaker, begin_after_user_silence_ms,
     * begin_message.
     */
    export interface RetellLlm {
      /**
       * If set, the AI will begin the conversation after waiting for the user for the
       * duration (in milliseconds) specified by this attribute. This only applies if the
       * agent is configured to wait for the user to speak first. If not set, the agent
       * will wait indefinitely for the user to speak.
       */
      begin_after_user_silence_ms?: number | null;

      /**
       * First utterance said by the agent in the call. If not set, LLM will dynamically
       * generate a message. If set to "", agent will wait for user to speak first.
       */
      begin_message?: string | null;

      /**
       * Knowledge base configuration for RAG retrieval.
       */
      kb_config?: RetellLlm.KBConfig | null;

      /**
       * A list of knowledge base ids to use for this resource.
       */
      knowledge_base_ids?: Array<string> | null;

      /**
       * Select the underlying text LLM. If not set, would default to gpt-4.1.
       */
      model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | null;

      /**
       * If set to true, will use high priority pool with more dedicated resource to
       * ensure lower and more consistent latency, default to false. This feature usually
       * comes with a higher cost.
       */
      model_high_priority?: boolean | null;

      /**
       * If set, will control the randomness of the response. Value ranging from [0,1].
       * Lower value means more deterministic, while higher value means more random. If
       * unset, default value 0 will apply. Note that for tool calling, a lower value is
       * recommended.
       */
      model_temperature?: number;

      /**
       * Select the underlying speech to speech model. Can only set this or model, not
       * both.
       */
      s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | 'gpt-realtime' | null;

      /**
       * The speaker who starts the conversation. Required. Must be either 'user' or
       * 'agent'.
       */
      start_speaker?: 'user' | 'agent';

      /**
       * Whether to use strict mode for tool calls. Only applicable when using certain
       * supported models.
       */
      tool_call_strict_mode?: boolean | null;
    }

    export namespace RetellLlm {
      /**
       * Knowledge base configuration for RAG retrieval.
       */
      export interface KBConfig {
        /**
         * Similarity threshold for filtering search results
         */
        filter_score?: number;

        /**
         * Max number of knowledge base chunks to retrieve
         */
        top_k?: number;
      }
    }
  }
}

export interface CallCreateWebCallParams {
  /**
   * Unique id of agent used for the call. Your agent would contain the LLM Websocket
   * url used for this call.
   */
  agent_id: string;

  /**
   * For this particular call, override agent configuration with these settings. This
   * allows you to customize agent behavior for individual calls without modifying
   * the base agent.
   */
  agent_override?: CallCreateWebCallParams.AgentOverride;

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
  retell_llm_dynamic_variables?: { [key: string]: unknown };
}

export namespace CallCreateWebCallParams {
  /**
   * For this particular call, override agent configuration with these settings. This
   * allows you to customize agent behavior for individual calls without modifying
   * the base agent.
   */
  export interface AgentOverride {
    /**
     * Override agent configuration settings. Any properties specified here will
     * override the base agent configuration for this call.
     */
    agent?: AgentOverride.Agent;

    /**
     * Override conversation flow configuration settings. Only applicable when using
     * conversation flow as the response engine. Supported attributes - model_choice,
     * model_temperature, tool_call_strict_mode, knowledge_base_ids, kb_config,
     * start_speaker, begin_after_user_silence_ms.
     */
    conversation_flow?: AgentOverride.ConversationFlow;

    /**
     * Override Retell LLM configuration settings. Only applicable when using Retell
     * LLM as the response engine. Supported attributes - model, s2s_model,
     * model_temperature, model_high_priority, tool_call_strict_mode,
     * knowledge_base_ids, kb_config, start_speaker, begin_after_user_silence_ms,
     * begin_message.
     */
    retell_llm?: AgentOverride.RetellLlm;
  }

  export namespace AgentOverride {
    /**
     * Override agent configuration settings. Any properties specified here will
     * override the base agent configuration for this call.
     */
    export interface Agent {
      /**
       * The name of the agent. Only used for your own reference.
       */
      agent_name?: string | null;

      /**
       * If set to true, DTMF input will be accepted and processed. If false, any DTMF
       * input will be ignored. Default to true.
       */
      allow_user_dtmf?: boolean;

      /**
       * If set, will add ambient environment sound to the call to make experience more
       * realistic. Currently supports the following options:
       *
       * - `coffee-shop`: Coffee shop ambience with people chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/coffee-shop.wav)
       *
       * - `convention-hall`: Convention hall ambience, with some echo and people
       *   chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
       *
       * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
       *
       * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
       *
       * - `static-noise`: Constant static noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
       *
       * - `call-center`: Call center work noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/call-center.wav)
       *
       * Set to `null` to remove ambient sound from this agent.
       */
      ambient_sound?:
        | 'coffee-shop'
        | 'convention-hall'
        | 'summer-outdoor'
        | 'mountain-outdoor'
        | 'static-noise'
        | 'call-center'
        | null;

      /**
       * If set, will control the volume of the ambient sound. Value ranging from [0,2].
       * Lower value means quieter ambient sound, while higher value means louder ambient
       * sound. If unset, default value 1 will apply.
       */
      ambient_sound_volume?: number;

      /**
       * Prompt to determine whether the post call or chat analysis should mark the
       * interaction as successful. Set to null to use the default prompt.
       */
      analysis_successful_prompt?: string | null;

      /**
       * Prompt to guide how the post call or chat analysis summary should be generated.
       * When unset, the default system prompt is used. Set to null to use the default
       * prompt.
       */
      analysis_summary_prompt?: string | null;

      /**
       * Only applicable when enable_backchannel is true. Controls how often the agent
       * would backchannel when a backchannel is possible. Value ranging from [0,1].
       * Lower value means less frequent backchannel, while higher value means more
       * frequent backchannel. If unset, default value 0.8 will apply.
       */
      backchannel_frequency?: number;

      /**
       * Only applicable when enable_backchannel is true. A list of words that the agent
       * would use as backchannel. If not set, default backchannel words will apply.
       * Check out
       * [backchannel default words](/agent/interaction-configuration#backchannel) for
       * more details. Note that certain voices do not work too well with certain words,
       * so it's recommended to experiment before adding any words.
       */
      backchannel_words?: Array<string> | null;

      /**
       * If set, will delay the first message by the specified amount of milliseconds, so
       * that it gives user more time to prepare to take the call. Valid range is [0,
       * 5000]. If not set or set to 0, agent will speak immediately. Only applicable
       * when agent speaks first.
       */
      begin_message_delay_ms?: number;

      /**
       * Provide a customized list of keywords to bias the transcriber model, so that
       * these words are more likely to get transcribed. Commonly used for names, brands,
       * street, etc.
       */
      boosted_keywords?: Array<string> | null;

      /**
       * Granular setting to manage how Retell stores sensitive data (transcripts,
       * recordings, logs, etc.). This replaces the deprecated
       * `opt_out_sensitive_data_storage` field.
       *
       * - `everything`: Store all data including transcripts, recordings, and logs.
       * - `everything_except_pii`: Store data without PII when PII is detected.
       * - `basic_attributes_only`: Store only basic attributes; no
       *   transcripts/recordings/logs. If not set, default value of "everything" will
       *   apply.
       */
      data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only';

      /**
       * If set, determines what denoising mode to use. Default to noise-cancellation.
       */
      denoising_mode?: 'noise-cancellation' | 'noise-and-background-speech-cancellation';

      /**
       * Controls whether the agent would backchannel (agent interjects the speaker with
       * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
       * when enabled tends to show up more in longer user utterances. If not set, agent
       * will not backchannel.
       */
      enable_backchannel?: boolean;

      /**
       * If users stay silent for a period after agent speech, end the call. The minimum
       * value allowed is 10,000 ms (10 s). By default, this is set to 600000 (10 min).
       */
      end_call_after_silence_ms?: number;

      /**
       * When TTS provider for the selected voice is experiencing outages, we would use
       * fallback voices listed here for the agent. Voice id and the fallback voice ids
       * must be from different TTS providers. The system would go through the list in
       * order, if the first one in the list is also having outage, it would use the next
       * one. Set to null to remove voice fallback for the agent.
       */
      fallback_voice_ids?: Array<string> | null;

      /**
       * Controls how sensitive the agent is to user interruptions. Value ranging from
       * [0,1]. Lower value means it will take longer / more words for user to interrupt
       * agent, while higher value means it's easier for user to interrupt agent. If
       * unset, default value 1 will apply. When this is set to 0, agent would never be
       * interrupted.
       */
      interruption_sensitivity?: number;

      /**
       * Specifies what language (and dialect) the speech recognition will operate in.
       * For instance, selecting `en-GB` optimizes speech recognition for British
       * English. If unset, will use default value `en-US`. Select `multi` for
       * multilingual support.
       */
      language?:
        | 'en-US'
        | 'en-IN'
        | 'en-GB'
        | 'en-AU'
        | 'en-NZ'
        | 'de-DE'
        | 'es-ES'
        | 'es-419'
        | 'hi-IN'
        | 'fr-FR'
        | 'fr-CA'
        | 'ja-JP'
        | 'pt-PT'
        | 'pt-BR'
        | 'zh-CN'
        | 'ru-RU'
        | 'it-IT'
        | 'ko-KR'
        | 'nl-NL'
        | 'nl-BE'
        | 'pl-PL'
        | 'tr-TR'
        | 'vi-VN'
        | 'ro-RO'
        | 'bg-BG'
        | 'ca-ES'
        | 'th-TH'
        | 'da-DK'
        | 'fi-FI'
        | 'el-GR'
        | 'hu-HU'
        | 'id-ID'
        | 'no-NO'
        | 'sk-SK'
        | 'sv-SE'
        | 'ms-MY'
        | 'af-ZA'
        | 'ar-SA'
        | 'az-AZ'
        | 'bs-BA'
        | 'cy-GB'
        | 'fa-IR'
        | 'fil-PH'
        | 'gl-ES'
        | 'he-IL'
        | 'hr-HR'
        | 'hy-AM'
        | 'is-IS'
        | 'kk-KZ'
        | 'kn-IN'
        | 'mk-MK'
        | 'mr-IN'
        | 'ne-NP'
        | 'sl-SI'
        | 'sr-RS'
        | 'sw-KE'
        | 'ta-IN'
        | 'ur-IN'
        | 'yue-CN'
        | 'uk-UA'
        | 'multi';

      /**
       * Maximum allowed length for the call, will force end the call if reached. The
       * minimum value allowed is 60,000 ms (1 min), and maximum value allowed is
       * 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
       */
      max_call_duration_ms?: number;

      /**
       * If set to true, will normalize the some part of text (number, currency, date,
       * etc) to spoken to its spoken form for more consistent speech synthesis
       * (sometimes the voice synthesize system itself might read these wrong with the
       * raw text). For example, it will convert "Call my number 2137112342 on Jul 5th,
       * 2024 for the $24.12 payment" to "Call my number two one three seven one one two
       * three four two on july fifth, twenty twenty four for the twenty four dollars
       * twelve cents payment" before starting audio generation.
       */
      normalize_for_speech?: boolean;

      /**
       * Whether this agent opts in for signed URLs for public logs and recordings. When
       * enabled, the generated URLs will include security signatures that restrict
       * access and automatically expire after 24 hours.
       */
      opt_in_signed_url?: boolean;

      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      pii_config?: Agent.PiiConfig;

      /**
       * Post call analysis data to extract from the call. This data will augment the
       * pre-defined variables extracted in the call analysis. This will be available
       * after the call ends.
       */
      post_call_analysis_data?: Array<
        | Agent.StringAnalysisData
        | Agent.EnumAnalysisData
        | Agent.BooleanAnalysisData
        | Agent.NumberAnalysisData
      > | null;

      /**
       * The model to use for post call analysis. Default to gpt-4.1-mini.
       */
      post_call_analysis_model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | null;

      /**
       * A list of words / phrases and their pronunciation to be used to guide the audio
       * synthesize for consistent pronunciation. Currently only supported for English &
       * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
       */
      pronunciation_dictionary?: Array<Agent.PronunciationDictionary> | null;

      /**
       * If set, controls how many times agent would remind user when user is
       * unresponsive. Must be a non negative integer. If unset, default value of 1 will
       * apply (remind once). Set to 0 to disable agent from reminding.
       */
      reminder_max_count?: number;

      /**
       * If set (in milliseconds), will trigger a reminder to the agent to speak if the
       * user has been silent for the specified duration after some agent speech. Must be
       * a positive number. If unset, default value of 10000 ms (10 s) will apply.
       */
      reminder_trigger_ms?: number;

      /**
       * The Response Engine to attach to the agent. It is used to generate responses for
       * the agent. You need to create a Response Engine first before attaching it to an
       * agent.
       */
      response_engine?:
        | Agent.ResponseEngineRetellLm
        | Agent.ResponseEngineCustomLm
        | Agent.ResponseEngineConversationFlow;

      /**
       * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
       * means less responsive agent (wait more, respond slower), while higher value
       * means faster exchanges (respond when it can). If unset, default value 1 will
       * apply.
       */
      responsiveness?: number;

      /**
       * If set, the phone ringing will last for the specified amount of milliseconds.
       * This applies for both outbound call ringtime, and call transfer ringtime.
       * Default to 30000 (30 s). Valid range is [5000, 90000].
       */
      ring_duration_ms?: number;

      /**
       * The expiration time for the signed url in milliseconds. Only applicable when
       * opt_in_signed_url is true. If not set, default value of 86400000 (24 hours) will
       * apply.
       */
      signed_url_expiration_ms?: number | null;

      /**
       * If set, determines whether speech to text should focus on latency or accuracy.
       * Default to fast mode.
       */
      stt_mode?: 'fast' | 'accurate';

      user_dtmf_options?: Agent.UserDtmfOptions | null;

      /**
       * If set, determines the vocabulary set to use for transcription. This setting
       * only applies for English agents, for non English agent, this setting is a no-op.
       * Default to general.
       */
      vocab_specialization?: 'general' | 'medical';

      /**
       * Unique voice id used for the agent. Find list of available voices and their
       * preview in Dashboard.
       */
      voice_id?: string;

      /**
       * Optionally set the voice model used for the selected voice. Currently only
       * elevenlab voices have voice model selections. Set to null to remove voice model
       * selection, and default ones will apply. Check out the dashboard for details on
       * each voice model.
       */
      voice_model?:
        | 'eleven_turbo_v2'
        | 'eleven_flash_v2'
        | 'eleven_turbo_v2_5'
        | 'eleven_flash_v2_5'
        | 'eleven_multilingual_v2'
        | 'tts-1'
        | 'gpt-4o-mini-tts'
        | null;

      /**
       * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
       * speech, while higher value means faster speech rate. If unset, default value 1
       * will apply.
       */
      voice_speed?: number;

      /**
       * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
       * more stable, and higher value means more variant speech generation. Currently
       * this setting only applies to `11labs` voices. If unset, default value 1 will
       * apply.
       */
      voice_temperature?: number;

      /**
       * If this option is set, the call will try to detect voicemail in the first 3
       * minutes of the call. Actions defined (hangup, or leave a message) will be
       * applied when the voicemail is detected. Set this to null to disable voicemail
       * detection.
       */
      voicemail_option?: Agent.VoicemailOption | null;

      /**
       * If set, will control the volume of the agent. Value ranging from [0,2]. Lower
       * value means quieter agent speech, while higher value means louder agent speech.
       * If unset, default value 1 will apply.
       */
      volume?: number;

      /**
       * The timeout for the webhook in milliseconds. If not set, default value of 10000
       * will apply.
       */
      webhook_timeout_ms?: number;

      /**
       * The webhook for agent to listen to call events. See what events it would get at
       * [webhook doc](/features/webhook). If set, will binds webhook events for this
       * agent to the specified url, and will ignore the account level webhook for this
       * agent. Set to `null` to remove webhook url from this agent.
       */
      webhook_url?: string | null;
    }

    export namespace Agent {
      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      export interface PiiConfig {
        /**
         * List of PII categories to scrub from transcripts and recordings.
         */
        categories: Array<
          | 'person_name'
          | 'address'
          | 'email'
          | 'phone_number'
          | 'ssn'
          | 'passport'
          | 'driver_license'
          | 'credit_card'
          | 'bank_account'
          | 'password'
          | 'pin'
          | 'medical_id'
          | 'date_of_birth'
        >;

        /**
         * The processing mode for PII scrubbing. Currently only post-call is supported.
         */
        mode: 'post_call';
      }

      export interface StringAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'string';

        /**
         * Examples of the variable value to teach model the style and syntax.
         */
        examples?: Array<string>;
      }

      export interface EnumAnalysisData {
        /**
         * The possible values of the variable, must be non empty array.
         */
        choices: Array<string>;

        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'enum';
      }

      export interface BooleanAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'boolean';
      }

      export interface NumberAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'number';
      }

      export interface PronunciationDictionary {
        /**
         * The phonetic alphabet to be used for pronunciation.
         */
        alphabet: 'ipa' | 'cmu';

        /**
         * Pronunciation of the word in the format of a IPA / CMU pronunciation.
         */
        phoneme: string;

        /**
         * The string of word / phrase to be annotated with pronunciation.
         */
        word: string;
      }

      export interface ResponseEngineRetellLm {
        /**
         * id of the Retell LLM Response Engine.
         */
        llm_id: string;

        /**
         * type of the Response Engine.
         */
        type: 'retell-llm';

        /**
         * Version of the Retell LLM Response Engine.
         */
        version?: number | null;
      }

      export interface ResponseEngineCustomLm {
        /**
         * LLM websocket url of the custom LLM.
         */
        llm_websocket_url: string;

        /**
         * type of the Response Engine.
         */
        type: 'custom-llm';
      }

      export interface ResponseEngineConversationFlow {
        /**
         * ID of the Conversation Flow Response Engine.
         */
        conversation_flow_id: string;

        /**
         * type of the Response Engine.
         */
        type: 'conversation-flow';

        /**
         * Version of the Conversation Flow Response Engine.
         */
        version?: number | null;
      }

      export interface UserDtmfOptions {
        /**
         * The maximum number of digits allowed in the user's DTMF (Dual-Tone
         * Multi-Frequency) input per turn. Once this limit is reached, the input is
         * considered complete and a response will be generated immediately.
         */
        digit_limit?: number | null;

        /**
         * A single key that signals the end of DTMF input. Acceptable values include any
         * digit (0–9), the pound/hash symbol (#), or the asterisk (\*).
         */
        termination_key?: string | null;

        /**
         * The time (in milliseconds) to wait for user DTMF input before timing out. The
         * timer resets with each digit received.
         */
        timeout_ms?: number;
      }

      /**
       * If this option is set, the call will try to detect voicemail in the first 3
       * minutes of the call. Actions defined (hangup, or leave a message) will be
       * applied when the voicemail is detected. Set this to null to disable voicemail
       * detection.
       */
      export interface VoicemailOption {
        action:
          | VoicemailOption.VoicemailActionPrompt
          | VoicemailOption.VoicemailActionStaticText
          | VoicemailOption.VoicemailActionHangup;
      }

      export namespace VoicemailOption {
        export interface VoicemailActionPrompt {
          /**
           * The prompt used to generate the text to be spoken when the call is detected to
           * be in voicemail.
           */
          text: string;

          type: 'prompt';
        }

        export interface VoicemailActionStaticText {
          /**
           * The text to be spoken when the call is detected to be in voicemail.
           */
          text: string;

          type: 'static_text';
        }

        export interface VoicemailActionHangup {
          type: 'hangup';
        }
      }
    }

    /**
     * Override conversation flow configuration settings. Only applicable when using
     * conversation flow as the response engine. Supported attributes - model_choice,
     * model_temperature, tool_call_strict_mode, knowledge_base_ids, kb_config,
     * start_speaker, begin_after_user_silence_ms.
     */
    export interface ConversationFlow {
      /**
       * If set, the AI will begin the conversation after waiting for the user for the
       * duration (in milliseconds) specified by this attribute. This only applies if the
       * agent is configured to wait for the user to speak first. If not set, the agent
       * will wait indefinitely for the user to speak.
       */
      begin_after_user_silence_ms?: number | null;

      /**
       * Knowledge base configuration for RAG retrieval.
       */
      kb_config?: ConversationFlow.KBConfig;

      /**
       * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
       */
      knowledge_base_ids?: Array<string> | null;

      /**
       * The model choice for the conversation flow.
       */
      model_choice?: ConversationFlow.ModelChoice;

      /**
       * Controls the randomness of the model's responses. Lower values make responses
       * more deterministic.
       */
      model_temperature?: number | null;

      /**
       * Who starts the conversation - user or agent.
       */
      start_speaker?: 'user' | 'agent';

      /**
       * Whether to use strict mode for tool calls. Only applicable when using certain
       * supported models.
       */
      tool_call_strict_mode?: boolean | null;
    }

    export namespace ConversationFlow {
      /**
       * Knowledge base configuration for RAG retrieval.
       */
      export interface KBConfig {
        /**
         * Similarity threshold for filtering search results
         */
        filter_score?: number;

        /**
         * Max number of knowledge base chunks to retrieve
         */
        top_k?: number;
      }

      /**
       * The model choice for the conversation flow.
       */
      export interface ModelChoice {
        /**
         * The LLM model to use
         */
        model:
          | 'gpt-4.1'
          | 'gpt-4.1-mini'
          | 'gpt-4.1-nano'
          | 'gpt-5'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite';

        /**
         * Type of model choice
         */
        type: 'cascading';

        /**
         * Whether to use high priority pool with more dedicated resource, default false
         */
        high_priority?: boolean;
      }
    }

    /**
     * Override Retell LLM configuration settings. Only applicable when using Retell
     * LLM as the response engine. Supported attributes - model, s2s_model,
     * model_temperature, model_high_priority, tool_call_strict_mode,
     * knowledge_base_ids, kb_config, start_speaker, begin_after_user_silence_ms,
     * begin_message.
     */
    export interface RetellLlm {
      /**
       * If set, the AI will begin the conversation after waiting for the user for the
       * duration (in milliseconds) specified by this attribute. This only applies if the
       * agent is configured to wait for the user to speak first. If not set, the agent
       * will wait indefinitely for the user to speak.
       */
      begin_after_user_silence_ms?: number | null;

      /**
       * First utterance said by the agent in the call. If not set, LLM will dynamically
       * generate a message. If set to "", agent will wait for user to speak first.
       */
      begin_message?: string | null;

      /**
       * Knowledge base configuration for RAG retrieval.
       */
      kb_config?: RetellLlm.KBConfig | null;

      /**
       * A list of knowledge base ids to use for this resource.
       */
      knowledge_base_ids?: Array<string> | null;

      /**
       * Select the underlying text LLM. If not set, would default to gpt-4.1.
       */
      model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | null;

      /**
       * If set to true, will use high priority pool with more dedicated resource to
       * ensure lower and more consistent latency, default to false. This feature usually
       * comes with a higher cost.
       */
      model_high_priority?: boolean | null;

      /**
       * If set, will control the randomness of the response. Value ranging from [0,1].
       * Lower value means more deterministic, while higher value means more random. If
       * unset, default value 0 will apply. Note that for tool calling, a lower value is
       * recommended.
       */
      model_temperature?: number;

      /**
       * Select the underlying speech to speech model. Can only set this or model, not
       * both.
       */
      s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | 'gpt-realtime' | null;

      /**
       * The speaker who starts the conversation. Required. Must be either 'user' or
       * 'agent'.
       */
      start_speaker?: 'user' | 'agent';

      /**
       * Whether to use strict mode for tool calls. Only applicable when using certain
       * supported models.
       */
      tool_call_strict_mode?: boolean | null;
    }

    export namespace RetellLlm {
      /**
       * Knowledge base configuration for RAG retrieval.
       */
      export interface KBConfig {
        /**
         * Similarity threshold for filtering search results
         */
        filter_score?: number;

        /**
         * Max number of knowledge base chunks to retrieve
         */
        top_k?: number;
      }
    }
  }
}

export interface CallRegisterPhoneCallParams {
  /**
   * The agent to use for the call.
   */
  agent_id: string;

  /**
   * For this particular call, override agent configuration with these settings. This
   * allows you to customize agent behavior for individual calls without modifying
   * the base agent.
   */
  agent_override?: CallRegisterPhoneCallParams.AgentOverride;

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
  retell_llm_dynamic_variables?: { [key: string]: unknown };

  /**
   * The number you want to call, in E.164 format. Stored for tracking purpose.
   */
  to_number?: string;
}

export namespace CallRegisterPhoneCallParams {
  /**
   * For this particular call, override agent configuration with these settings. This
   * allows you to customize agent behavior for individual calls without modifying
   * the base agent.
   */
  export interface AgentOverride {
    /**
     * Override agent configuration settings. Any properties specified here will
     * override the base agent configuration for this call.
     */
    agent?: AgentOverride.Agent;

    /**
     * Override conversation flow configuration settings. Only applicable when using
     * conversation flow as the response engine. Supported attributes - model_choice,
     * model_temperature, tool_call_strict_mode, knowledge_base_ids, kb_config,
     * start_speaker, begin_after_user_silence_ms.
     */
    conversation_flow?: AgentOverride.ConversationFlow;

    /**
     * Override Retell LLM configuration settings. Only applicable when using Retell
     * LLM as the response engine. Supported attributes - model, s2s_model,
     * model_temperature, model_high_priority, tool_call_strict_mode,
     * knowledge_base_ids, kb_config, start_speaker, begin_after_user_silence_ms,
     * begin_message.
     */
    retell_llm?: AgentOverride.RetellLlm;
  }

  export namespace AgentOverride {
    /**
     * Override agent configuration settings. Any properties specified here will
     * override the base agent configuration for this call.
     */
    export interface Agent {
      /**
       * The name of the agent. Only used for your own reference.
       */
      agent_name?: string | null;

      /**
       * If set to true, DTMF input will be accepted and processed. If false, any DTMF
       * input will be ignored. Default to true.
       */
      allow_user_dtmf?: boolean;

      /**
       * If set, will add ambient environment sound to the call to make experience more
       * realistic. Currently supports the following options:
       *
       * - `coffee-shop`: Coffee shop ambience with people chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/coffee-shop.wav)
       *
       * - `convention-hall`: Convention hall ambience, with some echo and people
       *   chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
       *
       * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
       *
       * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
       *
       * - `static-noise`: Constant static noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
       *
       * - `call-center`: Call center work noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/call-center.wav)
       *
       * Set to `null` to remove ambient sound from this agent.
       */
      ambient_sound?:
        | 'coffee-shop'
        | 'convention-hall'
        | 'summer-outdoor'
        | 'mountain-outdoor'
        | 'static-noise'
        | 'call-center'
        | null;

      /**
       * If set, will control the volume of the ambient sound. Value ranging from [0,2].
       * Lower value means quieter ambient sound, while higher value means louder ambient
       * sound. If unset, default value 1 will apply.
       */
      ambient_sound_volume?: number;

      /**
       * Prompt to determine whether the post call or chat analysis should mark the
       * interaction as successful. Set to null to use the default prompt.
       */
      analysis_successful_prompt?: string | null;

      /**
       * Prompt to guide how the post call or chat analysis summary should be generated.
       * When unset, the default system prompt is used. Set to null to use the default
       * prompt.
       */
      analysis_summary_prompt?: string | null;

      /**
       * Only applicable when enable_backchannel is true. Controls how often the agent
       * would backchannel when a backchannel is possible. Value ranging from [0,1].
       * Lower value means less frequent backchannel, while higher value means more
       * frequent backchannel. If unset, default value 0.8 will apply.
       */
      backchannel_frequency?: number;

      /**
       * Only applicable when enable_backchannel is true. A list of words that the agent
       * would use as backchannel. If not set, default backchannel words will apply.
       * Check out
       * [backchannel default words](/agent/interaction-configuration#backchannel) for
       * more details. Note that certain voices do not work too well with certain words,
       * so it's recommended to experiment before adding any words.
       */
      backchannel_words?: Array<string> | null;

      /**
       * If set, will delay the first message by the specified amount of milliseconds, so
       * that it gives user more time to prepare to take the call. Valid range is [0,
       * 5000]. If not set or set to 0, agent will speak immediately. Only applicable
       * when agent speaks first.
       */
      begin_message_delay_ms?: number;

      /**
       * Provide a customized list of keywords to bias the transcriber model, so that
       * these words are more likely to get transcribed. Commonly used for names, brands,
       * street, etc.
       */
      boosted_keywords?: Array<string> | null;

      /**
       * Granular setting to manage how Retell stores sensitive data (transcripts,
       * recordings, logs, etc.). This replaces the deprecated
       * `opt_out_sensitive_data_storage` field.
       *
       * - `everything`: Store all data including transcripts, recordings, and logs.
       * - `everything_except_pii`: Store data without PII when PII is detected.
       * - `basic_attributes_only`: Store only basic attributes; no
       *   transcripts/recordings/logs. If not set, default value of "everything" will
       *   apply.
       */
      data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only';

      /**
       * If set, determines what denoising mode to use. Default to noise-cancellation.
       */
      denoising_mode?: 'noise-cancellation' | 'noise-and-background-speech-cancellation';

      /**
       * Controls whether the agent would backchannel (agent interjects the speaker with
       * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
       * when enabled tends to show up more in longer user utterances. If not set, agent
       * will not backchannel.
       */
      enable_backchannel?: boolean;

      /**
       * If users stay silent for a period after agent speech, end the call. The minimum
       * value allowed is 10,000 ms (10 s). By default, this is set to 600000 (10 min).
       */
      end_call_after_silence_ms?: number;

      /**
       * When TTS provider for the selected voice is experiencing outages, we would use
       * fallback voices listed here for the agent. Voice id and the fallback voice ids
       * must be from different TTS providers. The system would go through the list in
       * order, if the first one in the list is also having outage, it would use the next
       * one. Set to null to remove voice fallback for the agent.
       */
      fallback_voice_ids?: Array<string> | null;

      /**
       * Controls how sensitive the agent is to user interruptions. Value ranging from
       * [0,1]. Lower value means it will take longer / more words for user to interrupt
       * agent, while higher value means it's easier for user to interrupt agent. If
       * unset, default value 1 will apply. When this is set to 0, agent would never be
       * interrupted.
       */
      interruption_sensitivity?: number;

      /**
       * Specifies what language (and dialect) the speech recognition will operate in.
       * For instance, selecting `en-GB` optimizes speech recognition for British
       * English. If unset, will use default value `en-US`. Select `multi` for
       * multilingual support.
       */
      language?:
        | 'en-US'
        | 'en-IN'
        | 'en-GB'
        | 'en-AU'
        | 'en-NZ'
        | 'de-DE'
        | 'es-ES'
        | 'es-419'
        | 'hi-IN'
        | 'fr-FR'
        | 'fr-CA'
        | 'ja-JP'
        | 'pt-PT'
        | 'pt-BR'
        | 'zh-CN'
        | 'ru-RU'
        | 'it-IT'
        | 'ko-KR'
        | 'nl-NL'
        | 'nl-BE'
        | 'pl-PL'
        | 'tr-TR'
        | 'vi-VN'
        | 'ro-RO'
        | 'bg-BG'
        | 'ca-ES'
        | 'th-TH'
        | 'da-DK'
        | 'fi-FI'
        | 'el-GR'
        | 'hu-HU'
        | 'id-ID'
        | 'no-NO'
        | 'sk-SK'
        | 'sv-SE'
        | 'ms-MY'
        | 'af-ZA'
        | 'ar-SA'
        | 'az-AZ'
        | 'bs-BA'
        | 'cy-GB'
        | 'fa-IR'
        | 'fil-PH'
        | 'gl-ES'
        | 'he-IL'
        | 'hr-HR'
        | 'hy-AM'
        | 'is-IS'
        | 'kk-KZ'
        | 'kn-IN'
        | 'mk-MK'
        | 'mr-IN'
        | 'ne-NP'
        | 'sl-SI'
        | 'sr-RS'
        | 'sw-KE'
        | 'ta-IN'
        | 'ur-IN'
        | 'yue-CN'
        | 'uk-UA'
        | 'multi';

      /**
       * Maximum allowed length for the call, will force end the call if reached. The
       * minimum value allowed is 60,000 ms (1 min), and maximum value allowed is
       * 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
       */
      max_call_duration_ms?: number;

      /**
       * If set to true, will normalize the some part of text (number, currency, date,
       * etc) to spoken to its spoken form for more consistent speech synthesis
       * (sometimes the voice synthesize system itself might read these wrong with the
       * raw text). For example, it will convert "Call my number 2137112342 on Jul 5th,
       * 2024 for the $24.12 payment" to "Call my number two one three seven one one two
       * three four two on july fifth, twenty twenty four for the twenty four dollars
       * twelve cents payment" before starting audio generation.
       */
      normalize_for_speech?: boolean;

      /**
       * Whether this agent opts in for signed URLs for public logs and recordings. When
       * enabled, the generated URLs will include security signatures that restrict
       * access and automatically expire after 24 hours.
       */
      opt_in_signed_url?: boolean;

      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      pii_config?: Agent.PiiConfig;

      /**
       * Post call analysis data to extract from the call. This data will augment the
       * pre-defined variables extracted in the call analysis. This will be available
       * after the call ends.
       */
      post_call_analysis_data?: Array<
        | Agent.StringAnalysisData
        | Agent.EnumAnalysisData
        | Agent.BooleanAnalysisData
        | Agent.NumberAnalysisData
      > | null;

      /**
       * The model to use for post call analysis. Default to gpt-4.1-mini.
       */
      post_call_analysis_model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | null;

      /**
       * A list of words / phrases and their pronunciation to be used to guide the audio
       * synthesize for consistent pronunciation. Currently only supported for English &
       * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
       */
      pronunciation_dictionary?: Array<Agent.PronunciationDictionary> | null;

      /**
       * If set, controls how many times agent would remind user when user is
       * unresponsive. Must be a non negative integer. If unset, default value of 1 will
       * apply (remind once). Set to 0 to disable agent from reminding.
       */
      reminder_max_count?: number;

      /**
       * If set (in milliseconds), will trigger a reminder to the agent to speak if the
       * user has been silent for the specified duration after some agent speech. Must be
       * a positive number. If unset, default value of 10000 ms (10 s) will apply.
       */
      reminder_trigger_ms?: number;

      /**
       * The Response Engine to attach to the agent. It is used to generate responses for
       * the agent. You need to create a Response Engine first before attaching it to an
       * agent.
       */
      response_engine?:
        | Agent.ResponseEngineRetellLm
        | Agent.ResponseEngineCustomLm
        | Agent.ResponseEngineConversationFlow;

      /**
       * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
       * means less responsive agent (wait more, respond slower), while higher value
       * means faster exchanges (respond when it can). If unset, default value 1 will
       * apply.
       */
      responsiveness?: number;

      /**
       * If set, the phone ringing will last for the specified amount of milliseconds.
       * This applies for both outbound call ringtime, and call transfer ringtime.
       * Default to 30000 (30 s). Valid range is [5000, 90000].
       */
      ring_duration_ms?: number;

      /**
       * The expiration time for the signed url in milliseconds. Only applicable when
       * opt_in_signed_url is true. If not set, default value of 86400000 (24 hours) will
       * apply.
       */
      signed_url_expiration_ms?: number | null;

      /**
       * If set, determines whether speech to text should focus on latency or accuracy.
       * Default to fast mode.
       */
      stt_mode?: 'fast' | 'accurate';

      user_dtmf_options?: Agent.UserDtmfOptions | null;

      /**
       * If set, determines the vocabulary set to use for transcription. This setting
       * only applies for English agents, for non English agent, this setting is a no-op.
       * Default to general.
       */
      vocab_specialization?: 'general' | 'medical';

      /**
       * Unique voice id used for the agent. Find list of available voices and their
       * preview in Dashboard.
       */
      voice_id?: string;

      /**
       * Optionally set the voice model used for the selected voice. Currently only
       * elevenlab voices have voice model selections. Set to null to remove voice model
       * selection, and default ones will apply. Check out the dashboard for details on
       * each voice model.
       */
      voice_model?:
        | 'eleven_turbo_v2'
        | 'eleven_flash_v2'
        | 'eleven_turbo_v2_5'
        | 'eleven_flash_v2_5'
        | 'eleven_multilingual_v2'
        | 'tts-1'
        | 'gpt-4o-mini-tts'
        | null;

      /**
       * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
       * speech, while higher value means faster speech rate. If unset, default value 1
       * will apply.
       */
      voice_speed?: number;

      /**
       * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
       * more stable, and higher value means more variant speech generation. Currently
       * this setting only applies to `11labs` voices. If unset, default value 1 will
       * apply.
       */
      voice_temperature?: number;

      /**
       * If this option is set, the call will try to detect voicemail in the first 3
       * minutes of the call. Actions defined (hangup, or leave a message) will be
       * applied when the voicemail is detected. Set this to null to disable voicemail
       * detection.
       */
      voicemail_option?: Agent.VoicemailOption | null;

      /**
       * If set, will control the volume of the agent. Value ranging from [0,2]. Lower
       * value means quieter agent speech, while higher value means louder agent speech.
       * If unset, default value 1 will apply.
       */
      volume?: number;

      /**
       * The timeout for the webhook in milliseconds. If not set, default value of 10000
       * will apply.
       */
      webhook_timeout_ms?: number;

      /**
       * The webhook for agent to listen to call events. See what events it would get at
       * [webhook doc](/features/webhook). If set, will binds webhook events for this
       * agent to the specified url, and will ignore the account level webhook for this
       * agent. Set to `null` to remove webhook url from this agent.
       */
      webhook_url?: string | null;
    }

    export namespace Agent {
      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      export interface PiiConfig {
        /**
         * List of PII categories to scrub from transcripts and recordings.
         */
        categories: Array<
          | 'person_name'
          | 'address'
          | 'email'
          | 'phone_number'
          | 'ssn'
          | 'passport'
          | 'driver_license'
          | 'credit_card'
          | 'bank_account'
          | 'password'
          | 'pin'
          | 'medical_id'
          | 'date_of_birth'
        >;

        /**
         * The processing mode for PII scrubbing. Currently only post-call is supported.
         */
        mode: 'post_call';
      }

      export interface StringAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'string';

        /**
         * Examples of the variable value to teach model the style and syntax.
         */
        examples?: Array<string>;
      }

      export interface EnumAnalysisData {
        /**
         * The possible values of the variable, must be non empty array.
         */
        choices: Array<string>;

        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'enum';
      }

      export interface BooleanAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'boolean';
      }

      export interface NumberAnalysisData {
        /**
         * Description of the variable.
         */
        description: string;

        /**
         * Name of the variable.
         */
        name: string;

        /**
         * Type of the variable to extract.
         */
        type: 'number';
      }

      export interface PronunciationDictionary {
        /**
         * The phonetic alphabet to be used for pronunciation.
         */
        alphabet: 'ipa' | 'cmu';

        /**
         * Pronunciation of the word in the format of a IPA / CMU pronunciation.
         */
        phoneme: string;

        /**
         * The string of word / phrase to be annotated with pronunciation.
         */
        word: string;
      }

      export interface ResponseEngineRetellLm {
        /**
         * id of the Retell LLM Response Engine.
         */
        llm_id: string;

        /**
         * type of the Response Engine.
         */
        type: 'retell-llm';

        /**
         * Version of the Retell LLM Response Engine.
         */
        version?: number | null;
      }

      export interface ResponseEngineCustomLm {
        /**
         * LLM websocket url of the custom LLM.
         */
        llm_websocket_url: string;

        /**
         * type of the Response Engine.
         */
        type: 'custom-llm';
      }

      export interface ResponseEngineConversationFlow {
        /**
         * ID of the Conversation Flow Response Engine.
         */
        conversation_flow_id: string;

        /**
         * type of the Response Engine.
         */
        type: 'conversation-flow';

        /**
         * Version of the Conversation Flow Response Engine.
         */
        version?: number | null;
      }

      export interface UserDtmfOptions {
        /**
         * The maximum number of digits allowed in the user's DTMF (Dual-Tone
         * Multi-Frequency) input per turn. Once this limit is reached, the input is
         * considered complete and a response will be generated immediately.
         */
        digit_limit?: number | null;

        /**
         * A single key that signals the end of DTMF input. Acceptable values include any
         * digit (0–9), the pound/hash symbol (#), or the asterisk (\*).
         */
        termination_key?: string | null;

        /**
         * The time (in milliseconds) to wait for user DTMF input before timing out. The
         * timer resets with each digit received.
         */
        timeout_ms?: number;
      }

      /**
       * If this option is set, the call will try to detect voicemail in the first 3
       * minutes of the call. Actions defined (hangup, or leave a message) will be
       * applied when the voicemail is detected. Set this to null to disable voicemail
       * detection.
       */
      export interface VoicemailOption {
        action:
          | VoicemailOption.VoicemailActionPrompt
          | VoicemailOption.VoicemailActionStaticText
          | VoicemailOption.VoicemailActionHangup;
      }

      export namespace VoicemailOption {
        export interface VoicemailActionPrompt {
          /**
           * The prompt used to generate the text to be spoken when the call is detected to
           * be in voicemail.
           */
          text: string;

          type: 'prompt';
        }

        export interface VoicemailActionStaticText {
          /**
           * The text to be spoken when the call is detected to be in voicemail.
           */
          text: string;

          type: 'static_text';
        }

        export interface VoicemailActionHangup {
          type: 'hangup';
        }
      }
    }

    /**
     * Override conversation flow configuration settings. Only applicable when using
     * conversation flow as the response engine. Supported attributes - model_choice,
     * model_temperature, tool_call_strict_mode, knowledge_base_ids, kb_config,
     * start_speaker, begin_after_user_silence_ms.
     */
    export interface ConversationFlow {
      /**
       * If set, the AI will begin the conversation after waiting for the user for the
       * duration (in milliseconds) specified by this attribute. This only applies if the
       * agent is configured to wait for the user to speak first. If not set, the agent
       * will wait indefinitely for the user to speak.
       */
      begin_after_user_silence_ms?: number | null;

      /**
       * Knowledge base configuration for RAG retrieval.
       */
      kb_config?: ConversationFlow.KBConfig;

      /**
       * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
       */
      knowledge_base_ids?: Array<string> | null;

      /**
       * The model choice for the conversation flow.
       */
      model_choice?: ConversationFlow.ModelChoice;

      /**
       * Controls the randomness of the model's responses. Lower values make responses
       * more deterministic.
       */
      model_temperature?: number | null;

      /**
       * Who starts the conversation - user or agent.
       */
      start_speaker?: 'user' | 'agent';

      /**
       * Whether to use strict mode for tool calls. Only applicable when using certain
       * supported models.
       */
      tool_call_strict_mode?: boolean | null;
    }

    export namespace ConversationFlow {
      /**
       * Knowledge base configuration for RAG retrieval.
       */
      export interface KBConfig {
        /**
         * Similarity threshold for filtering search results
         */
        filter_score?: number;

        /**
         * Max number of knowledge base chunks to retrieve
         */
        top_k?: number;
      }

      /**
       * The model choice for the conversation flow.
       */
      export interface ModelChoice {
        /**
         * The LLM model to use
         */
        model:
          | 'gpt-4.1'
          | 'gpt-4.1-mini'
          | 'gpt-4.1-nano'
          | 'gpt-5'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite';

        /**
         * Type of model choice
         */
        type: 'cascading';

        /**
         * Whether to use high priority pool with more dedicated resource, default false
         */
        high_priority?: boolean;
      }
    }

    /**
     * Override Retell LLM configuration settings. Only applicable when using Retell
     * LLM as the response engine. Supported attributes - model, s2s_model,
     * model_temperature, model_high_priority, tool_call_strict_mode,
     * knowledge_base_ids, kb_config, start_speaker, begin_after_user_silence_ms,
     * begin_message.
     */
    export interface RetellLlm {
      /**
       * If set, the AI will begin the conversation after waiting for the user for the
       * duration (in milliseconds) specified by this attribute. This only applies if the
       * agent is configured to wait for the user to speak first. If not set, the agent
       * will wait indefinitely for the user to speak.
       */
      begin_after_user_silence_ms?: number | null;

      /**
       * First utterance said by the agent in the call. If not set, LLM will dynamically
       * generate a message. If set to "", agent will wait for user to speak first.
       */
      begin_message?: string | null;

      /**
       * Knowledge base configuration for RAG retrieval.
       */
      kb_config?: RetellLlm.KBConfig | null;

      /**
       * A list of knowledge base ids to use for this resource.
       */
      knowledge_base_ids?: Array<string> | null;

      /**
       * Select the underlying text LLM. If not set, would default to gpt-4.1.
       */
      model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | null;

      /**
       * If set to true, will use high priority pool with more dedicated resource to
       * ensure lower and more consistent latency, default to false. This feature usually
       * comes with a higher cost.
       */
      model_high_priority?: boolean | null;

      /**
       * If set, will control the randomness of the response. Value ranging from [0,1].
       * Lower value means more deterministic, while higher value means more random. If
       * unset, default value 0 will apply. Note that for tool calling, a lower value is
       * recommended.
       */
      model_temperature?: number;

      /**
       * Select the underlying speech to speech model. Can only set this or model, not
       * both.
       */
      s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | 'gpt-realtime' | null;

      /**
       * The speaker who starts the conversation. Required. Must be either 'user' or
       * 'agent'.
       */
      start_speaker?: 'user' | 'agent';

      /**
       * Whether to use strict mode for tool calls. Only applicable when using certain
       * supported models.
       */
      tool_call_strict_mode?: boolean | null;
    }

    export namespace RetellLlm {
      /**
       * Knowledge base configuration for RAG retrieval.
       */
      export interface KBConfig {
        /**
         * Similarity threshold for filtering search results
         */
        filter_score?: number;

        /**
         * Max number of knowledge base chunks to retrieve
         */
        top_k?: number;
      }
    }
  }
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
