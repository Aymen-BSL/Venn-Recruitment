# Venn Recruitment Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete, responsive Next.js 16 recruitment landing page in the exact required section order.
**Architecture:** Compose a server-rendered page from reusable section and design-system components, with isolated client components for GSAP, navigation, and accordion interactions. Keep content data and repeated placeholder patterns centralized where practical.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP, Lucide React

---

### Task 1: Project foundation

**Files:** Create `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`.

1. Define the required scripts and minimum dependencies.
2. Configure strict TypeScript, Next.js, Tailwind v4 PostCSS, and ESLint.
3. Install dependencies and confirm the Next CLI is available.

### Task 2: Global design system

**Files:** Create `app/globals.css`, `components/ui/*`.

1. Define brand variables, typography, spacing, focus, form, and animation states.
2. Build reusable container, heading, button, card, badge, and form-field primitives.
3. Verify components are typed and server-safe by default.

### Task 3: App shell and metadata

**Files:** Create `app/layout.tsx`, `app/page.tsx`, `public/social-preview.svg`, `app/icon.svg`.

1. Configure `next/font` and placeholder metadata.
2. Add social and favicon assets.
3. Compose the exact section order in the page server component.

### Task 4: Header and hero

**Files:** Create `components/layout/Header.tsx`, `components/sections/HomeSection.tsx`, `components/graphics/VennHeroVisual.tsx`.

1. Implement supplied navigation and actions with stable anchors.
2. Implement the supplied Home copy and pathways.
3. Add the accessible mobile menu and hero geometry.

### Task 5: Placeholder content sections

**Files:** Create one component under `components/sections/` for each remaining required section.

1. Implement About, Employer, Candidate, and job-search sections.
2. Implement CV, vacancy, industries, locations, process, and value sections.
3. Implement FAQ, contact, trust, footer, and legal sections.
4. Confirm all non-supplied marketing copy uses labeled placeholders only.

### Task 6: Forms and interactions

**Files:** Create `components/forms/*`, `components/interactive/FaqAccordion.tsx`.

1. Build labeled job-search, CV, vacancy, and contact forms.
2. Add validation-ready attributes and styled error, success, and disabled states.
3. Build a keyboard-accessible FAQ accordion.

### Task 7: GSAP motion system

**Files:** Create `hooks/useGsapReveal.ts`, `hooks/useReducedMotion.ts`, `components/animation/*`.

1. Register ScrollTrigger only in client code.
2. Add hero entrance, section reveals, subtle geometry drift, navigation transitions, mobile menu, and FAQ motion.
3. Scope and clean up every GSAP context and respect reduced motion.

### Task 8: Verification

**Files:** Update implementation files only as defects are found.

1. Run lint and fix all findings.
2. Run the production build and fix TypeScript or rendering failures.
3. Start the app and inspect responsive states, interactions, anchors, and console output.
4. Confirm exact section order and placeholder-copy compliance.
