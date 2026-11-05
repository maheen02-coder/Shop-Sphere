"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { lineKey } from "../lib/format";

const STORAGE_KEY = "cart";
const CartStateContext = createContext(null);
const CartActionsContext = createContext(null);

const readStoredCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product, options = {}) => {
    const id = product.id ?? product._id;
    if (id === undefined || id === null) return;

    const quantity = Math.max(1, Number(options.quantity) || 1);
    const size = options.size || "";
    const color = options.color || "";
    const entry = {
      id,
      name: product.name,
      image: product.image,
      price: Number(product.price) || 0,
      size,
      color,
      quantity,
      stock: Number(product.stock) || undefined,
    };

    setItems((current) => {
      const key = lineKey(entry);
      const existing = current.find((item) => lineKey(item) === key);
      if (existing) {
        return current.map((item) =>
          lineKey(item) === key
            ? {
                ...item,
                quantity: item.quantity + quantity,
                stock: entry.stock ?? item.stock,
              }
            : item
        );
      }
      return [...current, entry];
    });
  }, []);

  const updateQuantity = useCallback((target, nextQuantity) => {
    const key = lineKey(target);
    const quantity = Math.max(1, Number(nextQuantity) || 1);
    setItems((current) =>
      current.map((item) =>
        lineKey(item) === key ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((target) => {
    const key = lineKey(target);
    setItems((current) => current.filter((item) => lineKey(item) !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 200;
    return { subtotal, shipping, total: subtotal + shipping, count };
  }, [items]);

  // State and actions live in separate contexts so components that only add
  // items (product cards, buy buttons) do not re-render when the bag changes.
  const stateValue = useMemo(
    () => ({ items, hydrated, ...totals }),
    [items, hydrated, totals]
  );

  const actionsValue = useMemo(
    () => ({ addItem, updateQuantity, removeItem, clearCart }),
    [addItem, updateQuantity, removeItem, clearCart]
  );

  return (
    <CartActionsContext.Provider value={actionsValue}>
      <CartStateContext.Provider value={stateValue}>
        {children}
      </CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

export function useCart() {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return { ...state, ...actions };
}

export function useCartActions() {
  const actions = useContext(CartActionsContext);
  if (!actions) {
    throw new Error("useCartActions must be used inside a CartProvider");
  }
  return actions;
}
