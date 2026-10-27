"use client";
import Link from "next/link";
const collections = [
  {
    name: "Microwaves",
    description: "Modern microwaves for quick and convenient cooking.",
    image: "/kenwood-microwave-1.jfif",
    slug: "microwaves",
    number: "01",
  },
  {
    name: "Stoves",
    description: "Reliable Kenwood stoves designed for everyday cooking.",
    image: "/kenwood-stoove-1.jfif",
    slug: "stoves",
    number: "02",
  },
];
export default function KenwoodPage() {
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/electronics"
            className="inline-flex items-center gap-2 border border-[#B89542]/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] transition-all duration-300 hover:border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11]"
          >
            ← Back to Electronics
          </Link>
        </div>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#B89542]/30 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#E8C96A]">
              ShopSphere / Electronics / Kenwood
            </p>
            <h1 className="text-4xl font-light tracking-tight sm:text-6xl">
              Kenwood<span className="text-[#E8C96A]">.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#B8AEB6] sm:text-base">
              Explore Kenwood kitchen appliances designed for modern
              kitchens and everyday living.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8AEB6]">
            02 Collections · Explore
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {collections.map((collection) => (
            <Link
              href={`/electronics/kenwood/${collection.slug}`}
              key={collection.slug}
              className="group block"
            >
              <div className="relative overflow-hidden border border-[#B89542]/20 bg-[#181419]">
                <div className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-[#E8C96A]/50 bg-[#100D11]/80 text-xs text-[#E8C96A]">
                  {collection.number}
                </div>
                <div className="aspect-[4/3] overflow-hidden p-6 sm:p-10">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-[#B89542]/25 py-6 transition-colors duration-300 group-hover:border-[#E8C96A]">
                <div>
                  <h2 className="text-3xl font-light tracking-wide transition-colors duration-300 group-hover:text-[#E8C96A]">
                    {collection.name}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[#B8AEB6]">
                    {collection.description}
                  </p>
                </div>
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B89542]/40 text-[#E8C96A] transition-all duration-300 group-hover:border-[#E8C96A] group-hover:bg-[#E8C96A] group-hover:text-[#100D11]">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 border-t border-[#B89542]/30 pt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8AEB6]">
            SHOPSPHERE — Kenwood Collection
          </p>
        </div>
      </section>
    </main>
  );
}
