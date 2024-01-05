import { SpeakeasyBase } from "../../internal/utils";
/**
 * Phone number associated with the call. Only populated when call_type is `inbound_phone_call` or `outbound_phone_call`.
 */
export declare class CallPhoneNumber extends SpeakeasyBase {
    /**
     * Caller phone number in E.164 format.
     */
    from: string;
    /**
     * Callee phone number in E.164 format.
     */
    to: string;
}
