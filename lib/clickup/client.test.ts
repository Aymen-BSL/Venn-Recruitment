import { describe, expect, it, vi } from "vitest";
import { ClickUpError, createClickUpTask, sendClickUpChatMessage } from "@/lib/clickup/client";

vi.mock("server-only", () => ({}));

describe("ClickUp client", () => {
  it("creates a task with server authorization", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "task-1" }), { status: 200 }));
    await expect(createClickUpTask("pk_token", { listId: "123", name: "Task", description: "Safe" }, fetcher)).resolves.toBe("task-1");
    expect(fetcher).toHaveBeenCalledWith("https://api.clickup.com/api/v2/list/123/task", expect.objectContaining({
      method: "POST",
      headers: { Authorization: "pk_token", "Content-Type": "application/json" },
    }));
  });

  it("sends a chat message through the v3 endpoint", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "message-1" }), { status: 201 }));
    await expect(sendClickUpChatMessage("pk_token", "42", "channel", "Hello", fetcher)).resolves.toBe("message-1");
    expect(fetcher.mock.calls[0][0]).toContain("/api/v3/workspaces/42/chat/channels/channel/messages");
  });

  it("marks rate limits and network failures as retryable", async () => {
    const limited = vi.fn().mockResolvedValue(new Response("limited", { status: 429 }));
    await expect(createClickUpTask("pk", { listId: "1", name: "x", description: "x" }, limited)).rejects.toMatchObject({ retryable: true });
    const offline = vi.fn().mockRejectedValue(new Error("secret network details"));
    await expect(createClickUpTask("pk", { listId: "1", name: "x", description: "x" }, offline)).rejects.toEqual(expect.any(ClickUpError));
  });

  it("aborts a request after the bounded timeout", async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn((_url: string | URL | Request, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    }));
    const request = createClickUpTask("pk", { listId: "1", name: "x", description: "x" }, fetcher);
    const rejection = expect(request).rejects.toMatchObject({ retryable: true });
    await vi.advanceTimersByTimeAsync(8_001);
    await rejection;
    vi.useRealTimers();
  });

  it("retries correctable authorization errors and sanitizes the response", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("token leaked", { status: 401 }));
    await expect(createClickUpTask("pk", { listId: "1", name: "x", description: "x" }, fetcher)).rejects.toMatchObject({
      message: "ClickUp request failed (401).",
      retryable: true,
    });
  });

  it("marks invalid requests as permanent", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("private details", { status: 400 }));
    await expect(createClickUpTask("pk", { listId: "1", name: "x", description: "x" }, fetcher)).rejects.toMatchObject({
      message: "ClickUp request failed (400).",
      retryable: false,
    });
  });

  it("rejects invalid success responses", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("not-json", { status: 200 }));
    await expect(createClickUpTask("pk", { listId: "1", name: "x", description: "x" }, fetcher)).rejects.toMatchObject({ retryable: true });
  });
});
