"use client";
import Link from "next/link";
import { useState } from "react";
export default function RefrigeratorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const refrigerators = [
    {
      id: 1,
      name: "Dawlance Refrigerator 1",
      price: "Rs. 129,999",
      category: "Double Door",
      image: "/dawlence-fridge-1.jfif",
    },
    {
      id: 2,
      name: "Dawlance Refrigerator 2",
      price: "Rs. 139,999",
      category: "Double Door",
      image: "/dawlence-fridge-2.jfif",
    },
    {
      id: 3,
      name: "Dawlance Refrigerator 3",
      price: "Rs. 149,999",
      category: "Top Mount",
      image: "/dawlence-fridge-3.jfif",
    },
    {
      id: 4,
      name: "Dawlance Refrigerator 4",
      price: "Rs. 159,999",
      category: "Top Mount",
      image: "/dawlence-fridge-4.jfif",
    },
    {
      id: 5,
      name: "Dawlance Refrigerator 5",
      price: "Rs. 169,999",
      category: "Side by Side",
      image: "/dawlence-fridge-5.jfif",
    },
    {
      id: 6,
      name: "Dawlance Refrigerator 6",
      price: "Rs. 179,999",
      category: "Side by Side",
      image: "/dawlence-fridge-6.jfif",
    },
    {
      id: 7,
      name: "Dawlance Refrigerator 7",
      price: "Rs. 189,999",
      category: "French Door",
      image: "/dawlence-fridge-7.jfif",
    },
    {
      id: 8,
      name: "Dawlance Refrigerator 8",
      price: "Rs. 199,999",
      category: "French Door",
      image: "/dawlence-fridge-8.jfif",
    },
  ];
  const categories = [
    "All",
    "Double Door",
    "Top Mount",
    "Side by Side",
    "French Door",
  ];
  const filteredProducts =
    selectedCategory === "All"
      ? refrigerators
      : refrigerators.filter(
          (item) => item.category === selectedCategory
        );
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-5 md:px-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/electronics"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#B89542] hover:text-[#E8C96A] transition-colors duration-300 mb-14"
        >
          <span className="text-lg">←</span>
          Back to Electronics
        </Link>
        <div className="text-center mb-16">
          <p className="text-[#B89542] uppercase tracking-[0.45em] text-xs md:text-sm mb-5">
            Dawlance Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-wide">
            Refrigerators
          </h1>
          <div className="w-24 h-[1px] bg-[#B89542] mx-auto mt-7" />
          <p className="text-gray-400 max-w-2xl mx-auto mt-7 leading-7">
            Explore our collection of Dawlance refrigerators, designed
            to bring elegance, performance and modern functionality
            into your home.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.2em] border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#E8C96A] text-[#100D11] border-[#E8C96A]"
                  : "border-[#B89542]/40 text-gray-400 hover:border-[#E8C96A] hover:text-[#E8C96A]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-b border-[#B89542]/20 pb-5 mb-8">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="text-[#E8C96A]">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
            Premium Appliances
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-[#151116] border border-[#B89542]/25 overflow-hidden transition-all duration-500 hover:border-[#E8C96A]/80 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(184,149,66,0.12)]"
            >
              <Link
                href={`/electronics/dawlance/refrigerators/${item.id}`}
                className="block"
              >
                <div className="relative h-[300px] overflow-hidden bg-[#0d0a0e]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100D11]/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#E8C96A] border border-[#E8C96A]/50 bg-[#100D11]/80 px-3 py-2">
                      Dawlance
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#B89542]">
                  {item.category}
                </p>
                <h2 className="text-xl font-serif mt-3 leading-7">
                  {item.name}
                </h2>
                <div className="flex items-center justify-between mt-5">
                  <p className="text-[#E8C96A] text-lg">
                    {item.price}
                  </p>
                  <span className="text-gray-600 text-xs">
                    #{item.id}
                  </span>
                </div>
                <Link
                  href={`/electronics/dawlance/refrigerators/${item.id}`}
                  className="mt-6 block w-full border border-[#B89542]/50 py-3 text-center text-[10px] uppercase tracking-[0.25em] text-[#E8C96A] transition-all duration-300 hover:bg-[#E8C96A] hover:text-[#100D11] hover:border-[#E8C96A]"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
