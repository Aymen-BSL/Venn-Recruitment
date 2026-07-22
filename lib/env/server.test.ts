import { describe, expect, it } from "vitest";
import { parseServerEnv, parseSupabaseEnv } from "@/lib/env/server";

const validEnv = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SECRET_KEY: "sb_secret_a-secure-server-key",
  SUPABASE_CV_BUCKET: "candidate-cvs",
  CLICKUP_API_TOKEN: "pk_12345678901234567890",
  CLICKUP_CONTACT_LIST_ID: "123456789",
  CLICKUP_CANDIDATE_LIST_ID: "234567890",
  CLICKUP_HIRING_LIST_ID: "345678901",
  CLICKUP_RETRY_SECRET: "a-random-secret-that-is-at-least-32-characters",
};

describe("parseServerEnv", () => {
  it("returns typed server configuration", () => {
    expect(parseServerEnv(validEnv)).toEqual(validEnv);
  });

  it.each(Object.keys(validEnv))("rejects a missing %s", (key) => {
    const env = { ...validEnv };
    delete env[key as keyof typeof env];

    expect(() => parseServerEnv(env)).toThrow(/Invalid server environment/);
  });

  it("rejects malformed URLs, list IDs, bucket names, and short secrets", () => {
    expect(() => parseServerEnv({ ...validEnv, SUPABASE_URL: "not-a-url" })).toThrow();
    expect(() => parseServerEnv({ ...validEnv, CLICKUP_CONTACT_LIST_ID: "list-one" })).toThrow();
    expect(() => parseServerEnv({ ...validEnv, SUPABASE_CV_BUCKET: "Candidate CVs" })).toThrow();
    expect(() => parseServerEnv({ ...validEnv, CLICKUP_RETRY_SECRET: "too-short" })).toThrow();
  });

  it("does not accept public aliases for secrets", () => {
    const withoutServiceKey: Record<string, string> = { ...validEnv };
    delete withoutServiceKey.SUPABASE_SECRET_KEY;

    expect(() => parseServerEnv({
      ...withoutServiceKey,
      NEXT_PUBLIC_SUPABASE_SECRET_KEY: validEnv.SUPABASE_SECRET_KEY,
    })).toThrow(/SUPABASE_SECRET_KEY/);
  });

  it("validates Supabase without requiring future ClickUp configuration", () => {
    const supabaseOnly = {
      SUPABASE_URL: validEnv.SUPABASE_URL,
      SUPABASE_SECRET_KEY: validEnv.SUPABASE_SECRET_KEY,
      SUPABASE_CV_BUCKET: validEnv.SUPABASE_CV_BUCKET,
    };

    expect(parseSupabaseEnv(supabaseOnly)).toEqual(supabaseOnly);
  });

  it("temporarily accepts the previous server-only Supabase key name", () => {
    expect(parseSupabaseEnv({
      SUPABASE_URL: validEnv.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: validEnv.SUPABASE_SECRET_KEY,
      SUPABASE_CV_BUCKET: validEnv.SUPABASE_CV_BUCKET,
    })).toEqual({
      SUPABASE_URL: validEnv.SUPABASE_URL,
      SUPABASE_SECRET_KEY: validEnv.SUPABASE_SECRET_KEY,
      SUPABASE_CV_BUCKET: validEnv.SUPABASE_CV_BUCKET,
    });
  });
});
