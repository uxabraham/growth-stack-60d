"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type { FaqContent } from "@/content/types";

export default function Faq({ content }: { content: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-empirika-ink py-20 text-white sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
          </div>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-2xl text-center text-2xl font-semibold tracking-tight sm:text-4xl">
          <RevealText text={content.title} />
        </h2>

        <Reveal delay={100} trackId="faq">
          <div className="mx-auto mt-12 max-w-2xl divide-y divide-white/10 border-y border-white/10 sm:mt-14">
            {content.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-semibold sm:text-base">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-xl text-empirika-orange transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-5 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="min-h-0 text-sm leading-relaxed text-white/60">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
