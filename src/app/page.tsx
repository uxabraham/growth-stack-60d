import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Vsl from "@/components/sections/Vsl";
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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Vsl />
        <Problem />
        <Solution />
        <WhatWeBuild />
        <Methodology />
        <FinalResult />
        <CasesAuthority />
        <ForWhoNot />
        <Investment />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
