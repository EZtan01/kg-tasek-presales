import { motion } from "framer-motion";
import { VIEWPORT_ONCE, EASE } from "../utils/motion";

export function ValueBand() {
  return (
    <section
      className="relative overflow-hidden bg-kg-black"
      style={{
        // Soft inner + outer yellow glow so the value band feels lit, not flat.
        boxShadow:
          "0 0 60px rgba(255, 204, 0, 0.15) inset, 0 20px 60px -20px rgba(255, 204, 0, 0.2)",
      }}
    >
      {/* Yellow background wipes in left → right. */}
      <motion.div
        className="absolute inset-0 bg-kg-yellow origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Text fades up as a single block — no scale/bounce, no per-character reveal. */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
        className="relative z-[1] max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14 text-center text-black"
      >
        <h2 className="font-anton tracking-anton text-3xl md:text-5xl leading-tight">
          RM99/MONTH. LOCKED IN FOREVER.
        </h2>
        <p className="mt-3 md:mt-4 text-sm md:text-base font-medium text-black/80 max-w-3xl mx-auto">
          Sign up during pre-sales and your monthly rate stays at RM99 — even
          after we open and prices go up.
        </p>
      </motion.div>
    </section>
  );
}
