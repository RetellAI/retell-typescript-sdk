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
   * Retrieve call details
   */
  list(body: CallListParams, options?: Core.RequestOptions): Core.APIPromise<CallListResponse> {
    return this._client.post('/v2/list-calls', { body, ...options });
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
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend. The latency is tracked
   * every time turn change between user and agent.
   */
  e2e_latency?: PhoneCallResponse.E2ELatency;

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

  /**
   * LLM latency (from issue of LLM call to first token received) tracking of the
   * call, available after call ends. When using custom LLM. this latency includes
   * LLM websocket roundtrip time between user server and Retell server.
   */
  llm_latency?: PhoneCallResponse.LlmLatency;

  /**
   * LLM websocket roundtrip latency (between user server and Retell server) tracking
   * of the call, available after call ends. Only populated for calls using custom
   * LLM.
   */
  llm_websocket_network_rtt_latency?: PhoneCallResponse.LlmWebsocketNetworkRttLatency;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

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
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
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
  >;
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
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend. The latency is tracked
   * every time turn change between user and agent.
   */
  export interface E2ELatency {
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
  }

  /**
   * LLM latency (from issue of LLM call to first token received) tracking of the
   * call, available after call ends. When using custom LLM. this latency includes
   * LLM websocket roundtrip time between user server and Retell server.
   */
  export interface LlmLatency {
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
  }

  /**
   * LLM websocket roundtrip latency (between user server and Retell server) tracking
   * of the call, available after call ends. Only populated for calls using custom
   * LLM.
   */
  export interface LlmWebsocketNetworkRttLatency {
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
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend. The latency is tracked
   * every time turn change between user and agent.
   */
  e2e_latency?: WebCallResponse.E2ELatency;

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

  /**
   * LLM latency (from issue of LLM call to first token received) tracking of the
   * call, available after call ends. When using custom LLM. this latency includes
   * LLM websocket roundtrip time between user server and Retell server.
   */
  llm_latency?: WebCallResponse.LlmLatency;

  /**
   * LLM websocket roundtrip latency (between user server and Retell server) tracking
   * of the call, available after call ends. Only populated for calls using custom
   * LLM.
   */
  llm_websocket_network_rtt_latency?: WebCallResponse.LlmWebsocketNetworkRttLatency;

  /**
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

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
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
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
  >;
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
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend. The latency is tracked
   * every time turn change between user and agent.
   */
  export interface E2ELatency {
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
  }

  /**
   * LLM latency (from issue of LLM call to first token received) tracking of the
   * call, available after call ends. When using custom LLM. this latency includes
   * LLM websocket roundtrip time between user server and Retell server.
   */
  export interface LlmLatency {
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
  }

  /**
   * LLM websocket roundtrip latency (between user server and Retell server) tracking
   * of the call, available after call ends. Only populated for calls using custom
   * LLM.
   */
  export interface LlmWebsocketNetworkRttLatency {
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
}

export type CallListResponse = Array<CallResponse>;

export interface CallListParams {
  filter_criteria?: CallListParams.FilterCriteria;

  /**
   * Limit the number of calls returned.
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
  export interface FilterCriteria {
    /**
     * Inclusive. Filter calls that end on or after this timestamp.
     */
    after_end_timestamp?: number;

    /**
     * Inclusive. Filter calls that start on or after this timestamp.
     */
    after_start_timestamp?: number;

    /**
     * Only retrieve calls that are made with specific agent(s).
     */
    agent_id?: Array<string>;

    /**
     * Exclusive. Filter calls that end before this timestamp.
     */
    before_end_timestamp?: number;

    /**
     * Exclusive. Filter calls that start before this timestamp.
     */
    before_start_timestamp?: number;
  }
}

export interface CallCreatePhoneCallParams {
  /**
   * The number you own in E.164 format. Must be a Retell managed number.
   */
  from_number: string;

  /**
   * The number you want to call, in E.164 format. Right now only US numbers are
   * officially supported.
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
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
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
   * An arbitrary object for storage purpose only. You can put anything here like
   * your internal customer id associated with the call. Not used for processing. You
   * can later get this field from the call object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;
}

export interface CallRegisterPhoneCallParams {
  /**
   * The agent to use for the call.
   */
  agent_id: string;

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
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
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
    type CallListParams as CallListParams,
    type CallCreatePhoneCallParams as CallCreatePhoneCallParams,
    type CallCreateWebCallParams as CallCreateWebCallParams,
    type CallRegisterPhoneCallParams as CallRegisterPhoneCallParams,
  };
}
