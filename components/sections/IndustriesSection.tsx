import { Building2, Cpu, HeartPulse, Landmark, Plane, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Building2, Cpu, HeartPulse, Landmark, Plane, ShoppingBag];

export function IndustriesSection() {
  return (
    <section className="page-section industries-section" id="industries">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Industries We Serve" title="[Section heading]" description="[Section description]" />
          <div className="industry-grid">
            {icons.map((Icon, index) => (
              <article className="industry-card" key={index}>
                <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
                <h3>[Industry name]</h3>
                <p>[Industry description]</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
