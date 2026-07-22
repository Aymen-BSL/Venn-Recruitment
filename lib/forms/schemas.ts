import { z } from "zod";
import {
  ACCEPTED_CV_EXTENSIONS,
  ACCEPTED_CV_MIME_TYPES,
  ACCEPTED_CV_TYPES,
  FORM_LIMITS,
  MAX_CV_SIZE_BYTES,
} from "@/lib/forms/constants";

const requiredText = (label: string, maximum: number) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(maximum, `${label} must be ${maximum} characters or fewer.`);

const optionalText = (label: string, maximum: number) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    requiredText(label, maximum).optional(),
  );

const requestIdSchema = z.uuid("This form request is invalid. Please refresh and try again.");

const emailSchema = z
  .string({ error: "Email is required." })
  .trim()
  .min(1, "Email is required.")
  .max(FORM_LIMITS.email, `Email must be ${FORM_LIMITS.email} characters or fewer.`)
  .email("Enter a valid email address.")
  .transform((email) => email.toLowerCase());

const optionalHttpUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z
    .string()
    .trim()
    .max(FORM_LIMITS.url, `LinkedIn URL must be ${FORM_LIMITS.url} characters or fewer.`)
    .url("Enter a valid LinkedIn URL.")
    .refine(
      (value) => /^https?:\/\//i.test(value),
      "LinkedIn URL must begin with http:// or https://.",
    )
    .optional(),
);

export const contactSchema = z.object({
  requestId: requestIdSchema,
  name: requiredText("Name", FORM_LIMITS.name),
  email: emailSchema,
  message: requiredText("Message", FORM_LIMITS.message),
});

export const hiringSchema = z.object({
  requestId: requestIdSchema,
  name: requiredText("Contact name", FORM_LIMITS.name),
  company: requiredText("Company", FORM_LIMITS.company),
  email: emailSchema,
  phone: optionalText("Phone number", FORM_LIMITS.phone),
  role: requiredText("Role", FORM_LIMITS.role),
  location: requiredText("Role location", FORM_LIMITS.location),
  timeline: requiredText("Hiring timeline", FORM_LIMITS.timeline),
  details: requiredText("Vacancy details", FORM_LIMITS.details),
});

export const candidateSchema = z.object({
  requestId: requestIdSchema,
  name: requiredText("Full name", FORM_LIMITS.name),
  email: emailSchema,
  phone: requiredText("Phone number", FORM_LIMITS.phone),
  location: requiredText("Current location", FORM_LIMITS.location),
  preferredRole: requiredText("Preferred role", FORM_LIMITS.role),
  preferredLocation: requiredText("Preferred work location", FORM_LIMITS.location),
  linkedInUrl: optionalHttpUrl,
  note: optionalText("Supporting note", FORM_LIMITS.note),
});

export const cvMetadataSchema = z
  .object({
    name: requiredText("CV file name", FORM_LIMITS.fileName),
    type: z.enum(ACCEPTED_CV_MIME_TYPES, {
      error: "Upload a PDF, DOC, or DOCX file.",
    }),
    size: z
      .number({ error: "CV file size is required." })
      .int("CV file size is invalid.")
      .positive("The CV file is empty.")
      .max(MAX_CV_SIZE_BYTES, "The CV must be 3 MB or smaller."),
  })
  .superRefine((file, context) => {
    const extension = file.name.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1];
    if (!extension || !ACCEPTED_CV_EXTENSIONS.includes(extension as keyof typeof ACCEPTED_CV_TYPES)) {
      context.addIssue({
        code: "custom",
        path: ["name"],
        message: "The CV file must have a .pdf, .doc, or .docx extension.",
      });
      return;
    }

    const expectedType = ACCEPTED_CV_TYPES[extension as keyof typeof ACCEPTED_CV_TYPES];
    if (file.type !== expectedType) {
      context.addIssue({
        code: "custom",
        path: ["type"],
        message: "The CV file extension and type do not match.",
      });
    }
  });
