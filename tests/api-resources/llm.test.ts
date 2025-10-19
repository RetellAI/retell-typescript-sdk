// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource llm', () => {
  test('create: only required params', async () => {
    const responsePromise = client.llm.create({ start_speaker: 'user' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.llm.create({
      start_speaker: 'user',
      begin_message: 'Hey I am a virtual assistant calling from Retell Hospital.',
      default_dynamic_variables: { customer_name: 'John Doe' },
      general_prompt: 'You are ...',
      general_tools: [{ name: 'end_call', type: 'end_call', description: 'End the call with user.' }],
      kb_config: { filter_score: 0.6, top_k: 3 },
      knowledge_base_ids: ['string'],
      model: 'gpt-4.1',
      model_high_priority: true,
      model_temperature: 0,
      s2s_model: 'gpt-4o-realtime',
      starting_state: 'information_collection',
      states: [
        {
          name: 'information_collection',
          edges: [
            {
              description: 'Transition to book an appointment.',
              destination_state_name: 'appointment_booking',
              parameters: { properties: { foo: 'bar' }, type: 'object', required: ['string'] },
            },
          ],
          state_prompt: 'You will follow the steps below to collect information...',
          tools: [
            {
              name: 'transfer_to_support',
              transfer_destination: { number: '16175551212', type: 'predefined', extension: '123*456#' },
              transfer_option: { type: 'cold_transfer', show_transferee_as_caller: false },
              type: 'transfer_call',
              custom_sip_headers: { 'X-Custom-Header': 'Custom Value' },
              description: 'Transfer to the support team.',
              ignore_e164_validation: false,
            },
          ],
        },
        {
          name: 'appointment_booking',
          edges: [
            {
              description: 'description',
              destination_state_name: 'destination_state_name',
              parameters: { properties: { foo: 'bar' }, type: 'object', required: ['string'] },
            },
          ],
          state_prompt: 'You will follow the steps below to book an appointment...',
          tools: [
            {
              cal_api_key: 'cal_live_xxxxxxxxxxxx',
              event_type_id: 60444,
              name: 'book_appointment',
              type: 'book_appointment_cal',
              description: 'Book an annual check up.',
              timezone: 'America/Los_Angeles',
            },
          ],
        },
      ],
      tool_call_strict_mode: true,
      version: 0,
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.llm.retrieve('16b980523634a6dc504898cda492e939');
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
      client.llm.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.llm.retrieve(
        '16b980523634a6dc504898cda492e939',
        { version: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = client.llm.update('16b980523634a6dc504898cda492e939', { start_speaker: 'user' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.llm.update('16b980523634a6dc504898cda492e939', {
      start_speaker: 'user',
      query_version: 1,
      begin_message: 'Hey I am a virtual assistant calling from Retell Hospital.',
      default_dynamic_variables: { customer_name: 'John Doe' },
      general_prompt: 'You are ...',
      general_tools: [{ name: 'end_call', type: 'end_call', description: 'End the call with user.' }],
      kb_config: { filter_score: 0.6, top_k: 3 },
      knowledge_base_ids: ['string'],
      model: 'gpt-4.1',
      model_high_priority: true,
      model_temperature: 0,
      s2s_model: 'gpt-4o-realtime',
      starting_state: 'information_collection',
      states: [
        {
          name: 'information_collection',
          edges: [
            {
              description: 'Transition to book an appointment.',
              destination_state_name: 'appointment_booking',
              parameters: { properties: { foo: 'bar' }, type: 'object', required: ['string'] },
            },
          ],
          state_prompt: 'You will follow the steps below to collect information...',
          tools: [
            {
              name: 'transfer_to_support',
              transfer_destination: { number: '16175551212', type: 'predefined', extension: '123*456#' },
              transfer_option: { type: 'cold_transfer', show_transferee_as_caller: false },
              type: 'transfer_call',
              custom_sip_headers: { 'X-Custom-Header': 'Custom Value' },
              description: 'Transfer to the support team.',
              ignore_e164_validation: false,
            },
          ],
        },
        {
          name: 'appointment_booking',
          edges: [
            {
              description: 'description',
              destination_state_name: 'destination_state_name',
              parameters: { properties: { foo: 'bar' }, type: 'object', required: ['string'] },
            },
          ],
          state_prompt: 'You will follow the steps below to book an appointment...',
          tools: [
            {
              cal_api_key: 'cal_live_xxxxxxxxxxxx',
              event_type_id: 60444,
              name: 'book_appointment',
              type: 'book_appointment_cal',
              description: 'Book an annual check up.',
              timezone: 'America/Los_Angeles',
            },
          ],
        },
      ],
      tool_call_strict_mode: true,
      body_version: 0,
    });
  });

  test('list', async () => {
    const responsePromise = client.llm.list();
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
    await expect(client.llm.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(Retell.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.llm.list(
        { limit: 50, pagination_key: 'llm_1ffdb9717444d0e77346838911', pagination_key_version: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.llm.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
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
      client.llm.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
