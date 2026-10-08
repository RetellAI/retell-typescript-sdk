// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class BatchCall extends APIResource {
  /**
   * Create a batch call
   *
   * @example
   * ```ts
   * const batchCallResponse =
   *   await client.batchCall.createBatchCall({
   *     from_number: '+14157774444',
   *     tasks: [{ to_number: '+12137774445' }],
   *   });
   * ```
   */
  createBatchCall(
    body: BatchCallCreateBatchCallParams,
    options?: RequestOptions,
  ): APIPromise<BatchCallResponse> {
    return this._client.post('/create-batch-call', {
      body,
      timeout: (this._client as any)._options.timeout ?? 300000,
      ...options,
    });
  }
}

export interface BatchCallResponse {
  /**
   * Unique id of the batch call.
   */
  batch_call_id: string;

  from_number: string;

  name: string;

  scheduled_timestamp: number;

  /**
   * Number of tasks within the batch call
   */
  total_task_count: number;

  /**
   * Canonicalized minutes-based time windows. Present only if specified when the
   * batch call was created or updated. See CallTimeWindow for format details
   * ([startMin, endMin) in local minutes; no cross-midnight).
   */
  call_time_window?: BatchCallResponse.CallTimeWindow;
}

export namespace BatchCallResponse {
  /**
   * Canonicalized minutes-based time windows. Present only if specified when the
   * batch call was created or updated. See CallTimeWindow for format details
   * ([startMin, endMin) in local minutes; no cross-midnight).
   */
  export interface CallTimeWindow {
    /**
     * List of TimeWindow (start/end in minutes since local midnight).
     */
    windows: Array<CallTimeWindow.Window>;

    /**
     * Optional list of days to which the windows apply. If omitted or empty, windows
     * apply to every day.
     */
    day?: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>;

    /**
     * IANA timezone (e.g. America/Los_Angeles). Defaults to America/Los_Angeles if
     * omitted.
     */
    timezone?: string;
  }

  export namespace CallTimeWindow {
    export interface Window {
      /**
       * End time in minutes since local midnight.
       */
      end: number;

      /**
       * Start time in minutes since local midnight.
       */
      start: number;
    }
  }
}

export interface BatchCallCreateBatchCallParams {
  /**
   * The number you own in E.164 format. Must be a number purchased from Retell or
   * imported to Retell.
   */
  from_number: string;

  /**
   * A list of individual call tasks to be executed as part of the batch call. Each
   * task represents a single outbound call and includes details such as the
   * recipient's phone number and optional dynamic variables to personalize the call
   * content.
   */
  tasks: Array<BatchCallCreateBatchCallParams.Task>;

  /**
   * Allowed calling windows in a specific timezone. Each window is a half-open
   * interval [startMin, endMin) in minutes since 00:00 local time. Cross-midnight
   * windows are NOT allowed (must satisfy startMin < endMin). `endMin = 1440`
   * (24:00) is valid.
   */
  call_time_window?: BatchCallCreateBatchCallParams.CallTimeWindow;

  /**
   * The name of the batch call. Only used for your own reference.
   */
  name?: string;

  /**
   * Number of concurrency reserved for all other calls that are not triggered by
   * batch calls, such as inbound calls.
   */
  reserved_concurrency?: number;

  /**
   * The scheduled time for sending the batch call, represented as a Unix timestamp
   * in milliseconds. If omitted, the call will be sent immediately.
   */
  trigger_timestamp?: number;
}

export namespace BatchCallCreateBatchCallParams {
  export interface Task {
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
    agent_override?: Task.AgentOverride;

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
     * This does not bind the agent to this number, this is for one time override.
     */
    override_agent_version?: string | number;

    /**
     * Add optional dynamic variables in key value pairs of string that injects into
     * your Response Engine prompt and tool description. Only applicable for Response
     * Engine.
     */
    retell_llm_dynamic_variables?: { [key: string]: string };
  }

  export namespace Task {
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
         * Contact memory settings for phone calls and SMS chats. Creating an agent
         * defaults enable_update to false and enable_read to true. Updates only change the
         * supplied flags; omitted flags stay unchanged and an empty object has no effect.
         * Set a flag to false to disable it. The configuration cannot be cleared. Existing
         * agents without this configuration have both disabled.
         */
        contact_memory_config?: Agent.ContactMemoryConfig;

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
          Agent.AppTool | Agent.CustomTool | Agent.CodeTool | Agent.SendSMSTool
        > | null;

        /**
         * Integration (Agent Functions) tools run as a dependency graph during session
         * setup, before the agent's first message. Outputs are injected as dynamic
         * variables. On calls the graph gets one minute unless an outbound caller will be
         * dialed after setup, in which case it gets five minutes. Past that session
         * initialization continues and any remaining tools finish in the background, so
         * their outputs no longer reach the agent's prompt. Set to null to clear.
         */
        pre_session_tools?: Array<Agent.AppTool | Agent.CustomTool | Agent.CodeTool> | null;

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
        model_choice?: ConversationFlow.ModelChoiceCascading | ConversationFlow.ModelChoiceS2S;

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

        export interface ModelChoiceCascading {
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
            | 'gemini-3.8-flash';

          /**
           * Type of model choice
           */
          type: 'cascading';

          /**
           * Whether to use high priority pool with more dedicated resource, default false
           */
          high_priority?: boolean;
        }

        export interface ModelChoiceS2S {
          /**
           * The speech-to-speech model to use
           */
          model:
            | 'gpt-realtime-2.1'
            | 'gpt-realtime-2.1-mini'
            | 'gpt-realtime-2'
            | 'gpt-realtime-1.5'
            | 'gpt-realtime'
            | 'gpt-realtime-mini';

          /**
           * Type of model choice
           */
          type: 's2s';
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
         * Select the underlying text LLM. If not set, would default to gpt-5.6-terra.
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
        s2s_model?:
          | 'gpt-realtime-2.1'
          | 'gpt-realtime-2.1-mini'
          | 'gpt-realtime-2'
          | 'gpt-realtime-1.5'
          | 'gpt-realtime'
          | 'gpt-realtime-mini'
          | null;

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

  /**
   * Allowed calling windows in a specific timezone. Each window is a half-open
   * interval [startMin, endMin) in minutes since 00:00 local time. Cross-midnight
   * windows are NOT allowed (must satisfy startMin < endMin). `endMin = 1440`
   * (24:00) is valid.
   */
  export interface CallTimeWindow {
    /**
     * List of TimeWindow (start/end in minutes since local midnight).
     */
    windows: Array<CallTimeWindow.Window>;

    /**
     * Optional list of days to which the windows apply. If omitted or empty, windows
     * apply to every day.
     */
    day?: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>;

    /**
     * IANA timezone (e.g. America/Los_Angeles). Defaults to America/Los_Angeles if
     * omitted.
     */
    timezone?: string;
  }

  export namespace CallTimeWindow {
    export interface Window {
      /**
       * End time in minutes since local midnight.
       */
      end: number;

      /**
       * Start time in minutes since local midnight.
       */
      start: number;
    }
  }
}

export declare namespace BatchCall {
  export {
    type BatchCallResponse as BatchCallResponse,
    type BatchCallCreateBatchCallParams as BatchCallCreateBatchCallParams,
  };
}
