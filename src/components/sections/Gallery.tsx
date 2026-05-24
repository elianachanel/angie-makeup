"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { GalleryCategoryId } from "@/lib/data";
import { useLocale } from "@/context/LocaleProvider";
import { tabTransition } from "@/lib/motion";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { LuxuryTabs } from "@/components/ui/LuxuryTabs";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Gallery() {
  const { t } = useLocale();
  const [active, setActive] = useState<GalleryCategoryId>("bridal");

  const tabs = t.galleryCategories.map((c) => ({ id: c.id, label: c.label }));
  const category = t.galleryCategories.find((c) => c.id === active)!;

  return (
    <section
      id="gallery"
      className="section-pad border-y border-white/[0.04] bg-[#0a0709]/80"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={t.gallery.label}
          title={t.gallery.title}
          description={t.gallery.description}
        />

        <LuxuryTabs tabs={tabs} active={active} onChange={setActive} className="mt-8 sm:mt-12" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={tabTransition}
            className="mt-8 sm:mt-10"
          >
            <p className="mb-6 text-center font-[family-name:var(--font-cormorant)] text-xl italic text-[#e8b4bc]/90 sm:mb-8 sm:text-3xl">
              {category.tagline}
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {category.images.map((img, index) => {
                const isFeatured = index === 0;
                return (
                  <figure
                    key={`${active}-${img.src}`}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl ${
                      isFeatured
                        ? "col-span-2 aspect-[4/3] max-h-[min(52vh,420px)] sm:max-h-none sm:aspect-auto sm:min-h-[380px] lg:row-span-2"
                        : "aspect-[3/4]"
                    }`}
                  >
                    <ImageWithSkeleton
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width:1024px) 100vw, 50vw"
                          : "(max-width:640px) 50vw, 25vw"
                      }
                      className="object-cover sm:transition sm:duration-300 sm:group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080608]/90 via-[#080608]/25 to-transparent opacity-70 sm:opacity-60" />
                    <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <span className="text-[8px] tracking-[0.18em] uppercase text-[#e8b4bc] sm:text-[9px] sm:tracking-[0.2em]">
                        {category.label}
                      </span>
                      <p className="mt-0.5 line-clamp-2 text-xs text-[#f7efe8] sm:mt-1 sm:text-sm">
                        {img.alt}
                      </p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
