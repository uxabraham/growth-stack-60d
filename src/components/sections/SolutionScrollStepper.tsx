"use client";

import { useEffect, useRef, useState } from "react";
import type { SolutionStep } from "@/content/types";
import { trackSectionView } from "@/lib/analytics";
import SpotlightCard from "@/components/ui/SpotlightCard";

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
      <div className="absolute left-1/2 top-2 bottom-2 hidden w-px -translate-x-1/2 bg-white/10 sm:block">
        <div
          className="w-full bg-empirika-orange transition-all duration-700 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Left edge line (mobile) */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10 sm:hidden">
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
                      : "border-white/20 bg-empirika-ink"
                }`}
              />

              {/* Dot on left line (mobile) */}
              <span
                className={`absolute left-3 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-all duration-500 sm:hidden ${
                  isActive
                    ? "border-empirika-orange bg-empirika-orange"
                    : isPast
                      ? "border-empirika-orange/50 bg-empirika-orange/30"
                      : "border-white/20 bg-empirika-ink"
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
                      className={`font-mono text-xs transition-colors duration-500 ${
                        isActive ? "text-empirika-orange" : "text-white/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`mt-2 text-xl font-semibold transition-colors duration-500 ${
                        isActive ? "text-white" : "text-white/50"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed transition-colors duration-500 ${
                        isActive ? "text-white/70" : "text-white/30"
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
