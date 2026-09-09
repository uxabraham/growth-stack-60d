import Image from "next/image";
import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import StatCardsGrid from "@/components/ui/StatCardsGrid";
import type { HeroContent } from "@/content/types";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-empirika-ink pb-20 pt-28 text-white sm:pb-24 sm:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(253,130,0,0.16) 0%, rgba(10,10,10,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              {content.eyebrow}
            </p>
          </Reveal>

          <h1 className="mt-6 text-[2.25rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            <RevealText as="span" className="block" text={content.titleLine1} />
            <RevealText
              as="span"
              className="block text-empirika-orange"
              text={content.titleLine2}
              wordDelay={40}
            />
          </h1>

          <Reveal delay={200}>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:mt-8 sm:text-xl">
              {content.paragraph}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mx-auto mt-5 max-w-xl text-sm font-medium text-white/90 sm:mt-6 sm:text-lg">
              {content.secondaryLine1}
              <br />
              {content.secondaryLine2}
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-col items-center gap-4 sm:mt-10">
              <CtaButton href="#evaluacion" size="lg" trackId="hero-cta">
                {content.ctaLabel}
              </CtaButton>
              <span className="text-xs text-white/40">{content.ctaNote}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} trackId="hero">
          <div className="mx-auto mt-14 flex max-w-md items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-16 sm:max-w-lg">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
              <Image
                src="/team/carlos-montes.png"
                alt={content.founderName}
                fill
                sizes="64px"
                priority
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">
                {content.founderName} — {content.founderRole}
              </p>
              <p className="text-xs text-white/50">{content.founderNote}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-empirika-orange/30 bg-empirika-orange/10 px-3 py-1.5 text-xs font-medium text-empirika-orange">
              {content.badge1}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-empirika-orange/30 bg-empirika-orange/10 px-3 py-1.5 text-xs font-medium text-empirika-orange">
              {content.badge2}
            </span>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 max-w-4xl border-t border-white/10 pt-14 sm:mt-20">
          <StatCardsGrid stats={content.stats} />
        </div>
      </Container>
    </section>
  );
}
