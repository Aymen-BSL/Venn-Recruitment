# Hero Buttons and Video Revision Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the oversized hero action cards with normal buttons and use culturally appropriate professional footage for the Middle East audience.
**Architecture:** Keep the existing full-bleed video hero, original supplied headline, supporting copy, trust line, and destinations. Simplify the pathway markup to two compact links and replace the local video and generated poster after visually inspecting the selected footage.
**Tech Stack:** Next.js 16, TypeScript, CSS, GSAP, local MP4/JPEG media

---

### Task 1: Select replacement footage

**Files:** Replace `public/media/venn-hero.mp4`, `public/media/venn-hero-poster.jpg`; modify `public/media/SOURCE.md`.

1. Compare landscape professional office clips featuring modest attire.
2. Download the strongest free-use candidate locally.
3. Extract and inspect a representative poster frame.

### Task 2: Resize hero actions

**Files:** Modify `components/sections/HomeSection.tsx`, `components/sections/home.css`.

1. Remove the action-card questions and descriptions.
2. Keep the exact original CTA labels and anchor destinations.
3. Style both actions as conventional compact pill buttons.

### Task 3: Update motion and verify

**Files:** Modify existing hero files only if verification requires it.

1. Confirm the GSAP action reveal still targets both buttons.
2. Run lint and production build.
3. Verify the page, video, poster, original copy, and runtime logs locally.
