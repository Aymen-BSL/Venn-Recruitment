import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { InteractiveImageAccordion } from "@/components/ui/InteractiveImageAccordion";
import styles from "./CandidatesSection.module.css";

const candidateBenefits = [
  {
    title: "Opportunities that fit",
    description:
      "Roles aligned with your experience, ambitions and career goals.",
    image: "/media/candidates/opportunity-fit.png",
  },
  {
    title: "Support at every step",
    description:
      "Stay informed and prepared from application through offer.",
    image: "/media/candidates/guided-support.png",
  },
  {
    title: "Local and international opportunities",
    description:
      "Explore roles across the Middle East and international markets.",
    image: "/media/candidates/international-opportunities.png",
  },
];

export function CandidatesSection() {
  return (
    <section
      className={`page-section candidates-section ${styles.section}`}
      id="candidates"
      aria-labelledby="candidates-title"
    >
      <div
        aria-hidden="true"
        className="section-venn-orbits section-venn-orbits-candidates"
      >
        <span />
        <span />
      </div>
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

          <InteractiveImageAccordion
            className={styles.benefits}
            items={candidateBenefits}
            label="How Venn Recruitment supports candidates"
          />
        </Reveal>
      </Container>
    </section>
  );
}
