// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import RetellAI from 'retell-sdka';
import { Response } from 'node-fetch';

const retellAI = new RetellAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource registerCalls', () => {
  test('create: only required params', async () => {
    const responsePromise = retellAI.registerCalls.create({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      audio_encoding: 's16le',
      audio_websocket_protocol: 'twilio',
      sample_rate: 24000,
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
    const response = await retellAI.registerCalls.create({
      agent_id: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD',
      audio_encoding: 's16le',
      audio_websocket_protocol: 'twilio',
      sample_rate: 24000,
      end_call_after_silence_ms: 600000,
      from_number: 'string',
      metadata: {},
      to_number: 'string',
    });
  });
});
