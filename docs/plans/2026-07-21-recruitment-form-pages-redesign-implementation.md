# Recruitment Form Pages Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the Hire Talent and Submit CV pages with real copy and forms that share the Contact Us form design.
**Architecture:** Extract the existing Contact Us field presentation into a CSS module used by all three form components. Keep the shared form-page shell, enrich its page-specific content, and place the dedicated forms on the same violet surface as the homepage contact form.
**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, native HTML forms, Lucide React.

---

### Task 1: Extract the shared form design

**Files:**

- Create: `components/forms/VennLineForm.module.css`
- Modify: `components/forms/ContactForm.tsx`
- Modify: `components/sections/ContactSection.module.css`

**Step 1:** Record the existing Contact Us selectors that define its visual contract.

**Step 2:** Move that contract into a reusable form CSS module, including file/select/hint/error states.

**Step 3:** Apply the shared class to Contact Us and remove the duplicated module selectors.

**Step 4:** Run lint to verify CSS-module and component imports.

### Task 2: Complete the candidate form

**Files:**

- Modify: `components/forms/CvSubmissionForm.tsx`
- Modify: `app/submit-cv/page.tsx`

**Step 1:** Verify the form contains identifiable contact, role-interest, location, CV, and note fields.

**Step 2:** Replace placeholder copy with concise candidate-facing labels and guidance.

**Step 3:** Apply the shared line-form class and accessible success message.

**Step 4:** Add real page metadata and introduction copy.

### Task 3: Complete the employer form

**Files:**

- Modify: `components/forms/VacancyForm.tsx`
- Modify: `app/hire-talent/page.tsx`

**Step 1:** Verify the form contains identifiable contact, company, role, location, timeline, and assignment-detail fields.

**Step 2:** Replace placeholder copy with concise employer-facing labels and guidance.

**Step 3:** Apply the shared line-form class and accessible success message.

**Step 4:** Add real page metadata and introduction copy.

### Task 4: Refine the shared page shell

**Files:**

- Modify: `components/layout/FormPageShell.tsx`
- Modify: `components/layout/form-page.css`

**Step 1:** Add page-specific expectation points under the introduction.

**Step 2:** Restyle the form surface in violet with a restrained overlap motif.

**Step 3:** Verify the two-column and mobile layouts preserve readable order and focus flow.

### Task 5: Verify

**Files:**

- Verify: `app/submit-cv/page.tsx`, `app/hire-talent/page.tsx`, and the homepage Contact Us section.

**Step 1:** Run `npm run lint`.

**Step 2:** Run `npm run build` and confirm both routes remain statically generated.

**Step 3:** Check the generated client bundle for concrete labels and removal of bracketed form placeholders.

**Step 4:** Run `git diff --check` and confirm unrelated working-tree edits remain untouched.
