import { Download, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CTA_LINKS, WHATSAPP_MESSAGE } from "../config/site";
import { useTracking } from "../hooks/useTracking";
import { appendUTMs } from "../utils/appendUTMs";

export function MobileStickyBar() {
  const { trackCTA } = useTracking();

  const waHref = appendUTMs(
    `https://wa.me/${CTA_LINKS.whatsappNumber}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.8,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-kg-black/95 backdrop-blur border-t border-kg-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2">
        <a
          href={appendUTMs(CTA_LINKS.appDownload)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTA("sticky_mobile_download")}
          className="flex items-center justify-center gap-2 bg-kg-yellow text-black font-anton tracking-anton py-4 text-sm"
        >
          <Download className="w-4 h-4" />
          <span>DOWNLOAD TO SIGN UP</span>
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTA("sticky_mobile_whatsapp")}
          className="flex items-center justify-center gap-2 bg-kg-card text-kg-yellow font-anton tracking-anton py-4 text-sm border-l border-kg-border"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WHATSAPP</span>
        </a>
      </div>
    </motion.div>
  );
}
