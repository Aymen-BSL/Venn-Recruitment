import { Check } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChooseSection() {
  return (
    <section className="page-section dark-section why-section" id="why-choose-venn">
      <Container>
        <Reveal className="why-layout">
          <div className="why-graphic" aria-label="[Why choose Venn supporting visual]">
            <span className="why-circle why-circle-sand" />
            <span className="why-circle why-circle-violet" />
            <span className="why-graphic-label">[Supporting visual]</span>
          </div>
          <div>
            <SectionHeading inverse eyebrow="Why Choose Venn" title="[Section heading]" description="[Section description]" />
            <ul className="reason-list">
              {Array.from({ length: 4 }, (_, index) => (
                <li key={index}><span><Check aria-hidden="true" size={17} /></span><div><h3>[Reason to choose Venn]</h3><p>[Supporting description]</p></div></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
