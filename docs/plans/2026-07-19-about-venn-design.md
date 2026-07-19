# About Venn Recruitment Design

The section uses a compact two-column layout. The left column contains only the eyebrow, main heading, and two supporting paragraphs. The right column contains a single minimal illustration, with no additional conclusion row or secondary content band.

The illustration uses two equal unfilled squares with the site's established corner radius. The company square sits upper-left and the candidate square sits lower-right, creating an offset rectangular intersection between them. Their dashed ink and green borders express the Venn concept without literal circles, filled cards, or decorative icons. Short company and candidate labels sit in the outer areas, while a temporary V mark occupies the intersection.

The About heading uses the hero heading's weight, tracking, and line-height, but at a smaller section-level scale. Its width allows a natural two-line composition instead of forcing the copy into a narrow stack.

GSAP moves the two dashed borders slowly in opposite directions. The motion is isolated in a client component, does not affect layout, cleans up on unmount, and stops when reduced motion is requested.

At desktop widths the complete section is centered inside exactly one viewport. On smaller screens the layout becomes content-driven and stacks vertically so the supplied text and illustration are never clipped.
