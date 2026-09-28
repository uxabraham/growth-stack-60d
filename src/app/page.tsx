import { getSiteContent } from "@/lib/content";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import BackToTop from "@/components/BackToTop";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
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
    <>
      <AnalyticsProvider />
      <Header brand={content.brand} />
      <main className="flex-1">
        <Hero content={content.hero} vsl={content.vsl} />
        <Problem content={content.problem} />
        <WhatWeBuild content={content.whatWeBuild} />
        <Methodology content={content.methodology} />
        <FinalResult content={content.finalResult} />
        <CasesAuthority content={content.cases} />
        <ForWhoNot content={content.forWhoNot} />
        <Investment content={content.investment} />
        <Faq content={content.faq} />
        <FinalCta content={content.finalCta} />
      </main>
      <Footer brand={content.brand} />
      <BackToTop />
    </>
  );
}
