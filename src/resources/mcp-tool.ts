// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class McpTool extends APIResource {
  /**
   * Get MCP tools for a specific agent
   */
  getMcpTools(
    agentID: string,
    query: McpToolGetMcpToolsParams,
    options?: RequestOptions,
  ): APIPromise<McpToolGetMcpToolsResponse> {
    return this._client.get(path`/get-mcp-tools/${agentID}`, { query, ...options });
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
   * The ID of the component if the MCP server is configured under a component.
   */
  component_id?: string;

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
