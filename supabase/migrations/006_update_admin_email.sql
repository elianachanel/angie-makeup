-- Actualizar email de administrador a adamesff23@gmail.com
-- Ejecutar después de crear el usuario en Authentication con ese email.

UPDATE public.admins
SET email = lower('adamesff23@gmail.com')
WHERE lower(email) = lower('angiemakeup@gmail.com');

INSERT INTO public.admins (email, role, user_id)
SELECT lower(u.email), 'admin', u.id
FROM auth.users u
WHERE lower(u.email) = lower('adamesff23@gmail.com')
ON CONFLICT (email) DO UPDATE
SET user_id = EXCLUDED.user_id, role = 'admin';
