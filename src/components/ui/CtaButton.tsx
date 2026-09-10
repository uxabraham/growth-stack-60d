"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackCtaClick } from "@/lib/analytics";

export default function CtaButton({
  href = "#evaluacion",
  children,
  variant = "solid",
  size = "md",
  className = "",
  trackId,
}: {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost-light";
  size?: "md" | "lg";
  className?: string;
  trackId?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";
  const sizes = {
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };
  const variants = {
    solid:
      "bg-empirika-orange text-white shadow-[0_8px_24px_-8px_rgba(253,130,0,0.6)] hover:bg-[#e07600] hover:shadow-[0_16px_32px_-10px_rgba(253,130,0,0.75)]",
    outline:
      "border border-black/15 text-empirika-ink hover:border-empirika-orange hover:text-empirika-orange hover:shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
    "ghost-light":
      "border border-white/25 text-white hover:border-empirika-orange hover:text-empirika-orange",
  };

  return (
    <Link
      href={href}
      onClick={() => trackCtaClick(trackId || href)}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
