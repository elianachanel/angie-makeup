import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * Ping ligero a Supabase para evitar pausa del plan Free (7 días sin actividad).
 * Vercel Cron llama esta ruta una vez al día (ver vercel.json).
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const { url, key, isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    return NextResponse.json(
      { ok: false, error: "Supabase env vars missing" },
      { status: 500 },
    );
  }

  const supabase = createClient(url!, key!);
  const { error } = await supabase.from("services").select("id").limit(1);

  if (error) {
    console.error("[keep-alive]", error.message);
    return NextResponse.json(
      { ok: false, error: error.message, at: new Date().toISOString() },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    at: new Date().toISOString(),
    message: "Supabase keep-alive",
  });
}
