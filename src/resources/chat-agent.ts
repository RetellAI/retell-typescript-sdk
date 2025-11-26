// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';

export class ChatAgent extends APIResource {}

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
   * Message to display when the chat is automatically closed.
   */
  auto_close_message?: string | null;

  /**
   * Controls what data is stored for this agent. "everything" stores all data
   * including transcripts and recordings. "everything_except_pii" stores data but
   * excludes PII when possible based on PII configuration. "basic_attributes_only"
   * stores only basic metadata. If not set, defaults to "everything".
   */
  data_storage_setting?: 'everything' | 'everything_except_pii' | 'basic_attributes_only' | null;

  /**
   * If users stay silent for a period after agent speech, end the chat. The minimum
   * value allowed is 360,000 ms (0.1 hours). The maximum value allowed is
   * 259,200,000 ms (72 hours). By default, this is set to 3,600,000 (1 hour).
   */
  end_chat_after_silence_ms?: number;

  /**
   * Whether the chat agent is published.
   */
  is_published?: boolean;

  /**
   * Specifies what language (and dialect) the chat will operate in. For instance,
   * selecting `en-GB` optimizes for British English. If unset, will use default
   * value `en-US`. Select `multi` for multilingual support, currently this supports
   * Spanish and English.
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
    | 'th-TH'
    | 'vi-VN'
    | 'ro-RO'
    | 'bg-BG'
    | 'ca-ES'
    | 'da-DK'
    | 'fi-FI'
    | 'el-GR'
    | 'hu-HU'
    | 'id-ID'
    | 'no-NO'
    | 'sk-SK'
    | 'sv-SE'
    | 'multi';

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
  > | null;

  /**
   * The model to use for post chat analysis. Default to gpt-4.1-mini.
   */
  post_chat_analysis_model?:
    | 'gpt-4o'
    | 'gpt-4o-mini'
    | 'gpt-4.1'
    | 'gpt-4.1-mini'
    | 'gpt-4.1-nano'
    | 'gpt-5'
    | 'gpt-5.1'
    | 'gpt-5-mini'
    | 'gpt-5-nano'
    | 'claude-4.5-sonnet'
    | 'claude-4.0-sonnet'
    | 'claude-3.7-sonnet'
    | 'claude-3.5-haiku'
    | 'gemini-2.0-flash'
    | 'gemini-2.0-flash-lite'
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite';

  /**
   * The version of the chat agent.
   */
  version?: number;

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
}

export declare namespace ChatAgent {
  export { type ChatAgentResponse as ChatAgentResponse };
}
