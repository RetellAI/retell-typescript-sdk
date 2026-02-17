// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tests', () => {
  // Prism tests are disabled
  test.skip('createBatchTest: only required params', async () => {
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

  // Prism tests are disabled
  test.skip('createBatchTest: required and optional params', async () => {
    const response = await client.tests.createBatchTest({
      response_engine: {
        llm_id: 'llm_id',
        type: 'retell-llm',
        version: 0,
      },
      test_case_definition_ids: ['string'],
    });
  });

  // Prism tests are disabled
  test.skip('createTestCaseDefinition: only required params', async () => {
    const responsePromise = client.tests.createTestCaseDefinition({
      metrics: ['string'],
      name: 'name',
      response_engine: { llm_id: 'llm_id', type: 'retell-llm' },
      user_prompt: 'user_prompt',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createTestCaseDefinition: required and optional params', async () => {
    const response = await client.tests.createTestCaseDefinition({
      metrics: ['string'],
      name: 'name',
      response_engine: {
        llm_id: 'llm_id',
        type: 'retell-llm',
        version: 0,
      },
      user_prompt: 'user_prompt',
      dynamic_variables: { foo: 'string' },
      llm_model: 'gpt-4.1',
      tool_mocks: [
        {
          input_match_rule: { type: 'any' },
          output: 'output',
          tool_name: 'tool_name',
          result: true,
        },
      ],
    });
  });

  // Prism tests are disabled
  test.skip('deleteTestCaseDefinition', async () => {
    const responsePromise = client.tests.deleteTestCaseDefinition('test_case_definition_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getBatchTest', async () => {
    const responsePromise = client.tests.getBatchTest('test_case_batch_job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getTestCaseDefinition', async () => {
    const responsePromise = client.tests.getTestCaseDefinition('test_case_definition_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getTestRun', async () => {
    const responsePromise = client.tests.getTestRun('test_case_job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listBatchTests: only required params', async () => {
    const responsePromise = client.tests.listBatchTests({ type: 'retell-llm' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listBatchTests: required and optional params', async () => {
    const response = await client.tests.listBatchTests({
      type: 'retell-llm',
      conversation_flow_id: 'conversation_flow_id',
      llm_id: 'llm_id',
      version: 0,
    });
  });

  // Prism tests are disabled
  test.skip('listTestCaseDefinitions: only required params', async () => {
    const responsePromise = client.tests.listTestCaseDefinitions({ type: 'retell-llm' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listTestCaseDefinitions: required and optional params', async () => {
    const response = await client.tests.listTestCaseDefinitions({
      type: 'retell-llm',
      conversation_flow_id: 'conversation_flow_id',
      llm_id: 'llm_id',
      version: 0,
    });
  });

  // Prism tests are disabled
  test.skip('listTestRuns', async () => {
    const responsePromise = client.tests.listTestRuns('test_case_batch_job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateTestCaseDefinition', async () => {
    const responsePromise = client.tests.updateTestCaseDefinition('test_case_definition_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
