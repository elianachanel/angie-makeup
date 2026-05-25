import type { SupabaseClient } from "@supabase/supabase-js";

/** La política RLS ya filtra por email del JWT; no usar .eq(email) (falla si mayúsculas difieren). */
export async function fetchAdminAccess(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("admins").select("id, email, user_id").limit(1);

  if (error) {
    console.error("fetchAdminAccess:", error);
    return { admin: null, error };
  }

  const admin = data?.[0] ?? null;
  return { admin, error: null };
}
