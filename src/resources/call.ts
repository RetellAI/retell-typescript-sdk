// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'retell-sdk/core';
import { APIResource } from 'retell-sdk/resource';
import { isRequestOptions } from 'retell-sdk/core';
import * as CallAPI from 'retell-sdk/resources/call';

export class Call extends APIResource {
  /**
   * Create a new phone call
   */
  create(body: CallCreateParams, options?: Core.RequestOptions): Core.APIPromise<RegisterCallResponse> {
    return this._client.post('/create-phone-call', { body, ...options });
  }

  /**
   * Retrieve details of a specific call
   */
  retrieve(callId: string, options?: Core.RequestOptions): Core.APIPromise<CallResponse> {
    return this._client.get(`/get-call/${callId}`, options);
  }

  /**
   * Retrieve call details
   */
  list(query?: CallListParams, options?: Core.RequestOptions): Core.APIPromise<CallListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<CallListResponse>;
  list(
    query: CallListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CallListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/list-calls', { query, ...options });
  }

  /**
   * Register Call To Get CallId To Establish Connection
   */
  register(body: CallRegisterParams, options?: Core.RequestOptions): Core.APIPromise<RegisterCallResponse> {
    return this._client.post('/register-call', { body, ...options });
  }
}

export interface CallResponse extends RegisterCallResponse {
  /**
   * BETA feature, schema might change, might not always be populated. Please do not
   * rely on this object schema for post processing.
   *
   * Post conversation evaluation of the call. Including information such as
   * sentiment, intent, call completion status and other metrics. Available after
   * call ends. Subscribe to `call_analyzed` webhook event type to receive it once
   * ready.
   */
  conversation_eval?: CallResponse.ConversationEval;

  /**
   * The reason for the disconnection of the call. Debug using explanation in docs
   * based on the reason code. Please reachout to Retell team having trouble
   * understanding the reason.
   */
  disconnection_reason?:
    | 'user_hangup'
    | 'agent_hangup'
    | 'call_transfer'
    | 'inactivity'
    | 'machine_detected'
    | 'concurrency_limit_reached'
    | 'error_llm_websocket_open'
    | 'error_llm_websocket_lost_connection'
    | 'error_llm_websocket_runtime'
    | 'error_llm_websocket_corrupt_payload'
    | 'error_frontend_corrupted_payload'
    | 'error_twilio'
    | 'error_no_audio_received'
    | 'error_asr'
    | 'error_retell'
    | 'error_unknown';

  /**
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend. The latency is tracked
   * every time turn change between user and agent.
   */
  e2e_latency?: CallResponse.E2eLatency;

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

  /**
   * LLM latency (from issue of LLM call to first token received) tracking of the
   * call, available after call ends. When using custom LLM. this latency includes
   * LLM websocket roundtrip time between user server and Retell server.
   */
  llm_latency?: CallResponse.LlmLatency;

  /**
   * LLM websocket roundtrip latency (between user server and Retell server) tracking
   * of the call, available after call ends. Only populated for calls using custom
   * LLM.
   */
  llm_websocket_network_rtt_latency?: CallResponse.LlmWebsocketNetworkRttLatency;

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
  transcript_object?: Array<CallResponse.TranscriptObject>;

  /**
   * Transcript of the call weaved with tool call invocation and results. It
   * precisely captures when (at what utterance, which word) the tool was invoked and
   * what was the result. Available after call ends.
   */
  transcript_with_tool_calls?: Array<
    CallResponse.Utterance | CallResponse.ToolCallInvocationUtterance | CallResponse.ToolCallResultUtterance
  >;
}

export namespace CallResponse {
  /**
   * BETA feature, schema might change, might not always be populated. Please do not
   * rely on this object schema for post processing.
   *
   * Post conversation evaluation of the call. Including information such as
   * sentiment, intent, call completion status and other metrics. Available after
   * call ends. Subscribe to `call_analyzed` webhook event type to receive it once
   * ready.
   */
  export interface ConversationEval {
    /**
     * Evaluate agent task completion status, whether the agent has completed his task.
     */
    agent_task_completion?: 'Completed' | 'Incomplete' | 'Partial';

