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
  delete data.problem.closingLine1;
  delete data.problem.closingLine2;

  await client.query(
    "UPDATE site_content SET data = $1, updated_at = now() WHERE id = 1",
    [JSON.stringify(data)]
  );
  console.log("Removed problem.closingLine1/2 from Postgres.");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
