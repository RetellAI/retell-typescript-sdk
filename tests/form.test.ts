import { multipartFormRequestOptions, createForm } from 'retell-sdk/internal/uploads';
import { toFile } from 'retell-sdk/core/uploads';

describe('form data validation', () => {
  test('valid values do not error', async () => {
    await multipartFormRequestOptions(
      {
        body: {
          foo: 'foo',
          string: 1,
          bool: true,
          file: await toFile(Buffer.from('some-content')),
          blob: new Blob(['Some content'], { type: 'text/plain' }),
        },
      },
      fetch,
    );
  });

  test('null', async () => {
    await expect(() =>
      multipartFormRequestOptions(
        {
          body: {
            null: null,
          },
        },
        fetch,
      ),
    ).rejects.toThrow(TypeError);
  });

  test('undefined is stripped', async () => {
    const form = await createForm(
      {
        foo: undefined,
        bar: 'baz',
      },
      fetch,
    );
    expect(form.has('foo')).toBe(false);
    expect(form.get('bar')).toBe('baz');
  });

  test('nested object is JSON-stringified', async () => {
    const form = await createForm(
      {
        bar: {
          foo: 'string',
          baz: undefined,
        },
      },
      fetch,
    );
    expect(Array.from(form.entries())).toEqual([['bar', '{"foo":"string"}']]);
  });

  test('nested array is JSON-stringified', async () => {
    const form = await createForm(
      {
        bar: [undefined, 'foo'],
      },
      fetch,
    );
    expect(Array.from(form.entries())).toEqual([['bar', '[null,"foo"]']]);
  });

  test('array of objects is JSON-stringified', async () => {
    const form = await createForm(
      {
        texts: [
          { text: 'Hello', title: 'Sample' },
          { text: 'World', title: 'Another' },
        ],
      },
      fetch,
    );
    expect(Array.from(form.entries())).toEqual([
      ['texts', '[{"text":"Hello","title":"Sample"},{"text":"World","title":"Another"}]'],
    ]);
  });

  test('array of strings is JSON-stringified', async () => {
    const form = await createForm(
      {
        urls: ['https://example.com', 'https://other.com'],
      },
      fetch,
    );
    expect(Array.from(form.entries())).toEqual([['urls', '["https://example.com","https://other.com"]']]);
  });

  test('array of files uses same field name without [] suffix', async () => {
    const file1 = await toFile(Buffer.from('content1'), 'file1.txt');
    const file2 = await toFile(Buffer.from('content2'), 'file2.txt');
    const form = await createForm(
      {
        files: [file1, file2],
      },
      fetch,
    );
    const entries = Array.from(form.entries());
    expect(entries).toHaveLength(2);
    expect(entries[0]![0]).toBe('files');
    expect(entries[1]![0]).toBe('files');
  });
});
