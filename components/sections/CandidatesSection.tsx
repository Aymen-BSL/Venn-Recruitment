import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import styles from "./CandidatesSection.module.css";

const candidateBenefits = [
  {
    title: "Opportunities that fit",
    description:
      "Roles aligned with your experience, ambitions and career goals.",
  },
  {
    title: "Support at every step",
    description:
      "Stay informed and prepared from application through offer.",
  },
  {
    title: "Local and international opportunities",
    description:
      "Explore roles across the Middle East and international markets.",
  },
];

export function CandidatesSection() {
  return (
    <section
      className={`page-section candidates-section ${styles.section}`}
      id="candidates"
      aria-labelledby="candidates-title"
    >
      <Container>
        <Reveal className={styles.layout}>
          <div className={styles.content}>
            <header className={styles.heading}>
              <p className="eyebrow text-green">For Candidates</p>
              <h2 className={`section-title ${styles.title}`} id="candidates-title">
                Find the opportunity that moves your career forward.
              </h2>
            </header>

            <div className={styles.description}>
              <p>
                The right role is not found by applying everywhere. We understand your
                experience, ambitions and what matters in your next move.
              </p>
              <p>
                Then we connect you with opportunities that fit your skills and goals.
              </p>
            </div>

            <ButtonLink className={styles.action} href="/submit-cv">
              Find Your Next Opportunity
            </ButtonLink>
          </div>

          <ul className={styles.benefits} aria-label="How Venn Recruitment supports candidates">
            {candidateBenefits.map((benefit) => (
              <li className={styles.benefit} key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
