// Small pill rendered in the corner of every real photo, telling the user
// the photo is from another branch (and that Tasek Central will be the same vibe).
// Keeps the page honest while photos from Tasek Central aren't available yet.
export function ImageDisclaimer({
  position = "bottom-left",
}: {
  position?: "bottom-left" | "top-left" | "bottom-right";
}) {
  const posClass =
    position === "top-left"
      ? "top-3 left-3"
      : position === "bottom-right"
      ? "bottom-3 right-3"
      : "bottom-3 left-3";

  return (
    <span
      className={`absolute ${posClass} z-[2] inline-flex items-center font-mont text-[10px] md:text-xs font-semibold uppercase tracking-wider text-black bg-kg-yellow/95 rounded-full px-2.5 py-1 shadow-sm pointer-events-none`}
    >
      Other branch — same vibe
    </span>
  );
}
