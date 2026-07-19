import { ArrowRight } from "lucide-react";
import { HeroMotion } from "@/components/animation/HeroMotion";
import { HeroVideo } from "@/components/graphics/HeroVideo";
import { Container } from "@/components/ui/Container";

export function HomeSection() {
  return (
    <section className="home-section" id="home">
      <HeroVideo />
      <div className="hero-overlay" aria-hidden="true" />
      <HeroMotion>
        <Container className="hero-container">
          <div className="hero-copy" data-hero-copy>
            <p className="hero-eyebrow">Recruitment across the Middle East and beyond</p>
            <h1>Where the right people and the right opportunities meet.</h1>
            <p className="hero-description">
              Venn Recruitment connects ambitious professionals with companies looking for the right talent. We bring together business needs, career goals and market knowledge to create matches that work for everyone.
            </p>
          </div>

          <div className="hero-actions" data-hero-actions>
            <a className="hero-action hero-action-primary" href="#find-a-job">
              Find Your Next Opportunity
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="hero-action hero-action-secondary" href="#hire-talent">
              Hire the Right Talent
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <p className="trust-line" data-hero-trust>Local expertise. International reach. People-first recruitment.</p>
        </Container>
      </HeroMotion>
    </section>
  );
}
