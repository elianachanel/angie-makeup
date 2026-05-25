import type { SupabaseClient } from "@supabase/supabase-js";

type AdminRow = { id: string; email: string; user_id: string | null };

export async function fetchAdminAccess(
  supabase: SupabaseClient,
  opts?: { userId?: string; email?: string },
) {
  if (opts?.userId) {
    const { data, error } = await supabase
      .from("admins")
      .select("id, email, user_id")
      .eq("user_id", opts.userId)
      .maybeSingle();

    if (error) {
      console.error("fetchAdminAccess by user_id:", error);
      return { admin: null, error };
    }
    if (data) return { admin: data as AdminRow, error: null };
  }

  if (opts?.email) {
    const { data, error } = await supabase
      .from("admins")
      .select("id, email, user_id")
      .ilike("email", opts.email.trim())
      .maybeSingle();

    if (error) {
      console.error("fetchAdminAccess by email:", error);
      return { admin: null, error };
    }
    if (data) return { admin: data as AdminRow, error: null };
  }

  const { data, error } = await supabase.from("admins").select("id, email, user_id").limit(1);

  if (error) {
    console.error("fetchAdminAccess:", error);
    return { admin: null, error };
  }

  const admin = (data?.[0] as AdminRow | undefined) ?? null;
  return { admin, error: null };
}
