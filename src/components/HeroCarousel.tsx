import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoOrPlaceholder } from "./Placeholder";
import { Lightbox } from "./Lightbox";

export type HeroImage = {
  src: string;
  alt: string;
};

type Props = {
  images: HeroImage[];
};

/**
 * Full-bleed swipeable hero carousel. Built on the same iOS-Safari-safe
 * snap-scroller as PlaceShowcase: plain block children, native horizontal
 * scroll, snap-mandatory — so touch swipe "just works" without a JS drag lib.
 *
 * Extras: desktop arrows, dots, and a gentle 5s autoplay that pauses while the
 * user is hovering or touching. The bottom gradient lives here so it stacks
 * below the dots/arrows but above the photos.
 */
export function HeroCarousel({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const lightboxOpenRef = useRef(false);

  // Keep a ref in sync so the autoplay timer can read the current slide
  // without re-subscribing the interval on every change.
  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  // Pause autoplay while the full-size lightbox is open.
  useEffect(() => {
    lightboxOpenRef.current = lightboxOpen;
  }, [lightboxOpen]);

  // Derive the active slide from scroll position (works for swipe + arrows).
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
    const n = images.length;
    const idx = ((i % n) + n) % n; // wrap both directions
    const slide = el.querySelectorAll<HTMLElement>("[data-slide]")[idx];
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveIndex(idx);
  }

  // Autoplay — advance every 5s unless the user is interacting.
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      if (pausedRef.current || lightboxOpenRef.current) return;
      goTo(activeRef.current + 1);
    }, 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div className="relative w-full h-full bg-black">
      <div
        ref={scrollerRef}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            data-slide
            onClick={() => {
              setLightboxIndex(idx);
              setLightboxOpen(true);
            }}
            aria-label={`Enlarge photo ${idx + 1} of ${images.length}`}
            className="shrink-0 snap-center h-full block p-0 border-0 bg-black cursor-zoom-in"
            style={{ width: "100%", minWidth: "100%" }}
          >
            {/* object-contain shows the whole photo (no left/right crop);
                the black box behind it makes any letterbox look intentional. */}
            <PhotoOrPlaceholder
              src={img.src}
              alt={img.alt}
              className="w-full h-full"
              imgClassName="w-full h-full object-contain object-center"
              label={img.src.split("/").pop()}
            />
          </button>
        ))}
      </div>

      {/* Dark gradient at the bottom so the transition to the next section
          (the yellow value band) feels smooth — no hard photo edge. */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Desktop arrows */}
      <button
        type="button"
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous photo"
        className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 z-[2] items-center justify-center w-11 h-11 rounded-full bg-black/45 hover:bg-black/70 text-white transition"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next photo"
        className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 z-[2] items-center justify-center w-11 h-11 rounded-full bg-black/45 hover:bg-black/70 text-white transition"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[2] flex items-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Go to photo ${idx + 1}`}
            aria-current={idx === activeIndex}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-7 bg-kg-yellow"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Click any slide → full-size viewer (shared with THE PLACE section). */}
      <Lightbox
        photos={images.map((img) => img.src)}
        alt={images[lightboxIndex]?.alt ?? "Kampung Gym Tasek Central"}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
