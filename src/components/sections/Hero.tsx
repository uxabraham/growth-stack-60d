import Image from "next/image";
import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import StatCardsGrid from "@/components/ui/StatCardsGrid";
import type { HeroContent, VslContent } from "@/content/types";

export default function Hero({
  content,
  vsl,
}: {
  content: HeroContent;
  vsl: VslContent;
}) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-surface-deep pb-20 pt-28 text-on-deep sm:pb-24 sm:pt-40"
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
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-on-deep/50">
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
            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-on-deep/70 sm:mt-8 sm:text-xl">
              {content.paragraph}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mx-auto mt-5 max-w-xl text-sm font-medium text-on-deep/90 sm:mt-6 sm:text-lg">
              {content.secondaryLine1}
              <br />
              {content.secondaryLine2}
            </p>
          </Reveal>
        </div>

        {/* Video player is a self-contained "screenshot" mockup — always
            dark, regardless of site theme, like a real product recording. */}
        <Reveal delay={320} trackId="vsl">
          <div className="group relative mx-auto mt-9 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-empirika-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:mt-10">
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Reproducir video"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-empirika-orange text-white shadow-[0_20px_40px_-12px_rgba(253,130,0,0.7)] transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-6 w-6 sm:h-8 sm:w-8"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="px-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                {vsl.videoLabel}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm">
              {vsl.subtitleLabel}
            </div>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <div className="mx-auto mt-9 flex flex-col items-center gap-4 sm:mt-10">
            <CtaButton href="#evaluacion" size="lg" trackId="hero-cta">
              {content.ctaLabel}
            </CtaButton>
            <span className="text-xs text-on-deep/40">{content.ctaNote}</span>
          </div>
        </Reveal>

        <Reveal delay={100} trackId="hero">
          <div className="mx-auto mt-14 flex max-w-md items-center gap-4 rounded-2xl border border-on-deep/10 bg-on-deep/[0.03] p-4 sm:mt-16 sm:max-w-lg">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-on-deep/5">
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
              <p className="text-sm font-semibold text-on-deep">
                {content.founderName} — {content.founderRole}
              </p>
              <p className="text-xs text-on-deep/50">{content.founderNote}</p>
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

        <div className="mx-auto mt-16 max-w-4xl border-t border-on-deep/10 pt-14 sm:mt-20">
          <StatCardsGrid stats={content.stats} />
        </div>
      </Container>
    </section>
  );
}
