import { motion } from "framer-motion";
import { CTAButton } from "../components/CTAButtons";
// HeroCarousel (swipeable gallery + click-to-lightbox) is kept for when the
// Tasek Central 3D renderings are ready — re-import it and swap the placeholder
// below for <HeroCarousel images={HERO_IMAGES} /> to re-enable.
import { useTracking } from "../hooks/useTracking";
import { appendUTMs } from "../utils/appendUTMs";
import { CTA_LINKS, WHATSAPP_MESSAGE } from "../config/site";
import { EASE } from "../utils/motion";

// "Coming Soon" teaser hero: a centered title block sits ABOVE a full-bleed
// photo area. The title speaks first, then the visual reinforces. Everything in
// the title block staggers up on page load (plays once — no scroll re-trigger);
// the visual fades in just after the title lands.

// Tasek Central branch photos aren't ready yet — the hero shows a styled
// placeholder until the 3D renderings are uploaded. The gallery data + click
// handler are kept below (disabled) so photos can be dropped back in later.
const HERO_IMAGES = [
  { src: "/photos/Hero1.jpeg", alt: "Tasek Central branch — 3D rendering" },
  { src: "/photos/Hero2.jpeg", alt: "Tasek Central branch — 3D rendering" },
  { src: "/photos/Hero3.jpeg", alt: "Tasek Central branch — 3D rendering of weights and benches" },
  { src: "/photos/Hero4.jpeg", alt: "Tasek Central branch — 3D rendering" },
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
        background: "radial-gradient(ellipse at top, #1a1a1a 0%, #000000 60%)",
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

      {/* === Section 2: photo placeholder (below the title) ===
          Tasek Central renderings aren't ready yet, so instead of the swipeable
          gallery we show a styled placeholder. The <HeroCarousel> + click-to-
          lightbox path is disabled until real photos exist — drop HERO_IMAGES
          back into it to re-enable. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // Fade in just after the title block lands.
        transition={{ delay: STAGGER * 7, duration: 1.0, ease: EASE }}
      >
        <div className="w-full bg-black">
          {/* Photo placeholder */}
          <div
            className="w-full flex items-center justify-center"
            style={{
              minHeight: "300px",
              maxHeight: "60vh",
              aspectRatio: "16 / 9",
              backgroundColor: "#0f0f0f",
              backgroundImage:
                "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%)",
              border: "2px dashed rgba(255, 204, 0, 0.3)",
              borderRadius: "24px",
              margin: "0 16px",
            }}
          >
            <div className="text-center px-6">
              <div className="mb-3">
                <svg
                  className="w-12 h-12 mx-auto text-yellow-400/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-white/80 font-anton text-lg tracking-wide">
                BRANCH PHOTOS COMING SOON
              </p>
              <p className="text-white/45 text-sm mt-2 italic">
                3D renderings of Tasek Central branch will be uploaded here
              </p>
            </div>
          </div>

          {/* Caption below (keep for consistency) */}
          <p
            className="text-center italic"
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "13px",
              padding: "12px 16px 8px",
              backgroundColor: "#000",
            }}
          >
            Actual 3D rendering coming soon — Tasek Central branch
          </p>
        </div>
      </motion.div>
    </section>
  );
}
