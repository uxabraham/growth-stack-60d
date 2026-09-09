import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { ProblemContent } from "@/content/types";

export default function Problem({ content }: { content: ProblemContent }) {
  return (
    <section id="problema" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>El problema</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
          <RevealText as="span" className="block" text={content.titleLine1} />
          <RevealText as="span" className="block" text={content.titleLine2} />
        </h2>

        <Reveal delay={100} trackId="problem">
          <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4">
            {content.pieces.map((piece) => (
              <div
                key={piece.label}
                className="relative rounded-2xl border border-black/10 bg-zinc-50 p-4 transition-colors hover:border-empirika-orange/40 sm:p-5"
              >
                <p className="text-sm font-semibold text-empirika-ink">
                  {piece.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {piece.note}
                </p>
                <span
                  aria-hidden
                  className="absolute right-4 top-4 h-2 w-2 rounded-full bg-zinc-300"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-14 max-w-2xl text-center">
            <p className="text-xl font-semibold leading-snug text-empirika-ink sm:text-2xl">
              {content.closingLine1}
              <br />
              <span className="text-empirika-orange">
                {content.closingLine2}
              </span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
