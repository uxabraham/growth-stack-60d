import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

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
      { ok: false, error: "Formato no soportado. Usa PNG, JPG, SVG o WebP." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ ok: false, error: "El archivo supera 5MB." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), "public/brand");
    await fs.mkdir(dir, { recursive: true });
    const filename = `${slot}-${Date.now()}.${ext}`;
    await fs.writeFile(path.join(dir, filename), buffer);
    return NextResponse.json({ ok: true, url: `/brand/${filename}` });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No se pudo guardar el archivo (sistema de archivos de solo lectura en este entorno).",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
