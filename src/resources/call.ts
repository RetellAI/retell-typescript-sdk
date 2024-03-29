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

export interface CallResponse {
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
   * Begin timestamp (milliseconds since epoch) of the call.
   */
  start_timestamp: number;

  /**
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend.
   */
  e2e_latency?: CallResponse.E2eLatency;

  /**
   * If users stay silent for a period, end the call. By default, it is set to
   * 600,000 ms (10 min). The minimum value allowed is 10,000 ms (10 s).
   */
  end_call_after_silence_ms?: number;

  /**
   * End timestamp (milliseconds since epoch) of the call. Available after call ends.
   */
  end_timestamp?: number;

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
   * The callee number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  to_number?: string;

  /**
   * Transcription of the call. Available after call ends.
   */
  transcript?: string;

  /**
   * Transcript of the call in the format of a list of utterance, with timestamp.
   * Available after call ends.
   */
  transcript_object?: Array<CallResponse.TranscriptObject>;
}

export namespace CallResponse {
  /**
   * End to end latency (from user stops talking to agent start talking) tracking of
   * the call, available after call ends. This latency does not account for the
   * network trip time from Retell server to user frontend.
   */
  export interface E2eLatency {
    /**
     * Maximum end to end latency in the call.
     */
    max?: number;

    /**
     * Minimum end to end latency in the call.
     */
    min?: number;

    /**
     * Number of turn change. We track latency every time turn change between user and
     * agent.
     */
    num?: number;

    /**
     * 50 percentile of end to end latency.
     */
    p50?: number;

    /**
     * 90 percentile of end to end latency.
     */
    p90?: number;

    /**
     * 95 percentile of end to end latency.
     */
    p95?: number;

    /**
     * 99 percentile of end to end latency.
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
   * Begin timestamp (milliseconds since epoch) of the call.
   */
  start_timestamp: number;

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
