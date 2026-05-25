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

**Importante:** marca Production y Preview, guarda, y luego **Deployments → Redeploy**.
Sin redeploy, el admin dará error 500 (`MIDDLEWARE_INVOCATION_FAILED`).

Usa la clave **Publishable** (`sb_publishable_...`) como `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Si el login falla, en Supabase → API Keys prueba también la clave **anon** legacy (`eyJ...`).

## 3. Crear administrador

1. **Authentication** → **Users** → **Add user** (email + contraseña).
2. En **SQL Editor**, vincula el usuario a la tabla `admins` (mismo email exacto que en Users):

```sql
INSERT INTO public.admins (email, role, user_id)
VALUES (
  'tu-email@ejemplo.com',
  'admin',
  (SELECT id FROM auth.users WHERE lower(email) = lower('tu-email@ejemplo.com'))
);
```

### Si dice "No tienes permisos de administrador"

El usuario existe en **Authentication** pero falta en **admins**, el email no coincide, o falta ejecutar `004_admins_rls_by_user_id.sql`.

Debes entrar con el **mismo email** que en la tabla (ej. `adamesff23@gmail.com`).

Si cambiaste de correo, ejecuta `migrations/006_update_admin_email.sql` en SQL Editor.

En **Table Editor** → `admins` comprueba que haya una fila.

Si no hay fila, ejecuta el `INSERT` de arriba.

Si ya hay fila pero falla, ejecuta (cambia el email):

```sql
INSERT INTO public.admins (email, role, user_id)
SELECT lower(u.email), 'admin', u.id
FROM auth.users u
WHERE lower(u.email) = lower('tu-email@ejemplo.com')
ON CONFLICT (email) DO UPDATE
SET user_id = EXCLUDED.user_id, role = 'admin';
```

### Política RLS por user_id (recomendado)

Ejecuta también `migrations/004_admins_rls_by_user_id.sql` para que el login reconozca la fila por `user_id` de Auth.

## Evitar pausa del plan Free (7 días sin uso)

El proyecto incluye un **cron diario en Vercel** (`/api/cron/keep-alive`) que hace una consulta ligera a Supabase.

Tras cada deploy en Vercel:

1. El archivo `vercel.json` activa el cron automáticamente.
2. Opcional: en **Environment Variables** añade `CRON_SECRET` (Vercel puede generarlo). Sin esto, la ruta sigue funcionando; con secret, solo Vercel Cron puede llamarla.

Comprueba en Vercel → **Settings → Cron Jobs** que aparezca `keep-alive` programado cada día.

## Borrado automático de reservas (8 meses)

1. Ejecuta `migrations/005_purge_old_reservations.sql` en SQL Editor.
2. En Vercel añade **`SUPABASE_SERVICE_ROLE_KEY`** (clave **service_role** de Supabase, solo servidor).
3. Cron **`purge-reservations`**: el día **1 de cada mes** borra citas con `booking_date` de hace más de **8 meses**.

No subas la service_role a GitHub ni la pongas en `NEXT_PUBLIC_*`.

## 4. Realtime (reservas en vivo)

En **Database** → **Replication**, activa la tabla `reservations` para `supabase_realtime`.

## 5. Acceso al panel

- URL local: `http://localhost:3000/admin/login`
- Producción: `https://tu-dominio.vercel.app/admin/login`
