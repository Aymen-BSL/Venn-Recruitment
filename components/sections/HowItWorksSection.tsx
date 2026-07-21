import { BadgeCheck, Handshake, MessageSquareText, Search } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";

import styles from "./HowItWorksSection.module.css";

const processSteps = [
  {
    title: "Listen",
    description:
      "We learn about the role, the business and the candidate's experience, goals and expectations.",
    icon: MessageSquareText,
  },
  {
    title: "Search and assess",
    description:
      "We identify suitable people and opportunities, then look beyond the CV or job description to assess overall fit.",
    icon: Search,
  },
  {
    title: "Connect",
    description:
      "We introduce candidates and employers when their needs and ambitions align.",
    icon: Handshake,
  },
  {
    title: "Support",
    description:
      "We provide clear communication and guidance through interviews, offers and placement.",
    icon: BadgeCheck,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className={`page-section process-section ${styles.section}`}
      id="how-it-works"
    >
      <Container>
        <Reveal>
          <header className={styles.introduction}>
            <div className={styles.heading}>
              <p className="eyebrow text-green">How It Works</p>
              <h2
                className={`section-title ${styles.title}`}
                id="how-it-works-title"
              >
                A clear process, focused on the right match.
              </h2>
            </div>

            <p className={styles.description}>
              Strong placements start with understanding. We learn what
              employers need and what candidates want before bringing the two
              together.
            </p>
          </header>

          <ol className={styles.processList}>
            {processSteps.map(({ description, icon: Icon, title }) => (
              <li className={styles.step} key={title}>
                <span className={styles.marker} aria-hidden="true">
                  <Icon size={23} strokeWidth={1.7} />
                </span>
                <div className={styles.stepContent}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
