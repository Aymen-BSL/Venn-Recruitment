"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { submitCandidate } from "@/app/actions/candidate";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { FormField } from "@/components/ui/FormField";
import {
  firstFieldError,
  initialFormActionState,
  type FormActionState,
} from "@/lib/forms/action-state";
import { useAntiSpamToken } from "@/lib/forms/use-anti-spam";
import styles from "./VennLineForm.module.css";

export function CvSubmissionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());
  const { ensureToken, resetToken, token } = useAntiSpamToken(requestId);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [state, formAction] = useActionState(async (
    previousState: FormActionState,
    formData: FormData,
  ) => {
    const nextState = await submitCandidate(previousState, formData);
    if (nextState.status === "success") {
      formRef.current?.reset();
      setRequestId(crypto.randomUUID());
      resetToken();
      setFileInputKey((key) => key + 1);
    }
    return nextState;
  }, initialFormActionState);

  return (
    <form ref={formRef} action={formAction} onFocusCapture={ensureToken} onPointerEnter={ensureToken} className={`form-grid ${styles.form} ${styles.light}`} aria-label="CV submission">
      <input suppressHydrationWarning type="hidden" name="requestId" value={requestId} />
      <input type="hidden" name="formStartToken" value={token} />
      <div className={styles.formTrap} aria-hidden="true">
        <label htmlFor={`candidate-website-${requestId}`}>Website</label>
        <input id={`candidate-website-${requestId}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid form-grid-2">
        <FormField name="name" id="cv-name" label="Full name" placeholder="Full name" autoComplete="name" error={firstFieldError(state, "name")} required />
        <FormField name="email" id="cv-email" label="Email address" placeholder="Email address" type="email" autoComplete="email" error={firstFieldError(state, "email")} required />
      </div>
      <div className="form-grid form-grid-2">
        <FormField name="phone" id="cv-phone" label="Phone number" placeholder="Phone number" type="tel" autoComplete="tel" error={firstFieldError(state, "phone")} required />
        <FormField name="location" id="cv-location" label="Current location" placeholder="Current city and country" autoComplete="address-level2" error={firstFieldError(state, "location")} required />
      </div>
      <div className="form-grid form-grid-2">
        <FormField name="preferredRole" id="cv-role" label="Preferred role" placeholder="Preferred role or discipline" error={firstFieldError(state, "preferredRole")} required />
        <FormField name="preferredLocation" id="cv-preferred-location" label="Preferred work location" placeholder="Preferred work location" error={firstFieldError(state, "preferredLocation")} required />
      </div>
      <FormField name="linkedInUrl" id="cv-linkedin" label="LinkedIn profile" placeholder="LinkedIn profile URL (optional)" type="url" autoComplete="url" error={firstFieldError(state, "linkedInUrl")} />
      <FormField
        key={fileInputKey}
        name="cv"
        id="cv-file"
        label="CV document"
        type="file"
        accept=".pdf,.doc,.docx"
        hint="Upload your CV as a PDF, DOC, or DOCX file, up to 3 MB."
        error={firstFieldError(state, "cv")}
        required
      />
      <FormField name="note" id="cv-note" label="Supporting note" kind="textarea" placeholder="Tell us what you want from your next move (optional)" error={firstFieldError(state, "note")} />
      <p className={styles.privacyNote}>
        By submitting this form, you confirm that Venn Recruitment may use your
        information to provide recruitment services. See our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <SubmitButton
        className="form-submit"
        icon={<Send aria-hidden="true" size={18} />}
        pendingLabel="Uploading CV…"
      >
        {state.status === "success" ? "Submit Another CV" : "Submit Your CV"}
      </SubmitButton>
      {state.status === "success" ? (
        <p className="form-success" role="status">{state.message}</p>
      ) : state.status === "validation_error" || state.status === "server_error" ? (
        <p className="form-error" role="alert">{state.message}</p>
      ) : null}
    </form>
  );
}
