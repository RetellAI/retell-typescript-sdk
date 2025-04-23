// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Llm extends APIResource {
  /**
   * Create a new Retell LLM Response Engine that can be attached to an agent. This
   * is used to generate response output for the agent.
   */
  create(body: LlmCreateParams, options?: Core.RequestOptions): Core.APIPromise<LlmResponse> {
    return this._client.post('/create-retell-llm', { body, ...options });
  }

  /**
   * Retrieve details of a specific Retell LLM Response Engine
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
   */
  list(options?: Core.RequestOptions): Core.APIPromise<LlmListResponse> {
    return this._client.get('/list-retell-llms', options);
  }

  /**
   * Delete an existing Retell LLM Response Engine
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
   * First utterance said by the agent in the call. If not set, LLM will dynamically
   * generate a message. If set to "", agent will wait for user to speak first.
   */
  begin_message?: string | null;

  /**
   * Default dynamic variables represented as key-value pairs of strings. These are
   * injected into your Retell LLM prompt and tool description when specific values
   * are not provided in a request. Only applicable for Retell LLM.
   */
  default_dynamic_variables?: Record<string, string> | null;

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
  > | null;

  /**
   * A list of knowledge base ids to use for this resource. Set to null to remove all
   * knowledge bases.
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * Select the underlying text LLM. If not set, would default to gpt-4o.
   */
  model?:
    | 'gpt-4o'
    | 'gpt-4o-mini'
    | 'gpt-4.1'
    | 'gpt-4.1-mini'
    | 'gpt-4.1-nano'
    | 'claude-3.7-sonnet'
    | 'claude-3.5-haiku'
    | 'gemini-2.0-flash'
    | 'gemini-2.0-flash-lite'
    | null;

  /**
   * If set to true, will use high priority pool with more dedicated resource to
   * ensure lower and more consistent latency, default to false. This feature usually
   * comes with a higher cost.
   */
  model_high_priority?: boolean;

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
  s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | null;

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
   * Only applicable when model is gpt-4o or gpt-4o mini. If set to true, will use
   * structured output to make sure tool call arguments follow the json schema. The
   * time to save a new tool or change to a tool will be longer as additional
   * processing is needed. Default to false.
   */
  tool_call_strict_mode?: boolean;

  /**
   * Version of the Retell LLM.
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

    type: 'transfer_call';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * If set to true, will show transferee (the user, not the AI agent) as caller when
     * transferring, requires the telephony side to support SIP REFER to PSTN. This is
     * only applicable for cold transfer, so if warm transfer option is specified, this
     * field will be ignored. Default to false (default to show AI agent as caller).
     */
    show_transferee_as_caller?: boolean | null;

    /**
     * If set, when transfer is successful, will perform a warm handoff. Can leave
     * either a static message or a dynamic one based on prompt. Set to null to disable
     * warm handoff.
     */
    warm_transfer_option?:
      | TransferCallTool.WarmTransferPrompt
      | TransferCallTool.WarmTransferStaticMessage
      | null;
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

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution: boolean;

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
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

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
      properties: Record<string, unknown>;

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
        properties: Record<string, unknown>;

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

      type: 'transfer_call';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support SIP REFER to PSTN. This is
       * only applicable for cold transfer, so if warm transfer option is specified, this
       * field will be ignored. Default to false (default to show AI agent as caller).
       */
      show_transferee_as_caller?: boolean | null;

      /**
       * If set, when transfer is successful, will perform a warm handoff. Can leave
       * either a static message or a dynamic one based on prompt. Set to null to disable
       * warm handoff.
       */
      warm_transfer_option?:
        | TransferCallTool.WarmTransferPrompt
        | TransferCallTool.WarmTransferStaticMessage
        | null;
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

      /**
       * Determines whether the agent would say sentence like "One moment, let me check
       * that." when executing the function. Recommend to turn on if your function call
       * takes over 1s (including network) to complete, so that your agent remains
       * responsive.
       */
      speak_during_execution: boolean;

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
       * The parameters the functions accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format. Omitting parameters defines a function with an
       * empty parameter list.
       */
      parameters?: CustomTool.Parameters;

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
        properties: Record<string, unknown>;

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
  }
}

