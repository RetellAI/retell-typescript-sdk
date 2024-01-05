import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
export declare class GetAgentRequest extends SpeakeasyBase {
    /**
     * Unique id of the agent to be retrieved.
     */
    agentId: string;
}
export declare class GetAgentResponse extends SpeakeasyBase {
    /**
     * Successfully retrieved an agent.
     */
    agent?: components.Agent;
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
