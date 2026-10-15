"use client";
import Link from "next/link";
const categories = [
  {
    title: "Women",
    description: "Discover refined clothing, elegant accessories and everyday essentials.",
    image: "/women.PNG",
    number: "01",
  },
  {
    title: "Men",
    description: "Explore modern essentials, timeless styles and distinctive pieces.",
    image: "/men.PNG",
    number: "02",
  },
  {
    title: "kids",
    description: "Find comfortable, stylish and playful pieces for little ones.",
    image: "/kids.PNG",
    number: "03",
  },
];
export default function FashionPage() {
  
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-16 text-[#F1E8EB] sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#C5B6BC] transition hover:text-[#E8C96A]"
        >
          <span>←</span> BACK TO HOME
        </Link>
        <div className="mb-14 text-center sm:mb-20">
          <p className="mb-5 text-[10px] font-semibold tracking-[0.4em] text-[#E8C96A] sm:text-xs">
            VELVETY THORNS · THE FASHION EDIT
          </p>
          <h1 className="font-serif text-5xl font-normal sm:text-6xl lg:text-7xl">
            Fashion{" "}
            <span className="italic text-[#E8C96A]">Collections</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#C5B6BC] sm:text-base">
            Explore distinctive styles, timeless essentials and carefully
            curated collections for everyone.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-7">
          {categories.map((category) => (
            <Link
              key={category.number}
              href={`/fashion/${category.title.toLowerCase()}`}
              className="group w-full border border-[#B89542]/20 bg-[#19141A] p-3 transition-all duration-500 hover:-translate-y-2 hover:border-[#E8C96A]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-19px)]"
            >
              <div className="relative h-[340px] overflow-hidden bg-[#241D23] sm:h-[400px]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100D11]/80 via-transparent to-[#100D11]/10" />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center border border-[#E8C96A]/50 bg-[#100D11]/75 text-xs text-[#E8C96A]">
                  {category.number}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h2 className="font-serif text-3xl text-white transition-colors duration-300 group-hover:text-[#E8C96A] sm:text-4xl">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-xs leading-7 text-[#E0D5DA] sm:text-sm">
                    {category.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#E8C96A]/30 pt-4">
                    <span className="text-[10px] tracking-[0.2em] text-[#E8C96A]">
                      EXPLORE COLLECTION
                    </span>
                    <span className="text-lg text-[#E8C96A] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
// export default function Fashion() {
//   return (
//     <div>
//       <h1>Fashion Page</h1>
//     </div>
//   );
// }