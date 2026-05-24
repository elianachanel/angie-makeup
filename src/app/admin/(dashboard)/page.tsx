"use client";

import { motion } from "framer-motion";
import { StatCard } from "@/components/admin/StatCard";
import { AdminShell } from "@/components/admin/AdminShell";
import { UpcomingBookings } from "@/components/admin/UpcomingBookings";
import { useReservations } from "@/hooks/useReservations";
import { useServices } from "@/hooks/useServices";
import { getDashboardStats } from "@/lib/admin-utils";
import { stagger } from "@/lib/motion";

export default function AdminDashboardPage() {
  const { reservations, loading } = useReservations();
  const { services } = useServices();

  const serviceTitles = Object.fromEntries(services.map((s) => [s.id, s.title]));
  const stats = getDashboardStats(reservations);

  return (
    <AdminShell
      title="Resumen"
      subtitle="Vista general de reservas y actividad."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard label="Total reservas" value={stats.total} accent="champagne" />
        <StatCard
          label="Este mes"
          value={stats.thisMonth}
          hint="Nuevas solicitudes"
          accent="gold"
        />
        <StatCard
          label="Pendientes"
          value={stats.pending}
          hint="Requieren acción"
          accent="rose"
        />
        <StatCard
          label="Confirmadas"
          value={stats.confirmed}
          hint="Próximas sesiones"
          accent="rose"
        />
      </motion.div>

      <section className="mt-10">
        <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8]">
          Próximas citas
        </h2>
        {loading ? (
          <p className="text-sm text-[#6a5c60]">Cargando…</p>
        ) : (
          <UpcomingBookings
            reservations={stats.upcoming}
            serviceTitles={serviceTitles}
          />
        )}
      </section>
    </AdminShell>
  );
}