export type LlmListResponse = Array<LlmResponse>;

export interface LlmCreateParams {
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
  default_dynamic_variables?: Record<string, string> | null;

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
  > | null;

  /**
   * A list of knowledge base ids to use for this resource. Set to null to remove all
   * knowledge bases.
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * Select the underlying text LLM. If not set, would default to gpt-4o.
   */
  model?:
    | 'gpt-4o'
    | 'gpt-4o-mini'
    | 'gpt-4.1'
    | 'gpt-4.1-mini'
    | 'gpt-4.1-nano'
    | 'claude-3.7-sonnet'
    | 'claude-3.5-haiku'
    | 'gemini-2.0-flash'
    | 'gemini-2.0-flash-lite'
    | null;

  /**
   * If set to true, will use high priority pool with more dedicated resource to
   * ensure lower and more consistent latency, default to false. This feature usually
   * comes with a higher cost.
   */
  model_high_priority?: boolean;

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
  s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | null;

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
   * Only applicable when model is gpt-4o or gpt-4o mini. If set to true, will use
   * structured output to make sure tool call arguments follow the json schema. The
   * time to save a new tool or change to a tool will be longer as additional
   * processing is needed. Default to false.
   */
  tool_call_strict_mode?: boolean;

  /**
   * Version of the Retell LLM.
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

    type: 'transfer_call';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * If set to true, will show transferee (the user, not the AI agent) as caller when
     * transferring, requires the telephony side to support SIP REFER to PSTN. This is
     * only applicable for cold transfer, so if warm transfer option is specified, this
     * field will be ignored. Default to false (default to show AI agent as caller).
     */
    show_transferee_as_caller?: boolean | null;

    /**
     * If set, when transfer is successful, will perform a warm handoff. Can leave
     * either a static message or a dynamic one based on prompt. Set to null to disable
     * warm handoff.
     */
    warm_transfer_option?:
      | TransferCallTool.WarmTransferPrompt
      | TransferCallTool.WarmTransferStaticMessage
      | null;
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

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution: boolean;

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
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

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
      properties: Record<string, unknown>;

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
        properties: Record<string, unknown>;

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

      type: 'transfer_call';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support SIP REFER to PSTN. This is
       * only applicable for cold transfer, so if warm transfer option is specified, this
       * field will be ignored. Default to false (default to show AI agent as caller).
       */
      show_transferee_as_caller?: boolean | null;

      /**
       * If set, when transfer is successful, will perform a warm handoff. Can leave
       * either a static message or a dynamic one based on prompt. Set to null to disable
       * warm handoff.
       */
      warm_transfer_option?:
        | TransferCallTool.WarmTransferPrompt
        | TransferCallTool.WarmTransferStaticMessage
        | null;
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

      /**
       * Determines whether the agent would say sentence like "One moment, let me check
       * that." when executing the function. Recommend to turn on if your function call
       * takes over 1s (including network) to complete, so that your agent remains
       * responsive.
       */
      speak_during_execution: boolean;

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
       * The parameters the functions accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format. Omitting parameters defines a function with an
       * empty parameter list.
       */
      parameters?: CustomTool.Parameters;

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
        properties: Record<string, unknown>;

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
  default_dynamic_variables?: Record<string, string> | null;

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
  > | null;

  /**
   * Body param: A list of knowledge base ids to use for this resource. Set to null
   * to remove all knowledge bases.
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * Body param: Select the underlying text LLM. If not set, would default to gpt-4o.
   */
  model?:
    | 'gpt-4o'
    | 'gpt-4o-mini'
    | 'gpt-4.1'
    | 'gpt-4.1-mini'
    | 'gpt-4.1-nano'
    | 'claude-3.7-sonnet'
    | 'claude-3.5-haiku'
    | 'gemini-2.0-flash'
    | 'gemini-2.0-flash-lite'
    | null;

