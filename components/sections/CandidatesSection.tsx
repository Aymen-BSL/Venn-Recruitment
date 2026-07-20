import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import styles from "./CandidatesSection.module.css";

const candidateBenefits = [
  {
    title: "Opportunities that fit",
    description:
      "We focus on roles that align with your experience, ambitions and career goals.",
  },
  {
    title: "Support at every step",
    description:
      "From application to interview and offer, we help you stay informed and prepared.",
  },
  {
    title: "Local and international opportunities",
    description:
      "Explore career opportunities across the Middle East and international markets.",
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
                Finding the right role takes more than applying to every vacancy. We take
                the time to understand your experience, ambitions and what you want from
                your next move.
              </p>
              <p>
                Venn Recruitment connects you with carefully selected opportunities that
                align with your skills, goals and preferred direction.
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
