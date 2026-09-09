import Link from "next/link";
import type { ReactNode } from "react";

export default function CtaButton({
  href = "#evaluacion",
  children,
  variant = "solid",
  size = "md",
  className = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost-light";
  size?: "md" | "lg";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 whitespace-nowrap";
  const sizes = {
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };
  const variants = {
    solid:
      "bg-empirika-orange text-white hover:bg-[#e07600] shadow-[0_8px_24px_-8px_rgba(253,130,0,0.6)]",
    outline:
      "border border-black/15 text-empirika-ink hover:border-empirika-orange hover:text-empirika-orange",
    "ghost-light":
      "border border-white/25 text-white hover:border-empirika-orange hover:text-empirika-orange",
  };

  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
