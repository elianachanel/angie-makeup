"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { brand } from "@/lib/data";
import { useLocale } from "@/context/LocaleProvider";
import { fadeUp, inView, stagger } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const { t, locale } = useLocale();
  const c = t.contact;
  const [sent, setSent] = useState(false);

  const channels = [
    { label: "Instagram", href: brand.instagram, handle: brand.instagramHandle },
    { label: "WhatsApp", href: brand.whatsapp, handle: c.whatsapp },
    { label: "Email", href: `mailto:${brand.email}`, handle: brand.email },
  ];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const fieldClass =
    "w-full min-h-[48px] rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-[#f7efe8] outline-none transition placeholder:text-[#6a5c60] focus:border-[#e8b4bc]/40";

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={c.label}
          title={c.title}
          description={t.brand.location}
        />

        <div className="mt-10 grid gap-10 sm:mt-16 lg:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="space-y-4"
          >
            {channels.map((ch) => (
              <motion.div key={ch.label} variants={fadeUp}>
                <Link
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel flex items-center justify-between rounded-2xl px-6 py-5 transition hover:border-[#e8b4bc]/30"
                >
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                      {ch.label}
                    </p>
                    <p className="mt-1 text-[#f7efe8]">{ch.handle}</p>
                  </div>
                  <span className="text-[#e8b4bc]">→</span>
                </Link>
              </motion.div>
            ))}
            <motion.p variants={fadeUp} className="pt-4 text-sm text-[#8a7a7e]">
              {locale === "es" ? "Teléfono" : "Phone"}:{" "}
              <a href={`tel:${brand.phone}`} className="text-[#e8b4bc] hover:underline">
                {brand.phone}
              </a>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            className="glass-panel-strong rounded-[2rem] p-6 sm:p-8"
          >
            {sent ? (
              <div className="py-12 text-center">
                <p className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f7efe8]">
                  {c.successTitle}
                </p>
                <p className="mt-3 text-sm text-[#a89a9e]">{c.successBody}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                    {c.fields.name}
                  </label>
                  <input
                    required
                    className={fieldClass}
                    placeholder={c.placeholders.name}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                    {c.fields.email}
                  </label>
                  <input
                    required
                    type="email"
                    className={fieldClass}
                    placeholder={c.placeholders.email}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">
                    {c.fields.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className={`${fieldClass} resize-none`}
                    placeholder={c.placeholders.message}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {c.submit}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
