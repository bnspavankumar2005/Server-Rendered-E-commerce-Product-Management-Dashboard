"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product, disabled }: { product: any, disabled: boolean }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      disabled={disabled}
      className={`px-8 py-4 rounded-lg text-lg font-bold w-full md:w-auto transition shadow-md ${
        disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-95"
      }`}
    >
      {disabled ? "Sold Out" : "Add to Cart"}
    </button>
  );
}