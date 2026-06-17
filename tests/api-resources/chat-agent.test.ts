// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chatAgent', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.chatAgent.create({
      response_engine: { llm_id: 'llm_234sdertfsdsfsdf', type: 'retell-llm' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.chatAgent.create({
      response_engine: {
        llm_id: 'llm_234sdertfsdsfsdf',
        type: 'retell-llm',
        version: 0,
      },
      agent_name: 'Jarvis',
      auto_close_message: 'Thank you for chatting. The conversation has ended.',
      data_storage_retention_days: 30,
      data_storage_setting: 'everything',
      end_chat_after_silence_ms: 3600000,
      guardrail_config: { input_topics: ['platform_integrity_jailbreaking'], output_topics: ['harassment'] },
      handbook_config: {
        ai_disclosure: true,
        default_personality: true,
        high_empathy: true,
        scope_boundaries: true,
      },
      language: 'en-US',
      opt_in_signed_url: true,
      pii_config: { categories: ['person_name'], mode: 'post_call' },
      post_chat_analysis_data: [
        {
          description: 'The name of the customer.',
          name: 'customer_name',
          type: 'string',
          conditional_prompt: 'conditional_prompt',
          examples: ['John Doe', 'Jane Smith'],
          required: true,
        },
      ],
      post_chat_analysis_model: 'gpt-4.1-mini',
      signed_url_expiration_ms: 86400000,
      timezone: 'America/New_York',
      version_title: 'Production hotfix',
      webhook_events: ['chat_started'],
      webhook_timeout_ms: 10000,
      webhook_url: 'https://webhook-url-here',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.chatAgent.retrieve('16b980523634a6dc504898cda492e939');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chatAgent.retrieve(
        '16b980523634a6dc504898cda492e939',
        { version: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.chatAgent.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.chatAgent.list(
        {
          is_latest: true,
          limit: 50,
          pagination_key: '16b980523634a6dc504898cda492e939',
          pagination_key_version: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.chatAgent.update('16b980523634a6dc504898cda492e939', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.chatAgent.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('publish: only required params', async () => {
    const responsePromise = client.chatAgent.publish('agent_xxx', { version: 15 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('publish: required and optional params', async () => {
    const response = await client.chatAgent.publish('agent_xxx', {
      version: 15,
      version_description: 'Hotfix for transfer timeout',
      version_title: 'Hotfix',
    });
  });

  // Mock server tests are disabled
  test.skip('createVersion: only required params', async () => {
    const responsePromise = client.chatAgent.createVersion('agent_xxx', { base_version: 12 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createVersion: required and optional params', async () => {
    const response = await client.chatAgent.createVersion('agent_xxx', { base_version: 12 });
  });

  // Mock server tests are disabled
  test.skip('deleteVersion: only required params', async () => {
    const responsePromise = client.chatAgent.deleteVersion('agent_xxx', { version: 1 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteVersion: required and optional params', async () => {
    const response = await client.chatAgent.deleteVersion('agent_xxx', { version: 1 });
  });

  // Mock server tests are disabled
  test.skip('getVersions', async () => {
    const responsePromise = client.chatAgent.getVersions('16b980523634a6dc504898cda492e939');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
