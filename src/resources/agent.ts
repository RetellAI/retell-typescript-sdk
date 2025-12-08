// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Agent extends APIResource {
  /**
   * Create a new agent
   *
   * @example
   * ```ts
   * const agentResponse = await client.agent.create({
   *   response_engine: {
   *     llm_id: 'llm_234sdertfsdsfsdf',
   *     type: 'retell-llm',
   *   },
   *   voice_id: '11labs-Adrian',
   * });
   * ```
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<AgentResponse> {
    return this._client.post('/create-agent', { body, ...options });
  }

  /**
   * Retrieve details of a specific agent
   *
   * @example
   * ```ts
   * const agentResponse = await client.agent.retrieve(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  retrieve(
    agentId: string,
    query?: AgentRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentResponse>;
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentResponse>;
  retrieve(
    agentId: string,
    query: AgentRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentResponse> {
    if (isRequestOptions(query)) {
      return this.retrieve(agentId, {}, query);
    }
    return this._client.get(`/get-agent/${agentId}`, { query, ...options });
  }

  /**
   * Update an existing agent's latest draft version
   *
   * @example
   * ```ts
   * const agentResponse = await client.agent.update(
   *   '16b980523634a6dc504898cda492e939',
   *   { agent_name: 'Jarvis' },
   * );
   * ```
   */
  update(
    agentId: string,
    params: AgentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentResponse> {
    const { version, ...body } = params;
    return this._client.patch(`/update-agent/${agentId}`, { query: { version }, body, ...options });
  }

  /**
   * List all agents
   *
   * @example
   * ```ts
   * const agentResponses = await client.agent.list();
   * ```
   */
  list(query?: AgentListParams, options?: Core.RequestOptions): Core.APIPromise<AgentListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<AgentListResponse>;
  list(
    query: AgentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/list-agents', { query, ...options });
  }

  /**
   * Delete an existing agent
   *
   * @example
   * ```ts
   * await client.agent.delete(
   *   'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   * );
   * ```
   */
  delete(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-agent/${agentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get all versions of an agent
   *
   * @example
   * ```ts
   * const agentResponses = await client.agent.getVersions(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  getVersions(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentGetVersionsResponse> {
    return this._client.get(`/get-agent-versions/${agentId}`, options);
  }

  /**
   * Publish the latest version of the agent and create a new draft agent with newer
   * version.
   *
   * @example
   * ```ts
   * await client.agent.publish(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  publish(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/publish-agent/${agentId}`, {
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
   * The Response Engine to attach to the agent. It is used to generate responses for
   * the agent. You need to create a Response Engine first before attaching it to an
   * agent.
   */
  response_engine:
    | AgentResponse.ResponseEngineRetellLm
    | AgentResponse.ResponseEngineCustomLm
    | AgentResponse.ResponseEngineConversationFlow;

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
   * Whether the agent is published.
   */
  is_published?: boolean;

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
  pii_config?: AgentResponse.PiiConfig;

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

  user_dtmf_options?: AgentResponse.UserDtmfOptions | null;

  /**
   * Version of the agent.
   */
  version?: number;

  /**
   * If set, determines the vocabulary set to use for transcription. This setting
   * only applies for English agents, for non English agent, this setting is a no-op.
   * Default to general.
   */
  vocab_specialization?: 'general' | 'medical';

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
  voicemail_option?: AgentResponse.VoicemailOption | null;

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

export namespace AgentResponse {
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

export type AgentListResponse = Array<AgentResponse>;

export type AgentGetVersionsResponse = Array<AgentResponse>;

export interface AgentCreateParams {
  /**
   * The Response Engine to attach to the agent. It is used to generate responses for
   * the agent. You need to create a Response Engine first before attaching it to an
   * agent.
   */
  response_engine:
    | AgentCreateParams.ResponseEngineRetellLm
    | AgentCreateParams.ResponseEngineCustomLm
    | AgentCreateParams.ResponseEngineConversationFlow;

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
  pii_config?: AgentCreateParams.PiiConfig;

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

  user_dtmf_options?: AgentCreateParams.UserDtmfOptions | null;

  /**
   * If set, determines the vocabulary set to use for transcription. This setting
   * only applies for English agents, for non English agent, this setting is a no-op.
   * Default to general.
   */
  vocab_specialization?: 'general' | 'medical';

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
  voicemail_option?: AgentCreateParams.VoicemailOption | null;

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

export namespace AgentCreateParams {
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

export interface AgentRetrieveParams {
  /**
   * Optional version of the API to use for this request. If not provided, will
   * default to latest version.
   */
  version?: number;
}

export interface AgentUpdateParams {
  /**
   * Query param: Optional version of the API to use for this request. Default to
   * latest version.
   */
  version?: number;

  /**
   * Body param: The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * Body param: If set to true, DTMF input will be accepted and processed. If false,
   * any DTMF input will be ignored. Default to true.
   */
  allow_user_dtmf?: boolean;

  /**
   * Body param: If set, will add ambient environment sound to the call to make
   * experience more realistic. Currently supports the following options:
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
   * Body param: If set, will control the volume of the ambient sound. Value ranging
   * from [0,2]. Lower value means quieter ambient sound, while higher value means
   * louder ambient sound. If unset, default value 1 will apply.
   */
  ambient_sound_volume?: number;

  /**
   * Body param: Prompt to determine whether the post call or chat analysis should
   * mark the interaction as successful. Set to null to use the default prompt.
   */
  analysis_successful_prompt?: string | null;

  /**
   * Body param: Prompt to guide how the post call or chat analysis summary should be
   * generated. When unset, the default system prompt is used. Set to null to use the
   * default prompt.
   */
  analysis_summary_prompt?: string | null;

  /**
   * Body param: Only applicable when enable_backchannel is true. Controls how often
   * the agent would backchannel when a backchannel is possible. Value ranging from
   * [0,1]. Lower value means less frequent backchannel, while higher value means
   * more frequent backchannel. If unset, default value 0.8 will apply.
   */
  backchannel_frequency?: number;

  /**
   * Body param: Only applicable when enable_backchannel is true. A list of words
   * that the agent would use as backchannel. If not set, default backchannel words
   * will apply. Check out
   * [backchannel default words](/agent/interaction-configuration#backchannel) for
   * more details. Note that certain voices do not work too well with certain words,
   * so it's recommended to experiment before adding any words.
   */
  backchannel_words?: Array<string> | null;

  /**
   * Body param: If set, will delay the first message by the specified amount of
   * milliseconds, so that it gives user more time to prepare to take the call. Valid
   * range is [0, 5000]. If not set or set to 0, agent will speak immediately. Only
   * applicable when agent speaks first.
   */
  begin_message_delay_ms?: number;

  /**
   * Body param: Provide a customized list of keywords to bias the transcriber model,
   * so that these words are more likely to get transcribed. Commonly used for names,
   * brands, street, etc.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Body param: Granular setting to manage how Retell stores sensitive data
   * (transcripts, recordings, logs, etc.). This replaces the deprecated
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
   * Body param: If set, determines what denoising mode to use. Default to
   * noise-cancellation.
   */
  denoising_mode?: 'noise-cancellation' | 'noise-and-background-speech-cancellation';

  /**
   * Body param: Controls whether the agent would backchannel (agent interjects the
   * speaker with phrases like "yeah", "uh-huh" to signify interest and engagement).
   * Backchannel when enabled tends to show up more in longer user utterances. If not
   * set, agent will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Body param: If users stay silent for a period after agent speech, end the call.
   * The minimum value allowed is 10,000 ms (10 s). By default, this is set to 600000
   * (10 min).
   */
  end_call_after_silence_ms?: number;

  /**
   * Body param: When TTS provider for the selected voice is experiencing outages, we
   * would use fallback voices listed here for the agent. Voice id and the fallback
   * voice ids must be from different TTS providers. The system would go through the
   * list in order, if the first one in the list is also having outage, it would use
   * the next one. Set to null to remove voice fallback for the agent.
   */
  fallback_voice_ids?: Array<string> | null;

  /**
   * Body param: Controls how sensitive the agent is to user interruptions. Value
   * ranging from [0,1]. Lower value means it will take longer / more words for user
   * to interrupt agent, while higher value means it's easier for user to interrupt
   * agent. If unset, default value 1 will apply. When this is set to 0, agent would
   * never be interrupted.
   */
  interruption_sensitivity?: number;

  /**
   * Body param: Specifies what language (and dialect) the speech recognition will
   * operate in. For instance, selecting `en-GB` optimizes speech recognition for
   * British English. If unset, will use default value `en-US`. Select `multi` for
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
   * Body param: Maximum allowed length for the call, will force end the call if
   * reached. The minimum value allowed is 60,000 ms (1 min), and maximum value
   * allowed is 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
   */
  max_call_duration_ms?: number;

  /**
   * Body param: If set to true, will normalize the some part of text (number,
   * currency, date, etc) to spoken to its spoken form for more consistent speech
   * synthesis (sometimes the voice synthesize system itself might read these wrong
   * with the raw text). For example, it will convert "Call my number 2137112342 on
   * Jul 5th, 2024 for the $24.12 payment" to "Call my number two one three seven one
   * one two three four two on july fifth, twenty twenty four for the twenty four
   * dollars twelve cents payment" before starting audio generation.
   */
  normalize_for_speech?: boolean;

  /**
   * Body param: Whether this agent opts in for signed URLs for public logs and
   * recordings. When enabled, the generated URLs will include security signatures
   * that restrict access and automatically expire after 24 hours.
   */
  opt_in_signed_url?: boolean;

  /**
   * Body param: Configuration for PII scrubbing from transcripts and recordings.
   */
  pii_config?: AgentUpdateParams.PiiConfig;

  /**
   * Body param: Post call analysis data to extract from the call. This data will
   * augment the pre-defined variables extracted in the call analysis. This will be
   * available after the call ends.
   */
  post_call_analysis_data?: Array<
    | AgentUpdateParams.StringAnalysisData
    | AgentUpdateParams.EnumAnalysisData
    | AgentUpdateParams.BooleanAnalysisData
    | AgentUpdateParams.NumberAnalysisData
  > | null;

  /**
   * Body param: The model to use for post call analysis. Default to gpt-4.1-mini.
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
   * Body param: A list of words / phrases and their pronunciation to be used to
   * guide the audio synthesize for consistent pronunciation. Currently only
   * supported for English & 11labs voices. Set to null to remove pronunciation
   * dictionary from this agent.
   */
  pronunciation_dictionary?: Array<AgentUpdateParams.PronunciationDictionary> | null;

  /**
   * Body param: If set, controls how many times agent would remind user when user is
   * unresponsive. Must be a non negative integer. If unset, default value of 1 will
   * apply (remind once). Set to 0 to disable agent from reminding.
   */
  reminder_max_count?: number;

  /**
   * Body param: If set (in milliseconds), will trigger a reminder to the agent to
   * speak if the user has been silent for the specified duration after some agent
   * speech. Must be a positive number. If unset, default value of 10000 ms (10 s)
   * will apply.
   */
  reminder_trigger_ms?: number;

  /**
   * Body param: The Response Engine to attach to the agent. It is used to generate
   * responses for the agent. You need to create a Response Engine first before
   * attaching it to an agent.
   */
  response_engine?:
    | AgentUpdateParams.ResponseEngineRetellLm
    | AgentUpdateParams.ResponseEngineCustomLm
    | AgentUpdateParams.ResponseEngineConversationFlow;

  /**
   * Body param: Controls how responsive is the agent. Value ranging from [0,1].
   * Lower value means less responsive agent (wait more, respond slower), while
   * higher value means faster exchanges (respond when it can). If unset, default
   * value 1 will apply.
   */
  responsiveness?: number;

  /**
   * Body param: If set, the phone ringing will last for the specified amount of
   * milliseconds. This applies for both outbound call ringtime, and call transfer
   * ringtime. Default to 30000 (30 s). Valid range is [5000, 90000].
   */
  ring_duration_ms?: number;

  /**
   * Body param: The expiration time for the signed url in milliseconds. Only
   * applicable when opt_in_signed_url is true. If not set, default value of 86400000
   * (24 hours) will apply.
   */
  signed_url_expiration_ms?: number | null;

  /**
   * Body param: If set, determines whether speech to text should focus on latency or
   * accuracy. Default to fast mode.
   */
  stt_mode?: 'fast' | 'accurate';

  /**
   * Body param:
   */
  user_dtmf_options?: AgentUpdateParams.UserDtmfOptions | null;

  /**
   * Body param: If set, determines the vocabulary set to use for transcription. This
   * setting only applies for English agents, for non English agent, this setting is
   * a no-op. Default to general.
   */
  vocab_specialization?: 'general' | 'medical';

  /**
   * Body param: Unique voice id used for the agent. Find list of available voices
   * and their preview in Dashboard.
   */
  voice_id?: string;

  /**
   * Body param: Optionally set the voice model used for the selected voice.
   * Currently only elevenlab voices have voice model selections. Set to null to
   * remove voice model selection, and default ones will apply. Check out the
   * dashboard for details on each voice model.
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
   * Body param: Controls speed of voice. Value ranging from [0.5,2]. Lower value
   * means slower speech, while higher value means faster speech rate. If unset,
   * default value 1 will apply.
   */
  voice_speed?: number;

  /**
   * Body param: Controls how stable the voice is. Value ranging from [0,2]. Lower
   * value means more stable, and higher value means more variant speech generation.
   * Currently this setting only applies to `11labs` voices. If unset, default value
   * 1 will apply.
   */
  voice_temperature?: number;

  /**
   * Body param: If this option is set, the call will try to detect voicemail in the
   * first 3 minutes of the call. Actions defined (hangup, or leave a message) will
   * be applied when the voicemail is detected. Set this to null to disable voicemail
   * detection.
   */
  voicemail_option?: AgentUpdateParams.VoicemailOption | null;

  /**
   * Body param: If set, will control the volume of the agent. Value ranging from
   * [0,2]. Lower value means quieter agent speech, while higher value means louder
   * agent speech. If unset, default value 1 will apply.
   */
  volume?: number;

  /**
   * Body param: The timeout for the webhook in milliseconds. If not set, default
   * value of 10000 will apply.
   */
  webhook_timeout_ms?: number;

  /**
   * Body param: The webhook for agent to listen to call events. See what events it
   * would get at [webhook doc](/features/webhook). If set, will binds webhook events
   * for this agent to the specified url, and will ignore the account level webhook
   * for this agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace AgentUpdateParams {
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

export interface AgentListParams {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 1000, and the default is 1000.
   */
  limit?: number;

  /**
   * The pagination key to continue fetching the next page of agents. Pagination key
   * is represented by a agent id, pagination key and version pair is exclusive (not
   * included in the fetched page). If not set, will start from the beginning.
   */
  pagination_key?: string;

  /**
   * Specifies the version of the agent associated with the pagination_key. When
   * paginating, both the pagination_key and its version must be provided to ensure
   * consistent ordering and to fetch the next page correctly.
   */
  pagination_key_version?: number;
}

export declare namespace Agent {
  export {
    type AgentResponse as AgentResponse,
    type AgentListResponse as AgentListResponse,
    type AgentGetVersionsResponse as AgentGetVersionsResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentRetrieveParams as AgentRetrieveParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };
}
