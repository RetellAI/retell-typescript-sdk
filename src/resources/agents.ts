// File generated from our OpenAPI spec by Stainless.

import * as Core from 'toddlzt/core';
import { APIResource } from 'toddlzt/resource';
import * as AgentsAPI from 'toddlzt/resources/agents';

export class Agents extends APIResource {
  /**
   * Create a new agent
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<AgentCreateResponse> {
    return this._client.post('/create-agent', { body, ...options });
  }

  /**
   * Retrieve details of a specific agent
   */
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentRetrieveResponse> {
    return this._client.get(`/get-agent/${agentId}`, options);
  }

  /**
   * Update an existing agent
   */
  update(
    agentId: string,
    body: AgentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentUpdateResponse> {
    return this._client.patch(`/update-agent/${agentId}`, { body, ...options });
  }

  /**
   * List all agents
   */
  list(options?: Core.RequestOptions): Core.APIPromise<AgentListResponse> {
    return this._client.get('/list-agents', options);
  }

  /**
   * Delete an existing agent
   */
  delete(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/delete-agent/${agentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface AgentCreateResponse {
  /**
   * Unique id of agent.
   */
  agent_id?: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in [Voices](/features/voices) and Dashboard.
   */
  voice_id?: string;
}

export interface AgentRetrieveResponse {
  /**
   * Unique id of agent.
   */
  agent_id?: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in [Voices](/features/voices) and Dashboard.
   */
  voice_id?: string;
}

export interface AgentUpdateResponse {
  /**
   * Unique id of agent.
   */
  agent_id?: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

  /**
   * Last modification timestamp (milliseconds since epoch). Either the time of last
   * update or creation if no updates available.
   */
  last_modification_timestamp?: number;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in [Voices](/features/voices) and Dashboard.
   */
  voice_id?: string;
}

export type AgentListResponse = Array<AgentListResponse.AgentListResponseItem>;

export namespace AgentListResponse {
  export interface AgentListResponseItem {
    /**
     * Unique id of agent.
     */
    agent_id?: string;

    /**
     * The name of the agent. Only used for your own reference.
     */
    agent_name?: string;

    /**
     * Last modification timestamp (milliseconds since epoch). Either the time of last
     * update or creation if no updates available.
     */
    last_modification_timestamp?: number;

    /**
     * The URL we will establish LLM websocket for getting response, usually your
     * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
     * request format (sent from us) and response format (send to us).
     */
    llm_websocket_url?: string;

    /**
     * Unique voice id used for the agent. Find list of available voices and their
     * preview in [Voices](/features/voices) and Dashboard.
     */
    voice_id?: string;
  }
}

export interface AgentCreateParams {
  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url: string;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in [Voices](/features/voices) and Dashboard.
   */
  voice_id: string;

  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;
}

export interface AgentUpdateParams {
  /**
   * The name of the agent. Only used for your own reference.
   */
  agent_name?: string;

  /**
   * The URL we will establish LLM websocket for getting response, usually your
   * server. Check out [LLM WebSocket](/api-references/llm-websocket) for more about
   * request format (sent from us) and response format (send to us).
   */
  llm_websocket_url?: string;

  /**
   * Unique voice id used for the agent. Find list of available voices and their
   * preview in [Voices](/features/voices) and Dashboard.
   */
  voice_id?: string;
}

export namespace Agents {
  export import AgentCreateResponse = AgentsAPI.AgentCreateResponse;
  export import AgentRetrieveResponse = AgentsAPI.AgentRetrieveResponse;
  export import AgentUpdateResponse = AgentsAPI.AgentUpdateResponse;
  export import AgentListResponse = AgentsAPI.AgentListResponse;
  export import AgentCreateParams = AgentsAPI.AgentCreateParams;
  export import AgentUpdateParams = AgentsAPI.AgentUpdateParams;
}
