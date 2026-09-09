"use client";

import { useState } from "react";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  revenue: string;
  channel: string;
  goal: string;
  budget: string;
};

const initialData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  revenue: "",
  channel: "",
  goal: "",
  budget: "",
};

const TOTAL_STEPS = 4;

function computeScore(data: FormData) {
  let score = 0;
  if (["10k-30k", "30k+"].includes(data.revenue)) score += 1;
  if (data.channel && data.channel !== "sin-canal") score += 1;
  if (["6k-10k", "10k+"].includes(data.budget)) score += 1;
  return score;
}

export default function EvaluationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [field]: value }));

  const canAdvance = () => {
    if (step === 1) return data.name && data.company && data.email;
    if (step === 2) return data.revenue && data.channel;
    if (step === 3) return data.goal;
    if (step === 4) return data.budget;
    return true;
  };

  const next = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else setSubmitted(true);
  };
  const back = () => step > 1 && setStep(step - 1);

  if (submitted) {
    const score = computeScore(data);
    const qualified = score >= 2;

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-empirika-orange text-2xl text-white">
          ✓
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-white">
          {qualified
            ? "Tu solicitud fue recibida."
            : "Gracias por tu interés."}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
          {qualified
            ? `${data.name}, tu perfil coincide con lo que buscamos. Nuestro equipo revisará tu información y te contactará a ${data.email} para coordinar tu evaluación estratégica.`
            : `${data.name}, gracias por completar el formulario. En este momento tu negocio podría no coincidir con el perfil de Growth Stack 60D, pero revisaremos tu información y te contactaremos si es el caso.`}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < step ? "bg-empirika-orange" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-empirika-orange">
        Paso {step} de {TOTAL_STEPS}
      </p>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Información básica
          </h3>
          <Field label="Nombre completo">
            <input
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              type="text"
              className={inputClass}
              placeholder="Tu nombre"
            />
          </Field>
          <Field label="Empresa">
            <input
              value={data.company}
              onChange={(e) => update("company", e.target.value)}
              type="text"
              className={inputClass}
              placeholder="Nombre de tu empresa"
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email">
              <input
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                type="email"
                className={inputClass}
                placeholder="tu@empresa.com"
              />
            </Field>
            <Field label="Teléfono">
              <input
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                type="tel"
                className={inputClass}
                placeholder="+00 000 000 000"
              />
            </Field>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Situación actual
          </h3>
          <Field label="Facturación mensual actual">
            <select
              value={data.revenue}
              onChange={(e) => update("revenue", e.target.value)}
              className={inputClass}
            >
              <option value="">Selecciona un rango</option>
              <option value="0-10k">Menos de USD 10.000</option>
              <option value="10k-30k">USD 10.000 – 30.000</option>
              <option value="30k+">Más de USD 30.000</option>
            </select>
          </Field>
          <Field label="¿Cómo generas clientes hoy?">
            <select
              value={data.channel}
              onChange={(e) => update("channel", e.target.value)}
              className={inputClass}
            >
              <option value="">Selecciona una opción</option>
              <option value="referidos">Principalmente referidos</option>
              <option value="ads">Publicidad paga</option>
              <option value="organico">Contenido / orgánico</option>
              <option value="sin-canal">No tengo un canal definido</option>
            </select>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Objetivo de crecimiento
          </h3>
          <Field label="¿Qué te gustaría lograr en los próximos 60 días?">
            <textarea
              value={data.goal}
              onChange={(e) => update("goal", e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="Ej: dejar de depender de referidos y tener un flujo constante de citas calificadas."
            />
          </Field>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Calificación</h3>
          <Field label="Presupuesto disponible para esta implementación">
            <select
              value={data.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={inputClass}
            >
              <option value="">Selecciona un rango</option>
              <option value="0-3k">Menos de USD 3.000</option>
              <option value="3k-6k">USD 3.000 – 6.000</option>
              <option value="6k-10k">USD 6.000 – 10.000</option>
              <option value="10k+">Más de USD 10.000</option>
            </select>
          </Field>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="text-sm font-medium text-white/50 transition-colors hover:text-white disabled:opacity-0"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance()}
          className="inline-flex h-12 items-center justify-center rounded-full bg-empirika-orange px-8 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(253,130,0,0.6)] transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          {step === TOTAL_STEPS ? "Enviar solicitud" : "Continuar"}
        </button>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-empirika-orange";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}
