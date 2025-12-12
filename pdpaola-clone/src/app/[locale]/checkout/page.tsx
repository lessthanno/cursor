import type { Locale } from "@/lib/i18n";
import { CheckoutClient } from "@/components/site/CheckoutClient";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <CheckoutClient locale={locale} />;
}

