-- Limpieza automática: reservas pasadas (booking_date de la cita) anterior a 8 meses
-- La ejecuta el cron de Vercel con service_role (ver /api/cron/purge-reservations)

CREATE OR REPLACE FUNCTION public.purge_old_reservations(retention_months INT DEFAULT 8)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INT;
  cutoff DATE;
BEGIN
  cutoff := (CURRENT_DATE - make_interval(months => retention_months))::DATE;

  DELETE FROM public.reservations
  WHERE booking_date < cutoff;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

REVOKE ALL ON FUNCTION public.purge_old_reservations(INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.purge_old_reservations(INT) TO service_role;
