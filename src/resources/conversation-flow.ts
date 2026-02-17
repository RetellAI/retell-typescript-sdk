// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ConversationFlow extends APIResource {
  /**
   * Create a new Conversation Flow that can be attached to an agent. This is used to
   * generate response output for the agent.
   *
   * @example
   * ```ts
   * const conversationFlowResponse =
   *   await client.conversationFlow.create({
   *     model_choice: { model: 'gpt-4.1', type: 'cascading' },
   *     nodes: [
   *       {
   *         id: 'start',
   *         instruction: {
   *           text: 'Greet the customer and ask how you can help them.',
   *           type: 'prompt',
   *         },
   *         type: 'conversation',
   *       },
   *     ],
   *     start_speaker: 'agent',
   *   });
   * ```
   */
  create(body: ConversationFlowCreateParams, options?: RequestOptions): APIPromise<ConversationFlowResponse> {
    return this._client.post('/create-conversation-flow', { body, ...options });
  }

  /**
   * Retrieve details of a specific Conversation Flow
   *
   * @example
   * ```ts
   * const conversationFlowResponse =
   *   await client.conversationFlow.retrieve(
   *     'conversation_flow_id',
   *   );
   * ```
   */
  retrieve(
    conversationFlowID: string,
    query: ConversationFlowRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationFlowResponse> {
    return this._client.get(path`/get-conversation-flow/${conversationFlowID}`, { query, ...options });
  }

  /**
   * Update an existing conversation flow
   *
   * @example
   * ```ts
   * const conversationFlowResponse =
   *   await client.conversationFlow.update(
   *     'conversation_flow_id',
   *   );
   * ```
   */
  update(
    conversationFlowID: string,
    params: ConversationFlowUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ConversationFlowResponse> {
    const { version, ...body } = params;
    return this._client.patch(path`/update-conversation-flow/${conversationFlowID}`, {
      query: { version },
      body,
      ...options,
    });
  }

  /**
   * List all conversation flows that can be attached to an agent.
   *
   * @example
   * ```ts
   * const conversationFlowResponses =
   *   await client.conversationFlow.list();
   * ```
   */
  list(
    query: ConversationFlowListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationFlowListResponse> {
    return this._client.get('/list-conversation-flows', { query, ...options });
  }

  /**
   * Delete a conversation flow and all its versions
   *
   * @example
   * ```ts
   * await client.conversationFlow.delete(
   *   'conversation_flow_id',
   * );
   * ```
   */
  delete(conversationFlowID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/delete-conversation-flow/${conversationFlowID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ConversationFlowResponse {
  /**
   * Unique identifier for the conversation flow
   */
  conversation_flow_id: string;

  /**
   * Version number of the conversation flow
   */
  version: number;

  /**
   * If set, the AI will begin the conversation after waiting for the user for the
   * duration (in milliseconds) specified by this attribute. This only applies if the
   * agent is configured to wait for the user to speak first. If not set, the agent
   * will wait indefinitely for the user to speak.
   */
  begin_after_user_silence_ms?: number | null;

  /**
   * Display position for the begin tag in the frontend.
   */
  begin_tag_display_position?: ConversationFlowResponse.BeginTagDisplayPosition | null;

  /**
   * Local components embedded within the conversation flow.
   */
  components?: Array<ConversationFlowResponse.Component> | null;

  /**
   * Default dynamic variables that can be referenced throughout the conversation
   * flow.
   */
  default_dynamic_variables?: { [key: string]: string } | null;

  /**
   * Global prompt used in every node of the conversation flow.
   */
  global_prompt?: string | null;

  /**
   * Whether this conversation flow is used for transfer LLM.
   */
  is_transfer_llm?: boolean | null;

  /**
   * Knowledge base configuration for RAG retrieval.
   */
  kb_config?: ConversationFlowResponse.KBConfig;

  /**
   * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * A list of MCP server configurations to use for this conversation flow.
   */
  mcps?: Array<ConversationFlowResponse.Mcp> | null;

  /**
   * The model choice for the conversation flow.
   */
  model_choice?: ConversationFlowResponse.ModelChoice;

  /**
   * Controls the randomness of the model's responses. Lower values make responses
   * more deterministic.
   */
  model_temperature?: number | null;

  /**
   * Array of nodes in the conversation flow.
   */
  nodes?: Array<
    | ConversationFlowResponse.ConversationNode
    | ConversationFlowResponse.EndNode
    | ConversationFlowResponse.FunctionNode
    | ConversationFlowResponse.TransferCallNode
    | ConversationFlowResponse.PressDigitNode
    | ConversationFlowResponse.BranchNode
    | ConversationFlowResponse.SMSNode
    | ConversationFlowResponse.ExtractDynamicVariablesNode
    | ConversationFlowResponse.AgentSwapNode
    | ConversationFlowResponse.McpNode
    | ConversationFlowResponse.ComponentNode
    | ConversationFlowResponse.BridgeTransferNode
    | ConversationFlowResponse.CancelTransferNode
  >;

  /**
   * ID of the start node in the conversation flow.
   */
  start_node_id?: string | null;

  /**
   * Who starts the conversation - user or agent.
   */
  start_speaker?: 'user' | 'agent';

  /**
   * Whether to use strict mode for tool calls. Only applicable when using certain
   * supported models.
   */
  tool_call_strict_mode?: boolean | null;

  /**
   * Tools available in the conversation flow.
   */
  tools?: Array<
    | ConversationFlowResponse.CustomTool
    | ConversationFlowResponse.CheckAvailabilityCalTool
    | ConversationFlowResponse.BookAppointmentCalTool
  > | null;
}

export namespace ConversationFlowResponse {
  /**
   * Display position for the begin tag in the frontend.
   */
  export interface BeginTagDisplayPosition {
    x?: number;

    y?: number;
  }

  export interface Component {
    /**
     * Name of the component
     */
    name: string;

    /**
     * Nodes that make up the component
     */
    nodes: Array<
      | Component.ConversationNode
      | Component.EndNode
      | Component.FunctionNode
      | Component.TransferCallNode
      | Component.PressDigitNode
      | Component.BranchNode
      | Component.SMSNode
      | Component.ExtractDynamicVariablesNode
      | Component.AgentSwapNode
      | Component.McpNode
      | Component.ComponentNode
      | Component.BridgeTransferNode
      | Component.CancelTransferNode
    >;

    /**
     * Display position for the begin tag in the frontend
     */
    begin_tag_display_position?: Component.BeginTagDisplayPosition | null;

    /**
     * A list of MCP server configurations to use for this component
     */
    mcps?: Array<Component.Mcp> | null;

    /**
     * ID of the starting node
     */
    start_node_id?: string | null;

    /**
     * Tools available within the component
     */
    tools?: Array<
      Component.CustomTool | Component.CheckAvailabilityCalTool | Component.BookAppointmentCalTool
    > | null;
  }

  export namespace Component {
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

      always_edge?: ConversationNode.AlwaysEdge;

      /**
       * Position for frontend display
       */
      display_position?: ConversationNode.DisplayPosition;

      edges?: Array<ConversationNode.Edge>;

      finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

      finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

      global_node_setting?: ConversationNode.GlobalNodeSetting;

      interruption_sensitivity?: number | null;

      /**
       * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
       */
      knowledge_base_ids?: Array<string> | null;

      model_choice?: ConversationNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      responsiveness?: number | null;

      skip_response_edge?: ConversationNode.SkipResponseEdge;

      /**
       * The tool ids of the tools defined in main conversation flow or component that
       * can be used in this conversation node.
       */
      tool_ids?: Array<string> | null;

      /**
       * The tools owned by this conversation node. This includes other tool types like
       * transfer_call, agent_swap, etc.
       */
      tools?: Array<
        | ConversationNode.EndCallTool
        | ConversationNode.TransferCallTool
        | ConversationNode.CheckAvailabilityCalTool
        | ConversationNode.BookAppointmentCalTool
        | ConversationNode.AgentSwapTool
        | ConversationNode.PressDigitTool
        | ConversationNode.SendSMSTool
        | ConversationNode.CustomTool
        | ConversationNode.ExtractDynamicVariableTool
        | ConversationNode.BridgeTransferTool
        | ConversationNode.CancelTransferTool
        | ConversationNode.McpTool
      > | null;

      voice_speed?: number | null;
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

      export interface AlwaysEdge {
        /**
         * Unique identifier for the edge
         */
        id: string;

        transition_condition:
          | AlwaysEdge.PromptCondition
          | AlwaysEdge.EquationCondition
          | AlwaysEdge.UnionMember2;

        /**
         * ID of the destination node
         */
        destination_node_id?: string;
      }

      export namespace AlwaysEdge {
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
           * Must be "Always" for always edge
           */
          prompt?: 'Always';
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
           * Must be "Always" for always edge
           */
          prompt: 'Always';

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

        /**
         * Describes what to say to user when ending the call. Only applicable when
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
         * If true, will speak during execution.
         */
        speak_during_execution?: boolean;
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
         * Describes what to say to user when transferring the call. Only applicable when
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
         * If true, the e.164 validation will be ignored for the from_number. This can be
         * useful when you want to dial to internal pseudo numbers. This only applies when
         * you are using custom telephony and does not apply when you are using Retell
         * Telephony. If omitted, the default value is false.
         */
        ignore_e164_validation?: boolean;

        /**
         * If true, will speak during execution.
         */
        speak_during_execution?: boolean;
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
           * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
           * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
           * call.
           */
          cold_transfer_mode?: 'sip_refer' | 'sip_invite';

          /**
           * If set to true, will show transferee (the user, not the AI agent) as caller when
           * transferring. Requires the telephony side to support caller id override. Retell
           * Twilio numbers support this option. This parameter takes effect only when
           * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
           * is not available. Retell Twilio numbers always use user's number as the caller
           * id when using `sip refer` cold transfer mode.
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
           * Whether to play an audio cue when bridging the call. Defaults to true.
           */
          enable_bridge_audio_cue?: boolean;

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
         * availability for. Can be a number or a dynamic variable in the format
         * `{{variable_name}}` that will be resolved at runtime.
         */
        event_type_id: number | string;

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
         * Can also be a dynamic variable in the format `{{variable_name}}` that will be
         * resolved at runtime. If not specified, will check if user specified timezone in
         * call, and if not, will use the timezone of the Retell servers.
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
         * Can be a number or a dynamic variable in the format `{{variable_name}}` that
         * will be resolved at runtime.
         */
        event_type_id: number | string;

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
         * Can also be a dynamic variable in the format `{{variable_name}}` that will be
         * resolved at runtime. If not specified, will check if user specified timezone in
         * call, and if not, will use the timezone of the Retell servers.
         */
        timezone?: string;
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

        /**
         * Type of execution message. "prompt" means the agent will use
         * execution_message_description as a prompt to generate the message. "static_text"
         * means the agent will speak the execution_message_description directly. Defaults
         * to "prompt".
         */
        execution_message_type?: 'prompt' | 'static_text';

        /**
         * If true, keep the current voice when swapping agents. Defaults to false.
         */
        keep_current_voice?: boolean;

        speak_during_execution?: boolean;

        /**
         * Webhook setting for the agent swap, defaults to only source.
         */
        webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
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
         * Describes what this tool does and when to call this tool.
         */
        description?: string;

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

      export interface BridgeTransferTool {
        /**
         * Name of the tool. Must be unique within all tools available to LLM at any given
         * time (general tools + state tools + state transitions). Must be consisted of
         * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
         * (no space allowed).
         */
        name: string;

        type: 'bridge_transfer';

        /**
         * Describes what the tool does. This tool is only available to transfer agents
         * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
         * invoked, it bridges the original caller to the transfer target and ends the
         * transfer agent call.
         */
        description?: string;
      }

      export interface CancelTransferTool {
        /**
         * Name of the tool. Must be unique within all tools available to LLM at any given
         * time (general tools + state tools + state transitions). Must be consisted of
         * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
         * (no space allowed).
         */
        name: string;

        type: 'cancel_transfer';

        /**
         * Describes what the tool does. This tool is only available to transfer agents
         * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
         * invoked, it cancels the transfer, returns the original caller to the main agent,
         * and ends the transfer agent call.
         */
        description?: string;
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
         * Type of execution message. "prompt" means the agent will use
         * execution_message_description as a prompt to generate the message. "static_text"
         * means the agent will speak the execution_message_description directly. Defaults
         * to "prompt".
         */
        execution_message_type?: 'prompt' | 'static_text';

        /**
         * The input schema of the MCP tool.
         */
        input_schema?: { [key: string]: string };

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
       * What to say when ending the call, only used when speak during execution
       */
      instruction?: EndNode.NodeInstructionPrompt | EndNode.NodeInstructionStaticText;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;
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

      else_edge?: FunctionNode.ElseEdge;

      finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

      global_node_setting?: FunctionNode.GlobalNodeSetting;

      instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

      interruption_sensitivity?: number | null;

      model_choice?: FunctionNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      responsiveness?: number | null;

      /**
       * Whether to speak during tool execution
       */
      speak_during_execution?: boolean;

      voice_speed?: number | null;
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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

      /**
       * What to say when transferring the call, only used when speak during execution
       */
      instruction?: TransferCallNode.NodeInstructionPrompt | TransferCallNode.NodeInstructionStaticText;

      model_choice?: TransferCallNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;
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
         * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
         * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
         * call.
         */
        cold_transfer_mode?: 'sip_refer' | 'sip_invite';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring. Requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option. This parameter takes effect only when
         * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
         * is not available. Retell Twilio numbers always use user's number as the caller
         * id when using `sip refer` cold transfer mode.
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
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

      else_edge?: ExtractDynamicVariablesNode.ElseEdge;

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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
       * What to say when swapping agents, only used when speak during execution
       */
      instruction?: AgentSwapNode.NodeInstructionPrompt | AgentSwapNode.NodeInstructionStaticText;

      /**
       * If true, keep the current voice when swapping agents. Defaults to false.
       */
      keep_current_voice?: boolean;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;

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

      else_edge?: McpNode.ElseEdge;

      finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

      global_node_setting?: McpNode.GlobalNodeSetting;

      /**
       * What to say when calling the function, only used when speak during execution
       */
      instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

      interruption_sensitivity?: number | null;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * Response variables to add to dynamic variables, key is the variable name, value
       * is the path to the variable in the response
       */
      response_variables?: { [key: string]: string };

      responsiveness?: number | null;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;

      voice_speed?: number | null;
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

    export interface BridgeTransferNode {
      /**
       * Unique identifier for the node
       */
      id: string;

      /**
       * Type of the node - initiates a warm transfer by bridging the call
       */
      type: 'bridge_transfer';

      /**
       * Position for frontend display
       */
      display_position?: BridgeTransferNode.DisplayPosition;

      global_node_setting?: BridgeTransferNode.GlobalNodeSetting;

      /**
       * Optional name for display purposes
       */
      name?: string;
    }

    export namespace BridgeTransferNode {
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

    export interface CancelTransferNode {
      /**
       * Unique identifier for the node
       */
      id: string;

      /**
       * Type of the node - cancels the warm transfer and ends the transfer agent call
       */
      type: 'cancel_transfer';

      /**
       * Position for frontend display
       */
      display_position?: CancelTransferNode.DisplayPosition;

      global_node_setting?: CancelTransferNode.GlobalNodeSetting;

      /**
       * Optional name for display purposes
       */
      name?: string;
    }

    export namespace CancelTransferNode {
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

    /**
     * Display position for the begin tag in the frontend
     */
    export interface BeginTagDisplayPosition {
      x?: number;

      y?: number;
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
       * Describes what this tool does and when to call this tool.
       */
      description?: string;

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

      /**
       * Unique identifier for the tool
       */
      tool_id?: string;
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

    export interface CheckAvailabilityCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to check
       * availability for.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to check
       * availability for. Can be a number or a dynamic variable in the format
       * `{{variable_name}}` that will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
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
       * Can be a number or a dynamic variable in the format `{{variable_name}}` that
       * will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
       */
      timezone?: string;

      /**
       * Unique identifier for the tool
       */
      tool_id?: string;
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

  /**
   * The model choice for the conversation flow.
   */
  export interface ModelChoice {
    /**
     * The LLM model to use
     */
    model:
      | 'gpt-4.1'
      | 'gpt-4.1-mini'
      | 'gpt-4.1-nano'
      | 'gpt-5'
      | 'gpt-5.1'
      | 'gpt-5.2'
      | 'gpt-5-mini'
      | 'gpt-5-nano'
      | 'claude-4.5-sonnet'
      | 'claude-4.5-haiku'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-lite'
      | 'gemini-3.0-flash';

    /**
     * Type of model choice
     */
    type: 'cascading';

    /**
     * Whether to use high priority pool with more dedicated resource, default false
     */
    high_priority?: boolean;
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

    always_edge?: ConversationNode.AlwaysEdge;

    /**
     * Position for frontend display
     */
    display_position?: ConversationNode.DisplayPosition;

    edges?: Array<ConversationNode.Edge>;

    finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

    finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

    global_node_setting?: ConversationNode.GlobalNodeSetting;

    interruption_sensitivity?: number | null;

    /**
     * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
     */
    knowledge_base_ids?: Array<string> | null;

    model_choice?: ConversationNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    responsiveness?: number | null;

    skip_response_edge?: ConversationNode.SkipResponseEdge;

    /**
     * The tool ids of the tools defined in main conversation flow or component that
     * can be used in this conversation node.
     */
    tool_ids?: Array<string> | null;

    /**
     * The tools owned by this conversation node. This includes other tool types like
     * transfer_call, agent_swap, etc.
     */
    tools?: Array<
      | ConversationNode.EndCallTool
      | ConversationNode.TransferCallTool
      | ConversationNode.CheckAvailabilityCalTool
      | ConversationNode.BookAppointmentCalTool
      | ConversationNode.AgentSwapTool
      | ConversationNode.PressDigitTool
      | ConversationNode.SendSMSTool
      | ConversationNode.CustomTool
      | ConversationNode.ExtractDynamicVariableTool
      | ConversationNode.BridgeTransferTool
      | ConversationNode.CancelTransferTool
      | ConversationNode.McpTool
    > | null;

    voice_speed?: number | null;
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

    export interface AlwaysEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | AlwaysEdge.PromptCondition
        | AlwaysEdge.EquationCondition
        | AlwaysEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace AlwaysEdge {
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
         * Must be "Always" for always edge
         */
        prompt?: 'Always';
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
         * Must be "Always" for always edge
         */
        prompt: 'Always';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

      /**
       * Describes what to say to user when ending the call. Only applicable when
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
       * If true, will speak during execution.
       */
      speak_during_execution?: boolean;
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
       * Describes what to say to user when transferring the call. Only applicable when
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
       * If true, the e.164 validation will be ignored for the from_number. This can be
       * useful when you want to dial to internal pseudo numbers. This only applies when
       * you are using custom telephony and does not apply when you are using Retell
       * Telephony. If omitted, the default value is false.
       */
      ignore_e164_validation?: boolean;

      /**
       * If true, will speak during execution.
       */
      speak_during_execution?: boolean;
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
         * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
         * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
         * call.
         */
        cold_transfer_mode?: 'sip_refer' | 'sip_invite';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring. Requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option. This parameter takes effect only when
         * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
         * is not available. Retell Twilio numbers always use user's number as the caller
         * id when using `sip refer` cold transfer mode.
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
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

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
       * availability for. Can be a number or a dynamic variable in the format
       * `{{variable_name}}` that will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
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
       * Can be a number or a dynamic variable in the format `{{variable_name}}` that
       * will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
       */
      timezone?: string;
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

      /**
       * Type of execution message. "prompt" means the agent will use
       * execution_message_description as a prompt to generate the message. "static_text"
       * means the agent will speak the execution_message_description directly. Defaults
       * to "prompt".
       */
      execution_message_type?: 'prompt' | 'static_text';

      /**
       * If true, keep the current voice when swapping agents. Defaults to false.
       */
      keep_current_voice?: boolean;

      speak_during_execution?: boolean;

      /**
       * Webhook setting for the agent swap, defaults to only source.
       */
      webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
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
       * Describes what this tool does and when to call this tool.
       */
      description?: string;

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

    export interface BridgeTransferTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'bridge_transfer';

      /**
       * Describes what the tool does. This tool is only available to transfer agents
       * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
       * invoked, it bridges the original caller to the transfer target and ends the
       * transfer agent call.
       */
      description?: string;
    }

    export interface CancelTransferTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'cancel_transfer';

      /**
       * Describes what the tool does. This tool is only available to transfer agents
       * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
       * invoked, it cancels the transfer, returns the original caller to the main agent,
       * and ends the transfer agent call.
       */
      description?: string;
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
       * Type of execution message. "prompt" means the agent will use
       * execution_message_description as a prompt to generate the message. "static_text"
       * means the agent will speak the execution_message_description directly. Defaults
       * to "prompt".
       */
      execution_message_type?: 'prompt' | 'static_text';

      /**
       * The input schema of the MCP tool.
       */
      input_schema?: { [key: string]: string };

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
     * What to say when ending the call, only used when speak during execution
     */
    instruction?: EndNode.NodeInstructionPrompt | EndNode.NodeInstructionStaticText;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
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

    else_edge?: FunctionNode.ElseEdge;

    finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

    global_node_setting?: FunctionNode.GlobalNodeSetting;

    instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

    interruption_sensitivity?: number | null;

    model_choice?: FunctionNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    responsiveness?: number | null;

    /**
     * Whether to speak during tool execution
     */
    speak_during_execution?: boolean;

    voice_speed?: number | null;
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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

    /**
     * What to say when transferring the call, only used when speak during execution
     */
    instruction?: TransferCallNode.NodeInstructionPrompt | TransferCallNode.NodeInstructionStaticText;

    model_choice?: TransferCallNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
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
       * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
       * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
       * call.
       */
      cold_transfer_mode?: 'sip_refer' | 'sip_invite';

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring. Requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option. This parameter takes effect only when
       * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
       * is not available. Retell Twilio numbers always use user's number as the caller
       * id when using `sip refer` cold transfer mode.
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
       * Whether to play an audio cue when bridging the call. Defaults to true.
       */
      enable_bridge_audio_cue?: boolean;

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

    else_edge?: ExtractDynamicVariablesNode.ElseEdge;

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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
     * What to say when swapping agents, only used when speak during execution
     */
    instruction?: AgentSwapNode.NodeInstructionPrompt | AgentSwapNode.NodeInstructionStaticText;

    /**
     * If true, keep the current voice when swapping agents. Defaults to false.
     */
    keep_current_voice?: boolean;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;

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

    else_edge?: McpNode.ElseEdge;

    finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

    global_node_setting?: McpNode.GlobalNodeSetting;

    /**
     * What to say when calling the function, only used when speak during execution
     */
    instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

    interruption_sensitivity?: number | null;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    responsiveness?: number | null;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;

    voice_speed?: number | null;
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

  export interface BridgeTransferNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node - initiates a warm transfer by bridging the call
     */
    type: 'bridge_transfer';

    /**
     * Position for frontend display
     */
    display_position?: BridgeTransferNode.DisplayPosition;

    global_node_setting?: BridgeTransferNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace BridgeTransferNode {
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

  export interface CancelTransferNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node - cancels the warm transfer and ends the transfer agent call
     */
    type: 'cancel_transfer';

    /**
     * Position for frontend display
     */
    display_position?: CancelTransferNode.DisplayPosition;

    global_node_setting?: CancelTransferNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace CancelTransferNode {
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
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
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

  export interface CheckAvailabilityCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to check
     * availability for.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to check
     * availability for. Can be a number or a dynamic variable in the format
     * `{{variable_name}}` that will be resolved at runtime.
     */
    event_type_id: number | string;

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
     * Can also be a dynamic variable in the format `{{variable_name}}` that will be
     * resolved at runtime. If not specified, will check if user specified timezone in
     * call, and if not, will use the timezone of the Retell servers.
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
     * Can be a number or a dynamic variable in the format `{{variable_name}}` that
     * will be resolved at runtime.
     */
    event_type_id: number | string;

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
     * Can also be a dynamic variable in the format `{{variable_name}}` that will be
     * resolved at runtime. If not specified, will check if user specified timezone in
     * call, and if not, will use the timezone of the Retell servers.
     */
    timezone?: string;

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }
}

export type ConversationFlowListResponse = Array<ConversationFlowResponse>;

export interface ConversationFlowCreateParams {
  /**
   * The model choice for the conversation flow.
   */
  model_choice: ConversationFlowCreateParams.ModelChoice;

  /**
   * Array of nodes in the conversation flow.
   */
  nodes: Array<
    | ConversationFlowCreateParams.ConversationNode
    | ConversationFlowCreateParams.EndNode
    | ConversationFlowCreateParams.FunctionNode
    | ConversationFlowCreateParams.TransferCallNode
    | ConversationFlowCreateParams.PressDigitNode
    | ConversationFlowCreateParams.BranchNode
    | ConversationFlowCreateParams.SMSNode
    | ConversationFlowCreateParams.ExtractDynamicVariablesNode
    | ConversationFlowCreateParams.AgentSwapNode
    | ConversationFlowCreateParams.McpNode
    | ConversationFlowCreateParams.ComponentNode
    | ConversationFlowCreateParams.BridgeTransferNode
    | ConversationFlowCreateParams.CancelTransferNode
  >;

  /**
   * Who starts the conversation - user or agent.
   */
  start_speaker: 'user' | 'agent';

  /**
   * If set, the AI will begin the conversation after waiting for the user for the
   * duration (in milliseconds) specified by this attribute. This only applies if the
   * agent is configured to wait for the user to speak first. If not set, the agent
   * will wait indefinitely for the user to speak.
   */
  begin_after_user_silence_ms?: number | null;

  /**
   * Display position for the begin tag in the frontend.
   */
  begin_tag_display_position?: ConversationFlowCreateParams.BeginTagDisplayPosition | null;

  /**
   * Local components embedded within the conversation flow.
   */
  components?: Array<ConversationFlowCreateParams.Component> | null;

  /**
   * Default dynamic variables that can be referenced throughout the conversation
   * flow.
   */
  default_dynamic_variables?: { [key: string]: string } | null;

  /**
   * Global prompt used in every node of the conversation flow.
   */
  global_prompt?: string | null;

  /**
   * Whether this conversation flow is used for transfer LLM.
   */
  is_transfer_llm?: boolean | null;

  /**
   * Knowledge base configuration for RAG retrieval.
   */
  kb_config?: ConversationFlowCreateParams.KBConfig;

  /**
   * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * A list of MCP server configurations to use for this conversation flow.
   */
  mcps?: Array<ConversationFlowCreateParams.Mcp> | null;

  /**
   * Controls the randomness of the model's responses. Lower values make responses
   * more deterministic.
   */
  model_temperature?: number | null;

  /**
   * ID of the start node in the conversation flow.
   */
  start_node_id?: string | null;

  /**
   * Whether to use strict mode for tool calls. Only applicable when using certain
   * supported models.
   */
  tool_call_strict_mode?: boolean | null;

  /**
   * Tools available in the conversation flow.
   */
  tools?: Array<
    | ConversationFlowCreateParams.CustomTool
    | ConversationFlowCreateParams.CheckAvailabilityCalTool
    | ConversationFlowCreateParams.BookAppointmentCalTool
  > | null;
}

export namespace ConversationFlowCreateParams {
  /**
   * The model choice for the conversation flow.
   */
  export interface ModelChoice {
    /**
     * The LLM model to use
     */
    model:
      | 'gpt-4.1'
      | 'gpt-4.1-mini'
      | 'gpt-4.1-nano'
      | 'gpt-5'
      | 'gpt-5.1'
      | 'gpt-5.2'
      | 'gpt-5-mini'
      | 'gpt-5-nano'
      | 'claude-4.5-sonnet'
      | 'claude-4.5-haiku'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-lite'
      | 'gemini-3.0-flash';

    /**
     * Type of model choice
     */
    type: 'cascading';

    /**
     * Whether to use high priority pool with more dedicated resource, default false
     */
    high_priority?: boolean;
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

    always_edge?: ConversationNode.AlwaysEdge;

    /**
     * Position for frontend display
     */
    display_position?: ConversationNode.DisplayPosition;

    edges?: Array<ConversationNode.Edge>;

    finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

    finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

    global_node_setting?: ConversationNode.GlobalNodeSetting;

    interruption_sensitivity?: number | null;

    /**
     * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
     */
    knowledge_base_ids?: Array<string> | null;

    model_choice?: ConversationNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    responsiveness?: number | null;

    skip_response_edge?: ConversationNode.SkipResponseEdge;

    /**
     * The tool ids of the tools defined in main conversation flow or component that
     * can be used in this conversation node.
     */
    tool_ids?: Array<string> | null;

    /**
     * The tools owned by this conversation node. This includes other tool types like
     * transfer_call, agent_swap, etc.
     */
    tools?: Array<
      | ConversationNode.EndCallTool
      | ConversationNode.TransferCallTool
      | ConversationNode.CheckAvailabilityCalTool
      | ConversationNode.BookAppointmentCalTool
      | ConversationNode.AgentSwapTool
      | ConversationNode.PressDigitTool
      | ConversationNode.SendSMSTool
      | ConversationNode.CustomTool
      | ConversationNode.ExtractDynamicVariableTool
      | ConversationNode.BridgeTransferTool
      | ConversationNode.CancelTransferTool
      | ConversationNode.McpTool
    > | null;

    voice_speed?: number | null;
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

    export interface AlwaysEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | AlwaysEdge.PromptCondition
        | AlwaysEdge.EquationCondition
        | AlwaysEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace AlwaysEdge {
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
         * Must be "Always" for always edge
         */
        prompt?: 'Always';
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
         * Must be "Always" for always edge
         */
        prompt: 'Always';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

      /**
       * Describes what to say to user when ending the call. Only applicable when
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
       * If true, will speak during execution.
       */
      speak_during_execution?: boolean;
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
       * Describes what to say to user when transferring the call. Only applicable when
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
       * If true, the e.164 validation will be ignored for the from_number. This can be
       * useful when you want to dial to internal pseudo numbers. This only applies when
       * you are using custom telephony and does not apply when you are using Retell
       * Telephony. If omitted, the default value is false.
       */
      ignore_e164_validation?: boolean;

      /**
       * If true, will speak during execution.
       */
      speak_during_execution?: boolean;
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
         * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
         * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
         * call.
         */
        cold_transfer_mode?: 'sip_refer' | 'sip_invite';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring. Requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option. This parameter takes effect only when
         * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
         * is not available. Retell Twilio numbers always use user's number as the caller
         * id when using `sip refer` cold transfer mode.
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
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

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
       * availability for. Can be a number or a dynamic variable in the format
       * `{{variable_name}}` that will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
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
       * Can be a number or a dynamic variable in the format `{{variable_name}}` that
       * will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
       */
      timezone?: string;
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

      /**
       * Type of execution message. "prompt" means the agent will use
       * execution_message_description as a prompt to generate the message. "static_text"
       * means the agent will speak the execution_message_description directly. Defaults
       * to "prompt".
       */
      execution_message_type?: 'prompt' | 'static_text';

      /**
       * If true, keep the current voice when swapping agents. Defaults to false.
       */
      keep_current_voice?: boolean;

      speak_during_execution?: boolean;

      /**
       * Webhook setting for the agent swap, defaults to only source.
       */
      webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
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
       * Describes what this tool does and when to call this tool.
       */
      description?: string;

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

    export interface BridgeTransferTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'bridge_transfer';

      /**
       * Describes what the tool does. This tool is only available to transfer agents
       * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
       * invoked, it bridges the original caller to the transfer target and ends the
       * transfer agent call.
       */
      description?: string;
    }

    export interface CancelTransferTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'cancel_transfer';

      /**
       * Describes what the tool does. This tool is only available to transfer agents
       * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
       * invoked, it cancels the transfer, returns the original caller to the main agent,
       * and ends the transfer agent call.
       */
      description?: string;
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
       * Type of execution message. "prompt" means the agent will use
       * execution_message_description as a prompt to generate the message. "static_text"
       * means the agent will speak the execution_message_description directly. Defaults
       * to "prompt".
       */
      execution_message_type?: 'prompt' | 'static_text';

      /**
       * The input schema of the MCP tool.
       */
      input_schema?: { [key: string]: string };

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
     * What to say when ending the call, only used when speak during execution
     */
    instruction?: EndNode.NodeInstructionPrompt | EndNode.NodeInstructionStaticText;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
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

    else_edge?: FunctionNode.ElseEdge;

    finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

    global_node_setting?: FunctionNode.GlobalNodeSetting;

    instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

    interruption_sensitivity?: number | null;

    model_choice?: FunctionNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    responsiveness?: number | null;

    /**
     * Whether to speak during tool execution
     */
    speak_during_execution?: boolean;

    voice_speed?: number | null;
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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

    /**
     * What to say when transferring the call, only used when speak during execution
     */
    instruction?: TransferCallNode.NodeInstructionPrompt | TransferCallNode.NodeInstructionStaticText;

    model_choice?: TransferCallNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
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
       * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
       * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
       * call.
       */
      cold_transfer_mode?: 'sip_refer' | 'sip_invite';

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring. Requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option. This parameter takes effect only when
       * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
       * is not available. Retell Twilio numbers always use user's number as the caller
       * id when using `sip refer` cold transfer mode.
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
       * Whether to play an audio cue when bridging the call. Defaults to true.
       */
      enable_bridge_audio_cue?: boolean;

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

    else_edge?: ExtractDynamicVariablesNode.ElseEdge;

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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
     * What to say when swapping agents, only used when speak during execution
     */
    instruction?: AgentSwapNode.NodeInstructionPrompt | AgentSwapNode.NodeInstructionStaticText;

    /**
     * If true, keep the current voice when swapping agents. Defaults to false.
     */
    keep_current_voice?: boolean;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;

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

    else_edge?: McpNode.ElseEdge;

    finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

    global_node_setting?: McpNode.GlobalNodeSetting;

    /**
     * What to say when calling the function, only used when speak during execution
     */
    instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

    interruption_sensitivity?: number | null;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    responsiveness?: number | null;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;

    voice_speed?: number | null;
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

  export interface BridgeTransferNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node - initiates a warm transfer by bridging the call
     */
    type: 'bridge_transfer';

    /**
     * Position for frontend display
     */
    display_position?: BridgeTransferNode.DisplayPosition;

    global_node_setting?: BridgeTransferNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace BridgeTransferNode {
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

  export interface CancelTransferNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node - cancels the warm transfer and ends the transfer agent call
     */
    type: 'cancel_transfer';

    /**
     * Position for frontend display
     */
    display_position?: CancelTransferNode.DisplayPosition;

    global_node_setting?: CancelTransferNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace CancelTransferNode {
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

  /**
   * Display position for the begin tag in the frontend.
   */
  export interface BeginTagDisplayPosition {
    x?: number;

    y?: number;
  }

  export interface Component {
    /**
     * Name of the component
     */
    name: string;

    /**
     * Nodes that make up the component
     */
    nodes: Array<
      | Component.ConversationNode
      | Component.EndNode
      | Component.FunctionNode
      | Component.TransferCallNode
      | Component.PressDigitNode
      | Component.BranchNode
      | Component.SMSNode
      | Component.ExtractDynamicVariablesNode
      | Component.AgentSwapNode
      | Component.McpNode
      | Component.ComponentNode
      | Component.BridgeTransferNode
      | Component.CancelTransferNode
    >;

    /**
     * Display position for the begin tag in the frontend
     */
    begin_tag_display_position?: Component.BeginTagDisplayPosition | null;

    /**
     * A list of MCP server configurations to use for this component
     */
    mcps?: Array<Component.Mcp> | null;

    /**
     * ID of the starting node
     */
    start_node_id?: string | null;

    /**
     * Tools available within the component
     */
    tools?: Array<
      Component.CustomTool | Component.CheckAvailabilityCalTool | Component.BookAppointmentCalTool
    > | null;
  }

  export namespace Component {
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

      always_edge?: ConversationNode.AlwaysEdge;

      /**
       * Position for frontend display
       */
      display_position?: ConversationNode.DisplayPosition;

      edges?: Array<ConversationNode.Edge>;

      finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

      finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

      global_node_setting?: ConversationNode.GlobalNodeSetting;

      interruption_sensitivity?: number | null;

      /**
       * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
       */
      knowledge_base_ids?: Array<string> | null;

      model_choice?: ConversationNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      responsiveness?: number | null;

      skip_response_edge?: ConversationNode.SkipResponseEdge;

      /**
       * The tool ids of the tools defined in main conversation flow or component that
       * can be used in this conversation node.
       */
      tool_ids?: Array<string> | null;

      /**
       * The tools owned by this conversation node. This includes other tool types like
       * transfer_call, agent_swap, etc.
       */
      tools?: Array<
        | ConversationNode.EndCallTool
        | ConversationNode.TransferCallTool
        | ConversationNode.CheckAvailabilityCalTool
        | ConversationNode.BookAppointmentCalTool
        | ConversationNode.AgentSwapTool
        | ConversationNode.PressDigitTool
        | ConversationNode.SendSMSTool
        | ConversationNode.CustomTool
        | ConversationNode.ExtractDynamicVariableTool
        | ConversationNode.BridgeTransferTool
        | ConversationNode.CancelTransferTool
        | ConversationNode.McpTool
      > | null;

      voice_speed?: number | null;
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

      export interface AlwaysEdge {
        /**
         * Unique identifier for the edge
         */
        id: string;

        transition_condition:
          | AlwaysEdge.PromptCondition
          | AlwaysEdge.EquationCondition
          | AlwaysEdge.UnionMember2;

        /**
         * ID of the destination node
         */
        destination_node_id?: string;
      }

      export namespace AlwaysEdge {
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
           * Must be "Always" for always edge
           */
          prompt?: 'Always';
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
           * Must be "Always" for always edge
           */
          prompt: 'Always';

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

        /**
         * Describes what to say to user when ending the call. Only applicable when
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
         * If true, will speak during execution.
         */
        speak_during_execution?: boolean;
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
         * Describes what to say to user when transferring the call. Only applicable when
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
         * If true, the e.164 validation will be ignored for the from_number. This can be
         * useful when you want to dial to internal pseudo numbers. This only applies when
         * you are using custom telephony and does not apply when you are using Retell
         * Telephony. If omitted, the default value is false.
         */
        ignore_e164_validation?: boolean;

        /**
         * If true, will speak during execution.
         */
        speak_during_execution?: boolean;
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
           * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
           * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
           * call.
           */
          cold_transfer_mode?: 'sip_refer' | 'sip_invite';

          /**
           * If set to true, will show transferee (the user, not the AI agent) as caller when
           * transferring. Requires the telephony side to support caller id override. Retell
           * Twilio numbers support this option. This parameter takes effect only when
           * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
           * is not available. Retell Twilio numbers always use user's number as the caller
           * id when using `sip refer` cold transfer mode.
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
           * Whether to play an audio cue when bridging the call. Defaults to true.
           */
          enable_bridge_audio_cue?: boolean;

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
         * availability for. Can be a number or a dynamic variable in the format
         * `{{variable_name}}` that will be resolved at runtime.
         */
        event_type_id: number | string;

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
         * Can also be a dynamic variable in the format `{{variable_name}}` that will be
         * resolved at runtime. If not specified, will check if user specified timezone in
         * call, and if not, will use the timezone of the Retell servers.
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
         * Can be a number or a dynamic variable in the format `{{variable_name}}` that
         * will be resolved at runtime.
         */
        event_type_id: number | string;

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
         * Can also be a dynamic variable in the format `{{variable_name}}` that will be
         * resolved at runtime. If not specified, will check if user specified timezone in
         * call, and if not, will use the timezone of the Retell servers.
         */
        timezone?: string;
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

        /**
         * Type of execution message. "prompt" means the agent will use
         * execution_message_description as a prompt to generate the message. "static_text"
         * means the agent will speak the execution_message_description directly. Defaults
         * to "prompt".
         */
        execution_message_type?: 'prompt' | 'static_text';

        /**
         * If true, keep the current voice when swapping agents. Defaults to false.
         */
        keep_current_voice?: boolean;

        speak_during_execution?: boolean;

        /**
         * Webhook setting for the agent swap, defaults to only source.
         */
        webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
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
         * Describes what this tool does and when to call this tool.
         */
        description?: string;

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

      export interface BridgeTransferTool {
        /**
         * Name of the tool. Must be unique within all tools available to LLM at any given
         * time (general tools + state tools + state transitions). Must be consisted of
         * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
         * (no space allowed).
         */
        name: string;

        type: 'bridge_transfer';

        /**
         * Describes what the tool does. This tool is only available to transfer agents
         * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
         * invoked, it bridges the original caller to the transfer target and ends the
         * transfer agent call.
         */
        description?: string;
      }

      export interface CancelTransferTool {
        /**
         * Name of the tool. Must be unique within all tools available to LLM at any given
         * time (general tools + state tools + state transitions). Must be consisted of
         * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
         * (no space allowed).
         */
        name: string;

        type: 'cancel_transfer';

        /**
         * Describes what the tool does. This tool is only available to transfer agents
         * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
         * invoked, it cancels the transfer, returns the original caller to the main agent,
         * and ends the transfer agent call.
         */
        description?: string;
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
         * Type of execution message. "prompt" means the agent will use
         * execution_message_description as a prompt to generate the message. "static_text"
         * means the agent will speak the execution_message_description directly. Defaults
         * to "prompt".
         */
        execution_message_type?: 'prompt' | 'static_text';

        /**
         * The input schema of the MCP tool.
         */
        input_schema?: { [key: string]: string };

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
       * What to say when ending the call, only used when speak during execution
       */
      instruction?: EndNode.NodeInstructionPrompt | EndNode.NodeInstructionStaticText;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;
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

      else_edge?: FunctionNode.ElseEdge;

      finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

      global_node_setting?: FunctionNode.GlobalNodeSetting;

      instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

      interruption_sensitivity?: number | null;

      model_choice?: FunctionNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      responsiveness?: number | null;

      /**
       * Whether to speak during tool execution
       */
      speak_during_execution?: boolean;

      voice_speed?: number | null;
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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

      /**
       * What to say when transferring the call, only used when speak during execution
       */
      instruction?: TransferCallNode.NodeInstructionPrompt | TransferCallNode.NodeInstructionStaticText;

      model_choice?: TransferCallNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;
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
         * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
         * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
         * call.
         */
        cold_transfer_mode?: 'sip_refer' | 'sip_invite';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring. Requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option. This parameter takes effect only when
         * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
         * is not available. Retell Twilio numbers always use user's number as the caller
         * id when using `sip refer` cold transfer mode.
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
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

      else_edge?: ExtractDynamicVariablesNode.ElseEdge;

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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
       * What to say when swapping agents, only used when speak during execution
       */
      instruction?: AgentSwapNode.NodeInstructionPrompt | AgentSwapNode.NodeInstructionStaticText;

      /**
       * If true, keep the current voice when swapping agents. Defaults to false.
       */
      keep_current_voice?: boolean;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;

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

      else_edge?: McpNode.ElseEdge;

      finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

      global_node_setting?: McpNode.GlobalNodeSetting;

      /**
       * What to say when calling the function, only used when speak during execution
       */
      instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

      interruption_sensitivity?: number | null;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * Response variables to add to dynamic variables, key is the variable name, value
       * is the path to the variable in the response
       */
      response_variables?: { [key: string]: string };

      responsiveness?: number | null;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;

      voice_speed?: number | null;
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

    export interface BridgeTransferNode {
      /**
       * Unique identifier for the node
       */
      id: string;

      /**
       * Type of the node - initiates a warm transfer by bridging the call
       */
      type: 'bridge_transfer';

      /**
       * Position for frontend display
       */
      display_position?: BridgeTransferNode.DisplayPosition;

      global_node_setting?: BridgeTransferNode.GlobalNodeSetting;

      /**
       * Optional name for display purposes
       */
      name?: string;
    }

    export namespace BridgeTransferNode {
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

    export interface CancelTransferNode {
      /**
       * Unique identifier for the node
       */
      id: string;

      /**
       * Type of the node - cancels the warm transfer and ends the transfer agent call
       */
      type: 'cancel_transfer';

      /**
       * Position for frontend display
       */
      display_position?: CancelTransferNode.DisplayPosition;

      global_node_setting?: CancelTransferNode.GlobalNodeSetting;

      /**
       * Optional name for display purposes
       */
      name?: string;
    }

    export namespace CancelTransferNode {
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

    /**
     * Display position for the begin tag in the frontend
     */
    export interface BeginTagDisplayPosition {
      x?: number;

      y?: number;
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
       * Describes what this tool does and when to call this tool.
       */
      description?: string;

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

      /**
       * Unique identifier for the tool
       */
      tool_id?: string;
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

    export interface CheckAvailabilityCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to check
       * availability for.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to check
       * availability for. Can be a number or a dynamic variable in the format
       * `{{variable_name}}` that will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
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
       * Can be a number or a dynamic variable in the format `{{variable_name}}` that
       * will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
       */
      timezone?: string;

      /**
       * Unique identifier for the tool
       */
      tool_id?: string;
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
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
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

  export interface CheckAvailabilityCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to check
     * availability for.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to check
     * availability for. Can be a number or a dynamic variable in the format
     * `{{variable_name}}` that will be resolved at runtime.
     */
    event_type_id: number | string;

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
     * Can also be a dynamic variable in the format `{{variable_name}}` that will be
     * resolved at runtime. If not specified, will check if user specified timezone in
     * call, and if not, will use the timezone of the Retell servers.
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
     * Can be a number or a dynamic variable in the format `{{variable_name}}` that
     * will be resolved at runtime.
     */
    event_type_id: number | string;

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
     * Can also be a dynamic variable in the format `{{variable_name}}` that will be
     * resolved at runtime. If not specified, will check if user specified timezone in
     * call, and if not, will use the timezone of the Retell servers.
     */
    timezone?: string;

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }
}

export interface ConversationFlowRetrieveParams {
  /**
   * Optional version of the conversation flow to retrieve. Default to latest
   * version.
   */
  version?: number;
}

export interface ConversationFlowUpdateParams {
  /**
   * Query param: Optional version of the conversation flow to update. Default to
   * latest version.
   */
  version?: number;

  /**
   * Body param: If set, the AI will begin the conversation after waiting for the
   * user for the duration (in milliseconds) specified by this attribute. This only
   * applies if the agent is configured to wait for the user to speak first. If not
   * set, the agent will wait indefinitely for the user to speak.
   */
  begin_after_user_silence_ms?: number | null;

  /**
   * Body param: Display position for the begin tag in the frontend.
   */
  begin_tag_display_position?: ConversationFlowUpdateParams.BeginTagDisplayPosition | null;

  /**
   * Body param: Local components embedded within the conversation flow.
   */
  components?: Array<ConversationFlowUpdateParams.Component> | null;

  /**
   * Body param: Default dynamic variables that can be referenced throughout the
   * conversation flow.
   */
  default_dynamic_variables?: { [key: string]: string } | null;

  /**
   * Body param: Global prompt used in every node of the conversation flow.
   */
  global_prompt?: string | null;

  /**
   * Body param: Whether this conversation flow is used for transfer LLM.
   */
  is_transfer_llm?: boolean | null;

  /**
   * Body param: Knowledge base configuration for RAG retrieval.
   */
  kb_config?: ConversationFlowUpdateParams.KBConfig;

  /**
   * Body param: Knowledge base IDs for RAG (Retrieval-Augmented Generation).
   */
  knowledge_base_ids?: Array<string> | null;

  /**
   * Body param: A list of MCP server configurations to use for this conversation
   * flow.
   */
  mcps?: Array<ConversationFlowUpdateParams.Mcp> | null;

  /**
   * Body param: The model choice for the conversation flow.
   */
  model_choice?: ConversationFlowUpdateParams.ModelChoice;

  /**
   * Body param: Controls the randomness of the model's responses. Lower values make
   * responses more deterministic.
   */
  model_temperature?: number | null;

  /**
   * Body param: Array of nodes in the conversation flow.
   */
  nodes?: Array<
    | ConversationFlowUpdateParams.ConversationNode
    | ConversationFlowUpdateParams.EndNode
    | ConversationFlowUpdateParams.FunctionNode
    | ConversationFlowUpdateParams.TransferCallNode
    | ConversationFlowUpdateParams.PressDigitNode
    | ConversationFlowUpdateParams.BranchNode
    | ConversationFlowUpdateParams.SMSNode
    | ConversationFlowUpdateParams.ExtractDynamicVariablesNode
    | ConversationFlowUpdateParams.AgentSwapNode
    | ConversationFlowUpdateParams.McpNode
    | ConversationFlowUpdateParams.ComponentNode
    | ConversationFlowUpdateParams.BridgeTransferNode
    | ConversationFlowUpdateParams.CancelTransferNode
  >;

  /**
   * Body param: ID of the start node in the conversation flow.
   */
  start_node_id?: string | null;

  /**
   * Body param: Who starts the conversation - user or agent.
   */
  start_speaker?: 'user' | 'agent';

  /**
   * Body param: Whether to use strict mode for tool calls. Only applicable when
   * using certain supported models.
   */
  tool_call_strict_mode?: boolean | null;

  /**
   * Body param: Tools available in the conversation flow.
   */
  tools?: Array<
    | ConversationFlowUpdateParams.CustomTool
    | ConversationFlowUpdateParams.CheckAvailabilityCalTool
    | ConversationFlowUpdateParams.BookAppointmentCalTool
  > | null;
}

export namespace ConversationFlowUpdateParams {
  /**
   * Display position for the begin tag in the frontend.
   */
  export interface BeginTagDisplayPosition {
    x?: number;

    y?: number;
  }

  export interface Component {
    /**
     * Name of the component
     */
    name: string;

    /**
     * Nodes that make up the component
     */
    nodes: Array<
      | Component.ConversationNode
      | Component.EndNode
      | Component.FunctionNode
      | Component.TransferCallNode
      | Component.PressDigitNode
      | Component.BranchNode
      | Component.SMSNode
      | Component.ExtractDynamicVariablesNode
      | Component.AgentSwapNode
      | Component.McpNode
      | Component.ComponentNode
      | Component.BridgeTransferNode
      | Component.CancelTransferNode
    >;

    /**
     * Display position for the begin tag in the frontend
     */
    begin_tag_display_position?: Component.BeginTagDisplayPosition | null;

    /**
     * A list of MCP server configurations to use for this component
     */
    mcps?: Array<Component.Mcp> | null;

    /**
     * ID of the starting node
     */
    start_node_id?: string | null;

    /**
     * Tools available within the component
     */
    tools?: Array<
      Component.CustomTool | Component.CheckAvailabilityCalTool | Component.BookAppointmentCalTool
    > | null;
  }

  export namespace Component {
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

      always_edge?: ConversationNode.AlwaysEdge;

      /**
       * Position for frontend display
       */
      display_position?: ConversationNode.DisplayPosition;

      edges?: Array<ConversationNode.Edge>;

      finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

      finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

      global_node_setting?: ConversationNode.GlobalNodeSetting;

      interruption_sensitivity?: number | null;

      /**
       * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
       */
      knowledge_base_ids?: Array<string> | null;

      model_choice?: ConversationNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      responsiveness?: number | null;

      skip_response_edge?: ConversationNode.SkipResponseEdge;

      /**
       * The tool ids of the tools defined in main conversation flow or component that
       * can be used in this conversation node.
       */
      tool_ids?: Array<string> | null;

      /**
       * The tools owned by this conversation node. This includes other tool types like
       * transfer_call, agent_swap, etc.
       */
      tools?: Array<
        | ConversationNode.EndCallTool
        | ConversationNode.TransferCallTool
        | ConversationNode.CheckAvailabilityCalTool
        | ConversationNode.BookAppointmentCalTool
        | ConversationNode.AgentSwapTool
        | ConversationNode.PressDigitTool
        | ConversationNode.SendSMSTool
        | ConversationNode.CustomTool
        | ConversationNode.ExtractDynamicVariableTool
        | ConversationNode.BridgeTransferTool
        | ConversationNode.CancelTransferTool
        | ConversationNode.McpTool
      > | null;

      voice_speed?: number | null;
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

      export interface AlwaysEdge {
        /**
         * Unique identifier for the edge
         */
        id: string;

        transition_condition:
          | AlwaysEdge.PromptCondition
          | AlwaysEdge.EquationCondition
          | AlwaysEdge.UnionMember2;

        /**
         * ID of the destination node
         */
        destination_node_id?: string;
      }

      export namespace AlwaysEdge {
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
           * Must be "Always" for always edge
           */
          prompt?: 'Always';
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
           * Must be "Always" for always edge
           */
          prompt: 'Always';

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

        /**
         * Describes what to say to user when ending the call. Only applicable when
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
         * If true, will speak during execution.
         */
        speak_during_execution?: boolean;
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
         * Describes what to say to user when transferring the call. Only applicable when
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
         * If true, the e.164 validation will be ignored for the from_number. This can be
         * useful when you want to dial to internal pseudo numbers. This only applies when
         * you are using custom telephony and does not apply when you are using Retell
         * Telephony. If omitted, the default value is false.
         */
        ignore_e164_validation?: boolean;

        /**
         * If true, will speak during execution.
         */
        speak_during_execution?: boolean;
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
           * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
           * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
           * call.
           */
          cold_transfer_mode?: 'sip_refer' | 'sip_invite';

          /**
           * If set to true, will show transferee (the user, not the AI agent) as caller when
           * transferring. Requires the telephony side to support caller id override. Retell
           * Twilio numbers support this option. This parameter takes effect only when
           * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
           * is not available. Retell Twilio numbers always use user's number as the caller
           * id when using `sip refer` cold transfer mode.
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
           * Whether to play an audio cue when bridging the call. Defaults to true.
           */
          enable_bridge_audio_cue?: boolean;

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
         * availability for. Can be a number or a dynamic variable in the format
         * `{{variable_name}}` that will be resolved at runtime.
         */
        event_type_id: number | string;

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
         * Can also be a dynamic variable in the format `{{variable_name}}` that will be
         * resolved at runtime. If not specified, will check if user specified timezone in
         * call, and if not, will use the timezone of the Retell servers.
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
         * Can be a number or a dynamic variable in the format `{{variable_name}}` that
         * will be resolved at runtime.
         */
        event_type_id: number | string;

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
         * Can also be a dynamic variable in the format `{{variable_name}}` that will be
         * resolved at runtime. If not specified, will check if user specified timezone in
         * call, and if not, will use the timezone of the Retell servers.
         */
        timezone?: string;
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

        /**
         * Type of execution message. "prompt" means the agent will use
         * execution_message_description as a prompt to generate the message. "static_text"
         * means the agent will speak the execution_message_description directly. Defaults
         * to "prompt".
         */
        execution_message_type?: 'prompt' | 'static_text';

        /**
         * If true, keep the current voice when swapping agents. Defaults to false.
         */
        keep_current_voice?: boolean;

        speak_during_execution?: boolean;

        /**
         * Webhook setting for the agent swap, defaults to only source.
         */
        webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
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
         * Describes what this tool does and when to call this tool.
         */
        description?: string;

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

      export interface BridgeTransferTool {
        /**
         * Name of the tool. Must be unique within all tools available to LLM at any given
         * time (general tools + state tools + state transitions). Must be consisted of
         * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
         * (no space allowed).
         */
        name: string;

        type: 'bridge_transfer';

        /**
         * Describes what the tool does. This tool is only available to transfer agents
         * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
         * invoked, it bridges the original caller to the transfer target and ends the
         * transfer agent call.
         */
        description?: string;
      }

      export interface CancelTransferTool {
        /**
         * Name of the tool. Must be unique within all tools available to LLM at any given
         * time (general tools + state tools + state transitions). Must be consisted of
         * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
         * (no space allowed).
         */
        name: string;

        type: 'cancel_transfer';

        /**
         * Describes what the tool does. This tool is only available to transfer agents
         * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
         * invoked, it cancels the transfer, returns the original caller to the main agent,
         * and ends the transfer agent call.
         */
        description?: string;
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
         * Type of execution message. "prompt" means the agent will use
         * execution_message_description as a prompt to generate the message. "static_text"
         * means the agent will speak the execution_message_description directly. Defaults
         * to "prompt".
         */
        execution_message_type?: 'prompt' | 'static_text';

        /**
         * The input schema of the MCP tool.
         */
        input_schema?: { [key: string]: string };

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
       * What to say when ending the call, only used when speak during execution
       */
      instruction?: EndNode.NodeInstructionPrompt | EndNode.NodeInstructionStaticText;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;
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

      else_edge?: FunctionNode.ElseEdge;

      finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

      global_node_setting?: FunctionNode.GlobalNodeSetting;

      instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

      interruption_sensitivity?: number | null;

      model_choice?: FunctionNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      responsiveness?: number | null;

      /**
       * Whether to speak during tool execution
       */
      speak_during_execution?: boolean;

      voice_speed?: number | null;
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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

      /**
       * What to say when transferring the call, only used when speak during execution
       */
      instruction?: TransferCallNode.NodeInstructionPrompt | TransferCallNode.NodeInstructionStaticText;

      model_choice?: TransferCallNode.ModelChoice;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;
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
         * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
         * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
         * call.
         */
        cold_transfer_mode?: 'sip_refer' | 'sip_invite';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring. Requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option. This parameter takes effect only when
         * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
         * is not available. Retell Twilio numbers always use user's number as the caller
         * id when using `sip refer` cold transfer mode.
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
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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

      else_edge?: ExtractDynamicVariablesNode.ElseEdge;

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
          | 'gpt-5.1'
          | 'gpt-5.2'
          | 'gpt-5-mini'
          | 'gpt-5-nano'
          | 'claude-4.5-sonnet'
          | 'claude-4.5-haiku'
          | 'gemini-2.5-flash'
          | 'gemini-2.5-flash-lite'
          | 'gemini-3.0-flash';

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
       * What to say when swapping agents, only used when speak during execution
       */
      instruction?: AgentSwapNode.NodeInstructionPrompt | AgentSwapNode.NodeInstructionStaticText;

      /**
       * If true, keep the current voice when swapping agents. Defaults to false.
       */
      keep_current_voice?: boolean;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;

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

      else_edge?: McpNode.ElseEdge;

      finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

      global_node_setting?: McpNode.GlobalNodeSetting;

      /**
       * What to say when calling the function, only used when speak during execution
       */
      instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

      interruption_sensitivity?: number | null;

      /**
       * Optional name for display purposes
       */
      name?: string;

      /**
       * Response variables to add to dynamic variables, key is the variable name, value
       * is the path to the variable in the response
       */
      response_variables?: { [key: string]: string };

      responsiveness?: number | null;

      /**
       * If true, will speak during execution
       */
      speak_during_execution?: boolean;

      voice_speed?: number | null;
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

    export interface BridgeTransferNode {
      /**
       * Unique identifier for the node
       */
      id: string;

      /**
       * Type of the node - initiates a warm transfer by bridging the call
       */
      type: 'bridge_transfer';

      /**
       * Position for frontend display
       */
      display_position?: BridgeTransferNode.DisplayPosition;

      global_node_setting?: BridgeTransferNode.GlobalNodeSetting;

      /**
       * Optional name for display purposes
       */
      name?: string;
    }

    export namespace BridgeTransferNode {
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

    export interface CancelTransferNode {
      /**
       * Unique identifier for the node
       */
      id: string;

      /**
       * Type of the node - cancels the warm transfer and ends the transfer agent call
       */
      type: 'cancel_transfer';

      /**
       * Position for frontend display
       */
      display_position?: CancelTransferNode.DisplayPosition;

      global_node_setting?: CancelTransferNode.GlobalNodeSetting;

      /**
       * Optional name for display purposes
       */
      name?: string;
    }

    export namespace CancelTransferNode {
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

    /**
     * Display position for the begin tag in the frontend
     */
    export interface BeginTagDisplayPosition {
      x?: number;

      y?: number;
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
       * Describes what this tool does and when to call this tool.
       */
      description?: string;

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

      /**
       * Unique identifier for the tool
       */
      tool_id?: string;
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

    export interface CheckAvailabilityCalTool {
      /**
       * Cal.com Api key that have access to the cal.com event you want to check
       * availability for.
       */
      cal_api_key: string;

      /**
       * Cal.com event type id number for the cal.com event you want to check
       * availability for. Can be a number or a dynamic variable in the format
       * `{{variable_name}}` that will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
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
       * Can be a number or a dynamic variable in the format `{{variable_name}}` that
       * will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
       */
      timezone?: string;

      /**
       * Unique identifier for the tool
       */
      tool_id?: string;
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

  /**
   * The model choice for the conversation flow.
   */
  export interface ModelChoice {
    /**
     * The LLM model to use
     */
    model:
      | 'gpt-4.1'
      | 'gpt-4.1-mini'
      | 'gpt-4.1-nano'
      | 'gpt-5'
      | 'gpt-5.1'
      | 'gpt-5.2'
      | 'gpt-5-mini'
      | 'gpt-5-nano'
      | 'claude-4.5-sonnet'
      | 'claude-4.5-haiku'
      | 'gemini-2.5-flash'
      | 'gemini-2.5-flash-lite'
      | 'gemini-3.0-flash';

    /**
     * Type of model choice
     */
    type: 'cascading';

    /**
     * Whether to use high priority pool with more dedicated resource, default false
     */
    high_priority?: boolean;
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

    always_edge?: ConversationNode.AlwaysEdge;

    /**
     * Position for frontend display
     */
    display_position?: ConversationNode.DisplayPosition;

    edges?: Array<ConversationNode.Edge>;

    finetune_conversation_examples?: Array<ConversationNode.FinetuneConversationExample>;

    finetune_transition_examples?: Array<ConversationNode.FinetuneTransitionExample>;

    global_node_setting?: ConversationNode.GlobalNodeSetting;

    interruption_sensitivity?: number | null;

    /**
     * Knowledge base IDs for RAG (Retrieval-Augmented Generation).
     */
    knowledge_base_ids?: Array<string> | null;

    model_choice?: ConversationNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    responsiveness?: number | null;

    skip_response_edge?: ConversationNode.SkipResponseEdge;

    /**
     * The tool ids of the tools defined in main conversation flow or component that
     * can be used in this conversation node.
     */
    tool_ids?: Array<string> | null;

    /**
     * The tools owned by this conversation node. This includes other tool types like
     * transfer_call, agent_swap, etc.
     */
    tools?: Array<
      | ConversationNode.EndCallTool
      | ConversationNode.TransferCallTool
      | ConversationNode.CheckAvailabilityCalTool
      | ConversationNode.BookAppointmentCalTool
      | ConversationNode.AgentSwapTool
      | ConversationNode.PressDigitTool
      | ConversationNode.SendSMSTool
      | ConversationNode.CustomTool
      | ConversationNode.ExtractDynamicVariableTool
      | ConversationNode.BridgeTransferTool
      | ConversationNode.CancelTransferTool
      | ConversationNode.McpTool
    > | null;

    voice_speed?: number | null;
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

    export interface AlwaysEdge {
      /**
       * Unique identifier for the edge
       */
      id: string;

      transition_condition:
        | AlwaysEdge.PromptCondition
        | AlwaysEdge.EquationCondition
        | AlwaysEdge.UnionMember2;

      /**
       * ID of the destination node
       */
      destination_node_id?: string;
    }

    export namespace AlwaysEdge {
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
         * Must be "Always" for always edge
         */
        prompt?: 'Always';
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
         * Must be "Always" for always edge
         */
        prompt: 'Always';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

      /**
       * Describes what to say to user when ending the call. Only applicable when
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
       * If true, will speak during execution.
       */
      speak_during_execution?: boolean;
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
       * Describes what to say to user when transferring the call. Only applicable when
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
       * If true, the e.164 validation will be ignored for the from_number. This can be
       * useful when you want to dial to internal pseudo numbers. This only applies when
       * you are using custom telephony and does not apply when you are using Retell
       * Telephony. If omitted, the default value is false.
       */
      ignore_e164_validation?: boolean;

      /**
       * If true, will speak during execution.
       */
      speak_during_execution?: boolean;
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
         * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
         * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
         * call.
         */
        cold_transfer_mode?: 'sip_refer' | 'sip_invite';

        /**
         * If set to true, will show transferee (the user, not the AI agent) as caller when
         * transferring. Requires the telephony side to support caller id override. Retell
         * Twilio numbers support this option. This parameter takes effect only when
         * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
         * is not available. Retell Twilio numbers always use user's number as the caller
         * id when using `sip refer` cold transfer mode.
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
         * Whether to play an audio cue when bridging the call. Defaults to true.
         */
        enable_bridge_audio_cue?: boolean;

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
       * availability for. Can be a number or a dynamic variable in the format
       * `{{variable_name}}` that will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
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
       * Can be a number or a dynamic variable in the format `{{variable_name}}` that
       * will be resolved at runtime.
       */
      event_type_id: number | string;

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
       * Can also be a dynamic variable in the format `{{variable_name}}` that will be
       * resolved at runtime. If not specified, will check if user specified timezone in
       * call, and if not, will use the timezone of the Retell servers.
       */
      timezone?: string;
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

      /**
       * Type of execution message. "prompt" means the agent will use
       * execution_message_description as a prompt to generate the message. "static_text"
       * means the agent will speak the execution_message_description directly. Defaults
       * to "prompt".
       */
      execution_message_type?: 'prompt' | 'static_text';

      /**
       * If true, keep the current voice when swapping agents. Defaults to false.
       */
      keep_current_voice?: boolean;

      speak_during_execution?: boolean;

      /**
       * Webhook setting for the agent swap, defaults to only source.
       */
      webhook_setting?: 'both_agents' | 'only_destination_agent' | 'only_source_agent';
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
       * Describes what this tool does and when to call this tool.
       */
      description?: string;

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

    export interface BridgeTransferTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'bridge_transfer';

      /**
       * Describes what the tool does. This tool is only available to transfer agents
       * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
       * invoked, it bridges the original caller to the transfer target and ends the
       * transfer agent call.
       */
      description?: string;
    }

    export interface CancelTransferTool {
      /**
       * Name of the tool. Must be unique within all tools available to LLM at any given
       * time (general tools + state tools + state transitions). Must be consisted of
       * a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64
       * (no space allowed).
       */
      name: string;

      type: 'cancel_transfer';

      /**
       * Describes what the tool does. This tool is only available to transfer agents
       * (agents with isTransferAgent set to true) in agentic warm transfer mode. When
       * invoked, it cancels the transfer, returns the original caller to the main agent,
       * and ends the transfer agent call.
       */
      description?: string;
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
       * Type of execution message. "prompt" means the agent will use
       * execution_message_description as a prompt to generate the message. "static_text"
       * means the agent will speak the execution_message_description directly. Defaults
       * to "prompt".
       */
      execution_message_type?: 'prompt' | 'static_text';

      /**
       * The input schema of the MCP tool.
       */
      input_schema?: { [key: string]: string };

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
     * What to say when ending the call, only used when speak during execution
     */
    instruction?: EndNode.NodeInstructionPrompt | EndNode.NodeInstructionStaticText;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
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

    else_edge?: FunctionNode.ElseEdge;

    finetune_transition_examples?: Array<FunctionNode.FinetuneTransitionExample>;

    global_node_setting?: FunctionNode.GlobalNodeSetting;

    instruction?: FunctionNode.NodeInstructionPrompt | FunctionNode.NodeInstructionStaticText;

    interruption_sensitivity?: number | null;

    model_choice?: FunctionNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    responsiveness?: number | null;

    /**
     * Whether to speak during tool execution
     */
    speak_during_execution?: boolean;

    voice_speed?: number | null;
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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

    /**
     * What to say when transferring the call, only used when speak during execution
     */
    instruction?: TransferCallNode.NodeInstructionPrompt | TransferCallNode.NodeInstructionStaticText;

    model_choice?: TransferCallNode.ModelChoice;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;
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
       * The mode of the cold transfer. If set to `sip_refer`, will use SIP REFER to
       * transfer the call. If set to `sip_invite`, will use SIP INVITE to transfer the
       * call.
       */
      cold_transfer_mode?: 'sip_refer' | 'sip_invite';

      /**
       * If set to true, will show transferee (the user, not the AI agent) as caller when
       * transferring. Requires the telephony side to support caller id override. Retell
       * Twilio numbers support this option. This parameter takes effect only when
       * `cold_transfer_mode` is set to `sip_invite`. When using `sip_refer`, this option
       * is not available. Retell Twilio numbers always use user's number as the caller
       * id when using `sip refer` cold transfer mode.
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
       * Whether to play an audio cue when bridging the call. Defaults to true.
       */
      enable_bridge_audio_cue?: boolean;

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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

    else_edge?: ExtractDynamicVariablesNode.ElseEdge;

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
        | 'gpt-5.1'
        | 'gpt-5.2'
        | 'gpt-5-mini'
        | 'gpt-5-nano'
        | 'claude-4.5-sonnet'
        | 'claude-4.5-haiku'
        | 'gemini-2.5-flash'
        | 'gemini-2.5-flash-lite'
        | 'gemini-3.0-flash';

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
     * What to say when swapping agents, only used when speak during execution
     */
    instruction?: AgentSwapNode.NodeInstructionPrompt | AgentSwapNode.NodeInstructionStaticText;

    /**
     * If true, keep the current voice when swapping agents. Defaults to false.
     */
    keep_current_voice?: boolean;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;

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

    else_edge?: McpNode.ElseEdge;

    finetune_transition_examples?: Array<McpNode.FinetuneTransitionExample>;

    global_node_setting?: McpNode.GlobalNodeSetting;

    /**
     * What to say when calling the function, only used when speak during execution
     */
    instruction?: McpNode.NodeInstructionPrompt | McpNode.NodeInstructionStaticText;

    interruption_sensitivity?: number | null;

    /**
     * Optional name for display purposes
     */
    name?: string;

    /**
     * Response variables to add to dynamic variables, key is the variable name, value
     * is the path to the variable in the response
     */
    response_variables?: { [key: string]: string };

    responsiveness?: number | null;

    /**
     * If true, will speak during execution
     */
    speak_during_execution?: boolean;

    voice_speed?: number | null;
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

  export interface BridgeTransferNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node - initiates a warm transfer by bridging the call
     */
    type: 'bridge_transfer';

    /**
     * Position for frontend display
     */
    display_position?: BridgeTransferNode.DisplayPosition;

    global_node_setting?: BridgeTransferNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace BridgeTransferNode {
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

  export interface CancelTransferNode {
    /**
     * Unique identifier for the node
     */
    id: string;

    /**
     * Type of the node - cancels the warm transfer and ends the transfer agent call
     */
    type: 'cancel_transfer';

    /**
     * Position for frontend display
     */
    display_position?: CancelTransferNode.DisplayPosition;

    global_node_setting?: CancelTransferNode.GlobalNodeSetting;

    /**
     * Optional name for display purposes
     */
    name?: string;
  }

  export namespace CancelTransferNode {
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
     * Describes what this tool does and when to call this tool.
     */
    description?: string;

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

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
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

  export interface CheckAvailabilityCalTool {
    /**
     * Cal.com Api key that have access to the cal.com event you want to check
     * availability for.
     */
    cal_api_key: string;

    /**
     * Cal.com event type id number for the cal.com event you want to check
     * availability for. Can be a number or a dynamic variable in the format
     * `{{variable_name}}` that will be resolved at runtime.
     */
    event_type_id: number | string;

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
     * Can also be a dynamic variable in the format `{{variable_name}}` that will be
     * resolved at runtime. If not specified, will check if user specified timezone in
     * call, and if not, will use the timezone of the Retell servers.
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
     * Can be a number or a dynamic variable in the format `{{variable_name}}` that
     * will be resolved at runtime.
     */
    event_type_id: number | string;

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
     * Can also be a dynamic variable in the format `{{variable_name}}` that will be
     * resolved at runtime. If not specified, will check if user specified timezone in
     * call, and if not, will use the timezone of the Retell servers.
     */
    timezone?: string;

    /**
     * Unique identifier for the tool
     */
    tool_id?: string;
  }
}

export interface ConversationFlowListParams {
  /**
   * Limit the number of conversation flows returned. Default 1000, Max 1000. To
   * retrieve more than 1000, use pagination_key to continue fetching the next page.
   */
  limit?: number;

  /**
   * The pagination key to continue fetching the next page of conversation flows.
   * Pagination key is represented by a conversation flow id here, and it's exclusive
   * (not included in the fetched conversation flows). The last conversation flow id
   * from the list conversation flows is usually used as pagination key here. If not
   * set, will start from the beginning.
   */
  pagination_key?: string;

  /**
   * Specifies the version of the conversation flow associated with the
   * pagination_key. When paginating, both the pagination_key and its version must be
   * provided to ensure consistent ordering and to fetch the next page correctly.
   */
  pagination_key_version?: number;
}

export declare namespace ConversationFlow {
  export {
    type ConversationFlowResponse as ConversationFlowResponse,
    type ConversationFlowListResponse as ConversationFlowListResponse,
    type ConversationFlowCreateParams as ConversationFlowCreateParams,
    type ConversationFlowRetrieveParams as ConversationFlowRetrieveParams,
    type ConversationFlowUpdateParams as ConversationFlowUpdateParams,
    type ConversationFlowListParams as ConversationFlowListParams,
  };
}
