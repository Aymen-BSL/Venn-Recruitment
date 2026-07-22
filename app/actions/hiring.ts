"use server";

import type { FormActionState } from "@/lib/forms/action-state";
import { InvalidFormDataError, readStringFields } from "@/lib/forms/form-data";
import { hiringSchema } from "@/lib/forms/schemas";
import {
  createHiringSubmission,
  DuplicateSubmissionError,
} from "@/lib/submissions/repository";

const hiringFields = [
  "requestId",
  "name",
  "company",
  "email",
  "phone",
  "role",
  "location",
  "timeline",
  "details",
] as const;
const successState = {
  status: "success",
  message: "Thank you. Your hiring enquiry has been received for review.",
} as const;

export async function submitHiringEnquiry(
  _previousState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  let values: Record<(typeof hiringFields)[number], string>;
  try {
    values = readStringFields(formData, hiringFields);
  } catch (error) {
    if (error instanceof InvalidFormDataError) {
      return {
        status: "validation_error",
        message: "Check the form and try again.",
        fieldErrors: {},
      };
    }
    return {
      status: "server_error",
      message: "We could not send your hiring enquiry. Please try again.",
    };
  }

  const parsed = hiringSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "validation_error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await createHiringSubmission({
      ...parsed.data,
      consentedAt: new Date(),
    });
    return successState;
  } catch (error) {
    if (error instanceof DuplicateSubmissionError) {
      return successState;
    }
    return {
      status: "server_error",
      message: "We could not send your hiring enquiry. Please try again.",
    };
  }
}
