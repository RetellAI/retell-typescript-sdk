import { SpeakeasyBase } from "../../internal/utils";
import { AgentPromptParams } from "./agentpromptparams";
import { CallPhoneNumber } from "./callphonenumber";
/**
 * Status of call.
 */
export declare enum CallStatus {
    Ongoing = "ongoing",
    Ended = "ended",
    Error = "error"
}
/**
 * Web call or phone call.
 */
export declare enum CallType {
    InboundPhoneCall = "inbound_phone_call",
    OutboundPhoneCall = "outbound_phone_call",
    WebCall = "web_call"
}
export declare class CallDetail extends SpeakeasyBase {
    /**
     * Corresponding agent id of this call.
     */
    agentId: string;
    /**
     * Supply values to your agent prompt parameters. If the given key value cannot match any param in prompt, it would have have any effect. Learn more about [Agent Prompt Parameters](/features/agent-prompt-parameter).
     */
    agentPromptParams?: AgentPromptParams[];
    /**
     * Unique id of the call.
     */
    callId: string;
    /**
     * Status of call.
     */
    callStatus: CallStatus;
    /**
     * Web call or phone call.
     */
    callType: CallType;
    /**
     * End timestamp (milliseconds since epoch) of the call. Available after call ends.
     */
    endTimestamp?: number;
    phoneNumber?: CallPhoneNumber;
    /**
     * Recording of the call. Available after call ends.
     */
    recordingUrl?: string;
    /**
     * Begin timestamp (milliseconds since epoch) of the call.
     */
    startTimestamp: number;
    /**
     * Transcription of the call. Available after call ends.
     */
    transcript?: string;
}
