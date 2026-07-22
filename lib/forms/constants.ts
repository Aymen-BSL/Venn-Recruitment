export const MAX_CV_SIZE_BYTES = 3 * 1024 * 1024;

export const ACCEPTED_CV_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

export const ACCEPTED_CV_EXTENSIONS = Object.keys(ACCEPTED_CV_TYPES) as Array<
  keyof typeof ACCEPTED_CV_TYPES
>;

export const ACCEPTED_CV_MIME_TYPES = Object.values(ACCEPTED_CV_TYPES);

export const FORM_LIMITS = {
  name: 100,
  email: 254,
  phone: 50,
  company: 200,
  role: 200,
  location: 200,
  timeline: 200,
  url: 2_048,
  message: 5_000,
  details: 5_000,
  note: 5_000,
  fileName: 255,
} as const;
