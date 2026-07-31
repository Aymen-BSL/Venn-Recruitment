import type { ReactNode } from "react";
import styles from "./Marquee.module.css";

type MarqueeProps = {
  children: ReactNode;
  pauseOnHover?: boolean;
};

export function Marquee({ children, pauseOnHover = false }: MarqueeProps) {
  return (
    <div
      className={`${styles.marquee} ${pauseOnHover ? styles.pauseOnHover : ""}`}
    >
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div aria-hidden="true" className={styles.group}>
          {children}
        </div>
      </div>
    </div>
  );
}
