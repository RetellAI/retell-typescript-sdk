// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Toddlzt from 'toddlzt';
import { Response } from 'node-fetch';

const toddlzt = new Toddlzt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource phoneNumbers', () => {
  test('create: only required params', async () => {
    const responsePromise = toddlzt.phoneNumbers.create({ agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await toddlzt.phoneNumbers.create({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      area_code: 'string',
    });
  });

  test('retrieve', async () => {
    const responsePromise = toddlzt.phoneNumbers.retrieve('string');
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
      toddlzt.phoneNumbers.retrieve('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Toddlzt.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = toddlzt.phoneNumbers.update('string', { general_prompt: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await toddlzt.phoneNumbers.update('string', { general_prompt: 'string' });
  });

  test('list', async () => {
    const responsePromise = toddlzt.phoneNumbers.list();
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
    await expect(toddlzt.phoneNumbers.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Toddlzt.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = toddlzt.phoneNumbers.delete('string');
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
    await expect(toddlzt.phoneNumbers.delete('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Toddlzt.NotFoundError,
    );
  });
});
