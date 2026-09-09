import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import EvaluationForm from "@/components/sections/EvaluationForm";
import type { FinalCtaContent } from "@/content/types";

export default function FinalCta({ content }: { content: FinalCtaContent }) {
  return (
    <section
      id="evaluacion"
      className="relative overflow-hidden bg-surface-deep py-20 text-on-deep sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(253,130,0,0.14) 0%, rgba(10,10,10,0) 70%)",
        }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
            <RevealText as="span" className="block" text={content.titleLine1} />
            <RevealText
              as="span"
              className="block text-empirika-orange"
              text={content.titleLine2}
            />
          </h2>
          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-lg text-sm text-on-deep/60">
              {content.paragraph}
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} trackId="finalCta">
          <div className="mx-auto mt-12 max-w-xl sm:mt-14">
            <EvaluationForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
