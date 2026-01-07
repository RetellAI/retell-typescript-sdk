// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource conversationFlowComponent', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.conversationFlowComponent.create({
      name: 'Customer Information Collector',
      nodes: [
        {
          id: 'collect_info',
          instruction: { text: 'Ask the customer for their name and contact information.', type: 'prompt' },
          type: 'conversation',
        },
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

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.conversationFlowComponent.create({
      name: 'Customer Information Collector',
      nodes: [
        {
          id: 'collect_info',
          instruction: { text: 'Ask the customer for their name and contact information.', type: 'prompt' },
          type: 'conversation',
          display_position: { x: 0, y: 0 },
          edges: [
            {
              id: 'id',
              transition_condition: { prompt: 'prompt', type: 'prompt' },
              destination_node_id: 'destination_node_id',
            },
          ],
          finetune_conversation_examples: [{ id: 'id', transcript: [{ content: 'content', role: 'agent' }] }],
          finetune_transition_examples: [
            {
              id: 'id',
              transcript: [{ content: 'content', role: 'agent' }],
              destination_node_id: 'destination_node_id',
            },
          ],
          global_node_setting: {
            condition: 'condition',
            negative_finetune_examples: [{ transcript: [{ content: 'content', role: 'agent' }] }],
            positive_finetune_examples: [{ transcript: [{ content: 'content', role: 'agent' }] }],
          },
          interruption_sensitivity: 0,
          knowledge_base_ids: ['kb_001', 'kb_002'],
          model_choice: {
            model: 'gpt-4.1',
            type: 'cascading',
            high_priority: true,
          },
          name: 'name',
          skip_response_edge: {
            id: 'id',
            transition_condition: { prompt: 'prompt', type: 'prompt' },
            destination_node_id: 'destination_node_id',
          },
        },
      ],
      begin_tag_display_position: { x: 100, y: 200 },
      mcps: [
        {
          name: 'name',
          url: 'url',
          headers: { Authorization: 'Bearer 1234567890' },
          query_params: { index: '1', key: 'value' },
          timeout_ms: 0,
        },
      ],
      start_node_id: 'collect_info',
      tools: [
        {
          name: 'get_customer_info',
          type: 'custom',
          url: 'https://api.example.com/customer',
          args_at_root: true,
          description: 'Get customer information from database',
          headers: { foo: 'string' },
          method: 'GET',
          parameters: {
            properties: { foo: 'bar' },
            type: 'object',
            required: ['string'],
          },
          query_params: { foo: 'string' },
          response_variables: { foo: 'string' },
          timeout_ms: 1000,
          tool_id: 'tool_001',
        },
      ],
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.conversationFlowComponent.retrieve('conversation_flow_component_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlowComponent.retrieve('conversation_flow_component_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.conversationFlowComponent.update('conversation_flow_component_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.conversationFlowComponent.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.conversationFlowComponent.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.conversationFlowComponent.delete('conversation_flow_component_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlowComponent.delete('conversation_flow_component_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
