"use server";

import type { FormActionState } from "@/lib/forms/action-state";
import { InvalidFormDataError, readStringFields } from "@/lib/forms/form-data";
import { candidateSchema } from "@/lib/forms/schemas";
import { deleteCvObject, uploadCv } from "@/lib/storage/cv-storage";
import { CvValidationError, validateCv } from "@/lib/storage/validate-cv";
import {
  createCandidateSubmission,
  DuplicateSubmissionError,
} from "@/lib/submissions/repository";

const candidateFields = [
  "requestId",
  "name",
  "email",
  "phone",
  "location",
  "preferredRole",
  "preferredLocation",
  "linkedInUrl",
  "note",
] as const;

const successState = {
  status: "success",
  message: "Thank you. Your profile has been received for review.",
} as const;

const serverErrorState = {
  status: "server_error",
  message: "We could not submit your CV. Please try again.",
} as const;

function validationError(fieldErrors: Record<string, readonly string[]>): FormActionState {
  return {
    status: "validation_error",
    message: "Check the highlighted fields and try again.",
    fieldErrors,
  };
}

function readCv(formData: FormData): File | undefined {
  const values = formData.getAll("cv");
  return values.length === 1 && values[0] instanceof File && values[0].size > 0
    ? values[0]
    : undefined;
}

export async function submitCandidate(
  _previousState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  let values: Record<(typeof candidateFields)[number], string>;
  try {
    values = readStringFields(formData, candidateFields);
  } catch (error) {
    return error instanceof InvalidFormDataError
      ? validationError({})
      : serverErrorState;
  }

  const parsed = candidateSchema.safeParse(values);
  if (!parsed.success) {
    return validationError(parsed.error.flatten().fieldErrors);
  }

  const file = readCv(formData);
  if (!file) {
    return validationError({ cv: ["Upload your CV."] });
  }

  let validatedCv;
  try {
    validatedCv = await validateCv(file);
  } catch (error) {
    if (error instanceof CvValidationError) {
      return validationError({ cv: [error.message] });
    }
    console.error("Candidate submission failed.", { correlationId: parsed.data.requestId });
    return serverErrorState;
  }

  let storedCv;
  try {
    storedCv = await uploadCv(parsed.data.requestId, validatedCv);
  } catch {
    console.error("Candidate submission failed.", { correlationId: parsed.data.requestId });
    return serverErrorState;
  }

  try {
    await createCandidateSubmission({
      ...parsed.data,
      consentedAt: new Date(),
      cv: {
        ...storedCv,
        name: validatedCv.name,
        size: validatedCv.size,
        type: validatedCv.type,
      },
    });
    return successState;
  } catch (error) {
    await deleteCvObject(storedCv.bucket, storedCv.objectPath).catch(() => false);
    if (error instanceof DuplicateSubmissionError) {
      return successState;
    }
    console.error("Candidate submission failed.", { correlationId: parsed.data.requestId });
    return serverErrorState;
  }
}
