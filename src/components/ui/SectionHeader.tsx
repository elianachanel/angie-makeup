"use client";

import { motion } from "framer-motion";
import { fadeUp, inView, stagger } from "@/lib/motion";

type Props = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: Props) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`max-w-2xl ${alignClass}`}
    >
      <motion.p variants={fadeUp} className="section-label">
        {label}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="mt-4 font-[family-name:var(--font-cormorant)] text-[clamp(2.25rem,6vw,3.75rem)] font-light leading-[1.08] tracking-tight text-[#f7efe8]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className="mt-5 text-base leading-relaxed text-[#a89a9e] sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
