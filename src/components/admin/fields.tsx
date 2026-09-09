"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import type { StatCard } from "@/content/types";

export function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-empirika-orange";

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="text"
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={inputClass}
    />
  );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50 transition-colors hover:border-red-400/40 hover:text-red-300"
    >
      Eliminar
    </button>
  );
}

export function AddButton({
  onClick,
  label = "Agregar",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-dashed border-white/15 py-2.5 text-xs font-semibold text-white/50 transition-colors hover:border-empirika-orange/50 hover:text-empirika-orange"
    >
      + {label}
    </button>
  );
}

export function ImageUpload({
  slot,
  value,
  onChange,
  onLight = false,
  hint,
}: {
  slot: string;
  value: string;
  onChange: (url: string) => void;
  onLight?: boolean;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slot", slot);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "No se pudo subir el archivo.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Error de conexión al subir el archivo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 ${
            onLight ? "bg-white" : "bg-black/40"
          }`}
        >
          {value ? (
            <div className="relative h-10 w-28">
              <Image
                src={value}
                alt="Vista previa"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <span className="text-[10px] text-white/30">Sin imagen</span>
          )}
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-empirika-orange/50 disabled:opacity-50"
          >
            {uploading ? "Subiendo…" : value ? "Cambiar imagen" : "Subir imagen"}
          </button>
          {hint && <p className="mt-1.5 text-[11px] text-white/30">{hint}</p>}
          {error && <p className="mt-1.5 text-[11px] text-red-300">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export function StatCardListEditor({
  stats,
  onChange,
}: {
  stats: StatCard[];
  onChange: (stats: StatCard[]) => void;
}) {
  const inputClass =
    "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange";

  function updateAt(i: number, patch: Partial<StatCard>) {
    const next = [...stats];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {stats.map((stat, i) => (
        <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
          <input
            value={stat.heading}
            onChange={(e) => updateAt(i, { heading: e.target.value })}
            placeholder="Encabezado pequeño (ej: Marcas que ya construyeron su sistema)"
            className={inputClass}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={stat.number}
              onChange={(e) => updateAt(i, { number: e.target.value })}
              placeholder="Número (ej: 500)"
              className={inputClass}
            />
            <input
              value={stat.unit}
              onChange={(e) => updateAt(i, { unit: e.target.value })}
              placeholder="Unidad (ej: +, %) — opcional"
              className={inputClass}
            />
          </div>
          <div className="flex items-start gap-2">
            <textarea
              value={stat.description}
              onChange={(e) => updateAt(i, { description: e.target.value })}
              rows={2}
              placeholder="Descripción debajo del número"
              className={inputClass}
            />
            <RemoveButton onClick={() => onChange(stats.filter((_, idx) => idx !== i))} />
          </div>
        </div>
      ))}
      <AddButton
        label="Agregar stat"
        onClick={() =>
          onChange([...stats, { heading: "", number: "", unit: "", description: "" }])
        }
      />
    </div>
  );
}

export function StringListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={placeholder}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="shrink-0 rounded-lg border border-white/10 px-2.5 py-2.5 text-xs text-white/50 transition-colors hover:border-red-400/40 hover:text-red-300"
            aria-label="Eliminar"
          >
            ✕
          </button>
        </div>
      ))}
      <AddButton onClick={() => onChange([...items, ""])} />
    </div>
  );
}
