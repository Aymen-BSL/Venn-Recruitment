import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteExpiredSubmissionRows,
  getExpiredSubmissionBatch,
} from "@/lib/submissions/retention";

const { rpcMock } = vi.hoisted(() => ({ rpcMock: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/admin", () => ({ getSupabaseAdmin: () => ({ rpc: rpcMock }) }));

describe("retention repository", () => {
  beforeEach(() => rpcMock.mockReset());

  it("returns only validated expired-record metadata", async () => {
    const row = { submission_id: crypto.randomUUID(), cv_bucket: "candidate-cvs", cv_object_path: "request/cv.pdf" };
    rpcMock.mockResolvedValue({ data: [row], error: null });
    await expect(getExpiredSubmissionBatch()).resolves.toEqual([row]);
    expect(rpcMock).toHaveBeenCalledWith("get_expired_submission_batch", { p_limit: 100 });
  });

  it("deletes an explicit retry-safe ID set", async () => {
    const id = crypto.randomUUID();
    rpcMock.mockResolvedValue({ data: 1, error: null });
    await expect(deleteExpiredSubmissionRows([id])).resolves.toBe(1);
    expect(rpcMock).toHaveBeenCalledWith("delete_expired_submissions", { p_submission_ids: [id] });
  });

  it("sanitizes malformed responses and database errors", async () => {
    rpcMock.mockResolvedValue({ data: [{ submission_id: "bad" }], error: null });
    await expect(getExpiredSubmissionBatch()).rejects.toThrow("Unable to process retention records.");
    rpcMock.mockResolvedValue({ data: null, error: { message: "private detail" } });
    await expect(deleteExpiredSubmissionRows([crypto.randomUUID()])).rejects.not.toThrow("private detail");
  });
});
