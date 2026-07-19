"use client";

import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { FormField } from "@/components/ui/FormField";

export function JobSearchForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="form-grid search-form" onSubmit={handleSubmit} aria-label="Job search">
      <div className="form-grid form-grid-2">
        <FormField id="job-keywords" label="Keywords" placeholder="[Job title or keyword]" required />
        <FormField
          id="job-location"
          label="Preferred location"
          kind="select"
          options={["[Select a location]", "[Location option]", "[Remote option]"]}
          required
        />
      </div>
      <FormField
        id="job-industry"
        label="Industry"
        kind="select"
        options={["[Select an industry]", "[Industry option]"]}
      />
      <button className="form-submit" type="submit" disabled={submitted}>
        <Search aria-hidden="true" size={18} />
        {submitted ? "[Search submitted]" : "[Search jobs]"}
      </button>
      {submitted ? <p className="form-success" role="status">[Job search success message]</p> : null}
    </form>
  );
}
