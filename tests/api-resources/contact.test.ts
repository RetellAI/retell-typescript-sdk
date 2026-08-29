// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell, { toFile } from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource contact', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.contact.create({ phone_number: 'phone_number' });
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
    const response = await client.contact.create({
      phone_number: 'phone_number',
      custom_fields: {},
      do_not_call: true,
      first_name: 'first_name',
      last_name: 'last_name',
      tags: ['P'],
    });
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.contact.update('contact_id', {});
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
    const responsePromise = client.contact.list();
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
      client.contact.list(
        {
          filter_criteria: {
            contact_id: {
              op: 'eq',
              type: 'string',
              value: 'value',
            },
            custom_fields: [
              {
                op: 'eq',
                type: 'string',
                value: 'value',
                key: 'key',
              },
            ],
            do_not_call: {
              op: 'eq',
              type: 'boolean',
              value: true,
            },
            external_id: {
              op: 'eq',
              type: 'string',
              value: 'value',
            },
            last_conversation_timestamp: {
              op: 'eq',
              type: 'number',
              value: 0,
            },
            phone_number: {
              op: 'eq',
              type: 'string',
              value: 'value',
            },
            tags: {
              op: 'in',
              type: 'enum',
              value: ['string'],
            },
          },
          limit: 1,
          pagination_key: 'pagination_key',
          search_query: 'search_query',
          skip: 0,
          sort_order: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.contact.delete('contact_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('backfillAnalysisData: only required params', async () => {
    const responsePromise = client.contact.backfillAnalysisData({ backfill_attributes: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('backfillAnalysisData: required and optional params', async () => {
    const response = await client.contact.backfillAnalysisData({
      backfill_attributes: ['string'],
      backfill_call_filter: {
        agent: [{ agent_id: 'x', version: [0] }],
        start_timestamp: {
          op: 'eq',
          type: 'number',
          value: 0,
        },
      },
    });
  });

  // Mock server tests are disabled
  test.skip('createImport: only required params', async () => {
    const responsePromise = client.contact.createImport({
      column_mapping: [{ external_field_name: 'external_field_name', field_name: 'field_name' }],
      upload_id: 'upload_26f1cbdf5713',
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
  test.skip('createImport: required and optional params', async () => {
    const response = await client.contact.createImport({
      column_mapping: [{ external_field_name: 'external_field_name', field_name: 'field_name' }],
      upload_id: 'upload_26f1cbdf5713',
      default_country: 'se',
      tags: ['P'],
    });
  });

  // Mock server tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.contact.get('contact_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getBackfillJobStatus', async () => {
    const responsePromise = client.contact.getBackfillJobStatus();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getByPhone', async () => {
    const responsePromise = client.contact.getByPhone('phone_number');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getImport', async () => {
    const responsePromise = client.contact.getImport();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listConversations', async () => {
    const responsePromise = client.contact.listConversations('contact_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listConversations: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.contact.listConversations(
        'contact_id',
        { limit: 1000, pagination_key: 'pagination_key' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('uploadImportFile: only required params', async () => {
    const responsePromise = client.contact.uploadImportFile({
      file: await toFile(Buffer.from('Example data'), 'README.md'),
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
  test.skip('uploadImportFile: required and optional params', async () => {
    const response = await client.contact.uploadImportFile({
      file: await toFile(Buffer.from('Example data'), 'README.md'),
    });
  });
});
