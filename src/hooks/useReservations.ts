"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Reservation } from "@/types/database";

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReservations(data as Reservation[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReservations();

    const supabase = createClient();
    const channel = supabase
      .channel("reservations-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        () => {
          fetchReservations();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchReservations]);

  return { reservations, loading, refetch: fetchReservations };
}
