import { svgDataUri } from "@/lib/images";

export type Money = {
  currency: "EUR" | "USD";
  amount: number; // in minor units (e.g. cents)
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  price: Money;
  compareAtPrice?: Money;
  releasedAt: string; // ISO date
  images: { src: string; alt: string }[];
  collectionSlugs: string[];
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export const collections: Collection[] = [
  {
    slug: "new-in",
    title: "New in",
    description: "最新上新与当季推荐。",
    image: { src: svgDataUri("New in"), alt: "New in collection" },
  },
  {
    slug: "icons",
    title: "Icons",
    description: "经典款式与常青单品。",
    image: { src: svgDataUri("Icons"), alt: "Icons collection" },
  },
  {
    slug: "earrings",
    title: "Earrings",
    description: "耳饰：从日常到正式场合。",
    image: { src: svgDataUri("Earrings"), alt: "Earrings collection" },
  },
  {
    slug: "rings",
    title: "Rings",
    description: "戒指：叠戴、主戒与个性款。",
    image: { src: svgDataUri("Rings"), alt: "Rings collection" },
  },
  {
    slug: "necklaces",
    title: "Necklaces",
    description: "项链：层叠搭配与点睛之选。",
    image: { src: svgDataUri("Necklaces"), alt: "Necklaces collection" },
  },
  {
    slug: "bracelets",
    title: "Bracelets",
    description: "手链：简约与精致并存。",
    image: { src: svgDataUri("Bracelets"), alt: "Bracelets collection" },
  },
  {
    slug: "personalized",
    title: "Personalized",
    description: "可刻字/定制：送礼与纪念。",
    image: { src: svgDataUri("Personalized"), alt: "Personalized collection" },
  },
];

const EUR = (amount: number): Money => ({ currency: "EUR", amount });

export const products: Product[] = [
  {
    id: "p_aurora_hoops",
    slug: "aurora-hoops",
    title: "Aurora Hoops",
    description:
      "轻盈的圈形耳环，适合日常叠戴。此为原创占位商品，用于演示商品页与购物车流程。",
    tags: ["gold-tone", "bestseller", "lightweight"],
    price: EUR(5900),
    compareAtPrice: EUR(7900),
    releasedAt: "2025-10-20",
    images: [
      { src: svgDataUri("Aurora Hoops · 1"), alt: "Aurora Hoops image 1" },
      { src: svgDataUri("Aurora Hoops · 2"), alt: "Aurora Hoops image 2" },
      { src: svgDataUri("Aurora Hoops · 3"), alt: "Aurora Hoops image 3" },
    ],
    collectionSlugs: ["new-in", "earrings", "icons"],
  },
  {
    id: "p_solis_ring",
    slug: "solis-ring",
    title: "Solis Ring",
    description:
      "带纹理的日常戒指，可单戴也可叠戴。此为原创占位商品。",
    tags: ["silver-tone", "stackable"],
    price: EUR(4500),
    releasedAt: "2025-09-10",
    images: [
      { src: svgDataUri("Solis Ring · 1"), alt: "Solis Ring image 1" },
      { src: svgDataUri("Solis Ring · 2"), alt: "Solis Ring image 2" },
    ],
    collectionSlugs: ["rings", "icons"],
  },
  {
    id: "p_mira_pendant",
    slug: "mira-pendant-necklace",
    title: "Mira Pendant Necklace",
    description: "简洁吊坠项链，适合层叠。此为原创占位商品。",
    tags: ["gold-tone", "layering", "gift"],
    price: EUR(7900),
    releasedAt: "2025-08-02",
    images: [
      { src: svgDataUri("Mira Pendant · 1"), alt: "Mira Pendant image 1" },
      { src: svgDataUri("Mira Pendant · 2"), alt: "Mira Pendant image 2" },
      { src: svgDataUri("Mira Pendant · 3"), alt: "Mira Pendant image 3" },
    ],
    collectionSlugs: ["necklaces", "icons"],
  },
  {
    id: "p_lyra_bracelet",
    slug: "lyra-chain-bracelet",
    title: "Lyra Chain Bracelet",
    description: "细链手链，轻松搭配。此为原创占位商品。",
    tags: ["silver-tone", "minimal"],
    price: EUR(5200),
    releasedAt: "2025-07-15",
    images: [
      { src: svgDataUri("Lyra Bracelet · 1"), alt: "Lyra Bracelet image 1" },
      { src: svgDataUri("Lyra Bracelet · 2"), alt: "Lyra Bracelet image 2" },
    ],
    collectionSlugs: ["bracelets", "new-in"],
  },
  {
    id: "p_initial_charm",
    slug: "initial-charm",
    title: "Initial Charm (A–Z)",
    description: "可选字母吊坠，用于定制项链/手链。此为原创占位商品。",
    tags: ["personalized", "gift"],
    price: EUR(3900),
    releasedAt: "2025-06-01",
    images: [
      { src: svgDataUri("Initial Charm · 1"), alt: "Initial Charm image 1" },
      { src: svgDataUri("Initial Charm · 2"), alt: "Initial Charm image 2" },
    ],
    collectionSlugs: ["personalized", "new-in"],
  },
  {
    id: "p_nova_studs",
    slug: "nova-studs",
    title: "Nova Studs",
    description: "小巧耳钉，适合第二/第三耳洞。此为原创占位商品。",
    tags: ["gold-tone", "bestseller", "everyday"],
    price: EUR(3500),
    releasedAt: "2025-05-12",
    images: [
      { src: svgDataUri("Nova Studs · 1"), alt: "Nova Studs image 1" },
      { src: svgDataUri("Nova Studs · 2"), alt: "Nova Studs image 2" },
    ],
    collectionSlugs: ["earrings", "icons"],
  },
];

export function formatMoney(m: Money) {
  const value = m.amount / 100;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: m.currency,
  }).format(value);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug) ?? null;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getProductsForCollection(collectionSlug: string) {
  return products.filter((p) => p.collectionSlugs.includes(collectionSlug));
}

