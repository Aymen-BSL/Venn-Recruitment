import "server-only";

import { fileTypeFromBuffer } from "file-type";
import { ACCEPTED_CV_TYPES } from "@/lib/forms/constants";
import { cvMetadataSchema } from "@/lib/forms/schemas";
import type { CvMetadata } from "@/lib/forms/types";

type CvExtension = keyof typeof ACCEPTED_CV_TYPES;

export type ValidatedCv = CvMetadata & {
  bytes: Uint8Array;
  extension: CvExtension;
};

export class CvValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CvValidationError";
  }
}

function getExtension(fileName: string): CvExtension | undefined {
  const extension = fileName.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1];
  return extension && extension in ACCEPTED_CV_TYPES
    ? extension as CvExtension
    : undefined;
}

export async function validateCv(file: File): Promise<ValidatedCv> {
  const metadata = cvMetadataSchema.safeParse({
    name: file.name,
    size: file.size,
    type: file.type,
  });

  if (!metadata.success) {
    throw new CvValidationError(metadata.error.issues[0]?.message ?? "Upload a valid CV file.");
  }

  const extension = getExtension(metadata.data.name);
  if (!extension) {
    throw new CvValidationError("The CV file must have a .pdf, .doc, or .docx extension.");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  let detected: Awaited<ReturnType<typeof fileTypeFromBuffer>>;
  try {
    detected = await fileTypeFromBuffer(bytes);
  } catch {
    throw new CvValidationError("We could not verify the CV file.");
  }

  const signatureMatches = extension === "doc"
    ? detected?.ext === "cfb" && detected.mime === "application/x-cfb"
    : detected?.ext === extension && detected.mime === ACCEPTED_CV_TYPES[extension];

  if (!signatureMatches) {
    throw new CvValidationError("The CV file contents do not match its type.");
  }

  return {
    ...metadata.data,
    bytes,
    extension,
  };
}
