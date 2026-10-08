// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ChatAgentAPI from './chat-agent';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
   *   voice_id: 'retell-Cimo',
   * });
   * ```
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentResponse> {
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
    agentID: string,
    query: AgentRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentResponse> {
    return this._client.get(path`/get-agent/${agentID}`, { query, ...options });
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
  update(agentID: string, params: AgentUpdateParams, options?: RequestOptions): APIPromise<AgentResponse> {
    const { version, ...body } = params;
    return this._client.patch(path`/update-agent/${agentID}`, { query: { version }, body, ...options });
  }

  /**
   * List unique agents with pagination.
   *
   * @example
   * ```ts
   * const agents = await client.agent.list({
   *   filter_criteria: {
   *     channel: {
   *       type: 'string',
   *       op: 'eq',
   *       value: 'voice',
   *     },
   *   },
   * });
   * ```
   */
  list(
    params: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListResponse> {
    const { limit, pagination_key, sort_order, ...body } = params ?? {};
    return this._client.post('/v2/list-agents', {
      query: { limit, pagination_key, sort_order },
      body,
      ...options,
    });
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
  delete(agentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-agent/${agentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Create a new draft agent version from a base version.
   *
   * @example
   * ```ts
   * const response = await client.agent.createVersion(
   *   'agent_xxx',
   *   { base_version: 12 },
   * );
   * ```
   */
  createVersion(
    agentID: string,
    body: AgentCreateVersionParams,
    options?: RequestOptions,
  ): APIPromise<AgentCreateVersionResponse> {
    return this._client.post(path`/create-agent-version/${agentID}`, { body, ...options });
  }

  /**
   * Delete a specific agent version.
   *
   * @example
   * ```ts
   * await client.agent.deleteVersion('agent_xxx', {
   *   version: 1,
   * });
   * ```
   */
  deleteVersion(
    agentID: string,
    params: AgentDeleteVersionParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { version } = params;
    return this._client.delete(path`/delete-agent-version/${agentID}`, {
      query: { version },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List stored versions of a voice or chat agent with pagination.
   *
   * @example
   * ```ts
   * const response = await client.agent.listVersions(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  listVersions(
    agentID: string,
    query: AgentListVersionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListVersionsResponse> {
    return this._client.get(path`/list-agent-versions/${agentID}`, { query, ...options });
  }

  /**
   * Publish an existing draft version in place.
   *
   * @example
   * ```ts
   * await client.agent.publish('agent_xxx', { version: 15 });
   * ```
   */
  publish(agentID: string, body: AgentPublishParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/publish-agent-version/${agentID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Remove references to resources that no longer exist in your workspace from an
   * agent draft version and its response engine — tools whose app connection has
   * been deleted, unknown knowledge bases, and deleted shared components — and remap
   * voices that are no longer accessible to a default voice. If the agent's response
   * engine version has been published, the engine is left untouched and only
   * agent-level references are repaired. Repairing an agent with nothing to fix is a
   * no-op.
   *
   * @example
   * ```ts
   * const response = await client.agent.repair(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  repair(
    agentID: string,
    params: AgentRepairParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentRepairResponse> {
    const { version } = params ?? {};
    return this._client.post(path`/repair-agent/${agentID}`, { query: { version }, ...options });
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
   * Version of the agent.
   */
  version: number;

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
   * Tags assigned to this agent version. Preferred tag is listed first.
   */
  assigned_tags?: Array<string>;

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
   * Version that this draft was based on. Null for initial versions.
   */
  base_version?: number | null;

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
  call_screening_option?: AgentResponse.CallScreeningOption | null;

  /**
   * Contact memory settings for phone calls and SMS chats. Creating an agent
   * defaults enable_update to false and enable_read to true. Updates only change the
   * supplied flags; omitted flags stay unchanged and an empty object has no effect.
   * Set a flag to false to disable it. The configuration cannot be cleared. Existing
   * agents without this configuration have both disabled.
   */
  contact_memory_config?: AgentResponse.ContactMemoryConfig;

  /**
   * Custom STT configuration. Only used when stt_mode is set to custom.
   */
  custom_stt_config?: AgentResponse.CustomSttConfig | null;

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
   * Controls the enhancement level for background voice cancellation. Set to 0 to
   * bypass background voice cancellation without BVC charges. Value ranging from
   * [0,1]. Only applicable when denoising_mode is
   * noise-and-background-speech-cancellation. Defaults to 0.8 if no value is
   * configured. Set to null to clear the configured value. Omitting this field
   * preserves the existing value.
   */
  denoising_enhancement_level?: number | null;

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
   * If set to true, the agent recognizes requests to stop calling or contacting the
   * user, confirms once, and on a clear yes ends the call with disconnection reason
   * user_requested_dnc and sets do_not_call to true on the contact for the user's
   * phone number. If unset, default value false will apply.
   */
  enable_dnc_detection?: boolean;

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
  guardrail_config?: AgentResponse.GuardrailConfig;

  /**
   * Toggle behavior presets on/off to influence agent response style and behaviors.
   */
  handbook_config?: AgentResponse.HandbookConfig;

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
   * If this option is set, the call will try to detect IVR in the first 3 minutes of
   * the call. Actions defined will be applied when the IVR is detected. Set this to
   * null to disable IVR detection.
   */
  ivr_option?: AgentResponse.IvrOption | null;

  /**
   * Specifies what language(s) the agent will operate in. Accepts either a single
   * locale (e.g. `en-US`) or an array of locales for multilingual agents (e.g.
   * `["en-US","es-ES"]`). The scalar value `multi` is deprecated but still accepted
   * as a scalar, and is stored and returned as the ten locales it used to mean. It
   * must not appear inside the array form. Send an explicit locale array instead. If
   * unset, defaults to `en-US`.
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
    | AgentResponse.CallPresetAnalysisData
  > | null;

  /**
   * The model to use for post call analysis. Default to gpt-5.6-terra.
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
    | 'gpt-5.6-terra'
    | 'gpt-5.6-luna'
    | 'gpt-6-astra'
    | 'gpt-6-sol'
    | 'gpt-6.1-sol'
    | 'gpt-6-luna'
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-5-opus'
    | 'claude-5.5-opus'
    | 'claude-5-sonnet'
    | 'claude-5.5-sonnet'
    | 'claude-5.5-haiku'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite'
    | 'gemini-3.5-flash'
    | 'gemini-3.5-flash-lite'
    | 'gemini-3.6-flash'
    | 'gemini-3.7-flash'
    | 'gemini-3.8-flash'
    | null;

  /**
   * Integration (Agent Functions) tools run as a dependency graph during teardown,
   * after post-call analysis. Each tool can be gated by a condition. On calls the
   * graph is stopped after five minutes so teardown can finish. Set to null to
   * clear.
   */
  post_session_tools?: Array<
    AgentResponse.AppTool | AgentResponse.CustomTool | AgentResponse.CodeTool | AgentResponse.SendSMSTool
  > | null;

  /**
   * Integration (Agent Functions) tools run as a dependency graph during session
   * setup, before the agent's first message. Outputs are injected as dynamic
   * variables. On calls the graph gets one minute unless an outbound caller will be
   * dialed after setup, in which case it gets five minutes. Past that session
   * initialization continues and any remaining tools finish in the background, so
   * their outputs no longer reach the agent's prompt. Set to null to clear.
   */
  pre_session_tools?: Array<AgentResponse.AppTool | AgentResponse.CustomTool | AgentResponse.CodeTool> | null;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Check the dashboard to see what
   * provider supports this feature. Set to null to remove pronunciation dictionary
   * from this agent.
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

  user_dtmf_options?: AgentResponse.UserDtmfOptions | null;

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
   * Select the voice model used for the selected voice. Each provider has a set of
   * available voice models. Set to null to remove voice model selection, and default
   * ones will apply. Check out dashboard for more details of each voice model.
   */
  voice_model?:
    | 'eleven_flash_v2'
    | 'eleven_flash_v2_5'
    | 'eleven_multilingual_v2'
    | 'eleven_v3'
    | 'eleven_v3_conversational'
    | 'eleven_v4'
    | 'eleven_v4_turbo'
    | 'sonic-3'
    | 'sonic-3-latest'
    | 'sonic-3.5'
    | 'sonic-3.6'
    | 'tts-1'
    | 'gpt-4o-mini-tts'
    | 'speech-02-turbo'
    | 'speech-2.8-turbo'
    | 's1'
    | 's2-pro'
    | 's2.1-pro'
    | 'inworld-tts-2'
    | 'inworld-tts-2-flash'
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
  voicemail_option?: AgentResponse.VoicemailOption | null;

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
   * Contact memory settings for phone calls and SMS chats. Creating an agent
   * defaults enable_update to false and enable_read to true. Updates only change the
   * supplied flags; omitted flags stay unchanged and an empty object has no effect.
   * Set a flag to false to disable it. The configuration cannot be cleared. Existing
   * agents without this configuration have both disabled.
   */
  export interface ContactMemoryConfig {
    /**
     * Automatically add saved contact memory to the agent prompt. Skippable nodes can
     * use answers from the current conversation even when this setting is disabled.
     * Contact dynamic variables, including contact_memory, remain available regardless
     * of this setting.
     */
    enable_read?: boolean;

    /**
     * Rewrite the contact memory after each conversation. Requires storing
     * conversation data. Chat agents must also have end_chat_after_silence_ms set.
     */
    enable_update?: boolean;
  }

  /**
   * Custom STT configuration. Only used when stt_mode is set to custom.
   */
  export interface CustomSttConfig {
    /**
     * Endpointing timeout in milliseconds. Minimum is 100 for Azure, 10 for Deepgram,
     * 500 for Soniox, 100 for AssemblyAI, 100 for Muse. For AssemblyAI, this sets
     * min_turn_silence (100-3000 ms). max_turn_silence adds half of this value,
     * rounded to the nearest millisecond and bounded to 500-1000 ms, with a total cap
     * of 3000 ms. Muse detects turn ends itself and ignores this value.
     */
    endpointing_ms: number;

    /**
     * ASR provider name.
     */
    provider: 'azure' | 'deepgram' | 'soniox' | 'assemblyai' | 'muse';
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

  export interface AppTool {
    /**
     * The connection (App) this tool runs against. Must be a connection in the
     * organization whose provider matches this tool's provider.
     */
    app_id: string;

    /**
     * Name of the catalog template within the provider, as listed by
     * list-app-templates.
     */
    app_tool_template_name: string;

    /**
     * Name of the tool. Must be unique within the phase's tools; referenced by
     * depends_on. Must be consisted of a-z, A-Z, 0-9, or contain underscores and
     * dashes, with a maximum length of 64 (no space allowed).
     */
    name: string;

    /**
     * Provider of the connection. Must match the connection's provider; supported
     * providers are listed by list-app-templates.
     */
    provider: string;

    type: 'integration_app';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: AppTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Overrides the catalog template's LLM-facing description.
     */
    description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, play a typing sound on the agent audio track while this
     * tool is executing. Useful when the tool takes a noticeable amount of time to
     * prevent silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. The message for the agent to speak when executing the tool. Only
     * applicable when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * What the agent and the transcript see of the tool's response. Omit to send the
     * full response. Does not affect response_variables, which are always extracted
     * from the raw response.
     */
    output_selection?: AppTool.UnionMember0 | AppTool.UnionMember1;

    /**
     * The resolved input parameters, in order. Properties may pin a value with const
     * (including {{variable}} references) or provide a description for LLM inference.
     * Each property may also record selected*input_mode, the editor mode the user
     * selected ("const_enum", "const_boolean", "const_value", "description_custom", or
     * "description_preset"); it is stored and returned as-is, used only by the tool
     * config UI. Omit the key when no mode is recorded; when set, const*_ modes
     * require a non-empty const, and description\__ modes must omit const entirely.
     * Each parameter's required list must match the schema returned by the
     * corresponding step of the get-app-tool-schema loop.
     */
    parameters?: Array<AppTool.Parameter>;

    /**
     * Mapping of a dynamic-variable name to the response field (dot-path) it is
     * populated from. Missing paths are ignored.
     */
    response_variables?: { [key: string]: string };

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Determines whether the agent would call LLM another time and speak
     * when the result of the tool is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, will speak during execution.
     */
    speak_during_execution?: boolean;
  }

  export namespace AppTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }

    export interface UnionMember0 {
      mode: 'all';

      /**
       * Not used at runtime; stored and returned as-is for the UI.
       */
      fields?: Array<string>;
    }

    export interface UnionMember1 {
      /**
       * The only response fields the agent and the transcript see, as dot-paths into the
       * response schema returned by get-app-tool-schema. Everything else is dropped.
       * Selecting a parent keeps its whole subtree. A plain segment traverses arrays
       * element-wise (deals.properties.amount keeps that field on every deal), while
       * key[n] selects one element (deals[0].id keeps only the first deal's id); paths
       * that match nothing contribute nothing.
       */
      fields: Array<string>;

      mode: 'subset';
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameter {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CustomTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * If set to true, the parameters will be passed as root level JSON object instead
     * of nested under "args".
     */
    args_at_root?: boolean;

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: CustomTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing. Useful when the tool takes a noticeable amount of time to prevent
     * silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Maximum number of times to retry the request after a failed attempt, from 0 (no
     * retry) to 5. Retries happen on any failure, with exponential backoff between
     * attempts; the backoff delay is not configurable. `timeout_ms` applies per
     * attempt rather than as a budget across all attempts, so an attempt that times
     * out is still retried and the worst-case total duration is `timeout_ms`
     * multiplied by (`max_retry` + 1) as well as any latency incurred by the
     * exponential backoff + jitter between each retry. Only the final attempt's result
     * is reported to the agent. Because retries repeat the request, only set this
     * above 0 if your endpoint is idempotent — a retried request may be processed more
     * than once. Defaults to 0 (no retry).
     */
    max_retry?: number;

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * How the tool's `parameters` are authored and shown in the dashboard editor —
     * "form" for the visual parameter builder, "json" for a raw JSON Schema. Both
     * produce the same `parameters` schema; this does not change how the request body
     * is encoded (see `args_at_root`).
     */
    parameter_type?: 'json' | 'form';

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

    /**
     * Query parameters to append to the request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * A mapping of variable names to JSON paths in the response body. These values
     * will be extracted from the response and made available as dynamic variables for
     * use.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the tool can run before it's considered
     * timeout. If the tool times out, the agent would have that info. The minimum
     * value allowed is 1000 ms (1 s), and maximum value allowed is 600,000 ms (10
     * min). By default, this is set to 120,000 ms (2 min).
     */
    timeout_ms?: number;
  }

  export namespace CustomTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameters {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CodeTool {
    /**
     * JavaScript code to execute in the sandbox.
     */
    code: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'code';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: CodeTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * A mapping of variable names to JSON paths in the code execution result. These
     * mapped values will be extracted and added as dynamic variables.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the tool.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the code can run before it's considered
     * timeout. Defaults to 30,000 ms (30 s).
     */
    timeout_ms?: number;
  }

  export namespace CodeTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }
  }

  export interface SendSMSTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    sms_content:
      | SendSMSTool.SMSContentPredefined
      | SendSMSTool.SMSContentInferred
      | SendSMSTool.SMSContentTemplate;

    type: 'send_sms';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: SendSMSTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Describes what to say before sending the SMS. Only applicable when
     * speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * If true, the agent will speak a short line before sending the SMS. If omitted,
     * defaults to true (same as end_call / transfer_call tools).
     */
    speak_during_execution?: boolean;
  }

  export namespace SendSMSTool {
    export interface SMSContentPredefined {
      /**
       * The static message to be sent in the SMS. Can contain dynamic variables.
       */
      text?: string;

      type?: 'predefined';
    }

    export interface SMSContentInferred {
      /**
       * The prompt to be used to help infer the SMS content. The model will take the
       * global prompt, the call transcript, and this prompt together to deduce the right
       * message to send. Can contain dynamic variables.
       */
      prompt?: string;

      type?: 'inferred';
    }

    export interface SMSContentTemplate {
      /**
       * The template to use for the SMS content. "info_collection" sends a predefined
       * message requesting information from the user.
       */
      template: 'info_collection';

      type: 'template';
    }

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }
  }

  export interface AppTool {
    /**
     * The connection (App) this tool runs against. Must be a connection in the
     * organization whose provider matches this tool's provider.
     */
    app_id: string;

    /**
     * Name of the catalog template within the provider, as listed by
     * list-app-templates.
     */
    app_tool_template_name: string;

    /**
     * Name of the tool. Must be unique within the phase's tools; referenced by
     * depends_on. Must be consisted of a-z, A-Z, 0-9, or contain underscores and
     * dashes, with a maximum length of 64 (no space allowed).
     */
    name: string;

    /**
     * Provider of the connection. Must match the connection's provider; supported
     * providers are listed by list-app-templates.
     */
    provider: string;

    type: 'integration_app';

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Overrides the catalog template's LLM-facing description.
     */
    description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, play a typing sound on the agent audio track while this
     * tool is executing. Useful when the tool takes a noticeable amount of time to
     * prevent silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. The message for the agent to speak when executing the tool. Only
     * applicable when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * What the agent and the transcript see of the tool's response. Omit to send the
     * full response. Does not affect response_variables, which are always extracted
     * from the raw response.
     */
    output_selection?: AppTool.UnionMember0 | AppTool.UnionMember1;

    /**
     * The resolved input parameters, in order. Properties may pin a value with const
     * (including {{variable}} references) or provide a description for LLM inference.
     * Each property may also record selected*input_mode, the editor mode the user
     * selected ("const_enum", "const_boolean", "const_value", "description_custom", or
     * "description_preset"); it is stored and returned as-is, used only by the tool
     * config UI. Omit the key when no mode is recorded; when set, const*_ modes
     * require a non-empty const, and description\__ modes must omit const entirely.
     * Each parameter's required list must match the schema returned by the
     * corresponding step of the get-app-tool-schema loop.
     */
    parameters?: Array<AppTool.Parameter>;

    /**
     * Mapping of a dynamic-variable name to the response field (dot-path) it is
     * populated from. Missing paths are ignored.
     */
    response_variables?: { [key: string]: string };

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Determines whether the agent would call LLM another time and speak
     * when the result of the tool is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, will speak during execution.
     */
    speak_during_execution?: boolean;
  }

  export namespace AppTool {
    export interface UnionMember0 {
      mode: 'all';

      /**
       * Not used at runtime; stored and returned as-is for the UI.
       */
      fields?: Array<string>;
    }

    export interface UnionMember1 {
      /**
       * The only response fields the agent and the transcript see, as dot-paths into the
       * response schema returned by get-app-tool-schema. Everything else is dropped.
       * Selecting a parent keeps its whole subtree. A plain segment traverses arrays
       * element-wise (deals.properties.amount keeps that field on every deal), while
       * key[n] selects one element (deals[0].id keeps only the first deal's id); paths
       * that match nothing contribute nothing.
       */
      fields: Array<string>;

      mode: 'subset';
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameter {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CustomTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * If set to true, the parameters will be passed as root level JSON object instead
     * of nested under "args".
     */
    args_at_root?: boolean;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing. Useful when the tool takes a noticeable amount of time to prevent
     * silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Maximum number of times to retry the request after a failed attempt, from 0 (no
     * retry) to 5. Retries happen on any failure, with exponential backoff between
     * attempts; the backoff delay is not configurable. `timeout_ms` applies per
     * attempt rather than as a budget across all attempts, so an attempt that times
     * out is still retried and the worst-case total duration is `timeout_ms`
     * multiplied by (`max_retry` + 1) as well as any latency incurred by the
     * exponential backoff + jitter between each retry. Only the final attempt's result
     * is reported to the agent. Because retries repeat the request, only set this
     * above 0 if your endpoint is idempotent — a retried request may be processed more
     * than once. Defaults to 0 (no retry).
     */
    max_retry?: number;

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * How the tool's `parameters` are authored and shown in the dashboard editor —
     * "form" for the visual parameter builder, "json" for a raw JSON Schema. Both
     * produce the same `parameters` schema; this does not change how the request body
     * is encoded (see `args_at_root`).
     */
    parameter_type?: 'json' | 'form';

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

    /**
     * Query parameters to append to the request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * A mapping of variable names to JSON paths in the response body. These values
     * will be extracted from the response and made available as dynamic variables for
     * use.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the tool can run before it's considered
     * timeout. If the tool times out, the agent would have that info. The minimum
     * value allowed is 1000 ms (1 s), and maximum value allowed is 600,000 ms (10
     * min). By default, this is set to 120,000 ms (2 min).
     */
    timeout_ms?: number;
  }

  export namespace CustomTool {
    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameters {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CodeTool {
    /**
     * JavaScript code to execute in the sandbox.
     */
    code: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'code';

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * A mapping of variable names to JSON paths in the code execution result. These
     * mapped values will be extracted and added as dynamic variables.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the tool.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the code can run before it's considered
     * timeout. Defaults to 30,000 ms (30 s).
     */
    timeout_ms?: number;
  }

  export interface PronunciationDictionary {
    /**
     * The phonetic alphabet to use. MiniMax speech-02-turbo supports IPA and Pinyin.
     * MiniMax speech-2.8-turbo also supports Jyutping. Support for other alphabets
     * depends on the selected voice provider and model.
     */
    alphabet: 'ipa' | 'cmu' | 'pinyin' | 'jyutping';

    /**
     * Pronunciation of the word in the format of the selected phonetic alphabet.
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

export interface AgentListResponse {
  /**
   * Whether more results are available.
   */
  has_more: boolean;

  items: Array<AgentListResponse.Item>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export namespace AgentListResponse {
  export interface Item {
    /**
     * Unique id of agent.
     */
    agent_id: string;

    /**
     * The name of the agent. Only used for your own reference.
     */
    agent_name: string;

    channel: 'voice' | 'chat';

    /**
     * Authoritative root tags for this agent, keyed by tag name.
     */
    tags: { [key: string]: Item.Tags };

    /**
     * User modification timestamp (milliseconds since epoch). Either the time of last
     * update or creation if no updates available.
     */
    user_modified_timestamp: number;
  }

  export namespace Item {
    export interface Tags {
      dynamic_variables?: { [key: string]: string };

      version?: number;
    }
  }
}

export type AgentCreateVersionResponse = AgentResponse | ChatAgentAPI.ChatAgentResponse;

export interface AgentListVersionsResponse {
  /**
   * Whether more results are available.
   */
  has_more: boolean;

  items: Array<AgentListVersionsResponse.Item>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export namespace AgentListVersionsResponse {
  export interface Item {
    /**
     * Whether the agent version is published.
     */
    is_published: boolean;

    /**
     * Last modification timestamp in milliseconds since epoch.
     */
    last_modification_timestamp: number;

    /**
     * Version number of the agent.
     */
    version: number;

    /**
     * Version that this agent version was based on.
     */
    base_version?: number;

    /**
     * Optional description of the agent version.
     */
    version_description?: string;

    /**
     * Optional title of the agent version.
     */
    version_title?: string;
  }
}

export type AgentRepairResponse = AgentResponse | ChatAgentAPI.ChatAgentResponse;

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
  call_screening_option?: AgentCreateParams.CallScreeningOption | null;

  /**
   * Contact memory settings for phone calls and SMS chats. Creating an agent
   * defaults enable_update to false and enable_read to true. Updates only change the
   * supplied flags; omitted flags stay unchanged and an empty object has no effect.
   * Set a flag to false to disable it. The configuration cannot be cleared. Existing
   * agents without this configuration have both disabled.
   */
  contact_memory_config?: AgentCreateParams.ContactMemoryConfig;

  /**
   * Custom STT configuration. Only used when stt_mode is set to custom.
   */
  custom_stt_config?: AgentCreateParams.CustomSttConfig | null;

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
   * Controls the enhancement level for background voice cancellation. Set to 0 to
   * bypass background voice cancellation without BVC charges. Value ranging from
   * [0,1]. Only applicable when denoising_mode is
   * noise-and-background-speech-cancellation. Defaults to 0.8 if no value is
   * configured. Set to null to clear the configured value. Omitting this field
   * preserves the existing value.
   */
  denoising_enhancement_level?: number | null;

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
   * If set to true, the agent recognizes requests to stop calling or contacting the
   * user, confirms once, and on a clear yes ends the call with disconnection reason
   * user_requested_dnc and sets do_not_call to true on the contact for the user's
   * phone number. If unset, default value false will apply.
   */
  enable_dnc_detection?: boolean;

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
  guardrail_config?: AgentCreateParams.GuardrailConfig;

  /**
   * Toggle behavior presets on/off to influence agent response style and behaviors.
   */
  handbook_config?: AgentCreateParams.HandbookConfig;

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
  ivr_option?: AgentCreateParams.IvrOption | null;

  /**
   * Specifies what language(s) the agent will operate in. Accepts either a single
   * locale (e.g. `en-US`) or an array of locales for multilingual agents (e.g.
   * `["en-US","es-ES"]`). The scalar value `multi` is deprecated but still accepted
   * as a scalar, and is stored and returned as the ten locales it used to mean. It
   * must not appear inside the array form. Send an explicit locale array instead. If
   * unset, defaults to `en-US`.
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
    | AgentCreateParams.CallPresetAnalysisData
  > | null;

  /**
   * The model to use for post call analysis. Default to gpt-5.6-terra.
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
    | 'gpt-5.6-terra'
    | 'gpt-5.6-luna'
    | 'gpt-6-astra'
    | 'gpt-6-sol'
    | 'gpt-6.1-sol'
    | 'gpt-6-luna'
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-5-opus'
    | 'claude-5.5-opus'
    | 'claude-5-sonnet'
    | 'claude-5.5-sonnet'
    | 'claude-5.5-haiku'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite'
    | 'gemini-3.5-flash'
    | 'gemini-3.5-flash-lite'
    | 'gemini-3.6-flash'
    | 'gemini-3.7-flash'
    | 'gemini-3.8-flash'
    | null;

  /**
   * Integration (Agent Functions) tools run as a dependency graph during teardown,
   * after post-call analysis. Each tool can be gated by a condition. On calls the
   * graph is stopped after five minutes so teardown can finish. Set to null to
   * clear.
   */
  post_session_tools?: Array<
    | AgentCreateParams.AppTool
    | AgentCreateParams.CustomTool
    | AgentCreateParams.CodeTool
    | AgentCreateParams.SendSMSTool
  > | null;

  /**
   * Integration (Agent Functions) tools run as a dependency graph during session
   * setup, before the agent's first message. Outputs are injected as dynamic
   * variables. On calls the graph gets one minute unless an outbound caller will be
   * dialed after setup, in which case it gets five minutes. Past that session
   * initialization continues and any remaining tools finish in the background, so
   * their outputs no longer reach the agent's prompt. Set to null to clear.
   */
  pre_session_tools?: Array<
    AgentCreateParams.AppTool | AgentCreateParams.CustomTool | AgentCreateParams.CodeTool
  > | null;

  /**
   * A list of words / phrases and their pronunciation to be used to guide the audio
   * synthesize for consistent pronunciation. Check the dashboard to see what
   * provider supports this feature. Set to null to remove pronunciation dictionary
   * from this agent.
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

  user_dtmf_options?: AgentCreateParams.UserDtmfOptions | null;

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
   * Select the voice model used for the selected voice. Each provider has a set of
   * available voice models. Set to null to remove voice model selection, and default
   * ones will apply. Check out dashboard for more details of each voice model.
   */
  voice_model?:
    | 'eleven_flash_v2'
    | 'eleven_flash_v2_5'
    | 'eleven_multilingual_v2'
    | 'eleven_v3'
    | 'eleven_v3_conversational'
    | 'eleven_v4'
    | 'eleven_v4_turbo'
    | 'sonic-3'
    | 'sonic-3-latest'
    | 'sonic-3.5'
    | 'sonic-3.6'
    | 'tts-1'
    | 'gpt-4o-mini-tts'
    | 'speech-02-turbo'
    | 'speech-2.8-turbo'
    | 's1'
    | 's2-pro'
    | 's2.1-pro'
    | 'inworld-tts-2'
    | 'inworld-tts-2-flash'
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
  voicemail_option?: AgentCreateParams.VoicemailOption | null;

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
   * Contact memory settings for phone calls and SMS chats. Creating an agent
   * defaults enable_update to false and enable_read to true. Updates only change the
   * supplied flags; omitted flags stay unchanged and an empty object has no effect.
   * Set a flag to false to disable it. The configuration cannot be cleared. Existing
   * agents without this configuration have both disabled.
   */
  export interface ContactMemoryConfig {
    /**
     * Automatically add saved contact memory to the agent prompt. Skippable nodes can
     * use answers from the current conversation even when this setting is disabled.
     * Contact dynamic variables, including contact_memory, remain available regardless
     * of this setting.
     */
    enable_read?: boolean;

    /**
     * Rewrite the contact memory after each conversation. Requires storing
     * conversation data. Chat agents must also have end_chat_after_silence_ms set.
     */
    enable_update?: boolean;
  }

  /**
   * Custom STT configuration. Only used when stt_mode is set to custom.
   */
  export interface CustomSttConfig {
    /**
     * Endpointing timeout in milliseconds. Minimum is 100 for Azure, 10 for Deepgram,
     * 500 for Soniox, 100 for AssemblyAI, 100 for Muse. For AssemblyAI, this sets
     * min_turn_silence (100-3000 ms). max_turn_silence adds half of this value,
     * rounded to the nearest millisecond and bounded to 500-1000 ms, with a total cap
     * of 3000 ms. Muse detects turn ends itself and ignores this value.
     */
    endpointing_ms: number;

    /**
     * ASR provider name.
     */
    provider: 'azure' | 'deepgram' | 'soniox' | 'assemblyai' | 'muse';
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

  export interface AppTool {
    /**
     * The connection (App) this tool runs against. Must be a connection in the
     * organization whose provider matches this tool's provider.
     */
    app_id: string;

    /**
     * Name of the catalog template within the provider, as listed by
     * list-app-templates.
     */
    app_tool_template_name: string;

    /**
     * Name of the tool. Must be unique within the phase's tools; referenced by
     * depends_on. Must be consisted of a-z, A-Z, 0-9, or contain underscores and
     * dashes, with a maximum length of 64 (no space allowed).
     */
    name: string;

    /**
     * Provider of the connection. Must match the connection's provider; supported
     * providers are listed by list-app-templates.
     */
    provider: string;

    type: 'integration_app';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: AppTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Overrides the catalog template's LLM-facing description.
     */
    description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, play a typing sound on the agent audio track while this
     * tool is executing. Useful when the tool takes a noticeable amount of time to
     * prevent silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. The message for the agent to speak when executing the tool. Only
     * applicable when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * What the agent and the transcript see of the tool's response. Omit to send the
     * full response. Does not affect response_variables, which are always extracted
     * from the raw response.
     */
    output_selection?: AppTool.UnionMember0 | AppTool.UnionMember1;

    /**
     * The resolved input parameters, in order. Properties may pin a value with const
     * (including {{variable}} references) or provide a description for LLM inference.
     * Each property may also record selected*input_mode, the editor mode the user
     * selected ("const_enum", "const_boolean", "const_value", "description_custom", or
     * "description_preset"); it is stored and returned as-is, used only by the tool
     * config UI. Omit the key when no mode is recorded; when set, const*_ modes
     * require a non-empty const, and description\__ modes must omit const entirely.
     * Each parameter's required list must match the schema returned by the
     * corresponding step of the get-app-tool-schema loop.
     */
    parameters?: Array<AppTool.Parameter>;

    /**
     * Mapping of a dynamic-variable name to the response field (dot-path) it is
     * populated from. Missing paths are ignored.
     */
    response_variables?: { [key: string]: string };

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Determines whether the agent would call LLM another time and speak
     * when the result of the tool is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, will speak during execution.
     */
    speak_during_execution?: boolean;
  }

  export namespace AppTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }

    export interface UnionMember0 {
      mode: 'all';

      /**
       * Not used at runtime; stored and returned as-is for the UI.
       */
      fields?: Array<string>;
    }

    export interface UnionMember1 {
      /**
       * The only response fields the agent and the transcript see, as dot-paths into the
       * response schema returned by get-app-tool-schema. Everything else is dropped.
       * Selecting a parent keeps its whole subtree. A plain segment traverses arrays
       * element-wise (deals.properties.amount keeps that field on every deal), while
       * key[n] selects one element (deals[0].id keeps only the first deal's id); paths
       * that match nothing contribute nothing.
       */
      fields: Array<string>;

      mode: 'subset';
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameter {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CustomTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * If set to true, the parameters will be passed as root level JSON object instead
     * of nested under "args".
     */
    args_at_root?: boolean;

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: CustomTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing. Useful when the tool takes a noticeable amount of time to prevent
     * silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Maximum number of times to retry the request after a failed attempt, from 0 (no
     * retry) to 5. Retries happen on any failure, with exponential backoff between
     * attempts; the backoff delay is not configurable. `timeout_ms` applies per
     * attempt rather than as a budget across all attempts, so an attempt that times
     * out is still retried and the worst-case total duration is `timeout_ms`
     * multiplied by (`max_retry` + 1) as well as any latency incurred by the
     * exponential backoff + jitter between each retry. Only the final attempt's result
     * is reported to the agent. Because retries repeat the request, only set this
     * above 0 if your endpoint is idempotent — a retried request may be processed more
     * than once. Defaults to 0 (no retry).
     */
    max_retry?: number;

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * How the tool's `parameters` are authored and shown in the dashboard editor —
     * "form" for the visual parameter builder, "json" for a raw JSON Schema. Both
     * produce the same `parameters` schema; this does not change how the request body
     * is encoded (see `args_at_root`).
     */
    parameter_type?: 'json' | 'form';

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

    /**
     * Query parameters to append to the request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * A mapping of variable names to JSON paths in the response body. These values
     * will be extracted from the response and made available as dynamic variables for
     * use.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the tool can run before it's considered
     * timeout. If the tool times out, the agent would have that info. The minimum
     * value allowed is 1000 ms (1 s), and maximum value allowed is 600,000 ms (10
     * min). By default, this is set to 120,000 ms (2 min).
     */
    timeout_ms?: number;
  }

  export namespace CustomTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameters {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CodeTool {
    /**
     * JavaScript code to execute in the sandbox.
     */
    code: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'code';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: CodeTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * A mapping of variable names to JSON paths in the code execution result. These
     * mapped values will be extracted and added as dynamic variables.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the tool.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the code can run before it's considered
     * timeout. Defaults to 30,000 ms (30 s).
     */
    timeout_ms?: number;
  }

  export namespace CodeTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }
  }

  export interface SendSMSTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    sms_content:
      | SendSMSTool.SMSContentPredefined
      | SendSMSTool.SMSContentInferred
      | SendSMSTool.SMSContentTemplate;

    type: 'send_sms';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: SendSMSTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Describes what to say before sending the SMS. Only applicable when
     * speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * If true, the agent will speak a short line before sending the SMS. If omitted,
     * defaults to true (same as end_call / transfer_call tools).
     */
    speak_during_execution?: boolean;
  }

  export namespace SendSMSTool {
    export interface SMSContentPredefined {
      /**
       * The static message to be sent in the SMS. Can contain dynamic variables.
       */
      text?: string;

      type?: 'predefined';
    }

    export interface SMSContentInferred {
      /**
       * The prompt to be used to help infer the SMS content. The model will take the
       * global prompt, the call transcript, and this prompt together to deduce the right
       * message to send. Can contain dynamic variables.
       */
      prompt?: string;

      type?: 'inferred';
    }

    export interface SMSContentTemplate {
      /**
       * The template to use for the SMS content. "info_collection" sends a predefined
       * message requesting information from the user.
       */
      template: 'info_collection';

      type: 'template';
    }

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }
  }

  export interface AppTool {
    /**
     * The connection (App) this tool runs against. Must be a connection in the
     * organization whose provider matches this tool's provider.
     */
    app_id: string;

    /**
     * Name of the catalog template within the provider, as listed by
     * list-app-templates.
     */
    app_tool_template_name: string;

    /**
     * Name of the tool. Must be unique within the phase's tools; referenced by
     * depends_on. Must be consisted of a-z, A-Z, 0-9, or contain underscores and
     * dashes, with a maximum length of 64 (no space allowed).
     */
    name: string;

    /**
     * Provider of the connection. Must match the connection's provider; supported
     * providers are listed by list-app-templates.
     */
    provider: string;

    type: 'integration_app';

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Overrides the catalog template's LLM-facing description.
     */
    description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, play a typing sound on the agent audio track while this
     * tool is executing. Useful when the tool takes a noticeable amount of time to
     * prevent silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. The message for the agent to speak when executing the tool. Only
     * applicable when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * What the agent and the transcript see of the tool's response. Omit to send the
     * full response. Does not affect response_variables, which are always extracted
     * from the raw response.
     */
    output_selection?: AppTool.UnionMember0 | AppTool.UnionMember1;

    /**
     * The resolved input parameters, in order. Properties may pin a value with const
     * (including {{variable}} references) or provide a description for LLM inference.
     * Each property may also record selected*input_mode, the editor mode the user
     * selected ("const_enum", "const_boolean", "const_value", "description_custom", or
     * "description_preset"); it is stored and returned as-is, used only by the tool
     * config UI. Omit the key when no mode is recorded; when set, const*_ modes
     * require a non-empty const, and description\__ modes must omit const entirely.
     * Each parameter's required list must match the schema returned by the
     * corresponding step of the get-app-tool-schema loop.
     */
    parameters?: Array<AppTool.Parameter>;

    /**
     * Mapping of a dynamic-variable name to the response field (dot-path) it is
     * populated from. Missing paths are ignored.
     */
    response_variables?: { [key: string]: string };

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Determines whether the agent would call LLM another time and speak
     * when the result of the tool is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, will speak during execution.
     */
    speak_during_execution?: boolean;
  }

  export namespace AppTool {
    export interface UnionMember0 {
      mode: 'all';

      /**
       * Not used at runtime; stored and returned as-is for the UI.
       */
      fields?: Array<string>;
    }

    export interface UnionMember1 {
      /**
       * The only response fields the agent and the transcript see, as dot-paths into the
       * response schema returned by get-app-tool-schema. Everything else is dropped.
       * Selecting a parent keeps its whole subtree. A plain segment traverses arrays
       * element-wise (deals.properties.amount keeps that field on every deal), while
       * key[n] selects one element (deals[0].id keeps only the first deal's id); paths
       * that match nothing contribute nothing.
       */
      fields: Array<string>;

      mode: 'subset';
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameter {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CustomTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * If set to true, the parameters will be passed as root level JSON object instead
     * of nested under "args".
     */
    args_at_root?: boolean;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing. Useful when the tool takes a noticeable amount of time to prevent
     * silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Maximum number of times to retry the request after a failed attempt, from 0 (no
     * retry) to 5. Retries happen on any failure, with exponential backoff between
     * attempts; the backoff delay is not configurable. `timeout_ms` applies per
     * attempt rather than as a budget across all attempts, so an attempt that times
     * out is still retried and the worst-case total duration is `timeout_ms`
     * multiplied by (`max_retry` + 1) as well as any latency incurred by the
     * exponential backoff + jitter between each retry. Only the final attempt's result
     * is reported to the agent. Because retries repeat the request, only set this
     * above 0 if your endpoint is idempotent — a retried request may be processed more
     * than once. Defaults to 0 (no retry).
     */
    max_retry?: number;

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * How the tool's `parameters` are authored and shown in the dashboard editor —
     * "form" for the visual parameter builder, "json" for a raw JSON Schema. Both
     * produce the same `parameters` schema; this does not change how the request body
     * is encoded (see `args_at_root`).
     */
    parameter_type?: 'json' | 'form';

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

    /**
     * Query parameters to append to the request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * A mapping of variable names to JSON paths in the response body. These values
     * will be extracted from the response and made available as dynamic variables for
     * use.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the tool can run before it's considered
     * timeout. If the tool times out, the agent would have that info. The minimum
     * value allowed is 1000 ms (1 s), and maximum value allowed is 600,000 ms (10
     * min). By default, this is set to 120,000 ms (2 min).
     */
    timeout_ms?: number;
  }

  export namespace CustomTool {
    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameters {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CodeTool {
    /**
     * JavaScript code to execute in the sandbox.
     */
    code: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'code';

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * A mapping of variable names to JSON paths in the code execution result. These
     * mapped values will be extracted and added as dynamic variables.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the tool.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the code can run before it's considered
     * timeout. Defaults to 30,000 ms (30 s).
     */
    timeout_ms?: number;
  }

  export interface PronunciationDictionary {
    /**
     * The phonetic alphabet to use. MiniMax speech-02-turbo supports IPA and Pinyin.
     * MiniMax speech-2.8-turbo also supports Jyutping. Support for other alphabets
     * depends on the selected voice provider and model.
     */
    alphabet: 'ipa' | 'cmu' | 'pinyin' | 'jyutping';

    /**
     * Pronunciation of the word in the format of the selected phonetic alphabet.
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

export interface AgentRetrieveParams {
  /**
   * Optional version of the API to use for this request. If not provided, will
   * default to latest version.
   */
  version?: string | number;
}

export interface AgentUpdateParams {
  /**
   * Query param: Optional version of the API to use for this request. Default to
   * latest version.
   */
  version?: string | number;

  /**
   * Body param: The name of the agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * Body param: If set to true, DTMF input will interrupt the agent even when
   * interruption_sensitivity is 0. Can be overridden per conversation or subagent
   * node. Default to false.
   */
  allow_dtmf_interruption?: boolean;

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
   * Body param: If set, will control the volume of the ambient sound. Value ranging
   * from [0,2]. Lower value means quieter ambient sound, while higher value means
   * louder ambient sound. If unset, default value 1 will apply.
   */
  ambient_sound_volume?: number;

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
   * brands, street, etc. Entries may reference dynamic variables with `{{variable}}`
   * syntax.
   */
  boosted_keywords?: Array<string> | null;

  /**
   * Body param: If this option is set, the agent prompt will include call screen
   * handling instructions for identity and call purpose questions. Set this to null
   * to disable call screen prompt instructions.
   */
  call_screening_option?: AgentUpdateParams.CallScreeningOption | null;

  /**
   * Body param: Contact memory settings for phone calls and SMS chats. Creating an
   * agent defaults enable_update to false and enable_read to true. Updates only
   * change the supplied flags; omitted flags stay unchanged and an empty object has
   * no effect. Set a flag to false to disable it. The configuration cannot be
   * cleared. Existing agents without this configuration have both disabled.
   */
  contact_memory_config?: AgentUpdateParams.ContactMemoryConfig;

  /**
   * Body param: Custom STT configuration. Only used when stt_mode is set to custom.
   */
  custom_stt_config?: AgentUpdateParams.CustomSttConfig | null;

  /**
   * Body param: Number of days to retain call/chat data before automatic deletion.
   * Must be between 1 and 730 days. If not set, data is retained forever (no
   * automatic deletion).
   */
  data_storage_retention_days?: number | null;

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
   * Body param: Controls the enhancement level for background voice cancellation.
   * Set to 0 to bypass background voice cancellation without BVC charges. Value
   * ranging from [0,1]. Only applicable when denoising_mode is
   * noise-and-background-speech-cancellation. Defaults to 0.8 if no value is
   * configured. Set to null to clear the configured value. Omitting this field
   * preserves the existing value.
   */
  denoising_enhancement_level?: number | null;

  /**
   * Body param: If set, determines what denoising mode to use. Use "no-denoise" to
   * bypass all audio denoising. Default to noise-cancellation.
   */
  denoising_mode?: 'no-denoise' | 'noise-cancellation' | 'noise-and-background-speech-cancellation';

  /**
   * Body param: Controls whether the agent would backchannel (agent interjects the
   * speaker with phrases like "yeah", "uh-huh" to signify interest and engagement).
   * Backchannel when enabled tends to show up more in longer user utterances. If not
   * set, agent will not backchannel.
   */
  enable_backchannel?: boolean;

  /**
   * Body param: If set to true, the agent recognizes requests to stop calling or
   * contacting the user, confirms once, and on a clear yes ends the call with
   * disconnection reason user_requested_dnc and sets do_not_call to true on the
   * contact for the user's phone number. If unset, default value false will apply.
   */
  enable_dnc_detection?: boolean;

  /**
   * Body param: If set to true, the agent will dynamically adjust how quickly it
   * responds based on the user's speech rate and past turn-taking behavior in the
   * call. If unset, default value false will apply.
   */
  enable_dynamic_responsiveness?: boolean;

  /**
   * Body param: If set to true, will enable dynamic voice speed adjustment based on
   * the user's speech rate and conversation context. If unset, default value false
   * will apply.
   */
  enable_dynamic_voice_speed?: boolean;

  /**
   * Body param: Master toggle for expressive mode. When true, the agent may add
   * expressive voice tags to the audio it generates. Only applicable for platform
   * voices. If unset, defaults to false.
   */
  enable_expressive_mode?: boolean;

  /**
   * Body param: If users stay silent for a period after agent speech, end the call.
   * The minimum value allowed is 10,000 ms (10 s). By default, this is set to 600000
   * (10 min).
   */
  end_call_after_silence_ms?: number;

  /**
   * Body param: The expressive voice tags Retell pre-teaches the model to use when
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
   * Body param: Custom expressive voice guidance to use instead of the default
   * Retell expressive prompt when enable_expressive_mode is true. If omitted or
   * blank, the default expressive prompt will be used.
   */
  expressive_mode_prompt?: string | null;

  /**
   * Body param: When TTS provider for the selected voice is experiencing outages, we
   * would use fallback voices listed here for the agent. Voice id and the fallback
   * voice ids must be from different TTS providers. The system would go through the
   * list in order, if the first one in the list is also having outage, it would use
   * the next one. Set to null to remove voice fallback for the agent.
   */
  fallback_voice_ids?: Array<string> | null;

  /**
   * Body param: Configuration for guardrail checks to detect and prevent prohibited
   * topics in agent output and user input.
   */
  guardrail_config?: AgentUpdateParams.GuardrailConfig;

  /**
   * Body param: Toggle behavior presets on/off to influence agent response style and
   * behaviors.
   */
  handbook_config?: AgentUpdateParams.HandbookConfig;

  /**
   * Body param: Controls how sensitive the agent is to user interruptions. Value
   * ranging from [0,1]. Lower value means it will take longer / more words for user
   * to interrupt agent, while higher value means it's easier for user to interrupt
   * agent. If unset, default value 1 will apply. When this is set to 0, agent would
   * never be interrupted.
   */
  interruption_sensitivity?: number;

  /**
   * Body param: If this option is set, the call will try to detect IVR in the first
   * 3 minutes of the call. Actions defined will be applied when the IVR is detected.
   * Set this to null to disable IVR detection.
   */
  ivr_option?: AgentUpdateParams.IvrOption | null;

  /**
   * Body param: Specifies what language(s) the agent will operate in. Accepts either
   * a single locale (e.g. `en-US`) or an array of locales for multilingual agents
   * (e.g. `["en-US","es-ES"]`). The scalar value `multi` is deprecated but still
   * accepted as a scalar, and is stored and returned as the ten locales it used to
   * mean. It must not appear inside the array form. Send an explicit locale array
   * instead. If unset, defaults to `en-US`.
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
   * Body param: Maximum allowed length for the call, will force end the call if
   * reached. The minimum value allowed is 60,000 ms (1 min), and maximum value
   * allowed is 7,200,000 (2 hours). By default, this is set to 3,600,000 (1 hour).
   */
  max_call_duration_ms?: number;

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
    | AgentUpdateParams.CallPresetAnalysisData
  > | null;

  /**
   * Body param: The model to use for post call analysis. Default to gpt-5.6-terra.
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
    | 'gpt-5.6-terra'
    | 'gpt-5.6-luna'
    | 'gpt-6-astra'
    | 'gpt-6-sol'
    | 'gpt-6.1-sol'
    | 'gpt-6-luna'
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-5-opus'
    | 'claude-5.5-opus'
    | 'claude-5-sonnet'
    | 'claude-5.5-sonnet'
    | 'claude-5.5-haiku'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite'
    | 'gemini-3.5-flash'
    | 'gemini-3.5-flash-lite'
    | 'gemini-3.6-flash'
    | 'gemini-3.7-flash'
    | 'gemini-3.8-flash'
    | null;

  /**
   * Body param: Integration (Agent Functions) tools run as a dependency graph during
   * teardown, after post-call analysis. Each tool can be gated by a condition. On
   * calls the graph is stopped after five minutes so teardown can finish. Set to
   * null to clear.
   */
  post_session_tools?: Array<
    | AgentUpdateParams.AppTool
    | AgentUpdateParams.CustomTool
    | AgentUpdateParams.CodeTool
    | AgentUpdateParams.SendSMSTool
  > | null;

  /**
   * Body param: Integration (Agent Functions) tools run as a dependency graph during
   * session setup, before the agent's first message. Outputs are injected as dynamic
   * variables. On calls the graph gets one minute unless an outbound caller will be
   * dialed after setup, in which case it gets five minutes. Past that session
   * initialization continues and any remaining tools finish in the background, so
   * their outputs no longer reach the agent's prompt. Set to null to clear.
   */
  pre_session_tools?: Array<
    AgentUpdateParams.AppTool | AgentUpdateParams.CustomTool | AgentUpdateParams.CodeTool
  > | null;

  /**
   * Body param: A list of words / phrases and their pronunciation to be used to
   * guide the audio synthesize for consistent pronunciation. Check the dashboard to
   * see what provider supports this feature. Set to null to remove pronunciation
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
   * ringtime. Default to 30000 (30 s). Valid range is [5000, 300000].
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
   * accuracy. Default to fast mode. When set to custom, custom_stt_config must be
   * provided.
   */
  stt_mode?: 'fast' | 'accurate' | 'custom';

  /**
   * Body param: IANA timezone for the agent (e.g. America/New_York). Defaults to
   * America/Los_Angeles if not set.
   */
  timezone?: string | null;

  /**
   * Body param
   */
  user_dtmf_options?: AgentUpdateParams.UserDtmfOptions | null;

  /**
   * Body param: Optional description of the agent version. Used for your own
   * reference and documentation.
   */
  version_description?: string | null;

  /**
   * Body param: Optional title of the agent version. Used for your own reference.
   */
  version_title?: string | null;

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
   * Body param: Select the voice model used for the selected voice. Each provider
   * has a set of available voice models. Set to null to remove voice model
   * selection, and default ones will apply. Check out dashboard for more details of
   * each voice model.
   */
  voice_model?:
    | 'eleven_flash_v2'
    | 'eleven_flash_v2_5'
    | 'eleven_multilingual_v2'
    | 'eleven_v3'
    | 'eleven_v3_conversational'
    | 'eleven_v4'
    | 'eleven_v4_turbo'
    | 'sonic-3'
    | 'sonic-3-latest'
    | 'sonic-3.5'
    | 'sonic-3.6'
    | 'tts-1'
    | 'gpt-4o-mini-tts'
    | 'speech-02-turbo'
    | 'speech-2.8-turbo'
    | 's1'
    | 's2-pro'
    | 's2.1-pro'
    | 'inworld-tts-2'
    | 'inworld-tts-2-flash'
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
   * Check the dashboard to see what provider supports this feature. If unset,
   * default value 1 will apply.
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
   * Body param: Which webhook events this agent should receive. If not set, defaults
   * to call_started, call_ended, call_analyzed.
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
   * Contact memory settings for phone calls and SMS chats. Creating an agent
   * defaults enable_update to false and enable_read to true. Updates only change the
   * supplied flags; omitted flags stay unchanged and an empty object has no effect.
   * Set a flag to false to disable it. The configuration cannot be cleared. Existing
   * agents without this configuration have both disabled.
   */
  export interface ContactMemoryConfig {
    /**
     * Automatically add saved contact memory to the agent prompt. Skippable nodes can
     * use answers from the current conversation even when this setting is disabled.
     * Contact dynamic variables, including contact_memory, remain available regardless
     * of this setting.
     */
    enable_read?: boolean;

    /**
     * Rewrite the contact memory after each conversation. Requires storing
     * conversation data. Chat agents must also have end_chat_after_silence_ms set.
     */
    enable_update?: boolean;
  }

  /**
   * Custom STT configuration. Only used when stt_mode is set to custom.
   */
  export interface CustomSttConfig {
    /**
     * Endpointing timeout in milliseconds. Minimum is 100 for Azure, 10 for Deepgram,
     * 500 for Soniox, 100 for AssemblyAI, 100 for Muse. For AssemblyAI, this sets
     * min_turn_silence (100-3000 ms). max_turn_silence adds half of this value,
     * rounded to the nearest millisecond and bounded to 500-1000 ms, with a total cap
     * of 3000 ms. Muse detects turn ends itself and ignores this value.
     */
    endpointing_ms: number;

    /**
     * ASR provider name.
     */
    provider: 'azure' | 'deepgram' | 'soniox' | 'assemblyai' | 'muse';
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

  export interface AppTool {
    /**
     * The connection (App) this tool runs against. Must be a connection in the
     * organization whose provider matches this tool's provider.
     */
    app_id: string;

    /**
     * Name of the catalog template within the provider, as listed by
     * list-app-templates.
     */
    app_tool_template_name: string;

    /**
     * Name of the tool. Must be unique within the phase's tools; referenced by
     * depends_on. Must be consisted of a-z, A-Z, 0-9, or contain underscores and
     * dashes, with a maximum length of 64 (no space allowed).
     */
    name: string;

    /**
     * Provider of the connection. Must match the connection's provider; supported
     * providers are listed by list-app-templates.
     */
    provider: string;

    type: 'integration_app';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: AppTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Overrides the catalog template's LLM-facing description.
     */
    description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, play a typing sound on the agent audio track while this
     * tool is executing. Useful when the tool takes a noticeable amount of time to
     * prevent silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. The message for the agent to speak when executing the tool. Only
     * applicable when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * What the agent and the transcript see of the tool's response. Omit to send the
     * full response. Does not affect response_variables, which are always extracted
     * from the raw response.
     */
    output_selection?: AppTool.UnionMember0 | AppTool.UnionMember1;

    /**
     * The resolved input parameters, in order. Properties may pin a value with const
     * (including {{variable}} references) or provide a description for LLM inference.
     * Each property may also record selected*input_mode, the editor mode the user
     * selected ("const_enum", "const_boolean", "const_value", "description_custom", or
     * "description_preset"); it is stored and returned as-is, used only by the tool
     * config UI. Omit the key when no mode is recorded; when set, const*_ modes
     * require a non-empty const, and description\__ modes must omit const entirely.
     * Each parameter's required list must match the schema returned by the
     * corresponding step of the get-app-tool-schema loop.
     */
    parameters?: Array<AppTool.Parameter>;

    /**
     * Mapping of a dynamic-variable name to the response field (dot-path) it is
     * populated from. Missing paths are ignored.
     */
    response_variables?: { [key: string]: string };

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Determines whether the agent would call LLM another time and speak
     * when the result of the tool is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, will speak during execution.
     */
    speak_during_execution?: boolean;
  }

  export namespace AppTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }

    export interface UnionMember0 {
      mode: 'all';

      /**
       * Not used at runtime; stored and returned as-is for the UI.
       */
      fields?: Array<string>;
    }

    export interface UnionMember1 {
      /**
       * The only response fields the agent and the transcript see, as dot-paths into the
       * response schema returned by get-app-tool-schema. Everything else is dropped.
       * Selecting a parent keeps its whole subtree. A plain segment traverses arrays
       * element-wise (deals.properties.amount keeps that field on every deal), while
       * key[n] selects one element (deals[0].id keeps only the first deal's id); paths
       * that match nothing contribute nothing.
       */
      fields: Array<string>;

      mode: 'subset';
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameter {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CustomTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * If set to true, the parameters will be passed as root level JSON object instead
     * of nested under "args".
     */
    args_at_root?: boolean;

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: CustomTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing. Useful when the tool takes a noticeable amount of time to prevent
     * silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Maximum number of times to retry the request after a failed attempt, from 0 (no
     * retry) to 5. Retries happen on any failure, with exponential backoff between
     * attempts; the backoff delay is not configurable. `timeout_ms` applies per
     * attempt rather than as a budget across all attempts, so an attempt that times
     * out is still retried and the worst-case total duration is `timeout_ms`
     * multiplied by (`max_retry` + 1) as well as any latency incurred by the
     * exponential backoff + jitter between each retry. Only the final attempt's result
     * is reported to the agent. Because retries repeat the request, only set this
     * above 0 if your endpoint is idempotent — a retried request may be processed more
     * than once. Defaults to 0 (no retry).
     */
    max_retry?: number;

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * How the tool's `parameters` are authored and shown in the dashboard editor —
     * "form" for the visual parameter builder, "json" for a raw JSON Schema. Both
     * produce the same `parameters` schema; this does not change how the request body
     * is encoded (see `args_at_root`).
     */
    parameter_type?: 'json' | 'form';

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

    /**
     * Query parameters to append to the request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * A mapping of variable names to JSON paths in the response body. These values
     * will be extracted from the response and made available as dynamic variables for
     * use.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the tool can run before it's considered
     * timeout. If the tool times out, the agent would have that info. The minimum
     * value allowed is 1000 ms (1 s), and maximum value allowed is 600,000 ms (10
     * min). By default, this is set to 120,000 ms (2 min).
     */
    timeout_ms?: number;
  }

  export namespace CustomTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameters {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CodeTool {
    /**
     * JavaScript code to execute in the sandbox.
     */
    code: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'code';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: CodeTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * A mapping of variable names to JSON paths in the code execution result. These
     * mapped values will be extracted and added as dynamic variables.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the tool.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the code can run before it's considered
     * timeout. Defaults to 30,000 ms (30 s).
     */
    timeout_ms?: number;
  }

  export namespace CodeTool {
    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }
  }

  export interface SendSMSTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    sms_content:
      | SendSMSTool.SMSContentPredefined
      | SendSMSTool.SMSContentInferred
      | SendSMSTool.SMSContentTemplate;

    type: 'send_sms';

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    condition?: SendSMSTool.Condition;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Describes what to say before sending the SMS. Only applicable when
     * speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * If true, the agent will speak a short line before sending the SMS. If omitted,
     * defaults to true (same as end_call / transfer_call tools).
     */
    speak_during_execution?: boolean;
  }

  export namespace SendSMSTool {
    export interface SMSContentPredefined {
      /**
       * The static message to be sent in the SMS. Can contain dynamic variables.
       */
      text?: string;

      type?: 'predefined';
    }

    export interface SMSContentInferred {
      /**
       * The prompt to be used to help infer the SMS content. The model will take the
       * global prompt, the call transcript, and this prompt together to deduce the right
       * message to send. Can contain dynamic variables.
       */
      prompt?: string;

      type?: 'inferred';
    }

    export interface SMSContentTemplate {
      /**
       * The template to use for the SMS content. "info_collection" sends a predefined
       * message requesting information from the user.
       */
      template: 'info_collection';

      type: 'template';
    }

    /**
     * Optional gate; the step only runs when the condition holds. Defaults to always
     * running.
     */
    export interface Condition {
      equations: Array<Condition.Equation>;

      operator: '||' | '&&';

      type: 'equation';
    }

    export namespace Condition {
      export interface Equation {
        /**
         * Left side of the equation
         */
        left: string;

        operator:
          | '=='
          | '!='
          | '>'
          | '>='
          | '<'
          | '<='
          | 'contains'
          | 'not_contains'
          | 'exists'
          | 'not_exist';

        /**
         * Right side of the equation. The right side of the equation not required when
         * "exists" or "not_exist" are selected.
         */
        right?: string;
      }
    }
  }

  export interface AppTool {
    /**
     * The connection (App) this tool runs against. Must be a connection in the
     * organization whose provider matches this tool's provider.
     */
    app_id: string;

    /**
     * Name of the catalog template within the provider, as listed by
     * list-app-templates.
     */
    app_tool_template_name: string;

    /**
     * Name of the tool. Must be unique within the phase's tools; referenced by
     * depends_on. Must be consisted of a-z, A-Z, 0-9, or contain underscores and
     * dashes, with a maximum length of 64 (no space allowed).
     */
    name: string;

    /**
     * Provider of the connection. Must match the connection's provider; supported
     * providers are listed by list-app-templates.
     */
    provider: string;

    type: 'integration_app';

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Overrides the catalog template's LLM-facing description.
     */
    description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, play a typing sound on the agent audio track while this
     * tool is executing. Useful when the tool takes a noticeable amount of time to
     * prevent silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. The message for the agent to speak when executing the tool. Only
     * applicable when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * What the agent and the transcript see of the tool's response. Omit to send the
     * full response. Does not affect response_variables, which are always extracted
     * from the raw response.
     */
    output_selection?: AppTool.UnionMember0 | AppTool.UnionMember1;

    /**
     * The resolved input parameters, in order. Properties may pin a value with const
     * (including {{variable}} references) or provide a description for LLM inference.
     * Each property may also record selected*input_mode, the editor mode the user
     * selected ("const_enum", "const_boolean", "const_value", "description_custom", or
     * "description_preset"); it is stored and returned as-is, used only by the tool
     * config UI. Omit the key when no mode is recorded; when set, const*_ modes
     * require a non-empty const, and description\__ modes must omit const entirely.
     * Each parameter's required list must match the schema returned by the
     * corresponding step of the get-app-tool-schema loop.
     */
    parameters?: Array<AppTool.Parameter>;

    /**
     * Mapping of a dynamic-variable name to the response field (dot-path) it is
     * populated from. Missing paths are ignored.
     */
    response_variables?: { [key: string]: string };

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. Determines whether the agent would call LLM another time and speak
     * when the result of the tool is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Only applies to during conversation functions; ignored by the pre/post
     * conversation. If true, will speak during execution.
     */
    speak_during_execution?: boolean;
  }

  export namespace AppTool {
    export interface UnionMember0 {
      mode: 'all';

      /**
       * Not used at runtime; stored and returned as-is for the UI.
       */
      fields?: Array<string>;
    }

    export interface UnionMember1 {
      /**
       * The only response fields the agent and the transcript see, as dot-paths into the
       * response schema returned by get-app-tool-schema. Everything else is dropped.
       * Selecting a parent keeps its whole subtree. A plain segment traverses arrays
       * element-wise (deals.properties.amount keeps that field on every deal), while
       * key[n] selects one element (deals[0].id keeps only the first deal's id); paths
       * that match nothing contribute nothing.
       */
      fields: Array<string>;

      mode: 'subset';
    }

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameter {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CustomTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * If set to true, the parameters will be passed as root level JSON object instead
     * of nested under "args".
     */
    args_at_root?: boolean;

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing. Useful when the tool takes a noticeable amount of time to prevent
     * silence on the call.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Maximum number of times to retry the request after a failed attempt, from 0 (no
     * retry) to 5. Retries happen on any failure, with exponential backoff between
     * attempts; the backoff delay is not configurable. `timeout_ms` applies per
     * attempt rather than as a budget across all attempts, so an attempt that times
     * out is still retried and the worst-case total duration is `timeout_ms`
     * multiplied by (`max_retry` + 1) as well as any latency incurred by the
     * exponential backoff + jitter between each retry. Only the final attempt's result
     * is reported to the agent. Because retries repeat the request, only set this
     * above 0 if your endpoint is idempotent — a retried request may be processed more
     * than once. Defaults to 0 (no retry).
     */
    max_retry?: number;

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * How the tool's `parameters` are authored and shown in the dashboard editor —
     * "form" for the visual parameter builder, "json" for a raw JSON Schema. Both
     * produce the same `parameters` schema; this does not change how the request body
     * is encoded (see `args_at_root`).
     */
    parameter_type?: 'json' | 'form';

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

    /**
     * Query parameters to append to the request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * A mapping of variable names to JSON paths in the response body. These values
     * will be extracted from the response and made available as dynamic variables for
     * use.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the tool can run before it's considered
     * timeout. If the tool times out, the agent would have that info. The minimum
     * value allowed is 1000 ms (1 s), and maximum value allowed is 600,000 ms (10
     * min). By default, this is set to 120,000 ms (2 min).
     */
    timeout_ms?: number;
  }

  export namespace CustomTool {
    /**
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    export interface Parameters {
      /**
       * The value of properties is an object, where each key is the name of a property
       * and each value is a schema used to validate that property.
       */
      properties: unknown;

      /**
       * Type must be "object" for a JSON Schema object.
       */
      type: 'object';

      /**
       * List of names of required property when generating this parameter. LLM will do
       * its best to generate the required properties in its function arguments. Property
       * must exist in properties.
       */
      required?: Array<string>;
    }
  }

  export interface CodeTool {
    /**
     * JavaScript code to execute in the sandbox.
     */
    code: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'code';

    /**
     * Names of tools that must run before this one.
     */
    depends_on?: Array<string>;

    /**
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

    /**
     * If true, play a typing sound on the agent audio track while this tool is
     * executing.
     */
    enable_typing_sound?: boolean;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true.
     */
    execution_message_description?: string;

    /**
     * Type of execution message. "prompt" means the agent will use
     * execution_message_description as a prompt to generate the message. "static_text"
     * means the agent will speak the execution_message_description directly. Defaults
     * to "prompt".
     */
    execution_message_type?: 'prompt' | 'static_text';

    /**
     * A mapping of variable names to JSON paths in the code execution result. These
     * mapped values will be extracted and added as dynamic variables.
     */
    response_variables?: { [key: string]: string };

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained.
     */
    speak_after_execution?: boolean;

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the tool.
     */
    speak_during_execution?: boolean;

    /**
     * The maximum time in milliseconds the code can run before it's considered
     * timeout. Defaults to 30,000 ms (30 s).
     */
    timeout_ms?: number;
  }

  export interface PronunciationDictionary {
    /**
     * The phonetic alphabet to use. MiniMax speech-02-turbo supports IPA and Pinyin.
     * MiniMax speech-2.8-turbo also supports Jyutping. Support for other alphabets
     * depends on the selected voice provider and model.
     */
    alphabet: 'ipa' | 'cmu' | 'pinyin' | 'jyutping';

    /**
     * Pronunciation of the word in the format of the selected phonetic alphabet.
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

export interface AgentListParams {
  /**
   * Query param: Maximum number of items to return.
   */
  limit?: number;

  /**
   * Query param: Pagination key for fetching the next page.
   */
  pagination_key?: string;

  /**
   * Query param: Sort order for results.
   */
  sort_order?: 'ascending' | 'descending';

  /**
   * Body param: Filters for listing agents. All provided filters are connected with
   * AND.
   */
  filter_criteria?: AgentListParams.FilterCriteria;
}

export namespace AgentListParams {
  /**
   * Filters for listing agents. All provided filters are connected with AND.
   */
  export interface FilterCriteria {
    channel?: FilterCriteria.Channel;

    /**
     * Case-insensitive substring search over agent name, plus substring search over
     * agent id.
     */
    query?: string;
  }

  export namespace FilterCriteria {
    export interface Channel {
      /**
       * eq: equal, ne: not equal, sw: starts with, ew: ends with, co: contains
       */
      op: 'eq' | 'ne' | 'sw' | 'ew' | 'co';

      type: 'string';

      value: 'voice' | 'chat';
    }
  }
}

export interface AgentCreateVersionParams {
  /**
   * Existing version used as the base when creating a new draft.
   */
  base_version: number;
}

export interface AgentDeleteVersionParams {
  /**
   * Version to delete.
   */
  version: number;
}

export interface AgentListVersionsParams {
  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * Pagination key for fetching the next page.
   */
  pagination_key?: string;

  /**
   * Sort order for results.
   */
  sort_order?: 'ascending' | 'descending';
}

export interface AgentPublishParams {
  version: number;

  version_description?: string;

  /**
   * Optional title of the agent version. Used for your own reference.
   */
  version_title?: string;
}

export interface AgentRepairParams {
  /**
   * Optional version of the agent to repair. Default to latest version. Published
   * versions are immutable and cannot be repaired.
   */
  version?: string | number;
}

export declare namespace Agent {
  export {
    type AgentResponse as AgentResponse,
    type AgentListResponse as AgentListResponse,
    type AgentCreateVersionResponse as AgentCreateVersionResponse,
    type AgentListVersionsResponse as AgentListVersionsResponse,
    type AgentRepairResponse as AgentRepairResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentRetrieveParams as AgentRetrieveParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentCreateVersionParams as AgentCreateVersionParams,
    type AgentDeleteVersionParams as AgentDeleteVersionParams,
    type AgentListVersionsParams as AgentListVersionsParams,
    type AgentPublishParams as AgentPublishParams,
    type AgentRepairParams as AgentRepairParams,
  };
}
