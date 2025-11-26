// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chatAgent', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chatAgent.create({
      response_engine: { llm_id: 'llm_234sdertfsdsfsdf', type: 'retell-llm' },
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
    const response = await client.chatAgent.create({
      response_engine: { llm_id: 'llm_234sdertfsdsfsdf', type: 'retell-llm', version: 0 },
      agent_name: 'Jarvis',
      auto_close_message: 'Thank you for chatting. The conversation has ended.',
      data_storage_setting: 'everything',
      end_chat_after_silence_ms: 3600000,
      language: 'en-US',
      opt_in_signed_url: true,
      pii_config: { categories: ['person_name'], mode: 'post_call' },
      post_chat_analysis_data: [
        {
          description: 'The name of the customer.',
          name: 'customer_name',
          type: 'string',
          examples: ['John Doe', 'Jane Smith'],
        },
      ],
      post_chat_analysis_model: 'gpt-4.1-mini',
      webhook_timeout_ms: 10000,
      webhook_url: 'https://webhook-url-here',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.chatAgent.retrieve('16b980523634a6dc504898cda492e939');
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
      client.chatAgent.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chatAgent.retrieve(
        '16b980523634a6dc504898cda492e939',
        { version: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.chatAgent.update('16b980523634a6dc504898cda492e939', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.chatAgent.list();
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
    await expect(client.chatAgent.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chatAgent.list(
        { limit: 50, pagination_key: '16b980523634a6dc504898cda492e939', pagination_key_version: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
