// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tests', () => {
  test('createBatchTest: only required params', async () => {
    const responsePromise = client.tests.createBatchTest({
      response_engine: { llm_id: 'llm_id', type: 'retell-llm' },
      test_case_definition_ids: ['string'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createBatchTest: required and optional params', async () => {
    const response = await client.tests.createBatchTest({
      response_engine: { llm_id: 'llm_id', type: 'retell-llm', version: 0 },
      test_case_definition_ids: ['string'],
    });
  });
});
