import { CTA_LINKS, WHATSAPP_MESSAGE } from "../config/site";
import { useTracking, type CTALocation } from "../hooks/useTracking";
import { appendUTMs } from "../utils/appendUTMs";

type Variant = "primary" | "secondary";

type Props = {
  variant: Variant;
  label: string;
  // "download" opens the Kampung Gym app download link. "whatsapp" opens the
  // WhatsApp deep link with a prefilled message.
  type: "download" | "whatsapp";
  location: CTALocation;
  size?: "md" | "lg";
  className?: string;
};

export function CTAButton({
  variant,
  label,
  type,
  location,
  size = "md",
  className = "",
}: Props) {
  const { trackCTA } = useTracking();

  const padding = size === "lg" ? "px-8 py-4 text-base" : "px-7 py-3.5 text-sm";
  const base =
    "inline-flex items-center justify-center font-anton rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0";
  const styles =
    variant === "primary"
      ? "bg-kg-yellow text-black hover:brightness-95 shadow-soft-yellow hover:shadow-soft-yellow-hover"
      : "bg-transparent text-kg-yellow border border-kg-yellow hover:bg-kg-yellow/10";

  if (type === "download") {
    // Open the Kampung Gym app download link in a new tab.
    const downloadHref = appendUTMs(CTA_LINKS.appDownload);
    return (
      <a
        href={downloadHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCTA(location)}
        className={`${base} ${padding} ${styles} ${className}`}
      >
        {label}
      </a>
    );
  }

  // WhatsApp — external deep link.
  const href = appendUTMs(
    `https://wa.me/${CTA_LINKS.whatsappNumber}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`
  );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCTA(location)}
      className={`${base} ${padding} ${styles} ${className}`}
    >
      {label}
    </a>
  );
}
