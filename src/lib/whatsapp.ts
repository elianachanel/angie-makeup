import type { CreateReservationInput } from "@/types/database";

function formatTime12h(time: string) {
  const [h, m] = time.split(":").map(Number);
  const hour12 = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function buildWhatsAppBookingMessage(
  data: CreateReservationInput & { serviceTitle?: string },
) {
  const serviceLabel = data.serviceTitle ?? data.service;
  return [
    "*Nueva reserva - Angie Makeup*",
    "",
    `*Cliente:* ${data.client_name}`,
    `*Email:* ${data.email}`,
    `*Telefono:* ${data.phone}`,
    `*Servicio:* ${serviceLabel}`,
    `*Fecha:* ${data.booking_date}`,
    `*Hora:* ${formatTime12h(data.booking_time)}`,
    data.message ? `*Mensaje:* ${data.message}` : "",
    "",
    "_Enviado desde angie-makeup.com_",
  ]
    .filter(Boolean)
    .join("\n");
}

export function getWhatsAppBookingUrl(
  data: CreateReservationInput & { serviceTitle?: string },
) {
  const raw =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    process.env.WHATSAPP_NUMBER ??
    "15550000000";
  const phone = raw.replace(/\D/g, "");
  const text = encodeURIComponent(buildWhatsAppBookingMessage(data));
  return `https://wa.me/${phone}?text=${text}`;
}
