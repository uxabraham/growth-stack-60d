"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export default function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(253,130,0,0.28)",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }

  const toneClass =
    tone === "dark"
      ? "border-on-deep/10 bg-on-deep/[0.05]"
      : "border-black/10 bg-white/80";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-empirika-orange/30 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] border ${toneClass} ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${glowColor}, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
