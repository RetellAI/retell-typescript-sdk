// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource call', () => {
  test('retrieve', async () => {
    const responsePromise = client.call.retrieve('119c3f8e47135a29e65947eeb34cf12d');
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
      client.call.retrieve('119c3f8e47135a29e65947eeb34cf12d', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.call.update('call_a4441234567890777c4a4a123e6', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.call.list({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete', async () => {
    const responsePromise = client.call.delete('119c3f8e47135a29e65947eeb34cf12d');
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
      client.call.delete('119c3f8e47135a29e65947eeb34cf12d', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('createPhoneCall: only required params', async () => {
    const responsePromise = client.call.createPhoneCall({
      from_number: '+14157774444',
      to_number: '+12137774445',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createPhoneCall: required and optional params', async () => {
    const response = await client.call.createPhoneCall({
      from_number: '+14157774444',
      to_number: '+12137774445',
      custom_sip_headers: { 'X-Custom-Header': 'Custom Value' },
      ignore_e164_validation: true,
      metadata: {},
      override_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      override_agent_version: 1,
      retell_llm_dynamic_variables: { customer_name: 'bar' },
    });
  });

  test('createWebCall: only required params', async () => {
    const responsePromise = client.call.createWebCall({ agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createWebCall: required and optional params', async () => {
    const response = await client.call.createWebCall({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      agent_version: 1,
      metadata: {},
      retell_llm_dynamic_variables: { customer_name: 'bar' },
    });
  });

  test('registerPhoneCall: only required params', async () => {
    const responsePromise = client.call.registerPhoneCall({ agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('registerPhoneCall: required and optional params', async () => {
    const response = await client.call.registerPhoneCall({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      agent_version: 1,
      direction: 'inbound',
      from_number: '+14157774444',
      metadata: {},
      retell_llm_dynamic_variables: { customer_name: 'bar' },
      to_number: '+12137774445',
    });
  });
});
