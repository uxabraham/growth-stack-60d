import { getSiteContent } from "@/lib/content";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import BackToTop from "@/components/BackToTop";
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

export default async function Home() {
  const content = await getSiteContent();

  return (
    <SmoothScrollProvider>
      <AnalyticsProvider />
      <Header brand={content.brand} />
      <main className="flex-1">
        <Hero content={content.hero} vsl={content.vsl} />
        <Problem content={content.problem} />
        <Solution content={content.solution} />
        <WhatWeBuild content={content.whatWeBuild} />
        <Methodology content={content.methodology} />
        <FinalResult content={content.finalResult} />
        <CasesAuthority content={content.cases} founder={content.hero} />
        <ForWhoNot content={content.forWhoNot} />
        <Investment content={content.investment} />
        <Faq content={content.faq} />
        <FinalCta content={content.finalCta} />
      </main>
      <Footer brand={content.brand} />
      <BackToTop />
    </SmoothScrollProvider>
  );
}
