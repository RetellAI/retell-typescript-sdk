// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource phoneNumber', () => {
  // Mock server tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.phoneNumber.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.phoneNumber.retrieve('+14157774444');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.phoneNumber.update('+14157774444', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.phoneNumber.list();
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
      client.phoneNumber.list(
        {
          limit: 1000,
          pagination_key: 'pagination_key',
          sort_order: 'ascending',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.phoneNumber.delete('+14157774444');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('import: only required params', async () => {
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

  // Mock server tests are disabled
  test.skip('import: required and optional params', async () => {
    const response = await client.phoneNumber.import({
      phone_number: '+14157774444',
      termination_uri: 'someuri.pstn.twilio.com',
      allowed_inbound_country_list: ['US', 'CA', 'GB'],
      allowed_outbound_country_list: ['US', 'CA'],
      codecs: ['PCMU', 'PCMA', 'G.722'],
      ignore_e164_validation: true,
      inbound_agents: [
        {
          agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
          weight: 0.5,
          agent_version: 'latest_published',
        },
      ],
      inbound_webhook_url: 'https://example.com/inbound-webhook',
      nickname: 'Frontdesk Number',
      outbound_agents: [
        {
          agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
          weight: 0.5,
          agent_version: 'latest_published',
        },
      ],
      sip_trunk_auth_password: '123456',
      sip_trunk_auth_username: 'username',
      transport: 'TCP',
    });
  });

  // Mock server tests are disabled
  test.skip('search', async () => {
    const responsePromise = client.phoneNumber.search();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('search: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.phoneNumber.search(
        {
          limit: 1000,
          pagination_key: 'pagination_key',
          sort_order: 'ascending',
          filter_criteria: {
            branded_call: {
              op: 'eq',
              type: 'boolean',
              value: true,
            },
            inbound_agent_tags: {
              op: 'in',
              type: 'enum',
              value: ['string'],
            },
            inbound_agents: [{ agent_id: 'agent_id', version: [0] }],
            outbound_agent_tags: {
              op: 'in',
              type: 'enum',
              value: ['string'],
            },
            outbound_agents: [{ agent_id: 'agent_id', version: [0] }],
            phone_number_type: {
              op: 'in',
              type: 'enum',
              value: ['retell-twilio'],
            },
            query: 'query',
            sms: {
              op: 'eq',
              type: 'boolean',
              value: true,
            },
            spam_status: {
              op: 'in',
              type: 'enum',
              value: ['clean'],
            },
            verified_number: {
              op: 'eq',
              type: 'boolean',
              value: true,
            },
          },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
