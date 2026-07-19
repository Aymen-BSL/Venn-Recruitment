import { BriefcaseBusiness, SearchCheck, Users } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [BriefcaseBusiness, SearchCheck, Users];

export function EmployersSection() {
  return (
    <section className="page-section dark-section" id="employers">
      <span className="section-orbit" aria-hidden="true" />
      <Container>
        <Reveal>
          <div className="section-intro-row">
            <SectionHeading inverse eyebrow="For Employers" title="[Section heading]" description="[Section description]" />
            <ButtonLink href="#hire-talent" variant="light">[Primary call to action]</ButtonLink>
          </div>
          <div className="card-grid card-grid-3">
            {items.map((Icon, index) => (
              <Card className="dark-card placeholder-card" key={index}>
                <div className="icon-box"><Icon aria-hidden="true" /></div>
                <h3>[Employer service]</h3>
                <p className="placeholder-copy">[Service description]</p>
              </Card>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
