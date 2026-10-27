import Link from "next/link";

const rings = [
  {
    id: "101",
    name: "Golden Elegance Ring",
    price: "Rs. 4,500",
    image: "/women-ring1.jfif",
    type: "Gold Collection",
  },
  {
    id: "102",
    name: "Classic Gold Ring",
    price: "Rs. 5,200",
    image: "/women-ring2.jfif",
    type: "Timeless Collection",
  },
  {
    id: "103",
    name: "Elegant Statement Ring",
    price: "Rs. 6,000",
    image: "/women-ring3.jfif",
    type: "Signature Collection",
  },
  {
    id: "104",
    name: "Luxury Minimal Ring",
    price: "Rs. 3,800",
    image: "/women-ring4.jfif",
    type: "Everyday Elegance",
  },
];

export default function WomensRings() {
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
            Women's Rings
          </h1>

          <p className="max-w-2xl mx-auto text-[#B8AEB6] text-base md:text-lg leading-8">
            Explore elegant designs, refined details, and timeless rings
            selected for your personal style.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {rings.map((ring) => (
            <Link
              key={ring.id}
              href={`/jewelry/womens/rings/${ring.id}`}
              className="group w-full sm:w-[45%] lg:w-[22%] overflow-hidden rounded-2xl border border-[#B89542]/40 bg-[#171318] transition duration-300 hover:border-[#E8C96A]"
            >
              <div className="overflow-hidden">
                <img
                  src={ring.image}
                  alt={ring.name}
                  className="w-full h-[280px] object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-[#B89542] uppercase tracking-widest text-xs mb-3">
                  {ring.type}
                </p>

                <h2 className="text-lg font-semibold mb-3">
                  {ring.name}
                </h2>

                <p className="text-[#E8C96A] mb-5">{ring.price}</p>

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