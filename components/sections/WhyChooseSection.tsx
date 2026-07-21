import {
  Globe2,
  HeartHandshake,
  MessagesSquare,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";

import styles from "./WhyChooseSection.module.css";

const reasons = [
  {
    title: "A people-first approach",
    description:
      "We learn what matters to each employer and candidate before recommending a match.",
    icon: HeartHandshake,
  },
  {
    title: "Quality over quantity",
    description:
      "We share relevant people and opportunities, not volume for its own sake.",
    icon: SlidersHorizontal,
  },
  {
    title: "Local knowledge, wider reach",
    description:
      "We combine Middle East market knowledge with access to international talent and opportunities.",
    icon: Globe2,
  },
  {
    title: "Clear communication",
    description:
      "Employers and candidates know what is happening throughout the process.",
    icon: MessagesSquare,
  },
  {
    title: "Long-term fit",
    description:
      "We consider how each placement can support career progress and business growth.",
    icon: TrendingUp,
  },
] as const;

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
              Good recruitment starts with understanding the business, the person
              and what both need to succeed. That understanding guides every search,
              introduction and conversation.
            </p>
          </header>

          <ul className={styles.reasonList}>
            {reasons.map(({ description, icon: Icon, title }) => (
              <li className={styles.reason} key={title}>
                <Icon
                  aria-hidden="true"
                  className={styles.icon}
                  size={25}
                  strokeWidth={1.6}
                />
                <div className={styles.reasonContent}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
