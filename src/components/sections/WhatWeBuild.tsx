import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { WhatWeBuildContent } from "@/content/types";

export default function WhatWeBuild({ content }: { content: WhatWeBuildContent }) {
  return (
    <section id="que-construimos" className="bg-white py-20 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Qué construimos</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-center text-2xl font-semibold tracking-tight text-empirika-ink sm:text-4xl">
          <RevealText text={content.title} />
        </h2>

        <Reveal delay={100} trackId="whatWeBuild">
          <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/10 p-6 transition-all hover:border-empirika-orange/40 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.15)]"
              >
                <span className="font-mono text-sm text-empirika-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-empirika-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.desc}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl bg-empirika-ink p-6 text-white">
              <p className="text-lg font-semibold leading-snug">
                {content.closingLine1}
              </p>
              <p className="mt-1 text-lg font-semibold leading-snug text-empirika-orange">
                {content.closingLine2}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
