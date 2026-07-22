"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { submitHiringEnquiry } from "@/app/actions/hiring";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { FormField } from "@/components/ui/FormField";
import {
  firstFieldError,
  initialFormActionState,
  type FormActionState,
} from "@/lib/forms/action-state";
import styles from "./VennLineForm.module.css";

export function VacancyForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());
  const [state, formAction] = useActionState(async (
    previousState: FormActionState,
    formData: FormData,
  ) => {
    const nextState = await submitHiringEnquiry(previousState, formData);
    if (nextState.status === "success") {
      formRef.current?.reset();
      setRequestId(crypto.randomUUID());
    }
    return nextState;
  }, initialFormActionState);

  return (
    <form ref={formRef} action={formAction} className={`form-grid ${styles.form} ${styles.light}`} aria-label="Hiring enquiry">
      <input suppressHydrationWarning type="hidden" name="requestId" value={requestId} />
      <div className="form-grid form-grid-2">
        <FormField name="name" id="vacancy-name" label="Contact name" placeholder="Contact name" autoComplete="name" error={firstFieldError(state, "name")} required />
        <FormField name="company" id="vacancy-company" label="Company" placeholder="Company name" autoComplete="organization" error={firstFieldError(state, "company")} required />
      </div>
      <div className="form-grid form-grid-2">
        <FormField name="email" id="vacancy-email" label="Work email" placeholder="Work email address" type="email" autoComplete="email" error={firstFieldError(state, "email")} required />
        <FormField name="phone" id="vacancy-phone" label="Phone number" placeholder="Phone number" type="tel" autoComplete="tel" error={firstFieldError(state, "phone")} />
      </div>
      <div className="form-grid form-grid-2">
        <FormField name="role" id="vacancy-role" label="Role to fill" placeholder="Role title" error={firstFieldError(state, "role")} required />
        <FormField name="location" id="vacancy-location" label="Role location" placeholder="Role location" error={firstFieldError(state, "location")} required />
      </div>
      <FormField name="timeline" id="vacancy-timeline" label="Hiring timeline" placeholder="Hiring timeline, e.g. within 4 weeks" error={firstFieldError(state, "timeline")} required />
      <FormField name="details" id="vacancy-details" label="Vacancy details" kind="textarea" placeholder="Tell us about the role, team, required experience, and what success looks like" error={firstFieldError(state, "details")} required />
      <p className={styles.privacyNote}>
        By submitting this form, you confirm that Venn Recruitment may use these
        details to respond to your hiring enquiry. See our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <SubmitButton
        className="form-submit"
        icon={<Send aria-hidden="true" size={18} />}
        pendingLabel="Submitting Enquiry…"
      >
        {state.status === "success" ? "Submit Another Enquiry" : "Start a Hiring Conversation"}
      </SubmitButton>
      {state.status === "success" ? (
        <p className="form-success" role="status">{state.message}</p>
      ) : state.status === "validation_error" || state.status === "server_error" ? (
        <p className="form-error" role="alert">{state.message}</p>
      ) : null}
    </form>
  );
}
