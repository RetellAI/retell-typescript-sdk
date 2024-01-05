import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
export declare class UpdatePhoneAgentRequestBody extends SpeakeasyBase {
    /**
     * Unique agent id to associate with this phone number.
     */
    agentId: string;
}
export declare class UpdatePhoneAgentRequest extends SpeakeasyBase {
    requestBody: UpdatePhoneAgentRequestBody;
    /**
     * Phone number in E.164 format that require agent update.
     */
    phoneNumber: string;
}
export declare class UpdatePhoneAgentResponse extends SpeakeasyBase {
    /**
     * HTTP response content type for this operation
     */
    contentType: string;
    /**
     * Successfully updated the phone number's agent.
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
