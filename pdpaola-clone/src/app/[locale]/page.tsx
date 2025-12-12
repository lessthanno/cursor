import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { collections, products } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { CollectionCard } from "@/components/site/CollectionCard";
import { ProductCard } from "@/components/site/ProductCard";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export default async function LocaleHome({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const featuredCollections = collections.slice(0, 6);
  const bestsellers = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
  const newIn = products
    .slice()
    .sort((a, b) => (a.releasedAt < b.releasedAt ? 1 : -1))
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/10 bg-zinc-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(24,24,27,0.08),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(24,24,27,0.06),transparent_50%)]" />
        <Container className="relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="text-xs font-medium tracking-[0.2em] text-zinc-700">NEW SEASON</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
              极简珠宝风格
              <br />
              可上线电商模板
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg">
              结构与交互参考主流 Shopify 珠宝站点：首页 Hero、集合与商品网格、搜索、侧边购物车、结账演示。
              所有图片/文案为原创占位，避免版权风险。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={withLocale(locale, "/collections/new-in")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800"
              >
                立即选购
              </Link>
              <Link
                href={withLocale(locale, "/collections")}
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-zinc-900 hover:bg-black/5"
              >
                浏览全部集合
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured collections */}
      <section className="py-14">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">精选集合</h2>
              <p className="mt-2 text-sm text-zinc-600">按类目快速进入。</p>
            </div>
            <Link
              href={withLocale(locale, "/collections")}
              className="text-sm font-medium text-zinc-700 hover:underline"
            >
              查看全部
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCollections.map((c) => (
              <CollectionCard key={c.slug} locale={locale} collection={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="border-t border-black/10 bg-zinc-50 py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Bestsellers</h2>
              <p className="mt-2 text-sm text-zinc-600">
                热门商品网格 + 价格/标签展示（演示数据）。
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {bestsellers.map((p) => (
                <ProductCard key={p.id} locale={locale} product={p} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* New in grid */}
      <section className="py-14">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">New in</h2>
              <p className="mt-2 text-sm text-zinc-600">按上新时间排序展示。</p>
            </div>
            <Link
              href={withLocale(locale, "/collections/new-in")}
              className="text-sm font-medium text-zinc-700 hover:underline"
            >
              进入 New in
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newIn.map((p) => (
              <ProductCard key={p.id} locale={locale} product={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial */}
      <section className="border-y border-black/10 bg-white py-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="rounded-3xl bg-zinc-50 p-10">
              <div className="text-xs font-medium tracking-[0.2em] text-zinc-700">EDITORIAL</div>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900">
                以“极简 + 质感”为核心的内容块
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                对标常见珠宝电商首页的营销/编辑区块：强调材质、工艺与礼赠场景。你可以在这里换成真实品牌故事、
                lookbook、活动专题等。
              </p>
              <div className="mt-6">
                <Link
                  href={withLocale(locale, "/collections/icons")}
                  className="text-sm font-medium text-zinc-900 hover:underline"
                >
                  逛逛 Icons →
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-black/10 p-10">
              <h4 className="text-sm font-semibold tracking-wide text-zinc-900">为什么这样设计？</h4>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li>· 顶部固定导航 + 搜索 + 侧边购物车，提升转化路径。</li>
                <li>· 首页多段式 section，兼容移动端与桌面端。</li>
                <li>· 集合页筛选/排序，商品页图集 + 加入购物车。</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-zinc-50 py-14">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">订阅 Newsletter</h2>
              <p className="mt-2 text-sm text-zinc-600">
                这是一个演示表单；上线时可接入 Klaviyo/Mailchimp/自建 API。
              </p>
            </div>
            <div className="lg:justify-self-end">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

