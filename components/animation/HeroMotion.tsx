"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero-copy] > *", { autoAlpha: 0, duration: 0.8, stagger: 0.08, y: 28 })
        .from("[data-hero-actions] > *", { autoAlpha: 0, duration: 0.65, stagger: 0.1, y: 24 }, "-=0.38")
        .from("[data-hero-trust]", { autoAlpha: 0, duration: 0.5, y: 14 }, "-=0.25");
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return <div ref={root} className="hero-motion">{children}</div>;
}
