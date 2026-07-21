import { BadgeCheck, CircleDollarSign, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import styles from "./TrustSafetySection.module.css";

const trustPrinciples = [
  {
    description:
      "We use candidate and business information only for recruitment and communication, and share profiles only with appropriate consent.",
    icon: ShieldCheck,
    title: "Responsible data handling",
  },
  {
    description:
      "Candidates do not pay Venn to submit a CV, apply for a role or take part in the recruitment process.",
    icon: CircleDollarSign,
    title: "No candidate fees",
  },
  {
    description:
      "Use Venn's verified channels and contact us if a message requests payment or unusual personal information.",
    icon: BadgeCheck,
    title: "Verified communication",
  },
] as const;

export function TrustSafetySection() {
  return (
    <section
      aria-labelledby="trust-safety-title"
      className={`page-section ${styles.section}`}
      id="trust-safety"
    >
      <Container>
        <div className={styles.layout}>
          <Reveal className={styles.introduction}>
            <p className="eyebrow text-green">Trust and Safety</p>
            <h2 className={`section-title ${styles.title}`} id="trust-safety-title">
              Recruitment built on clear and responsible practices.
            </h2>
            <p className={styles.description}>
              Recruitment requires trust. We protect the information shared with
              us, communicate through verified channels and never charge
              candidates for access to opportunities.
            </p>
            <ButtonLink className={styles.action} href="#contact" variant="primary">
              Report a Concern
            </ButtonLink>
          </Reveal>

          <Reveal className={styles.principles}>
            <ul className={styles.principleList}>
              {trustPrinciples.map(({ description, icon: Icon, title }) => (
                <li className={styles.principle} key={title}>
                  <div className={styles.principleHeading}>
                    <Icon aria-hidden="true" size={26} strokeWidth={1.7} />
                    <h3>{title}</h3>
                  </div>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
