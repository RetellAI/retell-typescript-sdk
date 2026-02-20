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
      inbound_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      inbound_agent_version: 1,
      inbound_agents: [
        {
          agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
          weight: 0.5,
          agent_version: 1,
        },
      ],
      inbound_webhook_url: 'https://example.com/inbound-webhook',
      nickname: 'Frontdesk Number',
      outbound_agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      outbound_agent_version: 1,
      outbound_agents: [
        {
          agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
          weight: 0.5,
          agent_version: 1,
        },
      ],
      sip_trunk_auth_password: '123456',
      sip_trunk_auth_username: 'username',
      transport: 'TCP',
    });
  });
});
