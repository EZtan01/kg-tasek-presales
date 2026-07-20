import { Instagram, Facebook } from "lucide-react";
import { SOCIAL } from "../config/site";

// Lucide doesn't ship a TikTok icon — use a tiny inline SVG.
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.78a8.16 8.16 0 0 0 4.77 1.52V6.85a4.85 4.85 0 0 1-1.84-.16z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-kg-black border-t border-kg-hairline">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-14 flex flex-col items-center text-center gap-5">
        <div className="font-anton tracking-anton text-xl md:text-2xl">
          KAMPUNG GYM
        </div>
        <div className="text-xs md:text-sm text-kg-muted">
          Tasek Central · Austin · Toppen · Seelong · Dato' Onn
        </div>
        <div className="flex items-center gap-4 mt-1">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-kg-muted hover:text-kg-yellow transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-kg-muted hover:text-kg-yellow transition"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={SOCIAL.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-kg-muted hover:text-kg-yellow transition"
          >
            <TikTokIcon className="w-5 h-5" />
          </a>
        </div>
        <div className="text-[11px] md:text-xs text-kg-dim mt-2">
          © Kampung Gym. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
