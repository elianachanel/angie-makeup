"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  deleteReservation,
  updateReservationStatus,
} from "@/lib/actions/reservations";
import {
  filterReservations,
  formatBookingDate,
  formatTime,
  statusColors,
  statusLabels,
} from "@/lib/admin-utils";
import { fadeUp, stagger } from "@/lib/motion";
import type { Reservation, ReservationStatus } from "@/types/database";
import { Skeleton } from "@/components/ui/Skeleton";

const statuses: (ReservationStatus | "all")[] = [
  "all",
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

type Props = {
  reservations: Reservation[];
  serviceTitles: Record<string, string>;
  loading?: boolean;
};

export function ReservationsTable({ reservations, serviceTitles, loading }: Props) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () => filterReservations(reservations, query, statusFilter),
    [reservations, query, statusFilter],
  );

  const handleStatus = (id: string, status: ReservationStatus) => {
    startTransition(async () => {
      await updateReservationStatus(id, status);
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`¿Eliminar la reserva de ${name}?`)) return;
    startTransition(async () => {
      await deleteReservation(id);
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Buscar por nombre, email, teléfono..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="glass-panel min-h-[44px] flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-[#f7efe8] outline-none focus:border-[#e8b4bc]/40"
        />
        <div className="tabs-scroll flex gap-2 overflow-x-auto pb-1">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`shrink-0 rounded-full px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition ${
                statusFilter === s
                  ? "bg-[#e8b4bc]/20 text-[#f7efe8] ring-1 ring-[#e8b4bc]/30"
                  : "text-[#8a7a7e] hover:text-[#f7efe8]"
              }`}
            >
              {s === "all" ? "Todas" : statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {pending ? (
        <p className="text-xs text-[#e8b4bc]">Actualizando…</p>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#6a5c60]">Sin resultados.</p>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
          {filtered.map((r) => (
            <motion.article
              key={r.id}
              variants={fadeUp}
              className="glass-panel-strong rounded-2xl p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg text-[#f7efe8]">{r.client_name}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase ${statusColors[r.status]}`}
                    >
                      {statusLabels[r.status]}
                    </span>
                  </div>
                  <p className="text-sm text-[#a89a9e]">
                    {serviceTitles[r.service] ?? r.service}
                  </p>
                  <p className="text-sm text-[#c4b4b8]">
                    {formatBookingDate(r.booking_date)} · {formatTime(r.booking_time)}
                  </p>
                  <p className="text-xs text-[#6a5c60]">
                    {r.email} · {r.phone}
                  </p>
                  {r.message ? (
                    <p className="mt-2 text-sm italic text-[#8a7a7e]">&ldquo;{r.message}&rdquo;</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4 sm:flex sm:flex-wrap lg:max-w-xs lg:shrink-0 lg:flex-col lg:border-0 lg:pt-0">
                  {r.status === "pending" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleStatus(r.id, "confirmed")}
                        className="min-h-[44px] rounded-xl bg-[#e8b4bc]/20 px-3 py-2.5 text-[10px] tracking-wide uppercase text-[#f7efe8] ring-1 ring-[#e8b4bc]/30 sm:rounded-full"
                      >
                        Confirmar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatus(r.id, "cancelled")}
                        className="min-h-[44px] rounded-xl px-3 py-2.5 text-[10px] tracking-wide uppercase text-[#a89a9e] ring-1 ring-white/[0.08] hover:bg-red-500/10 hover:text-red-200 sm:rounded-full"
                      >
                        Rechazar
                      </button>
                    </>
                  ) : null}
                  {r.status === "confirmed" ? (
                    <button
                      type="button"
                      onClick={() => handleStatus(r.id, "completed")}
                      className="col-span-2 min-h-[44px] rounded-xl bg-emerald-500/15 px-3 py-2.5 text-[10px] tracking-wide uppercase text-emerald-200 sm:col-span-1 sm:rounded-full"
                    >
                      Completar
                    </button>
                  ) : null}
                  <select
                    value={r.status}
                    onChange={(e) =>
                      handleStatus(r.id, e.target.value as ReservationStatus)
                    }
                    className="col-span-2 min-h-[44px] rounded-xl border border-white/[0.08] bg-[#1a1014] px-3 py-2 text-xs text-[#f7efe8] sm:col-span-1"
                  >
                    {(Object.keys(statusLabels) as ReservationStatus[]).map((s) => (
                      <option key={s} value={s}>
                        {statusLabels[s]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id, r.client_name)}
                    className="col-span-2 min-h-[44px] rounded-xl px-3 py-2.5 text-[10px] tracking-wide uppercase text-red-300/80 ring-1 ring-red-500/20 hover:bg-red-500/10 sm:col-span-1 sm:rounded-full"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  );
}
