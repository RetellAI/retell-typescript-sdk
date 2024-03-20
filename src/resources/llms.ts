// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'toddlzt/core';
import { APIResource } from 'toddlzt/resource';
import * as LlmsAPI from 'toddlzt/resources/llms';

export class Llms extends APIResource {
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
    LlmCreateResponse.EndCallTool | LlmCreateResponse.TransferCallTool | LlmCreateResponse.CustomTool
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
   * Optional array of states for the agent.
   */
  states?: Array<LlmCreateResponse.State>;
}

export namespace LlmCreateResponse {
  export interface EndCallTool {
    description?: string | null;

    name?: 'end_call';

    type?: 'pre_defined';
  }

  export interface TransferCallTool {
    description?: string | null;

    name?: 'transfer_call';

    number?: string;

    type?: 'pre_defined';
  }

  export interface CustomTool {
    description?: string;

    execution_message_description?: string | null;

    execution_timing?: 'immediate' | 'await_agent_turn';

    name?: string;

    parameters?: CustomTool.Parameters | null;

    speak_after_execution?: boolean;

    speak_during_execution?: boolean;

    type?: 'custom';

    url?: string;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties?: Record<string, unknown>;

      required?: Array<string>;

      type?: 'object';
    }
  }

  export interface State {
    edges?: Array<State.Edge> | null;

    name?: string;

    state_prompt?: string;

    tools?: Array<State.EndCallTool | State.TransferCallTool | State.CustomTool> | null;
  }

  export namespace State {
    export interface Edge {
      description?: string;

      destinationStateName?: string;

      parameters?: Edge.Parameters | null;

      speakDuringTransition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
      }
    }

    export interface EndCallTool {
      description?: string | null;

      name?: 'end_call';

      type?: 'pre_defined';
    }

    export interface TransferCallTool {
      description?: string | null;

      name?: 'transfer_call';

      number?: string;

      type?: 'pre_defined';
    }

    export interface CustomTool {
      description?: string;

      execution_message_description?: string | null;

      execution_timing?: 'immediate' | 'await_agent_turn';

      name?: string;

      parameters?: CustomTool.Parameters | null;

      speak_after_execution?: boolean;

      speak_during_execution?: boolean;

      type?: 'custom';

      url?: string;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
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
    LlmRetrieveResponse.EndCallTool | LlmRetrieveResponse.TransferCallTool | LlmRetrieveResponse.CustomTool
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
   * Optional array of states for the agent.
   */
  states?: Array<LlmRetrieveResponse.State>;
}

export namespace LlmRetrieveResponse {
  export interface EndCallTool {
    description?: string | null;

    name?: 'end_call';

    type?: 'pre_defined';
  }

  export interface TransferCallTool {
    description?: string | null;

    name?: 'transfer_call';

    number?: string;

    type?: 'pre_defined';
  }

  export interface CustomTool {
    description?: string;

    execution_message_description?: string | null;

    execution_timing?: 'immediate' | 'await_agent_turn';

    name?: string;

    parameters?: CustomTool.Parameters | null;

    speak_after_execution?: boolean;

    speak_during_execution?: boolean;

    type?: 'custom';

    url?: string;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties?: Record<string, unknown>;

      required?: Array<string>;

      type?: 'object';
    }
  }

  export interface State {
    edges?: Array<State.Edge> | null;

    name?: string;

    state_prompt?: string;

    tools?: Array<State.EndCallTool | State.TransferCallTool | State.CustomTool> | null;
  }

  export namespace State {
    export interface Edge {
      description?: string;

      destinationStateName?: string;

      parameters?: Edge.Parameters | null;

      speakDuringTransition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
      }
    }

    export interface EndCallTool {
      description?: string | null;

      name?: 'end_call';

      type?: 'pre_defined';
    }

    export interface TransferCallTool {
      description?: string | null;

      name?: 'transfer_call';

      number?: string;

      type?: 'pre_defined';
    }

    export interface CustomTool {
      description?: string;

      execution_message_description?: string | null;

      execution_timing?: 'immediate' | 'await_agent_turn';

      name?: string;

      parameters?: CustomTool.Parameters | null;

      speak_after_execution?: boolean;

      speak_during_execution?: boolean;

      type?: 'custom';

      url?: string;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
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
    LlmUpdateResponse.EndCallTool | LlmUpdateResponse.TransferCallTool | LlmUpdateResponse.CustomTool
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
   * Optional array of states for the agent.
   */
  states?: Array<LlmUpdateResponse.State>;
}

