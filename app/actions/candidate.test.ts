import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitCandidate } from "@/app/actions/candidate";

const mocks = vi.hoisted(() => {
  class CvValidationError extends Error {}
  class DuplicateSubmissionError extends Error {}
  return {
    createCandidateSubmission: vi.fn(),
    deleteCvObject: vi.fn(),
    uploadCv: vi.fn(),
    validateCv: vi.fn(),
    CvValidationError,
    DuplicateSubmissionError,
    passesAntiSpam: vi.fn(),
    attemptClickUpDelivery: vi.fn(),
  };
});

vi.mock("server-only", () => ({}));
vi.mock("@/lib/forms/anti-spam", () => ({ passesAntiSpam: mocks.passesAntiSpam }));
vi.mock("@/lib/clickup/deliver", () => ({ attemptClickUpDelivery: mocks.attemptClickUpDelivery }));
vi.mock("@/lib/storage/validate-cv", () => ({
  validateCv: mocks.validateCv,
  CvValidationError: mocks.CvValidationError,
}));
vi.mock("@/lib/storage/cv-storage", () => ({
  uploadCv: mocks.uploadCv,
  deleteCvObject: mocks.deleteCvObject,
}));
vi.mock("@/lib/submissions/repository", () => ({
  createCandidateSubmission: mocks.createCandidateSubmission,
  DuplicateSubmissionError: mocks.DuplicateSubmissionError,
}));

const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";
const pdfType = "application/pdf";

function validCandidateData() {
  const formData = new FormData();
  formData.set("requestId", requestId);
  formData.set("name", "Katherine Johnson");
  formData.set("email", "katherine@example.com");
  formData.set("phone", "+1 555 0100");
  formData.set("location", "Hampton, VA");
  formData.set("preferredRole", "Mathematician");
  formData.set("preferredLocation", "Remote");
  formData.set("linkedInUrl", "");
  formData.set("note", "Interested in aerospace roles.");
  formData.set("cv", new File(["pdf"], "candidate.pdf", { type: pdfType }));
  return formData;
}

describe("submitCandidate", () => {
  beforeEach(() => {
    mocks.passesAntiSpam.mockReset().mockReturnValue(true);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.validateCv.mockReset().mockResolvedValue({
      bytes: new Uint8Array([1, 2, 3]), extension: "pdf", name: "candidate.pdf", size: 3, type: pdfType,
    });
    mocks.uploadCv.mockReset().mockResolvedValue({ bucket: "candidate-cvs", objectPath: `${requestId}/random.pdf` });
    mocks.deleteCvObject.mockReset().mockResolvedValue(true);
    mocks.createCandidateSubmission.mockReset().mockResolvedValue("bc6d66a7-af24-47f6-98e1-e925dfad0723");
    mocks.attemptClickUpDelivery.mockReset().mockResolvedValue("sent");
  });

  it("returns scalar field errors without inspecting the file", async () => {
    const formData = validCandidateData();
    formData.set("email", "invalid");

    const result = await submitCandidate({ status: "idle" }, formData);

    expect(result.status).toBe("validation_error");
    expect(result.status === "validation_error" && result.fieldErrors.email).toBeDefined();
    expect(mocks.validateCv).not.toHaveBeenCalled();
  });

  it("returns a CV field error for missing or invalid files", async () => {
    const missing = validCandidateData();
    missing.delete("cv");
    await expect(submitCandidate({ status: "idle" }, missing)).resolves.toMatchObject({
      status: "validation_error", fieldErrors: { cv: ["Upload your CV."] },
    });

    mocks.validateCv.mockRejectedValue(new mocks.CvValidationError("The CV file contents do not match its type."));
    await expect(submitCandidate({ status: "idle" }, validCandidateData())).resolves.toMatchObject({
      status: "validation_error",
      fieldErrors: { cv: ["The CV file contents do not match its type."] },
    });
    expect(mocks.uploadCv).not.toHaveBeenCalled();
    expect(mocks.createCandidateSubmission).not.toHaveBeenCalled();
  });

  it("uploads privately and persists normalized metadata", async () => {
    await expect(submitCandidate({ status: "idle" }, validCandidateData())).resolves.toEqual({
      status: "success", message: "Thank you. Your profile has been received for review.",
    });
    expect(mocks.uploadCv).toHaveBeenCalledWith(requestId, expect.objectContaining({ extension: "pdf" }));
    expect(mocks.createCandidateSubmission).toHaveBeenCalledWith(expect.objectContaining({
      requestId,
      linkedInUrl: undefined,
      consentedAt: expect.any(Date),
      cv: {
        bucket: "candidate-cvs", objectPath: `${requestId}/random.pdf`,
        name: "candidate.pdf", size: 3, type: pdfType,
      },
    }));
  });

  it("returns a safe error when upload fails", async () => {
    mocks.uploadCv.mockRejectedValue(new Error("private provider details"));

    await expect(submitCandidate({ status: "idle" }, validCandidateData())).resolves.toEqual({
      status: "server_error", message: "We could not submit your CV. Please try again.",
    });
    expect(mocks.createCandidateSubmission).not.toHaveBeenCalled();
  });

  it("deletes the object when database persistence fails", async () => {
    mocks.createCandidateSubmission.mockRejectedValue(new Error("database detail"));

    await expect(submitCandidate({ status: "idle" }, validCandidateData())).resolves.toMatchObject({ status: "server_error" });
    expect(mocks.deleteCvObject).toHaveBeenCalledWith("candidate-cvs", `${requestId}/random.pdf`);
    expect(console.error).toHaveBeenCalledWith("Candidate submission failed.", { correlationId: requestId });
  });

  it("cleans up a replay upload and treats a duplicate request as success", async () => {
    mocks.createCandidateSubmission.mockRejectedValue(new mocks.DuplicateSubmissionError());

    await expect(submitCandidate({ status: "idle" }, validCandidateData())).resolves.toMatchObject({ status: "success" });
    expect(mocks.deleteCvObject).toHaveBeenCalledWith("candidate-cvs", `${requestId}/random.pdf`);
  });
});
