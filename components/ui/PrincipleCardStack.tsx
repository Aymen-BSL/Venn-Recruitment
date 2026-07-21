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
  { title: "People first", icon: HeartHandshake },
  { title: "Quality over quantity", icon: SlidersHorizontal },
  { title: "Local knowledge, wider reach", icon: Globe2 },
  { title: "Clear communication", icon: MessagesSquare },
  { title: "Long-term fit", icon: TrendingUp },
] as const;

export function PrincipleCardStack() {
  return (
    <ol aria-label="Why choose Venn" className={styles.stack}>
      {principles.map(({ icon: Icon, title }, index) => {
        const cardStyle = {
          "--card-index": index,
          "--card-layer": index + 1,
        } as CSSProperties;

        return (
          <li className={styles.card} key={title} style={cardStyle}>
            <Icon aria-hidden="true" size={27} strokeWidth={1.55} />
            <span>{title}</span>
          </li>
        );
      })}
    </ol>
  );
}
