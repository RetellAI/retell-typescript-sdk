import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
export declare class UpdateAgentRequest extends SpeakeasyBase {
    agentNoDefaultNoRequired: components.AgentNoDefaultNoRequired;
    /**
     * Unique id of the agent to be updated.
     */
    agentId: string;
}
export declare class UpdateAgentResponse extends SpeakeasyBase {
    /**
     * Successfully updated an agent.
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
