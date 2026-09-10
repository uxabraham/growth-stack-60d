import { Client } from "pg";
import { config } from "dotenv";
import { readFile } from "fs/promises";

config({ path: ".env.local" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const raw = await readFile("src/content/site.json", "utf-8");
  const data = JSON.parse(raw);

  await client.connect();
  await client.query(
    `INSERT INTO site_content (id, data) VALUES (1, $1)
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [JSON.stringify(data)]
  );
  console.log("Seeded site_content from src/content/site.json.");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
