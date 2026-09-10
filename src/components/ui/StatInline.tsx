"use client";

import { useEffect, useRef, useState } from "react";
import type { StatCard } from "@/content/types";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function StatInline({
  stat,
  delay = 0,
}: {
  stat: StatCard;
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
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let raf: number;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start - delay) / duration));
      setCount(Math.round(target * easeOutExpo(progress)));
      if (now - start < delay + duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, delay]);

  return (
    <div ref={ref} className="px-3 text-center first:pl-0 last:pr-0 sm:text-left">
      <p className="tabular-nums leading-none text-on-deep">
        <span className="text-2xl font-bold sm:text-3xl">{count.toLocaleString("es")}</span>
        {stat.unit && (
          <span className="text-2xl font-bold text-empirika-orange sm:text-3xl">
            {stat.unit}
          </span>
        )}
      </p>
      <p className="mt-1.5 text-[10px] font-medium uppercase leading-snug tracking-wide text-on-deep/40 sm:text-[11px]">
        {stat.heading}
      </p>
    </div>
  );
}
