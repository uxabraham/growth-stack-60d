"use client";

import { useEffect, useRef, useState } from "react";

export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  wordDelay = 35,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  wordDelay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

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

  return (
    <Tag ref={ref as never} className={className}>
      {words.flatMap((word, i) => [
        <span key={`w-${i}`} className="reveal-word-mask">
          <span
            className={`reveal-word ${visible ? "is-visible" : ""}`}
            style={{ transitionDelay: `${i * wordDelay}ms` }}
          >
            {word}
          </span>
        </span>,
        i < words.length - 1 ? " " : null,
      ])}
    </Tag>
  );
}
