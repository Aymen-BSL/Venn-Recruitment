# Recruitment Form Pages Redesign

## Goal

Turn `/submit-cv` and `/hire-talent` into complete conversion pages whose forms use exactly the same visual language as the homepage Contact Us form.

## Chosen direction

Extract the Contact Us field treatment into one shared form style instead of duplicating its CSS. All three forms share transparent controls, underline borders, visually hidden labels, restrained placeholders, a full-width pill action, and consistent success messaging. The dedicated pages apply a light variant so their colours match the Trust and Safety section while preserving the Contact Us form structure.

## Visual system

- **Palette:** paper `#f8f9fa` for the page, white for the form card, ink `#1e1f22` for copy, and green `#217b6d` for controls and accents, matching Trust and Safety.
- **Type:** Host Grotesk for display, body, and utility text, matching the rest of the site.
- **Layout:** Editorial introduction at left, white form surface at right; stacked on mobile.
- **Signature:** A restrained pair of green overlapping outlines sits in the form surface's top-right corner, echoing Venn's matching concept without affecting field readability.
- **Form language:** Concrete, human placeholders with no bracketed filler copy.

## Content

The candidate form asks only for contact information, current context, role/location interests, a CV, and an optional note. The employer form asks for the contact, company, role, location, hiring timeline, and assignment context. Intro copy explains what happens after submission without promising a placement or response time that the current business information cannot support.

## Behavior and accessibility

Retain native browser validation for required fields and valid email/URL/file input types. Labels remain available to assistive technology, focus states are visible, file guidance is explicit, and successful submissions use a live status message. The current repository has no submission backend, so the components remain frontend-only and should be connected to an approved endpoint before launch.
