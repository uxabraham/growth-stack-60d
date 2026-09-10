"use client";

import { useEffect, useRef, useState } from "react";
import type { SolutionStep } from "@/content/types";
import { trackSectionView } from "@/lib/analytics";

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

function StepIcon({ index }: { index: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
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

  const current = steps[active];

  return (
    <div ref={wrapperRef} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left: scrolling list */}
      <div>
        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <div
              key={step.title}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex min-h-0 items-start gap-4 border-t border-on-deep/10 py-6 first:border-t-0 lg:min-h-[62vh] lg:items-center lg:border-t-0 lg:py-0"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-empirika-orange text-white"
                    : "bg-on-deep/5 text-on-deep/30"
                }`}
              >
                <StepIcon index={i} />
              </span>
              <div>
                <span
                  className={`font-mono text-xs transition-colors duration-500 ${
                    isActive ? "text-empirika-orange" : "text-on-deep/30"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`mt-1 text-lg font-semibold transition-colors duration-500 sm:text-xl ${
                    isActive ? "text-on-deep" : "text-on-deep/35"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-1.5 max-w-sm text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-on-deep/60" : "text-on-deep/20"
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: sticky visual panel */}
      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-empirika-ink text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3 text-xs text-white/40">
                Growth Stack 60D — El sistema
              </span>
            </div>

            <div
              key={active}
              className="p-8 sm:p-10"
              style={{ animation: "solution-fade 0.5s ease" }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-empirika-orange/15 text-empirika-orange">
                <StepIcon index={active} />
              </span>
              <span className="mt-6 block font-mono text-sm text-empirika-orange">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(steps.length).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {current.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {current.desc}
              </p>

              <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-empirika-orange transition-all duration-700 ease-out"
                  style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes solution-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
