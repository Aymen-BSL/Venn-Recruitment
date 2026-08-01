"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./Marquee.module.css";

type MarqueeProps = {
  children: ReactNode;
  pauseOnHover?: boolean;
};

export function Marquee({ children, pauseOnHover = false }: MarqueeProps) {
  const [pausedByTouch, setPausedByTouch] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pausedByTouch) return;

    function resumeOutsideMarquee(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setPausedByTouch(false);
      }
    }

    document.addEventListener("pointerdown", resumeOutsideMarquee);
    return () =>
      document.removeEventListener("pointerdown", resumeOutsideMarquee);
  }, [pausedByTouch]);

  return (
    <div
      ref={rootRef}
      className={`${styles.marquee} ${pauseOnHover ? styles.pauseOnHover : ""} ${pausedByTouch ? styles.paused : ""}`}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") setPausedByTouch(true);
      }}
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
