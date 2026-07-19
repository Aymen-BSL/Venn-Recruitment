# Header and Hero Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current header and Home presentation with a video-led, Upwork-inspired experience while preserving supplied content and navigation.
**Architecture:** Keep the existing section boundary and header client island, but replace the Home markup and CSS with a full-bleed video composition. Update the global `next/font` pair and simplify GSAP hero selectors to match the new elements.
**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, GSAP, Lucide React

---

### Task 1: Typography

**Files:** Modify `app/layout.tsx`.

1. Replace the current Google font pair with Instrument Sans and Fraunces.
2. Preserve the existing CSS variable API so later sections continue to render.
3. Run TypeScript validation through the production build.

### Task 2: Local hero media

**Files:** Create `public/media/venn-hero.mp4` and `public/media/venn-hero-poster.jpg`.

1. Download a commercially usable workplace video from the selected stock source.
2. Store the media locally to avoid a runtime third-party dependency.
3. Confirm both media files return successful local HTTP responses.

### Task 3: Header redesign

**Files:** Modify `components/layout/Header.tsx`, `components/layout/header.css`.

1. Simplify the wordmark and desktop navigation styling.
2. Add transparent-at-top and solid-on-scroll header states.
3. Restyle the two primary header actions and mobile menu without changing their destinations.

### Task 4: Hero redesign

**Files:** Modify `components/sections/HomeSection.tsx`, `components/sections/home.css`.

1. Replace the Venn illustration and pathway cards with the background video.
2. Place the supplied Home copy over a readable overlay.
3. Add the two decision buttons using the original labels `Find Your Next Opportunity` and `Hire the Right Talent`.
4. Preserve semantic heading order, supplied trust content, and anchor destinations.

### Task 5: Motion and verification

**Files:** Modify `components/animation/HeroMotion.tsx` only if required.

1. Remove obsolete Venn animation selectors.
2. Verify reduced-motion behavior and GSAP cleanup.
3. Run lint and production build.
4. Start the site and verify header, hero, media responses, links, and server logs.
