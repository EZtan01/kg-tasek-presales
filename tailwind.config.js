/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kg: {
          black: "#000000",
          alt: "#141414",
          card: "#1A1A1A",
          yellow: "#FFCC00",
          border: "rgba(255, 204, 0, 0.2)",
          hairline: "rgba(255, 204, 0, 0.06)",
          text: "#FFFFFF",
          muted: "rgba(255, 255, 255, 0.7)",
          dim: "rgba(255, 255, 255, 0.5)",
        },
      },
      fontFamily: {
        anton: ['"Anton"', "Impact", "sans-serif"],
        body: ['"Public Sans"', "system-ui", "sans-serif"],
        mont: ['"Montserrat"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        anton: "1px",
      },
      boxShadow: {
        // Soft, near-black drop shadow with a barely-there warm tint — depth
        // for dark cards without reading as a "glow".
        "soft-card":
          "0 8px 24px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(255, 204, 0, 0.05)",
        "soft-card-hover":
          "0 16px 40px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(255, 204, 0, 0.1)",
        // Visible-but-restrained yellow lift for the RM99 / accent cards.
        "soft-yellow":
          "0 8px 32px rgba(255, 204, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.3)",
        "soft-yellow-hover":
          "0 12px 44px rgba(255, 204, 0, 0.3), 0 2px 10px rgba(0, 0, 0, 0.35)",
        // Floating sticky CTA — feels lifted off the page.
        "soft-sticky":
          "0 4px 16px rgba(255, 204, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
