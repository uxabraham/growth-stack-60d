"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackSectionView } from "@/lib/analytics";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  trackId,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  trackId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (trackId) trackSectionView(trackId);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [trackId]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
