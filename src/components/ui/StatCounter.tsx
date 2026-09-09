"use client";

import { useEffect, useRef, useState } from "react";

function parseStat(text: string) {
  const match = text.match(/^(.*?)([\d.,]+)(.*)$/);
  if (!match) return { prefix: "", target: null as number | null, suffix: text };
  const [, prefix, digits, suffix] = match;
  const target = Number(digits.replace(/[.,]/g, ""));
  return { prefix, target: Number.isNaN(target) ? null : target, suffix };
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function StatCounter({
  text,
  className = "",
  numberClassName = "text-4xl font-bold sm:text-5xl",
  suffixClassName = "block text-xs font-medium uppercase tracking-widest text-white/50 sm:text-sm",
  duration = 1600,
}: {
  text: string;
  className?: string;
  numberClassName?: string;
  suffixClassName?: string;
  duration?: number;
}) {
  const { prefix, target, suffix } = parseStat(text);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || target === null) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(target * easeOutExpo(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-3 scale-90 opacity-0"
      } ${className}`}
    >
      <span className={`tabular-nums ${numberClassName}`}>
        {prefix}
        {target !== null ? count.toLocaleString("es") : ""}
      </span>
      {suffix && <span className={suffixClassName}>{suffix.trim()}</span>}
    </div>
  );
}
