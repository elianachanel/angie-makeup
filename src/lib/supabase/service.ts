import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

/** Solo servidor — nunca exponer service_role al navegador */
export function createServiceClient() {
  const { url, isConfigured } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!isConfigured || !serviceKey) {
    return null;
  }

  return createClient(url!, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const RESERVATION_RETENTION_MONTHS = 8;
