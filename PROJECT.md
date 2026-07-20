# Kampung Gym Bukit Indah Pre-Sales Landing Page

> **For Claude Code:** This is the master context document for this project. Read this FIRST before any task. All decisions, translations, and brand details are finalized here. If asked to do something that conflicts with this doc, flag it and ask before proceeding.

---

## 1. Project Overview

**What:** Pre-sales landing page for Kampung Gym's new Bukit Indah branch
**Where:** Lotus's Bukit Indah, Johor Bahru, Malaysia
**When:** Branch opens mid-to-late August 2026 (renovation ~2.5 months)
**Goal:** Convert Meta and TikTok ad traffic into Kampung Gym app downloads + pre-sales sign-ups
**Traffic source:** 90% mobile, from paid ads
**Audience:** Locals in Johor Bahru — mix of English speakers, Mandarin speakers, and Bahasa Malaysia speakers

**Success metrics:**
- App downloads (primary)
- WhatsApp inquiries (secondary)
- Cost per sign-up under RM 30 (target)

---

## 2. The Pre-Sales Offer

- **Price:** RM99/month, locked for life (does not increase as long as subscription is active)
- **Regular price after launch:** RM129/month
- **Tier:** KG Basic (not Premium)
- **Contract:** None — cancel anytime
- **Joining fee:** None — just pay first month
- **Free shaker:** First 200 sign-ups (pre-order, collected within 30 days after opening)
- **Billing:** First payment today (Month 1). Next charge = 1 month AFTER official opening day. E.g., if opens 25 Aug → next charge 25 Sep. Then recurring monthly.

---

## 3. Brand Guidelines

**Colors (use exactly):**
- Background black: `#000000`
- Section alt: `#0A0A0A`
- Card background: `#1A1A1A`
- Brand yellow / accent / CTA: `#FFCC00`
- Yellow-tinted border: `rgba(255, 204, 0, 0.2)`
- Text primary: `#FFFFFF`
- Text secondary: `rgba(255, 255, 255, 0.7)`
- Text muted: `rgba(255, 255, 255, 0.5)`

**Typography:**
- **Anton** — all headlines, H1, H2, section titles, step numbers, value band, final CTA. Uppercase, condensed, weight 400, letter-spacing 1px.
- **Public Sans** — body text, descriptions, secondary content
- **Montserrat** — subheadings (used sparingly)
- Use Google Fonts. Don't fall back to Impact unless Anton fails to load.

