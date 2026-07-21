"use client";

import gsap from "gsap";
import { Plus } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./FaqAccordion.module.css";

const items = [
  {
    id: "candidate-fees",
    question: "Do candidates pay to use Venn Recruitment?",
    answer:
      "No. Candidates are not charged for submitting their CV, applying for opportunities or receiving support during the recruitment process.",
  },
  {
    id: "submission-response",
    question: "Will I be contacted after submitting my CV?",
    answer:
      "We review every submission, but we may only contact candidates whose experience matches a current or upcoming opportunity.",
  },
  {
    id: "international-opportunities",
    question: "Can I apply for opportunities outside my current country?",
    answer:
      "Yes. We support local and international recruitment, although eligibility will depend on the role, location and employer requirements.",
  },
  {
    id: "visa-relocation",
    question: "Does Venn Recruitment assist with visas and relocation?",
    answer:
      "Visa and relocation support varies between employers and opportunities. Any available support will be discussed during the recruitment process.",
  },
  {
    id: "existing-application",
    question: "Can I contact Venn about an existing application?",
    answer:
      "Yes. You can contact our team through the website and provide the relevant details so we can assist you.",
  },
  {
    id: "recruitment-timeline",
    question: "How long does the recruitment process take?",
    answer:
      "Timelines vary depending on the role, the employer and the number of interview stages. We aim to keep candidates and employers informed throughout the process.",
  },
  {
    id: "personal-information",
    question: "How does Venn protect my personal information?",
    answer:
      "We handle candidate and employer information carefully and use it only for legitimate recruitment purposes in line with our privacy policy.",
  },
] as const;

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const panels = useRef(new Map<string, HTMLDivElement>());
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const tweens = items.flatMap((item) => {
      const panel = panels.current.get(item.id);
      if (!panel) return [];

      const isOpen = openId === item.id;
      gsap.killTweensOf(panel);
      gsap.killTweensOf(panel.firstElementChild);

      if (reducedMotion) {
        gsap.set(panel, { height: isOpen ? "auto" : 0 });
        gsap.set(panel.firstElementChild, { autoAlpha: isOpen ? 1 : 0 });
        return [];
      }

      return [
        gsap.to(panel, {
          duration: isOpen ? 0.36 : 0.28,
          ease: "power2.inOut",
          height: isOpen ? "auto" : 0,
        }),
        gsap.to(panel.firstElementChild, {
          autoAlpha: isOpen ? 1 : 0,
          duration: isOpen ? 0.28 : 0.18,
          ease: "power2.out",
        }),
      ];
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [openId, reducedMotion]);

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${item.id}-panel`;
        const buttonId = `${item.id}-button`;

        return (
          <article
            className={`${styles.item} ${isOpen ? styles.open : ""}`}
            key={item.id}
          >
            <h3 className={styles.question}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={styles.trigger}
                id={buttonId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                type="button"
              >
                <span>{item.question}</span>
                <Plus
                  aria-hidden="true"
                  className={styles.icon}
                  size={21}
                  strokeWidth={1.8}
                />
              </button>
            </h3>
            <div
              aria-hidden={!isOpen}
              aria-labelledby={buttonId}
              className={styles.panel}
              id={panelId}
              ref={(node) => {
                if (node) panels.current.set(item.id, node);
                else panels.current.delete(item.id);
              }}
              role="region"
            >
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
