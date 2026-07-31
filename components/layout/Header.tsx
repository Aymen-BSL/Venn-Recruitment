"use client";

import gsap from "gsap";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BrandLogo } from "@/components/ui/BrandLogo";

const navigation = [
  ["Home", "#home"],
  ["About Venn", "#about"],
  ["Our Team", "#team"],
  ["For Employers", "#employers"],
  ["For Candidates", "#candidates"],
  ["Industries", "#industries"],
  ["Locations", "#locations"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useLayoutEffect(() => {
    if (!panel.current || !open || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(panel.current, { autoAlpha: 0, y: -16 }, { autoAlpha: 1, duration: 0.28, ease: "power2.out", y: 0 });
      gsap.from("[data-mobile-link]", { autoAlpha: 0, duration: 0.3, stagger: 0.035, x: -12 });
    }, panel);
    return () => context.revert();
  }, [open, reducedMotion]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="site-container header-inner">
        <Link href="#home" className="wordmark" aria-label="Venn Recruitment home" onClick={closeMenu}>
          <BrandLogo
            className="header-brand-logo"
            eager
            tone={scrolled ? "dark" : "light"}
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link className="nav-link" href={href} key={href}>{label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-cv" href="/submit-cv">Submit Your CV</Link>
          <Link className="header-hire" href="/hire-talent">
            Hire Talent <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>Menu</span>
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {open ? (
        <div ref={panel} className="mobile-panel" id="mobile-menu">
          <nav className="site-container mobile-nav" aria-label="Mobile navigation">
            {navigation.map(([label, href]) => (
              <Link data-mobile-link href={href} key={href} onClick={closeMenu}>{label}</Link>
            ))}
            <div className="mobile-actions" data-mobile-link>
              <Link href="/submit-cv" onClick={closeMenu}>Submit Your CV</Link>
              <Link href="/hire-talent" onClick={closeMenu}>Hire Talent</Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
