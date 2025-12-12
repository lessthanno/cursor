import { Container } from "@/components/ui/Container";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import type { Locale } from "@/lib/i18n";

export default async function SearchPage(props: {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await props.params;
  const sp = (await props.searchParams) ?? {};
  const q = (sp.q ?? "").trim();
  const query = q.toLowerCase();
  const results =
    query.length === 0
      ? []
      : products.filter((p) => {
          const hay = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
          return hay.includes(query);
        });

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Search</h1>
      <p className="mt-3 text-sm text-zinc-600">
        {q ? (
          <>
            关键词：<span className="font-medium text-zinc-900">{q}</span>（{results.length} 个结果）
          </>
        ) : (
          "请输入关键词进行搜索。"
        )}
      </p>

      {results.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} locale={params.locale} product={p} />
          ))}
        </div>
      ) : q ? (
        <div className="mt-12 rounded-2xl border border-black/10 p-8 text-sm text-zinc-600">
          没有找到匹配商品。你可以尝试搜索 <span className="font-medium">bestseller</span> 或{" "}
          <span className="font-medium">gold-tone</span>。
        </div>
      ) : null}
    </Container>
  );
}

