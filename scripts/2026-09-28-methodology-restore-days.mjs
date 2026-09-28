import { Client } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const days = ["Días 1–15", "Días 16–30", "Días 31–45", "Días 46–60"];

async function main() {
  await client.connect();
  const { rows } = await client.query("SELECT data FROM site_content WHERE id = 1");
  if (!rows[0]) throw new Error("No site_content row found.");

  const data = rows[0].data;

  data.methodology.phases.forEach((phase, i) => {
    phase.days = days[i] ?? phase.days;
  });

  await client.query(
    "UPDATE site_content SET data = $1, updated_at = now() WHERE id = 1",
    [JSON.stringify(data)]
  );
  console.log("Restored methodology.phases[].days in Postgres.");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
