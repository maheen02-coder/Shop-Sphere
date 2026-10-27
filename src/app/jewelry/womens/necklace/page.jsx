import Link from "next/link";

const necklaces = [
  {
    id: "201",
    name: "Golden Grace Necklace",
    price: "Rs. 4,800",
    image: "/women-necklace1.jfif",
    collection: "Golden Collection",
  },
  {
    id: "202",
    name: "Elegant Pearl Necklace",
    price: "Rs. 5,500",
    image: "/women-necklace2.jfif",
    collection: "Classic Collection",
  },
  {
    id: "203",
    name: "Royal Statement Necklace",
    price: "Rs. 6,200",
    image: "/women-necklace3.jfif",
    collection: "Signature Collection",
  },
  {
    id: "204",
    name: "Minimal Charm Necklace",
    price: "Rs. 3,900",
    image: "/women-necklace4.jfif",
    collection: "Everyday Elegance",
  },
];

export default function WomensNecklace() {
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
            Women's Necklaces
          </h1>

          <p className="max-w-2xl mx-auto text-[#B8AEB6] text-base md:text-lg leading-8">
            Discover graceful necklaces and refined statement pieces,
            designed to bring timeless elegance to every occasion.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {necklaces.map((necklace) => (
            <Link
              key={necklace.id}
              href={`/jewelry/womens/necklace/${necklace.id}`}
              className="group w-full sm:w-[45%] lg:w-[22%] overflow-hidden rounded-2xl border border-[#B89542]/40 bg-[#171318] transition duration-300 hover:border-[#E8C96A]"
            >
              <div className="overflow-hidden">
                <img
                  src={necklace.image}
                  alt={necklace.name}
                  className="w-full h-[280px] object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-[#B89542] uppercase tracking-widest text-xs mb-3">
                  {necklace.collection}
                </p>

                <h2 className="text-lg font-semibold mb-3">
                  {necklace.name}
                </h2>

                <p className="text-[#E8C96A] mb-5">{necklace.price}</p>

                <span className="inline-block border border-[#B89542] px-4 py-2 text-sm text-[#E8C96A] group-hover:bg-[#E8C96A] group-hover:text-[#100D11] transition">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
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