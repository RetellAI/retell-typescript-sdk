// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import RetellSdk from 'retell-sdk';
import { Response } from 'node-fetch';

const retellSdk = new RetellSdk({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource phoneNumber', () => {
  test('create: only required params', async () => {
    const responsePromise = retellSdk.phoneNumber.create({ agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await retellSdk.phoneNumber.create({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      area_code: 415,
    });
  });

  test('retrieve', async () => {
    const responsePromise = retellSdk.phoneNumber.retrieve('string');
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
      retellSdk.phoneNumber.retrieve('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(RetellSdk.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = retellSdk.phoneNumber.update('string', { agent_id: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await retellSdk.phoneNumber.update('string', { agent_id: 'string' });
  });

  test('delete', async () => {
    const responsePromise = retellSdk.phoneNumber.delete('string');
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
      retellSdk.phoneNumber.delete('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(RetellSdk.NotFoundError);
  });
});
