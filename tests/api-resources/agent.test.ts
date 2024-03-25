// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import RetellSdk, { toFile } from 'retell-sdk';
import { Response } from 'node-fetch';

const retellSdk = new RetellSdk({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource agent', () => {
  test('create: only required params', async () => {
    const responsePromise = retellSdk.agent.create({ llm_websocket_url: 'wss://your-websocket-endpoint', voice_id: '11labs-Adrian' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await retellSdk.agent.create({ llm_websocket_url: 'wss://your-websocket-endpoint', voice_id: '11labs-Adrian', agent_name: 'Jarvis', ambient_sound: 'coffee-shop', boosted_keywords: ['retell', 'kroger'], enable_backchannel: true, format_text: true, language: 'en-US', optOutSensitiveDataStorage: true, responsiveness: 1, voice_speed: 1, voice_temperature: 1, webhook_url: 'https://webhook-url-here' });
  });

  test('retrieve', async () => {
    const responsePromise = retellSdk.agent.retrieve('16b980523634a6dc504898cda492e939');
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
    await expect(retellSdk.agent.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(RetellSdk.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = retellSdk.agent.update('16b980523634a6dc504898cda492e939', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = retellSdk.agent.list();
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
    await expect(retellSdk.agent.list({ path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(RetellSdk.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = retellSdk.agent.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
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
    await expect(retellSdk.agent.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(RetellSdk.NotFoundError);
  });
});
