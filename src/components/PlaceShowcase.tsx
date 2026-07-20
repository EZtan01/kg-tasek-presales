import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbox } from "./Lightbox";

export type ShowcaseSlide = {
  url: string;
  label: string;
  title: string;
  desc: string;
};

type Props = {
  slides: ShowcaseSlide[];
};

/**
 * THE PLACE showcase: every gym photo lives in ONE swipeable box. As you slide
 * between photos, the caption underneath (label / title / desc) updates to the
 * current photo's zone and cross-fades on change. Clicking opens a full-screen
 * lightbox over all photos.
 *
 * Built on the same iOS-Safari-safe snap-scroller as PhotoCarousel: plain block
 * children, no absolute positioning, intrinsic sizing via inline aspectRatio.
 */
export function PlaceShowcase({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const handleScroll = () => {
      const els = scroller.querySelectorAll<HTMLElement>("[data-slide]");
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      els.forEach((slide, idx) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(slideCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    };
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    const slide = el.querySelectorAll<HTMLElement>("[data-slide]")[clamped];
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveIndex(clamped);
  }

  if (!slides || slides.length === 0) return null;

  const urls = slides.map((s) => s.url);
  const active = slides[activeIndex];
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === slides.length - 1;

  return (
    <div className="w-full">
      {/* Photo box */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-kg-card">
        <div
          ref={scrollerRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {slides.map((slide, idx) => (
            <button
              key={idx}
              type="button"
              data-slide
              onClick={() => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              aria-label={`Open photo ${idx + 1} of ${slides.length}`}
              className="shrink-0 snap-center cursor-zoom-in p-0 border-0 block"
              style={{
                width: "100%",
                minWidth: "100%",
                aspectRatio: "16 / 10",
                backgroundColor: "#1a1a1a",
              }}
            >
              <img
                src={slide.url}
                alt={slide.title}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </button>
          ))}
        </div>

        {/* Desktop arrows */}
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={atStart}
          aria-label="Previous photo"
          className="hidden md:inline-flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white disabled:opacity-30 disabled:cursor-default transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={atEnd}
          aria-label="Next photo"
          className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white disabled:opacity-30 disabled:cursor-default transition"
        >
          <ChevronRight size={20} />
        </button>

        {/* Photo counter */}
        <div className="absolute top-3 right-3 font-mont text-xs font-semibold text-white bg-black/55 rounded-full px-2.5 py-1 pointer-events-none">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Thin progress bar */}
      <div className="mt-4 h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-kg-yellow rounded-full"
          animate={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Caption — cross-fades as you slide between zones */}
      <div className="mt-6 min-h-[150px] md:min-h-[130px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center font-mont text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-kg-yellow bg-kg-yellow/10 rounded-full px-2.5 py-1">
              {active.label}
            </span>
            <h3 className="font-anton tracking-anton text-2xl md:text-[32px] mt-4 text-kg-text leading-tight">
              {active.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-kg-muted leading-relaxed max-w-2xl">
              {active.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox
        photos={urls}
        alt={active.title}
        initialIndex={lightboxIndex}
        caption={active.label}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
