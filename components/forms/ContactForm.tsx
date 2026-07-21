"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { FormField } from "@/components/ui/FormField";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className = "" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={`form-grid ${className}`} onSubmit={handleSubmit} aria-label="Contact enquiry">
      <FormField id="contact-name" label="Name" placeholder="Name" autoComplete="name" required />
      <FormField id="contact-email" label="Email" placeholder="Email" type="email" autoComplete="email" required />
      <FormField id="contact-message" label="Message" kind="textarea" placeholder="Message" required />
      <button className="form-submit" type="submit" disabled={submitted}>
        <Send aria-hidden="true" size={18} />
        {submitted ? "Enquiry Sent" : "Send an Enquiry"}
      </button>
      {submitted ? <p className="form-success" role="status">[Contact enquiry confirmation]</p> : null}
    </form>
  );
}
