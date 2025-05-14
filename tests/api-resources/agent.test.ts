// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell from 'retell-sdk';
import { Response } from 'node-fetch';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agent.create({
      response_engine: { llm_id: 'llm_234sdertfsdsfsdf', type: 'retell-llm' },
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
    const response = await client.agent.create({
      response_engine: { llm_id: 'llm_234sdertfsdsfsdf', type: 'retell-llm', version: 0 },
      voice_id: '11labs-Adrian',
      agent_name: 'Jarvis',
      allow_user_dtmf: true,
      ambient_sound: 'coffee-shop',
      ambient_sound_volume: 1,
      backchannel_frequency: 0.9,
      backchannel_words: ['yeah', 'uh-huh'],
      begin_message_delay_ms: 1000,
      boosted_keywords: ['retell', 'kroger'],
      denoising_mode: 'noise-cancellation',
      enable_backchannel: true,
      enable_transcription_formatting: true,
      enable_voicemail_detection: true,
      end_call_after_silence_ms: 600000,
      fallback_voice_ids: ['openai-Alloy', 'deepgram-Angus'],
      interruption_sensitivity: 1,
      language: 'en-US',
      max_call_duration_ms: 3600000,
      normalize_for_speech: true,
      opt_in_signed_url: true,
      opt_out_sensitive_data_storage: true,
      post_call_analysis_data: [
        {
          description: 'The name of the customer.',
          name: 'customer_name',
          type: 'string',
          examples: ['John Doe', 'Jane Smith'],
        },
      ],
      post_call_analysis_model: 'gpt-4o-mini',
      pronunciation_dictionary: [{ alphabet: 'ipa', phoneme: 'ˈæktʃuəli', word: 'actually' }],
      reminder_max_count: 2,
      reminder_trigger_ms: 10000,
      responsiveness: 1,
      ring_duration_ms: 30000,
      stt_mode: 'fast',
      user_dtmf_options: { digit_limit: 1, termination_key: '#', timeout_ms: 1000 },
      version: 0,
      voice_model: 'eleven_turbo_v2',
      voice_speed: 1,
      voice_temperature: 1,
      voicemail_detection_timeout_ms: 30000,
      voicemail_message: 'Hi, please give us a callback.',
      volume: 1,
      webhook_url: 'https://webhook-url-here',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.agent.retrieve('16b980523634a6dc504898cda492e939');
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
      client.agent.retrieve('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agent.retrieve(
        '16b980523634a6dc504898cda492e939',
        { version: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.agent.update('16b980523634a6dc504898cda492e939', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.agent.list();
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
    await expect(client.agent.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Retell.NotFoundError,
    );
  });

  test('delete', async () => {
    const responsePromise = client.agent.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD');
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
      client.agent.delete('oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });

  test('getVersions', async () => {
    const responsePromise = client.agent.getVersions('16b980523634a6dc504898cda492e939');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getVersions: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agent.getVersions('16b980523634a6dc504898cda492e939', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Retell.NotFoundError);
  });
});
