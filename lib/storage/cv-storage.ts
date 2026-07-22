import "server-only";

import { getSupabaseEnv } from "@/lib/env/server";
import type { ValidatedCv } from "@/lib/storage/validate-cv";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type StoredCv = Readonly<{
  bucket: string;
  objectPath: string;
}>;

export class CvStorageError extends Error {
  constructor() {
    super("Unable to store CV.");
    this.name = "CvStorageError";
  }
}

export async function uploadCv(
  requestId: string,
  cv: ValidatedCv,
): Promise<StoredCv> {
  const bucket = getSupabaseEnv().SUPABASE_CV_BUCKET;
  const objectPath = `${requestId}/${crypto.randomUUID()}.${cv.extension}`;
  try {
    const { error } = await getSupabaseAdmin().storage.from(bucket).upload(
      objectPath,
      cv.bytes,
      {
        cacheControl: "3600",
        contentType: cv.type,
        upsert: false,
      },
    );

    if (error) {
      throw new CvStorageError();
    }
  } catch {
    throw new CvStorageError();
  }

  return { bucket, objectPath };
}

export async function deleteCvObject(
  bucket: string,
  objectPath: string,
): Promise<boolean> {
  try {
    const { error } = await getSupabaseAdmin().storage.from(bucket).remove([objectPath]);
    return !error;
  } catch {
    return false;
  }
}
