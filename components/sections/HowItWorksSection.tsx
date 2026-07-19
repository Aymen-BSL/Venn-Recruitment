import { MessageSquareText, Search, UserCheck } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const processItems = [MessageSquareText, Search, UserCheck];

export function HowItWorksSection() {
  return (
    <section className="page-section process-section" id="how-it-works">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow="How It Works" title="[Section heading]" description="[Section description]" />
          <div className="process-grid">
            {processItems.map((Icon, index) => (
              <article className="process-item" key={index}>
                <div className="process-icon"><Icon aria-hidden="true" /></div>
                <h3>[Process action]</h3>
                <p>[Process description]</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
