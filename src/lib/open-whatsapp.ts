/** Abre WhatsApp; en móvil window.open tras un await suele bloquearse. */
export function openWhatsAppUrl(url: string): "navigated" | "popup" | "blocked" {
  if (typeof window === "undefined") return "blocked";

  const isMobile =
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    window.location.assign(url);
    return "navigated";
  }

  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.assign(url);
    return "navigated";
  }
  return "popup";
}
