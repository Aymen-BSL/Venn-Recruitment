import { describe, expect, it } from "vitest";
import {
  candidateSchema,
  contactSchema,
  cvMetadataSchema,
  hiringSchema,
} from "@/lib/forms/schemas";
import { MAX_CV_SIZE_BYTES } from "@/lib/forms/constants";

const requestId = "67df3158-e9c5-42e9-aa65-cd6603f68206";

describe("contactSchema", () => {
  it("requires all contact fields", () => {
    const result = contactSchema.safeParse({ requestId, name: "", email: "", message: "" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors).toMatchObject({
        name: expect.any(Array),
        email: expect.any(Array),
        message: expect.any(Array),
      });
    }
  });

  it("trims values and normalizes email addresses", () => {
    const result = contactSchema.parse({
      requestId,
      name: "  Ada Lovelace  ",
      email: "  ADA@EXAMPLE.COM  ",
      message: "  Please contact me.  ",
    });

    expect(result).toEqual({
      requestId,
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please contact me.",
    });
  });

  it("rejects values over their maximum lengths", () => {
    expect(contactSchema.safeParse({ requestId, name: "a".repeat(101), email: "a@example.com", message: "Hello" }).success).toBe(false);
    expect(contactSchema.safeParse({ requestId, name: "Ada", email: "a@example.com", message: "a".repeat(5001) }).success).toBe(false);
  });
});

describe("hiringSchema", () => {
  const validHiring = {
    requestId,
    name: "Grace Hopper",
    company: "Venn Labs",
    email: "grace@example.com",
    phone: "",
    role: "Engineer",
    location: "London",
    timeline: "Within four weeks",
    details: "We need an experienced engineer.",
  };

  it("accepts an omitted optional phone and trims required fields", () => {
    expect(hiringSchema.parse(validHiring)).toMatchObject({ company: "Venn Labs", phone: undefined });
  });

  it("rejects a missing required field", () => {
    expect(hiringSchema.safeParse({ ...validHiring, company: " " }).success).toBe(false);
  });
});

describe("candidateSchema", () => {
  const validCandidate = {
    requestId,
    name: "Katherine Johnson",
    email: "katherine@example.com",
    phone: "+1 555 0100",
    location: "Hampton, VA",
    preferredRole: "Mathematician",
    preferredLocation: "Remote",
    linkedInUrl: "https://www.linkedin.com/in/katherine-johnson",
    note: "  Interested in aerospace roles.  ",
  };

  it("accepts a valid HTTP URL and trims optional notes", () => {
    expect(candidateSchema.parse(validCandidate)).toMatchObject({
      linkedInUrl: validCandidate.linkedInUrl,
      note: "Interested in aerospace roles.",
    });
  });

  it("turns empty optional values into undefined", () => {
    expect(candidateSchema.parse({ ...validCandidate, linkedInUrl: " ", note: "" })).toMatchObject({
      linkedInUrl: undefined,
      note: undefined,
    });
  });

  it("rejects malformed and non-HTTP URLs", () => {
    expect(candidateSchema.safeParse({ ...validCandidate, linkedInUrl: "not-a-url" }).success).toBe(false);
    expect(candidateSchema.safeParse({ ...validCandidate, linkedInUrl: "ftp://example.com/profile" }).success).toBe(false);
  });
});

describe("cvMetadataSchema", () => {
  it.each([
    ["candidate.pdf", "application/pdf"],
    ["candidate.doc", "application/msword"],
    ["candidate.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ])("accepts %s", (name, type) => {
    expect(cvMetadataSchema.safeParse({ name, type, size: MAX_CV_SIZE_BYTES }).success).toBe(true);
  });

  it("rejects empty, oversized, and unsupported files", () => {
    expect(cvMetadataSchema.safeParse({ name: "empty.pdf", type: "application/pdf", size: 0 }).success).toBe(false);
    expect(cvMetadataSchema.safeParse({ name: "large.pdf", type: "application/pdf", size: MAX_CV_SIZE_BYTES + 1 }).success).toBe(false);
    expect(cvMetadataSchema.safeParse({ name: "malware.exe", type: "application/octet-stream", size: 100 }).success).toBe(false);
    expect(cvMetadataSchema.safeParse({ name: "renamed.exe", type: "application/pdf", size: 100 }).success).toBe(false);
  });
});
