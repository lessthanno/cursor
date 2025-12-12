import { products } from "@/lib/catalog";

export type CartLine = { productId: string; quantity: number };

export function getCartLinesDetailed(lines: CartLine[]) {
  return lines
    .map((l) => {
      const product = products.find((p) => p.id === l.productId);
      if (!product) return null;
      return { ...l, product };
    })
    .filter(Boolean) as Array<{ productId: string; quantity: number; product: (typeof products)[number] }>;
}

export function getCartSubtotalMinor(lines: CartLine[]) {
  const detailed = getCartLinesDetailed(lines);
  return detailed.reduce((sum, l) => sum + l.product.price.amount * l.quantity, 0);
}

