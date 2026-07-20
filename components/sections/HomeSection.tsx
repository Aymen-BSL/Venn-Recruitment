import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
            <p className="eyebrow hero-eyebrow">
              Recruitment across the Middle East and beyond
            </p>
            <h1>Where the right people and opportunities meet</h1>
            <p className="hero-description">
              Venn Recruitment connects ambitious professionals with companies
              seeking the right talent. We align business needs, career goals
              and market knowledge to create matches that work for everyone
            </p>
          </div>

          <div className="hero-actions" data-hero-actions>
            <Link className="hero-action hero-action-primary" href="/submit-cv">
              Find Your Next Opportunity
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              className="hero-action hero-action-secondary"
              href="/hire-talent"
            >
              Hire the Right Talent
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </HeroMotion>
    </section>
  );
}
