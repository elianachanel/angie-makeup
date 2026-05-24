"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { ReservationsTable } from "@/components/admin/ReservationsTable";
import { useReservations } from "@/hooks/useReservations";
import { useServices } from "@/hooks/useServices";

export default function AdminReservationsPage() {
  const { reservations, loading } = useReservations();
  const { services } = useServices();
  const serviceTitles = Object.fromEntries(services.map((s) => [s.id, s.title]));

  return (
    <AdminShell
      title="Reservas"
      subtitle="Gestiona, confirma o rechaza solicitudes en tiempo real."
    >
      <ReservationsTable
        reservations={reservations}
        serviceTitles={serviceTitles}
        loading={loading}
      />
    </AdminShell>
  );
}
