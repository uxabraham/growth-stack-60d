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

  // Hero paragraph -> two explicit lines
  data.hero.paragraphLine1 =
    "Growth Stack 60D conecta adquisición, conversión y seguimiento comercial en una sola operación.";
  data.hero.paragraphLine2 =
    "En 60 días construimos la infraestructura que necesitas para generar oportunidades, darles seguimiento y saber qué está produciendo ventas.";
  delete data.hero.paragraph;

  // Problem steps: remove the gray tag subtitle field
  data.problem.steps.forEach((step) => {
    delete step.tag;
  });

  await client.query(
    "UPDATE site_content SET data = $1, updated_at = now() WHERE id = 1",
    [JSON.stringify(data)]
  );
  console.log("Applied hero paragraph split + problem tag removal to Postgres.");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
