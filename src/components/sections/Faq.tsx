"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const faqs = [
  {
    q: "¿Esto funciona para cualquier empresa?",
    a: "No. Growth Stack 60D está diseñado para empresas que ya tienen un producto o servicio validado y ventas actuales. Si estás empezando desde cero, no es el momento adecuado para este programa.",
  },
  {
    q: "¿Incluye inversión publicitaria?",
    a: "No. La implementación (estrategia, construcción y optimización del sistema) es independiente de la inversión en medios pagados. Definimos el presupuesto publicitario recomendado según tu objetivo, pero se administra por separado.",
  },
  {
    q: "¿Necesito tener un equipo comercial?",
    a: "Necesitas capacidad de atender nuevas oportunidades. Puede ser un equipo comercial, o tú mismo si estás al frente de las ventas. El sistema está diseñado para que ninguna oportunidad se pierda, pero alguien debe cerrarlas.",
  },
  {
    q: "¿Es una agencia tradicional?",
    a: "No. No vendemos servicios sueltos (solo ads, solo una web, solo un CRM). Construimos un sistema completo donde cada componente está conectado y tiene una función específica dentro del proceso de adquisición y conversión.",
  },
  {
    q: "¿Qué pasa después de los 60 días?",
    a: "Sales con un Growth Engine funcionando: funnel, CRM, automatizaciones y tracking activos. A partir de ahí, algunos clientes continúan con nosotros en modalidad de gestión continua; otros operan el sistema de forma independiente.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-empirika-ink py-24 text-white sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Antes de solicitar tu evaluación
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 max-w-2xl divide-y divide-white/10 border-y border-white/10">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-semibold sm:text-base">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-xl text-empirika-orange transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-5 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="min-h-0 text-sm leading-relaxed text-white/60">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
