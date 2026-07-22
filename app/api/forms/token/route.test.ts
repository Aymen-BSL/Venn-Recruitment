import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/forms/token/route";

const { createFormStartToken } = vi.hoisted(() => ({ createFormStartToken: vi.fn(() => "timestamp.signature") }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/forms/anti-spam", () => ({ createFormStartToken }));

describe("form token endpoint", () => {
  beforeEach(() => createFormStartToken.mockClear());

  it("returns a non-cacheable token bound to a valid request ID", async () => {
    const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";
    const response = GET(new Request(`http://localhost/api/forms/token?requestId=${requestId}`));
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({ token: "timestamp.signature" });
    expect(createFormStartToken).toHaveBeenCalledWith(requestId);
  });

  it("rejects an invalid request ID", async () => {
    const response = GET(new Request("http://localhost/api/forms/token?requestId=invalid"));
    expect(response.status).toBe(400);
    expect(createFormStartToken).not.toHaveBeenCalled();
  });
});
