import { Compass, Handshake } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="page-section about-section" id="about">
      <Container>
        <Reveal className="split-layout">
          <SectionHeading eyebrow="About Venn Recruitment" title="[Section heading]" description="[Section description]" />
          <div className="overlap-cards" aria-label="[About Venn supporting content]">
            <Card className="overlap-card overlap-card-green placeholder-card">
              <div className="icon-box"><Compass aria-hidden="true" /></div>
              <h3>[Local market knowledge]</h3>
              <p className="placeholder-copy">[Supporting description]</p>
            </Card>
            <Card className="overlap-card overlap-card-violet placeholder-card">
              <div className="icon-box"><Handshake aria-hidden="true" /></div>
              <h3>[International connections]</h3>
              <p className="placeholder-copy">[Supporting description]</p>
            </Card>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
