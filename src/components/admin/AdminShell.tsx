"use client";

import { useState, type ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export function AdminShell({ children, title, subtitle }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-[100dvh] overflow-x-hidden bg-[#080608]">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-10">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMenuOpen(true)}
        />
        {children}
      </main>
    </div>
  );
}
