// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Call extends APIResource {
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
  createPhoneCall(body: CallCreatePhoneCallParams, options?: RequestOptions): APIPromise<PhoneCallResponse> {
    return this._client.post('/v2/create-phone-call', {
      body,
      timeout: (this._client as any)._options.timeout ?? 120000,
      ...options,
    });
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
    options?: RequestOptions,
  ): APIPromise<PhoneCallResponse> {
    return this._client.post('/v2/register-phone-call', { body, ...options });
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
  createWebCall(body: CallCreateWebCallParams, options?: RequestOptions): APIPromise<WebCallResponse> {
    return this._client.post('/v2/create-web-call', { body, ...options });
  }

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
  retrieve(callID: string, options?: RequestOptions): APIPromise<CallResponse> {
    return this._client.get(path`/v2/get-call/${callID}`, options);
  }

  /**
   * List calls with unified cursor pagination response.
   *
   * @example
   * ```ts
   * const calls = await client.call.list();
   * ```
   */
  list(body: CallListParams | null | undefined = {}, options?: RequestOptions): APIPromise<CallListResponse> {
    return this._client.post('/v3/list-calls', {
      body,
      timeout: (this._client as any)._options.timeout ?? 300000,
      ...options,
    });
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
  update(callID: string, body: CallUpdateParams, options?: RequestOptions): APIPromise<CallResponse> {
    return this._client.patch(path`/v2/update-call/${callID}`, { body, ...options });
  }

  /**
   * Stop an ongoing call.
   *
   * @example
   * ```ts
   * await client.call.stop('call_a4441234567890777c4a4a123e6');
   * ```
   */
  stop(callID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v2/stop-call/${callID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
  delete(callID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/delete-call/${callID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
   * Unique id of the call. Used to identify the call in the LLM websocket and used
   * to authenticate in the audio websocket.
   */
  call_id: string;

  /**
   * Status of call.
   *
   * - `registered`: Call id issued, starting to make a call using this id.
   * - `ongoing`: Call connected and ongoing.
   * - `ended`: The underlying websocket has ended for the call. Either user or agent
   *   hung up, or call transferred.
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
   * Tag pointing at the agent version used for this call, captured at call creation
   * time and frozen thereafter (unaffected by later tag reassignments). Populated
   * whether the caller dispatched by tag, numeric version, "latest", or
   * "latest_published" — when the caller specified a tag, that tag wins; otherwise
   * the most-recently- assigned tag on the resolved version is used. Absent when no
   * tag points at the resolved version (or for calls created before this field was
   * introduced).
   */
  agent_tag?: string | null;

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
  collected_dynamic_variables?: { [key: string]: string };

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
    | 'call_take_over';

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
  retell_llm_dynamic_variables?: { [key: string]: string };

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
    | PhoneCallResponse.NodeTransitionUtterance
    | PhoneCallResponse.DtmfUtterance
    | PhoneCallResponse.SMSUtterance
    | PhoneCallResponse.InjectedUtterance
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
    | PhoneCallResponse.NodeTransitionUtterance
    | PhoneCallResponse.DtmfUtterance
    | PhoneCallResponse.SMSUtterance
    | PhoneCallResponse.InjectedUtterance
  >;

  /**
   * The destination number or identifier where the call was transferred to. Only
   * populated when the disconnection reason was `call_transfer`. Can be a phone
   * number or a SIP URI. SIP URIs are prefixed with "sip:" and may include a
   * ";transport=..." portion (if transport is known) where the transport type can be
   * "tls", "tcp" or "udp".
   */
  transfer_destination?: string | null;

  /**
   * Transfer end timestamp (milliseconds since epoch) of the call. Available after
   * transfer call ends.
   */
  transfer_end_timestamp?: number;
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
       * True if this cost item is for a transfer segment.
       */
      is_transfer_leg_cost?: boolean;

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

    /**
     * Optional thought signature from Google Gemini thinking models. This is used
     * internally to maintain reasoning chain in multi-turn function calling.
     */
    thought_signature?: string;
  }

  export interface ToolCallResultUtterance {
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
     * Whether the tool call was successful.
     */
    successful?: boolean;
  }

  export interface NodeTransitionUtterance {
    /**
     * Former node id
     */
    former_node_id: string;

    /**
     * Former node name
     */
    former_node_name: string;

    /**
     * New node id
     */
    new_node_id: string;

    /**
     * New node name
     */
    new_node_name: string;

    /**
     * This is result of a node transition
     */
    role: 'node_transition';

    /**
     * How this node was reached. "global" means a global node transition,
     * "global_go_back" means returning from a global node, "interrupt_go_back" means
     * going back due to user interruption, and "normal" means a regular edge
     * transition.
     */
    transition_type?: 'global' | 'global_go_back' | 'interrupt_go_back' | 'normal';
  }

  export interface DtmfUtterance {
    /**
     * The digit pressed by the user. Will be a single digit string like "1", "2", "3",
     * "\*", "#" etc.
     */
    digit: string;

    /**
     * Digit pressed by the user from their phone keypad.
     */
    role: 'dtmf';
  }

  export interface SMSUtterance {
    /**
     * Text content of the SMS message.
     */
    content: string;

    /**
     * SMS message received from the user during the call (for example while the agent
     * is leaving a voicemail). Not part of the spoken conversation.
     */
    role: 'sms';

    /**
     * Time the SMS was received, in seconds relative to the start of the call.
     */
    time_sec: number;

    /**
     * Multimedia attachments (MMS). Display only; not relayed into the spoken
     * conversation.
     */
    multimedia?: Array<SMSUtterance.Multimedia>;
  }

  export namespace SMSUtterance {
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

  export interface InjectedUtterance {
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
     * Time the context was injected, in seconds relative to the start of the call.
     */
    time_sec: number;
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

    /**
     * Optional thought signature from Google Gemini thinking models. This is used
     * internally to maintain reasoning chain in multi-turn function calling.
     */
    thought_signature?: string;
  }

  export interface ToolCallResultUtterance {
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
     * Whether the tool call was successful.
     */
    successful?: boolean;
  }

  export interface NodeTransitionUtterance {
    /**
     * Former node id
     */
    former_node_id: string;

    /**
     * Former node name
     */
    former_node_name: string;

    /**
     * New node id
     */
    new_node_id: string;

    /**
     * New node name
     */
    new_node_name: string;

    /**
     * This is result of a node transition
     */
    role: 'node_transition';

    /**
     * How this node was reached. "global" means a global node transition,
     * "global_go_back" means returning from a global node, "interrupt_go_back" means
     * going back due to user interruption, and "normal" means a regular edge
     * transition.
     */
    transition_type?: 'global' | 'global_go_back' | 'interrupt_go_back' | 'normal';
  }

  export interface DtmfUtterance {
    /**
     * The digit pressed by the user. Will be a single digit string like "1", "2", "3",
     * "\*", "#" etc.
     */
    digit: string;

    /**
     * Digit pressed by the user from their phone keypad.
     */
    role: 'dtmf';
  }

  export interface SMSUtterance {
    /**
     * Text content of the SMS message.
     */
    content: string;

    /**
     * SMS message received from the user during the call (for example while the agent
     * is leaving a voicemail). Not part of the spoken conversation.
     */
    role: 'sms';

    /**
     * Time the SMS was received, in seconds relative to the start of the call.
     */
    time_sec: number;

    /**
     * Multimedia attachments (MMS). Display only; not relayed into the spoken
     * conversation.
     */
    multimedia?: Array<SMSUtterance.Multimedia>;
  }

  export namespace SMSUtterance {
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

  export interface InjectedUtterance {
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
     * Time the context was injected, in seconds relative to the start of the call.
     */
    time_sec: number;
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
   * Unique id of the call. Used to identify the call in the LLM websocket and used
   * to authenticate in the audio websocket.
   */
  call_id: string;

  /**
   * Status of call.
   *
   * - `registered`: Call id issued, starting to make a call using this id.
   * - `ongoing`: Call connected and ongoing.
   * - `ended`: The underlying websocket has ended for the call. Either user or agent
   *   hung up, or call transferred.
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
   * Tag pointing at the agent version used for this call, captured at call creation
   * time and frozen thereafter (unaffected by later tag reassignments). Populated
   * whether the caller dispatched by tag, numeric version, "latest", or
   * "latest_published" — when the caller specified a tag, that tag wins; otherwise
   * the most-recently- assigned tag on the resolved version is used. Absent when no
   * tag points at the resolved version (or for calls created before this field was
   * introduced).
   */
  agent_tag?: string | null;

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
  collected_dynamic_variables?: { [key: string]: string };

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
    | 'call_take_over';

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
  retell_llm_dynamic_variables?: { [key: string]: string };

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
    | WebCallResponse.NodeTransitionUtterance
    | WebCallResponse.DtmfUtterance
    | WebCallResponse.SMSUtterance
    | WebCallResponse.InjectedUtterance
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
    | WebCallResponse.NodeTransitionUtterance
    | WebCallResponse.DtmfUtterance
    | WebCallResponse.SMSUtterance
    | WebCallResponse.InjectedUtterance
  >;

  /**
   * The destination number or identifier where the call was transferred to. Only
   * populated when the disconnection reason was `call_transfer`. Can be a phone
   * number or a SIP URI. SIP URIs are prefixed with "sip:" and may include a
   * ";transport=..." portion (if transport is known) where the transport type can be
   * "tls", "tcp" or "udp".
   */
  transfer_destination?: string | null;

  /**
   * Transfer end timestamp (milliseconds since epoch) of the call. Available after
   * transfer call ends.
   */
  transfer_end_timestamp?: number;
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
       * True if this cost item is for a transfer segment.
       */
      is_transfer_leg_cost?: boolean;

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

    /**
     * Optional thought signature from Google Gemini thinking models. This is used
     * internally to maintain reasoning chain in multi-turn function calling.
     */
    thought_signature?: string;
  }

  export interface ToolCallResultUtterance {
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
     * Whether the tool call was successful.
     */
    successful?: boolean;
  }

  export interface NodeTransitionUtterance {
    /**
     * Former node id
     */
    former_node_id: string;

    /**
     * Former node name
     */
    former_node_name: string;

    /**
     * New node id
     */
    new_node_id: string;

    /**
     * New node name
     */
    new_node_name: string;

    /**
     * This is result of a node transition
     */
    role: 'node_transition';

    /**
     * How this node was reached. "global" means a global node transition,
     * "global_go_back" means returning from a global node, "interrupt_go_back" means
     * going back due to user interruption, and "normal" means a regular edge
     * transition.
     */
    transition_type?: 'global' | 'global_go_back' | 'interrupt_go_back' | 'normal';
  }

  export interface DtmfUtterance {
    /**
     * The digit pressed by the user. Will be a single digit string like "1", "2", "3",
     * "\*", "#" etc.
     */
    digit: string;

    /**
     * Digit pressed by the user from their phone keypad.
     */
    role: 'dtmf';
  }

  export interface SMSUtterance {
    /**
     * Text content of the SMS message.
     */
    content: string;

    /**
     * SMS message received from the user during the call (for example while the agent
     * is leaving a voicemail). Not part of the spoken conversation.
     */
    role: 'sms';

    /**
     * Time the SMS was received, in seconds relative to the start of the call.
     */
    time_sec: number;

    /**
     * Multimedia attachments (MMS). Display only; not relayed into the spoken
     * conversation.
     */
    multimedia?: Array<SMSUtterance.Multimedia>;
  }

  export namespace SMSUtterance {
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

  export interface InjectedUtterance {
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
     * Time the context was injected, in seconds relative to the start of the call.
     */
    time_sec: number;
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

    /**
     * Optional thought signature from Google Gemini thinking models. This is used
     * internally to maintain reasoning chain in multi-turn function calling.
     */
    thought_signature?: string;
  }

  export interface ToolCallResultUtterance {
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
     * Whether the tool call was successful.
     */
    successful?: boolean;
  }

  export interface NodeTransitionUtterance {
    /**
     * Former node id
     */
    former_node_id: string;

    /**
     * Former node name
     */
    former_node_name: string;

    /**
     * New node id
     */
    new_node_id: string;

    /**
     * New node name
     */
    new_node_name: string;

    /**
     * This is result of a node transition
     */
    role: 'node_transition';

    /**
     * How this node was reached. "global" means a global node transition,
     * "global_go_back" means returning from a global node, "interrupt_go_back" means
     * going back due to user interruption, and "normal" means a regular edge
     * transition.
     */
    transition_type?: 'global' | 'global_go_back' | 'interrupt_go_back' | 'normal';
  }

  export interface DtmfUtterance {
    /**
     * The digit pressed by the user. Will be a single digit string like "1", "2", "3",
     * "\*", "#" etc.
     */
    digit: string;

    /**
     * Digit pressed by the user from their phone keypad.
     */
    role: 'dtmf';
  }

  export interface SMSUtterance {
    /**
     * Text content of the SMS message.
     */
    content: string;

    /**
     * SMS message received from the user during the call (for example while the agent
     * is leaving a voicemail). Not part of the spoken conversation.
     */
    role: 'sms';

    /**
     * Time the SMS was received, in seconds relative to the start of the call.
     */
    time_sec: number;

    /**
     * Multimedia attachments (MMS). Display only; not relayed into the spoken
     * conversation.
     */
    multimedia?: Array<SMSUtterance.Multimedia>;
  }

  export namespace SMSUtterance {
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

  export interface InjectedUtterance {
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
     * Time the context was injected, in seconds relative to the start of the call.
     */
    time_sec: number;
  }
}

export interface CallListResponse {
  /**
   * Whether more results are available.
   */
  has_more?: boolean;

  items?: Array<CallListResponse.V3WebCallResponse | CallListResponse.V3PhoneCallResponse>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;

  /**
   * Total number of calls matching `filter_criteria`. Only present when
   * `include_total` is true.
   */
  total?: number;
}

export namespace CallListResponse {
  export interface V3WebCallResponse {
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
     * Unique id of the call. Used to identify the call in the LLM websocket and used
     * to authenticate in the audio websocket.
     */
    call_id: string;

    /**
     * Status of call.
     *
     * - `registered`: Call id issued, starting to make a call using this id.
     * - `ongoing`: Call connected and ongoing.
     * - `ended`: The underlying websocket has ended for the call. Either user or agent
     *   hung up, or call transferred.
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
     * Tag pointing at the agent version used for this call, captured at call creation
     * time and frozen thereafter (unaffected by later tag reassignments). Populated
     * whether the caller dispatched by tag, numeric version, "latest", or
     * "latest_published" — when the caller specified a tag, that tag wins; otherwise
     * the most-recently- assigned tag on the resolved version is used. Absent when no
     * tag points at the resolved version (or for calls created before this field was
     * introduced).
     */
    agent_tag?: string | null;

    /**
     * Post call analysis that includes information such as sentiment, status, summary,
     * and custom defined data to extract. Available after call ends. Subscribe to
     * `call_analyzed` webhook event type to receive it once ready.
     */
    call_analysis?: V3WebCallResponse.CallAnalysis;

    /**
     * Cost of the call, including all the products and their costs and discount.
     */
    call_cost?: V3WebCallResponse.CallCost;

    /**
     * Dynamic variables collected from the call. Only available after the call ends.
     */
    collected_dynamic_variables?: { [key: string]: string };

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
      | 'call_take_over';

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
    latency?: V3WebCallResponse.Latency;

    /**
     * LLM token usage of the call, available after call ends. Not populated if using
     * custom LLM, realtime API, or no LLM call is made.
     */
    llm_token_usage?: V3WebCallResponse.LlmTokenUsage;

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
    retell_llm_dynamic_variables?: { [key: string]: string };

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
     * Begin timestamp (milliseconds since epoch) of the call. Available after call
     * starts.
     */
    start_timestamp?: number;

    /**
     * The destination number or identifier where the call was transferred to. Only
     * populated when the disconnection reason was `call_transfer`. Can be a phone
     * number or a SIP URI. SIP URIs are prefixed with "sip:" and may include a
     * ";transport=..." portion (if transport is known) where the transport type can be
     * "tls", "tcp" or "udp".
     */
    transfer_destination?: string | null;

    /**
     * Transfer end timestamp (milliseconds since epoch) of the call. Available after
     * transfer call ends.
     */
    transfer_end_timestamp?: number;
  }

  export namespace V3WebCallResponse {
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
         * True if this cost item is for a transfer segment.
         */
        is_transfer_leg_cost?: boolean;

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
  }

  export interface V3PhoneCallResponse {
    /**
     * Corresponding agent id of this call.
     */
    agent_id: string;

    /**
     * The version of the agent.
     */
    agent_version: number;

    /**
     * Unique id of the call. Used to identify the call in the LLM websocket and used
     * to authenticate in the audio websocket.
     */
    call_id: string;

    /**
     * Status of call.
     *
     * - `registered`: Call id issued, starting to make a call using this id.
     * - `ongoing`: Call connected and ongoing.
     * - `ended`: The underlying websocket has ended for the call. Either user or agent
     *   hung up, or call transferred.
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
     * Tag pointing at the agent version used for this call, captured at call creation
     * time and frozen thereafter (unaffected by later tag reassignments). Populated
     * whether the caller dispatched by tag, numeric version, "latest", or
     * "latest_published" — when the caller specified a tag, that tag wins; otherwise
     * the most-recently- assigned tag on the resolved version is used. Absent when no
     * tag points at the resolved version (or for calls created before this field was
     * introduced).
     */
    agent_tag?: string | null;

    /**
     * Post call analysis that includes information such as sentiment, status, summary,
     * and custom defined data to extract. Available after call ends. Subscribe to
     * `call_analyzed` webhook event type to receive it once ready.
     */
    call_analysis?: V3PhoneCallResponse.CallAnalysis;

    /**
     * Cost of the call, including all the products and their costs and discount.
     */
    call_cost?: V3PhoneCallResponse.CallCost;

    /**
     * Dynamic variables collected from the call. Only available after the call ends.
     */
    collected_dynamic_variables?: { [key: string]: string };

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
      | 'call_take_over';

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
    latency?: V3PhoneCallResponse.Latency;

    /**
     * LLM token usage of the call, available after call ends. Not populated if using
     * custom LLM, realtime API, or no LLM call is made.
     */
    llm_token_usage?: V3PhoneCallResponse.LlmTokenUsage;

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
    retell_llm_dynamic_variables?: { [key: string]: string };

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
     * Begin timestamp (milliseconds since epoch) of the call. Available after call
     * starts.
     */
    start_timestamp?: number;

    /**
     * Telephony identifier of the call, populated when available. Tracking purposes
     * only.
     */
    telephony_identifier?: V3PhoneCallResponse.TelephonyIdentifier;

    /**
     * The destination number or identifier where the call was transferred to. Only
     * populated when the disconnection reason was `call_transfer`. Can be a phone
     * number or a SIP URI. SIP URIs are prefixed with "sip:" and may include a
     * ";transport=..." portion (if transport is known) where the transport type can be
     * "tls", "tcp" or "udp".
     */
    transfer_destination?: string | null;

    /**
     * Transfer end timestamp (milliseconds since epoch) of the call. Available after
     * transfer call ends.
     */
    transfer_end_timestamp?: number;
  }

  export namespace V3PhoneCallResponse {
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
         * True if this cost item is for a transfer segment.
         */
        is_transfer_leg_cost?: boolean;

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
  override_agent_version?: number | string;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Response Engine prompt and tool description. Only applicable for Response
   * Engine.
   */
  retell_llm_dynamic_variables?: { [key: string]: string };
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
       * If set to true, DTMF input will interrupt the agent even when
       * interruption_sensitivity is 0. Can be overridden per conversation or subagent
       * node. Default to false.
       */
      allow_dtmf_interruption?: boolean;

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
       * - `convention-hall`: Convention hall ambience, with some echo and people
       *   chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
       * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
       * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
       * - `static-noise`: Constant static noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
       * - `call-center`: Call center work noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/call-center.wav)
       *   Set to `null` to remove ambient sound from this agent.
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
       * street, etc. Entries may reference dynamic variables with `{{variable}}` syntax.
       */
      boosted_keywords?: Array<string> | null;

      /**
       * If this option is set, the agent prompt will include call screen handling
       * instructions for identity and call purpose questions. Set this to null to
       * disable call screen prompt instructions.
       */
      call_screening_option?: Agent.CallScreeningOption | null;

      /**
       * Custom STT configuration. Only used when stt_mode is set to custom.
       */
      custom_stt_config?: Agent.CustomSttConfig | null;

      /**
       * Number of days to retain call/chat data before automatic deletion. Must be
       * between 1 and 730 days. If not set, data is retained forever (no automatic
       * deletion).
       */
      data_storage_retention_days?: number | null;

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
       * If set, determines what denoising mode to use. Use "no-denoise" to bypass all
       * audio denoising. Default to noise-cancellation.
       */
      denoising_mode?: 'no-denoise' | 'noise-cancellation' | 'noise-and-background-speech-cancellation';

      /**
       * Controls whether the agent would backchannel (agent interjects the speaker with
       * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
       * when enabled tends to show up more in longer user utterances. If not set, agent
       * will not backchannel.
       */
      enable_backchannel?: boolean;

      /**
       * If set to true, the agent will dynamically adjust how quickly it responds based
       * on the user's speech rate and past turn-taking behavior in the call. If unset,
       * default value false will apply.
       */
      enable_dynamic_responsiveness?: boolean;

      /**
       * If set to true, will enable dynamic voice speed adjustment based on the user's
       * speech rate and conversation context. If unset, default value false will apply.
       */
      enable_dynamic_voice_speed?: boolean;

      /**
       * Master toggle for expressive mode. When true, the agent may add expressive voice
       * tags to the audio it generates. Only applicable for platform voices. If unset,
       * defaults to false.
       */
      enable_expressive_mode?: boolean;

      /**
       * If users stay silent for a period after agent speech, end the call. The minimum
       * value allowed is 10,000 ms (10 s). By default, this is set to 600000 (10 min).
       */
      end_call_after_silence_ms?: number;

      /**
       * The expressive voice tags Retell pre-teaches the model to use when
       * enable_expressive_mode is true. Custom tags defined in the system prompt are
       * still allowed. If empty, the agent follows general expressive guidance without a
       * fixed tag set.
       */
      expressive_emotion_tags?: Array<
        | 'empathetic'
        | 'excited'
        | 'happy'
        | 'curious'
        | 'surprised'
        | 'sigh'
        | 'clear throat'
        | 'pause'
        | 'long pause'
        | 'emphasis'
      >;

      /**
       * Custom expressive voice guidance to use instead of the default Retell expressive
       * prompt when enable_expressive_mode is true. If omitted or blank, the default
       * expressive prompt will be used.
       */
      expressive_mode_prompt?: string | null;

      /**
       * When TTS provider for the selected voice is experiencing outages, we would use
       * fallback voices listed here for the agent. Voice id and the fallback voice ids
       * must be from different TTS providers. The system would go through the list in
       * order, if the first one in the list is also having outage, it would use the next
       * one. Set to null to remove voice fallback for the agent.
       */
      fallback_voice_ids?: Array<string> | null;

      /**
       * Configuration for guardrail checks to detect and prevent prohibited topics in
       * agent output and user input.
       */
      guardrail_config?: Agent.GuardrailConfig;

      /**
       * Toggle behavior presets on/off to influence agent response style and behaviors.
       */
      handbook_config?: Agent.HandbookConfig;

      /**
       * Controls how sensitive the agent is to user interruptions. Value ranging from
       * [0,1]. Lower value means it will take longer / more words for user to interrupt
       * agent, while higher value means it's easier for user to interrupt agent. If
       * unset, default value 1 will apply. When this is set to 0, agent would never be
       * interrupted.
       */
      interruption_sensitivity?: number;

      /**
       * If this option is set, the call will try to detect IVR in the first 3 minutes of
       * the call. Actions defined will be applied when the IVR is detected. Set this to
       * null to disable IVR detection.
       */
      ivr_option?: Agent.IvrOption | null;

      /**
       * Specifies what language(s) the agent will operate in. Accepts either a single
       * scalar locale (e.g. `en-US`), the legacy scalar value `multi` for multilingual
       * support, or an array of concrete locale codes for explicit multi-locale
       * selection (e.g. `["en-US","es-ES"]`). The array form must contain concrete
       * locale codes only — the `multi` value is valid only as the scalar legacy form
       * and must not appear inside an array. Single-element arrays are normalized to the
       * equivalent scalar on output. If unset, defaults to `en-US`.
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
        | 'lt-LT'
        | 'lv-LV'
        | 'cs-CZ'
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
        | 'multi'
        | Array<
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
            | 'lt-LT'
            | 'lv-LV'
            | 'cs-CZ'
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
          >;

      /**
       * Maximum allowed length for the call, will force end the call if reached. The
       * minimum value allowed is 60,000 ms (1 min), and maximum value allowed is
       * 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
       */
      max_call_duration_ms?: number;

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
        | Agent.CallPresetAnalysisData
      > | null;

      /**
       * The model to use for post call analysis. Default to gpt-4.1.
       */
      post_call_analysis_model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5.4'
        | 'gpt-5.4-mini'
        | 'gpt-5.4-nano'
        | 'gpt-5.5'
        | 'claude-4.5-sonnet'
        | 'claude-4.6-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-3.0-flash'
        | 'gemini-3.1-flash-lite'
        | null;

      /**
       * A list of words / phrases and their pronunciation to be used to guide the audio
       * synthesize for consistent pronunciation. Check the dashboard to see what
       * provider supports this feature. Set to null to remove pronunciation dictionary
       * from this agent.
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
       * Default to 30000 (30 s). Valid range is [5000, 300000].
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
       * Default to fast mode. When set to custom, custom_stt_config must be provided.
       */
      stt_mode?: 'fast' | 'accurate' | 'custom';

      /**
       * IANA timezone for the agent (e.g. America/New_York). Defaults to
       * America/Los_Angeles if not set.
       */
      timezone?: string | null;

      user_dtmf_options?: Agent.UserDtmfOptions | null;

      /**
       * Optional description of the agent version. Used for your own reference and
       * documentation.
       */
      version_description?: string | null;

      /**
       * Optional title of the agent version. Used for your own reference.
       */
      version_title?: string | null;

      /**
       * If set, determines the vocabulary set to use for transcription. This setting
       * only applies for English agents, for non English agent, this setting is a no-op.
       * Default to general.
       */
      vocab_specialization?: 'general' | 'medical';

      /**
       * Controls the emotional tone of the agent's voice. Currently supported for
       * Cartesia and Minimax TTS providers. If unset, no emotion will be used.
       */
      voice_emotion?: 'calm' | 'sympathetic' | 'happy' | 'sad' | 'angry' | 'fearful' | 'surprised' | null;

      /**
       * Unique voice id used for the agent. Find list of available voices and their
       * preview in Dashboard.
       */
      voice_id?: string;

      /**
       * Select the voice model used for the selected voice. Each provider has a set of
       * available voice models. Set to null to remove voice model selection, and default
       * ones will apply. Check out dashboard for more details of each voice model.
       */
      voice_model?:
        | 'eleven_turbo_v2'
        | 'eleven_flash_v2'
        | 'eleven_turbo_v2_5'
        | 'eleven_flash_v2_5'
        | 'eleven_multilingual_v2'
        | 'eleven_v3'
        | 'sonic-3'
        | 'sonic-3-latest'
        | 'sonic-3.5'
        | 'tts-1'
        | 'gpt-4o-mini-tts'
        | 'speech-02-turbo'
        | 'speech-2.8-turbo'
        | 's1'
        | 's2-pro'
        | 's2.1-pro'
        | null;

      /**
       * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
       * speech, while higher value means faster speech rate. If unset, default value 1
       * will apply.
       */
      voice_speed?: number;

      /**
       * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
       * more stable, and higher value means more variant speech generation. Check the
       * dashboard to see what provider supports this feature. If unset, default value 1
       * will apply.
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
       * Which webhook events this agent should receive. If not set, defaults to
       * call_started, call_ended, call_analyzed.
       */
      webhook_events?: Array<
        | 'call_started'
        | 'call_ended'
        | 'call_analyzed'
        | 'transcript_updated'
        | 'transfer_started'
        | 'transfer_bridged'
        | 'transfer_cancelled'
        | 'transfer_ended'
      > | null;

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
       * If this option is set, the agent prompt will include call screen handling
       * instructions for identity and call purpose questions. Set this to null to
       * disable call screen prompt instructions.
       */
      export interface CallScreeningOption {
        /**
         * Identity the agent should provide when a call screen asks who is calling.
         * Dynamic variables are supported.
         */
        agent_identity: string;

        /**
         * Purpose the agent should provide when a call screen asks why it is calling.
         * Dynamic variables are supported.
         */
        call_purpose: string;
      }

      /**
       * Custom STT configuration. Only used when stt_mode is set to custom.
       */
      export interface CustomSttConfig {
        /**
         * Endpointing timeout in milliseconds. Minimum is 100 for Azure, 10 for Deepgram,
         * 500 for Soniox, 100 for AssemblyAI.
         */
        endpointing_ms: number;

        /**
         * ASR provider name.
         */
        provider: 'azure' | 'deepgram' | 'soniox' | 'assemblyai';
      }

      /**
       * Configuration for guardrail checks to detect and prevent prohibited topics in
       * agent output and user input.
       */
      export interface GuardrailConfig {
        /**
         * Selected prohibited user topic categories to check. When user messages contain
         * these topics, the agent will respond with a placeholder message instead of
         * processing the request.
         */
        input_topics?: Array<'platform_integrity_jailbreaking'> | null;

        /**
         * Selected prohibited agent topic categories to check. When agent messages contain
         * these topics, they will be replaced with a placeholder message.
         */
        output_topics?: Array<
          | 'harassment'
          | 'self_harm'
          | 'sexual_exploitation'
          | 'violence'
          | 'defense_and_national_security'
          | 'illicit_and_harmful_activity'
          | 'gambling'
          | 'regulated_professional_advice'
          | 'child_safety_and_exploitation'
        > | null;
      }

      /**
       * Toggle behavior presets on/off to influence agent response style and behaviors.
       */
      export interface HandbookConfig {
        /**
         * When asked, acknowledge being a virtual assistant.
         */
        ai_disclosure?: boolean;

        /**
         * Enables Conversational Personality. When true, the agent uses the Conversational
         * Personality handbook preset, skips Professional Rep Personality during prompt
         * assembly, and enables internal colloquial rewrite behavior.
         */
        conversational_personality?: boolean;

        /**
         * Professional call center rep baseline.
         */
        default_personality?: boolean;

        /**
         * Repeat back and confirm important details (voice only).
         */
        echo_verification?: boolean;

        /**
         * Warm acknowledgment of caller concerns.
         */
        high_empathy?: boolean;

        /**
         * Spell using NATO phonetic alphabet style (voice only).
         */
        nato_phonetic_alphabet?: boolean;

        /**
         * Sprinkle natural speech fillers like "um", "you know" for a more human,
         * conversational tone.
         */
        natural_filler_words?: boolean;

        /**
         * Stay within prompt/context scope, don't invent details.
         */
        scope_boundaries?: boolean;

        /**
         * Treat near-match similar words as same entity to reduce impact of transcription
         * error (voice only).
         */
        smart_matching?: boolean;

        /**
         * Convert numbers/dates/currency to spoken forms (voice only).
         */
        speech_normalization?: boolean;
      }

      /**
       * If this option is set, the call will try to detect IVR in the first 3 minutes of
       * the call. Actions defined will be applied when the IVR is detected. Set this to
       * null to disable IVR detection.
       */
      export interface IvrOption {
        action: IvrOption.Action;

        /**
         * Optionally describe what should be treated as an IVR. Leave as null to use the
         * default definition.
         */
        detection_prompt?: string | null;
      }

      export namespace IvrOption {
        export interface Action {
          type: 'hangup';
        }
      }

      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      export interface PiiConfig {
        /**
         * List of PII categories to scrub from transcripts and recordings. PII redaction
         * is only active when this list is non-empty; an empty array means no PII
         * scrubbing is performed.
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
          | 'customer_account_number'
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
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Examples of the variable value to teach model the style and syntax.
         */
        examples?: Array<string>;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
      }

      /**
       * System preset for post-call analysis (voice agents). Use in
       * post_call_analysis_data to override prompts or mark fields optional.
       */
      export interface CallPresetAnalysisData {
        /**
         * Preset identifier for voice agent analysis.
         */
        name: 'call_summary' | 'call_successful' | 'user_sentiment';

        /**
         * Identifies this item as a system preset.
         */
        type: 'system-presets';

        /**
         * Optional instruction to help decide whether this field needs to be populated. If
         * not set, the field is always included.
         */
        conditional_prompt?: string;

        /**
         * Prompt or description for this preset.
         */
        description?: string;

        /**
         * If false, this field is optional in the analysis. If true or unset, the field is
         * required.
         */
        required?: boolean;
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
         * digit (0-9), the pound/hash symbol (#), or the asterisk (\*).
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
          | VoicemailOption.VoicemailActionHangup
          | VoicemailOption.VoicemailActionBridgeTransfer;

        /**
         * Optionally describe what should be treated as voicemail. Leave as null to use
         * the default definition.
         */
        detection_prompt?: string | null;
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

        export interface VoicemailActionBridgeTransfer {
          type: 'bridge_transfer';
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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5.4'
          | 'gpt-5.4-mini'
          | 'gpt-5.4-nano'
          | 'gpt-5.5'
          | 'claude-4.5-sonnet'
          | 'claude-4.6-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-3.0-flash'
          | 'gemini-3.1-flash-lite';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5.4'
        | 'gpt-5.4-mini'
        | 'gpt-5.4-nano'
        | 'gpt-5.5'
        | 'claude-4.5-sonnet'
        | 'claude-4.6-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-3.0-flash'
        | 'gemini-3.1-flash-lite'
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
      s2s_model?: 'gpt-realtime-2' | 'gpt-realtime-1.5' | 'gpt-realtime' | 'gpt-realtime-mini' | null;

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
  agent_version?: number | string;

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
  retell_llm_dynamic_variables?: { [key: string]: string };

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
       * If set to true, DTMF input will interrupt the agent even when
       * interruption_sensitivity is 0. Can be overridden per conversation or subagent
       * node. Default to false.
       */
      allow_dtmf_interruption?: boolean;

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
       * - `convention-hall`: Convention hall ambience, with some echo and people
       *   chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
       * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
       * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
       * - `static-noise`: Constant static noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
       * - `call-center`: Call center work noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/call-center.wav)
       *   Set to `null` to remove ambient sound from this agent.
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
       * street, etc. Entries may reference dynamic variables with `{{variable}}` syntax.
       */
      boosted_keywords?: Array<string> | null;

      /**
       * If this option is set, the agent prompt will include call screen handling
       * instructions for identity and call purpose questions. Set this to null to
       * disable call screen prompt instructions.
       */
      call_screening_option?: Agent.CallScreeningOption | null;

      /**
       * Custom STT configuration. Only used when stt_mode is set to custom.
       */
      custom_stt_config?: Agent.CustomSttConfig | null;

      /**
       * Number of days to retain call/chat data before automatic deletion. Must be
       * between 1 and 730 days. If not set, data is retained forever (no automatic
       * deletion).
       */
      data_storage_retention_days?: number | null;

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
       * If set, determines what denoising mode to use. Use "no-denoise" to bypass all
       * audio denoising. Default to noise-cancellation.
       */
      denoising_mode?: 'no-denoise' | 'noise-cancellation' | 'noise-and-background-speech-cancellation';

      /**
       * Controls whether the agent would backchannel (agent interjects the speaker with
       * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
       * when enabled tends to show up more in longer user utterances. If not set, agent
       * will not backchannel.
       */
      enable_backchannel?: boolean;

      /**
       * If set to true, the agent will dynamically adjust how quickly it responds based
       * on the user's speech rate and past turn-taking behavior in the call. If unset,
       * default value false will apply.
       */
      enable_dynamic_responsiveness?: boolean;

      /**
       * If set to true, will enable dynamic voice speed adjustment based on the user's
       * speech rate and conversation context. If unset, default value false will apply.
       */
      enable_dynamic_voice_speed?: boolean;

      /**
       * Master toggle for expressive mode. When true, the agent may add expressive voice
       * tags to the audio it generates. Only applicable for platform voices. If unset,
       * defaults to false.
       */
      enable_expressive_mode?: boolean;

      /**
       * If users stay silent for a period after agent speech, end the call. The minimum
       * value allowed is 10,000 ms (10 s). By default, this is set to 600000 (10 min).
       */
      end_call_after_silence_ms?: number;

      /**
       * The expressive voice tags Retell pre-teaches the model to use when
       * enable_expressive_mode is true. Custom tags defined in the system prompt are
       * still allowed. If empty, the agent follows general expressive guidance without a
       * fixed tag set.
       */
      expressive_emotion_tags?: Array<
        | 'empathetic'
        | 'excited'
        | 'happy'
        | 'curious'
        | 'surprised'
        | 'sigh'
        | 'clear throat'
        | 'pause'
        | 'long pause'
        | 'emphasis'
      >;

      /**
       * Custom expressive voice guidance to use instead of the default Retell expressive
       * prompt when enable_expressive_mode is true. If omitted or blank, the default
       * expressive prompt will be used.
       */
      expressive_mode_prompt?: string | null;

      /**
       * When TTS provider for the selected voice is experiencing outages, we would use
       * fallback voices listed here for the agent. Voice id and the fallback voice ids
       * must be from different TTS providers. The system would go through the list in
       * order, if the first one in the list is also having outage, it would use the next
       * one. Set to null to remove voice fallback for the agent.
       */
      fallback_voice_ids?: Array<string> | null;

      /**
       * Configuration for guardrail checks to detect and prevent prohibited topics in
       * agent output and user input.
       */
      guardrail_config?: Agent.GuardrailConfig;

      /**
       * Toggle behavior presets on/off to influence agent response style and behaviors.
       */
      handbook_config?: Agent.HandbookConfig;

      /**
       * Controls how sensitive the agent is to user interruptions. Value ranging from
       * [0,1]. Lower value means it will take longer / more words for user to interrupt
       * agent, while higher value means it's easier for user to interrupt agent. If
       * unset, default value 1 will apply. When this is set to 0, agent would never be
       * interrupted.
       */
      interruption_sensitivity?: number;

      /**
       * If this option is set, the call will try to detect IVR in the first 3 minutes of
       * the call. Actions defined will be applied when the IVR is detected. Set this to
       * null to disable IVR detection.
       */
      ivr_option?: Agent.IvrOption | null;

      /**
       * Specifies what language(s) the agent will operate in. Accepts either a single
       * scalar locale (e.g. `en-US`), the legacy scalar value `multi` for multilingual
       * support, or an array of concrete locale codes for explicit multi-locale
       * selection (e.g. `["en-US","es-ES"]`). The array form must contain concrete
       * locale codes only — the `multi` value is valid only as the scalar legacy form
       * and must not appear inside an array. Single-element arrays are normalized to the
       * equivalent scalar on output. If unset, defaults to `en-US`.
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
        | 'lt-LT'
        | 'lv-LV'
        | 'cs-CZ'
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
        | 'multi'
        | Array<
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
            | 'lt-LT'
            | 'lv-LV'
            | 'cs-CZ'
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
          >;

      /**
       * Maximum allowed length for the call, will force end the call if reached. The
       * minimum value allowed is 60,000 ms (1 min), and maximum value allowed is
       * 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
       */
      max_call_duration_ms?: number;

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
        | Agent.CallPresetAnalysisData
      > | null;

      /**
       * The model to use for post call analysis. Default to gpt-4.1.
       */
      post_call_analysis_model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5.4'
        | 'gpt-5.4-mini'
        | 'gpt-5.4-nano'
        | 'gpt-5.5'
        | 'claude-4.5-sonnet'
        | 'claude-4.6-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-3.0-flash'
        | 'gemini-3.1-flash-lite'
        | null;

      /**
       * A list of words / phrases and their pronunciation to be used to guide the audio
       * synthesize for consistent pronunciation. Check the dashboard to see what
       * provider supports this feature. Set to null to remove pronunciation dictionary
       * from this agent.
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
       * Default to 30000 (30 s). Valid range is [5000, 300000].
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
       * Default to fast mode. When set to custom, custom_stt_config must be provided.
       */
      stt_mode?: 'fast' | 'accurate' | 'custom';

      /**
       * IANA timezone for the agent (e.g. America/New_York). Defaults to
       * America/Los_Angeles if not set.
       */
      timezone?: string | null;

      user_dtmf_options?: Agent.UserDtmfOptions | null;

      /**
       * Optional description of the agent version. Used for your own reference and
       * documentation.
       */
      version_description?: string | null;

      /**
       * Optional title of the agent version. Used for your own reference.
       */
      version_title?: string | null;

      /**
       * If set, determines the vocabulary set to use for transcription. This setting
       * only applies for English agents, for non English agent, this setting is a no-op.
       * Default to general.
       */
      vocab_specialization?: 'general' | 'medical';

      /**
       * Controls the emotional tone of the agent's voice. Currently supported for
       * Cartesia and Minimax TTS providers. If unset, no emotion will be used.
       */
      voice_emotion?: 'calm' | 'sympathetic' | 'happy' | 'sad' | 'angry' | 'fearful' | 'surprised' | null;

      /**
       * Unique voice id used for the agent. Find list of available voices and their
       * preview in Dashboard.
       */
      voice_id?: string;

      /**
       * Select the voice model used for the selected voice. Each provider has a set of
       * available voice models. Set to null to remove voice model selection, and default
       * ones will apply. Check out dashboard for more details of each voice model.
       */
      voice_model?:
        | 'eleven_turbo_v2'
        | 'eleven_flash_v2'
        | 'eleven_turbo_v2_5'
        | 'eleven_flash_v2_5'
        | 'eleven_multilingual_v2'
        | 'eleven_v3'
        | 'sonic-3'
        | 'sonic-3-latest'
        | 'sonic-3.5'
        | 'tts-1'
        | 'gpt-4o-mini-tts'
        | 'speech-02-turbo'
        | 'speech-2.8-turbo'
        | 's1'
        | 's2-pro'
        | 's2.1-pro'
        | null;

      /**
       * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
       * speech, while higher value means faster speech rate. If unset, default value 1
       * will apply.
       */
      voice_speed?: number;

      /**
       * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
       * more stable, and higher value means more variant speech generation. Check the
       * dashboard to see what provider supports this feature. If unset, default value 1
       * will apply.
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
       * Which webhook events this agent should receive. If not set, defaults to
       * call_started, call_ended, call_analyzed.
       */
      webhook_events?: Array<
        | 'call_started'
        | 'call_ended'
        | 'call_analyzed'
        | 'transcript_updated'
        | 'transfer_started'
        | 'transfer_bridged'
        | 'transfer_cancelled'
        | 'transfer_ended'
      > | null;

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
       * If this option is set, the agent prompt will include call screen handling
       * instructions for identity and call purpose questions. Set this to null to
       * disable call screen prompt instructions.
       */
      export interface CallScreeningOption {
        /**
         * Identity the agent should provide when a call screen asks who is calling.
         * Dynamic variables are supported.
         */
        agent_identity: string;

        /**
         * Purpose the agent should provide when a call screen asks why it is calling.
         * Dynamic variables are supported.
         */
        call_purpose: string;
      }

      /**
       * Custom STT configuration. Only used when stt_mode is set to custom.
       */
      export interface CustomSttConfig {
        /**
         * Endpointing timeout in milliseconds. Minimum is 100 for Azure, 10 for Deepgram,
         * 500 for Soniox, 100 for AssemblyAI.
         */
        endpointing_ms: number;

        /**
         * ASR provider name.
         */
        provider: 'azure' | 'deepgram' | 'soniox' | 'assemblyai';
      }

      /**
       * Configuration for guardrail checks to detect and prevent prohibited topics in
       * agent output and user input.
       */
      export interface GuardrailConfig {
        /**
         * Selected prohibited user topic categories to check. When user messages contain
         * these topics, the agent will respond with a placeholder message instead of
         * processing the request.
         */
        input_topics?: Array<'platform_integrity_jailbreaking'> | null;

        /**
         * Selected prohibited agent topic categories to check. When agent messages contain
         * these topics, they will be replaced with a placeholder message.
         */
        output_topics?: Array<
          | 'harassment'
          | 'self_harm'
          | 'sexual_exploitation'
          | 'violence'
          | 'defense_and_national_security'
          | 'illicit_and_harmful_activity'
          | 'gambling'
          | 'regulated_professional_advice'
          | 'child_safety_and_exploitation'
        > | null;
      }

      /**
       * Toggle behavior presets on/off to influence agent response style and behaviors.
       */
      export interface HandbookConfig {
        /**
         * When asked, acknowledge being a virtual assistant.
         */
        ai_disclosure?: boolean;

        /**
         * Enables Conversational Personality. When true, the agent uses the Conversational
         * Personality handbook preset, skips Professional Rep Personality during prompt
         * assembly, and enables internal colloquial rewrite behavior.
         */
        conversational_personality?: boolean;

        /**
         * Professional call center rep baseline.
         */
        default_personality?: boolean;

        /**
         * Repeat back and confirm important details (voice only).
         */
        echo_verification?: boolean;

        /**
         * Warm acknowledgment of caller concerns.
         */
        high_empathy?: boolean;

        /**
         * Spell using NATO phonetic alphabet style (voice only).
         */
        nato_phonetic_alphabet?: boolean;

        /**
         * Sprinkle natural speech fillers like "um", "you know" for a more human,
         * conversational tone.
         */
        natural_filler_words?: boolean;

        /**
         * Stay within prompt/context scope, don't invent details.
         */
        scope_boundaries?: boolean;

        /**
         * Treat near-match similar words as same entity to reduce impact of transcription
         * error (voice only).
         */
        smart_matching?: boolean;

        /**
         * Convert numbers/dates/currency to spoken forms (voice only).
         */
        speech_normalization?: boolean;
      }

      /**
       * If this option is set, the call will try to detect IVR in the first 3 minutes of
       * the call. Actions defined will be applied when the IVR is detected. Set this to
       * null to disable IVR detection.
       */
      export interface IvrOption {
        action: IvrOption.Action;

        /**
         * Optionally describe what should be treated as an IVR. Leave as null to use the
         * default definition.
         */
        detection_prompt?: string | null;
      }

      export namespace IvrOption {
        export interface Action {
          type: 'hangup';
        }
      }

      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      export interface PiiConfig {
        /**
         * List of PII categories to scrub from transcripts and recordings. PII redaction
         * is only active when this list is non-empty; an empty array means no PII
         * scrubbing is performed.
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
          | 'customer_account_number'
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
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Examples of the variable value to teach model the style and syntax.
         */
        examples?: Array<string>;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
      }

      /**
       * System preset for post-call analysis (voice agents). Use in
       * post_call_analysis_data to override prompts or mark fields optional.
       */
      export interface CallPresetAnalysisData {
        /**
         * Preset identifier for voice agent analysis.
         */
        name: 'call_summary' | 'call_successful' | 'user_sentiment';

        /**
         * Identifies this item as a system preset.
         */
        type: 'system-presets';

        /**
         * Optional instruction to help decide whether this field needs to be populated. If
         * not set, the field is always included.
         */
        conditional_prompt?: string;

        /**
         * Prompt or description for this preset.
         */
        description?: string;

        /**
         * If false, this field is optional in the analysis. If true or unset, the field is
         * required.
         */
        required?: boolean;
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
         * digit (0-9), the pound/hash symbol (#), or the asterisk (\*).
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
          | VoicemailOption.VoicemailActionHangup
          | VoicemailOption.VoicemailActionBridgeTransfer;

        /**
         * Optionally describe what should be treated as voicemail. Leave as null to use
         * the default definition.
         */
        detection_prompt?: string | null;
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

        export interface VoicemailActionBridgeTransfer {
          type: 'bridge_transfer';
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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5.4'
          | 'gpt-5.4-mini'
          | 'gpt-5.4-nano'
          | 'gpt-5.5'
          | 'claude-4.5-sonnet'
          | 'claude-4.6-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-3.0-flash'
          | 'gemini-3.1-flash-lite';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5.4'
        | 'gpt-5.4-mini'
        | 'gpt-5.4-nano'
        | 'gpt-5.5'
        | 'claude-4.5-sonnet'
        | 'claude-4.6-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-3.0-flash'
        | 'gemini-3.1-flash-lite'
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
      s2s_model?: 'gpt-realtime-2' | 'gpt-realtime-1.5' | 'gpt-realtime' | 'gpt-realtime-mini' | null;

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
  agent_version?: number | string;

  /**
   * Start the call at this conversation flow node (stage). Must be a valid node id
   * in the agent's conversation flow. Only applicable when the agent uses
   * conversation flow as the response engine. Ignored for retell-llm agents.
   */
  current_node_id?: string | null;

  /**
   * Start the conversation in this state (stage). Must be a valid state name in the
   * agent's Retell LLM. Only applicable when the agent uses Retell LLM with states.
   * Ignored for conversation-flow agents.
   */
  current_state?: string | null;

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
  retell_llm_dynamic_variables?: { [key: string]: string };
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
       * If set to true, DTMF input will interrupt the agent even when
       * interruption_sensitivity is 0. Can be overridden per conversation or subagent
       * node. Default to false.
       */
      allow_dtmf_interruption?: boolean;

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
       * - `convention-hall`: Convention hall ambience, with some echo and people
       *   chatting in background.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/convention-hall.wav)
       * - `summer-outdoor`: Summer outdoor ambience with cicada chirping.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/summer-outdoor.wav)
       * - `mountain-outdoor`: Mountain outdoor ambience with birds singing.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/mountain-outdoor.wav)
       * - `static-noise`: Constant static noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/static-noise.wav)
       * - `call-center`: Call center work noise.
       *   [Listen to Ambience](https://retell-utils-public.s3.us-west-2.amazonaws.com/call-center.wav)
       *   Set to `null` to remove ambient sound from this agent.
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
       * street, etc. Entries may reference dynamic variables with `{{variable}}` syntax.
       */
      boosted_keywords?: Array<string> | null;

      /**
       * If this option is set, the agent prompt will include call screen handling
       * instructions for identity and call purpose questions. Set this to null to
       * disable call screen prompt instructions.
       */
      call_screening_option?: Agent.CallScreeningOption | null;

      /**
       * Custom STT configuration. Only used when stt_mode is set to custom.
       */
      custom_stt_config?: Agent.CustomSttConfig | null;

      /**
       * Number of days to retain call/chat data before automatic deletion. Must be
       * between 1 and 730 days. If not set, data is retained forever (no automatic
       * deletion).
       */
      data_storage_retention_days?: number | null;

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
       * If set, determines what denoising mode to use. Use "no-denoise" to bypass all
       * audio denoising. Default to noise-cancellation.
       */
      denoising_mode?: 'no-denoise' | 'noise-cancellation' | 'noise-and-background-speech-cancellation';

      /**
       * Controls whether the agent would backchannel (agent interjects the speaker with
       * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
       * when enabled tends to show up more in longer user utterances. If not set, agent
       * will not backchannel.
       */
      enable_backchannel?: boolean;

      /**
       * If set to true, the agent will dynamically adjust how quickly it responds based
       * on the user's speech rate and past turn-taking behavior in the call. If unset,
       * default value false will apply.
       */
      enable_dynamic_responsiveness?: boolean;

      /**
       * If set to true, will enable dynamic voice speed adjustment based on the user's
       * speech rate and conversation context. If unset, default value false will apply.
       */
      enable_dynamic_voice_speed?: boolean;

      /**
       * Master toggle for expressive mode. When true, the agent may add expressive voice
       * tags to the audio it generates. Only applicable for platform voices. If unset,
       * defaults to false.
       */
      enable_expressive_mode?: boolean;

      /**
       * If users stay silent for a period after agent speech, end the call. The minimum
       * value allowed is 10,000 ms (10 s). By default, this is set to 600000 (10 min).
       */
      end_call_after_silence_ms?: number;

      /**
       * The expressive voice tags Retell pre-teaches the model to use when
       * enable_expressive_mode is true. Custom tags defined in the system prompt are
       * still allowed. If empty, the agent follows general expressive guidance without a
       * fixed tag set.
       */
      expressive_emotion_tags?: Array<
        | 'empathetic'
        | 'excited'
        | 'happy'
        | 'curious'
        | 'surprised'
        | 'sigh'
        | 'clear throat'
        | 'pause'
        | 'long pause'
        | 'emphasis'
      >;

      /**
       * Custom expressive voice guidance to use instead of the default Retell expressive
       * prompt when enable_expressive_mode is true. If omitted or blank, the default
       * expressive prompt will be used.
       */
      expressive_mode_prompt?: string | null;

      /**
       * When TTS provider for the selected voice is experiencing outages, we would use
       * fallback voices listed here for the agent. Voice id and the fallback voice ids
       * must be from different TTS providers. The system would go through the list in
       * order, if the first one in the list is also having outage, it would use the next
       * one. Set to null to remove voice fallback for the agent.
       */
      fallback_voice_ids?: Array<string> | null;

      /**
       * Configuration for guardrail checks to detect and prevent prohibited topics in
       * agent output and user input.
       */
      guardrail_config?: Agent.GuardrailConfig;

      /**
       * Toggle behavior presets on/off to influence agent response style and behaviors.
       */
      handbook_config?: Agent.HandbookConfig;

      /**
       * Controls how sensitive the agent is to user interruptions. Value ranging from
       * [0,1]. Lower value means it will take longer / more words for user to interrupt
       * agent, while higher value means it's easier for user to interrupt agent. If
       * unset, default value 1 will apply. When this is set to 0, agent would never be
       * interrupted.
       */
      interruption_sensitivity?: number;

      /**
       * If this option is set, the call will try to detect IVR in the first 3 minutes of
       * the call. Actions defined will be applied when the IVR is detected. Set this to
       * null to disable IVR detection.
       */
      ivr_option?: Agent.IvrOption | null;

      /**
       * Specifies what language(s) the agent will operate in. Accepts either a single
       * scalar locale (e.g. `en-US`), the legacy scalar value `multi` for multilingual
       * support, or an array of concrete locale codes for explicit multi-locale
       * selection (e.g. `["en-US","es-ES"]`). The array form must contain concrete
       * locale codes only — the `multi` value is valid only as the scalar legacy form
       * and must not appear inside an array. Single-element arrays are normalized to the
       * equivalent scalar on output. If unset, defaults to `en-US`.
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
        | 'lt-LT'
        | 'lv-LV'
        | 'cs-CZ'
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
        | 'multi'
        | Array<
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
            | 'lt-LT'
            | 'lv-LV'
            | 'cs-CZ'
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
          >;

      /**
       * Maximum allowed length for the call, will force end the call if reached. The
       * minimum value allowed is 60,000 ms (1 min), and maximum value allowed is
       * 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
       */
      max_call_duration_ms?: number;

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
        | Agent.CallPresetAnalysisData
      > | null;

      /**
       * The model to use for post call analysis. Default to gpt-4.1.
       */
      post_call_analysis_model?:
        | 'gpt-4.1'
        | 'gpt-4.1-mini'
        | 'gpt-4.1-nano'
        | 'gpt-5'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5.4'
        | 'gpt-5.4-mini'
        | 'gpt-5.4-nano'
        | 'gpt-5.5'
        | 'claude-4.5-sonnet'
        | 'claude-4.6-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-3.0-flash'
        | 'gemini-3.1-flash-lite'
        | null;

      /**
       * A list of words / phrases and their pronunciation to be used to guide the audio
       * synthesize for consistent pronunciation. Check the dashboard to see what
       * provider supports this feature. Set to null to remove pronunciation dictionary
       * from this agent.
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
       * Default to 30000 (30 s). Valid range is [5000, 300000].
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
       * Default to fast mode. When set to custom, custom_stt_config must be provided.
       */
      stt_mode?: 'fast' | 'accurate' | 'custom';

      /**
       * IANA timezone for the agent (e.g. America/New_York). Defaults to
       * America/Los_Angeles if not set.
       */
      timezone?: string | null;

      user_dtmf_options?: Agent.UserDtmfOptions | null;

      /**
       * Optional description of the agent version. Used for your own reference and
       * documentation.
       */
      version_description?: string | null;

      /**
       * Optional title of the agent version. Used for your own reference.
       */
      version_title?: string | null;

      /**
       * If set, determines the vocabulary set to use for transcription. This setting
       * only applies for English agents, for non English agent, this setting is a no-op.
       * Default to general.
       */
      vocab_specialization?: 'general' | 'medical';

      /**
       * Controls the emotional tone of the agent's voice. Currently supported for
       * Cartesia and Minimax TTS providers. If unset, no emotion will be used.
       */
      voice_emotion?: 'calm' | 'sympathetic' | 'happy' | 'sad' | 'angry' | 'fearful' | 'surprised' | null;

      /**
       * Unique voice id used for the agent. Find list of available voices and their
       * preview in Dashboard.
       */
      voice_id?: string;

      /**
       * Select the voice model used for the selected voice. Each provider has a set of
       * available voice models. Set to null to remove voice model selection, and default
       * ones will apply. Check out dashboard for more details of each voice model.
       */
      voice_model?:
        | 'eleven_turbo_v2'
        | 'eleven_flash_v2'
        | 'eleven_turbo_v2_5'
        | 'eleven_flash_v2_5'
        | 'eleven_multilingual_v2'
        | 'eleven_v3'
        | 'sonic-3'
        | 'sonic-3-latest'
        | 'sonic-3.5'
        | 'tts-1'
        | 'gpt-4o-mini-tts'
        | 'speech-02-turbo'
        | 'speech-2.8-turbo'
        | 's1'
        | 's2-pro'
        | 's2.1-pro'
        | null;

      /**
       * Controls speed of voice. Value ranging from [0.5,2]. Lower value means slower
       * speech, while higher value means faster speech rate. If unset, default value 1
       * will apply.
       */
      voice_speed?: number;

      /**
       * Controls how stable the voice is. Value ranging from [0,2]. Lower value means
       * more stable, and higher value means more variant speech generation. Check the
       * dashboard to see what provider supports this feature. If unset, default value 1
       * will apply.
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
       * Which webhook events this agent should receive. If not set, defaults to
       * call_started, call_ended, call_analyzed.
       */
      webhook_events?: Array<
        | 'call_started'
        | 'call_ended'
        | 'call_analyzed'
        | 'transcript_updated'
        | 'transfer_started'
        | 'transfer_bridged'
        | 'transfer_cancelled'
        | 'transfer_ended'
      > | null;

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
       * If this option is set, the agent prompt will include call screen handling
       * instructions for identity and call purpose questions. Set this to null to
       * disable call screen prompt instructions.
       */
      export interface CallScreeningOption {
        /**
         * Identity the agent should provide when a call screen asks who is calling.
         * Dynamic variables are supported.
         */
        agent_identity: string;

        /**
         * Purpose the agent should provide when a call screen asks why it is calling.
         * Dynamic variables are supported.
         */
        call_purpose: string;
      }

      /**
       * Custom STT configuration. Only used when stt_mode is set to custom.
       */
      export interface CustomSttConfig {
        /**
         * Endpointing timeout in milliseconds. Minimum is 100 for Azure, 10 for Deepgram,
         * 500 for Soniox, 100 for AssemblyAI.
         */
        endpointing_ms: number;

        /**
         * ASR provider name.
         */
        provider: 'azure' | 'deepgram' | 'soniox' | 'assemblyai';
      }

      /**
       * Configuration for guardrail checks to detect and prevent prohibited topics in
       * agent output and user input.
       */
      export interface GuardrailConfig {
        /**
         * Selected prohibited user topic categories to check. When user messages contain
         * these topics, the agent will respond with a placeholder message instead of
         * processing the request.
         */
        input_topics?: Array<'platform_integrity_jailbreaking'> | null;

        /**
         * Selected prohibited agent topic categories to check. When agent messages contain
         * these topics, they will be replaced with a placeholder message.
         */
        output_topics?: Array<
          | 'harassment'
          | 'self_harm'
          | 'sexual_exploitation'
          | 'violence'
          | 'defense_and_national_security'
          | 'illicit_and_harmful_activity'
          | 'gambling'
          | 'regulated_professional_advice'
          | 'child_safety_and_exploitation'
        > | null;
      }

      /**
       * Toggle behavior presets on/off to influence agent response style and behaviors.
       */
      export interface HandbookConfig {
        /**
         * When asked, acknowledge being a virtual assistant.
         */
        ai_disclosure?: boolean;

        /**
         * Enables Conversational Personality. When true, the agent uses the Conversational
         * Personality handbook preset, skips Professional Rep Personality during prompt
         * assembly, and enables internal colloquial rewrite behavior.
         */
        conversational_personality?: boolean;

        /**
         * Professional call center rep baseline.
         */
        default_personality?: boolean;

        /**
         * Repeat back and confirm important details (voice only).
         */
        echo_verification?: boolean;

        /**
         * Warm acknowledgment of caller concerns.
         */
        high_empathy?: boolean;

        /**
         * Spell using NATO phonetic alphabet style (voice only).
         */
        nato_phonetic_alphabet?: boolean;

        /**
         * Sprinkle natural speech fillers like "um", "you know" for a more human,
         * conversational tone.
         */
        natural_filler_words?: boolean;

        /**
         * Stay within prompt/context scope, don't invent details.
         */
        scope_boundaries?: boolean;

        /**
         * Treat near-match similar words as same entity to reduce impact of transcription
         * error (voice only).
         */
        smart_matching?: boolean;

        /**
         * Convert numbers/dates/currency to spoken forms (voice only).
         */
        speech_normalization?: boolean;
      }

      /**
       * If this option is set, the call will try to detect IVR in the first 3 minutes of
       * the call. Actions defined will be applied when the IVR is detected. Set this to
       * null to disable IVR detection.
       */
      export interface IvrOption {
        action: IvrOption.Action;

        /**
         * Optionally describe what should be treated as an IVR. Leave as null to use the
         * default definition.
         */
        detection_prompt?: string | null;
      }

      export namespace IvrOption {
        export interface Action {
          type: 'hangup';
        }
      }

      /**
       * Configuration for PII scrubbing from transcripts and recordings.
       */
      export interface PiiConfig {
        /**
         * List of PII categories to scrub from transcripts and recordings. PII redaction
         * is only active when this list is non-empty; an empty array means no PII
         * scrubbing is performed.
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
          | 'customer_account_number'
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
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Examples of the variable value to teach model the style and syntax.
         */
        examples?: Array<string>;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
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

        /**
         * Optional instruction to help decide whether this field needs to be populated in
         * the analysis. If not set, the field is always included. If required is true,
         * this is ignored.
         */
        conditional_prompt?: string;

        /**
         * Whether this data is required. If true and the data is not extracted, the call
         * will be marked as unsuccessful.
         */
        required?: boolean;
      }

      /**
       * System preset for post-call analysis (voice agents). Use in
       * post_call_analysis_data to override prompts or mark fields optional.
       */
      export interface CallPresetAnalysisData {
        /**
         * Preset identifier for voice agent analysis.
         */
        name: 'call_summary' | 'call_successful' | 'user_sentiment';

        /**
         * Identifies this item as a system preset.
         */
        type: 'system-presets';

        /**
         * Optional instruction to help decide whether this field needs to be populated. If
         * not set, the field is always included.
         */
        conditional_prompt?: string;

        /**
         * Prompt or description for this preset.
         */
        description?: string;

        /**
         * If false, this field is optional in the analysis. If true or unset, the field is
         * required.
         */
        required?: boolean;
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
         * digit (0-9), the pound/hash symbol (#), or the asterisk (\*).
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
          | VoicemailOption.VoicemailActionHangup
          | VoicemailOption.VoicemailActionBridgeTransfer;

        /**
         * Optionally describe what should be treated as voicemail. Leave as null to use
         * the default definition.
         */
        detection_prompt?: string | null;
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

        export interface VoicemailActionBridgeTransfer {
          type: 'bridge_transfer';
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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5.4'
          | 'gpt-5.4-mini'
          | 'gpt-5.4-nano'
          | 'gpt-5.5'
          | 'claude-4.5-sonnet'
          | 'claude-4.6-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-3.0-flash'
          | 'gemini-3.1-flash-lite';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5.4'
        | 'gpt-5.4-mini'
        | 'gpt-5.4-nano'
        | 'gpt-5.5'
        | 'claude-4.5-sonnet'
        | 'claude-4.6-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-3.0-flash'
        | 'gemini-3.1-flash-lite'
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
      s2s_model?: 'gpt-realtime-2' | 'gpt-realtime-1.5' | 'gpt-realtime' | 'gpt-realtime-mini' | null;

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

export interface CallListParams {
  /**
   * Filter criteria for calls. All conditions are implicitly connected with AND.
   */
  filter_criteria?: CallListParams.FilterCriteria;

  /**
   * Whether to include `total` (count of all calls matching `filter_criteria`,
   * ignoring `limit`/`skip`/`pagination_key`) in the response. Defaults to false.
   * Each enabled request triggers an additional aggregate query, so opt in only when
   * the total is needed.
   */
  include_total?: boolean;

  /**
   * Maximum number of calls to return.
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
   * Sort calls by `start_timestamp` in ascending or descending order.
   */
  sort_order?: 'ascending' | 'descending';
}

export namespace CallListParams {
  /**
   * Filter criteria for calls. All conditions are implicitly connected with AND.
   */
  export interface FilterCriteria {
    /**
     * Filter by agent(s). Agent filters are connected by OR.
     */
    agent?: Array<FilterCriteria.Agent>;

    /**
     * Filter by batch call ID.
     */
    batch_call_id?: FilterCriteria.BatchCallID;

    /**
     * Filter by call ID.
     */
    call_id?: FilterCriteria.StringFilter | FilterCriteria.EnumFilter;

    call_status?: FilterCriteria.CallStatus;

    /**
     * Filter by whether the call was successful.
     */
    call_successful?: FilterCriteria.CallSuccessful;

    call_type?: FilterCriteria.CallType;

    /**
     * Filter by combined cost of the call.
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

    data_storage_setting?: FilterCriteria.DataStorageSetting;

    direction?: FilterCriteria.Direction;

    disconnection_reason?: FilterCriteria.DisconnectionReason;

    /**
     * Filter by call duration in milliseconds.
     */
    duration_ms?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by dynamic variables.
     */
    dynamic_variables?: Array<FilterCriteria.DynamicVariable>;

    /**
     * Filter by end-to-end latency p50.
     */
    e2e_latency_p50?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by call end timestamp (epoch ms).
     */
    end_timestamp?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by from number.
     */
    from_number?: FilterCriteria.FromNumber;

    /**
     * Filter by whether the call is in voicemail.
     */
    in_voicemail?: FilterCriteria.InVoicemail;

    /**
     * Filter by metadata fields.
     */
    metadata?: Array<
      | FilterCriteria.StringFilter
      | FilterCriteria.NumberFilter
      | FilterCriteria.BooleanFilter
      | FilterCriteria.RangeFilter
      | FilterCriteria.EnumFilter
      | FilterCriteria.PresentFilter
    >;

    /**
     * Filter by call start timestamp (epoch ms).
     */
    start_timestamp?: FilterCriteria.NumberFilter | FilterCriteria.RangeFilter;

    /**
     * Filter by to number.
     */
    to_number?: FilterCriteria.ToNumber;

    /**
     * Filter by tool call criteria. Tool call filters are connected by AND.
     */
    tool_calls?: Array<FilterCriteria.ToolCall>;

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
     * Filter by batch call ID.
     */
    export interface BatchCallID {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }

    export interface StringFilter {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }

    export interface EnumFilter {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<string>;
    }

    export interface CallStatus {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<'not_connected' | 'ongoing' | 'ended' | 'error'>;
    }

    /**
     * Filter by whether the call was successful.
     */
    export interface CallSuccessful {
      op: 'eq';

      type: 'boolean';

      value: boolean;
    }

    export interface CallType {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<'web_call' | 'phone_call'>;
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

    export interface DataStorageSetting {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<'everything' | 'everything_except_pii' | 'basic_attributes_only'>;
    }

    export interface Direction {
      /**
       * in: value is one of the listed values
       */
      op: 'in';

      type: 'enum';

      value: Array<'inbound' | 'outbound'>;
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

    export interface DynamicVariable {
      /**
       * The dynamic variable name to filter on.
       */
      key: string;

      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
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

    /**
     * Filter by from number.
     */
    export interface FromNumber {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }

    /**
     * Filter by whether the call is in voicemail.
     */
    export interface InVoicemail {
      op: 'eq';

      type: 'boolean';

      value: boolean;
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

    /**
     * Filter by to number.
     */
    export interface ToNumber {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: string;
    }

    export interface ToolCall {
      /**
       * Filter by tool call latency in milliseconds.
       */
      latency_ms?: ToolCall.NumberFilter | ToolCall.RangeFilter;

      /**
       * The tool call name to filter on.
       */
      name?: string;

      /**
       * Filter by tool call success status.
       */
      success?: ToolCall.Success;

      /**
       * The tool call type to filter on.
       */
      type?: string;
    }

    export namespace ToolCall {
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

      /**
       * Filter by tool call success status.
       */
      export interface Success {
        op: 'eq';

        type: 'boolean';

        value: boolean;
      }
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

export interface CallUpdateParams {
  /**
   * Custom attributes for the call
   */
  custom_attributes?: { [key: string]: string | number | boolean };

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
   * @deprecated Deprecated. Use the /v2/update-live-call/{call_id} endpoint to
   * override dynamic variables on an ongoing call. Override dynamic variables
   * represented as key-value pairs of strings. Setting this will override or add the
   * dynamic variables set in the agent during the call. Only need to set the delta
   * where you want to override, no need to set the entire dynamic variables object.
   * Setting this to null will remove any existing override.
   */
  override_dynamic_variables?: { [key: string]: string } | null;
}

export declare namespace Call {
  export {
    type CallResponse as CallResponse,
    type PhoneCallResponse as PhoneCallResponse,
    type WebCallResponse as WebCallResponse,
    type CallListResponse as CallListResponse,
    type CallCreatePhoneCallParams as CallCreatePhoneCallParams,
    type CallRegisterPhoneCallParams as CallRegisterPhoneCallParams,
    type CallCreateWebCallParams as CallCreateWebCallParams,
    type CallListParams as CallListParams,
    type CallUpdateParams as CallUpdateParams,
  };
}
