# Angie Makeup — Luxury Portfolio

Ultra-premium makeup artist portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (auth, database, realtime)

## Development

```bash
npm install
cp .env.example .env.local
# Completa las variables de Supabase y WhatsApp
npm run dev
```

- Sitio público: [http://localhost:3000](http://localhost:3000)
- Panel admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Ver configuración de Supabase en [`supabase/README.md`](supabase/README.md).

## Deploy on Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables from `.env.example`
4. Run the SQL migration in your Supabase project

## Admin dashboard

- Overview, reservations (filter, search, status, realtime)
- Service management (CRUD)
- Secure login via Supabase Auth + `admins` table

## Customize

- **Brand & contact:** `src/lib/data.ts`
- **Colors & glass styles:** `src/app/globals.css`
- **Services & bookings:** Supabase admin panel or `services` table
