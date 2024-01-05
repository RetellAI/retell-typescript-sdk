import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
export declare class CreatePhoneNumberRequestBody extends SpeakeasyBase {
    /**
     * Unique agent id to associate with this phone number. Can be updated with [Update Phone Agent](/api/update-phone-agent).
     */
    agentId: string;
    /**
     * The desired area code of the number. Must be valid US area code, which is a 3 digit integer.
     */
    areaCode?: number;
}
export declare class CreatePhoneNumberResponse extends SpeakeasyBase {
    /**
     * HTTP response content type for this operation
     */
    contentType: string;
    /**
     * Successfully created a new phone number.
     */
    phoneNumber?: components.PhoneNumber;
    /**
     * HTTP response status code for this operation
     */
    statusCode: number;
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse: AxiosResponse;
}
