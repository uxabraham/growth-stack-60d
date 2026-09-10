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

// Flat section background colors, in page order — used to blend the
// seam between sections instead of cutting hard between light and dark.
const DARK = "var(--surface-deep)";
const WHITE = "#ffffff";
const INK = "var(--empirika-ink)";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <SmoothScrollProvider>
      <AnalyticsProvider />
      <Header brand={content.brand} />
      <main className="flex-1">
        <Hero content={content.hero} vsl={content.vsl} />
        <Seam from={DARK} to={WHITE} />
        <Problem content={content.problem} />
        <Seam from={WHITE} to={DARK} />
        <Solution content={content.solution} />
        <Seam from={DARK} to={WHITE} />
        <WhatWeBuild content={content.whatWeBuild} />
        <Methodology content={content.methodology} />
        <Seam from={WHITE} to={INK} />
        <FinalResult content={content.finalResult} />
        <Seam from={INK} to={WHITE} />
        <CasesAuthority content={content.cases} founder={content.hero} />
        <Seam from={WHITE} to={DARK} />
        <ForWhoNot content={content.forWhoNot} />
        <Seam from={DARK} to={WHITE} />
        <Investment content={content.investment} />
        <Seam from={WHITE} to={DARK} />
        <Faq content={content.faq} />
        <FinalCta content={content.finalCta} />
        <Seam from={DARK} to={WHITE} />
      </main>
      <Footer brand={content.brand} />
      <BackToTop />
    </SmoothScrollProvider>
  );
}
