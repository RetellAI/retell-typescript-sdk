import { SpeakeasyBase } from "../../internal/utils";
export declare class AgentPromptParams extends SpeakeasyBase {
    /**
     * The name of the parameter enclosed as `${YOUR_PARAM_NAME}` in agent prompt.
     */
    name: string;
    /**
     * The value of parameter to substitute in agent prompt.
     */
    value: string;
}
