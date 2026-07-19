import { FileCheck2, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CandidatesSection() {
  return (
    <section className="page-section candidates-section" id="candidates">
      <Container>
        <Reveal>
          <div className="candidate-layout">
            <div>
              <SectionHeading eyebrow="For Candidates" title="[Section heading]" description="[Section description]" />
              <ButtonLink className="section-cta" href="#find-a-job">[Primary call to action]</ButtonLink>
            </div>
            <div className="candidate-list">
              {[
                [Sparkles, "[Candidate support area]"],
                [FileCheck2, "[Candidate support area]"],
                [MapPin, "[Candidate support area]"],
              ].map(([Icon, title], index) => {
                const CandidateIcon = Icon as typeof Sparkles;
                return (
                  <article className="candidate-item" key={index}>
                    <CandidateIcon aria-hidden="true" />
                    <div><h3>{title as string}</h3><p>[Supporting description]</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
