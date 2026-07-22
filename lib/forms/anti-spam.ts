import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { getSupabaseEnv } from "@/lib/env/server";

const MIN_FORM_AGE_MS = 1_500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;

function signingKey(): Buffer {
  return createHmac("sha256", getSupabaseEnv().SUPABASE_SECRET_KEY)
    .update("venn-form-anti-spam-v1")
    .digest();
}

function signature(requestId: string, startedAt: number): string {
  return createHmac("sha256", signingKey())
    .update(`${requestId}:${startedAt}`)
    .digest("base64url");
}

export function createFormStartToken(requestId: string, now = Date.now()): string {
  return `${now}.${signature(requestId, now)}`;
}

export function passesAntiSpam(
  input: { honeypot: string; requestId: string; token: string },
  now = Date.now(),
): boolean {
  if (input.honeypot.trim()) return false;
  const [timestampText, supplied, extra] = input.token.split(".");
  const startedAt = Number(timestampText);
  if (extra !== undefined || !supplied || !Number.isSafeInteger(startedAt)) return false;
  const age = now - startedAt;
  if (age < MIN_FORM_AGE_MS || age > MAX_FORM_AGE_MS) return false;
  const expected = signature(input.requestId, startedAt);
  const suppliedBytes = Buffer.from(supplied);
  const expectedBytes = Buffer.from(expected);
  return suppliedBytes.length === expectedBytes.length
    && timingSafeEqual(suppliedBytes, expectedBytes);
}
