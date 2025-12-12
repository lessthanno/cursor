import type { Locale } from "@/lib/i18n";
import { CartPageClient } from "@/components/cart/CartPageClient";

export default async function CartPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <CartPageClient locale={locale} />;
}

