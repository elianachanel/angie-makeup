"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceManager } from "@/components/admin/ServiceManager";
import { useServices } from "@/hooks/useServices";

export default function AdminServicesPage() {
  const { services, loading, refetch } = useServices();

  return (
    <AdminShell
      title="Servicios"
      subtitle="Añade, edita o elimina los servicios del sitio público."
    >
      <ServiceManager services={services} loading={loading} onSaved={refetch} />
    </AdminShell>
  );
}
