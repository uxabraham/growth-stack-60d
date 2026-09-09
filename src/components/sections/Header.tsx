"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import type { BrandContent } from "@/content/types";

const LINKS = [
  { href: "#solucion", key: "navSolucion" as const },
  { href: "#metodologia", key: "navMetodologia" as const },
  { href: "#casos", key: "navCasos" as const },
  { href: "#inversion", key: "navInversion" as const },
];

export default function Header({ brand }: { brand: BrandContent }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-empirika-ink/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <span className="text-sm font-bold tracking-[0.15em] text-white sm:text-base">
          {brand.logoText.split(".")[0]}
          <span className="text-empirika-orange">.</span>
          {brand.logoText.split(".")[1]}
        </span>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {brand[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CtaButton href="#evaluacion" size="md" trackId="header-cta">
              {brand.ctaLabel}
            </CtaButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`h-px w-full bg-white transition-transform duration-200 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-white transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-white transition-transform duration-200 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        className={`overflow-hidden border-t border-white/10 bg-empirika-ink transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {brand[link.key]}
            </a>
          ))}
          <CtaButton
            href="#evaluacion"
            size="md"
            trackId="header-cta-mobile"
            className="mt-2 w-full sm:hidden"
          >
            {brand.ctaLabel}
          </CtaButton>
        </Container>
      </div>
    </header>
  );
}
