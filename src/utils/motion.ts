import type { Variants } from "framer-motion";

// Reusable motion variants. Tuned for a "weighted, premium" feel — Apple/Linear/Stripe-style:
// long durations, expo-out easing (slow at end like content settling under gravity),
// fade distance large enough to be felt, and viewport thresholds tight enough that
// animations only fire when the user has actually scrolled INTO the section.
//
// All transforms are GPU-friendly (opacity + transform only — no layout shift).

const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: EASE_EXPO_OUT },
  },
};

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.0, ease: EASE_EXPO_OUT },
  },
};

export const fadeFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: EASE_EXPO_OUT },
  },
};

export const fadeDownBounce: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_BACK },
  },
};

// Container with staggered children. Default stagger 180ms; per-section overrides
// pass their own values (e.g. ThePlace 0.2, FAQ 0.1).
export const stagger = (delayChildren = 0, staggerChildren = 0.18): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

// Word stagger — applied to a parent of word spans (Hero headline).
export const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.11,
    },
  },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: EASE_EXPO_OUT },
  },
};

// Scroll-triggered animations. Both viewports now `once: true` + `amount: 0.1`
// with no margin shrink. The old `amount: 0.3 + margin: -100px` combination
// made the trigger unreachable on mobile for tall containers — e.g. ThePlace's
// 1-col stacked grid (~2500px) could never have 30% (~750px) visible inside
// a margin-shrunk iPhone viewport (~500px), leaving children stuck at opacity 0
// and photos invisible.
export const VIEWPORT_TIGHT = {
  once: true,
  amount: 0.1,
} as const;

// Use on section titles/headlines: animates in once and stays put — no flicker
// when the user scrolls past and back.
export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.1,
} as const;

// Expo-out easing as a literal for inline transition overrides.
export const EASE = EASE_EXPO_OUT;
