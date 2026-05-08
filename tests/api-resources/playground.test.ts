// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource playground', () => {
  // Mock server tests are disabled
  test.skip('completion: only required params', async () => {
    const responsePromise = client.playground.completion('agent_id', {
      messages: [
        { content: "Hi, I'd like to check my appointment.", role: 'user' },
        { content: 'Sure! Could you please provide your name?', role: 'agent' },
        { content: 'My name is John Smith.', role: 'user' },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('completion: required and optional params', async () => {
    const response = await client.playground.completion('agent_id', {
      messages: [
        {
          content: "Hi, I'd like to check my appointment.",
          role: 'user',
          created_timestamp: 1703302428855,
          message_id: 'Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6',
        },
        {
          content: 'Sure! Could you please provide your name?',
          role: 'agent',
          created_timestamp: 1703302428855,
          message_id: 'Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6',
        },
        {
          content: 'My name is John Smith.',
          role: 'user',
          created_timestamp: 1703302428855,
          message_id: 'Jabr9TXYYJHfvl6Syypi88rdAHYHmcq6',
        },
      ],
      version: 1,
      component_id: 'component_xyz789',
      current_node_id: 'start-node-abc123',
      current_state: 'greeting',
      dynamic_variables: { customer_name: 'John Smith', customer_phone: '444-223-3564' },
      tool_mocks: [
        {
          input_match_rule: { type: 'any' },
          output: 'output',
          tool_name: 'tool_name',
          result: true,
        },
      ],
    });
  });
});
