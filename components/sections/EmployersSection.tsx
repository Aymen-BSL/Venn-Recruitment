import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

const employerPoints = [
  {
    title: "A deeper understanding",
    description:
      "We look beyond the vacancy to understand your team, culture and business goals.",
  },
  {
    title: "Carefully matched talent",
    description:
      "We focus on relevant, qualified candidates rather than overwhelming you with unsuitable profiles.",
  },
  {
    title: "Local and international reach",
    description:
      "We help you access talent across the Middle East and international markets.",
  },
];

export function EmployersSection() {
  return (
    <section
      className="page-section dark-section employers-section"
      id="employers"
      aria-labelledby="employers-title"
    >
      <Container>
        <Reveal className="employers-layout">
          <header className="employers-heading">
            <p className="eyebrow text-sand">For Employers</p>
            <h2 className="section-title" id="employers-title">
              Find the people your business needs to move forward.
            </h2>
          </header>

          <div className="employers-detail">
            <div className="employers-description">
              <p>
                Hiring the right person takes more than matching a CV to a job
                description. We take the time to understand your business, the role and
                the qualities needed for long-term success.
              </p>
              <p>
                Venn Recruitment connects you with carefully selected professionals whose
                skills, experience and ambitions align with your needs.
              </p>
            </div>

            <div className="employers-actions">
              <ButtonLink href="/hire-talent" variant="light">
                Hire Talent
              </ButtonLink>
              <ButtonLink
                className="employers-secondary-action"
                href="/hire-talent"
                variant="secondary"
              >
                Submit a Vacancy
              </ButtonLink>
            </div>
          </div>

          <ul className="employers-points" aria-label="How Venn Recruitment supports employers">
            {employerPoints.map((point) => (
              <li className="employers-point" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </li>
            ))}
          </ul>

          <p className="employers-closing">
            The right hire does more than fill a role. They strengthen your business.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
