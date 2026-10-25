export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const DIRECTIONS: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

/** Text that exists in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

export function parseLocale(value: string | undefined | null): Locale {
  return LOCALES.find((locale) => locale === value) ?? DEFAULT_LOCALE;
}
