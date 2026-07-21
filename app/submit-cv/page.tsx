import type { Metadata } from "next";
import { CvSubmissionForm } from "@/components/forms/CvSubmissionForm";
import { FormPageShell } from "@/components/layout/FormPageShell";

export const metadata: Metadata = {
  title: "Submit Your CV | Venn Recruitment",
  description:
    "Share your CV with Venn Recruitment and be considered for relevant opportunities across the Middle East and international markets.",
};

export default function SubmitCvPage() {
  return (
    <FormPageShell
      eyebrow="For Candidates"
      title="Submit Your CV"
      description="Tell us where you are now and where you want to go next. We will use your experience, ambitions, and preferences to identify opportunities with the right overlap."
      points={[
        "A consultant reviews your experience and career goals.",
        "We contact you when a relevant opportunity aligns.",
        "Your profile is shared only with appropriate permission.",
      ]}
      switchHref="/hire-talent"
      switchLabel="Hire Talent"
    >
      <CvSubmissionForm />
    </FormPageShell>
  );
}
