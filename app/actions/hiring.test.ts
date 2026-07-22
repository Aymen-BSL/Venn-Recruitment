import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitHiringEnquiry } from "@/app/actions/hiring";

const { attemptClickUpDeliveryMock, createHiringSubmissionMock, DuplicateSubmissionErrorMock, passesAntiSpamMock } = vi.hoisted(() => {
  class DuplicateSubmissionError extends Error {}
  return {
    createHiringSubmissionMock: vi.fn(),
    attemptClickUpDeliveryMock: vi.fn(),
    DuplicateSubmissionErrorMock: DuplicateSubmissionError,
    passesAntiSpamMock: vi.fn(),
  };
});

vi.mock("@/lib/forms/anti-spam", () => ({ passesAntiSpam: passesAntiSpamMock }));
vi.mock("@/lib/clickup/deliver", () => ({ attemptClickUpDelivery: attemptClickUpDeliveryMock }));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/submissions/repository", () => ({
  createHiringSubmission: createHiringSubmissionMock,
  DuplicateSubmissionError: DuplicateSubmissionErrorMock,
}));

const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";

function validHiringData() {
  const formData = new FormData();
  formData.set("requestId", requestId);
  formData.set("name", "Grace Hopper");
  formData.set("company", "Venn Labs");
  formData.set("email", "grace@example.com");
  formData.set("phone", "");
  formData.set("role", "Engineer");
  formData.set("location", "London");
  formData.set("timeline", "Within four weeks");
  formData.set("details", "We need an experienced engineer.");
  return formData;
}

describe("submitHiringEnquiry", () => {
  beforeEach(() => {
    passesAntiSpamMock.mockReset().mockReturnValue(true);
    createHiringSubmissionMock.mockReset();
    createHiringSubmissionMock.mockResolvedValue("bc6d66a7-af24-47f6-98e1-e925dfad0723");
    attemptClickUpDeliveryMock.mockReset().mockResolvedValue("sent");
  });

  it("returns field errors for invalid input", async () => {
    const formData = validHiringData();
    formData.set("company", "");

    const result = await submitHiringEnquiry({ status: "idle" }, formData);

    expect(result.status).toBe("validation_error");
    expect(result.status === "validation_error" && result.fieldErrors.company).toBeDefined();
    expect(createHiringSubmissionMock).not.toHaveBeenCalled();
  });

  it("persists valid input and normalizes an empty phone", async () => {
    await expect(submitHiringEnquiry({ status: "idle" }, validHiringData())).resolves.toEqual({
      status: "success",
      message: "Thank you. Your hiring enquiry has been received for review.",
    });
    expect(createHiringSubmissionMock).toHaveBeenCalledWith(expect.objectContaining({
      requestId,
      company: "Venn Labs",
      phone: undefined,
      consentedAt: expect.any(Date),
    }));
  });

  it("treats duplicate request IDs as success", async () => {
    createHiringSubmissionMock.mockRejectedValue(new DuplicateSubmissionErrorMock());

    await expect(submitHiringEnquiry({ status: "idle" }, validHiringData())).resolves.toMatchObject({
      status: "success",
    });
  });

  it("returns a generic server error", async () => {
    createHiringSubmissionMock.mockRejectedValue(new Error("sensitive database error"));

    await expect(submitHiringEnquiry({ status: "idle" }, validHiringData())).resolves.toEqual({
      status: "server_error",
      message: "We could not send your hiring enquiry. Please try again.",
    });
  });
});
