# Completed Sections UI Consistency Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Confirm and minimally align the visual system across Header, Hero, About, Employers, Candidates, and Industries without redesigning them.
**Architecture:** Audit the shared tokens and section-specific CSS first, then verify the rendered desktop and mobile page when browser access is available. Consolidate only duplicated heading and body-text values whose current differences have no semantic purpose; preserve intentional hero-versus-section scale differences.
**Tech Stack:** Next.js 16, TypeScript, CSS Modules, shared CSS variables, GSAP

---

### Task 1: Establish the pre-audit rollback point

**Files:**

- Checkpoint: `app/globals.css`
- Checkpoint: `components/sections/sections.css`

**Step 1: Commit meaningful current UI changes**

Create a local commit before applying audit fixes.

**Step 2: Confirm remote availability**

Run `git remote -v` and report clearly if no push destination exists.

### Task 2: Audit the visual system

**Files:**

- Review: `app/globals.css`
- Review: `components/layout/header.css`
- Review: `components/sections/home.css`
- Review: `components/sections/sections.css`
- Review: `components/sections/CandidatesSection.module.css`
- Review: `components/sections/IndustriesSection.module.css`

**Step 1: Compare heading typography**

Record font family, weight, size, tracking, line-height, and width for the Hero and four completed content sections.

**Step 2: Compare shared body text and eyebrow styles**

Check supporting-copy size, line-height, color contrast, and eyebrow spacing.

**Step 3: Compare layout and interaction tokens**

Check containers, section padding, viewport behavior, button dimensions, focus states, hover states, and reduced-motion handling.

**Step 4: Review rendered layouts**

Capture desktop and mobile views when an approved browser runtime is available; otherwise report the limitation and complete the code-level audit.

### Task 3: Apply minimal consistency fixes

**Files:**

- Modify only files with a confirmed inconsistency.

**Step 1: Centralize repeated section-heading values**

Create or reuse shared variables for matching section-level heading typography while retaining the hero's intentional larger maximum size.

**Step 2: Align repeated supporting-copy values**

Use a single section body-text size and line-height where the content role is the same.

**Step 3: Preserve intentional differences**

Do not flatten dark/light themes, distinct layouts, or responsive section behavior that serves content hierarchy.

### Task 4: Verify and save the reviewed state

**Files:**

- Verify all modified files.

**Step 1: Run focused source checks and ESLint**

Expected: no obsolete style overrides or lint errors.

**Step 2: Commit the post-audit state**

Create a separate local commit after the review so the pre-audit checkpoint remains directly recoverable.

**Step 3: Push if a remote exists**

Push the branch only when a configured remote is available; otherwise provide the exact missing prerequisite.
