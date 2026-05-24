"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOutAdmin } from "@/lib/actions/auth";

const links = [
  { href: "/admin", label: "Resumen", icon: "◈" },
  { href: "/admin/reservations", label: "Reservas", icon: "◇" },
  { href: "/admin/services", label: "Servicios", icon: "✦" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      <div className="mb-6 px-3 pt-2">
        <p className="section-label">Admin</p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8]">
          Angie Makeup
        </h2>
      </div>
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              active
                ? "bg-[#e8b4bc]/15 text-[#f7efe8] ring-1 ring-[#e8b4bc]/25"
                : "text-[#a89a9e] hover:bg-white/[0.04] hover:text-[#f7efe8]"
            }`}
          >
            <span className="text-[#e8b4bc]">{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
      <div className="mt-auto border-t border-white/[0.06] pt-4">
        <Link
          href="/"
          className="mb-2 block rounded-xl px-4 py-2.5 text-xs tracking-wide text-[#8a7a7e] hover:text-[#f7efe8]"
        >
          ← Ver sitio público
        </Link>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="w-full rounded-xl px-4 py-2.5 text-left text-xs tracking-wide text-[#e8b4bc] hover:bg-[#e8b4bc]/10"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] bg-[#0c090b]/80 lg:block">
        <div className="sticky top-0 flex h-screen flex-col">{nav}</div>
      </aside>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="glass-panel-strong fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <div className="flex h-full flex-col">{nav}</div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
