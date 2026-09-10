import type { SiteContent } from "@/content/types";
import fallback from "@/content/site.json";
import { pool } from "@/lib/db";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const { rows } = await pool.query<{ data: SiteContent }>(
      "SELECT data FROM site_content WHERE id = 1"
    );
    if (rows[0]) return rows[0].data;
    return fallback as SiteContent;
  } catch {
    // DB unreachable (e.g. missing env locally) — fall back to the
    // bundled snapshot so the site still renders something.
    return fallback as SiteContent;
  }
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  await pool.query(
    `INSERT INTO site_content (id, data) VALUES (1, $1)
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [JSON.stringify(content)]
  );
}
