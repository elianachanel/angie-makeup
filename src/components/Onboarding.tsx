"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleProvider";

const DURATION_MS = 5500;

function MakeupBrushIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 120" fill="none" aria-hidden>
      <path
        d="M32 8c-6 0-10 5-10 11v28c0 4 2 8 6 10l4 52h0c2 0 4-2 4-4V57c4-2 6-6 6-10V19c0-6-4-11-10-11z"
        fill="url(#obBrushHandle)"
      />
      <ellipse cx="32" cy="14" rx="12" ry="8" fill="url(#obBrushBristle)" />
      <defs>
        <linearGradient id="obBrushHandle" x1="22" y1="8" x2="42" y2="110">
          <stop stopColor="#c9a87c" />
          <stop offset="1" stopColor="#8a6a4a" />
        </linearGradient>
        <linearGradient id="obBrushBristle" x1="20" y1="6" x2="44" y2="22">
          <stop stopColor="#f5d5dc" />
          <stop offset="1" stopColor="#e8b4bc" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LipstickIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 100" fill="none" aria-hidden>
      <rect x="14" y="45" width="20" height="48" rx="4" fill="#1a1014" stroke="#e8b4bc" strokeWidth="1" />
      <path d="M12 45h24l-4-20c-2-6-8-8-8-8s-6 2-8 8l-4 20z" fill="url(#obLipStick)" />
      <defs>
        <linearGradient id="obLipStick" x1="12" y1="17" x2="36" y2="45">
          <stop stopColor="#e8b4bc" />
          <stop offset="1" stopColor="#c97a8a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PaletteIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 80" fill="none" aria-hidden>
      <ellipse cx="50" cy="45" rx="42" ry="30" fill="#1a1014" stroke="rgba(232,180,188,0.4)" strokeWidth="1" />
      <circle cx="30" cy="38" r="8" fill="#f5d5dc" opacity="0.9" />
      <circle cx="50" cy="32" r="7" fill="#e8b4bc" />
      <circle cx="68" cy="40" r="8" fill="#c9a87c" opacity="0.85" />
      <circle cx="42" cy="50" r="6" fill="#c97a8a" opacity="0.8" />
      <circle cx="58" cy="52" r="5" fill="#d4a0a8" />
    </svg>
  );
}

