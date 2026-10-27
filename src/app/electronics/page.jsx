"use client";
import Link from "next/link";
const companies = [
  {
    name: "Dawlance",
    description: "Refrigerators & Home Cooling",
    image: "./dawlence-logo.jpg",
    slug: "dawlance",
    number: "01",
  },
  {
    name: "Orient",
    description: "Refrigerators & Air Conditioners",
    image: "./orient-logo.jpg",
    slug: "orient",
    number: "02",
  },
  {
    name: "Kenwood",
    description: "Microwaves & Stoves",
    image: "/kenwood-logo.jfif",
    slug: "kenwood",
    number: "03",
  },
  {
    name: "Haier",
    description: "Washing Machines & Appliances",
    image: "./haier-logo.jpg",
    slug: "haier",
    number: "04",
  },
  {
    name: "Samsung",
    description: "TVs, Mobiles & Tablets",
    image: "/samsung-logo.jpg",
    slug: "samsung",
    number: "05",
  },
  {
    name: "Apple",
    description: "iPhone, iPad & MacBook",
    image: "/apple-logo.jpg",
    slug: "apple",
    number: "06",
  },
];
export default function ElectronicsPage() {
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#B89542]/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] transition-all duration-300 hover:border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11]"
          >
            ← Back to Home
          </Link>
        </div>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#B89542]/30 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#E8C96A]">
              ShopSphere / Collections
            </p>
            <h1 className="text-4xl font-light tracking-tight sm:text-6xl">
              Electronics<span className="text-[#E8C96A]">.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#B8AEB6] sm:text-base">
              Discover technology and everyday essentials from trusted
              brands, all in one place.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8AEB6]">
            06 Brands · Explore Collections
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link
              href={`/electronics/${company.slug}`}
              key={company.slug}
              className="group block"
            >
              <div className="relative overflow-hidden border border-[#B89542]/20 bg-[#181419]">
                <div className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center border border-[#E8C96A]/50 bg-[#100D11]/80 text-xs text-[#E8C96A]">
                  {company.number}
                </div>
                <div className="aspect-[4/5] overflow-hidden p-4 sm:p-6">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-3 border-b border-[#B89542]/25 py-5 transition-colors duration-300 group-hover:border-[#E8C96A]">
                <div>
                  <h2 className="text-2xl font-light tracking-wide transition-colors duration-300 group-hover:text-[#E8C96A]">
                    {company.name}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-[#B8AEB6] sm:text-sm">
                    {company.description}
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
            SHOPSPHERE — Technology for Modern Living
          </p>
        </div>
      </section>
    </main>
  );
}
