import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteMediaAsset, listMediaAssets, updateMediaAssetAlt } from "@/lib/media";
import { supabaseAdmin, MEDIA_BUCKET } from "@/lib/supabaseAdmin";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }
  const assets = await listMediaAssets();
  return NextResponse.json({ ok: true, assets });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.id || typeof body.altText !== "string") {
    return NextResponse.json({ ok: false, error: "Datos inválidos." }, { status: 400 });
  }
  await updateMediaAssetAlt(body.id, body.altText);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Falta id." }, { status: 400 });
  }
  const deleted = await deleteMediaAsset(id);
  if (deleted) {
    await supabaseAdmin.storage.from(MEDIA_BUCKET).remove([deleted.pathname]);
  }
  return NextResponse.json({ ok: true });
}
