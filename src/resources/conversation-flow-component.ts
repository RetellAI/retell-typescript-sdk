// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class ConversationFlowComponent extends APIResource {
  /**
   * Create a new shared conversation flow component
   *
   * @example
   * ```ts
   * const conversationFlowComponentResponse =
   *   await client.conversationFlowComponent.create({
   *     name: 'Customer Information Collector',
   *     nodes: [
   *       {
   *         id: 'collect_info',
   *         instruction: {
   *           text: 'Ask the customer for their name and contact information.',
   *           type: 'prompt',
   *         },
   *         type: 'conversation',
   *       },
   *     ],
   *   });
   * ```
   */
  create(
    body: ConversationFlowComponentCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConversationFlowComponentResponse> {
    return this._client.post('/create-conversation-flow-component', { body, ...options });
  }

  /**
   * Get a shared conversation flow component
   *
   * @example
   * ```ts
   * const conversationFlowComponentResponse =
   *   await client.conversationFlowComponent.retrieve(
   *     'conversation_flow_component_id',
   *   );
   * ```
   */
  retrieve(
    conversationFlowComponentId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConversationFlowComponentResponse> {
    return this._client.get(`/get-conversation-flow-component/${conversationFlowComponentId}`, options);
  }

  /**
   * Update an existing shared conversation flow component
   *
   * @example
   * ```ts
   * const conversationFlowComponentResponse =
   *   await client.conversationFlowComponent.update(
   *     'conversation_flow_component_id',
   *   );
   * ```
   */
  update(
    conversationFlowComponentId: string,
    body: ConversationFlowComponentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConversationFlowComponentResponse> {
    return this._client.patch(`/update-conversation-flow-component/${conversationFlowComponentId}`, {
      body,
      ...options,
    });
  }

  /**
   * List shared conversation flow components
   *
   * @example
   * ```ts
   * const conversationFlowComponentResponses =
   *   await client.conversationFlowComponent.list();
   * ```
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ConversationFlowComponentListResponse> {
    return this._client.get('/list-conversation-flow-components', options);
  }

  /**
   * Delete a shared conversation flow component. When deleting a shared component,
   * creates local copies for all linked conversation flows.
   *
   * @example
   * ```ts
   * await client.conversationFlowComponent.delete(
   *   'conversation_flow_component_id',
   * );
   * ```
   */
  delete(conversationFlowComponentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-conversation-flow-component/${conversationFlowComponentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ConversationFlowComponentResponse {
  /**
   * Unique identifier for the component
   */
  conversation_flow_component_id: string;

  /**
   * Name of the component
   */
  name: string;

  /**
   * Nodes that make up the component
   */
  nodes: Array<
    | ConversationFlowComponentResponse.ConversationNode
    | ConversationFlowComponentResponse.EndNode
    | ConversationFlowComponentResponse.FunctionNode
    | ConversationFlowComponentResponse.TransferCallNode
    | ConversationFlowComponentResponse.PressDigitNode
    | ConversationFlowComponentResponse.BranchNode
    | ConversationFlowComponentResponse.SMSNode
    | ConversationFlowComponentResponse.ExtractDynamicVariablesNode
    | ConversationFlowComponentResponse.AgentSwapNode
    | ConversationFlowComponentResponse.McpNode
    | ConversationFlowComponentResponse.ComponentNode
  >;

  /**
   * Timestamp of last user modification
   */
  user_modified_timestamp: number;

  /**
   * Display position for the begin tag in the frontend
   */
  begin_tag_display_position?: ConversationFlowComponentResponse.BeginTagDisplayPosition | null;

  /**
   * IDs of conversation flows linked to this shared component
   */
  linked_conversation_flow_ids?: Array<string>;

  /**
   * ID of the starting node
   */
  start_node_id?: string | null;

  /**
   * Tools available within the component
   */
  tools?: Array<
    | ConversationFlowComponentResponse.ConversationFlowCustomTool
    | ConversationFlowComponentResponse.CheckAvailabilityCalTool
    | ConversationFlowComponentResponse.BookAppointmentCalTool
  > | null;
}

export namespace ConversationFlowComponentResponse {
  export interface ConversationNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    instruction: ConversationNode.NodeInstructionPrompt | ConversationNode.NodeInstructionStaticText;

    /**
     * Type of the node
     */
    type: 'conversation';

    /**
     * Position for frontend display
     */
    display_position?: ConversationNode.DisplayPosition;

    edges?: Array<ConversationNode.Edge>;

    finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

    finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

    global_node_setting?: ConversationNode.GlobalNodeSetting;

    interruption_sensitivity?: number;

    /**
     * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
     */
    knowledge_base_ids?: Array<string> | null;

    model_choice?: ConversationNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    skip_response_edge?: ConversationNode.SkipResponseEdge;
  }

  export namespace ConversationNode {
    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneConversationExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the conversation should be.
       */
      transcript: Array<
        | FinetuneConversationExample.UnionMember0
        | FinetuneConversationExample.UnionMember1
        | FinetuneConversationExample.UnionMember2
      >;
    }

    export namespace FinetuneConversationExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }

    export interface SkipResponseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | SkipResponseEdge.PromptCondition
        | SkipResponseEdge.EquationCondition
        | SkipResponseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace SkipResponseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Skip response" for skip response edge
         */
        prompt?: 'Skip response';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Skip response" for skip response edge
         */
        prompt: 'Skip response';

        type: 'prompt';
      }
    }
  }

  export interface EndNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node
     */
    type: 'end';

    /**
     * Position for frontend display
     */
    display_position?: EndNode.DisplayPosition;

    global_node_setting?: EndNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace EndNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface FunctionNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Tool ID for function nodes
     */
    tool_id: string;

    /**
     * Tool type for function nodes
     */
    tool_type: 'local' | 'shared';

    /**
     * Type of the node
     */
    type: 'function';

    /**
     * Whether to wait for tool result
     */
    wait_for_result: boolean;

    /**
     * Position for frontend display
     */
    display_position?: FunctionNode.DisplayPosition;

    edges?: Array<FunctionNode.Edge>;

    finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

    global_node_setting?: FunctionNode.GlobalNodeSetting;

    instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

    interruption_sensitivity?: number;

    model_choice?: FunctionNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Whether to speak during tool execution
     */
    speak_during_execution?: boolean;
  }

  export namespace FunctionNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface TransferCallNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    edge: TransferCallNode.Edge;

    transfer_destination:
      | TransferCallNode.TransferDestinationPredefined
      | TransferCallNode.TransferDestinationInferred;

    transfer_option:
      | TransferCallNode.TransferOptionColdTransfer
      | TransferCallNode.TransferOptionWarmTransfer
      | TransferCallNode.TransferOptionAgenticWarmTransfer;

    /**
     * Type of the node
     */
    type: 'transfer_call';

    /**
     * Custom SIP headers for transfer calls
     */
    custom_sip_headers?: { [key: string]: string };

    /**
     * Position for frontend display
     */
    display_position?: TransferCallNode.DisplayPosition;

    global_node_setting?: TransferCallNode.GlobalNodeSetting;

    /**
     * If true, the e.164 validation will be ignored for the from_number. This can be
     * useful when you want to dial to internal pseudo numbers. This only applies when
     * you are using custom telephony and does not apply when you are using Retell
     * Telephony. If omitted, the default value is false.
     */
    ignore_e164_validation?: boolean;

    model_choice?: TransferCallNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace TransferCallNode {
    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition | Edge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt?: 'Transfer failed';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt: 'Transfer failed';

        type: 'prompt';
      }
    }

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

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface PressDigitNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    instruction: PressDigitNode.Instruction;

    /**
     * Type of the node
     */
    type: 'press_digit';

    /**
     * Delay in milliseconds before pressing the digit
     */
    delay_ms?: number;

    /**
     * Position for frontend display
     */
    display_position?: PressDigitNode.DisplayPosition;

    edges?: Array<PressDigitNode.Edge>;

    finetune_transition_examples?: Array<PressDigitNode.FinetuneTransitionExample>;

    global_node_setting?: PressDigitNode.GlobalNodeSetting;

    model_choice?: PressDigitNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace PressDigitNode {
    export interface Instruction {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface BranchNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    else_edge: BranchNode.ElseEdge;

    /**
     * Type of the node
     */
    type: 'branch';

    /**
     * Position for frontend display
     */
    display_position?: BranchNode.DisplayPosition;

    edges?: Array<BranchNode.Edge>;

    finetune_transition_examples?: Array<BranchNode.FinetuneTransitionExample>;

    global_node_setting?: BranchNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace BranchNode {
    export interface ElseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: ElseEdge.PromptCondition | ElseEdge.EquationCondition | ElseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace ElseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Else" for else edge
         */
        prompt?: 'Else';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Else" for else edge
         */
        prompt: 'Else';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface SMSNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    failed_edge: SMSNode.FailedEdge;

    instruction: SMSNode.NodeInstructionPrompt | SMSNode.NodeInstructionStaticText;

    success_edge: SMSNode.SuccessEdge;

    /**
     * Type of the node
     */
    type: 'sms';

    /**
     * Position for frontend display
     */
    display_position?: SMSNode.DisplayPosition;

    global_node_setting?: SMSNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace SMSNode {
    export interface FailedEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | FailedEdge.PromptCondition
        | FailedEdge.EquationCondition
        | FailedEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace FailedEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "failed to send" for SMS failed edge
         */
        prompt?: 'Failed to send';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "failed to send" for SMS failed edge
         */
        prompt: 'Failed to send';

        type: 'prompt';
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    export interface SuccessEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | SuccessEdge.PromptCondition
        | SuccessEdge.EquationCondition
        | SuccessEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace SuccessEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "sent successfully" for SMS success edge
         */
        prompt?: 'Sent successfully';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "sent successfully" for SMS success edge
         */
        prompt: 'Sent successfully';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface ExtractDynamicVariablesNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node
     */
    type: 'extract_dynamic_variables';

    variables: Array<
      | ExtractDynamicVariablesNode.StringAnalysisData
      | ExtractDynamicVariablesNode.EnumAnalysisData
      | ExtractDynamicVariablesNode.BooleanAnalysisData
      | ExtractDynamicVariablesNode.NumberAnalysisData
    >;

    /**
     * Position for frontend display
     */
    display_position?: ExtractDynamicVariablesNode.DisplayPosition;

    edges?: Array<ExtractDynamicVariablesNode.Edge>;

    finetune_transition_examples?: Array<ExtractDynamicVariablesNode.FinetuneTransitionExample>;

    global_node_setting?: ExtractDynamicVariablesNode.GlobalNodeSetting;

    model_choice?: ExtractDynamicVariablesNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace ExtractDynamicVariablesNode {
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

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface AgentSwapNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * The ID of the agent to swap to
     */
    agent_id: string;

    /**
     * Edge to transition to if agent swap fails
     */
    edge: AgentSwapNode.Edge;

    /**
     * Post call analysis setting for the agent swap
     */
    post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

    /**
     * Type of the node
     */
    type: 'agent_swap';

    /**
     * The version of the agent to swap to. If not specified, will use the latest
     * version
     */
    agent_version?: number;

    /**
     * Position for frontend display
     */
    display_position?: AgentSwapNode.DisplayPosition;

    global_node_setting?: AgentSwapNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Webhook setting for the agent swap, defaults to only source.
     */
    webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
  }

  export namespace AgentSwapNode {
    /**
     * Edge to transition to if agent swap fails
     */
    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition | Edge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt?: 'Transfer failed';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt: 'Transfer failed';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface McpNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Unique ID of the MCP server
     */
    mcp_id: string;

    /**
     * Name of the MCP tool to call
     */
    mcp_tool_name: string;

    /**
     * Type of the node
     */
    type: 'mcp';

    /**
     * If true, will wait for result before transitioning to next node
     */
    wait_for_result: boolean;

    /**
     * Position for frontend display
     */
    display_position?: McpNode.DisplayPosition;

    edges?: Array<McpNode.Edge>;

    finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

    global_node_setting?: McpNode.GlobalNodeSetting;

    /**
     * What to say when calling the function, only used when speak during execution
     */
    instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

    interruption_sensitivity?: number;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
  }

  export namespace McpNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }
  }

  export interface ComponentNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * The reference ID of the component
     */
    component_id: string;

    /**
     * Type of component:
     *
     * - local: stored in conversation flow's components array
     * - shared: stored in stand-alone conversation-flow-component table
     */
    component_type: 'local' | 'shared';

    /**
     * Default edge when no other conditions are met
     */
    else_edge: ComponentNode.ElseEdge;

    /**
     * Type of the node
     */
    type: 'component';

    /**
     * Position for frontend display
     */
    display_position?: ComponentNode.DisplayPosition;

    /**
     * Array of edges for conditional transitions
     */
    edges?: Array<ComponentNode.Edge>;

    global_node_setting?: ComponentNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace ComponentNode {
    /**
     * Default edge when no other conditions are met
     */
    export interface ElseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: ElseEdge.PromptCondition | ElseEdge.EquationCondition | ElseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace ElseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Else" for else edge
         */
        prompt?: 'Else';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Else" for else edge
         */
        prompt: 'Else';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  /**
   * Display position for the begin tag in the frontend
   */
  export interface BeginTagDisplayPosition {
    x?: number;

    y?: number;
  }

  export interface ConversationFlowCustomTool {
    /**
     * Name of the tool
     */
    name: string;

    /**
     * Type of the tool
     */
    type: 'custom';

    /**
     * Server URL to call the tool. Dynamic variables can be used in the URL.
     */
    url: string;

    /**
     * Description of the tool
     */
    description?: string;

    /**
     * Headers to add to the request
     */
    headers?: { [key: string]: string };

    /**
     * HTTP method to use for the request, defaults to POST
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * Tool parameters schema
     */
    parameters?: ConversationFlowCustomTool.Parameters;

    /**
     * Query parameters to add to the request
     */
    query_params?: { [key: string]: string };

    /**
     * Response variables to add to the dynamic variables, key is the variable name,
     * value is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    /**
     * Timeout in milliseconds for the function call, defaults to 2 min
     */
    timeout_ms?: number;

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }

  export namespace ConversationFlowCustomTool {
    /**
     * Tool parameters schema
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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }
}

export type ConversationFlowComponentListResponse = Array<ConversationFlowComponentResponse>;

export interface ConversationFlowComponentCreateParams {
  /**
   * Name of the component
   */
  name: string;

  /**
   * Nodes that make up the component
   */
  nodes: Array<
    | ConversationFlowComponentCreateParams.ConversationNode
    | ConversationFlowComponentCreateParams.EndNode
    | ConversationFlowComponentCreateParams.FunctionNode
    | ConversationFlowComponentCreateParams.TransferCallNode
    | ConversationFlowComponentCreateParams.PressDigitNode
    | ConversationFlowComponentCreateParams.BranchNode
    | ConversationFlowComponentCreateParams.SMSNode
    | ConversationFlowComponentCreateParams.ExtractDynamicVariablesNode
    | ConversationFlowComponentCreateParams.AgentSwapNode
    | ConversationFlowComponentCreateParams.McpNode
    | ConversationFlowComponentCreateParams.ComponentNode
  >;

  /**
   * Display position for the begin tag in the frontend
   */
  begin_tag_display_position?: ConversationFlowComponentCreateParams.BeginTagDisplayPosition | null;

  /**
   * ID of the starting node
   */
  start_node_id?: string | null;

  /**
   * Tools available within the component
   */
  tools?: Array<
    | ConversationFlowComponentCreateParams.ConversationFlowCustomTool
    | ConversationFlowComponentCreateParams.CheckAvailabilityCalTool
    | ConversationFlowComponentCreateParams.BookAppointmentCalTool
  > | null;
}

export namespace ConversationFlowComponentCreateParams {
  export interface ConversationNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    instruction: ConversationNode.NodeInstructionPrompt | ConversationNode.NodeInstructionStaticText;

    /**
     * Type of the node
     */
    type: 'conversation';

    /**
     * Position for frontend display
     */
    display_position?: ConversationNode.DisplayPosition;

    edges?: Array<ConversationNode.Edge>;

    finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

    finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

    global_node_setting?: ConversationNode.GlobalNodeSetting;

    interruption_sensitivity?: number;

    /**
     * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
     */
    knowledge_base_ids?: Array<string> | null;

    model_choice?: ConversationNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    skip_response_edge?: ConversationNode.SkipResponseEdge;
  }

  export namespace ConversationNode {
    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneConversationExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the conversation should be.
       */
      transcript: Array<
        | FinetuneConversationExample.UnionMember0
        | FinetuneConversationExample.UnionMember1
        | FinetuneConversationExample.UnionMember2
      >;
    }

    export namespace FinetuneConversationExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }

    export interface SkipResponseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | SkipResponseEdge.PromptCondition
        | SkipResponseEdge.EquationCondition
        | SkipResponseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace SkipResponseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Skip response" for skip response edge
         */
        prompt?: 'Skip response';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Skip response" for skip response edge
         */
        prompt: 'Skip response';

        type: 'prompt';
      }
    }
  }

  export interface EndNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node
     */
    type: 'end';

    /**
     * Position for frontend display
     */
    display_position?: EndNode.DisplayPosition;

    global_node_setting?: EndNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace EndNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface FunctionNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Tool ID for function nodes
     */
    tool_id: string;

    /**
     * Tool type for function nodes
     */
    tool_type: 'local' | 'shared';

    /**
     * Type of the node
     */
    type: 'function';

    /**
     * Whether to wait for tool result
     */
    wait_for_result: boolean;

    /**
     * Position for frontend display
     */
    display_position?: FunctionNode.DisplayPosition;

    edges?: Array<FunctionNode.Edge>;

    finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

    global_node_setting?: FunctionNode.GlobalNodeSetting;

    instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

    interruption_sensitivity?: number;

    model_choice?: FunctionNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Whether to speak during tool execution
     */
    speak_during_execution?: boolean;
  }

  export namespace FunctionNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface TransferCallNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    edge: TransferCallNode.Edge;

    transfer_destination:
      | TransferCallNode.TransferDestinationPredefined
      | TransferCallNode.TransferDestinationInferred;

    transfer_option:
      | TransferCallNode.TransferOptionColdTransfer
      | TransferCallNode.TransferOptionWarmTransfer
      | TransferCallNode.TransferOptionAgenticWarmTransfer;

    /**
     * Type of the node
     */
    type: 'transfer_call';

    /**
     * Custom SIP headers for transfer calls
     */
    custom_sip_headers?: { [key: string]: string };

    /**
     * Position for frontend display
     */
    display_position?: TransferCallNode.DisplayPosition;

    global_node_setting?: TransferCallNode.GlobalNodeSetting;

    /**
     * If true, the e.164 validation will be ignored for the from_number. This can be
     * useful when you want to dial to internal pseudo numbers. This only applies when
     * you are using custom telephony and does not apply when you are using Retell
     * Telephony. If omitted, the default value is false.
     */
    ignore_e164_validation?: boolean;

    model_choice?: TransferCallNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace TransferCallNode {
    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition | Edge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt?: 'Transfer failed';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt: 'Transfer failed';

        type: 'prompt';
      }
    }

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

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface PressDigitNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    instruction: PressDigitNode.Instruction;

    /**
     * Type of the node
     */
    type: 'press_digit';

    /**
     * Delay in milliseconds before pressing the digit
     */
    delay_ms?: number;

    /**
     * Position for frontend display
     */
    display_position?: PressDigitNode.DisplayPosition;

    edges?: Array<PressDigitNode.Edge>;

    finetune_transition_examples?: Array<PressDigitNode.FinetuneTransitionExample>;

    global_node_setting?: PressDigitNode.GlobalNodeSetting;

    model_choice?: PressDigitNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace PressDigitNode {
    export interface Instruction {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface BranchNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    else_edge: BranchNode.ElseEdge;

    /**
     * Type of the node
     */
    type: 'branch';

    /**
     * Position for frontend display
     */
    display_position?: BranchNode.DisplayPosition;

    edges?: Array<BranchNode.Edge>;

    finetune_transition_examples?: Array<BranchNode.FinetuneTransitionExample>;

    global_node_setting?: BranchNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace BranchNode {
    export interface ElseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: ElseEdge.PromptCondition | ElseEdge.EquationCondition | ElseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace ElseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Else" for else edge
         */
        prompt?: 'Else';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Else" for else edge
         */
        prompt: 'Else';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface SMSNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    failed_edge: SMSNode.FailedEdge;

    instruction: SMSNode.NodeInstructionPrompt | SMSNode.NodeInstructionStaticText;

    success_edge: SMSNode.SuccessEdge;

    /**
     * Type of the node
     */
    type: 'sms';

    /**
     * Position for frontend display
     */
    display_position?: SMSNode.DisplayPosition;

    global_node_setting?: SMSNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace SMSNode {
    export interface FailedEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | FailedEdge.PromptCondition
        | FailedEdge.EquationCondition
        | FailedEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace FailedEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "failed to send" for SMS failed edge
         */
        prompt?: 'Failed to send';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "failed to send" for SMS failed edge
         */
        prompt: 'Failed to send';

        type: 'prompt';
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    export interface SuccessEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | SuccessEdge.PromptCondition
        | SuccessEdge.EquationCondition
        | SuccessEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace SuccessEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "sent successfully" for SMS success edge
         */
        prompt?: 'Sent successfully';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "sent successfully" for SMS success edge
         */
        prompt: 'Sent successfully';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface ExtractDynamicVariablesNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node
     */
    type: 'extract_dynamic_variables';

    variables: Array<
      | ExtractDynamicVariablesNode.StringAnalysisData
      | ExtractDynamicVariablesNode.EnumAnalysisData
      | ExtractDynamicVariablesNode.BooleanAnalysisData
      | ExtractDynamicVariablesNode.NumberAnalysisData
    >;

    /**
     * Position for frontend display
     */
    display_position?: ExtractDynamicVariablesNode.DisplayPosition;

    edges?: Array<ExtractDynamicVariablesNode.Edge>;

    finetune_transition_examples?: Array<ExtractDynamicVariablesNode.FinetuneTransitionExample>;

    global_node_setting?: ExtractDynamicVariablesNode.GlobalNodeSetting;

    model_choice?: ExtractDynamicVariablesNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace ExtractDynamicVariablesNode {
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

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface AgentSwapNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * The ID of the agent to swap to
     */
    agent_id: string;

    /**
     * Edge to transition to if agent swap fails
     */
    edge: AgentSwapNode.Edge;

    /**
     * Post call analysis setting for the agent swap
     */
    post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

    /**
     * Type of the node
     */
    type: 'agent_swap';

    /**
     * The version of the agent to swap to. If not specified, will use the latest
     * version
     */
    agent_version?: number;

    /**
     * Position for frontend display
     */
    display_position?: AgentSwapNode.DisplayPosition;

    global_node_setting?: AgentSwapNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Webhook setting for the agent swap, defaults to only source.
     */
    webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
  }

  export namespace AgentSwapNode {
    /**
     * Edge to transition to if agent swap fails
     */
    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition | Edge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt?: 'Transfer failed';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt: 'Transfer failed';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface McpNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Unique ID of the MCP server
     */
    mcp_id: string;

    /**
     * Name of the MCP tool to call
     */
    mcp_tool_name: string;

    /**
     * Type of the node
     */
    type: 'mcp';

    /**
     * If true, will wait for result before transitioning to next node
     */
    wait_for_result: boolean;

    /**
     * Position for frontend display
     */
    display_position?: McpNode.DisplayPosition;

    edges?: Array<McpNode.Edge>;

    finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

    global_node_setting?: McpNode.GlobalNodeSetting;

    /**
     * What to say when calling the function, only used when speak during execution
     */
    instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

    interruption_sensitivity?: number;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
  }

  export namespace McpNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }
  }

  export interface ComponentNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * The reference ID of the component
     */
    component_id: string;

    /**
     * Type of component:
     *
     * - local: stored in conversation flow's components array
     * - shared: stored in stand-alone conversation-flow-component table
     */
    component_type: 'local' | 'shared';

    /**
     * Default edge when no other conditions are met
     */
    else_edge: ComponentNode.ElseEdge;

    /**
     * Type of the node
     */
    type: 'component';

    /**
     * Position for frontend display
     */
    display_position?: ComponentNode.DisplayPosition;

    /**
     * Array of edges for conditional transitions
     */
    edges?: Array<ComponentNode.Edge>;

    global_node_setting?: ComponentNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace ComponentNode {
    /**
     * Default edge when no other conditions are met
     */
    export interface ElseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: ElseEdge.PromptCondition | ElseEdge.EquationCondition | ElseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace ElseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Else" for else edge
         */
        prompt?: 'Else';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Else" for else edge
         */
        prompt: 'Else';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  /**
   * Display position for the begin tag in the frontend
   */
  export interface BeginTagDisplayPosition {
    x?: number;

    y?: number;
  }

  export interface ConversationFlowCustomTool {
    /**
     * Name of the tool
     */
    name: string;

    /**
     * Type of the tool
     */
    type: 'custom';

    /**
     * Server URL to call the tool. Dynamic variables can be used in the URL.
     */
    url: string;

    /**
     * Description of the tool
     */
    description?: string;

    /**
     * Headers to add to the request
     */
    headers?: { [key: string]: string };

    /**
     * HTTP method to use for the request, defaults to POST
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * Tool parameters schema
     */
    parameters?: ConversationFlowCustomTool.Parameters;

    /**
     * Query parameters to add to the request
     */
    query_params?: { [key: string]: string };

    /**
     * Response variables to add to the dynamic variables, key is the variable name,
     * value is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    /**
     * Timeout in milliseconds for the function call, defaults to 2 min
     */
    timeout_ms?: number;

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }

  export namespace ConversationFlowCustomTool {
    /**
     * Tool parameters schema
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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }
}

export interface ConversationFlowComponentUpdateParams {
  /**
   * Display position for the begin tag in the frontend
   */
  begin_tag_display_position?: ConversationFlowComponentUpdateParams.BeginTagDisplayPosition | null;

  /**
   * Name of the component
   */
  name?: string;

  /**
   * Nodes that make up the component
   */
  nodes?: Array<
    | ConversationFlowComponentUpdateParams.ConversationNode
    | ConversationFlowComponentUpdateParams.EndNode
    | ConversationFlowComponentUpdateParams.FunctionNode
    | ConversationFlowComponentUpdateParams.TransferCallNode
    | ConversationFlowComponentUpdateParams.PressDigitNode
    | ConversationFlowComponentUpdateParams.BranchNode
    | ConversationFlowComponentUpdateParams.SMSNode
    | ConversationFlowComponentUpdateParams.ExtractDynamicVariablesNode
    | ConversationFlowComponentUpdateParams.AgentSwapNode
    | ConversationFlowComponentUpdateParams.McpNode
    | ConversationFlowComponentUpdateParams.ComponentNode
  >;

  /**
   * ID of the starting node
   */
  start_node_id?: string | null;

  /**
   * Tools available within the component
   */
  tools?: Array<
    | ConversationFlowComponentUpdateParams.ConversationFlowCustomTool
    | ConversationFlowComponentUpdateParams.CheckAvailabilityCalTool
    | ConversationFlowComponentUpdateParams.BookAppointmentCalTool
  > | null;
}

export namespace ConversationFlowComponentUpdateParams {
  /**
   * Display position for the begin tag in the frontend
   */
  export interface BeginTagDisplayPosition {
    x?: number;

    y?: number;
  }

  export interface ConversationNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    instruction: ConversationNode.NodeInstructionPrompt | ConversationNode.NodeInstructionStaticText;

    /**
     * Type of the node
     */
    type: 'conversation';

    /**
     * Position for frontend display
     */
    display_position?: ConversationNode.DisplayPosition;

    edges?: Array<ConversationNode.Edge>;

    finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

    finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

    global_node_setting?: ConversationNode.GlobalNodeSetting;

    interruption_sensitivity?: number;

    /**
     * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
     */
    knowledge_base_ids?: Array<string> | null;

    model_choice?: ConversationNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    skip_response_edge?: ConversationNode.SkipResponseEdge;
  }

  export namespace ConversationNode {
    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneConversationExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the conversation should be.
       */
      transcript: Array<
        | FinetuneConversationExample.UnionMember0
        | FinetuneConversationExample.UnionMember1
        | FinetuneConversationExample.UnionMember2
      >;
    }

    export namespace FinetuneConversationExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }

    export interface SkipResponseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | SkipResponseEdge.PromptCondition
        | SkipResponseEdge.EquationCondition
        | SkipResponseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace SkipResponseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Skip response" for skip response edge
         */
        prompt?: 'Skip response';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Skip response" for skip response edge
         */
        prompt: 'Skip response';

        type: 'prompt';
      }
    }
  }

  export interface EndNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node
     */
    type: 'end';

    /**
     * Position for frontend display
     */
    display_position?: EndNode.DisplayPosition;

    global_node_setting?: EndNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace EndNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface FunctionNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Tool ID for function nodes
     */
    tool_id: string;

    /**
     * Tool type for function nodes
     */
    tool_type: 'local' | 'shared';

    /**
     * Type of the node
     */
    type: 'function';

    /**
     * Whether to wait for tool result
     */
    wait_for_result: boolean;

    /**
     * Position for frontend display
     */
    display_position?: FunctionNode.DisplayPosition;

    edges?: Array<FunctionNode.Edge>;

    finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

    global_node_setting?: FunctionNode.GlobalNodeSetting;

    instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

    interruption_sensitivity?: number;

    model_choice?: FunctionNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Whether to speak during tool execution
     */
    speak_during_execution?: boolean;
  }

  export namespace FunctionNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface TransferCallNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    edge: TransferCallNode.Edge;

    transfer_destination:
      | TransferCallNode.TransferDestinationPredefined
      | TransferCallNode.TransferDestinationInferred;

    transfer_option:
      | TransferCallNode.TransferOptionColdTransfer
      | TransferCallNode.TransferOptionWarmTransfer
      | TransferCallNode.TransferOptionAgenticWarmTransfer;

    /**
     * Type of the node
     */
    type: 'transfer_call';

    /**
     * Custom SIP headers for transfer calls
     */
    custom_sip_headers?: { [key: string]: string };

    /**
     * Position for frontend display
     */
    display_position?: TransferCallNode.DisplayPosition;

    global_node_setting?: TransferCallNode.GlobalNodeSetting;

    /**
     * If true, the e.164 validation will be ignored for the from_number. This can be
     * useful when you want to dial to internal pseudo numbers. This only applies when
     * you are using custom telephony and does not apply when you are using Retell
     * Telephony. If omitted, the default value is false.
     */
    ignore_e164_validation?: boolean;

    model_choice?: TransferCallNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace TransferCallNode {
    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition | Edge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt?: 'Transfer failed';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt: 'Transfer failed';

        type: 'prompt';
      }
    }

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

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface PressDigitNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    instruction: PressDigitNode.Instruction;

    /**
     * Type of the node
     */
    type: 'press_digit';

    /**
     * Delay in milliseconds before pressing the digit
     */
    delay_ms?: number;

    /**
     * Position for frontend display
     */
    display_position?: PressDigitNode.DisplayPosition;

    edges?: Array<PressDigitNode.Edge>;

    finetune_transition_examples?: Array<PressDigitNode.FinetuneTransitionExample>;

    global_node_setting?: PressDigitNode.GlobalNodeSetting;

    model_choice?: PressDigitNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace PressDigitNode {
    export interface Instruction {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface BranchNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    else_edge: BranchNode.ElseEdge;

    /**
     * Type of the node
     */
    type: 'branch';

    /**
     * Position for frontend display
     */
    display_position?: BranchNode.DisplayPosition;

    edges?: Array<BranchNode.Edge>;

    finetune_transition_examples?: Array<BranchNode.FinetuneTransitionExample>;

    global_node_setting?: BranchNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace BranchNode {
    export interface ElseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: ElseEdge.PromptCondition | ElseEdge.EquationCondition | ElseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace ElseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Else" for else edge
         */
        prompt?: 'Else';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Else" for else edge
         */
        prompt: 'Else';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface SMSNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    failed_edge: SMSNode.FailedEdge;

    instruction: SMSNode.NodeInstructionPrompt | SMSNode.NodeInstructionStaticText;

    success_edge: SMSNode.SuccessEdge;

    /**
     * Type of the node
     */
    type: 'sms';

    /**
     * Position for frontend display
     */
    display_position?: SMSNode.DisplayPosition;

    global_node_setting?: SMSNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace SMSNode {
    export interface FailedEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | FailedEdge.PromptCondition
        | FailedEdge.EquationCondition
        | FailedEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace FailedEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "failed to send" for SMS failed edge
         */
        prompt?: 'Failed to send';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "failed to send" for SMS failed edge
         */
        prompt: 'Failed to send';

        type: 'prompt';
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }

    export interface SuccessEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | SuccessEdge.PromptCondition
        | SuccessEdge.EquationCondition
        | SuccessEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace SuccessEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "sent successfully" for SMS success edge
         */
        prompt?: 'Sent successfully';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "sent successfully" for SMS success edge
         */
        prompt: 'Sent successfully';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface ExtractDynamicVariablesNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node
     */
    type: 'extract_dynamic_variables';

    variables: Array<
      | ExtractDynamicVariablesNode.StringAnalysisData
      | ExtractDynamicVariablesNode.EnumAnalysisData
      | ExtractDynamicVariablesNode.BooleanAnalysisData
      | ExtractDynamicVariablesNode.NumberAnalysisData
    >;

    /**
     * Position for frontend display
     */
    display_position?: ExtractDynamicVariablesNode.DisplayPosition;

    edges?: Array<ExtractDynamicVariablesNode.Edge>;

    finetune_transition_examples?: Array<ExtractDynamicVariablesNode.FinetuneTransitionExample>;

    global_node_setting?: ExtractDynamicVariablesNode.GlobalNodeSetting;

    model_choice?: ExtractDynamicVariablesNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace ExtractDynamicVariablesNode {
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

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface ModelChoice {
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
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite';

      /**
       * Type of model choice
       */
      type: 'cascading';

      /**
       * Whether to use high priority pool with more dedicated resource, default false
       */
      high_priority?: boolean;
    }
  }

  export interface AgentSwapNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * The ID of the agent to swap to
     */
    agent_id: string;

    /**
     * Edge to transition to if agent swap fails
     */
    edge: AgentSwapNode.Edge;

    /**
     * Post call analysis setting for the agent swap
     */
    post_call_analysis_setting: 'both_agents' | 'only_destination_agent';

    /**
     * Type of the node
     */
    type: 'agent_swap';

    /**
     * The version of the agent to swap to. If not specified, will use the latest
     * version
     */
    agent_version?: number;

    /**
     * Position for frontend display
     */
    display_position?: AgentSwapNode.DisplayPosition;

    global_node_setting?: AgentSwapNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Webhook setting for the agent swap, defaults to only source.
     */
    webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
  }

  export namespace AgentSwapNode {
    /**
     * Edge to transition to if agent swap fails
     */
    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition | Edge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt?: 'Transfer failed';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Transfer failed" for transfer failed edge
         */
        prompt: 'Transfer failed';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface McpNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Unique ID of the MCP server
     */
    mcp_id: string;

    /**
     * Name of the MCP tool to call
     */
    mcp_tool_name: string;

    /**
     * Type of the node
     */
    type: 'mcp';

    /**
     * If true, will wait for result before transitioning to next node
     */
    wait_for_result: boolean;

    /**
     * Position for frontend display
     */
    display_position?: McpNode.DisplayPosition;

    edges?: Array<McpNode.Edge>;

    finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

    global_node_setting?: McpNode.GlobalNodeSetting;

    /**
     * What to say when calling the function, only used when speak during execution
     */
    instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

    interruption_sensitivity?: number;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
  }

  export namespace McpNode {
    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface FinetuneTransitionExample {
      /**
       * Unique identifier for the example
       */
      id: string;

      /**
       * The example transcript to finetune how the node should transition.
       */
      transcript: Array<
        | FinetuneTransitionExample.UnionMember0
        | FinetuneTransitionExample.UnionMember1
        | FinetuneTransitionExample.UnionMember2
      >;

      /**
       * Optional destination node ID
       */
      destination_node_id?: string;
    }

    export namespace FinetuneTransitionExample {
      export interface UnionMember0 {
        content: string;

        role: 'agent' | 'user';
      }

      export interface UnionMember1 {
        arguments: string;

        name: string;

        role: 'tool_call_invocation';

        tool_call_id: string;
      }

      export interface UnionMember2 {
        content: string;

        role: 'tool_call_result';

        tool_call_id: string;
      }
    }

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }

    export interface NodeInstructionPrompt {
      /**
       * The prompt text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'prompt';
    }

    export interface NodeInstructionStaticText {
      /**
       * The static text for the instruction
       */
      text: string;

      /**
       * Type of instruction
       */
      type: 'static_text';
    }
  }

  export interface ComponentNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * The reference ID of the component
     */
    component_id: string;

    /**
     * Type of component:
     *
     * - local: stored in conversation flow's components array
     * - shared: stored in stand-alone conversation-flow-component table
     */
    component_type: 'local' | 'shared';

    /**
     * Default edge when no other conditions are met
     */
    else_edge: ComponentNode.ElseEdge;

    /**
     * Type of the node
     */
    type: 'component';

    /**
     * Position for frontend display
     */
    display_position?: ComponentNode.DisplayPosition;

    /**
     * Array of edges for conditional transitions
     */
    edges?: Array<ComponentNode.Edge>;

    global_node_setting?: ComponentNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace ComponentNode {
    /**
     * Default edge when no other conditions are met
     */
    export interface ElseEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: ElseEdge.PromptCondition | ElseEdge.EquationCondition | ElseEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace ElseEdge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';

        /**
         * Must be "Else" for else edge
         */
        prompt?: 'Else';
      }

      export namespace EquationCondition {
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

      export interface UnionMember2 {
        /**
         * Must be "Else" for else edge
         */
        prompt: 'Else';

        type: 'prompt';
      }
    }

    /**
     * Position for frontend display
     */
    export interface DisplayPosition {
      x?: number;

      y?: number;
    }

    export interface Edge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition: Edge.PromptCondition | Edge.EquationCondition;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace Edge {
      export interface PromptCondition {
        /**
         * Prompt condition text
         */
        prompt: string;

        type: 'prompt';
      }

      export interface EquationCondition {
        equations: Array<EquationCondition.Equation>;

        operator: '||' | '&&';

        type: 'equation';
      }

      export namespace EquationCondition {
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

    export interface GlobalNodeSetting {
      /**
       * Condition for global node activation, cannot be empty
       */
      condition: string;

      /**
       * Don't transition to this node
       */
      negative_finetune_examples?: Array<GlobalNodeSetting.NegativeFinetuneExample>;

      /**
       * Transition to this node
       */
      positive_finetune_examples?: Array<GlobalNodeSetting.PositiveFinetuneExample>;
    }

    export namespace GlobalNodeSetting {
      export interface NegativeFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | NegativeFinetuneExample.UnionMember0
          | NegativeFinetuneExample.UnionMember1
          | NegativeFinetuneExample.UnionMember2
        >;
      }

      export namespace NegativeFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }

      export interface PositiveFinetuneExample {
        /**
         * Find tune the transition condition to this global node
         */
        transcript: Array<
          | PositiveFinetuneExample.UnionMember0
          | PositiveFinetuneExample.UnionMember1
          | PositiveFinetuneExample.UnionMember2
        >;
      }

      export namespace PositiveFinetuneExample {
        export interface UnionMember0 {
          content: string;

          role: 'agent' | 'user';
        }

        export interface UnionMember1 {
          arguments: string;

          name: string;

          role: 'tool_call_invocation';

          tool_call_id: string;
        }

        export interface UnionMember2 {
          content: string;

          role: 'tool_call_result';

          tool_call_id: string;
        }
      }
    }
  }

  export interface ConversationFlowCustomTool {
    /**
     * Name of the tool
     */
    name: string;

    /**
     * Type of the tool
     */
    type: 'custom';

    /**
     * Server URL to call the tool. Dynamic variables can be used in the URL.
     */
    url: string;

    /**
     * Description of the tool
     */
    description?: string;

    /**
     * Headers to add to the request
     */
    headers?: { [key: string]: string };

    /**
     * HTTP method to use for the request, defaults to POST
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

    /**
     * Tool parameters schema
     */
    parameters?: ConversationFlowCustomTool.Parameters;

    /**
     * Query parameters to add to the request
     */
    query_params?: { [key: string]: string };

    /**
     * Response variables to add to the dynamic variables, key is the variable name,
     * value is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    /**
     * Timeout in milliseconds for the function call, defaults to 2 min
     */
    timeout_ms?: number;

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }

  export namespace ConversationFlowCustomTool {
    /**
     * Tool parameters schema
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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }
}

export declare namespace ConversationFlowComponent {
  export {
    type ConversationFlowComponentResponse as ConversationFlowComponentResponse,
    type ConversationFlowComponentListResponse as ConversationFlowComponentListResponse,
    type ConversationFlowComponentCreateParams as ConversationFlowComponentCreateParams,
    type ConversationFlowComponentUpdateParams as ConversationFlowComponentUpdateParams,
  };
}
