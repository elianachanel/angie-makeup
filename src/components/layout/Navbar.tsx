"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navHrefs } from "@/lib/data";
import { useLocale } from "@/context/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navbar() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  const links = [
    { label: t.nav.about, href: navHrefs.about },
    { label: t.nav.services, href: navHrefs.services },
    { label: t.nav.gallery, href: navHrefs.gallery },
    { label: t.nav.book, href: navHrefs.book },
    { label: t.nav.reviews, href: navHrefs.reviews },
    { label: t.nav.contact, href: navHrefs.contact },
  ];

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-3 transition-all duration-200 sm:px-6 ${
          scrolled ? "glass-panel-strong shadow-lg" : "bg-transparent"
        }`}
      >
        <Link
          href={navHrefs.top}
          className="shrink-0 font-[family-name:var(--font-cormorant)] text-xl font-medium tracking-wide text-[#f7efe8] sm:text-2xl"
        >
          Angie<span className="text-[#e8b4bc]">.</span>
          <span className="ml-2 hidden text-[9px] tracking-[0.2em] uppercase text-[#8a7a7e] sm:inline">
            Pro
          </span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#c4b4b8] transition hover:text-[#f7efe8]"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button href={navHrefs.book} variant="primary" className="!px-5 !py-2.5 !text-[10px]">
            {t.nav.bookNow}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 text-[#f7efe8]"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path
                d={open ? "M2 2L16 12M16 2L2 12" : "M1 1H17M1 7H17M1 13H17"}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden lg:hidden"
          >
            <div className="glass-panel-strong flex flex-col gap-1 rounded-3xl p-3">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block min-h-[44px] rounded-2xl px-4 py-3.5 text-sm tracking-wide text-[#e8d8dc] hover:bg-white/[0.04]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button href={navHrefs.book} className="mt-2 w-full">
                {t.nav.bookNow}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
