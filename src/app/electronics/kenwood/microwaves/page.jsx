"use client";
import Link from "next/link";
const microwaves = [
  {
    id: 1,
    name: "Kenwood Microwave 01",
    image: "/kenwood-microwave-1.jfif",
    price: "Rs. 24,999",
  },
  {
    id: 2,
    name: "Kenwood Microwave 02",
    image: "/kenwood-microwave-2.jfif",
    price: "Rs. 27,999",
  },
  {
    id: 3,
    name: "Kenwood Microwave 03",
    image: "/kenwood-microwave-3.jfif",
    price: "Rs. 29,999",
  },
  {
    id: 4,
    name: "Kenwood Microwave 04",
    image: "/kenwood-microwave-4.jfif",
    price: "Rs. 32,999",
  },
  {
    id: 5,
    name: "Kenwood Microwave 05",
    image: "/kenwood-microwave-5.jfif",
    price: "Rs. 34,999",
  },
];
export default function KenwoodMicrowavesPage() {
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/electronics/kenwood"
            className="inline-flex items-center gap-2 border border-[#B89542]/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] transition-all duration-300 hover:border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11]"
          >
            ← Back to Kenwood
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#B89542]/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] transition-all duration-300 hover:border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11]"
          >
            Home
          </Link>
        </div>
        <div className="mb-12 border-b border-[#B89542]/30 pb-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#E8C96A]">
            ShopSphere / Electronics / Kenwood
          </p>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-light tracking-tight sm:text-6xl">
                Microwaves<span className="text-[#E8C96A]">.</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#B8AEB6] sm:text-base">
                Explore Kenwood microwaves designed for convenient cooking
                and modern kitchens.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8AEB6]">
              05 Products
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {microwaves.map((product) => (
            <Link
              href={`/electronics/kenwood/microwaves/${product.id}`}
              key={product.id}
              className="group block"
            >
              <div className="relative overflow-hidden border border-[#B89542]/20 bg-[#181419]">
                <div className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center border border-[#E8C96A]/50 bg-[#100D11]/80 text-xs text-[#E8C96A]">
                  0{product.id}
                </div>
                <div className="aspect-square overflow-hidden p-6 sm:p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-[#B89542]/25 py-5 transition-colors duration-300 group-hover:border-[#E8C96A]">
                <div>
                  <h2 className="text-xl font-light tracking-wide transition-colors duration-300 group-hover:text-[#E8C96A]">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#E8C96A]">
                    {product.price}
                  </p>
                </div>
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B89542]/40 text-[#E8C96A] transition-all duration-300 group-hover:border-[#E8C96A] group-hover:bg-[#E8C96A] group-hover:text-[#100D11]">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 border-t border-[#B89542]/30 pt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8AEB6]">
            SHOPSPHERE — Kenwood Microwaves
          </p>
        </div>
      </section>
    </main>
  );
}
