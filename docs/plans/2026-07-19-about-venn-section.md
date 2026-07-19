# About Venn Recruitment Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the About section placeholders with the supplied Venn Recruitment copy and an editorial intersection layout.
**Architecture:** Keep the section as a server component and reuse the existing Container and Reveal components. Add section-specific responsive CSS to the shared section stylesheet, using two neutral concept panels and one green shared-outcome panel.
**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4 variables, CSS, GSAP Reveal wrapper

---

### Task 1: Replace the About section markup

**Files:**

- Modify: `components/sections/AboutSection.tsx`

**Step 1: Verify the current section contains placeholder copy**

Run: `rg -n "\[Section heading\]|\[Section description\]" components/sections/AboutSection.tsx`

Expected: placeholder matches are present.

**Step 2: Implement the supplied content and semantic concept group**

Replace the placeholder cards with the two-column editorial copy, the three supplied concept statements, and the closing statement.

**Step 3: Verify placeholders and obsolete imports are gone**

Run: `rg -n "placeholder|Compass|Handshake|Card|SectionHeading" components/sections/AboutSection.tsx`

Expected: no matches.

### Task 2: Style the responsive intersection composition

**Files:**

- Modify: `components/sections/sections.css`

**Step 1: Remove the obsolete overlap-card rules**

Delete the `.overlap-cards`, `.overlap-card`, `.overlap-card-green`, and `.overlap-card-violet` rules.

**Step 2: Add the desktop section layout**

Add styles for the editorial copy column, concept panel group, green shared-outcome panel, and closing band.

**Step 3: Add responsive layout rules**

At tablet and mobile breakpoints, collapse the section to one column, remove negative overlap, and keep comfortable readable spacing.

### Task 3: Verify and commit

**Files:**

- Verify: `components/sections/AboutSection.tsx`
- Verify: `components/sections/sections.css`

**Step 1: Run lint**

Run: `npm run lint`

Expected: exit code 0 with no ESLint errors.

**Step 2: Run the production build**

Run: `npm run build`

Expected: Next.js compiles, TypeScript passes, and all routes are generated.

**Step 3: Commit the section milestone**

Run: `git add components/sections/AboutSection.tsx components/sections/sections.css docs/plans/2026-07-19-about-venn-design.md docs/plans/2026-07-19-about-venn-section.md && git commit -m "Build About Venn Recruitment section"`

Expected: a new commit on `main` and a clean working tree.
