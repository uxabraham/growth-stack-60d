"use client";

import { useEffect, useState } from "react";
import {
  getAnalyticsData,
  resetAnalyticsData,
  type AnalyticsData,
} from "@/lib/analytics";
import type { AnalyticsSettings } from "@/content/types";

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  vsl: "Video (VSL)",
  problem: "El problema",
  solution: "La solución",
  whatWeBuild: "Qué construimos",
  methodology: "Metodología",
  finalResult: "Resultado final",
  cases: "Casos y autoridad",
  forWhoNot: "Para quién es / no es",
  investment: "Inversión",
  faq: "FAQ",
  finalCta: "CTA final",
};

const FORM_STEP_LABELS: Record<string, string> = {
  step_1: "Paso 1 — Información básica",
  step_2: "Paso 2 — Situación actual",
  step_3: "Paso 3 — Objetivo",
  step_4: "Paso 4 — Calificación",
};

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/70">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-empirika-orange transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(() =>
    typeof window !== "undefined" ? getAnalyticsData() : null
  );
  const [settings, setSettings] = useState<AnalyticsSettings>({
    ga4Id: "",
    plausibleDomain: "",
  });
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/content");
      const json = await res.json();
      if (json.ok) setSettings(json.content.analyticsSettings);
    })();
  }, []);

  async function saveSettings() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content");
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      const merged = { ...json.content, analyticsSettings: settings };
      const saveRes = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });
      const saveJson = await saveRes.json();
      setSaveMsg(saveJson.ok ? "Configuración guardada." : saveJson.error);
    } catch {
      setSaveMsg("No se pudo guardar la configuración.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 3000);
    }
  }

  if (!data) return <p className="text-sm text-white/50">Cargando…</p>;

  const ctaEntries = Object.entries(data.ctaClicks).sort((a, b) => b[1] - a[1]);
  const sectionEntries = Object.entries(data.sectionViews).sort((a, b) => b[1] - a[1]);
  const maxCta = Math.max(1, ...ctaEntries.map(([, v]) => v));
  const maxSection = Math.max(1, ...sectionEntries.map(([, v]) => v));

  const step1 = data.formSteps.step_1 || 0;
  const step4 = data.formSteps.step_4 || 0;
  const conversion =
    step1 > 0 ? Math.round((data.formSubmits / step1) * 100) : 0;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Panel administrativo
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Analítica</h1>
      <p className="mt-2 max-w-2xl text-sm text-white/50">
        Estos datos se recolectan localmente en el navegador de cada
        visitante (localStorage) y solo reflejan la actividad de{" "}
        <span className="text-white/70">este navegador</span>. Para analítica
        real agregada de todos los visitantes, conecta Google Analytics 4 o
        Plausible abajo.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-2xl font-semibold text-empirika-orange">
            {data.pageViews}
          </p>
          <p className="mt-1 text-xs text-white/50">Vistas (este navegador)</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-2xl font-semibold text-empirika-orange">
            {data.formSubmits}
          </p>
          <p className="mt-1 text-xs text-white/50">Formularios enviados</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-2xl font-semibold text-empirika-orange">
            {data.formQualified}
          </p>
          <p className="mt-1 text-xs text-white/50">Leads calificados</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-2xl font-semibold text-empirika-orange">
            {conversion}%
          </p>
          <p className="mt-1 text-xs text-white/50">
            Conversión paso 1 → envío
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-base font-semibold">Clics por CTA</h2>
          <p className="mt-1 text-xs text-white/50">
            Qué botones generan más interés.
          </p>
          <div className="mt-5 space-y-4">
            {ctaEntries.length === 0 && (
              <p className="text-xs text-white/30">Aún no hay datos.</p>
            )}
            {ctaEntries.map(([id, value]) => (
              <Bar key={id} label={id} value={value} max={maxCta} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-base font-semibold">Secciones más vistas</h2>
          <p className="mt-1 text-xs text-white/50">
            Qué tan lejos llegan los visitantes en el scroll.
          </p>
          <div className="mt-5 space-y-4">
            {sectionEntries.length === 0 && (
              <p className="text-xs text-white/30">Aún no hay datos.</p>
            )}
            {sectionEntries.map(([id, value]) => (
              <Bar
                key={id}
                label={SECTION_LABELS[id] || id}
                value={value}
                max={maxSection}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">
            Funnel del formulario de evaluación
          </h2>
          <p className="mt-1 text-xs text-white/50">
            Dónde abandonan los visitantes dentro del formulario multistep.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(FORM_STEP_LABELS).map(([key, label]) => (
              <Bar
                key={key}
                label={label}
                value={data.formSteps[key] || 0}
                max={Math.max(1, step1)}
              />
            ))}
          </div>
          {step1 > 0 && step4 < step1 && (
            <p className="mt-4 text-xs text-amber-300">
              {step1 - step4} visitante(s) iniciaron el formulario pero no
              llegaron al paso final.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-base font-semibold">Analítica real (todos los visitantes)</h2>
        <p className="mt-1 text-xs text-white/50">
          Conecta un ID para trackear a todos los visitantes, no solo este
          navegador. Requiere agregar el script correspondiente en{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">layout.tsx</code>.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
              Google Analytics 4 — Measurement ID
            </span>
            <input
              value={settings.ga4Id}
              onChange={(e) => setSettings((s) => ({ ...s, ga4Id: e.target.value }))}
              placeholder="G-XXXXXXXXXX"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-empirika-orange"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
              Plausible — Dominio
            </span>
            <input
              value={settings.plausibleDomain}
              onChange={(e) =>
                setSettings((s) => ({ ...s, plausibleDomain: e.target.value }))
              }
              placeholder="growthstack60d.com"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-empirika-orange"
            />
          </label>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="rounded-full bg-empirika-orange px-5 py-2 text-xs font-semibold text-white transition-opacity disabled:opacity-50"
          >
            {saving ? "Guardando…" : "Guardar configuración"}
          </button>
          {saveMsg && <span className="text-xs text-white/50">{saveMsg}</span>}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          resetAnalyticsData();
          setData(getAnalyticsData());
        }}
        className="mt-6 text-xs font-medium text-white/30 underline underline-offset-2 hover:text-white/60"
      >
        Reiniciar datos locales de este navegador
      </button>
    </div>
  );
}
