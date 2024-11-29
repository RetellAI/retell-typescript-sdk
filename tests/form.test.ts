import { multipartFormRequestOptions, createForm } from 'retell-sdk/core';
import { Blob } from 'retell-sdk/_shims/index';
import { toFile } from 'retell-sdk';

describe('form data validation', () => {
  test('valid values do not error', async () => {
    await multipartFormRequestOptions({
      body: {
        foo: 'foo',
        string: 1,
        bool: true,
        file: await toFile(Buffer.from('some-content')),
        blob: new Blob(['Some content'], { type: 'text/plain' }),
      },
    });
  });

  test('null', async () => {
    await expect(() =>
      multipartFormRequestOptions({
        body: {
          null: null,
        },
      }),
    ).rejects.toThrow(TypeError);
  });

  test('undefined is stripped', async () => {
    const form = await createForm({
      foo: undefined,
      bar: 'baz',
    });
    expect(form.has('foo')).toBe(false);
    expect(form.get('bar')).toBe('baz');
  });
});
