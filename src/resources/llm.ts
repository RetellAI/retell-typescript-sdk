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
   * List all retell LLM
   */
  list(options?: Core.RequestOptions): Core.APIPromise<LlmListResponse> {
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

export interface LlmCreateResponse {
  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * General prompt used in every state.
   */
  general_prompt?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | LlmCreateResponse.EndCallTool
    | LlmCreateResponse.TransferCallTool
    | LlmCreateResponse.FormatDateTimeTool
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
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<LlmCreateResponse.State>;
}

export namespace LlmCreateResponse {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string;

    timezone?: string;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string;

    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string;

    timezone?: string;
  }

  export interface CustomTool {
    description: string;

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string;

    parameters?: CustomTool.Parameters;
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

    edges?: Array<State.Edge>;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    >;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters;

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

      description?: string;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string;

      timezone?: string;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string;

      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string;

      timezone?: string;
    }

    export interface CustomTool {
      description: string;

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string;

      parameters?: CustomTool.Parameters;
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

export interface LlmRetrieveResponse {
  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * General prompt used in every state.
   */
  general_prompt?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | LlmRetrieveResponse.EndCallTool
    | LlmRetrieveResponse.TransferCallTool
    | LlmRetrieveResponse.FormatDateTimeTool
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
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<LlmRetrieveResponse.State>;
}

export namespace LlmRetrieveResponse {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string;

    timezone?: string;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string;

    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string;

    timezone?: string;
  }

  export interface CustomTool {
    description: string;

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string;

    parameters?: CustomTool.Parameters;
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

    edges?: Array<State.Edge>;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    >;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters;

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

      description?: string;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string;

      timezone?: string;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string;

      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string;

      timezone?: string;
    }

    export interface CustomTool {
      description: string;

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string;

      parameters?: CustomTool.Parameters;
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

export interface LlmUpdateResponse {
  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * General prompt used in every state.
   */
  general_prompt?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | LlmUpdateResponse.EndCallTool
    | LlmUpdateResponse.TransferCallTool
    | LlmUpdateResponse.FormatDateTimeTool
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
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<LlmUpdateResponse.State>;
}

export namespace LlmUpdateResponse {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string;

    timezone?: string;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string;

    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string;

    timezone?: string;
  }

  export interface CustomTool {
    description: string;

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string;

    parameters?: CustomTool.Parameters;
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

    edges?: Array<State.Edge>;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    >;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters;

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

      description?: string;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string;

      timezone?: string;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string;

      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string;

      timezone?: string;
    }

    export interface CustomTool {
      description: string;

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string;

      parameters?: CustomTool.Parameters;
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

export type LlmListResponse = Array<LlmListResponse.LlmListResponseItem>;

export namespace LlmListResponse {
  export interface LlmListResponseItem {
    /**
     * Optional first phrase said by the agent.
     */
    begin_message?: string;

    /**
     * General prompt used in every state.
     */
    general_prompt?: string;

    /**
     * Optional array of tools used in every state.
     */
    general_tools?: Array<
      | LlmListResponseItem.EndCallTool
      | LlmListResponseItem.TransferCallTool
      | LlmListResponseItem.FormatDateTimeTool
      | LlmListResponseItem.CheckAvailabilityCalTool
      | LlmListResponseItem.BookAppointmentCalTool
      | LlmListResponseItem.CustomTool
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
    states?: Array<LlmListResponseItem.State>;
  }

  export namespace LlmListResponseItem {
    export interface EndCallTool {
      name: string;

      type: 'end_call';

      description?: string;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string;

      timezone?: string;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string;

      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string;

      timezone?: string;
    }

    export interface CustomTool {
      description: string;

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string;

      parameters?: CustomTool.Parameters;
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

      edges?: Array<State.Edge>;

      tools?: Array<
        | State.EndCallTool
        | State.TransferCallTool
        | State.FormatDateTimeTool
        | State.CheckAvailabilityCalTool
        | State.BookAppointmentCalTool
        | State.CustomTool
      >;
    }

    export namespace State {
      export interface Edge {
        description: string;

        destination_state_name: string;

        parameters?: Edge.Parameters;

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

        description?: string;
      }

      export interface TransferCallTool {
        name: string;

        number: string;

        type: 'transfer_call';

        description?: string;
      }

      export interface FormatDateTimeTool {
        name: string;

        type: 'parse_relative_date_time';

        description?: string;

        timezone?: string;
      }

      export interface CheckAvailabilityCalTool {
        cal_api_key: string;

        event_type_id: number;

        name: string;

        type: 'check_availability_cal';

        description?: string;

        timezone?: string;
      }

      export interface BookAppointmentCalTool {
        cal_api_key: string;

        event_type_id: number;

        name: string;

        type: 'book_appointment_cal';

        description?: string;

        timezone?: string;
      }

      export interface CustomTool {
        description: string;

        name: string;

        speak_after_execution: boolean;

        speak_during_execution: boolean;

        type: 'custom';

        url: string;

        execution_message_description?: string;

        parameters?: CustomTool.Parameters;
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

export interface LlmCreateParams {
  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * General prompt used in every state.
   */
  general_prompt?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | LlmCreateParams.EndCallTool
    | LlmCreateParams.TransferCallTool
    | LlmCreateParams.FormatDateTimeTool
    | LlmCreateParams.CheckAvailabilityCalTool
    | LlmCreateParams.BookAppointmentCalTool
    | LlmCreateParams.CustomTool
  >;

  /**
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<LlmCreateParams.State>;
}

export namespace LlmCreateParams {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string;

    timezone?: string;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string;

    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string;

    timezone?: string;
  }

  export interface CustomTool {
    description: string;

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string;

    parameters?: CustomTool.Parameters;
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

    edges?: Array<State.Edge>;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    >;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters;

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

      description?: string;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string;

      timezone?: string;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string;

      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string;

      timezone?: string;
    }

    export interface CustomTool {
      description: string;

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string;

      parameters?: CustomTool.Parameters;
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

export interface LlmUpdateParams {
  /**
   * Optional first phrase said by the agent.
   */
  begin_message?: string;

  /**
   * General prompt used in every state.
   */
  general_prompt?: string;

  /**
   * Optional array of tools used in every state.
   */
  general_tools?: Array<
    | LlmUpdateParams.EndCallTool
    | LlmUpdateParams.TransferCallTool
    | LlmUpdateParams.FormatDateTimeTool
    | LlmUpdateParams.CheckAvailabilityCalTool
    | LlmUpdateParams.BookAppointmentCalTool
    | LlmUpdateParams.CustomTool
  >;

  /**
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states.
   */
  states?: Array<LlmUpdateParams.State>;
}

export namespace LlmUpdateParams {
  export interface EndCallTool {
    name: string;

    type: 'end_call';

    description?: string;
  }

  export interface TransferCallTool {
    name: string;

    number: string;

    type: 'transfer_call';

    description?: string;
  }

  export interface FormatDateTimeTool {
    name: string;

    type: 'parse_relative_date_time';

    description?: string;

    timezone?: string;
  }

  export interface CheckAvailabilityCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'check_availability_cal';

    description?: string;

    timezone?: string;
  }

  export interface BookAppointmentCalTool {
    cal_api_key: string;

    event_type_id: number;

    name: string;

    type: 'book_appointment_cal';

    description?: string;

    timezone?: string;
  }

  export interface CustomTool {
    description: string;

    name: string;

    speak_after_execution: boolean;

    speak_during_execution: boolean;

    type: 'custom';

    url: string;

    execution_message_description?: string;

    parameters?: CustomTool.Parameters;
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

    edges?: Array<State.Edge>;

    tools?: Array<
      | State.EndCallTool
      | State.TransferCallTool
      | State.FormatDateTimeTool
      | State.CheckAvailabilityCalTool
      | State.BookAppointmentCalTool
      | State.CustomTool
    >;
  }

  export namespace State {
    export interface Edge {
      description: string;

      destination_state_name: string;

      parameters?: Edge.Parameters;

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

      description?: string;
    }

    export interface TransferCallTool {
      name: string;

      number: string;

      type: 'transfer_call';

      description?: string;
    }

    export interface FormatDateTimeTool {
      name: string;

      type: 'parse_relative_date_time';

      description?: string;

      timezone?: string;
    }

    export interface CheckAvailabilityCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'check_availability_cal';

      description?: string;

      timezone?: string;
    }

    export interface BookAppointmentCalTool {
      cal_api_key: string;

      event_type_id: number;

      name: string;

      type: 'book_appointment_cal';

      description?: string;

      timezone?: string;
    }

    export interface CustomTool {
      description: string;

      name: string;

      speak_after_execution: boolean;

      speak_during_execution: boolean;

      type: 'custom';

      url: string;

      execution_message_description?: string;

      parameters?: CustomTool.Parameters;
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

export namespace Llm {
  export import LlmCreateResponse = LlmAPI.LlmCreateResponse;
  export import LlmRetrieveResponse = LlmAPI.LlmRetrieveResponse;
  export import LlmUpdateResponse = LlmAPI.LlmUpdateResponse;
  export import LlmListResponse = LlmAPI.LlmListResponse;
  export import LlmCreateParams = LlmAPI.LlmCreateParams;
  export import LlmUpdateParams = LlmAPI.LlmUpdateParams;
}
