"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Girls", "Boys", "Casual", "Festive"];

const kidsLooks = [
  {
    id: 1,
    name: "Royal Little Princess",
    category: "Girls",
    description: "Elegant festive frock",
    price: 3200,
    image: "/royal-frok.jfif",
    label: "BESTSELLER",
  },
  {
    id: 2,
    name: "Traditional Charm",
    category: "Girls",
    description: "Traditional girls wear",
    price: 2800,
    image: "/grils-traditional-wear.jfif",
    label: "TIMELESS",
  },
  {
    id: 3,
    name: "Little Gentleman",
    category: "Boys",
    description: "Classic boys formalwear",
    price: 4500,
    image: "/tiny-pent-coat.jfif",
    label: "SMART PICK",
  },
  {
    id: 4,
    name: "Winter Snuggles",
    category: "Casual",
    description: "Cozy sweater and trousers",
    price: 2400,
    image: "/sweater-trouser.jfif",
    label: "EVERYDAY",
  },
  {
    id: 5,
    name: "Festive Frills",
    category: "Festive",
    description: "A little extra sparkle",
    price: 3500,
    image: "/frok.jfif",
    label: "FESTIVE",
  },
  {
    id: 6,
    name: "Mini Style",
    category: "Casual",
    description: "Playful everyday outfit",
    price: 1900,
    image: "/girls-frill-bottom.jfif",
    label: "",
  },
  {
    id: 7,
    name: "Little Royal",
    category: "Boys",
    description: "Traditional boys outfit",
    price: 3000,
    image: "/traditional-boys-wear.jfif",
    label: "CLASSIC",
  },
  {
    id: 8,
    name: "Cozy Days",
    category: "Casual",
    description: "Comfort meets style",
    price: 2200,
    image: "/warm-sweater-trouser.jfif",
    label: "",
  },
];

