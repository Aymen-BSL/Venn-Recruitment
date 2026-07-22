import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createCandidateSubmission,
  createContactSubmission,
  createHiringSubmission,
  DuplicateSubmissionError,
} from "@/lib/submissions/repository";

const { rpcMock } = vi.hoisted(() => ({ rpcMock: vi.fn() }));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/admin", () => ({
  getSupabaseAdmin: () => ({ rpc: rpcMock }),
}));

const submissionId = "bc6d66a7-af24-47f6-98e1-e925dfad0723";
const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";
const consentedAt = new Date("2026-07-22T10:00:00.000Z");

describe("submission repository", () => {
  beforeEach(() => {
    rpcMock.mockReset();
    rpcMock.mockResolvedValue({ data: submissionId, error: null });
  });

  it("creates a contact submission transactionally and returns only its ID", async () => {
    const result = await createContactSubmission({
      requestId,
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please contact me.",
      consentedAt,
    });

    expect(result).toBe(submissionId);
    expect(rpcMock).toHaveBeenCalledWith("create_contact_submission", {
      p_consented_at: consentedAt.toISOString(),
      p_email: "ada@example.com",
      p_message: "Please contact me.",
      p_name: "Ada Lovelace",
      p_request_id: requestId,
    });
  });

  it("creates a hiring submission with an optional phone", async () => {
    const result = await createHiringSubmission({
      requestId,
      name: "Grace Hopper",
      company: "Venn Labs",
      email: "grace@example.com",
      phone: undefined,
      role: "Engineer",
      location: "London",
      timeline: "Within four weeks",
      details: "An experienced engineer is required.",
      consentedAt,
    });

    expect(result).toBe(submissionId);
    expect(rpcMock).toHaveBeenCalledWith("create_hiring_submission", expect.objectContaining({
      p_company: "Venn Labs",
      p_phone: null,
      p_role: "Engineer",
    }));
  });

  it("creates a candidate submission with private CV metadata", async () => {
    const result = await createCandidateSubmission({
      requestId,
      name: "Katherine Johnson",
      email: "katherine@example.com",
      phone: "+1 555 0100",
      location: "Hampton, VA",
      preferredRole: "Mathematician",
      preferredLocation: "Remote",
      linkedInUrl: undefined,
      note: "Interested in aerospace roles.",
      consentedAt,
      cv: {
        bucket: "candidate-cvs",
        objectPath: `${submissionId}/cv.pdf`,
        name: "candidate.pdf",
        type: "application/pdf",
        size: 1024,
      },
    });

    expect(result).toBe(submissionId);
    expect(rpcMock).toHaveBeenCalledWith("create_candidate_submission", expect.objectContaining({
      p_cv_bucket: "candidate-cvs",
      p_cv_mime_type: "application/pdf",
      p_cv_object_path: `${submissionId}/cv.pdf`,
      p_cv_original_name: "candidate.pdf",
      p_cv_size: 1024,
      p_linkedin_url: null,
    }));
  });

  it("sanitizes database errors", async () => {
    rpcMock.mockResolvedValue({
      data: null,
      error: { code: "XX000", message: "sensitive database details" },
    });

    const promise = createContactSubmission({
      requestId,
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please contact me.",
      consentedAt,
    });

    await expect(promise).rejects.toThrow("Unable to save submission.");
    await expect(promise).rejects.not.toThrow("sensitive database details");
  });

  it("identifies duplicate request IDs without exposing database details", async () => {
    rpcMock.mockResolvedValue({
      data: null,
      error: { code: "23505", message: "submissions_request_id_key contains sensitive values" },
    });

    await expect(createContactSubmission({
      requestId,
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please contact me.",
      consentedAt,
    })).rejects.toBeInstanceOf(DuplicateSubmissionError);
  });

  it("rejects malformed database responses without exposing them", async () => {
    rpcMock.mockResolvedValue({ data: "not-a-uuid", error: null });

    await expect(createContactSubmission({
      requestId,
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please contact me.",
      consentedAt,
    })).rejects.toThrow("Unable to save submission.");
  });
});
