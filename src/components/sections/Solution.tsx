import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import SolutionScrollStepper from "@/components/sections/SolutionScrollStepper";
import type { SolutionContent } from "@/content/types";

export default function Solution({ content }: { content: SolutionContent }) {
  return (
    <section id="solucion" className="bg-surface-deep pb-20 pt-20 text-on-deep sm:pt-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>El sistema</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight sm:text-4xl">
          <RevealText as="span" className="block" text={content.titleLine1} />
          <RevealText as="span" className="block" text={content.titleLine2} />
        </h2>

        <div className="mt-14 sm:mt-16">
          <SolutionScrollStepper steps={content.steps} />
        </div>

        <Reveal delay={250}>
          <p className="mx-auto mt-14 max-w-xl text-center text-lg font-medium leading-relaxed text-on-deep/80 sm:mt-16">
            {content.closingLine1}
            <br />
            {content.closingLine2}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
