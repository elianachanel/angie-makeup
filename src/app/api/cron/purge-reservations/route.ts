import { NextResponse } from "next/server";
import {
  createServiceClient,
  RESERVATION_RETENTION_MONTHS,
} from "@/lib/supabase/service";

/**
 * Borra reservas con booking_date anterior a 8 meses.
 * Programado 1× al mes en vercel.json (requiere SUPABASE_SERVICE_ROLE_KEY en Vercel).
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Falta SUPABASE_SERVICE_ROLE_KEY en Vercel (Supabase → Settings → API → service_role secret)",
      },
      { status: 500 },
    );
  }

  const { data: deletedCount, error } = await supabase.rpc("purge_old_reservations", {
    retention_months: RESERVATION_RETENTION_MONTHS,
  });

  if (error) {
    console.error("[purge-reservations]", error.message);
    return NextResponse.json(
      { ok: false, error: error.message, at: new Date().toISOString() },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    deleted: deletedCount ?? 0,
    retentionMonths: RESERVATION_RETENTION_MONTHS,
    at: new Date().toISOString(),
  });
}
