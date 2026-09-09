"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import CtaButton from "@/components/ui/CtaButton";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-on-deep/10 bg-surface-deep/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="#hero"
          aria-label="Ir al inicio"
          className="transition-opacity hover:opacity-80"
        >
          <BrandLogo brand={brand} imgClassName="h-6 w-auto sm:h-7" themeAware />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-on-deep/70 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-on-deep"
            >
              {brand[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-on-deep/15 text-on-deep md:hidden"
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={`h-px w-full bg-on-deep transition-transform duration-200 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-on-deep transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-on-deep transition-transform duration-200 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        className={`overflow-hidden border-t border-on-deep/10 bg-surface-deep transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-[28rem]" : "max-h-0 border-t-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-on-deep/70 transition-colors hover:bg-on-deep/5 hover:text-on-deep"
            >
              {brand[link.key]}
            </a>
          ))}
          <div className="mt-2 flex items-center justify-between rounded-lg px-2 py-2">
            <span className="text-sm text-on-deep/70">Modo claro</span>
            <ThemeToggle />
          </div>
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
