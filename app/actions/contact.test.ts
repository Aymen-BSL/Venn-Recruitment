import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "@/app/actions/contact";

const { attemptClickUpDeliveryMock, createContactSubmissionMock, DuplicateSubmissionErrorMock, passesAntiSpamMock } = vi.hoisted(() => {
  class DuplicateSubmissionError extends Error {}
  return {
    createContactSubmissionMock: vi.fn(),
    attemptClickUpDeliveryMock: vi.fn(),
    DuplicateSubmissionErrorMock: DuplicateSubmissionError,
    passesAntiSpamMock: vi.fn(),
  };
});

vi.mock("@/lib/forms/anti-spam", () => ({ passesAntiSpam: passesAntiSpamMock }));
vi.mock("@/lib/clickup/deliver", () => ({ attemptClickUpDelivery: attemptClickUpDeliveryMock }));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/submissions/repository", () => ({
  createContactSubmission: createContactSubmissionMock,
  DuplicateSubmissionError: DuplicateSubmissionErrorMock,
}));

const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";

function validContactData() {
  const formData = new FormData();
  formData.set("requestId", requestId);
  formData.set("name", " Ada Lovelace ");
  formData.set("email", " ADA@EXAMPLE.COM ");
  formData.set("message", " Please contact me. ");
  return formData;
}

describe("submitContact", () => {
  beforeEach(() => {
    passesAntiSpamMock.mockReset().mockReturnValue(true);
    createContactSubmissionMock.mockReset();
    createContactSubmissionMock.mockResolvedValue("bc6d66a7-af24-47f6-98e1-e925dfad0723");
    attemptClickUpDeliveryMock.mockReset().mockResolvedValue("sent");
  });

  it("returns field errors without persisting invalid input", async () => {
    const formData = validContactData();
    formData.set("email", "invalid");

    const result = await submitContact({ status: "idle" }, formData);

    expect(result.status).toBe("validation_error");
    expect(result.status === "validation_error" && result.fieldErrors.email).toBeDefined();
    expect(createContactSubmissionMock).not.toHaveBeenCalled();
  });

  it("rejects failed anti-spam checks without persisting", async () => {
    passesAntiSpamMock.mockReturnValue(false);

    await expect(submitContact({ status: "idle" }, validContactData())).resolves.toMatchObject({
      status: "server_error",
    });
    expect(createContactSubmissionMock).not.toHaveBeenCalled();
  });

  it("normalizes and persists a valid submission", async () => {
    const before = Date.now();
    const result = await submitContact({ status: "idle" }, validContactData());

    expect(result).toEqual({
      status: "success",
      message: "Thank you. Your enquiry has been received.",
    });
    expect(createContactSubmissionMock).toHaveBeenCalledWith({
      requestId,
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please contact me.",
      consentedAt: expect.any(Date),
    });
    expect(createContactSubmissionMock.mock.calls[0][0].consentedAt.getTime()).toBeGreaterThanOrEqual(before);
  });

  it("treats a duplicate request ID as an idempotent success", async () => {
    createContactSubmissionMock.mockRejectedValue(new DuplicateSubmissionErrorMock());

    await expect(submitContact({ status: "idle" }, validContactData())).resolves.toEqual({
      status: "success",
      message: "Thank you. Your enquiry has been received.",
    });
  });

  it("returns a safe response for unexpected failures", async () => {
    createContactSubmissionMock.mockRejectedValue(new Error("database credentials leaked"));

    await expect(submitContact({ status: "idle" }, validContactData())).resolves.toEqual({
      status: "server_error",
      message: "We could not send your enquiry. Please try again.",
    });
  });
});
