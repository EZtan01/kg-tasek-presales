import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTracking } from "../hooks/useTracking";
import { CTA_LINKS } from "../config/site";
import { appendUTMs } from "../utils/appendUTMs";

export function StickyDesktopCTA() {
  const { trackCTA } = useTracking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || typeof IntersectionObserver === "undefined") {
      const onScroll = () => setVisible(window.scrollY > 600);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // The trailing arrow is split off so we can animate it independently.
  const label = "DOWNLOAD APP TO SIGN UP →";
  const arrowMatch = label.match(/^(.*?)\s*(→)\s*$/);
  const text = arrowMatch ? arrowMatch[1] : label;
  const arrow = arrowMatch ? arrowMatch[2] : "";

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="sticky-desktop-cta"
          href={appendUTMs(CTA_LINKS.appDownload)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTA("sticky_desktop")}
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: 1,
            // Gentle continuous bounce — 3s per cycle.
            y: [0, -3, 0],
          }}
          exit={{ opacity: 0, y: 14 }}
          transition={{
            opacity: { duration: 0.45 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="hidden md:inline-flex fixed bottom-20 right-8 z-50 items-center font-anton tracking-anton text-[15px] bg-kg-yellow text-black px-6 py-4 rounded-full shadow-soft-sticky hover:brightness-95"
        >
          <span>{text}</span>
          {arrow && (
            <motion.span
              aria-hidden
              className="ml-1.5 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {arrow}
            </motion.span>
          )}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
