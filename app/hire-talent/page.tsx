import type { Metadata } from "next";
import { VacancyForm } from "@/components/forms/VacancyForm";
import { FormPageShell } from "@/components/layout/FormPageShell";

export const metadata: Metadata = {
  title: "Hire Talent | Venn Recruitment",
  description:
    "Tell Venn Recruitment about your hiring needs and start a focused search for carefully matched talent.",
};

export default function HireTalentPage() {
  return (
    <FormPageShell
      eyebrow="For Employers"
      title="Hire Talent"
      description="Tell us what the role needs to achieve—not only what the job description says. We will learn the context, clarify the brief, and focus the search on people who genuinely fit."
      points={[
        "We clarify the role, team, and measures of success.",
        "You receive carefully matched profiles, not unnecessary volume.",
        "We support the process from introduction through offer.",
      ]}
      switchHref="/submit-cv"
      switchLabel="Submit Your CV"
    >
      <VacancyForm />
    </FormPageShell>
  );
}
