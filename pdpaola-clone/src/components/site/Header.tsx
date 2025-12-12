"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import type { Locale } from "@/lib/i18n";
import { locales, withLocale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function Header({ locale }: { locale: Locale }) {
  const cart = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");

  const nav = useMemo(
    () => [
      { label: "New in", href: `/collections/new-in` },
      { label: "Icons", href: `/collections/icons` },
      { label: "Earrings", href: `/collections/earrings` },
      { label: "Rings", href: `/collections/rings` },
      { label: "Necklaces", href: `/collections/necklaces` },
      { label: "Bracelets", href: `/collections/bracelets` },
      { label: "Personalized", href: `/collections/personalized` },
    ],
    [],
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link
              href={withLocale(locale, "/")}
              className="text-sm font-semibold tracking-[0.2em] text-zinc-900"
              aria-label="Home"
            >
              TEMPLATE
            </Link>
            <nav className="hidden items-center gap-4 lg:flex">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={withLocale(locale, i.href)}
                  className="text-xs font-medium tracking-wide text-zinc-700 hover:text-zinc-900"
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <form
              className="hidden md:flex"
              onSubmit={(e) => {
                e.preventDefault();
                const query = q.trim();
                if (!query) return;
                router.push(withLocale(locale, `/search?q=${encodeURIComponent(query)}`));
              }}
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索..."
                className="h-10 w-56 rounded-full border border-black/10 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
                name="q"
                aria-label="Search"
              />
            </form>

            <LocaleSwitcher locale={locale} pathname={pathname} />

            <button
              className={cn(
                "relative inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-black/5",
              )}
              onClick={cart.open}
              aria-label="Open cart"
            >
              购物车
              {cart.itemCount > 0 ? (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1.5 text-xs text-white">
                  {cart.itemCount}
                </span>
              ) : null}
            </button>
          </div>
        </Container>
      </header>
      <CartDrawer locale={locale} />
    </>
  );
}

function LocaleSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  const router = useRouter();
  const current = locale;

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Language</span>
      <select
        className="h-10 rounded-full border border-black/10 bg-white px-3 text-sm text-zinc-900 outline-none hover:bg-black/5"
        value={current}
        onChange={(e) => {
          const next = e.target.value;
          const segments = pathname.split("/").filter(Boolean);
          if (segments.length === 0) {
            router.push(`/${next}`);
            return;
          }
          segments[0] = next;
          router.push(`/${segments.join("/")}`);
        }}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}

