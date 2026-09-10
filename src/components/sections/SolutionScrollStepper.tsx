"use client";

import { useEffect, useRef, useState } from "react";
import type { SolutionStep } from "@/content/types";
import { trackSectionView } from "@/lib/analytics";
import SpotlightCard from "@/components/ui/SpotlightCard";

const ICONS = [
  // target
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.5" />
  </>,
  // users
  <>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 7.5c1.4.4 2.5 1.7 2.5 3.2 0 1.1-.5 2-1.3 2.7" />
    <path d="M18 14.5c2 .5 3.5 2.4 3.5 4.5" />
  </>,
  // funnel
  <>
    <path d="M4 4h16l-6 8v6l-4 2v-8z" />
  </>,
  // database
  <>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </>,
  // eye
  <>
    <path d="M2 12c2.7-4.7 6.3-7 10-7s7.3 2.3 10 7c-2.7 4.7-6.3 7-10 7s-7.3-2.3-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </>,
  // dollar
  <>
    <path d="M12 2v20" />
    <path d="M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.4-5 3.5S9.2 10 12 10s5 1.4 5 3.5-2.2 3.5-5 3.5-5-1.6-5-3.5" />
  </>,
  // chart
  <>
    <path d="M4 20V10" />
    <path d="M12 20V4" />
    <path d="M20 20v-7" />
  </>,
];

function StepIcon({ index, className }: { index: number; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
    >
      {ICONS[index % ICONS.length]}
    </svg>
  );
}

export default function SolutionScrollStepper({
  steps,
}: {
  steps: SolutionStep[];
}) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = rowRefs.current.indexOf(entry.target as HTMLDivElement);
            if (i !== -1) setActive(i);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const seenObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView("solution");
          seenObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    seenObserver.observe(node);
    return () => seenObserver.disconnect();
  }, []);

  const progress = steps.length > 1 ? active / (steps.length - 1) : 0;

  return (
    <div ref={wrapperRef} className="relative">
      {/* Center spine (desktop zigzag) */}
      <div className="absolute left-1/2 top-2 bottom-2 hidden w-px -translate-x-1/2 bg-on-deep/10 sm:block">
        <div
          className="w-full bg-empirika-orange transition-all duration-700 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Left edge line (mobile) */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-on-deep/10 sm:hidden">
        <div
          className="w-full bg-empirika-orange transition-all duration-700 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <div className="space-y-4 py-2 sm:space-y-0">
        {steps.map((step, i) => {
          const isActive = i === active;
          const isPast = i < active;
          const isRight = i % 2 === 1;

          return (
            <div
              key={step.title}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className={`relative flex sm:py-10 ${
                isRight ? "sm:justify-end" : "sm:justify-start"
              }`}
            >
              {/* Dot on spine (desktop) */}
              <span
                className={`absolute left-1/2 top-10 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-all duration-500 sm:block ${
                  isActive
                    ? "scale-125 border-empirika-orange bg-empirika-orange shadow-[0_0_0_6px_rgba(253,130,0,0.15)]"
                    : isPast
                      ? "border-empirika-orange/50 bg-empirika-orange/30"
                      : "border-on-deep/20 bg-surface-deep"
                }`}
              />

              {/* Dot on left line (mobile) */}
              <span
                className={`absolute left-3 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-all duration-500 sm:hidden ${
                  isActive
                    ? "border-empirika-orange bg-empirika-orange"
                    : isPast
                      ? "border-empirika-orange/50 bg-empirika-orange/30"
                      : "border-on-deep/20 bg-surface-deep"
                }`}
              />

              <div className={`w-full pl-10 sm:w-[46%] sm:pl-0 ${isRight ? "sm:pr-0" : ""}`}>
                <SpotlightCard
                  tone="dark"
                  className={`transition-all duration-500 ${
                    isActive
                      ? "opacity-100 ring-1 ring-empirika-orange/40"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <div className="p-6">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-500 ${
                        isActive
                          ? "bg-empirika-orange/15 text-empirika-orange"
                          : "bg-on-deep/5 text-on-deep/30"
                      }`}
                    >
                      <StepIcon index={i} className="h-4 w-4" />
                    </span>
                    <span
                      className={`mt-3 block font-mono text-xs transition-colors duration-500 ${
                        isActive ? "text-empirika-orange" : "text-on-deep/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`mt-2 text-xl font-semibold transition-colors duration-500 ${
                        isActive ? "text-on-deep" : "text-on-deep/50"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed transition-colors duration-500 ${
                        isActive ? "text-on-deep/70" : "text-on-deep/30"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
