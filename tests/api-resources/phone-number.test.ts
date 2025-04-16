// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource phoneNumber', () => {
  test('create', async () => {
    const responsePromise = client.phoneNumber.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve', async () => {
    const responsePromise = client.phoneNumber.retrieve('+14157774444');
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
      client.phoneNumber.retrieve('+14157774444', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.phoneNumber.update('+14157774444', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.phoneNumber.list();
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
    await expect(client.phoneNumber.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = client.phoneNumber.delete('+14157774444');
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
      client.phoneNumber.delete('+14157774444', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('import: only required params', async () => {
    const responsePromise = client.phoneNumber.import({
      phone_number: '+14157774444',
      termination_uri: 'someuri.pstn.twilio.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('import: required and optional params', async () => {
    const response = await client.phoneNumber.import({
      phone_number: '+14157774444',
      termination_uri: 'someuri.pstn.twilio.com',
      inbound_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      inbound_agent_version: 1,
      inbound_webhook_url: 'https://example.com/inbound-webhook',
      nickname: 'Frontdesk Number',
      outbound_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      outbound_agent_version: 1,
      sip_trunk_auth_password: '123456',
      sip_trunk_auth_username: 'username',
    });
  });
});
