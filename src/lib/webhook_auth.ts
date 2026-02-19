const FIVE_MINUTES = 5 * 60 * 1000;

async function hmacSha256Hex(secret: string, input: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(input));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacSha256Verify(secret: string, input: string, digest: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  const digestBytes = new Uint8Array(digest.length / 2);
  for (let i = 0; i < digest.length; i += 2) {
    digestBytes[i / 2] = parseInt(digest.slice(i, i + 2), 16);
  }
  return globalThis.crypto.subtle.verify('HMAC', key, digestBytes, enc.encode(input));
}

export interface SecureWebhooks {
  sign(input: string, secret: string, timestamp?: number): Promise<string>;
  verify(
    input: string,
    secret: string,
    signature: string,
    opts?: { timeout?: number; timestamp?: number },
  ): Promise<boolean>;
}

export const symmetric: SecureWebhooks = {
  async sign(input: string, secret: string, timestamp: number = Date.now()): Promise<string> {
    const digest = await hmacSha256Hex(secret, input + timestamp);
    return `v=${timestamp},d=${digest}`;
  },

  async verify(
    input: string,
    secret: string,
    signature: string,
    opts: { timeout?: number; timestamp?: number } = {},
  ): Promise<boolean> {
    const match = /v=(\d+),d=(.*)/.exec(signature);
    if (!match) return false;

    const poststamp = Number(match[1]);
    const postDigest = match[2]!;
    const timestamp = opts.timestamp ?? Date.now();
    const timeout = opts.timeout ?? FIVE_MINUTES;

    if (Math.abs(timestamp - poststamp) > timeout) return false;

    return hmacSha256Verify(secret, input + poststamp, postDigest);
  },
};

export const verify = (body: string, apiKey: string, signature: string): Promise<boolean> => {
  return symmetric.verify(body, apiKey, signature);
};

export const sign = (body: string, apiKey: string): Promise<string> => {
  return symmetric.sign(body, apiKey);
};