**Tone of voice:**
- Bold, energetic, slightly hype but not corporate
- Confident, direct
- Think: modern boutique gym (Barry's Bootcamp meets local Malaysian)
- NOT: stuffy fitness corporate, NOT cheesy "transform your life" garbage

**Buttons:**
- Primary: yellow bg `#FFCC00`, black text, `rounded-md` (6px), `px-7 py-3.5`
- Secondary: transparent bg, yellow text, 1px yellow border
- Hover: `-translate-y-0.5 transition`

**Cards:**
- Bg `#1A1A1A`, border `rgba(255,204,0,0.2)`, `rounded-xl` (12px), `p-6` (24px)

---

## 4. Tech Stack

- **Framework:** Vite + React + TypeScript (NOT TanStack Start, NOT Next.js, NOT SSR)
- **Styling:** Tailwind CSS v3 (NOT v4 — too many breaking changes)
- **Icons:** lucide-react
- **Routing:** react-router-dom (in case we add multi-branch later)
- **Deployment target:** Vercel (will work cleanly with this clean Vite SPA)
- **Why this stack:** Maximum portability, no SSR complexity, deploys anywhere

---

## 5. Page Structure (top to bottom)

1. **Sticky navbar** — Logo left, 3-language toggle right (EN / 中文 / BM)
2. **Hero** — Badge, H1, subhead, two CTAs (Download App + WhatsApp), optional bg image
3. **Yellow value band** — RM99 locked forever messaging
4. **Why Kampung Gym Bukit Indah** — 8 feature cards (4×2 grid)
5. **How to Lock In Your RM99** — 4 numbered steps (Step 02 has IMPORTANT badge)
6. **What Happens Next** — 3-card timeline (middle card yellow highlight)
7. **FAQ** — 9 questions in accordion
8. **Photo gallery** — 4 photos from existing branches (placeholder for now)
9. **Final CTA** — Price comparison (RM129 strikethrough → RM99), 2 buttons, reassurance checkmarks
10. **Footer** — Logo, branches list, social icons (IG, FB, TikTok)
11. **Floating sticky CTA** (desktop only) — Yellow pill, fades in after scroll
12. **Mobile sticky bottom bar** (mobile only) — 50/50 split Download + WhatsApp

---

## 6. Content Architecture Rule

**ALL display text MUST live in `src/config/translations.ts`** as a single export.

```ts
export const translations = {
  navbar: { logo: { en: "...", zh: "...", ms: "..." } },
  hero: {
    badge: { en: "...", zh: "...", ms: "..." },
    headline: { en: "...", zh: "...", ms: "..." },
    // etc
  },
  // ... every section
}
```

**No hardcoded strings in components.** Components use a `t(key)` helper or `useTranslation()` hook to read from this file. This way, 90% of edits are 1-file changes.

**Languages:**
- `en` — English (default)
- `zh` — 中文 (Simplified Chinese)
- `ms` — BM (Bahasa Malaysia)

Save selected language to localStorage as `kg_lang`. Set `<html lang>` accordingly.

**CRITICAL RULES:**
- The term **"Home Gym"** stays in English across ALL 3 languages — do NOT translate it. Used in Step 02 description because it's specific KG app terminology.
- "RM" stays as "RM" in all languages (standard Malaysian Ringgit notation)
- Branch names (Lotus's Bukit Indah, Austin, Toppen, etc.) stay as-is in all languages

---

## 7. Full Content (all 3 languages, finalized)

### Navbar
- Logo: "KAMPUNG GYM" (all languages)

### Hero

| Field | EN | ZH | MS |
|---|---|---|---|
| Badge | OPENING MID-AUGUST 2026 | 2026年8月中开业 | DIBUKA PERTENGAHAN OGOS 2026 |
| Headline | KAMPUNG GYM IS COMING TO BUKIT INDAH | KAMPUNG GYM 即将进驻 BUKIT INDAH | KAMPUNG GYM AKAN DIBUKA DI BUKIT INDAH |
| Subhead | Lock in RM99/month. Forever. 24-hour gym at Lotus's Bukit Indah. | 锁定 RM99/月，永远不变。24小时营业，就在 Lotus's Bukit Indah。 | Kunci harga RM99/bulan. Selamanya. Gym 24 jam di Lotus's Bukit Indah. |
| CTA Primary | Download App & Sign Up | 下载App立即注册 | Muat Turun App & Daftar |
| CTA Secondary | WhatsApp Us | WhatsApp 联系我们 | WhatsApp Kami |

### Yellow Value Band

| Field | EN | ZH | MS |
|---|---|---|---|
| H2 | RM99/MONTH. LOCKED IN FOREVER. | RM99/月，永久锁定 | RM99/BULAN. DIKUNCI SELAMANYA. |
| Subtext | Sign up during pre-sales and your monthly rate stays at RM99 — even after we open and prices go up. | Pre-sales 期间注册，每月固定 RM99，正式开业后涨价也不影响您。 | Daftar semasa pre-sales dan kadar bulanan anda kekal RM99 — walaupun harga naik selepas kami dibuka. |

### Why Kampung Gym Bukit Indah (Section Title)

| EN | ZH | MS |
|---|---|---|
| WHY KAMPUNG GYM BUKIT INDAH | 为什么选择 KAMPUNG GYM BUKIT INDAH | KENAPA KAMPUNG GYM BUKIT INDAH |

### The 8 Feature Cards

| # | Icon (Lucide) | EN Title | ZH Title | MS Title |
|---|---|---|---|---|
| 1 | Clock | 24 Hours | 24小时营业 | 24 Jam |
| 2 | MapPin | Lotus's Bukit Indah | Lotus's Bukit Indah | Lotus's Bukit Indah |
| 3 | ParkingSquare | Free & Easy Parking | 停车超方便 | Parkir Mudah & Percuma |
| 4 | Snowflake | Air-Conditioned | 冷气开放 | Berhawa Dingin |
| 5 | DollarSign | RM99 Locked Forever | RM99 永久锁定 | RM99 Dikunci Selamanya |
| 6 | Gift | Free Shaker (First 200) | 首200位免费 Shaker | Shaker Percuma (200 Pertama) |
| 7 | FileX | No Contract | 无合约绑定 | Tiada Kontrak |
| 8 | BadgeCheck | No Joining Fee | 无入会费 | Tiada Yuran Pendaftaran |

| # | EN Desc | ZH Desc | MS Desc |
|---|---|---|---|
| 1 | Train on your schedule. Day, night, anytime. | 随时训练，无论白天黑夜 | Latih ikut jadual anda. Siang, malam, bila-bila masa. |
| 2 | Located inside Lotus's Bukit Indah complex. | 位于 Lotus's Bukit Indah 商场内 | Terletak di dalam kompleks Lotus's Bukit Indah. |
| 3 | Right next to the parking lot. No walking far. | 就在停车场旁边，无需走远 | Tepi tempat letak kereta. Tak payah jalan jauh. |
| 4 | Cool and comfortable workouts during peak hours. | 高峰时段冷气开放，舒适训练 | Latihan selesa dengan hawa dingin pada waktu puncak. |
| 5 | Pre-sales price stays with you for life. | Pre-sales 价格永久跟随您 | Harga pre-sales kekal seumur hidup. |
| 6 | First 200 sign-ups get a free KG shaker. | 首200位注册者免费获得 KG 摇摇杯 | 200 pendaftar pertama dapat shaker KG percuma. |
| 7 | Cancel anytime. No long-term lock-in. | 随时取消，无长期束缚 | Batal bila-bila masa. Tiada ikatan jangka panjang. |
| 8 | Just pay your first month and you're in. | 只需支付首月费用即可加入 | Bayar bulan pertama sahaja dan anda diterima. |

**Note on "Air-Conditioned" card:** Do NOT use "Fully" or "全场" or "Sepenuhnya". A/C runs during peak hours only (turned down/off late at night to save energy). The current wording is the legally accurate version.

### How to Lock In Your RM99 — Section Title + Subtitle

| Field | EN | ZH | MS |
|---|---|---|---|
| Title | HOW TO LOCK IN YOUR RM99 | 如何锁定您的 RM99 价格 | CARA KUNCI HARGA RM99 ANDA |
| Subtitle | Four steps. Five minutes. | 四个步骤，五分钟搞定 | Empat langkah. Lima minit. |

### The 4 Steps (Step 02 has IMPORTANT badge + yellow border)

**Step 01 — Download**
- EN: "Download the Kampung Gym App" / "Available on App Store and Google Play. Verify your account via OTP."
- ZH: "下载 Kampung Gym App" / "App Store 和 Google Play 都可下载。通过 OTP 验证您的账号。"
- MS: "Muat Turun Kampung Gym App" / "Tersedia di App Store dan Google Play. Sahkan akaun anda dengan OTP."

**Step 02 — Choose Home Gym ⚠️ IMPORTANT (badge: IMPORTANT / 重要 / PENTING)**
- EN: "Choose Bukit Indah as Your Home Gym" / "You MUST select Bukit Indah as your Home Gym for the offer to apply."
- ZH: "选择 Bukit Indah 为您的 Home Gym" / "必须选择 Bukit Indah 为 Home Gym，优惠才会生效。"
- MS: "Pilih Bukit Indah Sebagai Home Gym Anda" / "Anda WAJIB pilih Bukit Indah sebagai Home Gym untuk dapatkan tawaran ini."

**Step 03 — Select Plan**
- EN: "Go to Explore → Select Pre-Sales Plan" / "Inside the app, tap Explore and choose the Bukit Indah Pre-Sales plan."
- ZH: "进入 App → 点击 Explore → 选择 Pre-Sales 方案" / "在 App 内点击 Explore，选择 Bukit Indah Pre-Sales 方案。"
- MS: "Pergi ke Explore → Pilih Pelan Pre-Sales" / "Dalam app, tekan Explore dan pilih pelan Pre-Sales Bukit Indah."

**Step 04 — Pay**
- EN: "Pay & You're In" / "Your first payment is today. Your next charge will be one month after our official opening date. Payment is recurring monthly."
- ZH: "付款完成，立即生效" / "首次付款为今天。下次扣款将是开业日期一个月后。月费自动续订。"
- MS: "Bayar & Anda Sudah Masuk" / "Bayaran pertama anda hari ini. Caj seterusnya pada satu bulan selepas tarikh pembukaan rasmi. Bayaran auto setiap bulan."

### What Happens Next — Section Title

| EN | ZH | MS |
|---|---|---|
| WHAT HAPPENS NEXT | 接下来的时间表 | APA YANG SETERUSNYA |

### Timeline Cards

**Card 1 (dark)**
- Label: NOW → AUG / 现在 → 8月 / SEKARANG → OGOS
- Title: Pre-sales open / Pre-sales 开放 / Pre-sales dibuka
- Desc: Renovation in progress (~2.5 months) / 装修进行中（约2.5个月） / Renovasi sedang berjalan (~2.5 bulan)

**Card 2 (YELLOW HIGHLIGHT)**
- Label: MID-LATE AUG 2026 / 2026年8月中-月底 / PERTENGAHAN-AKHIR OGOS 2026
- Title: Branch opens 🎉 / 分行正式开业 🎉 / Cawangan dibuka 🎉
- Desc: Start training! / 开始训练！ / Mula latihan!

**Card 3 (dark)**
- Label: MONTH 2 ONWARDS / 第2个月起 / BULAN 2 SETERUSNYA
- Title: RM99 continues / RM99 月费持续 / RM99 berterusan
- Desc: Locked in forever / 永久锁定 / Dikunci selamanya

### FAQ — Section Title

| EN | ZH | MS |
|---|---|---|
| QUESTIONS? | 常见问题 | ADA SOALAN? |

### The 9 FAQs

**1. 24 hours**
- Q EN: Is the gym really open 24 hours?
- A EN: Yes. Members can access the gym anytime, day or night, using their app.
- Q ZH: 健身房真的24小时营业吗？
- A ZH: 是的。会员可使用 App 随时进入健身房，白天黑夜皆可。
- Q MS: Adakah gym betul-betul buka 24 jam?
- A MS: Ya. Ahli boleh masuk gym bila-bila masa, siang atau malam, menggunakan app.

**2. When opens**
- Q EN: When does Bukit Indah officially open?
- A EN: We're targeting mid-to-late August 2026. Renovation is in progress.
- Q ZH: Bukit Indah 几时正式开业？
- A ZH: 预计2026年8月中至8月底正式开业，装修进行中。
- Q MS: Bila Bukit Indah dibuka rasmi?
- A MS: Kami sasarkan pertengahan ke akhir Ogos 2026. Renovasi sedang berjalan.

**3. Price stability**
- Q EN: Will my RM99 rate ever go up?
- A EN: No. As long as your subscription is active, your rate stays at RM99/month — even when we raise prices for new members later.
- Q ZH: 我的 RM99 月费会涨价吗？
- A ZH: 不会。只要您持续订阅，月费固定 RM99，即使日后涨价也不影响您。
- Q MS: Adakah kadar RM99 saya akan naik?
- A MS: Tidak. Selagi langganan anda aktif, kadar anda kekal RM99/bulan — walaupun kami naikkan harga untuk ahli baru nanti.

**4. Billing schedule**
- Q EN: When do I get charged?
- A EN: Your first payment is today. Your next charge will be one month after our official opening date. For example, if we open on 25 August, your next payment will be on 25 September.
- Q ZH: 几时开始扣款？
- A ZH: 首次付款为今天。下次扣款将是开业日期一个月后。例如：8月25日开业，下次扣款就是9月25日。
- Q MS: Bila saya akan dicaj?
- A MS: Bayaran pertama anda hari ini. Caj seterusnya pada satu bulan selepas tarikh pembukaan rasmi. Contoh: jika kami buka pada 25 Ogos, bayaran seterusnya pada 25 September.

**5. Cancellation**
- Q EN: What if I want to cancel?
- A EN: You can cancel by visiting our kiosk in person before your next billing date. Cancellation must be done before the next billing cycle to avoid being charged.
- Q ZH: 如果我想取消怎么办？
- A ZH: 您需亲自到我们的 kiosk 办理取消，并在下次扣款日期前完成。取消必须在下个扣款周期前办理，以避免被扣款。
- Q MS: Macam mana kalau saya nak batalkan?
- A MS: Anda boleh batalkan dengan datang ke kiosk kami sendiri sebelum tarikh bil seterusnya. Pembatalan mesti dibuat sebelum kitaran bil seterusnya untuk elak dicaj.

**6. Location**
- Q EN: Where exactly is the gym?
- A EN: Inside Lotus's Bukit Indah, right next to the parking lot for easy access.
- Q ZH: 健身房具体在哪里？
- A ZH: 位于 Lotus's Bukit Indah 内，就在停车场旁边，进出非常方便。
- Q MS: Di mana lokasi gym yang tepat?
- A MS: Di dalam Lotus's Bukit Indah, betul-betul tepi tempat letak kereta untuk akses mudah.

**7. Free shaker**
- Q EN: Do I get a free shaker?
- A EN: First 200 sign-ups get a free Kampung Gym shaker. Shakers are pre-order and can be collected at the gym within 30 days after our opening day. Once the first 200 spots are filled, we'll notify everyone else and send a voucher to your app — please check your inbox and the vouchers section in the app, and redeem your shaker by showing the voucher when you collect it.
- Q ZH: 我会拿到免费 shaker 吗？
- A ZH: 首200位注册者可获得免费 Kampung Gym shaker。Shaker 是 pre-order 的，可在开业日后的30天内到店领取。首200位名额满后，我们会通知所有人并发送 voucher 到您的 App — 请记得查看 App 内的 inbox 和 voucher 页面，凭 voucher 到店领取 shaker。
- Q MS: Adakah saya dapat shaker percuma?
- A MS: 200 pendaftar pertama dapat shaker Kampung Gym percuma. Shaker adalah pre-order dan boleh diambil di gym dalam tempoh 30 hari selepas hari pembukaan. Setelah 200 tempat penuh, kami akan maklumkan semua orang dan hantar voucher ke app anda — sila semak inbox dan bahagian voucher dalam app, dan tebus shaker anda dengan tunjukkan voucher semasa mengambilnya.

**8. Freeze**
- Q EN: Can I freeze my membership?
- A EN: Yes. Every member gets one free freeze per year, equal to one billing cycle. You must apply for the freeze through the app before your next billing date.
- Q ZH: 我可以暂停会员资格吗？
- A ZH: 可以。每位会员每年享有一次免费暂停，时长为一个扣款周期。您必须在下次扣款日期前通过 App 申请暂停。
- Q MS: Boleh saya freeze keahlian saya?
- A MS: Ya. Setiap ahli dapat satu freeze percuma setahun, sama dengan satu kitaran bil. Anda mesti mohon freeze melalui app sebelum tarikh bil seterusnya.

**9. Rejoin price**
- Q EN: If I cancel, will I keep the RM99 rate when I rejoin?
- A EN: No. The RM99 rate is exclusive to active subscribers. Once you cancel, rejoining will be at the regular price of RM129/month.
- Q ZH: 取消后再加入还能享有 RM99 价格吗？
- A ZH: 不能。RM99 价格仅限持续订阅的会员。一旦取消，重新加入需按正常价格 RM129/月。
- Q MS: Kalau saya batal, adakah saya kekal kadar RM99 bila daftar semula?
- A MS: Tidak. Kadar RM99 hanya untuk pelanggan aktif. Setelah anda batal, pendaftaran semula akan dikenakan harga biasa RM129/bulan.

### Photo Gallery

**Section title**
| EN | ZH | MS |
|---|---|---|
| INSIDE KAMPUNG GYM | 走进 KAMPUNG GYM | DALAM KAMPUNG GYM |

**Caption (honest disclosure — photos are from other branches)**
- EN: Photos from our existing branches. Bukit Indah will follow the same standard.
- ZH: 照片来自现有分行。Bukit Indah 将延续相同标准。
- MS: Gambar dari cawangan sedia ada kami. Bukit Indah akan ikut standard yang sama.

### Final CTA Section

**Price comparison (above H2):**
- Show `~~RM129/month~~` strikethrough in muted text, then big H2

**H2 (line break in middle):**
| EN | ZH | MS |
|---|---|---|
| LOCK IN RM99.\nFOREVER. | 锁定 RM99\n永久不变 | KUNCI RM99.\nSELAMANYA. |

**Urgency line:**
- EN: Limited spots. First 200 sign-ups get a free shaker.
- ZH: 名额有限，首200位赠送免费摇摇杯
- MS: Tempat terhad. 200 pendaftar pertama dapat shaker percuma.

**Reassurance checkmarks (below buttons):**
- EN: ✓ No contract  ✓ No joining fee  ✓ Cancel anytime
- ZH: ✓ 无合约  ✓ 无入会费  ✓ 随时取消
- MS: ✓ Tiada kontrak  ✓ Tiada yuran  ✓ Batal bila-bila

**Final CTA Buttons:**
- Primary: Download App / 下载 App / Muat Turun App
- Secondary: WhatsApp Us / WhatsApp 联系我们 / WhatsApp Kami

### Floating sticky CTA (desktop only)

| EN | ZH | MS |
|---|---|---|
| Lock in RM99 → | 立即锁定 RM99 → | Kunci RM99 → |

### Mobile sticky bottom bar

| Field | EN | ZH | MS |
|---|---|---|---|
| Btn 1 | Download App | 下载 App | Muat Turun |
| Btn 2 | WhatsApp | WhatsApp | WhatsApp |

### Footer

- Logo: KAMPUNG GYM
- Branches line: `Lotus's Bukit Indah · Austin · Toppen · Seelong · Dato' Onn`
- Social icons: Instagram, Facebook, TikTok (Lucide icons, 20px, secondary color, hover yellow, gap 16px)

---

## 8. CTA Links & Tracking

**Primary CTA — Download App:**
- Current placeholder: `https://onelink.to/kampunggym`
- TODO: Replace with real smart link that auto-detects iOS/Android

**Secondary CTA — WhatsApp:**
- Format: `https://wa.me/60XXXXXXXXX?text=[encoded message]`
- Current placeholder: `60XXXXXXXXX`
- TODO: Replace `XXXXXXXXX` with real KG WhatsApp number

**WhatsApp prefilled messages (by language):**
- EN: "Hi, I want to know more about Bukit Indah pre-sales"
- ZH: "你好，我想了解 Bukit Indah pre-sales 详情"
- MS: "Hi, saya nak tahu lebih lanjut tentang pre-sales Bukit Indah"

**UTM Persistence:**
On every CTA click, read current URL's `utm_source`, `utm_campaign`, `utm_medium`, `utm_content`, `utm_term` and append them to the outbound URL. Helper: `appendUTMs(url)`.

**Tracking:**
- Meta Pixel — placeholder in `index.html` head, TODO: add real Pixel ID
- TikTok Pixel — same, TODO: add real Pixel ID
- On every CTA click, fire `fbq('trackCustom', 'CTAClick', { location, language })` and `ttq.track('ClickButton', { content_id: location })` if globals exist (gracefully skip if not)
- CTA locations: `hero_download`, `hero_whatsapp`, `final_download`, `final_whatsapp`, `sticky_desktop`, `sticky_mobile_download`, `sticky_mobile_whatsapp`

---

## 9. SEO

**Page title:** "Kampung Gym Bukit Indah — Pre-Sales | RM99/month locked forever"

**Meta description:** "Lock in RM99/month forever. 24-hour gym opening mid-August 2026 at Lotus's Bukit Indah, Johor Bahru. First 200 sign-ups get a free shaker."

**Open Graph tags:**
- `og:title`, `og:description` (same as above)
- `og:type`: website
- `og:image`: `/og-image.jpg` (placeholder, TODO: replace with real social card image at 1200×630px)
- `og:url`: production URL

**HTML lang:** Set initial to `en`, update on language toggle change.

---

## 10. Photos

**Strategy:** Use photos from existing KG branches (Austin, Toppen, Seelong, Dato' Onn). Be honest in the caption that these are from existing branches.

**Folder structure:**
```
public/photos/
├── hero.jpg          ← Hero background (wide, atmospheric, opacity 0.2-0.25)
├── gallery-1.jpg     ← Gym floor wide shot
├── gallery-2.jpg     ← Equipment / cardio area
├── gallery-3.jpg     ← Training in action
├── gallery-4.jpg     ← Reception / lounge area
└── og-image.jpg      ← Social share card (1200×630px)
```

**Photo selection criteria:**
- ✅ Landscape orientation
- ✅ High resolution (min 1920×1080)
- ✅ Good lighting
- ✅ Black/yellow brand tones present
- ✅ Clean, no clutter
- ✅ No clearly identifiable faces (unless model-released)
- ✅ No visible signage of another branch (avoid confusion)

**Hero image processing:**
- Position: absolute, full hero
- Opacity: 0.25 desktop, 0.15 mobile
- Filter: grayscale(0.3)
- Z-index 0, with dark gradient overlay z-index 1 above it
- Hero content z-index 2

**Status:** Placeholders for now. Real photos to be added when available.

---

## 11. Deployment

**Target host:** Vercel (clean Vite SPA, will work without issues)

**Build settings (Vercel auto-detects, but verify):**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Workflow:**
1. Code change → `git add -A && git commit -m "..." && git push`
2. Vercel auto-deploys in 30-60 seconds
3. Live at `xxx.vercel.app` (or custom domain when set up)

**No custom domain for now.** Pre-sales is short-term — `.vercel.app` URL is fine for ads. Connect custom domain later if needed.

---

## 12. Known TODOs (before going live)

1. ☐ Replace WhatsApp `60XXXXXXXXX` with real KG number
2. ☐ Replace `onelink.to/kampunggym` with real smart link
3. ☐ Add Meta Pixel ID to `index.html`
4. ☐ Add TikTok Pixel ID to `index.html`
5. ☐ Replace 5 placeholder photo files in `/public/photos/`
6. ☐ Confirm IG/FB/TikTok social handles (currently using `kampunggym`)
7. ☐ Test all 3 languages render correctly
8. ☐ Test on real mobile device (especially sticky bottom bar)
9. ☐ Test UTM persistence on CTA clicks
10. ☐ Test Meta + TikTok pixel events fire correctly

---

## 13. Future Improvements (post-launch ideas)

**Phase 2 (after data starts coming in):**
- A/B test different hero headlines
- Add testimonials section if/when we have early sign-ups willing to give quotes
- Add a "spots remaining" counter (real-time count of shaker-eligible spots left)
- Add an email capture for "not ready yet" visitors

**Phase 3 (when expanding to other branches):**
- Refactor to support multiple branches via config
- Routes: `/bukit-indah`, `/toppen`, `/seelong`, etc.
- Shared components, branch-specific content via `branches.ts` config
- One project, three subdomain deployments

**Things explicitly NOT doing:**
- ❌ "Founding members" framing (KG offer is simpler — no founding tier needed)
- ❌ Multi-page site (Bukit Indah is single-page, like a paid ad LP)
- ❌ Trial periods (RM99 is already the entry offer)
- ❌ Sign-up form on page (we direct to app — keeps payment + onboarding in one funnel)

---

## 14. Common Edit Tasks (how to do common things)

**Edit any copy/text:**
- Open `src/config/translations.ts`
- Find the key, edit the value
- Save → dev server auto-reloads

**Add a new FAQ:**
- Open `src/config/translations.ts` → find `faq` section
- Add a new entry with q + a in all 3 languages
- Save (FAQ list is auto-generated from this array)

**Change a price (e.g., RM99 → RM89):**
- Search `translations.ts` for "99" — update everywhere it appears in the content
- Also check the strikethrough RM129 reference if regular price changes

**Update WhatsApp number:**
- Search project for `60XXXXXXXXX` — replace globally

**Add a new feature card:**
- `src/config/translations.ts` → find the `whyKG` array → add new entry with icon name + 3-language title + desc
- Card renders automatically

**Replace photos:**
- Drop new files into `/public/photos/` with the same filenames (hero.jpg, gallery-1.jpg, etc.) — they auto-update

**Deploy after changes:**
```bash
git add -A
git commit -m "Update [what you changed]"
git push
```
Vercel auto-deploys.

---

## 15. Style Tips (don't drift from these)

- Headlines = Anton, always uppercase
- Body = Public Sans, sentence case
- Yellow is for emphasis only — overusing it kills its power
- Cards have border, not background fill, to maintain dark depth
- Spacing rhythm: 60-80px section padding, 24px card padding, 16px between cards
- Mobile-first — test mobile layout FIRST, desktop second
- Don't add new colors. Stick to black / white / yellow / grays.
- Don't add new fonts. Anton + Public Sans only.

---

*End of PROJECT.md*
*Last updated: [today]*
*Owner: EZ — Marketing & Operations Manager, Kampung Gym*
