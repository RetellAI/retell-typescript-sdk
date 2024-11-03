import { createHmac, createSign, createVerify } from 'crypto';

const FIVE_MINUTES = 5 * 60 * 1000;

function makeSecureWebhooks(
  getSigner: (secretOrPrivateKey: string) => (input: string) => string,
  getVerifier: (secretOrPublicKey: string) => (input: string, digest: string) => boolean,
) {
  return {
    sign(input: string, secretOrPrivateKey: string, timestamp: number = Date.now()): string {
      const signer = getSigner(secretOrPrivateKey);
      return `v=${timestamp},d=${signer(input + timestamp)}`;
    },
    verify(
      input: string,
      secret: string,
      signature: string,
      opts: { timeout?: number; timestamp?: number } = {},
    ): boolean {
      const match = /v=(\d+),d=(.*)/.exec(signature);
      if (!match) {
        return false;
      }
      const poststamp = Number(match[1]);
      const postDigest = match[2] as string;
      const timestamp = opts?.timestamp ?? Date.now();
      const timeout = opts?.timeout ?? FIVE_MINUTES;
      const difference = Math.abs(timestamp - poststamp);
      if (difference > timeout) {
        return false;
      }
      const verifier = getVerifier(secret);
      return verifier(input + poststamp, postDigest);
    },
  };
}

export type SecureWebhooks = ReturnType<typeof makeSecureWebhooks>;

export const symmetric = makeSecureWebhooks(
  (secret) => (input) => createHmac('sha256', secret).update(input).digest('hex'),
  (secret) => (input, digest) => createHmac('sha256', secret).update(input).digest('hex') === digest,
);

export const asymmetric = makeSecureWebhooks(
  (priv) => (input) => createSign('sha256').update(input).sign(priv, 'base64'),
  (pub) => (input, digest) => createVerify('sha256').update(input).verify(pub, digest, 'base64'),
);

export const combined: SecureWebhooks = {
  sign: (input, secretOrPrivateKey, timestamp) =>
    secretOrPrivateKey.includes('PRIVATE KEY') ?
      asymmetric.sign(input, secretOrPrivateKey, timestamp)
    : symmetric.sign(input, secretOrPrivateKey, timestamp),
  verify: (input, secretOrPublicKey, signature, opts) =>
    secretOrPublicKey.includes('PUBLIC KEY') ?
      asymmetric.verify(input, secretOrPublicKey, signature, opts)
    : symmetric.verify(input, secretOrPublicKey, signature, opts),
};
// export const sign = symmetric.sign;
// export const verify = symmetric.verify;

export const verify = (body: string, apiKey: string, signature: string): boolean => {
  return symmetric.verify(body, apiKey, signature);
};

export const sign = (body: string, apiKey: string): string => {
  return symmetric.sign(body, apiKey);
};
