import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
export declare class GetCallRequest extends SpeakeasyBase {
    /**
     * The call id to retrieve call history for.
     */
    callId: string;
}
export declare class GetCallResponse extends SpeakeasyBase {
    /**
     * Successfully retrieved an agent.
     */
    callDetail?: components.CallDetail;
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
