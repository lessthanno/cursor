import Link from "next/link";
import Image from "next/image";
import { formatMoney, type Product } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

export function ProductCard({ locale, product }: { locale: Locale; product: Product }) {
  const img = product.images[0];
  return (
    <Link
      href={withLocale(locale, `/products/${product.slug}`)}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-zinc-900">{product.title}</div>
          <div className="mt-1 text-xs text-zinc-600">
            {product.tags.includes("bestseller") ? "Bestseller" : "\u00A0"}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-medium text-zinc-900">{formatMoney(product.price)}</div>
          {product.compareAtPrice ? (
            <div className="text-xs text-zinc-500 line-through">
              {formatMoney(product.compareAtPrice)}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

