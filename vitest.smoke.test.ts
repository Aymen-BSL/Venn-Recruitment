import { describe, expect, it } from "vitest";

describe("test setup", () => {
  it("loads DOM matchers", () => {
    const element = document.createElement("div");
    document.body.append(element);

    expect(element).toBeInTheDocument();
  });
});