  /**
   * Body param: If set to true, will use high priority pool with more dedicated
   * resource to ensure lower and more consistent latency, default to false. This
   * feature usually comes with a higher cost.
   */
  model_high_priority?: boolean;

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
  s2s_model?: 'gpt-4o-realtime' | 'gpt-4o-mini-realtime' | null;

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
   * Body param: Only applicable when model is gpt-4o or gpt-4o mini. If set to true,
   * will use structured output to make sure tool call arguments follow the json
   * schema. The time to save a new tool or change to a tool will be longer as
   * additional processing is needed. Default to false.
   */
  tool_call_strict_mode?: boolean;

  /**
   * Body param: Version of the Retell LLM.
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

    type: 'transfer_call';

    /**
     * Describes what the tool does, sometimes can also include information about when
     * to call the tool.
     */
    description?: string;

    /**
     * If set to true, will show transferee (the user, not the AI agent) as caller when
     * transferring, requires the telephony side to support SIP REFER to PSTN. This is
     * only applicable for cold transfer, so if warm transfer option is specified, this
     * field will be ignored. Default to false (default to show AI agent as caller).
     */
    show_transferee_as_caller?: boolean | null;

    /**
     * If set, when transfer is successful, will perform a warm handoff. Can leave
     * either a static message or a dynamic one based on prompt. Set to null to disable
     * warm handoff.
     */
    warm_transfer_option?:
      | TransferCallTool.WarmTransferPrompt
      | TransferCallTool.WarmTransferStaticMessage
      | null;
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

    /**
     * Determines whether the agent would say sentence like "One moment, let me check
     * that." when executing the function. Recommend to turn on if your function call
     * takes over 1s (including network) to complete, so that your agent remains
     * responsive.
     */
    speak_during_execution: boolean;

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
     * The parameters the functions accepts, described as a JSON Schema object. See
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format. Omitting parameters defines a function with an
     * empty parameter list.
     */
    parameters?: CustomTool.Parameters;

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
      properties: Record<string, unknown>;

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
        properties: Record<string, unknown>;

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

      type: 'transfer_call';

      /**
       * Describes what the tool does, sometimes can also include information about when
       * to call the tool.
       */
      description?: string;

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring, requires the telephony side to support SIP REFER to PSTN. This is
       * only applicable for cold transfer, so if warm transfer option is specified, this
       * field will be ignored. Default to false (default to show AI agent as caller).
       */
      show_transferee_as_caller?: boolean | null;

      /**
       * If set, when transfer is successful, will perform a warm handoff. Can leave
       * either a static message or a dynamic one based on prompt. Set to null to disable
       * warm handoff.
       */
      warm_transfer_option?:
        | TransferCallTool.WarmTransferPrompt
        | TransferCallTool.WarmTransferStaticMessage
        | null;
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

      /**
       * Determines whether the agent would say sentence like "One moment, let me check
       * that." when executing the function. Recommend to turn on if your function call
       * takes over 1s (including network) to complete, so that your agent remains
       * responsive.
       */
      speak_during_execution: boolean;

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
       * The parameters the functions accepts, described as a JSON Schema object. See
       * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
       * documentation about the format. Omitting parameters defines a function with an
       * empty parameter list.
       */
      parameters?: CustomTool.Parameters;

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
        properties: Record<string, unknown>;

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
  }
}

export declare namespace Llm {
  export {
    type LlmResponse as LlmResponse,
    type LlmListResponse as LlmListResponse,
    type LlmCreateParams as LlmCreateParams,
    type LlmRetrieveParams as LlmRetrieveParams,
    type LlmUpdateParams as LlmUpdateParams,
  };
}