    /**
     * Reason for the agent task completion status.
     */
    agent_task_completion_reason?: string;

    /**
     * Sentiment of the agent in the conversation.
     */
    agnet_sentiment?: 'Negative' | 'Positive' | 'Neutral';

    /**
     * Evaluate whether the conversation ended normally or was cut off.
     */
    conversation_completion?: 'Completed' | 'Incomplete' | 'Partial';

    /**
     * Reason for the conversation completion status.
     */
    conversation_completion_reason?: string;

    /**
     * A high level summary of the conversation conversation.
     */
    conversation_summary?: string;

    /**
     * Sentiment of the user in the conversation.
     */
    user_sentiment?: 'Negative' | 'Positive' | 'Neutral';
  }

  /**
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend. The latency is tracked
   * every time turn change between user and agent.
   */
  export interface E2eLatency {
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
     * Array of words in the utternace with the word timestamp. Useful for
     * understanding what word was spoken at what time. Note that the word timestamp is
     * not guranteed to be accurate, it's more like an approximation.
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
     * Array of words in the utternace with the word timestamp. Useful for
     * understanding what word was spoken at what time. Note that the word timestamp is
     * not guranteed to be accurate, it's more like an approximation.
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

export interface RegisterCallResponse {
  /**
   * Corresponding agent id of this call.
   */
  agent_id: string;

  /**
   * The audio encoding of the call. The following formats are supported:
   *
   * - `s16le` 16 bit linear PCM audio, the native format for web audio capture and
   *   playback.
   *
   * - `mulaw` non-linear audio encoding technique used in telephony. Commonly used
   *   by Twilio.
   */
  audio_encoding: 's16le' | 'mulaw';

  /**
   * Where the audio websocket would connect from would determine the format /
   * protocol of websocket messages, and would determine how our server read audio
   * bytes and send audio bytes.:
   *
   * - `web`: The protocol defined by Retell, commonly used for connecting from web
   *   frontend. Also useful for those who want to manipulate audio bytes directly.
   *
   * - `twilio`: The
   *   [websocket protocol](https://www.twilio.com/docs/voice/twiml/stream#message-media)
   *   defined by Twilio, used when your system uses Twilio, and supplies Retell
   *   audio websocket url to Twilio.
   */
  audio_websocket_protocol: 'web' | 'twilio';

  /**
   * Unique id of the call. Used to identify in LLM websocket and used to
   * authenticate in audio websocket.
   */
  call_id: string;

  /**
   * Status of call.
   *
   * - `registered`: Call id issued, ready to make a call using this id.
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
   * Sample rate of the conversation, the input and output audio bytes will all
   * conform to this rate. Check the audio source, audio format, and voice used for
   * the agent to select one that works. supports value ranging from [8000, 48000].
   * Note for Twilio `mulaw` encoding, the sample rate has to be 8000.
   *
   * - `s16le` sample rate recommendation (natively supported, lowest latency):
   *
   *   - elevenlabs voices: 16000, 22050, 24000, 44100.
   *   - openai voices: 24000.
   *
   *   - deepgram voices: 8000, 16000, 24000, 32000, 48000.
   */
  sample_rate: number;

  /**
   * If set, will drop the call if machine (voicemail, IVR) is detected. If not set,
   * default value of false will apply.
   */
  drop_call_if_machine_detected?: boolean;

  /**
   * If users stay silent for a period, end the call. By default, it is set to
   * 600,000 ms (10 min). The minimum value allowed is 10,000 ms (10 s).
   */
  end_call_after_silence_ms?: number;

