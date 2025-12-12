"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { getCartLinesDetailed, getCartSubtotalMinor } from "@/components/cart/cartSelectors";
import { formatMoney } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

export function CartDrawer({ locale }: { locale: Locale }) {
  const cart = useCart();
  const detailed = getCartLinesDetailed(cart.lines);
  const subtotalMinor = getCartSubtotalMinor(cart.lines);

  useEffect(() => {
    if (!cart.isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") cart.close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cart]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition",
        cart.isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!cart.isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/30 transition-opacity",
          cart.isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={cart.close}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform",
          cart.isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <div className="text-sm font-medium tracking-wide text-zinc-900">购物车</div>
            <button
              className="rounded-full px-2 py-1 text-sm text-zinc-600 hover:bg-black/5"
              onClick={cart.close}
            >
              关闭
            </button>
          </div>

          <div className="flex-1 overflow-auto px-5 py-4">
            {detailed.length === 0 ? (
              <div className="py-10 text-center text-sm text-zinc-600">
                购物车为空。去{" "}
                <Link className="underline" href={withLocale(locale, "/collections/new-in")}>
                  看看上新
                </Link>
                。
              </div>
            ) : (
              <ul className="space-y-4">
                {detailed.map((l) => (
                  <li key={l.productId} className="flex gap-3">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-zinc-100">
                      <Image
                        src={l.product.images[0]?.src ?? ""}
                        alt={l.product.images[0]?.alt ?? l.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={withLocale(locale, `/products/${l.product.slug}`)}
                          className="truncate text-sm font-medium text-zinc-900 hover:underline"
                          onClick={cart.close}
                        >
                          {l.product.title}
                        </Link>
                        <div className="shrink-0 text-sm text-zinc-900">
                          {formatMoney(l.product.price)}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center overflow-hidden rounded-full border border-black/10">
                          <button
                            className="px-3 py-1 text-sm hover:bg-black/5"
                            onClick={() =>
                              cart.setQuantity(l.productId, Math.max(1, l.quantity - 1))
                            }
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
                        <button
                          className="text-sm text-zinc-600 hover:underline"
                          onClick={() => cart.remove(l.productId)}
                        >
                          移除
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-black/10 px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <div className="text-zinc-600">小计</div>
              <div className="font-medium text-zinc-900">
                {formatMoney({ currency: "EUR", amount: subtotalMinor })}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href={withLocale(locale, "/cart")}
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-black/5"
                onClick={cart.close}
              >
                查看购物车
              </Link>
              <Link href={withLocale(locale, "/checkout")} onClick={cart.close}>
                <Button className="w-full">去结账</Button>
              </Link>
            </div>
            <div className="mt-3 flex justify-between">
              <button className="text-xs text-zinc-600 hover:underline" onClick={cart.clear}>
                清空
              </button>
              <div className="text-xs text-zinc-500">演示结账（无真实支付）</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

