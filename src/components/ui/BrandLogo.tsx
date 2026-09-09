import Image from "next/image";
import type { BrandContent } from "@/content/types";

export default function BrandLogo({
  brand,
  className = "",
  imgClassName = "h-6 w-auto",
  onLight = false,
  themeAware = false,
}: {
  brand: BrandContent;
  className?: string;
  imgClassName?: string;
  /** Set true when placing the logo on a surface that's ALWAYS light
   * (e.g. the footer) — the source file is white-on-transparent, so it
   * needs a permanent invert to read there. */
  onLight?: boolean;
  /** Set true when the logo sits on a surface that flips with the
   * dark/light theme toggle (e.g. the header) — inverts only while the
   * site is in light mode. */
  themeAware?: boolean;
}) {
  if (brand.logoUrl) {
    return (
      <span className={`relative inline-block ${className}`}>
        <Image
          src={brand.logoUrl}
          alt={brand.name}
          width={160}
          height={32}
          className={`${imgClassName} object-contain ${onLight ? "invert" : ""} ${
            themeAware ? "invert-on-light-theme" : ""
          }`}
          priority
        />
      </span>
    );
  }

  const [first = "", second = ""] = brand.logoText.split(".");
  return (
    <span
      className={`text-sm font-bold tracking-[0.15em] sm:text-base ${
        onLight ? "text-empirika-ink" : themeAware ? "text-on-deep" : "text-white"
      } ${className}`}
    >
      {first}
      <span className="text-empirika-orange">.</span>
      {second}
    </span>
  );
}
