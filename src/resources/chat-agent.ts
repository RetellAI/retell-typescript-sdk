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
   * List unique agents with pagination.
   *
   * @example
   * ```ts
   * const chatAgents = await client.chatAgent.list();
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
   * Get all versions of a chat agent
   *
   * @example
   * ```ts
   * const chatAgentResponses =
   *   await client.chatAgent.getVersions(
   *     '16b980523634a6dc504898cda492e939',
   *   );
   * ```
   */
  getVersions(agentID: string, options?: RequestOptions): APIPromise<ChatAgentGetVersionsResponse> {
    return this._client.get(path`/get-chat-agent-versions/${agentID}`, options);
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
   * The model to use for post chat analysis. Default to gpt-4.1.
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
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite'
    | null;

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
}

export interface ChatAgentListResponse {
  /**
   * Whether more results are available.
   */
  has_more?: boolean;

  items?: Array<ChatAgentListResponse.Item>;

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

export type ChatAgentGetVersionsResponse = Array<ChatAgentResponse>;

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
   * The model to use for post chat analysis. Default to gpt-4.1.
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
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite'
    | null;

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
}

export interface ChatAgentRetrieveParams {
  /**
   * Optional version of the API to use for this request. If not provided, will
   * default to latest version.
   */
  version?: number | string;
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

export interface ChatAgentUpdateParams {
  /**
   * Query param: Optional version of the API to use for this request. Default to
   * latest version.
   */
  version?: number | string;

  /**
   * Body param: The name of the chat agent. Only used for your own reference.
   */
  agent_name?: string | null;

  /**
   * Body param: Message to display when the chat is automatically closed.
   */
  auto_close_message?: string | null;

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
   * a single scalar locale (e.g. `en-US`), the legacy scalar value `multi` for
   * multilingual support, or an array of concrete locale codes for explicit
   * multi-locale selection (e.g. `["en-US","es-ES"]`). The array form must contain
   * concrete locale codes only — the `multi` value is valid only as the scalar
   * legacy form and must not appear inside an array. Single-element arrays are
   * normalized to the equivalent scalar on output. If unset, defaults to `en-US`.
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
   * Body param: The model to use for post chat analysis. Default to gpt-4.1.
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
    | 'claude-4.5-sonnet'
    | 'claude-4.6-sonnet'
    | 'claude-4.5-haiku'
    | 'gemini-3.0-flash'
    | 'gemini-3.1-flash-lite'
    | null;

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

export interface ChatAgentPublishParams {
  version: number;

  version_description?: string;

  /**
   * Optional title of the agent version. Used for your own reference.
   */
  version_title?: string;
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

export declare namespace ChatAgent {
  export {
    type ChatAgentResponse as ChatAgentResponse,
    type ChatAgentListResponse as ChatAgentListResponse,
    type ChatAgentCreateVersionResponse as ChatAgentCreateVersionResponse,
    type ChatAgentGetVersionsResponse as ChatAgentGetVersionsResponse,
    type ChatAgentCreateParams as ChatAgentCreateParams,
    type ChatAgentRetrieveParams as ChatAgentRetrieveParams,
    type ChatAgentListParams as ChatAgentListParams,
    type ChatAgentUpdateParams as ChatAgentUpdateParams,
    type ChatAgentPublishParams as ChatAgentPublishParams,
    type ChatAgentCreateVersionParams as ChatAgentCreateVersionParams,
    type ChatAgentDeleteVersionParams as ChatAgentDeleteVersionParams,
  };
}
