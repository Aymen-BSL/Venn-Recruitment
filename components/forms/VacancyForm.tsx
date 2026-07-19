"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { FormField } from "@/components/ui/FormField";

export function VacancyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} aria-label="Vacancy submission">
      <div className="form-grid form-grid-2">
        <FormField id="vacancy-name" label="Contact name" placeholder="[Contact name]" autoComplete="name" required />
        <FormField id="vacancy-company" label="Company" placeholder="[Company name]" autoComplete="organization" required />
      </div>
      <FormField id="vacancy-email" label="Work email" placeholder="[Work email address]" type="email" autoComplete="email" required />
      <div className="form-grid form-grid-2">
        <FormField id="vacancy-role" label="Role to fill" placeholder="[Role title]" required />
        <FormField id="vacancy-location" label="Role location" placeholder="[Role location]" required />
      </div>
      <FormField id="vacancy-details" label="Vacancy details" kind="textarea" placeholder="[Vacancy requirements and context]" required />
      <button className="form-submit" type="submit" disabled={submitted}>
        <Send aria-hidden="true" size={18} />
        {submitted ? "Vacancy Submitted" : "Submit a Vacancy"}
      </button>
      {submitted ? <p className="form-success" role="status">[Vacancy submission success message]</p> : null}
    </form>
  );
}
