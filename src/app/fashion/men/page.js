"use client";
import { useState } from "react";
import Link from "next/link";
import { products } from "../data/product";
const categories = ["All", "Classic", "Embroidered"];
export default function MenPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const menProducts = products.filter(
    (product) => product.collection === "Men"
  );
  const filteredProducts = menProducts.filter((product) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Classic") {
      return product.category === "Shalwar Kameez";
    }
    return product.category === "Embroidered";
  });
  return (
    <main className="min-h-screen bg-[#100D11] text-white">
      <div className="px-5 pt-6 md:px-10 lg:px-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-[2px] text-gray-400 transition duration-300 hover:text-[#E8C96A]"
        >
          <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Back to Home
        </Link>
      </div>
      <section className="relative overflow-hidden border-b border-[#E8C96A]/20 px-5 py-24 text-center md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,201,106,0.15),transparent_65%)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[5px] text-[#E8C96A]">
            SHOPSPHERE · MEN
          </p>
          <h1 className="mt-7 font-serif text-5xl leading-tight sm:text-6xl md:text-8xl">
            The Art of
            <span className="mt-2 block italic text-[#E8C96A]">
              Tradition
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
            Pakistani shalwar kameez, thoughtfully selected
            for everyday elegance and special occasions.
          </p>
          <a
            href="#collection"
            className="mt-9 inline-block border border-[#E8C96A] px-8 py-4 text-xs uppercase tracking-[3px] text-[#E8C96A] transition duration-300 hover:bg-[#E8C96A] hover:text-black"
          >
            Explore Collection
          </a>
        </div>
      </section>
      <section
        id="collection"
        className="mx-auto max-w-7xl px-5 py-16 md:px-10 lg:px-14"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[4px] text-[#E8C96A]">
              Traditional Wear
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">
              The Collection
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Timeless colors. Refined craftsmanship.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`border px-4 py-3 text-xs uppercase tracking-wider transition duration-300 ${
                  activeCategory === category
                    ? "border-[#E8C96A] bg-[#E8C96A] text-black"
                    : "border-white/15 text-gray-300 hover:border-[#E8C96A] hover:text-[#E8C96A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="text-sm text-gray-400">
            {filteredProducts.length} designs
          </p>
          <p className="text-right text-[10px] uppercase tracking-[2px] text-gray-500 sm:text-xs">
            Pakistani Shalwar Kameez
          </p>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                href={`/fashion/products/${product.id}`}
                key={product.id}
                className="group block min-w-0"
              >
                <div className="relative overflow-hidden border border-white/5 bg-[#19151B]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[230px] w-full object-cover object-center transition duration-700 group-hover:scale-105 sm:h-[300px] lg:h-[360px]"
                  />
                  {product.label && (
                    <span className="absolute left-2 top-2 border border-[#E8C96A]/50 bg-[#100D11]/90 px-2 py-2 text-[8px] tracking-widest text-[#E8C96A] sm:left-3 sm:top-3 sm:text-[9px]">
                      {product.label}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#E8C96A] py-3 text-center text-[10px] uppercase tracking-[2px] text-black transition duration-300 group-hover:translate-y-0">
                    View Details
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-500 sm:text-[10px]">
                    {product.category === "Embroidered"
                      ? "Embroidered Wear"
                      : product.colors?.[0] || "Traditional Wear"}
                  </p>
                  <h3 className="mt-2 text-sm text-gray-100 transition group-hover:text-[#E8C96A] sm:text-base">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#E8C96A]">
                    Rs. {product.price.toLocaleString("en-PK")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-[#E8C96A]">
              Your Collection Awaits
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Add your Men&apos;s products to display them here.
            </p>
          </div>
        )}
      </section>
      <section className="border-t border-white/10 px-6 py-14 text-center">
        <p className="font-serif text-2xl italic text-[#E8C96A] md:text-3xl">
          Tradition, Tailored to You.
        </p>
        <p className="mt-4 text-[10px] tracking-[3px] text-gray-500">
          SHOPSPHERE MEN&apos;S COLLECTION
        </p>
      </section>
    </main>
  );
}

