import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
/**
 * Phone number associated with the call.
 */
export declare class PhoneNumber extends SpeakeasyBase {
    /**
     * Phone number you purchased in E.164 format. It would have an agent id associated with it.
     */
    from: any;
    /**
     * Callee phone number in E.164 format.
     */
    to: string;
}
export declare class CreatePhoneCallRequestBody extends SpeakeasyBase {
    /**
     * Supply values to your agent prompt parameters. If the given key value cannot match any param in prompt, it would have have any effect. Learn more about [Agent Prompt Parameters](/features/agent-prompt-parameter).
     */
    agentPromptParams?: components.AgentPromptParams[];
    phoneNumber: PhoneNumber;
}
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
export declare enum CreatePhoneCallCallType {
    InboundPhoneCall = "inbound_phone_call",
    OutboundPhoneCall = "outbound_phone_call",
    WebCall = "web_call"
}
/**
 * Successfully retrieved an agent.
 */
export declare class CreatePhoneCallResponseBody extends SpeakeasyBase {
    /**
     * Corresponding agent id of this call.
     */
    agentId: string;
    /**
     * Supply values to your agent prompt parameters. If the given key value cannot match any param in prompt, it would have have any effect. Learn more about [Agent Prompt Parameters](/features/agent-prompt-parameter).
     */
    agentPromptParams?: components.AgentPromptParams[];
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
    callType: CreatePhoneCallCallType;
    phoneNumber: components.CallPhoneNumber;
    /**
     * Begin timestamp (milliseconds since epoch) of the call.
     */
    startTimestamp: number;
}
export declare class CreatePhoneCallResponse extends SpeakeasyBase {
    /**
     * HTTP response content type for this operation
     */
    contentType: string;
    /**
     * HTTP response status code for this operation
     */
    statusCode: number;
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse: AxiosResponse;
    /**
     * Successfully retrieved an agent.
     */
    object?: CreatePhoneCallResponseBody;
}
