
import Link from "next/link";

const categories = [
  {
    name: "Refrigerators",
    description: "Modern cooling solutions for your home.",
    image: "/orient-fridge-1.jfif",
    href: "/electronics/orient/refrigerators",
  },
  {
    name: "Air Conditioners",
    description: "Comfort and climate control in every season.",
    image: "/orient-ac-1.jfif",
    href: "/electronics/orient/air-conditioners",
  },
];
export default function OrientPage() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-5 md:px-10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/electronics"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#B89542] hover:text-[#E8C96A] transition mb-14"
        >
          ← Back to Electronics
        </Link>
        <header className="text-center mb-16">
          <p className="text-[#B89542] uppercase tracking-[0.45em] text-xs mb-5">
            Premium Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif">
            Orient
          </h1>
          <div className="w-24 h-px bg-[#B89542] mx-auto mt-7" />
          <p className="text-gray-400 max-w-xl mx-auto mt-7 leading-7">
            Discover modern appliances that bring elegance,
            comfort and performance to everyday living.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="group border border-[#B89542]/30 bg-[#151116] overflow-hidden transition-all duration-500 hover:border-[#E8C96A] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(184,149,66,0.15)]"
            >
              <div className="relative h-[330px] overflow-hidden">
                <img
                  src={item.image}
                  alt={`Orient ${item.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100D11] via-transparent to-transparent" />
                <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.3em] text-[#E8C96A] border border-[#E8C96A]/50 bg-[#100D11]/75 px-3 py-2">
                  Orient
                </span>
              </div>
              <div className="px-7 py-8 text-center">
                <h2 className="text-3xl font-serif">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-400 mt-4">
                  {item.description}
                </p>
                <p className="mt-7 text-xs uppercase tracking-[0.25em] text-[#E8C96A]">
                  Explore Collection →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
