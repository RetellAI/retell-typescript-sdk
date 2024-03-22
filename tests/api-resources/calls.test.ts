// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import RetellAI from 'retell-sdka';
import { Response } from 'node-fetch';

const retellAI = new RetellAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource calls', () => {
  test('retrieve', async () => {
    const responsePromise = retellAI.calls.retrieve('119c3f8e47135a29e65947eeb34cf12d');
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
      retellAI.calls.retrieve('119c3f8e47135a29e65947eeb34cf12d', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(RetellAI.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = retellAI.calls.list();
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
    await expect(retellAI.calls.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      RetellAI.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      retellAI.calls.list(
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
    ).rejects.toThrow(RetellAI.NotFoundError);
  });
});
