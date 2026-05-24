export const easeLuxury = [0.22, 1, 0.36, 1] as const;

/** Animaciones cortas — scroll fluido, sin sensación de “peso” */
export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: easeLuxury },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.18, ease: easeLuxury },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: easeLuxury },
  },
};

export const inView = {
  once: true,
  amount: 0.08,
  margin: "0px 0px -20px 0px",
} as const;

export const tabTransition = {
  duration: 0.15,
  ease: easeLuxury,
} as const;

export const springFast = {
  type: "spring" as const,
  stiffness: 680,
  damping: 38,
};
