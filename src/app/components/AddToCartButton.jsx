"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { parsePrice } from "../../lib/format";

export default function AddToCartButton({
  product,
  quantity = 1,
  size = "",
  color = "",
  className = "",
  label = "Add to Cart",
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(
      {
        id: product.id ?? product._id,
        name: product.name,
        image: product.image,
        price: parsePrice(product.salePrice || product.price),
        stock: product.stock,
      },
      { quantity, size, color }
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={product.stock === 0}
      className={
        className ||
        "border border-[#E8C96A] bg-[#E8C96A] px-7 py-4 text-xs uppercase tracking-[0.2em] text-[#100D11] transition-all duration-300 hover:bg-transparent hover:text-[#E8C96A] disabled:cursor-not-allowed disabled:opacity-40"
      }
    >
      {added ? "Added to Cart ✓" : label}
    </button>
  );
}
