import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { FinalResultContent } from "@/content/types";

export default function FinalResult({ content }: { content: FinalResultContent }) {
  return (
    <section id="resultado" className="bg-empirika-ink py-20 text-white sm:py-32">
      <Container>
        <h2 className="mx-auto max-w-3xl text-center text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
          <RevealText as="span" className="block" text={content.titleLine1} />
          <RevealText
            as="span"
            className="block text-empirika-orange"
            text={content.titleLine2}
          />
        </h2>

        <Reveal delay={150} trackId="finalResult">
          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:mt-16">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3 text-xs text-white/40">
                Growth Engine — Empirika Group
              </span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-5">
              {content.modules.map((m) => (
                <div key={m.label} className="bg-empirika-ink px-4 py-6 text-center">
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    {m.label}
                  </p>
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-empirika-orange" />
                    {m.metric}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
