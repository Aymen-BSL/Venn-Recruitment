"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FormField } from "@/components/ui/FormField";
import styles from "./VennLineForm.module.css";

export function VacancyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={`form-grid ${styles.form} ${styles.light}`} onSubmit={handleSubmit} aria-label="Hiring enquiry">
      <div className="form-grid form-grid-2">
        <FormField id="vacancy-name" label="Contact name" placeholder="Contact name" autoComplete="name" required />
        <FormField id="vacancy-company" label="Company" placeholder="Company name" autoComplete="organization" required />
      </div>
      <div className="form-grid form-grid-2">
        <FormField id="vacancy-email" label="Work email" placeholder="Work email address" type="email" autoComplete="email" required />
        <FormField id="vacancy-phone" label="Phone number" placeholder="Phone number" type="tel" autoComplete="tel" />
      </div>
      <div className="form-grid form-grid-2">
        <FormField id="vacancy-role" label="Role to fill" placeholder="Role title" required />
        <FormField id="vacancy-location" label="Role location" placeholder="Role location" required />
      </div>
      <FormField id="vacancy-timeline" label="Hiring timeline" placeholder="Hiring timeline, e.g. within 4 weeks" required />
      <FormField id="vacancy-details" label="Vacancy details" kind="textarea" placeholder="Tell us about the role, team, required experience, and what success looks like" required />
      <p className={styles.privacyNote}>
        By submitting this form, you confirm that Venn Recruitment may use these
        details to respond to your hiring enquiry. See our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <button className="form-submit" type="submit" disabled={submitted}>
        <Send aria-hidden="true" size={18} />
        {submitted ? "Enquiry Submitted" : "Start a Hiring Conversation"}
      </button>
      {submitted ? (
        <p className="form-success" role="status">
          Thank you. Your hiring enquiry has been received for review.
        </p>
      ) : null}
    </form>
  );
}
