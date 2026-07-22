import type { z } from "zod";
import type {
  candidateSchema,
  contactSchema,
  cvMetadataSchema,
  hiringSchema,
} from "@/lib/forms/schemas";

export type ContactInput = z.infer<typeof contactSchema>;
export type HiringInput = z.infer<typeof hiringSchema>;
export type CandidateInput = z.infer<typeof candidateSchema>;
export type CvMetadata = z.infer<typeof cvMetadataSchema>;
