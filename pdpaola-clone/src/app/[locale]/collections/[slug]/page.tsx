import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getCollection, getProductsForCollection } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export default async function CollectionPage(props: {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams?: Promise<{ tag?: string; sort?: SortKey }>;
}) {
  const params = await props.params;
  const searchParams = (await props.searchParams) ?? {};

  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const all = getProductsForCollection(collection.slug);
  const availableTags = Array.from(new Set(all.flatMap((p) => p.tags))).sort();

  const tag = searchParams.tag?.trim();
  const sort = (searchParams.sort ?? "featured") as SortKey;

  const filtered = tag ? all.filter((p) => p.tags.includes(tag)) : all;
  const sorted = filtered.slice().sort((a, b) => {
    if (sort === "price-asc") return a.price.amount - b.price.amount;
    if (sort === "price-desc") return b.price.amount - a.price.amount;
    if (sort === "newest") return a.releasedAt < b.releasedAt ? 1 : -1;
    // featured: bestseller first, then newest
    const ab = a.tags.includes("bestseller") ? 0 : 1;
    const bb = b.tags.includes("bestseller") ? 0 : 1;
    if (ab !== bb) return ab - bb;
    return a.releasedAt < b.releasedAt ? 1 : -1;
  });

  const linkFor = (next: { tag?: string; sort?: SortKey }) => {
    const qs = new URLSearchParams();
    if (next.tag) qs.set("tag", next.tag);
    if (next.sort && next.sort !== "featured") qs.set("sort", next.sort);
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    return withLocale(params.locale, `/collections/${collection.slug}${suffix}`);
  };

  return (
    <div>
      <section className="border-b border-black/10 bg-zinc-50 py-12">
        <Container>
          <div className="max-w-2xl">
            <div className="text-xs font-medium tracking-[0.2em] text-zinc-700">COLLECTION</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
              {collection.title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{collection.description}</p>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={linkFor({ sort, tag: undefined })}
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                !tag ? "border-zinc-900 bg-zinc-900 text-white" : "border-black/10 text-zinc-700 hover:bg-black/5",
              ].join(" ")}
            >
              全部
            </Link>
            {availableTags.map((t) => (
              <Link
                key={t}
                href={linkFor({ sort, tag: t })}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs font-medium",
                  tag === t
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-black/10 text-zinc-700 hover:bg-black/5",
                ].join(" ")}
              >
                {t}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-600">排序</span>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["featured", "Featured"],
                  ["newest", "Newest"],
                  ["price-asc", "Price ↑"],
                  ["price-desc", "Price ↓"],
                ] as const
              ).map(([key, label]) => (
                <Link
                  key={key}
                  href={linkFor({ tag, sort: key })}
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs font-medium",
                    sort === key
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-black/10 text-zinc-700 hover:bg-black/5",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} locale={params.locale} product={p} />
          ))}
        </div>

        {sorted.length === 0 ? (
          <div className="py-14 text-center text-sm text-zinc-600">没有匹配商品。</div>
        ) : null}
      </Container>
    </div>
  );
}

