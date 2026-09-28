import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import QuoteDivider from "@/components/ui/QuoteDivider";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { ProblemContent } from "@/content/types";

function ArrowConnector() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-[52px] z-10 hidden -translate-y-1/2 translate-x-1/2 lg:flex"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-empirika-orange/25 bg-white text-empirika-orange shadow-[0_8px_20px_-8px_rgba(253,130,0,0.5)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  );
}

export default function Problem({ content }: { content: ProblemContent }) {
  return (
    <section id="problema" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold leading-snug tracking-tight text-empirika-ink sm:text-4xl">
          <RevealText as="span" className="block" text={content.titleLine1} />
          <RevealText
            as="span"
            className="block text-empirika-orange"
            text={content.titleLine2}
          />
        </h2>
        <Reveal delay={80}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-sm leading-relaxed text-zinc-500 sm:text-base">
            {content.paragraph}
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-6">
          {content.steps.map((step, i) => (
            <Reveal key={step.title} delay={100 + i * 90} trackId={i === 0 ? "problem" : undefined}>
              <div className="group relative h-full rounded-2xl border border-black/10 bg-zinc-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-empirika-orange/30 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.15)] sm:p-7">
                {(i === 0 || i === 2) && <ArrowConnector />}

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-empirika-orange/10 text-sm font-bold text-empirika-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-xl font-semibold tracking-tight text-empirika-ink sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {step.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {step.desc}
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-black/5 pt-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-empirika-orange/10 text-empirika-orange">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.25}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M7 7l10 10" />
                      <path d="M17 8v9h-9" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-empirika-orange">
                    {step.flag}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <QuoteDivider
            quote={`${content.closingLine1} ${content.closingLine2}`}
            className="mt-14 text-empirika-ink sm:mt-16"
          />
        </Reveal>
      </Container>
    </section>
  );
}
