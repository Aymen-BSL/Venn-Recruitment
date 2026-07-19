import { Reveal } from "@/components/animation/Reveal";
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

          <div className="about-concept" aria-label="The Venn Recruitment concept">
            <div className="about-concept-pair">
              <article className="about-concept-card">
                <p className="about-concept-label">What companies need</p>
                <h3>The right skills, experience and cultural fit.</h3>
              </article>

              <article className="about-concept-card">
                <p className="about-concept-label">What candidates want</p>
                <h3>The right opportunity, environment and direction.</h3>
              </article>
            </div>

            <article className="about-concept-card about-concept-match">
              <p className="about-concept-label">Where they meet</p>
              <h3>A match designed to create long-term value for both.</h3>
            </article>
          </div>

          <div className="about-closing">
            <p>
              We do more than fill roles. We create connections that move people and
              businesses forward.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
