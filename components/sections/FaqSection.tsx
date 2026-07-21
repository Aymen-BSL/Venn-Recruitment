import { Reveal } from "@/components/animation/Reveal";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { Container } from "@/components/ui/Container";
import styles from "./FaqSection.module.css";

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-title"
      className={`page-section ${styles.section}`}
      id="faq"
    >
      <Container>
        <div className={styles.layout}>
          <Reveal className={styles.introduction}>
            <p className="eyebrow text-green">Frequently Asked Questions</p>
            <h2 className={`section-title ${styles.title}`} id="faq-title">
              Answers to common recruitment questions.
            </h2>
            <p className={styles.description}>
              Find practical information about submitting your CV, hiring talent and
              working with Venn Recruitment.
            </p>
          </Reveal>
          <Reveal className={styles.questions}>
            <FaqAccordion />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
