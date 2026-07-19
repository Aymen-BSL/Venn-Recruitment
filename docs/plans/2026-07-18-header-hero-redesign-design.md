# Header and Hero Redesign Design

## Direction

The redesign takes structural inspiration from Upwork without copying its page. The header becomes a restrained overlay above a full-bleed video hero and transitions to a light solid navigation bar after scrolling. The hero removes the multicolor Venn illustration and both large pathway cards. It uses a single workplace video, a controlled dark overlay, white typography, and two direct decision buttons using the exact original call-to-action copy.

Upwork's custom brand typefaces are not reused. Instrument Sans fills the practical grotesk role of Neue Montreal, while Fraunces provides a warm serif counterpart to RZA. The hero uses a tight, readable hierarchy with the supplied headline, supporting paragraph, trust line, and eyebrow. Green is the only brand accent in the hero. Violet and sand remain available to later page sections but do not compete above the fold.

## Interaction and Accessibility

The video is muted, looping, autoplaying, and `playsInline`, with a static poster for loading and reduced-motion fallback. It is decorative and hidden from assistive technology. Text remains readable without the video. The two pathway links retain the original labels, clear focus states, and generous touch targets. The mobile menu keeps Escape handling and GSAP transitions, while the desktop header retains all supplied navigation links and primary actions.

The hero entrance animation targets the new content and actions only. Continuous Venn-shape animation is removed. Reduced-motion users see the final layout immediately and receive a static poster rather than unnecessary motion where supported.
