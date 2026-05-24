"use server";

import { createClient } from "@/lib/supabase/server";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp";
import type { CreateReservationInput } from "@/types/database";

export async function createReservation(input: CreateReservationInput) {
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("title")
    .eq("id", input.service)
    .maybeSingle();

  const { data, error } = await supabase
    .from("reservations")
    .insert({
      client_name: input.client_name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      service: input.service,
      booking_date: input.booking_date,
      booking_time: input.booking_time,
      message: input.message?.trim() || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("createReservation:", error);
    return { success: false as const, error: "No se pudo guardar la reserva. Intenta de nuevo." };
  }

  const whatsappUrl = getWhatsAppBookingUrl({
    ...input,
    serviceTitle: service?.title,
  });

  return {
    success: true as const,
    id: data.id,
    whatsappUrl,
  };
}
