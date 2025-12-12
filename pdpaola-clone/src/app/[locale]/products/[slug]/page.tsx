import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatMoney, getProductBySlug } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

export default async function ProductPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const p = await params;
  const product = getProductBySlug(p.slug);
  if (!product) notFound();

  return (
    <Container className="py-12">
      <div className="mb-6 text-sm text-zinc-600">
        <Link className="hover:underline" href={withLocale(p.locale, "/")}>
          首页
        </Link>{" "}
        <span className="px-2">/</span>
        <Link className="hover:underline" href={withLocale(p.locale, "/collections")}>
          Collections
        </Link>{" "}
        <span className="px-2">/</span>
        <span className="text-zinc-900">{product.title}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {product.images.map((img) => (
            <div key={img.alt} className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="lg:pl-6">
          <div className="text-xs font-medium tracking-[0.2em] text-zinc-700">PRODUCT</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">
            {product.title}
          </h1>

          <div className="mt-4 flex items-end gap-3">
            <div className="text-2xl font-semibold text-zinc-900">{formatMoney(product.price)}</div>
            {product.compareAtPrice ? (
              <div className="text-sm text-zinc-500 line-through">
                {formatMoney(product.compareAtPrice)}
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm leading-7 text-zinc-600">{product.description}</p>

          <div className="mt-8 space-y-3">
          <AddToCartButton productId={product.id} />
            <div className="text-xs text-zinc-500">
              说明：这是演示模板商品。上线时请替换为真实库存/价格/物流/支付。
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-black/10 p-5">
            <div className="text-sm font-semibold text-zinc-900">配送与退换（示例）</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li>· 预计 2–5 个工作日送达（示例）。</li>
              <li>· 30 天内可退换（示例）。</li>
              <li>· 结账页为演示，无真实支付。</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

