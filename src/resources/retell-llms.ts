// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'retell-sdk/core';
import { APIResource } from 'retell-sdk/resource';
import * as RetellLlmsAPI from 'retell-sdk/resources/retell-llms';

export class RetellLlms extends APIResource {
  /**
   * Create a new Retell LLM
   */
  create(
    body: RetellLlmCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RetellLlmCreateResponse> {
    return this._client.post('/create-retell-llm', { body, ...options });
  }

  /**
   * Retrieve details of a specific Retell LLM
   */
  retrieve(llmId: string, options?: Core.RequestOptions): Core.APIPromise<RetellLlmRetrieveResponse> {
    return this._client.get(`/get-retell-llm/${llmId}`, options);
  }

  /**
   * Update an existing Retell LLM
   */
  update(
    llmId: string,
    body: RetellLlmUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RetellLlmUpdateResponse> {
    return this._client.patch(`/update-retell-llm/${llmId}`, { body, ...options });
  }

  /**
   * List all retell LLM
   */
  list(options?: Core.RequestOptions): Core.APIPromise<RetellLlmListResponse> {
    return this._client.get('/list-retell-llm', options);
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

export interface RetellLlmCreateResponse {
  /**
   * General prompt used in every state.
   */
  general_prompt: string;

  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | RetellLlmCreateResponse.EndCallTool
    | RetellLlmCreateResponse.TransferCallTool
    | RetellLlmCreateResponse.FormatDateTimeTool
    | RetellLlmCreateResponse.CheckAvailabilityCalTool
    | RetellLlmCreateResponse.BookAppointmentCalTool
    | RetellLlmCreateResponse.CustomTool
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
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<RetellLlmCreateResponse.State>;
}

export namespace RetellLlmCreateResponse {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string | null;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string | null;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CustomTool {
    description: string;

    execution_timing: 'immediate' | 'await_agent_turn';

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string | null;

    parameters?: CustomTool.Parameters | null;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties: Record<string, unknown>;

      type: 'object';

      required?: Array<string>;
    }
  }

  export interface State {
    name: string;

    state_prompt: string;

    edges?: Array<State.Edge> | null;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    > | null;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters | null;

      speak_during_transition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }

    export interface EndCallTool {
      name: string;

      type: 'end_call';

      description?: string | null;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string | null;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CustomTool {
      description: string;

      execution_timing: 'immediate' | 'await_agent_turn';

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string | null;

      parameters?: CustomTool.Parameters | null;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }
  }
}

export interface RetellLlmRetrieveResponse {
  /**
   * General prompt used in every state.
   */
  general_prompt: string;

  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | RetellLlmRetrieveResponse.EndCallTool
    | RetellLlmRetrieveResponse.TransferCallTool
    | RetellLlmRetrieveResponse.FormatDateTimeTool
    | RetellLlmRetrieveResponse.CheckAvailabilityCalTool
    | RetellLlmRetrieveResponse.BookAppointmentCalTool
    | RetellLlmRetrieveResponse.CustomTool
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
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<RetellLlmRetrieveResponse.State>;
}

export namespace RetellLlmRetrieveResponse {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string | null;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string | null;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CustomTool {
    description: string;

    execution_timing: 'immediate' | 'await_agent_turn';

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string | null;

    parameters?: CustomTool.Parameters | null;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties: Record<string, unknown>;

      type: 'object';

      required?: Array<string>;
    }
  }

  export interface State {
    name: string;

    state_prompt: string;

    edges?: Array<State.Edge> | null;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    > | null;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters | null;

      speak_during_transition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }

    export interface EndCallTool {
      name: string;

      type: 'end_call';

      description?: string | null;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string | null;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CustomTool {
      description: string;

      execution_timing: 'immediate' | 'await_agent_turn';

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string | null;

      parameters?: CustomTool.Parameters | null;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }
  }
}

export interface RetellLlmUpdateResponse {
  /**
   * General prompt used in every state.
   */
  general_prompt: string;

  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | RetellLlmUpdateResponse.EndCallTool
    | RetellLlmUpdateResponse.TransferCallTool
    | RetellLlmUpdateResponse.FormatDateTimeTool
    | RetellLlmUpdateResponse.CheckAvailabilityCalTool
    | RetellLlmUpdateResponse.BookAppointmentCalTool
    | RetellLlmUpdateResponse.CustomTool
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
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<RetellLlmUpdateResponse.State>;
}

export namespace RetellLlmUpdateResponse {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string | null;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string | null;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CustomTool {
    description: string;

    execution_timing: 'immediate' | 'await_agent_turn';

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string | null;

    parameters?: CustomTool.Parameters | null;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties: Record<string, unknown>;

      type: 'object';

      required?: Array<string>;
    }
  }

  export interface State {
    name: string;

    state_prompt: string;

    edges?: Array<State.Edge> | null;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    > | null;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters | null;

      speak_during_transition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }

    export interface EndCallTool {
      name: string;

      type: 'end_call';

      description?: string | null;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string | null;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CustomTool {
      description: string;

      execution_timing: 'immediate' | 'await_agent_turn';

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string | null;

      parameters?: CustomTool.Parameters | null;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }
  }
}

export type RetellLlmListResponse = Array<RetellLlmListResponse.RetellLlmListResponseItem>;

export namespace RetellLlmListResponse {
  export interface RetellLlmListResponseItem {
    /**
     * General prompt used in every state.
     */
    general_prompt: string;

