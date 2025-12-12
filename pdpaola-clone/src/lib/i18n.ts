export const locales = ["en", "fr", "de", "it", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function withLocale(locale: Locale, href: string) {
  const normalized = href.startsWith("/") ? href : `/${href}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

