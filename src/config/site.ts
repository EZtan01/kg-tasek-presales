// Site-wide constants (links + the WhatsApp prefill message).
// Display copy is now hardcoded English directly in each component —
// this file holds only the values shared across components.

// CTA target URLs.
export const CTA_LINKS = {
  // TODO: swap to a smart link that auto-detects iOS/Android. Apple-only for now.
  appDownload: "https://apps.apple.com/us/app/kampung-gym/id6444578382",
  whatsappNumber: "60167570210",
};

export const SOCIAL = {
  instagram: "https://instagram.com/kampunggym",
  facebook: "https://facebook.com/kampunggym",
  tiktok: "https://tiktok.com/@kampunggymofficial",
};

// Prefilled message for the WhatsApp deep link.
export const WHATSAPP_MESSAGE =
  "Hi, I want to know more about Tasek Central pre-sales";
