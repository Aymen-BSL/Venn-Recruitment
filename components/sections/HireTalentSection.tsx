import { Reveal } from "@/components/animation/Reveal";
import { VacancyForm } from "@/components/forms/VacancyForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HireTalentSection() {
  return (
    <section className="page-section violet-section" id="hire-talent">
      <Container>
        <Reveal className="form-section-layout">
          <SectionHeading inverse eyebrow="Hire Talent / Submit a Vacancy" title="[Section heading]" description="[Section description]" />
          <div className="form-panel"><VacancyForm /></div>
        </Reveal>
      </Container>
    </section>
  );
}
