// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell, { toFile } from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource voice', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.voice.retrieve('11labs-Adrian');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.voice.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addResource: only required params', async () => {
    const responsePromise = client.voice.addResource({
      provider_voice_id: 'provider_voice_id',
      voice_name: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addResource: required and optional params', async () => {
    const response = await client.voice.addResource({
      provider_voice_id: 'provider_voice_id',
      voice_name: 'x',
      public_user_id: 'public_user_id',
      voice_provider: 'elevenlabs',
    });
  });

  // Prism tests are disabled
  test.skip('clone: only required params', async () => {
    const responsePromise = client.voice.clone({
      files: [await toFile(Buffer.from('# my file contents'), 'README.md')],
      voice_name: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('clone: required and optional params', async () => {
    const response = await client.voice.clone({
      files: [await toFile(Buffer.from('# my file contents'), 'README.md')],
      voice_name: 'x',
      voice_provider: 'elevenlabs',
    });
  });

  // Prism tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.voice.search({ search_query: 'search_query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('search: required and optional params', async () => {
    const response = await client.voice.search({
      search_query: 'search_query',
      voice_provider: 'elevenlabs',
    });
  });
});
