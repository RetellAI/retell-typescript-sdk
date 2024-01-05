import { SpeakeasyBase } from "../../internal/utils";
export declare class PhoneNumber extends SpeakeasyBase {
    /**
     * Unique agent id to associate with this phone number. Can be updated with [Update Phone Agent](/api/update-phone-agent).
     */
    agentId: string;
    /**
     * The area code of the number. This is a 3 digit integer.
     */
    areaCode: number;
    /**
     * Last modification timestamp (milliseconds since epoch). Either the time of last update or creation if no updates available.
     */
    lastModificationTimestamp: number;
    /**
     * Unique phone number you purchased in E.164 format. This number is set up to handle inbound phone calls, and can be used for outbound phone calls with [Create Phone Call](/api/create-phone-call).
     */
    phoneNumber: string;
    /**
     * Unique phone number you purchased in pretty human readable format. Example: (415) 909-5857.
     */
    phoneNumberPretty: string;
}
