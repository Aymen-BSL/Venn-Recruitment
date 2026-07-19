"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { FormField } from "@/components/ui/FormField";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} aria-label="Contact enquiry">
      <div className="form-grid form-grid-2">
        <FormField id="contact-name" label="Name" placeholder="[Your name]" autoComplete="name" required />
        <FormField id="contact-email" label="Email" placeholder="[Your email address]" type="email" autoComplete="email" required />
      </div>
      <FormField
        id="contact-topic"
        label="Enquiry type"
        kind="select"
        options={["[Select an enquiry type]", "[Candidate enquiry]", "[Employer enquiry]", "[General enquiry]"]}
        required
      />
      <FormField id="contact-message" label="Message" kind="textarea" placeholder="[How can we help?]" required />
      <button className="form-submit" type="submit" disabled={submitted}>
        <Send aria-hidden="true" size={18} />
        {submitted ? "[Enquiry sent]" : "[Send enquiry]"}
      </button>
      {submitted ? <p className="form-success" role="status">[Contact enquiry success message]</p> : null}
    </form>
  );
}
