import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

export default async function PoliciesIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const items = [
    { slug: "privacy", title: "隐私政策" },
    { slug: "shipping", title: "配送政策" },
    { slug: "returns", title: "退换政策" },
    { slug: "terms", title: "条款与条件" },
  ];

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Policies</h1>
      <ul className="mt-8 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i.slug}>
            <Link className="text-zinc-700 hover:underline" href={withLocale(locale, `/policies/${i.slug}`)}>
              {i.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