  /**
   * The caller number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  from_number?: string;

  /**
   * An abtriary object for storage purpose only. You can put anything here like your
   * own id for the call, twilio SID, internal customer id. Not used for processing,
   * when we connect to your LLM websocket server, you can then get it from the call
   * object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;

  /**
   * The callee number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  to_number?: string;
}

export type CallListResponse = Array<CallResponse>;

export interface CallCreateParams {
  /**
   * The number you own in BCP 47 format.
   */
  from_number: string;

  /**
   * The number you want to call, in BCP 47 format.
   */
  to_number: string;

  /**
   * If set, will drop the call if machine (voicemail, IVR) is detected. If not set,
   * default value of false will apply.
   */
  drop_call_if_machine_detected?: boolean;

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

export interface CallListParams {
  filter_criteria?: CallListParams.FilterCriteria;

  /**
   * Limit the number of calls returned.
   */
  limit?: number;

  /**
   * The pagination call id to continue fetching the next page of calls. If not set,
   * will start from the beginning.
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

export interface CallRegisterParams {
  /**
   * Unique id of agent used for the call. Your agent would contain the LLM Websocket
   * url used for this call.
   */
  agent_id: string;

  /**
   * The audio encoding of the call. The following formats are supported:
   *
   * - `s16le` 16 bit linear PCM audio, the native format for web audio capture and
   *   playback.
   *
   * - `mulaw` non-linear audio encoding technique used in telephony. Commonly used
   *   by Twilio.
   */
  audio_encoding: 's16le' | 'mulaw';

  /**
   * Where the audio websocket would connect from would determine the format /
   * protocol of websocket messages, and would determine how our server read audio
   * bytes and send audio bytes.:
   *
   * - `web`: The protocol defined by Retell, commonly used for connecting from web
   *   frontend. Also useful for those who want to manipulate audio bytes directly.
   *
   * - `twilio`: The
   *   [websocket protocol](https://www.twilio.com/docs/voice/twiml/stream#message-media)
   *   defined by Twilio, used when your system uses Twilio, and supplies Retell
   *   audio websocket url to Twilio.
   */
  audio_websocket_protocol: 'web' | 'twilio';

  /**
   * Sample rate of the conversation, the input and output audio bytes will all
   * conform to this rate. Check the audio source, audio format, and voice used for
   * the agent to select one that works. supports value ranging from [8000, 48000].
   * Note for Twilio `mulaw` encoding, the sample rate has to be 8000.
   *
   * - `s16le` sample rate recommendation (natively supported, lowest latency):
   *
   *   - elevenlabs voices: 16000, 22050, 24000, 44100.
   *   - openai voices: 24000.
   *
   *   - deepgram voices: 8000, 16000, 24000, 32000, 48000.
   */
  sample_rate: number;

  /**
   * If users stay silent for a period, end the call. By default, it is set to
   * 600,000 ms (10 min). The minimum value allowed is 10,000 ms (10 s).
   */
  end_call_after_silence_ms?: number;

  /**
   * The caller number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  from_number?: string;

  /**
   * An abtriary object for storage purpose only. You can put anything here like your
   * own id for the call, twilio SID, internal customer id. Not used for processing,
   * when we connect to your LLM websocket server, you can then get it from the call
   * object.
   */
  metadata?: unknown;

  /**
   * Add optional dynamic variables in key value pairs of string that injects into
   * your Retell LLM prompt and tool description. Only applicable for Retell LLM.
   */
  retell_llm_dynamic_variables?: Record<string, unknown>;

  /**
   * The callee number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  to_number?: string;
}

export namespace Call {
  export import CallResponse = CallAPI.CallResponse;
  export import RegisterCallResponse = CallAPI.RegisterCallResponse;
  export import CallListResponse = CallAPI.CallListResponse;
  export import CallCreateParams = CallAPI.CallCreateParams;
  export import CallListParams = CallAPI.CallListParams;
  export import CallRegisterParams = CallAPI.CallRegisterParams;
}
