import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { SolutionContent } from "@/content/types";

export default function Solution({ content }: { content: SolutionContent }) {
  return (
    <section id="solucion" className="bg-empirika-ink py-20 text-white sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>La solución</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight sm:text-4xl">
          <RevealText as="span" className="block" text={content.titleLine1} />
          <RevealText as="span" className="block" text={content.titleLine2} />
        </h2>

        <Reveal delay={150} trackId="solution">
          <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:gap-0">
              {content.steps.map((step, i) => (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-5 text-center sm:py-6">
                    <span className="text-xs font-mono text-empirika-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold">{step}</span>
                  </div>
                  {i < content.steps.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden shrink-0 px-1 text-empirika-orange sm:block"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mx-auto mt-14 max-w-xl text-center text-lg font-medium leading-relaxed text-white/80 sm:mt-16">
            {content.closingLine1}
            <br />
            {content.closingLine2}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
