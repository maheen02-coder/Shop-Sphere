import Link from "next/link";

const watches = [
  {
    id: "1",
    name: "Samsung Galaxy Watch",
    image: "/samsung-watch-1.jfif",
    price: "Rs. 79,999",
  },
  {
    id: "2",
    name: "Samsung Galaxy Watch Premium",
    image: "/samsung-watch-2.jfif",
    price: "Rs. 99,999",
  },
];

export default function SamsungWatches() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-12">
          <Link
            href="/electronics/samsung"
            className="text-[#E8C96A] hover:text-[#F1E8EB] transition"
          >
            ← Back to Samsung
          </Link>

          <Link
            href="/"
            className="text-[#B8AEB6] hover:text-[#E8C96A] transition"
          >
            Home
          </Link>
        </div>

        <div className="text-center mb-14">
          <p className="text-[#B89542] uppercase tracking-[0.3em] text-sm mb-3">
            Samsung Collection
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold">
            Samsung Watches
          </h1>

          <p className="text-[#B8AEB6] mt-4">
            Explore Samsung smartwatches and wearable technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {watches.map((product) => (
            <Link
              key={product.id}
              href={`/electronics/samsung/watches/${product.id}`}
              className="group"
            >
              <div className="bg-[#151116] border border-[#B89542]/30 rounded-2xl overflow-hidden hover:border-[#E8C96A] transition duration-300">

                <div className="h-96 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[#B89542] text-sm mb-2">
                    SAMSUNG
                  </p>

                  <h2 className="text-2xl font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-[#E8C96A] text-lg mt-4">
                    {product.price}
                  </p>

                  <p className="text-[#B8AEB6] text-sm mt-3">
                    View Product →
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}