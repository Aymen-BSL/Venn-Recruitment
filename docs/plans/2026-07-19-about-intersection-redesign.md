# About Intersection Illustration Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the rejected About-section cards with a minimal animated rounded-rectangle intersection illustration and keep the desktop section within one viewport.
**Architecture:** Keep the About section itself server-rendered. Isolate the SVG and its GSAP stroke animation in a small client component that cleans itself up and respects reduced motion; use responsive CSS for positioning, sizing, and the desktop viewport cap.
**Tech Stack:** Next.js 16 App Router, TypeScript, CSS, GSAP, SVG

---

### Task 1: Build the animated intersection illustration

**Files:**

- Create: `components/graphics/AboutIntersection.tsx`

**Step 1: Define the accessible visual structure**

Create a labelled figure containing two unfilled overlapping SVG rectangles, two short text groups, and a temporary V mark at the intersection.

**Step 2: Add the isolated GSAP motion**

Animate each rectangle's dash offset slowly in opposite directions, stop all motion when reduced motion is requested, and revert the GSAP context on unmount.

**Step 3: Verify the component has no icon dependency**

Run: `rg -n "lucide|heroicons|<svg.*fill=" components/graphics/AboutIntersection.tsx`

Expected: no imported icon library and no filled illustration shapes.

### Task 2: Replace the rejected concept cards

**Files:**

- Modify: `components/sections/AboutSection.tsx`

**Step 1: Remove the three concept card elements**

Delete the card-pair and filled match-card markup.

**Step 2: Render the new illustration**

Import and render `AboutIntersection` beside the supplied About copy, keeping the supplied closing statement below.

### Task 3: Compact and restyle the section

**Files:**

- Modify: `components/sections/sections.css`

**Step 1: Remove the rejected card rules**

Delete all `.about-concept-*` card and filled-surface declarations.

**Step 2: Style the border-only illustration**

Add responsive SVG, label, and temporary-logo positioning with ink and green border colors only.

**Step 3: Enforce the desktop viewport height**

At desktop widths, set the About section to `100svh`, compact its typography and spacing, and center its content without clipping.

**Step 4: Preserve content safety on small screens**

Use content-driven height below the desktop breakpoint so text and the illustration never overlap or get cut off.

### Task 4: Verify and commit

**Files:**

- Verify: `components/graphics/AboutIntersection.tsx`
- Verify: `components/sections/AboutSection.tsx`
- Verify: `components/sections/sections.css`

**Step 1: Run ESLint**

Run: `npm run lint`

Expected: exit code 0.

**Step 2: Run the production build**

Run: `npm run build`

Expected: compilation, TypeScript, and route generation succeed.

**Step 3: Commit the redesign**

Run: `git add . && git commit -m "Redesign About intersection illustration"`

Expected: a new commit on `main` and a clean working tree.
