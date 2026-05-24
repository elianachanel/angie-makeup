import { createClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function isAdminUser() {
  const user = await getSessionUser();
  if (!user?.email) return false;

  const supabase = await createClient();
  const { data } = await supabase
    .from("admins")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  return !!data;
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) return { ok: false as const, error: "not_authenticated" };

  const admin = await isAdminUser();
  if (!admin) return { ok: false as const, error: "not_admin" };

  return { ok: true as const, user };
}
