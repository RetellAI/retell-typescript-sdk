// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import RetellAI from 'retell-sdka';
import { Response } from 'node-fetch';

const retellAI = new RetellAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource retellLlms', () => {
  test('create: only required params', async () => {
    const responsePromise = retellAI.retellLlms.create({ general_prompt: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await retellAI.retellLlms.create({
      general_prompt: 'string',
      begin_message: 'string',
      general_tools: [
        { type: 'pre_defined', name: 'end_call', description: 'string' },
        { type: 'pre_defined', name: 'end_call', description: 'string' },
        { type: 'pre_defined', name: 'end_call', description: 'string' },
      ],
      starting_state: 'string',
      states: [
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
          ],
          tools: [
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
          ],
          tools: [
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
          ],
          tools: [
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
          ],
        },
      ],
    });
  });

  test('retrieve', async () => {
    const responsePromise = retellAI.retellLlms.retrieve('16b980523634a6dc504898cda492e939');
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
      retellAI.retellLlms.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(RetellAI.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = retellAI.retellLlms.update('16b980523634a6dc504898cda492e939', {
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
    const response = await retellAI.retellLlms.update('16b980523634a6dc504898cda492e939', {
      general_prompt: 'string',
      begin_message: 'string',
      general_tools: [
        { type: 'pre_defined', name: 'end_call', description: 'string' },
        { type: 'pre_defined', name: 'end_call', description: 'string' },
        { type: 'pre_defined', name: 'end_call', description: 'string' },
      ],
      starting_state: 'string',
      states: [
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
          ],
          tools: [
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
          ],
          tools: [
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
          ],
        },
        {
          name: 'string',
          state_prompt: 'string',
          edges: [
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
            {
              destinationStateName: 'string',
              description: 'string',
              parameters: {
                type: 'object',
                properties: { foo: 'bar' },
                required: ['string', 'string', 'string'],
              },
              speakDuringTransition: true,
            },
          ],
          tools: [
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
            { type: 'pre_defined', name: 'end_call', description: 'string' },
          ],
        },
      ],
    });
  });

  test('list', async () => {
    const responsePromise = retellAI.retellLlms.list();
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
    await expect(retellAI.retellLlms.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      RetellAI.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = retellAI.retellLlms.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
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
      retellAI.retellLlms.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(RetellAI.NotFoundError);
  });
});
