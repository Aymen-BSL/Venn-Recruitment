"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { FormField } from "@/components/ui/FormField";

export function CvSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} aria-label="CV submission">
      <div className="form-grid form-grid-2">
        <FormField id="cv-name" label="Full name" placeholder="[Your full name]" autoComplete="name" required />
        <FormField id="cv-email" label="Email address" placeholder="[Your email address]" type="email" autoComplete="email" required />
      </div>
      <FormField id="cv-role" label="Preferred role" placeholder="[Preferred role or discipline]" required />
      <FormField
        id="cv-file"
        label="CV document"
        type="file"
        accept=".pdf,.doc,.docx"
        hint="[Accepted file types and size guidance]"
        required
      />
      <FormField id="cv-note" label="Supporting note" kind="textarea" placeholder="[Supporting information]" />
      <button className="form-submit" type="submit" disabled={submitted}>
        <Send aria-hidden="true" size={18} />
        {submitted ? "[CV submitted]" : "[Submit your CV]"}
      </button>
      {submitted ? <p className="form-success" role="status">[CV submission success message]</p> : null}
    </form>
  );
}
