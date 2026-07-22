import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CvSubmissionForm } from "@/components/forms/CvSubmissionForm";
import type { FormActionState } from "@/lib/forms/action-state";

const { submitCandidateMock } = vi.hoisted(() => ({ submitCandidateMock: vi.fn() }));
vi.mock("@/app/actions/candidate", () => ({ submitCandidate: submitCandidateMock }));

async function fillForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Full name"), "Katherine Johnson");
  await user.type(screen.getByLabelText("Email address"), "katherine@example.com");
  await user.type(screen.getByLabelText("Phone number"), "+1 555 0100");
  await user.type(screen.getByLabelText("Current location"), "Hampton, VA");
  await user.type(screen.getByLabelText("Preferred role"), "Mathematician");
  await user.type(screen.getByLabelText("Preferred work location"), "Remote");
  const fileInput = screen.getByLabelText("CV document");
  await user.upload(fileInput, new File(["pdf"], "candidate.pdf", { type: "application/pdf" }));
  // jsdom does not refresh a required file input's validity after userEvent.upload.
  fileInput.removeAttribute("required");
  return user;
}

async function waitUntilReady() {
  await waitFor(() => expect(screen.getByRole("button", { name: "Submit Your CV" })).toBeEnabled());
}

describe("CvSubmissionForm", () => {
  beforeEach(() => submitCandidateMock.mockReset());

  it("submits named fields, announces success, and clears the form and file", async () => {
    submitCandidateMock.mockResolvedValue({ status: "success", message: "Thank you. Your profile has been received for review." });
    render(<CvSubmissionForm />);
    await waitUntilReady();
    const user = await fillForm();

    await user.click(screen.getByRole("button", { name: "Submit Your CV" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Thank you. Your profile has been received for review.");
    expect(screen.getByLabelText("Full name")).toHaveValue("");
    expect(screen.getByLabelText("CV document")).toHaveValue("");
    const data = submitCandidateMock.mock.calls[0][1] as FormData;
    expect(data.get("preferredRole")).toBe("Mathematician");
    expect(data.get("cv")).toBeInstanceOf(File);
    expect(data.get("requestId")).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it("connects CV errors to the file input", async () => {
    submitCandidateMock.mockResolvedValue({
      status: "validation_error", message: "Check the highlighted fields and try again.",
      fieldErrors: { cv: ["The CV file contents do not match its type."] },
    });
    render(<CvSubmissionForm />);
    await waitUntilReady();
    const user = await fillForm();
    await user.click(screen.getByRole("button", { name: "Submit Your CV" }));

    expect(await screen.findByText("The CV file contents do not match its type.")).toBeInTheDocument();
    expect(screen.getByLabelText("CV document")).toHaveAttribute("aria-invalid", "true");
  });

  it("announces safe server failures without clearing the selected file", async () => {
    submitCandidateMock.mockResolvedValue({ status: "server_error", message: "We could not submit your CV. Please try again." });
    render(<CvSubmissionForm />);
    await waitUntilReady();
    const user = await fillForm();
    await user.click(screen.getByRole("button", { name: "Submit Your CV" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("We could not submit your CV. Please try again.");
    expect(screen.getByLabelText("CV document")).not.toHaveValue("");
  });

  it("shows an upload pending state and prevents double submission", async () => {
    let resolveAction!: (state: FormActionState) => void;
    submitCandidateMock.mockReturnValue(new Promise<FormActionState>((resolve) => { resolveAction = resolve; }));
    render(<CvSubmissionForm />);
    await waitUntilReady();
    const user = await fillForm();
    await user.click(screen.getByRole("button", { name: "Submit Your CV" }));

    expect(await screen.findByRole("button", { name: "Uploading CV…" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Uploading CV…" }));
    expect(submitCandidateMock).toHaveBeenCalledTimes(1);
    await act(async () => resolveAction({ status: "success", message: "Thank you. Your profile has been received for review." }));
  });
});
