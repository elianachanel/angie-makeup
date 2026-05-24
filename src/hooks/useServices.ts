"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/types/database";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (err) {
      setError(err.message);
      setServices([]);
    } else {
      setServices((data as Service[]) ?? []);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}
