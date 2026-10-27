import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

const collections = [
  {
    title: "Fashion",
    description: "Timeless silhouettes, festive pieces and everyday essentials.",
    image: "/fashion.jfif",
    href: "/fashion",
    number: "01",
  },
  {
    title: "Electronics",
    description: "Trusted appliances and devices for modern living.",
    image: "/electronics.jfif",
    href: "/electronics",
    number: "02",
  },
  {
    title: "Fine Jewellery",
    description: "Gold-toned rings and necklaces for women and men.",
    image: "/jewelry.jfif",
    href: "/jewelry",
    number: "03",
  },
  {
    title: "Signature Fragrances",
    description: "Distinctive scents for everyday and evening wear.",
    image: "/perfume.jfif",
    href: "/fragrances",
    number: "04",
  },
  {
    title: "Premium Watches",
    description: "Smart and classic timepieces with refined finishing.",
    image: "/watches.jpg",
    href: "/watches",
    number: "05",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-14 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
              The ShopSphere Edit
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl">
              Our <span className="italic text-[#E8C96A]">Collections</span>
            </h1>
            <p className="mt-5 text-sm leading-8 text-[#C5B6BC]">
              Five distinct worlds, one considered storefront. Explore each
              collection or browse everything in the shop.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <Link
                key={collection.title}
                href={collection.href}
                className={`group relative overflow-hidden border border-[#B89542]/20 bg-[#19141A] ${
                  index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className={`relative ${index === 0 ? "h-72 sm:h-80" : "h-72"}`}>
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100D11] via-[#100D11]/35 to-transparent" />
                  <span className="absolute left-5 top-5 border border-[#E8C96A]/50 bg-[#100D11]/70 px-2.5 py-1 text-[9px] tracking-[0.2em] text-[#E8C96A]">
                    {collection.number}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h2 className="font-serif text-3xl transition-colors group-hover:text-[#E8C96A]">
                      {collection.title}
                    </h2>
                    <p className="mt-2 text-xs leading-6 text-[#D8CDD1]">
                      {collection.description}
                    </p>
                    <span className="mt-4 inline-flex text-[10px] uppercase tracking-[0.2em] text-[#E8C96A]">
                      Explore ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border border-[#B89542]/25 bg-[#19141A] px-7 py-6 sm:flex-row">
            <div>
              <h2 className="font-serif text-2xl">Not sure where to start?</h2>
              <p className="mt-1 text-xs text-[#B8AEB6]">
                Search the full catalogue with filters and sorting.
              </p>
            </div>
            <Link
              href="/shop"
              className="border border-[#E8C96A] bg-[#E8C96A] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A]"
            >
              Shop everything
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
