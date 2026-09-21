"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { programs, type Program } from "@/lib/programs";

const STORAGE_KEY = "mulin:cart";

type Listener = () => void;

let cartIds: string[] = [];
let hydrated = false;
let bumpToken = 0;
const listeners = new Set<Listener>();

function readFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore unavailable storage
  }
}

function setCartIds(updater: (prev: string[]) => string[]) {
  cartIds = updater(cartIds);
  writeToStorage(cartIds);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (!hydrated) {
    cartIds = readFromStorage();
    hydrated = true;
  }
  return cartIds;
}

function getServerSnapshot() {
  return cartIds;
}

function getBumpSnapshot() {
  return bumpToken;
}

function getBumpServerSnapshot() {
  return 0;
}

type CartContextValue = {
  items: Program[];
  itemIds: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  clear: () => void;
  total: number;
  bumpToken: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const itemIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const bumpSnapshot = useSyncExternalStore(subscribe, getBumpSnapshot, getBumpServerSnapshot);

  const addItem = useCallback((id: string) => {
    setCartIds((prev) => {
      if (prev.includes(id)) return prev;
      bumpToken += 1;
      return [...prev, id];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const hasItem = useCallback((id: string) => itemIds.includes(id), [itemIds]);

  const clear = useCallback(() => setCartIds(() => []), []);

  const items = useMemo(
    () => itemIds.map((id) => programs.find((p) => p.id === id)).filter((p): p is Program => !!p),
    [itemIds],
  );

  const total = useMemo(() => items.reduce((sum, p) => sum + p.price, 0), [items]);

  const value = useMemo(
    () => ({ items, itemIds, addItem, removeItem, hasItem, clear, total, bumpToken: bumpSnapshot }),
    [items, itemIds, addItem, removeItem, hasItem, clear, total, bumpSnapshot],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function orderLabel(count: number) {
  return count > 1 ? "Ваши заказы" : "Ваш заказ";
}
