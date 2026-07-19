import { LockKeyhole, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const trustItems = [ShieldCheck, LockKeyhole, UserRoundCheck];

export function TrustSafetySection() {
  return (
    <section className="page-section trust-section" id="trust-safety">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow="Trust and Safety" title="[Section heading]" description="[Section description]" />
          <div className="card-grid card-grid-3">
            {trustItems.map((Icon, index) => (
              <Card className="placeholder-card trust-card" key={index}>
                <div className="icon-box"><Icon aria-hidden="true" /></div>
                <h3>[Trust and safety topic]</h3>
                <p className="placeholder-copy">[Supporting description]</p>
              </Card>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
