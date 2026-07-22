import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/internal/clickup/retry/route";

const retry = vi.hoisted(() => vi.fn());
vi.mock("server-only", () => ({}));
vi.mock("@/lib/clickup/deliver", () => ({ retryDueClickUpDeliveries: retry }));
vi.mock("@/lib/env/server", () => ({ getClickUpEnv: () => ({ CLICKUP_RETRY_SECRET: "clickup-secret-at-least-32-characters" }) }));

const endpoint = "http://localhost/api/internal/clickup/retry";
const auth = { Authorization: "Bearer clickup-secret-at-least-32-characters" };

describe("ClickUp retry endpoint", () => {
  beforeEach(() => retry.mockReset().mockResolvedValue({ examined: 2, sent: 1, failed: 1 }));

  it("rejects missing or wrong credentials", async () => {
    expect((await POST(new Request(endpoint, { method: "POST" }))).status).toBe(401);
    expect((await POST(new Request(endpoint, { method: "POST", headers: { Authorization: "Bearer wrong" } }))).status).toBe(401);
    expect(retry).not.toHaveBeenCalled();
  });

  it("processes a bounded batch without returning submission data", async () => {
    const response = await POST(new Request(endpoint, { method: "POST", headers: auth }));
    await expect(response.json()).resolves.toEqual({ examined: 2, sent: 1, failed: 1 });
    expect(retry).toHaveBeenCalledWith(10);
  });

  it("returns a safe failure", async () => {
    retry.mockImplementationOnce(() => { throw new Error("private submission"); });
    const response = await POST(new Request(endpoint, { method: "POST", headers: auth }));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: "ClickUp retry failed." });
  });
});
