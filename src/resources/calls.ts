// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'toddlzt/core';
import { APIResource } from 'toddlzt/resource';
import { isRequestOptions } from 'toddlzt/core';
import * as CallsAPI from 'toddlzt/resources/calls';

export class Calls extends APIResource {
  /**
   * Retrieve details of a specific call
   */
  retrieve(callId: string, options?: Core.RequestOptions): Core.APIPromise<CallBase> {
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
  register(body: CallRegisterParams, options?: Core.RequestOptions): Core.APIPromise<CallBase> {
    return this._client.post('/register-call', { body, ...options });
  }
}

export interface CallBase {
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
   * The callee number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  to_number?: string;
}

export interface CallBase {
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
   * The callee number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  to_number?: string;
}

export type CallListResponse = Array<CallBase>;

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
   * The callee number. This field is storage purpose only, set this if you want the
   * call object to contain it so that it's easier to reference it. Not used for
   * processing, when we connect to your LLM websocket server, you can then get it
   * from the call object.
   */
  to_number?: string;
}

export namespace Calls {
  export import CallBase = CallsAPI.CallBase;
  export import CallListResponse = CallsAPI.CallListResponse;
  export import CallListParams = CallsAPI.CallListParams;
  export import CallRegisterParams = CallsAPI.CallRegisterParams;
}