    /**
     * Optional first phrase said by the agent.
     */
    begin_message?: string;

    /**
     * Optional array of tools used in every state.
     */
    general_tools?: Array<
      | RetellLlmListResponseItem.EndCallTool
      | RetellLlmListResponseItem.TransferCallTool
      | RetellLlmListResponseItem.FormatDateTimeTool
      | RetellLlmListResponseItem.CheckAvailabilityCalTool
      | RetellLlmListResponseItem.BookAppointmentCalTool
      | RetellLlmListResponseItem.CustomTool
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
     * Optional identifier of the starting state.
     */
    starting_state?: string;

    /**
     * Optional array of states.
     */
    states?: Array<RetellLlmListResponseItem.State>;
  }

  export namespace RetellLlmListResponseItem {
    export interface EndCallTool {
      name: string;

      type: 'end_call';

      description?: string | null;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string | null;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CustomTool {
      description: string;

      execution_timing: 'immediate' | 'await_agent_turn';

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string | null;

      parameters?: CustomTool.Parameters | null;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }

    export interface State {
      name: string;

      state_prompt: string;

      edges?: Array<State.Edge> | null;

      tools?: Array<
        | State.EndCallTool
        | State.TransferCallTool
        | State.FormatDateTimeTool
        | State.CheckAvailabilityCalTool
        | State.BookAppointmentCalTool
        | State.CustomTool
      > | null;
    }

    export namespace State {
      export interface Edge {
        description: string;

        destination_state_name: string;

        parameters?: Edge.Parameters | null;

        speak_during_transition?: boolean;
      }

      export namespace Edge {
        export interface Parameters {
          properties: Record<string, unknown>;

          type: 'object';

          required?: Array<string>;
        }
      }

      export interface EndCallTool {
        name: string;

        type: 'end_call';

        description?: string | null;
      }

      export interface TransferCallTool {
        name: string;

        number: string;

        type: 'transfer_call';

        description?: string | null;
      }

      export interface FormatDateTimeTool {
        name: string;

        type: 'parse_relative_date_time';

        description?: string | null;

        timezone?: string | null;
      }

      export interface CheckAvailabilityCalTool {
        cal_api_key: string;

        event_type_id: number;

        name: string;

        type: 'check_availability_cal';

        description?: string | null;

        timezone?: string | null;
      }

      export interface BookAppointmentCalTool {
        cal_api_key: string;

        event_type_id: number;

        name: string;

        type: 'book_appointment_cal';

        description?: string | null;

        timezone?: string | null;
      }

