"use server";

import type { FormActionState } from "@/lib/forms/action-state";
import { passesAntiSpam } from "@/lib/forms/anti-spam";
import { InvalidFormDataError, readStringFields } from "@/lib/forms/form-data";
import { contactSchema } from "@/lib/forms/schemas";
import { attemptClickUpDelivery } from "@/lib/clickup/deliver";
import {
  createContactSubmission,
  DuplicateSubmissionError,
} from "@/lib/submissions/repository";

const contactFields = ["requestId", "name", "email", "message", "formStartToken", "website"] as const;
const successState = {
  status: "success",
  message: "Thank you. Your enquiry has been received.",
} as const;

export async function submitContact(
  _previousState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  let values: Record<(typeof contactFields)[number], string>;
  try {
    values = readStringFields(formData, contactFields);
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
      message: "We could not send your enquiry. Please try again.",
    };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "validation_error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!passesAntiSpam({
    honeypot: values.website,
    requestId: parsed.data.requestId,
    token: values.formStartToken,
  })) {
    return {
      status: "server_error",
      message: "We could not send your enquiry. Please try again.",
    };
  }

  try {
    const submissionId = await createContactSubmission({
      ...parsed.data,
      consentedAt: new Date(),
    });
    await attemptClickUpDelivery(submissionId).catch(() => undefined);
    return successState;
  } catch (error) {
    if (error instanceof DuplicateSubmissionError) {
      return successState;
    }
    return {
      status: "server_error",
      message: "We could not send your enquiry. Please try again.",
    };
  }
}
