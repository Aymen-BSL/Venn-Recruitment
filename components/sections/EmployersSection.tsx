import { Reveal } from "@/components/animation/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { BadgeCheck, Globe2, ScanSearch } from "lucide-react";

const employerPoints = [
  {
    icon: ScanSearch,
    title: "A deeper understanding",
    description:
      "We learn how the role fits your team, culture and goals.",
  },
  {
    icon: BadgeCheck,
    title: "Carefully matched talent",
    description:
      "We introduce relevant, qualified candidates instead of unsuitable profiles.",
  },
  {
    icon: Globe2,
    title: "Local and international reach",
    description:
      "Access talent across the Middle East and international markets.",
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
                Hiring well takes more than matching a CV to a job description. We learn
                what the role requires and what success looks like for your team and
                business.
              </p>
              <p>
                Then we connect you with professionals whose skills and ambitions align.
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
                <span className="employers-point-icon" aria-hidden="true">
                  <point.icon size={22} strokeWidth={1.7} />
                </span>
                <div className="employers-point-copy">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
