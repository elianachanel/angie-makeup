"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "rose" | "gold" | "champagne";
};

const accents = {
  rose: "from-[#e8b4bc]/20 to-transparent border-[#e8b4bc]/20",
  gold: "from-[#c9a87c]/20 to-transparent border-[#c9a87c]/20",
  champagne: "from-white/10 to-transparent border-white/10",
};

export function StatCard({ label, value, hint, accent = "rose" }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      className={`glass-panel relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 sm:p-6 ${accents[accent]}`}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a7e]">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#f7efe8] sm:text-4xl">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-[#6a5c60]">{hint}</p> : null}
    </motion.div>
  );
}
