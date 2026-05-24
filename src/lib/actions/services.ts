"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ServiceInput } from "@/types/database";

async function guard() {
  const result = await requireAdmin();
  if (!result.ok) throw new Error(result.error);
  return createClient();
}

export async function upsertService(input: ServiceInput) {
  const supabase = await guard();
  const { error } = await supabase.from("services").upsert({
    id: input.id.trim(),
    title: input.title.trim(),
    description: input.description.trim(),
    price: input.price.trim(),
    duration: input.duration.trim(),
    image: input.image?.trim() || null,
    sort_order: input.sort_order ?? 0,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await guard();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}
