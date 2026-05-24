"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useLocale } from "@/context/LocaleProvider";
import { useServices } from "@/hooks/useServices";
import { fadeUp, inView, stagger } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";

export function Services() {
  const { t } = useLocale();
  const { services, loading } = useServices();

  const items = useMemo(() => {
    if (services.length > 0) {
      return services.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        price: s.price,
        features: [s.duration],
        image: s.image,
      }));
    }
    return t.services.items.map((s) => ({
      ...s,
      image: null as string | null,
    }));
  }, [services, t.services.items]);

  return (
    <section
      id="services"
      className="section-pad border-y border-white/[0.04] bg-[#0c090b]/50"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={t.services.label}
          title={t.services.title}
          description={t.services.description}
        />

        {loading && services.length === 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6"
          >
            {items.map((service) => (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-200 sm:rounded-[1.75rem] sm:p-8 sm:hover:shadow-[0_20px_60px_rgba(232,180,188,0.15)] sm:hover:ring-1 sm:hover:ring-[#e8b4bc]/20"
              >
                {service.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.image}
                    alt=""
                    className="mb-5 -mx-2 -mt-2 h-40 w-[calc(100%+1rem)] rounded-xl object-cover sm:h-44"
                  />
                ) : null}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#e8b4bc]/10 blur-3xl transition group-hover:bg-[#e8b4bc]/20"
                />
                <p className="section-label !text-[#c9a87c]">{service.price}</p>
                <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#f7efe8]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#a89a9e]">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-white/[0.06] pt-6">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs tracking-wide text-[#c4b4b8]"
                    >
                      <span className="text-[#e8b4bc]">◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
