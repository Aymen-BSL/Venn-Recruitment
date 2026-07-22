import "server-only";

import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const expiredRowSchema = z.object({
  submission_id: z.uuid(),
  cv_bucket: z.string().nullable(),
  cv_object_path: z.string().nullable(),
});

export type ExpiredSubmission = z.infer<typeof expiredRowSchema>;

export class RetentionPersistenceError extends Error {
  constructor() {
    super("Unable to process retention records.");
    this.name = "RetentionPersistenceError";
  }
}

export async function getExpiredSubmissionBatch(limit = 100): Promise<ExpiredSubmission[]> {
  const { data, error } = await getSupabaseAdmin().rpc("get_expired_submission_batch", { p_limit: limit });
  const parsed = z.array(expiredRowSchema).safeParse(data);
  if (error || !parsed.success) throw new RetentionPersistenceError();
  return parsed.data;
}

export async function deleteExpiredSubmissionRows(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const { data, error } = await getSupabaseAdmin().rpc("delete_expired_submissions", { p_submission_ids: ids });
  const parsed = z.number().int().nonnegative().safeParse(data);
  if (error || !parsed.success) throw new RetentionPersistenceError();
  return parsed.data;
}
