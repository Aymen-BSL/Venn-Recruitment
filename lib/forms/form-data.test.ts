import { describe, expect, it } from "vitest";
import { InvalidFormDataError, readStringFields } from "@/lib/forms/form-data";

describe("readStringFields", () => {
  it("reads a fixed set of scalar values", () => {
    const formData = new FormData();
    formData.set("name", "Ada Lovelace");
    formData.set("email", "ada@example.com");
    formData.set("ignored", "not returned");

    expect(readStringFields(formData, ["name", "email"] as const)).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
    });
  });

  it("represents missing fields as empty strings for schema validation", () => {
    expect(readStringFields(new FormData(), ["name"] as const)).toEqual({ name: "" });
  });

  it("rejects duplicate values", () => {
    const formData = new FormData();
    formData.append("name", "Ada");
    formData.append("name", "Grace");

    expect(() => readStringFields(formData, ["name"] as const)).toThrow(InvalidFormDataError);
  });

  it("rejects file values where text is expected", () => {
    const formData = new FormData();
    formData.set("name", new File(["content"], "candidate.txt"));

    expect(() => readStringFields(formData, ["name"] as const)).toThrow(InvalidFormDataError);
  });
});
