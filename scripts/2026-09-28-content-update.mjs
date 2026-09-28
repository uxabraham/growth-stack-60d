import { Client } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  const { rows } = await client.query("SELECT data FROM site_content WHERE id = 1");
  if (!rows[0]) throw new Error("No site_content row found.");

  const data = rows[0].data;

  // --- Hero ---
  const hero = data.hero;
  hero.titleLine1 = "Tu negocio ya vende.";
  hero.titleLine2 = "Ahora necesita un sistema capaz de hacerlo escalar.";
  hero.paragraph =
    "Growth Stack 60D conecta adquisición, conversión y seguimiento comercial en una sola operación. En 60 días construimos la infraestructura que necesitas para generar oportunidades, darles seguimiento y saber qué está produciendo ventas.";
  delete hero.secondaryLine1;
  delete hero.secondaryLine2;
  hero.founderRole = "CEO - Empirika Group";
  hero.founderNote =
    "Ha liderado estrategias de adquisición, automatización y conversión para empresas en crecimiento. Esa experiencia dio forma a Growth Stack 60D: un sistema que conecta marketing, seguimiento y ventas en una sola operación.";
  delete hero.badge1;
  delete hero.badge2;
  hero.badges = ["Campañas", "Web", "Conversión", "CRM", "Ventas"];
  hero.stats = [
    { heading: "años impulsando negocios", number: "10", unit: "+", description: "" },
    { heading: "proyectos culminados exitosamente", number: "400", unit: "+", description: "" },
    { heading: "países con presencia digital", number: "10", unit: "+", description: "" },
  ];

  // --- Remove Solution & FinalResult sections ---
  delete data.solution;
  delete data.finalResult;

  // --- Methodology ---
  const m = data.methodology;
  m.title = "60 días para construir, activar y optimizar el sistema.";
  const leftCopy = [
    [
      "Partimos de tu negocio real, no de una plantilla",
      "Entendemos cómo vendes, a quién le vendes y qué te está frenando, antes de mover una sola pieza del sistema.",
    ],
    [
      "Se arma la infraestructura que hoy no tienes",
      "Cada pieza —de la landing al CRM— queda conectada entre sí desde el día uno, sin depender de procesos manuales.",
    ],
    [
      "El sistema empieza a trabajar por ti",
      "Encendemos la adquisición con el proceso comercial ya listo para recibir y dar seguimiento a cada oportunidad.",
    ],
    [
      "Afinamos con datos, no con suposiciones",
      "Usamos los primeros resultados reales para ajustar oferta, mensajes y proceso, dejando un sistema listo para escalar.",
    ],
  ];
  m.phases.forEach((phase, i) => {
    const pair = leftCopy[i];
    if (!pair) return;
    phase.leftTitle = pair[0];
    phase.desc = pair[1];
  });

  // --- ForWhoNot ---
  data.forWhoNot.title = "Growth Stack funciona cuando existe algo para escalar";

  await client.query(
    "UPDATE site_content SET data = $1, updated_at = now() WHERE id = 1",
    [JSON.stringify(data)]
  );
  console.log("Content updated in Postgres.");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
