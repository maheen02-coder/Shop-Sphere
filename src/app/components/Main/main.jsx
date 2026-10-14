"use client";
import React from "react";
import Link from "next/link";
const categories = [
  {
    title: "Fashion",
    description: "Discover timeless styles.",
    image: "/fashion.jfif",
    number: "01",
    label: "STYLE & APPAREL",
    slug: "fashion",
  },
  {
    title: "Electronics",
    description:
      "Explore modern technology, trusted devices and everyday essentials.",
    image: "/electronics.jfif",
    number: "02",
    label: "TECH & INNOVATION",
    slug: "electronics",
  },
  {
    title: "Fine Jewellery",
    description:
      "Elegant gold-toned details and statement jewellery for memorable moments.",
    image: "/jewelry.jfif",
    number: "03",
    label: "TIMELESS ELEGANCE",
    slug: "jewellery",
  },
  {
    title: "Signature Fragrances",
    description:
      "Find captivating scents with distinctive character for every occasion.",
    image: "/perfume.jfif",
    number: "04",
    label: "SCENT COLLECTION",
    slug: "fragrances",
  },
  {
    title: "Premium Watches",
    description:
      "Discover sophisticated timepieces that bring together style and precision.",
    image: "/watches.jpg",
    number: "05",
    label: "TIME & CRAFT",
    slug: "watches",
  },
];
const Main = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#100D11] px-5 py-20 text-[#F1E8EB] sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <span className="mb-5 inline-block text-[10px] font-semibold tracking-[0.4em] text-[#E8C96A] sm:text-xs">
            THE VELVETY THORNS COLLECTION
          </span>
          <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#F1E8EB] sm:text-5xl lg:text-7xl">
            Discover Your{" "}
            <span className="italic text-[#E8C96A]">
              Style.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#C5B6BC] sm:text-base">
            Curated essentials. Distinctive details. Timeless
            elegance for those who choose to stand apart.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#B89542]/60" />
            <span className="text-sm text-[#E8C96A]">✦</span>
            <span className="h-px w-12 bg-[#B89542]/60" />
          </div>
        </div>
        <div className="flex flex-wrap items-stretch justify-center gap-6 lg:gap-7">
          {categories.map((category) => (
            <article
              key={category.number}
              className="group flex w-full min-w-0 flex-col border border-[#B89542]/20 bg-[#19141A]/90 p-3 transition-all duration-500 hover:-translate-y-2 hover:border-[#E8C96A]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-19px)]"
            >
              <Link
                href={`/${category.slug}`}
                className="flex h-full flex-col"
              >
                <div className="relative h-72 overflow-hidden bg-[#241D23] sm:h-80">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100D11]/55 via-transparent to-[#100D11]/10 transition-opacity duration-500 group-hover:opacity-70" />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center border border-[#E8C96A]/50 bg-[#100D11]/75 text-xs tracking-widest text-[#E8C96A] backdrop-blur-sm">
                    {category.number}
                  </span>
                  <span className="absolute bottom-4 left-4 text-[9px] font-medium tracking-[0.25em] text-[#F1E8EB]">
                    {category.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-3 pb-4 pt-6 sm:px-4">
                  <h3 className="font-serif text-2xl font-normal text-[#F1E8EB] transition-colors duration-300 group-hover:text-[#E8C96A] sm:text-3xl">
                    {category.title}
                  </h3>
                  <p className="mt-3 flex-1 text-xs leading-7 text-[#B9AAB1] sm:text-sm">
                    {category.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-[#B89542]/20 pt-5">
                    <span className="text-[9px] font-semibold tracking-[0.2em] text-[#E8C96A] sm:text-[10px]">
                      EXPLORE COLLECTION
                    </span>
                    <span className="text-lg text-[#E8C96A] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 text-center text-[9px] font-medium tracking-[0.25em] text-[#B9AAB1] sm:mt-20 sm:gap-6">
          <span>CURATED WITH PURPOSE</span>
          <span className="text-[#E8C96A]">✦</span>
          <span>DESIGNED TO BE DISTINCTIVE</span>
        </div>
      </div>
    </section>
  );
};
export default Main;

