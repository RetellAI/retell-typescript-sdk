// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Llm extends APIResource {
  /**
   * Create a new Retell LLM Response Engine that can be attached to an agent. This
   * is used to generate response output for the agent.
   *
   * @example
   * ```ts
   * const llmResponse = await client.llm.create();
   * ```
   */
  create(body: LlmCreateParams, options?: Core.RequestOptions): Core.APIPromise<LlmResponse> {
    return this._client.post('/create-retell-llm', { body, ...options });
  }

  /**
   * Retrieve details of a specific Retell LLM Response Engine
   *
   * @example
   * ```ts
   * const llmResponse = await client.llm.retrieve(
   *   '16b980523634a6dc504898cda492e939',
   * );
   * ```
   */
  retrieve(
    llmId: string,
    query?: LlmRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LlmResponse>;
  retrieve(llmId: string, options?: Core.RequestOptions): Core.APIPromise<LlmResponse>;
  retrieve(
    llmId: string,
    query: LlmRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<LlmResponse> {
    if (isRequestOptions(query)) {
      return this.retrieve(llmId, {}, query);
    }
    return this._client.get(`/get-retell-llm/${llmId}`, { query, ...options });
  }

  /**
   * Update an existing Retell LLM Response Engine
   *
   * @example
   * ```ts
   * const llmResponse = await client.llm.update(
   *   '16b980523634a6dc504898cda492e939',
   *   {
   *     begin_message:
   *       'Hey I am a virtual assistant calling from Retell Hospital.',
   *   },
   * );
   * ```
   */
  update(
    llmId: string,
    params: LlmUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LlmResponse> {
    const { query_version, ...body } = params;
    return this._client.patch(`/update-retell-llm/${llmId}`, {
      query: { version: query_version },
      body,
      ...options,
    });
  }

  /**
   * List all Retell LLM Response Engines that can be attached to an agent.
   *
   * @example
   * ```ts
   * const llmResponses = await client.llm.list();
   * ```
   */
  list(query?: LlmListParams, options?: Core.RequestOptions): Core.APIPromise<LlmListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<LlmListResponse>;
  list(
    query: LlmListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<LlmListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/list-retell-llms', { query, ...options });
  }

  /**
   * Delete an existing Retell LLM Response Engine
   *
   * @example
   * ```ts
   * await client.llm.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
   * ```
   */
  delete(llmId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-retell-llm/${llmId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface LlmResponse {
  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp: number;

  /**
   * Unique id of Retell LLM Response Engine.
   */
  llm_id: string;

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
   * Default dynamic variables represented as key-value pairs of strings. These are
   * injected into your Retell LLM prompt and tool description when specific values
   * are not provided in a request. Only applicable for Retell LLM.
   */
  default_dynamic_variables?: { [key: string]: string } | null;

  /**
   * General prompt appended to system prompt no matter what state the agent is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string | null;

  /**
   * A list of tools the model may call (to get external knowledge, call API, etc).
   * You can select from some common predefined tools like end call, transfer call,
   * etc; or you can create your own custom tool (last option) for the LLM to use.
   *
   * - Tools of LLM (with state) = general tools + state tools + state transitions
   *
   * - Tools of LLM (no state) = general tools
   */
  general_tools?: Array<
    | LlmResponse.EndCallTool
    | LlmResponse.TransferCallTool
    | LlmResponse.CheckAvailabilityCalTool
    | LlmResponse.BookAppointmentCalTool
    | LlmResponse.PressDigitTool
    | LlmResponse.CustomTool
    | LlmResponse.ExtractDynamicVariableTool
    | LlmResponse.AgentSwapTool
    | LlmResponse.McpTool
    | LlmResponse.SendSMSTool
  > | null;

  /**
   * Whether the Retell LLM Response Engine is published.
   */
  is_published?: boolean;

  /**
   * Knowledge base configuration for RAG retrieval.
   */
  kb_config?: LlmResponse.KBConfig | null;

  /**
   * A list of knowledge base ids to use for this resource.
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * A list of MCPs to use for this LLM.
   */
  mcps?: Array<LlmResponse.Mcp> | null;

  /**
   * Select the underlying text LLM. If not set, would default to gpt-4.1.
   */
  model?:
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
  s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | 'gpt-realtime' | null;

  /**
   * The speaker who starts the conversation. Required. Must be either 'user' or
   * 'agent'.
   */
  start_speaker?: 'user' | 'agent';

  /**
   * Name of the starting state. Required if states is not empty.
   */
  starting_state?: string | null;

  /**
   * States of the LLM. This is to help reduce prompt length and tool choices when
   * the call can be broken into distinct states. With shorter prompts and less
   * tools, the LLM can better focus and follow the rules, minimizing hallucination.
   * If this field is not set, the agent would only have general prompt and general
   * tools (essentially one state).
   */
  states?: Array<LlmResponse.State> | null;

  /**
   * Whether to use strict mode for tool calls. Only applicable when using certain
   * supported models.
   */
  tool_call_strict_mode?: boolean | null;

  /**
   * The version of the LLM.
   */
  version?: number | null;
}

export namespace LlmResponse {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    transfer_destination:
      | TransferCallTool.TransferDestinationPredefined
      | TransferCallTool.TransferDestinationInferred;

    transfer_option:
      | TransferCallTool.TransferOptionColdTransfer
      | TransferCallTool.TransferOptionWarmTransfer
      | TransferCallTool.TransferOptionAgenticWarmTransfer;

    type: 'transfer_call';

    /**
     * Custom SIP headers to be added to the call.
     */
    custom_sip_headers?: { [key: string]: string };

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * If true, the e.164 validation will be ignored for the from_number. This can be
     * useful when you want to dial to internal pseudo numbers. This only applies when
     * you are using custom telephony and does not apply when you are using Retell
     * Telephony. If omitted, the default value is false.
     */
    ignore_e164_validation?: boolean;
  }

  export namespace TransferCallTool {
    export interface TransferDestinationPredefined {
      /**
       * The number to transfer to in E.164 format or a dynamic variable like
       * {{transfer_number}}.
       */
      number: string;

      /**
       * The type of transfer destination.
       */
      type: 'predefined';

      /**
       * Extension digits to dial after the main number connects. Sent via DTMF. Allow
       * digits, '\*', '#', or a dynamic variable like {{extension}}.
       */
      extension?: string;
    }

    export interface TransferDestinationInferred {
      /**
       * The prompt to be used to help infer the transfer destination. The model will
       * take the global prompt, the call transcript, and this prompt together to deduce
       * the right number to transfer to. Can contain dynamic variables.
       */
      prompt: string;

      /**
       * The type of transfer destination.
       */
      type: 'inferred';
    }

    export interface TransferOptionColdTransfer {
      /**
       * The type of the transfer.
       */
      type: 'cold_transfer';

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export interface TransferOptionWarmTransfer {
      /**
       * The type of the transfer.
       */
      type: 'warm_transfer';

      /**
       * The time to wait before considering transfer fails.
       */
      agent_detection_timeout_ms?: number;

      /**
       * IVR navigation option to run when doing human detection. This prompt will guide
       * the AI on how to navigate the IVR system.
       */
      ivr_option?: TransferOptionWarmTransfer.IvrOption;

      /**
       * The music to play while the caller is being transferred.
       */
      on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

      /**
       * If set to true, will not perform human detection for the transfer. Default to
       * false.
       */
      opt_out_human_detection?: boolean;

      /**
       * If set to true, AI will not say "Hello" after connecting the call. Default to
       * false.
       */
      opt_out_initial_message?: boolean;

      /**
       * If set, when transfer is connected, will say the handoff message only to the
       * agent receiving the transfer. Can leave either a static message or a dynamic one
       * based on prompt. Set to null to disable warm handoff.
       */
      private_handoff_option?:
        | TransferOptionWarmTransfer.WarmTransferPrompt
        | TransferOptionWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set, when transfer is successful, will say the handoff message to both the
       * transferee and the agent receiving the transfer. Can leave either a static
       * message or a dynamic one based on prompt. Set to null to disable warm handoff.
       */
      public_handoff_option?:
        | TransferOptionWarmTransfer.WarmTransferPrompt
        | TransferOptionWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export namespace TransferOptionWarmTransfer {
      /**
       * IVR navigation option to run when doing human detection. This prompt will guide
       * the AI on how to navigate the IVR system.
       */
      export interface IvrOption {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }
    }

    export interface TransferOptionAgenticWarmTransfer {
      /**
       * Configuration for agentic warm transfer. Required for agentic warm transfer.
       */
      agentic_transfer_config: TransferOptionAgenticWarmTransfer.AgenticTransferConfig;

      /**
       * The type of the transfer.
       */
      type: 'agentic_warm_transfer';

      /**
       * Whether to play an audio cue when bridging the call. Defaults to true.
       */
      enable_bridge_audio_cue?: boolean;

      /**
       * The music to play while the caller is being transferred.
       */
      on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

      /**
       * If set, when transfer is successful, will say the handoff message to both the
       * transferee and the agent receiving the transfer. Can leave either a static
       * message or a dynamic one based on prompt. Set to null to disable warm handoff.
       */
      public_handoff_option?:
        | TransferOptionAgenticWarmTransfer.WarmTransferPrompt
        | TransferOptionAgenticWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export namespace TransferOptionAgenticWarmTransfer {
      /**
       * Configuration for agentic warm transfer. Required for agentic warm transfer.
       */
      export interface AgenticTransferConfig {
        /**
         * The action to take when the transfer agent times out without making a decision.
         * Defaults to cancel_transfer.
         */
        action_on_timeout?: 'bridge_transfer' | 'cancel_transfer';

        /**
         * The agent that will mediate the transfer decision.
         */
        transfer_agent?: AgenticTransferConfig.TransferAgent;

        /**
         * The maximum time to wait for the transfer agent to make a decision, in
         * milliseconds. Defaults to 30000 (30 seconds).
         */
        transfer_timeout_ms?: number;
      }

      export namespace AgenticTransferConfig {
        /**
         * The agent that will mediate the transfer decision.
         */
        export interface TransferAgent {
          /**
           * The agent ID of the transfer agent. This agent must have isTransferAgent set to
           * true and should use bridge_transfer and cancel_transfer tools (for Retell LLM)
           * or BridgeTransferNode and CancelTransferNode (for Conversation Flow).
           */
          agent_id: string;

          /**
           * The version of the transfer agent to use.
           */
          agent_version: number;
        }
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }
    }
  }

  export interface CheckAvailabilityCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to check
     * availability for.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to check
     * availability for.
     */
    event_type_id: number;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Timezone to be used when checking availability, must be in
     * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
     * If not specified, will check if user specified timezone in call, and if not,
     * will use the timezone of the Retell servers.
     */
    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to book
     * appointment.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to book appointment.
     */
    event_type_id: number;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Timezone to be used when booking appointment, must be in
     * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
     * If not specified, will check if user specified timezone in call, and if not,
     * will use the timezone of the Retell servers.
     */
    timezone?: string;
  }

  export interface PressDigitTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'press_digit';

    /**
     * Delay in milliseconds before pressing the digit, because a lot of IVR systems
     * speak very slowly, and a delay can make sure the agent hears the full menu.
     * Default to 1000 ms (1s). Valid range is 0 to 5000 ms (inclusive).
     */
    delay_ms?: number;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution: boolean;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
      properties: { [key: string]: unknown };

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

  export interface ExtractDynamicVariableTool {
    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'extract_dynamic_variable';

    /**
     * The variables to be extracted.
     */
    variables: Array<
      | ExtractDynamicVariableTool.StringAnalysisData
      | ExtractDynamicVariableTool.EnumAnalysisData
      | ExtractDynamicVariableTool.BooleanAnalysisData
      | ExtractDynamicVariableTool.NumberAnalysisData
    >;
  }

  export namespace ExtractDynamicVariableTool {
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

  export interface AgentSwapTool {
    /**
     * The id of the agent to swap to.
     */
    agent_id: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * Post call analysis setting for the agent swap.
     */
    post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

    type: 'agent_swap';

    /**
     * The version of the agent to swap to. If not specified, will use the latest
     * version.
     */
    agent_version?: number;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * The message for the agent to speak when executing agent swap.
     */
    execution_message_description?: string;

    speak_during_execution?: boolean;

    /**
     * Webhook setting for the agent swap, defaults to only source.
     */
    webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
  }

  export interface McpTool {
    /**
     * Description of the MCP tool.
     */
    description: string;

    /**
     * Name of the MCP tool.
     */
    name: string;

    type: 'mcp';

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Unique id of the MCP.
     */
    mcp_id?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
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
  }

  export interface SendSMSTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    sms_content: SendSMSTool.SMSContentPredefined | SendSMSTool.SMSContentInferred;

    type: 'send_sms';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export namespace SendSMSTool {
    export interface SMSContentPredefined {
      /**
       * The static message to be sent in the SMS. Can contain dynamic variables.
       */
      content?: string;

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
  }

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

  export interface Mcp {
    name: string;

    /**
     * The URL of the MCP server.
     */
    url: string;

    /**
     * Headers to add to the MCP connection request.
     */
    headers?: { [key: string]: string };

    /**
     * Query parameters to append to the MCP connection request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * Maximum time to wait for a connection to be established (in milliseconds).
     * Default to 120,000 ms (2 minutes).
     */
    timeout_ms?: number;
  }

  export interface State {
    /**
     * Name of the state, must be unique for each state. Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    /**
     * Edges of the state define how and what state can be reached from this state.
     */
    edges?: Array<State.Edge>;

    /**
     * Prompt of the state, will be appended to the system prompt of LLM.
     *
     * - System prompt = general prompt + state prompt.
     */
    state_prompt?: string;

    /**
     * A list of tools specific to this state the model may call (to get external
     * knowledge, call API, etc). You can select from some common predefined tools like
     * end call, transfer call, etc; or you can create your own custom tool (last
     * option) for the LLM to use.
     *
     * - Tools of LLM = general tools + state tools + state transitions
     */
    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.PressDigitTool
      | State.CustomTool
      | State.ExtractDynamicVariableTool
      | State.AgentSwapTool
      | State.McpTool
      | State.SendSMSTool
    >;
  }

  export namespace State {
    export interface Edge {
      /**
       * Describes what's the transition and at what time / criteria should this
       * transition happen.
       */
      description: string;

      /**
       * The destination state name when going through transition of state via this edge.
       * State transition internally is implemented as a tool call of LLM, and a tool
       * call with name "transition*to*{destination_state_name}" will get created. Feel
       * free to reference it inside the prompt.
       */
      destination_state_name: string;

      /**
       * Describes what parameters you want to extract out when the transition changes.
       * The parameters extracted here can be referenced in prompts & function
       * descriptions of later states via dynamic variables. The parameters the functions
       * accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       */
      parameters?: Edge.Parameters;
    }

    export namespace Edge {
      /**
       * Describes what parameters you want to extract out when the transition changes.
       * The parameters extracted here can be referenced in prompts & function
       * descriptions of later states via dynamic variables. The parameters the functions
       * accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       */
      export interface Parameters {
        /**
         * The value of properties is an object, where each key is the name of a property
         * and each value is a schema used to validate that property.
         */
        properties: { [key: string]: unknown };

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

    export interface EndCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      transfer_destination:
        | TransferCallTool.TransferDestinationPredefined
        | TransferCallTool.TransferDestinationInferred;

      transfer_option:
        | TransferCallTool.TransferOptionColdTransfer
        | TransferCallTool.TransferOptionWarmTransfer
        | TransferCallTool.TransferOptionAgenticWarmTransfer;

      type: 'transfer_call';

      /**
       * Custom SIP headers to be added to the call.
       */
      custom_sip_headers?: { [key: string]: string };

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * If true, the e.164 validation will be ignored for the from_number. This can be
       * useful when you want to dial to internal pseudo numbers. This only applies when
       * you are using custom telephony and does not apply when you are using Retell
       * Telephony. If omitted, the default value is false.
       */
      ignore_e164_validation?: boolean;
    }

    export namespace TransferCallTool {
      export interface TransferDestinationPredefined {
        /**
         * The number to transfer to in E.164 format or a dynamic variable like
         * {{transfer_number}}.
         */
        number: string;

        /**
         * The type of transfer destination.
         */
        type: 'predefined';

        /**
         * Extension digits to dial after the main number connects. Sent via DTMF. Allow
         * digits, '\*', '#', or a dynamic variable like {{extension}}.
         */
        extension?: string;
      }

      export interface TransferDestinationInferred {
        /**
         * The prompt to be used to help infer the transfer destination. The model will
         * take the global prompt, the call transcript, and this prompt together to deduce
         * the right number to transfer to. Can contain dynamic variables.
         */
        prompt: string;

        /**
         * The type of transfer destination.
         */
        type: 'inferred';
      }

      export interface TransferOptionColdTransfer {
        /**
         * The type of the transfer.
         */
        type: 'cold_transfer';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export interface TransferOptionWarmTransfer {
        /**
         * The type of the transfer.
         */
        type: 'warm_transfer';

        /**
         * The time to wait before considering transfer fails.
         */
        agent_detection_timeout_ms?: number;

        /**
         * IVR navigation option to run when doing human detection. This prompt will guide
         * the AI on how to navigate the IVR system.
         */
        ivr_option?: TransferOptionWarmTransfer.IvrOption;

        /**
         * The music to play while the caller is being transferred.
         */
        on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

        /**
         * If set to true, will not perform human detection for the transfer. Default to
         * false.
         */
        opt_out_human_detection?: boolean;

        /**
         * If set to true, AI will not say "Hello" after connecting the call. Default to
         * false.
         */
        opt_out_initial_message?: boolean;

        /**
         * If set, when transfer is connected, will say the handoff message only to the
         * agent receiving the transfer. Can leave either a static message or a dynamic one
         * based on prompt. Set to null to disable warm handoff.
         */
        private_handoff_option?:
          | TransferOptionWarmTransfer.WarmTransferPrompt
          | TransferOptionWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set, when transfer is successful, will say the handoff message to both the
         * transferee and the agent receiving the transfer. Can leave either a static
         * message or a dynamic one based on prompt. Set to null to disable warm handoff.
         */
        public_handoff_option?:
          | TransferOptionWarmTransfer.WarmTransferPrompt
          | TransferOptionWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export namespace TransferOptionWarmTransfer {
        /**
         * IVR navigation option to run when doing human detection. This prompt will guide
         * the AI on how to navigate the IVR system.
         */
        export interface IvrOption {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }
      }

      export interface TransferOptionAgenticWarmTransfer {
        /**
         * Configuration for agentic warm transfer. Required for agentic warm transfer.
         */
        agentic_transfer_config: TransferOptionAgenticWarmTransfer.AgenticTransferConfig;

        /**
         * The type of the transfer.
         */
        type: 'agentic_warm_transfer';

        /**
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

        /**
         * The music to play while the caller is being transferred.
         */
        on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

        /**
         * If set, when transfer is successful, will say the handoff message to both the
         * transferee and the agent receiving the transfer. Can leave either a static
         * message or a dynamic one based on prompt. Set to null to disable warm handoff.
         */
        public_handoff_option?:
          | TransferOptionAgenticWarmTransfer.WarmTransferPrompt
          | TransferOptionAgenticWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export namespace TransferOptionAgenticWarmTransfer {
        /**
         * Configuration for agentic warm transfer. Required for agentic warm transfer.
         */
        export interface AgenticTransferConfig {
          /**
           * The action to take when the transfer agent times out without making a decision.
           * Defaults to cancel_transfer.
           */
          action_on_timeout?: 'bridge_transfer' | 'cancel_transfer';

          /**
           * The agent that will mediate the transfer decision.
           */
          transfer_agent?: AgenticTransferConfig.TransferAgent;

          /**
           * The maximum time to wait for the transfer agent to make a decision, in
           * milliseconds. Defaults to 30000 (30 seconds).
           */
          transfer_timeout_ms?: number;
        }

        export namespace AgenticTransferConfig {
          /**
           * The agent that will mediate the transfer decision.
           */
          export interface TransferAgent {
            /**
             * The agent ID of the transfer agent. This agent must have isTransferAgent set to
             * true and should use bridge_transfer and cancel_transfer tools (for Retell LLM)
             * or BridgeTransferNode and CancelTransferNode (for Conversation Flow).
             */
            agent_id: string;

            /**
             * The version of the transfer agent to use.
             */
            agent_version: number;
          }
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }
      }
    }

    export interface CheckAvailabilityCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to check
       * availability for.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to check
       * availability for.
       */
      event_type_id: number;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * Timezone to be used when checking availability, must be in
       * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
       * If not specified, will check if user specified timezone in call, and if not,
       * will use the timezone of the Retell servers.
       */
      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to book
       * appointment.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to book appointment.
       */
      event_type_id: number;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * Timezone to be used when booking appointment, must be in
       * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
       * If not specified, will check if user specified timezone in call, and if not,
       * will use the timezone of the Retell servers.
       */
      timezone?: string;
    }

    export interface PressDigitTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'press_digit';

      /**
       * Delay in milliseconds before pressing the digit, because a lot of IVR systems
       * speak very slowly, and a delay can make sure the agent hears the full menu.
       * Default to 1000 ms (1s). Valid range is 0 to 5000 ms (inclusive).
       */
      delay_ms?: number;

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
       * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
       * allowed).
       */
      name: string;

      /**
       * Determines whether the agent would call LLM another time and speak when the
       * result of function is obtained. Usually this needs to get turned on so user can
       * get update for the function call.
       */
      speak_after_execution: boolean;

      type: 'custom';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      url: string;

      /**
       * The description for the sentence agent say during execution. Only applicable
       * when speak_during_execution is true. Can write what to say or even provide
       * examples. The default is "The message you will say to callee when calling this
       * tool. Make sure it fits into the conversation smoothly.".
       */
      execution_message_description?: string;

      /**
       * Headers to add to the request.
       */
      headers?: { [key: string]: string };

      /**
       * Method to use for the request, default to POST.
       */
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
        properties: { [key: string]: unknown };

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

    export interface ExtractDynamicVariableTool {
      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
       * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
       * allowed).
       */
      name: string;

      type: 'extract_dynamic_variable';

      /**
       * The variables to be extracted.
       */
      variables: Array<
        | ExtractDynamicVariableTool.StringAnalysisData
        | ExtractDynamicVariableTool.EnumAnalysisData
        | ExtractDynamicVariableTool.BooleanAnalysisData
        | ExtractDynamicVariableTool.NumberAnalysisData
      >;
    }

    export namespace ExtractDynamicVariableTool {
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

    export interface AgentSwapTool {
      /**
       * The id of the agent to swap to.
       */
      agent_id: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * Post call analysis setting for the agent swap.
       */
      post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

      type: 'agent_swap';

      /**
       * The version of the agent to swap to. If not specified, will use the latest
       * version.
       */
      agent_version?: number;

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * The message for the agent to speak when executing agent swap.
       */
      execution_message_description?: string;

      speak_during_execution?: boolean;

      /**
       * Webhook setting for the agent swap, defaults to only source.
       */
      webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
    }

    export interface McpTool {
      /**
       * Description of the MCP tool.
       */
      description: string;

      /**
       * Name of the MCP tool.
       */
      name: string;

      type: 'mcp';

      /**
       * The description for the sentence agent say during execution. Only applicable
       * when speak_during_execution is true. Can write what to say or even provide
       * examples. The default is "The message you will say to callee when calling this
       * tool. Make sure it fits into the conversation smoothly.".
       */
      execution_message_description?: string;

      /**
       * Unique id of the MCP.
       */
      mcp_id?: string;

      /**
       * Response variables to add to dynamic variables, key is the variable name, value
       * is the path to the variable in the response
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
    }

    export interface SendSMSTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      sms_content: SendSMSTool.SMSContentPredefined | SendSMSTool.SMSContentInferred;

      type: 'send_sms';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export namespace SendSMSTool {
      export interface SMSContentPredefined {
        /**
         * The static message to be sent in the SMS. Can contain dynamic variables.
         */
        content?: string;

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
    }
  }
}

export type LlmListResponse = Array<LlmResponse>;

export interface LlmCreateParams {
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
   * Default dynamic variables represented as key-value pairs of strings. These are
   * injected into your Retell LLM prompt and tool description when specific values
   * are not provided in a request. Only applicable for Retell LLM.
   */
  default_dynamic_variables?: { [key: string]: string } | null;

  /**
   * General prompt appended to system prompt no matter what state the agent is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string | null;

  /**
   * A list of tools the model may call (to get external knowledge, call API, etc).
   * You can select from some common predefined tools like end call, transfer call,
   * etc; or you can create your own custom tool (last option) for the LLM to use.
   *
   * - Tools of LLM (with state) = general tools + state tools + state transitions
   *
   * - Tools of LLM (no state) = general tools
   */
  general_tools?: Array<
    | LlmCreateParams.EndCallTool
    | LlmCreateParams.TransferCallTool
    | LlmCreateParams.CheckAvailabilityCalTool
    | LlmCreateParams.BookAppointmentCalTool
    | LlmCreateParams.PressDigitTool
    | LlmCreateParams.CustomTool
    | LlmCreateParams.ExtractDynamicVariableTool
    | LlmCreateParams.AgentSwapTool
    | LlmCreateParams.McpTool
    | LlmCreateParams.SendSMSTool
  > | null;

  /**
   * Knowledge base configuration for RAG retrieval.
   */
  kb_config?: LlmCreateParams.KBConfig | null;

  /**
   * A list of knowledge base ids to use for this resource.
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * A list of MCPs to use for this LLM.
   */
  mcps?: Array<LlmCreateParams.Mcp> | null;

  /**
   * Select the underlying text LLM. If not set, would default to gpt-4.1.
   */
  model?:
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
  s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | 'gpt-realtime' | null;

  /**
   * The speaker who starts the conversation. Required. Must be either 'user' or
   * 'agent'.
   */
  start_speaker?: 'user' | 'agent';

  /**
   * Name of the starting state. Required if states is not empty.
   */
  starting_state?: string | null;

  /**
   * States of the LLM. This is to help reduce prompt length and tool choices when
   * the call can be broken into distinct states. With shorter prompts and less
   * tools, the LLM can better focus and follow the rules, minimizing hallucination.
   * If this field is not set, the agent would only have general prompt and general
   * tools (essentially one state).
   */
  states?: Array<LlmCreateParams.State> | null;

  /**
   * Whether to use strict mode for tool calls. Only applicable when using certain
   * supported models.
   */
  tool_call_strict_mode?: boolean | null;

  /**
   * The version of the LLM.
   */
  version?: number | null;
}

export namespace LlmCreateParams {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    transfer_destination:
      | TransferCallTool.TransferDestinationPredefined
      | TransferCallTool.TransferDestinationInferred;

    transfer_option:
      | TransferCallTool.TransferOptionColdTransfer
      | TransferCallTool.TransferOptionWarmTransfer
      | TransferCallTool.TransferOptionAgenticWarmTransfer;

    type: 'transfer_call';

    /**
     * Custom SIP headers to be added to the call.
     */
    custom_sip_headers?: { [key: string]: string };

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * If true, the e.164 validation will be ignored for the from_number. This can be
     * useful when you want to dial to internal pseudo numbers. This only applies when
     * you are using custom telephony and does not apply when you are using Retell
     * Telephony. If omitted, the default value is false.
     */
    ignore_e164_validation?: boolean;
  }

  export namespace TransferCallTool {
    export interface TransferDestinationPredefined {
      /**
       * The number to transfer to in E.164 format or a dynamic variable like
       * {{transfer_number}}.
       */
      number: string;

      /**
       * The type of transfer destination.
       */
      type: 'predefined';

      /**
       * Extension digits to dial after the main number connects. Sent via DTMF. Allow
       * digits, '\*', '#', or a dynamic variable like {{extension}}.
       */
      extension?: string;
    }

    export interface TransferDestinationInferred {
      /**
       * The prompt to be used to help infer the transfer destination. The model will
       * take the global prompt, the call transcript, and this prompt together to deduce
       * the right number to transfer to. Can contain dynamic variables.
       */
      prompt: string;

      /**
       * The type of transfer destination.
       */
      type: 'inferred';
    }

    export interface TransferOptionColdTransfer {
      /**
       * The type of the transfer.
       */
      type: 'cold_transfer';

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export interface TransferOptionWarmTransfer {
      /**
       * The type of the transfer.
       */
      type: 'warm_transfer';

      /**
       * The time to wait before considering transfer fails.
       */
      agent_detection_timeout_ms?: number;

      /**
       * IVR navigation option to run when doing human detection. This prompt will guide
       * the AI on how to navigate the IVR system.
       */
      ivr_option?: TransferOptionWarmTransfer.IvrOption;

      /**
       * The music to play while the caller is being transferred.
       */
      on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

      /**
       * If set to true, will not perform human detection for the transfer. Default to
       * false.
       */
      opt_out_human_detection?: boolean;

      /**
       * If set to true, AI will not say "Hello" after connecting the call. Default to
       * false.
       */
      opt_out_initial_message?: boolean;

      /**
       * If set, when transfer is connected, will say the handoff message only to the
       * agent receiving the transfer. Can leave either a static message or a dynamic one
       * based on prompt. Set to null to disable warm handoff.
       */
      private_handoff_option?:
        | TransferOptionWarmTransfer.WarmTransferPrompt
        | TransferOptionWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set, when transfer is successful, will say the handoff message to both the
       * transferee and the agent receiving the transfer. Can leave either a static
       * message or a dynamic one based on prompt. Set to null to disable warm handoff.
       */
      public_handoff_option?:
        | TransferOptionWarmTransfer.WarmTransferPrompt
        | TransferOptionWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export namespace TransferOptionWarmTransfer {
      /**
       * IVR navigation option to run when doing human detection. This prompt will guide
       * the AI on how to navigate the IVR system.
       */
      export interface IvrOption {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }
    }

    export interface TransferOptionAgenticWarmTransfer {
      /**
       * Configuration for agentic warm transfer. Required for agentic warm transfer.
       */
      agentic_transfer_config: TransferOptionAgenticWarmTransfer.AgenticTransferConfig;

      /**
       * The type of the transfer.
       */
      type: 'agentic_warm_transfer';

      /**
       * Whether to play an audio cue when bridging the call. Defaults to true.
       */
      enable_bridge_audio_cue?: boolean;

      /**
       * The music to play while the caller is being transferred.
       */
      on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

      /**
       * If set, when transfer is successful, will say the handoff message to both the
       * transferee and the agent receiving the transfer. Can leave either a static
       * message or a dynamic one based on prompt. Set to null to disable warm handoff.
       */
      public_handoff_option?:
        | TransferOptionAgenticWarmTransfer.WarmTransferPrompt
        | TransferOptionAgenticWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export namespace TransferOptionAgenticWarmTransfer {
      /**
       * Configuration for agentic warm transfer. Required for agentic warm transfer.
       */
      export interface AgenticTransferConfig {
        /**
         * The action to take when the transfer agent times out without making a decision.
         * Defaults to cancel_transfer.
         */
        action_on_timeout?: 'bridge_transfer' | 'cancel_transfer';

        /**
         * The agent that will mediate the transfer decision.
         */
        transfer_agent?: AgenticTransferConfig.TransferAgent;

        /**
         * The maximum time to wait for the transfer agent to make a decision, in
         * milliseconds. Defaults to 30000 (30 seconds).
         */
        transfer_timeout_ms?: number;
      }

      export namespace AgenticTransferConfig {
        /**
         * The agent that will mediate the transfer decision.
         */
        export interface TransferAgent {
          /**
           * The agent ID of the transfer agent. This agent must have isTransferAgent set to
           * true and should use bridge_transfer and cancel_transfer tools (for Retell LLM)
           * or BridgeTransferNode and CancelTransferNode (for Conversation Flow).
           */
          agent_id: string;

          /**
           * The version of the transfer agent to use.
           */
          agent_version: number;
        }
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }
    }
  }

  export interface CheckAvailabilityCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to check
     * availability for.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to check
     * availability for.
     */
    event_type_id: number;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Timezone to be used when checking availability, must be in
     * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
     * If not specified, will check if user specified timezone in call, and if not,
     * will use the timezone of the Retell servers.
     */
    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to book
     * appointment.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to book appointment.
     */
    event_type_id: number;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Timezone to be used when booking appointment, must be in
     * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
     * If not specified, will check if user specified timezone in call, and if not,
     * will use the timezone of the Retell servers.
     */
    timezone?: string;
  }

  export interface PressDigitTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'press_digit';

    /**
     * Delay in milliseconds before pressing the digit, because a lot of IVR systems
     * speak very slowly, and a delay can make sure the agent hears the full menu.
     * Default to 1000 ms (1s). Valid range is 0 to 5000 ms (inclusive).
     */
    delay_ms?: number;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution: boolean;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
      properties: { [key: string]: unknown };

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

  export interface ExtractDynamicVariableTool {
    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'extract_dynamic_variable';

    /**
     * The variables to be extracted.
     */
    variables: Array<
      | ExtractDynamicVariableTool.StringAnalysisData
      | ExtractDynamicVariableTool.EnumAnalysisData
      | ExtractDynamicVariableTool.BooleanAnalysisData
      | ExtractDynamicVariableTool.NumberAnalysisData
    >;
  }

  export namespace ExtractDynamicVariableTool {
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

  export interface AgentSwapTool {
    /**
     * The id of the agent to swap to.
     */
    agent_id: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * Post call analysis setting for the agent swap.
     */
    post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

    type: 'agent_swap';

    /**
     * The version of the agent to swap to. If not specified, will use the latest
     * version.
     */
    agent_version?: number;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * The message for the agent to speak when executing agent swap.
     */
    execution_message_description?: string;

    speak_during_execution?: boolean;

    /**
     * Webhook setting for the agent swap, defaults to only source.
     */
    webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
  }

  export interface McpTool {
    /**
     * Description of the MCP tool.
     */
    description: string;

    /**
     * Name of the MCP tool.
     */
    name: string;

    type: 'mcp';

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Unique id of the MCP.
     */
    mcp_id?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
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
  }

  export interface SendSMSTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    sms_content: SendSMSTool.SMSContentPredefined | SendSMSTool.SMSContentInferred;

    type: 'send_sms';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export namespace SendSMSTool {
    export interface SMSContentPredefined {
      /**
       * The static message to be sent in the SMS. Can contain dynamic variables.
       */
      content?: string;

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
  }

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

  export interface Mcp {
    name: string;

    /**
     * The URL of the MCP server.
     */
    url: string;

    /**
     * Headers to add to the MCP connection request.
     */
    headers?: { [key: string]: string };

    /**
     * Query parameters to append to the MCP connection request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * Maximum time to wait for a connection to be established (in milliseconds).
     * Default to 120,000 ms (2 minutes).
     */
    timeout_ms?: number;
  }

  export interface State {
    /**
     * Name of the state, must be unique for each state. Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    /**
     * Edges of the state define how and what state can be reached from this state.
     */
    edges?: Array<State.Edge>;

    /**
     * Prompt of the state, will be appended to the system prompt of LLM.
     *
     * - System prompt = general prompt + state prompt.
     */
    state_prompt?: string;

    /**
     * A list of tools specific to this state the model may call (to get external
     * knowledge, call API, etc). You can select from some common predefined tools like
     * end call, transfer call, etc; or you can create your own custom tool (last
     * option) for the LLM to use.
     *
     * - Tools of LLM = general tools + state tools + state transitions
     */
    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.PressDigitTool
      | State.CustomTool
      | State.ExtractDynamicVariableTool
      | State.AgentSwapTool
      | State.McpTool
      | State.SendSMSTool
    >;
  }

  export namespace State {
    export interface Edge {
      /**
       * Describes what's the transition and at what time / criteria should this
       * transition happen.
       */
      description: string;

      /**
       * The destination state name when going through transition of state via this edge.
       * State transition internally is implemented as a tool call of LLM, and a tool
       * call with name "transition*to*{destination_state_name}" will get created. Feel
       * free to reference it inside the prompt.
       */
      destination_state_name: string;

      /**
       * Describes what parameters you want to extract out when the transition changes.
       * The parameters extracted here can be referenced in prompts & function
       * descriptions of later states via dynamic variables. The parameters the functions
       * accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       */
      parameters?: Edge.Parameters;
    }

    export namespace Edge {
      /**
       * Describes what parameters you want to extract out when the transition changes.
       * The parameters extracted here can be referenced in prompts & function
       * descriptions of later states via dynamic variables. The parameters the functions
       * accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       */
      export interface Parameters {
        /**
         * The value of properties is an object, where each key is the name of a property
         * and each value is a schema used to validate that property.
         */
        properties: { [key: string]: unknown };

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

    export interface EndCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      transfer_destination:
        | TransferCallTool.TransferDestinationPredefined
        | TransferCallTool.TransferDestinationInferred;

      transfer_option:
        | TransferCallTool.TransferOptionColdTransfer
        | TransferCallTool.TransferOptionWarmTransfer
        | TransferCallTool.TransferOptionAgenticWarmTransfer;

      type: 'transfer_call';

      /**
       * Custom SIP headers to be added to the call.
       */
      custom_sip_headers?: { [key: string]: string };

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * If true, the e.164 validation will be ignored for the from_number. This can be
       * useful when you want to dial to internal pseudo numbers. This only applies when
       * you are using custom telephony and does not apply when you are using Retell
       * Telephony. If omitted, the default value is false.
       */
      ignore_e164_validation?: boolean;
    }

    export namespace TransferCallTool {
      export interface TransferDestinationPredefined {
        /**
         * The number to transfer to in E.164 format or a dynamic variable like
         * {{transfer_number}}.
         */
        number: string;

        /**
         * The type of transfer destination.
         */
        type: 'predefined';

        /**
         * Extension digits to dial after the main number connects. Sent via DTMF. Allow
         * digits, '\*', '#', or a dynamic variable like {{extension}}.
         */
        extension?: string;
      }

      export interface TransferDestinationInferred {
        /**
         * The prompt to be used to help infer the transfer destination. The model will
         * take the global prompt, the call transcript, and this prompt together to deduce
         * the right number to transfer to. Can contain dynamic variables.
         */
        prompt: string;

        /**
         * The type of transfer destination.
         */
        type: 'inferred';
      }

      export interface TransferOptionColdTransfer {
        /**
         * The type of the transfer.
         */
        type: 'cold_transfer';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export interface TransferOptionWarmTransfer {
        /**
         * The type of the transfer.
         */
        type: 'warm_transfer';

        /**
         * The time to wait before considering transfer fails.
         */
        agent_detection_timeout_ms?: number;

        /**
         * IVR navigation option to run when doing human detection. This prompt will guide
         * the AI on how to navigate the IVR system.
         */
        ivr_option?: TransferOptionWarmTransfer.IvrOption;

        /**
         * The music to play while the caller is being transferred.
         */
        on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

        /**
         * If set to true, will not perform human detection for the transfer. Default to
         * false.
         */
        opt_out_human_detection?: boolean;

        /**
         * If set to true, AI will not say "Hello" after connecting the call. Default to
         * false.
         */
        opt_out_initial_message?: boolean;

        /**
         * If set, when transfer is connected, will say the handoff message only to the
         * agent receiving the transfer. Can leave either a static message or a dynamic one
         * based on prompt. Set to null to disable warm handoff.
         */
        private_handoff_option?:
          | TransferOptionWarmTransfer.WarmTransferPrompt
          | TransferOptionWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set, when transfer is successful, will say the handoff message to both the
         * transferee and the agent receiving the transfer. Can leave either a static
         * message or a dynamic one based on prompt. Set to null to disable warm handoff.
         */
        public_handoff_option?:
          | TransferOptionWarmTransfer.WarmTransferPrompt
          | TransferOptionWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export namespace TransferOptionWarmTransfer {
        /**
         * IVR navigation option to run when doing human detection. This prompt will guide
         * the AI on how to navigate the IVR system.
         */
        export interface IvrOption {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }
      }

      export interface TransferOptionAgenticWarmTransfer {
        /**
         * Configuration for agentic warm transfer. Required for agentic warm transfer.
         */
        agentic_transfer_config: TransferOptionAgenticWarmTransfer.AgenticTransferConfig;

        /**
         * The type of the transfer.
         */
        type: 'agentic_warm_transfer';

        /**
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

        /**
         * The music to play while the caller is being transferred.
         */
        on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

        /**
         * If set, when transfer is successful, will say the handoff message to both the
         * transferee and the agent receiving the transfer. Can leave either a static
         * message or a dynamic one based on prompt. Set to null to disable warm handoff.
         */
        public_handoff_option?:
          | TransferOptionAgenticWarmTransfer.WarmTransferPrompt
          | TransferOptionAgenticWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export namespace TransferOptionAgenticWarmTransfer {
        /**
         * Configuration for agentic warm transfer. Required for agentic warm transfer.
         */
        export interface AgenticTransferConfig {
          /**
           * The action to take when the transfer agent times out without making a decision.
           * Defaults to cancel_transfer.
           */
          action_on_timeout?: 'bridge_transfer' | 'cancel_transfer';

          /**
           * The agent that will mediate the transfer decision.
           */
          transfer_agent?: AgenticTransferConfig.TransferAgent;

          /**
           * The maximum time to wait for the transfer agent to make a decision, in
           * milliseconds. Defaults to 30000 (30 seconds).
           */
          transfer_timeout_ms?: number;
        }

        export namespace AgenticTransferConfig {
          /**
           * The agent that will mediate the transfer decision.
           */
          export interface TransferAgent {
            /**
             * The agent ID of the transfer agent. This agent must have isTransferAgent set to
             * true and should use bridge_transfer and cancel_transfer tools (for Retell LLM)
             * or BridgeTransferNode and CancelTransferNode (for Conversation Flow).
             */
            agent_id: string;

            /**
             * The version of the transfer agent to use.
             */
            agent_version: number;
          }
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }
      }
    }

    export interface CheckAvailabilityCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to check
       * availability for.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to check
       * availability for.
       */
      event_type_id: number;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * Timezone to be used when checking availability, must be in
       * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
       * If not specified, will check if user specified timezone in call, and if not,
       * will use the timezone of the Retell servers.
       */
      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to book
       * appointment.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to book appointment.
       */
      event_type_id: number;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * Timezone to be used when booking appointment, must be in
       * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
       * If not specified, will check if user specified timezone in call, and if not,
       * will use the timezone of the Retell servers.
       */
      timezone?: string;
    }

    export interface PressDigitTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'press_digit';

      /**
       * Delay in milliseconds before pressing the digit, because a lot of IVR systems
       * speak very slowly, and a delay can make sure the agent hears the full menu.
       * Default to 1000 ms (1s). Valid range is 0 to 5000 ms (inclusive).
       */
      delay_ms?: number;

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
       * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
       * allowed).
       */
      name: string;

      /**
       * Determines whether the agent would call LLM another time and speak when the
       * result of function is obtained. Usually this needs to get turned on so user can
       * get update for the function call.
       */
      speak_after_execution: boolean;

      type: 'custom';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      url: string;

      /**
       * The description for the sentence agent say during execution. Only applicable
       * when speak_during_execution is true. Can write what to say or even provide
       * examples. The default is "The message you will say to callee when calling this
       * tool. Make sure it fits into the conversation smoothly.".
       */
      execution_message_description?: string;

      /**
       * Headers to add to the request.
       */
      headers?: { [key: string]: string };

      /**
       * Method to use for the request, default to POST.
       */
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
        properties: { [key: string]: unknown };

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

    export interface ExtractDynamicVariableTool {
      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
       * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
       * allowed).
       */
      name: string;

      type: 'extract_dynamic_variable';

      /**
       * The variables to be extracted.
       */
      variables: Array<
        | ExtractDynamicVariableTool.StringAnalysisData
        | ExtractDynamicVariableTool.EnumAnalysisData
        | ExtractDynamicVariableTool.BooleanAnalysisData
        | ExtractDynamicVariableTool.NumberAnalysisData
      >;
    }

    export namespace ExtractDynamicVariableTool {
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

    export interface AgentSwapTool {
      /**
       * The id of the agent to swap to.
       */
      agent_id: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * Post call analysis setting for the agent swap.
       */
      post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

      type: 'agent_swap';

      /**
       * The version of the agent to swap to. If not specified, will use the latest
       * version.
       */
      agent_version?: number;

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * The message for the agent to speak when executing agent swap.
       */
      execution_message_description?: string;

      speak_during_execution?: boolean;

      /**
       * Webhook setting for the agent swap, defaults to only source.
       */
      webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
    }

    export interface McpTool {
      /**
       * Description of the MCP tool.
       */
      description: string;

      /**
       * Name of the MCP tool.
       */
      name: string;

      type: 'mcp';

      /**
       * The description for the sentence agent say during execution. Only applicable
       * when speak_during_execution is true. Can write what to say or even provide
       * examples. The default is "The message you will say to callee when calling this
       * tool. Make sure it fits into the conversation smoothly.".
       */
      execution_message_description?: string;

      /**
       * Unique id of the MCP.
       */
      mcp_id?: string;

      /**
       * Response variables to add to dynamic variables, key is the variable name, value
       * is the path to the variable in the response
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
    }

    export interface SendSMSTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      sms_content: SendSMSTool.SMSContentPredefined | SendSMSTool.SMSContentInferred;

      type: 'send_sms';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export namespace SendSMSTool {
      export interface SMSContentPredefined {
        /**
         * The static message to be sent in the SMS. Can contain dynamic variables.
         */
        content?: string;

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
    }
  }
}

export interface LlmRetrieveParams {
  /**
   * Optional version of the API to use for this request. Default to latest version.
   */
  version?: number;
}

export interface LlmUpdateParams {
  /**
   * Query param: Optional version of the API to use for this request. Default to
   * latest version.
   */
  query_version?: number;

  /**
   * Body param: If set, the AI will begin the conversation after waiting for the
   * user for the duration (in milliseconds) specified by this attribute. This only
   * applies if the agent is configured to wait for the user to speak first. If not
   * set, the agent will wait indefinitely for the user to speak.
   */
  begin_after_user_silence_ms?: number | null;

  /**
   * Body param: First utterance said by the agent in the call. If not set, LLM will
   * dynamically generate a message. If set to "", agent will wait for user to speak
   * first.
   */
  begin_message?: string | null;

  /**
   * Body param: Default dynamic variables represented as key-value pairs of strings.
   * These are injected into your Retell LLM prompt and tool description when
   * specific values are not provided in a request. Only applicable for Retell LLM.
   */
  default_dynamic_variables?: { [key: string]: string } | null;

  /**
   * Body param: General prompt appended to system prompt no matter what state the
   * agent is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string | null;

  /**
   * Body param: A list of tools the model may call (to get external knowledge, call
   * API, etc). You can select from some common predefined tools like end call,
   * transfer call, etc; or you can create your own custom tool (last option) for the
   * LLM to use.
   *
   * - Tools of LLM (with state) = general tools + state tools + state transitions
   *
   * - Tools of LLM (no state) = general tools
   */
  general_tools?: Array<
    | LlmUpdateParams.EndCallTool
    | LlmUpdateParams.TransferCallTool
    | LlmUpdateParams.CheckAvailabilityCalTool
    | LlmUpdateParams.BookAppointmentCalTool
    | LlmUpdateParams.PressDigitTool
    | LlmUpdateParams.CustomTool
    | LlmUpdateParams.ExtractDynamicVariableTool
    | LlmUpdateParams.AgentSwapTool
    | LlmUpdateParams.McpTool
    | LlmUpdateParams.SendSMSTool
  > | null;

  /**
   * Body param: Knowledge base configuration for RAG retrieval.
   */
  kb_config?: LlmUpdateParams.KBConfig | null;

  /**
   * Body param: A list of knowledge base ids to use for this resource.
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * Body param: A list of MCPs to use for this LLM.
   */
  mcps?: Array<LlmUpdateParams.Mcp> | null;

  /**
   * Body param: Select the underlying text LLM. If not set, would default to
   * gpt-4.1.
   */
  model?:
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
   * Body param: If set to true, will use high priority pool with more dedicated
   * resource to ensure lower and more consistent latency, default to false. This
   * feature usually comes with a higher cost.
   */
  model_high_priority?: boolean | null;

  /**
   * Body param: If set, will control the randomness of the response. Value ranging
   * from [0,1]. Lower value means more deterministic, while higher value means more
   * random. If unset, default value 0 will apply. Note that for tool calling, a
   * lower value is recommended.
   */
  model_temperature?: number;

  /**
   * Body param: Select the underlying speech to speech model. Can only set this or
   * model, not both.
   */
  s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | 'gpt-realtime' | null;

  /**
   * Body param: The speaker who starts the conversation. Required. Must be either
   * 'user' or 'agent'.
   */
  start_speaker?: 'user' | 'agent';

  /**
   * Body param: Name of the starting state. Required if states is not empty.
   */
  starting_state?: string | null;

  /**
   * Body param: States of the LLM. This is to help reduce prompt length and tool
   * choices when the call can be broken into distinct states. With shorter prompts
   * and less tools, the LLM can better focus and follow the rules, minimizing
   * hallucination. If this field is not set, the agent would only have general
   * prompt and general tools (essentially one state).
   */
  states?: Array<LlmUpdateParams.State> | null;

  /**
   * Body param: Whether to use strict mode for tool calls. Only applicable when
   * using certain supported models.
   */
  tool_call_strict_mode?: boolean | null;

  /**
   * Body param: The version of the LLM.
   */
  body_version?: number | null;
}

export namespace LlmUpdateParams {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    transfer_destination:
      | TransferCallTool.TransferDestinationPredefined
      | TransferCallTool.TransferDestinationInferred;

    transfer_option:
      | TransferCallTool.TransferOptionColdTransfer
      | TransferCallTool.TransferOptionWarmTransfer
      | TransferCallTool.TransferOptionAgenticWarmTransfer;

    type: 'transfer_call';

    /**
     * Custom SIP headers to be added to the call.
     */
    custom_sip_headers?: { [key: string]: string };

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * If true, the e.164 validation will be ignored for the from_number. This can be
     * useful when you want to dial to internal pseudo numbers. This only applies when
     * you are using custom telephony and does not apply when you are using Retell
     * Telephony. If omitted, the default value is false.
     */
    ignore_e164_validation?: boolean;
  }

  export namespace TransferCallTool {
    export interface TransferDestinationPredefined {
      /**
       * The number to transfer to in E.164 format or a dynamic variable like
       * {{transfer_number}}.
       */
      number: string;

      /**
       * The type of transfer destination.
       */
      type: 'predefined';

      /**
       * Extension digits to dial after the main number connects. Sent via DTMF. Allow
       * digits, '\*', '#', or a dynamic variable like {{extension}}.
       */
      extension?: string;
    }

    export interface TransferDestinationInferred {
      /**
       * The prompt to be used to help infer the transfer destination. The model will
       * take the global prompt, the call transcript, and this prompt together to deduce
       * the right number to transfer to. Can contain dynamic variables.
       */
      prompt: string;

      /**
       * The type of transfer destination.
       */
      type: 'inferred';
    }

    export interface TransferOptionColdTransfer {
      /**
       * The type of the transfer.
       */
      type: 'cold_transfer';

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export interface TransferOptionWarmTransfer {
      /**
       * The type of the transfer.
       */
      type: 'warm_transfer';

      /**
       * The time to wait before considering transfer fails.
       */
      agent_detection_timeout_ms?: number;

      /**
       * IVR navigation option to run when doing human detection. This prompt will guide
       * the AI on how to navigate the IVR system.
       */
      ivr_option?: TransferOptionWarmTransfer.IvrOption;

      /**
       * The music to play while the caller is being transferred.
       */
      on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

      /**
       * If set to true, will not perform human detection for the transfer. Default to
       * false.
       */
      opt_out_human_detection?: boolean;

      /**
       * If set to true, AI will not say "Hello" after connecting the call. Default to
       * false.
       */
      opt_out_initial_message?: boolean;

      /**
       * If set, when transfer is connected, will say the handoff message only to the
       * agent receiving the transfer. Can leave either a static message or a dynamic one
       * based on prompt. Set to null to disable warm handoff.
       */
      private_handoff_option?:
        | TransferOptionWarmTransfer.WarmTransferPrompt
        | TransferOptionWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set, when transfer is successful, will say the handoff message to both the
       * transferee and the agent receiving the transfer. Can leave either a static
       * message or a dynamic one based on prompt. Set to null to disable warm handoff.
       */
      public_handoff_option?:
        | TransferOptionWarmTransfer.WarmTransferPrompt
        | TransferOptionWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export namespace TransferOptionWarmTransfer {
      /**
       * IVR navigation option to run when doing human detection. This prompt will guide
       * the AI on how to navigate the IVR system.
       */
      export interface IvrOption {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }
    }

    export interface TransferOptionAgenticWarmTransfer {
      /**
       * Configuration for agentic warm transfer. Required for agentic warm transfer.
       */
      agentic_transfer_config: TransferOptionAgenticWarmTransfer.AgenticTransferConfig;

      /**
       * The type of the transfer.
       */
      type: 'agentic_warm_transfer';

      /**
       * Whether to play an audio cue when bridging the call. Defaults to true.
       */
      enable_bridge_audio_cue?: boolean;

      /**
       * The music to play while the caller is being transferred.
       */
      on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

      /**
       * If set, when transfer is successful, will say the handoff message to both the
       * transferee and the agent receiving the transfer. Can leave either a static
       * message or a dynamic one based on prompt. Set to null to disable warm handoff.
       */
      public_handoff_option?:
        | TransferOptionAgenticWarmTransfer.WarmTransferPrompt
        | TransferOptionAgenticWarmTransfer.WarmTransferStaticMessage;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option.
       */
      show_transferee_as_caller?: boolean;
    }

    export namespace TransferOptionAgenticWarmTransfer {
      /**
       * Configuration for agentic warm transfer. Required for agentic warm transfer.
       */
      export interface AgenticTransferConfig {
        /**
         * The action to take when the transfer agent times out without making a decision.
         * Defaults to cancel_transfer.
         */
        action_on_timeout?: 'bridge_transfer' | 'cancel_transfer';

        /**
         * The agent that will mediate the transfer decision.
         */
        transfer_agent?: AgenticTransferConfig.TransferAgent;

        /**
         * The maximum time to wait for the transfer agent to make a decision, in
         * milliseconds. Defaults to 30000 (30 seconds).
         */
        transfer_timeout_ms?: number;
      }

      export namespace AgenticTransferConfig {
        /**
         * The agent that will mediate the transfer decision.
         */
        export interface TransferAgent {
          /**
           * The agent ID of the transfer agent. This agent must have isTransferAgent set to
           * true and should use bridge_transfer and cancel_transfer tools (for Retell LLM)
           * or BridgeTransferNode and CancelTransferNode (for Conversation Flow).
           */
          agent_id: string;

          /**
           * The version of the transfer agent to use.
           */
          agent_version: number;
        }
      }

      export interface WarmTransferPrompt {
        /**
         * The prompt to be used for warm handoff. Can contain dynamic variables.
         */
        prompt?: string;

        type?: 'prompt';
      }

      export interface WarmTransferStaticMessage {
        /**
         * The static message to be used for warm handoff. Can contain dynamic variables.
         */
        message?: string;

        type?: 'static_message';
      }
    }
  }

  export interface CheckAvailabilityCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to check
     * availability for.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to check
     * availability for.
     */
    event_type_id: number;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Timezone to be used when checking availability, must be in
     * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
     * If not specified, will check if user specified timezone in call, and if not,
     * will use the timezone of the Retell servers.
     */
    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to book
     * appointment.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to book appointment.
     */
    event_type_id: number;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * Timezone to be used when booking appointment, must be in
     * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
     * If not specified, will check if user specified timezone in call, and if not,
     * will use the timezone of the Retell servers.
     */
    timezone?: string;
  }

  export interface PressDigitTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions). Must be consisted of
     * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
     * (no space allowed).
     */
    name: string;

    type: 'press_digit';

    /**
     * Delay in milliseconds before pressing the digit, because a lot of IVR systems
     * speak very slowly, and a delay can make sure the agent hears the full menu.
     * Default to 1000 ms (1s). Valid range is 0 to 5000 ms (inclusive).
     */
    delay_ms?: number;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    /**
     * Determines whether the agent would call LLM another time and speak when the
     * result of function is obtained. Usually this needs to get turned on so user can
     * get update for the function call.
     */
    speak_after_execution: boolean;

    type: 'custom';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    url: string;

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Headers to add to the request.
     */
    headers?: { [key: string]: string };

    /**
     * Method to use for the request, default to POST.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
      properties: { [key: string]: unknown };

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

  export interface ExtractDynamicVariableTool {
    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    type: 'extract_dynamic_variable';

    /**
     * The variables to be extracted.
     */
    variables: Array<
      | ExtractDynamicVariableTool.StringAnalysisData
      | ExtractDynamicVariableTool.EnumAnalysisData
      | ExtractDynamicVariableTool.BooleanAnalysisData
      | ExtractDynamicVariableTool.NumberAnalysisData
    >;
  }

  export namespace ExtractDynamicVariableTool {
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

  export interface AgentSwapTool {
    /**
     * The id of the agent to swap to.
     */
    agent_id: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * Post call analysis setting for the agent swap.
     */
    post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

    type: 'agent_swap';

    /**
     * The version of the agent to swap to. If not specified, will use the latest
     * version.
     */
    agent_version?: number;

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * The message for the agent to speak when executing agent swap.
     */
    execution_message_description?: string;

    speak_during_execution?: boolean;

    /**
     * Webhook setting for the agent swap, defaults to only source.
     */
    webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
  }

  export interface McpTool {
    /**
     * Description of the MCP tool.
     */
    description: string;

    /**
     * Name of the MCP tool.
     */
    name: string;

    type: 'mcp';

    /**
     * The description for the sentence agent say during execution. Only applicable
     * when speak_during_execution is true. Can write what to say or even provide
     * examples. The default is "The message you will say to callee when calling this
     * tool. Make sure it fits into the conversation smoothly.".
     */
    execution_message_description?: string;

    /**
     * Unique id of the MCP.
     */
    mcp_id?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
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
  }

  export interface SendSMSTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    sms_content: SendSMSTool.SMSContentPredefined | SendSMSTool.SMSContentInferred;

    type: 'send_sms';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;
  }

  export namespace SendSMSTool {
    export interface SMSContentPredefined {
      /**
       * The static message to be sent in the SMS. Can contain dynamic variables.
       */
      content?: string;

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
  }

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

  export interface Mcp {
    name: string;

    /**
     * The URL of the MCP server.
     */
    url: string;

    /**
     * Headers to add to the MCP connection request.
     */
    headers?: { [key: string]: string };

    /**
     * Query parameters to append to the MCP connection request URL.
     */
    query_params?: { [key: string]: string };

    /**
     * Maximum time to wait for a connection to be established (in milliseconds).
     * Default to 120,000 ms (2 minutes).
     */
    timeout_ms?: number;
  }

  export interface State {
    /**
     * Name of the state, must be unique for each state. Must be consisted of a-z, A-Z,
     * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
     * allowed).
     */
    name: string;

    /**
     * Edges of the state define how and what state can be reached from this state.
     */
    edges?: Array<State.Edge>;

    /**
     * Prompt of the state, will be appended to the system prompt of LLM.
     *
     * - System prompt = general prompt + state prompt.
     */
    state_prompt?: string;

    /**
     * A list of tools specific to this state the model may call (to get external
     * knowledge, call API, etc). You can select from some common predefined tools like
     * end call, transfer call, etc; or you can create your own custom tool (last
     * option) for the LLM to use.
     *
     * - Tools of LLM = general tools + state tools + state transitions
     */
    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.PressDigitTool
      | State.CustomTool
      | State.ExtractDynamicVariableTool
      | State.AgentSwapTool
      | State.McpTool
      | State.SendSMSTool
    >;
  }

  export namespace State {
    export interface Edge {
      /**
       * Describes what's the transition and at what time / criteria should this
       * transition happen.
       */
      description: string;

      /**
       * The destination state name when going through transition of state via this edge.
       * State transition internally is implemented as a tool call of LLM, and a tool
       * call with name "transition*to*{destination_state_name}" will get created. Feel
       * free to reference it inside the prompt.
       */
      destination_state_name: string;

      /**
       * Describes what parameters you want to extract out when the transition changes.
       * The parameters extracted here can be referenced in prompts & function
       * descriptions of later states via dynamic variables. The parameters the functions
       * accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       */
      parameters?: Edge.Parameters;
    }

    export namespace Edge {
      /**
       * Describes what parameters you want to extract out when the transition changes.
       * The parameters extracted here can be referenced in prompts & function
       * descriptions of later states via dynamic variables. The parameters the functions
       * accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format.
       */
      export interface Parameters {
        /**
         * The value of properties is an object, where each key is the name of a property
         * and each value is a schema used to validate that property.
         */
        properties: { [key: string]: unknown };

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

    export interface EndCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      transfer_destination:
        | TransferCallTool.TransferDestinationPredefined
        | TransferCallTool.TransferDestinationInferred;

      transfer_option:
        | TransferCallTool.TransferOptionColdTransfer
        | TransferCallTool.TransferOptionWarmTransfer
        | TransferCallTool.TransferOptionAgenticWarmTransfer;

      type: 'transfer_call';

      /**
       * Custom SIP headers to be added to the call.
       */
      custom_sip_headers?: { [key: string]: string };

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * If true, the e.164 validation will be ignored for the from_number. This can be
       * useful when you want to dial to internal pseudo numbers. This only applies when
       * you are using custom telephony and does not apply when you are using Retell
       * Telephony. If omitted, the default value is false.
       */
      ignore_e164_validation?: boolean;
    }

    export namespace TransferCallTool {
      export interface TransferDestinationPredefined {
        /**
         * The number to transfer to in E.164 format or a dynamic variable like
         * {{transfer_number}}.
         */
        number: string;

        /**
         * The type of transfer destination.
         */
        type: 'predefined';

        /**
         * Extension digits to dial after the main number connects. Sent via DTMF. Allow
         * digits, '\*', '#', or a dynamic variable like {{extension}}.
         */
        extension?: string;
      }

      export interface TransferDestinationInferred {
        /**
         * The prompt to be used to help infer the transfer destination. The model will
         * take the global prompt, the call transcript, and this prompt together to deduce
         * the right number to transfer to. Can contain dynamic variables.
         */
        prompt: string;

        /**
         * The type of transfer destination.
         */
        type: 'inferred';
      }

      export interface TransferOptionColdTransfer {
        /**
         * The type of the transfer.
         */
        type: 'cold_transfer';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export interface TransferOptionWarmTransfer {
        /**
         * The type of the transfer.
         */
        type: 'warm_transfer';

        /**
         * The time to wait before considering transfer fails.
         */
        agent_detection_timeout_ms?: number;

        /**
         * IVR navigation option to run when doing human detection. This prompt will guide
         * the AI on how to navigate the IVR system.
         */
        ivr_option?: TransferOptionWarmTransfer.IvrOption;

        /**
         * The music to play while the caller is being transferred.
         */
        on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

        /**
         * If set to true, will not perform human detection for the transfer. Default to
         * false.
         */
        opt_out_human_detection?: boolean;

        /**
         * If set to true, AI will not say "Hello" after connecting the call. Default to
         * false.
         */
        opt_out_initial_message?: boolean;

        /**
         * If set, when transfer is connected, will say the handoff message only to the
         * agent receiving the transfer. Can leave either a static message or a dynamic one
         * based on prompt. Set to null to disable warm handoff.
         */
        private_handoff_option?:
          | TransferOptionWarmTransfer.WarmTransferPrompt
          | TransferOptionWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set, when transfer is successful, will say the handoff message to both the
         * transferee and the agent receiving the transfer. Can leave either a static
         * message or a dynamic one based on prompt. Set to null to disable warm handoff.
         */
        public_handoff_option?:
          | TransferOptionWarmTransfer.WarmTransferPrompt
          | TransferOptionWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export namespace TransferOptionWarmTransfer {
        /**
         * IVR navigation option to run when doing human detection. This prompt will guide
         * the AI on how to navigate the IVR system.
         */
        export interface IvrOption {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }
      }

      export interface TransferOptionAgenticWarmTransfer {
        /**
         * Configuration for agentic warm transfer. Required for agentic warm transfer.
         */
        agentic_transfer_config: TransferOptionAgenticWarmTransfer.AgenticTransferConfig;

        /**
         * The type of the transfer.
         */
        type: 'agentic_warm_transfer';

        /**
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

        /**
         * The music to play while the caller is being transferred.
         */
        on_hold_music?: 'none' | 'relaxing_sound' | 'uplifting_beats' | 'ringtone';

        /**
         * If set, when transfer is successful, will say the handoff message to both the
         * transferee and the agent receiving the transfer. Can leave either a static
         * message or a dynamic one based on prompt. Set to null to disable warm handoff.
         */
        public_handoff_option?:
          | TransferOptionAgenticWarmTransfer.WarmTransferPrompt
          | TransferOptionAgenticWarmTransfer.WarmTransferStaticMessage;

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring, requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option.
         */
        show_transferee_as_caller?: boolean;
      }

      export namespace TransferOptionAgenticWarmTransfer {
        /**
         * Configuration for agentic warm transfer. Required for agentic warm transfer.
         */
        export interface AgenticTransferConfig {
          /**
           * The action to take when the transfer agent times out without making a decision.
           * Defaults to cancel_transfer.
           */
          action_on_timeout?: 'bridge_transfer' | 'cancel_transfer';

          /**
           * The agent that will mediate the transfer decision.
           */
          transfer_agent?: AgenticTransferConfig.TransferAgent;

          /**
           * The maximum time to wait for the transfer agent to make a decision, in
           * milliseconds. Defaults to 30000 (30 seconds).
           */
          transfer_timeout_ms?: number;
        }

        export namespace AgenticTransferConfig {
          /**
           * The agent that will mediate the transfer decision.
           */
          export interface TransferAgent {
            /**
             * The agent ID of the transfer agent. This agent must have isTransferAgent set to
             * true and should use bridge_transfer and cancel_transfer tools (for Retell LLM)
             * or BridgeTransferNode and CancelTransferNode (for Conversation Flow).
             */
            agent_id: string;

            /**
             * The version of the transfer agent to use.
             */
            agent_version: number;
          }
        }

        export interface WarmTransferPrompt {
          /**
           * The prompt to be used for warm handoff. Can contain dynamic variables.
           */
          prompt?: string;

          type?: 'prompt';
        }

        export interface WarmTransferStaticMessage {
          /**
           * The static message to be used for warm handoff. Can contain dynamic variables.
           */
          message?: string;

          type?: 'static_message';
        }
      }
    }

    export interface CheckAvailabilityCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to check
       * availability for.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to check
       * availability for.
       */
      event_type_id: number;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * Timezone to be used when checking availability, must be in
       * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
       * If not specified, will check if user specified timezone in call, and if not,
       * will use the timezone of the Retell servers.
       */
      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to book
       * appointment.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to book appointment.
       */
      event_type_id: number;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * Timezone to be used when booking appointment, must be in
       * [IANA timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
       * If not specified, will check if user specified timezone in call, and if not,
       * will use the timezone of the Retell servers.
       */
      timezone?: string;
    }

    export interface PressDigitTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'press_digit';

      /**
       * Delay in milliseconds before pressing the digit, because a lot of IVR systems
       * speak very slowly, and a delay can make sure the agent hears the full menu.
       * Default to 1000 ms (1s). Valid range is 0 to 5000 ms (inclusive).
       */
      delay_ms?: number;

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
       * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
       * allowed).
       */
      name: string;

      /**
       * Determines whether the agent would call LLM another time and speak when the
       * result of function is obtained. Usually this needs to get turned on so user can
       * get update for the function call.
       */
      speak_after_execution: boolean;

      type: 'custom';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      url: string;

      /**
       * The description for the sentence agent say during execution. Only applicable
       * when speak_during_execution is true. Can write what to say or even provide
       * examples. The default is "The message you will say to callee when calling this
       * tool. Make sure it fits into the conversation smoothly.".
       */
      execution_message_description?: string;

      /**
       * Headers to add to the request.
       */
      headers?: { [key: string]: string };

      /**
       * Method to use for the request, default to POST.
       */
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
        properties: { [key: string]: unknown };

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

    export interface ExtractDynamicVariableTool {
      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges). Must be consisted of a-z, A-Z,
       * 0-9, or contain underscores and dashes, with a maximum length of 64 (no space
       * allowed).
       */
      name: string;

      type: 'extract_dynamic_variable';

      /**
       * The variables to be extracted.
       */
      variables: Array<
        | ExtractDynamicVariableTool.StringAnalysisData
        | ExtractDynamicVariableTool.EnumAnalysisData
        | ExtractDynamicVariableTool.BooleanAnalysisData
        | ExtractDynamicVariableTool.NumberAnalysisData
      >;
    }

    export namespace ExtractDynamicVariableTool {
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

    export interface AgentSwapTool {
      /**
       * The id of the agent to swap to.
       */
      agent_id: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * Post call analysis setting for the agent swap.
       */
      post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

      type: 'agent_swap';

      /**
       * The version of the agent to swap to. If not specified, will use the latest
       * version.
       */
      agent_version?: number;

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * The message for the agent to speak when executing agent swap.
       */
      execution_message_description?: string;

      speak_during_execution?: boolean;

      /**
       * Webhook setting for the agent swap, defaults to only source.
       */
      webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
    }

    export interface McpTool {
      /**
       * Description of the MCP tool.
       */
      description: string;

      /**
       * Name of the MCP tool.
       */
      name: string;

      type: 'mcp';

      /**
       * The description for the sentence agent say during execution. Only applicable
       * when speak_during_execution is true. Can write what to say or even provide
       * examples. The default is "The message you will say to callee when calling this
       * tool. Make sure it fits into the conversation smoothly.".
       */
      execution_message_description?: string;

      /**
       * Unique id of the MCP.
       */
      mcp_id?: string;

      /**
       * Response variables to add to dynamic variables, key is the variable name, value
       * is the path to the variable in the response
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
    }

    export interface SendSMSTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      sms_content: SendSMSTool.SMSContentPredefined | SendSMSTool.SMSContentInferred;

      type: 'send_sms';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;
    }

    export namespace SendSMSTool {
      export interface SMSContentPredefined {
        /**
         * The static message to be sent in the SMS. Can contain dynamic variables.
         */
        content?: string;

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
    }
  }
}

export interface LlmListParams {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 1000, and the default is 1000.
   */
  limit?: number;

  /**
   * The pagination key to continue fetching the next page of LLMs. Pagination key is
   * represented by a llm id, pagination key and version pair is exclusive (not
   * included in the fetched page). If not set, will start from the beginning.
   */
  pagination_key?: string;

  /**
   * Specifies the version of the llm associated with the pagination_key. When
   * paginating, both the pagination_key and its version must be provided to ensure
   * consistent ordering and to fetch the next page correctly.
   */
  pagination_key_version?: number;
}

export declare namespace Llm {
  export {
    type LlmResponse as LlmResponse,
    type LlmListResponse as LlmListResponse,
    type LlmCreateParams as LlmCreateParams,
    type LlmRetrieveParams as LlmRetrieveParams,
    type LlmUpdateParams as LlmUpdateParams,
    type LlmListParams as LlmListParams,
  };
}