      export interface CustomTool {
        description: string;

        execution_timing: 'immediate' | 'await_agent_turn';

        name: string;

        speak_after_execution: boolean;

        speak_during_execution: boolean;

        type: 'custom';

        url: string;

        execution_message_description?: string | null;

        parameters?: CustomTool.Parameters | null;
      }

      export namespace CustomTool {
        export interface Parameters {
          properties: Record<string, unknown>;

          type: 'object';

          required?: Array<string>;
        }
      }
    }
  }
}

export interface RetellLlmCreateParams {
  /**
   * General prompt used in every state.
   */
  general_prompt: string;

  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | RetellLlmCreateParams.EndCallTool
    | RetellLlmCreateParams.TransferCallTool
    | RetellLlmCreateParams.FormatDateTimeTool
    | RetellLlmCreateParams.CheckAvailabilityCalTool
    | RetellLlmCreateParams.BookAppointmentCalTool
    | RetellLlmCreateParams.CustomTool
  >;

  /**
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<RetellLlmCreateParams.State>;
}

export namespace RetellLlmCreateParams {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string | null;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string | null;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CustomTool {
    description: string;

    execution_timing: 'immediate' | 'await_agent_turn';

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string | null;

    parameters?: CustomTool.Parameters | null;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties: Record<string, unknown>;

      type: 'object';

      required?: Array<string>;
    }
  }

  export interface State {
    name: string;

    state_prompt: string;

    edges?: Array<State.Edge> | null;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    > | null;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters | null;

      speak_during_transition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }

    export interface EndCallTool {
      name: string;

      type: 'end_call';

      description?: string | null;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string | null;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CustomTool {
      description: string;

      execution_timing: 'immediate' | 'await_agent_turn';

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string | null;

      parameters?: CustomTool.Parameters | null;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }
  }
}

export interface RetellLlmUpdateParams {
  /**
   * General prompt used in every state.
   */
  general_prompt: string;

  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | RetellLlmUpdateParams.EndCallTool
    | RetellLlmUpdateParams.TransferCallTool
    | RetellLlmUpdateParams.FormatDateTimeTool
    | RetellLlmUpdateParams.CheckAvailabilityCalTool
    | RetellLlmUpdateParams.BookAppointmentCalTool
    | RetellLlmUpdateParams.CustomTool
  >;

  /**
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<RetellLlmUpdateParams.State>;
}

export namespace RetellLlmUpdateParams {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string | null;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string | null;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string | null;

    timezone?: string | null;
  }

  export interface CustomTool {
    description: string;

    execution_timing: 'immediate' | 'await_agent_turn';

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string | null;

    parameters?: CustomTool.Parameters | null;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties: Record<string, unknown>;

      type: 'object';

      required?: Array<string>;
    }
  }

  export interface State {
    name: string;

    state_prompt: string;

    edges?: Array<State.Edge> | null;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    > | null;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters | null;

      speak_during_transition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }

    export interface EndCallTool {
      name: string;

      type: 'end_call';

      description?: string | null;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string | null;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string | null;

      timezone?: string | null;
    }

    export interface CustomTool {
      description: string;

      execution_timing: 'immediate' | 'await_agent_turn';

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string | null;

      parameters?: CustomTool.Parameters | null;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties: Record<string, unknown>;

        type: 'object';

        required?: Array<string>;
      }
    }
  }
}

export namespace RetellLlms {
  export import RetellLlmCreateResponse = RetellLlmsAPI.RetellLlmCreateResponse;
  export import RetellLlmRetrieveResponse = RetellLlmsAPI.RetellLlmRetrieveResponse;
  export import RetellLlmUpdateResponse = RetellLlmsAPI.RetellLlmUpdateResponse;
  export import RetellLlmListResponse = RetellLlmsAPI.RetellLlmListResponse;
  export import RetellLlmCreateParams = RetellLlmsAPI.RetellLlmCreateParams;
  export import RetellLlmUpdateParams = RetellLlmsAPI.RetellLlmUpdateParams;
}
