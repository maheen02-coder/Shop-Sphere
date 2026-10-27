
"use client";

import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Orient Air Conditioner 1",
    price: "Rs. 149,999",
    image: "/orient-ac-1.jfif",
  },
  {
    id: 2,
    name: "Orient Air Conditioner 2",
    price: "Rs. 159,999",
    image: "/orient-ac-2.jfif",
  },
  {
    id: 3,
    name: "Orient Air Conditioner 3",
    price: "Rs. 169,999",
    image: "/orient-ac-3.jfif",
  },
  {
    id: 4,
    name: "Orient Air Conditioner 4",
    price: "Rs. 179,999",
    image: "/orient-ac-4.jfif",
  },
];

export default function OrientAirConditionersPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-5 md:px-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/electronics/orient"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#B89542] hover:text-[#E8C96A] mb-12"
        >
          ← Back to Orient
        </Link>

        <header className="text-center mb-14">
          <p className="text-[#B89542] uppercase tracking-[0.4em] text-xs mb-5">
            Orient Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-serif">
            Air Conditioners
          </h1>

          <div className="w-24 h-px bg-[#B89542] mx-auto mt-7" />

          <p className="text-gray-400 max-w-xl mx-auto mt-6 leading-7">
            Discover modern air conditioners for comfortable living.
          </p>
        </header>

        <p className="text-sm text-gray-400 mb-7">
          Showing {products.length} products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((item) => (
            <article
              key={item.id}
              className="group border border-[#B89542]/25 bg-[#151116] overflow-hidden transition-all duration-500 hover:border-[#E8C96A] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(184,149,66,0.10)]"
            >
              <div className="h-[300px] overflow-hidden bg-[#0D0A0E]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#B89542]">
                  Orient Appliances
                </p>

                <h2 className="text-xl font-serif mt-3">
                  {item.name}
                </h2>

                <p className="text-lg text-[#E8C96A] mt-5">
                  {item.price}
                </p>

                <button
                  onClick={() => setSelectedProduct(item)}
                  className="mt-6 w-full border border-[#B89542]/50 py-3 text-xs uppercase tracking-[0.2em] text-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11] transition"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>

        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-5"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="relative w-full max-w-lg bg-[#151116] border border-[#B89542]/50 p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-4 text-[#E8C96A] text-2xl"
                aria-label="Close details"
              >
                ×
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-72 object-cover"
              />

              <h2 className="text-2xl font-serif mt-6">
                {selectedProduct.name}
              </h2>

              <p className="text-[#E8C96A] text-xl mt-3">
                {selectedProduct.price}
              </p>

              <p className="text-gray-400 text-sm mt-4">
                Brand: Orient
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
