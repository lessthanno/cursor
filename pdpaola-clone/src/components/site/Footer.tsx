import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-black/10 bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-[0.2em] text-zinc-900">TEMPLATE</div>
          <p className="text-sm text-zinc-600">
            原创占位素材的电商前端模板：集合/商品/搜索/购物车/结账（演示）。
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-wide text-zinc-900">帮助</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-zinc-600 hover:underline" href={withLocale(locale, "/faq")}>
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className="text-zinc-600 hover:underline"
                href={withLocale(locale, "/order-tracking")}
              >
                订单查询
              </Link>
            </li>
            <li>
              <Link
                className="text-zinc-600 hover:underline"
                href={withLocale(locale, "/contact")}
              >
                联系我们
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-wide text-zinc-900">门店</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-zinc-600 hover:underline"
                href={withLocale(locale, "/stores")}
              >
                Store locator
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-wide text-zinc-900">政策</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-zinc-600 hover:underline"
                href={withLocale(locale, "/policies/privacy")}
              >
                隐私政策
              </Link>
            </li>
            <li>
              <Link
                className="text-zinc-600 hover:underline"
                href={withLocale(locale, "/policies/shipping")}
              >
                配送政策
              </Link>
            </li>
            <li>
              <Link
                className="text-zinc-600 hover:underline"
                href={withLocale(locale, "/policies/returns")}
              >
                退换政策
              </Link>
            </li>
            <li>
              <Link className="text-zinc-600 hover:underline" href={withLocale(locale, "/policies/terms")}>
                条款与条件
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 flex flex-col gap-2 border-t border-black/10 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Template Storefront</div>
          <div>此站点为演示模板，不包含对方商标/文案/图片。</div>
        </div>
      </Container>
    </footer>
  );
}

