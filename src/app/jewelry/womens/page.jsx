import Link from "next/link";

export default function WomensJewelry() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-10 text-[#B89542] hover:text-[#E8C96A] transition"
        >
          ← Back to Home
        </Link>

        <div className="text-center mb-14">
          <p className="text-[#B89542] uppercase tracking-[0.4em] text-sm mb-4">
            The Women's Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold text-[#E8C96A] mb-5">
            Women's Jewelry
          </h1>

          <p className="max-w-2xl mx-auto text-[#B8AEB6] text-base md:text-lg leading-8">
            Explore elegant rings and timeless necklaces, curated for
            effortless sophistication.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="/jewelry/womens/rings"
            className="group relative w-full md:w-[46%] overflow-hidden rounded-2xl border border-[#B89542]/50 bg-[#171318]"
          >
            <img
              src="/women-ring2.jfif"
              alt="Women's Rings"
              className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8">
              <p className="text-[#E8C96A] uppercase tracking-[0.3em] text-xs mb-3">
                Timeless Elegance
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold mb-3">
                Rings
              </h2>

              <p className="text-[#F1E8EB]/80 mb-6">
                Beautiful details in every piece.
              </p>

              <span className="inline-block border border-[#E8C96A] px-6 py-3 text-sm text-[#E8C96A] group-hover:bg-[#E8C96A] group-hover:text-[#100D11] transition duration-300">
                Explore Rings →
              </span>
            </div>
          </Link>

          <Link
            href="/jewelry/womens/necklace"
            className="group relative w-full md:w-[46%] overflow-hidden rounded-2xl border border-[#B89542]/50 bg-[#171318]"
          >
            <img
              src="/women-necklace2.jfif"
              alt="Women's Necklaces"
              className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8">
              <p className="text-[#E8C96A] uppercase tracking-[0.3em] text-xs mb-3">
                Refined Beauty
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold mb-3">
                Necklaces
              </h2>

              <p className="text-[#F1E8EB]/80 mb-6">
                Elegant accents for every occasion.
              </p>

              <span className="inline-block border border-[#E8C96A] px-6 py-3 text-sm text-[#E8C96A] group-hover:bg-[#E8C96A] group-hover:text-[#100D11] transition duration-300">
                Explore Necklaces →
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16 border-t border-[#B89542]/30 pt-8">
          <p className="text-[#B8AEB6] text-sm tracking-wide">
            SHOPSPHERE — LUXURY IN EVERY DETAIL
          </p>
        </div>
      </div>
    </main>
  );
}