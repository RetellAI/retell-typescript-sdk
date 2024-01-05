import { SpeakeasyBase } from "../../internal/utils";
import { AxiosResponse } from "axios";
export declare class DeletePhoneNumberRequest extends SpeakeasyBase {
    /**
     * Phone number to delete in E.164 format.
     */
    phoneNumber: string;
}
export declare class DeletePhoneNumberResponse extends SpeakeasyBase {
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
}
