"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { getCartLinesDetailed, getCartSubtotalMinor } from "@/components/cart/cartSelectors";
import { formatMoney } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

export function CheckoutClient({ locale }: { locale: Locale }) {
  const cart = useCart();
  const detailed = getCartLinesDetailed(cart.lines);
  const subtotalMinor = getCartSubtotalMinor(cart.lines);

  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  if (done) {
    return (
      <Container className="py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">下单成功（演示）</h1>
        <p className="mt-3 text-sm text-zinc-600">
          订单号：<span className="font-medium text-zinc-900">{orderId ?? "D-UNKNOWN"}</span>
          （此为演示，不会产生真实支付）
        </p>
        <div className="mt-8 flex gap-3">
          <Link href={withLocale(locale, "/")}>
            <Button>返回首页</Button>
          </Link>
          <Link href={withLocale(locale, "/order-tracking")}>
            <Button variant="ghost">订单查询</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Checkout</h1>
      <p className="mt-3 text-sm text-zinc-600">演示结账表单：可替换为 Stripe / Shopify Checkout。</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (detailed.length === 0) return;
            const id = createDemoOrderId();
            setOrderId(id);
            cart.clear();
            setDone(true);
          }}
        >
          <div className="grid gap-3">
            <label className="text-sm font-medium text-zinc-900">姓名</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>
          <div className="grid gap-3">
            <label className="text-sm font-medium text-zinc-900">邮箱</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>
          <div className="grid gap-3">
            <label className="text-sm font-medium text-zinc-900">收货地址</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="min-h-28 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>

          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5 text-sm text-zinc-600">
            <div className="font-medium text-zinc-900">提示</div>
            <ul className="mt-2 space-y-1">
              <li>· 这里没有真实支付；提交后仅展示成功页。</li>
              <li>· 接真实支付建议：Stripe Checkout / Shopify Headless + Checkout。</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={detailed.length === 0}>
            提交订单（演示）
          </Button>
          {detailed.length === 0 ? (
            <div className="text-sm text-zinc-600">
              购物车为空。先去{" "}
              <Link className="underline" href={withLocale(locale, "/collections/new-in")}>
                选购商品
              </Link>
              。
            </div>
          ) : null}
        </form>

        <aside className="rounded-2xl border border-black/10 p-6">
          <div className="text-sm font-semibold text-zinc-900">订单明细</div>
          <ul className="mt-4 space-y-3">
            {detailed.map((l) => (
              <li key={l.productId} className="flex items-start justify-between gap-4 text-sm">
                <div className="min-w-0">
                  <div className="truncate font-medium text-zinc-900">{l.product.title}</div>
                  <div className="text-zinc-600">数量：{l.quantity}</div>
                </div>
                <div className="shrink-0 text-zinc-900">
                  {formatMoney({ currency: "EUR", amount: l.product.price.amount * l.quantity })}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-black/10 pt-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-zinc-600">小计</div>
              <div className="font-medium text-zinc-900">
                {formatMoney({ currency: "EUR", amount: subtotalMinor })}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-zinc-600">运费</div>
              <div className="text-zinc-900">结账计算（示例）</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-zinc-600">总计</div>
              <div className="font-semibold text-zinc-900">
                {formatMoney({ currency: "EUR", amount: subtotalMinor })}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function createDemoOrderId() {
  try {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    return `D-${hex}`;
  } catch {
    return `D-${Date.now().toString(16).toUpperCase()}`;
  }
}

