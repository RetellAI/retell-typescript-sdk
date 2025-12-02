// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class McpTool extends APIResource {
  /**
   * Get MCP tools for a specific agent
   */
  getMcpTools(
    agentId: string,
    query: McpToolGetMcpToolsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<McpToolGetMcpToolsResponse> {
    return this._client.get(`/get-mcp-tools/${agentId}`, { query, ...options });
  }
}

export interface McpToolDefinition {
  /**
   * Description of what the MCP tool does.
   */
  description: string;

  /**
   * JSON schema defining the input parameters for the tool.
   */
  inputSchema: { [key: string]: unknown };

  /**
   * Name of the MCP tool.
   */
  name: string;
}

export type McpToolGetMcpToolsResponse = Array<McpToolDefinition>;

export interface McpToolGetMcpToolsParams {
  /**
   * The ID of the MCP server to get tools from.
   */
  mcp_id: string;

  /**
   * Optional version of the agent to use for this request. Default to latest
   * version.
   */
  version?: number;
}

export declare namespace McpTool {
  export {
    type McpToolDefinition as McpToolDefinition,
    type McpToolGetMcpToolsResponse as McpToolGetMcpToolsResponse,
    type McpToolGetMcpToolsParams as McpToolGetMcpToolsParams,
  };
}
