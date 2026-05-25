-- Vincular un usuario de Auth a admins (cambia el email)
INSERT INTO public.admins (email, role, user_id)
SELECT lower(u.email), 'admin', u.id
FROM auth.users u
WHERE lower(u.email) = lower('TU-EMAIL@ejemplo.com')
ON CONFLICT (email) DO UPDATE
SET user_id = EXCLUDED.user_id, role = 'admin';
