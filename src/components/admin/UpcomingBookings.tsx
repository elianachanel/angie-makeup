"use client";

import { motion } from "framer-motion";
import { formatBookingDate, formatTime, statusColors, statusLabels } from "@/lib/admin-utils";
import { fadeUp, stagger } from "@/lib/motion";
import type { Reservation } from "@/types/database";

type Props = {
  reservations: Reservation[];
  serviceTitles: Record<string, string>;
};

export function UpcomingBookings({ reservations, serviceTitles }: Props) {
  if (reservations.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center text-sm text-[#6a5c60]">
        No hay reservas próximas.
      </div>
    );
  }

  return (
    <motion.ul variants={stagger} initial="hidden" animate="show" className="space-y-3">
      {reservations.map((r) => (
        <motion.li
          key={r.id}
          variants={fadeUp}
          className="glass-panel flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="font-medium text-[#f7efe8]">{r.client_name}</p>
            <p className="text-xs text-[#a89a9e]">
              {serviceTitles[r.service] ?? r.service} · {formatBookingDate(r.booking_date)}{" "}
              {formatTime(r.booking_time)}
            </p>
          </div>
          <span
            className={`shrink-0 self-start rounded-full border px-3 py-1 text-[10px] tracking-wide uppercase ${statusColors[r.status]}`}
          >
            {statusLabels[r.status]}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
