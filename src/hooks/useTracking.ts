import { useCallback } from "react";

export type CTALocation =
  | "hero_download"
  | "hero_whatsapp"
  | "final_download"
  | "final_whatsapp"
  | "sticky_desktop"
  | "sticky_mobile_download"
  | "sticky_mobile_whatsapp";

declare global {
  interface Window {
    fbq?: (
      kind: "trackCustom" | "track",
      event: string,
      params?: Record<string, unknown>
    ) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
    };
  }
}

export function useTracking() {
  const trackCTA = useCallback((location: CTALocation) => {
    const isWhatsapp = location.includes("whatsapp");
    try {
      window.fbq?.("trackCustom", "CTAClick", { location, language: "en" });
      // WhatsApp click = a real inquiry → fire Meta's standard Lead event too.
      if (isWhatsapp) {
        window.fbq?.("track", "Lead", { content_name: location, language: "en" });
      }
    } catch {
      // pixel not loaded — skip silently
    }
    try {
      window.ttq?.track("ClickButton", { content_id: location });
    } catch {
      // pixel not loaded — skip silently
    }
  }, []);

  return { trackCTA };
}
