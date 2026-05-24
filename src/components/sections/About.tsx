"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { brand, type AboutTabId } from "@/lib/data";
import { useLocale } from "@/context/LocaleProvider";
import { tabTransition } from "@/lib/motion";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { LuxuryTabs } from "@/components/ui/LuxuryTabs";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  const { t } = useLocale();
  const [active, setActive] = useState<AboutTabId>("me");
  const tabs = t.about.tabs.map((tab) => ({ id: tab.id, label: tab.label }));
  const current = t.about.tabs.find((tab) => tab.id === active)!;

  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={t.about.label}
          title={t.about.title}
          description={t.about.description}
        />

        <LuxuryTabs tabs={tabs} active={active} onChange={setActive} className="mt-8 sm:mt-12" />

        <div className="mt-10 grid items-start gap-8 sm:mt-14 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-24 lg:max-w-none">
            <div className="boom-border relative aspect-[4/5] max-h-[min(70vh,520px)] overflow-hidden rounded-2xl sm:max-h-none sm:rounded-[2rem]">
              <ImageWithSkeleton
                src={brand.aboutImage}
                alt={`${brand.name} — ${t.brand.proTitle}`}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover object-[center_22%] saturate-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080608]/80 via-[#080608]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <p className="text-[9px] tracking-[0.24em] uppercase text-[#e8b4bc] sm:text-[10px] sm:tracking-[0.28em]">
                  {t.brand.proTitle}
                </p>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8] sm:mt-2 sm:text-4xl">
                  {brand.name}
                </p>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -top-2 -right-2 rounded-full border border-[#e8b4bc]/40 bg-[#1a1014]/95 px-3 py-1.5 sm:-top-3 sm:-right-3 sm:px-4 sm:py-2"
            >
              <span className="text-[8px] font-medium tracking-[0.2em] uppercase text-[#c9a87c] sm:text-[9px] sm:tracking-[0.25em]">
                {t.about.proBadge}
              </span>
            </div>
          </div>

          <div className="min-h-[280px] sm:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={tabTransition}
                className="glass-panel-strong rounded-2xl p-6 sm:rounded-[2rem] sm:p-10"
              >
                <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,5vw,2.75rem)] font-light leading-tight text-[#f7efe8]">
                  {current.title}
                </h3>
                <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-5">
                  {current.content.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="text-sm leading-relaxed text-[#b8a8ac] sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                  {current.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[#e8b4bc]/25 bg-[#e8b4bc]/10 px-3 py-1.5 text-[9px] tracking-[0.12em] uppercase text-[#e8d8dc] sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.15em]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
