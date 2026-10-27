"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { apiFetch } from "../../lib/api";

export default function CategoryCollection({
  category,
  eyebrow,
  title,
  accent,
  description,
  image,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiFetch(`/products?category=${encodeURIComponent(category)}&limit=24&sortBy=newest`)
      .then((data) => active && setProducts(data.products || []))
      .catch((err) => active && setError(err.message || "Unable to load collection."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [category]);

  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/collections"
          className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6] transition hover:text-[#E8C96A]"
        >
          ← All collections
        </Link>

        <section className="mt-8 grid grid-cols-1 gap-8 border-b border-[#B89542]/25 pb-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {title} <span className="italic text-[#E8C96A]">{accent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-[#C5B6BC]">
              {description}
            </p>
            <Link
              href="/shop"
              className="mt-7 inline-flex border border-[#B89542] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-[#100D11]"
            >
              Shop all products
            </Link>
          </div>
          {image && (
            <div className="relative h-52 overflow-hidden border border-[#B89542]/20 bg-[#19141A] sm:h-64">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100D11]/60 to-transparent" />
            </div>
          )}
        </section>

        {error && (
          <div className="mt-8 border border-[#E2A0A0]/40 bg-[#2A181C] px-5 py-4 text-sm text-[#F2C4C4]">
            {error}. Make sure the ShopSphere API is running.
          </div>
        )}

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[470px] animate-pulse border border-[#B89542]/15 bg-[#19141A]"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="mt-12 border border-[#B89542]/20 bg-[#19141A] px-6 py-16 text-center">
            <h2 className="font-serif text-3xl">Collection arriving soon</h2>
            <p className="mt-3 text-sm text-[#B8AEB6]">
              New pieces are being curated. Browse the full shop in the meantime.
            </p>
            <Link
              href="/shop"
              className="mt-7 inline-flex border border-[#B89542] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-[#100D11]"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
