"use client";

import Link from "next/link";
import { brand } from "@/lib/data";
import { useLocale } from "@/context/LocaleProvider";

export function Footer() {
  const { t } = useLocale();

  const social = [
    { label: brand.instagramHandle, href: brand.instagram },
    { label: t.floating.whatsapp, href: brand.whatsapp },
    { label: t.floating.email, href: `mailto:${brand.email}` },
  ];

  return (
    <footer className="border-t border-white/[0.06] px-4 py-14 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8]">
            {brand.name}
          </p>
          <p className="mt-2 text-xs tracking-[0.2em] uppercase text-[#8a7a7e]">
            {t.brand.tagline}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {social.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.2em] uppercase text-[#a89a9e] transition hover:text-[#e8b4bc]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-[11px] text-[#6a5c60]">
        © {new Date().getFullYear()} {brand.name}. {t.footer.crafted}
      </p>
    </footer>
  );
}
