// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mcpTool', () => {
  // Prism tests are disabled
  test.skip('getMcpTools: only required params', async () => {
    const responsePromise = client.mcpTool.getMcpTools('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', {
      mcp_id: 'mcp-server-1',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getMcpTools: required and optional params', async () => {
    const response = await client.mcpTool.getMcpTools('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', {
      mcp_id: 'mcp-server-1',
      component_id: 'component-123',
      version: 1,
    });
  });
});