export function Onboarding() {
  const { locale, t } = useLocale();
  const [phase, setPhase] = useState<"show" | "hide" | "done">("show");

  const skipLabel = locale === "es" ? "Saltar" : "Skip";

  const finish = useCallback(() => {
    setPhase("hide");
    window.setTimeout(() => setPhase("done"), 700);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(finish, DURATION_MS);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [finish]);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(phase === "show" || phase === "hide") && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "hide" ? 0 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="onboarding-screen fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#080608] px-3 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Angie Makeup"
        >
          <div className="noise-overlay fixed inset-0 opacity-60" aria-hidden />
          <div className="ambient-glow pointer-events-none fixed inset-0" aria-hidden />
          <div className="hero-veil pointer-events-none fixed inset-0" aria-hidden />

          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="onboarding-sparkle absolute rounded-full"
                style={{
                  left: `${(i * 13 + 5) % 95}%`,
                  bottom: "-5%",
                  animationDelay: `${(i % 8) * 0.15}s`,
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                }}
              />
            ))}
          </div>

          {/* Decoración — oculta en móvil muy pequeño para no saturar */}
          <motion.div
            className="pointer-events-none absolute left-[4%] top-[18%] hidden opacity-35 min-[400px]:block sm:left-[12%] sm:top-[20%] sm:opacity-40"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <LipstickIcon className="h-14 w-7 sm:h-20 sm:w-8" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute right-[4%] top-[22%] hidden opacity-30 min-[400px]:block sm:right-[10%] sm:opacity-35"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <PaletteIcon className="h-12 w-20 sm:h-16 sm:w-28" />
          </motion.div>

          <button
            type="button"
            onClick={finish}
            className="glass-panel absolute right-3 top-[max(0.5rem,env(safe-area-inset-top))] z-30 min-h-[44px] min-w-[44px] rounded-full px-4 py-3 text-[10px] font-medium tracking-[0.2em] uppercase text-[#c4b4b8] transition active:scale-95 sm:right-5"
          >
            {skipLabel}
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="boom-border glass-panel-strong relative z-10 flex w-full max-w-[min(100%,22rem)] max-h-[min(92dvh,640px)] flex-col justify-center overflow-hidden rounded-2xl px-5 py-7 sm:max-w-md sm:rounded-[2rem] sm:px-10 sm:py-11"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#e8b4bc]/20 blur-[50px] sm:h-40 sm:w-40"
            />

            {/* Rostro + maquillaje — escala en móvil */}
            <div className="relative mx-auto mb-5 h-[8.75rem] w-[8.75rem] shrink-0 sm:mb-8 sm:h-48 sm:w-48">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#3d2a32] via-[#2a1c22] to-[#1a1014] ring-1 ring-[#e8b4bc]/20" />
              <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-[#5c4048] via-[#4a3238] to-[#3a282e]" />
              <div className="onboarding-blush-left absolute left-[18%] top-[48%] h-6 w-8 rounded-full bg-[#e8b4bc]/50 blur-md sm:h-8 sm:w-10" />
              <div className="onboarding-blush-right absolute right-[18%] top-[48%] h-6 w-8 rounded-full bg-[#e8b4bc]/50 blur-md sm:h-8 sm:w-10" />
              <div className="onboarding-lips absolute bottom-[28%] left-1/2 h-2.5 w-11 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#c97a8a] via-[#e8b4bc] to-[#c97a8a] sm:h-3 sm:w-14" />
              <div className="onboarding-highlight absolute left-[28%] top-[32%] h-5 w-7 rounded-full bg-white/15 blur-sm sm:h-6 sm:w-8" />

              <motion.div
                className="absolute z-20"
                initial={{ x: -20, y: 50, rotate: -25, opacity: 0 }}
                animate={{
                  x: [-20, 40, 70, 40],
                  y: [50, 28, 42, 58],
                  rotate: [-25, 12, -8, 18],
                  opacity: [0, 1, 1, 0.5],
                }}
                transition={{
                  duration: 2.8,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.35, 0.65, 1],
                }}
              >
                <MakeupBrushIcon className="h-16 w-8 drop-shadow-[0_6px_20px_rgba(232,180,188,0.45)] sm:h-24 sm:w-10" />
              </motion.div>

              <svg className="onboarding-swatch absolute inset-0 h-full w-full" viewBox="0 0 176 176" aria-hidden>
                <path
                  className="onboarding-swatch-path"
                  d="M30 120 Q88 60 140 95"
                  stroke="url(#obSwatchGrad)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.55"
                />
                <defs>
                  <linearGradient id="obSwatchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop stopColor="#f5d5dc" stopOpacity="0" />
                    <stop offset="50%" stopColor="#e8b4bc" />
                    <stop offset="100%" stopColor="#c9a87c" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative shrink-0 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.45 }}
                className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#e8b4bc]/35 bg-[#e8b4bc]/10 px-3 py-1.5 sm:mb-4 sm:px-4 sm:py-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8b4bc]" />
                <span className="truncate text-[8px] font-semibold tracking-[0.22em] uppercase text-[#f7efe8] sm:text-[9px] sm:tracking-[0.28em]">
                  {t.brand.proTitle}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.25, duration: 0.5 }}
                className="font-[family-name:var(--font-cormorant)] text-[clamp(2.25rem,11vw,4rem)] font-light leading-none"
              >
                <span className="gradient-text-boom">Angie</span>
                <span className="text-[#f7efe8]">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.55, duration: 0.45 }}
                className="mt-1 font-[family-name:var(--font-cormorant)] text-xl italic text-[#e8b4bc]/90 sm:mt-2 sm:text-2xl"
              >
                Makeup
              </motion.p>
            </div>

            <div className="mt-5 shrink-0 h-px overflow-hidden rounded-full bg-white/[0.08] sm:mt-7">
              <div className="onboarding-progress h-full origin-left rounded-full bg-gradient-to-r from-[#e8b4bc] via-[#f5d5dc] to-[#c9a87c]" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
