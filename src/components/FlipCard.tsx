import { useState, type ReactNode } from "react";

type Props = {
  front: ReactNode;
  back: ReactNode;
  // Outer container height. Both faces fill this space (position: absolute),
  // so it must be large enough to fit the longer of the two.
  // Pass undefined to opt out of inline style and use Tailwind classes
  // (e.g. responsive `min-h-...`) via className instead.
  minHeight?: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Click/tap to flip. Each instance owns its own state, so cards are independent.
 * Hover gives a subtle scale via CSS (.flip-card-outer:hover) — no JS hover state.
 */
export function FlipCard({
  front,
  back,
  minHeight,
  className = "",
  ariaLabel,
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  function toggle() {
    // TEMP debug — remove once flip reliability is confirmed.
    console.log("FlipCard click:", ariaLabel, "→", !isFlipped);
    setIsFlipped((v) => !v);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div
      className={`flip-card-outer ${isFlipped ? "is-flipped" : ""} ${className}`}
      style={{ minHeight }}
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-pressed={isFlipped}
    >
      <div className="flip-card-inner">
        <div className="flip-card-face">{front}</div>
        <div className="flip-card-face flip-card-back">{back}</div>
      </div>
    </div>
  );
}
