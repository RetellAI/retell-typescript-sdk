// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const retell = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  test('create: only required params', async () => {
    const responsePromise = retell.agent.create({
      llm_websocket_url: 'wss://your-websocket-endpoint',
      voice_id: '11labs-Adrian',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await retell.agent.create({
      llm_websocket_url: 'wss://your-websocket-endpoint',
      voice_id: '11labs-Adrian',
      agent_name: 'Jarvis',
      ambient_sound: 'coffee-shop',
      backchannel_frequency: 0.9,
      backchannel_words: ['yeah', 'uh-huh'],
      boosted_keywords: ['retell', 'kroger'],
      enable_backchannel: true,
      end_call_after_silence_ms: 600000,
      interruption_sensitivity: 1,
      language: 'en-US',
      normalize_for_speech: true,
      opt_out_sensitive_data_storage: true,
      pronunciation_dictionary: [
        { word: 'actually', alphabet: 'ipa', phoneme: 'ˈæktʃuəli' },
        { word: 'actually', alphabet: 'ipa', phoneme: 'ˈæktʃuəli' },
        { word: 'actually', alphabet: 'ipa', phoneme: 'ˈæktʃuəli' },
      ],
      reminder_max_count: 2,
      reminder_trigger_ms: 10000,
      responsiveness: 1,
      voice_speed: 1,
      voice_temperature: 1,
      webhook_url: 'https://webhook-url-here',
    });
  });

  test('retrieve', async () => {
    const responsePromise = retell.agent.retrieve('16b980523634a6dc504898cda492e939');
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
      retell.agent.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = retell.agent.update('16b980523634a6dc504898cda492e939', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = retell.agent.list();
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
    await expect(retell.agent.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = retell.agent.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
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
      retell.agent.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
