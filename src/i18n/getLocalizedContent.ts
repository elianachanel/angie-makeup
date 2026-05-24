import type { Locale } from "@/i18n/locales";
import { localeContent, type LocaleContent } from "@/i18n/translations";
import { buildGalleryCategories } from "@/lib/data";

export type SiteContent = LocaleContent & {
  galleryCategories: ReturnType<typeof buildGalleryCategories>;
};

export function getLocalizedContent(locale: Locale): SiteContent {
  return {
    ...localeContent[locale],
    galleryCategories: buildGalleryCategories(locale),
  };
}
