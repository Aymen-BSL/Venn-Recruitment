import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { WhyChooseIllustration } from "@/components/ui/WhyChooseIllustration";

import styles from "./WhyChooseSection.module.css";

export function WhyChooseSection() {
  return (
    <section
      aria-labelledby="why-choose-title"
      className={`page-section dark-section why-section ${styles.section}`}
      id="why-choose-venn"
    >
      <Container>
        <Reveal className={styles.layout}>
          <header className={styles.introduction}>
            <p className="eyebrow text-sand">Why Choose Venn</p>
            <h2
              className={`section-title ${styles.title}`}
              id="why-choose-title"
            >
              Recruitment shaped around people, not just positions.
            </h2>
            <p className={styles.description}>
              Good recruitment starts with understanding what employers and
              candidates need. That understanding guides every search, introduction
              and conversation.
            </p>
          </header>

          <div className={styles.visual}>
            <WhyChooseIllustration />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
