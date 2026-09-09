import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "@/content/types";
import fallback from "@/content/site.json";

const CONTENT_PATH = path.join(process.cwd(), "src/content/site.json");

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return fallback as SiteContent;
  }
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2) + "\n", "utf-8");
}
