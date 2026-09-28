import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// Vercel Cron pings this daily so the Supabase free-tier project never
// hits its 7-day inactivity auto-pause. A trivial read is enough — we
// just need real traffic against the database.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  try {
    await pool.query("SELECT 1");
    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
