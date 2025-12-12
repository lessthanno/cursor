"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({
  productId,
  quantity = 1,
}: {
  productId: string;
  quantity?: number;
}) {
  const cart = useCart();
  return (
    <Button type="button" onClick={() => cart.add(productId, quantity)} className="w-full">
      加入购物车
    </Button>
  );
}

