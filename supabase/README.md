# Supabase setup — Angie Makeup

## 1. Crear proyecto

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto.
2. En **SQL Editor**, ejecuta el contenido de `migrations/001_initial_schema.sql`.

## 2. Variables de entorno

Copia `.env.example` a `.env.local` y completa:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

En **Vercel** → Project → Settings → Environment Variables, añade las mismas.

## 3. Crear administrador

1. **Authentication** → **Users** → **Add user** (email + contraseña).
2. En **SQL Editor**, vincula el usuario a la tabla `admins`:

```sql
INSERT INTO public.admins (email, role, user_id)
VALUES (
  'tu-email@ejemplo.com',
  'admin',
  (SELECT id FROM auth.users WHERE email = 'tu-email@ejemplo.com')
);
```

## 4. Realtime (reservas en vivo)

En **Database** → **Replication**, activa la tabla `reservations` para `supabase_realtime`.

## 5. Acceso al panel

- URL local: `http://localhost:3000/admin/login`
- Producción: `https://tu-dominio.vercel.app/admin/login`
