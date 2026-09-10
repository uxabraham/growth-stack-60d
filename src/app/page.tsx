import { getSiteContent } from "@/lib/content";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import BackToTop from "@/components/BackToTop";
import Seam from "@/components/ui/Seam";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import Methodology from "@/components/sections/Methodology";
import FinalResult from "@/components/sections/FinalResult";
import CasesAuthority from "@/components/sections/CasesAuthority";
import ForWhoNot from "@/components/sections/ForWhoNot";
import Investment from "@/components/sections/Investment";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

// Flat section background colors, in page order — the darker of each
// adjoining pair is passed to Seam as the color that dissolves across
// the boundary (every seam here is a dark/white or ink/white pair).
const DARK = "var(--surface-deep)";
const INK = "var(--empirika-ink)";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <SmoothScrollProvider>
      <AnalyticsProvider />
      <Header brand={content.brand} />
      <main className="flex-1">
        <Hero content={content.hero} vsl={content.vsl} />
        <Seam tint={DARK} />
        <Problem content={content.problem} />
        <Seam tint={DARK} />
        <Solution content={content.solution} />
        <Seam tint={DARK} />
        <WhatWeBuild content={content.whatWeBuild} />
        <Methodology content={content.methodology} />
        <Seam tint={INK} />
        <FinalResult content={content.finalResult} />
        <Seam tint={INK} />
        <CasesAuthority content={content.cases} founder={content.hero} />
        <Seam tint={DARK} />
        <ForWhoNot content={content.forWhoNot} />
        <Seam tint={DARK} />
        <Investment content={content.investment} />
        <Seam tint={DARK} />
        <Faq content={content.faq} />
        <FinalCta content={content.finalCta} />
        <Seam tint={DARK} />
      </main>
      <Footer brand={content.brand} />
      <BackToTop />
    </SmoothScrollProvider>
  );
}
