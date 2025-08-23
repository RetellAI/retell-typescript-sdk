// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource conversationFlow', () => {
  test('create: only required params', async () => {
    const responsePromise = client.conversationFlow.create({
      model_choice: { model: 'gpt-5', type: 'cascading' },
      nodes: [
        {
          id: 'start',
          instruction: { text: 'Greet the customer and ask how you can help them.', type: 'prompt' },
          type: 'conversation',
        },
      ],
      start_speaker: 'agent',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.conversationFlow.create({
      model_choice: { model: 'gpt-5', type: 'cascading', high_priority: true },
      nodes: [
        {
          id: 'start',
          instruction: { text: 'Greet the customer and ask how you can help them.', type: 'prompt' },
          type: 'conversation',
          display_position: { x: 0, y: 0 },
          edges: [
            {
              id: 'edge_1',
              transition_condition: { prompt: 'Customer wants to book appointment', type: 'prompt' },
              destination_node_id: 'book_appointment',
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
          model_choice: { model: 'gpt-5', type: 'cascading', high_priority: true },
          name: 'name',
          skip_response_edge: {
            id: 'id',
            transition_condition: { prompt: 'Skip response', type: 'prompt' },
            destination_node_id: 'destination_node_id',
          },
        },
      ],
      start_speaker: 'agent',
      begin_tag_display_position: { x: 100, y: 200 },
      default_dynamic_variables: { company_name: 'Retell Inc', support_hours: '9 AM - 5 PM' },
      global_prompt: 'You are a helpful customer service agent.',
      knowledge_base_ids: ['kb_001', 'kb_002'],
      mcps: [
        {
          name: 'name',
          url: 'url',
          headers: { Authorization: 'Bearer 1234567890' },
          query_params: { index: '1', key: 'value' },
          timeout_ms: 0,
        },
      ],
      model_temperature: 0.7,
      start_node_id: 'start',
      tool_call_strict_mode: true,
      tools: [
        {
          name: 'get_customer_info',
          type: 'custom',
          url: 'https://api.example.com/customer',
          description: 'Get customer information from database',
          headers: { foo: 'string' },
          method: 'GET',
          parameters: { properties: { foo: 'bar' }, type: 'object', required: ['string'] },
          query_params: { foo: 'string' },
          response_variables: { foo: 'string' },
          timeout_ms: 1000,
          tool_id: 'tool_001',
        },
      ],
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.conversationFlow.retrieve('conversation_flow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlow.retrieve('conversation_flow_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlow.retrieve(
        'conversation_flow_id',
        { version: 'version' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.conversationFlow.update('conversation_flow_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.conversationFlow.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.conversationFlow.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlow.list(
        { limit: 1000, pagination_key: 'pagination_key', pagination_key_version: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.conversationFlow.delete('conversation_flow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlow.delete('conversation_flow_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
