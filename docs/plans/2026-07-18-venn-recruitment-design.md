# Venn Recruitment Landing Page Design

## Direction

The page uses a restrained intersection system rather than literal diagrams in every section. The hero contains the clearest expression: two large overlapping fields create a central match zone. Later sections reuse the idea through offset cards, curved section boundaries, paired content columns, clipped circles, and overlapping accent shapes. The palette is grounded in warm off-white and near-black, with green as the primary action color, sand for warmth, and violet for selective contrast.

The interface should feel established, human, and internationally capable. Typography pairs a confident display face with a neutral sans-serif body. Spacious editorial layouts, rounded but not pill-heavy controls, and solid color fields replace gradients and glass effects. All non-supplied marketing content remains explicitly labeled in square brackets.

## Architecture

The App Router page is a server component that composes one component per required section. Shared server-safe primitives cover section shells, headings, buttons, cards, badges, and form fields. Small client islands own GSAP behavior, the responsive navigation, and the FAQ accordion. Animation setup lives in hooks and animation-specific wrappers so presentational components remain readable.

Forms are front-end-only, semantically labeled, validation-ready, and include representative error, success, and disabled styling in the design system. The navigation maps directly to stable section IDs and uses native smooth scrolling with an animated mobile panel. Reduced-motion users receive immediate state changes and no scroll-triggered movement.

## Responsive and Accessibility Behavior

The layout moves from one-column mobile sections to structured two- and three-column compositions at larger breakpoints. The hero visual is geometric artwork made from CSS shapes, not a fake product preview. Navigation has a visible text menu trigger, focus containment-friendly markup, Escape handling, and meaningful ARIA state. Forms use real labels, the FAQ uses buttons with `aria-expanded` and region relationships, and all interactive elements have visible focus treatment.

Testing covers lint, TypeScript through the Next build, production compilation, reduced-motion code paths, anchor targets, section order, and browser-level visual/console checks where the environment permits.
