import { motion } from "framer-motion";
import { CTAButton } from "../components/CTAButtons";
import { PhotoOrPlaceholder } from "../components/Placeholder";
import { VIEWPORT_ONCE, VIEWPORT_TIGHT, EASE } from "../utils/motion";

// Final call-to-action. The on-site sign-up form is gone — we now send people
// straight to the Kampung Gym app to lock in their RM99/month. The free shaker
// (first 200 sign-ups) is the hook, shown alongside the download buttons.

const REASSURANCE = ["No contract", "No joining fee", "Cancel anytime"];

export function DownloadCTA() {
  return (
    <section
      id="download"
      className="border-t border-kg-hairline"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #141414 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-[120px]">
        {/* Top text block */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.0, ease: EASE }}
            className="font-mont font-semibold relative inline-block"
            style={{
              color: "rgba(255, 255, 255, 0.55)",
              fontSize: "18px",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            RM129/month
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ delay: 0.3, duration: 1.0, ease: EASE }}
              className="absolute left-0 right-0 origin-left"
              style={{
                top: "50%",
                height: "2px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.55)",
              }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.15, duration: 1.2, ease: EASE }}
            className="font-anton tracking-anton text-4xl md:text-6xl lg:text-7xl leading-[1.0]"
          >
            RM99/month. Locked forever.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.35, duration: 1.0, ease: EASE }}
            className="mt-6 text-kg-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Download the Kampung Gym app to lock in RM99/month for life. Choose
            Tasek Central as your Home Gym during pre-sales — and the first 200
            sign-ups get a free Kampung Gym shaker.
          </motion.p>
        </div>

        {/* Shaker + download buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_TIGHT}
          transition={{ delay: 0.5, duration: 1.0, ease: EASE }}
          className="mt-12 md:mt-16 mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          style={{ maxWidth: "760px" }}
        >
          {/* Shaker product photo */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div
              className="relative rounded-3xl overflow-hidden bg-kg-card"
              style={{
                width: "200px",
                height: "250px",
                border: "1px solid rgba(255, 204, 0, 0.3)",
                boxShadow: "0 0 32px rgba(255, 204, 0, 0.12)",
              }}
            >
              <PhotoOrPlaceholder
                src="/photos/shaker.png"
                alt="Free Kampung Gym shaker"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
                label="shaker.png"
              />
              <span className="absolute bottom-0 left-0 right-0 text-center font-anton tracking-anton text-black bg-kg-yellow/95 py-1.5 text-[11px]">
                FREE FOR FIRST 200
              </span>
            </div>
            <span
              className="text-center leading-snug"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
            >
              Reference image — actual shaker may vary.
            </span>
          </div>

          {/* Copy + CTAs */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <h3 className="font-anton tracking-anton text-2xl md:text-3xl leading-tight">
              First 200 sign-ups get a free shaker.
            </h3>
            <p className="text-kg-muted text-sm md:text-base max-w-sm leading-relaxed">
              Lock in your RM99/month rate in the app and collect your free
              shaker on opening day.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <CTAButton
                variant="primary"
                label="DOWNLOAD APP TO SIGN UP →"
                type="download"
                location="final_download"
                size="lg"
              />
              <CTAButton
                variant="secondary"
                label="WhatsApp Us"
                type="whatsapp"
                location="final_whatsapp"
                size="lg"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1.5">
              {REASSURANCE.map((item) => (
                <span
                  key={item}
                  className="font-mont text-xs text-kg-dim flex items-center gap-1.5"
                >
                  <span className="text-kg-yellow">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
