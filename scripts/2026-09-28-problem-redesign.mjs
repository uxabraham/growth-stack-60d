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

  data.problem = {
    eyebrow: "El recorrido de un posible cliente",
    titleLine1: "Cada paso desconectado",
    titleLine2: "deja oportunidades en el camino.",
    paragraph:
      "Tus esfuerzos atraen personas interesadas. El problema aparece cuando esa oportunidad debe pasar de una herramienta a otra para convertirse en cliente.",
    steps: [
      {
        title: "Atraes",
        tag: "Publicidad · contenido",
        desc: "Llegan clics y mensajes, pero no está claro cuáles tienen intención real de contratar.",
        flag: "Interés sin identificar",
      },
      {
        title: "Recibes",
        tag: "Landing page · WhatsApp",
        desc: "La persona pregunta o visita tu página. Sus datos quedan repartidos entre canales.",
        flag: "Consultas dispersas",
      },
      {
        title: "Organizas",
        tag: "CRM · automatización",
        desc: "Sin registro ni respuesta a tiempo, el equipo pierde de vista quién necesita seguimiento.",
        flag: "Contactos sin respuesta",
      },
      {
        title: "Conviertes",
        tag: "Seguimiento · ventas",
        desc: "Las cotizaciones dependen de la memoria de alguien y las oportunidades se enfrían.",
        flag: "Ventas que no avanzan",
      },
    ],
    closingLine1: "Tienes piezas.",
    closingLine2: "Pero no tienes un sistema.",
  };

  await client.query(
    "UPDATE site_content SET data = $1, updated_at = now() WHERE id = 1",
    [JSON.stringify(data)]
  );
  console.log("Problem section updated in Postgres.");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
