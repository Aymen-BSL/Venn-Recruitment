"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          y: 0,
          scrollTrigger: { trigger: root.current, start: "top 86%", once: true },
        },
      );
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
