import Link from "next/link";

const categories = [
  {
    title: "Women's Jewelry",
    subtitle: "Elegance in Every Detail",
    image: "/women-category-jewellry-pic.jfif",
    href: "/jewelry/womens",
    number: "01",
  },
  {
    title: "Men's Jewelry",
    subtitle: "A Statement of Character",
    image: "/men-category-jewellry-pic.jfif",
    href: "/jewelry/mens",
    number: "02",
  },
];

export default function JewelryPage() {
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-10 text-[#F1E8EB] sm:px-10 lg:px-16">
      <Link
        href="/"
        className="text-sm text-[#B8AEB6] transition hover:text-[#E8C96A]"
      >
        ← Back to Home
      </Link>

      <section className="mx-auto max-w-7xl pt-14 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#E8C96A]">
          ShopSphere Exclusive
        </p>

        <h1 className="text-4xl font-light tracking-wide sm:text-6xl">
          The Art of <span className="text-[#E8C96A]">Jewelry</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#B8AEB6] sm:text-base">
          Discover timeless pieces crafted to express your individuality.
          Explore our exclusive collections for women and men.
        </p>
      </section>

      <section className="mx-auto mt-14 flex max-w-7xl flex-col gap-7 md:flex-row">
        {categories.map((category) => (
          <Link
            href={category.href}
            key={category.title}
            className="group relative min-h-[430px] flex-1 overflow-hidden border border-[#B89542]/30 bg-[#181319] sm:min-h-[540px]"
          >
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute left-7 top-7 text-xs tracking-[0.3em] text-[#E8C96A]">
              COLLECTION {category.number}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <div className="mb-5 h-px w-12 bg-[#E8C96A] transition-all duration-500 group-hover:w-24" />

              <h2 className="text-3xl font-light sm:text-4xl">
                {category.title}
              </h2>

              <p className="mt-3 text-sm tracking-wide text-white/70">
                {category.subtitle}
              </p>

              <div className="mt-7 inline-flex items-center gap-4 border border-[#E8C96A]/70 px-6 py-3 text-xs uppercase tracking-[0.2em] transition duration-300 group-hover:bg-[#E8C96A] group-hover:text-[#100D11]">
                Explore Collection <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <footer className="mx-auto mt-16 max-w-7xl border-t border-[#B89542]/25 py-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#B8AEB6]">
          ShopSphere — Luxury in Every Detail
        </p>
      </footer>
    </main>
  );
}