"use client";
import { useState } from "react";
import Link from "next/link";
const categories = ["All", "Dresses", "Tops", "Bags", "Shoes", "Shawls"];
const products = [
  {
    id: 1,
    name: "Emerald Grace",
    category: "Dresses",
    price: 8900,
    image: "/emerald-grace.PNG",
    label: "BESTSELLER",
  },
  {
    id: 2,
    name: "Royal Burgundy",
    category: "Dresses",
    price: 9500,
    image: "/royal-burgandy.PNG",
    label: "NEW ARRIVAL",
  },
  {
    id: 3,
    name: "Velvet Dream",
    category: "Dresses",
    price: 10200,
    image: "/royal-dream.PNG",
    label: "EXCLUSIVE",
  },
  {
    id: 4,
    name: "Forest Elegance",
    category: "Dresses",
    price: 7800,
    image: "/forest elegance.PNG",
    label: "",
  },
  {
    id: 5,
    name: "Velvet Crown",
    category: "Bags",
    price: 5800,
    image: "/marron-velvet-bag.PNG",
    label: "TRENDING",
  },
  {
    id: 6,
    name: "Emerald Heels",
    category: "Shoes",
    price: 6500,
    image: "/velvet-green-heels.PNG",
    label: "BESTSELLER",
  },
  {
    id: 7,
    name: "Royal Potli",
    category: "Bags",
    price: 4200,
    image: "/purple-velvet-bag.PNG",
    label: "",
  },
  {
    id: 8,
    name: "Embroidered Flats",
    category: "Shoes",
    price: 3800,
    image: "/maroon-flatters.PNG",
    label: "",
  },
  {
    id: 9,
    name: "Midnight Bloom",
    category: "Dresses",
    price: 8700,
    image: "/midnight-gleem.PNG",
    label: "",
  },
  {
    id: 10,
    name: "Jade Whisper",
    category: "Dresses",
    price: 9200,
    image: "/jade-darkgeen-whisper.PNG",
    label: "NEW ARRIVAL",
  },
  {
    id: 11,
    name: "Wine Serenity",
    category: "Tops",
    price: 5500,
    image: "/wine-secernity.PNG",
    label: "",
  },
  {
    id: 12,
    name: "Royal Shawl",
    category: "Shawls",
    price: 4800,
    image: "/royal-shawl.PNG",
    label: "EXCLUSIVE",
  },
];
export default function WomenPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-10 text-[#F1E8EB] sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/fashion"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#C5B6BC] transition hover:text-[#E8C96A]"
        >
          <span>←</span> BACK TO FASHION
        </Link>
        <section className="py-16 text-center sm:py-24">
          <p className="mb-5 text-[10px] font-semibold tracking-[0.4em] text-[#E8C96A] sm:text-xs">
            VELVETY THORNS · WOMEN'S EDIT
          </p>
          <h1 className="font-serif text-5xl font-normal sm:text-6xl lg:text-7xl">
            The Art of{" "}
            <span className="italic text-[#E8C96A]">
              Elegance
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#C5B6BC] sm:text-base">
            Discover distinctive pieces, timeless silhouettes
            and statement essentials curated for your style.
          </p>
        </section>
        <section>
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[#B89542]/20 pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs tracking-[0.25em] text-[#E8C96A]">
                THE COLLECTION
              </p>
              <h2 className="mt-2 font-serif text-3xl">
                Women's Selection
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`border px-4 py-2 text-xs transition duration-300 ${
                    activeCategory === category
                      ? "border-[#E8C96A] bg-[#E8C96A] text-[#100D11]"
                      : "border-[#B89542]/30 text-[#C5B6BC] hover:border-[#E8C96A] hover:text-[#E8C96A]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <p className="mb-5 text-xs text-[#A99AA1]">
            {filteredProducts.length} pieces in this collection
          </p>
          <div className="flex flex-wrap gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group w-full overflow-hidden border border-[#B89542]/20 bg-[#19141A] transition duration-500 hover:-translate-y-1 hover:border-[#E8C96A]/60 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <div className="relative h-[300px] overflow-hidden bg-[#241D23] sm:h-[340px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  {product.label && (
                    <span className="absolute left-3 top-3 bg-[#100D11]/85 px-3 py-2 text-[9px] tracking-[0.15em] text-[#E8C96A]">
                      {product.label}
                    </span>
                  )}
                  <button
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#100D11]/75 text-lg transition hover:border-[#E8C96A] hover:text-[#E8C96A]"
                  >
                    ♡
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89542]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 font-serif text-xl transition-colors group-hover:text-[#E8C96A]">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-t border-[#B89542]/20 pt-4">
                    <span className="text-sm text-[#E8C96A]">
                      Rs. {product.price.toLocaleString("en-PK")}
                    </span>
                    <button className="text-xs tracking-wider text-[#C5B6BC] transition hover:text-[#E8C96A]">
                      VIEW DETAILS ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="py-16 text-center text-[#C5B6BC]">
              No products found in this category.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
