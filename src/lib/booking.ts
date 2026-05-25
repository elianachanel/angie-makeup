import { bookingTimeSlots } from "@/lib/data";

/** Fecha en zona local del navegador (YYYY-MM-DD) */
export function toLocalIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Fecha de hoy en zona local (YYYY-MM-DD) */
export function getTodayLocal(): string {
  return toLocalIsoDate(new Date());
}

export function addDaysToLocalIso(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return toLocalIsoDate(dt);
}

export function getTomorrowLocal(): string {
  return addDaysToLocalIso(getTodayLocal(), 1);
}

function slotToDate(date: string, time: string): Date {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  return new Date(y, mo - 1, d, h, min, 0);
}

export function isPastDate(date: string): boolean {
  if (!date) return false;
  return date < getTodayLocal();
}

/** true si la hora ya pasó (mismo día) o la fecha es anterior */
export function isPastDateTime(date: string, time: string): boolean {
  if (!date || !time) return false;
  const today = getTodayLocal();
  if (date < today) return true;
  if (date > today) return false;
  return slotToDate(date, time).getTime() <= Date.now();
}

/**
 * Horarios para la fecha elegida.
 * Hoy → solo horas futuras (ej. si son las 9 PM, no aparece 8 PM).
 * Sin fecha → ninguno (el usuario debe elegir fecha primero).
 */
export function getAvailableTimeSlots(date: string): { value: string; label: string }[] {
  const today = getTodayLocal();
  if (!date) return [];
  if (date < today) return [];
  if (date > today) return bookingTimeSlots;

  const now = Date.now();
  return bookingTimeSlots.filter((slot) => slotToDate(date, slot.value).getTime() > now);
}
