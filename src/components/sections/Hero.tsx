"use client";

import { brand } from "@/lib/data";
import { useLocale } from "@/context/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

export function Hero() {
  const { t } = useLocale();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(6.5rem,env(safe-area-inset-top)+4.5rem)] sm:pb-20 sm:pt-32"
    >
      <div className="absolute inset-0 -z-20">
        <ImageWithSkeleton
          src={brand.heroImage}
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center saturate-[1.05] brightness-[1.02]"
        />
        <div className="absolute inset-0 bg-[#1a1014]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080608]/75 via-[#080608]/20 to-[#080608]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080608] via-transparent to-[#080608]/30" />
        <div className="pointer-events-none absolute inset-0 bg-[#e8b4bc]/5 mix-blend-soft-light" />
      </div>

      <div className="hero-veil pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="hero-enter relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#e8b4bc]/40 bg-[#1a1014]/70 px-4 py-2 sm:mb-6 sm:gap-3 sm:px-5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#e8b4bc] shadow-[0_0_12px_#e8b4bc]" />
          <span className="truncate text-[9px] font-semibold tracking-[0.22em] uppercase text-[#f7efe8] sm:text-[10px] sm:tracking-[0.28em]">
            {t.hero.badge}
          </span>
        </div>

        <h1 className="max-w-5xl font-[family-name:var(--font-cormorant)] text-[clamp(2.75rem,10.5vw,7rem)] font-light leading-[0.95] tracking-tight">
          <span className="gradient-text-boom block">{t.hero.line1}</span>
          <span className="text-[#f7efe8]">{t.hero.line2}</span>
          <span className="mt-1 block text-[clamp(1.25rem,3.8vw,2.5rem)] italic text-[#e8b4bc]/90 sm:mt-2">
            {t.hero.line3}
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-[#d4c4c8] sm:mt-8 sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href="#booking" className="w-full sm:w-auto">
            {t.hero.ctaBook}
          </Button>
          <Button href="#gallery" variant="outline" className="w-full sm:w-auto">
            {t.hero.ctaGallery}
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-8 sm:mt-14 sm:max-w-lg sm:gap-4 sm:pt-10">
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-[family-name:var(--font-cormorant)] text-xl text-[#e8b4bc] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[8px] leading-tight tracking-[0.14em] uppercase text-[#8a7a7e] sm:mt-1 sm:text-[9px] sm:tracking-[0.2em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
