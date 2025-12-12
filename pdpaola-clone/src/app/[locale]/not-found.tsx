"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { defaultLocale, isLocale, withLocale } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = isLocale(first) ? first : defaultLocale;

  return (
    <Container className="py-20">
      <div className="max-w-xl">
        <div className="text-xs font-medium tracking-[0.2em] text-zinc-700">404</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900">页面不存在</h1>
        <p className="mt-4 text-sm text-zinc-600">你访问的页面不存在或已被移动。</p>
        <div className="mt-8 flex gap-3">
          <Link
            href={withLocale(locale, "/")}
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800"
          >
            返回首页
          </Link>
          <Link
            href={withLocale(locale, "/collections")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-zinc-900 hover:bg-black/5"
          >
            浏览集合
          </Link>
        </div>
      </div>
    </Container>
  );
}

