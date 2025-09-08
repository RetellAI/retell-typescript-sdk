// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chat.create({ agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.chat.create({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      agent_version: 1,
      metadata: {},
      retell_llm_dynamic_variables: { customer_name: 'bar' },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.chat.retrieve('16b980523634a6dc504898cda492e939');
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
      client.chat.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.chat.list();
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
    await expect(client.chat.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  test('createChatCompletion: only required params', async () => {
    const responsePromise = client.chat.createChatCompletion({
      chat_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      content: 'hi how are you doing?',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createChatCompletion: required and optional params', async () => {
    const response = await client.chat.createChatCompletion({
      chat_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      content: 'hi how are you doing?',
    });
  });

  test('createSMSChat: only required params', async () => {
    const responsePromise = client.chat.createSMSChat({
      from_number: '+12137771234',
      to_number: '+14155551234',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createSMSChat: required and optional params', async () => {
    const response = await client.chat.createSMSChat({
      from_number: '+12137771234',
      to_number: '+14155551234',
      metadata: {},
      override_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      override_agent_version: 1,
      retell_llm_dynamic_variables: { customer_name: 'bar' },
    });
  });

  test('end', async () => {
    const responsePromise = client.chat.end('16b980523634a6dc504898cda492e939');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('end: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chat.end('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
