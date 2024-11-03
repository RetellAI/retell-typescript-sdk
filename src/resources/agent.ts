// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Agent extends APIResource {
  /**
   * Create a new agent
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<AgentResponse> {
    return this._client.post('/create-agent', { body, ...options });
  }

  /**
   * Retrieve details of a specific agent
   */
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentResponse> {
    return this._client.get(`/get-agent/${agentId}`, options);
  }

  /**
   * Update an existing agent
   */
  update(
    agentId: string,
    body: AgentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentResponse> {
    return this._client.patch(`/update-agent/${agentId}`, { body, ...options });
  }

  /**
   * List all agents
   */
  list(options?: Core.RequestOptions): Core.APIPromise<AgentListResponse> {
    return this._client.get('/list-agents', options);
  }

  /**
   * Delete an existing agent
   */
  delete(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-agent/${agentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface AgentResponse {
  /**
   * Unique id of agent.
   */
  agent_id: string;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp: number;

  /**
   * The response engine to use for the agent.
   */
  response_engine: AgentResponse.ResponseEngineRetellLm | AgentResponse.ResponseEngineCustomLm;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in Dashboard.
   */
  voice_id: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

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
   * so it's recommended to expeirment before adding any words.
   */
  backchannel_words?: Array<string> | null;

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * If set to true, will format transcription to number, date, email, etc. If set to
   * false, will return transcripts in raw words. If not set, default value of true
   * will apply.
   */
  enable_transcription_formatting?: boolean;

  /**
   * If set to true, will detect whether the call enters a voicemail. Note that this
   * feature is only available for phone calls.
   */
  enable_voicemail_detection?: boolean;

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
   * multilingual support, currently this supports Spanish and English.
   */
  language?:
    | 'en-US'
    | 'en-IN'
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'es-419'
    | 'hi-IN'
    | 'ja-JP'
    | 'pt-PT'
    | 'pt-BR'
    | 'fr-FR'
    | 'zh-CN'
    | 'ru-RU'
    | 'it-IT'
    | 'ko-KR'
    | 'nl-NL'
    | 'pl-PL'
    | 'tr-TR'
    | 'vi-VN'
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
   * Whether this agent opts out of sensitive data storage like transcript,
   * recording, logging. These data can still be accessed securely via webhooks. If
   * not set, default value of false will apply.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * Post call analysis data to extract from the call. This data will augment the
   * pre-defined variables extracted in the call analysis. This will be available
   * after the call ends.
   */
  post_call_analysis_data?: Array<
    | AgentResponse.StringAnalysisData
    | AgentResponse.EnumAnalysisData
    | AgentResponse.BooleanAnalysisData
    | AgentResponse.NumberAnalysisData
  > | null;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Currently only supported for English &
   * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
   */
  pronunciation_dictionary?: Array<AgentResponse.PronunciationDictionary> | null;

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
   * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
   * means less responsive agent (wait more, respond slower), while higher value
   * means faster exchanges (respond when it can). If unset, default value 1 will
   * apply.
   */
  responsiveness?: number;

  /**
   * Optionally set the voice model used for the selected voice. Currently only
   * elevenlab voices have voice model selections. Set to null to remove voice model
   * selection, and default ones will apply. Supported voice models are:
   *
   * - `eleven_turbo_v2`: Fast english only model, supports pronunciation tags.
   *
   * - `eleven_turbo_v2_5`: Multilingual model with lowest latency.
   *
   * - `eleven_multilingual_v2`: Multilingual model with rich emotion and nice
   *   accent.
   */
  voice_model?: 'eleven_turbo_v2' | 'eleven_turbo_v2_5' | 'eleven_multilingual_v2' | null;

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
   * Configures when to stop running voicemail detection, as it becomes unlikely to
   * hit voicemail after a couple minutes, and keep running it will only have
   * negative impact. The minimum value allowed is 5,000 ms (5 s), and maximum value
   * allowed is 180,000 (3 minutes). By default, this is set to 30,000 (30 s).
   */
  voicemail_detection_timeout_ms?: number;

  /**
   * The message to be played when the call enters a voicemail. Note that this
   * feature is only available for phone calls. If you want to hangup after hitting
   * voicemail, set this to empty string.
   */
  voicemail_message?: string;

  /**
   * If set, will control the volume of the agent. Value ranging from [0,2]. Lower
   * value means quieter agent speech, while higher value means louder agent speech.
   * If unset, default value 1 will apply.
   */
  volume?: number;

  /**
   * The webhook for agent to listen to call events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace AgentResponse {
  export interface ResponseEngineRetellLm {
    /**
     * id of the Retell LLM to use.
     */
    llm_id: string;

    /**
     * type of the response engine.
     */
    type: 'retell-llm';
  }

  export interface ResponseEngineCustomLm {
    /**
     * LLM websocket url of the custom LLM.
     */
    llm_websocket_url: string;

    /**
     * type of the response engine.
     */
    type: 'custom-llm';
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
}

export type AgentListResponse = Array<AgentResponse>;

export interface AgentCreateParams {
  /**
   * The response engine to use for the agent.
   */
  response_engine: AgentCreateParams.ResponseEngineRetellLm | AgentCreateParams.ResponseEngineCustomLm;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in Dashboard.
   */
  voice_id: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

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
   * so it's recommended to expeirment before adding any words.
   */
  backchannel_words?: Array<string> | null;

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * If set to true, will format transcription to number, date, email, etc. If set to
   * false, will return transcripts in raw words. If not set, default value of true
   * will apply.
   */
  enable_transcription_formatting?: boolean;

  /**
   * If set to true, will detect whether the call enters a voicemail. Note that this
   * feature is only available for phone calls.
   */
  enable_voicemail_detection?: boolean;

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
   * multilingual support, currently this supports Spanish and English.
   */
  language?:
    | 'en-US'
    | 'en-IN'
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'es-419'
    | 'hi-IN'
    | 'ja-JP'
    | 'pt-PT'
    | 'pt-BR'
    | 'fr-FR'
    | 'zh-CN'
    | 'ru-RU'
    | 'it-IT'
    | 'ko-KR'
    | 'nl-NL'
    | 'pl-PL'
    | 'tr-TR'
    | 'vi-VN'
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
   * Whether this agent opts out of sensitive data storage like transcript,
   * recording, logging. These data can still be accessed securely via webhooks. If
   * not set, default value of false will apply.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * Post call analysis data to extract from the call. This data will augment the
   * pre-defined variables extracted in the call analysis. This will be available
   * after the call ends.
   */
  post_call_analysis_data?: Array<
    | AgentCreateParams.StringAnalysisData
    | AgentCreateParams.EnumAnalysisData
    | AgentCreateParams.BooleanAnalysisData
    | AgentCreateParams.NumberAnalysisData
  > | null;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Currently only supported for English &
   * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
   */
  pronunciation_dictionary?: Array<AgentCreateParams.PronunciationDictionary> | null;

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
   * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
   * means less responsive agent (wait more, respond slower), while higher value
   * means faster exchanges (respond when it can). If unset, default value 1 will
   * apply.
   */
  responsiveness?: number;

  /**
   * Optionally set the voice model used for the selected voice. Currently only
   * elevenlab voices have voice model selections. Set to null to remove voice model
   * selection, and default ones will apply. Supported voice models are:
   *
   * - `eleven_turbo_v2`: Fast english only model, supports pronunciation tags.
   *
   * - `eleven_turbo_v2_5`: Multilingual model with lowest latency.
   *
   * - `eleven_multilingual_v2`: Multilingual model with rich emotion and nice
   *   accent.
   */
  voice_model?: 'eleven_turbo_v2' | 'eleven_turbo_v2_5' | 'eleven_multilingual_v2' | null;

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
   * Configures when to stop running voicemail detection, as it becomes unlikely to
   * hit voicemail after a couple minutes, and keep running it will only have
   * negative impact. The minimum value allowed is 5,000 ms (5 s), and maximum value
   * allowed is 180,000 (3 minutes). By default, this is set to 30,000 (30 s).
   */
  voicemail_detection_timeout_ms?: number;

  /**
   * The message to be played when the call enters a voicemail. Note that this
   * feature is only available for phone calls. If you want to hangup after hitting
   * voicemail, set this to empty string.
   */
  voicemail_message?: string;

  /**
   * If set, will control the volume of the agent. Value ranging from [0,2]. Lower
   * value means quieter agent speech, while higher value means louder agent speech.
   * If unset, default value 1 will apply.
   */
  volume?: number;

  /**
   * The webhook for agent to listen to call events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace AgentCreateParams {
  export interface ResponseEngineRetellLm {
    /**
     * id of the Retell LLM to use.
     */
    llm_id: string;

    /**
     * type of the response engine.
     */
    type: 'retell-llm';
  }

  export interface ResponseEngineCustomLm {
    /**
     * LLM websocket url of the custom LLM.
     */
    llm_websocket_url: string;

    /**
     * type of the response engine.
     */
    type: 'custom-llm';
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
}

export interface AgentUpdateParams {
  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

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
   * so it's recommended to expeirment before adding any words.
   */
  backchannel_words?: Array<string> | null;

  /**
   * Provide a customized list of keywords to bias the transcriber model, so that
   * these words are more likely to get transcribed. Commonly used for names, brands,
   * street, etc.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Controls whether the agent would backchannel (agent interjects the speaker with
   * phrases like "yeah", "uh-huh" to signify interest and engagement). Backchannel
   * when enabled tends to show up more in longer user utterances. If not set, agent
   * will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * If set to true, will format transcription to number, date, email, etc. If set to
   * false, will return transcripts in raw words. If not set, default value of true
   * will apply.
   */
  enable_transcription_formatting?: boolean;

  /**
   * If set to true, will detect whether the call enters a voicemail. Note that this
   * feature is only available for phone calls.
   */
  enable_voicemail_detection?: boolean;

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
   * multilingual support, currently this supports Spanish and English.
   */
  language?:
    | 'en-US'
    | 'en-IN'
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'es-419'
    | 'hi-IN'
    | 'ja-JP'
    | 'pt-PT'
    | 'pt-BR'
    | 'fr-FR'
    | 'zh-CN'
    | 'ru-RU'
    | 'it-IT'
    | 'ko-KR'
    | 'nl-NL'
    | 'pl-PL'
    | 'tr-TR'
    | 'vi-VN'
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
   * Whether this agent opts out of sensitive data storage like transcript,
   * recording, logging. These data can still be accessed securely via webhooks. If
   * not set, default value of false will apply.
   */
  opt_out_sensitive_data_storage?: boolean;

  /**
   * Post call analysis data to extract from the call. This data will augment the
   * pre-defined variables extracted in the call analysis. This will be available
   * after the call ends.
   */
  post_call_analysis_data?: Array<
    | AgentUpdateParams.StringAnalysisData
    | AgentUpdateParams.EnumAnalysisData
    | AgentUpdateParams.BooleanAnalysisData
    | AgentUpdateParams.NumberAnalysisData
  > | null;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Currently only supported for English &
   * 11labs voices. Set to null to remove pronunciation dictionary from this agent.
   */
  pronunciation_dictionary?: Array<AgentUpdateParams.PronunciationDictionary> | null;

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
   * The response engine to use for the agent.
   */
  response_engine?: AgentUpdateParams.ResponseEngineRetellLm | AgentUpdateParams.ResponseEngineCustomLm;

  /**
   * Controls how responsive is the agent. Value ranging from [0,1]. Lower value
   * means less responsive agent (wait more, respond slower), while higher value
   * means faster exchanges (respond when it can). If unset, default value 1 will
   * apply.
   */
  responsiveness?: number;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in Dashboard.
   */
  voice_id?: string;

  /**
   * Optionally set the voice model used for the selected voice. Currently only
   * elevenlab voices have voice model selections. Set to null to remove voice model
   * selection, and default ones will apply. Supported voice models are:
   *
   * - `eleven_turbo_v2`: Fast english only model, supports pronunciation tags.
   *
   * - `eleven_turbo_v2_5`: Multilingual model with lowest latency.
   *
   * - `eleven_multilingual_v2`: Multilingual model with rich emotion and nice
   *   accent.
   */
  voice_model?: 'eleven_turbo_v2' | 'eleven_turbo_v2_5' | 'eleven_multilingual_v2' | null;

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
   * Configures when to stop running voicemail detection, as it becomes unlikely to
   * hit voicemail after a couple minutes, and keep running it will only have
   * negative impact. The minimum value allowed is 5,000 ms (5 s), and maximum value
   * allowed is 180,000 (3 minutes). By default, this is set to 30,000 (30 s).
   */
  voicemail_detection_timeout_ms?: number;

  /**
   * The message to be played when the call enters a voicemail. Note that this
   * feature is only available for phone calls. If you want to hangup after hitting
   * voicemail, set this to empty string.
   */
  voicemail_message?: string;

  /**
   * If set, will control the volume of the agent. Value ranging from [0,2]. Lower
   * value means quieter agent speech, while higher value means louder agent speech.
   * If unset, default value 1 will apply.
   */
  volume?: number;

  /**
   * The webhook for agent to listen to call events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace AgentUpdateParams {
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
     * id of the Retell LLM to use.
     */
    llm_id: string;

    /**
     * type of the response engine.
     */
    type: 'retell-llm';
  }

  export interface ResponseEngineCustomLm {
    /**
     * LLM websocket url of the custom LLM.
     */
    llm_websocket_url: string;

    /**
     * type of the response engine.
     */
    type: 'custom-llm';
  }
}

export declare namespace Agent {
  export {
    type AgentResponse as AgentResponse,
    type AgentListResponse as AgentListResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
  };
}
