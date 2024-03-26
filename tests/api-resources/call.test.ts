// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const retell = new Retell({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource call', () => {
  test('create: only required params', async () => {
    const responsePromise = retell.call.create({ phone_number: { from: 'string', to: 'string' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await retell.call.create({
      phone_number: { from: 'string', to: 'string' },
      override_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      retell_llm_dynamic_variables: { customer_name: 'John Doe' },
    });
  });

  test('retrieve', async () => {
    const responsePromise = retell.call.retrieve('119c3f8e47135a29e65947eeb34cf12d');
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
      retell.call.retrieve('119c3f8e47135a29e65947eeb34cf12d', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = retell.call.list();
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
    await expect(retell.call.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      retell.call.list(
        {
          filter_criteria: {
            agent_id: ['oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD'],
            before_start_timestamp: 1703302407399,
            after_start_timestamp: 1703302407300,
            before_end_timestamp: 1703302428899,
            after_end_timestamp: 1703302428800,
          },
          limit: 0,
          sort_order: 'ascending',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('register: only required params', async () => {
    const responsePromise = retell.call.register({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      audio_encoding: 's16le',
      audio_websocket_protocol: 'twilio',
      sample_rate: 24000,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('register: required and optional params', async () => {
    const response = await retell.call.register({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      audio_encoding: 's16le',
      audio_websocket_protocol: 'twilio',
      sample_rate: 24000,
      end_call_after_silence_ms: 600000,
      from_number: 'string',
      metadata: {},
      retell_llm_dynamic_variables: { customer_name: 'John Doe' },
      to_number: 'string',
    });
  });
});
