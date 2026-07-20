import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeFromLeft, stagger, VIEWPORT_ONCE, VIEWPORT_TIGHT } from "../utils/motion";

// Vertical (9:16) app-tutorial video. Autoplays muted when scrolled into view
// and pauses when it leaves — IntersectionObserver keeps it from eating
// resources while offscreen and satisfies iOS Safari's gesture rules
// (muted + playsInline + a programmatic play() triggered by the observer).
function HowToVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Will silently fail on browsers that block autoplay — that's fine,
          // the user can tap to play.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // On mobile the wrapper keeps a 9:16 box (aspect-[9/16]); on desktop it drops
  // the aspect ratio and stretches to the column's height (md:h-full) so the
  // video lines up with the 4 steps beside it. The video fills the box with
  // object-cover, cropping rather than letterboxing.
  return (
    <div className="relative w-full aspect-[9/16] md:aspect-auto md:h-full overflow-hidden rounded-3xl shadow-2xl bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        controls
        preload="metadata"
      >
        <source src="/videos/app-demo-tutorial.webm" type="video/webm" />
        <source src="/videos/app-demo-tutorial.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

const STEPS = [
  {
    number: "01",
    important: false,
    title: "Download the Kampung Gym App",
    // Step 01's description is rendered with inline store links below.
    desc: "Available on App Store and Google Play. Verify your account via OTP.",
  },
  {
    number: "02",
    important: true,
    title: "Choose Tasek Central as Your Home Gym",
    desc: "You MUST select Tasek Central as your Home Gym for the offer to apply.",
  },
  {
    number: "03",
    important: false,
    title: 'Click "Explore" and select your plan',
    desc: "Inside the app, tap Explore and choose the Tasek Central Pre-Sales plan.",
  },
  {
    number: "04",
    important: false,
    title: "Pay & You're In",
    desc: "Your first payment is today. Your next charge will be one month after our official opening date. Payment is recurring monthly.",
  },
];

export function HowTo() {
  return (
    <section className="bg-kg-alt border-t border-kg-hairline">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-[120px]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-anton tracking-anton text-3xl md:text-5xl text-center"
        >
          HOW TO LOCK IN YOUR RM99
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ delay: 0.25, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-center text-kg-muted text-sm md:text-base"
        >
          Four steps. Five minutes.
        </motion.p>

        {/* Two-column on desktop: steps on the left, vertical video on the
            right. Single column on mobile (steps, then video below). */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <motion.ol
            variants={stagger(0.2, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_TIGHT}
            className="space-y-4"
          >
          {STEPS.map((step) => {
            const isImportant = step.important;
            return (
              <motion.li
                key={step.number}
                variants={fadeFromLeft}
                className={`rounded-3xl p-6 md:p-7 flex gap-5 md:gap-6 items-start ${
                  isImportant
                    ? "border-2 border-kg-yellow bg-kg-yellow/[0.04] transition"
                    : "border border-kg-border bg-kg-card shadow-soft-card hover:shadow-soft-card-hover hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                }`}
                animate={
                  isImportant
                    ? {
                        boxShadow: [
                          "0 0 0px 0px rgba(255,204,0,0)",
                          "0 0 28px 3px rgba(255,204,0,0.28)",
                          "0 0 0px 0px rgba(255,204,0,0)",
                        ],
                      }
                    : undefined
                }
                transition={
                  isImportant
                    ? {
                        duration: 3.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
              >
                <motion.div
                  initial={{ color: "rgba(255,255,255,0.4)" }}
                  whileInView={{ color: "#FFCC00" }}
                  viewport={VIEWPORT_TIGHT}
                  transition={{ duration: 0.9, delay: 0.25 }}
                  className="font-anton tracking-anton text-3xl md:text-4xl shrink-0"
                >
                  {step.number}
                </motion.div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-anton tracking-anton text-xl md:text-2xl text-kg-text">
                      {step.title}
                    </h3>
                    {isImportant && (
                      <span className="inline-flex items-center font-mont text-[10px] md:text-xs font-bold uppercase tracking-widest bg-kg-yellow text-black rounded-full px-2 py-0.5">
                        IMPORTANT
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm md:text-base text-kg-muted leading-relaxed">
                    {step.number === "01" ? (
                      <>
                        Available on{" "}
                        <a
                          href="https://apps.apple.com/us/app/kampung-gym/id6444578382"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-kg-yellow underline underline-offset-2 hover:brightness-110 transition"
                        >
                          App Store
                        </a>
                        {" and "}
                        <a
                          href="https://play.google.com/store/apps/details?id=com.kampunggym.member"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-kg-yellow underline underline-offset-2 hover:brightness-110 transition"
                        >
                          Google Play
                        </a>
                        . Verify your account via OTP.
                      </>
                    ) : (
                      step.desc
                    )}
                  </p>
                </div>
              </motion.li>
            );
          })}
          </motion.ol>

          {/* Vertical tutorial video — matches the height of the steps column
              on desktop, sits full-width (9:16) below them on mobile. */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="md:h-full"
          >
            <HowToVideo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
