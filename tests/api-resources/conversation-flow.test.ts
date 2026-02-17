// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource conversationFlow', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.conversationFlow.create({
      model_choice: { model: 'gpt-4.1', type: 'cascading' },
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

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.conversationFlow.create({
      model_choice: {
        model: 'gpt-4.1',
        type: 'cascading',
        high_priority: true,
      },
      nodes: [
        {
          id: 'start',
          instruction: { text: 'Greet the customer and ask how you can help them.', type: 'prompt' },
          type: 'conversation',
          always_edge: {
            id: 'id',
            transition_condition: { prompt: 'prompt', type: 'prompt' },
            destination_node_id: 'destination_node_id',
          },
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
          knowledge_base_ids: ['kb_001', 'kb_002'],
          model_choice: {
            model: 'gpt-4.1',
            type: 'cascading',
            high_priority: true,
          },
          name: 'name',
          responsiveness: 0,
          skip_response_edge: {
            id: 'id',
            transition_condition: { prompt: 'Skip response', type: 'prompt' },
            destination_node_id: 'destination_node_id',
          },
          tool_ids: ['string'],
          tools: [
            {
              name: 'name',
              type: 'end_call',
              description: 'description',
              execution_message_description: 'execution_message_description',
              execution_message_type: 'prompt',
              speak_during_execution: true,
            },
          ],
          voice_speed: 0.5,
        },
      ],
      start_speaker: 'agent',
      begin_after_user_silence_ms: 2000,
      begin_tag_display_position: { x: 100, y: 200 },
      components: [
        {
          name: 'Customer Information Collector',
          nodes: [
            {
              id: 'collect_info',
              instruction: {
                text: 'Ask the customer for their name and contact information.',
                type: 'prompt',
              },
              type: 'conversation',
              always_edge: {
                id: 'id',
                transition_condition: { prompt: 'prompt', type: 'prompt' },
                destination_node_id: 'destination_node_id',
              },
              display_position: { x: 0, y: 0 },
              edges: [
                {
                  id: 'id',
                  transition_condition: { prompt: 'prompt', type: 'prompt' },
                  destination_node_id: 'destination_node_id',
                },
              ],
              finetune_conversation_examples: [
                { id: 'id', transcript: [{ content: 'content', role: 'agent' }] },
              ],
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
              responsiveness: 0,
              skip_response_edge: {
                id: 'id',
                transition_condition: { prompt: 'prompt', type: 'prompt' },
                destination_node_id: 'destination_node_id',
              },
              tool_ids: ['string'],
              tools: [
                {
                  name: 'name',
                  type: 'end_call',
                  description: 'description',
                  execution_message_description: 'execution_message_description',
                  execution_message_type: 'prompt',
                  speak_during_execution: true,
                },
              ],
              voice_speed: 0.5,
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
              execution_message_description: 'execution_message_description',
              execution_message_type: 'prompt',
              headers: { Authorization: 'Bearer 1234567890' },
              method: 'GET',
              parameters: {
                properties: { foo: 'bar' },
                type: 'object',
                required: ['string'],
              },
              query_params: { page: '1', sort: 'asc' },
              response_variables: { user_name: 'data.user.name' },
              speak_after_execution: true,
              speak_during_execution: true,
              timeout_ms: 0,
              tool_id: 'tool_001',
            },
          ],
        },
      ],
      default_dynamic_variables: { company_name: 'Retell Inc', support_hours: '9 AM - 5 PM' },
      global_prompt: 'You are a helpful customer service agent.',
      is_transfer_llm: false,
      kb_config: { filter_score: 0.6, top_k: 3 },
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
          args_at_root: true,
          description: 'Get customer information from database',
          execution_message_description: 'execution_message_description',
          execution_message_type: 'prompt',
          headers: { Authorization: 'Bearer 1234567890' },
          method: 'GET',
          parameters: {
            properties: { foo: 'bar' },
            type: 'object',
            required: ['string'],
          },
          query_params: { page: '1', sort: 'asc' },
          response_variables: { user_name: 'data.user.name' },
          speak_after_execution: true,
          speak_during_execution: true,
          timeout_ms: 0,
          tool_id: 'tool_001',
        },
      ],
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.conversationFlow.retrieve('conversation_flow_id');
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
      client.conversationFlow.retrieve('conversation_flow_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlow.retrieve(
        'conversation_flow_id',
        { version: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.conversationFlow.update('conversation_flow_id', {});
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
    const responsePromise = client.conversationFlow.list();
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
    await expect(client.conversationFlow.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.conversationFlow.list(
        {
          limit: 1000,
          pagination_key: 'pagination_key',
          pagination_key_version: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.conversationFlow.delete('conversation_flow_id');
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
      client.conversationFlow.delete('conversation_flow_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
