"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "pdpaola_clone_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((x) => {
          const obj = x as Partial<CartLine>;
          if (!obj.productId || typeof obj.productId !== "string") return null;
          const q = typeof obj.quantity === "number" ? obj.quantity : 1;
          const quantity = Number.isFinite(q) ? Math.max(1, Math.floor(q)) : 1;
          return { productId: obj.productId, quantity };
        })
        .filter(Boolean) as CartLine[];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const add = useCallback((productId: string, quantity = 1) => {
    const q = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId);
      if (idx === -1) return [...prev, { productId, quantity: q }];
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + q };
      return next;
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const q = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, quantity: q } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value: CartContextValue = useMemo(
    () => ({
      lines,
      itemCount,
      add,
      remove,
      setQuantity,
      clear,
      isOpen,
      open,
      close,
      toggle,
    }),
    [add, clear, close, isOpen, itemCount, lines, open, remove, setQuantity, toggle],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

