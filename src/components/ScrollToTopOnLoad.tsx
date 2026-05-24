"use client";

import { useEffect } from "react";

/** Al recargar o entrar al sitio, empieza siempre arriba (Hero). */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const id = hash.slice(1);
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
      });
      return;
    }

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}
