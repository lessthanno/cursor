import { Container } from "@/components/ui/Container";
import { collections } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { CollectionCard } from "@/components/site/CollectionCard";

export default async function CollectionsIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <Container className="py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Collections</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          集合页用于承载“类目入口”与“营销聚合”。这里是演示数据；你可以替换为 Shopify/Headless CMS 的真实内容。
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <CollectionCard key={c.slug} locale={locale} collection={c} />
        ))}
      </div>
    </Container>
  );
}

