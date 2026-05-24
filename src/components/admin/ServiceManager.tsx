"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteService, upsertService } from "@/lib/actions/services";
import { fadeUp } from "@/lib/motion";
import type { Service } from "@/types/database";
import { Skeleton } from "@/components/ui/Skeleton";

const emptyForm = {
  id: "",
  title: "",
  description: "",
  price: "",
  duration: "2–3 h",
  image: "",
  sort_order: 0,
};

type Props = {
  services: Service[];
  loading?: boolean;
  onSaved: () => void;
};

export function ServiceManager({ services, loading, onSaved }: Props) {
  const [editing, setEditing] = useState<typeof emptyForm | null>(null);
  const [pending, startTransition] = useTransition();

  const openNew = () => setEditing({ ...emptyForm });
  const openEdit = (s: Service) =>
    setEditing({
      id: s.id,
      title: s.title,
      description: s.description,
      price: s.price,
      duration: s.duration,
      image: s.image ?? "",
      sort_order: s.sort_order,
    });

  const save = () => {
    if (!editing?.id.trim() || !editing.title.trim()) return;
    startTransition(async () => {
      await upsertService({
        id: editing.id,
        title: editing.title,
        description: editing.description,
        price: editing.price,
        duration: editing.duration,
        image: editing.image || null,
        sort_order: editing.sort_order,
      });
      setEditing(null);
      onSaved();
    });
  };

  const remove = (id: string) => {
    if (!confirm("¿Eliminar este servicio?")) return;
    startTransition(async () => {
      await deleteService(id);
      onSaved();
    });
  };

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={openNew}
        className="rounded-full bg-gradient-to-r from-[#e8b4bc] via-[#d4a0a8] to-[#c9a87c] px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase text-[#1a0f14]"
      >
        + Nuevo servicio
      </button>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <motion.article
            key={s.id}
            layout
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="glass-panel overflow-hidden rounded-2xl"
          >
            {s.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.image} alt="" className="h-36 w-full object-cover" />
            ) : (
              <div className="h-24 bg-gradient-to-br from-[#e8b4bc]/10 to-transparent" />
            )}
            <div className="p-5">
              <p className="text-[10px] tracking-wide text-[#c9a87c]">{s.price}</p>
              <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8]">
                {s.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-[#a89a9e]">{s.description}</p>
              <p className="mt-1 text-xs text-[#6a5c60]">{s.duration}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(s)}
                  className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase text-[#f7efe8]"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => remove(s.id)}
                  className="rounded-full px-4 py-2 text-[10px] uppercase text-red-300/80"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {editing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel-strong max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl p-6"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8]">
                {editing.id && services.some((s) => s.id === editing.id)
                  ? "Editar servicio"
                  : "Nuevo servicio"}
              </h3>
              <div className="mt-5 space-y-4">
                {(
                  [
                    { key: "id" as const, label: "ID (slug)", editable: !services.some((s) => s.id === editing.id) },
                    { key: "title" as const, label: "Título", editable: true },
                    { key: "price" as const, label: "Precio", editable: true },
                    { key: "duration" as const, label: "Duración", editable: true },
                    { key: "image" as const, label: "URL imagen", editable: true },
                  ] as const
                ).map(({ key, label, editable }) => (
                  <div key={key}>
                    <label className="mb-1 block text-[10px] uppercase tracking-wide text-[#8a7a7e]">
                      {label}
                    </label>
                    <input
                      disabled={!editable}
                      value={editing[key]}
                      onChange={(e) =>
                        setEditing({ ...editing, [key]: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-[#f7efe8] disabled:opacity-50"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-1 block text-[10px] uppercase tracking-wide text-[#8a7a7e]">
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-[#f7efe8]"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={save}
                  disabled={pending}
                  className="flex-1 rounded-full bg-[#e8b4bc] py-3 text-xs uppercase tracking-wide text-[#1a0f14]"
                >
                  {pending ? "Guardando…" : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-full border border-white/10 px-6 py-3 text-xs uppercase text-[#a89a9e]"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
