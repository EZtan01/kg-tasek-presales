import { useCallback, useEffect, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  photos: string[];
  alt: string;
  initialIndex: number;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Full-screen photo viewer. Opens from a PhotoCarousel slide click.
 *
 * Controls:
 * - Click X / press Esc / click backdrop → close
 * - Click photo or its container → does NOT close (event stopped)
 * - Arrow buttons / arrow keys / horizontal swipe (>50px) → navigate
 * - Body scroll is locked while open
 */
export function Lightbox({
  photos,
  alt,
  initialIndex,
  caption,
  isOpen,
  onClose,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const hasMultiple = photos.length > 1;

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goPrev, goNext, onClose]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  if (!isOpen) return null;

  const src = photos[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption ?? alt}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.92)",
        animation: "lightboxFadeIn 0.2s ease-out",
      }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full transition-transform hover:scale-110"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#FFCC00",
        }}
        aria-label="Close"
      >
        <X size={20} color="#000" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 md:left-6 z-10 flex items-center justify-center rounded-full transition-transform hover:scale-110"
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} color="#fff" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 md:right-6 z-10 flex items-center justify-center rounded-full transition-transform hover:scale-110"
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={24} color="#fff" />
          </button>
        </>
      )}

      <div
        className="flex flex-col items-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="rounded-3xl"
          style={{
            maxWidth: "95vw",
            maxHeight: "80vh",
            objectFit: "contain",
            display: "block",
          }}
        />

        <div className="mt-4 text-center">
          {caption && (
            <div className="uppercase tracking-widest text-kg-yellow text-xs mb-1">
              {caption}
            </div>
          )}
          {hasMultiple && (
            <div className="text-white/60 text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
