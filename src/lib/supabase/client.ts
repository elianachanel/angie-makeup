import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function createClient() {
  const { url, key, isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    throw new Error("Supabase no está configurado en este entorno.");
  }
  return createBrowserClient(url!, key!);
}
