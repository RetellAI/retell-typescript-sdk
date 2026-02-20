// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retell, { toFile } from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource knowledgeBase', () => {
  // custom code
  test.skip('create: only required params', async () => {
    const responsePromise = client.knowledgeBase.create({ knowledge_base_name: 'Sample KB' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // custom code
  test.skip('create: required and optional params', async () => {
    const response = await client.knowledgeBase.create({
      knowledge_base_name: 'Sample KB',
      enable_auto_refresh: true,
      knowledge_base_files: [await toFile(Buffer.from('# my file contents'), 'README.md')],
      knowledge_base_texts: [{ text: 'text', title: 'title' }],
      knowledge_base_urls: ['https://www.example.com', 'https://www.retellai.com'],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.knowledgeBase.retrieve('kb_1234567890');
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
    const responsePromise = client.knowledgeBase.list();
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
    const responsePromise = client.knowledgeBase.delete('kb_1234567890');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // custom code
  test.skip('addSources', async () => {
    const responsePromise = client.knowledgeBase.addSources('kb_1234567890', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteSource: only required params', async () => {
    const responsePromise = client.knowledgeBase.deleteSource('source_1234567890', {
      knowledge_base_id: 'kb_1234567890',
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
  test.skip('deleteSource: required and optional params', async () => {
    const response = await client.knowledgeBase.deleteSource('source_1234567890', {
      knowledge_base_id: 'kb_1234567890',
    });
  });
});
