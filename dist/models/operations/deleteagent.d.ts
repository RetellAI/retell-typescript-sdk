import { SpeakeasyBase } from "../../internal/utils";
import { AxiosResponse } from "axios";
export declare class DeleteAgentRequest extends SpeakeasyBase {
    /**
     * Unique id of the agent to be deleted.
     */
    agentId: string;
}
export declare class DeleteAgentResponse extends SpeakeasyBase {
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
