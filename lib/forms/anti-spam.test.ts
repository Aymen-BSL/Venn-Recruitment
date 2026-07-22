import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFormStartToken, passesAntiSpam } from "@/lib/forms/anti-spam";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/env/server", () => ({
  getSupabaseEnv: () => ({ SUPABASE_SECRET_KEY: "sb_secret_test-only-signing-key" }),
}));

const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";
const now = Date.parse("2026-07-22T12:00:00.000Z");

describe("form anti-spam", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("accepts a normally completed signed form", () => {
    const token = createFormStartToken(requestId, now - 10_000);
    expect(passesAntiSpam({ honeypot: "", requestId, token }, now)).toBe(true);
  });

  it("rejects a filled honeypot", () => {
    const token = createFormStartToken(requestId, now - 10_000);
    expect(passesAntiSpam({ honeypot: "https://spam.test", requestId, token }, now)).toBe(false);
  });

  it("rejects implausibly fast submissions", () => {
    const token = createFormStartToken(requestId, now - 500);
    expect(passesAntiSpam({ honeypot: "", requestId, token }, now)).toBe(false);
  });

  it("rejects expired, altered, and request-mismatched tokens", () => {
    const expired = createFormStartToken(requestId, now - 24 * 60 * 60 * 1_000 - 1);
    const valid = createFormStartToken(requestId, now - 10_000);
    expect(passesAntiSpam({ honeypot: "", requestId, token: expired }, now)).toBe(false);
    expect(passesAntiSpam({ honeypot: "", requestId, token: `${valid}x` }, now)).toBe(false);
    expect(passesAntiSpam({ honeypot: "", requestId: crypto.randomUUID(), token: valid }, now)).toBe(false);
  });
});
