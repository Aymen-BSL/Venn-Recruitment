import type { Metadata } from "next";
import { VacancyForm } from "@/components/forms/VacancyForm";
import { FormPageShell } from "@/components/layout/FormPageShell";

export const metadata: Metadata = {
  title: "Hire Talent | Venn Recruitment",
  description: "[Meta description for the Venn Recruitment vacancy submission page]",
};

export default function HireTalentPage() {
  return (
    <FormPageShell
      eyebrow="For Employers"
      title="Hire Talent"
      description="[Employer form introduction and vacancy submission guidance]"
      switchHref="/submit-cv"
      switchLabel="Submit Your CV"
    >
      <VacancyForm />
    </FormPageShell>
  );
}
