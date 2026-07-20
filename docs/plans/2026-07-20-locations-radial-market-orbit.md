# Locations Radial Market Orbit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Locations section key-area table with an accessible orbital visualization adapted to Venn Recruitment's 3 market areas.

**Architecture:** Keep LocationsSection as a server component and pass serializable market data into a small client-side RadialMarketOrbit component. Use CSS animations for continuous orbital motion and React state only for selecting the active market, avoiding the reference component's interval-driven rerenders and unrelated shadcn UI dependencies.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Lucide React

---

### Task 1: Build the orbital component

**Files:**

- Create: `components/ui/RadialMarketOrbit.tsx`
- Create: `components/ui/RadialMarketOrbit.module.css`

**Step 1:** Define serializable market item props and icon-name mapping.

**Step 2:** Render a semantic list of orbital buttons around a centered active-market card.

**Step 3:** Support click, keyboard focus, active state, and descriptive ARIA labels.

**Step 4:** Add slow CSS orbital motion, paused interaction states, and a reduced-motion fallback.

### Task 2: Integrate with Locations

**Files:**

- Modify: `components/sections/LocationsSection.tsx`
- Modify: `components/sections/LocationsSection.module.css`

**Step 1:** Add icon identifiers to the existing 3 market-area records.

**Step 2:** Replace only the right-side table markup with RadialMarketOrbit.

**Step 3:** Remove table-only styles and retain the existing Key areas eyebrow and current section palette.

### Task 3: Verify and save

**Files:**

- Verify: `components/ui/RadialMarketOrbit.tsx`
- Verify: `components/ui/RadialMarketOrbit.module.css`
- Verify: `components/sections/LocationsSection.tsx`

**Step 1:** Run `npm run lint` and resolve all findings.

**Step 2:** Run `npm run build` to verify TypeScript and the client/server boundary.

**Step 3:** Run `git diff --check` and inspect the scoped diff.

**Step 4:** Commit the implementation on `main`.
