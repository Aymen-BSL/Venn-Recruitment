import { describe, expect, it, vi } from "vitest";
import { CvValidationError, validateCv } from "@/lib/storage/validate-cv";

vi.mock("server-only", () => ({}));

const types = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

function zipEntry(fileName: string): Uint8Array {
  const name = new TextEncoder().encode(fileName);
  const bytes = new Uint8Array(30 + name.length);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(26, name.length, true);
  bytes.set(name, 30);
  return bytes;
}

const fixtures = {
  pdf: new TextEncoder().encode("%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF"),
  doc: new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
  docx: zipEntry("word/document.xml"),
};

function cv(name: string, type: string, bytes: Uint8Array = fixtures.pdf) {
  return new File([bytes], name, { type });
}

describe("validateCv", () => {
  it.each([
    ["candidate.pdf", types.pdf, fixtures.pdf],
    ["candidate.doc", types.doc, fixtures.doc],
    ["candidate.docx", types.docx, fixtures.docx],
  ])("accepts a valid %s signature", async (name, browserType, bytes) => {
    await expect(validateCv(cv(name, browserType, bytes))).resolves.toMatchObject({
      extension: name.split(".").at(-1),
      name,
      type: browserType,
      bytes: expect.any(Uint8Array),
    });
  });

  it("rejects an executable renamed as a PDF", async () => {
    const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0, 0x49, 0x48, 0x44, 0x52]);

    await expect(validateCv(cv("resume.pdf", types.pdf, png))).rejects.toThrow(
      "The CV file contents do not match its type.",
    );
  });

  it("rejects empty files before signature inspection", async () => {
    await expect(validateCv(cv("resume.pdf", types.pdf, new Uint8Array()))).rejects.toThrow(
      "The CV file is empty.",
    );
  });

  it("rejects files over 3 MB before signature inspection", async () => {
    const oversized = cv("resume.pdf", types.pdf, new Uint8Array(3 * 1024 * 1024 + 1));

    await expect(validateCv(oversized)).rejects.toBeInstanceOf(CvValidationError);
    await expect(validateCv(oversized)).rejects.toThrow("The CV must be 3 MB or smaller.");
  });

  it("rejects mismatched extensions and browser MIME types", async () => {
    await expect(validateCv(cv("resume.docx", types.pdf))).rejects.toThrow(
      "The CV file extension and type do not match.",
    );
  });
});