export namespace LlmUpdateResponse {
  export interface EndCallTool {
    description?: string | null;

    name?: 'end_call';

    type?: 'pre_defined';
  }

  export interface TransferCallTool {
    description?: string | null;

    name?: 'transfer_call';

    number?: string;

    type?: 'pre_defined';
  }

  export interface CustomTool {
    description?: string;

    execution_message_description?: string | null;

    execution_timing?: 'immediate' | 'await_agent_turn';

    name?: string;

    parameters?: CustomTool.Parameters | null;

    speak_after_execution?: boolean;

    speak_during_execution?: boolean;

    type?: 'custom';

    url?: string;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties?: Record<string, unknown>;

      required?: Array<string>;

      type?: 'object';
    }
  }

  export interface State {
    edges?: Array<State.Edge> | null;

    name?: string;

    state_prompt?: string;

    tools?: Array<State.EndCallTool | State.TransferCallTool | State.CustomTool> | null;
  }

  export namespace State {
    export interface Edge {
      description?: string;

      destinationStateName?: string;

      parameters?: Edge.Parameters | null;

      speakDuringTransition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
      }
    }

    export interface EndCallTool {
      description?: string | null;

      name?: 'end_call';

      type?: 'pre_defined';
    }

    export interface TransferCallTool {
      description?: string | null;

      name?: 'transfer_call';

      number?: string;

      type?: 'pre_defined';
    }

    export interface CustomTool {
      description?: string;

      execution_message_description?: string | null;

      execution_timing?: 'immediate' | 'await_agent_turn';

      name?: string;

      parameters?: CustomTool.Parameters | null;

      speak_after_execution?: boolean;

      speak_during_execution?: boolean;

      type?: 'custom';

      url?: string;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
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
      LlmListResponseItem.EndCallTool | LlmListResponseItem.TransferCallTool | LlmListResponseItem.CustomTool
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
     * Optional array of states for the agent.
     */
    states?: Array<LlmListResponseItem.State>;
  }

  export namespace LlmListResponseItem {
    export interface EndCallTool {
      description?: string | null;

      name?: 'end_call';

      type?: 'pre_defined';
    }

    export interface TransferCallTool {
      description?: string | null;

      name?: 'transfer_call';

      number?: string;

      type?: 'pre_defined';
    }

    export interface CustomTool {
      description?: string;

      execution_message_description?: string | null;

      execution_timing?: 'immediate' | 'await_agent_turn';

      name?: string;

      parameters?: CustomTool.Parameters | null;

      speak_after_execution?: boolean;

      speak_during_execution?: boolean;

      type?: 'custom';

      url?: string;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
      }
    }

    export interface State {
      edges?: Array<State.Edge> | null;

      name?: string;

      state_prompt?: string;

      tools?: Array<State.EndCallTool | State.TransferCallTool | State.CustomTool> | null;
    }

    export namespace State {
      export interface Edge {
        description?: string;

        destinationStateName?: string;

        parameters?: Edge.Parameters | null;

        speakDuringTransition?: boolean;
      }

      export namespace Edge {
        export interface Parameters {
          properties?: Record<string, unknown>;

          required?: Array<string>;

          type?: 'object';
        }
      }

      export interface EndCallTool {
        description?: string | null;

        name?: 'end_call';

        type?: 'pre_defined';
      }

      export interface TransferCallTool {
        description?: string | null;

        name?: 'transfer_call';

        number?: string;

        type?: 'pre_defined';
      }

      export interface CustomTool {
        description?: string;

        execution_message_description?: string | null;

        execution_timing?: 'immediate' | 'await_agent_turn';

        name?: string;

        parameters?: CustomTool.Parameters | null;

        speak_after_execution?: boolean;

        speak_during_execution?: boolean;

        type?: 'custom';

        url?: string;
      }

      export namespace CustomTool {
        export interface Parameters {
          properties?: Record<string, unknown>;

          required?: Array<string>;

          type?: 'object';
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
    LlmCreateParams.EndCallTool | LlmCreateParams.TransferCallTool | LlmCreateParams.CustomTool
  >;

  /**
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states for the agent.
   */
  states?: Array<LlmCreateParams.State>;
}

export namespace LlmCreateParams {
  export interface EndCallTool {
    description?: string | null;

    name?: 'end_call';

    type?: 'pre_defined';
  }

  export interface TransferCallTool {
    description?: string | null;

    name?: 'transfer_call';

    number?: string;

    type?: 'pre_defined';
  }

  export interface CustomTool {
    description?: string;

    execution_message_description?: string | null;

    execution_timing?: 'immediate' | 'await_agent_turn';

    name?: string;

    parameters?: CustomTool.Parameters | null;

    speak_after_execution?: boolean;

    speak_during_execution?: boolean;

    type?: 'custom';

    url?: string;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties?: Record<string, unknown>;

      required?: Array<string>;

      type?: 'object';
    }
  }

  export interface State {
    edges?: Array<State.Edge> | null;

    name?: string;

    state_prompt?: string;

    tools?: Array<State.EndCallTool | State.TransferCallTool | State.CustomTool> | null;
  }

  export namespace State {
    export interface Edge {
      description?: string;

      destinationStateName?: string;

      parameters?: Edge.Parameters | null;

      speakDuringTransition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
      }
    }

    export interface EndCallTool {
      description?: string | null;

      name?: 'end_call';

      type?: 'pre_defined';
    }

    export interface TransferCallTool {
      description?: string | null;

      name?: 'transfer_call';

      number?: string;

      type?: 'pre_defined';
    }

    export interface CustomTool {
      description?: string;

      execution_message_description?: string | null;

      execution_timing?: 'immediate' | 'await_agent_turn';

      name?: string;

      parameters?: CustomTool.Parameters | null;

      speak_after_execution?: boolean;

      speak_during_execution?: boolean;

      type?: 'custom';

      url?: string;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
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
    LlmUpdateParams.EndCallTool | LlmUpdateParams.TransferCallTool | LlmUpdateParams.CustomTool
  >;

  /**
   * Optional identifier of the starting state.
   */
  starting_state?: string;

  /**
   * Optional array of states for the agent.
   */
  states?: Array<LlmUpdateParams.State>;
}

export namespace LlmUpdateParams {
  export interface EndCallTool {
    description?: string | null;

    name?: 'end_call';

    type?: 'pre_defined';
  }

  export interface TransferCallTool {
    description?: string | null;

    name?: 'transfer_call';

    number?: string;

    type?: 'pre_defined';
  }

  export interface CustomTool {
    description?: string;

    execution_message_description?: string | null;

    execution_timing?: 'immediate' | 'await_agent_turn';

    name?: string;

    parameters?: CustomTool.Parameters | null;

    speak_after_execution?: boolean;

    speak_during_execution?: boolean;

    type?: 'custom';

    url?: string;
  }

  export namespace CustomTool {
    export interface Parameters {
      properties?: Record<string, unknown>;

      required?: Array<string>;

      type?: 'object';
    }
  }

  export interface State {
    edges?: Array<State.Edge> | null;

    name?: string;

    state_prompt?: string;

    tools?: Array<State.EndCallTool | State.TransferCallTool | State.CustomTool> | null;
  }

  export namespace State {
    export interface Edge {
      description?: string;

      destinationStateName?: string;

      parameters?: Edge.Parameters | null;

      speakDuringTransition?: boolean;
    }

    export namespace Edge {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
      }
    }

    export interface EndCallTool {
      description?: string | null;

      name?: 'end_call';

      type?: 'pre_defined';
    }

    export interface TransferCallTool {
      description?: string | null;

      name?: 'transfer_call';

      number?: string;

      type?: 'pre_defined';
    }

    export interface CustomTool {
      description?: string;

      execution_message_description?: string | null;

      execution_timing?: 'immediate' | 'await_agent_turn';

      name?: string;

      parameters?: CustomTool.Parameters | null;

      speak_after_execution?: boolean;

      speak_during_execution?: boolean;

      type?: 'custom';

      url?: string;
    }

    export namespace CustomTool {
      export interface Parameters {
        properties?: Record<string, unknown>;

        required?: Array<string>;

        type?: 'object';
      }
    }
  }
}

export namespace Llms {
  export import LlmCreateResponse = LlmsAPI.LlmCreateResponse;
  export import LlmRetrieveResponse = LlmsAPI.LlmRetrieveResponse;
  export import LlmUpdateResponse = LlmsAPI.LlmUpdateResponse;
  export import LlmListResponse = LlmsAPI.LlmListResponse;
  export import LlmCreateParams = LlmsAPI.LlmCreateParams;
  export import LlmUpdateParams = LlmsAPI.LlmUpdateParams;
}
