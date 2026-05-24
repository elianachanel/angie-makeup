-- Angie Makeup: reservations, services, admins + RLS

CREATE TYPE public.reservation_status AS ENUM (
  'pending',
  'confirmed',
  'completed',
  'cancelled'
);

CREATE TABLE public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '2–3 h',
  image TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL REFERENCES public.services (id) ON DELETE RESTRICT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  message TEXT,
  status public.reservation_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX reservations_status_idx ON public.reservations (status);
CREATE INDEX reservations_booking_date_idx ON public.reservations (booking_date);
CREATE INDEX reservations_created_at_idx ON public.reservations (created_at DESC);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admins
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Services: public read, admin write
CREATE POLICY "services_select_public"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "services_insert_admin"
  ON public.services FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "services_update_admin"
  ON public.services FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "services_delete_admin"
  ON public.services FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Reservations: public insert, admin full access
CREATE POLICY "reservations_insert_public"
  ON public.reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "reservations_select_admin"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "reservations_update_admin"
  ON public.reservations FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "reservations_delete_admin"
  ON public.reservations FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Admins: read own row when authenticated
CREATE POLICY "admins_select_self"
  ON public.admins FOR SELECT
  TO authenticated
  USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- Seed default services
INSERT INTO public.services (id, title, description, price, duration, image, sort_order) VALUES
  ('bridal', 'Bridal Makeup', 'Timeless, camera-ready looks tailored to your skin, dress, and wedding aesthetic.', 'From $350', '3–4 h', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', 1),
  ('glam', 'Glam Makeup', 'Red-carpet glow with sculpted features, luminous skin, and high-impact finish.', 'From $220', '2–3 h', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80', 2),
  ('photoshoot', 'Editorial Makeup', 'Artistry for studio, campaigns, and creative direction with HD finish.', 'From $280', '2–4 h', 'https://images.unsplash.com/photo-1631730486572-226f1a990b87?w=800&q=80', 3),
  ('event', 'Event Makeup', 'Evening elegance for galas and special occasions — from sunset to last dance.', 'From $180', '2 h', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', 4)
ON CONFLICT (id) DO NOTHING;

-- Realtime: en Supabase Dashboard → Database → Replication → activar tabla "reservations"
