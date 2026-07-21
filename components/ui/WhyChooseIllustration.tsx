"use client";

import gsap from "gsap";
import {
  Globe2,
  HeartHandshake,
  MessagesSquare,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import styles from "./WhyChooseIllustration.module.css";

const principles = [
  {
    label: "People first",
    icon: HeartHandshake,
    position: styles.people,
  },
  {
    label: "Quality over quantity",
    icon: SlidersHorizontal,
    position: styles.quality,
  },
  {
    label: "Local knowledge, wider reach",
    icon: Globe2,
    position: styles.reach,
  },
  {
    label: "Clear communication",
    icon: MessagesSquare,
    position: styles.communication,
  },
  {
    label: "Long-term fit",
    icon: TrendingUp,
    position: styles.longTerm,
  },
] as const;

const paths = [
  "M95 85 C160 110 190 190 250 230",
  "M500 80 C440 115 410 185 350 230",
  "M60 285 C140 285 190 270 250 260",
  "M545 280 C460 280 410 270 350 260",
  "M300 475 C300 400 300 350 300 305",
] as const;

export function WhyChooseIllustration() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(`.${styles.flowPath}`, {
        duration: 1.7,
        ease: "none",
        repeat: -1,
        stagger: 0.12,
        strokeDashoffset: -36,
      });

      gsap.to(`.${styles.centerLabel}`, {
        duration: 2.6,
        ease: "sine.inOut",
        opacity: 0.68,
        repeat: -1,
        yoyo: true,
      });
    }, rootRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div
      aria-label="Five Venn principles converge on the right fit: people first, quality over quantity, local knowledge with wider reach, clear communication and long-term fit."
      className={styles.illustration}
      ref={rootRef}
      role="img"
    >
      <svg
        aria-hidden="true"
        className={styles.paths}
        viewBox="0 0 600 520"
      >
        {paths.map((path) => (
          <g key={path}>
            <path className={styles.basePath} d={path} />
            <path className={styles.flowPath} d={path} />
          </g>
        ))}
      </svg>

      <ul className={styles.principles}>
        {principles.map(({ icon: Icon, label, position }) => (
          <li className={`${styles.principle} ${position}`} key={label}>
            <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.center} aria-hidden="true">
        <span className={styles.centerLabel}>The right fit</span>
      </div>
    </div>
  );
}
