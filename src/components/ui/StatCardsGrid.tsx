"use client";

import { useEffect, useRef, useState } from "react";
import type { StatCard } from "@/content/types";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function Card({
  stat,
  tall = false,
  delay = 0,
}: {
  stat: StatCard;
  tall?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const target = Number(stat.number.replace(/[.,]/g, "")) || 0;

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
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let raf: number;
    const start = performance.now() + delay;
    const duration = 1700;
    const tick = (now: number) => {
      const elapsed = now - (start - delay);
      const progress = Math.min(1, Math.max(0, (elapsed - delay) / duration));
      setCount(Math.round(target * easeOutExpo(progress)));
      if (elapsed < delay + duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, delay]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-700 sm:p-8 ${
        tall ? "sm:row-span-2 sm:justify-center" : ""
      } ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-sm text-white/55 sm:text-base">{stat.heading}</p>
      <div className="mt-4 flex items-baseline gap-0.5 leading-none">
        <span className="tabular-nums text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          {count.toLocaleString("es")}
        </span>
        {stat.unit && (
          <span className="text-5xl font-bold text-empirika-orange sm:text-6xl lg:text-7xl">
            {stat.unit}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/50">
        {stat.description}
      </p>
    </div>
  );
}

export default function StatCardsGrid({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-fr">
      {stats.map((stat, i) => (
        <Card key={stat.heading} stat={stat} tall={i === 0} delay={i * 120} />
      ))}
    </div>
  );
}
