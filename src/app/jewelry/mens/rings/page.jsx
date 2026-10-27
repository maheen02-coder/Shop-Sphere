"use client";

import Link from "next/link";

const rings = [
  {
    id: "301",
    name: "Royal Signet Ring",
    price: 4500,
    image: "/men-ring2.jfif",
    tag: "BESTSELLER",
  },
  {
    id: "302",
    name: "Classic Gold Ring",
    price: 5200,
    image: "/men-ring2.jfif",
    tag: "TIMELESS",
  },
  {
    id: "303",
    name: "Modern Statement Ring",
    price: 6000,
    image: "/men-ring2.jfif",
    tag: "SIGNATURE",
  },
  {
    id: "304",
    name: "Minimal Silver Ring",
    price: 3800,
    image: "/men-ring2.jfif",
    tag: "ESSENTIAL",
  },
];

export default function MensRings() {
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-8 text-[#F1E8EB] sm:px-10 lg:px-16">
      <Link
        href="/"
        className="text-sm text-[#B8AEB6] transition hover:text-[#E8C96A]"
      >
        ← Back to Home
      </Link>

      <section className="mx-auto max-w-7xl pt-12">
        <p className="text-xs uppercase tracking-[0.35em] text-[#E8C96A]">
          ShopSphere / Men's Jewelry / Rings
        </p>

        <div className="mt-5 flex flex-col justify-between gap-5 border-b border-[#B89542]/30 pb-8 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-light sm:text-6xl">
              Men's <span className="text-[#E8C96A]">Rings</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#B8AEB6]">
              Discover distinctive rings crafted to complement your style,
              from understated essentials to bold statement pieces.
            </p>
          </div>

          <p className="text-sm text-[#B8AEB6]">
            {rings.length} Signature Pieces
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <span className="border border-[#E8C96A] bg-[#E8C96A] px-5 py-2 text-xs uppercase tracking-wider text-[#100D11]">
            All Rings
          </span>
          <span className="border border-[#B89542]/40 px-5 py-2 text-xs uppercase tracking-wider text-[#B8AEB6]">
            Signet
          </span>
          <span className="border border-[#B89542]/40 px-5 py-2 text-xs uppercase tracking-wider text-[#B8AEB6]">
            Minimal
          </span>
          <span className="border border-[#B89542]/40 px-5 py-2 text-xs uppercase tracking-wider text-[#B8AEB6]">
            Statement
          </span>
        </div>

        <section className="mt-10 flex flex-wrap gap-x-6 gap-y-10">
          {rings.map((ring) => (
            <Link
              href={`/jewelry/mens/rings/${ring.id}`}
              key={ring.id}
              className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div className="relative h-[320px] overflow-hidden border border-[#B89542]/20 bg-[#181319] sm:h-[350px]">
                <img
                  src={ring.image}
                  alt={ring.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 border border-[#E8C96A]/50 bg-[#100D11]/85 px-3 py-2 text-[9px] tracking-[0.2em] text-[#E8C96A]">
                  {ring.tag}
                </span>

                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#E8C96A] px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-[#100D11] transition-transform duration-300 group-hover:translate-y-0">
                  View Details →
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 pt-5">
                <div>
                  <h2 className="text-base transition group-hover:text-[#E8C96A]">
                    {ring.name}
                  </h2>
                  <p className="mt-2 text-xs text-[#B8AEB6]">
                    Men's Signature Collection
                  </p>
                </div>

                <p className="whitespace-nowrap text-sm text-[#E8C96A]">
                  Rs. {ring.price.toLocaleString("en-PK")}
                </p>
              </div>
            </Link>
          ))}
        </section>

        <div className="mt-16 border-t border-[#B89542]/25 py-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B8AEB6]">
            Designed for distinction
          </p>
        </div>
      </section>
    </main>
  );
}