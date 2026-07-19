"use client";

import gsap from "gsap";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const items = Array.from({ length: 5 }, (_, index) => ({
  id: `faq-${index + 1}`,
  question: `[Frequently asked question ${index + 1}]`,
  answer: `[Answer to frequently asked question ${index + 1}]`,
}));

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(items[0].id);
  const panels = useRef(new Map<string, HTMLDivElement>());
  const reducedMotion = useReducedMotion();

  function toggle(id: string) {
    const nextOpen = openId === id ? null : id;
    const currentPanel = openId ? panels.current.get(openId) : null;

    if (!reducedMotion) {
      if (currentPanel) gsap.to(currentPanel, { height: 0, duration: 0.28, ease: "power2.inOut" });
    }
    setOpenId(nextOpen);
    if (!reducedMotion && nextOpen) {
      window.requestAnimationFrame(() => {
        const nextPanel = panels.current.get(nextOpen);
        if (nextPanel) gsap.fromTo(nextPanel, { height: 0 }, { height: "auto", duration: 0.32, ease: "power2.inOut" });
      });
    }
  }

  return (
    <div className="faq-list">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article className={`faq-item ${isOpen ? "faq-item-open" : ""}`} key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-button`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <Plus aria-hidden="true" size={22} />
              </button>
            </h3>
            <div
              className="faq-panel"
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-button`}
              hidden={!isOpen}
              ref={(node) => {
                if (node) panels.current.set(item.id, node);
                else panels.current.delete(item.id);
              }}
            >
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
