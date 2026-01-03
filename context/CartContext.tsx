"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Define what a Cart Item looks like
type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load cart from LocalStorage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // 2. Save to LocalStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("shopping-cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // --- ACTIONS ---
  const addToCart = (product: any) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // If item exists, just increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If new, add it to the list
      return [...prev, {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        quantity: 1
      }];
    });
    alert("✅ Added to Cart!"); // Simple feedback for now
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  // --- STATS ---
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Helper hook to use the cart easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}