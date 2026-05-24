"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ReservationStatus } from "@/types/database";

async function guard() {
  const result = await requireAdmin();
  if (!result.ok) throw new Error(result.error);
  return createClient();
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const supabase = await guard();
  const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  return { success: true };
}

export async function deleteReservation(id: string) {
  const supabase = await guard();
  const { error } = await supabase.from("reservations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  return { success: true };
}
