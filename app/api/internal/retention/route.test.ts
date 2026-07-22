import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/internal/retention/route";

const mocks = vi.hoisted(() => ({
  deleteCvObject: vi.fn(),
  deleteExpiredSubmissionRows: vi.fn(),
  getExpiredSubmissionBatch: vi.fn(),
}));

vi.mock("@/lib/env/server", () => ({
  getRetentionEnv: () => ({ RETENTION_MAINTENANCE_SECRET: "retention-secret-at-least-32-characters" }),
}));
vi.mock("@/lib/storage/cv-storage", () => ({ deleteCvObject: mocks.deleteCvObject }));
vi.mock("@/lib/submissions/retention", () => ({
  deleteExpiredSubmissionRows: mocks.deleteExpiredSubmissionRows,
  getExpiredSubmissionBatch: mocks.getExpiredSubmissionBatch,
}));

const endpoint = "http://localhost/api/internal/retention";
const authorization = { Authorization: "Bearer retention-secret-at-least-32-characters" };

describe("retention maintenance endpoint", () => {
  beforeEach(() => {
    mocks.deleteCvObject.mockReset().mockResolvedValue(true);
    mocks.deleteExpiredSubmissionRows.mockReset().mockResolvedValue(2);
    mocks.getExpiredSubmissionBatch.mockReset().mockResolvedValue([
      { submission_id: "10000000-0000-4000-8000-000000000001", cv_bucket: null, cv_object_path: null },
      { submission_id: "10000000-0000-4000-8000-000000000002", cv_bucket: "candidate-cvs", cv_object_path: "request/cv.pdf" },
    ]);
  });

  it("rejects missing and incorrect secrets", async () => {
    expect((await POST(new Request(endpoint, { method: "POST" }))).status).toBe(401);
    expect((await POST(new Request(endpoint, { method: "POST", headers: { Authorization: "Bearer wrong" } }))).status).toBe(401);
    expect(mocks.getExpiredSubmissionBatch).not.toHaveBeenCalled();
  });

  it("deletes CV objects before their database rows", async () => {
    const response = await POST(new Request(endpoint, { method: "POST", headers: authorization }));
    await expect(response.json()).resolves.toEqual({ examined: 2, deleted: 2, deferred: 0 });
    expect(mocks.deleteCvObject).toHaveBeenCalledWith("candidate-cvs", "request/cv.pdf");
    expect(mocks.deleteExpiredSubmissionRows).toHaveBeenCalledWith([
      "10000000-0000-4000-8000-000000000001",
      "10000000-0000-4000-8000-000000000002",
    ]);
    expect(mocks.deleteCvObject.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.deleteExpiredSubmissionRows.mock.invocationCallOrder[0],
    );
  });

  it("defers a candidate row when object deletion fails", async () => {
    mocks.deleteCvObject.mockResolvedValue(false);
    mocks.deleteExpiredSubmissionRows.mockResolvedValue(1);
    const response = await POST(new Request(endpoint, { method: "POST", headers: authorization }));
    await expect(response.json()).resolves.toEqual({ examined: 2, deleted: 1, deferred: 1 });
    expect(mocks.deleteExpiredSubmissionRows).toHaveBeenCalledWith([
      "10000000-0000-4000-8000-000000000001",
    ]);
  });

  it("returns no PII when maintenance fails", async () => {
    mocks.getExpiredSubmissionBatch.mockRejectedValue(new Error("private row details"));
    const response = await POST(new Request(endpoint, { method: "POST", headers: authorization }));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: "Retention maintenance failed." });
  });
});
