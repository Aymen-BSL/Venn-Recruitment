import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/forms/ContactForm";
import type { FormActionState } from "@/lib/forms/action-state";

const { submitContactMock } = vi.hoisted(() => ({ submitContactMock: vi.fn() }));

vi.mock("@/app/actions/contact", () => ({ submitContact: submitContactMock }));

async function fillContactForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "Please contact me.");
  return user;
}

async function waitUntilReady() {
  await waitFor(() => expect(screen.getByRole("button", { name: "Send an Enquiry" })).toBeEnabled());
}

describe("ContactForm", () => {
  beforeEach(() => {
    submitContactMock.mockReset();
  });

  it("submits named fields, shows success, and resets entered values", async () => {
    submitContactMock.mockResolvedValue({
      status: "success",
      message: "Thank you. Your enquiry has been received.",
    });
    render(<ContactForm />);
    await waitUntilReady();
    const user = await fillContactForm();

    await user.click(screen.getByRole("button", { name: "Send an Enquiry" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Thank you. Your enquiry has been received.");
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
    const submittedData = submitContactMock.mock.calls[0][1] as FormData;
    expect(submittedData.get("name")).toBe("Ada Lovelace");
    expect(submittedData.get("email")).toBe("ada@example.com");
    expect(submittedData.get("message")).toBe("Please contact me.");
    expect(submittedData.get("requestId")).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it("connects server field errors to their controls", async () => {
    submitContactMock.mockResolvedValue({
      status: "validation_error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: { email: ["Enter a valid email address."] },
    });
    render(<ContactForm />);
    await waitUntilReady();
    const user = await fillContactForm();

    await user.click(screen.getByRole("button", { name: "Send an Enquiry" }));

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("announces safe server failures", async () => {
    submitContactMock.mockResolvedValue({
      status: "server_error",
      message: "We could not send your enquiry. Please try again.",
    });
    render(<ContactForm />);
    await waitUntilReady();
    const user = await fillContactForm();

    await user.click(screen.getByRole("button", { name: "Send an Enquiry" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("We could not send your enquiry. Please try again.");
  });

  it("shows a pending label and prevents double submission", async () => {
    let resolveAction!: (state: FormActionState) => void;
    submitContactMock.mockReturnValue(new Promise<FormActionState>((resolve) => {
      resolveAction = resolve;
    }));
    render(<ContactForm />);
    await waitUntilReady();
    const user = await fillContactForm();
    const submit = screen.getByRole("button", { name: "Send an Enquiry" });

    await user.click(submit);
    expect(await screen.findByRole("button", { name: "Sending Enquiry…" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Sending Enquiry…" }));
    expect(submitContactMock).toHaveBeenCalledTimes(1);

    await act(async () => resolveAction({
      status: "success",
      message: "Thank you. Your enquiry has been received.",
    }));
  });
});
