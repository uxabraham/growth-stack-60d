import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { WhatWeBuildContent } from "@/content/types";

export default function WhatWeBuild({ content }: { content: WhatWeBuildContent }) {
  return (
    <section id="que-construimos" className="bg-white py-20 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          {/* Pinned left column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Eyebrow>Qué construimos</Eyebrow>
            </Reveal>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-empirika-ink sm:text-4xl lg:text-5xl">
              <RevealText text={content.title} />
            </h2>
            <Reveal delay={150}>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-zinc-500">
                {content.closingLine1}
                <br />
                <span className="font-semibold text-empirika-ink">
                  {content.closingLine2}
                </span>
              </p>
            </Reveal>
          </div>

          {/* Scrolling list */}
          <div className="flex flex-col divide-y divide-black/10 border-t border-black/10">
            {content.items.map((item, i) => (
              <Reveal key={item.title} trackId={i === 0 ? "whatWeBuild" : undefined}>
                <div className="group relative flex flex-col gap-3 rounded-2xl py-10 px-4 -mx-4 transition-colors duration-300 hover:bg-empirika-orange/[0.05] sm:flex-row sm:items-start sm:gap-8 sm:py-14">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-empirika-orange transition-all duration-300 group-hover:h-[60%]"
                  />
                  <span className="font-mono text-sm text-empirika-orange transition-transform duration-300 group-hover:translate-x-1 sm:w-16 sm:shrink-0">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <div className="transition-transform duration-300 group-hover:translate-x-1">
                    <h3 className="text-xl font-semibold text-empirika-ink sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
