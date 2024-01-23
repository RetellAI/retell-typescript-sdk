import * as components from "../../models/components";

export type CreateWebCallRequestBody = {
  /**
   * Unique agent id to associate with this phone number. Can be updated.
   */
  agentId: string;
  /**
   * Supply values to your agent prompt parameters. If the given key value cannot match any param in prompt, it would have have any effect.
   */
  agentPromptParams?: Array<components.AgentPromptParams> | undefined;
  /**
   * Sample rate for the call.
   */
  sampleRate?: number | undefined;
};
