"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, Suspense } from "react";
import { signInAdmin } from "@/lib/actions/auth";
import { fadeUp } from "@/lib/motion";

function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(signInAdmin, null);
  const searchParams = useSearchParams();
  const configMissing = searchParams.get("config") === "missing";

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#080608] px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#e8b4bc]/15 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#c9a87c]/10 blur-[90px]"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="glass-panel-strong relative z-10 w-full max-w-md rounded-[2rem] p-8 sm:p-10"
      >
        <motion.div variants={fadeUp}>
          <p className="section-label">Angie Makeup</p>
          <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#f7efe8]">
            Panel admin
          </h1>
          <p className="mt-2 text-sm text-[#a89a9e]">
            Acceso exclusivo para administradores.
          </p>
        </motion.div>

        <motion.form variants={fadeUp} action={formAction} className="mt-8 space-y-4">
          {configMissing ? (
            <p className="rounded-xl border border-[#c9a87c]/30 bg-[#c9a87c]/10 px-4 py-3 text-sm text-[#f7efe8]">
              Falta configurar Supabase en Vercel: añade las 3 variables de entorno y
              haz Redeploy.
            </p>
          ) : null}
          {state?.error ? (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {state.error}
            </p>
          ) : null}
          <div>
            <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-[#f7efe8] outline-none focus:border-[#e8b4bc]/40"
              placeholder="admin@ejemplo.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-[#f7efe8] outline-none focus:border-[#e8b4bc]/40"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-gradient-to-r from-[#e8b4bc] via-[#d4a0a8] to-[#c9a87c] py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#1a0f14] disabled:opacity-60"
          >
            {pending ? "Entrando…" : "Iniciar sesión"}
          </button>
        </motion.form>

        <motion.p variants={fadeUp} className="mt-6 text-center text-xs text-[#6a5c60]">
          <Link href="/" className="text-[#e8b4bc] hover:underline">
            ← Volver al sitio
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
