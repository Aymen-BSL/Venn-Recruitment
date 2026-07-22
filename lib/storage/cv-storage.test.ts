import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteCvObject, uploadCv } from "@/lib/storage/cv-storage";
import type { ValidatedCv } from "@/lib/storage/validate-cv";

const { fromMock, getSupabaseAdminMock, getSupabaseEnvMock, removeMock, uploadMock } = vi.hoisted(() => ({
  fromMock: vi.fn(),
  getSupabaseAdminMock: vi.fn(),
  getSupabaseEnvMock: vi.fn(),
  removeMock: vi.fn(),
  uploadMock: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/admin", () => ({ getSupabaseAdmin: getSupabaseAdminMock }));
vi.mock("@/lib/env/server", () => ({ getSupabaseEnv: getSupabaseEnvMock }));

const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";
const validatedCv: ValidatedCv = {
  bytes: new Uint8Array([0x25, 0x50, 0x44, 0x46]),
  extension: "pdf",
  name: "candidate.pdf",
  size: 4,
  type: "application/pdf",
};

describe("CV storage", () => {
  beforeEach(() => {
    vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "887b7bd6-a089-49f9-8dac-e4cf9b78e776") });
    uploadMock.mockReset().mockResolvedValue({ data: { path: "stored" }, error: null });
    removeMock.mockReset().mockResolvedValue({ data: [], error: null });
    fromMock.mockReset().mockReturnValue({ upload: uploadMock, remove: removeMock });
    getSupabaseAdminMock.mockReset().mockReturnValue({ storage: { from: fromMock } });
    getSupabaseEnvMock.mockReset().mockReturnValue({ SUPABASE_CV_BUCKET: "candidate-cvs" });
  });

  it("uploads to an unguessable request-scoped path without overwriting", async () => {
    await expect(uploadCv(requestId, validatedCv)).resolves.toEqual({
      bucket: "candidate-cvs",
      objectPath: `${requestId}/887b7bd6-a089-49f9-8dac-e4cf9b78e776.pdf`,
    });
    expect(uploadMock).toHaveBeenCalledWith(
      `${requestId}/887b7bd6-a089-49f9-8dac-e4cf9b78e776.pdf`,
      validatedCv.bytes,
      { cacheControl: "3600", contentType: "application/pdf", upsert: false },
    );
  });

  it("returns a sanitized upload failure", async () => {
    uploadMock.mockResolvedValue({ data: null, error: { message: "private provider detail" } });

    await expect(uploadCv(requestId, validatedCv)).rejects.toThrow("Unable to store CV.");
    await expect(uploadCv(requestId, validatedCv)).rejects.not.toThrow("private provider detail");
  });

  it("sanitizes exceptions thrown by the storage provider", async () => {
    uploadMock.mockRejectedValue(new Error("private network detail"));

    await expect(uploadCv(requestId, validatedCv)).rejects.toThrow("Unable to store CV.");
    await expect(uploadCv(requestId, validatedCv)).rejects.not.toThrow("private network detail");
  });

  it("deletes an uploaded object for rollback", async () => {
    await expect(deleteCvObject("candidate-cvs", "request/file.pdf")).resolves.toBe(true);
    expect(fromMock).toHaveBeenCalledWith("candidate-cvs");
    expect(removeMock).toHaveBeenCalledWith(["request/file.pdf"]);
  });

  it("makes rollback deletion best effort", async () => {
    removeMock.mockResolvedValue({ data: null, error: { message: "provider detail" } });

    await expect(deleteCvObject("candidate-cvs", "request/file.pdf")).resolves.toBe(false);
  });
});
