import { beforeEach, describe, expect, it, vi } from "vitest";

const { createClientMock, getSupabaseEnvMock } = vi.hoisted(() => ({
  createClientMock: vi.fn(),
  getSupabaseEnvMock: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@supabase/supabase-js", () => ({ createClient: createClientMock }));
vi.mock("@/lib/env/server", () => ({ getSupabaseEnv: getSupabaseEnvMock }));

describe("getSupabaseAdmin", () => {
  beforeEach(() => {
    vi.resetModules();
    createClientMock.mockReset();
    getSupabaseEnvMock.mockReset();
    getSupabaseEnvMock.mockReturnValue({
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SECRET_KEY: "sb_secret_test-only-value",
      SUPABASE_CV_BUCKET: "candidate-cvs",
    });
  });

  it("creates one client from validated server-only configuration", async () => {
    const client = { rpc: vi.fn() };
    createClientMock.mockReturnValue(client);
    const { getSupabaseAdmin } = await import("@/lib/supabase/admin");

    expect(getSupabaseAdmin()).toBe(client);
    expect(getSupabaseAdmin()).toBe(client);
    expect(getSupabaseEnvMock).toHaveBeenCalledTimes(1);
    expect(createClientMock).toHaveBeenCalledOnce();
    expect(createClientMock).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "sb_secret_test-only-value",
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
      },
    );
  });
});
