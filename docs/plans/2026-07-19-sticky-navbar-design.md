# Sticky Navbar Design

Restore the previous fixed-overlay navigation behavior without changing the full-screen hero. The header begins transparent with white text, then switches after a small scroll threshold to a near-white background, dark text, a subtle border, and a soft shadow.

The existing mobile menu remains anchored to the fixed header. Scroll state is handled by a passive event listener that is removed when the component unmounts.
