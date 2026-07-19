import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection() {
  return (
    <section className="page-section faq-section" id="faq">
      <Container>
        <Reveal className="faq-layout">
          <SectionHeading eyebrow="Frequently Asked Questions" title="[Section heading]" description="[Section description]" />
          <FaqAccordion />
        </Reveal>
      </Container>
    </section>
  );
}
