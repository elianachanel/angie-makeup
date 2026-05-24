"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const styles = {
  primary:
    "bg-gradient-to-r from-[#e8b4bc] via-[#d4a0a8] to-[#c9a87c] text-[#1a0f14] shadow-[0_12px_40px_rgba(232,180,188,0.35)]",
  outline:
    "border border-[rgba(255,230,235,0.35)] bg-white/[0.03] text-[#f7efe8] hover:bg-white/[0.06]",
  ghost: "text-[#e8b4bc] hover:text-[#f7efe8]",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled = false,
}: Props) {
  const classes = `inline-flex items-center justify-center rounded-full px-7 py-3.5 text-xs font-medium tracking-[0.18em] uppercase transition-colors disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 600, damping: 30 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
