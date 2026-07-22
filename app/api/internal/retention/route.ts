import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getRetentionEnv } from "@/lib/env/server";
import { deleteCvObject } from "@/lib/storage/cv-storage";
import {
  deleteExpiredSubmissionRows,
  getExpiredSubmissionBatch,
} from "@/lib/submissions/retention";

function authorized(request: Request): boolean {
  const supplied = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${getRetentionEnv().RETENTION_MAINTENANCE_SECRET}`;
  const suppliedBytes = Buffer.from(supplied);
  const expectedBytes = Buffer.from(expected);
  return suppliedBytes.length === expectedBytes.length
    && timingSafeEqual(suppliedBytes, expectedBytes);
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const batch = await getExpiredSubmissionBatch(100);
    const deletable: string[] = [];
    let deferred = 0;

    for (const row of batch) {
      if (row.cv_bucket && row.cv_object_path) {
        if (await deleteCvObject(row.cv_bucket, row.cv_object_path)) deletable.push(row.submission_id);
        else deferred++;
      } else if (!row.cv_bucket && !row.cv_object_path) {
        deletable.push(row.submission_id);
      } else {
        deferred++;
      }
    }

    const deleted = await deleteExpiredSubmissionRows(deletable);
    return NextResponse.json({ examined: batch.length, deleted, deferred });
  } catch {
    return NextResponse.json({ error: "Retention maintenance failed." }, { status: 500 });
  }
}
