"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleProvider";
import { fadeUp, inView, stagger } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Testimonials() {
  const { t } = useLocale();

  return (
    <section id="testimonials" className="section-pad bg-[#0c090b]/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={t.testimonials.label}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-6 sm:mt-16 md:grid-cols-3"
        >
          {t.testimonials.items.map((item) => (
            <motion.blockquote
              key={item.name}
              variants={fadeUp}
              className="glass-panel flex h-full flex-col rounded-2xl p-6 sm:rounded-[1.75rem] sm:p-8"
            >
              <div className="flex gap-1 text-[#c9a87c]" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-[#d4c4c8]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-white/[0.06] pt-6">
                <p className="font-[family-name:var(--font-cormorant)] text-xl text-[#f7efe8]">
                  {item.name}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                  {item.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
