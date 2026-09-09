import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export default async function AdminHomePage() {
  const content = await getSiteContent();

  const stats = [
    { label: "Secciones editables", value: "12" },
    { label: "Casos de estudio", value: String(content.cases.cases.length) },
    { label: "Preguntas FAQ", value: String(content.faq.items.length) },
    { label: "Fases metodología", value: String(content.methodology.phases.length) },
    { label: "Componentes del sistema", value: String(content.whatWeBuild.items.length) },
  ];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Panel administrativo
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Resumen</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-2xl font-semibold text-empirika-orange">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-white/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-base font-semibold">Cómo funciona</h2>
        <p className="mt-1 text-sm text-white/50">
          Dónde se guarda lo que editas en la sección Contenido.
        </p>
        <ul className="mt-5 space-y-3 text-sm text-white/70">
          <li className="border-l-2 border-empirika-orange/50 pl-3">
            <span className="font-semibold text-white">Guardar borrador</span>{" "}
            — queda en este navegador (localStorage). Sirve para probar cambios
            sin publicarlos todavía.
          </li>
          <li className="border-l-2 border-white/20 pl-3">
            <span className="font-semibold text-white">Guardar en el proyecto</span>{" "}
            — escribe directamente{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
              src/content/site.json
            </code>
            . Es el contenido real que ve la web. Solo funciona con el
            servidor corriendo en tu máquina (
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
              npm run dev
            </code>
            ) o en un hosting con sistema de archivos escribible.
          </li>
          <li className="border-l-2 border-white/20 pl-3">
            <span className="font-semibold text-white">Descargar JSON</span> —
            para cuando editas desde la web ya publicada: reemplaza el archivo
            en el repositorio y vuelve a desplegar.
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/contenido"
          className="inline-flex h-11 items-center justify-center rounded-full bg-empirika-orange px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Editar contenido
        </Link>
        <Link
          href="/admin/analitica"
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white/80 transition-colors hover:border-white/30"
        >
          Ver analítica
        </Link>
      </div>
    </div>
  );
}
