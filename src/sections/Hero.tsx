import { motion } from "framer-motion";
import { CTAButton } from "../components/CTAButtons";
import { HeroCarousel } from "../components/HeroCarousel";
import { useTracking } from "../hooks/useTracking";
import { appendUTMs } from "../utils/appendUTMs";
import { CTA_LINKS, WHATSAPP_MESSAGE } from "../config/site";
import { EASE } from "../utils/motion";

// "Coming Soon" teaser hero: a centered title block sits ABOVE a full-bleed
// photo gallery. The title speaks first, then the photos reinforce. Everything
// in the title block staggers up on page load (plays once — no scroll
// re-trigger); the gallery fades in just after the title lands.

// Swipeable hero gallery — the Tasek Central 3D rendering set. Click any slide
// to open the full-size lightbox (navigable across all six).
const HERO_IMAGES = [
  { src: "/photos/tasek-hero-1.jpeg", alt: "Tasek Central branch — 3D rendering 1" },
  { src: "/photos/tasek-hero-2.jpeg", alt: "Tasek Central branch — 3D rendering 2" },
  { src: "/photos/tasek-hero-3.jpeg", alt: "Tasek Central branch — 3D rendering 3" },
  { src: "/photos/tasek-hero-4.jpeg", alt: "Tasek Central branch — 3D rendering 4" },
  { src: "/photos/tasek-hero-5.jpeg", alt: "Tasek Central branch — 3D rendering 5" },
  { src: "/photos/tasek-hero-6.jpeg", alt: "Tasek Central branch — 3D rendering 6" },
];

// Each element fades up; 150ms stagger between them, slow expo-out easing.
const STAGGER = 0.15;
const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: STAGGER * i, duration: 0.9, ease: EASE },
});

export function Hero() {
  const { trackCTA } = useTracking();

  const whatsappHref = appendUTMs(
    `https://wa.me/${CTA_LINKS.whatsappNumber}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`
  );

  return (
    <section
      id="top"
      style={{
        background:
          "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(255, 204, 0, 0.06) 0%, transparent 60%), radial-gradient(ellipse at center, #1a1a1a 0%, #000000 70%)",
      }}
    >
      {/* === Section 1: title block (above the photo) === */}
      <div className="max-w-3xl mx-auto px-5 text-center pt-20 pb-10">
        <motion.img
          {...fadeUp(0)}
          src="/photos/kg-logo.png"
          alt="Kampung Gym logo"
          className="mx-auto h-20 md:h-28 w-auto mb-6"
        />

        <motion.p
          {...fadeUp(1)}
          className="font-mont text-xs font-semibold uppercase tracking-[0.18em] text-kg-yellow"
        >
          PRE-SALES OPEN NOW · LAUNCHING MID-OCTOBER
        </motion.p>

        <motion.h1
          {...fadeUp(2)}
          className="font-anton tracking-anton text-kg-text mt-6 text-[56px] md:text-[90px] leading-[0.95]"
        >
          TASEK CENTRAL
        </motion.h1>

        <motion.p
          {...fadeUp(3)}
          className="font-anton tracking-anton text-kg-yellow mt-2 text-[32px] md:text-[48px] leading-[0.95]"
        >
          COMING SOON
        </motion.p>

        <motion.p
          {...fadeUp(4)}
          className="font-body text-[18px] text-kg-muted max-w-[600px] mx-auto mt-6 leading-relaxed"
        >
          A new Kampung Gym branch coming to Tasek Central mall, Johor Bahru —
          opening mid-October 2026. 24-hour access, no contract, RM99/month
          locked in forever.
        </motion.p>

        <motion.div {...fadeUp(5)} className="mt-8 flex justify-center">
          <CTAButton
            variant="primary"
            label="DOWNLOAD APP TO SIGN UP →"
            type="download"
            location="hero_download"
            size="lg"
          />
        </motion.div>

        <motion.p {...fadeUp(6)} className="mt-4 text-sm text-kg-dim">
          Or{" "}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTA("hero_whatsapp")}
            className="text-kg-yellow hover:underline"
          >
            WhatsApp us for early access →
          </a>
        </motion.p>
      </div>

      {/* === Section 2: full-bleed swipeable photo gallery (below the title) === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // Fade in just after the title block lands.
        transition={{ delay: STAGGER * 7, duration: 1.0, ease: EASE }}
        className="relative w-full overflow-hidden h-[50vh] md:h-[60vh]"
      >
        <HeroCarousel images={HERO_IMAGES} />
      </motion.div>

      {/* Caption — clarifies the gallery is a 3D rendering of the actual
          branch. Black background so it reads as part of the photo block. */}
      <p
        className="text-center italic bg-black"
        style={{
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "13px",
          padding: "12px 16px 8px",
        }}
      >
        Actual 3D rendering of Tasek Central branch
      </p>
    </section>
  );
}
