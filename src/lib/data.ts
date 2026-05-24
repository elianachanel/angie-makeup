import type { Locale } from "@/i18n/locales";
import { localeContent } from "@/i18n/translations";

export const brand = {
  name: "Angie Makeup",
  email: "hello@angiemakeup.com",
  phone: "+1 (555) 000-0000",
  whatsapp: "https://wa.me/15550000000",
  instagram: "https://www.instagram.com/angiiemakeupp/",
  instagramHandle: "@angiiemakeupp",
  /** Hero: productos de maquillaje sobre fondo rosa — flat lay aesthetic */
  heroImage:
    "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=1920&q=90",
  aboutImage: "/about.jpeg",
};

export const navHrefs = {
  about: "#about",
  services: "#services",
  gallery: "#gallery",
  book: "#booking",
  reviews: "#testimonials",
  contact: "#contact",
  top: "#top",
} as const;

export type AboutTabId = "me" | "artist" | "philosophy" | "expertise";
export type GalleryCategoryId = "bridal" | "glam" | "photoshoot" | "event";

const galleryImageUrls: Record<GalleryCategoryId, string[]> = {
  bridal: [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    "https://images.unsplash.com/photo-1485268646970-02b009643e8e?w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    "https://images.unsplash.com/photo-1594736797933-d0c29c0e3e24?w=800&q=80",
  ],
  glam: [
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
    "https://images.unsplash.com/photo-1526045478516-99145907023c?w=800&q=80",
    "https://images.unsplash.com/photo-1487412940907-5bfabe34eba7?w=800&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
  ],
  photoshoot: [
    "https://images.unsplash.com/photo-1631730486572-226f1a990b87?w=800&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  ],
  event: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff080aafb6e?w=800&q=80",
    "https://images.unsplash.com/photo-1492633428499-174d09d3eec9?w=800&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  ],
};

export function buildGalleryCategories(locale: Locale) {
  const cats = localeContent[locale].gallery.categories;
  return (Object.keys(galleryImageUrls) as GalleryCategoryId[]).map((id) => ({
    id,
    label: cats[id].label,
    tagline: cats[id].tagline,
    images: galleryImageUrls[id].map((src, i) => ({
      src,
      alt: cats[id].alts[i] ?? "",
    })),
  }));
}

/** Horarios 8:00 AM – 9:00 PM, cada 30 min */
export const bookingTimeSlots = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let h = 8; h <= 21; h++) {
    for (const m of [0, 30]) {
      if (h === 21 && m === 30) break;
      const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const hour12 = h % 12 || 12;
      const ampm = h < 12 ? "AM" : "PM";
      const label = `${hour12}:${m === 0 ? "00" : "30"} ${ampm}`;
      slots.push({ value, label });
    }
  }
  return slots;
})();
