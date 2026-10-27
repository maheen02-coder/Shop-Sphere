"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const price = product.salePrice || product.price;

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(
      {
        id: product._id,
        name: product.name,
        image: product.image,
        price,
        stock: product.stock,
      },
      {
        size: product.sizes?.[0] || "",
        color: product.colors?.[0] || "",
      }
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col border border-[#B89542]/20 bg-[#19141A] p-3 transition-all duration-500 hover:-translate-y-1 hover:border-[#E8C96A]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <Link href={`/shop/${product._id}`} className="flex h-full flex-col">
        <div className="relative h-64 overflow-hidden bg-[#241D23]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {product.label && (
            <span className="absolute left-3 top-3 border border-[#E8C96A]/50 bg-[#100D11]/80 px-2.5 py-1 text-[9px] tracking-[0.18em] text-[#E8C96A]">
              {product.label}
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute right-3 top-3 bg-[#100D11]/85 px-2.5 py-1 text-[9px] tracking-[0.18em] text-[#E2A0A0]">
              SOLD OUT
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#B89542]">
            {product.brand} {product.subCategory ? `· ${product.subCategory}` : ""}
          </p>
          <h3 className="mt-2 font-serif text-xl text-[#F1E8EB] transition-colors group-hover:text-[#E8C96A]">
            {product.name}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-base text-[#E8C96A]">
              {formatPrice(price)}
            </span>
            <span className="text-[10px] tracking-[0.15em] text-[#B9AAB1]">
              ★ {product.rating?.toFixed(1) || "4.8"}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.12em]">
            {product.stock > 0 ? (
              <span className="text-[#9DBF9E]">IN STOCK</span>
            ) : (
              <span className="text-[#E2A0A0]">OUT OF STOCK</span>
            )}
            {typeof product.stock === "number" && product.stock > 0 && product.stock <= 5 && (
              <span className="text-[#D9B8C0]">· ONLY {product.stock} LEFT</span>
            )}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={handleAdd}
        disabled={product.stock === 0}
        className="mt-3 border border-[#B89542] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition duration-300 hover:bg-[#E8C96A] hover:text-[#100D11] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {added ? "Added to Bag" : "Add to Bag"}
      </button>
    </article>
  );
}
