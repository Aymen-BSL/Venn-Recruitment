import "server-only";

import { z } from "zod";
import type {
  CandidateInput,
  ContactInput,
  CvMetadata,
  HiringInput,
} from "@/lib/forms/types";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type ConsentInput = {
  consentedAt: Date;
};

export type ContactSubmissionInput = ContactInput & ConsentInput;
export type HiringSubmissionInput = HiringInput & ConsentInput;
export type CandidateSubmissionInput = CandidateInput &
  ConsentInput & {
    cv: CvMetadata & {
      bucket: string;
      objectPath: string;
    };
  };

export class SubmissionPersistenceError extends Error {
  constructor() {
    super("Unable to save submission.");
    this.name = "SubmissionPersistenceError";
  }
}

async function persistSubmission(
  functionName: string,
  parameters: Record<string, string | number | null>,
): Promise<string> {
  const { data, error } = await getSupabaseAdmin().rpc(functionName, parameters);
  const parsedId = z.uuid().safeParse(data);

  if (error || !parsedId.success) {
    throw new SubmissionPersistenceError();
  }

  return parsedId.data;
}

export function createContactSubmission(input: ContactSubmissionInput): Promise<string> {
  return persistSubmission("create_contact_submission", {
    p_request_id: input.requestId,
    p_name: input.name,
    p_email: input.email,
    p_consented_at: input.consentedAt.toISOString(),
    p_message: input.message,
  });
}

export function createHiringSubmission(input: HiringSubmissionInput): Promise<string> {
  return persistSubmission("create_hiring_submission", {
    p_request_id: input.requestId,
    p_name: input.name,
    p_email: input.email,
    p_consented_at: input.consentedAt.toISOString(),
    p_company: input.company,
    p_phone: input.phone ?? null,
    p_role: input.role,
    p_location: input.location,
    p_timeline: input.timeline,
    p_details: input.details,
  });
}

export function createCandidateSubmission(input: CandidateSubmissionInput): Promise<string> {
  return persistSubmission("create_candidate_submission", {
    p_request_id: input.requestId,
    p_name: input.name,
    p_email: input.email,
    p_consented_at: input.consentedAt.toISOString(),
    p_phone: input.phone,
    p_location: input.location,
    p_preferred_role: input.preferredRole,
    p_preferred_location: input.preferredLocation,
    p_linkedin_url: input.linkedInUrl ?? null,
    p_note: input.note ?? null,
    p_cv_bucket: input.cv.bucket,
    p_cv_object_path: input.cv.objectPath,
    p_cv_original_name: input.cv.name,
    p_cv_mime_type: input.cv.type,
    p_cv_size: input.cv.size,
  });
}
