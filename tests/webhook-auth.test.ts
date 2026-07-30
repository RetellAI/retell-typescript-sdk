import { Retell, sign, verify } from 'retell-sdk';
import { symmetric } from 'retell-sdk/lib/webhook_auth';

const body = '{"event":"call_ended"}';
const apiKey = 'test-api-key';
const timestamp = 1_700_000_000_000;
const expectedDigest = '07024cabe7dd8f6d1c6e4a8324ca92c812e6ad4a7ee506c04f7e462e3321823e';

describe('webhook authentication', () => {
  test('signs with HMAC-SHA256 using the documented signature format', async () => {
    await expect(symmetric.sign(body, apiKey, timestamp)).resolves.toBe(`v=${timestamp},d=${expectedDigest}`);
  });

  test('verifies a valid signature', async () => {
    const signature = await symmetric.sign(body, apiKey, timestamp);

    await expect(symmetric.verify(body, apiKey, signature, { timestamp })).resolves.toBe(true);
  });

  test('rejects tampered bodies and incorrect secrets', async () => {
    const signature = await symmetric.sign(body, apiKey, timestamp);

    await expect(symmetric.verify(`${body} `, apiKey, signature, { timestamp })).resolves.toBe(false);
    await expect(symmetric.verify(body, 'wrong-api-key', signature, { timestamp })).resolves.toBe(false);
  });

  test.each([
    '',
    `v=${timestamp}`,
    `d=${expectedDigest},v=${timestamp}`,
    `prefix-v=${timestamp},d=${expectedDigest}`,
    `v=${timestamp},d=${expectedDigest}-suffix`,
    `v=${timestamp},d=not-hex`,
    `v=${timestamp},d=${expectedDigest.slice(2)}`,
    `v=999999999999999999999999,d=${expectedDigest}`,
  ])('rejects malformed signature %p', async (signature) => {
    await expect(symmetric.verify(body, apiKey, signature, { timestamp })).resolves.toBe(false);
  });

  test('enforces the timestamp tolerance in both directions', async () => {
    const signature = await symmetric.sign(body, apiKey, timestamp);
    const timeout = 5 * 60 * 1000;

    await expect(
      symmetric.verify(body, apiKey, signature, { timestamp: timestamp + timeout, timeout }),
    ).resolves.toBe(true);
    await expect(
      symmetric.verify(body, apiKey, signature, { timestamp: timestamp + timeout + 1, timeout }),
    ).resolves.toBe(false);
    await expect(
      symmetric.verify(body, apiKey, signature, { timestamp: timestamp - timeout - 1, timeout }),
    ).resolves.toBe(false);
  });

  test('exposes async top-level and client-level helpers', async () => {
    const topLevelSignature = await sign(body, apiKey);
    await expect(verify(body, apiKey, topLevelSignature)).resolves.toBe(true);

    const clientLevelSignature = await Retell.sign(body, apiKey);
    await expect(Retell.verify(body, apiKey, clientLevelSignature)).resolves.toBe(true);
  });
});
