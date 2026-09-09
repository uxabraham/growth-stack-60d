import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import MethodologyStepper from "@/components/sections/MethodologyStepper";
import type { MethodologyContent } from "@/content/types";

export default function Methodology({ content }: { content: MethodologyContent }) {
  return (
    <section id="metodologia" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Metodología</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
          <RevealText text={content.title} />
        </h2>

        <Reveal delay={100} trackId="methodology">
          <div className="mt-14 sm:mt-16">
            <MethodologyStepper phases={content.phases} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
