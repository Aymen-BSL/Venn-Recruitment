# Policy Pages Design

## Direction

Create four dedicated, indexable pages for Venn Recruitment's privacy policy, terms and conditions, cookie policy, and trust and safety policy. Each page uses the same document shell so navigation, metadata, update dates, contact guidance, and responsive behavior remain consistent.

## Visual system

- **Palette:** Paper `#f8f9fa`, ink `#1e1f22`, Venn green `#217b6d`, sand `#f2d7af`, violet `#7268b6`.
- **Type:** Continue using Host Grotesk for display, body, and utility roles to preserve the established site identity.
- **Layout:** A compact masthead leads into a two-column document layout: sticky policy index on the left and a readable, narrow article column on the right. Mobile collapses the index into a horizontal link list above the article.
- **Signature:** Two restrained overlapping outline circles sit behind the masthead title, echoing the Venn identity without competing with policy content.

## Content and behavior

The pages use clear, practical policy language and avoid claiming certifications, guarantees, named legal entities, or data practices that the current repository does not establish. Each page includes a notice that the policy should be reviewed before production publication. Footer labels link to stable route URLs, and all home-section links use root-relative hashes so they work from policy pages as well as the landing page.

## Accessibility and testing

Each page has one `h1`, descriptive metadata, a skip link, landmark navigation, visible focus states, readable line lengths, and reduced-motion compatibility inherited from the global styles. Verify with ESLint, a production build, and browser screenshots at desktop and mobile widths.
