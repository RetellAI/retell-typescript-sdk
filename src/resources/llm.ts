// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'retell-sdk/core';
import { APIResource } from 'retell-sdk/resource';
import * as LlmAPI from 'retell-sdk/resources/llm';

export class Llm extends APIResource {
  /**
   * Create a new Retell LLM
   */
  create(body: LlmCreateParams, options?: Core.RequestOptions): Core.APIPromise<LlmCreateResponse> {
    return this._client.post('/create-retell-llm', { body, ...options });
  }

  /**
   * Retrieve details of a specific Retell LLM
   */
  retrieve(llmId: string, options?: Core.RequestOptions): Core.APIPromise<LlmRetrieveResponse> {
    return this._client.get(`/get-retell-llm/${llmId}`, options);
  }

  /**
   * Update an existing Retell LLM
   */
  update(
    llmId: string,
    body: LlmUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LlmUpdateResponse> {
    return this._client.patch(`/update-retell-llm/${llmId}`, { body, ...options });
  }

  /**
   * Delete an existing Retell LLM
   */
  delete(llmId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-retell-llm/${llmId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface LlmCreateResponse {
  /**
   * First utterance said by the agent in the call. If not set, LLM will dynamically
   * generate a message. If set to "", agent will wait for user to speak first.
   */
  begin_message?: string;

  /**
   * General prompt that's appended to system prompt no matter what state the agent
   * is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string;

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
    | LlmCreateResponse.EndCallTool
    | LlmCreateResponse.TransferCallTool
    | LlmCreateResponse.CheckAvailabilityCalTool
    | LlmCreateResponse.BookAppointmentCalTool
    | LlmCreateResponse.CustomTool
  >;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * Unique id of Retell LLM.
   */
  llm_id?: string;

  /**
   * The LLM Websocket URL constructed from unique id of Retell LLM. Used in agent
   * API to create / update agent.
   */
  llm_websocket_url?: string;

  /**
   * Name of the starting state. Required if states is not empty.
   */
  starting_state?: string;

  /**
   * States of the LLM. This is to help reduce prompt length and tool choices when
   * the call can be broken into distinct states. With shorter prompts and less
   * tools, the LLM can better focus and follow the rules, minimizing hallucination.
   * If this field is not set, the agent would only have general prompt and general
   * tools (essentially one state).
   */
  states?: Array<LlmCreateResponse.State>;
}

export namespace LlmCreateResponse {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes when to end the call.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * The number to transfer to in E.164 format (a + and country code, then the phone
     * number with no space or other special characters). For example, +16175551212.
     */
    number: string;

    type: 'transfer_call';

    /**
     * Describes when to transfer the call.
     */
    description?: string;
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes when to check availability.
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes when to book the appointment.
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

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
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
     * The URL we will post the function name and arguments to get a result for the
     * function. Usually this is your server.
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
     * Name of the state, must be unique for each state.
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
       * After the state transitions, the agent would speak based on the new prompt and
       * tools in the new state. This bit here controls whether to speak a transition
       * sentence during the transition (so agent would say sentences like "Let's move on
       * to the next section to help you set up an acount.", and state transitions, and
       * agent continue to speak.). Usually this is not necessary, and is recommended to
       * set to false to avoid LLM repeating itself during and after transition.
       */
      speak_during_transition: boolean;

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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes when to end the call.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * The number to transfer to in E.164 format (a + and country code, then the phone
       * number with no space or other special characters). For example, +16175551212.
       */
      number: string;

      type: 'transfer_call';

      /**
       * Describes when to transfer the call.
       */
      description?: string;
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes when to check availability.
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes when to book the appointment.
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

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
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
       * The URL we will post the function name and arguments to get a result for the
       * function. Usually this is your server.
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

export interface LlmRetrieveResponse {
  /**
   * First utterance said by the agent in the call. If not set, LLM will dynamically
   * generate a message. If set to "", agent will wait for user to speak first.
   */
  begin_message?: string;

  /**
   * General prompt that's appended to system prompt no matter what state the agent
   * is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string;

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
    | LlmRetrieveResponse.EndCallTool
    | LlmRetrieveResponse.TransferCallTool
    | LlmRetrieveResponse.CheckAvailabilityCalTool
    | LlmRetrieveResponse.BookAppointmentCalTool
    | LlmRetrieveResponse.CustomTool
  >;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * Unique id of Retell LLM.
   */
  llm_id?: string;

  /**
   * The LLM Websocket URL constructed from unique id of Retell LLM. Used in agent
   * API to create / update agent.
   */
  llm_websocket_url?: string;

  /**
   * Name of the starting state. Required if states is not empty.
   */
  starting_state?: string;

  /**
   * States of the LLM. This is to help reduce prompt length and tool choices when
   * the call can be broken into distinct states. With shorter prompts and less
   * tools, the LLM can better focus and follow the rules, minimizing hallucination.
   * If this field is not set, the agent would only have general prompt and general
   * tools (essentially one state).
   */
  states?: Array<LlmRetrieveResponse.State>;
}

export namespace LlmRetrieveResponse {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes when to end the call.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * The number to transfer to in E.164 format (a + and country code, then the phone
     * number with no space or other special characters). For example, +16175551212.
     */
    number: string;

    type: 'transfer_call';

    /**
     * Describes when to transfer the call.
     */
    description?: string;
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes when to check availability.
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes when to book the appointment.
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

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
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
     * The URL we will post the function name and arguments to get a result for the
     * function. Usually this is your server.
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
     * Name of the state, must be unique for each state.
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
       * After the state transitions, the agent would speak based on the new prompt and
       * tools in the new state. This bit here controls whether to speak a transition
       * sentence during the transition (so agent would say sentences like "Let's move on
       * to the next section to help you set up an acount.", and state transitions, and
       * agent continue to speak.). Usually this is not necessary, and is recommended to
       * set to false to avoid LLM repeating itself during and after transition.
       */
      speak_during_transition: boolean;

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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes when to end the call.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * The number to transfer to in E.164 format (a + and country code, then the phone
       * number with no space or other special characters). For example, +16175551212.
       */
      number: string;

      type: 'transfer_call';

      /**
       * Describes when to transfer the call.
       */
      description?: string;
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes when to check availability.
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes when to book the appointment.
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

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
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
       * The URL we will post the function name and arguments to get a result for the
       * function. Usually this is your server.
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

export interface LlmUpdateResponse {
  /**
   * First utterance said by the agent in the call. If not set, LLM will dynamically
   * generate a message. If set to "", agent will wait for user to speak first.
   */
  begin_message?: string;

  /**
   * General prompt that's appended to system prompt no matter what state the agent
   * is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string;

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
    | LlmUpdateResponse.EndCallTool
    | LlmUpdateResponse.TransferCallTool
    | LlmUpdateResponse.CheckAvailabilityCalTool
    | LlmUpdateResponse.BookAppointmentCalTool
    | LlmUpdateResponse.CustomTool
  >;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * Unique id of Retell LLM.
   */
  llm_id?: string;

  /**
   * The LLM Websocket URL constructed from unique id of Retell LLM. Used in agent
   * API to create / update agent.
   */
  llm_websocket_url?: string;

  /**
   * Name of the starting state. Required if states is not empty.
   */
  starting_state?: string;

  /**
   * States of the LLM. This is to help reduce prompt length and tool choices when
   * the call can be broken into distinct states. With shorter prompts and less
   * tools, the LLM can better focus and follow the rules, minimizing hallucination.
   * If this field is not set, the agent would only have general prompt and general
   * tools (essentially one state).
   */
  states?: Array<LlmUpdateResponse.State>;
}

export namespace LlmUpdateResponse {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes when to end the call.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * The number to transfer to in E.164 format (a + and country code, then the phone
     * number with no space or other special characters). For example, +16175551212.
     */
    number: string;

    type: 'transfer_call';

    /**
     * Describes when to transfer the call.
     */
    description?: string;
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes when to check availability.
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes when to book the appointment.
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

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
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
     * The URL we will post the function name and arguments to get a result for the
     * function. Usually this is your server.
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
     * Name of the state, must be unique for each state.
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
       * After the state transitions, the agent would speak based on the new prompt and
       * tools in the new state. This bit here controls whether to speak a transition
       * sentence during the transition (so agent would say sentences like "Let's move on
       * to the next section to help you set up an acount.", and state transitions, and
       * agent continue to speak.). Usually this is not necessary, and is recommended to
       * set to false to avoid LLM repeating itself during and after transition.
       */
      speak_during_transition: boolean;

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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes when to end the call.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * The number to transfer to in E.164 format (a + and country code, then the phone
       * number with no space or other special characters). For example, +16175551212.
       */
      number: string;

      type: 'transfer_call';

      /**
       * Describes when to transfer the call.
       */
      description?: string;
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes when to check availability.
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes when to book the appointment.
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

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
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
       * The URL we will post the function name and arguments to get a result for the
       * function. Usually this is your server.
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

export interface LlmCreateParams {
  /**
   * First utterance said by the agent in the call. If not set, LLM will dynamically
   * generate a message. If set to "", agent will wait for user to speak first.
   */
  begin_message?: string;

  /**
   * General prompt that's appended to system prompt no matter what state the agent
   * is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string;

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
    | LlmCreateParams.CustomTool
  >;

  /**
   * Name of the starting state. Required if states is not empty.
   */
  starting_state?: string;

  /**
   * States of the LLM. This is to help reduce prompt length and tool choices when
   * the call can be broken into distinct states. With shorter prompts and less
   * tools, the LLM can better focus and follow the rules, minimizing hallucination.
   * If this field is not set, the agent would only have general prompt and general
   * tools (essentially one state).
   */
  states?: Array<LlmCreateParams.State>;
}

export namespace LlmCreateParams {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes when to end the call.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * The number to transfer to in E.164 format (a + and country code, then the phone
     * number with no space or other special characters). For example, +16175551212.
     */
    number: string;

    type: 'transfer_call';

    /**
     * Describes when to transfer the call.
     */
    description?: string;
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes when to check availability.
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes when to book the appointment.
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

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
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
     * The URL we will post the function name and arguments to get a result for the
     * function. Usually this is your server.
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
     * Name of the state, must be unique for each state.
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
       * After the state transitions, the agent would speak based on the new prompt and
       * tools in the new state. This bit here controls whether to speak a transition
       * sentence during the transition (so agent would say sentences like "Let's move on
       * to the next section to help you set up an acount.", and state transitions, and
       * agent continue to speak.). Usually this is not necessary, and is recommended to
       * set to false to avoid LLM repeating itself during and after transition.
       */
      speak_during_transition: boolean;

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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes when to end the call.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * The number to transfer to in E.164 format (a + and country code, then the phone
       * number with no space or other special characters). For example, +16175551212.
       */
      number: string;

      type: 'transfer_call';

      /**
       * Describes when to transfer the call.
       */
      description?: string;
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes when to check availability.
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes when to book the appointment.
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

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
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
       * The URL we will post the function name and arguments to get a result for the
       * function. Usually this is your server.
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

export interface LlmUpdateParams {
  /**
   * First utterance said by the agent in the call. If not set, LLM will dynamically
   * generate a message. If set to "", agent will wait for user to speak first.
   */
  begin_message?: string;

  /**
   * General prompt that's appended to system prompt no matter what state the agent
   * is in.
   *
   * - System prompt (with state) = general prompt + state prompt.
   *
   * - System prompt (no state) = general prompt.
   */
  general_prompt?: string;

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
    | LlmUpdateParams.EndCallTool
    | LlmUpdateParams.TransferCallTool
    | LlmUpdateParams.CheckAvailabilityCalTool
    | LlmUpdateParams.BookAppointmentCalTool
    | LlmUpdateParams.CustomTool
  >;

  /**
   * Name of the starting state. Required if states is not empty.
   */
  starting_state?: string;

  /**
   * States of the LLM. This is to help reduce prompt length and tool choices when
   * the call can be broken into distinct states. With shorter prompts and less
   * tools, the LLM can better focus and follow the rules, minimizing hallucination.
   * If this field is not set, the agent would only have general prompt and general
   * tools (essentially one state).
   */
  states?: Array<LlmUpdateParams.State>;
}

export namespace LlmUpdateParams {
  export interface EndCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'end_call';

    /**
     * Describes when to end the call.
     */
    description?: string;
  }

  export interface TransferCallTool {
    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
     */
    name: string;

    /**
     * The number to transfer to in E.164 format (a + and country code, then the phone
     * number with no space or other special characters). For example, +16175551212.
     */
    number: string;

    type: 'transfer_call';

    /**
     * Describes when to transfer the call.
     */
    description?: string;
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'check_availability_cal';

    /**
     * Describes when to check availability.
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
     * time (general tools + state tools + state transitions).
     */
    name: string;

    type: 'book_appointment_cal';

    /**
     * Describes when to book the appointment.
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

  export interface CustomTool {
    /**
     * Describes what this tool does and when to call this tool.
     */
    description: string;

    /**
     * Name of the tool. Must be unique within all tools available to LLM at any given
     * time (general tools + state tools + state edges).
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
     * The URL we will post the function name and arguments to get a result for the
     * function. Usually this is your server.
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
     * Name of the state, must be unique for each state.
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
       * After the state transitions, the agent would speak based on the new prompt and
       * tools in the new state. This bit here controls whether to speak a transition
       * sentence during the transition (so agent would say sentences like "Let's move on
       * to the next section to help you set up an acount.", and state transitions, and
       * agent continue to speak.). Usually this is not necessary, and is recommended to
       * set to false to avoid LLM repeating itself during and after transition.
       */
      speak_during_transition: boolean;

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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'end_call';

      /**
       * Describes when to end the call.
       */
      description?: string;
    }

    export interface TransferCallTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
       */
      name: string;

      /**
       * The number to transfer to in E.164 format (a + and country code, then the phone
       * number with no space or other special characters). For example, +16175551212.
       */
      number: string;

      type: 'transfer_call';

      /**
       * Describes when to transfer the call.
       */
      description?: string;
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'check_availability_cal';

      /**
       * Describes when to check availability.
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
       * time (general tools + state tools + state transitions).
       */
      name: string;

      type: 'book_appointment_cal';

      /**
       * Describes when to book the appointment.
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

    export interface CustomTool {
      /**
       * Describes what this tool does and when to call this tool.
       */
      description: string;

      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state edges).
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
       * The URL we will post the function name and arguments to get a result for the
       * function. Usually this is your server.
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

export namespace Llm {
  export import LlmCreateResponse = LlmAPI.LlmCreateResponse;
  export import LlmRetrieveResponse = LlmAPI.LlmRetrieveResponse;
  export import LlmUpdateResponse = LlmAPI.LlmUpdateResponse;
  export import LlmCreateParams = LlmAPI.LlmCreateParams;
  export import LlmUpdateParams = LlmAPI.LlmUpdateParams;
}
