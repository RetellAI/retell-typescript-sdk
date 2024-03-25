// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Toddlzt from 'toddlzt';
import { Response } from 'node-fetch';

const toddlzt = new Toddlzt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource retellLlms', () => {
  test('create: only required params', async () => {
    const responsePromise = toddlzt.retellLlms.create({ general_prompt: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await toddlzt.retellLlms.create({
      general_prompt: 'string',
      begin_message: 'string',
      general_tools: [
        { type: 'end_call', name: 'string', description: 'string' },
        { type: 'end_call', name: 'string', description: 'string' },
        { type: 'end_call', name: 'string', description: 'string' },
      ],
      starting_state: 'string',
      states: [
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
          ],
          tools: [
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
          ],
          tools: [
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
          ],
          tools: [
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
          ],
        },
      ],
    });
  });

  test('retrieve', async () => {
    const responsePromise = toddlzt.retellLlms.retrieve('16b980523634a6dc504898cda492e939');
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
      toddlzt.retellLlms.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Toddlzt.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = toddlzt.retellLlms.update('16b980523634a6dc504898cda492e939', {
      general_prompt: 'string',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await toddlzt.retellLlms.update('16b980523634a6dc504898cda492e939', {
      general_prompt: 'string',
      begin_message: 'string',
      general_tools: [
        { type: 'end_call', name: 'string', description: 'string' },
        { type: 'end_call', name: 'string', description: 'string' },
        { type: 'end_call', name: 'string', description: 'string' },
      ],
      starting_state: 'string',
      states: [
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
          ],
          tools: [
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
          ],
          tools: [
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
            {
              destination_state_name: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: {} },
                required: ['string', 'string', 'string'],
              },
              speak_during_transition: true,
            },
          ],
          tools: [
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
            { type: 'end_call', name: 'string', description: 'string' },
          ],
        },
      ],
    });
  });

  test('list', async () => {
    const responsePromise = toddlzt.retellLlms.list();
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
    await expect(toddlzt.retellLlms.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Toddlzt.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = toddlzt.retellLlms.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
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
      toddlzt.retellLlms.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Toddlzt.NotFoundError);
  });
});
