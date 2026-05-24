"use client";

import { useLocale } from "@/context/LocaleProvider";
import type { Locale } from "@/i18n/locales";

const options: { id: Locale; label: string }[] = [
  { id: "es", label: "ES" },
  { id: "en", label: "EN" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`inline-flex rounded-full border border-white/10 bg-[#1a1014]/80 p-0.5 ${className}`}
    >
      {options.map((opt) => {
        const active = locale === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              if (!active) setLocale(opt.id);
            }}
            className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.15em] transition sm:px-3 ${
              active
                ? "bg-gradient-to-r from-[#f5d5dc] via-[#e8b4bc] to-[#c9a87c] text-[#1a0f14]"
                : "text-[#8a7a7e] hover:text-[#f7efe8]"
            }`}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