export default function KidsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredLooks =
    activeCategory === "All"
      ? kidsLooks
      : kidsLooks.filter(
          (item) => item.category === activeCategory
        );

  return (
    <main className="min-h-screen overflow-hidden bg-[#100D11] text-[#F1E8EB]">
      <div className="mx-auto max-w-[1500px] px-5 pt-6 sm:px-8 lg:px-14">
        <Link
          href="/fashion"
          className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-gray-400 transition duration-300 hover:text-[#E8C96A] sm:text-xs"
        >
          <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Back to Fashion
        </Link>
      </div>

      <section className="relative mt-5 overflow-hidden border-b border-[#E8C96A]/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,201,106,0.13),transparent_65%)]" />

        <div className="relative mx-auto flex max-w-[1500px] flex-col items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:flex-row lg:gap-16 lg:px-14 lg:py-28">
          <div className="w-full text-center lg:w-[52%] lg:text-left">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#E8C96A] sm:text-xs sm:tracking-[0.45em]">
              SHOPSPHERE · THE LITTLE EDIT
            </p>

            <h1 className="mt-6 font-serif text-5xl leading-[1.12] sm:text-6xl lg:text-7xl xl:text-8xl">
              Little Looks,
              <span className="mt-2 block italic text-[#E8C96A]">
                Big Dreams.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#BDB0B7] sm:text-base sm:leading-8 lg:mx-0">
              Thoughtfully chosen little outfits for their
              biggest adventures, sweetest celebrations
              and every beautiful moment in between.
            </p>

            <a
              href="#kids-collection"
              className="mt-8 inline-flex items-center gap-4 border border-[#E8C96A]/70 px-7 py-4 text-[10px] uppercase tracking-[0.25em] text-[#E8C96A] transition duration-300 hover:bg-[#E8C96A] hover:text-[#100D11] sm:text-xs"
            >
              Explore the Collection
              <span className="text-base">↗</span>
            </a>

            <div className="mt-10 flex justify-center gap-8 border-t border-white/10 pt-6 lg:justify-start">
              <div>
                <p className="font-serif text-2xl text-[#E8C96A]">01</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  Little Moments
                </p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="font-serif text-2xl text-[#E8C96A]">02</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  Special Days
                </p>
              </div>
              <div className="border-l border-white/10 pl-8">
                <p className="font-serif text-2xl text-[#E8C96A]">03</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  Timeless Style
                </p>
              </div>
            </div>
          </div>

          <div className="group relative w-full max-w-[520px] lg:w-[48%]">
            <div className="absolute -inset-3 border border-[#E8C96A]/20 transition duration-700 group-hover:inset-0" />

            <div className="relative h-[390px] overflow-hidden sm:h-[540px]">
              <img
                src="/kids.PNG"
                alt="ShopSphere Kids Collection"
                className="h-full w-full object-cover object-center transition duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#100D11]/85 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#E8C96A] sm:text-xs">
                  MADE FOR THEIR MOMENTS
                </p>
                <h2 className="mt-3 font-serif text-3xl italic sm:text-4xl">
                  Small wonders.
                </h2>
                <p className="mt-2 text-xs tracking-wider text-gray-300">
                  A world of little possibilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="kids-collection"
        className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-14"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#E8C96A] sm:text-xs">
              THE LITTLE WARDROBE
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Dressed for Wonder
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-400">
              From everyday favourites to unforgettable
              celebrations, find something special for every little one.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`border px-4 py-3 text-[10px] uppercase tracking-[0.12em] transition duration-300 sm:px-5 sm:text-xs ${
                  activeCategory === category
                    ? "border-[#E8C96A] bg-[#E8C96A] text-[#100D11]"
                    : "border-white/15 text-gray-300 hover:border-[#E8C96A] hover:text-[#E8C96A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="text-xs text-gray-400 sm:text-sm">
            {filteredLooks.length} little looks
          </p>

          <p className="text-right text-[9px] uppercase tracking-[0.15em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
            Made for little memories
          </p>
        </div>

        {filteredLooks.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {filteredLooks.map((item) => (
              <article
                key={item.id}
                className="group min-w-0"
              >
                <div className="relative overflow-hidden border border-white/10 bg-[#19151B]">
                  <div className="relative h-[210px] overflow-hidden sm:h-[300px] lg:h-[350px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                    />

                    {item.label && (
                      <span className="absolute left-2 top-2 border border-[#E8C96A]/40 bg-[#100D11]/85 px-2 py-2 text-[7px] tracking-[0.12em] text-[#E8C96A] sm:left-3 sm:top-3 sm:text-[9px]">
                        {item.label}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#E8C96A] py-3 text-center text-[9px] uppercase tracking-[0.2em] text-[#100D11] transition duration-300 group-hover:translate-y-0">
                    Little Style, Big Smiles
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-[#B89542] sm:text-[10px] sm:tracking-[0.2em]">
                    {item.category} Collection
                  </p>

                  <h3 className="mt-2 font-serif text-base leading-snug transition-colors duration-300 group-hover:text-[#E8C96A] sm:text-xl">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-gray-500 sm:text-xs">
                    {item.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                    <p className="text-xs text-[#E8C96A] sm:text-sm">
                      Rs. {item.price.toLocaleString("en-PK")}
                    </p>

                    <span className="text-[8px] uppercase tracking-[0.12em] text-gray-400 transition-colors group-hover:text-[#E8C96A] sm:text-[10px]">
                      Explore ↗
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-[#E8C96A]">
              More Little Wonders Soon
            </p>
            <p className="mt-3 text-sm text-gray-400">
              New styles are waiting to be added to this collection.
            </p>
          </div>
        )}
      </section>
      <section className="relative overflow-hidden border-t border-[#E8C96A]/20 px-5 py-16 text-center sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,201,106,0.08),transparent_65%)]" />
        <div className="relative">
          <p className="text-[9px] uppercase tracking-[0.35em] text-gray-500 sm:text-xs">
            FOR THE LITTLE THINGS THAT MATTER
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl italic leading-tight text-[#E8C96A] sm:text-5xl">
            Their childhood. Their style. Their story.
          </h2>
          <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
            SHOPSPHERE · THE LITTLE EDIT
          </p>
          <Link
            href="/fashion"
            className="mt-8 inline-flex border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition duration-300 hover:border-[#E8C96A] hover:text-[#E8C96A]"
          >
            Back to Fashion
          </Link>
        </div>
      </section>
    </main>
  );
}