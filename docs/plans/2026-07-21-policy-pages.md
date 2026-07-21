# Policy Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the footer's placeholder legal hashes with four polished, dedicated policy pages.
**Architecture:** Store policy documents as typed content data and render every route through one reusable server-component shell. Reuse the existing footer and design tokens, with a policy-specific CSS module for document layout.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Lucide React.

---

### Task 1: Add policy content model

**Files:**

- Create: `components/policies/policyContent.ts`

**Step 1:** Define typed policy, section, paragraph, and list structures.

**Step 2:** Add complete content for all four policies with stable slugs and metadata.

**Step 3:** Run TypeScript validation through the production build.

### Task 2: Build the shared policy shell

**Files:**

- Create: `components/policies/PolicyPage.tsx`
- Create: `components/policies/PolicyPage.module.css`

**Step 1:** Implement semantic masthead, policy navigation, article sections, review notice, and site footer.

**Step 2:** Add responsive styling, sticky desktop navigation, focus states, and the Venn overlap motif.

**Step 3:** Run ESLint and resolve any component or accessibility errors.

### Task 3: Add dedicated routes

**Files:**

- Create: `app/privacy-policy/page.tsx`
- Create: `app/terms-and-conditions/page.tsx`
- Create: `app/cookie-policy/page.tsx`
- Create: `app/trust-and-safety/page.tsx`

**Step 1:** Add a route component and page metadata for each policy.

**Step 2:** Run the production build and confirm all four routes are generated.

### Task 4: Connect footer navigation

**Files:**

- Modify: `components/sections/LegalLinksSection.tsx`
- Modify: `components/sections/FooterSection.tsx`

**Step 1:** Replace placeholder hashes and bracketed labels with dedicated policy URLs.

**Step 2:** Make landing-page section links root-relative so shared footers navigate correctly from every route.

**Step 3:** Run ESLint and the production build.

### Task 5: Visual verification

**Files:**

- Verify: all four policy routes and the landing-page footer.

**Step 1:** Start the local development server.

**Step 2:** Capture and inspect desktop and mobile screenshots.

**Step 3:** Correct any overflow, hierarchy, or contrast issues and rerun checks.
