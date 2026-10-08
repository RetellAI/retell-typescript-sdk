// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AgentAPI from './agent';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ChatAgent extends APIResource {
  /**
   * Create a new chat agent
   *
   * @example
   * ```ts
   * const chatAgentResponse = await client.chatAgent.create({
   *   response_engine: {
   *     llm_id: 'llm_234sdertfsdsfsdf',
   *     type: 'retell-llm',
   *   },
   * });
   * ```
   */
  create(body: ChatAgentCreateParams, options?: RequestOptions): APIPromise<ChatAgentResponse> {
    return this._client.post('/create-chat-agent', { body, ...options });
  }

  /**
   * Retrieve details of a specific chat agent
   *
   * @example
   * ```ts
   * const chatAgentResponse = await client.chatAgent.retrieve(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  retrieve(
    agentID: string,
    query: ChatAgentRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChatAgentResponse> {
    return this._client.get(path`/get-chat-agent/${agentID}`, { query, ...options });
  }

  /**
   * Update an existing chat agent
   *
   * @example
   * ```ts
   * const chatAgentResponse = await client.chatAgent.update(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  update(
    agentID: string,
    params: ChatAgentUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ChatAgentResponse> {
    const { version, ...body } = params;
    return this._client.patch(path`/update-chat-agent/${agentID}`, { query: { version }, body, ...options });
  }

  /**
   * List unique agents with pagination.
   *
   * @example
   * ```ts
   * const chatAgents = await client.chatAgent.list({
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
    params: ChatAgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChatAgentListResponse> {
    const { limit, pagination_key, sort_order, ...body } = params ?? {};
    return this._client.post('/v2/list-agents', {
      query: { limit, pagination_key, sort_order },
      body,
      ...options,
    });
  }

  /**
   * Delete an existing chat agent
   *
   * @example
   * ```ts
   * await client.chatAgent.delete(
   *   'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
   * );
   * ```
   */
  delete(agentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-chat-agent/${agentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Create a new draft agent version from a base version.
   *
   * @example
   * ```ts
   * const response = await client.chatAgent.createVersion(
   *   'agent_xxx',
   *   { base_version: 12 },
   * );
   * ```
   */
  createVersion(
    agentID: string,
    body: ChatAgentCreateVersionParams,
    options?: RequestOptions,
  ): APIPromise<ChatAgentCreateVersionResponse> {
    return this._client.post(path`/create-agent-version/${agentID}`, { body, ...options });
  }

  /**
   * Delete a specific agent version.
   *
   * @example
   * ```ts
   * await client.chatAgent.deleteVersion('agent_xxx', {
   *   version: 1,
   * });
   * ```
   */
  deleteVersion(
    agentID: string,
    params: ChatAgentDeleteVersionParams,
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
   * Publish an existing draft version in place.
   *
   * @example
   * ```ts
   * await client.chatAgent.publish('agent_xxx', {
   *   version: 15,
   * });
   * ```
   */
  publish(agentID: string, body: ChatAgentPublishParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/publish-agent-version/${agentID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ChatAgentResponse {
  /**
   * Unique id of chat agent.
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
    | ChatAgentResponse.ResponseEngineRetellLm
    | ChatAgentResponse.ResponseEngineCustomLm
    | ChatAgentResponse.ResponseEngineConversationFlow;

  /**
   * The name of the chat agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * Tags assigned to this chat agent version. Preferred tag is listed first.
   */
  assigned_tags?: Array<string>;

  /**
   * Message to display when the chat is automatically closed.
   */
  auto_close_message?: string | null;

  /**
   * Version that this draft was based on. Null for initial versions.
   */
  base_version?: number | null;

  /**
   * Contact memory settings for phone calls and SMS chats. Creating an agent
   * defaults enable_update to false and enable_read to true. Updates only change the
   * supplied flags; omitted flags stay unchanged and an empty object has no effect.
   * Set a flag to false to disable it. The configuration cannot be cleared. Existing
   * agents without this configuration have both disabled.
   */
  contact_memory_config?: ChatAgentResponse.ContactMemoryConfig;

  /**
   * Number of days to retain call/chat data before automatic deletion. Must be
   * between 1 and 730 days. If not set, data is retained forever (no automatic
   * deletion).
   */
  data_storage_retention_days?: number | null;

  /**
   * Controls what data is stored for this agent. "everything" stores all data
   * including transcripts and recordings. "everything_except_pii" stores data but
   * excludes PII when possible based on PII configuration. "basic_attributes_only"
   * stores only basic metadata. If not set, defaults to "everything".
   */
  data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only' | null;

  /**
   * If users stay silent for a period after agent speech, end the chat. The minimum
   * value allowed is 120,000 ms (2 minutes). The maximum value allowed is
   * 259,200,000 ms (72 hours). By default, this is set to 3,600,000 (1 hour).
   */
  end_chat_after_silence_ms?: number | null;

  /**
   * Configuration for guardrail checks to detect and prevent prohibited topics in
   * agent output and user input.
   */
  guardrail_config?: ChatAgentResponse.GuardrailConfig;

  /**
   * Toggle behavior presets on/off to influence agent response style and behaviors.
   * Voice-only presets are not available for chat agents.
   */
  handbook_config?: ChatAgentResponse.HandbookConfig;

  /**
   * Whether the chat agent is published.
   */
  is_published?: boolean;

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
   * Whether this agent opts in to signed url for public log. If not set, default
   * value of false will apply.
   */
  opt_in_signed_url?: boolean;

  /**
   * Configuration for PII scrubbing from transcripts and recordings.
   */
  pii_config?: ChatAgentResponse.PiiConfig;

  /**
   * Post chat analysis data to extract from the chat. This data will augment the
   * pre-defined variables extracted in the chat analysis. This will be available
   * after the chat ends.
   */
  post_chat_analysis_data?: Array<
    | ChatAgentResponse.StringAnalysisData
    | ChatAgentResponse.EnumAnalysisData
    | ChatAgentResponse.BooleanAnalysisData
    | ChatAgentResponse.NumberAnalysisData
    | ChatAgentResponse.ChatPresetAnalysisData
  > | null;

  /**
   * The model to use for post chat analysis. Default to gpt-5.6-terra.
   */
  post_chat_analysis_model?:
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
   * Integration (Agent Functions) tools run as a dependency graph at chat end, after
   * post-chat analysis. Each tool can be gated by a condition. Set to null to clear.
   */
  post_session_tools?: Array<
    | ChatAgentResponse.AppTool
    | ChatAgentResponse.CustomTool
    | ChatAgentResponse.CodeTool
    | ChatAgentResponse.SendSMSTool
  > | null;

  /**
   * Integration (Agent Functions) tools run as a dependency graph before the chat's
   * first message. Outputs are injected as dynamic variables. Set to null to clear.
   */
  pre_session_tools?: Array<
    ChatAgentResponse.AppTool | ChatAgentResponse.CustomTool | ChatAgentResponse.CodeTool
  > | null;

  /**
   * The expiration time for the signed url in milliseconds. Only applicable when
   * opt_in_signed_url is true. If not set, default value of 86400000 (24 hours) will
   * apply.
   */
  signed_url_expiration_ms?: number | null;

  /**
   * IANA timezone for the agent (e.g. America/New_York). Defaults to
   * America/Los_Angeles if not set.
   */
  timezone?: string | null;

  /**
   * The version of the chat agent.
   */
  version?: number;

  /**
   * Optional title of the chat agent version. Used for your own reference.
   */
  version_title?: string | null;

  /**
   * Which webhook events this agent should receive. If not set, defaults to
   * chat_started, chat_ended, chat_analyzed.
   */
  webhook_events?: Array<'chat_started' | 'chat_ended' | 'chat_analyzed' | 'transcript_updated'> | null;

  /**
   * The timeout for the webhook in milliseconds. If not set, default value of 10000
   * will apply.
   */
  webhook_timeout_ms?: number;

  /**
   * The webhook for agent to listen to chat events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace ChatAgentResponse {
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
   * Voice-only presets are not available for chat agents.
   */
  export interface HandbookConfig {
    /**
     * When asked, acknowledge being a virtual assistant.
     */
    ai_disclosure?: boolean;

    /**
     * Professional call center rep baseline.
     */
    default_personality?: boolean;

    /**
     * Warm acknowledgment of caller concerns.
     */
    high_empathy?: boolean;

    /**
     * Stay within prompt/context scope, don't invent details.
     */
    scope_boundaries?: boolean;
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
   * System preset for post-chat analysis (chat agents). Use in
   * post_chat_analysis_data to override prompts or mark fields optional.
   */
  export interface ChatPresetAnalysisData {
    /**
     * Preset identifier for chat agent analysis.
     */
    name: 'chat_summary' | 'chat_successful' | 'user_sentiment';

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
}

export interface ChatAgentListResponse {
  /**
   * Whether more results are available.
   */
  has_more: boolean;

  items: Array<ChatAgentListResponse.Item>;

  /**
   * Pagination key for the next page.
   */
  pagination_key?: string;
}

export namespace ChatAgentListResponse {
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

export type ChatAgentCreateVersionResponse = AgentAPI.AgentResponse | ChatAgentResponse;

export interface ChatAgentCreateParams {
  /**
   * The Response Engine to attach to the agent. It is used to generate responses for
   * the agent. You need to create a Response Engine first before attaching it to an
   * agent.
   */
  response_engine:
    | ChatAgentCreateParams.ResponseEngineRetellLm
    | ChatAgentCreateParams.ResponseEngineCustomLm
    | ChatAgentCreateParams.ResponseEngineConversationFlow;

  /**
   * The name of the chat agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * Message to display when the chat is automatically closed.
   */
  auto_close_message?: string | null;

  /**
   * Contact memory settings for phone calls and SMS chats. Creating an agent
   * defaults enable_update to false and enable_read to true. Updates only change the
   * supplied flags; omitted flags stay unchanged and an empty object has no effect.
   * Set a flag to false to disable it. The configuration cannot be cleared. Existing
   * agents without this configuration have both disabled.
   */
  contact_memory_config?: ChatAgentCreateParams.ContactMemoryConfig;

  /**
   * Number of days to retain call/chat data before automatic deletion. Must be
   * between 1 and 730 days. If not set, data is retained forever (no automatic
   * deletion).
   */
  data_storage_retention_days?: number | null;

  /**
   * Controls what data is stored for this agent. "everything" stores all data
   * including transcripts and recordings. "everything_except_pii" stores data but
   * excludes PII when possible based on PII configuration. "basic_attributes_only"
   * stores only basic metadata. If not set, defaults to "everything".
   */
  data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only' | null;

  /**
   * If users stay silent for a period after agent speech, end the chat. The minimum
   * value allowed is 120,000 ms (2 minutes). The maximum value allowed is
   * 259,200,000 ms (72 hours). By default, this is set to 3,600,000 (1 hour).
   */
  end_chat_after_silence_ms?: number | null;

  /**
   * Configuration for guardrail checks to detect and prevent prohibited topics in
   * agent output and user input.
   */
  guardrail_config?: ChatAgentCreateParams.GuardrailConfig;

  /**
   * Toggle behavior presets on/off to influence agent response style and behaviors.
   * Voice-only presets are not available for chat agents.
   */
  handbook_config?: ChatAgentCreateParams.HandbookConfig;

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
   * Whether this agent opts in to signed url for public log. If not set, default
   * value of false will apply.
   */
  opt_in_signed_url?: boolean;

  /**
   * Configuration for PII scrubbing from transcripts and recordings.
   */
  pii_config?: ChatAgentCreateParams.PiiConfig;

  /**
   * Post chat analysis data to extract from the chat. This data will augment the
   * pre-defined variables extracted in the chat analysis. This will be available
   * after the chat ends.
   */
  post_chat_analysis_data?: Array<
    | ChatAgentCreateParams.StringAnalysisData
    | ChatAgentCreateParams.EnumAnalysisData
    | ChatAgentCreateParams.BooleanAnalysisData
    | ChatAgentCreateParams.NumberAnalysisData
    | ChatAgentCreateParams.ChatPresetAnalysisData
  > | null;

  /**
   * The model to use for post chat analysis. Default to gpt-5.6-terra.
   */
  post_chat_analysis_model?:
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
   * Integration (Agent Functions) tools run as a dependency graph at chat end, after
   * post-chat analysis. Each tool can be gated by a condition. Set to null to clear.
   */
  post_session_tools?: Array<
    | ChatAgentCreateParams.AppTool
    | ChatAgentCreateParams.CustomTool
    | ChatAgentCreateParams.CodeTool
    | ChatAgentCreateParams.SendSMSTool
  > | null;

  /**
   * Integration (Agent Functions) tools run as a dependency graph before the chat's
   * first message. Outputs are injected as dynamic variables. Set to null to clear.
   */
  pre_session_tools?: Array<
    ChatAgentCreateParams.AppTool | ChatAgentCreateParams.CustomTool | ChatAgentCreateParams.CodeTool
  > | null;

  /**
   * The expiration time for the signed url in milliseconds. Only applicable when
   * opt_in_signed_url is true. If not set, default value of 86400000 (24 hours) will
   * apply.
   */
  signed_url_expiration_ms?: number | null;

  /**
   * IANA timezone for the agent (e.g. America/New_York). Defaults to
   * America/Los_Angeles if not set.
   */
  timezone?: string | null;

  /**
   * Optional title of the chat agent version. Used for your own reference.
   */
  version_title?: string | null;

  /**
   * Which webhook events this agent should receive. If not set, defaults to
   * chat_started, chat_ended, chat_analyzed.
   */
  webhook_events?: Array<'chat_started' | 'chat_ended' | 'chat_analyzed' | 'transcript_updated'> | null;

  /**
   * The timeout for the webhook in milliseconds. If not set, default value of 10000
   * will apply.
   */
  webhook_timeout_ms?: number;

  /**
   * The webhook for agent to listen to chat events. See what events it would get at
   * [webhook doc](/features/webhook). If set, will binds webhook events for this
   * agent to the specified url, and will ignore the account level webhook for this
   * agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace ChatAgentCreateParams {
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
   * Voice-only presets are not available for chat agents.
   */
  export interface HandbookConfig {
    /**
     * When asked, acknowledge being a virtual assistant.
     */
    ai_disclosure?: boolean;

    /**
     * Professional call center rep baseline.
     */
    default_personality?: boolean;

    /**
     * Warm acknowledgment of caller concerns.
     */
    high_empathy?: boolean;

    /**
     * Stay within prompt/context scope, don't invent details.
     */
    scope_boundaries?: boolean;
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
   * System preset for post-chat analysis (chat agents). Use in
   * post_chat_analysis_data to override prompts or mark fields optional.
   */
  export interface ChatPresetAnalysisData {
    /**
     * Preset identifier for chat agent analysis.
     */
    name: 'chat_summary' | 'chat_successful' | 'user_sentiment';

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
}

export interface ChatAgentRetrieveParams {
  /**
   * Optional version of the API to use for this request. If not provided, will
   * default to latest version.
   */
  version?: string | number;
}

export interface ChatAgentUpdateParams {
  /**
   * Query param: Optional version of the API to use for this request. Default to
   * latest version.
   */
  version?: string | number;

  /**
   * Body param: The name of the chat agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * Body param: Message to display when the chat is automatically closed.
   */
  auto_close_message?: string | null;

  /**
   * Body param: Contact memory settings for phone calls and SMS chats. Creating an
   * agent defaults enable_update to false and enable_read to true. Updates only
   * change the supplied flags; omitted flags stay unchanged and an empty object has
   * no effect. Set a flag to false to disable it. The configuration cannot be
   * cleared. Existing agents without this configuration have both disabled.
   */
  contact_memory_config?: ChatAgentUpdateParams.ContactMemoryConfig;

  /**
   * Body param: Number of days to retain call/chat data before automatic deletion.
   * Must be between 1 and 730 days. If not set, data is retained forever (no
   * automatic deletion).
   */
  data_storage_retention_days?: number | null;

  /**
   * Body param: Controls what data is stored for this agent. "everything" stores all
   * data including transcripts and recordings. "everything_except_pii" stores data
   * but excludes PII when possible based on PII configuration.
   * "basic_attributes_only" stores only basic metadata. If not set, defaults to
   * "everything".
   */
  data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only' | null;

  /**
   * Body param: If users stay silent for a period after agent speech, end the chat.
   * The minimum value allowed is 120,000 ms (2 minutes). The maximum value allowed
   * is 259,200,000 ms (72 hours). By default, this is set to 3,600,000 (1 hour).
   */
  end_chat_after_silence_ms?: number | null;

  /**
   * Body param: Configuration for guardrail checks to detect and prevent prohibited
   * topics in agent output and user input.
   */
  guardrail_config?: ChatAgentUpdateParams.GuardrailConfig;

  /**
   * Body param: Toggle behavior presets on/off to influence agent response style and
   * behaviors. Voice-only presets are not available for chat agents.
   */
  handbook_config?: ChatAgentUpdateParams.HandbookConfig;

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
   * Body param: Whether this agent opts in to signed url for public log. If not set,
   * default value of false will apply.
   */
  opt_in_signed_url?: boolean;

  /**
   * Body param: Configuration for PII scrubbing from transcripts and recordings.
   */
  pii_config?: ChatAgentUpdateParams.PiiConfig;

  /**
   * Body param: Post chat analysis data to extract from the chat. This data will
   * augment the pre-defined variables extracted in the chat analysis. This will be
   * available after the chat ends.
   */
  post_chat_analysis_data?: Array<
    | ChatAgentUpdateParams.StringAnalysisData
    | ChatAgentUpdateParams.EnumAnalysisData
    | ChatAgentUpdateParams.BooleanAnalysisData
    | ChatAgentUpdateParams.NumberAnalysisData
    | ChatAgentUpdateParams.ChatPresetAnalysisData
  > | null;

  /**
   * Body param: The model to use for post chat analysis. Default to gpt-5.6-terra.
   */
  post_chat_analysis_model?:
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
   * Body param: Integration (Agent Functions) tools run as a dependency graph at
   * chat end, after post-chat analysis. Each tool can be gated by a condition. Set
   * to null to clear.
   */
  post_session_tools?: Array<
    | ChatAgentUpdateParams.AppTool
    | ChatAgentUpdateParams.CustomTool
    | ChatAgentUpdateParams.CodeTool
    | ChatAgentUpdateParams.SendSMSTool
  > | null;

  /**
   * Body param: Integration (Agent Functions) tools run as a dependency graph before
   * the chat's first message. Outputs are injected as dynamic variables. Set to null
   * to clear.
   */
  pre_session_tools?: Array<
    ChatAgentUpdateParams.AppTool | ChatAgentUpdateParams.CustomTool | ChatAgentUpdateParams.CodeTool
  > | null;

  /**
   * Body param: The Response Engine to attach to the agent. It is used to generate
   * responses for the agent. You need to create a Response Engine first before
   * attaching it to an agent.
   */
  response_engine?:
    | ChatAgentUpdateParams.ResponseEngineRetellLm
    | ChatAgentUpdateParams.ResponseEngineCustomLm
    | ChatAgentUpdateParams.ResponseEngineConversationFlow;

  /**
   * Body param: The expiration time for the signed url in milliseconds. Only
   * applicable when opt_in_signed_url is true. If not set, default value of 86400000
   * (24 hours) will apply.
   */
  signed_url_expiration_ms?: number | null;

  /**
   * Body param: IANA timezone for the agent (e.g. America/New_York). Defaults to
   * America/Los_Angeles if not set.
   */
  timezone?: string | null;

  /**
   * Body param: Optional title of the chat agent version. Used for your own
   * reference.
   */
  version_title?: string | null;

  /**
   * Body param: Which webhook events this agent should receive. If not set, defaults
   * to chat_started, chat_ended, chat_analyzed.
   */
  webhook_events?: Array<'chat_started' | 'chat_ended' | 'chat_analyzed' | 'transcript_updated'> | null;

  /**
   * Body param: The timeout for the webhook in milliseconds. If not set, default
   * value of 10000 will apply.
   */
  webhook_timeout_ms?: number;

  /**
   * Body param: The webhook for agent to listen to chat events. See what events it
   * would get at [webhook doc](/features/webhook). If set, will binds webhook events
   * for this agent to the specified url, and will ignore the account level webhook
   * for this agent. Set to `null` to remove webhook url from this agent.
   */
  webhook_url?: string | null;
}

export namespace ChatAgentUpdateParams {
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
   * Voice-only presets are not available for chat agents.
   */
  export interface HandbookConfig {
    /**
     * When asked, acknowledge being a virtual assistant.
     */
    ai_disclosure?: boolean;

    /**
     * Professional call center rep baseline.
     */
    default_personality?: boolean;

    /**
     * Warm acknowledgment of caller concerns.
     */
    high_empathy?: boolean;

    /**
     * Stay within prompt/context scope, don't invent details.
     */
    scope_boundaries?: boolean;
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
   * System preset for post-chat analysis (chat agents). Use in
   * post_chat_analysis_data to override prompts or mark fields optional.
   */
  export interface ChatPresetAnalysisData {
    /**
     * Preset identifier for chat agent analysis.
     */
    name: 'chat_summary' | 'chat_successful' | 'user_sentiment';

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
}

export interface ChatAgentListParams {
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
  filter_criteria?: ChatAgentListParams.FilterCriteria;
}

export namespace ChatAgentListParams {
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

export interface ChatAgentCreateVersionParams {
  /**
   * Existing version used as the base when creating a new draft.
   */
  base_version: number;
}

export interface ChatAgentDeleteVersionParams {
  /**
   * Version to delete.
   */
  version: number;
}

export interface ChatAgentPublishParams {
  version: number;

  version_description?: string;

  /**
   * Optional title of the agent version. Used for your own reference.
   */
  version_title?: string;
}

export declare namespace ChatAgent {
  export {
    type ChatAgentResponse as ChatAgentResponse,
    type ChatAgentListResponse as ChatAgentListResponse,
    type ChatAgentCreateVersionResponse as ChatAgentCreateVersionResponse,
    type ChatAgentCreateParams as ChatAgentCreateParams,
    type ChatAgentRetrieveParams as ChatAgentRetrieveParams,
    type ChatAgentUpdateParams as ChatAgentUpdateParams,
    type ChatAgentListParams as ChatAgentListParams,
    type ChatAgentCreateVersionParams as ChatAgentCreateVersionParams,
    type ChatAgentDeleteVersionParams as ChatAgentDeleteVersionParams,
    type ChatAgentPublishParams as ChatAgentPublishParams,
  };
}
