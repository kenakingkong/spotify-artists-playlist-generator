/**
 * PKCE
 * https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 */

import crypto from "crypto";

const CODE_CHALLENGE_METHOD = "S256";

function sha256(plain: string): ArrayBuffer {
  const hash = crypto.createHash("sha256").update(plain).digest();
  return hash.buffer.slice(
    hash.byteOffset,
    hash.byteOffset + hash.byteLength
  ) as ArrayBuffer;
}

function base64encode(input: ArrayBuffer | Buffer) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function generateCodeChallenge(codeVerifier: string) {
  const hashed = sha256(codeVerifier);
  return base64encode(hashed);
}

function generateRandomString(length: number = 64) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

export { CODE_CHALLENGE_METHOD, generateCodeChallenge, generateRandomString };
