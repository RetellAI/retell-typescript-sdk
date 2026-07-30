const FIVE_MINUTES = 5 * 60 * 1000;
const SHA_256_HEX_LENGTH = 64;

export interface SecureWebhookVerifyOptions {
  timeout?: number;
  timestamp?: number;
}

export interface SecureWebhooks {
  sign(input: string, secret: string, timestamp?: number): Promise<string>;
  verify(
    input: string,
    secret: string,
    signature: string,
    opts?: SecureWebhookVerifyOptions,
  ): Promise<boolean>;
}

function getSubtleCrypto() {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error('Webhook verification requires a runtime with the Web Crypto API');
  }
  return subtle;
}

function encode(input: string): Uint8Array {
  return new TextEncoder().encode(input);
}

async function importHmacKey(secret: string, usage: 'sign' | 'verify') {
  return getSubtleCrypto().importKey('raw', encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    usage,
  ]);
}

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): Uint8Array | undefined {
  if (hex.length !== SHA_256_HEX_LENGTH || !/^[0-9a-f]+$/i.test(hex)) {
    return undefined;
  }

  return Uint8Array.from({ length: SHA_256_HEX_LENGTH / 2 }, (_, index) =>
    Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16),
  );
}

async function hmacSha256Hex(secret: string, input: string): Promise<string> {
  const subtle = getSubtleCrypto();
  const key = await importHmacKey(secret, 'sign');
  return bytesToHex(await subtle.sign('HMAC', key, encode(input)));
}

async function hmacSha256Verify(secret: string, input: string, digest: Uint8Array): Promise<boolean> {
  const subtle = getSubtleCrypto();
  const key = await importHmacKey(secret, 'verify');
  return subtle.verify('HMAC', key, digest, encode(input));
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
    opts: SecureWebhookVerifyOptions = {},
  ): Promise<boolean> {
    const match = /^v=(\d+),d=([0-9a-f]+)$/i.exec(signature);
    if (!match) return false;

    const poststamp = Number(match[1]);
    const postDigest = hexToBytes(match[2]!);
    const timestamp = opts.timestamp ?? Date.now();
    const timeout = opts.timeout ?? FIVE_MINUTES;

    if (
      !Number.isSafeInteger(poststamp) ||
      !Number.isFinite(timestamp) ||
      !Number.isFinite(timeout) ||
      timeout < 0 ||
      !postDigest ||
      Math.abs(timestamp - poststamp) > timeout
    ) {
      return false;
    }

    return hmacSha256Verify(secret, input + poststamp, postDigest);
  },
};

/**
 * Verify a Retell webhook signature against the exact raw request body.
 */
export const verify = (body: string, apiKey: string, signature: string): Promise<boolean> => {
  return symmetric.verify(body, apiKey, signature);
};

/**
 * Sign a webhook body using the Retell webhook signature format.
 */
export const sign = (body: string, apiKey: string): Promise<string> => {
  return symmetric.sign(body, apiKey);
};
