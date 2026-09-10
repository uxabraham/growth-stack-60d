export type StatCard = {
  heading: string;
  number: string;
  unit: string;
  description: string;
};

export type HeroContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  paragraph: string;
  secondaryLine1: string;
  secondaryLine2: string;
  ctaLabel: string;
  ctaNote: string;
  founderName: string;
  founderRole: string;
  founderNote: string;
  founderPhoto: string;
  badge1: string;
  badge2: string;
  stats: StatCard[];
};

export type VslContent = {
  title: string;
  subtitle: string;
  videoLabel: string;
  subtitleLabel: string;
  videoUrl: string;
};

export type ProblemPiece = { label: string; note: string };
export type ProblemContent = {
  titleLine1: string;
  titleLine2: string;
  pieces: ProblemPiece[];
  closingLine1: string;
  closingLine2: string;
};

export type SolutionStep = { title: string; desc: string };
export type SolutionContent = {
  titleLine1: string;
  titleLine2: string;
  steps: SolutionStep[];
  closingLine1: string;
  closingLine2: string;
};

export type BuildItem = { title: string; desc: string };
export type WhatWeBuildContent = {
  title: string;
  items: BuildItem[];
  closingLine1: string;
  closingLine2: string;
};

export type MethodologyPhase = {
  phase: string;
  days: string;
  title: string;
  desc: string;
  bullets: string[];
};
export type MethodologyContent = {
  title: string;
  phases: MethodologyPhase[];
};

export type FinalResultContent = {
  titleLine1: string;
  titleLine2: string;
  modules: { label: string; metric: string }[];
};

export type CaseItem = {
  industry: string;
  problem: string;
  build: string;
  result: string;
};
export type CasesContent = {
  title: string;
  stats: StatCard[];
  authorityBio: string;
  cases: CaseItem[];
};

export type ForWhoNotContent = {
  title: string;
  yes: string[];
  no: string[];
};

export type InvestmentContent = {
  title: string;
  programName: string;
  price: string;
  terms: string;
  disclaimer: string;
  ctaLabel: string;
};

export type FaqItem = { q: string; a: string };
export type FaqContent = {
  title: string;
  items: FaqItem[];
};

export type FinalCtaContent = {
  titleLine1: string;
  titleLine2: string;
  paragraph: string;
};

export type BrandContent = {
  name: string;
  logoText: string;
  logoUrl: string;
  navSolucion: string;
  navMetodologia: string;
  navCasos: string;
  navInversion: string;
  ctaLabel: string;
};

export type AnalyticsSettings = {
  ga4Id: string;
  plausibleDomain: string;
};

export type SiteContent = {
  brand: BrandContent;
  hero: HeroContent;
  vsl: VslContent;
  problem: ProblemContent;
  solution: SolutionContent;
  whatWeBuild: WhatWeBuildContent;
  methodology: MethodologyContent;
  finalResult: FinalResultContent;
  cases: CasesContent;
  forWhoNot: ForWhoNotContent;
  investment: InvestmentContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  analyticsSettings: AnalyticsSettings;
};
