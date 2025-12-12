import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

export function CollectionCard({ locale, collection }: { locale: Locale; collection: Collection }) {
  return (
    <Link
      href={withLocale(locale, `/collections/${collection.slug}`)}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={collection.image.src}
          alt={collection.image.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-3">
        <div className="text-sm font-medium text-zinc-900">{collection.title}</div>
        <div className="mt-1 text-sm text-zinc-600">{collection.description}</div>
      </div>
    </Link>
  );
}

