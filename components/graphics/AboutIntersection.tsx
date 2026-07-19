"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutIntersection() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;

    const context = gsap.context(() => {
      const outlines = gsap.utils.toArray<SVGRectElement>("[data-about-outline]");

      outlines.forEach((outline, index) => {
        gsap.to(outline, {
          duration: index === 0 ? 22 : 25,
          ease: "none",
          repeat: -1,
          strokeDashoffset: index === 0 ? -100 : 100,
        });
      });
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <figure
      ref={root}
      className="about-intersection"
      role="img"
      aria-label="What companies need and what candidates want meet at Venn Recruitment"
    >
      <svg
        className="about-intersection-lines"
        viewBox="0 0 760 440"
        aria-hidden="true"
      >
        <rect
          className="about-outline about-outline-company"
          data-about-outline
          x="42"
          y="62"
          width="430"
          height="316"
          rx="34"
          pathLength="100"
        />
        <rect
          className="about-outline about-outline-candidate"
          data-about-outline
          x="288"
          y="62"
          width="430"
          height="316"
          rx="34"
          pathLength="100"
        />
      </svg>

      <div className="about-intersection-label about-intersection-company" aria-hidden="true">
        <span>What companies need</span>
        <strong>Skills, experience, fit</strong>
      </div>

      <div className="about-intersection-label about-intersection-candidate" aria-hidden="true">
        <span>What candidates want</span>
        <strong>Opportunity, environment, direction</strong>
      </div>

      <div
        className="about-logo-placeholder"
        aria-label="Temporary Venn Recruitment logo icon"
      >
        V
      </div>
    </figure>
  );
}
