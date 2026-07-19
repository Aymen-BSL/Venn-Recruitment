# Dedicated Recruitment Form Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the three form-oriented landing sections and replace them with dedicated candidate and employer form routes.
**Architecture:** Keep the homepage focused on the remaining content sections. Route all candidate conversion links to `/submit-cv` and all employer conversion links to `/hire-talent`, using one shared server-rendered form-page shell around the existing client form components.
**Tech Stack:** Next.js 16 App Router, TypeScript, CSS, React form components

---

### Task 1: Remove obsolete landing sections

**Files:** Modify `app/page.tsx`; delete `components/sections/FindJobSection.tsx`, `components/sections/SubmitCvSection.tsx`, `components/sections/HireTalentSection.tsx`, and `components/forms/JobSearchForm.tsx`.

1. Remove the three imports from the homepage.
2. Remove the three components from the homepage section sequence.
3. Delete the unused section and job-search form files.

### Task 2: Create shared dedicated-page layout

**Files:** Create `components/layout/FormPageShell.tsx` and `components/layout/form-page.css`; modify `app/globals.css`.

1. Add an accessible internal header with a home link and cross-route action.
2. Add a responsive intro and form-card layout.
3. Add restrained responsive styling and visible focus behavior.

### Task 3: Create candidate and employer routes

**Files:** Create `app/submit-cv/page.tsx` and `app/hire-talent/page.tsx`; modify existing form components.

1. Build `/submit-cv` around `CvSubmissionForm`.
2. Build `/hire-talent` around `VacancyForm`.
3. Use concrete form-submit labels while retaining placeholder introduction and success content.

### Task 4: Update conversion links

**Files:** Modify `components/layout/Header.tsx`, `components/sections/HomeSection.tsx`, `components/sections/CandidatesSection.tsx`, `components/sections/EmployersSection.tsx`, and `components/sections/FooterSection.tsx`.

1. Route candidate actions to `/submit-cv`.
2. Route employer actions to `/hire-talent`.
3. Search the codebase for removed hash targets.

### Task 5: Verify and commit

**Files:** No planned source changes.

1. Run ESLint.
2. Run the production build and confirm both routes are statically generated.
3. Inspect the homepage and both form pages at desktop and mobile widths.
4. Commit the completed route restructuring to Git.

### Task 6: Complete the Host Grotesk migration

**Files:** Modify `app/globals.css`, `components/sections/sections.css`, and any remaining component stylesheet that references the old display-font token.

1. Preserve the user-provided `Host_Grotesk` setup in `app/layout.tsx`.
2. Remove the obsolete display-font theme token.
3. Replace every display-font declaration and serif fallback with Host Grotesk.
4. Search the project for old font imports, variables, and fallbacks before committing.
