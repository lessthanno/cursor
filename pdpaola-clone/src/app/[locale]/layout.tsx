import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await props.params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <CartProvider>
      <div className="min-h-dvh bg-white text-zinc-900">
        <Header locale={locale} />
        <main>{props.children}</main>
        <Footer locale={locale} />
      </div>
    </CartProvider>
  );
}

