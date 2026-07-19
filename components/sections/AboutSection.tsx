import { Reveal } from "@/components/animation/Reveal";
import { AboutIntersection } from "@/components/graphics/AboutIntersection";
import { Container } from "@/components/ui/Container";

export function AboutSection() {
  return (
    <section className="page-section about-section" id="about">
      <Container>
        <Reveal className="about-layout">
          <div className="about-copy">
            <p className="eyebrow text-green">About Venn Recruitment</p>
            <h2 className="section-title">Recruitment built around the right fit.</h2>
            <div className="about-description">
              <p>
                Venn Recruitment was created around a simple idea: the best placements
                happen where a company&apos;s needs and a candidate&apos;s goals come together.
              </p>
              <p>
                We combine local market knowledge, international reach and a people-first
                approach to connect businesses with professionals who are right for the
                role, the team and the future.
              </p>
            </div>
          </div>

          <AboutIntersection />
        </Reveal>
      </Container>
    </section>
  );
}
