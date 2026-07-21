"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FormField } from "@/components/ui/FormField";
import styles from "./VennLineForm.module.css";

export function CvSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={`form-grid ${styles.form} ${styles.light}`} onSubmit={handleSubmit} aria-label="CV submission">
      <div className="form-grid form-grid-2">
        <FormField id="cv-name" label="Full name" placeholder="Full name" autoComplete="name" required />
        <FormField id="cv-email" label="Email address" placeholder="Email address" type="email" autoComplete="email" required />
      </div>
      <div className="form-grid form-grid-2">
        <FormField id="cv-phone" label="Phone number" placeholder="Phone number" type="tel" autoComplete="tel" required />
        <FormField id="cv-location" label="Current location" placeholder="Current city and country" autoComplete="address-level2" required />
      </div>
      <div className="form-grid form-grid-2">
        <FormField id="cv-role" label="Preferred role" placeholder="Preferred role or discipline" required />
        <FormField id="cv-preferred-location" label="Preferred work location" placeholder="Preferred work location" required />
      </div>
      <FormField id="cv-linkedin" label="LinkedIn profile" placeholder="LinkedIn profile URL (optional)" type="url" autoComplete="url" />
      <FormField
        id="cv-file"
        label="CV document"
        type="file"
        accept=".pdf,.doc,.docx"
        hint="Upload your CV as a PDF, DOC, or DOCX file."
        required
      />
      <FormField id="cv-note" label="Supporting note" kind="textarea" placeholder="Tell us what you want from your next move (optional)" />
      <p className={styles.privacyNote}>
        By submitting this form, you confirm that Venn Recruitment may use your
        information to provide recruitment services. See our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <button className="form-submit" type="submit" disabled={submitted}>
        <Send aria-hidden="true" size={18} />
        {submitted ? "CV Submitted" : "Submit Your CV"}
      </button>
      {submitted ? (
        <p className="form-success" role="status">
          Thank you. Your profile has been received for review.
        </p>
      ) : null}
    </form>
  );
}
