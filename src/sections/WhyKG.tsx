import {
  Clock,
  Lock,
  MapPin,
  ParkingSquare,
  Snowflake,
  DollarSign,
  Gift,
  FileX,
  BadgeCheck,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { FlipCard } from "../components/FlipCard";
import { fadeUpScale, stagger, VIEWPORT_ONCE, VIEWPORT_TIGHT, EASE } from "../utils/motion";

const ICONS: Record<string, LucideIcon> = {
  Clock,
  Lock,
  MapPin,
  ParkingSquare,
  Snowflake,
  DollarSign,
  Gift,
  FileX,
  BadgeCheck,
  Dumbbell,
};

const FLIP_HINT_FRONT = "Tap to learn more →";
const FLIP_HINT_BACK = "Tap to close ←";

// Top row — 3 hero cards.
const HERO_CARDS = [
  {
    icon: "Lock",
    title: "RM99/month",
    desc: "Locked forever. Even when prices go up after we open.",
  },
  {
    icon: "Clock",
    title: "24-Hour Access",
    desc: "Train any time. Day, night, weekends.",
  },
  {
    icon: "FileX",
    title: "No contract",
    desc: "No joining fee. Cancel anytime.",
  },
];

// Bottom row — 5 secondary cards.
const SECONDARY_CARDS = [
  {
    icon: "MapPin",
    title: "Tasek Central",
    desc: "Located inside Tasek Central mall, Johor Bahru. Right next to where you shop, eat, and unwind.",
  },
  {
    icon: "ParkingSquare",
    title: "RM1 Parking",
    desc: "RM1 special parking rate for KG members. Quick in, quick out — no walking far after a long workout.",
  },
  {
    icon: "Snowflake",
    title: "Air-Conditioned",
    desc: "Cool, comfortable workouts during peak hours. Train without sweating just from being there.",
  },
  {
    icon: "Gift",
    title: "Free Shaker",
    desc: "First 200 sign-ups get a free Kampung Gym shaker. Pre-order now, collect on opening day.",
  },
  {
    icon: "Dumbbell",
    title: "Full Equipment",
    desc: "Cardio, free weights, machines — plus yoga mats and kettlebells. Everything you need for a full session.",
  },
];

export function WhyKG() {
  return (
    <section
      className="border-t border-kg-hairline"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-[120px]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.0, ease: EASE }}
          className="font-anton tracking-anton text-3xl md:text-5xl text-center mb-12 md:mb-16"
        >
          WHY KAMPUNG GYM TASEK CENTRAL
        </motion.h2>

        {/* === Top row: 3 HERO flip cards (yellow front, dark back) === */}
        <motion.div
          variants={stagger(0.1, 0.18)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_TIGHT}
          className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
        >
          {HERO_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Lock;
            const isPrimary = i === 0;
            return (
              <motion.div key={`hero-${i}`} variants={fadeUpScale}>
                <FlipCard
                  ariaLabel={card.title}
                  className="w-full h-full min-h-[110px] md:min-h-[280px]"
                  front={
                    isPrimary ? (
                      <div className="w-full h-full bg-[#FFCC00] rounded-3xl p-5 md:p-8 flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-0 shadow-soft-yellow hover:shadow-soft-yellow-hover transition-shadow duration-300">
                        <motion.div
                          className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl bg-black text-[#FFCC00] flex items-center justify-center mb-0 md:mb-5 ring-1 ring-black/10"
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        >
                          <Icon size={24} strokeWidth={2.5} className="md:hidden" />
                          <Icon size={36} strokeWidth={2.5} className="hidden md:block" />
                        </motion.div>
                        <h3 className="flex-1 md:flex-none min-w-0 font-anton tracking-anton text-xl md:text-[28px] text-black leading-tight uppercase">
                          {card.title}
                        </h3>
                        <div className="hidden md:block mt-auto pt-3 text-black/60 font-mont text-[11px] tracking-wider">
                          {FLIP_HINT_FRONT}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-[#1A1A1A] border border-kg-border rounded-3xl p-5 md:p-8 flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-0 shadow-soft-card hover:shadow-soft-card-hover transition-shadow duration-300">
                        <motion.div
                          className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl bg-kg-yellow/15 text-kg-yellow flex items-center justify-center mb-0 md:mb-5"
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        >
                          <Icon size={24} strokeWidth={2.25} className="md:hidden" />
                          <Icon size={36} strokeWidth={2.25} className="hidden md:block" />
                        </motion.div>
                        <h3 className="flex-1 md:flex-none min-w-0 font-anton tracking-anton text-xl md:text-[28px] text-white leading-tight uppercase">
                          {card.title}
                        </h3>
                        <div
                          className="hidden md:block mt-3 h-1 w-[40%] bg-kg-yellow rounded-full"
                          aria-hidden
                        />
                        <div className="hidden md:block mt-auto pt-3 text-kg-yellow/60 font-mont text-[11px] tracking-wider">
                          {FLIP_HINT_FRONT}
                        </div>
                      </div>
                    )
                  }
                  back={
                    <div className="w-full h-full bg-[#1A1A1A] border-2 border-kg-yellow/50 rounded-3xl p-5 md:p-6 flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-0 shadow-soft-yellow">
                      <div className="shrink-0 w-12 h-12 md:w-12 md:h-12 rounded-xl bg-kg-yellow/15 text-kg-yellow flex items-center justify-center mb-0 md:mb-4">
                        <Icon size={24} strokeWidth={2.25} className="md:hidden" />
                        <Icon size={26} strokeWidth={2.25} className="hidden md:block" />
                      </div>
                      <div className="flex-1 md:flex-none min-w-0">
                        <h3 className="font-anton tracking-anton text-base md:text-xl text-white leading-tight uppercase">
                          {card.title}
                        </h3>
                        <p className="mt-1 md:mt-3 text-xs md:text-base text-white/80 leading-snug md:leading-[1.5]">
                          {card.desc}
                        </p>
                      </div>
                      <div className="hidden md:block md:mt-auto md:pt-4 text-kg-dim font-mont text-[11px] tracking-wider">
                        {FLIP_HINT_BACK}
                      </div>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* === Bottom row: 5 secondary flip cards (unchanged dark-on-dark) === */}
        <motion.div
          variants={stagger(0.2, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_TIGHT}
          className="mt-3 md:mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-3"
        >
          {SECONDARY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Gift;
            return (
              <motion.div key={`sec-${i}`} variants={fadeUpScale}>
                <FlipCard
                  minHeight="190px"
                  ariaLabel={card.title}
                  className="w-full h-full"
                  front={
                    <div className="w-full h-full bg-kg-card border border-kg-border rounded-3xl p-4 md:p-5 flex flex-col shadow-soft-card hover:shadow-soft-card-hover transition-shadow duration-300">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-kg-yellow/10 text-kg-yellow flex items-center justify-center mb-3">
                        <Icon size={18} strokeWidth={2.25} className="md:hidden" />
                        <Icon size={20} strokeWidth={2.25} className="hidden md:block" />
                      </div>
                      <h3 className="font-anton tracking-anton text-sm md:text-lg text-kg-text leading-tight uppercase">
                        {card.title}
                      </h3>
                      <div className="mt-auto pt-3 text-kg-dim font-mont text-[10px] tracking-wider">
                        {FLIP_HINT_FRONT}
                      </div>
                    </div>
                  }
                  back={
                    <div className="w-full h-full bg-kg-card border-2 border-kg-yellow/50 rounded-3xl p-4 md:p-5 flex flex-col shadow-soft-yellow">
                      <h3 className="font-anton tracking-anton text-sm md:text-base text-kg-yellow leading-tight uppercase">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xs md:text-[13px] text-kg-text leading-snug">
                        {card.desc}
                      </p>
                      <div className="mt-auto pt-3 text-kg-dim font-mont text-[10px] tracking-wider">
                        {FLIP_HINT_BACK}
                      </div>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
