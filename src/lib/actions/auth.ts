"use server";

import { redirect } from "next/navigation";
import { fetchAdminAccess } from "@/lib/supabase/admin-access";
import { createClient } from "@/lib/supabase/server";

export async function signInAdmin(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: "Credenciales inválidas." };
  }

  const { admin, error: adminError } = await fetchAdminAccess(supabase, {
    userId: authData.user.id,
    email: authData.user.email ?? email,
  });

  if (adminError || !admin) {
    await supabase.auth.signOut();
    return {
      error:
        "No tienes permisos de administrador. En Supabase → SQL Editor ejecuta el script de la tabla admins (supabase/README.md) con el mismo email de Authentication.",
    };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
