// Read UTM params from the current page URL and append them to an outbound URL.
// Lets us preserve ad attribution when users click out to the app store / WhatsApp.

const UTM_KEYS = [
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_content",
  "utm_term",
];

export function appendUTMs(url: string): string {
  if (typeof window === "undefined") return url;

  const current = new URLSearchParams(window.location.search);
  const toAppend: [string, string][] = [];
  for (const key of UTM_KEYS) {
    const v = current.get(key);
    if (v) toAppend.push([key, v]);
  }
  if (toAppend.length === 0) return url;

  // wa.me uses query string for the "text" param, so we need to merge carefully.
  try {
    const u = new URL(url);
    for (const [k, v] of toAppend) {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    }
    return u.toString();
  } catch {
    const sep = url.includes("?") ? "&" : "?";
    return (
      url +
      sep +
      toAppend.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")
    );
  }
}
