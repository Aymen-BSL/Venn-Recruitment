import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { PrincipleCardStack } from "@/components/ui/PrincipleCardStack";

import styles from "./WhyChooseSection.module.css";

export function WhyChooseSection() {
  return (
    <section
      aria-labelledby="why-choose-title"
      className={`page-section dark-section why-section ${styles.section}`}
      id="why-choose-venn"
    >
      <Container>
        <div className={styles.layout}>
          <Reveal className={styles.introduction}>
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
          </Reveal>

          <div className={styles.visual}>
            <PrincipleCardStack />
          </div>
        </div>
      </Container>
    </section>
  );
}
