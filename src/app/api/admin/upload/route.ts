import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { supabaseAdmin, MEDIA_BUCKET } from "@/lib/supabaseAdmin";
import { insertMediaAsset } from "@/lib/media";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const slot = form?.get("slot");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No se recibió ningún archivo." }, { status: 400 });
  }
  if (typeof slot !== "string" || !/^[a-z0-9-]+$/.test(slot)) {
    return NextResponse.json({ ok: false, error: "Slot inválido." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Formato no soportado. Usa PNG, JPG, SVG, WebP, MP4 o WebM." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ ok: false, error: "El archivo supera 20MB." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const pathname = `${slot}/${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .upload(pathname, buffer, { contentType: file.type, upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .getPublicUrl(pathname);
    const url = publicUrlData.publicUrl;

    await insertMediaAsset({
      id: randomUUID(),
      url,
      pathname,
      mimeType: file.type,
      size: file.size,
    });

    return NextResponse.json({ ok: true, url });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo subir el archivo.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
