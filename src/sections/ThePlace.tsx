import { motion } from "framer-motion";
import { PlaceShowcase, type ShowcaseSlide } from "../components/PlaceShowcase";
import { VIEWPORT_ONCE, VIEWPORT_TIGHT, EASE } from "../utils/motion";
import { zonePhotos } from "../utils/zonePhotos";

// Zones in display order. Each photo in a zone shares that zone's caption —
// the showcase shows the caption for whichever photo is currently in view.
const ZONES = [
  {
    zone: "floor" as const,
    label: "GYM FLOOR",
    title: "The main floor",
    desc: "Open layout, no waiting. Move between zones freely.",
  },
  {
    zone: "cardio" as const,
    label: "CARDIO",
    title: "Burn fat. Build stamina.",
    desc: "Treadmills and stair climbers for the work that gets your heart going — and your numbers down on the scale.",
  },
  {
    zone: "weights" as const,
    label: "FREE WEIGHTS",
    title: "Lift heavy. Build strength.",
    desc: "Full dumbbell rack and squat racks. Real weight for real work — whether you're benching for the first time or hitting a new PR.",
  },
  {
    zone: "machines" as const,
    label: "MACHINES",
    title: "Every muscle. Every angle.",
    desc: "Selectorized and plate-loaded. Every muscle group covered.",
  },
  {
    zone: "entrance" as const,
    label: "ENTRANCE",
    title: "Walk right in",
    desc: "Right inside Tasek Central mall, next to the parking lot.",
  },
];

// Flatten every zone's photos into one ordered list of slides. Zones with no
// photos (e.g. entrance, until we have a real Tasek Central shot) contribute
// nothing and are automatically omitted — no empty placeholder is rendered.
const SLIDES: ShowcaseSlide[] = ZONES.filter(
  ({ zone }) => zonePhotos(zone).length > 0
).flatMap(({ zone, label, title, desc }) =>
  zonePhotos(zone).map((url) => ({ url, label, title, desc }))
);

export function ThePlace() {
  return (
    <section
      className="border-t border-kg-hairline"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-[120px]">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.0, ease: EASE }}
            className="inline-block font-mont text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-kg-yellow"
          >
            THE PLACE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.15, duration: 1.0, ease: EASE }}
            className="font-anton tracking-anton text-3xl md:text-5xl mt-3 leading-tight"
          >
            Real equipment. No frills.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.3, duration: 1.0, ease: EASE }}
            className="mt-4 text-kg-muted text-sm md:text-base"
          >
            Swipe through our gym. Reference photos from our existing branches.
          </motion.p>
        </div>

        {/* Single swipeable showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_TIGHT}
          transition={{ duration: 1.0, ease: EASE }}
          className="mt-14 md:mt-20"
        >
          <PlaceShowcase slides={SLIDES} />
        </motion.div>

        {/* Single muted disclaimer below the showcase. */}
        <p
          className="text-center pt-10"
          style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.4)" }}
        >
          Reference photos from our existing Kampung Gym branches.
        </p>
      </div>
    </section>
  );
}
