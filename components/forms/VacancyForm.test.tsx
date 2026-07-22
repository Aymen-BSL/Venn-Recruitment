import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VacancyForm } from "@/components/forms/VacancyForm";
import type { FormActionState } from "@/lib/forms/action-state";

const { submitHiringEnquiryMock } = vi.hoisted(() => ({ submitHiringEnquiryMock: vi.fn() }));

vi.mock("@/app/actions/hiring", () => ({ submitHiringEnquiry: submitHiringEnquiryMock }));

async function fillHiringForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Contact name"), "Grace Hopper");
  await user.type(screen.getByLabelText("Company"), "Venn Labs");
  await user.type(screen.getByLabelText("Work email"), "grace@example.com");
  await user.type(screen.getByLabelText("Role to fill"), "Engineer");
  await user.type(screen.getByLabelText("Role location"), "London");
  await user.type(screen.getByLabelText("Hiring timeline"), "Within four weeks");
  await user.type(screen.getByLabelText("Vacancy details"), "We need an experienced engineer.");
  return user;
}

async function waitUntilReady() {
  await waitFor(() => expect(screen.getByRole("button", { name: "Start a Hiring Conversation" })).toBeEnabled());
}

describe("VacancyForm", () => {
  beforeEach(() => {
    submitHiringEnquiryMock.mockReset();
  });

  it("submits stable field names, announces success, and resets", async () => {
    submitHiringEnquiryMock.mockResolvedValue({
      status: "success",
      message: "Thank you. Your hiring enquiry has been received for review.",
    });
    render(<VacancyForm />);
    await waitUntilReady();
    const user = await fillHiringForm();

    await user.click(screen.getByRole("button", { name: "Start a Hiring Conversation" }));

    expect(await screen.findByRole("status")).toHaveTextContent("received for review");
    expect(screen.getByLabelText("Contact name")).toHaveValue("");
    const submittedData = submitHiringEnquiryMock.mock.calls[0][1] as FormData;
    expect(submittedData.get("company")).toBe("Venn Labs");
    expect(submittedData.get("role")).toBe("Engineer");
    expect(submittedData.get("requestId")).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it("renders field and form-level errors", async () => {
    submitHiringEnquiryMock.mockResolvedValue({
      status: "validation_error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: { company: ["Company is required."] },
    });
    render(<VacancyForm />);
    await waitUntilReady();
    const user = await fillHiringForm();

    await user.click(screen.getByRole("button", { name: "Start a Hiring Conversation" }));

    expect(await screen.findByText("Company is required.")).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Check the highlighted fields and try again.")).toBeInTheDocument();
  });

  it("prevents a second submission while pending and announces failures", async () => {
    let resolveAction!: (state: FormActionState) => void;
    submitHiringEnquiryMock.mockReturnValue(new Promise<FormActionState>((resolve) => {
      resolveAction = resolve;
    }));
    render(<VacancyForm />);
    await waitUntilReady();
    const user = await fillHiringForm();

    await user.click(screen.getByRole("button", { name: "Start a Hiring Conversation" }));
    const pendingButton = await screen.findByRole("button", { name: "Submitting Enquiry…" });
    expect(pendingButton).toBeDisabled();
    await user.click(pendingButton);
    expect(submitHiringEnquiryMock).toHaveBeenCalledTimes(1);

    await act(async () => resolveAction({
      status: "server_error",
      message: "We could not send your hiring enquiry. Please try again.",
    }));
    expect(await screen.findByRole("alert")).toHaveTextContent("We could not send your hiring enquiry. Please try again.");
  });
});
