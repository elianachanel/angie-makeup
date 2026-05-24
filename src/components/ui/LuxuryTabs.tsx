"use client";

import { motion } from "framer-motion";
import { springFast } from "@/lib/motion";

export type TabItem<T extends string> = {
  id: T;
  label: string;
};

type Props<T extends string> = {
  tabs: TabItem<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
};

export function LuxuryTabs<T extends string>({
  tabs,
  active,
  onChange,
  className = "",
}: Props<T>) {
  return (
    <div
      className={`tabs-scroll -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0 ${className}`}
    >
      <div
        className="flex w-max min-w-full justify-start gap-2 sm:w-auto sm:flex-wrap sm:justify-center sm:gap-3"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`relative shrink-0 overflow-hidden rounded-full px-4 py-3 text-[10px] font-medium tracking-[0.18em] uppercase transition sm:px-6 sm:text-[11px] ${
                isActive
                  ? "text-[#1a0f14]"
                  : "border border-white/[0.1] bg-white/[0.03] text-[#b8a8ac] hover:border-[#e8b4bc]/30 hover:text-[#f7efe8]"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="luxury-tab-pill"
                  className="absolute inset-0 bg-gradient-to-r from-[#f5d5dc] via-[#e8b4bc] to-[#c9a87c]"
                  transition={springFast}
                />
              ) : null}
              <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
