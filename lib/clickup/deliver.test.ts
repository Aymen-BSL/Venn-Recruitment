import { beforeEach, describe, expect, it, vi } from "vitest";
import { attemptClickUpDelivery, retryDueClickUpDeliveries } from "@/lib/clickup/deliver";
import { ClickUpError } from "@/lib/clickup/client";

const mocks = vi.hoisted(() => ({
  rpc: vi.fn(),
  createTask: vi.fn(),
  sendChat: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/admin", () => ({ getSupabaseAdmin: () => ({ rpc: mocks.rpc }) }));
vi.mock("@/lib/env/server", () => ({ getClickUpEnv: () => ({
  CLICKUP_API_TOKEN: "pk_token",
  CLICKUP_CONTACT_LIST_ID: "1",
  CLICKUP_CANDIDATE_LIST_ID: "2",
  CLICKUP_HIRING_LIST_ID: "3",
  CLICKUP_WORKSPACE_ID: "42",
  CLICKUP_CHAT_CHANNEL_ID: "channel",
}) }));
vi.mock("@/lib/clickup/client", async (original) => {
  const actual = await original<typeof import("@/lib/clickup/client")>();
  return { ...actual, createClickUpTask: mocks.createTask, sendClickUpChatMessage: mocks.sendChat };
});

const claim = {
  submission_id: "10000000-0000-4000-8000-000000000001",
  kind: "contact",
  name: "Ada Lovelace",
  email: "ada@example.com",
  created_at: "2026-07-22T12:00:00.000Z",
  clickup_task_id: null,
  clickup_chat_message_id: null,
  message: "Hello",
  phone: null,
  current_location: null,
  preferred_role: null,
  preferred_location: null,
  linkedin_url: null,
  note: null,
  company: null,
  role: null,
  location: null,
  timeline: null,
  details: null,
};

describe("durable ClickUp delivery", () => {
  beforeEach(() => {
    mocks.rpc.mockReset().mockResolvedValue({ data: null, error: null });
    mocks.createTask.mockReset().mockResolvedValue("task-1");
    mocks.sendChat.mockReset().mockResolvedValue("message-1");
  });

  it("creates and checkpoints a task and chat message", async () => {
    mocks.rpc.mockResolvedValueOnce({ data: claim, error: null });
    await expect(attemptClickUpDelivery(claim.submission_id)).resolves.toBe("sent");
    expect(mocks.rpc.mock.calls.map(([name]) => name)).toEqual([
      "claim_clickup_delivery",
      "record_clickup_task",
      "record_clickup_chat_message",
      "complete_clickup_delivery",
    ]);
  });

  it("resumes at chat without duplicating a checkpointed task", async () => {
    mocks.rpc.mockResolvedValueOnce({ data: { ...claim, clickup_task_id: "task-existing" }, error: null });
    await expect(attemptClickUpDelivery(claim.submission_id)).resolves.toBe("sent");
    expect(mocks.createTask).not.toHaveBeenCalled();
    expect(mocks.sendChat).toHaveBeenCalledWith("pk_token", "42", "channel", expect.stringContaining("task-existing"));
  });

  it("records retryable failures without leaking response bodies", async () => {
    mocks.rpc.mockResolvedValueOnce({ data: claim, error: null });
    mocks.createTask.mockRejectedValue(new ClickUpError("ClickUp request failed (429).", true));
    await expect(attemptClickUpDelivery(claim.submission_id)).resolves.toBe("failed");
    expect(mocks.rpc).toHaveBeenLastCalledWith("fail_clickup_delivery", {
      p_submission_id: claim.submission_id,
      p_error: "ClickUp request failed (429).",
      p_retryable: true,
    });
  });

  it("skips a delivery that another worker already claimed", async () => {
    mocks.rpc.mockResolvedValueOnce({ data: null, error: null });
    await expect(attemptClickUpDelivery(claim.submission_id)).resolves.toBe("skipped");
  });

  it("retries only the bounded claims returned by the database", async () => {
    mocks.rpc.mockResolvedValueOnce({ data: [claim, { ...claim, submission_id: "20000000-0000-4000-8000-000000000002" }], error: null });
    await expect(retryDueClickUpDeliveries(10)).resolves.toEqual({ examined: 2, sent: 2, failed: 0 });
    expect(mocks.rpc).toHaveBeenNthCalledWith(1, "claim_due_clickup_deliveries", { p_limit: 10 });
  });
});
