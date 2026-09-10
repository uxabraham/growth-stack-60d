import { pool } from "@/lib/db";

export type MediaAsset = {
  id: string;
  url: string;
  pathname: string;
  altText: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

type Row = {
  id: string;
  url: string;
  pathname: string;
  alt_text: string;
  mime_type: string;
  size: number;
  created_at: string;
};

function toAsset(row: Row): MediaAsset {
  return {
    id: row.id,
    url: row.url,
    pathname: row.pathname,
    altText: row.alt_text,
    mimeType: row.mime_type,
    size: row.size,
    createdAt: row.created_at,
  };
}

export async function listMediaAssets(): Promise<MediaAsset[]> {
  const { rows } = await pool.query<Row>(
    "SELECT * FROM media_assets ORDER BY created_at DESC"
  );
  return rows.map(toAsset);
}

export async function insertMediaAsset(input: {
  id: string;
  url: string;
  pathname: string;
  mimeType: string;
  size: number;
  altText?: string;
}): Promise<MediaAsset> {
  const { rows } = await pool.query<Row>(
    `INSERT INTO media_assets (id, url, pathname, alt_text, mime_type, size)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [input.id, input.url, input.pathname, input.altText ?? "", input.mimeType, input.size]
  );
  return toAsset(rows[0]);
}

export async function updateMediaAssetAlt(id: string, altText: string): Promise<void> {
  await pool.query("UPDATE media_assets SET alt_text = $1 WHERE id = $2", [altText, id]);
}

export async function deleteMediaAsset(id: string): Promise<MediaAsset | null> {
  const { rows } = await pool.query<Row>(
    "DELETE FROM media_assets WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0] ? toAsset(rows[0]) : null;
}
