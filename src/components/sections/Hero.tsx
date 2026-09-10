import Image from "next/image";
import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import Parallax from "@/components/ui/Parallax";
import QuoteDivider from "@/components/ui/QuoteDivider";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import StatInline from "@/components/ui/StatInline";
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
            <QuoteDivider
              quote={`${content.secondaryLine1} ${content.secondaryLine2}`}
              className="mt-5 text-on-deep sm:mt-6"
            />
          </Reveal>
        </div>

        {/* Video player is a self-contained "screenshot" mockup — always
            dark, regardless of site theme, like a real product recording. */}
        <Reveal delay={320} trackId="vsl">
          <Parallax speed={0.06}>
            <div className="group relative mx-auto mt-9 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-empirika-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:mt-10">
              {vsl.videoUrl ? (
                <video
                  src={vsl.videoUrl}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          </Parallax>
        </Reveal>

        <Reveal delay={360}>
          <div className="mx-auto mt-9 flex flex-col items-center gap-4 sm:mt-10">
            <CtaButton href="#evaluacion" size="lg" trackId="hero-cta">
              {content.ctaLabel}
            </CtaButton>
            <span className="text-xs text-on-deep/40">{content.ctaNote}</span>
          </div>
        </Reveal>

        <Reveal delay={140} trackId="hero">
          <Parallax speed={0.04} className="mx-auto mt-14 max-w-4xl sm:mt-16">
            <div className="group relative overflow-hidden rounded-3xl border border-empirika-orange/20 bg-on-deep/[0.03] shadow-[0_50px_120px_-50px_rgba(253,130,0,0.35)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 60% at 0% 0%, rgba(253,130,0,0.1), transparent 60%)",
                }}
              />
              <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr]">
                <div className="relative h-64 w-full sm:h-80 lg:h-auto">
                  <Image
                    src={content.founderPhoto || "/team/carlos-montes.png"}
                    alt={content.founderName}
                    fill
                    sizes="(min-width: 1024px) 320px, 100vw"
                    priority
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r"
                  />
                </div>

                <div className="flex flex-col justify-center gap-6 p-7 sm:p-10">
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-on-deep sm:text-2xl">
                      {content.founderName}
                    </p>
                    <p className="mt-1 text-sm font-medium text-empirika-orange">
                      {content.founderRole}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-on-deep/60">
                      {content.founderNote}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-on-deep/10 border-t border-on-deep/10 pt-6">
                    {content.stats.map((stat, i) => (
                      <StatInline key={stat.heading} stat={stat} delay={i * 150} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-empirika-orange/30 bg-empirika-orange/10 px-3 py-1.5 text-xs font-medium text-empirika-orange">
                      {content.badge1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-empirika-orange/30 bg-empirika-orange/10 px-3 py-1.5 text-xs font-medium text-empirika-orange">
                      {content.badge2}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Parallax>
        </Reveal>
      </Container>
    </section>
  );
}
