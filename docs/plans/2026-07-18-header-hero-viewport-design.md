# Header and Hero Viewport Design

The header remains visually layered over the background video but changes from fixed to absolute positioning. This keeps the current composition intact while allowing the navigation to scroll away naturally with the hero.

The home section, animation wrapper, and content container use exactly `100svh`. Because the header overlays the section, their combined visual footprint is one viewport rather than the header height plus a full-height hero. Short-screen media queries tighten vertical spacing so the content remains usable without extending the section.

Verification covers desktop and narrow viewports, scrolling behavior, mobile menu positioning, linting, and the production build.
