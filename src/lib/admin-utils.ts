import { getTodayLocal, getTomorrowLocal } from "@/lib/booking";
import type { Reservation, ReservationStatus } from "@/types/database";

export const statusLabels: Record<ReservationStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

export const statusColors: Record<ReservationStatus, string> = {
  pending: "bg-[#c9a87c]/20 text-[#e8d4b8] border-[#c9a87c]/30",
  confirmed: "bg-[#e8b4bc]/20 text-[#f5d5dc] border-[#e8b4bc]/30",
  completed: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-200 border-red-500/30",
};

export function formatBookingDate(date: string) {
  try {
    return new Intl.DateTimeFormat("es", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T12:00:00`));
  } catch {
    return date;
  }
}

export function formatTime(time: string) {
  const [h, m] = time.slice(0, 5).split(":").map(Number);
  const hour12 = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function todayIsoDate() {
  return getTodayLocal();
}

/** Próximas primero (asc), pasadas al final (más reciente primero). */
export function compareReservationBySchedule(a: Reservation, b: Reservation) {
  const today = todayIsoDate();
  const aPast = a.booking_date < today;
  const bPast = b.booking_date < today;

  if (aPast !== bPast) return aPast ? 1 : -1;

  if (aPast && bPast) {
    const byDate = b.booking_date.localeCompare(a.booking_date);
    if (byDate !== 0) return byDate;
    return b.booking_time.localeCompare(a.booking_time);
  }

  const byDate = a.booking_date.localeCompare(b.booking_date);
  if (byDate !== 0) return byDate;
  return a.booking_time.localeCompare(b.booking_time);
}

export function formatGroupDateHeader(date: string) {
  const today = todayIsoDate();
  const tomorrowIso = getTomorrowLocal();

  if (date === today) return "Hoy";
  if (date === tomorrowIso) return "Mañana";

  return new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function groupReservationsByDate(list: Reservation[]) {
  const sorted = [...list].sort(compareReservationBySchedule);
  const groups: { date: string; items: Reservation[] }[] = [];

  for (const r of sorted) {
    const last = groups[groups.length - 1];
    if (last?.date === r.booking_date) {
      last.items.push(r);
    } else {
      groups.push({ date: r.booking_date, items: [r] });
    }
  }

  return groups;
}

export function filterReservations(
  list: Reservation[],
  query: string,
  status: ReservationStatus | "all",
  dateFilter?: string,
) {
  const q = query.trim().toLowerCase();
  return list.filter((r) => {
    if (dateFilter && r.booking_date !== dateFilter) return false;
    if (status !== "all" && r.status !== status) return false;
    if (!q) return true;
    return (
      r.client_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.service.toLowerCase().includes(q)
    );
  });
}

export function getDashboardStats(reservations: Reservation[]) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const today = getTodayLocal();

  const thisMonth = reservations.filter(
    (r) => new Date(r.created_at) >= startOfMonth,
  ).length;

  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;

  const upcoming = reservations
    .filter(
      (r) =>
        r.booking_date >= today &&
        (r.status === "pending" || r.status === "confirmed"),
    )
    .sort((a, b) =>
      `${a.booking_date}${a.booking_time}`.localeCompare(
        `${b.booking_date}${b.booking_time}`,
      ),
    )
    .slice(0, 5);

  return { thisMonth, pending, confirmed, upcoming, total: reservations.length };
}
