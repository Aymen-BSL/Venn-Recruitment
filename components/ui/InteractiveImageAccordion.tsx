"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./InteractiveImageAccordion.module.css";

export interface InteractiveImageAccordionItem {
  title: string;
  description: string;
  image: string;
}

interface InteractiveImageAccordionProps {
  className?: string;
  items: InteractiveImageAccordionItem[];
  label: string;
}

export function InteractiveImageAccordion({
  className,
  items,
  label,
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className={`${styles.accordion} ${className ?? ""}`}
      aria-label={label}
      role="group"
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            className={styles.item}
            data-active={isActive}
            type="button"
            aria-expanded={isActive}
            key={item.title}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <Image
              alt=""
              className={styles.image}
              fill
              sizes="(min-width: 900px) 38vw, 100vw"
              src={item.image}
            />
            <span className={styles.scrim} aria-hidden="true" />
            <span className={styles.content}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
