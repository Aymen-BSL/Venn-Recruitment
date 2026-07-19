import type { Metadata } from "next";
import { CvSubmissionForm } from "@/components/forms/CvSubmissionForm";
import { FormPageShell } from "@/components/layout/FormPageShell";

export const metadata: Metadata = {
  title: "Submit Your CV | Venn Recruitment",
  description: "[Meta description for the Venn Recruitment CV submission page]",
};

export default function SubmitCvPage() {
  return (
    <FormPageShell
      eyebrow="For Candidates"
      title="Submit Your CV"
      description="[Candidate form introduction and submission guidance]"
      switchHref="/hire-talent"
      switchLabel="Hire Talent"
    >
      <CvSubmissionForm />
    </FormPageShell>
  );
}
