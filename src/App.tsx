import { Routes, Route } from "react-router-dom";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { ValueBand } from "./sections/ValueBand";
import { WhyKG } from "./sections/WhyKG";
import { HowTo } from "./sections/HowTo";
import { Timeline } from "./sections/Timeline";
import { FAQ } from "./sections/FAQ";
import { ThePlace } from "./sections/ThePlace";
import { DownloadCTA } from "./sections/DownloadCTA";
import { Footer } from "./sections/Footer";
import { StickyDesktopCTA } from "./sections/StickyDesktopCTA";
import { MobileStickyBar } from "./sections/MobileStickyBar";

function BukitIndahPage() {
  return (
    <div className="bg-kg-black text-kg-text pb-20 md:pb-0">
      <Navbar />
      <main>
        {/* Order: Hero → yellow value band → Why KG → The Place → How To →
            Timeline → Download CTA → FAQ → Footer. FAQ is the last major section
            before the footer so the download CTA sits closer to attention. */}
        <Hero />
        <ValueBand />
        <WhyKG />
        <ThePlace />
        <HowTo />
        <Timeline />
        <DownloadCTA />
        <FAQ />
      </main>
      <Footer />
      <StickyDesktopCTA />
      <MobileStickyBar />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BukitIndahPage />} />
      <Route path="/bukit-indah" element={<BukitIndahPage />} />
      <Route path="*" element={<BukitIndahPage />} />
    </Routes>
  );
}
