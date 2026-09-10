"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  /** Positive drifts slower than scroll, negative drifts faster/opposite. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number | null = null;
    let inView = false;

    function update() {
      raf = null;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      node.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
    }

    function onScroll() {
      if (!inView) return;
      if (raf == null) raf = requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) update();
      },
      { rootMargin: "25% 0px" }
    );
    observer.observe(node);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
