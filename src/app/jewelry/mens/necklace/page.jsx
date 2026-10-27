"use client";

import Link from "next/link";

const necklaces = [
  {
    id: "401",
    name: "Classic Silver Chain",
    price: 3800,
    image: "/mens-necklace1.jfif",
    collection: "Men's Signature",
    tag: "BESTSELLER",
    description: "A refined silver-toned chain designed for modern sophistication and effortless wear.",
  },
  {
    id: "402",
    name: "Obsidian Pendant Necklace",
    price: 4600,
    image: "/mens-necklace2.jfif",
    collection: "Men's Signature",
    tag: "FEATURED",
    description: "A bold statement pendant that embodies strength, poise, and distinct character.",
  },
  {
    id: "403",
    name: "Cuban Link Luxury Necklace",
    price: 5400,
    image: "/mens-necklace3.jfif",
    collection: "Men's Luxury",
    tag: "EXCLUSIVE",
    description: "A meticulously crafted Cuban link necklace with a polished finish and substantial weight.",
  },
];

export default function MensNecklaces() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-5 sm:px-10 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/jewelry/mens"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] hover:text-[#E8C96A] transition mb-10"
        >
          <span>←</span> Back to Men's Jewelry
        </Link>

        <header className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#E8C96A] mb-4">
            ShopSphere Men's Collection
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#F1E8EB]">
            Men's <span className="text-[#E8C96A]">Necklaces</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#B8AEB6] text-sm sm:text-base leading-8 mt-5">
            Distinctive necklaces crafted to express individuality, confidence, and enduring craftsmanship.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {necklaces.map((item) => (
            <Link
              key={item.id}
              href={`/jewelry/mens/necklace/${item.id}`}
              className="group border border-[#B89542]/30 bg-[#181319] overflow-hidden transition-all duration-500 hover:border-[#E8C96A] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(232,201,106,0.1)] flex flex-col"
            >
              <div className="relative h-[340px] overflow-hidden bg-[#100D11]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 border border-[#E8C96A]/50 bg-[#100D11]/85 px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#E8C96A]">
                  {item.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#E8C96A] py-3 text-center text-xs uppercase tracking-[0.2em] text-[#100D11] transition-transform duration-300 group-hover:translate-y-0">
                  View Details →
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89542] mb-2">
                    {item.collection}
                  </p>
                  <h2 className="text-xl font-serif text-[#F1E8EB] group-hover:text-[#E8C96A] transition">
                    {item.name}
                  </h2>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#B89542]/20 pt-4">
                  <span className="text-lg font-semibold text-[#E8C96A]">
                    Rs. {item.price.toLocaleString("en-PK")}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#B8AEB6] group-hover:text-[#E8C96A] transition">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <div className="mt-16 border-t border-[#B89542]/25 py-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B8AEB6]">
            ShopSphere — Handcrafted For Distinction
          </p>
        </div>
      </div>
    </main>
  );
}
