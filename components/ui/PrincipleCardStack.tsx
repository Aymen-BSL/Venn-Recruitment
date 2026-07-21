import {
  Globe2,
  HeartHandshake,
  MessagesSquare,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import type { CSSProperties } from "react";

import styles from "./PrincipleCardStack.module.css";

const principles = [
  {
    title: "People first",
    description:
      "We understand the individuals and businesses behind every opportunity.",
    icon: HeartHandshake,
  },
  {
    title: "Quality over quantity",
    description:
      "We prioritise relevant matches instead of unsuitable profiles or roles.",
    icon: SlidersHorizontal,
  },
  {
    title: "Local knowledge, wider reach",
    description:
      "We combine Middle East market knowledge with international reach.",
    icon: Globe2,
  },
  {
    title: "Clear communication",
    description:
      "We keep employers and candidates informed throughout the process.",
    icon: MessagesSquare,
  },
  {
    title: "Long-term fit",
    description:
      "We consider lasting career progress and sustainable business growth.",
    icon: TrendingUp,
  },
] as const;

export function PrincipleCardStack() {
  return (
    <ol aria-label="Why choose Venn" className={styles.stack}>
      {principles.map(({ description, icon: Icon, title }, index) => {
        const cardStyle = {
          "--card-index": index,
          "--card-layer": index + 1,
        } as CSSProperties;

        return (
          <li className={styles.card} key={title} style={cardStyle}>
            <Icon aria-hidden="true" size={27} strokeWidth={1.55} />
            <div className={styles.copy}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
