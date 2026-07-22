"use client";

import { Send } from "lucide-react";
import { useActionState, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { FormField } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
  firstFieldError,
  initialFormActionState,
  type FormActionState,
} from "@/lib/forms/action-state";
import { useAntiSpamToken } from "@/lib/forms/use-anti-spam";
import styles from "./VennLineForm.module.css";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className = "" }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());
  const { ensureToken, resetToken, token } = useAntiSpamToken(requestId);
  const [state, formAction] = useActionState(async (
    previousState: FormActionState,
    formData: FormData,
  ) => {
    const nextState = await submitContact(previousState, formData);
    if (nextState.status === "success") {
      formRef.current?.reset();
      setRequestId(crypto.randomUUID());
      resetToken();
    }
    return nextState;
  }, initialFormActionState);

  return (
    <form ref={formRef} action={formAction} onFocusCapture={ensureToken} onPointerEnter={ensureToken} className={`form-grid ${styles.form} ${className}`} aria-label="Contact enquiry">
      <input suppressHydrationWarning type="hidden" name="requestId" value={requestId} />
      <input type="hidden" name="formStartToken" value={token} />
      <div className={styles.formTrap} aria-hidden="true">
        <label htmlFor={`contact-website-${requestId}`}>Website</label>
        <input id={`contact-website-${requestId}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <FormField name="name" id="contact-name" label="Name" placeholder="Name" autoComplete="name" error={firstFieldError(state, "name")} required />
      <FormField name="email" id="contact-email" label="Email" placeholder="Email" type="email" autoComplete="email" error={firstFieldError(state, "email")} required />
      <FormField name="message" id="contact-message" label="Message" kind="textarea" placeholder="Message" error={firstFieldError(state, "message")} required />
      <SubmitButton
        className="form-submit"
        icon={<Send aria-hidden="true" size={18} />}
        pendingLabel="Sending Enquiry…"
      >
        {state.status === "success" ? "Send Another Enquiry" : "Send an Enquiry"}
      </SubmitButton>
      {state.status === "success" ? (
        <p className="form-success" role="status">{state.message}</p>
      ) : state.status === "validation_error" || state.status === "server_error" ? (
        <p className="form-error" role="alert">{state.message}</p>
      ) : null}
    </form>
  );
}
