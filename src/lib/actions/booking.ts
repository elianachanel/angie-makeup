"use server";

import { createClient } from "@/lib/supabase/server";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp";
import type { CreateReservationInput } from "@/types/database";

function normalizeTime(time: string) {
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) return time;
  if (/^\d{2}:\d{2}$/.test(time)) return `${time}:00`;
  return time;
}

function mapBookingError(message: string, code?: string) {
  if (code === "23503" || message.includes("foreign key")) {
    return "El servicio seleccionado no existe en la base de datos. Ejecuta el SQL de servicios en Supabase.";
  }
  if (message.includes("row-level security") || code === "42501") {
    return "No se pudo guardar la reserva (permisos). Revisa las políticas RLS en Supabase.";
  }
  return "No se pudo guardar la reserva. Intenta de nuevo.";
}

export async function createReservation(input: CreateReservationInput) {
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("title")
    .eq("id", input.service)
    .maybeSingle();

  if (!service) {
    return {
      success: false as const,
      error:
        "No hay servicios en la base de datos. En Supabase → SQL Editor ejecuta supabase/migrations/001_initial_schema.sql",
    };
  }

  const bookingTime = normalizeTime(input.booking_time);

  // Sin .select(): anon puede INSERT pero no SELECT (RLS solo admin lee reservas)
  const { error } = await supabase.from("reservations").insert({
    client_name: input.client_name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    service: input.service,
    booking_date: input.booking_date,
    booking_time: bookingTime,
    message: input.message?.trim() || null,
    status: "pending",
  });

  if (error) {
    console.error("createReservation:", error);
    return {
      success: false as const,
      error: mapBookingError(error.message, error.code),
    };
  }

  const whatsappUrl = getWhatsAppBookingUrl({
    ...input,
    serviceTitle: service.title,
    booking_time: bookingTime,
  });

  return {
    success: true as const,
    whatsappUrl,
  };
}
