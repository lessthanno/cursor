import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    urls.push({
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    });

    urls.push({
      url: `${base}/${locale}/collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    urls.push({
      url: `${base}/${locale}/search`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    });

    urls.push(
      ...["contact", "stores", "faq", "order-tracking", "policies"].map((p) => ({
        url: `${base}/${locale}/${p}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.3,
      })),
    );

    urls.push(
      ...["privacy", "shipping", "returns", "terms"].map((p) => ({
        url: `${base}/${locale}/policies/${p}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.2,
      })),
    );

    for (const c of collections) {
      urls.push({
        url: `${base}/${locale}/collections/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const p of products) {
      urls.push({
        url: `${base}/${locale}/products/${p.slug}`,
        lastModified: new Date(p.releasedAt),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return urls;
}

