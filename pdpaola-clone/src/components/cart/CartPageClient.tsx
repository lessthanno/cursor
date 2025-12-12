"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/components/cart/CartProvider";
import { getCartLinesDetailed, getCartSubtotalMinor } from "@/components/cart/cartSelectors";
import { formatMoney } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

export function CartPageClient({ locale }: { locale: Locale }) {
  const cart = useCart();
  const detailed = getCartLinesDetailed(cart.lines);
  const subtotalMinor = getCartSubtotalMinor(cart.lines);

  return (
    <Container className="py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">购物车</h1>
          {detailed.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-black/10 p-8 text-sm text-zinc-600">
              购物车为空。去{" "}
              <Link className="underline" href={withLocale(locale, "/collections/new-in")}>
                看看上新
              </Link>
              。
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-black/10 rounded-2xl border border-black/10">
              {detailed.map((l) => (
                <li key={l.productId} className="flex gap-4 p-5">
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-zinc-100">
                    <Image
                      src={l.product.images[0]?.src ?? ""}
                      alt={l.product.images[0]?.alt ?? l.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          className="truncate text-sm font-medium text-zinc-900 hover:underline"
                          href={withLocale(locale, `/products/${l.product.slug}`)}
                        >
                          {l.product.title}
                        </Link>
                        <div className="mt-1 text-xs text-zinc-600">{formatMoney(l.product.price)}</div>
                      </div>
                      <button
                        className="text-sm text-zinc-600 hover:underline"
                        onClick={() => cart.remove(l.productId)}
                      >
                        移除
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-black/10">
                        <button
                          className="px-3 py-1 text-sm hover:bg-black/5"
                          onClick={() => cart.setQuantity(l.productId, Math.max(1, l.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <div className="w-10 text-center text-sm">{l.quantity}</div>
                        <button
                          className="px-3 py-1 text-sm hover:bg-black/5"
                          onClick={() => cart.setQuantity(l.productId, l.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-sm font-medium text-zinc-900">
                        {formatMoney({ currency: "EUR", amount: l.product.price.amount * l.quantity })}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="w-full max-w-sm rounded-2xl border border-black/10 p-6">
          <div className="text-sm font-semibold text-zinc-900">订单小结</div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-zinc-600">小计</div>
            <div className="font-medium text-zinc-900">
              {formatMoney({ currency: "EUR", amount: subtotalMinor })}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="text-zinc-600">运费</div>
            <div className="text-zinc-900">结账计算（示例）</div>
          </div>
          <div className="mt-6">
            <Link href={withLocale(locale, "/checkout")}>
              <Button className="w-full" disabled={detailed.length === 0}>
                去结账
              </Button>
            </Link>
          </div>
          <div className="mt-3 flex justify-between">
            <button className="text-xs text-zinc-600 hover:underline" onClick={cart.clear}>
              清空购物车
            </button>
            <div className="text-xs text-zinc-500">演示站点</div>
          </div>
        </aside>
      </div>
    </Container>
  );
}

