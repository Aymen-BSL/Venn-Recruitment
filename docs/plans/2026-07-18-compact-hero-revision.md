# Compact Hero Revision Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework the hero to match the restrained spacing and sizing of the supplied Upwork reference without copying its layout or wording.
**Architecture:** Keep a full-bleed local background video and the supplied Venn Recruitment copy, but cap the desktop hero height, use the sans typeface for the headline, and keep all content in one compact left-aligned column. Replace portrait-like footage with a wider collaborative workplace scene and preserve the existing accessible links and GSAP entrance sequence.
**Tech Stack:** Next.js 16, TypeScript, CSS, GSAP, local MP4/JPEG media

---

### Task 1: Select broader workplace footage

**Files:** Replace `public/media/venn-hero.mp4`, `public/media/venn-hero-poster.jpg`; modify `public/media/SOURCE.md`.

1. Search free-use landscape videos showing a team, meeting, or shared workplace activity.
2. Inspect representative frames for composition and appropriate professional clothing.
3. Optimize the selected clip and generate a local poster.

### Task 2: Compact the hero layout

**Files:** Modify `components/sections/home.css`.

1. Cap the desktop hero at approximately 700 to 760 pixels.
2. Set the headline in the sans font with a smaller responsive scale and wider measure.
3. Tighten the eyebrow, description, and CTA spacing.
4. Add clear separation between the CTA row and trust line.
5. Preserve a practical mobile minimum height without forcing a full-height desktop section.

### Task 3: Verify the revision

**Files:** Modify existing hero files only if verification requires it.

1. Run ESLint and the production build.
2. Capture desktop and narrow screenshots.
3. Confirm there is no horizontal overflow or browser-console error.
