import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
export declare class GetPhoneNumberRequest extends SpeakeasyBase {
    /**
     * Phone number in E.164 format to retreive more information.
     */
    phoneNumber: string;
}
export declare class GetPhoneNumberResponse extends SpeakeasyBase {
    /**
     * HTTP response content type for this operation
     */
    contentType: string;
    /**
     * Successfully retrieved a phone number.
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
