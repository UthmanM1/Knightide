import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, randomInt } from "crypto";

// Member keys: KND-XXXX-XXXX. Stored as an HMAC hash (for verification) plus an
// AES-256-GCM encrypted copy (only so the owner can see it once on /success and
// in their email). The encrypted copy is deleted as soon as the key is used.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

function secret() {
  const s = process.env.MEMBER_KEY_SECRET;
  if (!s || s.length < 16) throw new Error("MEMBER_KEY_SECRET must be set (16+ characters)");
  return s;
}

export function generateKey() {
  const part = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `KND-${part()}-${part()}`;
}

export function normaliseKey(input: string) {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function hashKey(key: string) {
  return createHmac("sha256", secret()).update(normaliseKey(key)).digest("hex");
}

function aesKey() {
  return createHash("sha256").update(`enc:${secret()}`).digest();
}

export function encryptKey(key: string) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", aesKey(), iv);
  const enc = Buffer.concat([c.update(key, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), enc]).toString("base64");
}

export function decryptKey(blob: string) {
  const buf = Buffer.from(blob, "base64");
  const d = createDecipheriv("aes-256-gcm", aesKey(), buf.subarray(0, 12));
  d.setAuthTag(buf.subarray(12, 28));
  return Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString("utf8");
}
