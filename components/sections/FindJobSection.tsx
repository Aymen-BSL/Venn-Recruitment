import { Reveal } from "@/components/animation/Reveal";
import { JobSearchForm } from "@/components/forms/JobSearchForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FindJobSection() {
  return (
    <section className="page-section sand-section" id="find-a-job">
      <Container>
        <Reveal className="form-section-layout">
          <SectionHeading eyebrow="Find a Job" title="[Section heading]" description="[Section description]" />
          <div className="form-panel"><JobSearchForm /></div>
        </Reveal>
      </Container>
    </section>
  );
}
