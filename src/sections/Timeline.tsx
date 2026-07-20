import { motion } from "framer-motion";
import { fadeUp, stagger, VIEWPORT_ONCE, VIEWPORT_TIGHT } from "../utils/motion";

// Premium hover (desktop only) for the non-highlight cards. The yellow
// highlight ("Branch opens") card keeps its own accent + glow and is excluded.
const CARD_HOVER =
  "border border-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,204,0,0.05)] transition-all duration-300 md:hover:-translate-y-1 md:hover:border-yellow-400/25 md:hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_4px_12px_rgba(255,204,0,0.15)]";

const TIMELINE_CARDS = [
  {
    highlight: false,
    label: "NOW → 15 SEPT",
    title: "Pre-sales open",
    desc: "Renovation in progress",
  },
  {
    highlight: true,
    label: "MID-OCTOBER 2026",
    title: "Branch opens 🎉",
    desc: "Start training!",
  },
  {
    highlight: false,
    label: "MONTH 2 ONWARDS",
    title: "RM99 continues",
    desc: "Locked in forever",
  },
];

export function Timeline() {
  return (
    <section className="bg-kg-black border-t border-kg-hairline">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-[120px]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-anton tracking-anton text-3xl md:text-5xl text-center mb-4 md:mb-5"
        >
          WHAT HAPPENS NEXT
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-kg-muted text-sm md:text-base mb-12 md:mb-16"
        >
          Pre-sales open until 15 September 2026 · Estimated opening
          mid-October 2026
        </motion.p>
        <motion.div
          variants={stagger(0.2, 0.18)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_TIGHT}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {TIMELINE_CARDS.map((card, i) => {
            const yellow = card.highlight;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`rounded-3xl p-5 md:p-7 ${
                  yellow
                    ? "bg-kg-yellow text-black"
                    : `bg-kg-card text-kg-text ${CARD_HOVER}`
                }`}
                animate={
                  yellow
                    ? {
                        // Gentle scale + soft glow over 4s — page is "breathing".
                        scale: [1, 1.015, 1],
                        boxShadow: [
                          "0 0 0px 0px rgba(255,204,0,0)",
                          "0 0 36px 6px rgba(255,204,0,0.35)",
                          "0 0 0px 0px rgba(255,204,0,0)",
                        ],
                      }
                    : undefined
                }
                transition={
                  yellow
                    ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
              >
                <div
                  className={`font-mont text-xs font-bold uppercase tracking-widest ${
                    yellow ? "text-black/70" : "text-kg-yellow"
                  }`}
                >
                  {card.label}
                </div>
                <h3
                  className={`font-anton tracking-anton text-xl md:text-2xl mt-3 ${
                    yellow ? "text-black" : "text-kg-text"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    yellow ? "text-black/80" : "text-kg-muted"
                  }`}
                >
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
