import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, stagger, VIEWPORT_ONCE, VIEWPORT_TIGHT } from "../utils/motion";

const FAQ_ITEMS = [
  {
    q: "Is the gym really open 24 hours?",
    a: "Yes. Members can access the gym anytime, day or night, using their app.",
  },
  {
    q: "When does Tasek Central officially open?",
    a: "We're targeting mid-October 2026 for our official opening. Renovation is in progress and we'll keep pre-sale members updated as the date firms up.",
  },
  {
    q: "Will my RM99 rate ever go up?",
    a: "No. As long as your subscription is active, your rate stays at RM99/month — even when we raise prices for new members later.",
  },
  {
    q: "When do I get charged?",
    a: "You're charged RM99 today to lock in your pre-sale rate. Your next payment is exactly one month after we officially open — for example, if we open on 25 October, your next payment will be on 25 November.",
  },
  {
    q: "What if I want to cancel?",
    a: "You can cancel by visiting our kiosk in person before your next billing date. Cancellation must be done before the next billing cycle to avoid being charged.",
  },
  {
    q: "Where exactly is the gym?",
    a: "Inside Tasek Central mall, Johor Bahru, right next to the parking lot for easy access. Members enjoy a special RM1 parking rate.",
  },
  {
    q: "What facilities and equipment are available?",
    a: "Full cardio, free weights, and machines, plus yoga mats and kettlebells. There are male and female toilets with showers, open lockers, and 24-hour access. Please note we don't provide towels, shampoo, or body wash — bring your own.",
  },
  {
    q: "Do I get a free shaker?",
    a: "First 200 sign-ups get a free Kampung Gym shaker. Shakers are pre-order and can be collected at the gym within 30 days after our opening day. Once the first 200 spots are filled, we'll notify everyone else and send a voucher to your app — please check your inbox and the vouchers section in the app, and redeem your shaker by showing the voucher when you collect it.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes. Every member gets one free freeze per year, equal to one billing cycle. You must apply for the freeze through the app before your next billing date.",
  },
  {
    q: "If I cancel, will I keep the RM99 rate when I rejoin?",
    a: "No. The RM99 rate is exclusive to active subscribers. Once you cancel, rejoining will be at the regular price of RM129/month.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-kg-black border-t border-kg-hairline">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-20 md:py-[120px]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-anton tracking-anton text-3xl md:text-5xl text-center mb-12 md:mb-16"
        >
          QUESTIONS?
        </motion.h2>
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_TIGHT}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-kg-card border border-kg-border rounded-3xl overflow-hidden shadow-soft-card hover:shadow-soft-card-hover hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6 hover:bg-white/[0.02] transition"
                >
                  <span className="font-mont font-semibold text-sm md:text-base text-kg-text">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 text-kg-yellow"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.35 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-kg-muted leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
