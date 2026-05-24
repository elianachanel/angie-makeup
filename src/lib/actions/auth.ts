"use server";

import { redirect } from "next/navigation";
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
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return { error: "Credenciales inválidas." };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "No tienes permisos de administrador." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
