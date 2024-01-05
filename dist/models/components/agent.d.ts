import { SpeakeasyBase } from "../../internal/utils";
export declare class Agent extends SpeakeasyBase {
    /**
     * Unique id of agent.
     */
    agentId: string;
    /**
     * The name of the agent. Only used for your own reference.
     */
    agentName?: string;
    /**
     * Pre-defined message for agent to say in the begining of call. Only used when `enable_begin_message` is true. When empty, agent would wait for user to talk first.
     */
    beginMessage?: string;
    /**
     * Whether the agent begins the call with a pre-defined message. When this is false, the agent will still start the call, but with a dynamic message. If you wish for user to be the first to talk, set this to true and set `begin_message` as empty string.
     */
    enableBeginMessage: boolean;
    /**
     * Whether the agent can end a call. If false, the agent would never end a call.
     */
    enableEndCall: boolean;
    /**
     * Whether the agent attempts to end the call with a pre-defined message. When this is false, the agent might still be the last one speaking in the call, but the massage can be dynamic.
     */
    enableEndMessage: boolean;
    /**
     * Pre-defined message for agent to say when agent ends the call. Only used when `enable_end_call` and `enable_end_message` is true. If you wish for agent to hang up without saying anything, set this to empty string.
     */
    endMessage?: string;
    /**
     * Last modification timestamp (milliseconds since epoch). Either the time of last update or creation if no updates available.
     */
    lastModificationTimestamp: number;
    /**
     * The prompt agent will follow. Check out [Prompt Best Practices](/features/agent-prompt-guide). Can use `${YOUR_PARAM_NAME}` to represent dynamic data that would get injected at each call. Learn more about [Agent Prompt Parameters](/features/agent-prompt-parameter).
     */
    prompt: string;
    /**
     * Unique voice id used for the agent. Find list of available voices and their characteristics in [Voices](/features/voices).
     */
    voiceId: string;
}
