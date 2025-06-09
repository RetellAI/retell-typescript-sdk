// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource batchCall', () => {
  test('createBatchCall: only required params', async () => {
    const responsePromise = client.batchCall.createBatchCall({
      from_number: '+14157774444',
      tasks: [{ to_number: '+12137774445' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createBatchCall: required and optional params', async () => {
    const response = await client.batchCall.createBatchCall({
      from_number: '+14157774444',
      tasks: [{ to_number: '+12137774445', retell_llm_dynamic_variables: { customer_name: 'bar' } }],
      name: 'First batch call',
      trigger_timestamp: 1735718400000,
    });
  });
});
