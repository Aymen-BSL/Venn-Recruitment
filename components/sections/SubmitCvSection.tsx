import { Reveal } from "@/components/animation/Reveal";
import { CvSubmissionForm } from "@/components/forms/CvSubmissionForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SubmitCvSection() {
  return (
    <section className="page-section" id="submit-cv">
      <Container>
        <Reveal className="form-section-layout form-section-reverse">
          <div className="form-panel form-panel-shadow"><CvSubmissionForm /></div>
          <div>
            <SectionHeading eyebrow="Submit Your CV" title="[Section heading]" description="[Section description]" />
            <div className="roundel" aria-hidden="true"><span>[Supporting visual]</span></div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
