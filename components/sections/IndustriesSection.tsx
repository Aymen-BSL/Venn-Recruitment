import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { IndustryCarousel } from "@/components/ui/IndustryCarousel";
import styles from "./IndustriesSection.module.css";

export function IndustriesSection() {
  return (
    <section
      className={`page-section industries-section ${styles.section}`}
      id="industries"
      aria-labelledby="industries-title"
    >
      <Container>
        <Reveal>
          <header className={styles.introduction}>
            <div className={styles.heading}>
              <p className="eyebrow text-green">Industries We Serve</p>
              <h2 className={`section-title ${styles.title}`} id="industries-title">
                Connecting talent with the industries shaping tomorrow.
              </h2>
            </div>

            <div className={styles.description}>
              <p>
                Each industry has distinct challenges and talent needs. We learn what
                matters in every sector before connecting businesses with experienced
                professionals.
              </p>
              <p>
                Our approach combines sector awareness, local knowledge and international
                reach.
              </p>
            </div>
          </header>

          <IndustryCarousel />
        </Reveal>
      </Container>
    </section>
  );
}
