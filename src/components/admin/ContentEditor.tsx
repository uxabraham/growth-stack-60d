"use client";

import { useEffect, useState, useCallback } from "react";
import type { SiteContent } from "@/content/types";
import { Card, Row, Field, TextInput, TextArea, StringListEditor, StatCardListEditor, AddButton, RemoveButton, ImageUpload } from "@/components/admin/fields";

const DRAFT_KEY = "gs60d_admin_draft_v1";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function ContentEditor() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [serverContent, setServerContent] = useState<SiteContent | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/content");
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setError(data.error || "No se pudo cargar el contenido.");
          setLoading(false);
          return;
        }
        setServerContent(data.content);

        const draftRaw =
          typeof window !== "undefined" ? localStorage.getItem(DRAFT_KEY) : null;
        if (draftRaw) {
          setHasDraft(true);
          setContent(JSON.parse(draftRaw));
        } else {
          setContent(data.content);
        }
      } catch {
        setError("Error de conexión al cargar el contenido.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const dirty =
    content && serverContent
      ? JSON.stringify(content) !== JSON.stringify(serverContent)
      : false;

  const update = useCallback(
    <S extends keyof SiteContent>(section: S, value: SiteContent[S]) => {
      setContent((prev) => (prev ? { ...prev, [section]: value } : prev));
    },
    []
  );

  function saveDraft() {
    if (!content) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
    setHasDraft(true);
    setSaveMessage("Borrador guardado en este navegador.");
    setTimeout(() => setSaveMessage(null), 2500);
  }

  function discardDraft() {
    localStorage.removeItem(DRAFT_KEY);
    setHasDraft(false);
    if (serverContent) setContent(serverContent);
  }

  async function saveToProject() {
    if (!content) return;
    setSaveState("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSaveState("error");
        setSaveMessage(data.error || "No se pudo guardar en el proyecto.");
        return;
      }
      setServerContent(content);
      localStorage.removeItem(DRAFT_KEY);
      setHasDraft(false);
      setSaveState("saved");
      setSaveMessage("Contenido guardado en src/content/site.json.");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("error");
      setSaveMessage("Error de conexión al guardar.");
    }
  }

  function downloadJson() {
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "site.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return <p className="text-sm text-white/50">Cargando contenido…</p>;
  }

  if (error || !content) {
    return (
      <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-6 text-sm text-red-300">
        {error || "No se pudo cargar el contenido."}
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-20 -mx-6 mb-8 border-b border-white/10 bg-[#0c0c0c]/95 px-6 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Gestor de contenido
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Contenido</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dirty && (
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
                Cambios sin guardar
              </span>
            )}
            <button
              type="button"
              onClick={downloadJson}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/30"
            >
              Descargar JSON
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/30"
            >
              Guardar borrador
            </button>
            <button
              type="button"
              onClick={saveToProject}
              disabled={saveState === "saving"}
              className="rounded-full bg-empirika-orange px-4 py-2 text-xs font-semibold text-white transition-opacity disabled:opacity-50"
            >
              {saveState === "saving" ? "Guardando…" : "Guardar en el proyecto"}
            </button>
          </div>
        </div>
        {saveMessage && (
          <p
            className={`mt-3 text-xs ${
              saveState === "error" ? "text-red-300" : "text-emerald-300"
            }`}
          >
            {saveMessage}
          </p>
        )}
        {hasDraft && (
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5">
            <p className="text-xs text-white/50">
              Estás viendo un borrador guardado en este navegador, distinto al
              contenido publicado.
            </p>
            <button
              type="button"
              onClick={discardDraft}
              className="shrink-0 text-xs font-semibold text-white/70 underline underline-offset-2 hover:text-white"
            >
              Descartar borrador
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <Card title="Marca y navegación" subtitle="Header y footer del sitio">
          <Row>
            <Field label="Nombre de marca">
              <TextInput
                value={content.brand.name}
                onChange={(v) => update("brand", { ...content.brand, name: v })}
              />
            </Field>
            <Field label="Texto de respaldo (si no hay logo)">
              <TextInput
                value={content.brand.logoText}
                onChange={(v) => update("brand", { ...content.brand, logoText: v })}
              />
            </Field>
          </Row>
          <Field label="Logo">
            <ImageUpload
              slot="logo"
              value={content.brand.logoUrl}
              onChange={(url) => update("brand", { ...content.brand, logoUrl: url })}
              hint="PNG, JPG, SVG o WebP · máx. 5MB · idealmente fondo transparente"
            />
          </Field>
          <Row>
            <Field label="CTA del header">
              <TextInput
                value={content.brand.ctaLabel}
                onChange={(v) => update("brand", { ...content.brand, ctaLabel: v })}
              />
            </Field>
          </Row>
        </Card>

        <Card title="Hero" subtitle="Primera sección visible">
          <Field label="Eyebrow">
            <TextInput
              value={content.hero.eyebrow}
              onChange={(v) => update("hero", { ...content.hero, eyebrow: v })}
            />
          </Field>
          <Row>
            <Field label="Título — línea 1">
              <TextInput
                value={content.hero.titleLine1}
                onChange={(v) => update("hero", { ...content.hero, titleLine1: v })}
              />
            </Field>
            <Field label="Título — línea 2 (naranja)">
              <TextInput
                value={content.hero.titleLine2}
                onChange={(v) => update("hero", { ...content.hero, titleLine2: v })}
              />
            </Field>
          </Row>
          <Field label="Párrafo">
            <TextArea
              value={content.hero.paragraph}
              onChange={(v) => update("hero", { ...content.hero, paragraph: v })}
            />
          </Field>
          <Row>
            <Field label="Mensaje secundario — línea 1">
              <TextInput
                value={content.hero.secondaryLine1}
                onChange={(v) => update("hero", { ...content.hero, secondaryLine1: v })}
              />
            </Field>
            <Field label="Mensaje secundario — línea 2">
              <TextInput
                value={content.hero.secondaryLine2}
                onChange={(v) => update("hero", { ...content.hero, secondaryLine2: v })}
              />
            </Field>
          </Row>
          <Row>
            <Field label="Texto del CTA">
              <TextInput
                value={content.hero.ctaLabel}
                onChange={(v) => update("hero", { ...content.hero, ctaLabel: v })}
              />
            </Field>
            <Field label="Nota bajo el CTA">
              <TextInput
                value={content.hero.ctaNote}
                onChange={(v) => update("hero", { ...content.hero, ctaNote: v })}
              />
            </Field>
          </Row>
          <Row>
            <Field label="Nombre del fundador">
              <TextInput
                value={content.hero.founderName}
                onChange={(v) => update("hero", { ...content.hero, founderName: v })}
              />
            </Field>
            <Field label="Cargo del fundador">
              <TextInput
                value={content.hero.founderRole}
                onChange={(v) => update("hero", { ...content.hero, founderRole: v })}
              />
            </Field>
          </Row>
          <Field label="Nota del fundador">
            <TextInput
              value={content.hero.founderNote}
              onChange={(v) => update("hero", { ...content.hero, founderNote: v })}
            />
          </Field>
          <Row>
            <Field label="Badge 1">
              <TextInput
                value={content.hero.badge1}
                onChange={(v) => update("hero", { ...content.hero, badge1: v })}
              />
            </Field>
            <Field label="Badge 2">
              <TextInput
                value={content.hero.badge2}
                onChange={(v) => update("hero", { ...content.hero, badge2: v })}
              />
            </Field>
          </Row>
          <Field label="Bloque de números (estilo bento, con conteo animado)">
            <StatCardListEditor
              stats={content.hero.stats}
              onChange={(stats) => update("hero", { ...content.hero, stats })}
            />
          </Field>
        </Card>

        <Card title="Video (VSL)">
          <Field label="Título">
            <TextInput
              value={content.vsl.title}
              onChange={(v) => update("vsl", { ...content.vsl, title: v })}
            />
          </Field>
          <Field label="Subtítulo">
            <TextArea
              value={content.vsl.subtitle}
              onChange={(v) => update("vsl", { ...content.vsl, subtitle: v })}
            />
          </Field>
          <Row>
            <Field label="Etiqueta del video">
              <TextInput
                value={content.vsl.videoLabel}
                onChange={(v) => update("vsl", { ...content.vsl, videoLabel: v })}
              />
            </Field>
            <Field label="Etiqueta de subtítulos">
              <TextInput
                value={content.vsl.subtitleLabel}
                onChange={(v) => update("vsl", { ...content.vsl, subtitleLabel: v })}
              />
            </Field>
          </Row>
        </Card>

        <Card title="El problema">
          <Row>
            <Field label="Título — línea 1">
              <TextInput
                value={content.problem.titleLine1}
                onChange={(v) => update("problem", { ...content.problem, titleLine1: v })}
              />
            </Field>
            <Field label="Título — línea 2">
              <TextInput
                value={content.problem.titleLine2}
                onChange={(v) => update("problem", { ...content.problem, titleLine2: v })}
              />
            </Field>
          </Row>
          <Field label="Piezas desconectadas">
            <div className="space-y-3">
              {content.problem.pieces.map((piece, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-lg border border-white/10 p-3 sm:flex-row sm:items-center">
                  <input
                    value={piece.label}
                    onChange={(e) => {
                      const next = [...content.problem.pieces];
                      next[i] = { ...next[i], label: e.target.value };
                      update("problem", { ...content.problem, pieces: next });
                    }}
                    placeholder="Etiqueta"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange sm:w-40"
                  />
                  <input
                    value={piece.note}
                    onChange={(e) => {
                      const next = [...content.problem.pieces];
                      next[i] = { ...next[i], note: e.target.value };
                      update("problem", { ...content.problem, pieces: next });
                    }}
                    placeholder="Nota"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                  <RemoveButton
                    onClick={() =>
                      update("problem", {
                        ...content.problem,
                        pieces: content.problem.pieces.filter((_, idx) => idx !== i),
                      })
                    }
                  />
                </div>
              ))}
              <AddButton
                label="Agregar pieza"
                onClick={() =>
                  update("problem", {
                    ...content.problem,
                    pieces: [...content.problem.pieces, { label: "", note: "" }],
                  })
                }
              />
            </div>
          </Field>
          <Row>
            <Field label="Cierre — línea 1">
              <TextInput
                value={content.problem.closingLine1}
                onChange={(v) => update("problem", { ...content.problem, closingLine1: v })}
              />
            </Field>
            <Field label="Cierre — línea 2">
              <TextInput
                value={content.problem.closingLine2}
                onChange={(v) => update("problem", { ...content.problem, closingLine2: v })}
              />
            </Field>
          </Row>
        </Card>

        <Card title="La solución">
          <Row>
            <Field label="Título — línea 1">
              <TextInput
                value={content.solution.titleLine1}
                onChange={(v) => update("solution", { ...content.solution, titleLine1: v })}
              />
            </Field>
            <Field label="Título — línea 2">
              <TextInput
                value={content.solution.titleLine2}
                onChange={(v) => update("solution", { ...content.solution, titleLine2: v })}
              />
            </Field>
          </Row>
          <Field label="Pasos del sistema (scroll interactivo)">
            <div className="space-y-3">
              {content.solution.steps.map((step, i) => (
                <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={step.title}
                      onChange={(e) => {
                        const next = [...content.solution.steps];
                        next[i] = { ...next[i], title: e.target.value };
                        update("solution", { ...content.solution, steps: next });
                      }}
                      placeholder="Título del paso"
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                    />
                    <RemoveButton
                      onClick={() =>
                        update("solution", {
                          ...content.solution,
                          steps: content.solution.steps.filter((_, idx) => idx !== i),
                        })
                      }
                    />
                  </div>
                  <textarea
                    value={step.desc}
                    onChange={(e) => {
                      const next = [...content.solution.steps];
                      next[i] = { ...next[i], desc: e.target.value };
                      update("solution", { ...content.solution, steps: next });
                    }}
                    rows={2}
                    placeholder="Descripción que se muestra en el panel al llegar a este paso"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                </div>
              ))}
              <AddButton
                label="Agregar paso"
                onClick={() =>
                  update("solution", {
                    ...content.solution,
                    steps: [...content.solution.steps, { title: "", desc: "" }],
                  })
                }
              />
            </div>
          </Field>
          <Row>
            <Field label="Cierre — línea 1">
              <TextInput
                value={content.solution.closingLine1}
                onChange={(v) => update("solution", { ...content.solution, closingLine1: v })}
              />
            </Field>
            <Field label="Cierre — línea 2">
              <TextInput
                value={content.solution.closingLine2}
                onChange={(v) => update("solution", { ...content.solution, closingLine2: v })}
              />
            </Field>
          </Row>
        </Card>

        <Card title="Qué construimos">
          <Field label="Título">
            <TextInput
              value={content.whatWeBuild.title}
              onChange={(v) => update("whatWeBuild", { ...content.whatWeBuild, title: v })}
            />
          </Field>
          <Field label="Componentes">
            <div className="space-y-3">
              {content.whatWeBuild.items.map((item, i) => (
                <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={item.title}
                      onChange={(e) => {
                        const next = [...content.whatWeBuild.items];
                        next[i] = { ...next[i], title: e.target.value };
                        update("whatWeBuild", { ...content.whatWeBuild, items: next });
                      }}
                      placeholder="Título"
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                    />
                    <RemoveButton
                      onClick={() =>
                        update("whatWeBuild", {
                          ...content.whatWeBuild,
                          items: content.whatWeBuild.items.filter((_, idx) => idx !== i),
                        })
                      }
                    />
                  </div>
                  <textarea
                    value={item.desc}
                    onChange={(e) => {
                      const next = [...content.whatWeBuild.items];
                      next[i] = { ...next[i], desc: e.target.value };
                      update("whatWeBuild", { ...content.whatWeBuild, items: next });
                    }}
                    rows={2}
                    placeholder="Descripción"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                </div>
              ))}
              <AddButton
                label="Agregar componente"
                onClick={() =>
                  update("whatWeBuild", {
                    ...content.whatWeBuild,
                    items: [...content.whatWeBuild.items, { title: "", desc: "" }],
                  })
                }
              />
            </div>
          </Field>
          <Row>
            <Field label="Cierre — línea 1">
              <TextInput
                value={content.whatWeBuild.closingLine1}
                onChange={(v) => update("whatWeBuild", { ...content.whatWeBuild, closingLine1: v })}
              />
            </Field>
            <Field label="Cierre — línea 2">
              <TextInput
                value={content.whatWeBuild.closingLine2}
                onChange={(v) => update("whatWeBuild", { ...content.whatWeBuild, closingLine2: v })}
              />
            </Field>
          </Row>
        </Card>

        <Card title="Metodología 60 días">
          <Field label="Título">
            <TextInput
              value={content.methodology.title}
              onChange={(v) => update("methodology", { ...content.methodology, title: v })}
            />
          </Field>
          <div className="space-y-3">
            {content.methodology.phases.map((phase, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={phase.phase}
                    onChange={(e) => {
                      const next = [...content.methodology.phases];
                      next[i] = { ...next[i], phase: e.target.value };
                      update("methodology", { ...content.methodology, phases: next });
                    }}
                    placeholder="Fase"
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                  <input
                    value={phase.days}
                    onChange={(e) => {
                      const next = [...content.methodology.phases];
                      next[i] = { ...next[i], days: e.target.value };
                      update("methodology", { ...content.methodology, phases: next });
                    }}
                    placeholder="Días"
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                </div>
                <input
                  value={phase.title}
                  onChange={(e) => {
                    const next = [...content.methodology.phases];
                    next[i] = { ...next[i], title: e.target.value };
                    update("methodology", { ...content.methodology, phases: next });
                  }}
                  placeholder="Título"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                />
                <div className="flex items-start gap-2">
                  <textarea
                    value={phase.desc}
                    onChange={(e) => {
                      const next = [...content.methodology.phases];
                      next[i] = { ...next[i], desc: e.target.value };
                      update("methodology", { ...content.methodology, phases: next });
                    }}
                    rows={2}
                    placeholder="Descripción"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                  <RemoveButton
                    onClick={() =>
                      update("methodology", {
                        ...content.methodology,
                        phases: content.methodology.phases.filter((_, idx) => idx !== i),
                      })
                    }
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/40">
                    Checklist del panel visual
                  </span>
                  <StringListEditor
                    items={phase.bullets ?? []}
                    placeholder="Entregable de esta fase"
                    onChange={(bullets) => {
                      const next = [...content.methodology.phases];
                      next[i] = { ...next[i], bullets };
                      update("methodology", { ...content.methodology, phases: next });
                    }}
                  />
                </div>
              </div>
            ))}
            <AddButton
              label="Agregar fase"
              onClick={() =>
                update("methodology", {
                  ...content.methodology,
                  phases: [
                    ...content.methodology.phases,
                    { phase: "", days: "", title: "", desc: "", bullets: [] },
                  ],
                })
              }
            />
          </div>
        </Card>

        <Card title="Resultado final">
          <Row>
            <Field label="Título — línea 1">
              <TextInput
                value={content.finalResult.titleLine1}
                onChange={(v) => update("finalResult", { ...content.finalResult, titleLine1: v })}
              />
            </Field>
            <Field label="Título — línea 2">
              <TextInput
                value={content.finalResult.titleLine2}
                onChange={(v) => update("finalResult", { ...content.finalResult, titleLine2: v })}
              />
            </Field>
          </Row>
          <Field label="Módulos del Growth Engine">
            <div className="space-y-2">
              {content.finalResult.modules.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={m.label}
                    onChange={(e) => {
                      const next = [...content.finalResult.modules];
                      next[i] = { ...next[i], label: e.target.value };
                      update("finalResult", { ...content.finalResult, modules: next });
                    }}
                    placeholder="Módulo"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                  <input
                    value={m.metric}
                    onChange={(e) => {
                      const next = [...content.finalResult.modules];
                      next[i] = { ...next[i], metric: e.target.value };
                      update("finalResult", { ...content.finalResult, modules: next });
                    }}
                    placeholder="Estado"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                  <RemoveButton
                    onClick={() =>
                      update("finalResult", {
                        ...content.finalResult,
                        modules: content.finalResult.modules.filter((_, idx) => idx !== i),
                      })
                    }
                  />
                </div>
              ))}
              <AddButton
                label="Agregar módulo"
                onClick={() =>
                  update("finalResult", {
                    ...content.finalResult,
                    modules: [...content.finalResult.modules, { label: "", metric: "" }],
                  })
                }
              />
            </div>
          </Field>
        </Card>

        <Card title="Casos y autoridad">
          <Field label="Título">
            <TextInput
              value={content.cases.title}
              onChange={(v) => update("cases", { ...content.cases, title: v })}
            />
          </Field>
          <Field label="Bloque de números (estilo bento, con conteo animado)">
            <StatCardListEditor
              stats={content.cases.stats}
              onChange={(stats) => update("cases", { ...content.cases, stats })}
            />
          </Field>
          <Field label="Bio de autoridad del fundador">
            <TextArea
              value={content.cases.authorityBio}
              onChange={(v) => update("cases", { ...content.cases, authorityBio: v })}
              rows={4}
            />
          </Field>
          <div className="space-y-3">
            {content.cases.cases.map((c, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={c.industry}
                    onChange={(e) => {
                      const next = [...content.cases.cases];
                      next[i] = { ...next[i], industry: e.target.value };
                      update("cases", { ...content.cases, cases: next });
                    }}
                    placeholder="Industria"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                  <RemoveButton
                    onClick={() =>
                      update("cases", {
                        ...content.cases,
                        cases: content.cases.cases.filter((_, idx) => idx !== i),
                      })
                    }
                  />
                </div>
                {(["problem", "build", "result"] as const).map((key) => (
                  <textarea
                    key={key}
                    value={c[key]}
                    onChange={(e) => {
                      const next = [...content.cases.cases];
                      next[i] = { ...next[i], [key]: e.target.value };
                      update("cases", { ...content.cases, cases: next });
                    }}
                    rows={2}
                    placeholder={
                      key === "problem" ? "Problema" : key === "build" ? "Implementación" : "Resultado"
                    }
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                ))}
              </div>
            ))}
            <AddButton
              label="Agregar caso"
              onClick={() =>
                update("cases", {
                  ...content.cases,
                  cases: [
                    ...content.cases.cases,
                    { industry: "", problem: "", build: "", result: "" },
                  ],
                })
              }
            />
          </div>
        </Card>

        <Card title="Para quién es / no es">
          <Field label="Título">
            <TextInput
              value={content.forWhoNot.title}
              onChange={(v) => update("forWhoNot", { ...content.forWhoNot, title: v })}
            />
          </Field>
          <Row>
            <Field label="Para quién es">
              <StringListEditor
                items={content.forWhoNot.yes}
                onChange={(yes) => update("forWhoNot", { ...content.forWhoNot, yes })}
              />
            </Field>
            <Field label="No es para">
              <StringListEditor
                items={content.forWhoNot.no}
                onChange={(no) => update("forWhoNot", { ...content.forWhoNot, no })}
              />
            </Field>
          </Row>
        </Card>

        <Card title="Inversión">
          <Field label="Título">
            <TextInput
              value={content.investment.title}
              onChange={(v) => update("investment", { ...content.investment, title: v })}
            />
          </Field>
          <Row>
            <Field label="Nombre del programa">
              <TextInput
                value={content.investment.programName}
                onChange={(v) => update("investment", { ...content.investment, programName: v })}
              />
            </Field>
            <Field label="Precio">
              <TextInput
                value={content.investment.price}
                onChange={(v) => update("investment", { ...content.investment, price: v })}
              />
            </Field>
          </Row>
          <Field label="Términos de pago">
            <TextInput
              value={content.investment.terms}
              onChange={(v) => update("investment", { ...content.investment, terms: v })}
            />
          </Field>
          <Field label="Aclaración">
            <TextArea
              value={content.investment.disclaimer}
              onChange={(v) => update("investment", { ...content.investment, disclaimer: v })}
            />
          </Field>
          <Field label="Texto del CTA">
            <TextInput
              value={content.investment.ctaLabel}
              onChange={(v) => update("investment", { ...content.investment, ctaLabel: v })}
            />
          </Field>
        </Card>

        <Card title="Preguntas frecuentes">
          <Field label="Título">
            <TextInput
              value={content.faq.title}
              onChange={(v) => update("faq", { ...content.faq, title: v })}
            />
          </Field>
          <div className="space-y-3">
            {content.faq.items.map((item, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={item.q}
                    onChange={(e) => {
                      const next = [...content.faq.items];
                      next[i] = { ...next[i], q: e.target.value };
                      update("faq", { ...content.faq, items: next });
                    }}
                    placeholder="Pregunta"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                  />
                  <RemoveButton
                    onClick={() =>
                      update("faq", {
                        ...content.faq,
                        items: content.faq.items.filter((_, idx) => idx !== i),
                      })
                    }
                  />
                </div>
                <textarea
                  value={item.a}
                  onChange={(e) => {
                    const next = [...content.faq.items];
                    next[i] = { ...next[i], a: e.target.value };
                    update("faq", { ...content.faq, items: next });
                  }}
                  rows={3}
                  placeholder="Respuesta"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-empirika-orange"
                />
              </div>
            ))}
            <AddButton
              label="Agregar pregunta"
              onClick={() =>
                update("faq", {
                  ...content.faq,
                  items: [...content.faq.items, { q: "", a: "" }],
                })
              }
            />
          </div>
        </Card>

        <Card title="CTA final">
          <Row>
            <Field label="Título — línea 1">
              <TextInput
                value={content.finalCta.titleLine1}
                onChange={(v) => update("finalCta", { ...content.finalCta, titleLine1: v })}
              />
            </Field>
            <Field label="Título — línea 2">
              <TextInput
                value={content.finalCta.titleLine2}
                onChange={(v) => update("finalCta", { ...content.finalCta, titleLine2: v })}
              />
            </Field>
          </Row>
          <Field label="Párrafo">
            <TextArea
              value={content.finalCta.paragraph}
              onChange={(v) => update("finalCta", { ...content.finalCta, paragraph: v })}
            />
          </Field>
        </Card>
      </div>
    </div>
  );
}
